import ast
import json
import subprocess
import sys

ids = sys.argv[1:] or ["python"]
js = (
    "const ids=%s;const out=[];"
    "for(const id of ids){const d=(await import('../data/languages/'+id+'.js')).default;"
    "for(const t of d.topics)for(const c of t.concepts)c.examples.forEach((e,i)=>out.push({id:`${id}/${t.id}/${c.id}/${i}`,code:e.code}))}"
    "console.log(JSON.stringify(out))"
) % json.dumps(ids)
raw = subprocess.run(["node", "--input-type=module", "-e", js], capture_output=True, text=True, cwd=__file__.rsplit("/", 1)[0])
if raw.returncode:
    print(raw.stderr)
    sys.exit(2)
bad = 0
items = json.loads(raw.stdout)
for it in items:
    try:
        ast.parse(it["code"])
    except SyntaxError as e:
        bad += 1
        print(f"{it['id']}  {e.msg} (line {e.lineno})")
print(f"checked {len(items)} snippets, {bad} syntax errors")
sys.exit(1 if bad else 0)
