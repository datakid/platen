import json
import os
import shutil
import subprocess
import sys
import tempfile

only = sys.argv[1:]
root = os.path.dirname(os.path.abspath(__file__))
js = (
    "const d=(await import('../data/languages/lua.js')).default;const out=[];"
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

work = tempfile.mkdtemp(prefix="platen_lua_")
with open(os.path.join(work, "mathx.lua"), "w") as f:
    f.write("local M = {}\nfunction M.square(n) return n * n end\nfunction M.cube(n) return n * n * n end\nreturn M\n")
bad = 0
for it in items:
    path = os.path.join(work, "snippet.lua")
    with open(path, "w") as f:
        f.write(it["code"] + "\n")
    r = subprocess.run(["lua", path], capture_output=True, text=True, cwd=work, timeout=10)
    if r.returncode:
        bad += 1
        print(it["id"], " | ", (r.stderr.strip().splitlines() or [""])[0][:120], flush=True)
shutil.rmtree(work, ignore_errors=True)
print(f"ran {len(items)} snippets with lua 5.5, {bad} failed", flush=True)
sys.exit(1 if bad else 0)
