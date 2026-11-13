import json
import os
import shutil
import subprocess
import sys
import tempfile

only = sys.argv[1:]
root = os.path.dirname(os.path.abspath(__file__))
js = (
    "const d=(await import('../data/languages/java.js')).default;const out=[];"
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
    "import java.util.*;\nimport java.util.function.*;\nimport java.util.stream.*;\n"
    "import java.util.concurrent.*;\nimport java.util.concurrent.atomic.*;\n"
)
templates = [
    lambda c: PRE + "class Main {\n  public static void main(String[] args) throws Exception {\n" + c + "\n  }\n}\n",
    lambda c: PRE + "class Main {\n" + c + "\n  public static void main(String[] args) {}\n}\n",
    lambda c: PRE + c + "\nclass Main { public static void main(String[] args) {} }\n",
]
work = tempfile.mkdtemp(prefix="platen_jv_")
pending = {n: it for n, it in enumerate(items)}
last = {}
for k, tpl in enumerate(templates):
    d = os.path.join(work, f"t{k}")
    os.makedirs(d)
    for n, it in pending.items():
        with open(os.path.join(d, f"c{n:04d}.java"), "w") as f:
            f.write(tpl(it["code"]))
    res = subprocess.run(["java", os.path.join(root, "CheckJava.java"), d], capture_output=True, text=True)
    if res.returncode:
        print(res.stderr[:400])
        sys.exit(2)
    nxt = {}
    for line in res.stdout.splitlines():
        name, status, msg = (line.split("\t") + ["", ""])[:3]
        n = int(name[1:5])
        if status == "OK":
            continue
        last[n] = msg
        nxt[n] = pending[n]
    pending = nxt
    if not pending:
        break
for n in sorted(pending):
    print(items[n]["id"], " | ", last.get(n, "?")[:140])
shutil.rmtree(work, ignore_errors=True)
print(f"compiled {len(items)} snippets with javac 25, {len(pending)} failed", flush=True)
