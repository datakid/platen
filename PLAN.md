# platen — build plan

> A quiet typing trainer for code. You learn a language by typing its idioms, one atomic block at a time.
> Think Monkeytype's focus plus keybr's adaptive drills, made for code instead of prose.

This file is the full spec for the implementing model. Follow it literally. If something is unclear, pick the **quieter, simpler, more typographic** option.

---

## 0. Product in one paragraph

`platen` shows one short, idiomatic code block (a **plate**) at a time. The text starts out faint. As you type it correctly, each character turns to full ink and then gets its syntax color. A one-sentence **gloss** says what the block does. Small **notes** in the margin explain individual tokens, connected to them by hairline leader lines. Each block teaches exactly one concept, and every concept has 2–4 example variants so it sticks through repetition. Languages: Python, Lua, Go, Rust, C, C++, C#. Libraries: pandas, polars, NumPy, PyTorch, scikit-learn. No compilers, no accounts, no backend. Progress lives in `localStorage`. The app never congratulates, nags, jokes or uses emoji.

---

## 1. Hard constraints

- Static site: `index.html`, plain CSS, vanilla ES modules. **No frameworks, no Tailwind, no build step, no icon libraries, no chart libraries.** Hand-built SVG and canvas only. Google Fonts is the only external dependency.
- Load content per language with lazy `import()` of `data/languages/*.js` modules (`export default {...}`).
- Hash router (`#/...`) so every route works on static hosting.
- All state in `localStorage` under a single versioned key `platen:v1` (see §9). Never clear it. Any future schema change gets a non-destructive migration.
- Desktop-first. Mobile can browse the index and settings, and gets a quiet note on typing views (§13).
- Keep `README.md` current: features, routes, storage, content format, remaining work.

---

## 2. Voice and copy rules (strict)

The app is **silent by default**. Copy is functional and lowercase, like a man page.

- No exclamation marks. No emoji. No "Great job", "Nice!", "Keep it up", "You're on fire", no streaks, no badges, no toasts, no confetti, no mascots.
- UI labels are lowercase single words where possible: `index`, `stats`, `settings`, `drill`, `sprint`, `recall`, `again`, `next`.
- Numbers speak for themselves: `64 wpm · 97.8% · 0:38`.
- Idle hint: `start typing`. Focus lost: `click or press any key`. Empty stats: `no data yet`.
- Gloss rules: one sentence, ≤ 90 chars, present tense, starts with a verb, never "This code…". Example: `Builds a new list by transforming each item of an iterable.`
- Note rules: ≤ 40 chars, a lowercase fragment, 0–3 per plate. Example: `source: 0 to 9`.

---

## 3. Visual identity — "the plate system"

The identity borrows from **print production and engineering drawings**: proof sheets, crop marks, plate numbers, marginalia, hairline rules, tabular figures. Nothing glows, nothing is rounded, nothing floats on a shadow. The code is the artwork and the chrome is a print shop's frame around it.

### 3.1 Signature elements (all five are required, they make up the identity)

1. **Plates and crop marks.** Every block is a numbered *plate*: `PY·09·01·b` = language · topic · concept · variant. The typing area has no box or border. It's framed only by four L-shaped **crop marks** (12px arms, 1px hairline, offset 16px outside the code area's corners). When a plate is finished, the marks slide 4px inward and turn the language pigment (160ms ease-out). That's the only "success" signal.
2. **Develop.** Untyped text is `--ghost` and monochrome. A correctly typed character turns `--ink` right away, then fades to its syntax color over 240ms, like a photo developing. The code literally comes into color as you type it. Errors appear in `--error` with a 2px underline.
3. **Marginalia.** Notes sit in a right-hand margin column, set in a serif italic, each joined to its token by a hairline **leader line** (SVG, elbow path: horizontal out of the token, then into the note). Notes are dim (`--ink-3`) by default. The note for the token the caret is inside becomes `--ink` and its leader line turns pigment.
4. **The tape.** A 28px-tall strip along the bottom of the typing view works like a seismograph. Each keystroke adds a 1px vertical tick: height = speed (shorter latency means a taller tick), errors drop below the baseline in `--error`. It scrolls left as you type. On the results view it expands to 140px and overlays a per-second wpm line.
5. **Pigments.** Each language has exactly **one pigment**, used sparingly: the caret, the active line tick, keywords once developed, crop marks on completion, progress squares, the active note's leader line. Everything else is greyscale ink on paper/carbon.

### 3.2 Hard "never" list

No gradients, glassmorphism, drop shadows, glow, border-radius above 0 (everything is square), no cards with backgrounds, no icons except text glyphs (`◐ ⌘ ↵ ⇥ · → ←`) or tiny inline SVG for crop marks and the keyboard. No hover scale effects, no bouncing, no skeleton shimmer.

### 3.3 Color tokens (`css/tokens.css`)

Themes: `system` (default, follows `prefers-color-scheme`), `light` ("paper") and `dark` ("carbon"). Set via `<html data-theme="light|dark">`. A tiny inline script in `<head>` reads `platen:v1` and sets the attribute before first paint, so there's no flash.

| token | paper (light) | carbon (dark) | use |
|---|---|---|---|
| `--bg` | `#EFEDE8` | `#0F1012` | page |
| `--bg-2` | `#E7E4DD` | `#15171A` | rare insets (palette, kbd keys) |
| `--ink` | `#141414` | `#ECEAE4` | typed text, primary |
| `--ink-2` | `#55534E` | `#9A978F` | secondary labels, gloss |
| `--ink-3` | `#8A867E` | `#6A6D73` | tertiary, dim notes |
| `--ghost` | `#A9A59B` | `#474A50` | untyped code (must stay ≥ 3:1 vs bg) |
| `--rule` | `#D6D2C8` | `#24272C` | hairlines, indent guides |
| `--rule-2` | `#BDB8AC` | `#34383E` | crop marks, leader lines |
| `--error` | `#C8321B` | `#FF5A3C` | wrong chars, error ticks |
| `--select` | `rgba(20,20,20,.08)` | `rgba(236,234,228,.08)` | palette highlight |

**Pigments** (`--pg` gets set on `<main>` per language; light / dark):

| lang | name | light | dark |
|---|---|---|---|
| python | ochre | `#A87A0C` | `#E2B54A` |
| lua | indigo | `#3646B0` | `#8C9CFF` |
| go | teal | `#0B7F84` | `#4FD0D4` |
| rust | oxide | `#B0441A` | `#F27C4B` |
| c | graphite | `#4A505A` | `#AEB6C2` |
| cpp | plum | `#863A75` | `#DB8CC8` |
| csharp | viridian | `#2D7A4C` | `#6FD49B` |
| pandas | aubergine | `#5E3F8F` | `#B79BF2` |
| polars | cobalt | `#1F5FB8` | `#6FA8FF` |
| numpy | steel | `#3B6A86` | `#7FB6D6` |
| pytorch | ember | `#C2410C` | `#FF8A4C` |
| sklearn | amber | `#B45309` | `#F5B041` |

**Syntax roles after develop** (restrained, only 6 roles):
- `keyword` → `--pg`, weight 500
- `string` → `--ink` at 78% opacity, or a muted pigment mix: `color-mix(in oklab, var(--pg) 45%, var(--ink))`
- `number` → `color-mix(in oklab, var(--pg) 65%, var(--ink))`
- `comment` → `--ink-3`, italic
- `punct/operator` → `--ink-2`
- `ident` (default) → `--ink`

### 3.4 Typography

Load from Google Fonts: **Martian Mono** (variable, wght 100–800, wdth 75–112.5), **JetBrains Mono** (400/500, italic), **Newsreader** (italic, opsz).

| role | font | spec |
|---|---|---|
| UI labels, nav, plate numbers | Martian Mono | 11px, wdth 87.5, wght 400, uppercase for plate numbers only, letter-spacing .06em |
| big numerals (wpm etc.) | Martian Mono | wdth 75, wght 200, `font-variant-numeric: tabular-nums`, 56px on results, 28px inline |
| code | JetBrains Mono (default) | 18px default (setting 14–24), line-height 1.75, **ligatures off** (`font-variant-ligatures: none`) |
| gloss and notes | Newsreader italic | gloss 18px `--ink-2`, notes 14px `--ink-3` |
| plate title | code font | 20px `--ink` |

Code font options in settings: JetBrains Mono, IBM Plex Mono, Geist Mono, Fira Code (ligatures still off). Wordmark: `platen` in Martian Mono wght 500, followed by a 2px × 1em pigment caret bar that blinks slowly (1.2s) only on the index page.

Favicon: inline SVG, four crop marks around a vertical bar.

### 3.5 Space, grid, motion

- 4px base unit. Hairlines are always 1px, never 2px (except the caret and error underline).
- Typing view columns (≥ 1280px): `gutter 6ch | code (max 84ch) | 3ch gap | margin 30ch`, centered as a group. Below 1280px the margin column collapses and notes appear as a numbered list under the plate, with superscript markers on the tokens instead of leader lines.
- Motion: 120ms `cubic-bezier(.2,.0,.0,1)` for UI, 60ms linear for caret travel (setting: smooth on/off), 240ms for develop. Under `prefers-reduced-motion`, everything is instant.
- **Focus mode** (default on): once typing starts, the header, mode bar and footer fade to 12% opacity. Mouse movement brings them back.

---

## 4. Layout of each view

### 4.1 Header (48px, hairline bottom border `--rule`)

```
platen▏   python / comprehensions / list comprehension · b        blocks  drill  sprint  recall    index  stats  ◐  ⌘k
```
- The breadcrumb segments are links (language → index/lang, topic → topic TOC).
- Modes are plain text. Active = `--ink` with a 1px pigment underline 6px below. Inactive = `--ink-3`.
- `◐` cycles system → light → dark and shows a tiny label (`sys`/`light`/`dark`) for 1s.

### 4.2 Typing view (`#/t/...`) — the main screen

```
            PY · 09 · 01 · b                                         level 1    a ● b ○ c
            list comprehension
            Builds a new list by transforming each item of an iterable.

        ┌                                                                        ┐
     1  │ upper = [s.upper() for s in words if s]  ───────────────┐                
     2  │                                                         └─  skips empty strings
        └                                                                        ┘

            64 wpm · 97.8% · 0:38                                     (dim, shows only after typing starts)

  ▁▂▃▂▅▃▂▁▃▅▆▃▂▁▂▃│▂▃▅▃▂▁   (tape)
            esc again · ⏎ next · ctrl ← → plates · ⌘k jump                (footer hints, --ink-3, 11px)
```
- Gutter: line numbers in `--ghost`. The current line number is `--ink` with a 1px × line-height pigment tick to its left.
- Indent guides: 1px `--rule` vertical lines at each indent level.
- Whitespace marks (setting, default on): a dim `↵` at the end of the current line only. Leading indentation that gets auto-skipped shows as faint `·` dots.
- Variant dots `a ● b ○ c`: filled pigment = completed, ring = not yet, underline = current.

### 4.3 Inline result (after finishing a plate)

The live stat line turns into the result line, in place, no modal:
```
64 wpm     97.8% acc     0:38     symbols 92%     esc again   ⏎ next
```
Numerals in 28px Martian Mono thin. Crop marks lock (§3.1). If this was the last variant of a concept or the end of a sprint, `⏎` opens the **proof** view instead.

### 4.4 Proof view (`#/proof/last`) — session results

Named after a print proof. A single column, max 960px:
1. Big numerals row: `wpm`, `acc`, `raw`, `consistency`, `time`. 56px numerals with 11px labels underneath.
2. Expanded tape (140px canvas) with per-second wpm line in `--ink` and error ticks in `--error`.
3. **Plate thumbnails**: each plate in the session rendered as tiny code at 6px font, with errors as `--error` dots. Click one to retype it.
4. **Hesitations**: top 6 tokens/symbol clusters by mean pre-key latency, as a table (`->` 412ms, `::` 380ms…).
5. **Token-class accuracy**: keyword / ident / symbol / string / number / newline as horizontal 1px bars with percentages.
6. Actions: `⏎ next concept`, `esc again`, `d drill weak keys`.

### 4.5 Index (`#/index`, `#/index/{lang}`)

Styled like a book's table of contents or a type specimen catalog.
- `#/index`: one row per language/library. Pigment square (10×10) · short code (`PY`) · name · version (`3.12`) · topic count · a progress strip made of tiny 4×8 squares, one per concept (pigment = learned, `--rule-2` = seen, `--rule` = new). Group headers: `languages`, `libraries` (libraries show their parent: `pandas · py`).
- `#/index/python`: a two-column TOC. Topic numbers (`09`) and titles, concepts underneath with **dotted leaders** to their plate number and best wpm, as in a printed book: `list comprehension ........ 09·01   62`.

### 4.6 Stats (`#/stats`, `#/stats/{lang}`)

- Totals: time typed, plates done, concepts learned, best and average wpm.
- Trend: hand-built SVG line of wpm/acc over the last 50 sessions (hairline axes, no fills).
- **Keyboard heatmap**: US ANSI layout drawn in SVG with 1px `--rule-2` key outlines. Key fill = pigment at alpha proportional to error rate. Symbol keys show both glyphs. Hovering a key shows `{ 4.1% err · 288ms`.
- Hesitation table across all sessions for that language.

### 4.7 Settings (`#/settings`)

A plain list of `label ........ value` rows. Values cycle on click/Enter, like a terminal config.
- theme: system / light / dark
- code font: jetbrains / plex / geist / fira
- font size: 14–24
- caret: bar / block / underline · smooth: on/off
- error mode: **flow** (default) / strict
- auto-indent skip: on (default) / off
- comments: skip (default) / type
- notes: always / after finish / off
- live stats: on/off · tape: on/off · whitespace marks: on/off · focus mode: on/off
- sound: off (default) / soft click (a WebAudio click with a 3ms noise burst, very quiet)
- data: `export json` / `import json` (merge with confirmation, never silent overwrite) / `reset` (requires typing `reset` to confirm)

### 4.8 Command palette (`⌘K` / `Ctrl+K`)

The only overlay. Centered, 560px, `--bg-2`, 1px `--rule-2` border, no shadow. Fuzzy search over languages, topics, concepts (`py comp list`), plus commands (`theme dark`, `font 20`, `drill rust`, `sprint go 60`). Arrow keys to move, Enter to go, Esc to close.

---

## 5. Modes

1. **blocks** (default): go through a concept's variants a→b→c, then the next concept, then the next topic. Resume where you left off.
2. **drill** (keybr-like, adaptive): pick the 3 weakest units for the current language (§8.3) and build a 10-line plate from real lines in that language's corpus that contain them. The label shows the targets: `drill  ->  ::  &mut`.
3. **sprint**: 30 / 60 / 120s countdown (shown top-left of the plate in Martian Mono). Plates stream continuously from the chosen scope (language, topic, or all). Ends in proof.
4. **recall** (phase 5): the code is hidden. Only its *outline* shows: each char becomes a faint 1px baseline dash, and indent guides and line lengths stay visible. The gloss and notes are shown. Correct chars appear as you type them. A wrong key reveals the expected char in `--error` as a hint and counts as an error. This mode is for checking you actually remember the idiom.

---

## 6. Keyboard map

| key | action |
|---|---|
| any char | type (timer starts on the first keystroke) |
| `Enter` | newline (expected `\n`) / after finish: next |
| `Tab` | inserts the indent unit (only when auto-indent skip is off) |
| `Backspace` | delete previous char · `Ctrl/Alt+Backspace` delete to token start |
| `Esc` | restart current plate (`again`) / close palette |
| `Ctrl+→` / `Ctrl+←` | next / previous plate |
| `Ctrl/⌘+K` | palette |
| `Ctrl+,` | settings |
| `?` | shortcut sheet (only when not typing) |

---

## 7. Typing engine (`js/engine/`)

### 7.1 Input capture (`input.js`)
- A hidden `<textarea>` (opacity 0, 1×1px, moved to the caret position so IME candidates show up in the right place). Keep it focused whenever the typing view is active.
- Characters come from **`beforeinput`** (`insertText`, `insertLineBreak`, `deleteContentBackward`, `deleteWordBackward`). That supports AZERTY, dead keys and IME correctly. Use `keydown` only for `Tab`, `Esc` and shortcuts. Clear the textarea after every event.
- On blur: blur the code (`filter: blur(3px)`, 120ms) and show `click or press any key` centered in `--ink-3`.

### 7.2 Target model (`plate.js` build step)
Normalize code: tabs → indent unit spaces (Go: 4 cols), strip trailing whitespace, strip the final newline, `\r\n` → `\n`. Build an array of cells:
```
{ ch, line, col, cls: 'keyword|ident|string|number|comment|punct|ws|nl',
  cluster: '->' | null, skip: bool, noteIdx: number|null, state: 'pending' }
```
`skip = true` for leading indentation (if auto-indent skip is on) and for comment chars, plus the whitespace before an inline comment (if comments are set to skip). A line that's entirely skipped gets skipped along with its newline.

### 7.3 State machine
- `pos` always points at a non-skipped cell. Keystroke log entries: `{ t: performance.now(), pos, expected, got, ok }`.
- **flow**: a wrong key marks the cell `err` and advances. Backspace goes back to the previous non-skipped cell and resets it to `pending`. If it was `err`, remember it so a correct retype becomes `fixed`. Pressing a non-Enter key at end of line counts as an error and **does not advance** (no overflow text).
- **strict**: a wrong key doesn't advance. Log the error and briefly underline the cell in `--error` (120ms).
- The plate finishes when `pos` passes the last cell. In flow mode it finishes even if errors remain.

### 7.4 Rendering
- Render each plate once: one `<div class="ln">` per line, one `<span>` per cell carrying classes `c-{cls}` + `s-{state}`. Per keystroke, only toggle classes on the affected spans (O(1)). Never re-render the whole plate while typing.
- The caret is a single absolutely positioned element moved with `transform: translate(col*chW, line*lineH)`. Measure `chW` from a hidden 100-char span after `document.fonts.ready`. Re-measure on resize and on font or size change.
- Caret blinks only after 1s idle.
- Develop: `.s-ok` sets `color: var(--ink)`, then a 240ms transition to the role color via a `.dev` class added on the next frame.
- Leader lines: one SVG overlay over the code+margin area. Recompute paths on resize. Each note's anchor is the bounding box of its matched substring's spans.

### 7.5 Lexer (`lexer.js`)
Write a small, table-driven tokenizer, **not** a full parser. Per-language definitions (`js/engine/langs.js`):
```
{ keywords: [...], builtins: [...], lineComment: '#', blockComment: ['/*','*/'] | null,
  strings: ['"', "'", '"""', "'''", 'f"', 'r"'], rawStrings: ..., charLit: bool,
  clusters: ['->','::','=>',':=','==','!=','<=','>=','&&','||','<<','>>','**','//','+=','-=','..','...','?.','??','|>'] }
```
Libraries reuse the `python` lexer. Builtins (e.g. `pd`, `np`, `torch`, `pl`) are tagged `keyword`-adjacent if needed; just treat them as `ident` with `cluster` stats. Clusters are matched longest-first and used for hesitation stats.

---

## 8. Metrics (`metrics.js`)

### 8.1 Per plate
- `wpm = (correctCells / 5) / minutes`, where correctCells = non-skipped cells with final state `ok|fixed`. Newline counts as 1 char.
- `raw = (nonBackspaceKeystrokes / 5) / minutes`
- `acc = correctKeystrokes / nonBackspaceKeystrokes`
- `consistency = max(0, 100 * (1 - stdev/mean))` of per-second raw wpm
- `classAcc[cls]` and `symbols%` = acc over `punct` cells
- Latency per keystroke = `t - prevT` (drop the first one, cap at 2000ms)

### 8.2 Learned state
A concept counts as **learned** when every variant has been typed at least twice with acc ≥ 97%. Otherwise it's **seen** once typed, **new** before that.

### 8.3 Weak units (drill)
Per language, track an EWMA (α = 0.15) for each unit (single char, and each cluster): `err` (0/1) and `lat` (ms). Score = `0.6 * errEWMA/maxErr + 0.4 * latEWMA/maxLat`. A unit needs ≥ 20 samples to count. Drill generation: collect every line from that language's corpus (all variants) that's 15–70 chars and contains at least one target unit, rank them by target density, pick 10 without repeating the last 30 drill lines, and keep the original indentation stripped.

---

## 9. Storage (`store.js`)

One key, `platen:v1`, a JSON object, written debounced (500ms) and on `visibilitychange`:
```
{
  v: 1,
  settings: {...},
  cursor: { mode, lang, topic, concept, variant },
  plates: { "PY·09·01·b": { runs, bestWpm, bestAcc, lastAt, accHistory:[last 5] } },
  units:  { python: { "->": { n, err, lat }, "(": {...} } },
  sessions: [ { at, mode, lang, wpm, acc, raw, cons, ms, plates:[ids] } ]   // keep last 500
}
```
Plate IDs must be stable: they come from content IDs (`lang/topic/concept/variantIndex`), not array positions. Store the display number separately. Export/import works through settings (§4.7).

---

## 10. Content format (`data/languages/{id}.js`)

Hierarchy: **language → topic → concept → examples (variants)**. A concept is one atomic idea with one gloss. The examples are 2–4 different realistic blocks of that same idea.

```js
export default {
  id: "python", name: "Python", short: "PY", pigment: "python",
  family: null,              // libraries: "python"
  version: "3.12", lexer: "python", indent: 4,
  topics: [
    { id: "comprehensions", n: 9, title: "comprehensions",
      concepts: [
        { id: "list-comp", n: 1, title: "list comprehension", level: 1,
          gloss: "Builds a new list by transforming each item of an iterable.",
          examples: [
            { code: "squares = [n * n for n in range(10)]",
              notes: [{ at: "range(10)", text: "source: 0 to 9" }] },
            { code: "names = [user.name for user in users]", notes: [] },
            { code: "upper = [s.upper() for s in words if s]",
              notes: [{ at: "if s", text: "skips empty strings" }] }
          ] }
      ] }
  ]
};
```
`notes[].at` is a substring of the code. An optional `nth` (0-based) picks which occurrence.

### 10.1 Block authoring rules (enforce for every example)
- **One concept per block.** If you need two ideas, make two concepts.
- 1–12 lines, ≤ 72 columns, no blank lines at the start or end, at most one blank line inside.
- Must be **valid, idiomatic and current** for: Python 3.12, Lua 5.4, Go 1.22, Rust 2021 (stable), C17, C++20, C# 12 / .NET 8, pandas 2.2, polars 1.x, NumPy 2.x, PyTorch 2.x, scikit-learn 1.5.
- Version traps to avoid: pandas has no `DataFrame.append` (use `pd.concat`). Polars uses `group_by`, `with_columns`, `pl.col` and `unpivot` (not `groupby` or `melt`). NumPy uses `np.random.default_rng()`, not `np.random.seed`. Use `OneHotEncoder(sparse_output=False)`, `torch.inference_mode()`, and Go `for i := range 10` (1.22).
- Realistic names (`users`, `prices`, `df`, `model`), never `foo/bar`.
- Comments in code are allowed but sparse. Meaning goes in the gloss and notes.
- Variants should differ in context (data, names, a small twist), not just in names.
- Levels: 1 = core syntax, 2 = everyday idioms, 3 = advanced.
- Imports appear only in the concept that teaches imports, or when the block makes no sense without them (library blocks may assume `import pandas as pd` etc. and say so in the topic's first concept).

### 10.2 Topic rosters (MVP: every topic below, ≥ 3 concepts per topic, 3 examples per concept)

**Python 3.12** — 01 values & types · 02 strings & f-strings · 03 lists & slicing · 04 tuples & unpacking · 05 dicts · 06 sets · 07 conditionals & match · 08 loops (enumerate, zip, range) · 09 comprehensions · 10 functions (defaults, *args, **kwargs, keyword-only) · 11 lambdas & sorting (key=) · 12 classes · 13 dataclasses · 14 exceptions · 15 context managers · 16 generators & yield · 17 decorators · 18 typing (generics, Protocol, TypedDict) · 19 pathlib & files · 20 collections & itertools · 21 asyncio basics

**Lua 5.4** — 01 locals & types · 02 strings & concatenation · 03 tables as arrays · 04 tables as maps · 05 ipairs / pairs · 06 control flow · 07 functions & varargs · 08 multiple returns · 09 closures · 10 metatables · 11 OOP via metatables · 12 modules & require · 13 string patterns (gsub, gmatch) · 14 errors & pcall · 15 coroutines

**Go 1.22** — 01 packages & imports · 02 var, :=, const, iota · 03 types & zero values · 04 slices · 05 maps · 06 structs · 07 methods & receivers · 08 interfaces · 09 errors (wrap %w, Is, As) · 10 defer, panic, recover · 11 goroutines · 12 channels · 13 select · 14 sync (WaitGroup, Mutex) · 15 generics · 16 context · 17 encoding/json · 18 testing

**Rust 2021** — 01 bindings & mutability · 02 scalar & compound types · 03 ownership & moves · 04 borrowing · 05 String & &str · 06 structs & impl · 07 enums · 08 match & if let · 09 Option · 10 Result & ? · 11 traits · 12 generics & bounds · 13 lifetimes · 14 closures · 15 iterators · 16 Vec & HashMap · 17 Box, Rc, RefCell · 18 modules & visibility · 19 threads, Arc, Mutex, mpsc · 20 error types (custom, From)

**C17** — 01 types & printf · 02 control flow · 03 functions & prototypes · 04 pointers · 05 arrays · 06 strings (char arrays, strlen, snprintf) · 07 structs & typedef · 08 enums & unions · 09 malloc, calloc, free · 10 pointer arithmetic · 11 function pointers · 12 file I/O · 13 preprocessor & header guards · 14 bit operations

**C++20** — 01 iostream & std::format · 02 references & const · 03 auto & structured bindings · 04 std::string · 05 std::vector · 06 map & unordered_map · 07 range-for · 08 classes & RAII · 09 constructors & initializer lists · 10 rule of zero/five · 11 unique_ptr & shared_ptr · 12 move semantics · 13 templates · 14 concepts · 15 lambdas · 16 <algorithm> · 17 ranges & views · 18 optional, variant, expected-style patterns

**C# 12** — 01 top-level statements & namespaces · 02 var & types · 03 strings & interpolation · 04 arrays & List<T> · 05 Dictionary · 06 control flow & switch expressions · 07 methods, params, out · 08 classes & properties · 09 primary constructors · 10 records · 11 structs · 12 interfaces · 13 generics · 14 LINQ · 15 nullable reference types · 16 exceptions · 17 async/await · 18 pattern matching · 19 delegates, Func, events

**pandas 2.2** (parent: python) — 01 Series & DataFrame · 02 read & write (csv, parquet) · 03 loc & iloc · 04 boolean filtering & query · 05 assign & new columns · 06 vectorized ops vs apply · 07 groupby & agg · 08 named aggregation · 09 merge & join · 10 concat · 11 pivot_table & melt · 12 missing data · 13 datetimes & resample · 14 .str accessor · 15 sorting & ranking · 16 method chaining

**polars 1.x** (parent: python) — 01 DataFrame basics · 02 read vs scan (lazy) · 03 select & pl.col · 04 with_columns · 05 filter · 06 group_by & agg · 07 joins · 08 lazy & collect · 09 window functions (over) · 10 when/then/otherwise · 11 str & dt namespaces · 12 list & struct columns · 13 pivot & unpivot · 14 nulls · 15 SQLContext

**NumPy 2.x** (parent: python) — 01 creating arrays · 02 dtypes · 03 shape & reshape · 04 indexing & slicing · 05 boolean masks · 06 fancy indexing · 07 broadcasting · 08 ufuncs · 09 aggregation & axis · 10 linear algebra (@, linalg) · 11 random Generator · 12 stack & concatenate · 13 where & select · 14 sort & argsort · 15 save & load

**PyTorch 2.x** (parent: python) — 01 tensors · 02 dtype & device · 03 ops & broadcasting · 04 autograd · 05 nn.Module · 06 layers · 07 activations & losses · 08 optimizers · 09 the training loop · 10 Dataset & DataLoader · 11 eval, no_grad, inference_mode · 12 state_dict save & load · 13 torch.compile

**scikit-learn 1.5** (parent: python) — 01 train_test_split · 02 fit / predict / score · 03 scalers & encoders · 04 Pipeline · 05 ColumnTransformer · 06 cross-validation · 07 GridSearchCV · 08 classification metrics · 09 regression models · 10 classifiers · 11 KMeans · 12 PCA · 13 joblib persistence · 14 custom transformers

**Phase 6 roster (architecture must already allow it):** JavaScript, TypeScript, Java, SQL, Bash, Kotlin. Adding a language should mean only adding one data file, one lexer definition and one pigment.

### 10.3 Content registry
`js/content/registry.js` lists metadata for every language (id, name, short, pigment, family, version, file path) so the index can render without loading every file. Cache loaded modules in memory.

### 10.4 Content validator
`tools/validate.html` (dev only, not linked from the UI) loads every data file and reports problems: notes whose `at` isn't found, lines over 72 cols, more than 12 lines, duplicate IDs, empty glosses, glosses over 90 chars or ending without a period. Run it after each content batch and fix everything it reports.

---

## 11. File structure

```
index.html
README.md  PLAN.md
css/tokens.css  css/base.css  css/layout.css  css/plate.css  css/views.css
js/main.js                 router + view switching
js/store.js                localStorage platen:v1, debounced save, export/import
js/engine/input.js         textarea, beforeinput, shortcuts
js/engine/lexer.js         tokenizer
js/engine/langs.js         lexer definitions
js/engine/plate.js         cell model, state machine
js/engine/metrics.js       wpm/acc/consistency, unit EWMA, drill builder
js/ui/typing.js            typing view: render, caret, develop, crop marks
js/ui/marginalia.js        notes + SVG leader lines
js/ui/tape.js              canvas tape (live + expanded)
js/ui/proof.js             session results
js/ui/index.js             TOC views
js/ui/stats.js             trend SVG + keyboard heatmap
js/ui/settings.js
js/ui/palette.js
js/content/registry.js
data/languages/python.js lua.js go.js rust.js c.js cpp.js csharp.js
data/languages/pandas.js polars.js numpy.js pytorch.js sklearn.js
tools/validate.html
```

## 12. Routes

| route | view |
|---|---|
| `#/` | resume `cursor`, or `python/values-types` first plate |
| `#/t/{lang}/{topic}/{concept}/{variant}` | typing (blocks) |
| `#/drill/{lang}` | drill |
| `#/sprint/{lang}[/{topic}]/{30\|60\|120}` | sprint |
| `#/recall/{lang}/{topic}/{concept}` | recall |
| `#/proof/last` | last session proof |
| `#/index`, `#/index/{lang}` | index |
| `#/stats`, `#/stats/{lang}` | stats |
| `#/settings` | settings |

---

## 13. Responsiveness and accessibility

- Below 760px wide, or on touch-only devices (`(pointer: coarse)` with no fine pointer): typing views show the plate read-only, plus `platen needs a physical keyboard` in `--ink-3`. Index, stats and settings work fully.
- 760–1279px: no margin column; notes are listed under the plate (§3.5).
- Every interactive element is reachable by keyboard and has a visible focus ring (1px `--ink` outline, 2px offset, square).
- `aria-live` stays off during typing (no announcement spam). The result line uses `aria-live="polite"` once per finish.
- Ghost text contrast ≥ 3:1. All other text ≥ 4.5:1 in both themes. Check the pigments against both backgrounds and adjust lightness if needed.

---

## 14. Build phases with acceptance criteria

**P0 — shell.** tokens.css, fonts, theme (system/light/dark, no flash), header, router, store, empty views.
✔ Theme toggle persists across reload and follows the OS in system mode. All routes render without console errors.

**P1 — engine with Python 01–03.** Lexer, plate model, input via beforeinput, caret, flow + strict modes, develop effect, crop-mark lock, inline result, auto-indent skip, comment skip, Esc / Enter / Ctrl+arrows.
✔ A 10-line plate can be typed with zero dropped keys at 150 wpm (fast synthetic input in Playwright). Backspace across lines works. Wrong keys at end of line don't advance. The caret stays aligned after a font-size change.

**P2 — identity layer.** Marginalia with leader lines, tape, proof view, index TOC, settings, palette, focus mode.
✔ Screenshots in both themes at desktop size match §3–§4: no rounded corners, no shadows, crop marks visible, leader lines attached to the right tokens, tape moving.

**P3 — content.** All 12 data files per §10.2, passing `tools/validate.html` with zero issues. Do one file per pass and validate after each.
✔ The index shows every language with correct concept counts. Spot-check 5 random plates per file for correctness and current APIs.

**P4 — drill, sprint, stats.** Unit EWMA, drill generator, sprint timer, stats trend SVG, keyboard heatmap, hesitations.
✔ After 5 sessions, drill targets reflect the units you actually got wrong. Sprint ends exactly at 0:00 and opens proof.

**P5 — recall and polish.** Recall outline mode, shortcut sheet, export/import, reduced motion, mobile note, README.
✔ Lighthouse accessibility ≥ 95. Export → reset → import restores identical progress.

---

## 15. Verification checklist (run after every phase)

1. PlaywrightConsoleCapture on `index.html` and each route: zero errors.
2. PlaywrightScreenshot desktop, light and dark: typing view, proof, index, stats, settings.
3. PlaywrightScreenshot mobile: index and the typing-view keyboard note.
4. Read through the copy: no exclamation marks, emoji or praise words anywhere (`grep -i "great\|awesome\|!\"" js/`).
5. Visual audit: `grep "border-radius\|box-shadow\|gradient" css/` should only find `0` / `none`.
6. Update README.md.
