export default {
  id: "svelte",
  name: "Svelte",
  short: "SV",
  pigment: "svelte",
  family: "javascript",
  version: "5.57",
  lexer: "svelte",
  indent: 2,
  topics: [
    {
      id: "reactive-state",
      n: 1,
      title: "reactive state",
      concepts: [
        {
          id: "state-rune", n: 1, title: "$state rune", level: 1,
          gloss: "Declares reactive state with the $state rune.",
          examples: [
            { code: `<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>
  Clicked {count} times
</button>`, notes: [{ at: "$state(0)", text: "runes need no import" }, { at: "count++", text: "plain assignment updates the ui" }] },
            { code: `<script>
  let name = $state("Ada");
</script>

<input bind:value={name} />
<p>Hello, {name}</p>`, notes: [{ at: "bind:value", text: "input writes back to state" }] },
            { code: `<script>
  let open = $state(false);
</script>

<button onclick={() => (open = !open)}>
  {open ? "Hide" : "Show"} details
</button>`, notes: [{ at: "open = !open", text: "reassign to toggle" }] }
          ]
        },
        {
          id: "deep-state", n: 2, title: "objects & arrays", level: 2,
          gloss: "Makes objects and arrays deeply reactive so property changes update the page.",
          examples: [
            { code: `<script>
  let user = $state({ name: "Ada", visits: 1 });
</script>

<button onclick={() => user.visits++}>
  {user.name}: {user.visits}
</button>`, notes: [{ at: "user.visits++", text: "nested change is tracked" }] },
            { code: `<script>
  let todos = $state(["Write docs"]);
</script>

<button onclick={() => todos.push("Ship release")}>
  {todos.length} todos
</button>`, notes: [{ at: "todos.push", text: "array methods are reactive" }] },
            { code: `<script>
  let cart = $state({ items: [{ sku: "A1", qty: 1 }] });
</script>

<button onclick={() => cart.items[0].qty++}>
  Quantity: {cart.items[0].qty}
</button>`, notes: [{ at: "cart.items[0].qty", text: "deep proxies track every level" }] }
          ]
        },
        {
          id: "raw-snapshot", n: 3, title: "raw state & snapshots", level: 3,
          gloss: "Opts out of deep reactivity with $state.raw and copies state with $state.snapshot.",
          examples: [
            { code: `<script>
  let points = $state.raw([1, 2, 3]);
</script>

<button onclick={() => (points = [...points, points.length + 1])}>
  {points.join(", ")}
</button>`, notes: [{ at: "$state.raw", text: "only reassignment updates" }] },
            { code: `<script>
  let form = $state({ email: "", agreed: false });
  const save = () => console.log($state.snapshot(form));
</script>

<button onclick={save}>Save</button>`, notes: [{ at: "$state.snapshot", text: "plain copy without the proxy" }] },
            { code: `<script>
  let config = $state.raw({ theme: "dark", size: 14 });
</script>

<button onclick={() => (config = { ...config, size: config.size + 1 })}>
  {config.theme} {config.size}
</button>`, notes: [{ at: "...config", text: "copy then replace the object" }] }
          ]
        }
      ]
    },
    {
      id: "derived-values",
      n: 2,
      title: "derived values",
      concepts: [
        {
          id: "derived-rune", n: 1, title: "$derived", level: 1,
          gloss: "Computes a value from other state that updates when they change.",
          examples: [
            { code: `<script>
  let count = $state(2);
  let doubled = $derived(count * 2);
</script>

<button onclick={() => count++}>{count} x 2 = {doubled}</button>`, notes: [{ at: "$derived", text: "no import needed" }, { at: "count * 2", text: "reruns when count changes" }] },
            { code: `<script>
  let first = $state("Ada");
  let last = $state("Lovelace");
  let full = $derived(\`\${first} \${last}\`);
</script>

<p>{full}</p>`, notes: [{ at: "`${first} ${last}`", text: "tracks both sources" }] },
            { code: `<script>
  let prices = $state([4, 12, 7]);
  let total = $derived(prices.reduce((a, b) => a + b, 0));
</script>

<button onclick={() => prices.push(10)}>Total: {total}</button>`, notes: [{ at: "prices.reduce", text: "updates after push" }] }
          ]
        },
        {
          id: "derived-by", n: 2, title: "$derived.by", level: 2,
          gloss: "Runs a function body to compute a derived value with several statements.",
          examples: [
            { code: `<script>
  let items = $state([{ price: 5 }, { price: 8 }]);
  let total = $derived.by(() => {
    let sum = 0;
    for (const item of items) sum += item.price;
    return sum;
  });
</script>

<p>Total: {total}</p>`, notes: [{ at: "$derived.by", text: "takes a function" }] },
            { code: `<script>
  let query = $state("");
  let names = ["ada", "grace", "linus"];
  let matches = $derived.by(() => {
    return names.filter((n) => n.includes(query));
  });
</script>

<input bind:value={query} />
<p>{matches.length} matches</p>`, notes: [{ at: "return", text: "the returned value is derived" }] },
            { code: `<script>
  let raw = $state(120);
  let level = $derived.by(() => {
    if (raw > 100) return 100;
    return Math.max(raw, 0);
  });
</script>

<input type="number" bind:value={raw} />
<p>Level: {level}</p>`, notes: [{ at: "if (raw > 100)", text: "branching is allowed here" }] }
          ]
        },
        {
          id: "derived-chains", n: 3, title: "chained derived values", level: 2,
          gloss: "Builds derived values on top of other derived values.",
          examples: [
            { code: `<script>
  let width = $state(4);
  let height = $state(3);
  let area = $derived(width * height);
  let label = $derived(area > 10 ? "large" : "small");
</script>

<p>{area} is {label}</p>`, notes: [{ at: "area > 10", text: "reads another derived value" }] },
            { code: `<script>
  let celsius = $state(20);
  let fahrenheit = $derived(celsius * 1.8 + 32);
  let advice = $derived(fahrenheit > 80 ? "hot" : "mild");
</script>

<input type="number" bind:value={celsius} />
<p>{fahrenheit}F, {advice}</p>`, notes: [{ at: "fahrenheit > 80", text: "depends on the first derived" }] },
            { code: `<script>
  let tasks = $state([{ done: true }, { done: false }]);
  let remaining = $derived(tasks.filter((t) => !t.done));
  let summary = $derived(\`\${remaining.length} of \${tasks.length} left\`);
</script>

<p>{summary}</p>`, notes: [{ at: "remaining.length", text: "filtered list feeds the text" }] }
          ]
        }
      ]
    },
    {
      id: "effects",
      n: 3,
      title: "effects",
      concepts: [
        {
          id: "effect-rune", n: 1, title: "$effect", level: 1,
          gloss: "Runs code after the DOM updates whenever the state it reads changes.",
          examples: [
            { code: `<script>
  let count = $state(0);
  $effect(() => {
    document.title = \`Count: \${count}\`;
  });
</script>

<button onclick={() => count++}>{count}</button>`, notes: [{ at: "$effect", text: "no import needed" }, { at: "count", text: "reading it registers a dependency" }] },
            { code: `<script>
  let query = $state("");
  $effect(() => {
    console.log("searching for", query);
  });
</script>

<input bind:value={query} />`, notes: [{ at: "console.log", text: "runs again on every change" }] },
            { code: `<script>
  let theme = $state("light");
  $effect(() => {
    localStorage.setItem("theme", theme);
  });
</script>

<button onclick={() => (theme = theme === "light" ? "dark" : "light")}>
  {theme}
</button>`, notes: [{ at: "localStorage.setItem", text: "sync state to storage" }] }
          ]
        },
        {
          id: "effect-cleanup", n: 2, title: "effect cleanup", level: 2,
          gloss: "Returns a function from an effect to tear down timers and listeners.",
          examples: [
            { code: `<script>
  let seconds = $state(0);
  $effect(() => {
    const id = setInterval(() => seconds++, 1000);
    return () => clearInterval(id);
  });
</script>

<p>{seconds} seconds</p>`, notes: [{ at: "return () =>", text: "runs before the next run" }] },
            { code: `<script>
  let width = $state(0);
  $effect(() => {
    const update = () => (width = window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  });
</script>

<p>{width}px wide</p>`, notes: [{ at: "removeEventListener", text: "mirrors the add call" }] },
            { code: `<script>
  let query = $state("");
  let debounced = $state("");
  $effect(() => {
    const id = setTimeout(() => (debounced = query), 300);
    return () => clearTimeout(id);
  });
</script>

<input bind:value={query} />
<p>{debounced}</p>`, notes: [{ at: "clearTimeout(id)", text: "restarts the wait on each key" }] }
          ]
        },
        {
          id: "effect-pre-untrack", n: 3, title: "pre effects & untrack", level: 3,
          gloss: "Controls effect timing and dependencies with $effect.pre and untrack.",
          examples: [
            { code: `<script>
  let messages = $state(["hi"]);
  $effect.pre(() => {
    console.log("before update", messages.length);
  });
</script>

<button onclick={() => messages.push("hello")}>Send</button>`, notes: [{ at: "$effect.pre", text: "runs before the dom updates" }] },
            { code: `<script>
  import { untrack } from "svelte";
  let a = $state(1);
  let b = $state(2);
  $effect(() => {
    console.log(a, untrack(() => b));
  });
</script>

<button onclick={() => a++}>{a} {b}</button>`, notes: [{ at: "untrack", text: "b is read without tracking" }] },
            { code: `<script>
  let count = $state(0);
  const stop = $effect.root(() => {
    $effect(() => console.log("count", count));
    return () => console.log("stopped");
  });
</script>

<button onclick={stop}>Stop logging</button>`, notes: [{ at: "$effect.root", text: "a manually controlled scope" }] }
          ]
        }
      ]
    },
    {
      id: "props",
      n: 4,
      title: "props",
      concepts: [
        {
          id: "props-rune", n: 1, title: "$props", level: 1,
          gloss: "Reads values passed by the parent with the $props rune.",
          examples: [
            { code: `<script>
  let { name } = $props();
</script>

<h1>Hello, {name}</h1>`, notes: [{ at: "$props()", text: "no import needed" }, { at: "{ name }", text: "destructure the props you use" }] },
            { code: `<script>
  let { title, price } = $props();
</script>

<p>{title}: {price}</p>`, notes: [{ at: "{ title, price }", text: "one declaration for all props" }] },
            { code: `<script>
  let { user } = $props();
</script>

<p>{user.name} ({user.role})</p>`, notes: [{ at: "user.name", text: "props can be objects" }] }
          ]
        },
        {
          id: "prop-defaults", n: 2, title: "defaults & rest props", level: 2,
          gloss: "Sets default values and gathers remaining props with a rest element.",
          examples: [
            { code: `<script>
  let { label = "Save" } = $props();
</script>

<button>{label}</button>`, notes: [{ at: "label = \"Save\"", text: "used when the prop is missing" }] },
            { code: `<script>
  let { label, ...rest } = $props();
</script>

<a {...rest}>{label}</a>`, notes: [{ at: "...rest", text: "everything else the parent passed" }] },
            { code: `<script>
  let { class: klass = "box" } = $props();
</script>

<div class={klass}>Content</div>`, notes: [{ at: "class: klass", text: "rename a reserved word" }] }
          ]
        },
        {
          id: "bindable-props", n: 3, title: "$bindable", level: 3,
          gloss: "Lets a child update a prop that the parent binds to.",
          examples: [
            { code: `<script>
  let { value = $bindable("") } = $props();
</script>

<input bind:value />`, notes: [{ at: "$bindable(\"\")", text: "parent can use bind:value" }] },
            { code: `<script>
  let { open = $bindable(false) } = $props();
</script>

<button onclick={() => (open = !open)}>
  {open ? "Close" : "Open"}
</button>`, notes: [{ at: "open = !open", text: "writes back to the parent" }] },
            { code: `<script>
  let { count = $bindable(0), step = 1 } = $props();
</script>

<button onclick={() => (count += step)}>{count}</button>`, notes: [{ at: "step = 1", text: "plain prop beside a bindable one" }] }
          ]
        }
      ]
    },
    {
      id: "markup-expressions",
      n: 5,
      title: "markup & expressions",
      concepts: [
        {
          id: "text-expressions", n: 1, title: "text expressions", level: 1,
          gloss: "Embeds JavaScript expressions in markup with curly braces.",
          examples: [
            { code: `<script>
  let user = { name: "Ada", visits: 3 };
</script>

<p>{user.name} has visited {user.visits} times</p>`, notes: [{ at: "<p>", text: "plain markup needs no import" }, { at: "{user.name}", text: "any expression fits in braces" }] },
            { code: `<script>
  let prices = [4.5, 12, 7.25];
  let total = prices.reduce((sum, price) => sum + price, 0);
</script>

<p>Subtotal: {total.toFixed(2)}</p>`, notes: [{ at: "{total.toFixed(2)}", text: "method calls work" }] },
            { code: `<script>
  let item = { name: "Lamp", stock: 0 };
</script>

<p>{item.name}: {item.stock > 0 ? "in stock" : "sold out"}</p>`, notes: [{ at: "? \"in stock\"", text: "ternary inside the text" }] }
          ]
        },
        {
          id: "attributes", n: 2, title: "attributes", level: 1,
          gloss: "Binds attribute values to expressions with braces and shorthand.",
          examples: [
            { code: `<script>
  let photo = { url: "/img/ada.png", alt: "Ada Lovelace" };
</script>

<img src={photo.url} alt={photo.alt} width={48} />`, notes: [{ at: "src={photo.url}", text: "no quotes around braces" }] },
            { code: `<script>
  let src = "/img/logo.svg";
  let alt = "Platen";
</script>

<img {src} {alt} />`, notes: [{ at: "{src}", text: "shorthand for src={src}" }] },
            { code: `<script>
  let attrs = { href: "/docs", target: "_blank", rel: "noopener" };
</script>

<a {...attrs}>Docs</a>`, notes: [{ at: "{...attrs}", text: "object keys become attributes" }] }
          ]
        },
        {
          id: "html-const", n: 3, title: "raw HTML & constants", level: 3,
          gloss: "Renders trusted HTML with @html and names values in markup with @const.",
          examples: [
            { code: `<script>
  let note = "Saved <strong>2 files</strong>";
</script>

<p>{@html note}</p>`, notes: [{ at: "{@html", text: "only for trusted strings" }] },
            { code: `<script>
  let boxes = [{ w: 2, h: 3 }, { w: 4, h: 5 }];
</script>

{#each boxes as box}
  {@const area = box.w * box.h}
  <p>{area}</p>
{/each}`, notes: [{ at: "{@const", text: "a local value inside the block" }] },
            { code: `<script>
  let order = { qty: 3, price: 5 };
</script>

{#if order.qty > 0}
  {@const total = order.qty * order.price}
  <p>Total: {total}</p>
{/if}`, notes: [{ at: "order.qty * order.price", text: "computed once per branch" }] }
          ]
        }
      ]
    },
    {
      id: "events",
      n: 6,
      title: "events",
      concepts: [
        {
          id: "event-attributes", n: 1, title: "event attributes", level: 1,
          gloss: "Handles DOM events with onclick-style attributes.",
          examples: [
            { code: `<script>
  function save() {
    console.log("saved");
  }
</script>

<button onclick={save}>Save</button>`, notes: [{ at: "onclick", text: "lowercase attribute, no colon" }, { at: "console.log", text: "no import needed for events" }] },
            { code: `<script>
  let likes = $state(0);
</script>

<button onclick={() => likes++}>Like {likes}</button>`, notes: [{ at: "() => likes++", text: "inline handler" }] },
            { code: `<script>
  let last = $state("none");
</script>

<input onkeydown={(event) => (last = event.key)} />
<p>Last key: {last}</p>`, notes: [{ at: "onkeydown", text: "any dom event name works" }] }
          ]
        },
        {
          id: "event-object", n: 2, title: "the event object", level: 2,
          gloss: "Reads details of an interaction from the event argument.",
          examples: [
            { code: `<script>
  function submit(event) {
    event.preventDefault();
    console.log("searching");
  }
</script>

<form onsubmit={submit}><button>Go</button></form>`, notes: [{ at: "event.preventDefault()", text: "stops the page reload" }] },
            { code: `<script>
  let text = $state("");
</script>

<input oninput={(e) => (text = e.currentTarget.value)} />
<p>{text.length} characters</p>`, notes: [{ at: "currentTarget", text: "the element with the handler" }] },
            { code: `<script>
  const pick = (e) => console.log(e.currentTarget.dataset.id);
</script>

<button data-id="42" onclick={pick}>Select</button>`, notes: [{ at: "dataset.id", text: "reads the data-id attribute" }] }
          ]
        },
        {
          id: "callback-props", n: 3, title: "callback props", level: 2,
          gloss: "Passes functions as props so a child can notify its parent.",
          examples: [
            { code: `<script>
  let { onsave } = $props();
</script>

<button onclick={() => onsave("draft")}>Save draft</button>`, notes: [{ at: "onsave", text: "the parent supplies the function" }] },
            { code: `<script>
  let { onclose, label = "Close" } = $props();
</script>

<button onclick={onclose}>{label}</button>`, notes: [{ at: "onclick={onclose}", text: "pass the prop straight through" }] },
            { code: `<script>
  let { children, ...rest } = $props();
</script>

<button {...rest}>{@render children?.()}</button>`, notes: [{ at: "{...rest}", text: "forwards handlers like onclick" }] }
          ]
        }
      ]
    },
    {
      id: "conditionals-key-blocks",
      n: 7,
      title: "conditionals & key blocks",
      concepts: [
        {
          id: "if-blocks", n: 1, title: "if blocks", level: 1,
          gloss: "Renders markup only when a condition is true with {#if}.",
          examples: [
            { code: `<script>
  let loggedIn = $state(false);
</script>

{#if loggedIn}
  <p>Welcome back</p>
{/if}`, notes: [{ at: "{#if", text: "block opens with a hash" }, { at: "loggedIn", text: "no import needed for blocks" }] },
            { code: `<script>
  let online = $state(true);
</script>

{#if online}
  <p>Online</p>
{:else}
  <p>Offline</p>
{/if}`, notes: [{ at: "{:else}", text: "colon marks a branch" }] },
            { code: `<script>
  let stock = $state(3);
</script>

{#if stock === 0}
  <p>Sold out</p>
{:else if stock < 5}
  <p>Only {stock} left</p>
{:else}
  <p>In stock</p>
{/if}`, notes: [{ at: "{:else if", text: "chain more conditions" }] }
          ]
        },
        {
          id: "key-blocks", n: 2, title: "key blocks", level: 2,
          gloss: "Recreates content whenever a key expression changes with {#key}.",
          examples: [
            { code: `<script>
  let id = $state(1);
</script>

<button onclick={() => id++}>Next</button>
{#key id}
  <p>Item {id}</p>
{/key}`, notes: [{ at: "{#key id}", text: "rebuilds when id changes" }] },
            { code: `<script>
  import { fade } from "svelte/transition";
  let count = $state(0);
</script>

<button onclick={() => count++}>Bump</button>
{#key count}
  <span in:fade>{count}</span>
{/key}`, notes: [{ at: "in:fade", text: "replays on every key change" }] },
            { code: `<script>
  let userId = $state("u1");
</script>

<button onclick={() => (userId = "u2")}>Switch user</button>
{#key userId}
  <input placeholder="Draft for {userId}" />
{/key}`, notes: [{ at: "{#key userId}", text: "resets the input state" }] }
          ]
        },
        {
          id: "inline-conditions", n: 3, title: "inline conditions", level: 1,
          gloss: "Chooses small pieces of text inline with ternary and nullish operators.",
          examples: [
            { code: `<script>
  let count = $state(1);
</script>

<p>{count} {count === 1 ? "item" : "items"}</p>`, notes: [{ at: "count === 1 ?", text: "pluralise inline" }] },
            { code: `<script>
  let user = $state({ name: "Ada" });
</script>

<p>Hello, {user?.name ?? "guest"}</p>`, notes: [{ at: "?? \"guest\"", text: "fallback for null or undefined" }] },
            { code: `<script>
  let errors = $state([]);
</script>

<p>{errors.length ? \`\${errors.length} problems\` : "No problems"}</p>`, notes: [{ at: "errors.length ?", text: "avoid rendering false" }] }
          ]
        }
      ]
    },
    {
      id: "each-blocks",
      n: 8,
      title: "each blocks",
      concepts: [
        {
          id: "each-basics", n: 1, title: "each blocks", level: 1,
          gloss: "Repeats markup for every item in an array with {#each}.",
          examples: [
            { code: `<script>
  let fruits = ["apple", "pear", "plum"];
</script>

<ul>
  {#each fruits as fruit}
    <li>{fruit}</li>
  {/each}
</ul>`, notes: [{ at: "{#each fruits as fruit}", text: "array then alias" }, { at: "fruits", text: "no import needed for blocks" }] },
            { code: `<script>
  let steps = ["Cut", "Mix", "Bake"];
</script>

<ol>
  {#each steps as step, i}
    <li>{i + 1}. {step}</li>
  {/each}
</ol>`, notes: [{ at: "step, i", text: "second name is the index" }] },
            { code: `<script>
  let prices = [
    { label: "Lamp", cents: 2400 },
    { label: "Desk", cents: 18900 },
  ];
</script>

<ul>
  {#each prices as { label, cents }}
    <li>{label}: {cents / 100}</li>
  {/each}
</ul>`, notes: [{ at: "{ label, cents }", text: "destructure each item" }] }
          ]
        },
        {
          id: "each-keys", n: 2, title: "keyed each", level: 2,
          gloss: "Keys each items so Svelte moves elements instead of recreating them.",
          examples: [
            { code: `<script>
  let users = $state([
    { id: 1, name: "Ada" },
    { id: 2, name: "Grace" },
  ]);
</script>

<ul>
  {#each users as user (user.id)}
    <li>{user.name}</li>
  {/each}
</ul>`, notes: [{ at: "(user.id)", text: "the key expression" }] },
            { code: `<script>
  let tasks = $state([{ id: 1 }, { id: 2 }]);
  const drop = (id) => (tasks = tasks.filter((t) => t.id !== id));
</script>

{#each tasks as task (task.id)}
  <button onclick={() => drop(task.id)}>Remove {task.id}</button>
{/each}`, notes: [{ at: "tasks.filter", text: "new array without the item" }] },
            { code: `<script>
  let lines = [{ order: "A", sku: "S1" }, { order: "A", sku: "S2" }];
</script>

{#each lines as line (\`\${line.order}-\${line.sku}\`)}
  <p>{line.sku}</p>
{/each}`, notes: [{ at: "`${line.order}-${line.sku}`", text: "combine fields for uniqueness" }] }
          ]
        },
        {
          id: "each-else", n: 3, title: "empty lists", level: 2,
          gloss: "Shows fallback content with {:else} when the array is empty.",
          examples: [
            { code: `<script>
  let messages = $state([]);
</script>

{#each messages as message}
  <p>{message}</p>
{:else}
  <p>No messages yet</p>
{/each}`, notes: [{ at: "{:else}", text: "runs when there are no items" }] },
            { code: `<script>
  let query = $state("zzz");
  let names = ["ada", "grace"];
  let hits = $derived(names.filter((n) => n.includes(query)));
</script>

{#each hits as hit}
  <li>{hit}</li>
{:else}
  <li>No matches for {query}</li>
{/each}`, notes: [{ at: "$derived", text: "filtered list drives the block" }] },
            { code: `<script>
  let cart = $state(["tea"]);
</script>

{#each cart as item, i}
  <p>{i}: {item}</p>
{:else}
  <p>Your cart is empty</p>
{/each}`, notes: [{ at: "{#each cart as item, i}", text: "index and fallback together" }] }
          ]
        }
      ]
    },
    {
      id: "await-blocks",
      n: 9,
      title: "await blocks",
      concepts: [
        {
          id: "await-branches", n: 1, title: "pending, then, catch", level: 2,
          gloss: "Renders pending, resolved and failed states of a promise with {#await}.",
          examples: [
            { code: `<script>
  let promise = Promise.resolve({ name: "Ada" });
</script>

{#await promise}
  <p>Loading</p>
{:then user}
  <p>Hello, {user.name}</p>
{:catch error}
  <p>Failed: {error.message}</p>
{/await}`, notes: [{ at: "{:then user}", text: "receives the resolved value" }, { at: "promise", text: "no import needed for blocks" }] },
            { code: `<script>
  const load = fetch("/api/orders").then((res) => res.json());
</script>

{#await load}
  <p>Loading orders</p>
{:then orders}
  <p>{orders.length} orders</p>
{/await}`, notes: [{ at: "{#await load}", text: "pending branch comes first" }] },
            { code: `<script>
  let attempt = Promise.reject(new Error("offline"));
</script>

{#await attempt}
  <p>Trying</p>
{:catch error}
  <p>{error.message}</p>
{/await}`, notes: [{ at: "{:catch error}", text: "receives the rejection" }] }
          ]
        },
        {
          id: "await-shorthand", n: 2, title: "then shorthand", level: 2,
          gloss: "Skips the pending branch by putting then on the opening await tag.",
          examples: [
            { code: `<script>
  let weather = Promise.resolve({ temp: 21 });
</script>

{#await weather then data}
  <p>{data.temp} degrees</p>
{/await}`, notes: [{ at: "then data", text: "no loading markup" }] },
            { code: `<script>
  let prices = fetch("/api/prices").then((r) => r.json());
</script>

{#await prices then list}
  <p>{list.length} prices</p>
{/await}`, notes: [{ at: "prices", text: "any promise works" }] },
            { code: `<script>
  let user = Promise.resolve({ name: "Linus", role: "admin" });
</script>

{#await user then { name, role }}
  <p>{name} ({role})</p>
{/await}`, notes: [{ at: "{ name, role }", text: "destructure the value" }] }
          ]
        },
        {
          id: "await-reload", n: 3, title: "reloading data", level: 2,
          gloss: "Reassigns a promise in state to reload data and restart the pending branch.",
          examples: [
            { code: `<script>
  let promise = $state(Promise.resolve(1));
  const reload = () => (promise = Promise.resolve(2));
</script>

<button onclick={reload}>Reload</button>
{#await promise then value}
  <p>Value {value}</p>
{/await}`, notes: [{ at: "promise =", text: "new promise reruns the block" }] },
            { code: `<script>
  let id = $state(1);
  let user = $derived(Promise.resolve({ name: \`User \${id}\` }));
</script>

<button onclick={() => id++}>Next</button>
{#await user then u}
  <p>{u.name}</p>
{/await}`, notes: [{ at: "$derived(Promise", text: "derived promise follows id" }] },
            { code: `<script>
  let attempts = $state(0);
  let result = $derived(Promise.resolve(attempts * 10));
</script>

<button onclick={() => attempts++}>Retry</button>
{#await result}
  <p>Loading</p>
{:then value}
  <p>{value}</p>
{/await}`, notes: [{ at: "attempts++", text: "each click starts a new promise" }] }
          ]
        }
      ]
    },
    {
      id: "bindings",
      n: 10,
      title: "bindings",
      concepts: [
        {
          id: "bind-value", n: 1, title: "bind:value", level: 1,
          gloss: "Keeps an input and a variable in sync with bind:value.",
          examples: [
            { code: `<script>
  let name = $state("");
</script>

<input bind:value={name} placeholder="Your name" />
<p>Hello, {name || "stranger"}</p>`, notes: [{ at: "bind:value", text: "two-way binding" }, { at: "$state", text: "no import needed for bindings" }] },
            { code: `<script>
  let volume = $state(5);
</script>

<input type="range" min="0" max="10" bind:value={volume} />
<p>Volume {volume}</p>`, notes: [{ at: "type=\"range\"", text: "value is a number" }] },
            { code: `<script>
  let size = $state("medium");
</script>

<select bind:value={size}>
  <option>small</option>
  <option>medium</option>
  <option>large</option>
</select>
<p>{size}</p>`, notes: [{ at: "bind:value={size}", text: "works on select too" }] }
          ]
        },
        {
          id: "bind-checked-group", n: 2, title: "checkboxes & groups", level: 2,
          gloss: "Binds checkboxes and radio groups with bind:checked and bind:group.",
          examples: [
            { code: `<script>
  let agreed = $state(false);
</script>

<label>
  <input type="checkbox" bind:checked={agreed} />
  Accept terms
</label>
<p>{agreed ? "Accepted" : "Pending"}</p>`, notes: [{ at: "bind:checked", text: "boolean binding" }] },
            { code: `<script>
  let speed = $state("standard");
</script>

<label>
  <input type="radio" value="standard" bind:group={speed} />
  Standard
</label>
<label>
  <input type="radio" value="express" bind:group={speed} />
  Express
</label>`, notes: [{ at: "bind:group", text: "one variable for all radios" }] },
            { code: `<script>
  let tags = $state([]);
</script>

<input type="checkbox" value="new" bind:group={tags} />
<input type="checkbox" value="sale" bind:group={tags} />
<p>{tags.join(", ")}</p>`, notes: [{ at: "bind:group={tags}", text: "checkboxes fill an array" }] }
          ]
        },
        {
          id: "bind-this", n: 3, title: "elements & sizes", level: 2,
          gloss: "Reads DOM elements and measurements with bind:this and dimension bindings.",
          examples: [
            { code: `<script>
  let input = $state();
</script>

<input bind:this={input} />
<button onclick={() => input.focus()}>Focus</button>`, notes: [{ at: "bind:this", text: "the element once mounted" }] },
            { code: `<script>
  let box = $state();
  let width = $state(0);
  $effect(() => {
    width = box.getBoundingClientRect().width;
  });
</script>

<div bind:this={box}>Width: {width}</div>`, notes: [{ at: "$effect", text: "element exists after mount" }] },
            { code: `<script>
  let w = $state(0);
</script>

<div bind:clientWidth={w}>Width: {w}px</div>`, notes: [{ at: "bind:clientWidth", text: "read-only measurement" }] }
          ]
        }
      ]
    },
    {
      id: "snippets",
      n: 11,
      title: "snippets",
      concepts: [
        {
          id: "snippet-render", n: 1, title: "snippets", level: 2,
          gloss: "Defines reusable markup with {#snippet} and renders it with {@render}.",
          examples: [
            { code: `{#snippet badge(text)}
  <span class="badge">{text}</span>
{/snippet}

{@render badge("New")}
{@render badge("Sale")}`, notes: [{ at: "{#snippet badge(text)}", text: "like a small function" }, { at: "badge", text: "no import needed for snippets" }] },
            { code: `{#snippet row(name)}
  <li>{name}</li>
{/snippet}

<ul>
  {#each ["Ada", "Grace"] as user}
    {@render row(user)}
  {/each}
</ul>`, notes: [{ at: "{@render row(user)}", text: "call it where needed" }] },
            { code: `{#snippet price(label, cents)}
  <p>{label}: {cents / 100}</p>
{/snippet}

{@render price("Lamp", 2400)}`, notes: [{ at: "(label, cents)", text: "several parameters" }] }
          ]
        },
        {
          id: "children-snippet", n: 2, title: "children snippets", level: 2,
          gloss: "Receives nested content as the children snippet and renders it.",
          examples: [
            { code: `<script>
  let { children } = $props();
</script>

<div class="card">
  {@render children()}
</div>`, notes: [{ at: "children", text: "content between the tags" }] },
            { code: `<script>
  let { title, children } = $props();
</script>

<section>
  <h2>{title}</h2>
  {@render children?.()}
</section>`, notes: [{ at: "children?.()", text: "optional when not passed" }] },
            { code: `<script>
  let { header, footer } = $props();
</script>

<article>
  {@render header()}
  {@render footer?.()}
</article>`, notes: [{ at: "header", text: "named snippet as a prop" }] }
          ]
        },
        {
          id: "snippet-props", n: 3, title: "snippets with arguments", level: 3,
          gloss: "Passes data into snippet props so the parent controls how each item looks.",
          examples: [
            { code: `<script>
  let { items, row } = $props();
</script>

<ul>
  {#each items as item}
    <li>{@render row(item)}</li>
  {/each}
</ul>`, notes: [{ at: "row(item)", text: "child supplies the data" }] },
            { code: `<script>
  let { empty } = $props();
  let items = $state([]);
</script>

{#if items.length === 0}
  {@render empty?.()}
{/if}`, notes: [{ at: "empty?.()", text: "optional fallback snippet" }] },
            { code: `<script>
  let { icon, label } = $props();
</script>

<button>
  {@render icon()}
  {label}
</button>`, notes: [{ at: "icon", text: "markup passed as a prop" }] }
          ]
        }
      ]
    },
    {
      id: "classes-styles",
      n: 12,
      title: "classes & styles",
      concepts: [
        {
          id: "class-attribute", n: 1, title: "class attributes", level: 1,
          gloss: "Toggles classes with objects, arrays and the class directive.",
          examples: [
            { code: `<script>
  let active = $state(false);
</script>

<button class={{ active }} onclick={() => (active = !active)}>
  Toggle
</button>`, notes: [{ at: "class={{ active }}", text: "object keys with true values" }, { at: "$state", text: "no import needed for classes" }] },
            { code: `<script>
  let { size = "md", tone = "info" } = $props();
</script>

<span class={["badge", size, tone]}>New</span>`, notes: [{ at: "[\"badge\", size, tone]", text: "array joins the names" }] },
            { code: `<script>
  let done = $state(false);
</script>

<label class:done>
  <input type="checkbox" bind:checked={done} />
  Write tests
</label>`, notes: [{ at: "class:done", text: "toggles on the variable" }] }
          ]
        },
        {
          id: "style-directive", n: 2, title: "style directives", level: 2,
          gloss: "Sets individual inline styles with style: directives.",
          examples: [
            { code: `<script>
  let color = $state("tomato");
</script>

<p style:color>Colored text</p>`, notes: [{ at: "style:color", text: "shorthand for style:color={color}" }] },
            { code: `<script>
  let size = $state(16);
</script>

<input type="range" min="10" max="40" bind:value={size} />
<p style:font-size="{size}px">Resize me</p>`, notes: [{ at: "style:font-size", text: "value with a unit" }] },
            { code: `<script>
  let visible = $state(true);
</script>

<div style:display={visible ? "block" : "none"}>
  Panel content
</div>`, notes: [{ at: "style:display", text: "expression as the value" }] }
          ]
        },
        {
          id: "scoped-css", n: 3, title: "scoped styles", level: 2,
          gloss: "Scopes CSS to a component and reaches outside it with :global.",
          examples: [
            { code: `<p>Warning</p>

<style>
  p {
    color: crimson;
  }
</style>`, notes: [{ at: "p", text: "only styles this component" }] },
            { code: `<div class="prose">{@html "<em>Hi</em>"}</div>

<style>
  .prose :global(em) {
    font-style: normal;
  }
</style>`, notes: [{ at: ":global(em)", text: "matches injected html" }] },
            { code: `<script>
  let hue = $state(200);
</script>

<div style:--hue={hue}>Swatch</div>
<style>
  div {
    background: hsl(var(--hue) 70% 50%);
  }
</style>`, notes: [{ at: "style:--hue", text: "sets a css variable" }] }
          ]
        }
      ]
    },
    {
      id: "context-lifecycle",
      n: 13,
      title: "context & lifecycle",
      concepts: [
        {
          id: "on-mount", n: 1, title: "onMount", level: 1,
          gloss: "Runs code once after the component mounts and can return a cleanup.",
          examples: [
            { code: `<script>
  let title = $state("");
  onMount(() => {
    title = document.title;
  });
</script>

<p>{title}</p>`, notes: [{ at: "onMount", text: "imports from svelte assumed" }] },
            { code: `<script>
  let ticks = $state(0);
  onMount(() => {
    const id = setInterval(() => ticks++, 1000);
    return () => clearInterval(id);
  });
</script>

<p>{ticks}</p>`, notes: [{ at: "return () =>", text: "cleanup on destroy" }] },
            { code: `<script>
  let users = $state([]);
  onMount(async () => {
    const res = await fetch("/api/users");
    users = await res.json();
  });
</script>

<p>{users.length} users</p>`, notes: [{ at: "async () =>", text: "async work after mount" }] }
          ]
        },
        {
          id: "context-api", n: 2, title: "setContext & getContext", level: 2,
          gloss: "Shares values with descendants through setContext and getContext.",
          examples: [
            { code: `<script>
  let { children } = $props();
  setContext("theme", "dark");
</script>

{@render children?.()}`, notes: [{ at: "setContext", text: "imports from svelte assumed" }, { at: "\"theme\"", text: "the key children look up" }] },
            { code: `<script>
  const theme = getContext("theme");
</script>

<p class={theme}>Theme: {theme}</p>`, notes: [{ at: "getContext(\"theme\")", text: "read during init only" }] },
            { code: `<script>
  let { children } = $props();
  const cart = $state({ items: [] });
  setContext("cart", cart);
</script>

{@render children?.()}`, notes: [{ at: "$state({ items: [] })", text: "reactive object as context" }] }
          ]
        },
        {
          id: "tick-destroy", n: 3, title: "tick & onDestroy", level: 2,
          gloss: "Waits for pending DOM updates with tick and runs teardown with onDestroy.",
          examples: [
            { code: `<script>
  let text = $state("a");
  let box;
  async function update() {
    text = "b";
    await tick();
    console.log(box.textContent);
  }
</script>

<button onclick={update}>Update</button>
<p bind:this={box}>{text}</p>`, notes: [{ at: "await tick()", text: "dom now shows the new text" }, { at: "tick", text: "imports from svelte assumed" }] },
            { code: `<script>
  onDestroy(() => {
    console.log("component removed");
  });
</script>

<p>Temporary panel</p>`, notes: [{ at: "onDestroy", text: "runs on removal" }] },
            { code: `<script>
  let items = $state(["a"]);
  let list;
  async function add() {
    items.push("b");
    await tick();
    console.log(list.children.length);
  }
</script>

<button onclick={add}>Add</button>
<ul bind:this={list}>{#each items as i}<li>{i}</li>{/each}</ul>`, notes: [{ at: "list.children.length", text: "counted after the update" }] }
          ]
        }
      ]
    },
    {
      id: "transitions-animations",
      n: 14,
      title: "transitions & animations",
      concepts: [
        {
          id: "transition-directive", n: 1, title: "transitions", level: 1,
          gloss: "Fades elements in and out as they enter or leave the DOM.",
          examples: [
            { code: `<script>
  import { fade } from "svelte/transition";
  let visible = $state(true);
</script>

<button onclick={() => (visible = !visible)}>Toggle</button>
{#if visible}
  <p transition:fade>Hello</p>
{/if}`, notes: [{ at: "transition:fade", text: "plays in both directions" }, { at: "svelte/transition", text: "built-in effects live here" }] },
            { code: `<script>
  import { fly } from "svelte/transition";
  let open = $state(true);
</script>

{#if open}
  <aside transition:fly={{ x: 200, duration: 300 }}>Menu</aside>
{/if}
<button onclick={() => (open = !open)}>Menu</button>`, notes: [{ at: "{{ x: 200, duration: 300 }}", text: "parameters object" }] },
            { code: `<script>
  import { slide } from "svelte/transition";
  let shown = $state(false);
</script>

<button onclick={() => (shown = !shown)}>Details</button>
{#if shown}
  <p transition:slide>More information</p>
{/if}`, notes: [{ at: "slide", text: "animates height" }] }
          ]
        },
        {
          id: "in-out", n: 2, title: "in and out", level: 2,
          gloss: "Applies separate transitions on entering and leaving with in: and out:.",
          examples: [
            { code: `<script>
  import { fade, fly } from "svelte/transition";
  let on = $state(true);
</script>

{#if on}
  <p in:fly={{ y: 20 }} out:fade>Notice</p>
{/if}
<button onclick={() => (on = !on)}>Toggle</button>`, notes: [{ at: "in:fly", text: "only when entering" }, { at: "out:fade", text: "only when leaving" }] },
            { code: `<script>
  import { scale } from "svelte/transition";
  let items = $state([1, 2]);
</script>

{#each items as item (item)}
  <p transition:scale|global>{item}</p>
{/each}`, notes: [{ at: "|global", text: "also plays for parent blocks" }] },
            { code: `<script>
  import { blur } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  let show = $state(true);
</script>

{#if show}
  <p transition:blur={{ easing: cubicOut }}>Soft edge</p>
{/if}`, notes: [{ at: "svelte/easing", text: "easing functions" }] }
          ]
        },
        {
          id: "animate-flip", n: 3, title: "animate:flip", level: 3,
          gloss: "Animates keyed each items to their new positions with animate:flip.",
          examples: [
            { code: `<script>
  import { flip } from "svelte/animate";
  let items = $state(["a", "b", "c"]);
</script>

<button onclick={() => items.reverse()}>Reverse</button>
{#each items as item (item)}
  <p animate:flip>{item}</p>
{/each}`, notes: [{ at: "animate:flip", text: "needs a keyed each" }] },
            { code: `<script>
  import { flip } from "svelte/animate";
  let tasks = $state([{ id: 1 }, { id: 2 }]);
</script>

{#each tasks as task (task.id)}
  <p animate:flip={{ duration: 200 }}>Task {task.id}</p>
{/each}`, notes: [{ at: "duration: 200", text: "milliseconds" }] },
            { code: `<script>
  import { flip } from "svelte/animate";
  let names = $state(["Grace", "Ada", "Linus"]);
  const sort = () => names.sort();
</script>

<button onclick={sort}>Sort</button>
{#each names as name (name)}
  <p animate:flip>{name}</p>
{/each}`, notes: [{ at: "names.sort()", text: "reorder triggers the motion" }] }
          ]
        }
      ]
    }
  ]
};
