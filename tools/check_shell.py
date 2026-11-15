import json
import os
import shutil
import subprocess
import sys
import tempfile

lang = sys.argv[1]
only = sys.argv[2:]
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
raw = subprocess.run(
    ["node", "--input-type=module", "-e",
     f'const d=(await import("./data/languages/{lang}.js")).default;'
     'const o=[];for(const t of d.topics)for(const c of t.concepts)c.examples.forEach((e,i)=>o.push({id:t.id+"/"+c.id+"/"+i,code:e.code}));'
     'console.log(JSON.stringify(o))'],
    capture_output=True, text=True, cwd=root)
if raw.returncode:
    print(raw.stderr)
    sys.exit(2)
items = json.loads(raw.stdout)
if only:
    items = [i for i in items if any(i["id"].startswith(o) for o in only)]

bad = 0
for it in items:
    work = tempfile.mkdtemp(prefix=f"platen_{lang}_")
    try:
        r = subprocess.run(["bash", "-c", it["code"]], cwd=work, capture_output=True, text=True, timeout=20, stdin=subprocess.DEVNULL)
        err = r.stderr.strip()
        if r.returncode != 0 or err:
            bad += 1
            print(it["id"], "| rc", r.returncode, "|", (err.splitlines() or [""])[0][:130])
    except subprocess.TimeoutExpired:
        bad += 1
        print(it["id"], "| timeout")
    finally:
        shutil.rmtree(work, ignore_errors=True)
print(f"ran {len(items)} snippets with bash, {bad} failed", flush=True)
