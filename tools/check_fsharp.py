import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
raw = subprocess.run(
    ["node", "--input-type=module", "-e",
     'const d=(await import("./data/languages/fsharp.js")).default;'
     'const o=[];for(const t of d.topics)for(const c of t.concepts)c.examples.forEach((e,i)=>o.push({id:t.id+"/"+c.id+"/"+i,code:e.code}));'
     'console.log(JSON.stringify(o))'],
    capture_output=True, text=True, cwd=root)
if raw.returncode:
    print(raw.stderr)
    sys.exit(2)
items = json.loads(raw.stdout)

work = tempfile.mkdtemp(prefix="platen_fs_")
for k, it in enumerate(items):
    open(os.path.join(work, f"s{k}.fs"), "w").write(f"module S{k}\n\n" + it["code"] + "\n")

alive = list(range(len(items)))
failed = {}
env = dict(os.environ, DOTNET_CLI_TELEMETRY_OPTOUT="1", DOTNET_NOLOGO="1")
for rnd in range(12):
    loads = "\n".join(f'#load "s{k}.fs"' for k in alive)
    open(os.path.join(work, "driver.fsx"), "w").write(loads + "\n")
    r = subprocess.run(["dotnet", "fsi", "--warnaserror-:FS3370", "driver.fsx"], cwd=work, capture_output=True, text=True, env=env, timeout=280)
    out = r.stdout + r.stderr
    hits = {}
    for m in re.finditer(r"s(\d+)\.fs\((\d+),(\d+)\): error (FS\d+): (.*)", out):
        hits.setdefault(int(m.group(1)), f"{m.group(4)} {m.group(5)}"[:140])
    print("round", rnd, "files", len(alive), "errors in", len(hits), flush=True)
    if not hits:
        if r.returncode:
            print(out[:600])
        break
    for k, msg in hits.items():
        failed[k] = msg
        if k in alive:
            alive.remove(k)
for k, msg in sorted(failed.items()):
    print(items[k]["id"], "|", msg)
shutil.rmtree(work, ignore_errors=True)
print(f"checked {len(items)} snippets with dotnet fsi, {len(failed)} failed")
