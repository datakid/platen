# platen

A quiet typing trainer for code. One short idiomatic block (a plate) at a time. Static site, vanilla ES modules, no build step.

Run it with any static server from this folder, for example `python3 -m http.server`, then open `index.html`.

## Status

- P0 shell: done
- P1 engine with Python 01–03: done
- P2 identity layer: done
- P3 content: in progress, one data file per pass (python: 21 topics, 273 plates; c: 14 topics, 180 plates; cpp: 18 topics, 225 plates; pandas: 16 topics, 198 plates; numpy: 15 topics, 198 plates; sklearn: 14 topics, 165 plates; polars: 15 topics, 210 plates; lua: 15 topics, 210 plates)
- P4 drill/sprint/stats, P5 recall and polish: remaining

## Features

- Theme: system, light, dark. Set before first paint from `platen:v1`. The `◐` button cycles it.
- Typing engine: hidden textarea input via `beforeinput`, flow and strict error modes, auto-indent skip, comment skip, backspace across lines, `ctrl/alt+backspace` token delete, develop effect, crop-mark lock, inline result.
- Focus mode: header and hints fade to 12% while typing, mouse movement restores them.
- Marginalia: notes in a right-hand margin at 1280px and wider, joined to their tokens by SVG leader lines; the note under the caret turns to full ink and its leader to the pigment. Below 1280px the notes become a numbered list with superscript markers. The notes setting is always, after finish or off.
- Tape: a 28px canvas along the bottom edge, one tick per keystroke (taller is faster, errors drop below the baseline in the error color).
- Proof view: opens after the last variant of a concept. Numerals, expanded tape with the wpm line, plate thumbnails with error dots, hesitation table, token-class accuracy, next concept, again, drill.
- Settings: every row cycles on click, Enter or the arrow keys. Export json, import json (merge with an inline confirmation), reset (type reset to confirm).
- Command palette: Ctrl or Cmd plus K. Fuzzy search over languages, topics and concepts, plus commands such as theme dark, font 20, drill python, sprint python 60.
- Index: language list with a progress strip per language (new, seen, learned), and a per-language table of contents with dotted leaders and best wpm.
- Below 760px or on touch-only devices the typing view is read-only with a keyboard note.

## Routes

| route | view |
|---|---|
| `#/` | resume cursor, or first Python plate |
| `#/t/{lang}/{topic}/{concept}/{variant}` | typing |
| `#/index`, `#/index/{lang}` | index |
| `#/proof/last` | proof of the last concept session |
| `#/settings` | settings |
| `#/drill/{lang}`, `#/sprint/{lang}[/{topic}]/{secs}`, `#/recall/{lang}/{topic}/{concept}`, `#/stats[/{lang}]` | placeholders |

## Keys

`esc` restart plate · `enter` next after finish · `ctrl ← →` previous or next plate · `ctrl+k` palette · `ctrl+,` settings · `tab` indent unit when auto-indent skip is off.

## Storage

One key, `platen:v1`, written debounced (500ms) and on `visibilitychange`. Shape: `v`, `settings`, `cursor`, `last` (the session behind the proof view), `plates`, `units`, `sessions` (last 500). Plate ids are `lang/topic/concept/variantIndex`. A corrupt value is copied to `platen:v1:corrupt` before defaults are used. Migrations go in `migrations` in `js/store.js`.

## Content format

`data/languages/{id}.js` exports `{ id, name, short, pigment, family, version, lexer, indent, topics }`. Topics hold concepts, concepts hold 2–4 `examples` of `{ code, notes: [{ at, text, nth? }] }`. Add a language by adding its data file, a lexer in `js/engine/langs.js`, a pigment in `css/tokens.css`, and its id to `READY` in `js/content/registry.js`.

## Content tools

- `node tools/validate.mjs [id ...]` checks data files against the authoring rules (anchors, columns, lines, glosses, notes, ids, version traps) and exits non-zero on any issue. `tools/validate.html` shows the same report in a browser (serve the folder, open it by URL).
- `python3 tools/check_python.py [id ...]` parses every snippet with Python's own parser. Use it for python, pandas, polars, numpy, pytorch and sklearn.
- `python3 tools/run_lua.py [prefix ...]` runs every Lua snippet with `lua5.4` (a small `mathx.lua` module is placed in the working directory for the `require` plates) and reports any that raise an error.
- `python3 tools/check_c.py c` and `python3 tools/check_c.py cpp` compile every snippet with gcc (`-std=c17`) or g++ (`-std=c++20`) against a precompiled header of the common standard headers (there is no `using namespace std`, so every name must be qualified). A snippet passes if it compiles as a file or inside `main`, so each snippet declares what it uses. Pass topic or concept prefixes after the language to check a subset, for example `python3 tools/check_c.py cpp lambdas templates`. The full C++ run takes about 100 seconds on one core.
- `python tools/run_python.py pandas [prefix ...]` executes every snippet of a Python-library data file after a shared prelude in `tools/preludes/pandas.py` (a sample `df`, `customers`, `orders`, `left`, `right`, `ts` and some files), with all warnings turned into errors so deprecated idioms fail. Run it in an environment with the target versions installed: the pandas file was checked with pandas 2.2.3, NumPy 2.1.3 and pyarrow, and the NumPy file on both NumPy 2.1.3 and 2.4.4. NumPy snippets are self-contained, so their prelude only imports numpy. The scikit-learn file was checked on scikit-learn 1.5.2 (with SciPy 1.14, since 1.5 warns on newer SciPy) and on 1.8.0; its prelude supplies the imports plus `X`, `y`, `X_train` and friends, a regression set, a DataFrame `df` and some prediction arrays. The polars file was checked on polars 1.44.2 and on 2.1.0 (the plan says 1.x; 2.x is out, and every plate passes on both).
- `match`, `case` and `type` are soft keywords: the lexer colors them only in statement position.

## Contrast adjustments

The plan's `--ghost`, `--ink-3` and five light-theme pigments did not meet the plan's own 3:1 and 4.5:1 targets, so they were adjusted: ghost `#8D877A` / `#5D6068`, ink-3 `#6E6B64` / `#797C83`, python `#8B650A`, go `#0A767B`, csharp `#2C784B`, pytorch `#C0400C`, sklearn `#AD5009`.

## Remaining work

- P3: four more data files (go, rust, csharp, pytorch), each with its lexer where needed and a registry entry in `READY`
- P4: unit EWMA, drill, sprint, stats trend and keyboard heatmap, hesitations
- P5: recall mode, shortcut sheet, export/import, README polish

## After the plan is finished

- Content refresh: update the Python material to current syntax and version (the data file still says 3.12), add plates for newer features, and check the library and language topics against current docs before writing them
