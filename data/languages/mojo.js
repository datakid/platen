export default {
  id: "mojo",
  name: "Mojo",
  short: "MJO",
  pigment: "mojo",
  family: null,
  version: "1.2",
  lexer: "mojo",
  indent: 4,
  topics: [
    {
      id: "basics",
      n: 1,
      title: "basics",
      concepts: [
        {
          id: "main-print", n: 1, title: "main and print", level: 1,
          gloss: "Starts a program in def main and prints values with print.",
          examples: [
            { code: `def main():
    print("Hello, Oslo")`, notes: [{ at: "def main", text: "program entry point" }] },
            { code: `def main():
    print("Total orders:", 42)`, notes: [] },
            { code: `def main():
    print("a", "b", "c", sep="-")
    print("no newline", end="")
    print()`, notes: [{ at: "sep", text: "separator between values" }] }
          ]
        },
        {
          id: "variables", n: 2, title: "variables with var", level: 1,
          gloss: "Declares a mutable variable with var and updates it by assignment.",
          examples: [
            { code: `def main():
    var visits = 0
    visits += 1
    print(visits)`, notes: [{ at: "var", text: "mutable variable" }] },
            { code: `def main():
    var city = "Oslo"
    print(city)
    city = "Bergen"
    print(city)`, notes: [] },
            { code: `def main():
    var price: Float64 = 9.99
    price = price * 2
    print(price)`, notes: [] }
          ]
        },
        {
          id: "comptime-constants", n: 3, title: "comptime constants", level: 1,
          gloss: "Names a compile-time constant with comptime.",
          examples: [
            { code: `comptime LIMIT = 100

def main():
    print(LIMIT)`, notes: [{ at: "comptime", text: "value fixed at compile time" }] },
            { code: `comptime APP_NAME = "billing"

def main():
    print(APP_NAME)`, notes: [] },
            { code: `comptime PI = 3.14159

def main():
    print(PI * 2.0)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "types",
      n: 2,
      title: "types",
      concepts: [
        {
          id: "numbers", n: 1, title: "Int and Float64", level: 1,
          gloss: "Uses Int for whole numbers and Float64 for decimals.",
          examples: [
            { code: `def main():
    var count: Int = 42
    var ratio: Float64 = 0.75
    print(count, ratio)`, notes: [{ at: "Int", text: "whole number" }] },
            { code: `def main():
    var width = 8
    var height = 5
    print(width * height, width / height)`, notes: [] },
            { code: `def main():
    print(7 // 2, 7 % 2, 2 ** 10)
    print(7.0 / 2.0)`, notes: [{ at: "//", text: "floor division" }] }
          ]
        },
        {
          id: "booleans", n: 2, title: "Bool values", level: 1,
          gloss: "Holds True or False and combines conditions with and, or and not.",
          examples: [
            { code: `def main():
    var ready = True
    var done = False
    print(ready and done, ready or done)`, notes: [{ at: "and", text: "both must be true" }] },
            { code: `def main():
    var n = 5
    print(n > 3, n == 5, n != 5)`, notes: [] },
            { code: `def main():
    var admin = False
    print(not admin)`, notes: [] }
          ]
        },
        {
          id: "conversion", n: 3, title: "converting types", level: 1,
          gloss: "Converts a value to another type by calling the type like a function.",
          examples: [
            { code: `def main():
    var x: Float64 = 3.9
    print(Int(x), Float64(5))`, notes: [{ at: "Int(x)", text: "truncates toward zero" }] },
            { code: `def main():
    print(String(42) + " items")`, notes: [] },
            { code: `def main() raises:
    var n = Int("12")
    print(n + 1)`, notes: [{ at: "raises", text: "parsing can fail" }] }
          ]
        },
        {
          id: "fixed-width", n: 4, title: "fixed-width integers", level: 2,
          gloss: "Picks an exact integer width such as Int8, UInt8 or Int64.",
          examples: [
            { code: `def main():
    var small: UInt8 = 200
    var big: Int64 = 5000000000
    print(small, big)`, notes: [{ at: "UInt8", text: "unsigned 8-bit" }] },
            { code: `def main():
    var a: Int32 = 100000
    var b: Int16 = 300
    print(a, b)`, notes: [] },
            { code: `def main():
    var x: UInt8 = 255
    var y = x + 1
    print(y)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "strings",
      n: 3,
      title: "strings",
      concepts: [
        {
          id: "string-basics", n: 1, title: "string basics", level: 1,
          gloss: "Joins strings with plus and changes case with upper and lower.",
          examples: [
            { code: `def main():
    var first = "Ada"
    var last = "Lovelace"
    print(first + " " + last)`, notes: [] },
            { code: `def main():
    var s = "Mojo"
    print(s.upper(), s.lower())`, notes: [{ at: "upper()", text: "uppercase copy" }] },
            { code: `def main():
    var s = "report"
    print(s.byte_length())
    print(s + "s")`, notes: [] }
          ]
        },
        {
          id: "search-replace", n: 2, title: "search and replace", level: 1,
          gloss: "Locates text with find and startswith and swaps it with replace.",
          examples: [
            { code: `def main():
    var path = "reports/2026.csv"
    print(path.find("/"))`, notes: [{ at: "find", text: "position or -1" }] },
            { code: `def main():
    var name = "Ada Lovelace"
    print(name.startswith("Ada"), name.endswith("x"))`, notes: [] },
            { code: `def main():
    var s = "red green red"
    print(s.replace("red", "blue"))`, notes: [] }
          ]
        },
        {
          id: "split-join", n: 3, title: "split and join", level: 2,
          gloss: "Breaks a string into a list with split and joins pieces with join.",
          examples: [
            { code: `def main():
    var parts = "a,b,c".split(",")
    print(len(parts), parts[0])`, notes: [{ at: "split", text: "list of pieces" }] },
            { code: `def main():
    var words = "one two three".split(" ")
    print(String("-").join(words))`, notes: [] },
            { code: `def main():
    var line = "  padded  "
    print(line.strip())`, notes: [] }
          ]
        },
        {
          id: "interpolation", n: 4, title: "building strings", level: 2,
          gloss: "Builds text from values with String and template strings.",
          examples: [
            { code: `def main():
    var n = 5
    print(t"n is {n}")`, notes: [{ at: "t\"", text: "template string" }] },
            { code: `def main():
    var user = "Ada"
    var age = 36
    print(t"{user} is {age}")`, notes: [] },
            { code: `def main():
    var total = 12.5
    print(String("total=", total))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "control-flow",
      n: 4,
      title: "control flow",
      concepts: [
        {
          id: "if-elif-else", n: 1, title: "if, elif and else", level: 1,
          gloss: "Chooses a branch with if, elif and else.",
          examples: [
            { code: `def main():
    var score = 82
    if score >= 90:
        print("A")
    elif score >= 80:
        print("B")
    else:
        print("C")`, notes: [{ at: "elif", text: "else if" }] },
            { code: `def main():
    var n = -3
    if n < 0:
        print("negative")
    else:
        print("not negative")`, notes: [] },
            { code: `def main():
    var balance = 12.5
    if balance < 0.0:
        print("overdrawn")
    print(balance)`, notes: [] }
          ]
        },
        {
          id: "for-range", n: 2, title: "for loops and range", level: 1,
          gloss: "Repeats a block for each value produced by range.",
          examples: [
            { code: `def main():
    for i in range(3):
        print(i)`, notes: [{ at: "range(3)", text: "zero to two" }] },
            { code: `def main():
    for i in range(2, 10, 2):
        print(i)`, notes: [] },
            { code: `def main():
    var total = 0
    for i in range(1, 5):
        total += i
    print(total)`, notes: [] }
          ]
        },
        {
          id: "while-break", n: 3, title: "while, break and continue", level: 1,
          gloss: "Loops while a condition holds and leaves or skips with break and continue.",
          examples: [
            { code: `def main():
    var n = 100
    while n > 5:
        n = n // 2
    print(n)`, notes: [{ at: "while", text: "condition loop" }] },
            { code: `def main():
    for i in range(20):
        if i * i > 50:
            print(i)
            break`, notes: [{ at: "break", text: "leaves the loop" }] },
            { code: `def main():
    for i in range(6):
        if i % 2 == 0:
            continue
        print(i)`, notes: [{ at: "continue", text: "skips to the next pass" }] }
          ]
        }
      ]
    },
    {
      id: "functions",
      n: 5,
      title: "functions",
      concepts: [
        {
          id: "def-return", n: 1, title: "functions and return values", level: 1,
          gloss: "Defines a function with def and returns a value with a typed result.",
          examples: [
            { code: `def area(r: Float64) -> Float64:
    return 3.14159 * r * r

def main():
    print(area(3.0))`, notes: [{ at: "-> Float64", text: "return type" }] },
            { code: `def twice(n: Int) -> Int:
    return 2 * n

def main():
    print(twice(21))`, notes: [] },
            { code: `def greet(name: String) -> String:
    return "Hello, " + name

def main():
    print(greet("Ada"))`, notes: [] }
          ]
        },
        {
          id: "defaults-keywords", n: 2, title: "default and keyword arguments", level: 1,
          gloss: "Gives parameters default values and passes arguments by name.",
          examples: [
            { code: `def power(base: Int, exp: Int = 2) -> Int:
    return base ** exp

def main():
    print(power(5), power(2, 8))`, notes: [{ at: "exp: Int = 2", text: "default value" }] },
            { code: `def box(width: Int, height: Int) -> Int:
    return width * height

def main():
    print(box(height=3, width=4))`, notes: [] },
            { code: `def label(text: String, bold: Bool = False):
    print(text, bold)

def main():
    label("title", bold=True)`, notes: [] }
          ]
        },
        {
          id: "tuple-returns", n: 3, title: "returning several values", level: 2,
          gloss: "Returns a tuple and unpacks it into separate variables.",
          examples: [
            { code: `def split(a: Int, b: Int) -> Tuple[Int, Int]:
    return (a // b, a % b)

def main():
    var q, r = split(17, 5)
    print(q, r)`, notes: [{ at: "Tuple", text: "fixed group of values" }] },
            { code: `def bounds(a: Int, b: Int) -> Tuple[Int, Int]:
    if a < b:
        return (a, b)
    return (b, a)

def main():
    var lo, hi = bounds(9, 4)
    print(lo, hi)`, notes: [] },
            { code: `def stats(a: Float64, b: Float64) -> Tuple[Float64, Float64]:
    return (a + b, (a + b) / 2)

def main():
    var total, mean = stats(3.0, 5.0)
    print(total, mean)`, notes: [] }
          ]
        },
        {
          id: "recursion", n: 4, title: "recursion", level: 2,
          gloss: "Calls a function from inside itself with a base case to stop.",
          examples: [
            { code: `def factorial(n: Int) -> Int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def main():
    print(factorial(5))`, notes: [] },
            { code: `def fib(n: Int) -> Int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

def main():
    print(fib(10))`, notes: [] },
            { code: `def gcd(a: Int, b: Int) -> Int:
    if b == 0:
        return a
    return gcd(b, a % b)

def main():
    print(gcd(48, 18))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "collections",
      n: 6,
      title: "collections",
      concepts: [
        {
          id: "lists", n: 1, title: "List", level: 1,
          gloss: "Stores an ordered growable sequence of values in a List.",
          examples: [
            { code: `def main():
    var xs: List[Int] = [3, 1, 2]
    xs.append(4)
    print(len(xs), xs[0], xs[len(xs) - 1])`, notes: [{ at: "append", text: "adds to the end" }] },
            { code: `def main():
    var names = List[String]()
    names.append("Ada")
    names.append("Grace")
    print(names[1])`, notes: [] },
            { code: `def main():
    var xs: List[Int] = [5, 6, 7]
    xs[0] = 50
    print(xs.pop(), len(xs))`, notes: [] }
          ]
        },
        {
          id: "iteration", n: 2, title: "iterating and sorting", level: 1,
          gloss: "Loops over a list with for, pairs index with enumerate and sorts in place.",
          examples: [
            { code: `def main():
    var xs: List[Int] = [3, 1, 2]
    var total = 0
    for x in xs:
        total += x
    print(total)`, notes: [] },
            { code: `def main():
    var xs: List[String] = ["a", "b"]
    for i, x in enumerate(xs):
        print(i, x)`, notes: [{ at: "enumerate", text: "index and value" }] },
            { code: `def main():
    var xs: List[Int] = [3, 1, 2]
    sort(xs)
    print(xs[0], xs[2])`, notes: [] }
          ]
        },
        {
          id: "dicts", n: 3, title: "Dict", level: 1,
          gloss: "Maps keys to values with a Dict.",
          examples: [
            { code: `def main() raises:
    var ages: Dict[String, Int] = {"Ada": 36, "Grace": 85}
    ages["Linus"] = 55
    print(ages["Ada"], len(ages))`, notes: [{ at: "Dict", text: "key to value map" }] },
            { code: `def main():
    var d = Dict[String, Int]()
    d["a"] = 1
    print("a" in d, "b" in d)`, notes: [] },
            { code: `def main():
    var d: Dict[String, Int] = {"x": 1, "y": 2}
    for item in d.items():
        print(item.key, item.value)`, notes: [] }
          ]
        },
        {
          id: "tuples-sets", n: 4, title: "tuples and Set", level: 2,
          gloss: "Groups mixed values in a tuple and keeps unique values in a Set.",
          examples: [
            { code: `def main():
    var t = (1, "two", 3.0)
    print(t[0], t[1], t[2])`, notes: [{ at: "(1,", text: "tuple literal" }] },
            { code: `from std.collections import Set

def main():
    var s = Set[Int]()
    s.add(3)
    s.add(3)
    print(len(s), 3 in s)`, notes: [] },
            { code: `def main():
    var point = (3, 4)
    var x, y = point
    print(x + y)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "structs",
      n: 7,
      title: "structs",
      concepts: [
        {
          id: "fields", n: 1, title: "structs with fields", level: 1,
          gloss: "Groups named fields into a struct, with fieldwise_init generating the constructor.",
          examples: [
            { code: `@fieldwise_init
struct Point(Copyable):
    var x: Int
    var y: Int

def main():
    var p = Point(3, 4)
    print(p.x, p.y)`, notes: [{ at: "@fieldwise_init", text: "generates __init__" }] },
            { code: `@fieldwise_init
struct Item(Copyable):
    var name: String
    var price: Float64

def main():
    var tea = Item("tea", 3.5)
    print(tea.name, tea.price)`, notes: [] },
            { code: `@fieldwise_init
struct Size(Copyable):
    var w: Int
    var h: Int

def main():
    var s = Size(2, 5)
    s.w += 1
    print(s.w * s.h)`, notes: [] }
          ]
        },
        {
          id: "methods", n: 2, title: "methods", level: 1,
          gloss: "Adds behavior to a struct with methods that take self.",
          examples: [
            { code: `@fieldwise_init
struct Point(Copyable):
    var x: Int
    var y: Int
    def norm2(self) -> Int:
        return self.x * self.x + self.y * self.y

def main():
    print(Point(3, 4).norm2())`, notes: [{ at: "self", text: "the current instance" }] },
            { code: `struct Counter:
    var n: Int
    def __init__(out self):
        self.n = 0
    def bump(mut self):
        self.n += 1

def main():
    var c = Counter()
    c.bump()
    c.bump()
    print(c.n)`, notes: [{ at: "mut self", text: "method may change fields" }] },
            { code: `@fieldwise_init
struct Rect(Copyable):
    var w: Float64
    var h: Float64
    def area(self) -> Float64:
        return self.w * self.h

def main():
    print(Rect(2.0, 4.5).area())`, notes: [] }
          ]
        },
        {
          id: "initializers", n: 3, title: "custom initializers", level: 2,
          gloss: "Writes an __init__ with out self to compute or default fields.",
          examples: [
            { code: `struct Account:
    var balance: Float64
    def __init__(out self, start: Float64 = 0.0):
        self.balance = start

def main():
    var a = Account(10.0)
    print(a.balance)`, notes: [{ at: "out self", text: "the value being created" }] },
            { code: `struct User:
    var name: String
    var active: Bool
    def __init__(out self, name: String):
        self.name = name
        self.active = True

def main():
    var u = User("Ada")
    print(u.name, u.active)`, notes: [] },
            { code: `struct Range2:
    var lo: Int
    var hi: Int
    def __init__(out self, a: Int, b: Int):
        self.lo = min(a, b)
        self.hi = max(a, b)

def main():
    var r = Range2(9, 4)
    print(r.lo, r.hi)`, notes: [] }
          ]
        },
        {
          id: "operator-methods", n: 4, title: "operator methods", level: 3,
          gloss: "Overloads operators by defining dunder methods such as __add__ and __eq__.",
          examples: [
            { code: `@fieldwise_init
struct Money(Copyable):
    var cents: Int
    def __add__(self, other: Self) -> Self:
        return Money(self.cents + other.cents)

def main():
    print((Money(150) + Money(250)).cents)`, notes: [{ at: "__add__", text: "the plus operator" }] },
            { code: `@fieldwise_init
struct Id(Copyable):
    var value: Int
    def __eq__(self, other: Self) -> Bool:
        return self.value == other.value

def main():
    print(Id(3) == Id(3), Id(3) == Id(4))`, notes: [] },
            { code: `@fieldwise_init
struct Vec(Copyable):
    var x: Int
    var y: Int
    def __neg__(self) -> Self:
        return Vec(-self.x, -self.y)

def main():
    var v = -Vec(2, 5)
    print(v.x, v.y)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "conventions",
      n: 8,
      title: "argument conventions",
      concepts: [
        {
          id: "borrowed", n: 1, title: "read-only arguments", level: 2,
          gloss: "Passes arguments as read-only borrows by default so the caller keeps its value.",
          examples: [
            { code: `def show(name: String):
    print("name:", name)

def main():
    var n = "Ada"
    show(n)
    print(n)`, notes: [] },
            { code: `def total(xs: List[Int]) -> Int:
    var t = 0
    for x in xs:
        t += x
    return t

def main():
    var xs: List[Int] = [1, 2, 3]
    print(total(xs), len(xs))`, notes: [] },
            { code: `def length(imm s: String) -> Int:
    return s.byte_length()

def main():
    print(length("hello"))`, notes: [{ at: "imm", text: "read-only borrow" }] }
          ]
        },
        {
          id: "mut", n: 2, title: "mut arguments", level: 2,
          gloss: "Lets a function change the caller's variable with the mut convention.",
          examples: [
            { code: `def bump(mut n: Int):
    n += 1

def main():
    var a = 5
    bump(a)
    print(a)`, notes: [{ at: "mut", text: "mutable borrow" }] },
            { code: `def swap(mut a: Int, mut b: Int):
    var t = a
    a = b
    b = t

def main():
    var x = 1
    var y = 2
    swap(x, y)
    print(x, y)`, notes: [] },
            { code: `def add_item(mut xs: List[Int], item: Int):
    xs.append(item)

def main():
    var xs: List[Int] = [1]
    add_item(xs, 2)
    print(len(xs))`, notes: [] }
          ]
        },
        {
          id: "ownership", n: 3, title: "var arguments and transfer", level: 3,
          gloss: "Takes ownership with var and moves a value with the transfer operator.",
          examples: [
            { code: `def shout(var s: String) -> String:
    return s + "!"

def main():
    var s = "hi"
    print(shout(s^))`, notes: [{ at: "^", text: "transfers ownership" }] },
            { code: `def main():
    var a = String("data")
    var b = a^
    print(b)`, notes: [] },
            { code: `@fieldwise_init
struct Point(Copyable):
    var x: Int
    var y: Int

def main():
    var p = Point(1, 2)
    var q = p.copy()
    q.x = 9
    print(p.x, q.x)`, notes: [{ at: "copy()", text: "explicit copy" }] }
          ]
        }
      ]
    },
    {
      id: "traits",
      n: 9,
      title: "traits",
      concepts: [
        {
          id: "trait-definition", n: 1, title: "defining traits", level: 2,
          gloss: "Declares required methods in a trait with ellipsis bodies.",
          examples: [
            { code: `trait Shape:
    def area(self) -> Float64: ...

def main():
    print("trait declared")`, notes: [{ at: "...", text: "body supplied by implementers" }] },
            { code: `trait Named:
    def name(self) -> String: ...
trait Priced:
    def price(self) -> Float64: ...

def main():
    print("two traits")`, notes: [] },
            { code: `trait Greeter:
    def greet(self) -> String: ...
    def farewell(self) -> String: ...

def main():
    print("greeter")`, notes: [] }
          ]
        },
        {
          id: "implementing", n: 2, title: "implementing traits", level: 2,
          gloss: "Lists a trait in parentheses after the struct name and defines its methods.",
          examples: [
            { code: `trait Shape:
    def area(self) -> Float64: ...
struct Square(Shape):
    var side: Float64
    def __init__(out self, side: Float64):
        self.side = side
    def area(self) -> Float64:
        return self.side * self.side

def main():
    print(Square(3.0).area())`, notes: [{ at: "Square(Shape)", text: "conforms to Shape" }] },
            { code: `trait Greeter:
    def greet(self) -> String: ...
struct English(Greeter):
    def __init__(out self):
        pass
    def greet(self) -> String:
        return "Hello"

def main():
    print(English().greet())`, notes: [] },
            { code: `trait Counter:
    def count(self) -> Int: ...
struct Three(Counter):
    def __init__(out self):
        pass
    def count(self) -> Int:
        return 3

def main():
    print(Three().count())`, notes: [] }
          ]
        },
        {
          id: "generic-functions", n: 3, title: "trait-bound generics", level: 3,
          gloss: "Writes one function for every type that conforms to a trait.",
          examples: [
            { code: `trait Greeter:
    def greet(self) -> String: ...
struct English(Greeter):
    def __init__(out self):
        pass
    def greet(self) -> String:
        return "Hello"
def welcome[G: Greeter](g: G):
    print(g.greet())

def main():
    welcome(English())`, notes: [{ at: "[G: Greeter]", text: "type parameter with a bound" }] },
            { code: `def biggest[T: Comparable & Copyable & Deinitable](a: T, b: T) -> T:
    if a > b:
        return a.copy()
    return b.copy()

def main():
    print(biggest(3, 9), biggest(2.5, 1.5))`, notes: [] },
            { code: `def show_all[T: Writable & Copyable & Deinitable](xs: List[T]):
    for x in xs:
        print(x)

def main():
    show_all([1, 2, 3])`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "parameters",
      n: 10,
      title: "compile-time parameters",
      concepts: [
        {
          id: "function-parameters", n: 1, title: "function parameters", level: 3,
          gloss: "Passes a compile-time value in square brackets before the runtime arguments.",
          examples: [
            { code: `def repeat[n: Int](s: String) -> String:
    var out = String("")
    comptime for _ in range(n):
        out += s
    return out

def main():
    print(repeat[3]("ab"))`, notes: [{ at: "[n: Int]", text: "compile-time parameter" }] },
            { code: `def scale[factor: Int](x: Int) -> Int:
    return x * factor

def main():
    print(scale[10](4))`, notes: [] },
            { code: `def pad[width: Int](n: Int) -> Int:
    return n + width

def main():
    print(pad[8](1))`, notes: [] }
          ]
        },
        {
          id: "parametric-structs", n: 2, title: "parametric structs", level: 3,
          gloss: "Parameterizes a struct by a type so one definition holds any type.",
          examples: [
            { code: `struct Box[T: Copyable & Deinitable]:
    var item: Self.T
    def __init__(out self, item: Self.T):
        self.item = item.copy()
    def get(self) -> Self.T:
        return self.item.copy()

def main():
    print(Box(7).get(), Box("hi").get())`, notes: [{ at: "Self.T", text: "the type parameter" }] },
            { code: `struct Pair[A: Copyable & Deinitable, B: Copyable & Deinitable]:
    var first: Self.A
    var second: Self.B
    def __init__(out self, first: Self.A, second: Self.B):
        self.first = first.copy()
        self.second = second.copy()

def main():
    var p = Pair("a", 2)
    print(p.first, p.second)`, notes: [] },
            { code: `struct Fixed[size: Int]:
    def __init__(out self):
        pass
    def length(self) -> Int:
        return Self.size

def main():
    print(Fixed[16]().length())`, notes: [] }
          ]
        },
        {
          id: "comptime-control", n: 3, title: "comptime if and for", level: 3,
          gloss: "Runs conditions and loops at compile time with comptime if and comptime for.",
          examples: [
            { code: `def main():
    comptime for i in range(3):
        print(i)`, notes: [{ at: "comptime for", text: "unrolled at compile time" }] },
            { code: `comptime DEBUG = True

def main():
    comptime if DEBUG:
        print("debug build")
    else:
        print("release build")`, notes: [] },
            { code: `comptime SIZE = 4

def main():
    var total = 0
    comptime for i in range(SIZE):
        total += i
    print(total)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "errors",
      n: 11,
      title: "errors",
      concepts: [
        {
          id: "raising", n: 1, title: "raising errors", level: 2,
          gloss: "Marks a function that can fail with raises and signals failure with raise.",
          examples: [
            { code: `def check(n: Int) raises:
    if n < 0:
        raise Error("negative")

def main() raises:
    check(5)
    print("ok")`, notes: [{ at: "raises", text: "may raise an error" }] },
            { code: `def parse(s: String) raises -> Int:
    return Int(s)

def main() raises:
    print(parse("42") + 1)`, notes: [] },
            { code: `def divide(a: Int, b: Int) raises -> Int:
    if b == 0:
        raise Error("division by zero")
    return a // b

def main() raises:
    print(divide(10, 2))`, notes: [] }
          ]
        },
        {
          id: "try-except", n: 2, title: "try, except and finally", level: 2,
          gloss: "Handles a failure with try and except and always cleans up with finally.",
          examples: [
            { code: `def main():
    try:
        raise Error("boom")
    except e:
        print("caught:", e)`, notes: [{ at: "except e", text: "binds the error" }] },
            { code: `def parse(s: String) raises -> Int:
    return Int(s)

def main():
    try:
        print(parse("zz"))
    except e:
        print("bad input")`, notes: [] },
            { code: `def main():
    try:
        print("working")
    finally:
        print("cleanup")`, notes: [{ at: "finally", text: "always runs" }] }
          ]
        },
        {
          id: "optional", n: 3, title: "Optional values", level: 2,
          gloss: "Represents a value that may be absent with Optional.",
          examples: [
            { code: `def main():
    var found: Optional[Int] = 5
    if found:
        print(found.value())`, notes: [{ at: "Optional", text: "value or None" }] },
            { code: `def main():
    var missing: Optional[Int] = None
    print(missing.or_else(3))`, notes: [{ at: "or_else", text: "fallback value" }] },
            { code: `def lookup(i: Int) -> Optional[String]:
    if i == 0:
        return "zero"
    return None

def main():
    print(lookup(0).or_else("none"), lookup(1).or_else("none"))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "simd",
      n: 12,
      title: "SIMD and arrays",
      concepts: [
        {
          id: "simd-vectors", n: 1, title: "SIMD vectors", level: 3,
          gloss: "Holds several numbers in one SIMD vector and operates on all lanes at once.",
          examples: [
            { code: `def main():
    var v = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)
    print(v * 2)`, notes: [{ at: "SIMD", text: "one vector of lanes" }] },
            { code: `def main():
    var a = SIMD[DType.int32, 4](1, 2, 3, 4)
    var b = SIMD[DType.int32, 4](10, 20, 30, 40)
    print(a + b)`, notes: [] },
            { code: `def main():
    var v = SIMD[DType.float64, 4](1.5, 2.5, 3.5, 4.5)
    print(v.reduce_add(), v[2])`, notes: [{ at: "reduce_add", text: "sums every lane" }] }
          ]
        },
        {
          id: "splat-math", n: 2, title: "splat and lane math", level: 3,
          gloss: "Fills every lane with one value and compares or selects across lanes.",
          examples: [
            { code: `def main():
    var ones = SIMD[DType.float32, 4](1.0)
    print(ones + 2.0)`, notes: [{ at: "(1.0)", text: "splat to all lanes" }] },
            { code: `def main():
    var a = SIMD[DType.int32, 4](5, 1, 8, 2)
    print(a.reduce_max(), a.reduce_min())`, notes: [] },
            { code: `def main():
    var a = SIMD[DType.int32, 4](5, 1, 8, 2)
    print(a.gt(3))`, notes: [] }
          ]
        },
        {
          id: "fixed-arrays", n: 3, title: "fixed-size arrays", level: 3,
          gloss: "Stores a fixed number of values inline with Array.",
          examples: [
            { code: `def main():
    var a: Array[Int, 3] = [1, 2, 3]
    print(a[1], len(a))`, notes: [{ at: "Array[Int, 3]", text: "three inline values" }] },
            { code: `def main():
    var a: Array[Float64, 2] = [0.5, 1.5]
    a[0] = 2.5
    print(a[0] + a[1])`, notes: [] },
            { code: `def main():
    var a: Array[Int, 4] = [4, 3, 2, 1]
    var total = 0
    for x in a:
        total += x
    print(total)`, notes: [] }
          ]
        }
      ]
    }
  ]
};
