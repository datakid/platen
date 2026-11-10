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
    "const d=(await import('../data/languages/bash.js')).default;const out=[];"
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

seed = {
    "notes.txt": "todo: write tests\ndone: fix bug\n\ntodo: review pr\n",
    "numbers.txt": "3\n1\n2\n",
    "data.csv": "id,name,score\n1,ada,90\n2,grace,85\n3,linus,70\n",
    "app.log": "2024-01-01 INFO start\n2024-01-01 ERROR disk full\n2024-01-02 INFO retry\n2024-01-02 ERROR timeout\n",
    "README.md": "# demo\n",
    "src/a.py": "print('a')\n# todo: tidy\n",
    "src/b.py": "print('b')\n",
    "src/lib/c.py": "print('c')\n",
    "build/out.o": "x\n",
    "build/app.bin": "y\n",
    "tmp/old.tmp": "z\n",
}
bad_stderr = re.compile(r"command not found|syntax error|unbound variable|bad substitution|invalid option|unexpected EOF|No such file or directory|unexpected token|integer expression expected")
work = tempfile.mkdtemp(prefix="platen_sh_")
bad = 0
for n, it in enumerate(items):
    d = os.path.join(work, f"w{n}")
    for rel, text in seed.items():
        p = os.path.join(d, rel)
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w") as f:
            f.write(text)
    script = os.path.join(work, f"s{n}.sh")
    with open(script, "w") as f:
        f.write(it["code"] + "\n")
    problem = None
    syn = subprocess.run(["bash", "-n", script], capture_output=True, text=True)
    if syn.returncode:
        problem = "bash -n: " + syn.stderr.strip().splitlines()[0][:120]
    else:
        env = dict(os.environ, HOME=d, LC_ALL="C")
        try:
            r = subprocess.run(["bash", script, "alpha", "beta"], cwd=d, env=env, capture_output=True, text=True, stdin=subprocess.DEVNULL, timeout=8)
            err = r.stderr
            m = bad_stderr.search(err)
            if m or r.returncode == 127:
                problem = "run: " + (err.strip().splitlines() or ["exit 127"])[0][:120]
        except subprocess.TimeoutExpired:
            problem = "run: timeout"
    if problem:
        bad += 1
        print(it["id"], " | ", problem, flush=True)
shutil.rmtree(work, ignore_errors=True)
print(f"ran {len(items)} snippets with bash, {bad} failed", flush=True)
