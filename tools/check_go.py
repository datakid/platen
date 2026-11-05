import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

only = sys.argv[1:]
root = os.path.dirname(os.path.abspath(__file__))
js = (
    "const d=(await import('../data/languages/go.js')).default;const out=[];"
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

PKGS = "bufio bytes cmp context encoding/json errors fmt io io/fs log maps math net/http os runtime slices sort strconv strings sync sync/atomic testing time".split()
PRE = "package main\n\nimport (\n" + "".join(f'\t"{p}"\n' for p in PKGS) + ")\n\n"
IGNORE = ("declared and not used", "and not used")

work = tempfile.mkdtemp(prefix="platen_go_")
with open(os.path.join(work, "go.mod"), "w") as f:
    f.write("module platen\n\ngo 1.22\n")
env = dict(os.environ, GOFLAGS="-mod=mod", GOPATH=os.path.join(work, "gopath"), GOCACHE=os.environ.get("GOCACHE", os.path.join(work, "cache")))


def tabs(code):
    out = []
    for line in code.split("\n"):
        n = len(line) - len(line.lstrip(" "))
        out.append("\t" * (n // 4) + " " * (n % 4) + line.lstrip(" "))
    return "\n".join(out)


def build(src):
    with open(os.path.join(work, "main.go"), "w") as f:
        f.write(src)
    r = subprocess.run(["go", "build", "-gcflags=-e", "-o", os.devnull, "."], capture_output=True, text=True, cwd=work, env=env, timeout=120)
    errs = [l for l in r.stderr.splitlines() if l.strip() and not l.startswith("#") and not any(k in l for k in IGNORE)]
    return errs


bad = 0
fmt_bad = 0
for it in items:
    code = tabs(it["code"]) + "\n"
    g = subprocess.run(["gofmt"], input=code, capture_output=True, text=True)
    if g.returncode:
        bad += 1
        print(it["id"], " | gofmt:", g.stderr.strip().splitlines()[0][:110], flush=True)
        continue
    if g.stdout != code:
        fmt_bad += 1
        print(it["id"], " | not gofmt-clean", flush=True)
    has_main = re.search(r"^func main\(", code, re.M) is not None
    if code.startswith("package "):
        attempts = [code + ("" if has_main else "\nfunc main() {}\n")]
    elif code.startswith("import "):
        attempts = ["package main\n\n" + code + ("" if has_main else "\nfunc main() {}\n")]
    else:
        attempts = [PRE + code + ("" if has_main else "\nfunc main() {}\n"), PRE + "func main() {\n" + code + "}\n"]
    last = None
    for a in attempts:
        errs = build(a)
        if not errs:
            last = None
            break
        last = errs
    if last:
        bad += 1
        print(it["id"], " | ", last[0][:140], flush=True)
shutil.rmtree(work, ignore_errors=True)
print(f"checked {len(items)} snippets with go build, {bad} failed to compile, {fmt_bad} not gofmt-clean", flush=True)
sys.exit(1 if bad or fmt_bad else 0)
