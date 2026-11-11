export default {
  id: "vue",
  name: "Vue",
  short: "VU",
  pigment: "vue",
  family: "javascript",
  version: "3.5",
  lexer: "vue",
  indent: 2,
  topics: [
    {
      id: "template-syntax",
      n: 1,
      title: "template syntax",
      concepts: [
        {
          id: "text-interpolation", n: 1, title: "text interpolation", level: 1,
          gloss: "Renders reactive values in the template with double curly braces.",
          examples: [
            { code: `<script setup>
const user = { name: "Ada", visits: 3 };
</script>

<template>
  <p>{{ user.name }} has visited {{ user.visits }} times</p>
</template>`, notes: [{ at: "<script setup>", text: "top-level names reach the template" }, { at: "{{ user.name }}", text: "mustache syntax" }] },
            { code: `<script setup>
const prices = [4.5, 12, 7.25];
const total = prices.reduce((sum, price) => sum + price, 0);
</script>

<template>
  <p>Subtotal: {{ total.toFixed(2) }}</p>
</template>`, notes: [{ at: "total.toFixed(2)", text: "any single expression works" }] },
            { code: `<script setup>
const item = { name: "Lamp", stock: 0 };
</script>

<template>
  <p>{{ item.name }}: {{ item.stock > 0 ? "in stock" : "sold out" }}</p>
</template>`, notes: [{ at: "? \"in stock\"", text: "ternary inside the braces" }] }
          ]
        },
        {
          id: "attribute-binding", n: 2, title: "v-bind", level: 1,
          gloss: "Binds attributes to expressions with v-bind or the colon shorthand.",
          examples: [
            { code: `<script setup>
const photo = { url: "/img/ada.png", alt: "Ada Lovelace" };
</script>

<template>
  <img :src="photo.url" :alt="photo.alt" width="48" />
</template>`, notes: [{ at: ":src", text: "colon is short for v-bind" }] },
            { code: `<script setup>
const src = "/img/logo.svg";
const alt = "Platen";
</script>

<template>
  <img :src :alt />
</template>`, notes: [{ at: ":src", text: "same-name shorthand, vue 3.4" }] },
            { code: `<script setup>
const attrs = { href: "/docs", target: "_blank", rel: "noopener" };
</script>

<template>
  <a v-bind="attrs">Docs</a>
</template>`, notes: [{ at: "v-bind=\"attrs\"", text: "object keys become attributes" }] }
          ]
        },
        {
          id: "special-directives", n: 3, title: "raw HTML & dynamic arguments", level: 2,
          gloss: "Renders unescaped HTML, dynamic argument names and one-time content.",
          examples: [
            { code: `<script setup>
const note = "Saved <strong>2 files</strong>";
</script>

<template>
  <p v-html="note"></p>
</template>`, notes: [{ at: "v-html", text: "only for trusted strings" }] },
            { code: `<script setup>
const attr = "title";
const text = "Opens the docs";
</script>

<template>
  <a href="/docs" :[attr]="text">Docs</a>
</template>`, notes: [{ at: ":[attr]", text: "argument name chosen at runtime" }] },
            { code: `<script setup>
const version = "3.5";
</script>

<template>
  <footer v-once>Built with Vue {{ version }}</footer>
</template>`, notes: [{ at: "v-once", text: "renders a single time" }] }
          ]
        }
      ]
    },
    {
      id: "ref-reactive",
      n: 2,
      title: "ref & reactive",
      concepts: [
        {
          id: "ref", n: 1, title: "ref", level: 1,
          gloss: "Creates reactive primitive state with ref and reads it through .value in script.",
          examples: [
            { code: `<script setup>
const count = ref(0);
</script>

<template>
  <button @click="count++">Clicked {{ count }} times</button>
</template>`, notes: [{ at: "ref", text: "imports from vue assumed" }, { at: "count++", text: "the template unwraps the ref" }] },
            { code: `<script setup>
const count = ref(0);
function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>`, notes: [{ at: "count.value", text: "script needs .value" }] },
            { code: `<script setup>
const name = ref("Ada");
</script>

<template>
  <input v-model="name" />
  <p>Hello, {{ name }}</p>
</template>`, notes: [{ at: "v-model", text: "writes back to the ref" }] }
          ]
        },
        {
          id: "reactive", n: 2, title: "reactive objects", level: 2,
          gloss: "Makes an object deeply reactive with reactive so property changes update the view.",
          examples: [
            { code: `<script setup>
const user = reactive({ name: "Ada", visits: 1 });
</script>

<template>
  <button @click="user.visits++">{{ user.visits }}</button>
</template>`, notes: [{ at: "reactive", text: "no .value on properties" }] },
            { code: `<script setup>
const cart = reactive({ items: ["tea"] });
const add = () => cart.items.push("milk");
</script>

<template>
  <button @click="add">{{ cart.items.length }} items</button>
</template>`, notes: [{ at: "cart.items.push", text: "array changes are tracked" }] },
            { code: `<script setup>
const form = reactive({ address: { city: "Oslo" } });
</script>

<template>
  <input v-model="form.address.city" />
  <p>{{ form.address.city }}</p>
</template>`, notes: [{ at: "form.address.city", text: "nested objects are reactive" }] }
          ]
        },
        {
          id: "ref-helpers", n: 3, title: "toRefs & shallowRef", level: 3,
          gloss: "Keeps reactivity when destructuring with toRefs and skips deep tracking with shallowRef.",
          examples: [
            { code: `<script setup>
const state = reactive({ x: 1, y: 2 });
const { x, y } = toRefs(state);
</script>

<template>
  <button @click="x++">{{ x }}, {{ y }}</button>
</template>`, notes: [{ at: "toRefs", text: "refs stay linked to state" }] },
            { code: `<script setup>
const points = shallowRef([1, 2, 3]);
const add = () => (points.value = [...points.value, 4]);
</script>

<template>
  <button @click="add">{{ points.length }} points</button>
</template>`, notes: [{ at: "shallowRef", text: "only .value replacement counts" }] },
            { code: `<script setup>
const user = reactive({ name: "Ada" });
const name = toRef(user, "name");
</script>

<template>
  <input v-model="name" />
  <p>{{ user.name }}</p>
</template>`, notes: [{ at: "toRef(user, \"name\")", text: "one linked property" }] }
          ]
        }
      ]
    },
    {
      id: "computed",
      n: 3,
      title: "computed",
      concepts: [
        {
          id: "computed-basic", n: 1, title: "computed values", level: 1,
          gloss: "Derives a cached value from reactive state with computed.",
          examples: [
            { code: `<script setup>
const count = ref(2);
const doubled = computed(() => count.value * 2);
</script>

<template>
  <button @click="count++">{{ count }} x 2 = {{ doubled }}</button>
</template>`, notes: [{ at: "computed", text: "imports from vue assumed" }, { at: "count.value * 2", text: "reruns when count changes" }] },
            { code: `<script setup>
const first = ref("Ada");
const last = ref("Lovelace");
const full = computed(() => \`\${first.value} \${last.value}\`);
</script>

<template>
  <p>{{ full }}</p>
</template>`, notes: [{ at: "`${first.value} ${last.value}`", text: "tracks both refs" }] },
            { code: `<script setup>
const prices = ref([4, 12, 7]);
const total = computed(() => prices.value.reduce((a, b) => a + b, 0));
</script>

<template>
  <button @click="prices.push(10)">Total: {{ total }}</button>
</template>`, notes: [{ at: "prices.push", text: "updates the cached total" }] }
          ]
        },
        {
          id: "writable-computed", n: 2, title: "writable computed", level: 2,
          gloss: "Adds a setter to computed so assignments update the source state.",
          examples: [
            { code: `<script setup>
const celsius = ref(20);
const fahrenheit = computed({
  get: () => celsius.value * 1.8 + 32,
  set: (value) => (celsius.value = (value - 32) / 1.8),
});
</script>

<template>
  <input v-model.number="fahrenheit" />
</template>`, notes: [{ at: "set:", text: "runs when the computed is assigned" }] },
            { code: `<script setup>
const title = ref("Hello World");
const slug = computed({
  get: () => title.value.toLowerCase().replaceAll(" ", "-"),
  set: (value) => (title.value = value.replaceAll("-", " ")),
});
</script>

<template>
  <input v-model="slug" />
</template>`, notes: [{ at: "v-model=\"slug\"", text: "works with the setter" }] },
            { code: `<script setup>
const raw = ref(50);
const volume = computed({
  get: () => raw.value,
  set: (value) => (raw.value = Math.min(Math.max(value, 0), 100)),
});
</script>

<template>
  <input v-model.number="volume" />
</template>`, notes: [{ at: "Math.min(Math.max", text: "clamps the written value" }] }
          ]
        },
        {
          id: "computed-lists", n: 3, title: "filtering with computed", level: 2,
          gloss: "Filters and sorts lists in computed properties instead of mutating the source.",
          examples: [
            { code: `<script setup>
const users = ref([{ id: 1, name: "Ada", active: true }]);
const active = computed(() => users.value.filter((u) => u.active));
</script>

<template>
  <p>{{ active.length }} active</p>
</template>`, notes: [{ at: "users.value.filter", text: "returns a new array" }] },
            { code: `<script setup>
const scores = ref([{ id: 1, points: 3 }, { id: 2, points: 9 }]);
const ranked = computed(() =>
  [...scores.value].sort((a, b) => b.points - a.points)
);
</script>

<template>
  <p>Leader: {{ ranked[0].id }}</p>
</template>`, notes: [{ at: "[...scores.value]", text: "copy first, sort mutates" }] },
            { code: `<script setup>
const query = ref("a");
const names = ["ada", "grace", "linus"];
const matches = computed(() =>
  names.filter((n) => n.includes(query.value))
);
</script>

<template>
  <input v-model="query" />
  <p>{{ matches.length }} matches</p>
</template>`, notes: [{ at: "query.value", text: "typing recomputes matches" }] }
          ]
        }
      ]
    },
    {
      id: "watchers",
      n: 4,
      title: "watchers",
      concepts: [
        {
          id: "watch-basic", n: 1, title: "watch", level: 2,
          gloss: "Runs a callback when a watched source changes and receives the old value.",
          examples: [
            { code: `<script setup>
const query = ref("");
watch(query, (value, old) => {
  console.log("query changed", old, value);
});
</script>

<template>
  <input v-model="query" />
</template>`, notes: [{ at: "watch", text: "imports from vue assumed" }, { at: "(value, old)", text: "new value first" }] },
            { code: `<script setup>
const user = reactive({ name: "Ada", age: 36 });
watch(() => user.age, (age) => console.log("age", age));
</script>

<template>
  <button @click="user.age++">{{ user.age }}</button>
</template>`, notes: [{ at: "() => user.age", text: "getter for a reactive property" }] },
            { code: `<script setup>
const width = ref(2);
const height = ref(3);
watch([width, height], ([w, h]) => console.log("area", w * h));
</script>

<template>
  <button @click="width++">{{ width }} x {{ height }}</button>
</template>`, notes: [{ at: "[width, height]", text: "array of sources" }] }
          ]
        },
        {
          id: "watch-effect", n: 2, title: "watchEffect", level: 2,
          gloss: "Runs a function immediately and reruns it whenever its dependencies change.",
          examples: [
            { code: `<script setup>
const count = ref(0);
watchEffect(() => {
  document.title = \`Count: \${count.value}\`;
});
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>`, notes: [{ at: "count.value", text: "read inside, so tracked" }] },
            { code: `<script setup>
const delay = ref(1000);
watchEffect((onCleanup) => {
  const id = setInterval(() => console.log("tick"), delay.value);
  onCleanup(() => clearInterval(id));
});
</script>

<template>
  <button @click="delay += 500">{{ delay }}ms</button>
</template>`, notes: [{ at: "onCleanup", text: "runs before the next run" }] },
            { code: `<script setup>
const id = ref(1);
const user = ref(null);
watchEffect(async () => {
  const res = await fetch(\`/api/users/\${id.value}\`);
  user.value = await res.json();
});
</script>

<template>
  <p>{{ user?.name }}</p>
</template>`, notes: [{ at: "id.value", text: "read before the first await" }] }
          ]
        },
        {
          id: "watch-options", n: 3, title: "watch options", level: 3,
          gloss: "Tunes a watcher with immediate, deep and onWatcherCleanup.",
          examples: [
            { code: `<script setup>
const id = ref(7);
watch(id, (value) => console.log("load", value), { immediate: true });
</script>

<template>
  <button @click="id++">Next</button>
</template>`, notes: [{ at: "immediate: true", text: "also runs on setup" }] },
            { code: `<script setup>
const settings = ref({ theme: { dark: false } });
watch(settings, () => console.log("saved"), { deep: true });
</script>

<template>
  <button @click="settings.theme.dark = true">Dark</button>
</template>`, notes: [{ at: "deep: true", text: "tracks nested changes" }] },
            { code: `<script setup>
const query = ref("");
watch(query, (value) => {
  const controller = new AbortController();
  fetch(\`/api/search?q=\${value}\`, { signal: controller.signal });
  onWatcherCleanup(() => controller.abort());
});
</script>

<template>
  <input v-model="query" />
</template>`, notes: [{ at: "onWatcherCleanup", text: "cancels the stale request" }] }
          ]
        }
      ]
    },
    {
      id: "v-if-v-show",
      n: 5,
      title: "v-if & v-show",
      concepts: [
        {
          id: "v-if", n: 1, title: "v-if and v-else", level: 1,
          gloss: "Renders an element only when its condition is truthy with v-if.",
          examples: [
            { code: `<script setup>
const loggedIn = ref(false);
</script>

<template>
  <p v-if="loggedIn">Welcome back</p>
  <p v-else>Please sign in</p>
</template>`, notes: [{ at: "ref", text: "imports from vue assumed" }, { at: "v-else", text: "must follow a v-if sibling" }] },
            { code: `<script setup>
const online = ref(true);
</script>

<template>
  <button @click="online = !online">Toggle</button>
  <p v-if="online">Online</p>
</template>`, notes: [{ at: "v-if", text: "adds and removes the element" }] },
            { code: `<script setup>
const user = ref({ name: "Ada", role: "admin" });
</script>

<template>
  <template v-if="user">
    <h1>{{ user.name }}</h1>
    <p>{{ user.role }}</p>
  </template>
</template>`, notes: [{ at: "<template v-if", text: "groups without a wrapper element" }] }
          ]
        },
        {
          id: "v-else-if", n: 2, title: "v-else-if chains", level: 1,
          gloss: "Chains several conditions with v-else-if and a final v-else.",
          examples: [
            { code: `<script setup>
const stock = ref(3);
</script>

<template>
  <p v-if="stock === 0">Sold out</p>
  <p v-else-if="stock < 5">Only {{ stock }} left</p>
  <p v-else>In stock</p>
</template>`, notes: [{ at: "v-else-if", text: "checked in order" }] },
            { code: `<script setup>
const status = ref("loading");
</script>

<template>
  <p v-if="status === 'loading'">Loading</p>
  <p v-else-if="status === 'error'">Failed</p>
  <p v-else>Ready</p>
</template>`, notes: [{ at: "'loading'", text: "single quotes inside double" }] },
            { code: `<script setup>
const score = ref(82);
</script>

<template>
  <span v-if="score >= 90">A</span>
  <span v-else-if="score >= 80">B</span>
  <span v-else>C</span>
</template>`, notes: [{ at: "score >= 80", text: "first match wins" }] }
          ]
        },
        {
          id: "v-show-keys", n: 3, title: "v-show and keys", level: 2,
          gloss: "Toggles display with v-show and resets reused elements with key.",
          examples: [
            { code: `<script setup>
const open = ref(false);
</script>

<template>
  <button @click="open = !open">Details</button>
  <p v-show="open">More information</p>
</template>`, notes: [{ at: "v-show", text: "toggles css display" }] },
            { code: `<script setup>
const mode = ref("email");
</script>

<template>
  <input v-if="mode === 'email'" key="email" placeholder="Email" />
  <input v-else key="phone" placeholder="Phone" />
</template>`, notes: [{ at: "key=\"email\"", text: "stops vue reusing the input" }] },
            { code: `<script setup>
const items = ref([]);
</script>

<template>
  <p v-show="items.length === 0">No items yet</p>
</template>`, notes: [{ at: "items.length === 0", text: "element stays in the dom" }] }
          ]
        }
      ]
    },
    {
      id: "list-rendering",
      n: 6,
      title: "list rendering",
      concepts: [
        {
          id: "v-for-array", n: 1, title: "v-for", level: 1,
          gloss: "Repeats an element for each item in an array with v-for.",
          examples: [
            { code: `<script setup>
const fruits = ["apple", "pear", "plum"];
</script>

<template>
  <ul>
    <li v-for="fruit in fruits" :key="fruit">{{ fruit }}</li>
  </ul>
</template>`, notes: [{ at: "fruits", text: "no import needed for plain data" }, { at: ":key", text: "identifies each item" }] },
            { code: `<script setup>
const steps = ["Cut", "Mix", "Bake"];
</script>

<template>
  <ol>
    <li v-for="(step, i) in steps" :key="step">
      {{ i + 1 }}. {{ step }}
    </li>
  </ol>
</template>`, notes: [{ at: "(step, i)", text: "second name is the index" }] },
            { code: `<script setup>
const prices = [
  { id: 1, label: "Lamp", cents: 2400 },
  { id: 2, label: "Desk", cents: 18900 },
];
</script>

<template>
  <p v-for="{ id, label, cents } in prices" :key="id">
    {{ label }}: {{ cents / 100 }}
  </p>
</template>`, notes: [{ at: "{ id, label, cents }", text: "destructure each item" }] }
          ]
        },
        {
          id: "v-for-other", n: 2, title: "objects, ranges and templates", level: 2,
          gloss: "Iterates over object properties, number ranges and groups of elements.",
          examples: [
            { code: `<script setup>
const stock = { lamps: 4, desks: 2 };
</script>

<template>
  <ul>
    <li v-for="(count, name) in stock" :key="name">
      {{ name }}: {{ count }}
    </li>
  </ul>
</template>`, notes: [{ at: "(count, name)", text: "value first, then key" }] },
            { code: `<template>
  <span v-for="n in 5" :key="n">{{ n }}</span>
</template>`, notes: [{ at: "n in 5", text: "counts from 1 to 5" }] },
            { code: `<script setup>
const terms = [{ id: 1, term: "prop", meaning: "an input" }];
</script>

<template>
  <dl>
    <template v-for="t in terms" :key="t.id">
      <dt>{{ t.term }}</dt>
      <dd>{{ t.meaning }}</dd>
    </template>
  </dl>
</template>`, notes: [{ at: "<template v-for", text: "key goes on the template tag" }] }
          ]
        },
        {
          id: "v-for-updates", n: 3, title: "keys & updates", level: 2,
          gloss: "Keys list items and updates arrays so Vue tracks each element correctly.",
          examples: [
            { code: `<script setup>
const tasks = ref([{ id: 1 }, { id: 2 }]);
const drop = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
};
</script>

<template>
  <button v-for="t in tasks" :key="t.id" @click="drop(t.id)">
    Remove {{ t.id }}
  </button>
</template>`, notes: [{ at: ":key=\"t.id\"", text: "stable id, not the index" }] },
            { code: `<script setup>
const names = ref(["Ada"]);
const add = () => names.value.push("Grace");
</script>

<template>
  <button @click="add">Add</button>
  <p v-for="name in names" :key="name">{{ name }}</p>
</template>`, notes: [{ at: "names.value.push", text: "list updates in place" }] },
            { code: `<script setup>
const users = [{ id: 1, active: true }, { id: 2, active: false }];
const active = users.filter((u) => u.active);
</script>

<template>
  <p v-for="u in active" :key="u.id">User {{ u.id }}</p>
</template>`, notes: [{ at: "users.filter", text: "filter first, never v-if with v-for" }] }
          ]
        }
      ]
    },
    {
      id: "events",
      n: 7,
      title: "events",
      concepts: [
        {
          id: "v-on", n: 1, title: "v-on and @", level: 1,
          gloss: "Listens to DOM events with v-on or the at-sign shorthand.",
          examples: [
            { code: `<script setup>
function save() {
  console.log("saved");
}
</script>

<template>
  <button @click="save">Save</button>
</template>`, notes: [{ at: "@click", text: "at sign is short for v-on:" }, { at: "save", text: "no import needed" }] },
            { code: `<script setup>
const likes = ref(0);
</script>

<template>
  <button @click="likes++">Like {{ likes }}</button>
</template>`, notes: [{ at: "likes++", text: "inline statement handler" }] },
            { code: `<script setup>
const last = ref("none");
</script>

<template>
  <input @keydown="last = $event.key" />
  <p>Last key: {{ last }}</p>
</template>`, notes: [{ at: "$event", text: "the native event object" }] }
          ]
        },
        {
          id: "event-modifiers", n: 2, title: "event modifiers", level: 2,
          gloss: "Adjusts event behavior with modifiers such as .prevent, .stop and .once.",
          examples: [
            { code: `<script setup>
const search = () => console.log("searching");
</script>

<template>
  <form @submit.prevent="search"><button>Go</button></form>
</template>`, notes: [{ at: ".prevent", text: "calls preventDefault" }] },
            { code: `<script setup>
const open = ref(false);
</script>

<template>
  <div @click="open = false">
    <button @click.stop="open = true">Open</button>
  </div>
</template>`, notes: [{ at: ".stop", text: "stops the click bubbling" }] },
            { code: `<script setup>
const clicks = ref(0);
</script>

<template>
  <button @click.once="clicks++">Counted: {{ clicks }}</button>
</template>`, notes: [{ at: ".once", text: "fires at most one time" }] }
          ]
        },
        {
          id: "key-args", n: 3, title: "keys & arguments", level: 2,
          gloss: "Passes arguments to handlers and filters key presses with key modifiers.",
          examples: [
            { code: `<script setup>
const select = (tool) => console.log("selected", tool);
</script>

<template>
  <button @click="select('pen')">Pen</button>
  <button @click="select('eraser')">Eraser</button>
</template>`, notes: [{ at: "select('pen')", text: "call with arguments inline" }] },
            { code: `<script setup>
const text = ref("");
const send = () => console.log("send", text.value);
</script>

<template>
  <input v-model="text" @keyup.enter="send" />
</template>`, notes: [{ at: ".enter", text: "only the enter key" }] },
            { code: `<script setup>
const log = (message, event) => console.log(message, event.type);
</script>

<template>
  <button @click="log('clicked', $event)">Log</button>
</template>`, notes: [{ at: "$event", text: "pass the event as an argument" }] }
          ]
        }
      ]
    },
    {
      id: "form-input-bindings",
      n: 8,
      title: "form input bindings",
      concepts: [
        {
          id: "v-model-text", n: 1, title: "text, textarea and select", level: 1,
          gloss: "Syncs form fields with state using v-model.",
          examples: [
            { code: `<script setup>
const name = ref("");
</script>

<template>
  <input v-model="name" placeholder="Your name" />
  <p>Hello, {{ name || "stranger" }}</p>
</template>`, notes: [{ at: "ref", text: "imports from vue assumed" }, { at: "v-model", text: "two-way binding" }] },
            { code: `<script setup>
const bio = ref("");
</script>

<template>
  <textarea v-model="bio"></textarea>
  <small>{{ bio.length }} / 160</small>
</template>`, notes: [{ at: "<textarea v-model", text: "no interpolation inside" }] },
            { code: `<script setup>
const size = ref("medium");
</script>

<template>
  <select v-model="size">
    <option>small</option>
    <option>medium</option>
    <option>large</option>
  </select>
</template>`, notes: [{ at: "<select v-model", text: "value of the chosen option" }] }
          ]
        },
        {
          id: "v-model-checks", n: 2, title: "checkboxes and radios", level: 2,
          gloss: "Binds checkboxes and radio buttons to booleans, values and arrays.",
          examples: [
            { code: `<script setup>
const agreed = ref(false);
</script>

<template>
  <label><input type="checkbox" v-model="agreed" /> Accept terms</label>
  <p>{{ agreed ? "Accepted" : "Pending" }}</p>
</template>`, notes: [{ at: "type=\"checkbox\"", text: "boolean binding" }] },
            { code: `<script setup>
const speed = ref("standard");
</script>

<template>
  <input type="radio" value="standard" v-model="speed" />
  <input type="radio" value="express" v-model="speed" />
  <p>{{ speed }}</p>
</template>`, notes: [{ at: "value=\"express\"", text: "stored when selected" }] },
            { code: `<script setup>
const tags = ref([]);
</script>

<template>
  <input type="checkbox" value="new" v-model="tags" />
  <input type="checkbox" value="sale" v-model="tags" />
  <p>{{ tags.join(", ") }}</p>
</template>`, notes: [{ at: "v-model=\"tags\"", text: "an array collects values" }] }
          ]
        },
        {
          id: "v-model-modifiers", n: 3, title: "v-model modifiers", level: 2,
          gloss: "Transforms input values with the .trim, .number and .lazy modifiers.",
          examples: [
            { code: `<script setup>
const email = ref("");
</script>

<template>
  <input v-model.trim="email" />
  <p>[{{ email }}]</p>
</template>`, notes: [{ at: ".trim", text: "strips surrounding spaces" }] },
            { code: `<script setup>
const qty = ref(1);
</script>

<template>
  <input type="number" v-model.number="qty" />
  <p>Total: {{ qty * 5 }}</p>
</template>`, notes: [{ at: ".number", text: "casts the text to a number" }] },
            { code: `<script setup>
const city = ref("Oslo");
</script>

<template>
  <input v-model.lazy="city" />
  <p>{{ city }}</p>
</template>`, notes: [{ at: ".lazy", text: "syncs on change, not input" }] }
          ]
        }
      ]
    },
    {
      id: "props-emits",
      n: 9,
      title: "props & emits",
      concepts: [
        {
          id: "define-props", n: 1, title: "defineProps", level: 1,
          gloss: "Declares the props a component accepts with defineProps.",
          examples: [
            { code: `<script setup>
const props = defineProps(["name"]);
</script>

<template>
  <h1>Hello, {{ props.name }}</h1>
</template>`, notes: [{ at: "defineProps", text: "compiler macro, no import" }] },
            { code: `<script setup>
const props = defineProps({
  title: { type: String, required: true },
  price: { type: Number, default: 0 },
});
</script>

<template>
  <p>{{ title }}: {{ props.price }}</p>
</template>`, notes: [{ at: "required: true", text: "warns when missing" }] },
            { code: `<script setup lang="ts">
const { label = "Save", disabled = false } = defineProps<{
  label?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <button :disabled="disabled">{{ label }}</button>
</template>`, notes: [{ at: "= \"Save\"", text: "destructure defaults, vue 3.5" }, { at: "defineProps<{", text: "type-based declaration" }] }
          ]
        },
        {
          id: "define-emits", n: 2, title: "defineEmits", level: 2,
          gloss: "Declares custom events with defineEmits and fires them with emit.",
          examples: [
            { code: `<script setup>
const emit = defineEmits(["save"]);
</script>

<template>
  <button @click="emit('save', 'draft')">Save draft</button>
</template>`, notes: [{ at: "emit('save', 'draft')", text: "name then payload" }] },
            { code: `<script setup>
const emit = defineEmits({
  close: null,
  submit: (payload) => payload.email.length > 0,
});
</script>

<template>
  <button @click="emit('close')">Close</button>
</template>`, notes: [{ at: "submit:", text: "validator function" }] },
            { code: `<script setup lang="ts">
const emit = defineEmits<{
  change: [id: number];
  update: [value: string];
}>();
</script>

<template>
  <button @click="emit('change', 1)">Select</button>
</template>`, notes: [{ at: "change: [id: number]", text: "typed payload tuple" }] }
          ]
        },
        {
          id: "define-model", n: 3, title: "defineModel", level: 2,
          gloss: "Creates a two-way v-model prop in the child with defineModel.",
          examples: [
            { code: `<script setup>
const value = defineModel();
</script>

<template>
  <input v-model="value" />
</template>`, notes: [{ at: "defineModel()", text: "parent uses v-model" }] },
            { code: `<script setup>
const open = defineModel("open", { default: false });
</script>

<template>
  <button @click="open = !open">{{ open ? "Close" : "Open" }}</button>
</template>`, notes: [{ at: "\"open\"", text: "parent uses v-model:open" }] },
            { code: `<script setup>
const count = defineModel({ type: Number, default: 0 });
const props = defineProps({ step: { type: Number, default: 1 } });
</script>

<template>
  <button @click="count += props.step">{{ count }}</button>
</template>`, notes: [{ at: "count +=", text: "assignment emits the update" }] }
          ]
        }
      ]
    },
    {
      id: "slots",
      n: 10,
      title: "slots",
      concepts: [
        {
          id: "default-slot", n: 1, title: "default slots", level: 1,
          gloss: "Renders content from the parent where the child places the slot outlet.",
          examples: [
            { code: `<template>
  <div class="card">
    <slot />
  </div>
</template>`, notes: [{ at: "<slot />", text: "parent content appears here" }, { at: "class=\"card\"", text: "no import needed for slots" }] },
            { code: `<template>
  <button>
    <slot>Submit</slot>
  </button>
</template>`, notes: [{ at: "Submit", text: "fallback content" }] },
            { code: `<script setup>
defineProps(["title"]);
</script>

<template>
  <section>
    <h2>{{ title }}</h2>
    <slot />
  </section>
</template>`, notes: [{ at: "<slot />", text: "sits beside regular props" }] }
          ]
        },
        {
          id: "named-slots", n: 2, title: "named slots", level: 2,
          gloss: "Defines several outlets with names so a parent can fill each one.",
          examples: [
            { code: `<template>
  <article>
    <header><slot name="header" /></header>
    <slot />
    <footer><slot name="footer" /></footer>
  </article>
</template>`, notes: [{ at: "name=\"header\"", text: "parent targets it with #header" }] },
            { code: `<template>
  <div>
    <h2 v-if="$slots.title"><slot name="title" /></h2>
    <slot />
  </div>
</template>`, notes: [{ at: "$slots.title", text: "check if a slot was given" }] },
            { code: `<script setup>
const slots = useSlots();
</script>

<template>
  <p v-if="slots.footer">Has a footer</p>
</template>`, notes: [{ at: "useSlots", text: "imports from vue assumed" }] }
          ]
        },
        {
          id: "scoped-slots", n: 3, title: "scoped slots", level: 3,
          gloss: "Passes data from the child to the parent slot content through slot props.",
          examples: [
            { code: `<script setup>
const items = ["Ada", "Grace"];
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item">
      <slot :item="item" />
    </li>
  </ul>
</template>`, notes: [{ at: ":item=\"item\"", text: "becomes a slot prop" }] },
            { code: `<template>
  <div>
    <slot name="row" :index="1" text="First">First</slot>
  </div>
</template>`, notes: [{ at: ":index=\"1\"", text: "data for the parent template" }] },
            { code: `<script setup>
const user = { name: "Ada", role: "admin" };
</script>

<template>
  <slot v-bind="user" />
</template>`, notes: [{ at: "v-bind=\"user\"", text: "every key becomes a slot prop" }] }
          ]
        }
      ]
    },
    {
      id: "class-style-bindings",
      n: 11,
      title: "class & style bindings",
      concepts: [
        {
          id: "class-binding", n: 1, title: "class bindings", level: 1,
          gloss: "Toggles classes with object and array syntax in :class.",
          examples: [
            { code: `<script setup>
const active = ref(false);
</script>

<template>
  <button :class="{ active }" @click="active = !active">Toggle</button>
</template>`, notes: [{ at: "ref", text: "imports from vue assumed" }, { at: "{ active }", text: "class applied when truthy" }] },
            { code: `<script setup>
const size = "md";
const tone = "info";
</script>

<template>
  <span :class="['badge', size, tone]">New</span>
</template>`, notes: [{ at: "['badge', size, tone]", text: "array of class names" }] },
            { code: `<script setup>
const error = ref(true);
</script>

<template>
  <p class="field" :class="[error ? 'invalid' : 'valid']">Email</p>
</template>`, notes: [{ at: "class=\"field\"", text: "static class merges with :class" }] }
          ]
        },
        {
          id: "style-binding", n: 2, title: "style bindings", level: 2,
          gloss: "Sets inline styles from objects with :style.",
          examples: [
            { code: `<script setup>
const color = ref("tomato");
</script>

<template>
  <p :style="{ color }">Colored text</p>
</template>`, notes: [{ at: "{ color }", text: "shorthand property" }] },
            { code: `<script setup>
const size = ref(16);
</script>

<template>
  <input type="range" min="10" max="40" v-model.number="size" />
  <p :style="{ fontSize: size + 'px' }">Resize me</p>
</template>`, notes: [{ at: "fontSize", text: "camelCase property names" }] },
            { code: `<script setup>
const base = { padding: "8px" };
const accent = { borderColor: "gold" };
</script>

<template>
  <div :style="[base, accent]">Panel</div>
</template>`, notes: [{ at: "[base, accent]", text: "later objects override" }] }
          ]
        },
        {
          id: "scoped-css", n: 3, title: "scoped styles & v-bind in CSS", level: 2,
          gloss: "Scopes CSS to a component and binds state into styles with v-bind().",
          examples: [
            { code: `<template>
  <p>Warning</p>
</template>

<style scoped>
p {
  color: crimson;
}
</style>`, notes: [{ at: "scoped", text: "styles only this component" }] },
            { code: `<script setup>
const hue = ref(200);
</script>

<template>
  <div>Swatch</div>
</template>
<style scoped>
div {
  background: hsl(v-bind(hue) 70% 50%);
}
</style>`, notes: [{ at: "v-bind(hue)", text: "reactive css value" }] },
            { code: `<template>
  <div class="prose" v-html="'<em>Hi</em>'"></div>
</template>

<style scoped>
.prose :deep(em) {
  font-style: normal;
}
</style>`, notes: [{ at: ":deep(em)", text: "reaches into child content" }] }
          ]
        }
      ]
    },
    {
      id: "lifecycle-template-refs",
      n: 12,
      title: "lifecycle & template refs",
      concepts: [
        {
          id: "lifecycle-hooks", n: 1, title: "onMounted & onUnmounted", level: 1,
          gloss: "Runs code when the component mounts and unmounts with lifecycle hooks.",
          examples: [
            { code: `<script setup>
const title = ref("");
onMounted(() => {
  title.value = document.title;
});
</script>

<template>
  <p>{{ title }}</p>
</template>`, notes: [{ at: "onMounted", text: "imports from vue assumed" }] },
            { code: `<script setup>
const ticks = ref(0);
let id;
onMounted(() => (id = setInterval(() => ticks.value++, 1000)));
onUnmounted(() => clearInterval(id));
</script>

<template>
  <p>{{ ticks }}</p>
</template>`, notes: [{ at: "onUnmounted", text: "clean up what mounted started" }] },
            { code: `<script setup>
const users = ref([]);
onMounted(async () => {
  const res = await fetch("/api/users");
  users.value = await res.json();
});
</script>

<template>
  <p>{{ users.length }} users</p>
</template>`, notes: [{ at: "async () =>", text: "hooks may be async" }] }
          ]
        },
        {
          id: "template-refs", n: 2, title: "useTemplateRef", level: 2,
          gloss: "Gets a DOM element after mount with useTemplateRef and the ref attribute.",
          examples: [
            { code: `<script setup>
const input = useTemplateRef("field");
const focus = () => input.value.focus();
</script>

<template>
  <input ref="field" />
  <button @click="focus">Focus</button>
</template>`, notes: [{ at: "useTemplateRef(\"field\")", text: "matches ref=\"field\"" }] },
            { code: `<script setup>
const box = useTemplateRef("box");
const width = ref(0);
onMounted(() => {
  width.value = box.value.getBoundingClientRect().width;
});
</script>

<template>
  <div ref="box">Width: {{ width }}</div>
</template>`, notes: [{ at: "onMounted", text: "element exists after mount" }] },
            { code: `<script setup>
const items = useTemplateRef("items");
const count = () => console.log(items.value.length);
</script>

<template>
  <li v-for="n in 3" :key="n" ref="items">{{ n }}</li>
  <button @click="count">Count</button>
</template>`, notes: [{ at: "ref=\"items\"", text: "in v-for it fills an array" }] }
          ]
        },
        {
          id: "next-tick", n: 3, title: "nextTick", level: 2,
          gloss: "Waits for the DOM to update after a state change with nextTick.",
          examples: [
            { code: `<script setup>
const text = ref("a");
async function update() {
  text.value = "b";
  await nextTick();
  console.log("dom updated");
}
</script>

<template>
  <button @click="update">{{ text }}</button>
</template>`, notes: [{ at: "await nextTick()", text: "dom now shows the change" }] },
            { code: `<script setup>
const open = ref(false);
function show() {
  open.value = true;
  nextTick(() => console.log("panel rendered"));
}
</script>

<template>
  <button @click="show">Open</button>
  <p v-if="open">Panel</p>
</template>`, notes: [{ at: "nextTick(() =>", text: "callback form" }] },
            { code: `<script setup>
const count = ref(0);
function bump() {
  count.value++;
  nextTick().then(() => console.log("rendered", count.value));
}
</script>

<template>
  <button @click="bump">{{ count }}</button>
</template>`, notes: [{ at: "nextTick().then", text: "returns a promise" }] }
          ]
        }
      ]
    },
    {
      id: "provide-inject",
      n: 13,
      title: "provide & inject",
      concepts: [
        {
          id: "provide-inject", n: 1, title: "provide and inject", level: 2,
          gloss: "Shares a value with all descendants using provide and inject.",
          examples: [
            { code: `<script setup>
provide("theme", "dark");
</script>

<template>
  <slot />
</template>`, notes: [{ at: "provide", text: "imports from vue assumed" }, { at: "\"theme\"", text: "key descendants look up" }] },
            { code: `<script setup>
const theme = inject("theme", "light");
</script>

<template>
  <p :class="theme">Theme: {{ theme }}</p>
</template>`, notes: [{ at: "\"light\"", text: "default without a provider" }] },
            { code: `<script setup>
const user = { name: "Ada", plan: "pro" };
provide("user", user);
</script>

<template>
  <slot />
</template>`, notes: [{ at: "provide(\"user\", user)", text: "any value can be provided" }] }
          ]
        },
        {
          id: "reactive-provide", n: 2, title: "reactive provides", level: 2,
          gloss: "Provides refs and updater functions so injectors can read and change state.",
          examples: [
            { code: `<script setup>
const count = ref(0);
provide("count", { count, increment: () => count.value++ });
</script>

<template>
  <slot />
</template>`, notes: [{ at: "increment", text: "mutations stay in the provider" }] },
            { code: `<script setup>
const { count, increment } = inject("count");
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>`, notes: [{ at: "inject(\"count\")", text: "receives the provided object" }] },
            { code: `<script setup>
const theme = ref("light");
provide("theme", readonly(theme));
provide("setTheme", (value) => (theme.value = value));
</script>

<template>
  <slot />
</template>`, notes: [{ at: "readonly(theme)", text: "consumers cannot mutate it" }] }
          ]
        },
        {
          id: "injection-keys", n: 3, title: "injection keys", level: 3,
          gloss: "Uses Symbol keys and default factories to avoid name collisions.",
          examples: [
            { code: `<script setup>
const ThemeKey = Symbol("theme");
provide(ThemeKey, "dark");
</script>

<template>
  <slot />
</template>`, notes: [{ at: "Symbol(\"theme\")", text: "unique key, no clashes" }] },
            { code: `<script setup>
const locale = inject("locale", () => "en", true);
</script>

<template>
  <p>{{ locale }}</p>
</template>`, notes: [{ at: "true", text: "treat the default as a factory" }] },
            { code: `<script setup>
const user = inject("user");
if (!user) throw new Error("Provide a user first");
</script>

<template>
  <p>{{ user.name }}</p>
</template>`, notes: [{ at: "throw", text: "fail early without a provider" }] }
          ]
        }
      ]
    },
    {
      id: "composables",
      n: 14,
      title: "composables",
      concepts: [
        {
          id: "extracting-logic", n: 1, title: "extracting logic", level: 2,
          gloss: "Extracts stateful logic into a function whose name starts with use.",
          examples: [
            { code: `function useToggle(initial = false) {
  const on = ref(initial);
  const toggle = () => (on.value = !on.value);
  return { on, toggle };
}`, notes: [{ at: "ref", text: "imports from vue assumed" }, { at: "useToggle", text: "use prefix marks a composable" }] },
            { code: `function useCounter(start = 0) {
  const count = ref(start);
  const doubled = computed(() => count.value * 2);
  const increment = () => count.value++;
  return { count, doubled, increment };
}`, notes: [{ at: "return {", text: "expose refs and functions" }] },
            { code: `<script setup>
function useLikes(start = 0) {
  const likes = ref(start);
  return { likes, like: () => likes.value++ };
}
const { likes, like } = useLikes(10);
</script>

<template>
  <button @click="like">{{ likes }} likes</button>
</template>`, notes: [{ at: "const { likes, like }", text: "destructure the returned refs" }] }
          ]
        },
        {
          id: "composable-events", n: 2, title: "event composables", level: 2,
          gloss: "Registers listeners in a composable and removes them when the component unmounts.",
          examples: [
            { code: `function useMouse() {
  const x = ref(0);
  const y = ref(0);
  const update = (e) => ([x.value, y.value] = [e.pageX, e.pageY]);
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));
  return { x, y };
}`, notes: [{ at: "onUnmounted", text: "removes the listener" }] },
            { code: `function useWindowWidth() {
  const width = ref(0);
  const update = () => (width.value = window.innerWidth);
  onMounted(() => {
    update();
    window.addEventListener("resize", update);
  });
  onUnmounted(() => window.removeEventListener("resize", update));
  return width;
}`, notes: [{ at: "return width", text: "a single ref is fine" }] },
            { code: `function useEventListener(target, name, handler) {
  onMounted(() => target.addEventListener(name, handler));
  onUnmounted(() => target.removeEventListener(name, handler));
}`, notes: [{ at: "target", text: "any event target" }] }
          ]
        },
        {
          id: "composable-async", n: 3, title: "async state", level: 3,
          gloss: "Wraps loading, error and data refs in a composable for asynchronous work.",
          examples: [
            { code: `function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));
  return { data, error };
}`, notes: [{ at: ".catch", text: "failure lands in a ref" }] },
            { code: `function useFetch(url) {
  const data = ref(null);
  watchEffect(async () => {
    const res = await fetch(toValue(url));
    data.value = await res.json();
  });
  return { data };
}`, notes: [{ at: "toValue(url)", text: "accepts a ref or a string" }] },
            { code: `function useDebounced(source, delay = 300) {
  const debounced = ref(source.value);
  let timer;
  watch(source, (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => (debounced.value = value), delay);
  });
  return debounced;
}`, notes: [{ at: "clearTimeout(timer)", text: "restarts the wait" }] }
          ]
        }
      ]
    },
    {
      id: "transition-teleport",
      n: 15,
      title: "Transition & Teleport",
      concepts: [
        {
          id: "transition", n: 1, title: "Transition", level: 2,
          gloss: "Applies enter and leave CSS classes to an element with the Transition component.",
          examples: [
            { code: `<script setup>
const show = ref(true);
</script>

<template>
  <button @click="show = !show">Toggle</button>
  <Transition name="fade">
    <p v-if="show">Hello</p>
  </Transition>
</template>`, notes: [{ at: "ref", text: "imports from vue assumed" }, { at: "name=\"fade\"", text: "prefix for .fade-enter-active" }] },
            { code: `<template>
  <Transition name="fade" appear>
    <p>Hello</p>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
</style>`, notes: [{ at: "appear", text: "also animates on first render" }] },
            { code: `<script setup>
const view = ref("a");
</script>

<template>
  <button @click="view = view === 'a' ? 'b' : 'a'">Swap</button>
  <Transition name="slide" mode="out-in">
    <p :key="view">View {{ view }}</p>
  </Transition>
</template>`, notes: [{ at: "mode=\"out-in\"", text: "old leaves before new enters" }] }
          ]
        },
        {
          id: "transition-group", n: 2, title: "TransitionGroup", level: 2,
          gloss: "Animates items entering, leaving and moving in a list with TransitionGroup.",
          examples: [
            { code: `<script setup>
const items = ref([1, 2, 3]);
</script>

<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="n in items" :key="n">{{ n }}</li>
  </TransitionGroup>
</template>`, notes: [{ at: "tag=\"ul\"", text: "renders a real wrapper element" }] },
            { code: `<script setup>
const tasks = ref(["Write", "Test"]);
const add = () => tasks.value.push("Ship");
</script>

<template>
  <button @click="add">Add</button>
  <TransitionGroup name="fade" tag="div">
    <p v-for="t in tasks" :key="t">{{ t }}</p>
  </TransitionGroup>
</template>`, notes: [{ at: ":key=\"t\"", text: "keys are required" }] },
            { code: `<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="n in 3" :key="n">{{ n }}</li>
  </TransitionGroup>
</template>

<style>
.list-move {
  transition: transform 0.4s;
}
</style>`, notes: [{ at: ".list-move", text: "animates items changing place" }] }
          ]
        },
        {
          id: "teleport", n: 3, title: "Teleport", level: 2,
          gloss: "Renders part of a component in another place in the DOM with Teleport.",
          examples: [
            { code: `<script setup>
const open = ref(false);
</script>

<template>
  <button @click="open = true">Open</button>
  <Teleport to="body">
    <div v-if="open" class="modal">Dialog</div>
  </Teleport>
</template>`, notes: [{ at: "to=\"body\"", text: "any css selector or element" }] },
            { code: `<script setup>
const mobile = ref(true);
</script>

<template>
  <Teleport to="body" :disabled="mobile">
    <aside>Sidebar</aside>
  </Teleport>
</template>`, notes: [{ at: ":disabled", text: "keeps content in place" }] },
            { code: `<template>
  <Teleport defer to="#modals">
    <p>Rendered after the target mounts</p>
  </Teleport>
</template>`, notes: [{ at: "defer", text: "target may appear later, vue 3.5" }] }
          ]
        }
      ]
    }
  ]
};
