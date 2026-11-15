import json
import os
import shutil
import subprocess
import sys
import tempfile

jar = os.environ.get("CLOJURE_JAR")
if not jar:
    print("set CLOJURE_JAR to a clojure tools jar, for example ClojureTools/clojure-tools-1.12.6.1673.jar")
    sys.exit(2)
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
raw = subprocess.run(
    ["node", "--input-type=module", "-e",
     'const d=(await import("./data/languages/clojure.js")).default;'
     'const o=[];for(const t of d.topics)for(const c of t.concepts)c.examples.forEach((e,i)=>o.push({id:t.id+"/"+c.id+"/"+i,code:e.code}));'
     'console.log(JSON.stringify(o))'],
    capture_output=True, text=True, cwd=root)
if raw.returncode:
    print(raw.stderr)
    sys.exit(2)
items = json.loads(raw.stdout)

work = tempfile.mkdtemp(prefix="platen_clj_")
entries = []
for k, it in enumerate(items):
    path = os.path.join(work, f"s{k}.clj")
    open(path, "w").write(it["code"] + "\n")
    entries.append(f'["{it["id"]}" "{path}" {k}]')
driver = """(require 'clojure.string 'clojure.set)
(def results (atom []))
(doseq [[id f k] [%s]]
  (let [err (java.io.StringWriter.)
        out (java.io.StringWriter.)]
    (try
      (binding [*ns* (create-ns (symbol (str "snip" k))) *out* out *err* err]
        (refer-clojure)
        (require '[clojure.string] '[clojure.set])
        (load-file f))
      (catch Throwable t
        (swap! results conj [id (str (or (ex-message t) t))])))
    (when (re-find #"WARNING" (str err))
      (swap! results conj [id (str err)]))))
(doseq [[id m] @results]
  (println id "|" (first (clojure.string/split-lines m))))
(println "ran" %d "snippets with clojure," (count @results) "failed")
(flush)
(shutdown-agents)
(System/exit 0)
""" % (" ".join(entries), len(items))
open(os.path.join(work, "driver.clj"), "w").write(driver)
r = subprocess.run(["java", "-cp", jar, "clojure.main", os.path.join(work, "driver.clj")], capture_output=True, text=True, timeout=250, cwd=work)
print(r.stdout.strip())
if r.returncode:
    print(r.stderr[:800])
shutil.rmtree(work, ignore_errors=True)
