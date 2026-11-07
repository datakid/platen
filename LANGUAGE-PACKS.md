# platen: language batches for parallel building

Give each chatbot two things: **part A** (the spec, the same for everyone) and **one batch from part C**. Each batch is four languages. Ask the chatbot to build **one language per reply** and to finish a language before starting the next.

What you get back is a **pack**: a small folder per language. You drop the folder into `packs/` and run one command, which merges it into the app and validates it. Nothing else in the project is touched, so batches never collide.

```
node tools/install_pack.mjs packs/kotlin
```

If validation fails, the installer rolls everything back and prints the exact issues. Paste those issues back to the same chatbot and ask for a corrected `content.txt`.

---

## Part A: the spec (paste this to every chatbot)

### A1. What platen is

platen is a quiet typing trainer for programmers. The person types short, idiomatic code blocks ("plates") one at a time. Each plate belongs to one **concept** (one atomic idea with one gloss), concepts are grouped in **topics**, and topics make a **language**. Your job is to write the content for languages: the topics, concepts and code blocks. You do not touch the app.

### A2. What you return for each language

Reply with these files, each in its own fenced code block, with the path on the line above it:

| file | when |
|---|---|
| `packs/{id}/content.txt` | always |
| `packs/{id}/meta.json` | new languages (batches 2 to 6). For the five registered languages, only `{"indent": N}` using the indent in part C |
| `packs/{id}/lexer.mjs` | new languages that do not reuse an existing lexer |
| `packs/{id}/NOTES.md` | always, 3 lines: toolchain and version used to verify, how, anything unverified |

For the five languages that are already registered (sql, bash, java, powershell, dart) the pack is `content.txt`, `NOTES.md` and a one-line `meta.json` holding the indent. If the reply would be too long, send topics 1 to 7 first, then say what comes next; parts of `content.txt` can simply be joined end to end.

Do not edit, quote or rewrite any other project file, and do not change the engine to make a language fit. If something cannot be expressed, say what is missing in `NOTES.md`.

### A3. `content.txt` format

Plain text, line based. Write the code exactly as you would in a file: no escaping, no JSON, no backticks around it.

```
@@T basics | basics
@@C val-var | val and var | 1 | Binds a name to a value with val or var.
@@E
val city = "Oslo"
var visits = 0
@@N val ==> cannot be reassigned
@@N var ==> can be reassigned
@@E
val limit = 10
var attempts = limit
@@E
val names = listOf("ada", "grace")
var current = names.first()
@@N listOf ==> a read-only list
```

- `@@T id | title` starts a topic. `id` is lowercase with hyphens. Topics are numbered automatically in the order you write them.
- `@@C id | title | level | gloss` starts a concept inside that topic. `level` is 1, 2 or 3.
- `@@E` starts one example. Every line after it is code, up to the next `@@` line.
- `@@N anchor ==> note` attaches a note. `anchor` must appear in the example's code exactly. If the anchor occurs twice and you mean the second one, write `@@N1`; `@@N2` means the third.
- A line that starts with `@@` is never code.

### A4. Hard rules (the validator enforces most of these)

**Shape.** Every topic has at least 3 concepts. Every concept has 3 or 4 examples that differ in context (different data, names or a small twist), not just in names. Follow the roster for your language: same topics, same order, same ids as slugs of the titles.

**Examples.** 1 to 12 lines, at most 72 columns, no blank line first or last, at most one blank line inside. One concept per example. Use the indent size given for the language, spaces only, never tabs (Go-style tabs are converted for you). Realistic names such as `users`, `prices`, `order`, `config`. Never `foo`, `bar` or `baz`. **No code comments inside examples.** Meaning goes in the gloss and notes.

**Gloss.** One sentence, 90 characters or fewer, present tense, starts with a verb that ends in "s" followed by a space (`Builds`, `Binds`, `Handles`, `Reads`). Do not put a comma after the first word. Never start with "This code". Ends with a period. No exclamation mark.

**Notes.** 0 to 3 per example. At most 40 characters. A lowercase fragment, not a sentence, no trailing period, no exclamation mark. Example: `source: 0 to 9`.

**Copy.** No exclamation marks, no emoji, no praise words anywhere.

**Currency.** Valid, idiomatic and current for the stated version. Prefer modern syntax over legacy forms. Do not use deprecated or removed APIs.

**Imports.** Include an import only in the concept that teaches imports, or when the example makes no sense without it. Library packs (react, django, fastapi, express) may assume the framework's usual imports and say so in the first concept's gloss or notes.

**Verification.** Every example should compile or run with the real toolchain listed for the language. Anything an example uses must be defined in the example itself. If you cannot run a toolchain, use only stable, documented APIs, and write "unverified" in `NOTES.md`. Never claim a check you did not run.

### A5. `meta.json` (new languages only)

Copy the line for your language from part C. Fields: `name`, `short` (1 to 3 capitals, shown in plate labels like `KT · 03 · 02 · b`), `version`, `indent`, `pigment` (light and dark hex, already contrast-checked), and for libraries `family` and `lexer`.

```json
{
  "name": "Kotlin",
  "short": "KT",
  "version": "2.0",
  "indent": 4,
  "pigment": { "light": "#B21FB2", "dark": "#E670E6" }
}
```

The version is a floor. If your toolchain reports a newer stable release, use that version number in `meta.json` and in your examples, and say so in `NOTES.md`.

### A6. `lexer.mjs` (new languages without a reusable lexer)

The lexer only colors code into seven classes: whitespace, identifier, keyword, number, string, comment and punctuation. It is a small config, not a parser. Export one object:

```js
export default {
  keywords: ["fun", "val", "var", "if", "else", "when", "for", "while", "return", "class", "null", "true", "false"],
  lineComment: "//",
  blockComment: ["/*", "*/"],
  strings: { quotes: ['"""', '"', "'"], prefix: /^$/ },
  numberRe: /(?:0[xX][0-9a-fA-F_]+|\d[\d_]*(?:\.\d+)?)(?:[uUlLfF])?/y,
  clusters: ["?.", "?:", "->", "::", "..", "==", "!=", "<=", ">=", "&&", "||"]
};
```

Supported options:

| option | meaning |
|---|---|
| `keywords` | words colored as keywords. List every reserved word and the common built-in constants |
| `softKeywords` | keywords only in statement position, such as Python `match` |
| `ignoreCase` | match keywords without regard to case (SQL, PowerShell) |
| `lineComment`, `blockComment` | `"//"`, `["/*", "*/"]`; use `null` for none |
| `commentBoundary` | a line comment starts only at the start of a word (shell `#`, so `$#` stays code) |
| `directives` | a `#` at the start of a line is a directive (C-style) |
| `strings.quotes` | quote strings, longest first, such as `['"""', '"', "'"]` |
| `strings.prefix` | regex for allowed prefixes such as `r` or `b`; use `/^$/` for none |
| `strings.rawQuotes` | quotes whose strings have no escapes |
| `strings.escape` | escape character if it is not a backslash |
| `strings.multiline` | single-character quotes that may span lines (JavaScript backtick) |
| `strings.rawHash` | Rust-style raw strings with hashes |
| `numberRe` | one sticky regex (flag `y`) that matches a whole numeric literal with suffixes |
| `clusters` | multi-character operators, longest first. They are lexed as one unit |
| `lifetimes`, `regexLiterals`, `dashWords` | special cases for Rust, JavaScript and PowerShell |

`clusters` matter most for typing practice: list every multi-character operator the language really uses. For markup such as HTML and CSS, treat tag names or property names as `keywords` and let attributes fall through as identifiers. If a language truly cannot be colored this way, keep it simple and note what is missing.

### A7. Validator checklist before you send

1. Every topic has 3 or more concepts, every concept 3 or 4 examples.
2. Every anchor is an exact substring of its code. Use `@@N1` for a second occurrence.
3. No line is longer than 72 characters. No example is longer than 12 lines. At most one blank line.
4. Glosses: verb ending in "s" first, no comma after it, 90 characters or fewer, one sentence.
5. Notes: lowercase fragment, 40 characters or fewer.
6. No `foo`, `bar`, `baz`. No exclamation marks in glosses or notes. No code comments.
7. Topic titles and order match the roster.

### A8. The prompt to paste

> You are building language packs for platen, a typing trainer for programmers. Read the spec above carefully. Build these four languages, one per reply, in this order: **LANG1, LANG2, LANG3, LANG4**. For each, return exactly the files listed in A2, each in its own code block with its path on the line above. Follow the roster and the metadata for that language from part C. Verify the examples with the real toolchain when you can. Before you send, check your work against A7. Do not add code comments inside examples. Do not edit any other file. When a language is done, say "ready for the next one" and wait.

---

## Part B: how to merge what comes back

1. Create `packs/{id}/` and put the returned files in it.
2. Run `node tools/install_pack.mjs packs/{id}`. It adds the language to the registry, adds the pigment, adds the lexer (if the pack has one), writes `data/languages/{id}.js`, runs the validator and a lexer smoke test on every example, and rolls back on any failure.
3. Use `--replace` to install a corrected version of a language that is already installed.
4. Serve the folder and open `#/index/{id}` to look at it.

---

## Part C: the batches

Every roster is the minimum: the listed topics, in order, at least 3 concepts each. Targets for `version` are floors, see A5.

### Batch 1: already registered (`content.txt`, `NOTES.md` and `meta.json` with only the indent)

| id | name | version | indent | verify with |
|---|---|---|---|---|
| sql | SQL | ANSI-style | 2 | every example must run on both SQLite and DuckDB. `tools/preludes/sql.sql` defines the tables (customers, orders, products, order_items, employees) and `python3 tools/check_sql.py` runs them |
| bash | Bash | 5.x | 2 | `bash -n` and a real run |
| java | Java | 21 | 4 | `javac` |
| powershell | PowerShell | 7.x | 4 | `pwsh` if available, otherwise unverified |

**sql** (16): 01 SELECT & WHERE · 02 ORDER BY & LIMIT · 03 aggregates & GROUP BY · 04 HAVING · 05 joins · 06 subqueries · 07 CTEs · 08 window functions · 09 CASE · 10 INSERT, UPDATE, DELETE · 11 CREATE TABLE & constraints · 12 indexes & EXPLAIN · 13 NULL handling · 14 set operations · 15 dates & strings · 16 transactions. Keep dates as ISO text strings and use only syntax both engines accept (no `EXTRACT`, no `ILIKE`, no `SAVEPOINT`).

**bash** (14): 01 variables & quoting · 02 conditionals & tests · 03 loops · 04 functions · 05 arrays · 06 parameter expansion · 07 pipes & redirects · 08 grep, sed, awk · 09 find & xargs · 10 arguments & getopts · 11 exit codes & strict mode · 12 here-docs & process substitution · 13 traps · 14 arithmetic.

**java** (16): 01 basics & types · 02 strings · 03 arrays & ArrayList · 04 HashMap & collections · 05 classes & objects · 06 interfaces & polymorphism · 07 records · 08 enums · 09 generics · 10 lambdas & streams · 11 Optional · 12 exceptions · 13 switch expressions & pattern matching · 14 sealed types · 15 text blocks & var · 16 concurrency basics.

**powershell** (16): 01 variables & types · 02 strings & here-strings · 03 arrays & hashtables · 04 the pipeline · 05 Where-Object & Select-Object · 06 loops & ForEach-Object · 07 functions & parameters · 08 if & switch · 09 try, catch, finally · 10 files & paths · 11 Get-ChildItem · 12 Sort-Object & Group-Object · 13 CSV & JSON · 14 regular expressions · 15 classes · 16 modules.

### Batch 2

`dart` is already registered. The other three are new: use the `meta.json` lines below.

| id | verify with |
|---|---|
| dart | `dart analyze` if a toolchain is available, otherwise unverified |
| kotlin | `kotlinc` |
| swift | `swiftc` |
| php | `php -l` and a real run |

```
dart: {"indent":2}
kotlin: {"name":"Kotlin","short":"KT","version":"2.0","indent":4,"pigment":{"light":"#B21FB2","dark":"#E670E6"}}
swift: {"name":"Swift","short":"SW","version":"5.10","indent":4,"pigment":{"light":"#157915","dark":"#22C322"}}
php: {"name":"PHP","short":"PHP","version":"8.3","indent":4,"pigment":{"light":"#A44E46","dark":"#CD8F89"}}
```

**dart** (15): 01 variables & null safety · 02 strings · 03 List, Map, Set · 04 functions & named parameters · 05 classes & constructors · 06 inheritance & mixins · 07 Future & async/await · 08 Streams · 09 records & patterns · 10 enums & switch expressions · 11 extension methods · 12 generics · 13 exceptions · 14 StatelessWidget · 15 StatefulWidget & setState.

**kotlin** (14): 01 val, var & types · 02 strings & templates · 03 null safety · 04 functions & default arguments · 05 lambdas & higher-order functions · 06 List, Map, Set · 07 collection operations · 08 classes & properties · 09 data classes · 10 sealed classes & when · 11 interfaces & objects · 12 extension functions · 13 scope functions · 14 coroutines basics.

**swift** (14): 01 let, var & types · 02 strings · 03 optionals · 04 control flow & switch · 05 functions & labels · 06 closures · 07 arrays, dictionaries, sets · 08 structs · 09 classes & ARC · 10 enums & associated values · 11 protocols & extensions · 12 generics · 13 error handling · 14 async/await.

**php** (14): 01 variables & types · 02 strings & interpolation · 03 arrays · 04 control flow & match · 05 functions & arrow functions · 06 classes & constructor promotion · 07 interfaces & traits · 08 enums · 09 namespaces & autoloading · 10 null-safe & null coalescing · 11 exceptions · 12 PDO & prepared statements · 13 files & JSON · 14 readonly & type declarations.

### Batch 3

| id | verify with |
|---|---|
| ruby | `ruby -c` and a real run |
| r | `Rscript` |
| julia | `julia` |
| haskell | `ghc` or `runghc` |

```
ruby: {"name":"Ruby","short":"RB","version":"3.3","indent":2,"pigment":{"light":"#766532","dark":"#B49B50"}}
r: {"name":"R","short":"R","version":"4.4","indent":2,"pigment":{"light":"#4E6F20","dark":"#7DB234"}}
julia: {"name":"Julia","short":"JL","version":"1.10","indent":4,"pigment":{"light":"#C72331","dark":"#E9818A"}}
haskell: {"name":"Haskell","short":"HS","version":"9.8","indent":2,"pigment":{"light":"#BA2194","dark":"#E774CA"}}
```

**ruby** (14): 01 variables & types · 02 strings & symbols · 03 arrays · 04 hashes · 05 blocks, procs & lambdas · 06 Enumerable · 07 methods & keyword arguments · 08 classes & modules · 09 attr accessors & visibility · 10 mixins & Comparable · 11 exceptions · 12 pattern matching · 13 string formatting · 14 files & Struct.

**r** (13): 01 vectors & types · 02 vectorised operations · 03 lists · 04 data frames · 05 indexing & subsetting · 06 factors · 07 functions & control flow · 08 the apply family · 09 strings & regex · 10 missing values · 11 base plotting · 12 pipes & functional tools · 13 S3 classes. Base R only, no tidyverse.

**julia** (13): 01 variables & types · 02 strings · 03 arrays & ranges · 04 Dict, Tuple, Set · 05 functions & multiple dispatch · 06 control flow & comprehensions · 07 structs & mutability · 08 abstract & parametric types · 09 broadcasting · 10 macros basics · 11 modules & packages · 12 error handling · 13 iterators.

**haskell** (13): 01 values & types · 02 functions & currying · 03 lists & comprehensions · 04 pattern matching & guards · 05 where & let · 06 data types & records · 07 type classes · 08 Maybe & Either · 09 map, filter, fold · 10 functors & monads basics · 11 IO & do notation · 12 modules & imports · 13 lazy evaluation. Examples are plain Haskell 2010 plus common GHC extensions only.

### Batch 4

| id | verify with |
|---|---|
| elixir | `elixirc` or `elixir` |
| zig | `zig ast-check` or `zig build-obj` |
| scala | `scala-cli` or `scalac` (Scala 3) |
| perl | `perl -c` and a real run |

```
elixir: {"name":"Elixir","short":"EX","version":"1.16","indent":2,"pigment":{"light":"#9D26D9","dark":"#C886EA"}}
zig: {"name":"Zig","short":"ZG","version":"0.13","indent":4,"pigment":{"light":"#8B5D3C","dark":"#C39574"}}
scala: {"name":"Scala","short":"SC","version":"3.4","indent":2,"pigment":{"light":"#31725C","dark":"#4BAF8E"}}
perl: {"name":"Perl","short":"PRL","version":"5.38","indent":4,"pigment":{"light":"#7C54B6","dark":"#AD94D1"}}
```

**elixir** (13): 01 values & types · 02 pattern matching · 03 functions & the pipe operator · 04 lists, tuples, keyword lists · 05 maps & structs · 06 Enum & Stream · 07 case, cond, with · 08 modules & guards · 09 recursion · 10 processes & messages · 11 GenServer · 12 Task & Agent · 13 protocols & behaviours.

**zig** (12): 01 values & types · 02 control flow · 03 functions · 04 arrays & slices · 05 structs & methods · 06 enums & unions · 07 optionals · 08 error unions & try · 09 pointers · 10 allocators & defer · 11 comptime · 12 testing. Zig changes quickly: state the exact compiler version in `NOTES.md` and `meta.json`.

**scala** (13): Scala 3 syntax. 01 val, var & types · 02 strings & interpolation · 03 collections · 04 functions & lambdas · 05 case classes · 06 pattern matching · 07 traits & classes · 08 enums & ADTs · 09 Option, Either, Try · 10 for-comprehensions · 11 given & using · 12 extension methods · 13 Future.

**perl** (12): 01 scalars & strings · 02 arrays & hashes · 03 control flow · 04 subroutines · 05 references · 06 regular expressions · 07 file I/O · 08 string functions & sprintf · 09 modules & use · 10 packages & bless · 11 sort, map, grep · 12 here-docs & context. Use `use strict` and `use warnings` style.

### Batch 5: markup, config and command languages

| id | verify with |
|---|---|
| html | an HTML parser (python `html.parser` or html5lib) or the W3C validator |
| css | a CSS parser such as csstree or lightningcss |
| dockerfile | hadolint or the Dockerfile parser; a real build is not needed |
| git | run in a throwaway repository with a recent git |

```
html: {"name":"HTML","short":"HT","version":"5","indent":2,"pigment":{"light":"#616B2E","dark":"#98A848"}}
css: {"name":"CSS","short":"CSS","version":"2024","indent":2,"pigment":{"light":"#227730","dark":"#35B64A"}}
dockerfile: {"name":"Dockerfile","short":"DK","version":"26","indent":2,"pigment":{"light":"#A64E30","dark":"#D68A71"}}
git: {"name":"Git","short":"GIT","version":"2.x","indent":4,"lexer":"bash","pigment":{"light":"#865F27","dark":"#CA9449"}}
```

`git` reuses the bash lexer, so it needs no `lexer.mjs`. `html`, `css` and `dockerfile` each need their own `lexer.mjs`.

**html** (12): 01 document skeleton · 02 text & headings · 03 links & images · 04 lists · 05 tables · 06 forms · 07 validation attributes · 08 semantic layout · 09 media & embeds · 10 data and aria attributes · 11 head & meta tags · 12 details, dialog, template.

**css** (13): 01 selectors · 02 box model · 03 colors & units · 04 typography · 05 flexbox · 06 grid · 07 positioning · 08 custom properties · 09 pseudo-classes & pseudo-elements · 10 media & container queries · 11 transitions & animations · 12 nesting, :is and :where · 13 clamp, aspect-ratio, logical properties.

**dockerfile** (12): 01 FROM & base images · 02 RUN & layers · 03 COPY & ADD · 04 WORKDIR, ENV, ARG · 05 CMD vs ENTRYPOINT · 06 EXPOSE & USER · 07 multi-stage builds · 08 layer caching & .dockerignore · 09 HEALTHCHECK · 10 VOLUME · 11 labels & build arguments · 12 shell vs exec form.

**git** (12): 01 init, add, commit · 02 status & diff · 03 log & show · 04 branches · 05 merge · 06 rebase · 07 remotes · 08 stash · 09 reset & restore · 10 tags · 11 cherry-pick & bisect · 12 config & aliases. Show the commands only, never their output.

### Batch 6: libraries

Libraries reuse an existing lexer, so none of them needs a `lexer.mjs`. They may assume the framework's usual imports. Each topic's first concept says so in its gloss or notes.

| id | verify with |
|---|---|
| react | esbuild or babel for the JSX, and `react-dom/server` for components that render |
| django | `pip install django`; run with a minimal configured settings module |
| fastapi | `pip install fastapi httpx`; run with `TestClient` |
| express | `npm i express`; `node --check` and a real request |

```
react: {"name":"React","short":"RX","version":"19","indent":2,"family":"javascript","lexer":"javascript","pigment":{"light":"#A84860","dark":"#CE8D9D"}}
django: {"name":"Django","short":"DJ","version":"5.1","indent":4,"family":"python","lexer":"python","pigment":{"light":"#BF227D","dark":"#E779B9"}}
fastapi: {"name":"FastAPI","short":"FA","version":"0.115","indent":4,"family":"python","lexer":"python","pigment":{"light":"#3D7515","dark":"#65C322"}}
express: {"name":"Express","short":"XP","version":"5.x","indent":2,"family":"javascript","lexer":"javascript","pigment":{"light":"#A4467D","dark":"#CD89B0"}}
```

**react** (14): 01 components & JSX · 02 props · 03 useState · 04 events · 05 conditional rendering · 06 lists & keys · 07 useEffect · 08 useRef · 09 useMemo & useCallback · 10 context · 11 useReducer · 12 custom hooks · 13 forms & controlled inputs · 14 Suspense & data loading. Function components only.

**django** (14): 01 models & fields · 02 ORM queries · 03 filters & lookups · 04 relationships · 05 migrations & manage.py · 06 function views · 07 URLs · 08 templates · 09 forms & ModelForms · 10 admin · 11 class-based views · 12 middleware & signals · 13 settings · 14 testing.

**fastapi** (12): 01 app & routes · 02 path & query parameters · 03 request bodies & Pydantic · 04 response models · 05 status codes & errors · 06 dependencies · 07 async endpoints · 08 background tasks · 09 middleware & CORS · 10 routers · 11 file uploads · 12 testing with TestClient.

**express** (12): 01 app & listen · 02 routes & methods · 03 params & query · 04 middleware · 05 JSON bodies · 06 static files · 07 routers · 08 error handling · 09 cookies & sessions · 10 CORS & headers · 11 async handlers · 12 response helpers.

---

## Part D: sizes and order

Plan on roughly 12 to 16 topics, 3 to 4 concepts per topic, 3 examples per concept: about 130 to 200 plates per language. Batches 1 and 2 are the best first wave, because the registry, pigments and lexers for most of batch 1 already exist. Batch 6 libraries are quick once Python and JavaScript are in place.
