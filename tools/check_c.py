import json
import os
import shutil
import subprocess
import sys
import tempfile

lang = sys.argv[1] if len(sys.argv) > 1 else "c"
if lang == "c":
    cc, std, ext = "gcc", "-std=c23", ".c"
    heads = "stdio stdlib string stdint stdbool stddef ctype math errno assert limits time".split()
    inc = "".join(f"#include <{h}.h>\n" for h in heads)
    main_open, main_close = "int main(void) {\n", "\nreturn 0;\n}\n"
else:
    cc, std, ext = "g++", "-std=c++23", ".cpp"
    heads = "algorithm array cassert cctype chrono cmath compare concepts cstdint cstdio cstdlib cstring deque format functional initializer_list iostream iterator list map memory mutex numbers numeric optional ranges set span sstream stdexcept string string_view tuple type_traits unordered_map unordered_set utility variant vector".split()
    inc = "".join(f"#include <{h}>\n" for h in heads)
    main_open, main_close = "int main() {\n", "\nreturn 0;\n}\n"

work = tempfile.mkdtemp(prefix="platen_check_")
header = os.path.join(work, "prelude.h" if lang == "c" else "prelude.hpp")
with open(header, "w") as f:
    f.write(inc)
flags = [std, "-w", "-Werror=implicit-function-declaration"]
xlang = "c-header" if lang == "c" else "c++-header"
pch = subprocess.run([cc, *flags, "-x", xlang, header, "-o", header + ".gch"], capture_output=True, text=True)
if pch.returncode:
    print(pch.stderr[:800])
    sys.exit(2)

root = os.path.dirname(os.path.abspath(__file__))
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
only = sys.argv[2:] 
if only:
    items = [i for i in items if any(i["id"].startswith(o) for o in only)]
src_path = os.path.join(work, "snippet" + ext)
include = f'#include "{os.path.basename(header)}"\n'


def compiles(body):
    with open(src_path, "w") as f:
        f.write(include + body)
    r = subprocess.run([cc, *flags, "-fsyntax-only", "-I", work, src_path], capture_output=True, text=True)
    return r.returncode == 0, r.stderr


bad = 0
for it in items:
    code = it["code"]
    ok, _ = compiles(code + "\n")
    if ok:
        continue
    ok2, err = compiles(main_open + code + main_close)
    if ok2:
        continue
    bad += 1
    first = [l for l in err.splitlines() if "error" in l][:2]
    print(it["id"], " | ".join(first), flush=True)
shutil.rmtree(work, ignore_errors=True)
print(f"checked {len(items)} snippets with {cc} {std}, {bad} failed", flush=True)
sys.exit(1 if bad else 0)
