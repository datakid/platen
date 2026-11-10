import json
import os
import shutil
import subprocess
import sys
import tempfile

only = sys.argv[1:]
root = os.path.dirname(os.path.abspath(__file__))
js = (
    "const d=(await import('../data/languages/powershell.js')).default;const out=[];"
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
work = tempfile.mkdtemp(prefix="platen_ps_")
jpath = os.path.join(work, "items.json")
with open(jpath, "w") as f:
    json.dump(items, f)
pwsh = os.environ.get("PWSH") or shutil.which("pwsh") or "/opt/pwsh/pwsh"
env = dict(os.environ, DOTNET_SYSTEM_GLOBALIZATION_INVARIANT="1", POWERSHELL_TELEMETRY_OPTOUT="1", DOTNET_CLI_TELEMETRY_OPTOUT="1")
res = subprocess.run([pwsh, "-NoProfile", "-NonInteractive", "-File", os.path.join(root, "check_powershell.ps1"), jpath, work], capture_output=True, text=True, env=env, timeout=1800)
print(res.stdout.strip())
if res.returncode:
    print(res.stderr[:400])
shutil.rmtree(work, ignore_errors=True)
sys.exit(0 if " 0 failed" in res.stdout else 1)
