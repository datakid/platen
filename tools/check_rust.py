import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor

only = sys.argv[1:]
root = os.path.dirname(os.path.abspath(__file__))
js = (
    "const d=(await import('../data/languages/rust.js')).default;const out=[];"
    "for(const t of d.topics)for(const c of t.concepts)c.examples.forEach((e,i)=>out.push({id:`${t.id}/${c.id}/${i}`,code:e.code}));"
    "console.log(JSON.stringify(out))"
)
raw = subprocess.run(["node", "--input-type=module", "-e", js], capture_output=True, text=True, cwd=root)
if raw.returncode:
    print(raw.stderr)
    sys.exit(2)
items = json.loads(raw.stdout)
if only:
    items = [i for i in items if any(i["id"].startswith(o) for o in only)]

PRE = (
    "#![allow(unused, dead_code, unused_variables)]\n"
    "use std::collections::{BTreeMap, HashMap, HashSet, VecDeque};\n"
    "use std::fmt;\nuse std::rc::Rc;\nuse std::cell::RefCell;\n"
    "use std::sync::{mpsc, Arc, Mutex};\nuse std::thread;\n\n"
)
HEAD = "#![allow(unused, dead_code, unused_variables)]\n"
work = tempfile.mkdtemp(prefix="platen_rs_")


def build(src, tag):
    path = os.path.join(work, f"{tag}.rs")
    with open(path, "w") as f:
        f.write(src)
    r = subprocess.run(
        ["rustc", "--edition", "2024", "--crate-type", "bin", "-A", "warnings", "--emit=metadata", "-o", os.path.join(work, tag + ".rmeta"), path],
        capture_output=True,
        text=True,
        timeout=180,
    )
    if r.returncode == 0:
        return None
    errs = [l for l in r.stderr.splitlines() if l.startswith("error")]
    return errs[0] if errs else r.stderr[:200]


def check(it, n):
    code = it["code"] + "\n"
    has_main = re.search(r"^(?:async )?fn main\(", code, re.M) is not None
    tail = "" if has_main else "\nfn main() {}\n"
    if has_main:
        attempts = [PRE + code, HEAD + code]
    else:
        attempts = [
            PRE + "fn main() {\n" + code + "}\n",
            PRE + code + tail,
            HEAD + code + tail,
            PRE + "fn main() -> Result<(), Box<dyn std::error::Error>> {\n" + code + "\nOk(())\n}\n",
        ]
    last = None
    for k, a in enumerate(attempts):
        err = build(a, f"s{n}_{k}")
        if not err:
            return it["id"], None
        last = err
    return it["id"], last


bad = 0
with ThreadPoolExecutor(max_workers=max(1, os.cpu_count() or 1)) as ex:
    for id_, err in ex.map(lambda p: check(p[1], p[0]), enumerate(items)):
        if err:
            bad += 1
            print(id_, " | ", err[:160], flush=True)
shutil.rmtree(work, ignore_errors=True)
print(f"checked {len(items)} snippets with rustc, {bad} failed to compile", flush=True)
