export default {
  id: "typescript",
  name: "TypeScript",
  short: "TS",
  pigment: "typescript",
  family: null,
  version: "7.x",
  lexer: "typescript",
  indent: 2,
  topics: [
    {
      id: "basic-types",
      n: 1,
      title: "basic types",
      concepts: [
        {
          id: "type-annotations", n: 1, title: "type annotations", level: 1,
          gloss: "Annotates variables with an explicit type.",
          examples: [
            { code: `let count: number = 0;
let name: string = "ada";
let done: boolean = false;`, notes: [{ at: ": number", text: "the annotation after the name" }] },
            { code: `const ids: number[] = [1, 2, 3];
const names: Array<string> = ["a", "b"];`, notes: [{ at: "Array<string>", text: "the same as string[]" }] },
            { code: `let pair: [string, number] = ["age", 36];`, notes: [{ at: "[string, number]", text: "a tuple with a fixed shape" }] }
          ]
        },
        {
          id: "inference", n: 2, title: "type inference", level: 1,
          gloss: "Lets the compiler infer types from initial values.",
          examples: [
            { code: `let n = 10;
let s = "text";`, notes: [{ at: "10", text: "inferred as number" }] },
            { code: `const flags = [true, false];
const first = flags[0];`, notes: [{ at: "first", text: "inferred as boolean" }] },
            { code: `const user = { name: "ada", age: 36 };
const age = user.age;`, notes: [{ at: "user", text: "the shape is inferred too" }] }
          ]
        },
        {
          id: "any-unknown-never", n: 3, title: "any, unknown and never", level: 2,
          gloss: "Chooses between any, unknown and never for uncertain types.",
          examples: [
            { code: `let loose: any = 5;
loose = "now a string";`, notes: [{ at: "any", text: "turns off type checking" }] },
            { code: `let input: unknown = JSON.parse("1");
if (typeof input === "number") {
  input.toFixed(2);
}`, notes: [{ at: "unknown", text: "must be narrowed before use" }] },
            { code: `function fail(msg: string): never {
  throw new Error(msg);
}`, notes: [{ at: "never", text: "the function never returns" }] }
          ]
        },
        {
          id: "null-undefined", n: 4, title: "null and undefined", level: 2,
          gloss: "Models missing values with null, undefined and optional parameters.",
          examples: [
            { code: `let a: string | null = null;
a = "ada";`, notes: [{ at: "string | null", text: "a union with null" }] },
            { code: `function greet(name?: string) {
  return \`hi \${name ?? "you"}\`;
}`, notes: [{ at: "name?", text: "optional, so string | undefined" }] },
            { code: `let x: number | undefined;
const y = x ?? 0;`, notes: [] }
          ]
        },
        {
          id: "literal-types", n: 5, title: "literal types", level: 2,
          gloss: "Restricts a value to exact literals.",
          examples: [
            { code: `let dir: "left" | "right" = "left";`, notes: [{ at: "\"left\" | \"right\"", text: "only these two strings" }] },
            { code: `type Size = "sm" | "md" | "lg";
let s: Size = "md";`, notes: [] },
            { code: `let code: 200 | 404 = 200;`, notes: [{ at: "200 | 404", text: "numbers can be literals too" }] }
          ]
        }
      ]
    },
    {
      id: "interfaces-aliases",
      n: 2,
      title: "interfaces & type aliases",
      concepts: [
        {
          id: "interfaces", n: 1, title: "interfaces", level: 1,
          gloss: "Describes the shape of an object with an interface.",
          examples: [
            { code: `interface User {
  name: string;
  age: number;
}
const u: User = { name: "ada", age: 36 };`, notes: [{ at: "interface User", text: "a name for the shape" }] },
            { code: `interface Point {
  readonly x: number;
  readonly y: number;
}`, notes: [{ at: "readonly", text: "cannot be assigned after creation" }] },
            { code: `interface Config {
  host: string;
  port?: number;
}
const c: Config = { host: "localhost" };`, notes: [{ at: "port?", text: "an optional property" }] }
          ]
        },
        {
          id: "type-aliases", n: 2, title: "type aliases", level: 1,
          gloss: "Names a type with a type alias.",
          examples: [
            { code: `type ID = string | number;
let id: ID = 7;`, notes: [{ at: "type ID", text: "works for unions too" }] },
            { code: `type Point = { x: number; y: number };
const p: Point = { x: 1, y: 2 };`, notes: [] },
            { code: `type Callback = (err: Error | null, data?: string) => void;`, notes: [{ at: "=> void", text: "a function type" }] }
          ]
        },
        {
          id: "extending", n: 3, title: "extending types", level: 2,
          gloss: "Builds new types from existing ones with extends and intersections.",
          examples: [
            { code: `interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}`, notes: [{ at: "extends", text: "the dog also has name" }] },
            { code: `type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;`, notes: [{ at: "&", text: "the value must satisfy both" }] },
            { code: `interface Box<T> {
  value: T;
}
interface Labeled extends Box<string> {
  label: string;
}`, notes: [] }
          ]
        },
        {
          id: "index-signatures", n: 4, title: "index signatures", level: 2,
          gloss: "Describes objects with arbitrary keys using index signatures.",
          examples: [
            { code: `interface Scores {
  [name: string]: number;
}
const s: Scores = { ada: 90 };`, notes: [{ at: "[name: string]", text: "any string key, number value" }] },
            { code: `const ages: Record<string, number> = { ada: 36 };`, notes: [{ at: "Record", text: "shorthand for an index signature" }] },
            { code: `interface Env {
  NODE_ENV: string;
  [key: string]: string;
}`, notes: [{ at: "NODE_ENV", text: "known keys must fit the index type" }] }
          ]
        }
      ]
    },
    {
      id: "unions-narrowing",
      n: 3,
      title: "unions & narrowing",
      concepts: [
        {
          id: "unions", n: 1, title: "unions", level: 1,
          gloss: "Allows a value to be one of several types.",
          examples: [
            { code: `let id: string | number = "a1";
id = 7;`, notes: [{ at: "string | number", text: "either type is allowed" }] },
            { code: `function show(x: string | number) {
  return x.toString();
}`, notes: [{ at: "toString", text: "only members both types share" }] },
            { code: `type Result = "ok" | "error";
let r: Result = "ok";`, notes: [] }
          ]
        },
        {
          id: "typeof-narrowing", n: 2, title: "typeof narrowing", level: 1,
          gloss: "Narrows a union with typeof and truthiness checks.",
          examples: [
            { code: `function f(x: string | number) {
  if (typeof x === "string") {
    return x.toUpperCase();
  }
  return x.toFixed(1);
}`, notes: [{ at: "typeof x === \"string\"", text: "x is a string inside" }] },
            { code: `function len(s: string | null) {
  if (s) {
    return s.length;
  }
  return 0;
}`, notes: [{ at: "if (s)", text: "null is removed here" }] },
            { code: `function f(x: string | string[]) {
  return Array.isArray(x) ? x.join(",") : x;
}`, notes: [{ at: "Array.isArray", text: "narrows to the array branch" }] }
          ]
        },
        {
          id: "discriminated-unions", n: 3, title: "discriminated unions", level: 2,
          gloss: "Tells union members apart with a shared literal field.",
          examples: [
            { code: `type Shape =
  | { kind: "circle"; r: number }
  | { kind: "square"; side: number };
function area(s: Shape) {
  return s.kind === "circle" ? Math.PI * s.r ** 2 : s.side ** 2;
}`, notes: [{ at: "s.kind === \"circle\"", text: "the check narrows s" }] },
            { code: `type Msg =
  | { type: "ping" }
  | { type: "text"; body: string };
function handle(m: Msg) {
  switch (m.type) {
    case "text":
      return m.body;
    default:
      return "ping";
  }
}`, notes: [{ at: "case \"text\"", text: "m.body exists here" }] },
            { code: `type Light = "red" | "green";
function next(l: Light): Light {
  switch (l) {
    case "red":
      return "green";
    case "green":
      return "red";
    default:
      return l satisfies never;
  }
}`, notes: [{ at: "satisfies never", text: "fails if a case is missing" }] }
          ]
        },
        {
          id: "in-instanceof", n: 4, title: "in and instanceof", level: 2,
          gloss: "Narrows with the in operator and instanceof.",
          examples: [
            { code: `type Cat = { meow(): void };
type Dog = { bark(): void };
function speak(p: Cat | Dog) {
  if ("meow" in p) p.meow();
  else p.bark();
}`, notes: [{ at: "\"meow\" in p", text: "checks for a property" }] },
            { code: `function when(d: Date | string) {
  return d instanceof Date ? d.getTime() : Date.parse(d);
}`, notes: [] },
            { code: `function f(e: unknown) {
  if (e instanceof Error) {
    return e.message;
  }
  return String(e);
}`, notes: [{ at: "instanceof Error", text: "narrows unknown" }] }
          ]
        }
      ]
    },
    {
      id: "generics",
      n: 4,
      title: "generics",
      concepts: [
        {
          id: "generic-functions", n: 1, title: "generic functions", level: 2,
          gloss: "Writes one function that keeps the caller's type.",
          examples: [
            { code: `function identity<T>(x: T): T {
  return x;
}
const n = identity(5);`, notes: [{ at: "<T>", text: "the type is inferred from the argument" }] },
            { code: `function first<T>(items: T[]): T | undefined {
  return items[0];
}`, notes: [] },
            { code: `function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}`, notes: [] }
          ]
        },
        {
          id: "generic-constraints", n: 2, title: "constraints", level: 2,
          gloss: "Limits type parameters with extends.",
          examples: [
            { code: `function len<T extends { length: number }>(x: T) {
  return x.length;
}`, notes: [{ at: "extends { length: number }", text: "the type must have a length" }] },
            { code: `function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`, notes: [{ at: "keyof T", text: "only keys that exist on T" }] },
            { code: `function max<T extends number | string>(a: T, b: T): T {
  return a > b ? a : b;
}`, notes: [] }
          ]
        },
        {
          id: "generic-types", n: 3, title: "generic types", level: 2,
          gloss: "Declares interfaces, aliases and classes with type parameters.",
          examples: [
            { code: `interface Box<T> {
  value: T;
}
const b: Box<number> = { value: 1 };`, notes: [{ at: "Box<number>", text: "the type becomes number" }] },
            { code: `type Pair<A, B = A> = [A, B];
const p: Pair<string> = ["a", "b"];`, notes: [{ at: "B = A", text: "a default type argument" }] },
            { code: `class Stack<T> {
  private items: T[] = [];
  push(x: T) {
    this.items.push(x);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
}`, notes: [] }
          ]
        },
        {
          id: "generic-inference", n: 4, title: "inference", level: 3,
          gloss: "Infers type arguments from how a function is used.",
          examples: [
            { code: `const nums = [1, 2, 3].map((n) => String(n));`, notes: [{ at: "String(n)", text: "map infers U as string" }] },
            { code: `function wrap<T>(x: T) {
  return { value: x };
}
const w = wrap("a");`, notes: [{ at: "w", text: "{ value: string }" }] },
            { code: `const set = new Set<number>();
set.add(1);`, notes: [{ at: "<number>", text: "explicit when nothing to infer from" }] }
          ]
        }
      ]
    },
    {
      id: "utility-types",
      n: 5,
      title: "utility types",
      concepts: [
        {
          id: "partial-required", n: 1, title: "Partial and Required", level: 1,
          gloss: "Makes every property of a type optional or required.",
          examples: [
            { code: `interface User {
  name: string;
  age: number;
}
const patch: Partial<User> = { age: 37 };`, notes: [{ at: "Partial<User>", text: "every property optional" }] },
            { code: `interface Opts {
  a?: number;
  b?: string;
}
const full: Required<Opts> = { a: 1, b: "x" };`, notes: [{ at: "Required", text: "every property mandatory" }] },
            { code: `interface User {
  name: string;
  age: number;
}
function update(u: User, changes: Partial<User>): User {
  return { ...u, ...changes };
}`, notes: [] }
          ]
        },
        {
          id: "pick-omit", n: 2, title: "Pick and Omit", level: 1,
          gloss: "Selects or removes properties from a type.",
          examples: [
            { code: `interface User {
  id: number;
  name: string;
  email: string;
}
type Public = Pick<User, "id" | "name">;`, notes: [{ at: "Pick", text: "keeps only the listed keys" }] },
            { code: `interface User {
  id: number;
  email: string;
}
type NoEmail = Omit<User, "email">;`, notes: [{ at: "Omit", text: "drops the listed keys" }] },
            { code: `interface User {
  name: string;
  age: number;
}
type Preview = Pick<User, "name">;
const p: Preview = { name: "ada" };`, notes: [] }
          ]
        },
        {
          id: "record-readonly", n: 3, title: "Record and Readonly", level: 2,
          gloss: "Builds maps and locks objects with Record and Readonly.",
          examples: [
            { code: `const scores: Record<"a" | "b", number> = { a: 1, b: 2 };`, notes: [{ at: "Record<\"a\" | \"b\", number>", text: "exactly these keys" }] },
            { code: `const point: Readonly<{ x: number; y: number }> = { x: 1, y: 2 };`, notes: [{ at: "Readonly", text: "property assignments are errors" }] },
            { code: `type Roles = "admin" | "user";
const perms: Record<Roles, string[]> = { admin: ["all"], user: [] };`, notes: [] }
          ]
        },
        {
          id: "return-params", n: 4, title: "ReturnType and Parameters", level: 3,
          gloss: "Extracts types from functions with ReturnType and Parameters.",
          examples: [
            { code: `function make() {
  return { id: 1, tag: "a" };
}
type Made = ReturnType<typeof make>;`, notes: [{ at: "typeof make", text: "the function's own type" }] },
            { code: `function add(a: number, b: string) {}
type Args = Parameters<typeof add>;`, notes: [{ at: "Parameters", text: "the tuple [number, string]" }] },
            { code: `type Fn = (x: number) => string;
type R = ReturnType<Fn>;
type A = Awaited<Promise<number>>;`, notes: [] }
          ]
        },
        {
          id: "exclude-extract", n: 5, title: "Exclude and Extract", level: 3,
          gloss: "Filters union members with Exclude, Extract and NonNullable.",
          examples: [
            { code: `type T = Exclude<"a" | "b" | "c", "a">;`, notes: [{ at: "Exclude", text: "removes members" }] },
            { code: `type S = Extract<string | number, number>;`, notes: [{ at: "Extract", text: "keeps matching members" }] },
            { code: `type D = NonNullable<string | null | undefined>;`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "enums-const-objects",
      n: 6,
      title: "enums & const objects",
      concepts: [
        {
          id: "enums", n: 1, title: "enums", level: 1,
          gloss: "Names a set of related constants with enum.",
          examples: [
            { code: `enum Color {
  Red,
  Green,
  Blue,
}
const c = Color.Green;`, notes: [{ at: "Red", text: "numbering starts at 0" }] },
            { code: `enum Status {
  Active = "ACTIVE",
  Closed = "CLOSED",
}`, notes: [{ at: "\"ACTIVE\"", text: "string members have no reverse mapping" }] },
            { code: `const enum Dir {
  Up,
  Down,
}
const d = Dir.Up;`, notes: [{ at: "const enum", text: "inlined, no runtime object" }] }
          ]
        },
        {
          id: "const-objects", n: 2, title: "const objects", level: 2,
          gloss: "Replaces an enum with an as const object and a union type.",
          examples: [
            { code: `const Color = {
  Red: "red",
  Green: "green",
} as const;
type Color = (typeof Color)[keyof typeof Color];`, notes: [{ at: "as const", text: "keeps the literal values" }] },
            { code: `const Status = { Open: 0, Closed: 1 } as const;
type StatusValue = (typeof Status)[keyof typeof Status];`, notes: [] },
            { code: `const DIRS = ["up", "down"] as const;
type Dir = (typeof DIRS)[number];`, notes: [{ at: "[number]", text: "any item of the array" }] }
          ]
        },
        {
          id: "enum-usage", n: 3, title: "using enums", level: 2,
          gloss: "Uses enum values in parameters, loops and lookups.",
          examples: [
            { code: `enum Level {
  Low = 1,
  High = 2,
}
function warn(l: Level) {
  return l === Level.High;
}`, notes: [{ at: "l: Level", text: "only enum values are accepted" }] },
            { code: `enum Dir {
  Up = "UP",
  Down = "DOWN",
}
const all = Object.values(Dir);`, notes: [{ at: "Object.values", text: "lists the string members" }] },
            { code: `enum E {
  A,
  B,
}
const name = E[E.B];`, notes: [{ at: "E[E.B]", text: "numeric enums map back to names" }] }
          ]
        }
      ]
    },
    {
      id: "classes-access",
      n: 7,
      title: "classes & access modifiers",
      concepts: [
        {
          id: "class-properties", n: 1, title: "class properties", level: 1,
          gloss: "Declares typed properties and a constructor.",
          examples: [
            { code: `class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}`, notes: [{ at: "name: string", text: "declared before it is assigned" }] },
            { code: `class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}`, notes: [{ at: "public x", text: "a parameter property" }] },
            { code: `class Counter {
  count = 0;
  inc(): void {
    this.count++;
  }
}`, notes: [] }
          ]
        },
        {
          id: "access-modifiers", n: 2, title: "access modifiers", level: 1,
          gloss: "Controls visibility with public, private, protected and readonly.",
          examples: [
            { code: `class Account {
  private balance = 0;
  deposit(n: number) {
    this.balance += n;
  }
}`, notes: [{ at: "private", text: "only inside the class" }] },
            { code: `class Base {
  protected id = 1;
}
class Child extends Base {
  show() {
    return this.id;
  }
}`, notes: [{ at: "protected", text: "visible to subclasses" }] },
            { code: `class Config {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}`, notes: [{ at: "readonly", text: "assigned only in the constructor" }] }
          ]
        },
        {
          id: "abstract-implements", n: 3, title: "abstract classes and implements", level: 2,
          gloss: "Declares contracts with abstract classes and interfaces.",
          examples: [
            { code: `abstract class Shape {
  abstract area(): number;
  describe() {
    return \`area \${this.area()}\`;
  }
}`, notes: [{ at: "abstract area", text: "subclasses must implement it" }] },
            { code: `interface Speaker {
  speak(): string;
}
class Dog implements Speaker {
  speak() {
    return "woof";
  }
}`, notes: [{ at: "implements", text: "checked, but adds no code" }] },
            { code: `abstract class A {
  abstract run(): void;
}
class B extends A {
  run() {}
}`, notes: [] }
          ]
        },
        {
          id: "accessors-static", n: 4, title: "accessors and static members", level: 2,
          gloss: "Adds accessors, static members and true private fields.",
          examples: [
            { code: `class Rect {
  constructor(private w: number, private h: number) {}
  get area() {
    return this.w * this.h;
  }
}`, notes: [{ at: "get area", text: "read like a property" }] },
            { code: `class Id {
  static next = 1;
  static make() {
    return Id.next++;
  }
}`, notes: [{ at: "static", text: "lives on the class itself" }] },
            { code: `class Vault {
  #secret = "x";
  reveal() {
    return this.#secret;
  }
}`, notes: [{ at: "#secret", text: "private at run time too" }] }
          ]
        }
      ]
    },
    {
      id: "functions-overloads",
      n: 8,
      title: "functions & overloads",
      concepts: [
        {
          id: "function-types", n: 1, title: "function types", level: 1,
          gloss: "Types parameters, return values and function values.",
          examples: [
            { code: `function add(a: number, b: number): number {
  return a + b;
}`, notes: [{ at: ": number", text: "the return type" }] },
            { code: `const greet = (name: string): string => \`hi \${name}\`;`, notes: [] },
            { code: `let op: (a: number, b: number) => number;
op = (a, b) => a * b;`, notes: [{ at: "(a, b) =>", text: "parameter types come from op" }] }
          ]
        },
        {
          id: "optional-default-rest", n: 2, title: "optional, default and rest", level: 1,
          gloss: "Declares optional, default and rest parameters.",
          examples: [
            { code: `function f(a: number, b?: number) {
  return a + (b ?? 0);
}`, notes: [{ at: "b?", text: "may be omitted" }] },
            { code: `function g(name = "world") {
  return \`hello \${name}\`;
}`, notes: [{ at: "name = \"world\"", text: "the type is inferred as string" }] },
            { code: `function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}`, notes: [{ at: "...nums", text: "a rest parameter is an array" }] }
          ]
        },
        {
          id: "overloads", n: 3, title: "overloads", level: 3,
          gloss: "Declares several call signatures for one function.",
          examples: [
            { code: `function parse(x: string): number;
function parse(x: number): string;
function parse(x: string | number) {
  return typeof x === "string" ? Number(x) : String(x);
}`, notes: [{ at: "string | number)", text: "the implementation signature is hidden" }] },
            { code: `function pick(n: 1): string;
function pick(n: 2): number;
function pick(n: 1 | 2): string | number {
  return n === 1 ? "one" : 2;
}`, notes: [] },
            { code: `interface Make {
  (x: string): Date;
  (x: number): Date;
}`, notes: [{ at: "(x: string): Date", text: "a call signature" }] }
          ]
        },
        {
          id: "this-callbacks", n: 4, title: "this and callbacks", level: 3,
          gloss: "Types this and callback parameters.",
          examples: [
            { code: `function handler(this: HTMLElement, e: Event) {
  this.classList.add("on");
}`, notes: [{ at: "this: HTMLElement", text: "a fake first parameter" }] },
            { code: `function run(cb: () => void) {
  cb();
}
run(() => 42);`, notes: [{ at: "() => void", text: "return values are ignored" }] },
            { code: `type Mapper<T, U> = (item: T, index: number) => U;
const len: Mapper<string, number> = (s) => s.length;`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "mapped-conditional",
      n: 9,
      title: "mapped & conditional types",
      concepts: [
        {
          id: "keyof-typeof", n: 1, title: "keyof and typeof", level: 2,
          gloss: "Derives types from objects with keyof and typeof.",
          examples: [
            { code: `const user = { name: "ada", age: 36 };
type Key = keyof typeof user;`, notes: [{ at: "keyof typeof user", text: "\"name\" | \"age\"" }] },
            { code: `interface User {
  id: number;
  name: string;
}
type Keys = keyof User;`, notes: [] },
            { code: `interface User {
  id: number;
  name: string;
}
type Id = User["id"];`, notes: [{ at: "User[\"id\"]", text: "an indexed access type" }] }
          ]
        },
        {
          id: "mapped-types", n: 2, title: "mapped types", level: 3,
          gloss: "Transforms every property of a type with a mapped type.",
          examples: [
            { code: `type Flags<T> = { [K in keyof T]: boolean };`, notes: [{ at: "[K in keyof T]", text: "loops over the keys" }] },
            { code: `type Frozen<T> = { readonly [K in keyof T]: T[K] };`, notes: [{ at: "T[K]", text: "keeps each original type" }] },
            { code: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};`, notes: [{ at: "as `get", text: "renames each key" }] }
          ]
        },
        {
          id: "conditional-types", n: 3, title: "conditional types", level: 3,
          gloss: "Chooses a type with extends and a question mark.",
          examples: [
            { code: `type IsString<T> = T extends string ? true : false;
type A = IsString<"x">;`, notes: [{ at: "T extends string ?", text: "a type-level if" }] },
            { code: `type Flatten<T> = T extends (infer U)[] ? U : T;
type N = Flatten<number[]>;`, notes: [{ at: "infer U", text: "captures a type from the match" }] },
            { code: `type NonNull<T> = T extends null | undefined ? never : T;`, notes: [] }
          ]
        },
        {
          id: "distributive-conditionals", n: 4, title: "distributive conditionals", level: 3,
          gloss: "Applies a conditional type to each member of a union.",
          examples: [
            { code: `type ToArray<T> = T extends unknown ? T[] : never;
type R = ToArray<string | number>;`, notes: [{ at: "R", text: "string[] | number[]" }] },
            { code: `type Strings<T> = T extends string ? T : never;
type S = Strings<"a" | 1 | "b">;`, notes: [{ at: "never", text: "drops the non-matching members" }] },
            { code: `type Wrap<T> = [T] extends [unknown] ? T[] : never;`, notes: [{ at: "[T]", text: "wrapping stops the distribution" }] }
          ]
        }
      ]
    },
    {
      id: "type-guards",
      n: 10,
      title: "type guards",
      concepts: [
        {
          id: "user-defined-guards", n: 1, title: "user-defined guards", level: 2,
          gloss: "Writes a function that narrows with a type predicate.",
          examples: [
            { code: `interface Cat {
  meow(): void;
}
function isCat(x: unknown): x is Cat {
  return typeof x === "object" && x !== null && "meow" in x;
}`, notes: [{ at: "x is Cat", text: "a type predicate" }] },
            { code: `function isString(x: unknown): x is string {
  return typeof x === "string";
}`, notes: [] },
            { code: `function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}
const vals = [1, undefined, 3].filter(isDefined);`, notes: [{ at: "filter(isDefined)", text: "removes undefined from the type" }] }
          ]
        },
        {
          id: "assertion-functions", n: 2, title: "assertion functions", level: 3,
          gloss: "Throws unless a condition holds, and narrows afterwards.",
          examples: [
            { code: `function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(msg);
}`, notes: [{ at: "asserts cond", text: "narrows after the call" }] },
            { code: `function assertString(x: unknown): asserts x is string {
  if (typeof x !== "string") throw new TypeError("not a string");
}`, notes: [] },
            { code: `declare function assertDefined<T>(x: T | undefined): asserts x is T;
let v: string | undefined;
assertDefined(v);
v.length;`, notes: [{ at: "assertDefined(v)", text: "v is a string below" }] }
          ]
        },
        {
          id: "narrowing-unknown", n: 3, title: "narrowing unknown data", level: 3,
          gloss: "Narrows arrays and objects of unknown data with guards.",
          examples: [
            { code: `function isNumArray(x: unknown): x is number[] {
  return Array.isArray(x) && x.every((n) => typeof n === "number");
}`, notes: [{ at: "every", text: "checks each element" }] },
            { code: `const raw: unknown = JSON.parse("[1,2]");
if (Array.isArray(raw)) {
  console.log(raw.length);
}`, notes: [] },
            { code: `function hasName(o: object): o is { name: string } {
  return "name" in o;
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "as-const-satisfies",
      n: 11,
      title: "as const & satisfies",
      concepts: [
        {
          id: "as-const", n: 1, title: "as const", level: 2,
          gloss: "Freezes literals into their narrowest readonly types.",
          examples: [
            { code: `const point = { x: 1, y: 2 } as const;`, notes: [{ at: "as const", text: "properties become readonly literals" }] },
            { code: `let mode = "dark" as const;`, notes: [{ at: "\"dark\"", text: "the type is \"dark\", not string" }] },
            { code: `const routes = { home: "/", about: "/about" } as const;
type Path = (typeof routes)[keyof typeof routes];`, notes: [] }
          ]
        },
        {
          id: "satisfies", n: 2, title: "satisfies", level: 3,
          gloss: "Checks a value against a type without widening it.",
          examples: [
            { code: `type Colors = Record<string, string | number[]>;
const c = { red: "#f00", green: [0, 255, 0] } satisfies Colors;
const r = c.red.toUpperCase();`, notes: [{ at: "satisfies", text: "keeps red as a string" }] },
            { code: `const cfg = { port: 80, host: "x" } satisfies {
  port: number;
  host: string;
};`, notes: [{ at: "satisfies", text: "an error if the shape is wrong" }] },
            { code: `const sizes = ["sm", "md"] as const satisfies readonly string[];`, notes: [] }
          ]
        },
        {
          id: "const-type-params", n: 3, title: "const type parameters", level: 3,
          gloss: "Infers literal types for arguments with const type parameters.",
          examples: [
            { code: `function tuple<const T extends readonly unknown[]>(x: T): T {
  return x;
}
const t = tuple([1, "a"]);`, notes: [{ at: "const T", text: "infers a readonly tuple" }] },
            { code: `function names<const T extends readonly string[]>(...xs: T): T {
  return xs;
}`, notes: [] },
            { code: `function def<const T>(x: T) {
  return x;
}
const o = def({ a: 1 });`, notes: [{ at: "o", text: "{ readonly a: 1 }" }] }
          ]
        }
      ]
    },
    {
      id: "template-literal-types",
      n: 12,
      title: "template literal types",
      concepts: [
        {
          id: "template-literal-basics", n: 1, title: "template literal basics", level: 2,
          gloss: "Builds string types from other string types.",
          examples: [
            { code: `type Event = \`on\${"click" | "hover"}\`;`, notes: [{ at: "${\"click\"", text: "onclick | onhover" }] },
            { code: `type Id = \`user-\${number}\`;
const id: Id = "user-42";`, notes: [{ at: "${number}", text: "any numeric text" }] },
            { code: `type Px = \`\${number}px\`;
const w: Px = "12px";`, notes: [] }
          ]
        },
        {
          id: "intrinsic-string-types", n: 2, title: "intrinsic string types", level: 3,
          gloss: "Transforms literal types with Uppercase, Lowercase and Capitalize.",
          examples: [
            { code: `type Up = Uppercase<"abc">;`, notes: [{ at: "Uppercase", text: "\"ABC\"" }] },
            { code: `type Cap = Capitalize<"name">;`, notes: [{ at: "Capitalize", text: "\"Name\"" }] },
            { code: `type Handler<T extends string> = \`on\${Capitalize<T>}\`;
type H = Handler<"click">;`, notes: [{ at: "H", text: "\"onClick\"" }] }
          ]
        },
        {
          id: "template-mapped", n: 3, title: "templates with mapped types", level: 3,
          gloss: "Combines template literals with mapped and conditional types.",
          examples: [
            { code: `type Getters<T> = {
  [K in keyof T & string as \`get\${Capitalize<K>}\`]: () => T[K];
};`, notes: [{ at: "keyof T & string", text: "only string keys" }] },
            { code: `type Split<S extends string> =
  S extends \`\${infer A}.\${infer B}\` ? [A, B] : [S];
type P = Split<"a.b">;`, notes: [{ at: "infer A", text: "captures text before the dot" }] },
            { code: `type Prefixed<T> = {
  [K in keyof T as \`x_\${string & K}\`]: T[K];
};`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "modules-declarations",
      n: 13,
      title: "modules & declaration files",
      concepts: [
        {
          id: "import-export-types", n: 1, title: "importing and exporting types", level: 1,
          gloss: "Imports and exports types alongside values.",
          examples: [
            { code: `export interface User {
  name: string;
}
export const defaultUser: User = { name: "ada" };`, notes: [{ at: "export interface", text: "types export like values" }] },
            { code: `import type { User } from "./user";
const u: User = { name: "ada" };`, notes: [{ at: "import type", text: "erased at compile time" }] },
            { code: `import { type User, makeUser } from "./user";`, notes: [{ at: "type User", text: "an inline type-only import" }] }
          ]
        },
        {
          id: "declaration-files", n: 2, title: "declaration files", level: 2,
          gloss: "Describes untyped JavaScript with declare statements.",
          examples: [
            { code: `declare const VERSION: string;`, notes: [{ at: "declare", text: "types only, emits nothing" }] },
            { code: `declare function greet(name: string): string;`, notes: [] },
            { code: `declare module "legacy-lib" {
  export function run(x: number): void;
}`, notes: [{ at: "declare module", text: "types for a package with none" }] }
          ]
        },
        {
          id: "declaration-merging", n: 3, title: "augmentation", level: 3,
          gloss: "Extends global or existing types with declaration merging.",
          examples: [
            { code: `declare global {
  interface Window {
    appName: string;
  }
}
export {};`, notes: [{ at: "declare global", text: "adds to the global scope" }] },
            { code: `interface User {
  name: string;
}
interface User {
  age: number;
}
const u: User = { name: "ada", age: 36 };`, notes: [{ at: "interface User", text: "declarations merge", nth: 1 }] },
            { code: `export {};

declare global {
  interface Array<T> {
    last(): T | undefined;
  }
}`, notes: [{ at: "Array<T>", text: "every array gains this method" }] }
          ]
        }
      ]
    },
    {
      id: "async-types",
      n: 14,
      title: "async types",
      concepts: [
        {
          id: "promise-types", n: 1, title: "Promise types", level: 1,
          gloss: "Types asynchronous results with Promise<T>.",
          examples: [
            { code: `async function getNum(): Promise<number> {
  return 42;
}`, notes: [{ at: "Promise<number>", text: "a number that arrives later" }] },
            { code: `const p: Promise<string> = Promise.resolve("a");`, notes: [] },
            { code: `function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}`, notes: [{ at: "Promise<void>", text: "completion, no value" }] }
          ]
        },
        {
          id: "awaited-types", n: 2, title: "Awaited", level: 2,
          gloss: "Unwraps promise types with Awaited.",
          examples: [
            { code: `type T = Awaited<Promise<string>>;`, notes: [{ at: "Awaited", text: "string" }] },
            { code: `async function load() {
  return { id: 1 };
}
type Loaded = Awaited<ReturnType<typeof load>>;`, notes: [{ at: "Awaited<ReturnType<typeof load>>", text: "the resolved type" }] },
            { code: `type Nested = Awaited<Promise<Promise<number>>>;`, notes: [{ at: "Nested", text: "unwraps every layer" }] }
          ]
        },
        {
          id: "typed-fetch", n: 3, title: "typed fetch", level: 2,
          gloss: "Types fetched JSON by describing its shape.",
          examples: [
            { code: `interface Todo {
  id: number;
  title: string;
}
async function getTodo(): Promise<Todo> {
  const res = await fetch("/todo/1");
  return res.json();
}`, notes: [{ at: "Promise<Todo>", text: "res.json() is any, so this is trusted" }] },
            { code: `async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return (await res.json()) as T;
}`, notes: [{ at: "as T", text: "an assertion, not a run-time check" }] },
            { code: `const data: unknown = await (await fetch("/x")).json();`, notes: [{ at: "unknown", text: "forces a check before use" }] }
          ]
        },
        {
          id: "promise-combinator-types", n: 4, title: "combinator types", level: 3,
          gloss: "Types the results of Promise.all and Promise.allSettled.",
          examples: [
            { code: `const tasks = [Promise.resolve(1), Promise.resolve("a")] as const;
const [n, s] = await Promise.all(tasks);`, notes: [{ at: "as const", text: "keeps a tuple of different types" }] },
            { code: `const results = await Promise.allSettled([Promise.resolve(1)]);
for (const r of results) {
  if (r.status === "fulfilled") console.log(r.value);
}`, notes: [{ at: "r.status", text: "narrows to fulfilled or rejected" }] },
            { code: `async function race(): Promise<string | number> {
  return Promise.race([Promise.resolve("a"), Promise.resolve(1)]);
}`, notes: [] }
          ]
        },
        {
          id: "async-iterables", n: 5, title: "async iterables", level: 3,
          gloss: "Types async generators and for await loops.",
          examples: [
            { code: `async function* count(): AsyncGenerator<number> {
  yield 1;
  yield 2;
}`, notes: [{ at: "AsyncGenerator<number>", text: "yields numbers over time" }] },
            { code: `async function* lines(): AsyncGenerator<string, void, undefined> {
  yield "a";
}`, notes: [] },
            { code: `async function sum(it: AsyncIterable<number>) {
  let t = 0;
  for await (const n of it) t += n;
  return t;
}`, notes: [{ at: "AsyncIterable", text: "anything for await accepts" }] }
          ]
        }
      ]
    }
  ]
};
