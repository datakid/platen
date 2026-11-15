import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

only = sys.argv[1:]
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
js = (
    "const d=(await import('./data/languages/git.js')).default;const out=[];"
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

base = tempfile.mkdtemp(prefix="platen_git_")
home = os.path.join(base, "home")
os.makedirs(home)
origin = os.path.join(base, "origin.git")
env = dict(
    os.environ,
    HOME=home,
    GIT_CONFIG_NOSYSTEM="1",
    GIT_EDITOR="true",
    GIT_SEQUENCE_EDITOR="true",
    GIT_TERMINAL_PROMPT="0",
    GIT_PAGER="cat",
    PAGER="cat",
    GIT_AUTHOR_DATE="2026-11-01T10:00:00",
    GIT_COMMITTER_DATE="2026-11-01T10:00:00",
)
open(os.path.join(home, ".gitconfig"), "w").write(
    "[user]\n\tname = Ada Lovelace\n\temail = ada@example.com\n"
    "[init]\n\tdefaultBranch = main\n"
    "[protocol \"file\"]\n\tallow = always\n"
    "[advice]\n\tdetachedHead = false\n"
    f"[url \"file://{origin}\"]\n"
    "\tinsteadOf = https://github.com/acme/orders.git\n"
    "\tinsteadOf = git@github.com:acme/orders.git\n"
)


def run(cmd, cwd, ok=True):
    r = subprocess.run(["bash", "-c", cmd], cwd=cwd, env=env, capture_output=True, text=True, stdin=subprocess.DEVNULL)
    if ok and r.returncode != 0:
        raise RuntimeError(f"setup failed: {cmd}\n{r.stderr}")
    return r


def build_template():
    run(f"git init -q --bare -b main {origin}", base)
    wd = os.path.join(base, "template", "orders")
    os.makedirs(wd)
    s = lambda c: run(c, wd)
    s("git init -q -b main")
    s("mkdir -p src docs tests")
    s("printf \"print('app')\\nprint('ready')\\n\" > src/app.py")
    s("printf '# orders\\n' > README.md")
    s("printf 'guide\\n' > docs/guide.md")
    s("printf '#!/bin/sh\\n! grep -q BUG src/app.py\\n' > test.sh && chmod +x test.sh")
    s("printf 'def test_ok():\\n    assert \"BUG\" not in open(\"src/app.py\").read()\\n' > tests/test_app.py")
    s("git add -A && git commit -q -m 'Initial commit'")
    s("printf 'def login():\\n    pass\\n' > src/auth.py && git add -A && git commit -q -m 'Add auth module'")
    s("git tag v1.0.0")
    s("printf '# BUG here\\n' >> src/app.py && git commit -q -am 'Add reporting hook'")
    s("printf 'more guide\\n' >> docs/guide.md && git commit -q -am 'Extend guide'")
    s("printf 'orders service\\n' >> README.md && git commit -q -am 'Describe service'")
    s("git switch -q -c old-name && git switch -q main")
    s("git switch -q -c experiment && printf 'idea\\n' > docs/idea.md && git add -A && git commit -q -m 'Try idea' && git switch -q main")
    s("git switch -q -c feature/base && printf 'base\\n' > src/base.py && git add -A && git commit -q -m 'Add base'")
    s("git switch -q -c feature/login")
    s("printf 'login\\n' > src/login.py && git add -A && git commit -q -m 'Add login form'")
    s("sed -i \"1s/.*/print('app with login')/\" src/app.py && printf 'routes\\n' > src/routes.py && git add -A && git commit -q -m 'Wire login into app'")
    s("git switch -q main")
    s(f"git remote add origin file://{origin}")
    s("git push -q origin main feature/login v1.0.0")
    s("git switch -q -c develop && printf 'dev\\n' > docs/dev.md && git add -A && git commit -q -m 'Start develop' && git push -q origin develop && git switch -q main && git branch -q -D develop")
    s("git fetch -q origin")
    s("git branch -q --set-upstream-to=origin/main main")
    s("git switch -q feature/login && git switch -q main")
    return os.path.join(base, "template")


def dirty(wd):
    run("printf 'edited\\n' >> README.md && printf 'extra line\\n' >> src/app.py && printf 'note\\n' >> docs/guide.md && printf 'scratch\\n' > notes.txt", wd)


def diverge(wd):
    run("sed -i \"1s/.*/print('app v2')/\" src/app.py && git commit -q -am 'Change app on main'", wd)


def prepare(code, wd):
    c = code
    if re.search(r"merge --abort|restore --(theirs|ours)", c):
        diverge(wd)
        run("git merge feature/login", wd, ok=False)
        return
    if re.search(r"rebase --(continue|skip|abort)", c):
        diverge(wd)
        run("git switch -q feature/login && git rebase main", wd, ok=False)
        return
    if re.search(r"cherry-pick --(continue|skip|abort)", c):
        diverge(wd)
        run("git cherry-pick feature/login", wd, ok=False)
        return
    if re.search(r"git stash (list|show|pop|apply|drop|clear|branch)", c):
        dirty(wd)
        run("git stash push -q -m one", wd)
        run("printf 'second\\n' >> docs/guide.md && git stash push -q -m two", wd)
    if re.search(r"git branch -d feature/login", c):
        run("git merge -q feature/login", wd)
    if re.search(r"revert -m", c):
        run("git merge -q --no-ff feature/login -m 'Merge login'", wd)
    if re.search(r"git bisect (bad|good|skip|log|reset|run)", c) and "bisect start" not in c:
        run("git bisect start HEAD v1.0.0", wd, ok=False)
    for m in re.finditer(r"git switch -c (\S+)|git branch (?!-)(\S+)|git stash branch (\S+)", c):
        name = next(g for g in m.groups() if g)
        run(f"git branch -q -D {name}", wd, ok=False)
    m = re.search(r"git branch -m (\S+) (\S+)", c)
    if m:
        run(f"git branch -q -D {m.group(2)}", wd, ok=False)
    m = re.search(r"git remote add (\S+)", c)
    if m:
        run(f"git remote remove {m.group(1)}", wd, ok=False)
    if re.search(r"git remote remove upstream", c):
        run(f"git remote add upstream file://{origin}", wd)
    if re.search(r"git remote rename origin upstream", c):
        run("git remote remove upstream", wd, ok=False)
    if re.search(r"--unset core.editor", c):
        run("git config --global core.editor nano", wd)
    history_cmd = re.search(r"git (merge|cherry-pick|rebase|revert|pull)", c)
    if re.search(r"git commit --(fixup|squash)", c):
        run("printf 'fix guide\\n' >> docs/guide.md && git add docs/guide.md", wd)
        return
    needs_dirty = re.search(
        r"git (add|diff\b|status|restore|stash( push|$)|reset HEAD src)|git commit( -a| -m| --fixup| --squash)", c)
    if needs_dirty and not history_cmd:
        dirty(wd)
        if re.search(r"git commit -m", c) and "git add" not in c:
            run("git add -A", wd)


template = build_template()
bad = 0
for it in items:
    case = tempfile.mkdtemp(prefix="case_", dir=base)
    shutil.copytree(os.path.join(template), os.path.join(case, "t"), symlinks=True)
    snap = origin + ".snap"
    if not os.path.exists(snap):
        shutil.copytree(origin, snap, symlinks=True)
    shutil.rmtree(origin)
    shutil.copytree(snap, origin, symlinks=True)
    code = it["code"]
    fresh = re.match(r"\s*git (init|clone)\b", code)
    if fresh:
        wd = os.path.join(case, "empty")
        os.makedirs(wd)
    else:
        wd = os.path.join(case, "t", "orders")
        try:
            prepare(code, wd)
        except RuntimeError as err:
            bad += 1
            print(it["id"], "| setup:", str(err).splitlines()[0][:120])
            continue
    r = subprocess.run(["bash", "-ec", code], cwd=wd, env=env, capture_output=True, text=True, stdin=subprocess.DEVNULL, timeout=60)
    err = r.stderr
    flagged = r.returncode != 0 or re.search(r"^(fatal|error):|is not a git command|unknown option|usage: git", err, re.M)
    if flagged:
        bad += 1
        first = [l for l in err.splitlines() if l.strip()][:2]
        print(it["id"], "| rc", r.returncode, "|", code.splitlines()[0][:50], "|", " / ".join(first)[:150])
    shutil.rmtree(case, ignore_errors=True)
shutil.rmtree(base, ignore_errors=True)
print(f"ran {len(items)} snippets with git, {bad} failed")
