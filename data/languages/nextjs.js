export default {
  id: "nextjs",
  name: "Next.js",
  short: "NX",
  pigment: "nextjs",
  family: "javascript",
  version: "16",
  lexer: "javascript",
  indent: 2,
  topics: [
    {
      id: "pages-layouts",
      n: 1,
      title: "pages and layouts",
      concepts: [
        {
          id: "page-component", n: 1, title: "page component", level: 1,
          gloss: "Renders a route from a page file default export, with usual imports assumed.",
          examples: [
            { code: `export default function Page() {
  return <h1>Dashboard</h1>;
}`, notes: [{ at: "export default", text: "the page of this route" }] },
            { code: `export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
      <p>Pick a project to continue.</p>
    </main>
  );
}`, notes: [] },
            { code: `export default async function Page() {
  return <p>Rendered on the server</p>;
}`, notes: [{ at: "async", text: "pages may await data" }] }
          ]
        },
        {
          id: "root-layout", n: 2, title: "root layout", level: 1,
          gloss: "Wraps every route in a root layout that renders the html and body tags.",
          examples: [
            { code: `export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`, notes: [{ at: "children", text: "the current page or layout" }] },
            { code: `export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}`, notes: [] },
            { code: `export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}`, notes: [] }
          ]
        },
        {
          id: "nested-layouts", n: 3, title: "nested layouts", level: 1,
          gloss: "Nests a layout inside another so shared interface stays mounted.",
          examples: [
            { code: `export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section>
      <aside>Sidebar</aside>
      <div>{children}</div>
    </section>
  );
}`, notes: [{ at: "<aside>", text: "stays while pages change" }] },
            { code: `export default function SettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex gap-6">
      <nav>Settings menu</nav>
      {children}
    </div>
  );
}`, notes: [] },
            { code: `export default function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <article>{children}</article>;
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "dynamic-routes",
      n: 2,
      title: "dynamic routes",
      concepts: [
        {
          id: "dynamic-segments", n: 1, title: "dynamic segments", level: 2,
          gloss: "Reads a route parameter by awaiting the params promise.",
          examples: [
            { code: `export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <h1>Post: {slug}</h1>;
}`, notes: [{ at: "await params", text: "params is a promise" }] },
            { code: `export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <p>User number {Number(id)}</p>;
}`, notes: [] },
            { code: `export default async function MemberPage({
  params,
}: {
  params: Promise<{ teamId: string; memberId: string }>;
}) {
  const { teamId, memberId } = await params;
  return <p>{teamId} / {memberId}</p>;
}`, notes: [] }
          ]
        },
        {
          id: "search-params", n: 2, title: "search params", level: 2,
          gloss: "Reads query string values by awaiting the searchParams promise.",
          examples: [
            { code: `export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return <p>Results for {q ?? "everything"}</p>;
}`, notes: [{ at: "searchParams", text: "the query string" }] },
            { code: `export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Number((await searchParams).page ?? "1");
  return <p>Page {page}</p>;
}`, notes: [] },
            { code: `export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { category } = await params;
  const { sort = "new" } = await searchParams;
  return <p>{category} sorted by {sort}</p>;
}`, notes: [] }
          ]
        },
        {
          id: "static-params", n: 3, title: "static params", level: 2,
          gloss: "Lists the paths to prerender at build time with generateStaticParams.",
          examples: [
            { code: `export async function generateStaticParams() {
  return [{ slug: "intro" }, { slug: "setup" }];
}`, notes: [{ at: "generateStaticParams", text: "paths built ahead of time" }] },
            { code: `export async function generateStaticParams() {
  const res = await fetch("https://api.example.com/posts");
  const posts: { slug: string }[] = await res.json();
  return posts.map((post) => ({ slug: post.slug }));
}`, notes: [] },
            { code: `export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}`, notes: [{ at: "dynamicParams = false", text: "other paths give 404" }] }
          ]
        },
        {
          id: "catch-all", n: 4, title: "catch all segments", level: 3,
          gloss: "Matches any depth of path segments as an array parameter.",
          examples: [
            { code: `export default async function Page({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  return <p>{path.join(" / ")}</p>;
}`, notes: [{ at: "string[]", text: "every segment in order" }] },
            { code: `export default async function Docs({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  return <p>Depth {slug.length}</p>;
}`, notes: [{ at: "slug?", text: "optional catch all" }] },
            { code: `export default async function Files({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}) {
  const { segments } = await params;
  return <p>{segments.at(-1)}</p>;
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "links-navigation",
      n: 3,
      title: "links and navigation",
      concepts: [
        {
          id: "link-component", n: 1, title: "link component", level: 1,
          gloss: "Navigates between routes without a full page load using Link.",
          examples: [
            { code: `export default function Nav() {
  return <Link href="/about">About us</Link>;
}`, notes: [{ at: "Link", text: "client side navigation" }] },
            { code: `export default function PostLink({ slug }: { slug: string }) {
  return <Link href={\`/posts/\${slug}\`}>Read post</Link>;
}`, notes: [] },
            { code: `export default function Menu() {
  return (
    <Link href="/docs" prefetch={false} scroll={false}>
      Docs
    </Link>
  );
}`, notes: [{ at: "prefetch={false}", text: "skips background loading" }] }
          ]
        },
        {
          id: "navigation-hooks", n: 2, title: "navigation hooks", level: 2,
          gloss: "Reads and changes the route from a client component with hooks.",
          examples: [
            { code: `"use client";

export default function Where() {
  const pathname = usePathname();
  return <p>You are on {pathname}</p>;
}`, notes: [{ at: "usePathname", text: "the current path" }] },
            { code: `"use client";

export default function Back() {
  const router = useRouter();
  return <button onClick={() => router.back()}>Back</button>;
}`, notes: [] },
            { code: `"use client";

export default function Filter() {
  const router = useRouter();
  return (
    <button onClick={() => router.push("/shop")}>
      Shop
    </button>
  );
}`, notes: [{ at: "router.push", text: "navigates in code" }] }
          ]
        },
        {
          id: "active-links", n: 3, title: "active links", level: 2,
          gloss: "Highlights the current page by comparing the pathname with the link.",
          examples: [
            { code: `"use client";

export default function NavLink({ href }: { href: string }) {
  const active = usePathname() === href;
  return (
    <Link href={href} aria-current={active ? "page" : undefined}>
      {href}
    </Link>
  );
}`, notes: [{ at: "aria-current", text: "marks the active link" }] },
            { code: `"use client";

export default function Tab({ href }: { href: string }) {
  const pathname = usePathname();
  return (
    <Link href={href} className={pathname.startsWith(href) ? "on" : ""}>
      {href}
    </Link>
  );
}`, notes: [] },
            { code: `"use client";

export default function Crumb() {
  const segments = usePathname().split("/").filter(Boolean);
  return <p>{segments.join(" > ")}</p>;
}`, notes: [] }
          ]
        },
        {
          id: "redirects", n: 4, title: "redirects and not found", level: 2,
          gloss: "Sends a visitor elsewhere or shows a 404 from server code.",
          examples: [
            { code: `export default async function Page() {
  const token = (await cookies()).get("token");
  if (!token) redirect("/login");
  return <p>Account</p>;
}`, notes: [{ at: "redirect", text: "stops rendering and moves on" }] },
            { code: `export default async function Page() {
  const res = await fetch("https://api.example.com/products/42");
  if (!res.ok) notFound();
  const product: { name: string } = await res.json();
  return <h1>{product.name}</h1>;
}`, notes: [{ at: "notFound", text: "renders the 404 page" }] },
            { code: `export default function OldPage() {
  permanentRedirect("/new-page");
}`, notes: [{ at: "permanentRedirect", text: "a permanent move" }] }
          ]
        }
      ]
    },
    {
      id: "server-data",
      n: 4,
      title: "data fetching",
      concepts: [
        {
          id: "async-components", n: 1, title: "async server components", level: 1,
          gloss: "Fetches data directly inside an async server component.",
          examples: [
            { code: `export default async function Page() {
  const res = await fetch("https://api.example.com/products");
  const products: { id: number; name: string }[] = await res.json();
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}`, notes: [{ at: "await fetch", text: "runs on the server" }] },
            { code: `export default async function Page() {
  const res = await fetch("https://api.example.com/posts");
  const posts: { id: number; title: string }[] = await res.json();
  return <p>{posts.length} posts</p>;
}`, notes: [] },
            { code: `export default async function Page() {
  const res = await fetch("https://api.example.com/me");
  const me: { name: string; email: string } = await res.json();
  return (
    <dl>
      <dt>{me.name}</dt>
      <dd>{me.email}</dd>
    </dl>
  );
}`, notes: [] }
          ]
        },
        {
          id: "parallel-requests", n: 2, title: "parallel requests", level: 2,
          gloss: "Starts independent requests together with Promise.all.",
          examples: [
            { code: `export default async function Page() {
  const [a, b] = await Promise.all([
    fetch("https://api.example.com/stats"),
    fetch("https://api.example.com/alerts"),
  ]);
  return <p>{a.status} {b.status}</p>;
}`, notes: [{ at: "Promise.all", text: "both requests at once" }] },
            { code: `async function load<T>(path: string): Promise<T> {
  const res = await fetch(\`https://api.example.com\${path}\`);
  return res.json();
}

export default async function Page() {
  const [users, teams] = await Promise.all([
    load<string[]>("/users"),
    load<string[]>("/teams"),
  ]);
  return <p>{users.length + teams.length}</p>;
}`, notes: [] },
            { code: `export default async function Page() {
  const urls = ["/a", "/b", "/c"];
  const pages = await Promise.all(
    urls.map((u) => fetch(\`https://api.example.com\${u}\`)),
  );
  return <p>{pages.length} loaded</p>;
}`, notes: [] }
          ]
        },
        {
          id: "streaming", n: 3, title: "streaming with Suspense", level: 2,
          gloss: "Streams a slow part of the page behind a Suspense fallback.",
          examples: [
            { code: `async function Stats() {
  const res = await fetch("https://api.example.com/stats");
  return <p>{res.status} OK</p>;
}

export default function Page() {
  return (
    <Suspense fallback="Loading">
      <Stats />
    </Suspense>
  );
}`, notes: [{ at: "fallback", text: "shown while Stats waits" }] },
            { code: `async function Feed() {
  const items = await Promise.resolve(["One", "Two"]);
  return <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>;
}

export default function Page() {
  return <Suspense fallback="Loading"><Feed /></Suspense>;
}`, notes: [] },
            { code: `async function Comments() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return <p>No comments yet</p>;
}

export default function Page() {
  return (
    <Suspense fallback="Loading comments">
      <Comments />
    </Suspense>
  );
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "client-components",
      n: 5,
      title: "client components",
      concepts: [
        {
          id: "use-client", n: 1, title: "use client directive", level: 1,
          gloss: "Marks a file as a client component so it can use state and events.",
          examples: [
            { code: `"use client";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count}
    </button>
  );
}`, notes: [{ at: "\"use client\"", text: "opts into the browser bundle" }] },
            { code: `"use client";

export default function Toggle() {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn(!on)}>{on ? "On" : "Off"}</button>
  );
}`, notes: [] },
            { code: `"use client";

export default function SearchBox() {
  const [term, setTerm] = useState("");
  return (
    <input value={term} onChange={(e) => setTerm(e.target.value)} />
  );
}`, notes: [] }
          ]
        },
        {
          id: "children-composition", n: 2, title: "passing children", level: 2,
          gloss: "Keeps server content inside a client wrapper by passing it as children.",
          examples: [
            { code: `"use client";

export default function Modal({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)}>Details</button>
      {open && <div>{children}</div>}
    </>
  );
}`, notes: [{ at: "children", text: "server content passes through" }] },
            { code: `"use client";

export default function Fold({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <section onClick={() => setOpen(!open)}>
      {open && children}
    </section>
  );
}`, notes: [] },
            { code: `export default function Page() {
  return (
    <Tabs>
      <p>Server rendered tab content</p>
    </Tabs>
  );
}

function Tabs({ children }: { children: ReactNode }) {
  return <div role="tabpanel">{children}</div>;
}`, notes: [] }
          ]
        },
        {
          id: "browser-effects", n: 3, title: "effects and browser apis", level: 2,
          gloss: "Reads browser only values inside an effect of a client component.",
          examples: [
            { code: `"use client";

export default function Theme() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    setTheme(localStorage.getItem("theme") ?? "light");
  }, []);
  return <p>Theme: {theme}</p>;
}`, notes: [{ at: "useEffect", text: "runs after the first render" }] },
            { code: `"use client";

export default function Width() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return <p>{width}px</p>;
}`, notes: [] },
            { code: `"use client";

export default function Title({ name }: { name: string }) {
  useEffect(() => {
    document.title = \`Hello \${name}\`;
  }, [name]);
  return <h1>{name}</h1>;
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "loading-errors",
      n: 6,
      title: "loading and errors",
      concepts: [
        {
          id: "loading-ui", n: 1, title: "loading ui", level: 1,
          gloss: "Shows an instant fallback from loading.tsx while a route streams in.",
          examples: [
            { code: `export default function Loading() {
  return <p>Loading dashboard</p>;
}`, notes: [{ at: "Loading", text: "shown automatically" }] },
            { code: `export default function Loading() {
  return <div className="animate-pulse h-8 w-48 bg-slate-200" />;
}`, notes: [] },
            { code: `export default function Loading() {
  return (
    <main>
      <h1>Reports</h1>
      <p>Preparing your data</p>
    </main>
  );
}`, notes: [] }
          ]
        },
        {
          id: "error-boundaries", n: 2, title: "error boundaries", level: 2,
          gloss: "Catches render errors of a segment with error.tsx and offers a retry.",
          examples: [
            { code: `"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <button onClick={() => reset()}>Try again</button>;
}`, notes: [{ at: "reset", text: "renders the segment again" }] },
            { code: `"use client";

type Props = { error: Error; reset: () => void };
export default function Error({ error, reset }: Props) {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}`, notes: [] },
            { code: `"use client";

export default function Error({ reset }: { reset: () => void }) {
  useEffect(() => {
    console.error("segment failed");
  }, []);
  return <button onClick={reset}>Reload section</button>;
}`, notes: [] }
          ]
        },
        {
          id: "not-found-pages", n: 3, title: "not found pages", level: 1,
          gloss: "Renders a custom 404 page from not-found.tsx.",
          examples: [
            { code: `export default function NotFound() {
  return <h1>Page not found</h1>;
}`, notes: [{ at: "NotFound", text: "used by notFound()" }] },
            { code: `export default function NotFound() {
  return (
    <main>
      <h1>No such product</h1>
      <Link href="/shop">Back to the shop</Link>
    </main>
  );
}`, notes: [] },
            { code: `export default function NotFound() {
  return <p>We could not find that page.</p>;
}`, notes: [] }
          ]
        },
        {
          id: "global-errors", n: 4, title: "global errors", level: 3,
          gloss: "Replaces the root layout when an error escapes every other boundary.",
          examples: [
            { code: `"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <button onClick={reset}>Something broke, retry</button>
      </body>
    </html>
  );
}`, notes: [{ at: "<html lang=\"en\">", text: "must render its own document" }] },
            { code: `"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html lang="en">
      <body>{error.message}</body>
    </html>
  );
}`, notes: [] },
            { code: `"use client";

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <h1>Unexpected error</h1>
      </body>
    </html>
  );
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "route-handlers",
      n: 7,
      title: "route handlers",
      concepts: [
        {
          id: "get-handlers", n: 1, title: "GET handlers", level: 1,
          gloss: "Answers GET requests from an exported function in a route file.",
          examples: [
            { code: `export async function GET() {
  return Response.json({ ok: true });
}`, notes: [{ at: "GET", text: "the HTTP method name" }] },
            { code: `export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  return NextResponse.json({ query: q });
}`, notes: [{ at: "nextUrl", text: "parsed url helpers" }] },
            { code: `export async function GET() {
  const items = [{ id: 1, name: "Pen" }, { id: 2, name: "Ink" }];
  return Response.json(items);
}`, notes: [] }
          ]
        },
        {
          id: "post-handlers", n: 2, title: "POST handlers", level: 1,
          gloss: "Reads a JSON body in a POST handler and returns a status code.",
          examples: [
            { code: `export async function POST(request: Request) {
  const body: { title: string } = await request.json();
  return NextResponse.json({ created: body.title }, { status: 201 });
}`, notes: [{ at: "status: 201", text: "created" }] },
            { code: `export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = form.get("email");
  return NextResponse.json({ email });
}`, notes: [] },
            { code: `export async function POST(request: Request) {
  const text = await request.text();
  if (!text) return new Response("Empty body", { status: 400 });
  return new Response("Received", { status: 202 });
}`, notes: [] }
          ]
        },
        {
          id: "dynamic-handlers", n: 3, title: "dynamic handlers", level: 2,
          gloss: "Reads route parameters from the context argument of a handler.",
          examples: [
            { code: `export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return Response.json({ id });
}`, notes: [{ at: "_request", text: "unused first argument" }] },
            { code: `export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return new Response(null, { status: id ? 204 : 400 });
}`, notes: [] },
            { code: `export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const data = await request.json();
  return Response.json({ slug, data });
}`, notes: [] }
          ]
        },
        {
          id: "response-helpers", n: 4, title: "headers and status", level: 2,
          gloss: "Sets status codes, headers and redirects on a response.",
          examples: [
            { code: `export async function GET() {
  return new Response("Not allowed", { status: 403 });
}`, notes: [] },
            { code: `export async function GET() {
  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}`, notes: [{ at: "headers", text: "response headers" }] },
            { code: `export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/home", request.url));
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "server-actions",
      n: 8,
      title: "server actions",
      concepts: [
        {
          id: "inline-actions", n: 1, title: "inline actions", level: 1,
          gloss: "Runs a function on the server from a form with the use server directive.",
          examples: [
            { code: `export default function Page() {
  async function save(formData: FormData) {
    "use server";
    console.log(formData.get("title"));
  }
  return (
    <form action={save}>
      <input name="title" />
      <button type="submit">Save</button>
    </form>
  );
}`, notes: [{ at: "\"use server\"", text: "the function runs on the server" }, { at: "action={save}", text: "posts the form to it" }] },
            { code: `export default function Page() {
  async function subscribe(formData: FormData) {
    "use server";
    const email = String(formData.get("email"));
    console.log(email);
  }
  return (
    <form action={subscribe}>
      <input name="email" type="email" />
    </form>
  );
}`, notes: [] },
            { code: `export default function Page() {
  async function remove(formData: FormData) {
    "use server";
    console.log(Number(formData.get("id")));
  }
  return (
    <form action={remove}>
      <input type="hidden" name="id" value="7" />
      <button>Delete</button>
    </form>
  );
}`, notes: [] }
          ]
        },
        {
          id: "action-files", n: 2, title: "action files", level: 2,
          gloss: "Exports server actions from a file that starts with use server.",
          examples: [
            { code: `"use server";

export async function addTodo(formData: FormData) {
  const text = String(formData.get("text"));
  console.log(text);
}`, notes: [{ at: "\"use server\"", text: "every export is an action" }] },
            { code: `"use server";

export async function rename(id: string, name: string) {
  console.log(id, name);
}`, notes: [] },
            { code: `"use server";

export async function signOut() {
  (await cookies()).delete("session");
  redirect("/login");
}`, notes: [] }
          ]
        },
        {
          id: "revalidate-after", n: 3, title: "revalidating after a change", level: 2,
          gloss: "Refreshes cached pages and redirects after an action succeeds.",
          examples: [
            { code: `"use server";

export async function createPost(formData: FormData) {
  console.log(formData.get("title"));
  revalidatePath("/posts");
  redirect("/posts");
}`, notes: [{ at: "revalidatePath", text: "refreshes that route" }] },
            { code: `"use server";

export async function publish() {
  updateTag("posts");
}`, notes: [{ at: "updateTag", text: "read your writes at once" }] },
            { code: `"use server";

export async function archive(id: string) {
  console.log(id);
  revalidatePath("/inbox", "page");
}`, notes: [] }
          ]
        },
        {
          id: "form-state", n: 4, title: "form state", level: 3,
          gloss: "Returns validation messages from an action with useActionState.",
          examples: [
            { code: `"use client";
async function login(_: string, data: FormData) {
  return data.get("user") ? "" : "User is required";
}

export default function Form() {
  const [error, action] = useActionState(login, "");
  return <form action={action}><p>{error}</p></form>;
}`, notes: [{ at: "useActionState", text: "state and a bound action" }] },
            { code: `"use client";
async function count(prev: number) {
  return prev + 1;
}

export default function Counter() {
  const [value, action] = useActionState(count, 0);
  return <form action={action}><button>{value}</button></form>;
}`, notes: [] },
            { code: `"use client";

export default function Notes() {
  const [state, action, pending] = useActionState(
    async (_: string) => "saved",
    "idle",
  );
  return <form action={action}>{pending ? "Saving" : state}</form>;
}`, notes: [] }
          ]
        },
        {
          id: "pending-state", n: 5, title: "pending state", level: 2,
          gloss: "Disables the submit button while the form action runs.",
          examples: [
            { code: `"use client";

export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>{pending ? "Saving" : "Save"}</button>
  );
}`, notes: [{ at: "useFormStatus", text: "reads the parent form" }] },
            { code: `"use client";

export default function Save() {
  const [pending, start] = useTransition();
  return (
    <button disabled={pending} onClick={() => start(async () => {})}>
      Save
    </button>
  );
}`, notes: [] },
            { code: `"use client";

export default function Delete() {
  const { pending } = useFormStatus();
  return <button aria-busy={pending}>Delete</button>;
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "cookies-headers",
      n: 9,
      title: "cookies and headers",
      concepts: [
        {
          id: "cookies", n: 1, title: "cookies", level: 2,
          gloss: "Reads and writes cookies through the async cookies function.",
          examples: [
            { code: `export default async function Page() {
  const store = await cookies();
  const theme = store.get("theme")?.value ?? "light";
  return <p>Theme: {theme}</p>;
}`, notes: [{ at: "await cookies()", text: "async since version 15" }] },
            { code: `export async function setTheme(theme: string) {
  "use server";
  (await cookies()).set("theme", theme, { httpOnly: true, path: "/" });
}`, notes: [] },
            { code: `export async function logout() {
  "use server";
  (await cookies()).delete("session");
}`, notes: [] }
          ]
        },
        {
          id: "request-headers", n: 2, title: "request headers", level: 2,
          gloss: "Reads incoming request headers with the async headers function.",
          examples: [
            { code: `export default async function Page() {
  const agent = (await headers()).get("user-agent");
  return <p>{agent}</p>;
}`, notes: [{ at: "headers()", text: "read only request headers" }] },
            { code: `export async function GET() {
  const auth = (await headers()).get("authorization");
  return Response.json({ signedIn: auth !== null });
}`, notes: [] },
            { code: `export default async function Page() {
  const lang = (await headers()).get("accept-language") ?? "en";
  return <p>{lang.split(",")[0]}</p>;
}`, notes: [] }
          ]
        },
        {
          id: "request-time", n: 3, title: "request time rendering", level: 3,
          gloss: "Waits for a real request with connection so output is not prerendered.",
          examples: [
            { code: `export default async function Page() {
  await connection();
  return <p>{new Date().toISOString()}</p>;
}`, notes: [{ at: "connection", text: "renders per request" }] },
            { code: `export default async function Page() {
  await connection();
  const lucky = Math.floor(Math.random() * 100);
  return <p>Your number is {lucky}</p>;
}`, notes: [] },
            { code: `export const dynamic = "force-dynamic";

export default function Page() {
  return <p>{Date.now()}</p>;
}`, notes: [{ at: "force-dynamic", text: "never prerendered" }] }
          ]
        },
        {
          id: "draft-mode", n: 4, title: "draft mode", level: 3,
          gloss: "Switches a route to draft content with the draftMode function.",
          examples: [
            { code: `export async function GET() {
  (await draftMode()).enable();
  return new Response("Draft mode on");
}`, notes: [{ at: "draftMode", text: "preview unpublished content" }] },
            { code: `export async function GET() {
  (await draftMode()).disable();
  return new Response("Draft mode off");
}`, notes: [] },
            { code: `export default async function Page() {
  const { isEnabled } = await draftMode();
  return <p>{isEnabled ? "Preview" : "Live"}</p>;
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "metadata",
      n: 10,
      title: "metadata",
      concepts: [
        {
          id: "static-metadata", n: 1, title: "static metadata", level: 1,
          gloss: "Exports a metadata object that sets the title and description.",
          examples: [
            { code: `export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your account at a glance.",
};`, notes: [{ at: "Metadata", text: "the type of the export" }] },
            { code: `export const metadata: Metadata = {
  title: "Pricing",
  robots: { index: false },
};`, notes: [] },
            { code: `export const metadata: Metadata = {
  title: "Docs",
  alternates: { canonical: "https://example.com/docs" },
};`, notes: [] }
          ]
        },
        {
          id: "generate-metadata", n: 2, title: "generateMetadata", level: 2,
          gloss: "Builds metadata from route params with an async function.",
          examples: [
            { code: `export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: \`Post \${slug}\` };
}`, notes: [{ at: "generateMetadata", text: "runs per request or build" }] },
            { code: `export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(\`https://api.example.com/items/\${id}\`);
  const item: { name: string } = await res.json();
  return { title: item.name };
}`, notes: [] },
            { code: `export async function generateMetadata(): Promise<Metadata> {
  return { title: "Inbox", description: "Messages and alerts." };
}`, notes: [] }
          ]
        },
        {
          id: "title-open-graph", n: 3, title: "titles and open graph", level: 2,
          gloss: "Sets a title template and social sharing fields.",
          examples: [
            { code: `export const metadata: Metadata = {
  title: { template: "%s | Acme", default: "Acme" },
};`, notes: [{ at: "%s", text: "replaced by the page title" }] },
            { code: `export const metadata: Metadata = {
  openGraph: {
    title: "Acme",
    images: ["/og.png"],
  },
};`, notes: [] },
            { code: `export const viewport: Viewport = {
  themeColor: "#0369a1",
  width: "device-width",
};`, notes: [{ at: "Viewport", text: "separate from metadata" }] }
          ]
        }
      ]
    },
    {
      id: "caching",
      n: 11,
      title: "caching and revalidation",
      concepts: [
        {
          id: "fetch-caching", n: 1, title: "fetch caching", level: 2,
          gloss: "Controls how a fetch is cached with revalidate and cache options.",
          examples: [
            { code: `const res = await fetch("https://api.example.com/rates", {
  next: { revalidate: 3600 },
});`, notes: [{ at: "revalidate: 3600", text: "refresh after an hour" }] },
            { code: `const res = await fetch("https://api.example.com/cart", {
  cache: "no-store",
});`, notes: [{ at: "no-store", text: "always fetched fresh" }] },
            { code: `const res = await fetch("https://api.example.com/posts", {
  next: { tags: ["posts"] },
});`, notes: [{ at: "tags", text: "names for later purging" }] }
          ]
        },
        {
          id: "use-cache", n: 2, title: "use cache", level: 3,
          gloss: "Caches the result of a function or component with the use cache directive.",
          examples: [
            { code: `async function getPosts() {
  "use cache";
  cacheLife("hours");
  const res = await fetch("https://api.example.com/posts");
  return res.json();
}`, notes: [{ at: "\"use cache\"", text: "stores the result" }, { at: "cacheLife", text: "how long it stays fresh" }] },
            { code: `export default async function Page() {
  "use cache";
  cacheLife("days");
  return <p>Cached page</p>;
}`, notes: [] },
            { code: `async function getRates() {
  "use cache";
  cacheLife("minutes");
  const res = await fetch("https://api.example.com/rates");
  return res.json();
}`, notes: [] }
          ]
        },
        {
          id: "cache-tags", n: 3, title: "cache tags", level: 3,
          gloss: "Labels cached data with cacheTag so it can be purged by name.",
          examples: [
            { code: `async function getPosts() {
  "use cache";
  cacheTag("posts");
  const res = await fetch("https://api.example.com/posts");
  return res.json();
}`, notes: [{ at: "cacheTag", text: "names this entry" }] },
            { code: `async function getUser(id: string) {
  "use cache";
  cacheTag(\`user-\${id}\`);
  return { id };
}`, notes: [] },
            { code: `async function getMenu() {
  "use cache";
  cacheTag("menu", "navigation");
  return ["Home", "Docs"];
}`, notes: [] }
          ]
        },
        {
          id: "on-demand-revalidation", n: 4, title: "on demand revalidation", level: 2,
          gloss: "Purges cached data by tag or path from a handler or action.",
          examples: [
            { code: `export async function POST() {
  revalidateTag("posts", "max");
  return Response.json({ revalidated: true });
}`, notes: [{ at: "\"max\"", text: "serve stale while refreshing" }] },
            { code: `export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";
  revalidatePath(path);
  return Response.json({ path });
}`, notes: [] },
            { code: `export async function refreshInbox() {
  "use server";
  revalidatePath("/inbox");
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "images-fonts",
      n: 12,
      title: "images and fonts",
      concepts: [
        {
          id: "image-component", n: 1, title: "image component", level: 1,
          gloss: "Optimizes images with explicit sizes and the priority hint.",
          examples: [
            { code: `export default function Hero() {
  return (
    <Image
      src="/hero.png"
      alt="Team"
      width={1200}
      height={600}
      priority
    />
  );
}`, notes: [{ at: "priority", text: "loads it early" }] },
            { code: `export default function Avatar() {
  return <Image src="/ada.jpg" alt="Ada" width={48} height={48} />;
}`, notes: [] },
            { code: `export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Acme"
      width={120}
      height={32}
      className="h-8 w-auto"
    />
  );
}`, notes: [] }
          ]
        },
        {
          id: "fill-images", n: 2, title: "fill and sizes", level: 2,
          gloss: "Fills a positioned container and hints the rendered width with sizes.",
          examples: [
            { code: `export default function Banner() {
  return (
    <div className="relative h-64">
      <Image src="/banner.jpg" alt="Sale" fill />
    </div>
  );
}`, notes: [{ at: "fill", text: "sizes itself to the parent" }] },
            { code: `export default function Card() {
  return (
    <div className="relative aspect-video">
      <Image
        src="/photo.jpg"
        alt="Trip"
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
      />
    </div>
  );
}`, notes: [{ at: "sizes", text: "picks the right file" }] },
            { code: `export default function Thumb({ src }: { src: string }) {
  return (
    <div className="relative size-20">
      <Image src={src} alt="" fill sizes="80px" />
    </div>
  );
}`, notes: [] }
          ]
        },
        {
          id: "google-fonts", n: 3, title: "google fonts", level: 2,
          gloss: "Loads a font at build time with next/font/google.",
          examples: [
            { code: `const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}`, notes: [{ at: "subsets", text: "only the glyphs you need" }] },
            { code: `const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}`, notes: [{ at: "variable", text: "exposes a CSS variable" }] },
            { code: `const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export default function Title() {
  return <h1 className={inter.className}>Hello</h1>;
}`, notes: [] }
          ]
        },
        {
          id: "local-fonts", n: 4, title: "local fonts", level: 2,
          gloss: "Serves a font file from your project with next/font/local.",
          examples: [
            { code: `const brand = localFont({ src: "./fonts/Brand.woff2" });

export default function Title() {
  return <h1 className={brand.className}>Acme</h1>;
}`, notes: [{ at: "src", text: "path relative to the file" }] },
            { code: `const brand = localFont({
  src: "./fonts/Brand.woff2",
  variable: "--font-brand",
  display: "swap",
});`, notes: [{ at: "display: \"swap\"", text: "shows fallback text first" }] },
            { code: `const mono = localFont({
  src: [
    { path: "./Mono-Regular.woff2", weight: "400" },
    { path: "./Mono-Bold.woff2", weight: "700" },
  ],
});`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "proxy",
      n: 13,
      title: "proxy",
      concepts: [
        {
          id: "proxy-function", n: 1, title: "proxy function", level: 2,
          gloss: "Runs code before a request completes by exporting a proxy function.",
          examples: [
            { code: `export function proxy(request: NextRequest) {
  return NextResponse.next();
}`, notes: [{ at: "proxy", text: "runs before routes render" }] },
            { code: `export function proxy(request: NextRequest) {
  console.log(request.method, request.nextUrl.pathname);
  return NextResponse.next();
}`, notes: [] },
            { code: `export default function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.searchParams.set("seen", "1");
  return NextResponse.rewrite(url);
}`, notes: [] }
          ]
        },
        {
          id: "redirects-rewrites", n: 2, title: "redirects and rewrites", level: 2,
          gloss: "Redirects or rewrites a request based on cookies or the path.",
          examples: [
            { code: `export function proxy(request: NextRequest) {
  if (!request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}`, notes: [{ at: "redirect", text: "the address bar changes" }] },
            { code: `export function proxy(request: NextRequest) {
  return NextResponse.rewrite(new URL("/maintenance", request.url));
}`, notes: [{ at: "rewrite", text: "the address bar stays" }] },
            { code: `export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/old") {
    return NextResponse.redirect(new URL("/new", request.url), 308);
  }
  return NextResponse.next();
}`, notes: [] }
          ]
        },
        {
          id: "matcher-config", n: 3, title: "matcher config", level: 2,
          gloss: "Limits the proxy to selected paths with an exported matcher.",
          examples: [
            { code: `export const config = {
  matcher: ["/dashboard/:path*"],
};`, notes: [{ at: ":path*", text: "any depth below" }] },
            { code: `export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};`, notes: [] },
            { code: `export const config = {
  matcher: ["/account", "/settings/:section"],
};`, notes: [] }
          ]
        },
        {
          id: "proxy-headers", n: 4, title: "headers and cookies", level: 3,
          gloss: "Adds headers and cookies to the response before it continues.",
          examples: [
            { code: `export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-frame-options", "DENY");
  return response;
}`, notes: [{ at: "response.headers", text: "set on the way out" }] },
            { code: `export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  response.cookies.set("visited", "1", { maxAge: 86400 });
  return response;
}`, notes: [] },
            { code: `export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-request-source", "proxy");
  return NextResponse.next({ request: { headers } });
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "config",
      n: 14,
      title: "configuration",
      concepts: [
        {
          id: "next-config", n: 1, title: "next config", level: 1,
          gloss: "Exports settings from next.config.ts with the NextConfig type.",
          examples: [
            { code: `const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;`, notes: [{ at: "NextConfig", text: "typed settings" }] },
            { code: `const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
};

export default nextConfig;`, notes: [] },
            { code: `const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;`, notes: [{ at: "cacheComponents", text: "enables use cache" }] }
          ]
        },
        {
          id: "image-patterns", n: 2, title: "remote image patterns", level: 2,
          gloss: "Allows remote image hosts with remotePatterns.",
          examples: [
            { code: `const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.example.com" },
    ],
  },
};

export default nextConfig;`, notes: [{ at: "remotePatterns", text: "hosts allowed for Image" }] },
            { code: `const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.example.com",
        pathname: "/a/**",
      },
    ],
  },
};`, notes: [] },
            { code: `const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;`, notes: [] }
          ]
        },
        {
          id: "config-redirects-headers", n: 3, title: "redirects and headers", level: 2,
          gloss: "Declares redirects and response headers as async functions.",
          examples: [
            { code: `const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/blog", destination: "/news", permanent: true }];
  },
};

export default nextConfig;`, notes: [{ at: "permanent", text: "sends status 308" }] },
            { code: `const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [{ key: "X-Content-Type-Options", value: "nosniff" }],
      },
    ];
  },
};

export default nextConfig;`, notes: [] },
            { code: `const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.acme.dev/:path*",
      },
    ];
  },
};

export default nextConfig;`, notes: [] }
          ]
        },
        {
          id: "environment-variables", n: 4, title: "environment variables", level: 2,
          gloss: "Reads secrets on the server and public values with the NEXT_PUBLIC prefix.",
          examples: [
            { code: `export async function GET() {
  const key = process.env.PAYMENTS_SECRET;
  return Response.json({ configured: Boolean(key) });
}`, notes: [{ at: "process.env", text: "server only values" }] },
            { code: `"use client";

export default function Api() {
  return <p>{process.env.NEXT_PUBLIC_API_URL}</p>;
}`, notes: [{ at: "NEXT_PUBLIC_", text: "exposed to the browser" }] },
            { code: `const nextConfig: NextConfig = {
  env: { BUILD_TARGET: "staging" },
};

export default nextConfig;`, notes: [] }
          ]
        }
      ]
    }
  ]
};
