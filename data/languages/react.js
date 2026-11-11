export default {
  id: "react",
  name: "React",
  short: "RX",
  pigment: "react",
  family: "javascript",
  version: "19.3",
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
          gloss: "Declares a component as a function that returns JSX.",
          examples: [
            { code: `function Greeting() {
  return <h1>Welcome back, Ada</h1>;
}`, notes: [{ at: "function", text: "imports from react assumed" }, { at: "Greeting", text: "capitalized name" }] },
            { code: `function PriceTag() {
  return (
    <p className="price">
      Total: <strong>$24.50</strong>
    </p>
  );
}`, notes: [{ at: "className", text: "class is a reserved word" }, { at: "return (", text: "parentheses wrap multi-line jsx" }] },
            { code: `const EmptyCart = () => <p>Your cart is empty.</p>;`, notes: [{ at: "=>", text: "implicit return of the jsx" }] }
          ]
        },
        {
          id: "jsx-expressions", n: 2, title: "JSX expressions", level: 1,
          gloss: "Embeds JavaScript values inside JSX with curly braces.",
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
}`, notes: [{ at: "{48}", text: "numbers go in braces" }] },
            { code: `function Subtotal() {
  const prices = [4.5, 12, 7.25];
  const total = prices.reduce((sum, price) => sum + price, 0);
  return <p>Subtotal: {total.toFixed(2)}</p>;
}`, notes: [{ at: "{total.toFixed(2)}", text: "calls run before rendering" }] }
          ]
        },
        {
          id: "fragments", n: 3, title: "fragments", level: 1,
          gloss: "Groups sibling elements without adding a wrapper node to the DOM.",
          examples: [
            { code: `function Header() {
  return (
    <>
      <h1>Inventory</h1>
      <p>42 items in stock</p>
    </>
  );
}`, notes: [{ at: "<>", text: "short fragment syntax" }] },
            { code: `function ContactLines() {
  return (
    <>
      <dt>Email</dt>
      <dd>ada@example.com</dd>
    </>
  );
}`, notes: [{ at: "<dt>", text: "no extra wrapper in the dom" }] },
            { code: `function Glossary() {
  const terms = [{ id: 1, term: "prop", meaning: "an input" }];
  return terms.map((t) => (
    <Fragment key={t.id}>
      <dt>{t.term}</dt>
      <dd>{t.meaning}</dd>
    </Fragment>
  ));
}`, notes: [{ at: "Fragment", text: "a key needs the long form" }] }
          ]
        },
        {
          id: "nesting-components", n: 4, title: "nesting components", level: 2,
          gloss: "Composes small components into larger ones by nesting them as tags.",
          examples: [
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
}`, notes: [{ at: "<Logo />", text: "self-closing component tag" }] },
            { code: `function Badge() {
  return <span className="badge">New</span>;
}

function ProductTitle() {
  return (
    <h2>
      Desk lamp <Badge />
    </h2>
  );
}`, notes: [{ at: "<Badge />", text: "reused inline like any element" }] },
            { code: `function Copyright() {
  return <small>2026 Platen Labs</small>;
}

function Footer() {
  return (
    <footer>
      <Copyright />
    </footer>
  );
}`, notes: [{ at: "Copyright", text: "one small piece per component" }] }
          ]
        }
      ]
    },
    {
      id: "props",
      n: 2,
      title: "props",
      concepts: [
        {
          id: "passing-props", n: 1, title: "passing props", level: 1,
          gloss: "Passes values from a parent to a child as attributes on the tag.",
          examples: [
            { code: `function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return <Welcome name="Grace" />;
}`, notes: [{ at: "function", text: "imports from react assumed" }, { at: "props.name", text: "read from the props object" }, { at: "name=\"Grace\"", text: "string props use quotes" }] },
            { code: `function Stock({ item, count }) {
  return (
    <p>
      {item}: {count} left
    </p>
  );
}

function App() {
  return <Stock item="Lamp" count={12} />;
}`, notes: [{ at: "{ item, count }", text: "destructured in the signature" }, { at: "count={12}", text: "other types use braces" }] },
            { code: `function UserCard({ user }) {
  return <p>{user.name} ({user.role})</p>;
}

function App() {
  const user = { name: "Linus", role: "admin" };
  return <UserCard user={user} />;
}`, notes: [{ at: "user={user}", text: "any value can be a prop" }] }
          ]
        },
        {
          id: "default-values", n: 2, title: "default values", level: 1,
          gloss: "Falls back to a default value when a prop is not passed.",
          examples: [
            { code: `function Button({ label = "Save" }) {
  return <button>{label}</button>;
}

function App() {
  return <Button />;
}`, notes: [{ at: "label = \"Save\"", text: "used when the prop is undefined" }] },
            { code: `function Pagination({ page = 1, perPage = 20 }) {
  return (
    <p>
      Page {page}, {perPage} rows each
    </p>
  );
}

function App() {
  return <Pagination page={3} />;
}`, notes: [{ at: "perPage = 20", text: "keeps its default" }] },
            { code: `function Panel({ title, tone = "info" }) {
  return <section className={tone}>{title}</section>;
}

function App() {
  return <Panel title="Backup finished" />;
}`, notes: [{ at: "tone = \"info\"", text: "only title is required" }] }
          ]
        },
        {
          id: "children", n: 3, title: "children", level: 2,
          gloss: "Receives nested content through the children prop.",
          examples: [
            { code: `function Card({ children }) {
  return <div className="card">{children}</div>;
}

function App() {
  return (
    <Card>
      <p>Order shipped</p>
    </Card>
  );
}`, notes: [{ at: "children", text: "whatever sits between the tags" }] },
            { code: `function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function App() {
  return <Section title="Notes">Remember the milk</Section>;
}`, notes: [{ at: "{children}", text: "rendered where you place it" }] },
            { code: `function Stack({ children, gap = 8 }) {
  return <div style={{ display: "grid", gap }}>{children}</div>;
}

function App() {
  return (
    <Stack gap={4}>
      <span>One</span>
      <span>Two</span>
    </Stack>
  );
}`, notes: [{ at: "style={{", text: "outer braces for jsx, inner for object" }] }
          ]
        },
        {
          id: "spreading-props", n: 4, title: "spreading props", level: 2,
          gloss: "Forwards a whole object of props to an element with the spread operator.",
          examples: [
            { code: `function TextInput(props) {
  return <input type="text" {...props} />;
}

function App() {
  return <TextInput name="email" placeholder="you@example.com" />;
}`, notes: [{ at: "{...props}", text: "copies every prop onto the input" }] },
            { code: `function Link({ label, ...rest }) {
  return <a {...rest}>{label}</a>;
}

function App() {
  return <Link label="Docs" href="/docs" target="_blank" />;
}`, notes: [{ at: "...rest", text: "collects the remaining props" }] },
            { code: `function App() {
  const config = { src: "/hero.jpg", alt: "Mountain", width: 640 };
  return <img {...config} />;
}`, notes: [{ at: "{...config}", text: "object keys become attributes" }] }
          ]
        }
      ]
    },
    {
      id: "usestate",
      n: 3,
      title: "useState",
      concepts: [
        {
          id: "state-value", n: 1, title: "state value", level: 1,
          gloss: "Stores a value that triggers a re-render when it changes.",
          examples: [
            { code: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`, notes: [{ at: "useState", text: "imports from react assumed" }, { at: "[count, setCount]", text: "value and setter pair" }] },
            { code: `function Disclosure() {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)}>
      {open ? "Hide details" : "Show details"}
    </button>
  );
}`, notes: [{ at: "useState(false)", text: "initial state is false" }] },
            { code: `function Rating() {
  const [stars, setStars] = useState(3);
  return (
    <div>
      <button onClick={() => setStars(stars - 1)}>-</button>
      <span>{stars}</span>
      <button onClick={() => setStars(stars + 1)}>+</button>
    </div>
  );
}`, notes: [{ at: "setStars(stars - 1)", text: "the setter schedules a re-render" }] }
          ]
        },
        {
          id: "functional-updates", n: 2, title: "functional updates", level: 2,
          gloss: "Computes the next state from the previous state with an updater function.",
          examples: [
            { code: `function Counter() {
  const [count, setCount] = useState(0);
  const addThree = () => {
    setCount((n) => n + 1);
    setCount((n) => n + 1);
    setCount((n) => n + 1);
  };
  return <button onClick={addThree}>{count}</button>;
}`, notes: [{ at: "(n) => n + 1", text: "n is the latest queued state" }] },
            { code: `function Switch() {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn((prev) => !prev)}>
      {on ? "On" : "Off"}
    </button>
  );
}`, notes: [{ at: "(prev) => !prev", text: "flips the latest value" }] },
            { code: `function Stepper() {
  const [value, setValue] = useState(10);
  const next = (step) => setValue((v) => Math.min(v + step, 100));
  return (
    <button onClick={() => next(25)}>
      {value}
    </button>
  );
}`, notes: [{ at: "Math.min", text: "caps the new value" }] }
          ]
        },
        {
          id: "objects-arrays", n: 3, title: "objects & arrays", level: 2,
          gloss: "Replaces objects and arrays in state with new copies instead of mutating them.",
          examples: [
            { code: `function Profile() {
  const [user, setUser] = useState({ name: "Ada", age: 36 });
  const birthday = () => setUser({ ...user, age: user.age + 1 });
  return <button onClick={birthday}>{user.name}: {user.age}</button>;
}`, notes: [{ at: "...user", text: "copy the rest, change one key" }] },
            { code: `function Todos() {
  const [todos, setTodos] = useState(["Write docs"]);
  const add = () => setTodos([...todos, "Ship release"]);
  return <button onClick={add}>{todos.length} todos</button>;
}`, notes: [{ at: "[...todos,", text: "new array with the item added" }] },
            { code: `function Cart() {
  const [items, setItems] = useState(["tea", "milk", "bread"]);
  const drop = (name) => setItems(items.filter((i) => i !== name));
  return <button onClick={() => drop("milk")}>{items.length}</button>;
}`, notes: [{ at: "items.filter", text: "filter returns a new array" }] }
          ]
        },
        {
          id: "lazy-initial-state", n: 4, title: "lazy initial state", level: 3,
          gloss: "Computes the initial state once by passing a function to useState.",
          examples: [
            { code: `const saved = '{"volume": 7}';

function Mixer() {
  const [config] = useState(() => JSON.parse(saved));
  return <p>Volume: {config.volume}</p>;
}`, notes: [{ at: "() => JSON.parse(saved)", text: "runs only on the first render" }] },
            { code: `function makeRows() {
  return Array.from({ length: 1000 }, (_, i) => ({ id: i }));
}

function Grid() {
  const [rows] = useState(makeRows);
  return <p>{rows.length} rows</p>;
}`, notes: [{ at: "useState(makeRows)", text: "pass the function, do not call it" }] },
            { code: `function YearFooter() {
  const [year] = useState(() => new Date().getFullYear());
  return <small>Copyright {year}</small>;
}`, notes: [{ at: "new Date()", text: "evaluated once, not every render" }] }
          ]
        }
      ]
    },
    {
      id: "events",
      n: 4,
      title: "events",
      concepts: [
        {
          id: "event-handlers", n: 1, title: "event handlers", level: 1,
          gloss: "Runs a function when the user interacts with an element.",
          examples: [
            { code: `function SaveButton() {
  function handleClick() {
    console.log("Saved");
  }
  return <button onClick={handleClick}>Save</button>;
}`, notes: [{ at: "function", text: "imports from react assumed" }, { at: "onClick={handleClick}", text: "pass the function, not a call" }] },
            { code: `function LikeButton() {
  return (
    <button onClick={() => console.info("Liked")}>
      Like
    </button>
  );
}`, notes: [{ at: "() =>", text: "inline arrow handler" }] },
            { code: `function Tooltip() {
  const [shown, setShown] = useState(false);
  return (
    <span
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      {shown ? "Press Enter to save" : "Hover me"}
    </span>
  );
}`, notes: [{ at: "onMouseEnter", text: "camelCase event names" }] }
          ]
        },
        {
          id: "event-object", n: 2, title: "the event object", level: 2,
          gloss: "Reads details of an interaction from the event passed to the handler.",
          examples: [
            { code: `function SearchForm() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("searching");
  }
  return <form onSubmit={handleSubmit}><button>Go</button></form>;
}`, notes: [{ at: "event.preventDefault()", text: "stops the page reload" }] },
            { code: `function Shortcut() {
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("confirmed");
    }
  };
  return <input onKeyDown={onKeyDown} />;
}`, notes: [{ at: "event.key", text: "the key that was pressed" }] },
            { code: `function RowAction() {
  const handleClick = (event) => {
    console.log(event.currentTarget.dataset.id);
  };
  return (
    <button data-id="42" onClick={handleClick}>
      Select
    </button>
  );
}`, notes: [{ at: "currentTarget", text: "the element with the handler" }] }
          ]
        },
        {
          id: "passing-arguments", n: 3, title: "passing arguments", level: 2,
          gloss: "Passes extra values to a handler by wrapping the call in an arrow function.",
          examples: [
            { code: `function Toolbar() {
  const select = (tool) => console.log("selected", tool);
  return (
    <div>
      <button onClick={() => select("pen")}>Pen</button>
      <button onClick={() => select("eraser")}>Eraser</button>
    </div>
  );
}`, notes: [{ at: "() => select(\"pen\")", text: "wrapper delays the call" }] },
            { code: `function UserList() {
  const users = [{ id: 1, name: "Ada" }, { id: 2, name: "Grace" }];
  const remove = (id) => console.log("remove", id);
  return users.map((user) => (
    <button key={user.id} onClick={() => remove(user.id)}>
      {user.name}
    </button>
  ));
}`, notes: [{ at: "remove(user.id)", text: "each button captures its own id" }] },
            { code: `function Rate() {
  const rate = (stars, event) => {
    console.log(stars, event.type);
  };
  return <button onClick={(e) => rate(5, e)}>Five stars</button>;
}`, notes: [{ at: "(e) => rate(5, e)", text: "forward the event as well" }] }
          ]
        }
      ]
    },
    {
      id: "conditional-rendering",
      n: 5,
      title: "conditional rendering",
      concepts: [
        {
          id: "ternary", n: 1, title: "ternary expressions", level: 1,
          gloss: "Chooses between two pieces of JSX with a ternary expression.",
          examples: [
            { code: `function Status({ online }) {
  return <p>{online ? "Online" : "Offline"}</p>;
}`, notes: [{ at: "function", text: "imports from react assumed" }, { at: "?", text: "condition before the question mark" }] },
            { code: `function Banner({ user }) {
  return user ? (
    <h1>Hello, {user.name}</h1>
  ) : (
    <a href="/login">Sign in</a>
  );
}`, notes: [{ at: ") : (", text: "else branch" }] },
            { code: `function Stock({ count }) {
  return (
    <span className={count > 0 ? "in-stock" : "sold-out"}>
      {count > 0 ? \`\${count} left\` : "Sold out"}
    </span>
  );
}`, notes: [{ at: "className={count", text: "ternaries work in attributes" }] }
          ]
        },
        {
          id: "logical-and", n: 2, title: "logical and", level: 1,
          gloss: "Renders an element only when a condition is true using the and operator.",
          examples: [
            { code: `function Inbox({ unread }) {
  return <h2>Inbox {unread > 0 && <span>({unread})</span>}</h2>;
}`, notes: [{ at: "unread > 0 &&", text: "false renders nothing" }] },
            { code: `function Warning({ message }) {
  return message && <p role="alert">{message}</p>;
}`, notes: [{ at: "message &&", text: "skips when message is empty" }] },
            { code: `function Cart({ items }) {
  return (
    <div>
      {items.length > 0 && <p>{items.length} items in cart</p>}
    </div>
  );
}`, notes: [{ at: "items.length > 0", text: "comparison avoids rendering 0" }] }
          ]
        },
        {
          id: "early-return", n: 3, title: "early return", level: 2,
          gloss: "Returns early from a component to skip the rest of its markup.",
          examples: [
            { code: `function Profile({ user }) {
  if (!user) {
    return <p>No profile found</p>;
  }
  return <h1>{user.name}</h1>;
}`, notes: [{ at: "if (!user)", text: "guard clause" }] },
            { code: `function Report({ loading, rows }) {
  if (loading) {
    return <p>Loading report</p>;
  }
  return <p>{rows.length} rows loaded</p>;
}`, notes: [{ at: "loading", text: "handle the waiting state first" }] },
            { code: `function AdminPanel({ role }) {
  if (role !== "admin") {
    return null;
  }
  return <button>Delete workspace</button>;
}`, notes: [{ at: "return null", text: "renders nothing" }] }
          ]
        }
      ]
    },
    {
      id: "lists-keys",
      n: 6,
      title: "lists & keys",
      concepts: [
        {
          id: "rendering-lists", n: 1, title: "rendering lists", level: 1,
          gloss: "Turns an array into a list of elements with map.",
          examples: [
            { code: `function Fruits() {
  const fruits = ["apple", "pear", "plum"];
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}`, notes: [{ at: "function", text: "imports from react assumed" }, { at: "fruits.map", text: "one element per item" }] },
            { code: `function Prices() {
  const prices = [
    { id: 1, label: "Lamp", cents: 2400 },
    { id: 2, label: "Desk", cents: 18900 },
  ];
  const rows = prices.map((p) => (
    <li key={p.id}>{p.label}: {p.cents / 100}</li>
  ));
  return <ul>{rows}</ul>;
}`, notes: [{ at: "const rows", text: "build the list before returning" }] },
            { code: `function Row({ name, role }) {
  return <li>{name} ({role})</li>;
}

function Team() {
  const team = [{ id: 7, name: "Ada", role: "lead" }];
  return <ul>{team.map((m) => <Row key={m.id} {...m} />)}</ul>;
}`, notes: [{ at: "<Row key", text: "key sits on the outer element" }] }
          ]
        },
        {
          id: "keys", n: 2, title: "keys", level: 2,
          gloss: "Gives each list item a stable key so React can track it between renders.",
          examples: [
            { code: `function Inbox() {
  const messages = [{ id: "m1", subject: "Invoice" }];
  return (
    <ul>
      {messages.map((m) => (
        <li key={m.id}>{m.subject}</li>
      ))}
    </ul>
  );
}`, notes: [{ at: "key={m.id}", text: "a stable id from the data" }] },
            { code: `function Lines({ order }) {
  return order.lines.map((line) => (
    <li key={\`\${order.id}-\${line.sku}\`}>
      {line.qty} x {line.sku}
    </li>
  ));
}`, notes: [{ at: "${order.id}-${line.sku}", text: "combine fields for uniqueness" }] },
            { code: `function Draft() {
  const [text, setText] = useState("");
  const onChange = (e) => setText(e.target.value);
  return <textarea value={text} onChange={onChange} />;
}

function App({ docId }) {
  return <Draft key={docId} />;
}`, notes: [{ at: "key={docId}", text: "a new key resets the state" }] }
          ]
        },
        {
          id: "filter-sort", n: 3, title: "filtering & sorting", level: 2,
          gloss: "Filters and sorts an array before mapping it to elements.",
          examples: [
            { code: `function ActiveUsers({ users }) {
  const active = users.filter((u) => u.active);
  return (
    <ul>
      {active.map((u) => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`, notes: [{ at: "users.filter", text: "keep matching items only" }] },
            { code: `function Leaderboard({ scores }) {
  const ranked = [...scores].sort((a, b) => b.points - a.points);
  return (
    <ol>
      {ranked.map((s) => <li key={s.id}>{s.name}</li>)}
    </ol>
  );
}`, notes: [{ at: "[...scores]", text: "copy first, sort mutates" }] },
            { code: `function TopSellers({ products }) {
  const top = products.slice(0, 3);
  return (
    <ul>
      {top.map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}`, notes: [{ at: "slice(0, 3)", text: "first three items" }] }
          ]
        }
      ]
    },
    {
      id: "useeffect",
      n: 7,
      title: "useEffect",
      concepts: [
        {
          id: "after-render", n: 1, title: "running after render", level: 1,
          gloss: "Runs side effects after React commits a render to the screen.",
          examples: [
            { code: `function PageTitle() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return <h1>Dashboard</h1>;
}`, notes: [{ at: "useEffect", text: "imports from react assumed" }, { at: "[]", text: "runs once after the first render" }] },
            { code: `function RenderLogger() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("rendered with", count);
  });
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`, notes: [{ at: "});", text: "no array runs every render" }] },
            { code: `function Landing() {
  useEffect(() => {
    document.body.classList.add("loaded");
  }, []);
  return <main>Welcome</main>;
}`, notes: [{ at: "classList.add", text: "touches the dom outside react" }] }
          ]
        },
        {
          id: "dependencies", n: 2, title: "dependencies", level: 2,
          gloss: "Runs an effect again only when the values in its dependency array change.",
          examples: [
            { code: `function Unread({ count }) {
  useEffect(() => {
    document.title = \`Inbox (\${count})\`;
  }, [count]);
  return <p>{count} unread</p>;
}`, notes: [{ at: "[count]", text: "reruns when count changes" }] },
            { code: `function ThemePicker({ theme }) {
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return <p>Theme: {theme}</p>;
}`, notes: [{ at: "[theme]", text: "list every value the effect reads" }] },
            { code: `function Search({ query, page }) {
  useEffect(() => {
    console.log("search", query, page);
  }, [query, page]);
  return <p>{query}</p>;
}`, notes: [{ at: "[query, page]", text: "either change triggers it" }] }
          ]
        },
        {
          id: "cleanup", n: 3, title: "cleanup functions", level: 2,
          gloss: "Returns a function that undoes an effect before the next run or on unmount.",
          examples: [
            { code: `function Clock() {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setNow((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{now} seconds</p>;
}`, notes: [{ at: "return () =>", text: "cleanup runs on unmount" }] },
            { code: `function WindowWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return <p>{width}px</p>;
}`, notes: [{ at: "removeEventListener", text: "mirror what the effect added" }] },
            { code: `function Toast({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return <p>Saved</p>;
}`, notes: [{ at: "clearTimeout", text: "also runs before each rerun" }] }
          ]
        },
        {
          id: "fetching-data", n: 4, title: "fetching data", level: 3,
          gloss: "Fetches data in an effect and ignores results that arrive too late.",
          examples: [
            { code: `function Profile({ id }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch(\`/api/users/\${id}\`, { signal: controller.signal })
      .then((res) => res.json())
      .then(setUser);
    return () => controller.abort();
  }, [id]);
  return <p>{user ? user.name : "Loading"}</p>;
}`, notes: [{ at: "controller.abort()", text: "cancels the stale request" }] },
            { code: `function Weather({ city }) {
  const [temp, setTemp] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(\`/api/weather?city=\${city}\`)
      .then((res) => res.json())
      .then((data) => !ignore && setTemp(data.temp));
    return () => { ignore = true; };
  }, [city]);
  return <p>{temp ?? "Loading"}</p>;
}`, notes: [{ at: "ignore", text: "drops results from old runs" }] },
            { code: `function Feed() {
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("/api/feed").catch((err) => setError(err.message));
  }, []);
  return <p>{error ?? "Feed ready"}</p>;
}`, notes: [{ at: ".catch", text: "failures become state" }] }
          ]
        },
        {
          id: "effect-events", n: 5, title: "effect events", level: 3,
          gloss: "Reads the latest props inside an effect without making them dependencies.",
          examples: [
            { code: `function Chat({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    console.log("connected", theme);
  });
  useEffect(() => {
    console.log("joining", roomId);
    onConnected();
  }, [roomId]);
  return <p>{roomId}</p>;
}`, notes: [{ at: "useEffectEvent", text: "always sees the latest theme" }, { at: "[roomId]", text: "theme is not a dependency" }] },
            { code: `function Ticker({ symbol, onTick }) {
  const handleTick = useEffectEvent((price) => onTick(price));
  useEffect(() => {
    const id = setInterval(() => handleTick(symbol.length), 1000);
    return () => clearInterval(id);
  }, [symbol]);
  return <p>{symbol}</p>;
}`, notes: [{ at: "handleTick", text: "call it only from effects" }] },
            { code: `function Page({ url, cart }) {
  const logVisit = useEffectEvent((visitedUrl) => {
    console.info("visit", visitedUrl, cart.length);
  });
  useEffect(() => {
    logVisit(url);
  }, [url]);
  return <p>{url}</p>;
}`, notes: [{ at: "cart.length", text: "read without resubscribing" }] }
          ]
        }
      ]
    },
    {
      id: "useref",
      n: 8,
      title: "useRef",
      concepts: [
        {
          id: "dom-refs", n: 1, title: "DOM refs", level: 1,
          gloss: "Holds a reference to a DOM node that React renders.",
          examples: [
            { code: `function SearchBox() {
  const inputRef = useRef(null);
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </div>
  );
}`, notes: [{ at: "useRef", text: "imports from react assumed" }, { at: "inputRef.current", text: "the dom node after mount" }] },
            { code: `function Terminal() {
  const endRef = useRef(null);
  const scroll = () => endRef.current.scrollIntoView();
  return (
    <div>
      <button onClick={scroll}>Jump to end</button>
      <div ref={endRef} />
    </div>
  );
}`, notes: [{ at: "scrollIntoView", text: "a native dom method" }] },
            { code: `function Player() {
  const videoRef = useRef(null);
  return (
    <>
      <video ref={videoRef} src="/intro.mp4" />
      <button onClick={() => videoRef.current.play()}>Play</button>
    </>
  );
}`, notes: [{ at: "ref={videoRef}", text: "attaches the node to the ref" }] }
          ]
        },
        {
          id: "mutable-values", n: 2, title: "mutable values", level: 2,
          gloss: "Keeps a mutable value between renders without triggering a re-render.",
          examples: [
            { code: `function Stopwatch() {
  const timer = useRef(null);
  const tick = () => console.log("tick");
  const start = () => { timer.current = setInterval(tick, 1000); };
  const stop = () => clearInterval(timer.current);
  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}`, notes: [{ at: "timer.current", text: "changing it does not rerender" }] },
            { code: `function Tracker() {
  const clicks = useRef(0);
  const onClick = () => {
    clicks.current += 1;
    console.log("clicks so far", clicks.current);
  };
  return <button onClick={onClick}>Track</button>;
}`, notes: [{ at: "clicks.current += 1", text: "write refs in handlers" }] },
            { code: `function Autosave({ draft }) {
  const latest = useRef(draft);
  useEffect(() => {
    latest.current = draft;
  });
  useEffect(() => {
    const id = setInterval(() => console.log(latest.current), 5000);
    return () => clearInterval(id);
  }, []);
  return <p>Autosaving</p>;
}`, notes: [{ at: "latest.current", text: "interval reads the newest draft" }] }
          ]
        },
        {
          id: "ref-as-prop", n: 3, title: "ref as a prop", level: 2,
          gloss: "Accepts ref as an ordinary prop in React 19 without forwardRef.",
          examples: [
            { code: `function TextField({ ref, label }) {
  return <input ref={ref} aria-label={label} />;
}

function App() {
  const emailRef = useRef(null);
  return <TextField ref={emailRef} label="Email" />;
}`, notes: [{ at: "{ ref, label }", text: "ref arrives like any prop" }] },
            { code: `function IconButton({ ref, children }) {
  return <button ref={ref}>{children}</button>;
}

function App() {
  const saveRef = useRef(null);
  return <IconButton ref={saveRef}>Save</IconButton>;
}`, notes: [{ at: "ref={saveRef}", text: "no forwardRef wrapper needed" }] },
            { code: `function FancyInput({ ref, ...props }) {
  return <input ref={ref} className="fancy" {...props} />;
}

function App() {
  const ref = useRef(null);
  return <FancyInput ref={ref} placeholder="Name" />;
}`, notes: [{ at: "...props", text: "everything except ref" }] }
          ]
        },
        {
          id: "callback-refs", n: 4, title: "callback refs", level: 3,
          gloss: "Runs a function when a node attaches and can return a cleanup for detaching.",
          examples: [
            { code: `function Box() {
  const measure = (node) => {
    if (node) console.log(node.getBoundingClientRect().height);
  };
  return <div ref={measure}>Content</div>;
}`, notes: [{ at: "if (node)", text: "null is passed on detach" }] },
            { code: `function Observed() {
  const watch = (node) => {
    const observer = new ResizeObserver(() => console.log("resized"));
    observer.observe(node);
    return () => observer.disconnect();
  };
  return <div ref={watch}>Resizable</div>;
}`, notes: [{ at: "return () =>", text: "cleanup runs on detach" }] },
            { code: `function AutoFocus() {
  const focusOnMount = (node) => {
    node?.focus();
  };
  return <input ref={focusOnMount} />;
}`, notes: [{ at: "node?.focus()", text: "node is null on detach" }] }
          ]
        }
      ]
    },
    {
      id: "usememo-usecallback",
      n: 9,
      title: "useMemo & useCallback",
      concepts: [
        {
          id: "usememo", n: 1, title: "useMemo", level: 2,
          gloss: "Caches the result of a calculation until its dependencies change.",
          examples: [
            { code: `function Totals({ items }) {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  );
  return <p>Total: {total}</p>;
}`, notes: [{ at: "useMemo", text: "imports from react assumed" }, { at: "[items]", text: "recomputes when items changes" }] },
            { code: `function Catalog({ products, query }) {
  const visible = useMemo(
    () => products.filter((p) => p.title.includes(query)),
    [products, query]
  );
  return <p>{visible.length} matches</p>;
}`, notes: [{ at: "[products, query]", text: "both inputs are listed" }] },
            { code: `function Standings({ teams }) {
  const sorted = useMemo(
    () => [...teams].sort((a, b) => b.points - a.points),
    [teams]
  );
  return <p>Leader: {sorted[0]?.name}</p>;
}`, notes: [{ at: "sorted[0]?.name", text: "optional chaining on empty lists" }] }
          ]
        },
        {
          id: "usecallback", n: 2, title: "useCallback", level: 2,
          gloss: "Keeps a function identity stable between renders until dependencies change.",
          examples: [
            { code: `function Parent() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);
  return <button onClick={increment}>{count}</button>;
}`, notes: [{ at: "(c) => c + 1", text: "updater avoids a count dependency" }] },
            { code: `function Search({ onSearch }) {
  const [term, setTerm] = useState("");
  const submit = useCallback(() => {
    onSearch(term);
  }, [onSearch, term]);
  return (
    <>
      <input value={term} onChange={(e) => setTerm(e.target.value)} />
      <button onClick={submit}>Search</button>
    </>
  );
}`, notes: [{ at: "[onSearch, term]", text: "new function when either changes" }] },
            { code: `function Poller({ url }) {
  const load = useCallback(() => fetch(url), [url]);
  useEffect(() => {
    load();
  }, [load]);
  return <p>Polling {url}</p>;
}`, notes: [{ at: "[load]", text: "stable enough to be a dependency" }] }
          ]
        },
        {
          id: "memo", n: 3, title: "memo", level: 3,
          gloss: "Skips re-rendering a component when its props have not changed.",
          examples: [
            { code: `const PriceLabel = memo(function PriceLabel({ amount }) {
  return <span>{amount.toFixed(2)}</span>;
});

function App() {
  const [qty, setQty] = useState(1);
  return (
    <button onClick={() => setQty(qty + 1)}>
      <PriceLabel amount={9.5} /> x {qty}
    </button>
  );
}`, notes: [{ at: "memo(", text: "rerenders only if amount changes" }] },
            { code: `const Chart = memo(
  function Chart({ points }) {
    return <p>{points.length} points</p>;
  },
  (prev, next) => prev.points.length === next.points.length
);`, notes: [{ at: "(prev, next)", text: "custom comparison function" }] },
            { code: `const Row = memo(function Row({ order }) {
  return <li>{order.id}</li>;
});

function Orders() {
  const orders = [{ id: "A-100" }, { id: "A-101" }];
  return <ul>{orders.map((o) => <Row key={o.id} order={o} />)}</ul>;
}`, notes: [{ at: "order={o}", text: "same object reference skips work" }] }
          ]
        }
      ]
    },
    {
      id: "context",
      n: 10,
      title: "context",
      concepts: [
        {
          id: "creating-providing", n: 1, title: "creating and providing", level: 2,
          gloss: "Shares a value with a whole subtree by rendering a context as its provider.",
          examples: [
            { code: `const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext value="dark">
      <main>Dashboard</main>
    </ThemeContext>
  );
}`, notes: [{ at: "createContext", text: "imports from react assumed" }, { at: "createContext(\"light\")", text: "default without a provider" }, { at: "value=\"dark\"", text: "context is its own provider" }] },
            { code: `const UserContext = createContext(null);

function App() {
  const user = { name: "Ada", plan: "pro" };
  return (
    <UserContext value={user}>
      <main>Account</main>
    </UserContext>
  );
}`, notes: [{ at: "value={user}", text: "any value can be shared" }] },
            { code: `const LocaleContext = createContext("en");

function App() {
  return (
    <LocaleContext value="fr">
      <LocaleContext value="de">
        <p>Willkommen</p>
      </LocaleContext>
    </LocaleContext>
  );
}`, notes: [{ at: "value=\"de\"", text: "the nearest provider wins" }] }
          ]
        },
        {
          id: "reading-context", n: 2, title: "reading context", level: 1,
          gloss: "Reads the nearest context value inside a component with useContext.",
          examples: [
            { code: `const ThemeContext = createContext("light");

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Save</button>;
}`, notes: [{ at: "useContext", text: "returns the default here" }] },
            { code: `const UserContext = createContext({ name: "guest" });

function Welcome() {
  const user = useContext(UserContext);
  return <h1>Hello, {user.name}</h1>;
}`, notes: [{ at: "useContext(UserContext)", text: "rerenders when the value changes" }] },
            { code: `const ThemeContext = createContext("light");

function Label({ show }) {
  if (!show) return null;
  const theme = use(ThemeContext);
  return <span className={theme}>Label</span>;
}`, notes: [{ at: "use(ThemeContext)", text: "use can follow an early return" }] }
          ]
        },
        {
          id: "stateful-providers", n: 3, title: "stateful providers", level: 3,
          gloss: "Combines state and context in a provider component that exposes a value and setter.",
          examples: [
            { code: `const CartContext = createContext(null);

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  return (
    <CartContext value={{ items, setItems }}>
      {children}
    </CartContext>
  );
}`, notes: [{ at: "{{ items, setItems }}", text: "state and setter in one value" }] },
            { code: `const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const value = { theme, setTheme };
  return <ThemeContext value={value}>{children}</ThemeContext>;
}`, notes: [{ at: "const value", text: "name the object before passing it" }] },
            { code: `const AuthContext = createContext(null);

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
      id: "usereducer",
      n: 11,
      title: "useReducer",
      concepts: [
        {
          id: "reducer-functions", n: 1, title: "reducer functions", level: 2,
          gloss: "Moves state updates into a pure function of the current state and an action.",
          examples: [
            { code: `function reducer(count, action) {
  if (action.type === "increment") return count + 1;
  return count;
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const add = () => dispatch({ type: "increment" });
  return <button onClick={add}>{count}</button>;
}`, notes: [{ at: "useReducer", text: "imports from react assumed" }, { at: "reducer, 0", text: "reducer and initial state" }] },
            { code: `function menuReducer(open, action) {
  if (action === "toggle") return !open;
  if (action === "close") return false;
  return open;
}

function Menu() {
  const [open, dispatch] = useReducer(menuReducer, false);
  const toggle = () => dispatch("toggle");
  return <button onClick={toggle}>{open ? "Open" : "Closed"}</button>;
}`, notes: [{ at: "dispatch(\"toggle\")", text: "an action can be a string" }] },
            { code: `function reducer(status, action) {
  if (action === "start") return "loading";
  if (action === "done") return "ready";
  return status;
}

function Upload() {
  const [status, dispatch] = useReducer(reducer, "idle");
  return <button onClick={() => dispatch("start")}>{status}</button>;
}`, notes: [{ at: "return status", text: "unknown actions keep state" }] }
          ]
        },
        {
          id: "dispatching-actions", n: 2, title: "dispatching actions", level: 2,
          gloss: "Sends action objects that carry a type and a payload describing what happened.",
          examples: [
            { code: `function reducer(todos, action) {
  if (action.type === "add") return [...todos, action.text];
  return todos;
}

function Todos() {
  const [todos, dispatch] = useReducer(reducer, []);
  const add = () => dispatch({ type: "add", text: "Write tests" });
  return <button onClick={add}>{todos.length}</button>;
}`, notes: [{ at: "action.text", text: "payload travels with the action" }] },
            { code: `function reducer(count, action) {
  return count + action.amount;
}

function Stepper() {
  const [count, dispatch] = useReducer(reducer, 0);
  const add = (amount) => dispatch({ type: "step", amount });
  return <button onClick={() => add(5)}>{count}</button>;
}`, notes: [{ at: "{ type: \"step\", amount }", text: "shorthand property" }] },
            { code: `function reducer(profile, action) {
  return { ...profile, [action.key]: action.value };
}

function Profile() {
  const [profile, dispatch] = useReducer(reducer, { city: "Oslo" });
  const move = () => dispatch({ key: "city", value: "Bergen" });
  return <button onClick={move}>{profile.city}</button>;
}`, notes: [{ at: "[action.key]", text: "computed property name" }] }
          ]
        },
        {
          id: "init-function", n: 3, title: "initial state function", level: 3,
          gloss: "Derives the initial state from an argument with an init function.",
          examples: [
            { code: `const init = (start) => ({ count: start });
const reducer = (state, action) =>
  action === "inc" ? { count: state.count + 1 } : state;

function Counter() {
  const [state, dispatch] = useReducer(reducer, 5, init);
  const inc = () => dispatch("inc");
  return <button onClick={inc}>{state.count}</button>;
}`, notes: [{ at: "reducer, 5, init", text: "third argument builds the state" }] },
            { code: `const init = (items) => items.map((name) => ({ name, done: false }));
const reducer = (list, action) => (action === "clear" ? [] : list);

function Checklist({ items }) {
  const [list, dispatch] = useReducer(reducer, items, init);
  const clear = () => dispatch("clear");
  return <button onClick={clear}>{list.length}</button>;
}`, notes: [{ at: "items, init", text: "init receives items" }] },
            { code: `const init = () => ({ laps: [] });
const reducer = (state, action) => ({
  ...state,
  laps: [...state.laps, action.time],
});

function Stopwatch() {
  const [state, dispatch] = useReducer(reducer, null, init);
  const lap = () => dispatch({ time: Date.now() });
  return <button onClick={lap}>{state.laps.length}</button>;
}`, notes: [{ at: "null, init", text: "the argument can be null" }] }
          ]
        }
      ]
    },
    {
      id: "custom-hooks",
      n: 12,
      title: "custom hooks",
      concepts: [
        {
          id: "extracting-logic", n: 1, title: "extracting logic", level: 2,
          gloss: "Extracts stateful logic into a function whose name starts with use.",
          examples: [
            { code: `function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((v) => !v);
  return [on, toggle];
}

function Panel() {
  const [open, toggle] = useToggle();
  return <button onClick={toggle}>{open ? "Close" : "Open"}</button>;
}`, notes: [{ at: "useState", text: "imports from react assumed" }, { at: "useToggle", text: "the use prefix marks a hook" }] },
            { code: `function useCounter(start = 0) {
  const [count, setCount] = useState(start);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}

function Likes() {
  const { count, increment } = useCounter(10);
  return <button onClick={increment}>{count} likes</button>;
}`, notes: [{ at: "return { count, increment }", text: "a hook can return an object" }] },
            { code: `function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}`, notes: [{ at: "return width", text: "hands the value to callers" }] }
          ]
        },
        {
          id: "persisted-state", n: 2, title: "persisting state", level: 2,
          gloss: "Saves state to web storage and restores it on load.",
          examples: [
            { code: `function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}`, notes: [{ at: "JSON.parse(saved)", text: "restores the stored value" }] },
            { code: `function useStoredTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ?? "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, setTheme];
}`, notes: [{ at: "?? \"light\"", text: "fallback when nothing is saved" }] },
            { code: `function useSessionState(key, fallback) {
  const [value, setValue] = useState(() => {
    const raw = sessionStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  });
  const save = (next) => {
    sessionStorage.setItem(key, JSON.stringify(next));
    setValue(next);
  };
  return [value, save];
}`, notes: [{ at: "save", text: "writes storage and state together" }] }
          ]
        },
        {
          id: "effect-hooks", n: 3, title: "hooks with effects", level: 3,
          gloss: "Wraps an effect and its state in a hook that components can reuse.",
          examples: [
            { code: `function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [url]);
  return data;
}`, notes: [{ at: "[url]", text: "refetches when the url changes" }] },
            { code: `function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}`, notes: [{ at: "clearTimeout(id)", text: "restarts the wait on each change" }] },
            { code: `function useOnlineStatus() {
  const subscribe = (notify) => {
    window.addEventListener("online", notify);
    window.addEventListener("offline", notify);
    return () => {
      window.removeEventListener("online", notify);
      window.removeEventListener("offline", notify);
    };
  };
  return useSyncExternalStore(subscribe, () => navigator.onLine);
}`, notes: [{ at: "useSyncExternalStore", text: "subscribes to a browser store" }] }
          ]
        }
      ]
    },
    {
      id: "forms-controlled-inputs",
      n: 13,
      title: "forms & controlled inputs",
      concepts: [
        {
          id: "controlled-inputs", n: 1, title: "controlled inputs", level: 1,
          gloss: "Binds an input to state so React controls its value.",
          examples: [
            { code: `function NameField() {
  const [name, setName] = useState("");
  return (
    <input value={name} onChange={(e) => setName(e.target.value)} />
  );
}`, notes: [{ at: "useState", text: "imports from react assumed" }, { at: "value={name}", text: "state drives the input" }, { at: "e.target.value", text: "the text typed so far" }] },
            { code: `function Bio() {
  const [bio, setBio] = useState("");
  return (
    <>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      <small>{bio.length} / 160</small>
    </>
  );
}`, notes: [{ at: "bio.length", text: "derived from state" }] },
            { code: `function SizePicker() {
  const [size, setSize] = useState("medium");
  return (
    <select value={size} onChange={(e) => setSize(e.target.value)}>
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
    </select>
  );
}`, notes: [{ at: "<select value", text: "value goes on the select" }] }
          ]
        },
        {
          id: "checkboxes-radios", n: 2, title: "checkboxes & radios", level: 2,
          gloss: "Reads checked state from checkboxes and radio buttons.",
          examples: [
            { code: `function Terms() {
  const [agreed, setAgreed] = useState(false);
  const toggle = (e) => setAgreed(e.target.checked);
  return (
    <label>
      <input type="checkbox" checked={agreed} onChange={toggle} />
      Accept terms
    </label>
  );
}`, notes: [{ at: "e.target.checked", text: "a boolean, not a string" }] },
            { code: `function Shipping() {
  const [mode, setMode] = useState("standard");
  const pick = (e) => setMode(e.target.value);
  return (
    <fieldset onChange={pick}>
      <legend>Speed: {mode}</legend>
      <input type="radio" name="speed" value="standard" />
      <input type="radio" name="speed" value="express" />
    </fieldset>
  );
}`, notes: [{ at: "onChange={pick}", text: "change events bubble up" }] },
            { code: `function Newsletter() {
  return (
    <label>
      <input type="checkbox" name="news" defaultChecked />
      Send me updates
    </label>
  );
}`, notes: [{ at: "defaultChecked", text: "uncontrolled starting value" }] }
          ]
        },
        {
          id: "submitting-forms", n: 3, title: "submitting forms", level: 2,
          gloss: "Collects form fields and handles submission with preventDefault.",
          examples: [
            { code: `function Login() {
  const [email, setEmail] = useState("");
  const submit = (e) => { e.preventDefault(); console.log(email); };
  return (
    <form onSubmit={submit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Sign in</button>
    </form>
  );
}`, notes: [{ at: "onSubmit", text: "fires on enter or button click" }] },
            { code: `function Contact() {
  const submit = (event) => {
    event.preventDefault();
    console.log(Object.fromEntries(new FormData(event.currentTarget)));
  };
  return (
    <form onSubmit={submit}>
      <input name="message" />
      <button>Send</button>
    </form>
  );
}`, notes: [{ at: "new FormData", text: "reads fields by name" }] },
            { code: `function Comment() {
  const [text, setText] = useState("");
  const submit = (e) => { e.preventDefault(); setText(""); };
  return (
    <form onSubmit={submit}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button>Post</button>
    </form>
  );
}`, notes: [{ at: "setText(\"\")", text: "clears the field after submit" }] }
          ]
        },
        {
          id: "form-actions", n: 4, title: "form actions", level: 3,
          gloss: "Passes an action to the form and reads its state with React 19 hooks.",
          examples: [
            { code: `function Subscribe() {
  const [message, action] = useActionState(async (prev, formData) => {
    return \`Subscribed \${formData.get("email")}\`;
  }, "");
  return (
    <form action={action}>
      <input name="email" />
      <button>Join</button>
      <p>{message}</p>
    </form>
  );
}`, notes: [{ at: "action={action}", text: "form action prop, react 19" }, { at: "prev", text: "the last returned state" }] },
            { code: `function SubmitButton() {
  const { pending } = useFormStatus();
  const label = pending ? "Saving" : "Save";
  return <button disabled={pending}>{label}</button>;
}`, notes: [{ at: "useFormStatus", text: "imported from react-dom" }, { at: "pending", text: "true while the form submits" }] },
            { code: `function Likes({ likes }) {
  const [shown, addLike] = useOptimistic(likes, (n) => n + 1);
  const like = async () => {
    addLike();
    await fetch("/api/like", { method: "POST" });
  };
  return (
    <form action={like}>
      <button>{shown}</button>
    </form>
  );
}`, notes: [{ at: "useOptimistic", text: "shows the update before it lands" }] }
          ]
        }
      ]
    },
    {
      id: "suspense-data-loading",
      n: 14,
      title: "Suspense & data loading",
      concepts: [
        {
          id: "suspense-fallbacks", n: 1, title: "Suspense fallbacks", level: 1,
          gloss: "Shows a fallback while a child suspends, then swaps in the real content.",
          examples: [
            { code: `function Reviews({ reviewsPromise }) {
  const reviews = use(reviewsPromise);
  return <p>{reviews.length} reviews</p>;
}

function Product({ reviewsPromise }) {
  return (
    <Suspense fallback={<p>Loading reviews</p>}>
      <Reviews reviewsPromise={reviewsPromise} />
    </Suspense>
  );
}`, notes: [{ at: "Suspense", text: "imports from react assumed" }, { at: "fallback=", text: "shown while the child waits" }] },
            { code: `function Page({ children }) {
  return (
    <Suspense fallback={<p>Loading page</p>}>
      <h1>Account</h1>
      <Suspense fallback={<p>Loading orders</p>}>{children}</Suspense>
    </Suspense>
  );
}`, notes: [{ at: "<Suspense fallback={<p>Loading orders", text: "inner boundary loads separately" }] },
            { code: `function Skeleton() {
  return <div className="skeleton" aria-busy="true" />;
}

function Feed({ children }) {
  return <Suspense fallback={<Skeleton />}>{children}</Suspense>;
}`, notes: [{ at: "fallback={<Skeleton />}", text: "any element can be the fallback" }] }
          ]
        },
        {
          id: "lazy-components", n: 2, title: "lazy components", level: 2,
          gloss: "Loads a component code on demand with lazy and a dynamic import.",
          examples: [
            { code: `const Settings = lazy(() => import("./Settings"));

function App() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Settings />
    </Suspense>
  );
}`, notes: [{ at: "import(\"./Settings\")", text: "separate chunk loaded on demand" }] },
            { code: `const Editor = lazy(() =>
  import("./editor").then((m) => ({ default: m.Editor }))
);

function Notes() {
  return (
    <Suspense fallback={null}>
      <Editor />
    </Suspense>
  );
}`, notes: [{ at: "{ default: m.Editor }", text: "lazy needs a default export" }] },
            { code: `const Modal = lazy(() => import("./Modal"));

function Toolbar() {
  const [open, setOpen] = useState(false);
  return (
    <Suspense fallback={null}>
      <button onClick={() => setOpen(true)}>Export</button>
      {open && <Modal />}
    </Suspense>
  );
}`, notes: [{ at: "{open && <Modal />}", text: "code loads on first open" }] }
          ]
        },
        {
          id: "use-hook", n: 3, title: "the use hook", level: 2,
          gloss: "Reads a promise with use so the component suspends until it resolves.",
          examples: [
            { code: `function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return (
    <ul>
      {comments.map((c) => <li key={c.id}>{c.text}</li>)}
    </ul>
  );
}`, notes: [{ at: "use(commentsPromise)", text: "suspends until resolved" }] },
            { code: `const userPromise = fetch("/api/user").then((res) => res.json());

function Greeting() {
  const user = use(userPromise);
  return <h1>Hello, {user.name}</h1>;
}`, notes: [{ at: "userPromise", text: "created outside the component" }] },
            { code: `function Profile({ userPromise }) {
  return <p>{use(userPromise).name}</p>;
}

function App() {
  const [promise] = useState(() => Promise.resolve({ name: "Ada" }));
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Profile userPromise={promise} />
    </Suspense>
  );
}`, notes: [{ at: "useState(() =>", text: "keeps one promise across renders" }] }
          ]
        },
        {
          id: "transitions", n: 4, title: "transitions", level: 2,
          gloss: "Marks a state update as non-urgent with useTransition to keep the UI responsive.",
          examples: [
            { code: `function Tabs() {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();
  const select = (next) => startTransition(() => setTab(next));
  return (
    <button onClick={() => select("reports")}>
      {isPending ? "Loading" : tab}
    </button>
  );
}`, notes: [{ at: "isPending", text: "true while the transition runs" }] },
            { code: `function Saver() {
  const [isPending, startTransition] = useTransition();
  const save = () => {
    startTransition(async () => {
      await fetch("/api/save", { method: "POST" });
    });
  };
  return <button onClick={save} disabled={isPending}>Save</button>;
}`, notes: [{ at: "async () =>", text: "async transitions, react 19" }] },
            { code: `function Filter({ onChange }) {
  const handle = (e) => {
    const value = e.target.value;
    startTransition(() => onChange(value));
  };
  return <input onChange={handle} />;
}`, notes: [{ at: "startTransition", text: "standalone version without pending" }] }
          ]
        },
        {
          id: "deferred-values", n: 5, title: "deferred values", level: 3,
          gloss: "Defers a value with useDeferredValue so slow children lag behind the input.",
          examples: [
            { code: `function Search({ results }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <p>{results.length} results for {deferred}</p>
    </>
  );
}`, notes: [{ at: "deferred", text: "trails behind query" }] },
            { code: `function Preview({ text }) {
  const deferred = useDeferredValue(text);
  return <p>{deferred.toUpperCase()}</p>;
}`, notes: [{ at: "useDeferredValue(text)", text: "low priority copy of text" }] },
            { code: `function Chart({ range }) {
  const shown = useDeferredValue(range, "7d");
  return <p>Showing {shown}</p>;
}`, notes: [{ at: "\"7d\"", text: "value used on the first render" }] }
          ]
        }
      ]
    }
  ]
};
