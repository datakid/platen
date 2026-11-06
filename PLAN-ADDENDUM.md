# Addendum: languages added beyond PLAN.md

The plan's twelve languages and libraries stay as written. These seven were added so the trainer covers the web, data, shell and mobile work that most programmers type every day. Each follows the same rules as the plan: three concepts or more per topic, three variants per concept, glosses and notes under the plan's copy rules, and a data file in `data/languages/`.

| id | name | version | topics | verified with |
|---|---|---|---|---|
| javascript | JavaScript | ES2023 (Node 22) | 16 | `node` |
| typescript | TypeScript | 5.x | 14 | `tsc --noEmit` |
| sql | SQL | ANSI-style, run on SQLite and DuckDB | 16 | `sqlite3` and DuckDB |
| bash | Bash | 5.x | 14 | `bash -n` and a real run |
| java | Java | 21 | 16 | `javac` |
| dart | Dart | 3.x | 15 | `dart analyze` if a toolchain is available |
| powershell | PowerShell | 7.x | 16 | `pwsh` if a toolchain is available |

## Rosters

**JavaScript** — 01 variables & types · 02 strings & template literals · 03 arrays & array methods · 04 objects & destructuring · 05 functions & arrows · 06 closures & scope · 07 classes · 08 modules · 09 promises · 10 async/await · 11 fetch & JSON · 12 iterators & generators · 13 Map & Set · 14 errors & try/catch · 15 regular expressions · 16 optional chaining & nullish coalescing

**TypeScript** — 01 basic types · 02 interfaces & type aliases · 03 unions & narrowing · 04 generics · 05 utility types · 06 enums & const objects · 07 classes & access modifiers · 08 functions & overloads · 09 mapped & conditional types · 10 type guards · 11 as const & satisfies · 12 template literal types · 13 modules & declaration files · 14 async types

**SQL** — 01 SELECT & WHERE · 02 ORDER BY & LIMIT · 03 aggregates & GROUP BY · 04 HAVING · 05 joins · 06 subqueries · 07 CTEs · 08 window functions · 09 CASE · 10 INSERT, UPDATE, DELETE · 11 CREATE TABLE & constraints · 12 indexes & EXPLAIN · 13 NULL handling · 14 set operations · 15 dates & strings · 16 transactions

**Bash** — 01 variables & quoting · 02 conditionals & tests · 03 loops · 04 functions · 05 arrays · 06 parameter expansion · 07 pipes & redirects · 08 grep, sed, awk · 09 find & xargs · 10 arguments & getopts · 11 exit codes & strict mode · 12 here-docs & process substitution · 13 traps · 14 arithmetic

**Java** — 01 basics & types · 02 strings · 03 arrays & ArrayList · 04 HashMap & collections · 05 classes & objects · 06 interfaces & polymorphism · 07 records · 08 enums · 09 generics · 10 lambdas & streams · 11 Optional · 12 exceptions · 13 switch expressions & pattern matching · 14 sealed types · 15 text blocks & var · 16 concurrency basics

**Dart** — 01 variables & null safety · 02 strings · 03 List, Map, Set · 04 functions & named parameters · 05 classes & constructors · 06 inheritance & mixins · 07 Future & async/await · 08 Streams · 09 records & patterns · 10 enums & switch expressions · 11 extension methods · 12 generics · 13 exceptions · 14 StatelessWidget · 15 StatefulWidget & setState

**PowerShell** — 01 variables & types · 02 strings & here-strings · 03 arrays & hashtables · 04 the pipeline · 05 Where-Object & Select-Object · 06 loops & ForEach-Object · 07 functions & parameters · 08 if & switch · 09 try, catch, finally · 10 files & paths · 11 Get-ChildItem · 12 Sort-Object & Group-Object · 13 CSV & JSON · 14 regular expressions · 15 classes · 16 modules

## Order

Go, Rust, C#, PyTorch (from the plan), then JavaScript, TypeScript, SQL, Bash, Java, Dart, PowerShell. A language whose toolchain cannot be installed is marked unverified in its notes rather than described as checked.
