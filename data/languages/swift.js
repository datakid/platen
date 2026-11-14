export default {
  id: "swift",
  name: "Swift",
  short: "SW",
  pigment: "swift",
  family: null,
  version: "6.x",
  lexer: "swift",
  indent: 4,
  topics: [
    {
      id: "let-var-types",
      n: 1,
      title: "let, var & types",
      concepts: [
        {
          id: "let-and-var", n: 1, title: "let and var", level: 1,
          gloss: "Binds a name to a value with let for constants or var for variables.",
          examples: [
            { code: `let city = "Oslo"
var visits = 0
visits += 1`, notes: [{ at: "let", text: "cannot be reassigned" }, { at: "var", text: "can be reassigned" }] },
            { code: `let limit = 10
var attempts = limit
attempts -= 1`, notes: [] },
            { code: `let names = ["ada", "grace"]
var current = names[0]
current = "linus"`, notes: [] }
          ]
        },
        {
          id: "types-and-inference", n: 2, title: "types and inference", level: 1,
          gloss: "Lets the compiler infer a type or states one after a colon.",
          examples: [
            { code: `let count: Int = 42
let price: Double = 9.99
let flag: Bool = true`, notes: [{ at: ": Int", text: "explicit type" }] },
            { code: `let ratio = 3 / 4
let exact = 3.0 / 4`, notes: [{ at: "3 / 4", text: "integer division gives 0" }] },
            { code: `let letter: Character = "k"
let tiny: UInt8 = 255
let big: Int64 = 3_000_000_000`, notes: [{ at: "UInt8", text: "0 to 255" }] }
          ]
        },
        {
          id: "numeric-conversion", n: 3, title: "numeric conversion", level: 1,
          gloss: "Converts between number types with explicit initializers.",
          examples: [
            { code: `let whole = 7
let half = Double(whole) / 2`, notes: [{ at: "Double(whole)", text: "no implicit widening" }] },
            { code: `let text = "42"
let n = Int(text)
let doubled = (n ?? 0) * 2`, notes: [{ at: "Int(text)", text: "optional, nil on bad input" }] },
            { code: `let total = Int8(100) + 20
let asDouble = Double(total)
let hex = 0xFF
let bits = 0b1010`, notes: [] }
          ]
        },
        {
          id: "tuples", n: 4, title: "tuples", level: 2,
          gloss: "Groups several values into one compound value.",
          examples: [
            { code: `let point = (3, 4)
let (x, y) = point`, notes: [{ at: "(x, y)", text: "decomposes the tuple" }] },
            { code: `let user = (name: "ada", age: 36)
print(user.name)`, notes: [{ at: "name:", text: "labelled element" }] },
            { code: `let status = (code: 404, message: "not found")
let (code, _) = status`, notes: [{ at: "_", text: "ignores an element" }] }
          ]
        }
      ]
    },
    {
      id: "strings",
      n: 2,
      title: "strings",
      concepts: [
        {
          id: "literals-and-interpolation", n: 1, title: "literals and interpolation", level: 1,
          gloss: "Builds strings from literals and embedded expressions with backslash parentheses.",
          examples: [
            { code: `let name = "ada"
let greeting = "Hello, \\(name)"
let total = "Sum: \\(2 + 3)"`, notes: [{ at: "\\(name)", text: "interpolation" }] },
            { code: `let item = "tea"
let qty = 3
let line = "\\(qty) x \\(item)"`, notes: [] },
            { code: `let note = "She said \\"hi\\""
let path = "C:\\\\temp\\\\logs"
let tabbed = "name\\tcity"`, notes: [{ at: "\\\\", text: "escaped backslash" }] }
          ]
        },
        {
          id: "multiline-and-raw", n: 2, title: "multiline and raw strings", level: 2,
          gloss: "Writes multiline text in triple quotes and raw text with hash delimiters.",
          examples: [
            { code: `let poem = """
    first line
    second line
    """`, notes: [{ at: "\"\"\"", text: "closing indent is stripped" }] },
            { code: `let winPath = #"C:\\temp\\logs"#
let quoted = #"say "hi""#`, notes: [{ at: "#\"C:", text: "raw, no escapes" }] },
            { code: `let user = "ada"
let letter = """
    Dear \\(user),
    welcome aboard.
    """`, notes: [] }
          ]
        },
        {
          id: "string-methods", n: 3, title: "string methods", level: 1,
          gloss: "Inspects and transforms strings with standard library members.",
          examples: [
            { code: `let title = "Quarterly Report"
let upper = title.uppercased()
let count = title.count`, notes: [{ at: "count", text: "number of characters" }] },
            { code: `let file = "report.final.pdf"
let isPdf = file.hasSuffix(".pdf")
let startsWell = file.hasPrefix("report")`, notes: [] },
            { code: `let csv = "ada,grace,linus"
let names = csv.split(separator: ",")
let joined = names.joined(separator: " | ")`, notes: [{ at: "split", text: "returns substrings" }] }
          ]
        },
        {
          id: "characters-and-indexing", n: 4, title: "characters and indexing", level: 2,
          gloss: "Reads characters with String.Index values instead of integers.",
          examples: [
            { code: `let word = "swift"
let first = word.first
let last = word.last`, notes: [{ at: "first", text: "optional Character" }] },
            { code: `let word = "banana"
let index = word.index(word.startIndex, offsetBy: 2)
let letter = word[index]`, notes: [{ at: "offsetBy", text: "index arithmetic" }] },
            { code: `let word = "stream"
let reversed = String(word.reversed())
let letters = Array(word)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "optionals",
      n: 3,
      title: "optionals",
      concepts: [
        {
          id: "declaring-optionals", n: 1, title: "declaring optionals", level: 1,
          gloss: "Represents a missing value with an optional type and nil.",
          examples: [
            { code: `var nickname: String? = nil
nickname = "ada"`, notes: [{ at: "String?", text: "value or nil" }] },
            { code: `let age = Int("42")
let broken = Int("x1")`, notes: [{ at: "Int(\"x1\")", text: "nil" }] },
            { code: `let users = ["ada": 36]
let found = users["ada"]
let missing = users["linus"]`, notes: [{ at: "users[\"linus\"]", text: "lookups are optional" }] }
          ]
        },
        {
          id: "unwrapping", n: 2, title: "if let and guard let", level: 1,
          gloss: "Unwraps optionals safely with if let and guard let.",
          examples: [
            { code: `let input: String? = "ada"
if let name = input {
    print(name.uppercased())
}`, notes: [{ at: "if let", text: "runs when non-nil" }] },
            { code: `func greet(_ name: String?) {
    guard let name else {
        print("anonymous")
        return
    }
    print("Hello, \\(name)")
}`, notes: [{ at: "guard let", text: "unwrapped for the rest" }] },
            { code: `let a: Int? = 3
let b: Int? = 4
if let a, let b {
    print(a + b)
}`, notes: [{ at: "if let a", text: "shorthand for a = a" }] }
          ]
        },
        {
          id: "coalescing-and-chaining", n: 3, title: "nil coalescing and optional chaining", level: 1,
          gloss: "Provides fallbacks with double question mark and chains calls with a question mark.",
          examples: [
            { code: `let name: String? = nil
let label = name ?? "guest"`, notes: [{ at: "??", text: "default when nil" }] },
            { code: `let name: String? = "ada"
let size = name?.count
let shout = name?.uppercased() ?? ""`, notes: [{ at: "?.", text: "stops at nil" }] },
            { code: `struct Profile {
    var email: String?
}
let profile: Profile? = Profile(email: "a@b.c")
let domain = profile?.email?.split(separator: "@").last`, notes: [] }
          ]
        },
        {
          id: "force-unwrapping", n: 4, title: "force unwrapping", level: 2,
          gloss: "Asserts a value is present with an exclamation mark or an implicitly unwrapped type.",
          examples: [
            { code: `let value: Int? = 5
let sure = value!`, notes: [{ at: "!", text: "crashes if nil" }] },
            { code: `let text = "7"
let number = Int(text)!`, notes: [] },
            { code: `class Screen {
    var title: String!
}`, notes: [{ at: "String!", text: "implicitly unwrapped" }] }
          ]
        }
      ]
    },
    {
      id: "control-flow-switch",
      n: 4,
      title: "control flow & switch",
      concepts: [
        {
          id: "conditionals", n: 1, title: "conditionals", level: 1,
          gloss: "Branches with if, else, the ternary operator and guard.",
          examples: [
            { code: `let temperature = 28
if temperature > 25 {
    print("warm")
} else if temperature > 10 {
    print("mild")
} else {
    print("cold")
}`, notes: [{ at: "temperature > 25", text: "no parentheses needed" }] },
            { code: `let score = 72
let grade = score >= 60 ? "pass" : "fail"`, notes: [{ at: "? \"pass\"", text: "ternary operator" }] },
            { code: `func describe(_ age: Int) -> String {
    guard age >= 0 else { return "invalid" }
    return age < 18 ? "minor" : "adult"
}`, notes: [{ at: "guard", text: "early exit" }] }
          ]
        },
        {
          id: "for-in-loops", n: 2, title: "for-in loops", level: 1,
          gloss: "Iterates over ranges, collections and indexed pairs.",
          examples: [
            { code: `for i in 1...3 {
    print(i)
}`, notes: [{ at: "1...3", text: "closed range" }] },
            { code: `for n in 1...10 where n % 3 == 0 {
    print(n)
}`, notes: [{ at: "where", text: "filters iterations" }] },
            { code: `for (index, name) in ["ada", "grace"].enumerated() {
    print("\\(index): \\(name)")
}`, notes: [{ at: "enumerated", text: "offset and element" }] }
          ]
        },
        {
          id: "while-and-repeat", n: 3, title: "while, repeat and loop control", level: 1,
          gloss: "Loops on a condition and controls iterations with break and continue.",
          examples: [
            { code: `var n = 3
while n > 0 {
    print(n)
    n -= 1
}`, notes: [] },
            { code: `var tries = 0
repeat {
    tries += 1
} while tries < 3`, notes: [{ at: "repeat", text: "body runs at least once" }] },
            { code: `for i in 1...10 {
    if i == 3 { continue }
    if i > 5 { break }
    print(i)
}`, notes: [{ at: "continue", text: "skips to the next iteration" }] }
          ]
        },
        {
          id: "switch-statements", n: 4, title: "switch statements", level: 2,
          gloss: "Matches values against cases, ranges and tuple patterns.",
          examples: [
            { code: `let code = 404
switch code {
case 200:
    print("ok")
case 404:
    print("not found")
default:
    print("other")
}`, notes: [{ at: "default", text: "required for coverage" }] },
            { code: `let score = 85
switch score {
case 90...100:
    print("A")
case 80..<90:
    print("B")
default:
    print("C")
}`, notes: [{ at: "80..<90", text: "half-open range" }] },
            { code: `let point = (2, 0)
switch point {
case (0, 0):
    print("origin")
case (_, 0):
    print("on x axis")
case let (x, y) where x == y:
    print("diagonal")
default:
    print("elsewhere")
}`, notes: [{ at: "where", text: "extra condition" }] }
          ]
        }
      ]
    },
    {
      id: "functions-labels",
      n: 5,
      title: "functions & labels",
      concepts: [
        {
          id: "functions", n: 1, title: "declaring functions", level: 1,
          gloss: "Defines functions with parameters and return types.",
          examples: [
            { code: `func square(_ n: Int) -> Int {
    return n * n
}`, notes: [{ at: "_", text: "no argument label" }] },
            { code: `func area(width: Double, height: Double) -> Double {
    width * height
}`, notes: [{ at: "width * height", text: "implicit return" }] },
            { code: `func log(_ message: String) {
    print("[log] \\(message)")
}`, notes: [] }
          ]
        },
        {
          id: "argument-labels", n: 2, title: "argument labels", level: 1,
          gloss: "Names arguments at the call site with external labels.",
          examples: [
            { code: `func move(from start: Int, to end: Int) -> Int {
    return end - start
}
let distance = move(from: 2, to: 9)`, notes: [{ at: "from start", text: "label then local name" }] },
            { code: `func greet(_ name: String, with greeting: String) -> String {
    return "\\(greeting), \\(name)"
}
let text = greet("ada", with: "Hello")`, notes: [] },
            { code: `func connect(host: String, port: Int) -> String {
    "\\(host):\\(port)"
}
let url = connect(host: "example.com", port: 80)`, notes: [{ at: "host:", text: "label equals the name" }] }
          ]
        },
        {
          id: "defaults-and-variadics", n: 3, title: "default values and variadics", level: 2,
          gloss: "Gives parameters defaults and accepts any number of arguments.",
          examples: [
            { code: `func pad(_ text: String, width: Int = 8) -> String {
    let gap = max(0, width - text.count)
    return String(repeating: " ", count: gap) + text
}`, notes: [{ at: "width: Int = 8", text: "default value" }] },
            { code: `func sum(_ numbers: Int...) -> Int {
    numbers.reduce(0, +)
}`, notes: [{ at: "Int...", text: "variadic parameter" }] },
            { code: `func dial(host: String, port: Int = 80, tls: Bool = false) -> String {
    "\\(host):\\(port) \\(tls)"
}`, notes: [] }
          ]
        },
        {
          id: "inout-and-tuples", n: 4, title: "inout parameters and tuple returns", level: 2,
          gloss: "Mutates arguments with inout and returns several values as a tuple.",
          examples: [
            { code: `func swapValues(_ a: inout Int, _ b: inout Int) {
    let temp = a
    a = b
    b = temp
}`, notes: [{ at: "inout", text: "caller passes &variable" }] },
            { code: `func minMax(_ values: [Int]) -> (min: Int, max: Int)? {
    guard let first = values.first else { return nil }
    return (values.reduce(first, min), values.reduce(first, max))
}`, notes: [] },
            { code: `func divide(_ a: Int, _ b: Int) -> (quotient: Int, remainder: Int) {
    (a / b, a % b)
}
let result = divide(17, 5)`, notes: [{ at: "(quotient: Int, remainder: Int)", text: "labelled tuple" }] }
          ]
        }
      ]
    },
    {
      id: "closures",
      n: 6,
      title: "closures",
      concepts: [
        {
          id: "closure-syntax", n: 1, title: "closure syntax", level: 1,
          gloss: "Writes unnamed functions in braces with the in keyword.",
          examples: [
            { code: `let doubler = { (n: Int) -> Int in
    return n * 2
}`, notes: [{ at: "in", text: "separates signature from body" }] },
            { code: `let greet = { (name: String) in
    print("Hello, \\(name)")
}
greet("ada")`, notes: [] },
            { code: `let add: (Int, Int) -> Int = { $0 + $1 }
let sum = add(2, 3)`, notes: [{ at: "$0 + $1", text: "shorthand arguments" }] }
          ]
        },
        {
          id: "trailing-closures", n: 2, title: "trailing closures and shorthand", level: 1,
          gloss: "Moves closures outside the parentheses and uses dollar-sign arguments.",
          examples: [
            { code: `let numbers = [1, 2, 3]
let doubled = numbers.map { $0 * 2 }`, notes: [{ at: "map", text: "trailing closure" }] },
            { code: `let names = ["grace", "ada", "linus"]
let sorted = names.sorted { $0 < $1 }`, notes: [] },
            { code: `let words = ["swift", "go", "rust"]
let long = words.filter { $0.count > 2 }`, notes: [] }
          ]
        },
        {
          id: "closures-as-parameters", n: 3, title: "closures as parameters", level: 2,
          gloss: "Accepts and returns closures through function types.",
          examples: [
            { code: `func apply(_ n: Int, using op: (Int) -> Int) -> Int {
    op(n)
}
let result = apply(4) { $0 * 3 }`, notes: [{ at: "(Int) -> Int", text: "function type" }] },
            { code: `func repeatAction(times: Int, action: () -> Void) {
    for _ in 0..<times { action() }
}
repeatAction(times: 2) { print("hi") }`, notes: [] },
            { code: `func makeAdder(_ n: Int) -> (Int) -> Int {
    return { $0 + n }
}
let addFive = makeAdder(5)`, notes: [] }
          ]
        },
        {
          id: "capturing-and-escaping", n: 4, title: "capturing and escaping", level: 3,
          gloss: "Captures outer values and marks stored closures as escaping.",
          examples: [
            { code: `func makeCounter() -> () -> Int {
    var count = 0
    return {
        count += 1
        return count
    }
}`, notes: [{ at: "count", text: "captured by reference" }] },
            { code: `final class Registry {
    var handlers: [() -> Void] = []
    func register(_ handler: @escaping () -> Void) {
        handlers.append(handler)
    }
}`, notes: [{ at: "@escaping", text: "outlives the call" }] },
            { code: `let prefix = "item"
let label = { (n: Int) in "\\(prefix) \\(n)" }`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "arrays-dictionaries-sets",
      n: 7,
      title: "arrays, dictionaries, sets",
      concepts: [
        {
          id: "arrays", n: 1, title: "arrays", level: 1,
          gloss: "Stores ordered values in an array.",
          examples: [
            { code: `var scores = [90, 72, 85]
scores.append(60)
let top = scores.max()`, notes: [{ at: "max", text: "optional result" }] },
            { code: `var names = ["ada", "grace"]
names.insert("linus", at: 0)
names.remove(at: 1)
print(names.count)`, notes: [{ at: "remove(at: 1)", text: "shifts later items" }] },
            { code: `let squares = (1...5).map { $0 * $0 }
let firstTwo = squares.prefix(2)`, notes: [] }
          ]
        },
        {
          id: "dictionaries", n: 2, title: "dictionaries", level: 1,
          gloss: "Maps keys to values with subscripts and iteration.",
          examples: [
            { code: `var stock = ["apple": 4, "pear": 0]
stock["plum"] = 7
let apples = stock["apple"]`, notes: [{ at: "stock[\"plum\"]", text: "adds or replaces" }] },
            { code: `var prices: [String: Double] = ["tea": 2.5]
prices["cake"] = 4.0
prices["tea"] = nil`, notes: [{ at: "= nil", text: "removes the key" }] },
            { code: `let ages = ["ada": 36, "linus": 54]
for (name, age) in ages {
    print("\\(name): \\(age)")
}`, notes: [] }
          ]
        },
        {
          id: "sets", n: 3, title: "sets", level: 1,
          gloss: "Keeps unique values and combines sets with set algebra.",
          examples: [
            { code: `var tags: Set = ["swift", "ios"]
tags.insert("swift")
tags.insert("mac")`, notes: [{ at: "insert", text: "ignores duplicates" }] },
            { code: `let a: Set = [1, 2, 3]
let b: Set = [3, 4]
let both = a.intersection(b)
let either = a.union(b)`, notes: [] },
            { code: `var seen = Set<Int>()
let inserted = seen.insert(7).inserted`, notes: [{ at: ".inserted", text: "false if present" }] }
          ]
        },
        {
          id: "transforming-collections", n: 4, title: "transforming collections", level: 2,
          gloss: "Transforms collections with sorted, filter, map and reduce.",
          examples: [
            { code: `let nums = [3, 1, 2]
let sorted = nums.sorted()
let total = nums.reduce(0, +)`, notes: [{ at: "reduce", text: "folds into one value" }] },
            { code: `let words = ["a", "", "b"]
let kept = words.filter { !$0.isEmpty }`, notes: [] },
            { code: `let names = ["ada", "grace"]
let lengths = names.map(\\.count)
let pairs = Dictionary(uniqueKeysWithValues: zip(names, lengths))`, notes: [{ at: "\\.count", text: "key path as a function" }] }
          ]
        }
      ]
    },
    {
      id: "structs",
      n: 8,
      title: "structs",
      concepts: [
        {
          id: "declaring-structs", n: 1, title: "declaring structs", level: 1,
          gloss: "Groups related values in a struct with a memberwise initializer.",
          examples: [
            { code: `struct User {
    var name: String
    var age: Int
}
let ada = User(name: "ada", age: 36)`, notes: [{ at: "User(name:", text: "memberwise init" }] },
            { code: `struct Point {
    var x = 0
    var y = 0
}
let origin = Point()`, notes: [{ at: "= 0", text: "default property value" }] },
            { code: `struct Rectangle {
    let width: Double
    let height: Double
}
let box = Rectangle(width: 3, height: 4)`, notes: [] }
          ]
        },
        {
          id: "methods-and-computed", n: 2, title: "methods and computed properties", level: 1,
          gloss: "Adds behaviour with methods and derived values with computed properties.",
          examples: [
            { code: `struct Circle {
    var radius: Double
    var area: Double {
        3.14159 * radius * radius
    }
}`, notes: [{ at: "area", text: "computed on each read" }] },
            { code: `struct Counter {
    var value = 0
    mutating func increment() {
        value += 1
    }
}`, notes: [{ at: "mutating", text: "allowed to change self" }] },
            { code: `struct Temperature {
    var celsius: Double
    func toFahrenheit() -> Double {
        celsius * 9 / 5 + 32
    }
}`, notes: [] }
          ]
        },
        {
          id: "initializers", n: 3, title: "custom initializers", level: 2,
          gloss: "Sets up properties in init and adds initializers through extensions.",
          examples: [
            { code: `struct Account {
    var owner: String
    var balance: Double
    init(owner: String) {
        self.owner = owner
        self.balance = 0
    }
}`, notes: [{ at: "init", text: "replaces the memberwise init" }] },
            { code: `struct Port {
    let value: Int
    init?(_ value: Int) {
        guard (1...65535).contains(value) else { return nil }
        self.value = value
    }
}`, notes: [{ at: "init?", text: "failable initializer" }] },
            { code: `struct Size {
    var width: Double
    var height: Double
}
extension Size {
    init(square side: Double) {
        self.init(width: side, height: side)
    }
}`, notes: [{ at: "extension", text: "keeps the memberwise init" }] }
          ]
        },
        {
          id: "value-semantics", n: 4, title: "value semantics", level: 2,
          gloss: "Copies structs on assignment so each variable owns its data.",
          examples: [
            { code: `struct Point {
    var x: Int
}
var a = Point(x: 1)
var b = a
b.x = 5
print(a.x)`, notes: [{ at: "var b = a", text: "copies the value" }] },
            { code: `struct Item {
    var qty: Int
}
let fixed = Item(qty: 1)
var editable = fixed
editable.qty += 1`, notes: [{ at: "let", text: "struct is fully immutable" }] },
            { code: `struct Point {
    var x: Int
}
func reset(_ p: Point) -> Point {
    var copy = p
    copy.x = 0
    return copy
}`, notes: [{ at: "p", text: "parameters are constants" }] }
          ]
        }
      ]
    },
    {
      id: "classes-arc",
      n: 9,
      title: "classes & ARC",
      concepts: [
        {
          id: "declaring-classes", n: 1, title: "declaring classes", level: 1,
          gloss: "Defines reference types with stored properties and an initializer.",
          examples: [
            { code: `class Counter {
    var value = 0
    func increment() {
        value += 1
    }
}`, notes: [{ at: "func increment()", text: "no mutating needed" }] },
            { code: `class User {
    let name: String
    init(name: String) {
        self.name = name
    }
}`, notes: [{ at: "init", text: "classes need one" }] },
            { code: `class Rectangle {
    var width = 0.0
    var height = 0.0
    var area: Double { width * height }
}`, notes: [] }
          ]
        },
        {
          id: "inheritance", n: 2, title: "inheritance", level: 2,
          gloss: "Subclasses a class and replaces members with override.",
          examples: [
            { code: `class Animal {
    func speak() -> String { "..." }
}
class Dog: Animal {
    override func speak() -> String { "woof" }
}`, notes: [{ at: ": Animal", text: "superclass" }, { at: "override", text: "required keyword" }] },
            { code: `class Vehicle {
    let wheels: Int
    init(wheels: Int) { self.wheels = wheels }
}
class Bike: Vehicle {
    init() { super.init(wheels: 2) }
}`, notes: [{ at: "super.init", text: "after own properties" }] },
            { code: `class Employee {
    func describe() -> String { "employee" }
}
final class Manager: Employee {
    override func describe() -> String {
        "manager, " + super.describe()
    }
}`, notes: [{ at: "final", text: "cannot be subclassed" }] }
          ]
        },
        {
          id: "reference-semantics", n: 3, title: "reference semantics", level: 1,
          gloss: "Shares one instance between variables that refer to the same object.",
          examples: [
            { code: `class Box {
    var value = 1
}
let a = Box()
let b = a
b.value = 5
print(a.value)`, notes: [{ at: "let b = a", text: "same object" }] },
            { code: `class Box {
    var value = 1
}
let x = Box()
let y = x
print(x === y)`, notes: [{ at: "===", text: "identity comparison" }] },
            { code: `class Counter {
    var count = 0
}
func bump(_ c: Counter) {
    c.count += 1
}`, notes: [{ at: "c.count", text: "changes the caller's object" }] }
          ]
        },
        {
          id: "arc-and-weak", n: 4, title: "ARC, deinit and weak", level: 3,
          gloss: "Frees objects with reference counting and breaks cycles with weak.",
          examples: [
            { code: `class Session {
    deinit {
        print("session closed")
    }
}
var current: Session? = Session()
current = nil`, notes: [{ at: "deinit", text: "runs when freed" }] },
            { code: `class Owner {
    var pet: Pet?
}
class Pet {
    weak var owner: Owner?
}`, notes: [{ at: "weak", text: "does not keep it alive" }] },
            { code: `class Loader {
    var onDone: (() -> Void)?
    func start() {
        onDone = { [weak self] in
            guard let self else { return }
            print(self)
        }
    }
}`, notes: [{ at: "[weak self]", text: "avoids a retain cycle" }] }
          ]
        }
      ]
    },
    {
      id: "enums-associated-values",
      n: 10,
      title: "enums & associated values",
      concepts: [
        {
          id: "enum-cases", n: 1, title: "enum cases", level: 1,
          gloss: "Names a fixed set of related values with an enum.",
          examples: [
            { code: `enum Direction {
    case north, east, south, west
}
let heading = Direction.east`, notes: [{ at: "case", text: "lists the values" }] },
            { code: `enum Status {
    case active
    case paused
    case closed
}`, notes: [] },
            { code: `enum Light {
    case red, green
}
let light = Light.red
switch light {
case .red:
    print("stop")
case .green:
    print("go")
}`, notes: [{ at: ".red", text: "type inferred from light" }] }
          ]
        },
        {
          id: "raw-values", n: 2, title: "raw values", level: 2,
          gloss: "Backs each case with an integer or string value.",
          examples: [
            { code: `enum Level: Int {
    case low = 1, medium, high
}
let raw = Level.medium.rawValue`, notes: [{ at: "medium", text: "auto-increments to 2" }] },
            { code: `enum Planet: String {
    case earth, mars
}
let name = Planet.mars.rawValue`, notes: [{ at: "String", text: "raw value defaults to the name" }] },
            { code: `enum Coin: Int {
    case penny = 1
    case dime = 10
}
let coin = Coin(rawValue: 10)`, notes: [{ at: "Coin(rawValue: 10)", text: "optional result" }] }
          ]
        },
        {
          id: "associated-values", n: 3, title: "associated values", level: 2,
          gloss: "Attaches data to each case so cases can carry different payloads.",
          examples: [
            { code: `enum Payment {
    case cash
    case card(number: String)
    case transfer(iban: String, ref: Int)
}
let pay = Payment.card(number: "4242")`, notes: [{ at: "card(number: String)", text: "payload per case" }] },
            { code: `enum Shape {
    case circle(Double)
    case square(Double)
}
func area(_ shape: Shape) -> Double {
    switch shape {
    case .circle(let r): return 3.14159 * r * r
    case .square(let s): return s * s
    }
}`, notes: [{ at: "let r", text: "binds the payload" }] },
            { code: `enum Event {
    case click(x: Int, y: Int)
    case key(String)
}
let event = Event.click(x: 1, y: 2)
if case .click(let x, _) = event {
    print(x)
}`, notes: [{ at: "if case", text: "matches one case" }] }
          ]
        },
        {
          id: "enum-members", n: 4, title: "methods and CaseIterable", level: 2,
          gloss: "Adds computed properties, mutating methods and case lists to enums.",
          examples: [
            { code: `enum Direction: CaseIterable {
    case north, east, south, west
}
let count = Direction.allCases.count`, notes: [{ at: "CaseIterable", text: "provides allCases" }] },
            { code: `enum Light {
    case red, green
    var action: String {
        switch self {
        case .red: return "stop"
        case .green: return "go"
        }
    }
}`, notes: [{ at: "switch self", text: "branches on the case" }] },
            { code: `enum Weekday {
    case mon, tue, wed
    mutating func next() {
        self = self == .mon ? .tue : .wed
    }
}`, notes: [{ at: "mutating", text: "assigns to self" }] }
          ]
        }
      ]
    },
    {
      id: "protocols-extensions",
      n: 11,
      title: "protocols & extensions",
      concepts: [
        {
          id: "protocols", n: 1, title: "protocols", level: 1,
          gloss: "Declares required members that types promise to provide.",
          examples: [
            { code: `protocol Greeter {
    func greet(name: String) -> String
}
struct Formal: Greeter {
    func greet(name: String) -> String { "Good day, \\(name)" }
}`, notes: [{ at: ": Greeter", text: "conforms to the protocol" }] },
            { code: `protocol Shape {
    var sides: Int { get }
}
struct Triangle: Shape {
    let sides = 3
}`, notes: [{ at: "{ get }", text: "readable property" }] },
            { code: `protocol Named {
    var name: String { get set }
}
class Person: Named {
    var name = "ada"
}`, notes: [{ at: "{ get set }", text: "must be settable" }] }
          ]
        },
        {
          id: "extensions", n: 2, title: "extensions", level: 1,
          gloss: "Adds members to an existing type in a separate declaration.",
          examples: [
            { code: `extension String {
    var isBlank: Bool {
        allSatisfy { $0 == " " }
    }
}`, notes: [{ at: "extension", text: "adds to String" }] },
            { code: `extension Int {
    func squared() -> Int { self * self }
}`, notes: [] },
            { code: `extension Array where Element == Int {
    var total: Int { reduce(0, +) }
}`, notes: [{ at: "where", text: "limits to Int arrays" }] }
          ]
        },
        {
          id: "protocol-extensions", n: 3, title: "protocol extensions", level: 2,
          gloss: "Supplies default implementations for every conforming type.",
          examples: [
            { code: `protocol Describable {
    var name: String { get }
}
extension Describable {
    func describe() -> String { "I am \\(name)" }
}`, notes: [{ at: "describe", text: "free for all conformers" }] },
            { code: `protocol Logger {
    func log(_ message: String)
}
extension Logger {
    func warn(_ message: String) { log("warning: \\(message)") }
}`, notes: [] },
            { code: `protocol Scorable {
    var score: Int { get }
}
extension Scorable {
    var isPassing: Bool { score >= 60 }
}`, notes: [] }
          ]
        },
        {
          id: "conformances", n: 4, title: "Comparable, Hashable and composition", level: 2,
          gloss: "Adopts standard protocols and combines protocols with an ampersand.",
          examples: [
            { code: `struct Version: Comparable {
    let major: Int
    static func < (a: Version, b: Version) -> Bool {
        a.major < b.major
    }
}`, notes: [{ at: "Comparable", text: "needs only <" }] },
            { code: `struct Point: Hashable {
    var x: Int
    var y: Int
}
let seen: Set<Point> = [Point(x: 0, y: 0)]`, notes: [{ at: "Hashable", text: "synthesized for structs" }] },
            { code: `protocol Flyer { func fly() }
protocol Swimmer { func swim() }
func move(_ animal: any Flyer & Swimmer) {
    animal.fly()
    animal.swim()
}`, notes: [{ at: "&", text: "requires both protocols" }] }
          ]
        }
      ]
    },
    {
      id: "generics",
      n: 12,
      title: "generics",
      concepts: [
        {
          id: "generic-functions", n: 1, title: "generic functions", level: 1,
          gloss: "Writes one function that works for any type with a type parameter.",
          examples: [
            { code: `func firstOf<T>(_ items: [T]) -> T? {
    items.first
}`, notes: [{ at: "<T>", text: "placeholder type" }] },
            { code: `func swapPair<A, B>(_ pair: (A, B)) -> (B, A) {
    (pair.1, pair.0)
}`, notes: [] },
            { code: `func pick<T>(_ flag: Bool, _ a: T, _ b: T) -> T {
    flag ? a : b
}`, notes: [] }
          ]
        },
        {
          id: "generic-types", n: 2, title: "generic types", level: 2,
          gloss: "Parameterises structs and classes over the types they store.",
          examples: [
            { code: `struct Box<T> {
    var value: T
}
let boxed = Box(value: 42)`, notes: [{ at: "Box(value: 42)", text: "type inferred as Int" }] },
            { code: `struct Stack<Element> {
    private var items: [Element] = []
    mutating func push(_ item: Element) { items.append(item) }
    mutating func pop() -> Element? { items.popLast() }
}`, notes: [{ at: "popLast", text: "nil when empty" }] },
            { code: `struct Pair<A, B> {
    let first: A
    let second: B
}
let pair = Pair(first: "ada", second: 36)`, notes: [] }
          ]
        },
        {
          id: "constraints", n: 3, title: "type constraints", level: 2,
          gloss: "Restricts a type parameter to types that conform to a protocol.",
          examples: [
            { code: `func largest<T: Comparable>(_ items: [T]) -> T? {
    items.max()
}`, notes: [{ at: "T: Comparable", text: "needed for max" }] },
            { code: `func total<T: Numeric>(_ items: [T]) -> T {
    items.reduce(0, +)
}`, notes: [{ at: "Numeric", text: "supports + and zero" }] },
            { code: `func describe<T>(_ value: T) -> String
where T: CustomStringConvertible {
    value.description
}`, notes: [{ at: "where", text: "constraint clause" }] }
          ]
        },
        {
          id: "associated-types-and-extensions", n: 4, title: "associated types and generic extensions", level: 3,
          gloss: "Uses associatedtype in protocols and constrains extensions with where.",
          examples: [
            { code: `protocol Container {
    associatedtype Item
    var items: [Item] { get }
}
struct Shelf: Container {
    var items = ["book", "lamp"]
}`, notes: [{ at: "associatedtype", text: "placeholder inside a protocol" }] },
            { code: `extension Array where Element: Comparable {
    func isSorted() -> Bool {
        zip(self, dropFirst()).allSatisfy { $0 <= $1 }
    }
}`, notes: [] },
            { code: `extension Optional where Wrapped == String {
    var orEmpty: String { self ?? "" }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "error-handling",
      n: 13,
      title: "error handling",
      concepts: [
        {
          id: "throwing-functions", n: 1, title: "throwing functions", level: 1,
          gloss: "Marks functions that can fail with throws and signals errors with throw.",
          examples: [
            { code: `enum InputError: Error {
    case empty
    case tooLong(Int)
}
func check(_ text: String) throws {
    if text.isEmpty { throw InputError.empty }
}`, notes: [{ at: ": Error", text: "marks an error type" }, { at: "throws", text: "caller must handle" }] },
            { code: `struct ParseError: Error {
    let line: Int
}
func parse(_ raw: String) throws -> Int {
    guard let n = Int(raw) else { throw ParseError(line: 1) }
    return n
}`, notes: [] },
            { code: `enum BankError: Error {
    case insufficientFunds(needed: Double)
}
func withdraw(_ amount: Double, from balance: Double) throws -> Double {
    guard amount <= balance else {
        throw BankError.insufficientFunds(needed: amount - balance)
    }
    return balance - amount
}`, notes: [] }
          ]
        },
        {
          id: "do-catch", n: 2, title: "do and catch", level: 1,
          gloss: "Handles thrown errors with do, try and catch clauses.",
          examples: [
            { code: `enum LoadError: Error {
    case missing
}
func load() throws -> String { throw LoadError.missing }
do {
    let text = try load()
    print(text)
} catch LoadError.missing {
    print("not found")
} catch {
    print("other: \\(error)")
}`, notes: [{ at: "try", text: "marks the throwing call" }, { at: "error", text: "implicit in a bare catch" }] },
            { code: `enum ParseError: Error { case invalid(String) }
func parse(_ raw: String) throws -> Int {
    guard let n = Int(raw) else { throw ParseError.invalid(raw) }
    return n
}
do {
    print(try parse("x"))
} catch ParseError.invalid(let raw) {
    print("bad input \\(raw)")
} catch {
    print(error)
}`, notes: [{ at: "invalid(let raw)", text: "binds the payload" }] },
            { code: `enum NetworkError: Error {
    case offline, timeout
}
func ping() throws {
    throw NetworkError.timeout
}
do {
    try ping()
} catch {
    print("failed: \\(error)")
}`, notes: [] }
          ]
        },
        {
          id: "try-optional", n: 3, title: "try? and try!", level: 2,
          gloss: "Turns a thrown error into nil or traps when the call fails.",
          examples: [
            { code: `enum ParseError: Error {
    case invalid
}
func parse(_ raw: String) throws -> Int {
    guard let n = Int(raw) else { throw ParseError.invalid }
    return n
}
let a = try? parse("12")
let b = try! parse("34")`, notes: [{ at: "try?", text: "nil on failure" }, { at: "try!", text: "crashes on failure" }] },
            { code: `enum ConfigError: Error {
    case missing
}
func readPort() throws -> Int { throw ConfigError.missing }
let port = (try? readPort()) ?? 8080`, notes: [{ at: "??", text: "fallback after try?" }] },
            { code: `enum ParseError: Error {
    case invalid
}
func parse(_ raw: String) throws -> Int {
    guard let n = Int(raw) else { throw ParseError.invalid }
    return n
}
if let n = try? parse("5") {
    print(n)
}`, notes: [] }
          ]
        },
        {
          id: "defer-and-result", n: 4, title: "defer and Result", level: 2,
          gloss: "Runs cleanup with defer and models success or failure with Result.",
          examples: [
            { code: `func process() {
    print("start")
    defer { print("cleanup") }
    print("work")
}`, notes: [{ at: "defer", text: "runs when the scope exits" }] },
            { code: `enum ParseError: Error {
    case invalid
}
func parse(_ raw: String) -> Result<Int, ParseError> {
    guard let n = Int(raw) else { return .failure(.invalid) }
    return .success(n)
}`, notes: [{ at: "Result", text: "success or failure value" }] },
            { code: `enum ParseError: Error {
    case invalid
}
func parse(_ raw: String) throws -> Int { throw ParseError.invalid }
let outcome = Result { try parse("x") }
switch outcome {
case .success(let n): print(n)
case .failure(let error): print(error)
}`, notes: [{ at: "Result {", text: "captures a thrown error" }] }
          ]
        }
      ]
    },
    {
      id: "async-await",
      n: 14,
      title: "async/await",
      concepts: [
        {
          id: "async-functions", n: 1, title: "async functions", level: 1,
          gloss: "Declares functions that can suspend with async and call others with await.",
          examples: [
            { code: `func fetchName() async -> String {
    try? await Task.sleep(for: .seconds(1))
    return "ada"
}`, notes: [{ at: "async", text: "may suspend" }, { at: "await", text: "marks a suspension point" }] },
            { code: `func load(id: Int) async throws -> String {
    try await Task.sleep(for: .milliseconds(200))
    return "item \\(id)"
}`, notes: [{ at: "async throws", text: "order is fixed" }] },
            { code: `func score(of name: String) async -> Int { name.count }
func total() async -> Int {
    let a = await score(of: "ada")
    let b = await score(of: "grace")
    return a + b
}`, notes: [] }
          ]
        },
        {
          id: "tasks", n: 2, title: "Task", level: 2,
          gloss: "Starts asynchronous work from synchronous code with Task.",
          examples: [
            { code: `func fetchName() async -> String { "ada" }
Task {
    print(await fetchName())
}`, notes: [{ at: "Task {", text: "starts concurrent work" }] },
            { code: `func load() async throws -> Int { 42 }
Task {
    do {
        let value = try await load()
        print(value)
    } catch {
        print("failed: \\(error)")
    }
}`, notes: [] },
            { code: `let task = Task { 6 * 7 }
let value = await task.value`, notes: [{ at: "task.value", text: "awaits the result" }] }
          ]
        },
        {
          id: "async-let", n: 3, title: "async let", level: 2,
          gloss: "Runs independent calls concurrently and awaits their results together.",
          examples: [
            { code: `func one() async -> Int { 1 }
func two() async -> Int { 2 }
func both() async -> Int {
    async let a = one()
    async let b = two()
    return await a + b
}`, notes: [{ at: "async let", text: "starts immediately" }] },
            { code: `func download(_ name: String) async -> String { name }
func run() async {
    async let first = download("a")
    async let second = download("b")
    print(await [first, second])
}`, notes: [] },
            { code: `func square(_ n: Int) async -> Int { n * n }
func run() async {
    async let x = square(3)
    async let y = square(4)
    let (a, b) = await (x, y)
    print(a + b)
}`, notes: [] }
          ]
        },
        {
          id: "groups-and-actors", n: 4, title: "task groups and actors", level: 3,
          gloss: "Fans out work with task groups and guards shared state with actors.",
          examples: [
            { code: `func sum() async -> Int {
    await withTaskGroup(of: Int.self) { group in
        for n in 1...3 {
            group.addTask { n * n }
        }
        return await group.reduce(0, +)
    }
}`, notes: [{ at: "addTask", text: "adds a child task" }] },
            { code: `actor Bank {
    private var balance = 100
    func deposit(_ amount: Int) -> Int {
        balance += amount
        return balance
    }
}`, notes: [{ at: "actor", text: "serialises access to state" }] },
            { code: `actor Counter {
    private(set) var value = 0
    func increment() { value += 1 }
}
func run() async {
    let counter = Counter()
    await counter.increment()
    print(await counter.value)
}`, notes: [{ at: "await counter", text: "crossing the actor boundary" }] }
          ]
        }
      ]
    }
  ]
};
