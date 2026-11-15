import json
import os
import shutil
import subprocess
import sys
import tempfile

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
raw = subprocess.run(
    ["node", "--input-type=module", "-e",
     'const d=(await import("./data/languages/ocaml.js")).default;'
     'const o=[];for(const t of d.topics)for(const c of t.concepts)c.examples.forEach((e,i)=>o.push({id:t.id+"/"+c.id+"/"+i,code:e.code}));'
     'console.log(JSON.stringify(o))'],
    capture_output=True, text=True, cwd=root)
if raw.returncode:
    print(raw.stderr)
    sys.exit(2)
items = json.loads(raw.stdout)

work = tempfile.mkdtemp(prefix="platen_ml_")
bad = 0
for it in items:
    path = os.path.join(work, "snippet.ml")
    open(path, "w").write(it["code"] + "\n")
    r = subprocess.run(["ocaml", path], capture_output=True, text=True, timeout=60, cwd=work, stdin=subprocess.DEVNULL)
    out = (r.stdout + r.stderr)
    flagged = r.returncode != 0 or "Error" in r.stderr or "Alert" in r.stderr or "Warning" in r.stderr
    if flagged:
        bad += 1
        first = [l for l in r.stderr.splitlines() if l.strip()][:4]
        print(it["id"], "|", " / ".join(first)[:200])
shutil.rmtree(work, ignore_errors=True)
print(f"ran {len(items)} snippets with ocaml, {bad} failed")
