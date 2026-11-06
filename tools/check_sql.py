import json
import os
import sqlite3
import subprocess
import sys

import duckdb

only = sys.argv[1:]
root = os.path.dirname(os.path.abspath(__file__))
js = (
    "const d=(await import('../data/languages/sql.js')).default;const out=[];"
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
prelude = open(os.path.join(root, "preludes", "sql.sql")).read()

bad = 0
for it in items:
    problems = []
    con = sqlite3.connect(":memory:")
    try:
        con.executescript(prelude)
        con.executescript(it["code"])
    except Exception as e:
        problems.append(f"sqlite: {str(e)[:110]}")
    con.close()
    dcon = duckdb.connect(":memory:")
    try:
        dcon.execute(prelude)
        dcon.execute(it["code"])
    except Exception as e:
        problems.append(f"duckdb: {str(e).splitlines()[0][:110]}")
    dcon.close()
    if problems:
        bad += 1
        print(it["id"], " | ", " ; ".join(problems), flush=True)
print(f"ran {len(items)} snippets on sqlite and duckdb, {bad} failed", flush=True)
sys.exit(1 if bad else 0)
