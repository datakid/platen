export default {
  id: "solid",
  name: "Solid",
  short: "SD",
  pigment: "solid",
  family: "javascript",
  version: "1.9",
  lexer: "javascript",
  indent: 2,
  topics: [
    {
      id: "components-jsx",
      n: 1,
      title: "components & JSX",
      concepts: [
        {
          id: "function-components", n: 1, title: "function components", level: 1,
          gloss: "Declares a component as a function that runs once and returns JSX.",
          examples: [
            { code: `function Greeting() {
  return <h1>Welcome back, Ada</h1>;
}`, notes: [{ at: "function", text: "imports from solid-js assumed" }, { at: "Greeting", text: "runs once, not on every update" }] },
            { code: `function PriceTag() {
  return (
    <p class="price">
      Total: <strong>$24.50</strong>
    </p>
  );
}`, notes: [{ at: "class", text: "plain class, not className" }] },
            { code: `const EmptyCart = () => <p>Your cart is empty.</p>;`, notes: [{ at: "=>", text: "arrow components work too" }] }
          ]
        },
        {
          id: "jsx-expressions", n: 2, title: "JSX expressions", level: 1,
          gloss: "Embeds JavaScript values and attributes in JSX with curly braces.",
          examples: [
            { code: `function Welcome() {
  const user = { name: "Ada", visits: 3 };
  return (
    <p>
      {user.name} has visited {user.visits} times
    </p>
  );
}`, notes: [{ at: "{user.name}", text: "any expression fits in braces" }] },
            { code: `function Avatar() {
  const photo = { url: "/img/ada.png", alt: "Ada Lovelace" };
  return <img src={photo.url} alt={photo.alt} width={48} />;
}`, notes: [{ at: "src={photo.url}", text: "no quotes around braces" }] },
            { code: `function Alert() {
  const urgent = true;
  return (
    <p classList={{ alert: true, urgent }} style={{ color: "tomato" }}>
      Disk almost full
    </p>
  );
}`, notes: [{ at: "classList", text: "object of class names" }, { at: "style={{", text: "style takes an object" }] }
          ]
        },
        {
          id: "fragments-nesting", n: 3, title: "fragments & nesting", level: 1,
          gloss: "Groups siblings with fragments and composes components by nesting them as tags.",
          examples: [
            { code: `function Header() {
  return (
    <>
      <h1>Inventory</h1>
      <p>42 items in stock</p>
    </>
  );
}`, notes: [{ at: "<>", text: "fragment without a wrapper node" }] },
            { code: `function Logo() {
  return <img src="/logo.svg" alt="Platen" />;
}

function Navbar() {
  return (
    <nav>
      <Logo />
      <a href="/docs">Docs</a>
    </nav>
  );
}`, notes: [{ at: "<Logo />", text: "a component used as a tag" }] },
            { code: `function Badge() {
  return <span class="badge">New</span>;
}

function ProductTitle() {
  return (
    <h2>
      Desk lamp <Badge />
    </h2>
  );
}`, notes: [{ at: "<Badge />", text: "reused inline like an element" }] }
          ]
        }
      ]
    },
    {
      id: "signals",
      n: 2,
      title: "signals",
      concepts: [
        {
          id: "create-signal", n: 1, title: "createSignal", level: 1,
          gloss: "Creates reactive state as a getter and setter pair.",
          examples: [
            { code: `function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <button onClick={() => setCount(count() + 1)}>
      Clicked {count()} times
    </button>
  );
}`, notes: [{ at: "createSignal", text: "imports from solid-js assumed" }, { at: "count()", text: "call the getter to read" }] },
            { code: `function Disclosure() {
  const [open, setOpen] = createSignal(false);
  return (
    <button onClick={() => setOpen(!open())}>
      {open() ? "Hide" : "Show"} details
    </button>
  );
}`, notes: [{ at: "createSignal(false)", text: "initial value is false" }] },
            { code: `function Rating() {
  const [stars, setStars] = createSignal(3);
  return (
    <div>
      <button onClick={() => setStars(stars() - 1)}>-</button>
      <span>{stars()}</span>
      <button onClick={() => setStars(stars() + 1)}>+</button>
    </div>
  );
}`, notes: [{ at: "{stars()}", text: "only this text node updates" }] }
          ]
        },
        {
          id: "setter-updates", n: 2, title: "updater functions", level: 2,
          gloss: "Computes the next value from the previous one by passing a function to the setter.",
          examples: [
            { code: `function Counter() {
  const [count, setCount] = createSignal(0);
  const addThree = () => {
    setCount((n) => n + 1);
    setCount((n) => n + 1);
    setCount((n) => n + 1);
  };
  return <button onClick={addThree}>{count()}</button>;
}`, notes: [{ at: "(n) => n + 1", text: "n is the current value" }] },
            { code: `function Switch2() {
  const [on, setOn] = createSignal(false);
  return (
    <button onClick={() => setOn((prev) => !prev)}>
      {on() ? "On" : "Off"}
    </button>
  );
}`, notes: [{ at: "(prev) => !prev", text: "flips the current value" }] },
            { code: `function Profile() {
  const [user, setUser] = createSignal({ name: "Ada", age: 36 });
  const birthday = () => setUser((u) => ({ ...u, age: u.age + 1 }));
  return <button onClick={birthday}>{user().age}</button>;
}`, notes: [{ at: "...u", text: "replace the object, do not mutate" }] }
          ]
        },
        {
          id: "batch-untrack", n: 3, title: "batch, untrack & equality", level: 3,
          gloss: "Groups updates with batch, reads without tracking with untrack and tunes equality.",
          examples: [
            { code: `function Pair() {
  const [a, setA] = createSignal(1);
  const [b, setB] = createSignal(2);
  const swap = () =>
    batch(() => {
      const first = a();
      setA(b());
      setB(first);
    });
  return <button onClick={swap}>{a()} {b()}</button>;
}`, notes: [{ at: "batch", text: "one update for both setters" }] },
            { code: `function Greeting() {
  const [name, setName] = createSignal("Ada");
  const [count, setCount] = createSignal(0);
  createEffect(() => {
    console.log(name(), untrack(count));
  });
  return <button onClick={() => setName("Grace")}>{count()}</button>;
}`, notes: [{ at: "untrack(count)", text: "read without subscribing" }] },
            { code: `function Items() {
  const [list, setList] = createSignal([1], { equals: false });
  const touch = () => setList((l) => (l.push(2), l));
  return <button onClick={touch}>{list().length}</button>;
}`, notes: [{ at: "equals: false", text: "always notify on set" }] }
          ]
        }
      ]
    },
    {
      id: "derived-values",
      n: 3,
      title: "derived values",
      concepts: [
        {
          id: "derived-functions", n: 1, title: "derived functions", level: 1,
          gloss: "Derives values with plain functions that read signals when they are called.",
          examples: [
            { code: `function Doubler() {
  const [count, setCount] = createSignal(2);
  const doubled = () => count() * 2;
  return (
    <button onClick={() => setCount(count() + 1)}>
      {count()} x 2 = {doubled()}
    </button>
  );
}`, notes: [{ at: "createSignal", text: "imports from solid-js assumed" }, { at: "doubled", text: "a function, so call it" }] },
            { code: `function FullName() {
  const [first] = createSignal("Ada");
  const [last] = createSignal("Lovelace");
  const full = () => \`\${first()} \${last()}\`;
  return <p>{full()}</p>;
}`, notes: [{ at: "full", text: "tracks both signals when called" }] },
            { code: `function Total() {
  const [prices, setPrices] = createSignal([4, 12, 7]);
  const total = () => prices().reduce((a, b) => a + b, 0);
  const add = () => setPrices([...prices(), 10]);
  return <button onClick={add}>{total()}</button>;
}`, notes: [{ at: "prices().reduce", text: "reruns after each change" }] }
          ]
        },
        {
          id: "create-memo", n: 2, title: "createMemo", level: 2,
          gloss: "Caches a derived value with createMemo so it recomputes only when sources change.",
          examples: [
            { code: `function Doubler() {
  const [count, setCount] = createSignal(2);
  const doubled = createMemo(() => count() * 2);
  return (
    <button onClick={() => setCount(count() + 1)}>{doubled()}</button>
  );
}`, notes: [{ at: "createMemo", text: "cached until count changes" }] },
            { code: `function ActiveUsers() {
  const [users] = createSignal([{ id: 1, active: true }, { id: 2 }]);
  const active = createMemo(() => users().filter((u) => u.active));
  return <p>{active().length} active</p>;
}`, notes: [{ at: "users().filter", text: "runs once per change" }] },
            { code: `const data = [{ id: 1, points: 3 }, { id: 2, points: 9 }];

function Leaderboard() {
  const [scores] = createSignal(data);
  const ranked = createMemo(() =>
    [...scores()].sort((a, b) => b.points - a.points)
  );
  return <p>Leader: {ranked()[0].id}</p>;
}`, notes: [{ at: "[...scores()]", text: "copy first, sort mutates" }] }
          ]
        },
        {
          id: "memo-chains", n: 3, title: "memo chains & selectors", level: 3,
          gloss: "Chains memos and uses createSelector so only the changed rows update.",
          examples: [
            { code: `function Area() {
  const [width] = createSignal(4);
  const [height] = createSignal(3);
  const area = createMemo(() => width() * height());
  const label = createMemo(() => (area() > 10 ? "large" : "small"));
  return <p>{area()} is {label()}</p>;
}`, notes: [{ at: "area()", text: "a memo can read another memo" }] },
            { code: `function Rows() {
  const [selected, setSelected] = createSignal(1);
  const isSelected = createSelector(selected);
  const row = (id) => (
    <p classList={{ on: isSelected(id) }} onClick={[setSelected, id]}>
      {id}
    </p>
  );
  return <For each={[1, 2, 3]}>{row}</For>;
}`, notes: [{ at: "createSelector", text: "only two rows rerun per change" }, { at: "[setSelected, id]", text: "handler and data pair" }] },
            { code: `function Running() {
  const [value, setValue] = createSignal(1);
  const total = createMemo((sum) => sum + value(), 0);
  const add = () => setValue(value() + 1);
  return <button onClick={add}>{total()}</button>;
}`, notes: [{ at: "(sum)", text: "previous result of the memo" }] }
          ]
        }
      ]
    },
    {
      id: "effects-lifecycle",
      n: 4,
      title: "effects & lifecycle",
      concepts: [
        {
          id: "create-effect", n: 1, title: "createEffect", level: 1,
          gloss: "Runs a side effect after rendering and again whenever the signals it reads change.",
          examples: [
            { code: `function Title() {
  const [count, setCount] = createSignal(0);
  createEffect(() => {
    document.title = \`Count: \${count()}\`;
  });
  const inc = () => setCount(count() + 1);
  return <button onClick={inc}>{count()}</button>;
}`, notes: [{ at: "createEffect", text: "imports from solid-js assumed" }, { at: "count()", text: "reading it tracks the signal" }] },
            { code: `function Search() {
  const [query, setQuery] = createSignal("");
  createEffect(() => {
    console.log("searching for", query());
  });
  const onInput = (e) => setQuery(e.currentTarget.value);
  return <input value={query()} onInput={onInput} />;
}`, notes: [{ at: "console.log", text: "reruns on every keystroke" }] },
            { code: `function ThemePicker() {
  const [theme, setTheme] = createSignal("light");
  createEffect(() => {
    localStorage.setItem("theme", theme());
  });
  return <button onClick={() => setTheme("dark")}>{theme()}</button>;
}`, notes: [{ at: "localStorage.setItem", text: "sync state to storage" }] }
          ]
        },
        {
          id: "on-cleanup", n: 2, title: "onCleanup", level: 2,
          gloss: "Registers a function that undoes an effect before it reruns or when the owner is disposed.",
          examples: [
            { code: `function Clock() {
  const [seconds, setSeconds] = createSignal(0);
  const id = setInterval(() => setSeconds((s) => s + 1), 1000);
  onCleanup(() => clearInterval(id));
  return <p>{seconds()} seconds</p>;
}`, notes: [{ at: "onCleanup", text: "runs when the component is removed" }] },
            { code: `function WindowWidth() {
  const [width, setWidth] = createSignal(0);
  const update = () => setWidth(window.innerWidth);
  window.addEventListener("resize", update);
  onCleanup(() => window.removeEventListener("resize", update));
  return <p>{width()}px</p>;
}`, notes: [{ at: "removeEventListener", text: "mirrors the add call" }] },
            { code: `function Debounced() {
  const [query, setQuery] = createSignal("");
  createEffect(() => {
    const id = setTimeout(() => console.log("search", query()), 300);
    onCleanup(() => clearTimeout(id));
  });
  return <input onInput={(e) => setQuery(e.currentTarget.value)} />;
}`, notes: [{ at: "clearTimeout", text: "cleanup before each rerun" }] }
          ]
        },
        {
          id: "mount-on", n: 3, title: "onMount & on", level: 2,
          gloss: "Runs code once after mount with onMount and controls tracking with on.",
          examples: [
            { code: `function Title() {
  const [title, setTitle] = createSignal("");
  onMount(() => {
    setTitle(document.title);
  });
  return <p>{title()}</p>;
}`, notes: [{ at: "onMount", text: "runs once, never tracks" }] },
            { code: `function Users() {
  const [users, setUsers] = createSignal([]);
  onMount(async () => {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  });
  return <p>{users().length} users</p>;
}`, notes: [{ at: "async () =>", text: "fetch after the first render" }] },
            { code: `function Logger() {
  const [count, setCount] = createSignal(0);
  createEffect(
    on(count, (value) => console.log("count", value), { defer: true })
  );
  const inc = () => setCount(count() + 1);
  return <button onClick={inc}>{count()}</button>;
}`, notes: [{ at: "on(count,", text: "tracks only the listed source" }, { at: "defer: true", text: "skips the first run" }] }
          ]
        }
      ]
    },
    {
      id: "props",
      n: 5,
      title: "props",
      concepts: [
        {
          id: "props-object", n: 1, title: "props", level: 1,
          gloss: "Reads values passed by the parent through the props object without destructuring.",
          examples: [
            { code: `function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`, notes: [{ at: "function", text: "imports from solid-js assumed" }, { at: "props.name", text: "keep access inside JSX to stay reactive" }] },
            { code: `function Stock(props) {
  return (
    <p>
      {props.item}: {props.count} left
    </p>
  );
}`, notes: [{ at: "props.count", text: "updates when the parent changes it" }] },
            { code: `function UserCard(props) {
  return <p>{props.user.name} ({props.user.role})</p>;
}`, notes: [{ at: "props.user", text: "props can be objects" }] }
          ]
        },
        {
          id: "merge-split", n: 2, title: "mergeProps & splitProps", level: 2,
          gloss: "Sets defaults with mergeProps and separates props with splitProps, keeping reactivity.",
          examples: [
            { code: `function Button(props) {
  const merged = mergeProps({ label: "Save" }, props);
  return <button>{merged.label}</button>;
}`, notes: [{ at: "mergeProps", text: "later sources win" }] },
            { code: `function Link(props) {
  const [local, rest] = splitProps(props, ["label"]);
  return <a {...rest}>{local.label}</a>;
}`, notes: [{ at: "splitProps", text: "rest stays reactive" }] },
            { code: `function IconButton(props) {
  const merged = mergeProps({ size: 16 }, props);
  return (
    <button style={{ "font-size": \`\${merged.size}px\` }}>
      {merged.children}
    </button>
  );
}`, notes: [{ at: "merged.size", text: "default of 16 unless passed" }] }
          ]
        },
        {
          id: "children-helper", n: 3, title: "children", level: 2,
          gloss: "Renders nested content with props.children and resolves it with the children helper.",
          examples: [
            { code: `function Card(props) {
  return <div class="card">{props.children}</div>;
}`, notes: [{ at: "props.children", text: "content between the tags" }] },
            { code: `function Section(props) {
  const resolved = children(() => props.children);
  return (
    <section>
      <h2>{props.title}</h2>
      {resolved()}
    </section>
  );
}`, notes: [{ at: "children(", text: "resolves once and caches" }] },
            { code: `function Tabs(props) {
  const resolved = children(() => props.children);
  return <p>{resolved.toArray().length} tabs</p>;
}`, notes: [{ at: "toArray()", text: "always a flat array" }] }
          ]
        }
      ]
    },
    {
      id: "control-flow",
      n: 6,
      title: "control flow",
      concepts: [
        {
          id: "show", n: 1, title: "Show", level: 1,
          gloss: "Renders content conditionally with Show and an optional fallback.",
          examples: [
            { code: `function Login() {
  const [loggedIn] = createSignal(false);
  return (
    <Show when={loggedIn()} fallback={<p>Please sign in</p>}>
      <p>Welcome back</p>
    </Show>
  );
}`, notes: [{ at: "Show", text: "imports from solid-js assumed" }, { at: "fallback", text: "shown when when is falsy" }] },
            { code: `function Greeting() {
  const [user] = createSignal({ name: "Ada" });
  return (
    <Show when={user()}>
      {(u) => <p>Hello, {u().name}</p>}
    </Show>
  );
}`, notes: [{ at: "(u)", text: "accessor for the truthy value" }] },
            { code: `function Details() {
  const [open, setOpen] = createSignal(false);
  return (
    <>
      <button onClick={() => setOpen(!open())}>Details</button>
      <Show when={open()}>
        <p>More information</p>
      </Show>
    </>
  );
}`, notes: [{ at: "<Show when", text: "mounts and unmounts the content" }] }
          ]
        },
        {
          id: "for-index", n: 2, title: "For & Index", level: 1,
          gloss: "Repeats elements for each array item with For and Index.",
          examples: [
            { code: `function Fruits() {
  const fruits = ["apple", "pear", "plum"];
  return (
    <ul>
      <For each={fruits}>{(fruit) => <li>{fruit}</li>}</For>
    </ul>
  );
}`, notes: [{ at: "For", text: "keyed by item reference" }] },
            { code: `function Steps() {
  const steps = ["Cut", "Mix", "Bake"];
  return (
    <ol>
      <For each={steps}>{(step, i) => <li>{i() + 1}. {step}</li>}</For>
    </ol>
  );
}`, notes: [{ at: "i()", text: "the index is a signal" }] },
            { code: `function Prices() {
  const [prices] = createSignal([4, 12, 7]);
  return (
    <ul>
      <Index each={prices()}>{(price) => <li>{price()}</li>}</Index>
    </ul>
  );
}`, notes: [{ at: "Index", text: "the item is a signal instead" }] }
          ]
        },
        {
          id: "switch-match", n: 3, title: "Switch & Match", level: 2,
          gloss: "Chooses one branch from several conditions with Switch and Match.",
          examples: [
            { code: `function Status() {
  const [status] = createSignal("loading");
  return (
    <Switch fallback={<p>Ready</p>}>
      <Match when={status() === "loading"}>Loading</Match>
      <Match when={status() === "error"}>Failed</Match>
    </Switch>
  );
}`, notes: [{ at: "fallback", text: "when no Match is truthy" }] },
            { code: `function Stock() {
  const [stock] = createSignal(3);
  return (
    <Switch>
      <Match when={stock() === 0}>Sold out</Match>
      <Match when={stock() < 5}>Only {stock()} left</Match>
      <Match when={true}>In stock</Match>
    </Switch>
  );
}`, notes: [{ at: "<Match", text: "first truthy branch wins" }] },
            { code: `function Grade() {
  const [score] = createSignal(82);
  return (
    <Switch fallback={<span>C</span>}>
      <Match when={score() >= 90}>A</Match>
      <Match when={score() >= 80}>B</Match>
    </Switch>
  );
}`, notes: [{ at: "score() >= 80", text: "conditions read signals" }] }
          ]
        }
      ]
    },
    {
      id: "events-forms",
      n: 7,
      title: "events & forms",
      concepts: [
        {
          id: "event-handlers", n: 1, title: "event handlers", level: 1,
          gloss: "Handles DOM events with onClick-style props and native listeners with on:.",
          examples: [
            { code: `function SaveButton() {
  function handleClick() {
    console.log("saved");
  }
  return <button onClick={handleClick}>Save</button>;
}`, notes: [{ at: "function", text: "imports from solid-js assumed" }, { at: "onClick", text: "delegated to the document" }] },
            { code: `function LikeButton() {
  const [likes, setLikes] = createSignal(0);
  const like = () => setLikes(likes() + 1);
  return <button onClick={like}>Like {likes()}</button>;
}`, notes: [{ at: "() => setLikes", text: "inline handler" }] },
            { code: `function Hover() {
  const [over, setOver] = createSignal(false);
  return (
    <p
      on:mouseenter={() => setOver(true)}
      on:mouseleave={() => setOver(false)}
    >
      {over() ? "Hovering" : "Hover me"}
    </p>
  );
}`, notes: [{ at: "on:mouseenter", text: "a native, non-delegated listener" }] }
          ]
        },
        {
          id: "controlled-inputs", n: 2, title: "controlled inputs", level: 1,
          gloss: "Binds an input to a signal with value and onInput.",
          examples: [
            { code: `function NameField() {
  const [name, setName] = createSignal("");
  const onInput = (e) => setName(e.currentTarget.value);
  return (
    <>
      <input value={name()} onInput={onInput} />
      <p>Hello, {name() || "stranger"}</p>
    </>
  );
}`, notes: [{ at: "onInput", text: "fires on every keystroke" }] },
            { code: `function Bio() {
  const [bio, setBio] = createSignal("");
  const onInput = (e) => setBio(e.currentTarget.value);
  return (
    <>
      <textarea value={bio()} onInput={onInput} />
      <small>{bio().length} / 160</small>
    </>
  );
}`, notes: [{ at: "bio().length", text: "derived from the signal" }] },
            { code: `function SizePicker() {
  const [size, setSize] = createSignal("medium");
  const onChange = (e) => setSize(e.currentTarget.value);
  return (
    <select value={size()} onChange={onChange}>
      <option>small</option>
      <option>medium</option>
      <option>large</option>
    </select>
  );
}`, notes: [{ at: "onChange", text: "selects use change events" }] }
          ]
        },
        {
          id: "forms", n: 3, title: "checkboxes & forms", level: 2,
          gloss: "Reads checkbox state and handles form submission with preventDefault.",
          examples: [
            { code: `function Terms() {
  const [agreed, setAgreed] = createSignal(false);
  const toggle = (e) => setAgreed(e.currentTarget.checked);
  return (
    <label>
      <input type="checkbox" checked={agreed()} onChange={toggle} />
      Accept terms
    </label>
  );
}`, notes: [{ at: "checked", text: "a boolean property" }] },
            { code: `function Login() {
  const [email, setEmail] = createSignal("");
  const submit = (e) => { e.preventDefault(); console.log(email()); };
  return (
    <form onSubmit={submit}>
      <input onInput={(e) => setEmail(e.currentTarget.value)} />
      <button>Sign in</button>
    </form>
  );
}`, notes: [{ at: "e.preventDefault()", text: "stops the page reload" }] },
            { code: `function Shipping() {
  const [speed, setSpeed] = createSignal("standard");
  const to = (o) => () => setSpeed(o);
  return (
    <For each={["standard", "express"]}>
      {(o) => (
        <input type="radio" checked={speed() === o} onChange={to(o)} />
      )}
    </For>
  );
}`, notes: [{ at: "checked={speed()", text: "compare to pick the radio" }] }
          ]
        }
      ]
    },
    {
      id: "stores",
      n: 8,
      title: "stores",
      concepts: [
        {
          id: "create-store", n: 1, title: "createStore", level: 2,
          gloss: "Holds nested reactive state in a store whose properties update fine-grained.",
          examples: [
            { code: `function Profile() {
  const [user, setUser] = createStore({ name: "Ada", visits: 1 });
  return (
    <button onClick={() => setUser({ visits: user.visits + 1 })}>
      {user.name}: {user.visits}
    </button>
  );
}`, notes: [{ at: "createStore", text: "imports from solid-js/store assumed" }, { at: "setUser({", text: "merges into the store" }] },
            { code: `function Todos() {
  const [todos, setTodos] = createStore(["Write docs"]);
  return (
    <button onClick={() => setTodos(todos.length, "Ship release")}>
      {todos.length} todos
    </button>
  );
}`, notes: [{ at: "todos.length", text: "the index to write at" }] },
            { code: `function Cart() {
  const [cart] = createStore({ items: [{ sku: "A1", qty: 2 }] });
  return <p>{cart.items[0].qty} of {cart.items[0].sku}</p>;
}`, notes: [{ at: "cart.items[0].qty", text: "plain property reads" }] }
          ]
        },
        {
          id: "store-paths", n: 2, title: "path updates", level: 2,
          gloss: "Updates nested store values with path arguments and array filters.",
          examples: [
            { code: `function Birthday() {
  const [state, setState] = createStore({ user: { age: 36 } });
  return (
    <button onClick={() => setState("user", "age", (a) => a + 1)}>
      {state.user.age}
    </button>
  );
}`, notes: [{ at: "\"user\", \"age\"", text: "path, then the new value" }] },
            { code: `function Tasks() {
  const [tasks, setTasks] = createStore([{ id: 1, done: false }]);
  return (
    <button onClick={() => setTasks(0, "done", true)}>
      {String(tasks[0].done)}
    </button>
  );
}`, notes: [{ at: "0, \"done\"", text: "index, then key" }] },
            { code: `const data = [{ id: 1, done: false }, { id: 2, done: false }];

function Checklist() {
  const [tasks, setTasks] = createStore(data);
  const finish = () => setTasks((t) => t.id === 2, "done", true);
  return (
    <button onClick={finish}>
      {tasks.filter((t) => t.done).length} done
    </button>
  );
}`, notes: [{ at: "(t) => t.id === 2", text: "a filter function as a path part" }] }
          ]
        },
        {
          id: "produce-reconcile", n: 3, title: "produce & reconcile", level: 3,
          gloss: "Mutates drafts with produce and merges fresh data into a store with reconcile.",
          examples: [
            { code: `function Todos() {
  const [todos, setTodos] = createStore({ items: ["Write"] });
  const add = () => {
    setTodos(produce((draft) => draft.items.push("Test")));
  };
  return <button onClick={add}>{todos.items.length}</button>;
}`, notes: [{ at: "produce", text: "imports from solid-js/store assumed" }, { at: "draft", text: "mutate it like plain JavaScript" }] },
            { code: `function Settings() {
  const [state, setState] = createStore({ theme: { dark: false } });
  const toggle = () =>
    setState(produce((s) => (s.theme.dark = !s.theme.dark)));
  return <button onClick={toggle}>{String(state.theme.dark)}</button>;
}`, notes: [{ at: "s.theme.dark", text: "nested mutation inside produce" }] },
            { code: `function Users() {
  const [users, setUsers] = createStore([{ id: 1, name: "Ada" }]);
  const refresh = () => setUsers(reconcile([{ id: 1, name: "Ada L" }]));
  return <button onClick={refresh}>{users[0].name}</button>;
}`, notes: [{ at: "reconcile", text: "diffs new data against the store" }] }
          ]
        }
      ]
    },
    {
      id: "context",
      n: 9,
      title: "context",
      concepts: [
        {
          id: "create-context", n: 1, title: "createContext", level: 2,
          gloss: "Creates a context and shares a value with descendants through its Provider.",
          examples: [
            { code: `const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <main>Dashboard</main>
    </ThemeContext.Provider>
  );
}`, notes: [{ at: "createContext", text: "imports from solid-js assumed" }, { at: "createContext(\"light\")", text: "default without a provider" }] },
            { code: `const UserContext = createContext();

function App() {
  const user = { name: "Ada", plan: "pro" };
  return (
    <UserContext.Provider value={user}>
      <main>Account</main>
    </UserContext.Provider>
  );
}`, notes: [{ at: "value={user}", text: "any value can be shared" }] },
            { code: `const LocaleContext = createContext("en");

function App() {
  return (
    <LocaleContext.Provider value="fr">
      <LocaleContext.Provider value="de">
        <p>Willkommen</p>
      </LocaleContext.Provider>
    </LocaleContext.Provider>
  );
}`, notes: [{ at: "value=\"de\"", text: "the nearest provider wins" }] }
          ]
        },
        {
          id: "use-context", n: 2, title: "useContext", level: 1,
          gloss: "Reads the nearest context value inside a component with useContext.",
          examples: [
            { code: `const ThemeContext = createContext("light");

function Button() {
  const theme = useContext(ThemeContext);
  return <button class={theme}>Save</button>;
}`, notes: [{ at: "useContext", text: "returns the default here" }] },
            { code: `const UserContext = createContext({ name: "guest" });

function Welcome() {
  const user = useContext(UserContext);
  return <h1>Hello, {user.name}</h1>;
}`, notes: [{ at: "user.name", text: "read inside JSX" }] },
            { code: `const ThemeContext = createContext("light");
const useTheme = () => useContext(ThemeContext);

function Label() {
  return <span class={useTheme()}>Label</span>;
}`, notes: [{ at: "useTheme", text: "a small custom hook" }] }
          ]
        },
        {
          id: "context-state", n: 3, title: "context with state", level: 3,
          gloss: "Provides signals and setters through context so descendants share and update state.",
          examples: [
            { code: `const CartContext = createContext();

function CartProvider(props) {
  const [items, setItems] = createSignal([]);
  return (
    <CartContext.Provider value={{ items, setItems }}>
      {props.children}
    </CartContext.Provider>
  );
}`, notes: [{ at: "{ items, setItems }", text: "signal and setter together" }] },
            { code: `const CounterContext = createContext();

function CounterProvider(props) {
  const [count, setCount] = createSignal(0);
  const value = [count, { increment: () => setCount((n) => n + 1) }];
  return (
    <CounterContext.Provider value={value}>
      {props.children}
    </CounterContext.Provider>
  );
}`, notes: [{ at: "increment", text: "actions live beside the state" }] },
            { code: `const AuthContext = createContext();

function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("Wrap the app in AuthContext");
  return auth;
}`, notes: [{ at: "if (!auth)", text: "fail early outside a provider" }] }
          ]
        }
      ]
    },
    {
      id: "refs-directives",
      n: 10,
      title: "refs & directives",
      concepts: [
        {
          id: "refs", n: 1, title: "refs", level: 1,
          gloss: "Gets DOM elements with the ref attribute and a variable or callback.",
          examples: [
            { code: `function SearchBox() {
  let input;
  return (
    <div>
      <input ref={input} />
      <button onClick={() => input.focus()}>Focus</button>
    </div>
  );
}`, notes: [{ at: "ref={input}", text: "assigned when the element is created" }] },
            { code: `function Measure() {
  const [width, setWidth] = createSignal(0);
  let box;
  onMount(() => setWidth(box.getBoundingClientRect().width));
  return <div ref={box}>Width: {width()}</div>;
}`, notes: [{ at: "onMount", text: "imports from solid-js assumed" }, { at: "ref={box}", text: "use it after mount" }] },
            { code: `function Player() {
  const controls = (el) => el.setAttribute("controls", "");
  return <video ref={controls} src="/intro.mp4" />;
}`, notes: [{ at: "ref={controls}", text: "a function instead of a variable" }] }
          ]
        },
        {
          id: "directives", n: 2, title: "use: directives", level: 2,
          gloss: "Applies reusable element behavior with use: directives.",
          examples: [
            { code: `function autofocus(el) {
  onMount(() => el.focus());
}

function Field() {
  return <input use:autofocus />;
}`, notes: [{ at: "use:autofocus", text: "function receives the element" }] },
            { code: `function tooltip(el, value) {
  el.title = value();
}

function Help() {
  return <button use:tooltip={"Opens the docs"}>Help</button>;
}`, notes: [{ at: "value()", text: "the argument is an accessor" }] },
            { code: `function clickOutside(el, accessor) {
  const handler = (e) => !el.contains(e.target) && accessor()();
  document.body.addEventListener("click", handler);
  onCleanup(() => document.body.removeEventListener("click", handler));
}

function Menu() {
  return <div use:clickOutside={() => console.log("closed")}>Menu</div>;
}`, notes: [{ at: "onCleanup", text: "remove the listener with the element" }] }
          ]
        },
        {
          id: "ref-forwarding", n: 3, title: "forwarding refs", level: 2,
          gloss: "Passes refs through components by accepting a ref prop.",
          examples: [
            { code: `function TextField(props) {
  return <input ref={props.ref} aria-label={props.label} />;
}

function App() {
  let email;
  return <TextField ref={email} label="Email" />;
}`, notes: [{ at: "props.ref", text: "the parent variable arrives as a prop" }] },
            { code: `function IconButton(props) {
  return <button ref={props.ref}>{props.children}</button>;
}

function App() {
  return <IconButton ref={(el) => el.focus()}>Save</IconButton>;
}`, notes: [{ at: "ref={(el)", text: "a callback ref also works" }] },
            { code: `function FancyInput(props) {
  return <input class="fancy" {...props} />;
}

function App() {
  let input;
  return <FancyInput ref={input} placeholder="Name" />;
}`, notes: [{ at: "{...props}", text: "spread forwards ref too" }] }
          ]
        }
      ]
    },
    {
      id: "async-data",
      n: 11,
      title: "async data",
      concepts: [
        {
          id: "create-resource", n: 1, title: "createResource", level: 2,
          gloss: "Loads async data into a resource that exposes loading and error state.",
          examples: [
            { code: `async function fetchUser() {
  const res = await fetch("/api/user");
  return res.json();
}

function Profile() {
  const [user] = createResource(fetchUser);
  return <p>{user.loading ? "Loading" : user().name}</p>;
}`, notes: [{ at: "createResource", text: "imports from solid-js assumed" }, { at: "user.loading", text: "true while the fetch runs" }] },
            { code: `const fetchOrders = async (userId) =>
  (await fetch(\`/api/orders?user=\${userId}\`)).json();

function Orders() {
  const [userId] = createSignal(1);
  const [orders] = createResource(userId, fetchOrders);
  return <p>{orders()?.length} orders</p>;
}`, notes: [{ at: "createResource(userId", text: "source refetches on change" }] },
            { code: `const load = () => fetch("/api/weather").then((r) => r.json());

function Weather() {
  const [weather] = createResource(load);
  return (
    <Show when={!weather.loading} fallback={<p>Loading</p>}>
      <p>{weather().temp} degrees</p>
    </Show>
  );
}`, notes: [{ at: "!weather.loading", text: "wait before reading" }] }
          ]
        },
        {
          id: "resource-actions", n: 2, title: "refetch & mutate", level: 2,
          gloss: "Reloads a resource with refetch and updates it locally with mutate.",
          examples: [
            { code: `const load = () => fetch("/api/feed").then((r) => r.json());

function Feed() {
  const [feed, { refetch }] = createResource(load);
  return (
    <button onClick={() => refetch()} disabled={feed.loading}>
      Reload
    </button>
  );
}`, notes: [{ at: "{ refetch }", text: "second tuple item holds actions" }] },
            { code: `function Likes() {
  const [likes, { mutate }] = createResource(async () => 3);
  const like = () => mutate((n) => n + 1);
  return <button onClick={like}>{likes()}</button>;
}`, notes: [{ at: "mutate", text: "optimistic local update" }] },
            { code: `function Search() {
  const [query, setQuery] = createSignal("ada");
  const [results] = createResource(query, async (q) => [q, q + q]);
  const next = () => setQuery("grace");
  return <button onClick={next}>{results()?.length}</button>;
}`, notes: [{ at: "query", text: "changing it triggers a new fetch" }] }
          ]
        },
        {
          id: "suspense", n: 3, title: "Suspense", level: 2,
          gloss: "Shows a fallback while resources read inside it are loading.",
          examples: [
            { code: `function Reviews() {
  const [reviews] = createResource(async () => ["useful", "ok"]);
  return <p>{reviews()?.length} reviews</p>;
}

function Product() {
  return (
    <Suspense fallback={<p>Loading reviews</p>}>
      <Reviews />
    </Suspense>
  );
}`, notes: [{ at: "Suspense", text: "catches resource reads below it" }] },
            { code: `function Page(props) {
  return (
    <Suspense fallback={<p>Loading page</p>}>
      <h1>Account</h1>
      <Suspense fallback={<p>Loading orders</p>}>
        {props.children}
      </Suspense>
    </Suspense>
  );
}`, notes: [{ at: "Loading orders", text: "inner boundary loads separately" }] },
            { code: `function Skeleton() {
  return <div class="skeleton" aria-busy="true" />;
}

function Feed(props) {
  return <Suspense fallback={<Skeleton />}>{props.children}</Suspense>;
}`, notes: [{ at: "fallback={<Skeleton />}", text: "any element works" }] }
          ]
        },
        {
          id: "error-boundary", n: 4, title: "ErrorBoundary", level: 2,
          gloss: "Catches errors thrown below it and renders a fallback in their place.",
          examples: [
            { code: `function Broken() {
  throw new Error("Boom");
}

function Safe() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Broken />
    </ErrorBoundary>
  );
}`, notes: [{ at: "ErrorBoundary", text: "imports from solid-js assumed" }] },
            { code: `function Risky() {
  throw new Error("Failed to load");
}

function Safe() {
  return (
    <ErrorBoundary fallback={(err) => <p>{err.message}</p>}>
      <Risky />
    </ErrorBoundary>
  );
}`, notes: [{ at: "(err)", text: "the thrown error" }] },
            { code: `function Safe(props) {
  return (
    <ErrorBoundary
      fallback={(err, reset) => <button onClick={reset}>Retry</button>}
    >
      {props.children}
    </ErrorBoundary>
  );
}`, notes: [{ at: "reset", text: "rerenders the children" }] }
          ]
        }
      ]
    },
    {
      id: "portal-dynamic",
      n: 12,
      title: "portal & dynamic",
      concepts: [
        {
          id: "portal", n: 1, title: "Portal", level: 2,
          gloss: "Renders content in another part of the DOM with Portal.",
          examples: [
            { code: `function Modal() {
  return (
    <Portal>
      <div class="modal">Dialog</div>
    </Portal>
  );
}`, notes: [{ at: "Portal", text: "imports from solid-js/web assumed" }, { at: "<Portal>", text: "mounts into document.body" }] },
            { code: `function Tooltip() {
  return (
    <Portal mount={document.body}>
      <span class="tooltip">Hint</span>
    </Portal>
  );
}`, notes: [{ at: "mount=", text: "choose the target element" }] },
            { code: `function Toast() {
  const [open, setOpen] = createSignal(true);
  return (
    <Show when={open()}>
      <Portal>
        <p onClick={() => setOpen(false)}>Saved</p>
      </Portal>
    </Show>
  );
}`, notes: [{ at: "<Show when", text: "portal content follows the condition" }] }
          ]
        },
        {
          id: "dynamic", n: 2, title: "Dynamic", level: 2,
          gloss: "Renders a component or tag chosen at runtime with Dynamic.",
          examples: [
            { code: `function Heading(props) {
  const tag = props.level === 1 ? "h1" : "h2";
  return <Dynamic component={tag}>Title</Dynamic>;
}`, notes: [{ at: "Dynamic", text: "imports from solid-js/web assumed" }, { at: "component=", text: "a tag name or a component" }] },
            { code: `const views = { home: () => <p>Home</p>, about: () => <p>About</p> };

function Router() {
  const [view, setView] = createSignal("home");
  return (
    <>
      <button onClick={() => setView("about")}>About</button>
      <Dynamic component={views[view()]} />
    </>
  );
}`, notes: [{ at: "views[view()]", text: "swap components by key" }] },
            { code: `function Box(props) {
  return <Dynamic component="div" class="box" {...props} />;
}`, notes: [{ at: "{...props}", text: "remaining props pass through" }] }
          ]
        },
        {
          id: "lazy", n: 3, title: "lazy components", level: 2,
          gloss: "Loads a component code on demand with lazy and a dynamic import.",
          examples: [
            { code: `const Settings = lazy(() => import("./Settings"));

function App() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Settings />
    </Suspense>
  );
}`, notes: [{ at: "lazy", text: "imports from solid-js assumed" }, { at: "import(\"./Settings\")", text: "separate chunk" }] },
            { code: `const Chart = lazy(() => import("./Chart"));

function Preview() {
  return (
    <button onMouseEnter={() => Chart.preload()}>
      Hover to preload
    </button>
  );
}`, notes: [{ at: "Chart.preload()", text: "fetch before it is rendered" }] },
            { code: `const Modal = lazy(() => import("./Modal"));

function Toolbar() {
  const [open, setOpen] = createSignal(false);
  return (
    <Suspense>
      <button onClick={() => setOpen(true)}>Export</button>
      <Show when={open()}><Modal /></Show>
    </Suspense>
  );
}`, notes: [{ at: "<Show when", text: "code loads on first open" }] }
          ]
        }
      ]
    }
  ]
};
