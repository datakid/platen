import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

tofu = os.environ.get("TOFU", "tofu")
raw = subprocess.run(
    ["node", "--input-type=module", "-e",
     'const d=(await import("./data/languages/terraform.js")).default;'
     'const o=[];for(const t of d.topics)for(const c of t.concepts)c.examples.forEach((e,i)=>o.push({id:t.id+"/"+c.id+"/"+i,code:e.code}));'
     'console.log(JSON.stringify(o))'],
    capture_output=True, text=True, cwd=os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
if raw.returncode:
    print(raw.stderr)
    sys.exit(2)
items = json.loads(raw.stdout)

def builtin_only(code):
    if re.search(r'^\s*(module|provider)\s+"', code, re.M):
        return False
    if re.search(r'required_providers|backend\s+"(?!local)|^\s*import\s*\{', code, re.M):
        return False
    types = re.findall(r'^\s*(?:resource|data)\s+"([a-z0-9_]+)"', code, re.M)
    return all(t in ("terraform_data", "terraform_remote_state") for t in types)

work = tempfile.mkdtemp(prefix="platen_tf_")
env = dict(os.environ, TF_IN_AUTOMATION="1", NO_COLOR="1")
open(os.path.join(work, "main.tf"), "w").write("")
subprocess.run([tofu, "init", "-backend=false", "-input=false"], cwd=work, capture_output=True, env=env)
fmt_bad = val_bad = checked = 0
for it in items:
    r = subprocess.run([tofu, "fmt", "-"], input=it["code"] + "\n", capture_output=True, text=True, env=env)
    if r.returncode or r.stdout.rstrip("\n") != it["code"].rstrip("\n"):
        fmt_bad += 1
        print(it["id"], "| fmt:", (r.stderr.strip().splitlines() or ["not canonical"])[0][:120])
        continue
    if builtin_only(it["code"]):
        checked += 1
        open(os.path.join(work, "main.tf"), "w").write(it["code"] + "\n")
        v = subprocess.run([tofu, "validate", "-no-color"], cwd=work, capture_output=True, text=True, env=env)
        if v.returncode:
            val_bad += 1
            msg = [l for l in v.stdout.splitlines() + v.stderr.splitlines() if "Error" in l or "error" in l]
            print(it["id"], "| validate:", (msg or [""])[0][:140])
shutil.rmtree(work, ignore_errors=True)
print(f"checked {len(items)} snippets with tofu fmt ({fmt_bad} not canonical), validated {checked} built-in snippets ({val_bad} failed)")
