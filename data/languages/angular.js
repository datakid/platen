export default {
  id: "angular",
  name: "Angular",
  short: "NG",
  pigment: "angular",
  family: "javascript",
  version: "22.2",
  lexer: "angular",
  indent: 2,
  topics: [
    {
      id: "components",
      n: 1,
      title: "components",
      concepts: [
        {
          id: "standalone-components", n: 1, title: "standalone components", level: 1,
          gloss: "Declares a component with the Component decorator, a selector and a template.",
          examples: [
            { code: `@Component({
  selector: "app-greeting",
  template: \`<h1>Welcome back, Ada</h1>\`,
})
export class Greeting {}`, notes: [{ at: "@Component", text: "imports from @angular/core assumed" }, { at: "selector", text: "the tag name in other templates" }] },
            { code: `@Component({
  selector: "app-price",
  template: \`<p>Total: {{ total }}</p>\`,
})
export class Price {
  total = "24.50";
}`, notes: [{ at: "total", text: "class fields reach the template" }] },
            { code: `@Component({
  selector: "app-empty-cart",
  template: \`
    <p>Your cart is empty.</p>
    <a href="/shop">Keep shopping</a>
  \`,
})
export class EmptyCart {}`, notes: [{ at: "template:", text: "backticks allow several lines" }] }
          ]
        },
        {
          id: "styles-host", n: 2, title: "styles & host bindings", level: 2,
          gloss: "Styles a component with scoped CSS and sets properties on its host element.",
          examples: [
            { code: `@Component({
  selector: "app-alert",
  template: \`<p>Disk almost full</p>\`,
  styles: \`
    p {
      color: crimson;
    }
  \`,
})
export class Alert {}`, notes: [{ at: "styles:", text: "scoped to this component" }] },
            { code: `@Component({
  selector: "app-badge",
  template: \`<ng-content />\`,
  host: { class: "badge", role: "status" },
})
export class Badge {}`, notes: [{ at: "host:", text: "attributes on the component element" }] },
            { code: `@Component({
  selector: "app-card",
  template: \`<ng-content />\`,
  host: {
    "[class.active]": "active()",
    "(click)": "active.set(!active())",
  },
})
export class Card {
  active = signal(false);
}`, notes: [{ at: "\"[class.active]\"", text: "binds a host class" }, { at: "\"(click)\"", text: "listens on the host" }] }
          ]
        },
        {
          id: "composition", n: 3, title: "composing components", level: 2,
          gloss: "Uses other components in a template by listing them in the imports array.",
          examples: [
            { code: `@Component({
  selector: "app-logo",
  template: \`<img src="/logo.svg" alt="Platen" />\`,
})
export class Logo {}

@Component({
  selector: "app-navbar",
  imports: [Logo],
  template: \`<nav><app-logo /></nav>\`,
})
export class Navbar {}`, notes: [{ at: "imports: [Logo]", text: "declare each dependency" }] },
            { code: `@Component({
  selector: "app-badge",
  template: \`<span class="badge">New</span>\`,
})
export class Badge {}

@Component({
  selector: "app-product-title",
  imports: [Badge],
  template: \`<h2>Desk lamp <app-badge /></h2>\`,
})
export class ProductTitle {}`, notes: [{ at: "<app-badge />", text: "self-closing component tag" }] },
            { code: `@Component({
  selector: "app-copyright",
  template: \`<small>2026 Platen Labs</small>\`,
})
export class Copyright {}

@Component({
  selector: "app-footer",
  imports: [Copyright],
  template: \`<footer><app-copyright /></footer>\`,
})
export class Footer {}`, notes: [{ at: "imports", text: "no NgModule needed" }] }
          ]
        }
      ]
    },
    {
      id: "template-syntax",
      n: 2,
      title: "template syntax",
      concepts: [
        {
          id: "interpolation", n: 1, title: "interpolation", level: 1,
          gloss: "Prints component values and expressions in the template with double curly braces.",
          examples: [
            { code: `@Component({
  selector: "app-welcome",
  template: \`
    <p>{{ user.name }} visited {{ user.visits }} times</p>
  \`,
})
export class Welcome {
  user = { name: "Ada", visits: 3 };
}`, notes: [{ at: "@Component", text: "imports from @angular/core assumed" }, { at: "{{ user.name }}", text: "double braces print a value" }] },
            { code: `@Component({
  selector: "app-subtotal",
  template: \`<p>Subtotal: {{ total.toFixed(2) }}</p>\`,
})
export class Subtotal {
  total = [4.5, 12, 7.25].reduce((sum, price) => sum + price, 0);
}`, notes: [{ at: "total.toFixed(2)", text: "method calls work" }] },
            { code: `@Component({
  selector: "app-stock",
  template: \`<p>{{ stock > 0 ? "in stock" : "sold out" }}</p>\`,
})
export class Stock {
  stock = 0;
}`, notes: [{ at: "? \"in stock\"", text: "ternary inside braces" }] }
          ]
        },
        {
          id: "property-binding", n: 2, title: "property and attribute bindings", level: 1,
          gloss: "Binds DOM properties, attributes, classes and styles with square brackets.",
          examples: [
            { code: `@Component({
  selector: "app-avatar",
  template: \`<img [src]="photo.url" [alt]="photo.alt" width="48" />\`,
})
export class Avatar {
  photo = { url: "/img/ada.png", alt: "Ada Lovelace" };
}`, notes: [{ at: "[src]", text: "sets the dom property" }] },
            { code: `@Component({
  selector: "app-status",
  template: \`
    <p [attr.aria-label]="label" [class.online]="online">Status</p>
  \`,
})
export class Status {
  online = true;
  label = "Online";
}`, notes: [{ at: "[attr.aria-label]", text: "sets an html attribute" }, { at: "[class.online]", text: "toggles one class" }] },
            { code: `@Component({
  selector: "app-progress",
  template: \`<div [style.width.%]="progress">Loading</div>\`,
})
export class Progress {
  progress = 40;
}`, notes: [{ at: "[style.width.%]", text: "style with a unit" }] }
          ]
        },
        {
          id: "event-binding", n: 3, title: "event bindings & template variables", level: 2,
          gloss: "Handles events with parentheses and reads elements through template reference variables.",
          examples: [
            { code: `@Component({
  selector: "app-save",
  template: \`<button (click)="save()">Save</button>\`,
})
export class Save {
  save() {
    console.log("saved");
  }
}`, notes: [{ at: "(click)", text: "parentheses bind an event" }] },
            { code: `@Component({
  selector: "app-echo",
  template: \`<input (input)="onInput($event)" /><p>{{ text }}</p>\`,
})
export class Echo {
  text = "";
  onInput(event: Event) {
    this.text = (event.target as HTMLInputElement).value;
  }
}`, notes: [{ at: "$event", text: "the native dom event" }] },
            { code: `@Component({
  selector: "app-focus",
  template: \`
    <input #field />
    <button (click)="field.focus()">Focus</button>
  \`,
})
export class Focus {}`, notes: [{ at: "#field", text: "template reference variable" }] }
          ]
        }
      ]
    },
    {
      id: "signals",
      n: 3,
      title: "signals",
      concepts: [
        {
          id: "signal-basics", n: 1, title: "signal", level: 1,
          gloss: "Holds reactive state in a signal that is read by calling it.",
          examples: [
            { code: `@Component({
  selector: "app-counter",
  template: \`<button (click)="increment()">{{ count() }}</button>\`,
})
export class Counter {
  count = signal(0);
  increment() {
    this.count.update((n) => n + 1);
  }
}`, notes: [{ at: "signal", text: "imports from @angular/core assumed" }, { at: "count()", text: "call a signal to read it" }, { at: "update", text: "next value from the previous" }] },
            { code: `@Component({
  selector: "app-disclosure",
  template: \`
    <button (click)="open.set(!open())">Details</button>
    @if (open()) {
      <p>More information</p>
    }
  \`,
})
export class Disclosure {
  open = signal(false);
}`, notes: [{ at: "open.set", text: "replaces the value" }] },
            { code: `@Component({
  selector: "app-profile",
  template: \`
    <button (click)="birthday()">
      {{ user().name }}: {{ user().age }}
    </button>
  \`,
})
export class Profile {
  user = signal({ name: "Ada", age: 36 });
  birthday = () => this.user.update((u) => ({ ...u, age: u.age + 1 }));
}`, notes: [{ at: "...u", text: "replace objects, do not mutate" }] }
          ]
        },
        {
          id: "computed-signals", n: 2, title: "computed", level: 2,
          gloss: "Derives a cached read-only signal from other signals with computed.",
          examples: [
            { code: `@Component({
  selector: "app-doubler",
  template: \`<p>{{ count() }} x 2 = {{ doubled() }}</p>\`,
})
export class Doubler {
  count = signal(2);
  doubled = computed(() => this.count() * 2);
}`, notes: [{ at: "computed", text: "recalculates only when needed" }] },
            { code: `@Component({
  selector: "app-full-name",
  template: \`<p>{{ full() }}</p>\`,
})
export class FullName {
  first = signal("Ada");
  last = signal("Lovelace");
  full = computed(() => \`\${this.first()} \${this.last()}\`);
}`, notes: [{ at: "this.first()", text: "reading registers a dependency" }] },
            { code: `@Component({
  selector: "app-total",
  template: \`<p>Total: {{ total() }}</p>\`,
})
export class Total {
  prices = signal([4, 12, 7]);
  total = computed(() => this.prices().reduce((a, b) => a + b, 0));
}`, notes: [{ at: "reduce", text: "works on the array value" }] }
          ]
        },
        {
          id: "effects-linked", n: 3, title: "effects & linkedSignal", level: 3,
          gloss: "Runs side effects with effect and resets writable state from a source with linkedSignal.",
          examples: [
            { code: `@Component({
  selector: "app-title",
  template: \`<p>{{ count() }}</p>\`,
})
export class Title {
  count = signal(0);
  constructor() {
    effect(() => {
      document.title = \`Count: \${this.count()}\`;
    });
  }
}`, notes: [{ at: "effect", text: "create it in an injection context" }] },
            { code: `@Component({
  selector: "app-picker",
  template: \`<p>{{ selected() }}</p>\`,
})
export class Picker {
  options = signal(["small", "medium", "large"]);
  selected = linkedSignal(() => this.options()[0]);
}`, notes: [{ at: "linkedSignal", text: "writable, resets with its source" }] },
            { code: `@Component({
  selector: "app-pagination",
  template: \`<p>Page {{ page() }}</p>\`,
})
export class Pagination {
  filter = signal("all");
  page = linkedSignal({ source: this.filter, computation: () => 1 });
}`, notes: [{ at: "source:", text: "page resets when filter changes" }] }
          ]
        }
      ]
    },
    {
      id: "inputs-outputs",
      n: 4,
      title: "inputs & outputs",
      concepts: [
        {
          id: "signal-inputs", n: 1, title: "signal inputs", level: 1,
          gloss: "Reads values passed by the parent with signal-based input functions.",
          examples: [
            { code: `@Component({
  selector: "app-welcome",
  template: \`<h1>Hello, {{ name() }}</h1>\`,
})
export class Welcome {
  name = input("guest");
}`, notes: [{ at: "input", text: "imports from @angular/core assumed" }, { at: "name()", text: "inputs are read like signals" }] },
            { code: `@Component({
  selector: "app-stock",
  template: \`<p>{{ item() }}: {{ count() }} left</p>\`,
})
export class Stock {
  item = input.required<string>();
  count = input.required<number>();
}`, notes: [{ at: "input.required", text: "the parent must pass it" }] },
            { code: `@Component({
  selector: "app-badge",
  template: \`<span [style.fontSize.px]="size()">{{ label() }}</span>\`,
})
export class Badge {
  size = input(16, { transform: numberAttribute });
  label = input("", { alias: "text" });
}`, notes: [{ at: "transform", text: "converts the incoming value" }, { at: "alias", text: "the public attribute name" }] }
          ]
        },
        {
          id: "outputs", n: 2, title: "outputs", level: 2,
          gloss: "Emits custom events to the parent with the output function.",
          examples: [
            { code: `@Component({
  selector: "app-save",
  template: \`<button (click)="saved.emit('draft')">Save draft</button>\`,
})
export class Save {
  saved = output<string>();
}`, notes: [{ at: "output<string>", text: "typed event payload" }] },
            { code: `@Component({
  selector: "app-closer",
  template: \`<button (click)="close()">Close</button>\`,
})
export class Closer {
  closed = output();
  close() {
    this.closed.emit();
  }
}`, notes: [{ at: "output()", text: "an event without a payload" }] },
            { code: `@Component({
  selector: "app-picker",
  template: \`<button (click)="pick()">Pick</button>\`,
})
export class Picker {
  picked = output<{ id: number }>({ alias: "select" });
  pick = () => this.picked.emit({ id: 1 });
}`, notes: [{ at: "alias: \"select\"", text: "parent listens to (select)" }] }
          ]
        },
        {
          id: "model-inputs", n: 3, title: "model inputs", level: 2,
          gloss: "Creates a two-way bindable value with model.",
          examples: [
            { code: `@Component({
  selector: "app-toggle",
  template: \`
    <button (click)="checked.set(!checked())">
      {{ checked() ? "On" : "Off" }}
    </button>
  \`,
})
export class Toggle {
  checked = model(false);
}`, notes: [{ at: "model(false)", text: "parent can use [(checked)]" }] },
            { code: `@Component({
  selector: "app-stepper",
  template: \`
    <button (click)="value.update((v) => v + 1)">{{ value() }}</button>
  \`,
})
export class Stepper {
  value = model.required<number>();
}`, notes: [{ at: "model.required", text: "parent must bind it" }] },
            { code: `@Component({
  selector: "app-rating",
  template: \`
    <button (click)="stars.set(5)">{{ stars() }} stars</button>
  \`,
})
export class Rating {
  stars = model(3);
}`, notes: [{ at: "stars.set", text: "writes back to the parent" }] }
          ]
        }
      ]
    },
    {
      id: "control-flow",
      n: 5,
      title: "control flow",
      concepts: [
        {
          id: "if-blocks", n: 1, title: "@if blocks", level: 1,
          gloss: "Renders a branch only when a condition is truthy with @if and @else.",
          examples: [
            { code: `@Component({
  selector: "app-login",
  template: \`
    @if (loggedIn()) { <p>Welcome back</p> }
    @else { <p>Please sign in</p> }
  \`,
})
export class Login {
  loggedIn = signal(false);
}`, notes: [{ at: "@if", text: "built in, no import needed" }] },
            { code: `@Component({
  selector: "app-stock",
  template: \`
    @if (stock() === 0) { <p>Sold out</p> }
    @else if (stock() < 5) { <p>Only {{ stock() }} left</p> }
    @else { <p>In stock</p> }
  \`,
})
export class Stock {
  stock = signal(3);
}`, notes: [{ at: "@else if", text: "chain conditions" }] },
            { code: `@Component({
  selector: "app-user",
  template: \`
    @if (user(); as u) { <p>{{ u.name }}</p> }
    @else { <p>No user</p> }
  \`,
})
export class User {
  user = signal<{ name: string } | null>({ name: "Ada" });
}`, notes: [{ at: "as u", text: "narrowed value alias" }] }
          ]
        },
        {
          id: "for-blocks", n: 2, title: "@for blocks", level: 1,
          gloss: "Repeats a template for each item with @for and a required track expression.",
          examples: [
            { code: `@Component({
  selector: "app-fruits",
  template: \`
    <ul>
      @for (fruit of fruits; track fruit) { <li>{{ fruit }}</li> }
    </ul>
  \`,
})
export class Fruits {
  fruits = ["apple", "pear", "plum"];
}`, notes: [{ at: "track fruit", text: "identity used to reuse nodes" }] },
            { code: `@Component({
  selector: "app-steps",
  template: \`
    @for (step of steps; track step) {
      <p>{{ $index + 1 }}. {{ step }}</p>
    }
  \`,
})
export class Steps {
  steps = ["Cut", "Mix", "Bake"];
}`, notes: [{ at: "$index", text: "position of the item" }] },
            { code: `@Component({
  selector: "app-tasks",
  template: \`
    @for (task of tasks(); track task.id) { <p>{{ task.title }}</p> }
    @empty { <p>No tasks yet</p> }
  \`,
})
export class Tasks {
  tasks = signal<{ id: number; title: string }[]>([]);
}`, notes: [{ at: "@empty", text: "shown for an empty list" }] }
          ]
        },
        {
          id: "switch-let", n: 3, title: "@switch and @let", level: 2,
          gloss: "Chooses among cases with @switch and names template values with @let.",
          examples: [
            { code: `@Component({
  selector: "app-status",
  template: \`
    @switch (status()) {
      @case ("loading") { <p>Loading</p> }
      @default { <p>Ready</p> }
    }
  \`,
})
export class Status {
  status = signal("loading");
}`, notes: [{ at: "@default", text: "fallback case" }] },
            { code: `@Component({
  selector: "app-order",
  template: \`
    @let total = qty() * price();
    <p>Total: {{ total }}</p>
  \`,
})
export class Order {
  qty = signal(3);
  price = signal(5);
}`, notes: [{ at: "@let total", text: "local template variable" }] },
            { code: `@Component({
  selector: "app-user",
  imports: [AsyncPipe],
  template: \`
    @let user = user$ | async;
    <p>{{ user?.name }}</p>
  \`,
})
export class User {
  user$ = of({ name: "Ada" });
}`, notes: [{ at: "user$ | async", text: "unwrap once, reuse below" }] }
          ]
        }
      ]
    },
    {
      id: "deferrable-views",
      n: 6,
      title: "deferrable views",
      concepts: [
        {
          id: "defer-basics", n: 1, title: "@defer", level: 2,
          gloss: "Loads a section lazily with @defer and shows placeholder and loading content.",
          examples: [
            { code: `@Component({
  selector: "app-comments",
  template: \`
    @defer {
      <p>Comments loaded</p>
    } @placeholder {
      <p>Comments will load soon</p>
    }
  \`,
})
export class Comments {}`, notes: [{ at: "@placeholder", text: "shown before loading starts" }] },
            { code: `@Component({
  selector: "app-feed",
  template: \`
    @defer (on timer(1s)) {
      <p>Feed ready</p>
    } @loading (minimum 300ms) {
      <p>Loading feed</p>
    }
  \`,
})
export class Feed {}`, notes: [{ at: "@loading", text: "shown while code downloads" }] },
            { code: `@Component({
  selector: "app-widget",
  template: \`
    @defer {
      <p>Widget</p>
    } @error {
      <p>Could not load the widget</p>
    }
  \`,
})
export class Widget {}`, notes: [{ at: "@error", text: "shown when loading fails" }] }
          ]
        },
        {
          id: "defer-triggers", n: 2, title: "triggers", level: 2,
          gloss: "Chooses when deferred content loads with on and when triggers.",
          examples: [
            { code: `@Component({
  selector: "app-details",
  template: \`
    <button #more>Show details</button>
    @defer (on interaction(more)) {
      <p>Details loaded</p>
    }
  \`,
})
export class Details {}`, notes: [{ at: "on interaction", text: "click or keydown on the target" }] },
            { code: `@Component({
  selector: "app-panel",
  template: \`
    <button (click)="open.set(true)">Open</button>
    @defer (when open()) {
      <p>Panel content</p>
    }
  \`,
})
export class Panel {
  open = signal(false);
}`, notes: [{ at: "when open()", text: "loads once, never unloads" }] },
            { code: `@Component({
  selector: "app-lazy-image",
  template: \`
    @defer (on viewport) {
      <p>Image area</p>
    } @placeholder {
      <div>Scroll to load</div>
    }
  \`,
})
export class LazyImage {}`, notes: [{ at: "on viewport", text: "needs one root placeholder" }] }
          ]
        },
        {
          id: "defer-prefetch", n: 3, title: "prefetching & hydration", level: 3,
          gloss: "Prefetches code ahead of time and delays hydration of server-rendered content.",
          examples: [
            { code: `@Component({
  selector: "app-report",
  template: \`
    <button #show>Show report</button>
    @defer (on interaction(show); prefetch on idle) {
      <p>Report</p>
    }
  \`,
})
export class Report {}`, notes: [{ at: "prefetch on idle", text: "download early, render later" }] },
            { code: `@Component({
  selector: "app-reviews",
  template: \`
    @defer (hydrate on viewport) {
      <p>Reviews</p>
    }
  \`,
})
export class Reviews {}`, notes: [{ at: "hydrate on viewport", text: "incremental hydration" }] },
            { code: `@Component({
  selector: "app-footer",
  template: \`
    @defer (hydrate never) {
      <p>Static footer</p>
    }
  \`,
})
export class Footer {}`, notes: [{ at: "hydrate never", text: "stays static html" }] }
          ]
        }
      ]
    },
    {
      id: "pipes",
      n: 7,
      title: "pipes",
      concepts: [
        {
          id: "builtin-pipes", n: 1, title: "built-in pipes", level: 1,
          gloss: "Formats values in templates with built-in pipes such as date, currency and uppercase.",
          examples: [
            { code: `@Component({
  selector: "app-invoice",
  imports: [CurrencyPipe, DatePipe],
  template: \`
    <p>{{ due | date: "mediumDate" }}: {{ total | currency }}</p>
  \`,
})
export class Invoice {
  due = new Date(2026, 10, 8);
  total = 1234.5;
}`, notes: [{ at: "CurrencyPipe", text: "imports from @angular/common assumed" }, { at: "| date:", text: "arguments follow a colon" }] },
            { code: `@Component({
  selector: "app-name",
  imports: [UpperCasePipe, SlicePipe],
  template: \`<p>{{ name | slice: 0 : 3 | uppercase }}</p>\`,
})
export class Name {
  name = "lovelace";
}`, notes: [{ at: "| slice: 0 : 3", text: "pipes can chain" }] },
            { code: `@Component({
  selector: "app-stats",
  imports: [DecimalPipe, PercentPipe],
  template: \`<p>{{ pi | number: "1.2-2" }} {{ ratio | percent }}</p>\`,
})
export class Stats {
  pi = 3.14159;
  ratio = 0.256;
}`, notes: [{ at: "\"1.2-2\"", text: "min integer, min and max decimals" }] }
          ]
        },
        {
          id: "async-pipe", n: 2, title: "async pipe", level: 2,
          gloss: "Reads observables and promises in the template with the async pipe.",
          examples: [
            { code: `@Component({
  selector: "app-user",
  imports: [AsyncPipe],
  template: \`<p>{{ (user$ | async)?.name }}</p>\`,
})
export class User {
  user$ = of({ name: "Ada" });
}`, notes: [{ at: "async", text: "subscribes and unsubscribes" }] },
            { code: `@Component({
  selector: "app-answer",
  imports: [AsyncPipe],
  template: \`<p>{{ answer | async }}</p>\`,
})
export class Answer {
  answer = Promise.resolve(42);
}`, notes: [{ at: "Promise", text: "async also awaits promises" }] },
            { code: `@Component({
  selector: "app-names",
  imports: [AsyncPipe],
  template: \`
    @for (name of names$ | async; track name) { <p>{{ name }}</p> }
  \`,
})
export class Names {
  names$ = of(["Ada", "Grace"]);
}`, notes: [{ at: "names$ | async", text: "works as the @for source" }] }
          ]
        },
        {
          id: "custom-pipes", n: 3, title: "custom pipes", level: 2,
          gloss: "Creates a reusable template transform with the Pipe decorator.",
          examples: [
            { code: `@Pipe({ name: "initials" })
export class Initials implements PipeTransform {
  transform(name: string): string {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  }
}`, notes: [{ at: "@Pipe", text: "name is used in templates" }] },
            { code: `@Pipe({ name: "truncate" })
export class Truncate implements PipeTransform {
  transform(text: string, limit = 10): string {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  }
}`, notes: [{ at: "limit = 10", text: "extra arguments after the colon" }] },
            { code: `@Pipe({ name: "filterActive", pure: false })
export class FilterActive implements PipeTransform {
  transform(users: { name: string; active: boolean }[]) {
    return users.filter((user) => user.active);
  }
}`, notes: [{ at: "pure: false", text: "reruns on every check" }] }
          ]
        }
      ]
    },
    {
      id: "dependency-injection",
      n: 8,
      title: "dependency injection",
      concepts: [
        {
          id: "services", n: 1, title: "injectable services", level: 1,
          gloss: "Shares logic through an injectable service obtained with inject.",
          examples: [
            { code: `@Injectable({ providedIn: "root" })
export class Counter {
  count = signal(0);
  increment() {
    this.count.update((n) => n + 1);
  }
}`, notes: [{ at: "@Injectable", text: "imports from @angular/core assumed" }, { at: "providedIn: \"root\"", text: "one shared instance" }] },
            { code: `@Injectable({ providedIn: "root" })
export class Clock {
  now = () => new Date().toISOString();
}

@Component({
  selector: "app-time",
  template: \`<p>{{ clock.now() }}</p>\`,
})
export class Time {
  clock = inject(Clock);
}`, notes: [{ at: "inject(Clock)", text: "field initializer, no constructor" }] },
            { code: `@Injectable({ providedIn: "root" })
export class Cart {
  items = signal<string[]>([]);
  count = computed(() => this.items().length);
  add(item: string) {
    this.items.update((list) => [...list, item]);
  }
}`, notes: [{ at: "computed", text: "services can hold signals" }] }
          ]
        },
        {
          id: "injection-tokens", n: 2, title: "providers & tokens", level: 2,
          gloss: "Configures what gets injected with InjectionToken and provider objects.",
          examples: [
            { code: `export const API_URL = new InjectionToken<string>("API_URL");

@Component({
  selector: "app-endpoint",
  providers: [{ provide: API_URL, useValue: "/api" }],
  template: \`<p>{{ url }}</p>\`,
})
export class Endpoint {
  url = inject(API_URL);
}`, notes: [{ at: "useValue", text: "provides a fixed value" }] },
            { code: `abstract class Logger {
  abstract log(message: string): void;
}

@Component({
  selector: "app-page",
  providers: [{ provide: Logger, useValue: { log: console.log } }],
  template: \`<p>Page</p>\`,
})
export class Page {
  logger = inject(Logger);
}`, notes: [{ at: "abstract class", text: "works as an injection token" }] },
            { code: `export const NOW = new InjectionToken<() => Date>("NOW", {
  providedIn: "root",
  factory: () => () => new Date(),
});`, notes: [{ at: "factory", text: "builds the default value" }] }
          ]
        },
        {
          id: "inject-context", n: 3, title: "injection context", level: 3,
          gloss: "Calls inject in field initializers, factories and runInInjectionContext.",
          examples: [
            { code: `@Component({
  selector: "app-box",
  template: \`<p>Box</p>\`,
})
export class Box {
  host = inject<ElementRef<HTMLElement>>(ElementRef);
  tag = this.host.nativeElement.tagName;
}`, notes: [{ at: "ElementRef", text: "the host element" }] },
            { code: `@Component({
  selector: "app-lazy",
  template: \`<p>Lazy</p>\`,
})
export class Lazy {
  private injector = inject(Injector);
  later() {
    runInInjectionContext(this.injector, () => inject(DestroyRef));
  }
}`, notes: [{ at: "runInInjectionContext", text: "inject outside the constructor" }] },
            { code: `const CONFIG = new InjectionToken<{ delay: number }>("CONFIG");

@Component({
  selector: "app-tooltip",
  template: \`<p>Tip</p>\`,
})
export class Tooltip {
  config = inject(CONFIG, { optional: true }) ?? { delay: 200 };
}`, notes: [{ at: "optional: true", text: "null instead of an error" }] }
          ]
        }
      ]
    },
    {
      id: "reactive-forms",
      n: 9,
      title: "reactive forms",
      concepts: [
        {
          id: "form-control", n: 1, title: "FormControl", level: 1,
          gloss: "Tracks a single input value and validity with FormControl.",
          examples: [
            { code: `@Component({
  selector: "app-name",
  imports: [ReactiveFormsModule],
  template: \`<input [formControl]="name" /><p>{{ name.value }}</p>\`,
})
export class Name {
  name = new FormControl("Ada");
}`, notes: [{ at: "ReactiveFormsModule", text: "imports from @angular/forms assumed" }, { at: "[formControl]", text: "binds the control to the input" }] },
            { code: `@Component({
  selector: "app-email",
  imports: [ReactiveFormsModule],
  template: \`
    <input [formControl]="email" />
    @if (email.invalid) { <p>Enter a valid email</p> }
  \`,
})
export class Email {
  email = new FormControl("", [Validators.required, Validators.email]);
}`, notes: [{ at: "Validators", text: "built-in rules in an array" }] },
            { code: `@Component({
  selector: "app-search",
  imports: [ReactiveFormsModule],
  template: \`<input [formControl]="query" />\`,
})
export class Search {
  query = new FormControl("", { nonNullable: true });
  constructor() {
    this.query.valueChanges.subscribe((value) => console.log(value));
  }
}`, notes: [{ at: "nonNullable", text: "reset keeps the initial value" }, { at: "valueChanges", text: "observable of every change" }] }
          ]
        },
        {
          id: "form-group", n: 2, title: "FormGroup", level: 2,
          gloss: "Groups related controls into a FormGroup and reads or patches their values together.",
          examples: [
            { code: `@Component({
  selector: "app-login",
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form"><input formControlName="email" /></form>
    {{ form.value.email }}
  \`,
})
export class Login {
  form = new FormGroup({ email: new FormControl("") });
}`, notes: [{ at: "formControlName", text: "picks a control by key" }] },
            { code: `@Component({
  selector: "app-settings",
  template: \`<button (click)="dark()">Dark</button>\`,
})
export class Settings {
  form = new FormGroup({
    theme: new FormControl("light"),
    size: new FormControl(14),
  });
  dark = () => this.form.patchValue({ theme: "dark" });
}`, notes: [{ at: "patchValue", text: "updates only the keys given" }] },
            { code: `@Component({
  selector: "app-errors",
  imports: [JsonPipe],
  template: \`<pre>{{ errors | json }}</pre>\`,
})
export class Errors {
  email = new FormControl("bad", Validators.email);
  errors = this.email.errors;
}`, notes: [{ at: "this.email.errors", text: "null when the control is valid" }] }
          ]
        },
        {
          id: "builder-array", n: 3, title: "FormBuilder & FormArray", level: 2,
          gloss: "Builds forms with FormBuilder and manages repeating controls with FormArray.",
          examples: [
            { code: `@Component({
  selector: "app-signup",
  template: \`<p>{{ form.value.email }}</p>\`,
})
export class Signup {
  private fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    email: ["", Validators.required],
    age: [18],
  });
}`, notes: [{ at: "fb.nonNullable", text: "controls never become null" }] },
            { code: `@Component({
  selector: "app-tags",
  imports: [ReactiveFormsModule],
  template: \`
    @for (c of items.controls; track c) { <input [formControl]="c" /> }
  \`,
})
export class Tags {
  items = new FormArray([new FormControl("angular")]);
  add = () => this.items.push(new FormControl(""));
}`, notes: [{ at: "items.controls", text: "one control per row" }] },
            { code: `@Component({
  selector: "app-lines",
  template: \`<button (click)="remove(0)">Remove first</button>\`,
})
export class Lines {
  lines = new FormArray([new FormControl("a"), new FormControl("b")]);
  remove(index: number) {
    this.lines.removeAt(index);
  }
}`, notes: [{ at: "removeAt", text: "drops a control by index" }] }
          ]
        }
      ]
    },
    {
      id: "signal-forms",
      n: 10,
      title: "signal forms",
      concepts: [
        {
          id: "form-field", n: 1, title: "form and formField", level: 2,
          gloss: "Binds a signal model to inputs with the form function and the formField directive.",
          examples: [
            { code: `@Component({
  selector: "app-name",
  imports: [FormField],
  template: \`<input [formField]="nameForm.first" />\`,
})
export class Name {
  model = signal({ first: "Ada", last: "Lovelace" });
  nameForm = form(this.model);
}`, notes: [{ at: "FormField", text: "forms/signals imports assumed" }, { at: "form(this.model)", text: "the model stays the source of truth" }] },
            { code: `@Component({
  selector: "app-bio",
  imports: [FormField],
  template: \`
    <input [formField]="f.city" />
    <p>{{ f.city().value() }}</p>
  \`,
})
export class Bio {
  f = form(signal({ city: "Oslo" }));
}`, notes: [{ at: "f.city().value()", text: "call the field, then read" }] },
            { code: `@Component({
  selector: "app-terms",
  imports: [FormField],
  template: \`
    <input type="checkbox" [formField]="f.agreed" />
    <p>{{ f.agreed().value() ? "Accepted" : "Pending" }}</p>
  \`,
})
export class Terms {
  f = form(signal({ agreed: false }));
}`, notes: [{ at: "type=\"checkbox\"", text: "boolean model value" }] }
          ]
        },
        {
          id: "signal-validation", n: 2, title: "validation rules", level: 2,
          gloss: "Adds validators in a schema function with required, email and minLength.",
          examples: [
            { code: `@Component({
  selector: "app-signup",
  imports: [FormField],
  template: \`<input [formField]="f.email" />{{ f.email().valid() }}\`,
})
export class Signup {
  f = form(signal({ email: "" }), (path) => {
    required(path.email);
    email(path.email);
  });
}`, notes: [{ at: "(path)", text: "schema function receives paths" }, { at: "valid()", text: "a signal of the validity" }] },
            { code: `@Component({
  selector: "app-password",
  imports: [FormField],
  template: \`<input type="password" [formField]="f.password" />\`,
})
export class Password {
  f = form(signal({ password: "" }), (path) => {
    minLength(path.password, 8, { message: "Too short" });
  });
}`, notes: [{ at: "{ message:", text: "custom error text" }] },
            { code: `@Component({
  selector: "app-errors",
  imports: [FormField],
  template: \`
    <input [formField]="f.email" />
    @for (e of f.email().errors(); track e.kind) { <p>{{ e.kind }}</p> }
  \`,
})
export class Errors {
  f = form(signal({ email: "bad" }), (path) => email(path.email));
}`, notes: [{ at: "errors()", text: "list of validation errors" }] }
          ]
        },
        {
          id: "signal-submit", n: 3, title: "submitting", level: 3,
          gloss: "Submits a signal form with submit once validation passes.",
          examples: [
            { code: `@Component({
  selector: "app-contact",
  imports: [FormField],
  template: \`
    <input [formField]="f.message" />
    <button (click)="send()">Send</button>
  \`,
})
export class Contact {
  f = form(signal({ message: "" }));
  send = () => submit(this.f, async () => console.log("sent"));
}`, notes: [{ at: "submit(this.f", text: "runs only when the form is valid" }] },
            { code: `@Component({
  selector: "app-checkout",
  template: \`<button (click)="pay()">Pay</button>\`,
})
export class Checkout {
  f = form(signal({ name: "" }), (path) => required(path.name));
  pay = () =>
    submit(this.f, {
      action: async () => console.log("paid"),
    });
}`, notes: [{ at: "action:", text: "options form of submit" }] },
            { code: `@Component({
  selector: "app-newsletter",
  imports: [FormField, FormRoot],
  template: \`
    <form [formRoot]="f"><input [formField]="f.email" /></form>
  \`,
})
export class Newsletter {
  f = form(signal({ email: "" }), {
    submission: { action: async () => console.log("joined") },
  });
}`, notes: [{ at: "[formRoot]", text: "submit event runs submission" }] }
          ]
        }
      ]
    },
    {
      id: "http",
      n: 11,
      title: "HTTP",
      concepts: [
        {
          id: "http-get", n: 1, title: "HttpClient requests", level: 1,
          gloss: "Fetches data with HttpClient, which returns a cold observable.",
          examples: [
            { code: `@Component({
  selector: "app-users",
  imports: [AsyncPipe],
  template: \`<p>{{ (users$ | async)?.length }} users</p>\`,
})
export class Users {
  users$ = inject(HttpClient).get<{ id: number }[]>("/api/users");
}`, notes: [{ at: "HttpClient", text: "http imports assumed" }, { at: "get<{ id: number }[]>", text: "type the response" }] },
            { code: `@Component({
  selector: "app-names",
  template: \`<p>{{ names().length }} names</p>\`,
})
export class Names {
  private http = inject(HttpClient);
  names = toSignal(this.http.get<string[]>("/api/names"), {
    initialValue: [],
  });
}`, notes: [{ at: "initialValue", text: "signal has a value immediately" }] },
            { code: `@Component({
  selector: "app-order",
  template: \`<button (click)="save()">Order</button>\`,
})
export class Order {
  private http = inject(HttpClient);
  save() {
    this.http.post("/api/orders", { qty: 1 }).subscribe();
  }
}`, notes: [{ at: "subscribe()", text: "nothing is sent without it" }] }
          ]
        },
        {
          id: "interceptors", n: 2, title: "interceptors", level: 2,
          gloss: "Adds cross-cutting behavior to requests with functional interceptors.",
          examples: [
            { code: `export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const secured = req.clone({
    setHeaders: { Authorization: "Bearer token" },
  });
  return next(secured);
};`, notes: [{ at: "req.clone", text: "requests are immutable" }] },
            { code: `const logger: HttpInterceptorFn = (req, next) => {
  console.log(req.method, req.url);
  return next(req);
};

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([logger]))],
};`, notes: [{ at: "withInterceptors", text: "registers them in order" }] },
            { code: `export const errors: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((err) => {
      console.error(err.status);
      return throwError(() => err);
    }),
  );`, notes: [{ at: "throwError", text: "rethrow after logging" }] }
          ]
        },
        {
          id: "resources", n: 3, title: "resource and httpResource", level: 3,
          gloss: "Loads reactive data with resource and httpResource that reload when signals change.",
          examples: [
            { code: `@Component({
  selector: "app-user",
  template: \`<p>{{ user.value()?.name }}</p>\`,
})
export class User {
  id = signal(1);
  user = httpResource<{ name: string }>(
    () => \`/api/users/\${this.id()}\`,
  );
}`, notes: [{ at: "httpResource", text: "reloads when id changes" }] },
            { code: `@Component({
  selector: "app-search",
  template: \`<p>{{ results.value()?.length }} results</p>\`,
})
export class Search {
  query = signal("ada");
  results = resource({
    params: () => ({ q: this.query() }),
    loader: async ({ params }) => [params.q],
  });
}`, notes: [{ at: "params", text: "reactive request values" }, { at: "loader", text: "async function that fetches" }] },
            { code: `@Component({
  selector: "app-profile",
  template: \`
    @if (user.isLoading()) { <p>Loading</p> }
    @else if (user.error()) { <p>Failed</p> }
    @else { <p>{{ user.value()?.name }}</p> }
  \`,
})
export class Profile {
  user = httpResource<{ name: string }>(() => "/api/user");
}`, notes: [{ at: "isLoading()", text: "signals describe the state" }] }
          ]
        }
      ]
    },
    {
      id: "routing",
      n: 12,
      title: "routing",
      concepts: [
        {
          id: "route-definitions", n: 1, title: "route definitions", level: 1,
          gloss: "Maps URLs to components in a routes array registered with provideRouter.",
          examples: [
            { code: `@Component({ template: \`<h1>Home</h1>\` })
export class Home {}

export const routes: Routes = [
  { path: "", component: Home },
  { path: "home", redirectTo: "" },
  { path: "**", redirectTo: "" },
];`, notes: [{ at: "Routes", text: "router imports assumed" }, { at: "\"**\"", text: "wildcard matches anything left" }] },
            { code: `export const routes: Routes = [
  {
    path: "admin",
    loadComponent: () => import("./admin").then((m) => m.Admin),
  },
];`, notes: [{ at: "loadComponent", text: "lazy loads on first visit" }] },
            { code: `const routes: Routes = [{ path: "**", redirectTo: "" }];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};`, notes: [{ at: "provideRouter", text: "registers the routes" }] }
          ]
        },
        {
          id: "router-links", n: 2, title: "RouterLink & RouterOutlet", level: 2,
          gloss: "Renders matched routes with router-outlet and navigates with routerLink.",
          examples: [
            { code: `@Component({
  selector: "app-shell",
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: \`
    <a routerLink="/about" routerLinkActive="active">About</a>
    <router-outlet />
  \`,
})
export class Shell {}`, notes: [{ at: "<router-outlet />", text: "matched component renders here" }] },
            { code: `@Component({
  selector: "app-open",
  template: \`<button (click)="open(7)">Open user</button>\`,
})
export class Open {
  private router = inject(Router);
  open(id: number) {
    this.router.navigate(["/users", id]);
  }
}`, notes: [{ at: "navigate", text: "segments as an array" }] },
            { code: `@Component({
  selector: "app-pager",
  imports: [RouterLink],
  template: \`
    <a routerLink="/list" [queryParams]="{ page: 2 }">Next</a>
  \`,
})
export class Pager {}`, notes: [{ at: "[queryParams]", text: "adds ?page=2" }] }
          ]
        },
        {
          id: "route-params", n: 3, title: "route parameters", level: 2,
          gloss: "Reads route parameters as component inputs or from ActivatedRoute.",
          examples: [
            { code: `export const appConfig: ApplicationConfig = {
  providers: [provideRouter([], withComponentInputBinding())],
};`, notes: [{ at: "withComponentInputBinding", text: "params become inputs" }] },
            { code: `@Component({
  selector: "app-user-detail",
  template: \`<h1>User {{ id() }}</h1>\`,
})
export class UserDetail {
  id = input.required<string>();
}`, notes: [{ at: "id", text: "matches the :id segment" }] },
            { code: `@Component({
  selector: "app-detail",
  template: \`<p>{{ id() }}</p>\`,
})
export class Detail {
  private route = inject(ActivatedRoute);
  id = toSignal(this.route.paramMap.pipe(map((p) => p.get("id"))));
}`, notes: [{ at: "paramMap", text: "observable of route params" }] }
          ]
        }
      ]
    },
    {
      id: "directives-projection",
      n: 13,
      title: "directives & projection",
      concepts: [
        {
          id: "attribute-directives", n: 1, title: "attribute directives", level: 2,
          gloss: "Adds behavior to existing elements with a Directive and host listeners.",
          examples: [
            { code: `@Directive({
  selector: "[appHighlight]",
  host: {
    "(mouseenter)": "el.style.background = 'gold'",
    "(mouseleave)": "el.style.background = ''",
  },
})
export class Highlight {
  el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
}`, notes: [{ at: "@Directive", text: "imports from @angular/core assumed" }, { at: "[appHighlight]", text: "attribute selector" }] },
            { code: `@Directive({
  selector: "[appSize]",
  host: { "[style.fontSize.px]": "size()" },
})
export class Size {
  size = input(16, { alias: "appSize" });
}`, notes: [{ at: "alias: \"appSize\"", text: "input shares the selector name" }] },
            { code: `@Directive({ selector: "[appToggle]", exportAs: "toggle" })
export class Toggle {
  open = signal(false);
  flip = () => this.open.update((v) => !v);
}`, notes: [{ at: "exportAs", text: "templates read it with #t=\"toggle\"" }] }
          ]
        },
        {
          id: "host-composition", n: 2, title: "host directives", level: 3,
          gloss: "Composes behavior onto components with hostDirectives and host properties.",
          examples: [
            { code: `@Directive({ selector: "[appFocus]" })
export class Focus {}

@Component({
  selector: "app-field",
  hostDirectives: [Focus],
  template: \`<input />\`,
})
export class Field {}`, notes: [{ at: "hostDirectives", text: "applies Focus to every app-field" }] },
            { code: `@Directive({ selector: "[appTone]" })
export class Tone {
  tone = input("info");
}

@Component({
  selector: "app-note",
  hostDirectives: [{ directive: Tone, inputs: ["tone"] }],
  template: \`<ng-content />\`,
})
export class Note {}`, notes: [{ at: "inputs: [\"tone\"]", text: "exposes the directive input" }] },
            { code: `@Component({
  selector: "app-menu",
  template: \`<ng-content />\`,
  host: { role: "menu", "[class.open]": "open()" },
})
export class Menu {
  open = input(false);
}`, notes: [{ at: "\"[class.open]\"", text: "host class follows the input" }] }
          ]
        },
        {
          id: "content-projection", n: 3, title: "content projection", level: 2,
          gloss: "Projects parent content into a component with ng-content and select.",
          examples: [
            { code: `@Component({
  selector: "app-card",
  template: \`<div class="card"><ng-content /></div>\`,
})
export class Card {}`, notes: [{ at: "<ng-content />", text: "parent content goes here" }] },
            { code: `@Component({
  selector: "app-panel",
  template: \`
    <header><ng-content select="[title]" /></header>
    <ng-content />
  \`,
})
export class Panel {}`, notes: [{ at: "select=\"[title]\"", text: "matches an attribute" }] },
            { code: `@Component({
  selector: "app-button",
  template: \`<button><ng-content>Submit</ng-content></button>\`,
})
export class AppButton {}`, notes: [{ at: "Submit", text: "fallback content" }] }
          ]
        }
      ]
    },
    {
      id: "lifecycle-queries",
      n: 14,
      title: "lifecycle & queries",
      concepts: [
        {
          id: "lifecycle-hooks", n: 1, title: "lifecycle hooks", level: 1,
          gloss: "Runs code at set points in a component life with OnInit and OnDestroy.",
          examples: [
            { code: `@Component({
  selector: "app-hello",
  template: \`<p>Hello</p>\`,
})
export class Hello implements OnInit {
  ngOnInit() {
    console.log("initialized");
  }
}`, notes: [{ at: "OnInit", text: "imports from @angular/core assumed" }, { at: "ngOnInit", text: "after inputs are set" }] },
            { code: `@Component({
  selector: "app-ticker",
  template: \`<p>Ticker</p>\`,
})
export class Ticker implements OnDestroy {
  private id = setInterval(() => console.log("tick"), 1000);
  ngOnDestroy() {
    clearInterval(this.id);
  }
}`, notes: [{ at: "ngOnDestroy", text: "clean up what the class started" }] },
            { code: `@Component({
  selector: "app-chart",
  template: \`<canvas #surface></canvas>\`,
})
export class Chart implements AfterViewInit {
  surface = viewChild.required<ElementRef>("surface");
  ngAfterViewInit() {
    console.log(this.surface().nativeElement.width);
  }
}`, notes: [{ at: "ngAfterViewInit", text: "the view is ready" }] }
          ]
        },
        {
          id: "destroy-ref", n: 2, title: "DestroyRef & cleanup", level: 2,
          gloss: "Registers cleanup callbacks with DestroyRef and unsubscribes with takeUntilDestroyed.",
          examples: [
            { code: `@Component({
  selector: "app-clock",
  template: \`<p>Clock</p>\`,
})
export class Clock {
  constructor() {
    const id = setInterval(() => console.log("tick"), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}`, notes: [{ at: "onDestroy", text: "runs when the component is destroyed" }] },
            { code: `@Component({
  selector: "app-counter",
  template: \`<p>Counting</p>\`,
})
export class Counter {
  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe((n) => console.log(n));
  }
}`, notes: [{ at: "takeUntilDestroyed()", text: "no manual unsubscribe" }] },
            { code: `@Component({ selector: "app-poller", template: \`<p>{{ ms() }}ms</p>\` })
export class Poller {
  ms = signal(1000);
  constructor() {
    effect((onCleanup) => {
      const id = setInterval(() => console.log("poll"), this.ms());
      onCleanup(() => clearInterval(id));
    });
  }
}`, notes: [{ at: "onCleanup", text: "runs before the effect reruns" }] }
          ]
        },
        {
          id: "queries", n: 3, title: "signal queries", level: 2,
          gloss: "Reads template elements and projected content with viewChild and contentChild signals.",
          examples: [
            { code: `@Component({
  selector: "app-search",
  template: \`<input #box />\`,
})
export class Search {
  box = viewChild.required<ElementRef<HTMLInputElement>>("box");
  constructor() {
    afterNextRender(() => this.box().nativeElement.focus());
  }
}`, notes: [{ at: "afterNextRender", text: "browser only, after painting" }] },
            { code: `@Component({
  selector: "app-items",
  template: \`<p #item>A</p><p #item>B</p>{{ count() }}\`,
})
export class Items {
  items = viewChildren<ElementRef>("item");
  count = computed(() => this.items().length);
}`, notes: [{ at: "viewChildren", text: "signal of all matches" }] },
            { code: `@Component({
  selector: "app-tabs",
  template: \`<ng-content />\`,
})
export class Tabs {
  first = contentChild("first");
  hasFirst = computed(() => this.first() !== undefined);
}`, notes: [{ at: "contentChild", text: "looks in projected content" }] }
          ]
        }
      ]
    },
    {
      id: "rxjs-interop",
      n: 15,
      title: "RxJS interop",
      concepts: [
        {
          id: "to-signal", n: 1, title: "toSignal", level: 2,
          gloss: "Converts an observable into a signal with toSignal.",
          examples: [
            { code: `@Component({
  selector: "app-clock",
  template: \`<p>{{ seconds() }} seconds</p>\`,
})
export class Clock {
  seconds = toSignal(interval(1000), { initialValue: 0 });
}`, notes: [{ at: "toSignal", text: "rxjs imports assumed" }, { at: "initialValue", text: "value before the first emission" }] },
            { code: `@Component({
  selector: "app-theme",
  template: \`<p>{{ theme() }}</p>\`,
})
export class Theme {
  private subject = new BehaviorSubject("light");
  theme = toSignal(this.subject, { requireSync: true });
}`, notes: [{ at: "requireSync", text: "source must emit immediately" }] },
            { code: `@Component({
  selector: "app-width",
  template: \`<p>{{ width() }}px</p>\`,
})
export class Width {
  width = toSignal(
    fromEvent(window, "resize").pipe(map(() => window.innerWidth)),
    { initialValue: 0 },
  );
}`, notes: [{ at: "fromEvent", text: "events become a signal" }] }
          ]
        },
        {
          id: "to-observable", n: 2, title: "toObservable", level: 2,
          gloss: "Converts a signal into an observable with toObservable.",
          examples: [
            { code: `@Component({
  selector: "app-search",
  template: \`<p>{{ term() }}</p>\`,
})
export class Search {
  term = signal("");
  term$ = toObservable(this.term).pipe(debounceTime(300));
}`, notes: [{ at: "toObservable", text: "emits when the signal changes" }] },
            { code: `@Component({
  selector: "app-lookup",
  template: \`<p>{{ item() }}</p>\`,
})
export class Lookup {
  private http = inject(HttpClient);
  id = signal(1);
  item$ = toObservable(this.id).pipe(
    switchMap((id) => this.http.get<string>(\`/api/items/\${id}\`)),
  );
  item = toSignal(this.item$);
}`, notes: [{ at: "switchMap", text: "cancels the previous request" }] },
            { code: `@Component({
  selector: "app-ticker",
  template: \`<p>Ticker</p>\`,
})
export class Ticker {
  ticks = outputFromObservable(interval(1000));
}`, notes: [{ at: "outputFromObservable", text: "observable as an output" }] }
          ]
        },
        {
          id: "rxjs-patterns", n: 3, title: "reactive patterns", level: 3,
          gloss: "Combines signals and RxJS operators for debounced input, polling and resources.",
          examples: [
            { code: `@Component({
  selector: "app-search",
  template: \`<p>{{ debounced() }}</p>\`,
})
export class Search {
  term = signal("");
  private term$ = toObservable(this.term).pipe(debounceTime(300));
  debounced = toSignal(this.term$, { initialValue: "" });
}`, notes: [{ at: "debounceTime(300)", text: "waits for a pause" }] },
            { code: `@Component({
  selector: "app-status",
  template: \`<p>{{ status() }}</p>\`,
})
export class Status {
  private http = inject(HttpClient);
  status = toSignal(
    timer(0, 5000).pipe(
      switchMap(() => this.http.get<string>("/api/status")),
    ),
  );
}`, notes: [{ at: "timer(0, 5000)", text: "immediately, then every five seconds" }] },
            { code: `@Component({
  selector: "app-lookup",
  template: \`<p>{{ item.value() }}</p>\`,
})
export class Lookup {
  id = signal(1);
  item = rxResource({
    params: () => this.id(),
    stream: ({ params }) => of(\`item \${params}\`),
  });
}`, notes: [{ at: "rxResource", text: "observable-based resource" }] }
          ]
        }
      ]
    }
  ]
};
