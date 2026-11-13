import glob
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
    "const d=(await import('../data/languages/csharp.js')).default;const out=[];"
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

droot = os.environ.get("DOTNET_ROOT", "/usr/lib/dotnet")
ref_dir = sorted(glob.glob(droot + "/packs/Microsoft.NETCore.App.Ref/*/ref/net*"))[-1]
csc = sorted(glob.glob(droot + "/sdk/*/Roslyn/bincore/csc.dll"))[-1]
refs = ["-r:" + f for f in sorted(glob.glob(ref_dir + "/*.dll"))]
env = dict(os.environ, DOTNET_CLI_TELEMETRY_OPTOUT="1", DOTNET_NOLOGO="1")
work = tempfile.mkdtemp(prefix="platen_cs_")
globals_path = os.path.join(work, "Globals.cs")
with open(globals_path, "w") as f:
    f.write(
        "global using System;\nglobal using System.Collections.Generic;\nglobal using System.IO;\n"
        "global using System.Linq;\nglobal using System.Text;\nglobal using System.Threading;\n"
        "global using System.Threading.Tasks;\nglobal using System.Net.Http;\n"
    )


def build(src, tag):
    path = os.path.join(work, f"{tag}.cs")
    with open(path, "w") as f:
        f.write(src)
    r = subprocess.run(
        ["dotnet", csc, "-nologo", "-nullable:enable", "-langversion:14", "-t:exe", "-out:" + os.path.join(work, tag + ".dll")] + refs + [globals_path, path],
        capture_output=True,
        text=True,
        env=env,
        timeout=180,
    )
    errs = [l for l in r.stdout.splitlines() if " error CS" in l]
    errs = [l for l in errs if "CS5001" not in l]
    return errs


bad = 0
for n, it in enumerate(items):
    code = it["code"] + "\n"
    attempts = [
        code,
        "class W {\n" + code + "}\n",
        "class W {\nvoid M() {\n" + code + "}\n}\n",
        "using System;\nclass W {\nstatic async Task M() {\n" + code + "}\n}\n",
    ]
    last = None
    for k, a in enumerate(attempts):
        errs = build(a, f"s{n}_{k}")
        if not errs:
            last = None
            break
        last = errs
    if last:
        bad += 1
        msg = re.sub(r"^.*?: error ", "", last[0])
        print(it["id"], " | ", msg[:160], flush=True)
shutil.rmtree(work, ignore_errors=True)
print(f"checked {len(items)} snippets with csc, {bad} failed to compile", flush=True)
