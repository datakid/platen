export default {
  id: "rust",
  name: "Rust",
  short: "RS",
  pigment: "rust",
  family: null,
  version: "2024",
  lexer: "rust",
  indent: 4,
  topics: [
    {
      id: "bindings-mutability",
      n: 1,
      title: "bindings & mutability",
      concepts: [
        {
          id: "let-bindings", n: 1, title: "let bindings", level: 1,
          gloss: "Binds a name to a value with let.",
          examples: [
            { code: `let count = 3;
let name = "ada";
let pi: f64 = 3.14159;`, notes: [{ at: "pi: f64", text: "an explicit type annotation" }] },
            { code: `let (x, y) = (3, 4);
println!("{x} {y}");`, notes: [{ at: "(x, y)", text: "destructures the tuple" }] },
            { code: `let total = 10;
let total = total * 2;
println!("{total}");`, notes: [{ at: "let total", text: "shadows the earlier binding", nth: 1 }] }
          ]
        },
        {
          id: "mutability", n: 2, title: "mutable bindings", level: 1,
          gloss: "Marks a binding mutable so it can be reassigned.",
          examples: [
            { code: `let mut count = 0;
count += 1;
println!("{count}");`, notes: [{ at: "mut", text: "bindings are immutable by default" }] },
            { code: `let mut names = Vec::new();
names.push("ada");
names.push("grace");`, notes: [{ at: "mut names", text: "needed to call push" }] },
            { code: `let mut buffer = String::new();
buffer.push_str("log: ");
buffer.push_str("ready");`, notes: [] }
          ]
        },
        {
          id: "constants-statics", n: 3, title: "const and static", level: 2,
          gloss: "Declares values that are fixed for the whole program.",
          examples: [
            { code: `const MAX_USERS: u32 = 100;`, notes: [{ at: "u32", text: "constants always need a type" }] },
            { code: `const SECONDS_PER_DAY: u64 = 24 * 60 * 60;`, notes: [{ at: "24 * 60 * 60", text: "evaluated at compile time" }] },
            { code: `static GREETING: &str = "hello";`, notes: [{ at: "static", text: "one fixed address in memory" }] }
          ]
        },
        {
          id: "shadowing", n: 4, title: "shadowing", level: 1,
          gloss: "Reuses a name for a new value, even one of a different type.",
          examples: [
            { code: `let spaces = "   ";
let spaces = spaces.len();`, notes: [{ at: "spaces.len()", text: "now a usize" }] },
            { code: `let input = "42";
let input: i32 = input.parse().unwrap();`, notes: [{ at: ".parse()", text: "the annotation picks the type" }] },
            { code: `let data = vec![3, 1, 2];
let mut data = data;
data.sort();`, notes: [{ at: "let mut data", text: "shadowing can add mut" }] }
          ]
        }
      ]
    },
    {
      id: "scalar-compound-types",
      n: 2,
      title: "scalar & compound types",
      concepts: [
        {
          id: "integers-floats", n: 1, title: "integers and floats", level: 1,
          gloss: "Picks a numeric type for whole numbers and fractions.",
          examples: [
            { code: `let age: u8 = 36;
let delta: i64 = -42;
let ratio: f32 = 0.5;`, notes: [{ at: "u8", text: "unsigned, 0 to 255" }] },
            { code: `let big = 1_000_000u64;
let hex = 0xff;
let bits = 0b1010;`, notes: [{ at: "1_000_000u64", text: "underscores group digits" }] },
            { code: `let x = 7_i32;
let y = 2.0_f64;
let z = x as f64 / y;`, notes: [{ at: "x as f64", text: "numeric casts are explicit" }] }
          ]
        },
        {
          id: "bool-char", n: 2, title: "bool and char", level: 1,
          gloss: "Holds true or false values and single Unicode characters.",
          examples: [
            { code: `let ready: bool = true;
let done = !ready;`, notes: [] },
            { code: `let letter = 'a';
let digit = '7';
let is_alpha = letter.is_alphabetic();`, notes: [{ at: "'a'", text: "char takes single quotes" }] },
            { code: `let n = 9;
let even = n % 2 == 0;
let big = n > 5 && even;`, notes: [] }
          ]
        },
        {
          id: "tuples", n: 3, title: "tuples", level: 1,
          gloss: "Groups a fixed number of values of different types.",
          examples: [
            { code: `let point = (3, 4.5, "label");
let y = point.1;`, notes: [{ at: "point.1", text: "fields are numbered from 0" }] },
            { code: `let pair = (1, "one");
let (id, word) = pair;
println!("{id} {word}");`, notes: [] },
            { code: `fn min_max(v: &[i32]) -> (i32, i32) {
    (*v.iter().min().unwrap(), *v.iter().max().unwrap())
}`, notes: [{ at: "-> (i32, i32)", text: "returns two values at once" }] }
          ]
        },
        {
          id: "arrays", n: 4, title: "arrays", level: 1,
          gloss: "Stores a fixed-size sequence of values of one type.",
          examples: [
            { code: `let days = [31, 28, 31, 30];
let first = days[0];`, notes: [{ at: "days[0]", text: "bounds-checked at run time" }] },
            { code: `let zeros = [0u8; 16];`, notes: [{ at: "; 16", text: "repeat the value 16 times" }] },
            { code: `let names: [&str; 3] = ["ada", "grace", "linus"];
let n = names.len();`, notes: [{ at: "[&str; 3]", text: "the length is part of the type" }] }
          ]
        }
      ]
    },
    {
      id: "ownership-moves",
      n: 3,
      title: "ownership & moves",
      concepts: [
        {
          id: "move-semantics", n: 1, title: "moves", level: 1,
          gloss: "Transfers ownership of a value when you assign or pass it.",
          examples: [
            { code: `let a = String::from("hi");
let b = a;
println!("{b}");`, notes: [{ at: "let b = a", text: "a is moved and unusable" }] },
            { code: `fn consume(s: String) {
    println!("{s}");
}

let name = String::from("ada");
consume(name);`, notes: [{ at: "consume(name)", text: "ownership enters the function" }] },
            { code: `let names = vec![String::from("a"), String::from("b")];
let moved = names;
println!("{}", moved.len());`, notes: [] }
          ]
        },
        {
          id: "clone", n: 2, title: "clone", level: 1,
          gloss: "Copies heap data explicitly so both values stay usable.",
          examples: [
            { code: `let a = String::from("hi");
let b = a.clone();
println!("{a} {b}");`, notes: [{ at: ".clone()", text: "a full copy of the heap data" }] },
            { code: `let original = vec![1, 2, 3];
let mut copy = original.clone();
copy.push(4);`, notes: [] },
            { code: `#[derive(Clone)]
struct Config {
    name: String,
}

let base = Config { name: "dev".into() };
let other = base.clone();`, notes: [{ at: "#[derive(Clone)]", text: "generates the clone method" }] }
          ]
        },
        {
          id: "copy-types", n: 3, title: "Copy types", level: 1,
          gloss: "Copies small stack values instead of moving them.",
          examples: [
            { code: `let a = 5;
let b = a;
println!("{a} {b}");`, notes: [{ at: "let b = a", text: "integers implement Copy" }] },
            { code: `#[derive(Clone, Copy)]
struct Point {
    x: i32,
    y: i32,
}

let p = Point { x: 1, y: 2 };
let q = p;`, notes: [{ at: "Copy", text: "only if every field is Copy" }] },
            { code: `let pair = (1, 'x');
let again = pair;
println!("{} {}", pair.0, again.1);`, notes: [{ at: "(1, 'x')", text: "tuples of Copy types are Copy" }] }
          ]
        },
        {
          id: "drop", n: 4, title: "drop", level: 2,
          gloss: "Frees a value automatically when its owner goes out of scope.",
          examples: [
            { code: `{
    let temp = String::from("scratch");
    println!("{temp}");
}`, notes: [{ at: "}", text: "temp is dropped here", nth: 1 }] },
            { code: `struct Guard(&'static str);

impl Drop for Guard {
    fn drop(&mut self) {
        println!("release {}", self.0);
    }
}
let _g = Guard("lock");`, notes: [{ at: "impl Drop", text: "runs when the value is dropped" }] },
            { code: `let data = vec![1, 2, 3];
drop(data);`, notes: [{ at: "drop(data)", text: "ends the value early" }] }
          ]
        }
      ]
    },
    {
      id: "borrowing",
      n: 4,
      title: "borrowing",
      concepts: [
        {
          id: "shared-refs", n: 1, title: "shared references", level: 1,
          gloss: "Reads a value through a reference without taking ownership.",
          examples: [
            { code: `fn length(s: &String) -> usize {
    s.len()
}

let name = String::from("ada");
println!("{}", length(&name));`, notes: [{ at: "&name", text: "a borrow, name stays valid" }] },
            { code: `let nums = vec![1, 2, 3];
let first = &nums[0];
println!("{first}");`, notes: [] },
            { code: `let text = String::from("hello");
let a = &text;
let b = &text;
println!("{a} {b}");`, notes: [{ at: "&text", text: "any number of shared borrows" }] }
          ]
        },
        {
          id: "mutable-refs", n: 2, title: "mutable references", level: 1,
          gloss: "Edits a value through a unique mutable reference.",
          examples: [
            { code: `fn add_dot(s: &mut String) {
    s.push('.');
}

let mut word = String::from("hi");
add_dot(&mut word);`, notes: [{ at: "&mut word", text: "only one &mut at a time" }] },
            { code: `let mut scores = vec![10, 20];
let list = &mut scores;
list.push(30);`, notes: [] },
            { code: `fn double_all(v: &mut Vec<i32>) {
    for n in v.iter_mut() {
        *n *= 2;
    }
}`, notes: [{ at: "*n", text: "deref to write through" }] }
          ]
        },
        {
          id: "borrow-rules", n: 3, title: "borrow rules", level: 2,
          gloss: "Allows many readers or one writer, never both at once.",
          examples: [
            { code: `let mut s = String::from("hi");
let r = &s;
println!("{r}");
s.push('x');`, notes: [{ at: "s.push('x')", text: "fine, r is no longer used" }] },
            { code: `let mut data = vec![1, 2, 3];
{
    let first = &mut data[0];
    *first = 9;
}
data.push(4);`, notes: [{ at: "&mut data[0]", text: "the borrow ends with the block" }] },
            { code: `let mut v = vec![1, 2, 3];
let len = v.len();
v.push(len as i32);`, notes: [{ at: "v.len()", text: "a short shared borrow" }] }
          ]
        },
        {
          id: "slices", n: 4, title: "slices", level: 1,
          gloss: "Borrows a contiguous part of a collection or string.",
          examples: [
            { code: `let nums = [1, 2, 3, 4, 5];
let mid = &nums[1..4];`, notes: [{ at: "1..4", text: "start included, end excluded" }] },
            { code: `let s = String::from("hello world");
let hello = &s[..5];
let world = &s[6..];`, notes: [{ at: "..5", text: "from the start" }] },
            { code: `fn first_word(s: &str) -> &str {
    s.split(' ').next().unwrap_or("")
}`, notes: [{ at: "-> &str", text: "borrows from the input" }] }
          ]
        }
      ]
    },
    {
      id: "string-str",
      n: 5,
      title: "String & &str",
      concepts: [
        {
          id: "string-creation", n: 1, title: "creating strings", level: 1,
          gloss: "Creates owned, growable text with String.",
          examples: [
            { code: `let a = String::new();
let b = String::from("hi");
let c = "hi".to_string();`, notes: [] },
            { code: `let owned: String = "ada".into();
let empty = String::with_capacity(32);`, notes: [{ at: "with_capacity", text: "reserves space up front" }] },
            { code: `let s = "lovelace".to_owned();
let upper = s.to_uppercase();`, notes: [{ at: "to_uppercase", text: "returns a new String" }] }
          ]
        },
        {
          id: "str-slices", n: 2, title: "string slices", level: 1,
          gloss: "Views text as a borrowed &str without copying it.",
          examples: [
            { code: `let greeting: &str = "hello";
let n = greeting.len();`, notes: [{ at: "&str", text: "a view into UTF-8 bytes" }] },
            { code: `let owned = String::from("hello");
let view: &str = &owned;`, notes: [{ at: "&owned", text: "string coerces to &str" }] },
            { code: `fn shout(s: &str) -> String {
    s.to_uppercase()
}

shout("hi");
shout(&String::from("hi"));`, notes: [{ at: "s: &str", text: "accepts literals and Strings" }] }
          ]
        },
        {
          id: "string-building", n: 3, title: "building strings", level: 2,
          gloss: "Appends to a String with push, push_str, plus and format.",
          examples: [
            { code: `let mut s = String::from("rust");
s.push('-');
s.push_str("lang");`, notes: [] },
            { code: `let a = String::from("hello ");
let b = String::from("world");
let c = a + &b;`, notes: [{ at: "a + &b", text: "a moves, b is borrowed" }] },
            { code: `let name = "ada";
let age = 36;
let line = format!("{name} is {age}");`, notes: [{ at: "format!", text: "builds a String, moves nothing" }] }
          ]
        },
        {
          id: "string-methods", n: 4, title: "string methods", level: 2,
          gloss: "Handles text with str methods such as trim, split and contains.",
          examples: [
            { code: `let line = "  key=value  ";
let clean = line.trim();
let parts: Vec<&str> = clean.split('=').collect();`, notes: [{ at: ".collect()", text: "gathers the pieces into a Vec" }] },
            { code: `let text = "one two three";
let words: Vec<&str> = text.split_whitespace().collect();
let has = text.contains("two");`, notes: [] },
            { code: `let path = "src/main.rs";
if let Some((dir, file)) = path.rsplit_once('/') {
    println!("{dir} {file}");
}`, notes: [{ at: "rsplit_once", text: "splits at the last separator" }] }
          ]
        },
        {
          id: "chars-bytes", n: 5, title: "chars and bytes", level: 2,
          gloss: "Iterates text by characters or by raw bytes.",
          examples: [
            { code: `let word = "rust";
for c in word.chars() {
    println!("{c}");
}`, notes: [{ at: "chars()", text: "unicode scalar values" }] },
            { code: `let word = "rust";
let bytes = word.as_bytes();
let first = bytes[0];`, notes: [{ at: "as_bytes()", text: "raw UTF-8 bytes" }] },
            { code: `let word = "hello";
let count = word.chars().count();
let rev: String = word.chars().rev().collect();`, notes: [{ at: "chars().count()", text: "counts characters, not bytes" }] }
          ]
        }
      ]
    },
    {
      id: "structs-impl",
      n: 6,
      title: "structs & impl",
      concepts: [
        {
          id: "struct-definition", n: 1, title: "defining structs", level: 1,
          gloss: "Defines a named record type with typed fields.",
          examples: [
            { code: `struct User {
    name: String,
    age: u32,
    active: bool,
}`, notes: [] },
            { code: `struct Point(f64, f64);

let origin = Point(0.0, 0.0);`, notes: [{ at: "Point(f64, f64)", text: "a tuple struct" }] },
            { code: `struct Celsius(f64);

let temp = Celsius(21.5);
let value = temp.0;`, notes: [{ at: "Celsius(f64)", text: "a newtype wrapper" }] }
          ]
        },
        {
          id: "struct-instances", n: 2, title: "creating instances", level: 1,
          gloss: "Builds a struct value and reads or updates its fields.",
          examples: [
            { code: `struct User {
    name: String,
    age: u32,
}

let mut user = User { name: "ada".into(), age: 36 };
user.age += 1;`, notes: [{ at: "user.age += 1", text: "needs a mut binding" }] },
            { code: `struct Point {
    x: i32,
    y: i32,
}

let x = 3;
let y = 4;
let p = Point { x, y };`, notes: [{ at: "{ x, y }", text: "shorthand when names match" }] },
            { code: `struct Config {
    host: String,
    port: u16,
}

let base = Config { host: "localhost".into(), port: 80 };
let dev = Config { port: 8080, ..base };`, notes: [{ at: "..base", text: "fills the rest from base" }] }
          ]
        },
        {
          id: "impl-methods", n: 3, title: "methods", level: 1,
          gloss: "Attaches methods to a type with an impl block.",
          examples: [
            { code: `struct Rect {
    w: f64,
    h: f64,
}

impl Rect {
    fn area(&self) -> f64 {
        self.w * self.h
    }
}`, notes: [{ at: "&self", text: "borrows the instance" }] },
            { code: `struct Counter {
    count: u32,
}

impl Counter {
    fn increment(&mut self) {
        self.count += 1;
    }
}`, notes: [{ at: "&mut self", text: "may modify the instance" }] },
            { code: `struct Token(String);

impl Token {
    fn into_inner(self) -> String {
        self.0
    }
}`, notes: [{ at: "(self)", text: "takes ownership of the instance" }] }
          ]
        },
        {
          id: "associated-functions", n: 4, title: "associated functions", level: 1,
          gloss: "Defines constructors and helpers that need no instance.",
          examples: [
            { code: `struct Circle {
    r: f64,
}

impl Circle {
    fn new(r: f64) -> Self {
        Self { r }
    }
}`, notes: [{ at: "-> Self", text: "an alias for Circle" }] },
            { code: `struct Celsius(f64);

impl Celsius {
    fn freezing() -> Self {
        Celsius(0.0)
    }
}`, notes: [{ at: "fn freezing", text: "no self: call as Celsius::freezing()" }] },
            { code: `#[derive(Default)]
struct Config {
    retries: u32,
    verbose: bool,
}

let cfg = Config::default();`, notes: [{ at: "#[derive(Default)]", text: "zero values for every field" }] }
          ]
        }
      ]
    },
    {
      id: "enums",
      n: 7,
      title: "enums",
      concepts: [
        {
          id: "enum-definition", n: 1, title: "defining enums", level: 1,
          gloss: "Declares a type that is exactly one of several variants.",
          examples: [
            { code: `enum Direction {
    North,
    South,
    East,
    West,
}

let heading = Direction::North;`, notes: [{ at: "Direction::North", text: "variants live in the enum's namespace" }] },
            { code: `enum Status {
    Active,
    Suspended,
    Closed,
}

let s = Status::Closed;`, notes: [] },
            { code: `#[derive(Debug, PartialEq)]
enum Level {
    Low,
    High,
}

assert_eq!(Level::Low, Level::Low);
println!("{:?}", Level::High);`, notes: [{ at: "Debug", text: "enables {:?} printing" }] }
          ]
        },
        {
          id: "enum-data", n: 2, title: "variants with data", level: 2,
          gloss: "Attaches data to each variant of an enum.",
          examples: [
            { code: `enum Shape {
    Circle(f64),
    Rect(f64, f64),
    Empty,
}

let s = Shape::Rect(2.0, 3.0);`, notes: [{ at: "Circle(f64)", text: "a variant holding one value" }] },
            { code: `enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}`, notes: [{ at: "Move { x: i32, y: i32 }", text: "a struct-like variant" }] },
            { code: `enum Event {
    Click { x: u32, y: u32 },
    Key(char),
}

let e = Event::Key('q');`, notes: [] }
          ]
        },
        {
          id: "enum-methods", n: 3, title: "enum methods", level: 2,
          gloss: "Adds behavior to an enum with an impl block.",
          examples: [
            { code: `enum Light { Red, Green }

impl Light {
    fn next(self) -> Light {
        match self {
            Light::Red => Light::Green,
            Light::Green => Light::Red,
        }
    }
}`, notes: [{ at: "match self", text: "one arm per variant" }] },
            { code: `enum Coin { Penny, Dime }

impl Coin {
    fn cents(&self) -> u32 {
        match self {
            Coin::Penny => 1,
            Coin::Dime => 10,
        }
    }
}`, notes: [] },
            { code: `enum Shape { Circle(f64), Square(f64) }

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r) => 3.14 * r * r,
            Shape::Square(s) => s * s,
        }
    }
}`, notes: [{ at: "Circle(r)", text: "binds the data inside" }] }
          ]
        },
        {
          id: "enum-discriminants", n: 4, title: "discriminants", level: 3,
          gloss: "Assigns integer values to variants and casts them.",
          examples: [
            { code: `enum Color {
    Red = 1,
    Green = 2,
    Blue = 4,
}

let n = Color::Green as i32;`, notes: [{ at: "as i32", text: "reads the discriminant" }] },
            { code: `#[repr(u8)]
enum Op {
    Add = b'+',
    Sub = b'-',
}`, notes: [{ at: "#[repr(u8)]", text: "fixes the size to one byte" }] },
            { code: `enum Weekday {
    Mon,
    Tue,
    Wed,
}

let index = Weekday::Wed as usize;`, notes: [{ at: "Weekday::Wed as usize", text: "counts from 0 when unset" }] }
          ]
        }
      ]
    },
    {
      id: "match-if-let",
      n: 8,
      title: "match & if let",
      concepts: [
        {
          id: "match-basics", n: 1, title: "match", level: 1,
          gloss: "Branches on a value by testing it against patterns.",
          examples: [
            { code: `let n = 3;
match n {
    1 => println!("one"),
    2 | 3 => println!("few"),
    _ => println!("many"),
}`, notes: [{ at: "2 | 3", text: "either value" }, { at: "_", text: "the catch-all arm" }] },
            { code: `let grade = 'B';
let msg = match grade {
    'A' => "top",
    'B' | 'C' => "pass",
    _ => "retry",
};`, notes: [{ at: "let msg = match", text: "match is an expression" }] },
            { code: `let n = 42;
let size = match n {
    0 => "zero",
    1..=9 => "small",
    10..=99 => "medium",
    _ => "large",
};`, notes: [{ at: "1..=9", text: "an inclusive range pattern" }] }
          ]
        },
        {
          id: "match-guards", n: 2, title: "match guards", level: 2,
          gloss: "Adds an if condition to a match arm.",
          examples: [
            { code: `let n = 7;
match n {
    x if x % 2 == 0 => println!("even"),
    _ => println!("odd"),
}`, notes: [{ at: "if x % 2 == 0", text: "the guard must also hold" }] },
            { code: `let pair = (3, -3);
match pair {
    (x, y) if x + y == 0 => println!("opposites"),
    (x, _) if x % 2 == 1 => println!("odd x"),
    _ => println!("other"),
}`, notes: [] },
            { code: `let temp = 31;
let label = match temp {
    t if t < 0 => "freezing",
    t if t > 30 => "hot",
    _ => "mild",
};`, notes: [] }
          ]
        },
        {
          id: "destructuring-patterns", n: 3, title: "destructuring", level: 2,
          gloss: "Pulls fields out of structs, tuples and enums inside patterns.",
          examples: [
            { code: `struct Point {
    x: i32,
    y: i32,
}

let p = Point { x: 0, y: 7 };
let Point { x, y } = p;`, notes: [{ at: "Point { x, y }", text: "binds both fields" }] },
            { code: `let p = (0, 5);
match p {
    (0, y) => println!("on the y axis at {y}"),
    (x, 0) => println!("on the x axis at {x}"),
    (x, y) => println!("at {x},{y}"),
}`, notes: [{ at: "(0, y)", text: "a literal and a binding" }] },
            { code: `enum Shape {
    Circle(f64),
    Rect(f64, f64),
}

let s = Shape::Rect(2.0, 3.0);
match s {
    Shape::Circle(r) => println!("{r}"),
    Shape::Rect(w, h) => println!("{w}x{h}"),
}`, notes: [] }
          ]
        },
        {
          id: "if-let", n: 4, title: "if let", level: 1,
          gloss: "Matches one pattern and ignores everything else.",
          examples: [
            { code: `let maybe = Some(5);
if let Some(n) = maybe {
    println!("got {n}");
}`, notes: [{ at: "if let", text: "a match with one arm" }] },
            { code: `let maybe: Option<i32> = None;
if let Some(n) = maybe {
    println!("{n}");
} else {
    println!("empty");
}`, notes: [] },
            { code: `enum Cmd {
    Go(u32),
    Stop,
}

let cmd = Cmd::Go(3);
if let Cmd::Go(n) = cmd {
    println!("{n}");
}`, notes: [] }
          ]
        },
        {
          id: "let-else", n: 5, title: "let else", level: 2,
          gloss: "Binds a pattern or leaves the scope when it does not match.",
          examples: [
            { code: `let args: Vec<String> = Vec::new();
let Some(first) = args.first() else {
    return;
};`, notes: [{ at: "else", text: "must return, break or panic" }] },
            { code: `fn parse(s: &str) -> Option<i32> {
    let Ok(n) = s.parse::<i32>() else {
        return None;
    };
    Some(n * 2)
}`, notes: [] },
            { code: `let text = "k=v";
let Some((key, value)) = text.split_once('=') else {
    panic!("no equals sign");
};`, notes: [{ at: "panic!", text: "diverging also satisfies else" }] }
          ]
        },
        {
          id: "while-let", n: 6, title: "while let", level: 2,
          gloss: "Loops as long as a pattern keeps matching.",
          examples: [
            { code: `let mut stack = vec![1, 2, 3];
while let Some(top) = stack.pop() {
    println!("{top}");
}`, notes: [{ at: "while let", text: "stops when pop returns None" }] },
            { code: `let mut it = "a,b,c".split(',');
while let Some(part) = it.next() {
    println!("{part}");
}`, notes: [] },
            { code: `let mut queue = std::collections::VecDeque::from([1, 2]);
while let Some(job) = queue.pop_front() {
    println!("{job}");
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "option",
      n: 9,
      title: "Option",
      concepts: [
        {
          id: "option-basics", n: 1, title: "Option values", level: 1,
          gloss: "Represents a value that may be absent with Some or None.",
          examples: [
            { code: `let found: Option<i32> = Some(3);
let missing: Option<i32> = None;`, notes: [] },
            { code: `fn find_even(nums: &[i32]) -> Option<i32> {
    nums.iter().copied().find(|n| n % 2 == 0)
}`, notes: [{ at: "-> Option<i32>", text: "the caller must handle None" }] },
            { code: `let names = vec!["ada", "grace"];
let first = names.first();
let tenth = names.get(10);`, notes: [{ at: "get(10)", text: "returns None, never panics" }] }
          ]
        },
        {
          id: "option-unwrapping", n: 2, title: "unwrapping", level: 1,
          gloss: "Extracts the value from an Option with a default or a panic.",
          examples: [
            { code: `let port: Option<u16> = None;
let p = port.unwrap_or(8080);`, notes: [{ at: "unwrap_or", text: "falls back to a default" }] },
            { code: `let name: Option<String> = None;
let n = name.unwrap_or_default();`, notes: [{ at: "unwrap_or_default", text: "uses the type's default" }] },
            { code: `let first = Some(2);
let v = first.expect("need a first item");`, notes: [{ at: "expect", text: "panics with this message on None" }] }
          ]
        },
        {
          id: "option-combinators", n: 3, title: "combinators", level: 2,
          gloss: "Transforms an Option without unwrapping it.",
          examples: [
            { code: `let len = Some("hello").map(|s| s.len());`, notes: [{ at: ".map", text: "runs only when Some" }] },
            { code: `let n = Some(4).and_then(|x| if x > 3 { Some(x * 2) } else { None });`, notes: [{ at: "and_then", text: "the closure returns an Option" }] },
            { code: `let name: Option<&str> = Some("ada");
let upper = name.filter(|s| s.len() > 2).map(|s| s.to_uppercase());`, notes: [{ at: ".filter", text: "turns Some into None on false" }] }
          ]
        },
        {
          id: "question-mark-option", n: 4, title: "question mark", level: 2,
          gloss: "Returns None early from a function with the ? operator.",
          examples: [
            { code: `fn first_char(s: &str) -> Option<char> {
    let c = s.chars().next()?;
    Some(c.to_ascii_uppercase())
}`, notes: [{ at: "?", text: "returns None right here" }] },
            { code: `fn second(v: &[i32]) -> Option<i32> {
    let n = v.get(1)?;
    Some(*n)
}`, notes: [] },
            { code: `fn domain(email: &str) -> Option<&str> {
    let (_, rest) = email.split_once('@')?;
    Some(rest)
}`, notes: [] }
          ]
        },
        {
          id: "option-conversions", n: 5, title: "conversions", level: 3,
          gloss: "Converts between Option, references and Result.",
          examples: [
            { code: `let name: Option<String> = Some("ada".into());
let len = name.as_ref().map(|s| s.len());`, notes: [{ at: "as_ref()", text: "borrows instead of moving" }] },
            { code: `let mut slot = Some(3);
let taken = slot.take();`, notes: [{ at: "take()", text: "leaves None behind" }] },
            { code: `let id: Option<u32> = None;
let r: Result<u32, String> = id.ok_or("missing id".to_string());`, notes: [{ at: "ok_or", text: "turns None into an Err" }] }
          ]
        }
      ]
    },
    {
      id: "result-question",
      n: 10,
      title: "Result & ?",
      concepts: [
        {
          id: "result-basics", n: 1, title: "Result values", level: 1,
          gloss: "Represents success or failure with Ok and Err.",
          examples: [
            { code: `fn half(n: i32) -> Result<i32, String> {
    if n % 2 == 0 {
        Ok(n / 2)
    } else {
        Err(format!("{n} is odd"))
    }
}`, notes: [] },
            { code: `let r: Result<i32, _> = "42".parse::<i32>();
match r {
    Ok(n) => println!("{n}"),
    Err(e) => println!("bad: {e}"),
}`, notes: [{ at: "Err(e)", text: "carries the reason" }] },
            { code: `let ok: Result<u8, String> = Ok(1);
let bad: Result<u8, String> = Err("nope".into());
println!("{} {}", ok.is_ok(), bad.is_err());`, notes: [] }
          ]
        },
        {
          id: "question-mark", n: 2, title: "question mark", level: 1,
          gloss: "Propagates an error to the caller with the ? operator.",
          examples: [
            { code: `fn read_number(s: &str) -> Result<i32, std::num::ParseIntError> {
    let n = s.trim().parse::<i32>()?;
    Ok(n)
}`, notes: [{ at: "?", text: "returns the Err to the caller" }] },
            { code: `use std::fs;
use std::io;

fn load(path: &str) -> Result<String, io::Error> {
    let text = fs::read_to_string(path)?;
    Ok(text.trim().to_string())
}`, notes: [] },
            { code: `fn sum(a: &str, b: &str) -> Result<i32, std::num::ParseIntError> {
    Ok(a.parse::<i32>()? + b.parse::<i32>()?)
}`, notes: [{ at: "a.parse::<i32>()?", text: "either failure returns early" }] }
          ]
        },
        {
          id: "result-combinators", n: 3, title: "combinators", level: 2,
          gloss: "Transforms and recovers from errors without a match.",
          examples: [
            { code: `let n: Result<i32, _> = "7".parse::<i32>();
let doubled = n.map(|v| v * 2);`, notes: [] },
            { code: `let n = "x".parse::<i32>().unwrap_or(0);`, notes: [{ at: "unwrap_or(0)", text: "falls back on any error" }] },
            { code: `let r = "5".parse::<i32>().map_err(|e| format!("bad number: {e}"));`, notes: [{ at: "map_err", text: "changes the error type" }] }
          ]
        },
        {
          id: "main-result", n: 4, title: "main returning Result", level: 2,
          gloss: "Lets main return a Result so ? works at the top level.",
          examples: [
            { code: `fn main() -> Result<(), Box<dyn std::error::Error>> {
    let n: i32 = "42".parse()?;
    println!("{n}");
    Ok(())
}`, notes: [{ at: "Box<dyn std::error::Error>", text: "any error type fits" }] },
            { code: `use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let text = std::fs::read_to_string("notes.txt")?;
    println!("{}", text.len());
    Ok(())
}`, notes: [] },
            { code: `use std::num::ParseIntError;

fn main() -> Result<(), ParseIntError> {
    let n = "17".parse::<i32>()?;
    println!("{}", n + 1);
    Ok(())
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "traits",
      n: 11,
      title: "traits",
      concepts: [
        {
          id: "trait-definition", n: 1, title: "defining traits", level: 1,
          gloss: "Declares shared behavior that different types can implement.",
          examples: [
            { code: `trait Speak {
    fn speak(&self) -> String;
}`, notes: [{ at: "&self", text: "every implementor provides this" }] },
            { code: `trait Shape {
    fn area(&self) -> f64;
    fn name(&self) -> String {
        String::from("shape")
    }
}`, notes: [{ at: "String::from(\"shape\")", text: "a default body, optional to override" }] },
            { code: `trait Named {
    const KIND: &'static str;
    fn id(&self) -> u32;
}`, notes: [{ at: "const KIND", text: "traits can require constants" }] }
          ]
        },
        {
          id: "impl-trait", n: 2, title: "implementing traits", level: 1,
          gloss: "Implements a trait for a type with impl Trait for Type.",
          examples: [
            { code: `trait Speak { fn speak(&self) -> String; }
struct Dog;

impl Speak for Dog {
    fn speak(&self) -> String {
        String::from("woof")
    }
}`, notes: [{ at: "impl Speak for Dog", text: "the trait first, then the type" }] },
            { code: `struct Point {
    x: i32,
    y: i32,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}`, notes: [{ at: "fmt::Display", text: "gives the type to_string()" }] },
            { code: `struct Meters(f64);

impl From<f64> for Meters {
    fn from(v: f64) -> Self {
        Meters(v)
    }
}`, notes: [{ at: "From<f64>", text: "also gives you .into()" }] }
          ]
        },
        {
          id: "derive-traits", n: 3, title: "derive", level: 1,
          gloss: "Generates common trait implementations with derive.",
          examples: [
            { code: `#[derive(Debug, Clone, PartialEq)]
struct User {
    name: String,
}

let u = User { name: "ada".into() };
println!("{:?}", u);`, notes: [{ at: "Debug", text: "enables {:?} printing" }] },
            { code: `#[derive(PartialEq, Eq, Hash)]
struct Id(u32);

let mut seen = HashSet::new();
seen.insert(Id(1));`, notes: [{ at: "Hash", text: "required for set and map keys" }] },
            { code: `#[derive(PartialOrd, Ord, PartialEq, Eq)]
struct Version(u32, u32);

let newer = Version(1, 2) < Version(1, 10);`, notes: [{ at: "PartialOrd, Ord", text: "compares fields in order" }] }
          ]
        },
        {
          id: "trait-objects", n: 4, title: "trait objects", level: 2,
          gloss: "Stores different types behind one trait with dyn.",
          examples: [
            { code: `trait Speak { fn speak(&self) -> String; }
struct Dog;
impl Speak for Dog {
    fn speak(&self) -> String {
        "woof".into()
    }
}

let pets: Vec<Box<dyn Speak>> = vec![Box::new(Dog)];`, notes: [{ at: "dyn Speak", text: "resolved at run time" }] },
            { code: `fn show(item: &dyn fmt::Display) -> String {
    format!("<{item}>")
}`, notes: [{ at: "&dyn", text: "any type that implements Display" }] },
            { code: `fn greeter(formal: bool) -> Box<dyn Fn(&str) -> String> {
    if formal {
        Box::new(|n| format!("Good day, {n}"))
    } else {
        Box::new(|n| format!("hi {n}"))
    }
}`, notes: [{ at: "Box<dyn Fn", text: "each branch has its own closure type" }] }
          ]
        },
        {
          id: "impl-trait-args", n: 5, title: "impl Trait", level: 2,
          gloss: "Accepts or returns any type that implements a trait.",
          examples: [
            { code: `fn print_all(items: impl Iterator<Item = u32>) {
    for i in items {
        println!("{i}");
    }
}`, notes: [{ at: "impl Iterator", text: "any iterator of u32" }] },
            { code: `fn evens(limit: u32) -> impl Iterator<Item = u32> {
    (0..limit).filter(|n| n % 2 == 0)
}`, notes: [{ at: "-> impl", text: "hides the concrete type" }] },
            { code: `fn log(msg: impl AsRef<str>) {
    println!("{}", msg.as_ref());
}`, notes: [{ at: "AsRef<str>", text: "takes &str or String" }] }
          ]
        }
      ]
    },
    {
      id: "generics-bounds",
      n: 12,
      title: "generics & bounds",
      concepts: [
        {
          id: "generic-functions", n: 1, title: "generic functions", level: 2,
          gloss: "Writes one function that works for many types.",
          examples: [
            { code: `fn largest<T: PartialOrd + Copy>(items: &[T]) -> T {
    let mut max = items[0];
    for &i in items {
        if i > max {
            max = i;
        }
    }
    max
}`, notes: [{ at: "T: PartialOrd + Copy", text: "must be comparable and copyable" }] },
            { code: `fn swap<A, B>(pair: (A, B)) -> (B, A) {
    (pair.1, pair.0)
}`, notes: [{ at: "<A, B>", text: "two independent type parameters" }] },
            { code: `fn first<T>(items: &[T]) -> Option<&T> {
    items.first()
}`, notes: [] }
          ]
        },
        {
          id: "generic-structs", n: 2, title: "generic structs", level: 2,
          gloss: "Declares a struct that holds a type chosen by the user.",
          examples: [
            { code: `struct Wrapper<T> {
    value: T,
}

let w = Wrapper { value: 5 };`, notes: [{ at: "Wrapper<T>", text: "the type comes from the value" }] },
            { code: `struct Pair<A, B> {
    first: A,
    second: B,
}

let p = Pair { first: 1, second: "one" };`, notes: [] },
            { code: `struct Wrapper<T> {
    value: T,
}

impl<T> Wrapper<T> {
    fn get(&self) -> &T {
        &self.value
    }
}`, notes: [{ at: "impl<T>", text: "declare T before using it" }] }
          ]
        },
        {
          id: "trait-bounds", n: 3, title: "trait bounds", level: 2,
          gloss: "Restricts a type parameter to types with certain behavior.",
          examples: [
            { code: `fn print_it<T: fmt::Display>(x: T) {
    println!("{x}");
}`, notes: [{ at: "T: fmt::Display", text: "x can be printed" }] },
            { code: `fn show<T, U>(a: T, b: U) -> String
where
    T: fmt::Display,
    U: fmt::Debug,
{
    format!("{a} {b:?}")
}`, notes: [{ at: "where", text: "bounds listed after the signature" }] },
            { code: `fn sum_all<T: std::iter::Sum<T> + Copy>(items: &[T]) -> T {
    items.iter().copied().sum()
}`, notes: [] }
          ]
        },
        {
          id: "generic-traits", n: 4, title: "associated types", level: 3,
          gloss: "Defines traits with associated types or type parameters.",
          examples: [
            { code: `trait Container {
    type Item;
    fn first(&self) -> Option<&Self::Item>;
}`, notes: [{ at: "type Item", text: "chosen by each implementor" }] },
            { code: `struct Counter {
    n: u32,
}

impl Iterator for Counter {
    type Item = u32;
    fn next(&mut self) -> Option<u32> {
        self.n += 1;
        if self.n <= 3 { Some(self.n) } else { None }
    }
}`, notes: [{ at: "type Item = u32", text: "what next() yields" }] },
            { code: `trait Convert<T> {
    fn convert(&self) -> T;
}

impl Convert<String> for i32 {
    fn convert(&self) -> String {
        format!("#{self}")
    }
}`, notes: [{ at: "Convert<T>", text: "one trait, many conversions" }] }
          ]
        }
      ]
    },
    {
      id: "lifetimes",
      n: 13,
      title: "lifetimes",
      concepts: [
        {
          id: "lifetime-annotations", n: 1, title: "lifetime annotations", level: 3,
          gloss: "Names how long references stay valid relative to each other.",
          examples: [
            { code: `fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}`, notes: [{ at: "'a", text: "the result lives as long as both inputs" }] },
            { code: `fn first<'a>(items: &'a [String]) -> &'a String {
    &items[0]
}`, notes: [] },
            { code: `fn pick<'a, 'b>(x: &'a str, _y: &'b str) -> &'a str {
    x
}`, notes: [{ at: "'b", text: "independent, unused in the result" }] }
          ]
        },
        {
          id: "struct-lifetimes", n: 2, title: "lifetimes in structs", level: 3,
          gloss: "Lets a struct hold references that outlive the struct.",
          examples: [
            { code: `struct Excerpt<'a> {
    text: &'a str,
}

let novel = String::from("Call me. Some years ago");
let first = novel.split('.').next().unwrap();
let e = Excerpt { text: first };`, notes: [{ at: "Excerpt<'a>", text: "cannot outlive the borrowed text" }] },
            { code: `struct Parser<'a> {
    input: &'a str,
    pos: usize,
}

impl<'a> Parser<'a> {
    fn new(input: &'a str) -> Self {
        Parser { input, pos: 0 }
    }
}`, notes: [{ at: "impl<'a>", text: "the lifetime is declared again" }] },
            { code: `struct Config<'a> {
    name: &'a str,
    tags: Vec<&'a str>,
}`, notes: [{ at: "Vec<&'a str>", text: "every borrow shares the lifetime" }] }
          ]
        },
        {
          id: "lifetime-elision", n: 3, title: "lifetime elision", level: 2,
          gloss: "Omits lifetimes where the compiler can infer them.",
          examples: [
            { code: `fn trim_start(s: &str) -> &str {
    s.trim_start()
}`, notes: [{ at: "-> &str", text: "one input, so the output matches it" }] },
            { code: `struct User {
    name: String,
}

impl User {
    fn name(&self) -> &str {
        &self.name
    }
}`, notes: [{ at: "&self", text: "the output borrows from self" }] },
            { code: `fn count(words: &[&str]) -> usize {
    words.len()
}`, notes: [] }
          ]
        },
        {
          id: "static-lifetime", n: 4, title: "static lifetime", level: 3,
          gloss: "Marks data that lives for the whole program with 'static.",
          examples: [
            { code: `let s: &'static str = "literal";`, notes: [{ at: "'static", text: "valid until the program ends" }] },
            { code: `static LABEL: &str = "ready";`, notes: [{ at: "&str", text: "'static is implied here" }] },
            { code: `fn leak_name(name: String) -> &'static str {
    Box::leak(name.into_boxed_str())
}`, notes: [{ at: "Box::leak", text: "never freed, so it is 'static" }] }
          ]
        }
      ]
    },
    {
      id: "closures",
      n: 14,
      title: "closures",
      concepts: [
        {
          id: "closure-syntax", n: 1, title: "closure syntax", level: 1,
          gloss: "Writes an anonymous function inline between pipes.",
          examples: [
            { code: `let add = |a, b| a + b;
let sum = add(2, 3);`, notes: [{ at: "|a, b|", text: "parameters sit between the pipes" }] },
            { code: `let square = |x: i32| -> i32 { x * x };`, notes: [{ at: "-> i32", text: "optional return type needs a block" }] },
            { code: `let greet = || println!("hello");
greet();`, notes: [] }
          ]
        },
        {
          id: "capturing", n: 2, title: "capturing variables", level: 2,
          gloss: "Captures variables from the surrounding scope.",
          examples: [
            { code: `let factor = 3;
let scale = |x| x * factor;
println!("{}", scale(5));`, notes: [{ at: "x * factor", text: "borrows factor from outside" }] },
            { code: `let mut count = 0;
let mut bump = || count += 1;
bump();
bump();`, notes: [{ at: "let mut bump", text: "mutating closures need mut" }] },
            { code: `let name = String::from("ada");
let show = move || println!("{name}");
show();`, notes: [{ at: "move", text: "the closure takes ownership of name" }] }
          ]
        },
        {
          id: "closure-params", n: 3, title: "closure parameters", level: 2,
          gloss: "Passes closures to functions as Fn, FnMut or FnOnce values.",
          examples: [
            { code: `fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 {
    f(x)
}`, notes: [{ at: "Fn", text: "can be called many times" }] },
            { code: `fn repeat<F: FnMut()>(mut f: F, times: u32) {
    for _ in 0..times {
        f();
    }
}`, notes: [{ at: "FnMut", text: "may change captured state" }] },
            { code: `fn run_once<F: FnOnce() -> String>(f: F) -> String {
    f()
}`, notes: [{ at: "FnOnce", text: "can consume what it captured" }] }
          ]
        },
        {
          id: "returning-closures", n: 4, title: "returning closures", level: 3,
          gloss: "Returns a closure from a function.",
          examples: [
            { code: `fn adder(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n
}`, notes: [{ at: "move", text: "n must outlive the function" }] },
            { code: `fn counter() -> impl FnMut() -> u32 {
    let mut n = 0;
    move || {
        n += 1;
        n
    }
}`, notes: [] },
            { code: `fn pick(double: bool) -> Box<dyn Fn(i32) -> i32> {
    if double {
        Box::new(|x| x * 2)
    } else {
        Box::new(|x| x + 1)
    }
}`, notes: [{ at: "Box<dyn Fn", text: "lets branches differ in type" }] }
          ]
        }
      ]
    },
    {
      id: "iterators",
      n: 15,
      title: "iterators",
      concepts: [
        {
          id: "iterator-basics", n: 1, title: "iterator basics", level: 1,
          gloss: "Walks a sequence one item at a time.",
          examples: [
            { code: `let nums = vec![1, 2, 3];
let mut it = nums.iter();
println!("{:?}", it.next());
println!("{:?}", it.next());`, notes: [{ at: "it.next()", text: "returns Some(item) until the end" }] },
            { code: `let words = vec!["a", "b"];
for w in words.iter() {
    println!("{w}");
}`, notes: [{ at: "iter()", text: "yields references" }] },
            { code: `let names = vec![String::from("a")];
for n in names.into_iter() {
    println!("{n}");
}`, notes: [{ at: "into_iter()", text: "consumes the vector" }] }
          ]
        },
        {
          id: "iterator-adapters", n: 2, title: "adapters", level: 2,
          gloss: "Transforms items lazily with map and filter.",
          examples: [
            { code: `let doubled: Vec<i32> = vec![1, 2, 3].iter().map(|n| n * 2).collect();`, notes: [{ at: ".map", text: "nothing runs until collect" }] },
            { code: `let evens: Vec<u32> = (1..10).filter(|n| n % 2 == 0).collect();`, notes: [{ at: "(1..10)", text: "a range is an iterator" }] },
            { code: `let words = vec!["hi", "there"];
let lens: Vec<usize> = words.iter().map(|w| w.len()).collect();`, notes: [] }
          ]
        },
        {
          id: "iterator-consumers", n: 3, title: "consumers", level: 2,
          gloss: "Collapses an iterator into one result.",
          examples: [
            { code: `let total: i32 = vec![1, 2, 3].iter().sum();`, notes: [{ at: "sum()", text: "the type annotation picks i32" }] },
            { code: `let longest = ["a", "abc", "ab"].iter().max_by_key(|s| s.len());`, notes: [{ at: "max_by_key", text: "returns an Option" }] },
            { code: `let found = (1..100).find(|n| n * n > 50);
let any = (1..5).any(|n| n == 3);`, notes: [{ at: "find", text: "stops at the first match" }] }
          ]
        },
        {
          id: "zip-enumerate", n: 4, title: "zip and enumerate", level: 2,
          gloss: "Pairs items with indexes or with items from another iterator.",
          examples: [
            { code: `for (i, name) in ["ada", "grace"].iter().enumerate() {
    println!("{i}: {name}");
}`, notes: [{ at: "enumerate()", text: "adds a 0-based index" }] },
            { code: `let names = ["ada", "grace"];
let ages = [36, 85];
let pairs: Vec<_> = names.iter().zip(ages.iter()).collect();`, notes: [{ at: "zip", text: "stops at the shorter side" }] },
            { code: `let letters = ['a', 'b', 'c'];
let indexed: Vec<(usize, char)> = letters
    .iter()
    .copied()
    .enumerate()
    .collect();`, notes: [] }
          ]
        },
        {
          id: "fold-collect", n: 5, title: "fold and collect", level: 3,
          gloss: "Builds a value with fold and gathers items into collections.",
          examples: [
            { code: `let sum = (1..=4).fold(0, |acc, n| acc + n);`, notes: [{ at: "|acc, n|", text: "acc carries the running result" }] },
            { code: `let set: HashSet<i32> = vec![1, 2, 2, 3].into_iter().collect();`, notes: [{ at: "HashSet<i32>", text: "collect builds whatever you name" }] },
            { code: `let words = ["a", "bb"];
let map: HashMap<&str, usize> = words
    .iter()
    .map(|s| (*s, s.len()))
    .collect();`, notes: [{ at: "(*s, s.len())", text: "pairs become key and value" }] }
          ]
        }
      ]
    },
    {
      id: "vec-hashmap",
      n: 16,
      title: "Vec & HashMap",
      concepts: [
        {
          id: "vec-basics", n: 1, title: "Vec basics", level: 1,
          gloss: "Grows and shrinks a list of values on the heap.",
          examples: [
            { code: `let mut v = vec![1, 2, 3];
v.push(4);
let last = v.pop();`, notes: [{ at: "v.pop()", text: "returns an Option" }] },
            { code: `let mut v: Vec<String> = Vec::new();
v.push("ada".to_string());
v.extend(["grace".to_string()]);`, notes: [] },
            { code: `let v = vec![10, 20, 30];
let first = v[0];
let maybe = v.get(5);`, notes: [{ at: "v[0]", text: "panics when out of range" }] }
          ]
        },
        {
          id: "vec-iteration", n: 2, title: "looping over a Vec", level: 1,
          gloss: "Loops over a Vec by reference, by mutable reference or by value.",
          examples: [
            { code: `let v = vec![1, 2, 3];
for n in &v {
    println!("{n}");
}`, notes: [{ at: "&v", text: "borrows, v stays usable" }] },
            { code: `let mut v = vec![1, 2, 3];
for n in &mut v {
    *n *= 2;
}`, notes: [{ at: "&mut v", text: "edit each item in place" }] },
            { code: `let v = vec![1, 2, 3];
for n in v {
    println!("{n}");
}`, notes: [{ at: "in v", text: "moves v into the loop" }] }
          ]
        },
        {
          id: "vec-methods", n: 3, title: "Vec methods", level: 2,
          gloss: "Reorders and trims a Vec in place with sort, retain and insert.",
          examples: [
            { code: `let mut v = vec![3, 1, 2];
v.sort();
v.reverse();`, notes: [] },
            { code: `let mut v = vec![1, 2, 3, 4];
v.retain(|n| n % 2 == 0);`, notes: [{ at: "retain", text: "keeps items where the closure is true" }] },
            { code: `let mut v = vec![1, 2, 3];
v.insert(1, 9);
v.remove(0);
v.truncate(2);`, notes: [] }
          ]
        },
        {
          id: "hashmap-basics", n: 4, title: "HashMap basics", level: 1,
          gloss: "Stores key-value pairs for fast lookup by key.",
          examples: [
            { code: `let mut ages = HashMap::new();
ages.insert("ada", 36);
ages.insert("grace", 85);`, notes: [{ at: "insert", text: "replaces an existing key" }] },
            { code: `let ages = HashMap::from([("ada", 36), ("grace", 85)]);
let a = ages.get("ada");`, notes: [{ at: "get", text: "returns Option<&V>" }] },
            { code: `let mut m = HashMap::new();
m.insert("a", 1);
m.remove("a");
let has = m.contains_key("a");`, notes: [] }
          ]
        },
        {
          id: "hashmap-entry", n: 5, title: "entry API", level: 2,
          gloss: "Inserts or updates a value in one step with the entry API.",
          examples: [
            { code: `let mut counts: HashMap<char, u32> = HashMap::new();
for c in "hello".chars() {
    *counts.entry(c).or_insert(0) += 1;
}`, notes: [{ at: "or_insert(0)", text: "the default for a new key" }] },
            { code: `let mut groups: HashMap<usize, Vec<&str>> = HashMap::new();
for w in ["a", "bb", "cc"] {
    groups.entry(w.len()).or_default().push(w);
}`, notes: [{ at: "or_default", text: "an empty Vec when missing" }] },
            { code: `let mut cache: HashMap<u32, String> = HashMap::new();
cache.entry(1).or_insert_with(|| "one".to_string());`, notes: [{ at: "or_insert_with", text: "builds the value only if missing" }] }
          ]
        },
        {
          id: "hashmap-iteration", n: 6, title: "iterating a HashMap", level: 2,
          gloss: "Iterates over keys, values or pairs of a HashMap.",
          examples: [
            { code: `let ages = HashMap::from([("ada", 36)]);
for (name, age) in &ages {
    println!("{name} {age}");
}`, notes: [{ at: "(name, age)", text: "each item is a pair" }] },
            { code: `let ages = HashMap::from([("ada", 36), ("grace", 85)]);
let total: i32 = ages.values().sum();`, notes: [{ at: "values()", text: "ignores the keys" }] },
            { code: `let mut ages = HashMap::from([("ada", 36)]);
for age in ages.values_mut() {
    *age += 1;
}`, notes: [{ at: "values_mut()", text: "edit values in place" }] }
          ]
        }
      ]
    },
    {
      id: "box-rc-refcell",
      n: 17,
      title: "Box, Rc, RefCell",
      concepts: [
        {
          id: "box", n: 1, title: "Box", level: 2,
          gloss: "Allocates a value on the heap behind a single owner.",
          examples: [
            { code: `let b = Box::new(5);
println!("{}", *b + 1);`, notes: [{ at: "*b", text: "deref to reach the value" }] },
            { code: `enum List {
    Cons(i32, Box<List>),
    Nil,
}

let list = List::Cons(1, Box::new(List::Nil));`, notes: [{ at: "Box<List>", text: "gives the recursive type a fixed size" }] },
            { code: `struct Node {
    val: i32,
    next: Option<Box<Node>>,
}`, notes: [{ at: "Option<Box<Node>>", text: "a link that may be empty" }] }
          ]
        },
        {
          id: "rc", n: 2, title: "Rc", level: 2,
          gloss: "Shares ownership of one value between several owners.",
          examples: [
            { code: `let a = Rc::new(String::from("shared"));
let b = Rc::clone(&a);
println!("{}", Rc::strong_count(&a));`, notes: [{ at: "Rc::clone", text: "bumps a counter, no deep copy" }] },
            { code: `let data = Rc::new(vec![1, 2, 3]);
let owner2 = Rc::clone(&data);
println!("{}", owner2.len());`, notes: [] },
            { code: `let a = Rc::new(5);
{
    let _b = Rc::clone(&a);
    println!("{}", Rc::strong_count(&a));
}
println!("{}", Rc::strong_count(&a));`, notes: [{ at: "Rc::strong_count", text: "back to 1 after the block", nth: 1 }] }
          ]
        },
        {
          id: "refcell", n: 3, title: "RefCell", level: 3,
          gloss: "Mutates data behind a shared reference, checked at run time.",
          examples: [
            { code: `let cell = RefCell::new(5);
*cell.borrow_mut() += 1;
println!("{}", cell.borrow());`, notes: [{ at: "borrow_mut()", text: "panics if already borrowed" }] },
            { code: `let log = RefCell::new(Vec::new());
log.borrow_mut().push("start");
log.borrow_mut().push("end");`, notes: [{ at: "log", text: "not declared mut" }] },
            { code: `let shared = Rc::new(RefCell::new(0));
let other = Rc::clone(&shared);
*other.borrow_mut() += 5;
println!("{}", shared.borrow());`, notes: [{ at: "Rc::new(RefCell::new(0))", text: "many owners that can all mutate" }] }
          ]
        },
        {
          id: "cell-type", n: 4, title: "Cell", level: 3,
          gloss: "Replaces Copy values through a shared reference with Cell.",
          examples: [
            { code: `let c = std::cell::Cell::new(1);
c.set(2);
println!("{}", c.get());`, notes: [{ at: "Cell", text: "no references, only get and set" }] },
            { code: `struct Counter {
    hits: std::cell::Cell<u32>,
}

impl Counter {
    fn hit(&self) {
        self.hits.set(self.hits.get() + 1);
    }
}`, notes: [{ at: "&self", text: "yet it can still update hits" }] },
            { code: `let a = std::cell::Cell::new(5);
let old = a.replace(6);`, notes: [{ at: "replace", text: "returns the previous value" }] }
          ]
        }
      ]
    },
    {
      id: "modules-visibility",
      n: 18,
      title: "modules & visibility",
      concepts: [
        {
          id: "mod-blocks", n: 1, title: "modules", level: 1,
          gloss: "Groups related items into a named module.",
          examples: [
            { code: `mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }
}

let n = math::add(1, 2);`, notes: [{ at: "pub", text: "visible outside the module" }] },
            { code: `mod shapes {
    pub struct Square(pub f64);
}

let s = shapes::Square(2.0);`, notes: [{ at: "pub f64", text: "the field is public too" }] },
            { code: `mod net {
    pub mod http {
        pub fn get() -> u16 {
            200
        }
    }
}

let code = net::http::get();`, notes: [] }
          ]
        },
        {
          id: "use-paths", n: 2, title: "use declarations", level: 1,
          gloss: "Brings names into scope with use.",
          examples: [
            { code: `use std::collections::HashMap;

let mut m: HashMap<&str, i32> = HashMap::new();`, notes: [{ at: "use", text: "no need to write the full path" }] },
            { code: `use std::io::{self, Write};

io::stdout().flush().unwrap();`, notes: [{ at: "{self, Write}", text: "a nested import list" }] },
            { code: `use std::collections::BTreeMap as Tree;

let t: Tree<i32, i32> = Tree::new();`, notes: [{ at: "as Tree", text: "renames the import" }] }
          ]
        },
        {
          id: "visibility", n: 3, title: "visibility", level: 2,
          gloss: "Controls what outside code can see with pub and its variants.",
          examples: [
            { code: `mod account {
    pub struct Account {
        pub owner: String,
        balance: i64,
    }
}`, notes: [{ at: "balance: i64", text: "private, no pub" }] },
            { code: `mod util {
    pub(crate) fn helper() {}
    fn internal() {}
}`, notes: [{ at: "pub(crate)", text: "visible inside this crate only" }] },
            { code: `mod outer {
    pub mod inner {
        pub(super) fn secret() {}
    }
}`, notes: [{ at: "pub(super)", text: "visible to the parent module" }] }
          ]
        },
        {
          id: "relative-paths", n: 4, title: "self, super and crate", level: 2,
          gloss: "Reaches items with self, super and crate paths.",
          examples: [
            { code: `mod calc {
    pub fn one() -> i32 {
        1
    }
    pub fn two() -> i32 {
        self::one() + 1
    }
}`, notes: [{ at: "self::", text: "this module" }] },
            { code: `fn helper() -> i32 {
    7
}

mod inner {
    pub fn call() -> i32 {
        super::helper()
    }
}`, notes: [{ at: "super::", text: "the parent module" }] },
            { code: `mod config {
    pub const PORT: u16 = 8080;
}

fn port() -> u16 {
    crate::config::PORT
}`, notes: [{ at: "crate::", text: "starts at the crate root" }] }
          ]
        },
        {
          id: "reexports", n: 5, title: "re-exports", level: 3,
          gloss: "Exposes a nested item under a shorter path with pub use.",
          examples: [
            { code: `mod shapes {
    pub mod circle {
        pub fn area(r: f64) -> f64 {
            3.14 * r * r
        }
    }
    pub use self::circle::area;
}`, notes: [{ at: "pub use", text: "callers write shapes::area" }] },
            { code: `mod api {
    mod internal {
        pub fn run() {}
    }
    pub use internal::run;
}`, notes: [{ at: "mod internal", text: "private, yet run is exposed" }] },
            { code: `mod prelude {
    pub use std::collections::HashMap;
    pub use std::rc::Rc;
}

use prelude::*;`, notes: [{ at: "prelude::*", text: "imports everything exported" }] }
          ]
        }
      ]
    },
    {
      id: "threads-sync",
      n: 19,
      title: "threads, Arc, Mutex, mpsc",
      concepts: [
        {
          id: "thread-spawn", n: 1, title: "spawning threads", level: 2,
          gloss: "Runs a closure on a new operating-system thread.",
          examples: [
            { code: `let handle = thread::spawn(|| {
    println!("in a thread");
});
handle.join().unwrap();`, notes: [{ at: "join()", text: "waits for the thread to finish" }] },
            { code: `let data = vec![1, 2, 3];
let handle = thread::spawn(move || data.iter().sum::<i32>());
let total = handle.join().unwrap();`, notes: [{ at: "move", text: "the thread owns data" }] },
            { code: `let handles: Vec<_> = (0..3)
    .map(|i| thread::spawn(move || i * 2))
    .collect();
for h in handles {
    println!("{}", h.join().unwrap());
}`, notes: [] }
          ]
        },
        {
          id: "arc-mutex", n: 2, title: "Arc and Mutex", level: 2,
          gloss: "Shares mutable state between threads with Arc and Mutex.",
          examples: [
            { code: `let counter = Arc::new(Mutex::new(0));
let c = Arc::clone(&counter);
thread::spawn(move || {
    *c.lock().unwrap() += 1;
});`, notes: [{ at: "lock()", text: "blocks until the lock is free" }] },
            { code: `let list = Arc::new(Mutex::new(Vec::new()));
{
    let mut guard = list.lock().unwrap();
    guard.push(1);
}`, notes: [{ at: "guard", text: "the lock releases at the block end" }] },
            { code: `let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];
for _ in 0..4 {
    let c = Arc::clone(&counter);
    handles.push(thread::spawn(move || *c.lock().unwrap() += 1));
}`, notes: [{ at: "Arc::clone", text: "one handle per thread" }] }
          ]
        },
        {
          id: "mpsc-channels", n: 3, title: "channels", level: 2,
          gloss: "Sends values between threads through a channel.",
          examples: [
            { code: `let (tx, rx) = mpsc::channel();
thread::spawn(move || {
    tx.send(42).unwrap();
});
println!("{}", rx.recv().unwrap());`, notes: [{ at: "(tx, rx)", text: "sender and receiver halves" }] },
            { code: `let (tx, rx) = mpsc::channel();
for id in 0..3 {
    let tx = tx.clone();
    thread::spawn(move || tx.send(id).unwrap());
}
drop(tx);
for got in rx {
    println!("{got}");
}`, notes: [{ at: "tx.clone()", text: "many producers, one receiver" }, { at: "drop(tx)", text: "lets the receiving loop end" }] },
            { code: `let (tx, rx) = mpsc::channel::<String>();
tx.send("job".to_string()).unwrap();
let msg = rx.try_recv();`, notes: [{ at: "try_recv", text: "returns at once, never blocks" }] }
          ]
        },
        {
          id: "scoped-threads", n: 4, title: "scoped threads", level: 3,
          gloss: "Borrows local data in threads that must finish inside a scope.",
          examples: [
            { code: `let mut nums = vec![1, 2, 3];
thread::scope(|s| {
    s.spawn(|| println!("{}", nums.len()));
});
nums.push(4);`, notes: [{ at: "thread::scope", text: "threads end before it returns" }] },
            { code: `let data = vec![1, 2, 3, 4];
let (left, right) = data.split_at(2);
thread::scope(|s| {
    s.spawn(|| println!("{}", left.iter().sum::<i32>()));
    s.spawn(|| println!("{}", right.iter().sum::<i32>()));
});`, notes: [{ at: "split_at(2)", text: "two disjoint borrows" }] },
            { code: `let mut total = 0;
thread::scope(|s| {
    s.spawn(|| total += 1);
});
println!("{total}");`, notes: [{ at: "|s|", text: "the scope handle spawns threads" }] }
          ]
        },
        {
          id: "atomics", n: 5, title: "atomics", level: 3,
          gloss: "Updates shared numbers across threads without a lock.",
          examples: [
            { code: `use std::sync::atomic::{AtomicUsize, Ordering};

static HITS: AtomicUsize = AtomicUsize::new(0);
HITS.fetch_add(1, Ordering::SeqCst);`, notes: [{ at: "fetch_add", text: "returns the old value" }] },
            { code: `use std::sync::atomic::{AtomicBool, Ordering};

let stop = Arc::new(AtomicBool::new(false));
stop.store(true, Ordering::Release);`, notes: [{ at: "AtomicBool", text: "a lock-free flag" }] },
            { code: `use std::sync::atomic::{AtomicU32, Ordering};

let n = AtomicU32::new(5);
n.store(6, Ordering::Relaxed);
let v = n.load(Ordering::Relaxed);`, notes: [{ at: "Relaxed", text: "no ordering guarantees" }] }
          ]
        }
      ]
    },
    {
      id: "error-types",
      n: 20,
      title: "error types",
      concepts: [
        {
          id: "custom-error-enum", n: 1, title: "error enums", level: 2,
          gloss: "Defines an error enum with one variant per failure.",
          examples: [
            { code: `#[derive(Debug)]
enum AppError {
    NotFound,
    Invalid(String),
}`, notes: [{ at: "Invalid(String)", text: "a variant carrying detail" }] },
            { code: `#[derive(Debug)]
enum ConfigError {
    Missing(&'static str),
    Parse { line: usize },
}`, notes: [] },
            { code: `#[derive(Debug)]
struct ValidationError {
    field: String,
    reason: String,
}`, notes: [{ at: "struct", text: "a single failure shape" }] }
          ]
        },
        {
          id: "error-display", n: 2, title: "Display and Error", level: 2,
          gloss: "Implements Display and Error so a type works as an error.",
          examples: [
            { code: `#[derive(Debug)]
struct ParseError;

impl fmt::Display for ParseError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "parse failed")
    }
}
impl std::error::Error for ParseError {}`, notes: [{ at: "impl std::error::Error", text: "an empty impl is enough" }] },
            { code: `#[derive(Debug)]
enum AppError {
    NotFound,
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::NotFound => write!(f, "not found"),
        }
    }
}`, notes: [] },
            { code: `#[derive(Debug)]
struct Timeout(u64);

impl fmt::Display for Timeout {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "timed out after {}s", self.0)
    }
}`, notes: [{ at: "write!", text: "writes into the formatter" }] }
          ]
        },
        {
          id: "from-conversion", n: 3, title: "From conversions", level: 2,
          gloss: "Converts other errors automatically so ? can wrap them.",
          examples: [
            { code: `#[derive(Debug)]
enum AppError {
    Parse(std::num::ParseIntError),
}

impl From<std::num::ParseIntError> for AppError {
    fn from(e: std::num::ParseIntError) -> Self {
        AppError::Parse(e)
    }
}`, notes: [{ at: "impl From", text: "lets ? convert the error" }] },
            { code: `#[derive(Debug)]
enum LoadError {
    Io(std::io::Error),
}

impl From<std::io::Error> for LoadError {
    fn from(e: std::io::Error) -> Self {
        LoadError::Io(e)
    }
}`, notes: [] },
            { code: `fn parse(s: &str) -> Result<i32, Box<dyn std::error::Error>> {
    let n: i32 = s.parse()?;
    Ok(n)
}`, notes: [{ at: "Box<dyn", text: "from turns any Error into a Box" }] }
          ]
        },
        {
          id: "boxed-errors", n: 4, title: "boxed errors", level: 3,
          gloss: "Returns Box<dyn Error> to accept any error type.",
          examples: [
            { code: `fn run() -> Result<(), Box<dyn std::error::Error>> {
    let n: i32 = "5".parse()?;
    let f = std::fs::read_to_string("a.txt")?;
    println!("{n} {f}");
    Ok(())
}`, notes: [{ at: "\"5\".parse()?", text: "different error types, one return type" }] },
            { code: `fn fail() -> Result<(), Box<dyn std::error::Error>> {
    Err("something broke".into())
}`, notes: [{ at: ".into()", text: "a &str becomes a boxed error" }] },
            { code: `let e: Box<dyn std::error::Error> = From::from("custom message");
println!("{e}");`, notes: [] }
          ]
        },
        {
          id: "mapping-errors", n: 5, title: "adding context", level: 2,
          gloss: "Adds context to errors with map_err and ok_or_else.",
          examples: [
            { code: `let n = "x".parse::<i32>().map_err(|e| format!("port: {e}"));`, notes: [{ at: "map_err", text: "rewrites only the Err side" }] },
            { code: `let list: Vec<i32> = vec![];
let v = list.first().copied().ok_or_else(|| "empty".to_string());`, notes: [{ at: "ok_or_else", text: "builds the error lazily" }] },
            { code: `let r: Result<i32, String> = "7"
    .parse::<i32>()
    .map_err(|e| e.to_string());`, notes: [] }
          ]
        }
      ]
    }
  ]
};
