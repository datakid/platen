export default {
  id: "css",
  name: "CSS",
  short: "CSS",
  pigment: "css",
  family: null,
  version: "2024",
  lexer: "css",
  indent: 2,
  topics: [
    {
      id: "selectors",
      n: 1,
      title: "selectors",
      concepts: [
        {
          id: "type-class-id", n: 1, title: "type, class and id selectors", level: 1,
          gloss: "Targets elements by tag name, class or id.",
          examples: [
            { code: `p {
  line-height: 1.6;
}
.warning {
  color: crimson;
}`, notes: [{ at: ".warning", text: "class selector" }, { at: "p", text: "type selector" }] },
            { code: `#checkout {
  max-width: 40rem;
}`, notes: [{ at: "#checkout", text: "id selector, unique per page" }] },
            { code: `button.primary {
  background: royalblue;
  color: white;
}`, notes: [{ at: "button.primary", text: "button with this class" }] },
            { code: `.card.featured {
  border: 2px solid gold;
}`, notes: [{ at: ".card.featured", text: "both classes on one element" }] }
          ]
        },
        {
          id: "attribute-selectors", n: 2, title: "attribute selectors", level: 2,
          gloss: "Matches elements by the presence or value of an attribute.",
          examples: [
            { code: `input[required] {
  border-color: tomato;
}
a[href^="https://"] {
  text-decoration: underline;
}`, notes: [{ at: "[required]", text: "attribute is present" }, { at: "^=", text: "value starts with" }] },
            { code: `a[href$=".pdf"]::after {
  content: " (pdf)";
}`, notes: [{ at: "$=", text: "value ends with" }] },
            { code: `img[alt=""] {
  opacity: 0.5;
}
[data-state="open"] {
  display: block;
}`, notes: [{ at: "[data-state=\"open\"]", text: "exact value match" }] },
            { code: `a[href*="docs"] {
  color: teal;
}
input[type="email" i] {
  text-transform: lowercase;
}`, notes: [{ at: "*=", text: "value contains" }, { at: "\"email\" i", text: "case-insensitive value" }] }
          ]
        },
        {
          id: "combinators", n: 3, title: "combinators", level: 2,
          gloss: "Relates elements by descendant, child or sibling position.",
          examples: [
            { code: `nav a {
  padding: 0.5rem 1rem;
}
ul > li {
  list-style: none;
}`, notes: [{ at: "nav a", text: "any descendant" }, { at: "ul > li", text: "direct children only" }] },
            { code: `h2 + p {
  margin-block-start: 0;
}`, notes: [{ at: "h2 + p", text: "paragraph right after h2" }] },
            { code: `h2 ~ p {
  color: gray;
}`, notes: [{ at: "~", text: "any later sibling" }] },
            { code: `.menu > .item + .item {
  border-block-start: 1px solid #ddd;
}`, notes: [{ at: ".item + .item", text: "item after another item" }] }
          ]
        },
        {
          id: "specificity", n: 4, title: "specificity and importance", level: 2,
          gloss: "Resolves competing rules by selector weight, source order and importance.",
          examples: [
            { code: `a {
  color: gray;
}
nav a {
  color: black;
}
.menu a.active {
  color: green;
}`, notes: [{ at: "nav a", text: "outweighs a" }, { at: ".menu a.active", text: "outweighs both" }] },
            { code: `#header .title {
  font-size: 2rem;
}
.title {
  font-size: 1rem;
}`, notes: [{ at: "#header .title", text: "id outweighs class" }] },
            { code: `.banner {
  color: white !important;
}`, notes: [{ at: "!important", text: "overrides normal rules" }] },
            { code: `button {
  color: black;
}
button {
  color: navy;
}`, notes: [{ at: "color: navy", text: "later rule wins a tie" }] }
          ]
        }
      ]
    },
    {
      id: "box-model",
      n: 2,
      title: "box model",
      concepts: [
        {
          id: "box-sizing", n: 1, title: "box-sizing", level: 1,
          gloss: "Controls whether width includes padding and border.",
          examples: [
            { code: `.panel {
  box-sizing: border-box;
  width: 20rem;
  padding: 1.5rem;
  border: 1px solid #ccc;
}`, notes: [{ at: "border-box", text: "width includes padding and border" }] },
            { code: `.legacy {
  box-sizing: content-box;
  width: 10rem;
  padding: 1rem;
}`, notes: [{ at: "content-box", text: "default, width is content only" }] },
            { code: `input,
textarea {
  box-sizing: border-box;
  width: 100%;
}`, notes: [] },
            { code: `html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}`, notes: [{ at: "inherit", text: "follows the html setting" }] }
          ]
        },
        {
          id: "padding-margin", n: 2, title: "padding and margin", level: 1,
          gloss: "Sets space inside and outside an element with shorthand values.",
          examples: [
            { code: `.card {
  padding: 1rem 2rem;
  margin: 0 auto 1.5rem;
}`, notes: [{ at: "1rem 2rem", text: "vertical then horizontal" }, { at: "0 auto 1.5rem", text: "top, sides, bottom" }] },
            { code: `.tag {
  padding: 0.25rem 0.75rem 0.25rem 0.5rem;
  margin-inline: 0.25rem;
}`, notes: [{ at: "0.25rem 0.75rem 0.25rem 0.5rem", text: "top right bottom left" }] },
            { code: `.container {
  width: min(100% - 2rem, 60rem);
  margin-inline: auto;
}`, notes: [{ at: "margin-inline: auto", text: "centers a block" }] },
            { code: `.stack > * + * {
  margin-block-start: 1rem;
}`, notes: [{ at: "* + *", text: "every child after the first" }] }
          ]
        },
        {
          id: "border-radius", n: 3, title: "borders and radius", level: 1,
          gloss: "Draws borders and rounds corners with border and border-radius.",
          examples: [
            { code: `.input {
  border: 1px solid #bbb;
  border-radius: 0.375rem;
}`, notes: [{ at: "1px solid #bbb", text: "width, style, color" }] },
            { code: `.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}`, notes: [{ at: "50%", text: "a circle on a square box" }] },
            { code: `.tab {
  border-bottom: 3px solid transparent;
  border-radius: 0.5rem 0.5rem 0 0;
}`, notes: [{ at: "0.5rem 0.5rem 0 0", text: "top corners only" }] },
            { code: `.callout {
  border-inline-start: 4px solid orange;
  border-radius: 0 0.5rem 0.5rem 0;
}`, notes: [] }
          ]
        },
        {
          id: "overflow", n: 4, title: "overflow", level: 2,
          gloss: "Clips or scrolls content that is larger than its box.",
          examples: [
            { code: `.log {
  max-height: 12rem;
  overflow: auto;
}`, notes: [{ at: "overflow: auto", text: "scrollbars only when needed" }] },
            { code: `.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`, notes: [{ at: "text-overflow", text: "shows an ellipsis" }] },
            { code: `.table-wrap {
  overflow-x: auto;
  overscroll-behavior: contain;
}`, notes: [] },
            { code: `.modal-body {
  overflow-y: scroll;
  scrollbar-gutter: stable;
}`, notes: [{ at: "scrollbar-gutter", text: "reserves space for the bar" }] }
          ]
        }
      ]
    },
    {
      id: "colors-units",
      n: 3,
      title: "colors & units",
      concepts: [
        {
          id: "color-formats", n: 1, title: "color formats", level: 1,
          gloss: "Writes colors as hex, rgb or hsl values with optional alpha.",
          examples: [
            { code: `.alert {
  color: #b00020;
  background: #fde7ea;
}`, notes: [] },
            { code: `.badge {
  color: rgb(255 255 255);
  background: rgb(34 139 34 / 0.9);
}`, notes: [{ at: "/ 0.9", text: "alpha channel" }] },
            { code: `.link {
  color: hsl(210 80% 45%);
}
.link:hover {
  color: hsl(210 80% 30%);
}`, notes: [{ at: "hsl(210 80% 45%)", text: "hue, saturation, lightness" }] },
            { code: `.scrim {
  background: #00000080;
}`, notes: [{ at: "#00000080", text: "hex with alpha" }] }
          ]
        },
        {
          id: "oklch-color-mix", n: 2, title: "oklch and color-mix", level: 2,
          gloss: "Picks perceptual colors with oklch and blends them with color-mix.",
          examples: [
            { code: `:root {
  --brand: oklch(62% 0.19 250);
}`, notes: [{ at: "oklch(62% 0.19 250)", text: "lightness, chroma, hue" }] },
            { code: `.button {
  --brand: oklch(62% 0.19 250);
  background: var(--brand);
}
.button:hover {
  background: color-mix(in oklch, var(--brand) 85%, black);
}`, notes: [{ at: "85%", text: "share of the first color" }] },
            { code: `.muted {
  color: color-mix(in srgb, currentColor 60%, transparent);
}`, notes: [] },
            { code: `.surface {
  color-scheme: light dark;
  background: light-dark(white, #1a1a1a);
  color: light-dark(#1a1a1a, white);
}`, notes: [{ at: "light-dark(white, #1a1a1a)", text: "follows color-scheme" }] }
          ]
        },
        {
          id: "length-units", n: 3, title: "absolute and relative units", level: 1,
          gloss: "Sizes things in px, rem, em, ch and percentages.",
          examples: [
            { code: `html {
  font-size: 100%;
}
h1 {
  font-size: 2.5rem;
  margin-block-end: 0.5em;
}`, notes: [{ at: "2.5rem", text: "relative to the root size" }, { at: "0.5em", text: "relative to own font size" }] },
            { code: `.sidebar {
  width: 25%;
  min-width: 12rem;
}`, notes: [{ at: "25%", text: "share of the parent width" }] },
            { code: `.icon {
  width: 1.25em;
  height: 1.25em;
}`, notes: [{ at: "width: 1.25em", text: "scales with the font size" }] },
            { code: `.divider {
  border-top: 1px solid #ccc;
  width: 40ch;
}`, notes: [{ at: "40ch", text: "width of the zero glyph" }] }
          ]
        },
        {
          id: "viewport-units", n: 4, title: "viewport units", level: 2,
          gloss: "Sizes elements against the browser viewport with vw, vh and the dynamic variants.",
          examples: [
            { code: `.hero {
  min-height: 100vh;
  padding-inline: 5vw;
}`, notes: [] },
            { code: `.hero {
  min-height: 100dvh;
}`, notes: [{ at: "dvh", text: "tracks mobile toolbars" }] },
            { code: `.drawer {
  height: 100svh;
  width: min(90vw, 24rem);
}`, notes: [{ at: "svh", text: "smallest viewport height" }] },
            { code: `.banner {
  height: 50vmin;
  width: 100%;
}`, notes: [{ at: "vmin", text: "smaller of vw and vh" }] }
          ]
        }
      ]
    },
    {
      id: "typography",
      n: 4,
      title: "typography",
      concepts: [
        {
          id: "font-family", n: 1, title: "font-family and stacks", level: 1,
          gloss: "Lists fonts in order of preference with a generic fallback.",
          examples: [
            { code: `body {
  font-family: system-ui, sans-serif;
}`, notes: [{ at: "sans-serif", text: "generic fallback" }] },
            { code: `code,
pre {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
}`, notes: [{ at: "\"SF Mono\"", text: "quote names with spaces" }] },
            { code: `h1 {
  font-family: "Source Serif 4", Georgia, serif;
}`, notes: [] },
            { code: `.quote {
  font-family: Georgia, "Times New Roman", serif;
  font-style: italic;
}`, notes: [] }
          ]
        },
        {
          id: "font-size-weight", n: 2, title: "size, weight and style", level: 1,
          gloss: "Sets font-size, font-weight, font-style and the font shorthand.",
          examples: [
            { code: `h2 {
  font-size: 1.5rem;
  font-weight: 700;
}`, notes: [] },
            { code: `.caption {
  font-size: 0.875rem;
  font-style: italic;
}`, notes: [] },
            { code: `.label {
  font: 600 0.875rem/1.2 system-ui, sans-serif;
}`, notes: [{ at: "0.875rem/1.2", text: "size then line height" }] },
            { code: `.body {
  font-weight: 450;
  font-optical-sizing: auto;
}`, notes: [{ at: "450", text: "variable fonts allow any weight" }] }
          ]
        },
        {
          id: "line-height-spacing", n: 3, title: "line height and spacing", level: 1,
          gloss: "Controls leading with line-height and tracking with letter-spacing.",
          examples: [
            { code: `p {
  line-height: 1.6;
}`, notes: [{ at: "1.6", text: "unitless, scales with the font" }] },
            { code: `.eyebrow {
  letter-spacing: 0.08em;
  text-transform: uppercase;
}`, notes: [] },
            { code: `.prose {
  max-width: 65ch;
  line-height: 1.7;
  word-spacing: 0.05em;
}`, notes: [{ at: "65ch", text: "comfortable line length" }] },
            { code: `h1 {
  line-height: 1.1;
  letter-spacing: -0.02em;
}`, notes: [] }
          ]
        },
        {
          id: "text-wrap", n: 4, title: "alignment and wrapping", level: 2,
          gloss: "Aligns text and controls how lines wrap and break.",
          examples: [
            { code: `h1,
h2 {
  text-wrap: balance;
}`, notes: [{ at: "balance", text: "evens out line lengths" }] },
            { code: `p {
  text-wrap: pretty;
  hyphens: auto;
}`, notes: [{ at: "pretty", text: "avoids a lone last word" }] },
            { code: `.cell {
  overflow-wrap: anywhere;
  text-align: end;
}`, notes: [{ at: "text-align: end", text: "follows writing direction" }] },
            { code: `.title {
  text-align: center;
  text-wrap: balance;
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "flexbox",
      n: 5,
      title: "flexbox",
      concepts: [
        {
          id: "flex-container", n: 1, title: "flex container", level: 1,
          gloss: "Lays children out in a row with display flex and aligns them.",
          examples: [
            { code: `.toolbar {
  display: flex;
  gap: 0.5rem;
}`, notes: [{ at: "gap", text: "space between items" }] },
            { code: `.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`, notes: [{ at: "justify-content", text: "main axis" }, { at: "align-items", text: "cross axis" }] },
            { code: `.column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}`, notes: [{ at: "flex-direction: column", text: "main axis becomes vertical" }] },
            { code: `.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`, notes: [] }
          ]
        },
        {
          id: "flex-wrap-gap", n: 2, title: "wrapping and gap", level: 2,
          gloss: "Wraps items onto new lines with flex-wrap and spaces them with gap.",
          examples: [
            { code: `.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}`, notes: [] },
            { code: `.gallery {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem 2rem;
}`, notes: [{ at: "flex-flow", text: "direction and wrap together" }, { at: "1rem 2rem", text: "row gap, then column gap" }] },
            { code: `.chips {
  display: inline-flex;
  flex-wrap: wrap;
  column-gap: 0.25rem;
  row-gap: 0.5rem;
}`, notes: [] },
            { code: `.row {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}`, notes: [{ at: "nowrap", text: "items stay on one line" }] }
          ]
        },
        {
          id: "flex-grow-shrink", n: 3, title: "grow, shrink and basis", level: 2,
          gloss: "Sizes flex items with flex-grow, flex-shrink and flex-basis.",
          examples: [
            { code: `.search {
  flex: 1;
}`, notes: [{ at: "flex: 1", text: "grows to fill free space" }] },
            { code: `.sidebar {
  flex: 0 0 16rem;
}`, notes: [{ at: "0 0 16rem", text: "no grow, no shrink, fixed basis" }] },
            { code: `.content {
  flex: 1 1 0;
  min-width: 0;
}`, notes: [{ at: "min-width: 0", text: "lets long text shrink" }] },
            { code: `.card {
  flex: 1 1 20rem;
  max-width: 30rem;
}`, notes: [{ at: "1 1 20rem", text: "grow, shrink, basis" }] }
          ]
        },
        {
          id: "flex-item-alignment", n: 4, title: "alignment and order", level: 2,
          gloss: "Overrides alignment per item with align-self, auto margins and order.",
          examples: [
            { code: `.badge {
  align-self: flex-start;
}`, notes: [{ at: "align-self", text: "overrides align-items" }] },
            { code: `.logo {
  margin-inline-end: auto;
}`, notes: [{ at: "auto", text: "pushes siblings to the far end" }] },
            { code: `.skip-link {
  order: -1;
}`, notes: [{ at: "order: -1", text: "moves the item first" }] },
            { code: `.total {
  align-self: stretch;
  text-align: end;
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "grid",
      n: 6,
      title: "grid",
      concepts: [
        {
          id: "grid-columns", n: 1, title: "grid-template-columns", level: 1,
          gloss: "Defines columns with display grid and grid-template-columns.",
          examples: [
            { code: `.layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}`, notes: [{ at: "1fr", text: "one share of free space" }] },
            { code: `.page {
  display: grid;
  grid-template-columns: 16rem 1fr;
}`, notes: [{ at: "16rem 1fr", text: "fixed column, flexible column" }] },
            { code: `.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}`, notes: [{ at: "repeat(3, 1fr)", text: "three equal columns" }] },
            { code: `.form {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.5rem 1rem;
}`, notes: [{ at: "max-content", text: "as wide as the longest label" }] }
          ]
        },
        {
          id: "auto-fit-minmax", n: 2, title: "repeat, auto-fit and minmax", level: 2,
          gloss: "Builds a responsive column count with repeat, auto-fit and minmax.",
          examples: [
            { code: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
}`, notes: [{ at: "auto-fit", text: "fits as many columns as possible" }, { at: "minmax(12rem, 1fr)", text: "never narrower than 12rem" }] },
            { code: `.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}`, notes: [{ at: "auto-fill", text: "keeps empty tracks" }] },
            { code: `.tiles {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
}`, notes: [{ at: "min(100%, 15rem)", text: "avoids overflow on narrow screens" }] },
            { code: `.timeline {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(8rem, 1fr);
}`, notes: [{ at: "grid-auto-flow: column", text: "extra items add columns" }] }
          ]
        },
        {
          id: "grid-areas", n: 3, title: "grid areas", level: 2,
          gloss: "Names regions with grid-template-areas and places items into them.",
          examples: [
            { code: `.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 14rem 1fr;
}`, notes: [{ at: "\"header header\"", text: "one quoted string per row" }] },
            { code: `.page > header {
  grid-area: header;
}
.page > main {
  grid-area: main;
}`, notes: [{ at: "grid-area: header", text: "places the item by name" }] },
            { code: `.dashboard {
  display: grid;
  grid-template-areas: "stats stats" "chart table";
  grid-template-rows: auto 1fr;
}`, notes: [] },
            { code: `.hero {
  display: grid;
  grid-template-areas: "text image";
  grid-template-columns: 1fr 1fr;
  align-items: center;
}`, notes: [] }
          ]
        },
        {
          id: "grid-lines", n: 4, title: "placing by line", level: 2,
          gloss: "Places items on grid lines with grid-column, grid-row and span.",
          examples: [
            { code: `.feature {
  grid-column: 1 / -1;
}`, notes: [{ at: "-1", text: "the last grid line" }] },
            { code: `.wide {
  grid-column: span 2;
  grid-row: span 2;
}`, notes: [{ at: "span 2", text: "covers two tracks" }] },
            { code: `.header {
  grid-column: 2 / 5;
  grid-row: 1;
}`, notes: [{ at: "2 / 5", text: "from line 2 up to line 5" }] },
            { code: `.overlay {
  grid-area: 1 / 1 / 2 / 2;
}`, notes: [{ at: "grid-area", text: "four lines, row start first" }] }
          ]
        }
      ]
    },
    {
      id: "positioning",
      n: 7,
      title: "positioning",
      concepts: [
        {
          id: "relative-absolute", n: 1, title: "relative and absolute", level: 1,
          gloss: "Offsets boxes with relative and absolute positioning.",
          examples: [
            { code: `.card {
  position: relative;
}
.card .badge {
  position: absolute;
  inset-block-start: 0.5rem;
  inset-inline-end: 0.5rem;
}`, notes: [{ at: "position: relative", text: "anchors the absolute child" }] },
            { code: `.shift {
  position: relative;
  top: 2px;
  left: 4px;
}`, notes: [{ at: "top: 2px", text: "offset from its normal spot" }] },
            { code: `.overlay {
  position: absolute;
  inset: 0;
}`, notes: [{ at: "inset: 0", text: "shorthand for all four sides" }] },
            { code: `.centered {
  position: absolute;
  inset: 50% auto auto 50%;
  translate: -50% -50%;
}`, notes: [{ at: "translate", text: "moves back by half its own size" }] }
          ]
        },
        {
          id: "fixed-sticky", n: 2, title: "fixed and sticky", level: 1,
          gloss: "Pins elements to the viewport with fixed or to a scroll container with sticky.",
          examples: [
            { code: `.header {
  position: sticky;
  top: 0;
}`, notes: [{ at: "top: 0", text: "sticks when it reaches the top" }] },
            { code: `.toc {
  position: sticky;
  top: 1rem;
  align-self: start;
}`, notes: [{ at: "align-self: start", text: "lets a grid item stay short" }] },
            { code: `.chat-button {
  position: fixed;
  inset-block-end: 1rem;
  inset-inline-end: 1rem;
}`, notes: [{ at: "fixed", text: "stays put while scrolling" }] },
            { code: `thead th {
  position: sticky;
  top: 0;
  background: white;
}`, notes: [] }
          ]
        },
        {
          id: "z-index-stacking", n: 3, title: "z-index and stacking", level: 2,
          gloss: "Orders overlapping boxes with z-index and stacking contexts.",
          examples: [
            { code: `.modal {
  position: fixed;
  z-index: 100;
}`, notes: [{ at: "z-index", text: "higher values paint on top" }] },
            { code: `.dropdown-wrap {
  position: relative;
  isolation: isolate;
}
.dropdown {
  position: absolute;
  z-index: 10;
}`, notes: [{ at: "isolation: isolate", text: "starts a new stacking context" }] },
            { code: `.card {
  isolation: isolate;
}
.card::before {
  content: "";
  position: absolute;
  z-index: -1;
}`, notes: [{ at: "z-index: -1", text: "stays inside the card context" }] },
            { code: `.tooltip {
  position: relative;
  z-index: 1;
  opacity: 0.95;
}`, notes: [{ at: "opacity", text: "below 1 also makes a context" }] }
          ]
        },
        {
          id: "hiding-elements", n: 4, title: "hiding elements", level: 2,
          gloss: "Removes elements from view with display, visibility, opacity or clipping.",
          examples: [
            { code: `.is-hidden {
  display: none;
}`, notes: [{ at: "display: none", text: "removed from layout" }] },
            { code: `.placeholder {
  visibility: hidden;
}`, notes: [{ at: "visibility", text: "keeps its space" }] },
            { code: `.fade-out {
  opacity: 0;
  pointer-events: none;
}`, notes: [{ at: "pointer-events: none", text: "ignores clicks" }] },
            { code: `.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}`, notes: [{ at: ".sr-only", text: "hidden but read by screen readers" }] }
          ]
        }
      ]
    },
    {
      id: "custom-properties",
      n: 8,
      title: "custom properties",
      concepts: [
        {
          id: "define-use", n: 1, title: "defining and using", level: 1,
          gloss: "Stores a value in a --name property and reads it back with var.",
          examples: [
            { code: `:root {
  --accent: #2563eb;
  --radius: 0.5rem;
}`, notes: [{ at: ":root", text: "available to every element" }] },
            { code: `.button {
  background: var(--accent);
  border-radius: var(--radius);
}`, notes: [{ at: "var(--accent)", text: "reads the property" }] },
            { code: `:root {
  --space-s: 0.5rem;
  --space-m: 1rem;
}
.card {
  padding: var(--space-m);
}`, notes: [] },
            { code: `:root {
  --font-body: system-ui, sans-serif;
}
body {
  font-family: var(--font-body);
}`, notes: [] }
          ]
        },
        {
          id: "fallbacks", n: 2, title: "fallback values", level: 2,
          gloss: "Supplies a default to var when a property is not defined.",
          examples: [
            { code: `.button {
  background: var(--accent, steelblue);
}`, notes: [{ at: "steelblue", text: "used when --accent is unset" }] },
            { code: `.card {
  padding: var(--card-padding, 1rem);
}`, notes: [] },
            { code: `.title {
  color: var(--title-color, var(--text, black));
}`, notes: [{ at: "var(--text, black)", text: "nested fallback" }] },
            { code: `.icon {
  width: var(--size, 1.5rem);
  height: var(--size, 1.5rem);
}`, notes: [] }
          ]
        },
        {
          id: "scope-override", n: 3, title: "scoping and overrides", level: 2,
          gloss: "Overrides a property on one element so its children inherit the new value.",
          examples: [
            { code: `.card {
  --accent: tomato;
}
.card a {
  color: var(--accent);
}`, notes: [{ at: "--accent: tomato", text: "applies inside .card only" }] },
            { code: `.theme-dark {
  --bg: #111;
  --fg: #eee;
  background: var(--bg);
  color: var(--fg);
}`, notes: [] },
            { code: `@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111;
    --fg: #eee;
  }
}`, notes: [{ at: ":root", text: "swaps the values for dark mode" }] },
            { code: `.button[data-size="large"] {
  --padding: 1rem 2rem;
}
.button {
  padding: var(--padding, 0.5rem 1rem);
}`, notes: [{ at: "--padding: 1rem 2rem", text: "holds a multi-value list" }] }
          ]
        },
        {
          id: "at-property", n: 4, title: "@property", level: 3,
          gloss: "Registers a typed custom property with @property so it can animate.",
          examples: [
            { code: `@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}`, notes: [{ at: "syntax", text: "the type of the value" }] },
            { code: `@property --accent {
  syntax: "<color>";
  inherits: true;
  initial-value: #2563eb;
}`, notes: [{ at: "inherits: true", text: "children see the value" }] },
            { code: `@property --progress {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}`, notes: [] },
            { code: `.dial {
  --progress: 0%;
  transition: --progress 300ms ease;
}
.dial:hover {
  --progress: 100%;
}`, notes: [{ at: "transition: --progress", text: "animates once registered" }] }
          ]
        }
      ]
    },
    {
      id: "pseudo-classes-elements",
      n: 9,
      title: "pseudo-classes & pseudo-elements",
      concepts: [
        {
          id: "hover-focus-active", n: 1, title: "hover, focus and active", level: 1,
          gloss: "Styles interaction states with :hover, :focus-visible and :active.",
          examples: [
            { code: `a:hover {
  text-decoration: underline;
}`, notes: [{ at: ":hover", text: "pointer is over the element" }] },
            { code: `button:focus-visible {
  outline: 2px solid royalblue;
  outline-offset: 2px;
}`, notes: [{ at: ":focus-visible", text: "keyboard focus only" }] },
            { code: `button:active {
  transform: translateY(1px);
}`, notes: [{ at: ":active", text: "while pressed" }] },
            { code: `.card:hover,
.card:focus-within {
  border-color: royalblue;
}`, notes: [{ at: ":focus-within", text: "a descendant has focus" }] }
          ]
        },
        {
          id: "structural-pseudos", n: 2, title: "structural pseudo-classes", level: 2,
          gloss: "Selects elements by position with :first-child, :nth-child and :last-child.",
          examples: [
            { code: `li:first-child {
  font-weight: 700;
}
li:last-child {
  border-bottom: 0;
}`, notes: [] },
            { code: `tr:nth-child(even) {
  background: #f5f5f5;
}`, notes: [{ at: "even", text: "every second row" }] },
            { code: `li:nth-child(3n + 1) {
  color: gray;
}`, notes: [{ at: "3n + 1", text: "items 1, 4, 7 and so on" }] },
            { code: `.step:nth-last-child(-n + 2) {
  opacity: 0.6;
}`, notes: [{ at: "-n + 2", text: "the last two items" }] }
          ]
        },
        {
          id: "form-logical-pseudos", n: 3, title: "state and relational pseudo-classes", level: 2,
          gloss: "Matches state and relationships with :checked, :disabled, :not and :has.",
          examples: [
            { code: `input:checked + label {
  font-weight: 600;
}`, notes: [{ at: ":checked", text: "checkbox or radio is on" }] },
            { code: `button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`, notes: [] },
            { code: `li:not(:last-child) {
  border-bottom: 1px solid #ddd;
}`, notes: [{ at: ":not(:last-child)", text: "every item except the last" }] },
            { code: `.card:has(img) {
  padding-block-start: 0;
}`, notes: [{ at: ":has(img)", text: "selects the parent" }] }
          ]
        },
        {
          id: "before-after", n: 4, title: "::before and ::after", level: 2,
          gloss: "Inserts generated content with ::before, ::after and the content property.",
          examples: [
            { code: `.required::after {
  content: " *";
  color: crimson;
}`, notes: [{ at: "content", text: "required for the box to render" }] },
            { code: `blockquote::before {
  content: "\\201C";
  font-size: 3rem;
}`, notes: [{ at: "\"\\201C\"", text: "escape for a curly quote" }] },
            { code: `.badge::before {
  content: "";
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: currentColor;
}`, notes: [{ at: "content: \"\"", text: "empty box used as a shape" }] },
            { code: `a[href^="http"]::after {
  content: "\\2197";
  margin-inline-start: 0.25em;
}`, notes: [] }
          ]
        },
        {
          id: "other-pseudo-elements", n: 5, title: "selection, placeholder and marker", level: 2,
          gloss: "Styles parts of an element with ::first-line, ::selection, ::placeholder and ::marker.",
          examples: [
            { code: `p::first-line {
  font-variant: small-caps;
}`, notes: [] },
            { code: `::selection {
  background: gold;
  color: black;
}`, notes: [{ at: "::selection", text: "highlighted text" }] },
            { code: `input::placeholder {
  color: gray;
  opacity: 1;
}`, notes: [] },
            { code: `li::marker {
  color: royalblue;
  font-weight: 700;
}`, notes: [{ at: "::marker", text: "bullet or number" }] }
          ]
        }
      ]
    },
    {
      id: "media-container-queries",
      n: 10,
      title: "media & container queries",
      concepts: [
        {
          id: "width-queries", n: 1, title: "width media queries", level: 1,
          gloss: "Applies rules when the viewport matches a width condition.",
          examples: [
            { code: `@media (min-width: 48rem) {
  .layout {
    grid-template-columns: 1fr 2fr;
  }
}`, notes: [{ at: "min-width", text: "at this width and wider" }] },
            { code: `@media (width >= 40rem) {
  .nav {
    display: flex;
  }
}`, notes: [{ at: "width >= 40rem", text: "range syntax" }] },
            { code: `@media (max-width: 30rem) {
  .sidebar {
    display: none;
  }
}`, notes: [{ at: "max-width", text: "at this width and narrower" }] },
            { code: `@media (400px <= width <= 800px) {
  .card {
    padding: 1rem;
  }
}`, notes: [{ at: "400px <= width <= 800px", text: "between two widths" }] }
          ]
        },
        {
          id: "preference-queries", n: 2, title: "preference and device queries", level: 2,
          gloss: "Adapts rules to preferences and devices such as dark mode, hover and print.",
          examples: [
            { code: `@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}`, notes: [] },
            { code: `@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms;
  }
}`, notes: [{ at: "reduce", text: "user asked for less motion" }] },
            { code: `@media (hover: hover) {
  .card:hover {
    translate: 0 -2px;
  }
}`, notes: [{ at: "hover: hover", text: "device has a real pointer" }] },
            { code: `@media print {
  nav,
  footer {
    display: none;
  }
}`, notes: [] }
          ]
        },
        {
          id: "container-queries", n: 3, title: "container queries", level: 2,
          gloss: "Styles a component by the size of its container with @container.",
          examples: [
            { code: `.card-list {
  container-type: inline-size;
}`, notes: [{ at: "container-type", text: "makes this a query container" }] },
            { code: `.card-list {
  container-type: inline-size;
  container-name: cards;
}
@container cards (min-width: 30rem) {
  .card {
    display: flex;
  }
}`, notes: [{ at: "@container cards", text: "targets the named container" }] },
            { code: `@container (width > 40rem) {
  .card {
    grid-template-columns: 1fr 2fr;
  }
}`, notes: [] },
            { code: `.widget {
  container: widget / inline-size;
}`, notes: [{ at: "widget / inline-size", text: "name, then type" }] }
          ]
        },
        {
          id: "container-units", n: 4, title: "container query units", level: 3,
          gloss: "Sizes children against their container with cqw, cqi, cqb and cqh.",
          examples: [
            { code: `.card h2 {
  font-size: clamp(1rem, 5cqi, 2rem);
}`, notes: [{ at: "5cqi", text: "5% of the container inline size" }] },
            { code: `.panel {
  padding: 4cqw;
}`, notes: [] },
            { code: `.thumb {
  width: 30cqi;
  height: 20cqb;
}`, notes: [] },
            { code: `.media {
  container-type: size;
  height: 20rem;
}
.media img {
  height: 100cqh;
}`, notes: [{ at: "container-type: size", text: "both axes measured" }] }
          ]
        }
      ]
    },
    {
      id: "transitions-animations",
      n: 11,
      title: "transitions & animations",
      concepts: [
        {
          id: "transitions", n: 1, title: "transition", level: 1,
          gloss: "Animates a property change over time with the transition shorthand.",
          examples: [
            { code: `.button {
  transition: background-color 200ms ease;
}
.button:hover {
  background-color: royalblue;
}`, notes: [{ at: "200ms", text: "duration" }] },
            { code: `.card {
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}`, notes: [{ at: ",", text: "one transition per property" }] },
            { code: `.link {
  transition-property: color;
  transition-duration: 0.3s;
  transition-delay: 50ms;
}`, notes: [] },
            { code: `.menu {
  transition: opacity 0.2s, visibility 0.2s;
  opacity: 0;
}
.menu.open {
  opacity: 1;
}`, notes: [] }
          ]
        },
        {
          id: "transforms", n: 2, title: "transforms", level: 1,
          gloss: "Transforms boxes with transform and the individual translate, rotate and scale properties.",
          examples: [
            { code: `.card:hover {
  transform: translateY(-4px) scale(1.02);
}`, notes: [{ at: "translateY(-4px)", text: "moves up" }] },
            { code: `.icon {
  rotate: 45deg;
  transform-origin: center;
}`, notes: [{ at: "rotate", text: "individual transform property" }] },
            { code: `.zoom {
  scale: 1.1;
  translate: 0 -0.5rem;
}`, notes: [] },
            { code: `.scene {
  perspective: 800px;
}
.flip {
  transform: rotateY(180deg);
}`, notes: [{ at: "perspective", text: "depth for 3d transforms" }] }
          ]
        },
        {
          id: "easing", n: 3, title: "easing functions", level: 2,
          gloss: "Shapes the speed curve with ease-in-out, cubic-bezier and steps.",
          examples: [
            { code: `.panel {
  transition: transform 300ms ease-in-out;
}`, notes: [{ at: "ease-in-out", text: "slow start and end" }] },
            { code: `.toast {
  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}`, notes: [{ at: "cubic-bezier", text: "custom curve with overshoot" }] },
            { code: `.bounce {
  transition: translate 500ms linear(0, 0.6 40%, 1 70%, 0.9, 1);
}`, notes: [{ at: "linear(0, 0.6 40%, 1 70%, 0.9, 1)", text: "piecewise curve" }] },
            { code: `.step {
  transition: width 1s steps(5, end);
}`, notes: [{ at: "steps(5, end)", text: "five discrete jumps" }] }
          ]
        },
        {
          id: "keyframes", n: 4, title: "@keyframes", level: 2,
          gloss: "Defines multi-step animations with @keyframes and the animation shorthand.",
          examples: [
            { code: `@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}`, notes: [{ at: "from", text: "start state, same as 0%" }] },
            { code: `@keyframes pulse {
  0%,
  100% {
    scale: 1;
  }
  50% {
    scale: 1.1;
  }
}`, notes: [] },
            { code: `.toast {
  animation: fade-in 300ms ease-out both;
}`, notes: [{ at: "both", text: "keeps start and end styles" }] },
            { code: `.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    rotate: 360deg;
  }
}`, notes: [{ at: "infinite", text: "repeats forever" }] }
          ]
        }
      ]
    },
    {
      id: "nesting-is-where",
      n: 12,
      title: "nesting, :is and :where",
      concepts: [
        {
          id: "nesting-basics", n: 1, title: "css nesting", level: 1,
          gloss: "Nests rules inside a parent rule so related styles stay together.",
          examples: [
            { code: `.card {
  padding: 1rem;
  h2 {
    margin: 0;
  }
}`, notes: [{ at: "h2", text: "matches .card h2" }] },
            { code: `.nav {
  display: flex;
  a {
    padding: 0.5rem;
  }
}`, notes: [] },
            { code: `.card {
  border: 1px solid #ddd;
  .title {
    font-weight: 700;
  }
}`, notes: [] },
            { code: `.list {
  list-style: none;
  > li {
    padding-block: 0.5rem;
  }
}`, notes: [{ at: "> li", text: "child combinator, no & needed" }] }
          ]
        },
        {
          id: "ampersand", n: 2, title: "the & selector", level: 1,
          gloss: "Refers to the parent selector with & for states, modifiers and context.",
          examples: [
            { code: `.button {
  background: royalblue;
  &:hover {
    background: navy;
  }
}`, notes: [{ at: "&:hover", text: "same element, hover state" }] },
            { code: `.button {
  &.primary {
    font-weight: 700;
  }
}`, notes: [{ at: "&.primary", text: "same element, extra class" }] },
            { code: `.title {
  font-size: 1rem;
  .featured & {
    font-size: 1.5rem;
  }
}`, notes: [{ at: ".featured &", text: "parent inside a context" }] },
            { code: `.card {
  &::after {
    content: "";
  }
  & + & {
    margin-block-start: 1rem;
  }
}`, notes: [{ at: "& + &", text: "a card after a card" }] }
          ]
        },
        {
          id: "nested-at-rules", n: 3, title: "nested media and container queries", level: 2,
          gloss: "Places @media and @container blocks inside a rule next to its declarations.",
          examples: [
            { code: `.layout {
  display: block;
  @media (min-width: 48rem) {
    display: grid;
  }
}`, notes: [{ at: "@media", text: "no selector repeated" }] },
            { code: `.card {
  padding: 0.75rem;
  @container (width > 30rem) {
    padding: 1.5rem;
  }
}`, notes: [] },
            { code: `.nav {
  flex-direction: column;
  @media (width >= 40rem) {
    flex-direction: row;
  }
}`, notes: [] },
            { code: `.hero {
  background: white;
  @media (prefers-color-scheme: dark) {
    background: #111;
  }
}`, notes: [] }
          ]
        },
        {
          id: "is-where", n: 4, title: ":is() and :where()", level: 2,
          gloss: "Groups selectors with :is for normal weight or with :where for zero specificity.",
          examples: [
            { code: `:is(h1, h2, h3) {
  line-height: 1.2;
}`, notes: [{ at: ":is", text: "takes its most specific argument" }] },
            { code: `.article :is(ul, ol) {
  padding-inline-start: 1.5rem;
}`, notes: [] },
            { code: `:where(ul, ol) {
  margin: 0;
  padding: 0;
}`, notes: [{ at: ":where", text: "zero specificity" }] },
            { code: `:where(.prose) a:is(:hover, :focus-visible) {
  text-decoration: underline;
}`, notes: [{ at: ":where(.prose)", text: "adds no specificity" }] }
          ]
        }
      ]
    },
    {
      id: "clamp-aspect-ratio-logical-properties",
      n: 13,
      title: "clamp, aspect-ratio, logical properties",
      concepts: [
        {
          id: "clamp-min-max", n: 1, title: "clamp, min and max", level: 2,
          gloss: "Bounds a value between limits with clamp, min and max.",
          examples: [
            { code: `h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}`, notes: [{ at: "clamp(2rem, 5vw, 4rem)", text: "min, preferred, max" }] },
            { code: `.container {
  width: min(100% - 2rem, 70rem);
}`, notes: [{ at: "min", text: "picks the smaller value" }] },
            { code: `.sidebar {
  width: max(12rem, 20%);
}`, notes: [{ at: "max", text: "picks the larger value" }] },
            { code: `.section {
  padding-block: clamp(2rem, 6vw, 6rem);
}`, notes: [] }
          ]
        },
        {
          id: "aspect-ratio", n: 2, title: "aspect-ratio", level: 1,
          gloss: "Keeps a box in a fixed proportion with aspect-ratio and object-fit.",
          examples: [
            { code: `.thumbnail {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
}`, notes: [{ at: "16 / 9", text: "width over height" }, { at: "object-fit: cover", text: "crops to fill the box" }] },
            { code: `.avatar {
  aspect-ratio: 1;
  width: 4rem;
  border-radius: 50%;
}`, notes: [{ at: "aspect-ratio: 1", text: "a square" }] },
            { code: `.poster {
  aspect-ratio: 2 / 3;
  width: 12rem;
}`, notes: [] },
            { code: `.card img {
  aspect-ratio: 4 / 3;
  object-fit: contain;
}`, notes: [] }
          ]
        },
        {
          id: "logical-spacing", n: 3, title: "logical margins and padding", level: 1,
          gloss: "Replaces left and right with inline and block properties that follow writing mode.",
          examples: [
            { code: `.card {
  margin-inline: auto;
  padding-block: 1rem;
}`, notes: [{ at: "inline", text: "the text direction axis" }, { at: "block", text: "the stacking direction axis" }] },
            { code: `.quote {
  border-inline-start: 4px solid gray;
  padding-inline-start: 1rem;
}`, notes: [{ at: "inline-start", text: "left in ltr, right in rtl" }] },
            { code: `.icon {
  margin-inline-end: 0.5rem;
}`, notes: [] },
            { code: `.title {
  margin-block: 0 1rem;
  text-align: start;
}`, notes: [{ at: "0 1rem", text: "block start, block end" }] }
          ]
        },
        {
          id: "logical-sizing", n: 4, title: "logical size and inset", level: 2,
          gloss: "Sizes and positions boxes with inline-size, block-size and inset properties.",
          examples: [
            { code: `.sidebar {
  inline-size: 16rem;
  min-block-size: 100vh;
}`, notes: [{ at: "inline-size", text: "logical width" }, { at: "min-block-size", text: "logical min-height" }] },
            { code: `.container {
  max-inline-size: 60rem;
}`, notes: [] },
            { code: `.badge {
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
}`, notes: [{ at: "inset-inline-end", text: "right in ltr" }] },
            { code: `.dialog {
  inline-size: min(90%, 32rem);
  max-block-size: 80vh;
  overflow-y: auto;
}`, notes: [] }
          ]
        }
      ]
    }
  ]
};
