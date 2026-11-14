export default {
  id: "tailwind",
  name: "Tailwind CSS",
  short: "TW",
  pigment: "tailwind",
  family: "css",
  version: "4.3",
  lexer: "tailwind",
  indent: 2,
  topics: [
    {
      id: "utility-classes",
      n: 1,
      title: "utility classes",
      concepts: [
        {
          id: "class-attribute", n: 1, title: "class attribute", level: 1,
          gloss: "Applies styles by listing single-purpose utilities in the class attribute.",
          examples: [
            { code: `<p class="text-lg font-bold">Total due</p>`, notes: [{ at: "class", text: "one utility per style" }, { at: "font-bold", text: "sets the font weight" }] },
            { code: `<h1 class="mt-4 text-2xl">Quarterly report</h1>`, notes: [{ at: "mt-4", text: "margin on the top" }] },
            { code: `<span class="rounded bg-amber-100 px-2">New</span>`, notes: [{ at: "bg-amber-100", text: "background color" }] }
          ]
        },
        {
          id: "combining-utilities", n: 2, title: "combining utilities", level: 1,
          gloss: "Combines several utilities on one element to build a complete design.",
          examples: [
            { code: `<button
  class="rounded bg-sky-600 px-4 py-2 text-white"
>
  Save
</button>`, notes: [{ at: "px-4", text: "horizontal padding" }, { at: "py-2", text: "vertical padding" }] },
            { code: `<a
  href="/inbox"
  class="font-medium text-sky-700 underline"
>
  Open inbox
</a>`, notes: [] },
            { code: `<div class="rounded-lg border p-4 shadow-sm">
  Invoice 1042 is paid
</div>`, notes: [{ at: "shadow-sm", text: "a small shadow" }] }
          ]
        },
        {
          id: "list-styles", n: 3, title: "list styles", level: 1,
          gloss: "Restores bullets and numbers that the base styles remove from lists.",
          examples: [
            { code: `<ul class="list-disc pl-5">
  <li>Draft</li>
  <li>Review</li>
</ul>`, notes: [{ at: "list-disc", text: "bullets come back" }] },
            { code: `<ol class="list-decimal space-y-1 pl-6">
  <li>Open</li>
  <li>Edit</li>
  <li>Save</li>
</ol>`, notes: [] },
            { code: `<ul class="list-none">
  <li>Oslo</li>
  <li>Bergen</li>
</ul>`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "spacing",
      n: 2,
      title: "spacing",
      concepts: [
        {
          id: "padding", n: 1, title: "padding", level: 1,
          gloss: "Adds inner space with p, px, py and the single-side variants.",
          examples: [
            { code: `<div class="p-4">Card body</div>`, notes: [{ at: "p-4", text: "padding on all sides" }] },
            { code: `<div class="px-6 py-3">Toolbar</div>`, notes: [] },
            { code: `<div class="pt-8 pr-2 pb-4 pl-2">Section</div>`, notes: [{ at: "pt-8", text: "top only" }] },
            { code: `<div class="ps-4 pe-2">Chapter</div>`, notes: [{ at: "ps-4", text: "start side, follows direction" }] }
          ]
        },
        {
          id: "margin", n: 2, title: "margin", level: 1,
          gloss: "Adds outer space with m, mx, my and automatic margins.",
          examples: [
            { code: `<h2 class="mb-2">Overview</h2>`, notes: [] },
            { code: `<div class="mx-auto max-w-md">Centered column</div>`, notes: [{ at: "mx-auto", text: "centers horizontally" }] },
            { code: `<p class="mt-6 mb-0">Footer note</p>`, notes: [] },
            { code: `<img class="-mt-4" src="logo.png" alt="Logo" />`, notes: [{ at: "-mt-4", text: "negative margin" }] }
          ]
        },
        {
          id: "child-spacing", n: 3, title: "child spacing", level: 2,
          gloss: "Spaces direct children evenly with the space-x and space-y utilities.",
          examples: [
            { code: `<ul class="space-y-2">
  <li>Inbox</li>
  <li>Sent</li>
  <li>Drafts</li>
</ul>`, notes: [{ at: "space-y-2", text: "gap between stacked items" }] },
            { code: `<div class="flex space-x-3">
  <span>Read</span>
  <span>Edit</span>
</div>`, notes: [] },
            { code: `<nav class="space-y-4">
  <a href="/home">Home</a>
  <a href="/docs">Docs</a>
</nav>`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "sizing",
      n: 3,
      title: "sizing",
      concepts: [
        {
          id: "width-height", n: 1, title: "width and height", level: 1,
          gloss: "Sets width and height from the spacing scale, fractions or keywords.",
          examples: [
            { code: `<div class="h-12 w-48">Banner</div>`, notes: [{ at: "w-48", text: "12rem wide" }] },
            { code: `<div class="w-1/2">Half the parent</div>`, notes: [{ at: "w-1/2", text: "a fraction of the parent" }] },
            { code: `<main class="h-screen w-full">Workspace</main>`, notes: [{ at: "h-screen", text: "full viewport height" }] }
          ]
        },
        {
          id: "size-shorthand", n: 2, title: "size shorthand", level: 1,
          gloss: "Sets width and height together with the size utility.",
          examples: [
            { code: `<div class="size-10 rounded-full bg-sky-500"></div>`, notes: [{ at: "size-10", text: "width and height at once" }] },
            { code: `<img class="size-16" src="ada.png" alt="Ada" />`, notes: [] },
            { code: `<button class="size-8 rounded bg-slate-200">+</button>`, notes: [] }
          ]
        },
        {
          id: "min-max", n: 3, title: "min and max limits", level: 2,
          gloss: "Limits growth and shrinking with min and max width or height.",
          examples: [
            { code: `<article class="max-w-prose">Long form text</article>`, notes: [{ at: "max-w-prose", text: "about 65 characters wide" }] },
            { code: `<section class="min-h-screen">Landing</section>`, notes: [] },
            { code: `<div class="w-full max-w-sm min-w-0">Narrow card</div>`, notes: [{ at: "min-w-0", text: "lets flex children shrink" }] }
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
          id: "size-weight", n: 1, title: "size and weight", level: 1,
          gloss: "Sets font size and weight with the text and font utilities.",
          examples: [
            { code: `<p class="text-sm font-medium">Email address</p>`, notes: [{ at: "text-sm", text: "small text size" }] },
            { code: `<h1 class="text-4xl font-bold">Dashboard</h1>`, notes: [] },
            { code: `<p class="text-base font-light">Release notes</p>`, notes: [] }
          ]
        },
        {
          id: "color-alignment", n: 2, title: "color and alignment", level: 1,
          gloss: "Sets text color and alignment with the text utilities.",
          examples: [
            { code: `<p class="text-center text-slate-600">No results</p>`, notes: [{ at: "text-center", text: "alignment" }, { at: "text-slate-600", text: "color" }] },
            { code: `<p class="text-right text-red-700">Overdue</p>`, notes: [] },
            { code: `<p class="text-slate-900 uppercase">Paid</p>`, notes: [{ at: "uppercase", text: "transforms the letters" }] }
          ]
        },
        {
          id: "spacing-text", n: 3, title: "line height and tracking", level: 2,
          gloss: "Controls line height and letter spacing with leading and tracking.",
          examples: [
            { code: `<p class="leading-relaxed">
  Our team reviews every request within a day.
</p>`, notes: [{ at: "leading-relaxed", text: "taller line height" }] },
            { code: `<h2 class="text-xs tracking-wide uppercase">Section</h2>`, notes: [{ at: "tracking-wide", text: "wider letter spacing" }] },
            { code: `<p class="leading-6 tracking-tight">Compact summary</p>`, notes: [] }
          ]
        },
        {
          id: "truncation", n: 4, title: "truncation", level: 2,
          gloss: "Cuts long text to one line or a fixed number of lines.",
          examples: [
            { code: `<p class="w-48 truncate">
  Annual maintenance agreement for building two
</p>`, notes: [{ at: "truncate", text: "single line with ellipsis" }] },
            { code: `<p class="line-clamp-2">
  The committee will meet on Thursday to review the budget and the
  staffing plan for the next quarter.
</p>`, notes: [{ at: "line-clamp-2", text: "stops after two lines" }] },
            { code: `<h3 class="line-clamp-1 text-lg">Warehouse inventory report</h3>`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "colors",
      n: 5,
      title: "colors",
      concepts: [
        {
          id: "palette", n: 1, title: "palette", level: 1,
          gloss: "Applies palette colors to text, backgrounds and borders by shade.",
          examples: [
            { code: `<div class="bg-slate-100 text-slate-800">Note</div>`, notes: [{ at: "bg-slate-100", text: "light shade" }] },
            { code: `<p class="border border-emerald-500 text-emerald-700">Saved</p>`, notes: [] },
            { code: `<span class="bg-rose-50 text-rose-700">Failed</span>`, notes: [] }
          ]
        },
        {
          id: "opacity-modifier", n: 2, title: "opacity modifier", level: 2,
          gloss: "Adds transparency to a color by appending a slash and a percentage.",
          examples: [
            { code: `<div class="bg-sky-500/20 p-4">Highlighted</div>`, notes: [{ at: "/20", text: "twenty percent alpha" }] },
            { code: `<p class="text-black/60">Secondary text</p>`, notes: [] },
            { code: `<div class="border border-slate-900/10 p-4">Panel</div>`, notes: [] }
          ]
        },
        {
          id: "gradients", n: 3, title: "gradients", level: 2,
          gloss: "Builds gradients from a direction utility and color stops.",
          examples: [
            { code: `<div class="bg-linear-to-r from-sky-500 to-indigo-600 p-6">
  Welcome
</div>`, notes: [{ at: "bg-linear-to-r", text: "left to right" }, { at: "from-sky-500", text: "start color" }] },
            { code: `<div class="bg-linear-to-b from-white via-sky-50 to-sky-100">
  Hero
</div>`, notes: [{ at: "via-sky-50", text: "middle stop" }] },
            { code: `<div class="bg-radial from-amber-200 to-orange-400 p-8">
  Sale
</div>`, notes: [{ at: "bg-radial", text: "circular gradient" }] }
          ]
        }
      ]
    },
    {
      id: "flexbox",
      n: 6,
      title: "flexbox",
      concepts: [
        {
          id: "direction", n: 1, title: "direction", level: 1,
          gloss: "Lays children out in a row or a column with flex.",
          examples: [
            { code: `<div class="flex">
  <span>Left</span>
  <span>Right</span>
</div>`, notes: [{ at: "flex", text: "children in a row" }] },
            { code: `<div class="flex flex-col">
  <span>Top</span>
  <span>Bottom</span>
</div>`, notes: [{ at: "flex-col", text: "children in a column" }] },
            { code: `<div class="flex flex-row-reverse">
  <span>One</span>
  <span>Two</span>
</div>`, notes: [] }
          ]
        },
        {
          id: "alignment", n: 2, title: "alignment", level: 1,
          gloss: "Aligns flex children with the justify and items utilities.",
          examples: [
            { code: `<div class="flex justify-between">
  <span>Total</span>
  <span>$42</span>
</div>`, notes: [{ at: "justify-between", text: "pushes items apart" }] },
            { code: `<div class="flex items-center gap-2">
  <span>Status</span>
  <span>Open</span>
</div>`, notes: [{ at: "items-center", text: "centers on the cross axis" }] },
            { code: `<div class="flex h-40 items-end justify-center">
  <button>Save</button>
</div>`, notes: [] }
          ]
        },
        {
          id: "gap-wrap-grow", n: 3, title: "gap, wrap and grow", level: 2,
          gloss: "Adds gaps and lets items wrap, grow or hold their size.",
          examples: [
            { code: `<div class="flex flex-wrap gap-2">
  <span>tag-a</span>
  <span>tag-b</span>
</div>`, notes: [{ at: "flex-wrap", text: "items move to a new line" }, { at: "gap-2", text: "space between items" }] },
            { code: `<div class="flex">
  <input class="flex-1" />
  <button class="shrink-0">Go</button>
</div>`, notes: [{ at: "flex-1", text: "grows to fill the row" }, { at: "shrink-0", text: "keeps its width" }] },
            { code: `<div class="flex gap-x-4 gap-y-1">
  <span>One</span>
  <span>Two</span>
</div>`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "grid",
      n: 7,
      title: "grid",
      concepts: [
        {
          id: "columns", n: 1, title: "columns", level: 1,
          gloss: "Splits a container into equal columns with grid-cols.",
          examples: [
            { code: `<div class="grid grid-cols-3 gap-4">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</div>`, notes: [{ at: "grid-cols-3", text: "three equal columns" }] },
            { code: `<ul class="grid grid-cols-2 gap-2">
  <li>Mon</li>
  <li>Tue</li>
</ul>`, notes: [] },
            { code: `<div class="grid grid-cols-4 gap-x-6 gap-y-2">
  <span>Name</span>
  <span>Role</span>
</div>`, notes: [{ at: "gap-x-6", text: "column gap only" }] }
          ]
        },
        {
          id: "spans", n: 2, title: "spans", level: 2,
          gloss: "Stretches an item across columns or rows with the span utilities.",
          examples: [
            { code: `<div class="grid grid-cols-3">
  <div class="col-span-2">Wide</div>
  <div>Narrow</div>
</div>`, notes: [{ at: "col-span-2", text: "covers two columns" }] },
            { code: `<div class="grid grid-cols-2 grid-rows-2">
  <div class="row-span-2">Tall</div>
  <div>A</div>
  <div>B</div>
</div>`, notes: [] },
            { code: `<div class="grid grid-cols-4">
  <div class="col-start-2 col-end-4">Middle</div>
</div>`, notes: [{ at: "col-start-2", text: "begins at line two" }] }
          ]
        },
        {
          id: "flow-placement", n: 3, title: "flow and placement", level: 2,
          gloss: "Controls auto placement and alignment inside grid cells.",
          examples: [
            { code: `<div class="grid grid-flow-col auto-cols-fr gap-2">
  <div>One</div>
  <div>Two</div>
</div>`, notes: [{ at: "grid-flow-col", text: "fills columns first" }] },
            { code: `<div class="grid auto-rows-fr gap-2">
  <div>Row one</div>
  <div>Row two</div>
</div>`, notes: [] },
            { code: `<div class="grid h-40 place-items-center">
  <span>Centered</span>
</div>`, notes: [{ at: "place-items-center", text: "centers both ways" }] }
          ]
        }
      ]
    },
    {
      id: "borders-shadows",
      n: 8,
      title: "borders and shadows",
      concepts: [
        {
          id: "border-radius", n: 1, title: "border and radius", level: 1,
          gloss: "Draws borders and rounds corners with the border and rounded utilities.",
          examples: [
            { code: `<div class="rounded-md border border-slate-300 p-3">Card</div>`, notes: [{ at: "rounded-md", text: "medium corner radius" }] },
            { code: `<img class="rounded-full" src="ada.png" alt="Ada" />`, notes: [] },
            { code: `<div class="rounded-t-lg border-b-2 border-sky-500">Tab</div>`, notes: [{ at: "rounded-t-lg", text: "only the top corners" }, { at: "border-b-2", text: "two pixel bottom border" }] }
          ]
        },
        {
          id: "ring-outline", n: 2, title: "ring and outline", level: 2,
          gloss: "Adds focus rings and outlines that do not change layout.",
          examples: [
            { code: `<button class="rounded px-3 py-1 ring-2 ring-sky-500">Save</button>`, notes: [{ at: "ring-2", text: "a two pixel ring" }] },
            { code: `<div class="ring-1 ring-slate-900/10">Panel</div>`, notes: [] },
            { code: `<a
  href="/docs"
  class="outline-2 outline-offset-2 outline-sky-600"
>
  Docs
</a>`, notes: [{ at: "outline-offset-2", text: "gap before the outline" }] }
          ]
        },
        {
          id: "shadows", n: 3, title: "shadows", level: 1,
          gloss: "Raises elements with box shadows in several sizes and colors.",
          examples: [
            { code: `<div class="shadow-sm">Subtle</div>`, notes: [] },
            { code: `<div class="shadow-lg shadow-sky-500/20">Colored glow</div>`, notes: [{ at: "shadow-sky-500/20", text: "tinted shadow color" }] },
            { code: `<img class="drop-shadow-md" src="logo.svg" alt="Logo" />`, notes: [{ at: "drop-shadow-md", text: "follows the image shape" }] }
          ]
        }
      ]
    },
    {
      id: "responsive",
      n: 9,
      title: "responsive design",
      concepts: [
        {
          id: "breakpoint-prefixes", n: 1, title: "breakpoint prefixes", level: 1,
          gloss: "Applies a utility only from a screen width upward with a prefix.",
          examples: [
            { code: `<div class="hidden md:flex">Desktop menu</div>`, notes: [{ at: "md:", text: "from 768px upward" }] },
            { code: `<h1 class="text-xl sm:text-2xl lg:text-4xl">Pricing</h1>`, notes: [] },
            { code: `<aside class="hidden lg:block">Sidebar</aside>`, notes: [] }
          ]
        },
        {
          id: "mobile-first", n: 2, title: "mobile first", level: 1,
          gloss: "Styles the smallest screen first and overrides it at larger widths.",
          examples: [
            { code: `<div class="w-full md:w-1/2">Form</div>`, notes: [{ at: "w-full", text: "applies to every screen" }] },
            { code: `<ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
  <li>Card</li>
</ul>`, notes: [] },
            { code: `<main class="p-2 sm:p-4 lg:p-8">Content</main>`, notes: [] }
          ]
        },
        {
          id: "container-queries", n: 3, title: "container queries", level: 3,
          gloss: "Responds to the width of a parent container instead of the screen.",
          examples: [
            { code: `<div class="@container">
  <div class="grid grid-cols-1 @md:grid-cols-2">
    <div>Chart</div>
    <div>Legend</div>
  </div>
</div>`, notes: [{ at: "@container", text: "marks the query container" }, { at: "@md:", text: "container wider than 28rem" }] },
            { code: `<div class="@container/card">
  <p class="@sm/card:text-lg">Order summary</p>
</div>`, notes: [{ at: "@container/card", text: "a named container" }] },
            { code: `<div class="@container">
  <nav class="flex flex-col @lg:flex-row">Links</nav>
</div>`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "state-variants",
      n: 10,
      title: "state variants",
      concepts: [
        {
          id: "hover-focus", n: 1, title: "hover and focus", level: 1,
          gloss: "Styles interaction states with hover, focus and active prefixes.",
          examples: [
            { code: `<button class="bg-sky-600 hover:bg-sky-700">Save</button>`, notes: [{ at: "hover:", text: "only while hovered" }] },
            { code: `<input class="rounded border focus:ring-2 focus:ring-sky-500" />`, notes: [{ at: "focus:", text: "while the input has focus" }] },
            { code: `<a href="/docs" class="underline active:text-sky-900">Docs</a>`, notes: [] }
          ]
        },
        {
          id: "form-states", n: 2, title: "form states", level: 2,
          gloss: "Styles disabled, invalid and checked inputs with state prefixes.",
          examples: [
            { code: `<button class="bg-sky-600 disabled:opacity-50" disabled>Send</button>`, notes: [{ at: "disabled:", text: "when the disabled attribute is set" }] },
            { code: `<input
  type="email"
  class="border invalid:border-red-500"
/>`, notes: [{ at: "invalid:", text: "fails validation" }] },
            { code: `<input type="checkbox" class="size-4 checked:accent-sky-600" />`, notes: [] }
          ]
        },
        {
          id: "attribute-variants", n: 3, title: "aria and data", level: 3,
          gloss: "Reacts to aria and data attributes without custom CSS.",
          examples: [
            { code: `<button class="rotate-0 aria-expanded:rotate-180" aria-expanded="true">
  Menu
</button>`, notes: [{ at: "aria-expanded:", text: "matches the aria attribute" }] },
            { code: `<div
  class="data-[state=open]:bg-slate-100"
  data-state="open"
>
  Panel
</div>`, notes: [{ at: "data-[state=open]:", text: "matches a data value" }] },
            { code: `<li class="aria-selected:font-bold" aria-selected="true">Inbox</li>`, notes: [] }
          ]
        },
        {
          id: "group-peer", n: 4, title: "group and peer", level: 2,
          gloss: "Styles one element from the state of a parent or a sibling.",
          examples: [
            { code: `<a href="/docs" class="group">
  <span class="group-hover:underline">Read the docs</span>
</a>`, notes: [{ at: "group", text: "marks the parent" }, { at: "group-hover:", text: "reacts to the parent" }] },
            { code: `<input id="agree" type="checkbox" class="peer" />
<label for="agree" class="peer-checked:font-bold">
  I agree
</label>`, notes: [{ at: "peer-checked:", text: "reacts to the sibling" }] },
            { code: `<label class="has-checked:bg-sky-50">
  <input type="radio" name="plan" />
  Monthly
</label>`, notes: [{ at: "has-checked:", text: "a checked child inside" }] }
          ]
        }
      ]
    },
    {
      id: "dark-mode",
      n: 11,
      title: "dark mode",
      concepts: [
        {
          id: "dark-variant", n: 1, title: "dark variant", level: 1,
          gloss: "Applies a style only when the system prefers a dark color scheme.",
          examples: [
            { code: `<div class="bg-white dark:bg-slate-900">Card</div>`, notes: [{ at: "dark:", text: "when the scheme is dark" }] },
            { code: `<p class="text-slate-900 dark:text-slate-100">Readable text</p>`, notes: [] },
            { code: `<hr class="border-slate-200 dark:border-slate-700" />`, notes: [] }
          ]
        },
        {
          id: "stacked-variants", n: 2, title: "stacked variants", level: 2,
          gloss: "Stacks variants so a style needs several conditions at once.",
          examples: [
            { code: `<button class="hover:bg-sky-700 dark:hover:bg-sky-400">Save</button>`, notes: [{ at: "dark:hover:", text: "dark and hovered" }] },
            { code: `<div class="md:dark:bg-slate-800">Panel</div>`, notes: [] },
            { code: `<a class="dark:focus:ring-sky-400 focus:ring-2" href="/home">Home</a>`, notes: [] }
          ]
        },
        {
          id: "class-toggle", n: 3, title: "class based toggle", level: 3,
          gloss: "Switches dark mode from a class or attribute instead of the system.",
          examples: [
            { code: `@custom-variant dark (&:where(.dark, .dark *));`, notes: [{ at: "@custom-variant", text: "defines a variant" }] },
            { code: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`, notes: [] },
            { code: `<html class="dark">
  <body class="bg-white dark:bg-slate-900">Page</body>
</html>`, notes: [{ at: "class=\"dark\"", text: "turns the dark variant on" }] }
          ]
        }
      ]
    },
    {
      id: "arbitrary-values",
      n: 12,
      title: "arbitrary values",
      concepts: [
        {
          id: "square-brackets", n: 1, title: "square brackets", level: 2,
          gloss: "Uses a one-off value inside brackets when the scale has no match.",
          examples: [
            { code: `<div class="w-[320px]">Sidebar</div>`, notes: [{ at: "w-[320px]", text: "an exact width" }] },
            { code: `<div class="bg-[#1da1f2] text-white">Brand</div>`, notes: [] },
            { code: `<div class="h-[calc(100vh-4rem)]">Workspace</div>`, notes: [{ at: "calc(", text: "math inside brackets" }] },
            { code: `<div class="grid grid-cols-[200px_1fr]">
  <nav>Menu</nav>
  <main>Content</main>
</div>`, notes: [{ at: "_", text: "stands for a space" }] }
          ]
        },
        {
          id: "variable-shorthand", n: 2, title: "variable shorthand", level: 2,
          gloss: "Reads a CSS variable with parentheses instead of brackets.",
          examples: [
            { code: `<div class="bg-(--brand-color)">Banner</div>`, notes: [{ at: "(--brand-color)", text: "shorthand for var()" }] },
            { code: `<aside class="w-(--sidebar-width)">Filters</aside>`, notes: [] },
            { code: `<p class="text-(length:--heading-size)">Title</p>`, notes: [{ at: "length:", text: "hints the value type" }] }
          ]
        },
        {
          id: "arbitrary-properties", n: 3, title: "arbitrary properties", level: 3,
          gloss: "Writes any CSS property or selector variant directly in a class.",
          examples: [
            { code: `<div class="[mask-type:luminance]">Mask</div>`, notes: [{ at: "[mask-type:luminance]", text: "a raw CSS property" }] },
            { code: `<ul class="[&>li]:py-1">
  <li>Mon</li>
  <li>Tue</li>
</ul>`, notes: [{ at: "[&>li]:", text: "targets direct children" }] },
            { code: `<div class="[--gap:1rem] gap-(--gap) flex">
  <span>One</span>
  <span>Two</span>
</div>`, notes: [] }
          ]
        },
        {
          id: "important-modifier", n: 4, title: "important modifier", level: 3,
          gloss: "Forces a utility to win by adding an exclamation mark at the end.",
          examples: [
            { code: `<p class="text-red-600!">Overdue</p>`, notes: [{ at: "!", text: "adds important" }] },
            { code: `<div class="p-0! bg-white">Reset box</div>`, notes: [] },
            { code: `<button class="hover:bg-sky-700!">Save</button>`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "theme",
      n: 13,
      title: "theme variables",
      concepts: [
        {
          id: "import-source", n: 1, title: "import and source", level: 1,
          gloss: "Loads Tailwind into a stylesheet and registers extra source paths.",
          examples: [
            { code: `@import "tailwindcss";`, notes: [{ at: "@import", text: "pulls in the framework" }] },
            { code: `@import "tailwindcss" prefix(tw);`, notes: [{ at: "prefix(tw)", text: "classes start with tw:" }] },
            { code: `@import "tailwindcss";
@source "../node_modules/ui-kit";`, notes: [{ at: "@source", text: "scans another folder" }] }
          ]
        },
        {
          id: "theme-colors", n: 2, title: "theme colors", level: 2,
          gloss: "Declares design tokens in a theme block that become utilities.",
          examples: [
            { code: `@theme {
  --color-brand: #0369a1;
}`, notes: [{ at: "@theme", text: "declares design tokens" }, { at: "--color-brand", text: "creates bg-brand and text-brand" }] },
            { code: `@theme {
  --color-sand-100: #f5efe6;
  --color-sand-900: #3b2f20;
}`, notes: [] },
            { code: `@theme {
  --color-*: initial;
  --color-ink: #111827;
  --color-paper: #fafaf9;
}`, notes: [{ at: "--color-*: initial", text: "clears the default palette" }] }
          ]
        },
        {
          id: "theme-scales", n: 3, title: "fonts and breakpoints", level: 2,
          gloss: "Adds fonts, breakpoints and spacing through theme variables.",
          examples: [
            { code: `@theme {
  --font-display: "Fraunces", serif;
}`, notes: [{ at: "--font-display", text: "creates font-display" }] },
            { code: `@theme {
  --breakpoint-3xl: 120rem;
}`, notes: [{ at: "--breakpoint-3xl", text: "creates the 3xl: prefix" }] },
            { code: `@theme {
  --spacing: 0.3rem;
  --radius-card: 0.75rem;
}`, notes: [{ at: "--spacing", text: "base unit for the scale" }] }
          ]
        },
        {
          id: "theme-usage", n: 4, title: "using the variables", level: 2,
          gloss: "Reads theme tokens in custom CSS and keeps references live with inline.",
          examples: [
            { code: `.banner {
  background: var(--color-sky-600);
  padding: calc(var(--spacing) * 4);
}`, notes: [{ at: "var(--color-sky-600)", text: "theme tokens are CSS variables" }] },
            { code: `@theme inline {
  --font-body: var(--font-inter);
}`, notes: [{ at: "inline", text: "inlines the referenced value" }] },
            { code: `@theme {
  --color-brand: oklch(0.55 0.15 240);
}`, notes: [{ at: "oklch(", text: "perceptual color format" }] }
          ]
        }
      ]
    },
    {
      id: "custom-css",
      n: 14,
      title: "custom css",
      concepts: [
        {
          id: "apply", n: 1, title: "apply", level: 1,
          gloss: "Reuses utilities inside a custom class with the apply directive.",
          examples: [
            { code: `.btn {
  @apply rounded bg-sky-600 px-4 py-2 text-white;
}`, notes: [{ at: "@apply", text: "inlines the utilities" }] },
            { code: `.btn:hover {
  @apply bg-sky-700;
}`, notes: [] },
            { code: `.card {
  @apply rounded-lg border p-4 shadow-sm;
}`, notes: [] }
          ]
        },
        {
          id: "utility-directive", n: 2, title: "utility directive", level: 3,
          gloss: "Defines a custom utility that works with variants like any built in one.",
          examples: [
            { code: `@utility tab-4 {
  tab-size: 4;
}`, notes: [{ at: "@utility", text: "registers a new class" }] },
            { code: `@utility scrollbar-none {
  scrollbar-width: none;
}`, notes: [] },
            { code: `@utility content-auto {
  content-visibility: auto;
}`, notes: [] }
          ]
        },
        {
          id: "custom-variants", n: 3, title: "custom variants", level: 3,
          gloss: "Creates a new prefix from a selector and nests variants inside CSS.",
          examples: [
            { code: `@custom-variant theme-midnight (&:where([data-theme=midnight] *));`, notes: [{ at: "theme-midnight", text: "usable as theme-midnight:" }] },
            { code: `.card {
  background: white;

  @variant dark {
    background: black;
  }
}`, notes: [{ at: "@variant", text: "applies a variant in CSS" }] },
            { code: `@custom-variant any-hover {
  @media (any-hover: hover) {
    &:hover {
      @slot;
    }
  }
}`, notes: [{ at: "@slot", text: "where the utility styles go" }] }
          ]
        },
        {
          id: "layers", n: 4, title: "layers", level: 2,
          gloss: "Places base and component styles in layers so utilities still win.",
          examples: [
            { code: `@layer base {
  h1 {
    font-size: var(--text-2xl);
  }
}`, notes: [{ at: "@layer base", text: "low priority defaults" }] },
            { code: `@layer components {
  .badge {
    @apply rounded-full bg-sky-100 px-2 text-sky-800;
  }
}`, notes: [{ at: "@layer components", text: "reusable classes" }] },
            { code: `@layer base {
  a {
    color: var(--color-sky-700);
  }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "transitions-transforms",
      n: 15,
      title: "transitions and transforms",
      concepts: [
        {
          id: "transitions", n: 1, title: "transitions", level: 1,
          gloss: "Animates property changes with transition, duration and easing utilities.",
          examples: [
            { code: `<button class="bg-sky-600 transition hover:bg-sky-700">Save</button>`, notes: [{ at: "transition", text: "animates common properties" }] },
            { code: `<a href="/docs" class="transition-colors duration-200 ease-out">Docs</a>`, notes: [{ at: "duration-200", text: "two hundred milliseconds" }] },
            { code: `<div class="opacity-0 transition delay-150 hover:opacity-100">
  Tooltip
</div>`, notes: [{ at: "delay-150", text: "waits before starting" }] }
          ]
        },
        {
          id: "transforms", n: 2, title: "transforms", level: 2,
          gloss: "Transforms elements by scaling, rotating or moving them without a layout shift.",
          examples: [
            { code: `<div class="transition hover:scale-105">Product card</div>`, notes: [{ at: "scale-105", text: "five percent larger" }] },
            { code: `<span class="inline-block rotate-3">Sticker</span>`, notes: [] },
            { code: `<div class="transition hover:-translate-y-1 hover:shadow-lg">
  Lift
</div>`, notes: [{ at: "-translate-y-1", text: "moves up" }] }
          ]
        },
        {
          id: "animations", n: 3, title: "animations", level: 2,
          gloss: "Runs built in or custom keyframe animations with animate utilities.",
          examples: [
            { code: `<div class="size-6 animate-spin rounded-full border-2"></div>`, notes: [{ at: "animate-spin", text: "endless rotation" }] },
            { code: `<div class="animate-pulse rounded bg-slate-200 h-4 w-32"></div>`, notes: [] },
            { code: `@theme {
  --animate-wiggle: wiggle 1s ease-in-out infinite;

  @keyframes wiggle {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }
}`, notes: [{ at: "--animate-wiggle", text: "creates animate-wiggle" }] }
          ]
        }
      ]
    }
  ]
};
