export default {
  id: "javascript",
  name: "JavaScript",
  short: "JS",
  pigment: "javascript",
  family: null,
  version: "ES2023",
  lexer: "javascript",
  indent: 2,
  topics: [
    {
      id: "variables-types",
      n: 1,
      title: "variables & types",
      concepts: [
        {
          id: "let-const", n: 1, title: "let and const", level: 1,
          gloss: "Declares block-scoped variables with let and const.",
          examples: [
            { code: `let count = 0;
count += 1;`, notes: [{ at: "let", text: "can be reassigned" }] },
            { code: `const PI = 3.14159;
const name = "ada";`, notes: [{ at: "const", text: "cannot be reassigned" }] },
            { code: `const list = [1, 2];
list.push(3);`, notes: [{ at: "push", text: "const fixes the binding only" }] }
          ]
        },
        {
          id: "primitive-types", n: 2, title: "primitive types", level: 1,
          gloss: "Holds numbers, strings, booleans and other primitive values.",
          examples: [
            { code: `const n = 42;
const f = 3.14;
const big = 12345678901234567890n;`, notes: [{ at: "890n", text: "an n suffix makes a BigInt" }] },
            { code: `const s = "hello";
const ok = true;
const nothing = null;
const missing = undefined;`, notes: [] },
            { code: `const id = Symbol("id");
const t = typeof id;`, notes: [{ at: "typeof", text: "returns a string" }] }
          ]
        },
        {
          id: "typeof-checks", n: 3, title: "type checks", level: 1,
          gloss: "Checks a value's type with typeof and Array.isArray.",
          examples: [
            { code: `const a = typeof 42;
const b = typeof "hi";
const c = typeof undefined;`, notes: [] },
            { code: `const isList = Array.isArray([1, 2]);
const kind = typeof [1, 2];`, notes: [{ at: "typeof [1, 2]", text: "arrays report object" }] },
            { code: `const n = typeof null;`, notes: [{ at: "typeof null", text: "a long-standing quirk, object" }] }
          ]
        },
        {
          id: "type-conversion", n: 4, title: "type conversion", level: 2,
          gloss: "Converts values between types explicitly and implicitly.",
          examples: [
            { code: `const n = Number("42");
const s = String(42);
const b = Boolean("");`, notes: [{ at: "Boolean(\"\")", text: "an empty string is falsy" }] },
            { code: `const a = parseInt("42px", 10);
const b = parseFloat("3.5kg");`, notes: [{ at: "parseInt", text: "reads digits until the first non-digit" }] },
            { code: `const x = "5" * 2;
const y = "5" + 2;`, notes: [{ at: "+ 2", text: "plus joins when one side is a string" }] }
          ]
        },
        {
          id: "equality", n: 5, title: "equality", level: 1,
          gloss: "Compares values with strict equality instead of coercion.",
          examples: [
            { code: `const a = 1 === 1;
const b = 1 === "1";`, notes: [{ at: "===", text: "no type coercion" }] },
            { code: `const c = null == undefined;
const d = null === undefined;`, notes: [] },
            { code: `const e = Object.is(NaN, NaN);
const f = NaN === NaN;`, notes: [{ at: "Object.is", text: "treats NaN as equal to itself" }] }
          ]
        }
      ]
    },
    {
      id: "strings-templates",
      n: 2,
      title: "strings & template literals",
      concepts: [
        {
          id: "template-literals", n: 1, title: "template literals", level: 1,
          gloss: "Embeds expressions in a backtick string.",
          examples: [
            { code: `const name = "ada";
const msg = \`hello \${name}\`;`, notes: [{ at: "${name}", text: "any expression fits here" }] },
            { code: `const a = 3;
const b = 4;
const s = \`\${a} + \${b} = \${a + b}\`;`, notes: [] },
            { code: `const poem = \`one
two\`;`, notes: [{ at: "`one", text: "a template may span lines" }] }
          ]
        },
        {
          id: "string-methods", n: 2, title: "string methods", level: 1,
          gloss: "Transforms and searches strings with built-in methods.",
          examples: [
            { code: `const s = "  Hello  ";
const t = s.trim().toUpperCase();`, notes: [{ at: "trim()", text: "returns a new string" }] },
            { code: `const s = "a,b,c";
const parts = s.split(",");
const back = parts.join("-");`, notes: [] },
            { code: `const s = "hello world";
const has = s.includes("world");
const i = s.indexOf("o");`, notes: [] }
          ]
        },
        {
          id: "slicing-padding", n: 3, title: "slicing and padding", level: 2,
          gloss: "Extracts and pads parts of a string.",
          examples: [
            { code: `const s = "hello world";
const w = s.slice(6);
const h = s.slice(0, 5);`, notes: [{ at: "slice(0, 5)", text: "end is excluded" }] },
            { code: `const id = "7".padStart(3, "0");
const tag = "ab".padEnd(5, ".");`, notes: [{ at: "padStart", text: "pads on the left" }] },
            { code: `const s = "abc";
const last = s.at(-1);
const rep = s.repeat(2);`, notes: [{ at: "at(-1)", text: "counts from the end" }] }
          ]
        },
        {
          id: "replace-text", n: 4, title: "replacing text", level: 2,
          gloss: "Replaces text with replace and replaceAll.",
          examples: [
            { code: `const s = "a-b-c";
const t = s.replace("-", "+");`, notes: [{ at: "replace", text: "only the first match" }] },
            { code: `const t = "a-b-c".replaceAll("-", "+");`, notes: [{ at: "replaceAll", text: "every match" }] },
            { code: `const t = "2024-05".replace(/(\\d+)-(\\d+)/, "$2/$1");`, notes: [{ at: "\"$2/$1\"", text: "refers to the captured groups" }] }
          ]
        },
        {
          id: "string-compare", n: 5, title: "comparing strings", level: 2,
          gloss: "Compares and normalizes strings for sorting and matching.",
          examples: [
            { code: `const order = "b".localeCompare("a");`, notes: [{ at: "localeCompare", text: "negative, zero or positive" }] },
            { code: `const words = ["é", "e", "z"].sort((a, b) => a.localeCompare(b));`, notes: [] },
            { code: `const n = "e\\u0301".normalize("NFC").length;`, notes: [{ at: "normalize", text: "one character instead of two" }] }
          ]
        }
      ]
    },
    {
      id: "arrays",
      n: 3,
      title: "arrays & array methods",
      concepts: [
        {
          id: "array-basics", n: 1, title: "array basics", level: 1,
          gloss: "Stores an ordered list that can grow and shrink.",
          examples: [
            { code: `const nums = [1, 2, 3];
nums.push(4);
const last = nums.pop();`, notes: [{ at: "pop()", text: "removes and returns the last item" }] },
            { code: `const nums = [1, 2, 3];
nums.unshift(0);
nums.shift();`, notes: [{ at: "unshift", text: "adds to the front" }] },
            { code: `const nums = [10, 20, 30];
const n = nums.length;
const first = nums[0];`, notes: [] }
          ]
        },
        {
          id: "map-filter-reduce", n: 2, title: "map, filter, reduce", level: 1,
          gloss: "Transforms arrays with map, filter and reduce.",
          examples: [
            { code: `const doubled = [1, 2, 3].map((n) => n * 2);`, notes: [{ at: "map", text: "one output per input" }] },
            { code: `const evens = [1, 2, 3, 4].filter((n) => n % 2 === 0);`, notes: [{ at: "filter", text: "keeps items that return true" }] },
            { code: `const sum = [1, 2, 3].reduce((acc, n) => acc + n, 0);`, notes: [{ at: ", 0)", text: "the starting accumulator" }] }
          ]
        },
        {
          id: "find-some-every", n: 3, title: "find, some, every", level: 1,
          gloss: "Searches arrays with find, some and every.",
          examples: [
            { code: `const nums = [5, 8, 12];
const big = nums.find((n) => n > 6);`, notes: [{ at: "find", text: "the first match or undefined" }] },
            { code: `const hasNeg = [1, -2].some((n) => n < 0);
const allPos = [1, 2].every((n) => n > 0);`, notes: [] },
            { code: `const nums = [5, 8, 12];
const i = nums.findIndex((n) => n > 6);
const last = nums.findLast((n) => n < 10);`, notes: [{ at: "findLast", text: "searches from the end" }] }
          ]
        },
        {
          id: "sorting", n: 4, title: "sorting", level: 2,
          gloss: "Orders arrays with sort and toSorted.",
          examples: [
            { code: `const nums = [10, 9, 1];
nums.sort((a, b) => a - b);`, notes: [{ at: "a - b", text: "the default sort compares as text" }] },
            { code: `const nums = [3, 1, 2];
const sorted = nums.toSorted();`, notes: [{ at: "toSorted", text: "a copy, nums stays unchanged" }] },
            { code: `const people = [{ n: "bo", a: 30 }, { n: "al", a: 25 }];
const byAge = people.toSorted((x, y) => x.a - y.a);`, notes: [] }
          ]
        },
        {
          id: "slice-splice", n: 5, title: "slice and splice", level: 2,
          gloss: "Copies or edits part of an array.",
          examples: [
            { code: `const nums = [1, 2, 3, 4, 5];
const mid = nums.slice(1, 4);`, notes: [{ at: "slice", text: "a copy, the original stays" }] },
            { code: `const nums = [1, 2, 3, 4, 5];
const removed = nums.splice(1, 2);`, notes: [{ at: "splice", text: "edits in place, returns the removed" }] },
            { code: `const nums = [1, 2, 3];
const copy = nums.with(1, 9);
const rev = nums.toReversed();`, notes: [{ at: "with(1, 9)", text: "a copy with index 1 replaced" }] }
          ]
        },
        {
          id: "spread-flat", n: 6, title: "spread and flat", level: 2,
          gloss: "Combines and flattens arrays with spread, flat and flatMap.",
          examples: [
            { code: `const a = [1, 2];
const b = [...a, 3, 4];`, notes: [{ at: "...a", text: "spreads the items in place" }] },
            { code: `const nested = [1, [2, [3]]];
const flat = nested.flat(2);`, notes: [{ at: "flat(2)", text: "flattens two levels" }] },
            { code: `const words = ["hi there", "ok"];
const parts = words.flatMap((w) => w.split(" "));`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "objects-destructuring",
      n: 4,
      title: "objects & destructuring",
      concepts: [
        {
          id: "object-literals", n: 1, title: "object literals", level: 1,
          gloss: "Groups named values in an object literal.",
          examples: [
            { code: `const user = { name: "ada", age: 36 };
const n = user.name;`, notes: [] },
            { code: `const key = "color";
const o = { [key]: "red", size: 2 };`, notes: [{ at: "[key]", text: "a computed property name" }] },
            { code: `const name = "ada";
const age = 36;
const user = { name, age };`, notes: [{ at: "{ name, age }", text: "shorthand properties" }] }
          ]
        },
        {
          id: "object-helpers", n: 2, title: "Object helpers", level: 2,
          gloss: "Lists and copies object contents with Object helpers.",
          examples: [
            { code: `const o = { a: 1, b: 2 };
const keys = Object.keys(o);
const vals = Object.values(o);`, notes: [] },
            { code: `const o = { a: 1, b: 2 };
for (const [k, v] of Object.entries(o)) {
  console.log(k, v);
}`, notes: [{ at: "entries", text: "key and value pairs" }] },
            { code: `const a = { x: 1 };
const b = { ...a, y: 2 };
const c = Object.assign({}, a);`, notes: [{ at: "...a", text: "a shallow copy" }] }
          ]
        },
        {
          id: "destructuring", n: 3, title: "destructuring", level: 1,
          gloss: "Unpacks values from objects and arrays into variables.",
          examples: [
            { code: `const { name, age } = user;`, notes: [{ at: "{ name, age }", text: "picks properties by name" }] },
            { code: `const [first, second] = [10, 20, 30];`, notes: [{ at: "[first, second]", text: "picks items by position" }] },
            { code: `const { name: userName, role = "guest" } = user;`, notes: [{ at: "role =", text: "a default when missing" }, { at: "name: userName", text: "renames while unpacking" }] }
          ]
        },
        {
          id: "rest-destructure", n: 4, title: "rest in destructuring", level: 2,
          gloss: "Collects the remaining items with rest syntax.",
          examples: [
            { code: `const [head, ...tail] = [1, 2, 3];`, notes: [{ at: "...tail", text: "everything after head" }] },
            { code: `const { name, ...others } = user;`, notes: [] },
            { code: `function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}`, notes: [{ at: "...nums", text: "all arguments as an array" }] }
          ]
        },
        {
          id: "nested-destructuring", n: 5, title: "nested destructuring", level: 3,
          gloss: "Unpacks nested objects and function parameters.",
          examples: [
            { code: `const { address: { city } } = user;`, notes: [{ at: "address: { city }", text: "reaches into the nested object" }] },
            { code: `function greet({ name, age = 0 }) {
  return \`\${name} is \${age}\`;
}`, notes: [{ at: "{ name, age = 0 }", text: "destructures the argument" }] },
            { code: `const [[a, b], [c, d]] = [[1, 2], [3, 4]];`, notes: [] }
          ]
        },
        {
          id: "immutability", n: 6, title: "copying and freezing", level: 2,
          gloss: "Prevents or avoids changes with freeze and structuredClone.",
          examples: [
            { code: `const o = Object.freeze({ a: 1 });`, notes: [{ at: "freeze", text: "later writes are ignored" }] },
            { code: `const copy = structuredClone({ a: [1, 2] });`, notes: [{ at: "structuredClone", text: "a deep copy" }] },
            { code: `const frozen = Object.isFrozen(Object.freeze({}));`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "functions-arrows",
      n: 5,
      title: "functions & arrows",
      concepts: [
        {
          id: "function-declarations", n: 1, title: "function declarations", level: 1,
          gloss: "Declares a named function that is available before it runs.",
          examples: [
            { code: `function add(a, b) {
  return a + b;
}`, notes: [] },
            { code: `const total = add(2, 3);

function add(a, b) {
  return a + b;
}`, notes: [{ at: "function add", text: "hoisted, callable above its definition" }] },
            { code: `function greet(name = "world") {
  return \`hello \${name}\`;
}`, notes: [{ at: "name = \"world\"", text: "a default parameter" }] }
          ]
        },
        {
          id: "arrow-functions", n: 2, title: "arrow functions", level: 1,
          gloss: "Writes short functions with the arrow syntax.",
          examples: [
            { code: `const square = (x) => x * x;`, notes: [{ at: "=>", text: "the expression is returned" }] },
            { code: `const add = (a, b) => a + b;
const one = () => 1;`, notes: [] },
            { code: `const make = (name) => ({ name });`, notes: [{ at: "({ name })", text: "parentheses return an object literal" }] }
          ]
        },
        {
          id: "rest-default-params", n: 3, title: "rest and default parameters", level: 2,
          gloss: "Accepts any number of arguments and optional ones.",
          examples: [
            { code: `function max(...nums) {
  return Math.max(...nums);
}`, notes: [{ at: "...nums", text: "collects the arguments" }] },
            { code: `function log(level, ...parts) {
  console.log(level, parts.join(" "));
}`, notes: [] },
            { code: `function connect(host, { port = 80, tls = false } = {}) {
  return \`\${host}:\${port}\`;
}`, notes: [{ at: "= {}", text: "lets callers omit the options" }] }
          ]
        },
        {
          id: "higher-order", n: 4, title: "higher-order functions", level: 2,
          gloss: "Passes functions as arguments and returns them.",
          examples: [
            { code: `const twice = (f, x) => f(f(x));
const r = twice((n) => n + 1, 5);`, notes: [{ at: "f(f(x))", text: "applies the argument function twice" }] },
            { code: `const compose = (f, g) => (x) => f(g(x));`, notes: [{ at: "(x) =>", text: "returns a new function" }] },
            { code: `[1, 2, 3].forEach((n) => console.log(n));`, notes: [] }
          ]
        },
        {
          id: "this-binding", n: 5, title: "this", level: 3,
          gloss: "Shows how this differs between methods and arrows.",
          examples: [
            { code: `const o = {
  n: 1,
  get() {
    return this.n;
  },
};`, notes: [{ at: "this.n", text: "this is the object before the dot" }] },
            { code: `const o = {
  n: 1,
  later() {
    return [1].map(() => this.n);
  },
};`, notes: [{ at: "() =>", text: "arrows keep the outer this" }] },
            { code: `const o = { n: 1 };
function read() {
  return this.n;
}
const bound = read.bind(o);`, notes: [{ at: "bind", text: "fixes this for later calls" }] }
          ]
        }
      ]
    },
    {
      id: "closures-scope",
      n: 6,
      title: "closures & scope",
      concepts: [
        {
          id: "closures", n: 1, title: "closures", level: 2,
          gloss: "Keeps access to the variables where a function was created.",
          examples: [
            { code: `function counter() {
  let n = 0;
  return () => ++n;
}
const next = counter();`, notes: [{ at: "++n", text: "n survives between calls" }] },
            { code: `const makeAdder = (a) => (b) => a + b;
const add5 = makeAdder(5);`, notes: [{ at: "add5", text: "remembers a is 5" }] },
            { code: `function secret() {
  const key = "x1";
  return { reveal: () => key };
}`, notes: [{ at: "key", text: "private to the closure" }] }
          ]
        },
        {
          id: "block-scope", n: 2, title: "block scope", level: 1,
          gloss: "Limits let and const variables to their block.",
          examples: [
            { code: `{
  const inner = 1;
}
const seen = typeof inner;`, notes: [{ at: "typeof inner", text: "inner is not visible here" }] },
            { code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`, notes: [{ at: "let i", text: "each pass gets its own i" }] },
            { code: `if (true) {
  var leaked = 1;
}
console.log(leaked);`, notes: [{ at: "var", text: "ignores block scope" }] }
          ]
        },
        {
          id: "hoisting", n: 3, title: "hoisting", level: 3,
          gloss: "Treats declarations as moved to the top of their scope.",
          examples: [
            { code: `console.log(typeof later);
var later = 1;`, notes: [{ at: "later", text: "var is hoisted but still undefined" }] },
            { code: `try {
  console.log(x);
  let x = 1;
} catch (e) {
  console.log(e.name);
}`, notes: [{ at: "console.log(x)", text: "the temporal dead zone" }] },
            { code: `const r = twice(2);

function twice(n) {
  return n * 2;
}`, notes: [] }
          ]
        },
        {
          id: "iife-pattern", n: 4, title: "immediately invoked functions", level: 3,
          gloss: "Wraps private state in a function that runs at once.",
          examples: [
            { code: `const counter = (() => {
  let n = 0;
  return { inc: () => ++n };
})();`, notes: [{ at: "})()", text: "defined and called together" }] },
            { code: `(function () {
  const hidden = 1;
})();`, notes: [] },
            { code: `const api = (() => {
  const items = [];
  return {
    add: (x) => items.push(x),
    size: () => items.length,
  };
})();`, notes: [{ at: "items", text: "reachable only through the methods" }] }
          ]
        }
      ]
    },
    {
      id: "classes",
      n: 7,
      title: "classes",
      concepts: [
        {
          id: "class-basics", n: 1, title: "class basics", level: 1,
          gloss: "Defines objects with a constructor and methods.",
          examples: [
            { code: `class Dog {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return \`\${this.name} barks\`;
  }
}`, notes: [{ at: "constructor", text: "runs on new" }] },
            { code: `class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const p = new Point(1, 2);`, notes: [{ at: "new", text: "creates an instance" }] },
            { code: `class Counter {
  count = 0;
  inc() {
    this.count++;
  }
}`, notes: [{ at: "count = 0", text: "a class field" }] }
          ]
        },
        {
          id: "getters-static", n: 2, title: "getters and static members", level: 2,
          gloss: "Adds computed properties and class-level members.",
          examples: [
            { code: `class Rect {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
  get area() {
    return this.w * this.h;
  }
}`, notes: [{ at: "get area", text: "read like a property" }] },
            { code: `class Id {
  static next = 1;
  static make() {
    return Id.next++;
  }
}`, notes: [{ at: "static", text: "belongs to the class itself" }] },
            { code: `class Temp {
  #c = 0;
  get f() {
    return this.#c * 1.8 + 32;
  }
  set f(v) {
    this.#c = (v - 32) / 1.8;
  }
}`, notes: [{ at: "set f", text: "runs on assignment" }] }
          ]
        },
        {
          id: "inheritance", n: 3, title: "inheritance", level: 2,
          gloss: "Extends a class and calls the parent with super.",
          examples: [
            { code: `class Animal {
  speak() {
    return "...";
  }
}
class Dog extends Animal {
  speak() {
    return "woof";
  }
}`, notes: [{ at: "extends", text: "inherits every method" }] },
            { code: `class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name);
    this.tricks = [];
  }
}`, notes: [{ at: "super(name)", text: "must run before using this" }] },
            { code: `class Base {
  hello() {
    return "base";
  }
}
class Child extends Base {
  hello() {
    return super.hello() + "+child";
  }
}`, notes: [{ at: "super.hello()", text: "calls the parent method" }] }
          ]
        },
        {
          id: "private-fields", n: 4, title: "private members", level: 3,
          gloss: "Hides state with private fields and methods.",
          examples: [
            { code: `class Account {
  #balance = 0;
  deposit(n) {
    this.#balance += n;
  }
  get balance() {
    return this.#balance;
  }
}`, notes: [{ at: "#balance", text: "private to the class body" }] },
            { code: `class Vault {
  #check(pin) {
    return pin === 1234;
  }
  open(pin) {
    return this.#check(pin);
  }
}`, notes: [{ at: "#check", text: "a private method" }] },
            { code: `class Box {
  #v;
  constructor(v) {
    this.#v = v;
  }
  static has(o) {
    return #v in o;
  }
}`, notes: [{ at: "#v in o", text: "tests for the private field" }] }
          ]
        },
        {
          id: "instanceof-checks", n: 5, title: "instanceof", level: 2,
          gloss: "Tests which class an object came from.",
          examples: [
            { code: `class A {}
const ok = new A() instanceof A;`, notes: [] },
            { code: `const isArr = [] instanceof Array;
const isObj = [] instanceof Object;`, notes: [{ at: "instanceof Object", text: "true for almost everything" }] },
            { code: `class A {}
class B extends A {}
const yes = new B() instanceof A;`, notes: [{ at: "B", text: "counts as an A too" }] }
          ]
        }
      ]
    },
    {
      id: "modules",
      n: 8,
      title: "modules",
      concepts: [
        {
          id: "named-exports", n: 1, title: "named exports", level: 1,
          gloss: "Shares values with export and imports them by name.",
          examples: [
            { code: `export const PI = 3.14159;
export function area(r) {
  return PI * r * r;
}`, notes: [{ at: "export", text: "makes it importable" }] },
            { code: `import { PI, area } from "./math.js";`, notes: [{ at: "{ PI, area }", text: "names must match" }] },
            { code: `import { area as circleArea } from "./math.js";`, notes: [{ at: "as circleArea", text: "renames the import" }] }
          ]
        },
        {
          id: "default-exports", n: 2, title: "default exports", level: 1,
          gloss: "Exports one main value per file as the default.",
          examples: [
            { code: `export default class Logger {
  log(msg) {
    console.log(msg);
  }
}`, notes: [{ at: "default", text: "one per file" }] },
            { code: `import Logger from "./logger.js";
const log = new Logger();`, notes: [{ at: "import Logger", text: "no braces for a default" }] },
            { code: `export default function (x) {
  return x * 2;
}`, notes: [{ at: "default", text: "the importer picks the name" }] }
          ]
        },
        {
          id: "namespace-reexport", n: 3, title: "namespace imports and re-exports", level: 2,
          gloss: "Imports everything as a namespace or re-exports from another file.",
          examples: [
            { code: `import * as math from "./math.js";
const r = math.area(2);`, notes: [{ at: "* as math", text: "all exports on one object" }] },
            { code: `export { area, PI } from "./math.js";`, notes: [{ at: "from", text: "re-exports without importing" }] },
            { code: `export * from "./utils.js";
export { default as Logger } from "./logger.js";`, notes: [{ at: "default as Logger", text: "names the default export" }] }
          ]
        },
        {
          id: "dynamic-import", n: 4, title: "dynamic import", level: 3,
          gloss: "Loads a module on demand with import().",
          examples: [
            { code: `const { area } = await import("./math.js");`, notes: [{ at: "import(\"./math.js\")", text: "returns a promise of the module" }] },
            { code: `const loadChart = () => import("./chart.js");
const mod = await loadChart();`, notes: [{ at: "loadChart", text: "nothing loads until it is called" }] },
            { code: `const name = "math";
const m = await import(\`./\${name}.js\`);`, notes: [{ at: "`./${name}.js`", text: "the path can be computed" }] }
          ]
        }
      ]
    },
    {
      id: "promises",
      n: 9,
      title: "promises",
      concepts: [
        {
          id: "promise-basics", n: 1, title: "promise basics", level: 2,
          gloss: "Represents a value that arrives later.",
          examples: [
            { code: `const p = new Promise((resolve) => {
  setTimeout(() => resolve("done"), 100);
});`, notes: [{ at: "resolve", text: "fulfills the promise" }] },
            { code: `const ok = Promise.resolve(1);
const bad = Promise.reject(new Error("no"));
bad.catch(() => {});`, notes: [{ at: "Promise.resolve", text: "an already fulfilled promise" }] },
            { code: `const p = new Promise((resolve, reject) => {
  reject(new Error("failed"));
});
p.catch((e) => console.log(e.message));`, notes: [{ at: "reject", text: "fails the promise" }] }
          ]
        },
        {
          id: "then-chains", n: 2, title: "then chains", level: 2,
          gloss: "Chains steps with then, catch and finally.",
          examples: [
            { code: `Promise.resolve(2)
  .then((n) => n * 2)
  .then((n) => console.log(n));`, notes: [{ at: "n * 2", text: "the return feeds the next then" }] },
            { code: `Promise.reject(new Error("x"))
  .catch(() => "fallback")
  .then((v) => console.log(v));`, notes: [{ at: "catch", text: "recovers from the error" }] },
            { code: `Promise.resolve(1)
  .finally(() => console.log("cleanup"))
  .then((v) => v);`, notes: [{ at: "finally", text: "runs either way, passes the value on" }] }
          ]
        },
        {
          id: "promise-combinators", n: 3, title: "combinators", level: 3,
          gloss: "Combines several promises with all, allSettled and race.",
          examples: [
            { code: `const tasks = [Promise.resolve(1), Promise.resolve(2)];
const [a, b] = await Promise.all(tasks);`, notes: [{ at: "Promise.all", text: "rejects if any one rejects" }] },
            { code: `const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error("no")),
]);`, notes: [{ at: "allSettled", text: "never rejects, reports each outcome" }] },
            { code: `const fast = sleep(5).then(() => "fast");
const slow = sleep(50).then(() => "slow");
const first = await Promise.race([fast, slow]);`, notes: [{ at: "race", text: "settles with the first to finish" }] }
          ]
        },
        {
          id: "promisify", n: 4, title: "wrapping callbacks", level: 3,
          gloss: "Wraps callback-style code in a promise.",
          examples: [
            { code: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));`, notes: [{ at: "resolve", text: "passed straight to setTimeout" }] },
            { code: `const readAsync = () =>
  new Promise((resolve, reject) => {
    readLater((err, data) => (err ? reject(err) : resolve(data)));
  });`, notes: [{ at: "err ? reject", text: "the callback decides the outcome" }] },
            { code: `const delay = (ms, value) =>
  new Promise((r) => setTimeout(r, ms, value));
const v = await delay(5, "x");`, notes: [{ at: "setTimeout(r, ms, value)", text: "the third argument is passed on" }] }
          ]
        }
      ]
    },
    {
      id: "async-await",
      n: 10,
      title: "async/await",
      concepts: [
        {
          id: "async-functions", n: 1, title: "async functions", level: 1,
          gloss: "Writes promise code that reads like straight-line code.",
          examples: [
            { code: `async function getNumber() {
  return 42;
}`, notes: [{ at: "async", text: "always returns a promise" }] },
            { code: `async function load() {
  const data = await fetch("/api/data");
  return data.json();
}`, notes: [{ at: "await", text: "pauses until the promise settles" }] },
            { code: `const getUser = async (id) => ({ id });
const user = await getUser(1);`, notes: [] }
          ]
        },
        {
          id: "await-errors", n: 2, title: "handling errors", level: 2,
          gloss: "Handles async failures with try and catch.",
          examples: [
            { code: `async function load() {
  try {
    const r = await fetch("/api");
    return await r.json();
  } catch (err) {
    return null;
  }
}`, notes: [{ at: "return await", text: "keeps the catch in play" }] },
            { code: `try {
  await Promise.reject(new Error("no"));
} catch (e) {
  console.log(e.message);
}`, notes: [] },
            { code: `const result = await fetch("/api").catch(() => null);`, notes: [{ at: ".catch", text: "an inline fallback instead of try" }] }
          ]
        },
        {
          id: "parallel-sequential", n: 3, title: "parallel and sequential", level: 2,
          gloss: "Runs awaits one after another or all at once.",
          examples: [
            { code: `const a = await sleep(5);
const b = await sleep(5);`, notes: [{ at: "const b", text: "waits for a to finish first" }] },
            { code: `const [a, b] = await Promise.all([sleep(5), sleep(5)]);`, notes: [{ at: "Promise.all", text: "both run together" }] },
            { code: `for (const id of [1, 2, 3]) {
  await sleep(1);
}`, notes: [{ at: "await", text: "sequential on purpose" }] }
          ]
        },
        {
          id: "async-iteration", n: 4, title: "for await", level: 3,
          gloss: "Loops over asynchronous sequences with for await.",
          examples: [
            { code: `async function* ticks() {
  yield 1;
  yield 2;
}
for await (const t of ticks()) {
  console.log(t);
}`, notes: [{ at: "for await", text: "waits for each value" }] },
            { code: `const promises = [sleep(2).then(() => 1), Promise.resolve(2)];
for await (const v of promises) {
  console.log(v);
}`, notes: [{ at: "promises", text: "also works on arrays of promises" }] },
            { code: `async function* pages() {
  for (let p = 1; p <= 3; p++) {
    yield { page: p };
  }
}
const all = [];
for await (const x of pages()) all.push(x);`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "fetch-json",
      n: 11,
      title: "fetch & JSON",
      concepts: [
        {
          id: "fetch-get", n: 1, title: "GET requests", level: 1,
          gloss: "Requests data with fetch and reads the response.",
          examples: [
            { code: `const res = await fetch("/api/users");
const users = await res.json();`, notes: [{ at: "res.json()", text: "parses the body as JSON" }] },
            { code: `const res = await fetch("/api/ping");
if (!res.ok) {
  throw new Error(\`HTTP \${res.status}\`);
}`, notes: [{ at: "res.ok", text: "false on 4xx and 5xx" }] },
            { code: `const res = await fetch("/api/note");
const text = await res.text();`, notes: [] }
          ]
        },
        {
          id: "fetch-post", n: 2, title: "POST requests", level: 2,
          gloss: "Sends JSON or form data with a POST request.",
          examples: [
            { code: `await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "ada" }),
});`, notes: [{ at: "JSON.stringify", text: "the body must be a string" }] },
            { code: `const res = await fetch("/api/login", {
  method: "POST",
  body: new URLSearchParams({ user: "ada" }),
});`, notes: [{ at: "URLSearchParams", text: "sent as form fields" }] },
            { code: `const form = new FormData();
form.append("file", "x");
await fetch("/api/upload", { method: "POST", body: form });`, notes: [{ at: "FormData", text: "the browser sets the content type" }] }
          ]
        },
        {
          id: "json-parse-stringify", n: 3, title: "parse and stringify", level: 1,
          gloss: "Converts between JSON text and values.",
          examples: [
            { code: `const obj = JSON.parse('{"a": 1}');`, notes: [{ at: "JSON.parse", text: "text to value" }] },
            { code: `const text = JSON.stringify({ a: 1, b: [2, 3] });`, notes: [{ at: "JSON.stringify", text: "value to text" }] },
            { code: `const pretty = JSON.stringify({ a: 1 }, null, 2);`, notes: [{ at: "null, 2", text: "no filter, two-space indent" }] }
          ]
        },
        {
          id: "json-options", n: 4, title: "replacers and revivers", level: 3,
          gloss: "Customizes JSON with replacers, revivers and error handling.",
          examples: [
            { code: `const text = JSON.stringify({ a: 1, b: 2 }, ["a"]);`, notes: [{ at: "[\"a\"]", text: "only these keys are kept" }] },
            { code: `const obj = JSON.parse('{"d": "2024-01-02"}', (k, v) =>
  k === "d" ? new Date(v) : v,
);`, notes: [{ at: "new Date(v)", text: "the reviver rebuilds dates" }] },
            { code: `try {
  JSON.parse("{oops");
} catch (e) {
  console.log(e.name);
}`, notes: [{ at: "JSON.parse", text: "throws SyntaxError on bad input" }] }
          ]
        },
        {
          id: "abort-fetch", n: 5, title: "aborting requests", level: 3,
          gloss: "Cancels a request with AbortController and AbortSignal.",
          examples: [
            { code: `const ctrl = new AbortController();
const p = fetch("/slow", { signal: ctrl.signal });
ctrl.abort();`, notes: [{ at: "ctrl.abort()", text: "cancels the request" }] },
            { code: `const res = await fetch("/api", { signal: AbortSignal.timeout(5000) });`, notes: [{ at: "AbortSignal.timeout", text: "aborts after five seconds" }] },
            { code: `try {
  await fetch("/api", { signal: AbortSignal.abort() });
} catch (e) {
  console.log(e.name);
}`, notes: [{ at: "AbortSignal.abort()", text: "already aborted" }] }
          ]
        }
      ]
    },
    {
      id: "iterators-generators",
      n: 12,
      title: "iterators & generators",
      concepts: [
        {
          id: "iterables", n: 1, title: "iterables", level: 2,
          gloss: "Loops over arrays, strings, maps and sets with for of.",
          examples: [
            { code: `for (const ch of "abc") {
  console.log(ch);
}`, notes: [{ at: "of \"abc\"", text: "any iterable works" }] },
            { code: `for (const [i, n] of [10, 20].entries()) {
  console.log(i, n);
}`, notes: [{ at: "entries", text: "index and value pairs" }] },
            { code: `const [a, b] = new Set([1, 2]);
const chars = [..."hey"];`, notes: [{ at: "[...\"hey\"]", text: "spread works on any iterable" }] }
          ]
        },
        {
          id: "iterator-protocol", n: 2, title: "the iterator protocol", level: 3,
          gloss: "Implements the iterator protocol by hand.",
          examples: [
            { code: `const it = [1, 2][Symbol.iterator]();
const first = it.next();`, notes: [{ at: "next()", text: "returns { value, done }" }] },
            { code: `const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let n = this.from;
    const end = this.to;
    return {
      next: () => (n <= end ? { value: n++ } : { done: true }),
    };
  },
};`, notes: [{ at: "[Symbol.iterator]", text: "makes the object iterable" }] },
            { code: `const it = "ab"[Symbol.iterator]();
const a = it.next().value;
const b = it.next().value;`, notes: [] }
          ]
        },
        {
          id: "generators", n: 3, title: "generators", level: 2,
          gloss: "Produces values lazily with function* and yield.",
          examples: [
            { code: `function* count() {
  yield 1;
  yield 2;
  yield 3;
}
const nums = [...count()];`, notes: [{ at: "yield", text: "pauses and hands out a value" }] },
            { code: `function* naturals() {
  let n = 1;
  while (true) {
    yield n++;
  }
}
const it = naturals();
it.next();`, notes: [{ at: "while (true)", text: "never runs ahead of the consumer" }] },
            { code: `function* take(n, it) {
  let i = 0;
  for (const v of it) {
    if (i++ >= n) return;
    yield v;
  }
}`, notes: [] }
          ]
        },
        {
          id: "generator-delegation", n: 4, title: "yield* and next", level: 3,
          gloss: "Delegates to another iterable with yield* and passes values in.",
          examples: [
            { code: `function* both() {
  yield* [1, 2];
  yield* "ab";
}`, notes: [{ at: "yield*", text: "hands over to another iterable" }] },
            { code: `function* tree(n) {
  if (!n) return;
  yield* tree(n.left);
  yield n.value;
  yield* tree(n.right);
}`, notes: [{ at: "yield* tree", text: "recursion in order" }] },
            { code: `function* chat() {
  const name = yield "name?";
  yield \`hi \${name}\`;
}
const g = chat();
g.next();
g.next("ada");`, notes: [{ at: "g.next(\"ada\")", text: "becomes the result of yield" }] }
          ]
        }
      ]
    },
    {
      id: "map-set",
      n: 13,
      title: "Map & Set",
      concepts: [
        {
          id: "map-basics", n: 1, title: "Map basics", level: 1,
          gloss: "Stores key-value pairs with any type of key.",
          examples: [
            { code: `const m = new Map();
m.set("a", 1);
m.set("b", 2);`, notes: [{ at: "set", text: "returns the map, so calls chain" }] },
            { code: `const m = new Map([["a", 1], ["b", 2]]);
const a = m.get("a");
const n = m.size;`, notes: [{ at: "m.size", text: "a property, not a method" }] },
            { code: `const key = { id: 1 };
const m = new Map([[key, "obj"]]);`, notes: [{ at: "key", text: "objects work as keys" }] }
          ]
        },
        {
          id: "map-iteration", n: 2, title: "iterating a Map", level: 2,
          gloss: "Loops over a Map's entries, keys and values.",
          examples: [
            { code: `const m = new Map([["a", 1]]);
for (const [k, v] of m) {
  console.log(k, v);
}`, notes: [{ at: "[k, v]", text: "entries come as pairs" }] },
            { code: `const m = new Map([["a", 1]]);
const keys = [...m.keys()];
const vals = [...m.values()];`, notes: [] },
            { code: `const m = new Map([["a", 1]]);
m.forEach((v, k) => console.log(k, v));`, notes: [{ at: "(v, k)", text: "value comes first" }] }
          ]
        },
        {
          id: "set-basics", n: 3, title: "Set basics", level: 1,
          gloss: "Keeps unique values with a Set.",
          examples: [
            { code: `const s = new Set([1, 2, 2, 3]);
const n = s.size;`, notes: [{ at: "Set", text: "duplicates collapse" }] },
            { code: `const s = new Set();
s.add("a");
s.add("a");
const has = s.has("a");`, notes: [] },
            { code: `const uniq = [...new Set([3, 1, 3, 2])];`, notes: [{ at: "[...new Set(", text: "dedupes an array" }] }
          ]
        },
        {
          id: "weak-collections", n: 4, title: "weak collections", level: 3,
          gloss: "Holds objects without blocking garbage collection.",
          examples: [
            { code: `const cache = new WeakMap();
const obj = {};
cache.set(obj, "data");`, notes: [{ at: "WeakMap", text: "keys must be objects" }] },
            { code: `const seen = new WeakSet();
const o = {};
seen.add(o);
const has = seen.has(o);`, notes: [] },
            { code: `const meta = new WeakMap();
const track = (o) => meta.set(o, Date.now());`, notes: [{ at: "meta", text: "the entry vanishes with its key" }] }
          ]
        },
        {
          id: "map-grouping", n: 5, title: "grouping with Map", level: 2,
          gloss: "Groups and counts items with a Map.",
          examples: [
            { code: `const groups = new Map();
for (const w of ["ant", "bee", "ape"]) {
  const k = w[0];
  groups.set(k, [...(groups.get(k) ?? []), w]);
}`, notes: [{ at: "?? []", text: "start a new group when missing" }] },
            { code: `const counts = new Map();
for (const c of "hello") {
  counts.set(c, (counts.get(c) ?? 0) + 1);
}`, notes: [] },
            { code: `const obj = Object.fromEntries(new Map([["a", 1]]));
const m = new Map(Object.entries({ x: 1 }));`, notes: [{ at: "fromEntries", text: "a Map becomes an object" }] }
          ]
        }
      ]
    },
    {
      id: "errors-try-catch",
      n: 14,
      title: "errors & try/catch",
      concepts: [
        {
          id: "try-catch", n: 1, title: "try and catch", level: 1,
          gloss: "Handles runtime errors with try, catch and finally.",
          examples: [
            { code: `try {
  JSON.parse("{oops");
} catch (err) {
  console.log(err.message);
}`, notes: [{ at: "err", text: "the thrown error" }] },
            { code: `try {
  null.x;
} catch (err) {
  console.log(err.name);
} finally {
  console.log("done");
}`, notes: [{ at: "finally", text: "runs whether or not it threw" }] },
            { code: `try {
  undefinedFn();
} catch {
  console.log("failed");
}`, notes: [{ at: "catch {", text: "the binding is optional" }] }
          ]
        },
        {
          id: "throwing", n: 2, title: "throwing", level: 1,
          gloss: "Raises errors with throw and Error objects.",
          examples: [
            { code: `function check(age) {
  if (age < 0) throw new RangeError("age < 0");
  return age;
}`, notes: [{ at: "RangeError", text: "a more specific error type" }] },
            { code: `try {
  throw new Error("boom");
} catch (e) {
  console.log(e instanceof Error);
}`, notes: [] },
            { code: `const err = new Error("outer", { cause: new Error("inner") });
console.log(err.cause.message);`, notes: [{ at: "cause", text: "chains the original error" }] }
          ]
        },
        {
          id: "custom-errors", n: 3, title: "custom errors", level: 2,
          gloss: "Defines your own error classes.",
          examples: [
            { code: `class ValidationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ValidationError";
  }
}`, notes: [{ at: "this.name", text: "shows up in stack traces" }] },
            { code: `class HttpError extends Error {
  constructor(status) {
    super(\`HTTP \${status}\`);
    this.status = status;
  }
}`, notes: [] },
            { code: `class NotFound extends Error {}
try {
  throw new NotFound("nope");
} catch (e) {
  console.log(e instanceof NotFound);
}`, notes: [{ at: "instanceof", text: "picks the handler by class" }] }
          ]
        },
        {
          id: "error-types", n: 4, title: "built-in error types", level: 2,
          gloss: "Recognizes the built-in error types by name.",
          examples: [
            { code: `try {
  null.f();
} catch (e) {
  console.log(e instanceof TypeError);
}`, notes: [{ at: "null.f()", text: "calling a method on null" }] },
            { code: `try {
  missing;
} catch (e) {
  console.log(e.name);
}`, notes: [{ at: "missing", text: "an undeclared name" }] },
            { code: `try {
  new Array(-1);
} catch (e) {
  console.log(e.name);
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "regular-expressions",
      n: 15,
      title: "regular expressions",
      concepts: [
        {
          id: "regex-literals", n: 1, title: "regex literals", level: 1,
          gloss: "Tests text against a pattern with a regular expression.",
          examples: [
            { code: `const ok = /^\\d+$/.test("123");`, notes: [{ at: ".test", text: "returns true or false" }] },
            { code: `const m = "order 42".match(/\\d+/);
console.log(m[0]);`, notes: [{ at: "m[0]", text: "the matched text" }] },
            { code: `const re = new RegExp("a+", "i");
const t = re.test("AAA");`, notes: [{ at: "new RegExp", text: "builds a pattern from a string" }] }
          ]
        },
        {
          id: "regex-flags", n: 2, title: "flags", level: 2,
          gloss: "Changes matching with flags such as g, i and m.",
          examples: [
            { code: `const all = "a1b2".match(/\\d/g);`, notes: [{ at: "g", text: "every match, not just the first" }] },
            { code: `const ok = /hello/i.test("HELLO");`, notes: [{ at: "i", text: "ignores case" }] },
            { code: `const lines = "a\\nb".match(/^\\w$/gm);`, notes: [{ at: "m", text: "^ and $ match each line" }] }
          ]
        },
        {
          id: "regex-groups", n: 3, title: "groups", level: 2,
          gloss: "Captures parts of a match with groups.",
          examples: [
            { code: `const m = "2024-05-06".match(/(\\d+)-(\\d+)-(\\d+)/);
const year = m[1];`, notes: [{ at: "m[1]", text: "the first group" }] },
            { code: `const m = "2024-05".match(/(?<y>\\d+)-(?<m>\\d+)/);
const { y, m: month } = m.groups;`, notes: [{ at: "(?<y>", text: "a named capture group" }] },
            { code: `const swapped = "ada lovelace".replace(/(\\w+) (\\w+)/, "$2 $1");`, notes: [] }
          ]
        },
        {
          id: "regex-matchall", n: 4, title: "matchAll and replace", level: 3,
          gloss: "Iterates matches with matchAll and builds replacements with a function.",
          examples: [
            { code: `for (const m of "a1b22".matchAll(/\\d+/g)) {
  console.log(m[0], m.index);
}`, notes: [{ at: "matchAll", text: "needs the g flag" }] },
            { code: `const t = "a1b2".replace(/\\d/g, (d) => d * 2);`, notes: [{ at: "(d) =>", text: "the function builds each replacement" }] },
            { code: `const parts = "a, b;c".split(/[,;]\\s*/);`, notes: [{ at: "split(/", text: "a regex can be the separator" }] }
          ]
        },
        {
          id: "lookaround", n: 5, title: "lookaround", level: 3,
          gloss: "Matches around other text without consuming it.",
          examples: [
            { code: `const price = "cost: $42".match(/(?<=\\$)\\d+/)[0];`, notes: [{ at: "(?<=", text: "must follow a dollar sign" }] },
            { code: `const name = "app.js lib.ts".match(/\\w+(?=\\.js)/)[0];`, notes: [{ at: "(?=", text: "must be followed by .js" }] },
            { code: `const t = "1234567".replace(/\\B(?=(\\d{3})+$)/g, ",");`, notes: [{ at: "\\B", text: "inserts commas at every third digit" }] }
          ]
        }
      ]
    },
    {
      id: "optional-nullish",
      n: 16,
      title: "optional chaining & nullish coalescing",
      concepts: [
        {
          id: "optional-chaining", n: 1, title: "optional chaining", level: 1,
          gloss: "Reads nested values without crashing on null or undefined.",
          examples: [
            { code: `const city = user?.address?.city;`, notes: [{ at: "?.", text: "stops and gives undefined" }] },
            { code: `const first = users?.[0]?.name;`, notes: [{ at: "?.[", text: "optional index access" }] },
            { code: `const out = user.greet?.();`, notes: [{ at: "?.()", text: "calls only if it exists" }] }
          ]
        },
        {
          id: "nullish-coalescing", n: 2, title: "nullish coalescing", level: 1,
          gloss: "Falls back only for null or undefined with the ?? operator.",
          examples: [
            { code: `const config = { port: 0 };
const port = config.port ?? 8080;`, notes: [{ at: "??", text: "keeps 0, unlike ||" }] },
            { code: `const name = user.nickname ?? user.name;`, notes: [] },
            { code: `const a = 0 || "x";
const b = 0 ?? "x";`, notes: [{ at: "0 ?? \"x\"", text: "0 is kept" }] }
          ]
        },
        {
          id: "logical-assignment", n: 3, title: "logical assignment", level: 2,
          gloss: "Assigns conditionally with ??=,||= and &&=.",
          examples: [
            { code: `let a = null;
a ??= 5;`, notes: [{ at: "??=", text: "assigns only when null or undefined" }] },
            { code: `const opts = {};
opts.retries ??= 3;`, notes: [] },
            { code: `let name = "";
name ||= "anonymous";`, notes: [{ at: "||=", text: "replaces any falsy value" }] }
          ]
        },
        {
          id: "default-patterns", n: 4, title: "defaults", level: 2,
          gloss: "Provides defaults with parameters, destructuring and fallbacks.",
          examples: [
            { code: `function f(x = 10) {
  return x;
}`, notes: [{ at: "x = 10", text: "used only for undefined" }] },
            { code: `const { size = 3, color = "red" } = {};`, notes: [] },
            { code: `const label = user.name?.trim() || "unknown";`, notes: [{ at: "?.trim()", text: "safe even if name is missing" }] }
          ]
        }
      ]
    }
  ]
};
