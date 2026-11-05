import contextlib
import io
import json
import os
import subprocess
import sys
import traceback

lang = sys.argv[1]
only = sys.argv[2:]
root = os.path.dirname(os.path.abspath(__file__))
prelude = open(os.path.join(root, "preludes", lang + ".py")).read()

js = (
    "const d=(await import('../data/languages/%s.js')).default;const out=[];"
    "for(const t of d.topics)for(const c of t.concepts)c.examples.forEach((e,i)=>out.push({id:`${t.id}/${c.id}/${i}`,code:e.code}));"
    "console.log(JSON.stringify(out))"
) % lang
raw = subprocess.run(["node", "--input-type=module", "-e", js], capture_output=True, text=True, cwd=root)
if raw.returncode:
    print(raw.stderr)
    sys.exit(2)
items = json.loads(raw.stdout)
if only:
    items = [i for i in items if any(i["id"].startswith(o) for o in only)]

bad = 0
for it in items:
    ns = {"__name__": "__main__"}
    try:
        with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
            exec(prelude, ns)
            exec(it["code"], ns)
    except BaseException as e:
        bad += 1
        tb = traceback.extract_tb(e.__traceback__)
        where = tb[-1].lineno if tb else "?"
        print(f"{it['id']}  {type(e).__name__}: {str(e).splitlines()[0][:110] if str(e) else ''}", flush=True)
print(f"ran {len(items)} snippets, {bad} failed", flush=True)
sys.exit(1 if bad else 0)
