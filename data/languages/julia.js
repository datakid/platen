export default {
  id: "julia",
  name: "Julia",
  short: "JL",
  pigment: "julia",
  family: null,
  version: "1.13",
  lexer: "julia",
  indent: 4,
  topics: [
    {
      id: "variables-types",
      n: 1,
      title: "variables & types",
      concepts: [
        {
          id: "variables", n: 1, title: "variables and assignment", level: 1,
          gloss: "Binds names to values without declarations.",
          examples: [
            { code: `city = "Oslo"
visits = 0
visits += 1
println("$city: $visits")`, notes: [{ at: "+=", text: "shorthand for visits + 1" }] },
            { code: `price = 9.99
quantity = 3
total = price * quantity
println(total)`, notes: [] },
            { code: `a, b = 1, 2
a, b = b, a
println(a, " ", b)`, notes: [{ at: "a, b = b, a", text: "swaps without a temp" }] }
          ]
        },
        {
          id: "types", n: 2, title: "types", level: 1,
          gloss: "Inspects the types of numbers, strings and collections with typeof and isa.",
          examples: [
            { code: `println(typeof(42))
println(typeof(3.14))
println(typeof("text"))
println(typeof(true))`, notes: [{ at: "typeof", text: "concrete type of a value" }] },
            { code: `x = 42
println(x isa Int)
println(x isa Number)
println(typeof(1//2))`, notes: [{ at: "isa", text: "type test" }, { at: "1//2", text: "exact rational" }] },
            { code: `println(typeof(1:3))
println(typeof([1, 2]))
println(typeof('a'))`, notes: [{ at: "'a'", text: "a Char, not a String" }] }
          ]
        },
        {
          id: "conversion", n: 3, title: "conversion and arithmetic", level: 1,
          gloss: "Converts between types and applies the numeric operators.",
          examples: [
            { code: `println(parse(Int, "42") + 1)
println(parse(Float64, "3.5") * 2)
println(string(7) * "!")`, notes: [{ at: "parse", text: "string to number" }, { at: "*", text: "joins strings" }] },
            { code: `println(7 / 2)
println(div(7, 2))
println(7 % 2)
println(2^10)`, notes: [{ at: "/", text: "always a float" }, { at: "div", text: "integer division" }] },
            { code: `println(Int(3.0))
println(Float64(3))
println(round(Int, 2.7))
println(tryparse(Int, "x"))`, notes: [{ at: "tryparse", text: "nothing on failure" }] }
          ]
        },
        {
          id: "constants-and-annotations", n: 4, title: "constants and type annotations", level: 2,
          gloss: "Declares constants and restricts the type of a variable.",
          examples: [
            { code: `const MAX_USERS = 100
const APP_NAME = "billing"
println(MAX_USERS, " ", APP_NAME)`, notes: [{ at: "const", text: "binding cannot change type" }] },
            { code: `count::Int = 0
count += 1
println(count)`, notes: [{ at: "::Int", text: "variable stays an Int" }] },
            { code: `x::Float64 = 3
println(x)`, notes: [{ at: "x::Float64 = 3", text: "converted to 3.0" }] }
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
          id: "interpolation", n: 1, title: "interpolation", level: 1,
          gloss: "Embeds values and expressions in strings with a dollar sign.",
          examples: [
            { code: `name = "ada"
println("Hello, $name")
println("Sum: $(2 + 3)")`, notes: [{ at: "$name", text: "variable" }, { at: "$(2 + 3)", text: "any expression" }] },
            { code: `item = "tea"
qty = 3
println("$qty x $(item)s")`, notes: [{ at: "$(item)", text: "parentheses end the name" }] },
            { code: `price = 4.5
println("Price: $price EUR")
println("Escaped: \\$price")`, notes: [{ at: "\\$", text: "literal dollar sign" }] }
          ]
        },
        {
          id: "literals-and-concatenation", n: 2, title: "multiline, raw and concatenation", level: 2,
          gloss: "Writes multiline and raw strings and joins strings with star and caret.",
          examples: [
            { code: `poem = """
first line
second line"""
println(poem)`, notes: [{ at: "\"\"\"", text: "spans several lines" }] },
            { code: `path = raw"C:\\temp\\logs"
println(path)`, notes: [{ at: "raw\"C:", text: "no escapes" }] },
            { code: `greeting = "Hello" * ", " * "world"
println(greeting)
println("ab"^3)`, notes: [{ at: "*", text: "concatenation" }, { at: "^", text: "repetition" }] }
          ]
        },
        {
          id: "string-functions", n: 3, title: "string functions", level: 1,
          gloss: "Handles trimming, splitting and searching with standard string functions.",
          examples: [
            { code: `title = "  Quarterly Report  "
println(strip(title))
println(uppercase(strip(title)))`, notes: [{ at: "strip", text: "removes outer whitespace" }] },
            { code: `csv = "ada,grace,linus"
names = split(csv, ",")
println(join(names, " | "))`, notes: [{ at: "split", text: "vector of substrings" }] },
            { code: `file = "report.final.pdf"
println(endswith(file, ".pdf"))
println(startswith(file, "report"))
println(file[1:6])`, notes: [{ at: "file[1:6]", text: "slice by index" }] },
            { code: `text = "red apple, red car"
println(replace(text, "red" => "green"))
println(occursin("apple", text))
println(findfirst("apple", text))`, notes: [{ at: "=>", text: "pair of old and new" }] }
          ]
        },
        {
          id: "chars-and-indexing", n: 4, title: "characters and indexing", level: 1,
          gloss: "Reads characters by index and loops over a string.",
          examples: [
            { code: `word = "julia"
println(word[1])
println(word[end])
println(length(word))`, notes: [{ at: "word[1]", text: "indexing starts at one" }, { at: "end", text: "last index" }] },
            { code: `for c in "abc"
    println(c, " ", Int(c))
end`, notes: [{ at: "Int(c)", text: "character code" }] },
            { code: `println(reverse("stream"))
println(collect("abc"))
println(isuppercase('A'))`, notes: [] }
          ]
        },
        {
          id: "regex-and-formatting", n: 5, title: "regex and formatting", level: 2,
          gloss: "Matches patterns with regex literals and formats numbers with Printf.",
          examples: [
            { code: `using Printf
@printf("%s has %d items\\n", "cart", 3)
println(@sprintf("%.2f", 3.14159))`, notes: [{ at: "@printf", text: "c-style formatting" }] },
            { code: `m = match(r"(\\d+)-(\\d+)", "call 555-1234")
println(m.captures)`, notes: [{ at: "r\"(\\d+)", text: "regex literal" }] },
            { code: `println(occursin(r"^\\w+@\\w+\\.com$", "ada@example.com"))
println(replace("a1b22", r"\\d+" => "#"))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "arrays-ranges",
      n: 3,
      title: "arrays & ranges",
      concepts: [
        {
          id: "creating-arrays", n: 1, title: "creating arrays", level: 1,
          gloss: "Builds vectors with literals and constructors.",
          examples: [
            { code: `scores = [90, 72, 85]
println(scores[1])
println(length(scores))`, notes: [{ at: "scores[1]", text: "first element" }] },
            { code: `zeros_row = zeros(3)
fills = fill("x", 2)
println(zeros_row, fills)`, notes: [{ at: "fill", text: "repeats one value" }] },
            { code: `names = ["ada", "grace"]
push!(names, "linus")
println(names)`, notes: [{ at: "push!", text: "bang means it mutates" }] }
          ]
        },
        {
          id: "modifying-arrays", n: 2, title: "adding and removing", level: 1,
          gloss: "Grows and shrinks vectors at either end or at an index.",
          examples: [
            { code: `items = [1, 2, 3]
push!(items, 4)
pop!(items)
pushfirst!(items, 0)
println(items)`, notes: [{ at: "pop!", text: "removes the last element" }] },
            { code: `names = ["ada", "grace", "linus"]
deleteat!(names, 2)
insert!(names, 1, "kay")
println(names)`, notes: [{ at: "insert!", text: "before the given index" }] },
            { code: `queue = [1, 2, 3]
first_item = popfirst!(queue)
append!(queue, [9, 8])
println(first_item, " ", queue)`, notes: [{ at: "append!", text: "adds many elements" }] }
          ]
        },
        {
          id: "ranges-and-slicing", n: 3, title: "ranges and slicing", level: 1,
          gloss: "Generates sequences with colons and slices vectors by range.",
          examples: [
            { code: `println(collect(1:5))
println(collect(0:2:10))
println(collect(10:-3:1))`, notes: [{ at: "0:2:10", text: "start, step, stop" }] },
            { code: `v = [10, 20, 30, 40]
println(v[2:3])
println(v[end])
println(v[[1, 4]])`, notes: [{ at: "v[[1, 4]]", text: "pick by index list" }] },
            { code: `println(range(0, 1, length=5))
println(sum(1:100))`, notes: [{ at: "range", text: "fixed number of points" }] }
          ]
        },
        {
          id: "matrices", n: 4, title: "matrices", level: 2,
          gloss: "Builds two-dimensional arrays and indexes rows and columns.",
          examples: [
            { code: `m = [1 2 3; 4 5 6]
println(size(m))
println(m[2, 3])
println(m[:, 2])`, notes: [{ at: ";", text: "starts a new row" }, { at: "m[:, 2]", text: "whole column" }] },
            { code: `a = [1 2; 3 4]
b = [5 6; 7 8]
println(a * b)`, notes: [{ at: "*", text: "matrix product" }] },
            { code: `m = reshape(1:6, 2, 3)
println(m)
println(sum(m, dims=1))`, notes: [{ at: "dims=1", text: "sums down each column" }] }
          ]
        },
        {
          id: "sorting-searching", n: 5, title: "sorting and searching", level: 1,
          gloss: "Orders vectors and finds elements and extremes.",
          examples: [
            { code: `nums = [3, 1, 2]
println(sort(nums))
println(sort(nums, rev=true))
println(findfirst(==(1), nums))`, notes: [{ at: "==(1)", text: "partially applied equality" }] },
            { code: `words = ["pear", "fig", "apple"]
println(sort(words, by=length))
println(maximum(length, words))`, notes: [{ at: "by=length", text: "sort key" }] },
            { code: `nums = [3, 8, 1, 9]
println(argmax(nums))
println(extrema(nums))
println(3 in nums)`, notes: [{ at: "argmax", text: "index of the maximum" }] }
          ]
        }
      ]
    },
    {
      id: "dict-tuple-set",
      n: 4,
      title: "Dict, Tuple, Set",
      concepts: [
        {
          id: "dicts", n: 1, title: "Dict", level: 1,
          gloss: "Maps keys to values with Dict and the pair operator.",
          examples: [
            { code: `stock = Dict("apple" => 4, "pear" => 0)
stock["plum"] = 7
println(stock["apple"])`, notes: [{ at: "=>", text: "key to value" }] },
            { code: `ages = Dict(:ada => 36, :linus => 54)
println(get(ages, :grace, 0))
println(haskey(ages, :ada))`, notes: [{ at: "get", text: "default for missing keys" }, { at: ":ada", text: "symbol key" }] },
            { code: `prices = Dict("tea" => 2.5)
prices["cake"] = 4.0
delete!(prices, "tea")
println(prices)`, notes: [] }
          ]
        },
        {
          id: "iterating-dicts", n: 2, title: "iterating dictionaries", level: 2,
          gloss: "Loops over pairs, keys and values and builds new dictionaries.",
          examples: [
            { code: `ages = Dict("ada" => 36, "linus" => 54)
for (name, age) in ages
    println("$name: $age")
end`, notes: [{ at: "(name, age)", text: "destructures each pair" }] },
            { code: `prices = Dict("tea" => 2.5, "cake" => 4.0)
println(sort(collect(keys(prices))))
println(sum(values(prices)))`, notes: [{ at: "keys", text: "lazy view of the keys" }] },
            { code: `stock = Dict("a" => 1, "b" => 0)
println(filter(p -> p.second > 0, stock))
println(Dict(k => v * 2 for (k, v) in stock))`, notes: [{ at: "p.second", text: "the value of a pair" }] }
          ]
        },
        {
          id: "tuples", n: 3, title: "tuples", level: 1,
          gloss: "Groups a fixed number of values, optionally with names.",
          examples: [
            { code: `point = (3, 4)
println(point[1])
x, y = point
println(x + y)`, notes: [{ at: "x, y = point", text: "unpacks the tuple" }] },
            { code: `user = (name="ada", age=36)
println(user.name)
println(keys(user))`, notes: [{ at: "(name=\"ada\"", text: "named tuple" }] },
            { code: `function min_max(v)
    return minimum(v), maximum(v)
end
low, high = min_max([3, 1, 2])
println(low, " ", high)`, notes: [{ at: "return minimum(v), maximum(v)", text: "returns a tuple" }] }
          ]
        },
        {
          id: "sets", n: 4, title: "Set", level: 1,
          gloss: "Keeps unique values and combines sets.",
          examples: [
            { code: `tags = Set(["julia", "web"])
push!(tags, "julia")
push!(tags, "cli")
println(length(tags))`, notes: [{ at: "push!", text: "ignores duplicates" }] },
            { code: `a = Set([1, 2, 3])
b = Set([3, 4])
println(intersect(a, b))
println(union(a, b))`, notes: [] },
            { code: `seen = Set{Int}()
println(push!(seen, 7))
println(7 in seen)`, notes: [{ at: "Set{Int}()", text: "empty typed set" }] }
          ]
        }
      ]
    },
    {
      id: "functions-multiple-dispatch",
      n: 5,
      title: "functions & multiple dispatch",
      concepts: [
        {
          id: "defining-functions", n: 1, title: "defining functions", level: 1,
          gloss: "Defines functions with a block or the compact assignment form.",
          examples: [
            { code: `function square(n)
    return n * n
end
println(square(4))`, notes: [{ at: "function", text: "block form" }] },
            { code: `area(w, h) = w * h
println(area(3, 4))`, notes: [{ at: "area(w, h) =", text: "one-line form" }] },
            { code: `function volume(w, h, d)
    w * h * d
end
println(volume(2, 3, 4))`, notes: [{ at: "w * h * d", text: "returned implicitly" }] }
          ]
        },
        {
          id: "optional-keyword", n: 2, title: "optional, keyword and variadic arguments", level: 2,
          gloss: "Gives arguments defaults, names them after a semicolon or collects extras.",
          examples: [
            { code: `function connect(host, port=80)
    return "$host:$port"
end
println(connect("example.com"))`, notes: [{ at: "port=80", text: "optional positional" }] },
            { code: `function price(base; tax=0.2, discount=0)
    return base * (1 + tax) - discount
end
println(price(100, discount=5))`, notes: [{ at: ";", text: "keywords follow" }] },
            { code: `function total(values...)
    return sum(values)
end
println(total(1, 2, 3))`, notes: [{ at: "values...", text: "collects into a tuple" }] }
          ]
        },
        {
          id: "multiple-dispatch", n: 3, title: "multiple dispatch", level: 2,
          gloss: "Chooses a method from the types of all arguments.",
          examples: [
            { code: `describe(x::Int) = "integer $x"
describe(x::String) = "text $x"
describe(x::Float64) = "float $x"
println(describe(1), ", ", describe("a"))`, notes: [{ at: "x::Int", text: "method for integers" }] },
            { code: `area(r::Number) = 3.14159 * r^2
area(w::Number, h::Number) = w * h
println(area(2), " ", area(2, 3))`, notes: [{ at: "area(r::Number)", text: "one argument" }, { at: "area(w::Number, h::Number)", text: "two arguments" }] },
            { code: `combine(a::Int, b::Int) = a + b
combine(a::String, b::String) = a * b
println(combine(1, 2), combine("a", "b"))`, notes: [] }
          ]
        },
        {
          id: "anonymous-functions", n: 4, title: "anonymous functions and closures", level: 2,
          gloss: "Writes unnamed functions with arrows and returns functions from functions.",
          examples: [
            { code: `double = x -> x * 2
println(double(4))
println(map(x -> x^2, 1:4))`, notes: [{ at: "->", text: "anonymous function" }] },
            { code: `function make_adder(n)
    return x -> x + n
end
add5 = make_adder(5)
println(add5(10))`, notes: [{ at: "n", text: "captured by the closure" }] },
            { code: `nums = [3, 1, 2]
println(sort(nums, by=x -> -x))
println(filter(iseven, 1:10))`, notes: [] }
          ]
        },
        {
          id: "do-blocks-pipes", n: 5, title: "do blocks and pipes", level: 3,
          gloss: "Passes multiline anonymous functions with do and chains calls with the pipe.",
          examples: [
            { code: `result = map([1, 2, 3]) do x
    x * 10
end
println(result)`, notes: [{ at: "do", text: "block becomes the first argument" }] },
            { code: `open("out.txt", "w") do io
    println(io, "hello")
end
println(read("out.txt", String))
rm("out.txt")`, notes: [{ at: "open(\"out.txt\", \"w\") do io", text: "closes the file after" }] },
            { code: `nums = [4, 9, 16]
println(nums |> sum |> sqrt)`, notes: [{ at: "|>", text: "feeds the result forward" }] }
          ]
        }
      ]
    },
    {
      id: "control-flow-comprehensions",
      n: 6,
      title: "control flow & comprehensions",
      concepts: [
        {
          id: "conditionals", n: 1, title: "conditionals", level: 1,
          gloss: "Branches with if, elseif, else, the ternary operator and short-circuit forms.",
          examples: [
            { code: `temperature = 28
if temperature > 25
    println("warm")
elseif temperature > 10
    println("mild")
else
    println("cold")
end`, notes: [{ at: "elseif", text: "one word" }] },
            { code: `score = 72
println(score >= 60 ? "pass" : "fail")`, notes: [{ at: "? \"pass\"", text: "ternary operator" }] },
            { code: `x = 5
x > 3 && println("big")
x < 3 || println("not small")`, notes: [{ at: "&&", text: "runs the right side if true" }, { at: "||", text: "runs the right side if false" }] }
          ]
        },
        {
          id: "loops", n: 2, title: "for and while loops", level: 1,
          gloss: "Repeats code over ranges, collections and conditions.",
          examples: [
            { code: `for i in 1:3
    println(i)
end`, notes: [] },
            { code: `for (i, name) in enumerate(["ada", "grace"])
    println("$i: $name")
end`, notes: [{ at: "enumerate", text: "index and element" }] },
            { code: `function countdown(n)
    while n > 0
        println(n)
        n -= 1
    end
end
countdown(3)`, notes: [] }
          ]
        },
        {
          id: "break-continue", n: 3, title: "break, continue and nested loops", level: 1,
          gloss: "Skips or stops iterations and nests loops in one statement.",
          examples: [
            { code: `for i in 1:10
    i == 3 && continue
    i > 5 && break
    println(i)
end`, notes: [{ at: "continue", text: "next iteration" }] },
            { code: `for i in 1:2, j in 1:2
    println(i, j)
end`, notes: [{ at: "i in 1:2, j in 1:2", text: "nested loops in one line" }] },
            { code: `function first_multiple(k)
    n = 0
    while true
        n += 1
        n % k == 0 && break
    end
    return n
end
println(first_multiple(7))`, notes: [] }
          ]
        },
        {
          id: "comprehensions", n: 4, title: "comprehensions and generators", level: 2,
          gloss: "Builds arrays and lazy sequences from a loop expression.",
          examples: [
            { code: `squares = [n^2 for n in 1:5]
println(squares)`, notes: [{ at: "[n^2 for n in 1:5]", text: "array comprehension" }] },
            { code: `evens = [n for n in 1:10 if iseven(n)]
println(evens)`, notes: [{ at: "if", text: "filters elements" }] },
            { code: `table = [i * j for i in 1:3, j in 1:3]
println(table)
println(sum(n^2 for n in 1:4))`, notes: [{ at: "for i in 1:3, j in 1:3", text: "two-dimensional result" }] }
          ]
        }
      ]
    },
    {
      id: "structs-mutability",
      n: 7,
      title: "structs & mutability",
      concepts: [
        {
          id: "immutable-structs", n: 1, title: "immutable structs", level: 1,
          gloss: "Groups typed fields in a struct whose values cannot change.",
          examples: [
            { code: `struct Point
    x::Float64
    y::Float64
end
p = Point(3.0, 4.0)
println(p.x)`, notes: [{ at: "struct", text: "immutable by default" }, { at: "::Float64", text: "field type" }] },
            { code: `struct User
    name::String
    age::Int
end
ada = User("ada", 36)
println(ada)`, notes: [] },
            { code: `struct Rectangle
    width::Float64
    height::Float64
end
area(r::Rectangle) = r.width * r.height
println(area(Rectangle(3, 4)))`, notes: [{ at: "Rectangle(3, 4)", text: "converts to Float64" }] }
          ]
        },
        {
          id: "mutable-structs", n: 2, title: "mutable structs", level: 1,
          gloss: "Allows field changes with mutable struct and rejects them otherwise.",
          examples: [
            { code: `mutable struct Counter
    value::Int
end
c = Counter(0)
c.value += 1
println(c.value)`, notes: [{ at: "mutable", text: "fields can be assigned" }] },
            { code: `mutable struct Account
    owner::String
    balance::Float64
end
acc = Account("ada", 100)
acc.balance -= 30
println(acc)`, notes: [] },
            { code: `struct Frozen
    x::Int
end
f = Frozen(1)
try
    f.x = 2
catch e
    println(typeof(e))
end`, notes: [{ at: "f.x = 2", text: "throws on immutable structs" }] }
          ]
        },
        {
          id: "constructors", n: 3, title: "constructors", level: 2,
          gloss: "Validates or defaults fields with inner and outer constructors.",
          examples: [
            { code: `struct Port
    value::Int
    function Port(value)
        1 <= value <= 65535 || error("invalid port")
        new(value)
    end
end
println(Port(8080).value)`, notes: [{ at: "new", text: "builds the instance" }] },
            { code: `Base.@kwdef struct Config
    host::String = "localhost"
    port::Int = 80
end
println(Config(port=8080))`, notes: [{ at: "@kwdef", text: "keyword constructor with defaults" }] },
            { code: `struct Circle
    r::Float64
end
Circle() = Circle(1.0)
println(Circle().r)`, notes: [{ at: "Circle()", text: "outer constructor" }] }
          ]
        },
        {
          id: "methods-and-show", n: 4, title: "methods, show and operators", level: 2,
          gloss: "Adds behaviour to types with methods and extends Base functions.",
          examples: [
            { code: `struct Point
    x::Int
    y::Int
end
Base.show(io::IO, p::Point) = print(io, "($(p.x), $(p.y))")
println(Point(1, 2))`, notes: [{ at: "Base.show", text: "controls printing" }] },
            { code: `struct Money
    cents::Int
end
Base.:+(a::Money, b::Money) = Money(a.cents + b.cents)
println((Money(5) + Money(7)).cents)`, notes: [{ at: "Base.:+", text: "extends the plus operator" }] },
            { code: `struct Temp
    c::Float64
end
tofahrenheit(t::Temp) = t.c * 9 / 5 + 32
println(tofahrenheit(Temp(100)))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "abstract-parametric-types",
      n: 8,
      title: "abstract & parametric types",
      concepts: [
        {
          id: "abstract-types", n: 1, title: "abstract types", level: 1,
          gloss: "Declares a supertype with abstract type and subtypes it with the less-than-colon operator.",
          examples: [
            { code: `abstract type Animal end
struct Dog <: Animal end
struct Cat <: Animal end
speak(::Dog) = "woof"
speak(::Cat) = "meow"
println(speak(Dog()))`, notes: [{ at: "<:", text: "is a subtype of" }, { at: "::Dog", text: "unnamed argument" }] },
            { code: `abstract type Shape end
struct Circle <: Shape
    r::Float64
end
struct Square <: Shape
    side::Float64
end
area(c::Circle) = 3.14159 * c.r^2
area(s::Square) = s.side^2
println(area(Square(2)))`, notes: [] },
            { code: `println(Int <: Number)
println(supertype(Int))
println(Float64 <: AbstractFloat)`, notes: [{ at: "supertype", text: "parent in the hierarchy" }] }
          ]
        },
        {
          id: "parametric-types", n: 2, title: "parametric types", level: 2,
          gloss: "Parameterises a struct over the types of its fields.",
          examples: [
            { code: `struct Box{T}
    value::T
end
println(Box(42))
println(Box("text"))`, notes: [{ at: "{T}", text: "type parameter" }] },
            { code: `struct Pair{A, B}
    first::A
    second::B
end
p = Pair(1, "one")
println(typeof(p))`, notes: [] },
            { code: `struct Stack{T}
    items::Vector{T}
end
s = Stack{Int}([1, 2])
push!(s.items, 3)
println(s.items)`, notes: [{ at: "Stack{Int}", text: "explicit parameter" }] }
          ]
        },
        {
          id: "parametric-methods", n: 3, title: "parametric methods and bounds", level: 2,
          gloss: "Writes methods over type parameters with where and bounds.",
          examples: [
            { code: `firstof(v::Vector{T}) where T = v[1]
println(firstof([5, 6]))`, notes: [{ at: "where T", text: "introduces a type variable" }] },
            { code: `largest(xs::Vector{T}) where T <: Real = maximum(xs)
println(largest([3, 9, 2]))`, notes: [{ at: "T <: Real", text: "upper bound" }] },
            { code: `struct Wrapper{T<:Number}
    value::T
end
println(Wrapper(2.5))`, notes: [] }
          ]
        },
        {
          id: "unions-and-nothing", n: 4, title: "unions and nothing", level: 2,
          gloss: "Accepts several types with Union and models absence with nothing.",
          examples: [
            { code: `function describe(x::Union{Int, String})
    return x isa Int ? "number" : "text"
end
println(describe(1), describe("a"))`, notes: [{ at: "Union", text: "either type" }] },
            { code: `value = nothing
println(isnothing(value))
println(something(value, 0))`, notes: [{ at: "something", text: "first non-nothing value" }] },
            { code: `println(typeof(1) == Int)
println(isa(1.0, AbstractFloat))
println(typeof([1.5]))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "broadcasting",
      n: 9,
      title: "broadcasting",
      concepts: [
        {
          id: "dot-operators", n: 1, title: "dot operators", level: 1,
          gloss: "Applies an operator to every element with a leading dot.",
          examples: [
            { code: `prices = [5.0, 12.5, 8.0]
println(prices .* 2)
println(prices .+ 1)`, notes: [{ at: ".*", text: "element-wise multiply" }] },
            { code: `x = [1, 2, 3]
println(x .^ 2)
println(x .> 1)`, notes: [] },
            { code: `a = [1, 2, 3]
b = [10, 20, 30]
println(a .+ b)
println(a .* b)`, notes: [] }
          ]
        },
        {
          id: "broadcasting-functions", n: 2, title: "broadcasting functions", level: 1,
          gloss: "Calls a function on every element with a trailing dot.",
          examples: [
            { code: `println(sqrt.([4, 9, 16]))
println(uppercase.(["a", "b"]))`, notes: [{ at: "sqrt.", text: "broadcasts the call" }] },
            { code: `f(x) = x^2 + 1
println(f.(1:4))`, notes: [] },
            { code: `println(round.(Int, [1.4, 2.6]))
println(length.(["tea", "cake"]))`, notes: [] }
          ]
        },
        {
          id: "shapes-and-fusion", n: 3, title: "shapes, fusion and in-place updates", level: 2,
          gloss: "Expands dimensions and fuses operations with the at-dot macro, then updates in place.",
          examples: [
            { code: `col = [1, 2, 3]
row = [10 20]
println(col .+ row)`, notes: [{ at: "col .+ row", text: "column and row make a grid" }] },
            { code: `x = [1.0, 2.0, 3.0]
y = @. 2x^2 + 3x + 1
println(y)`, notes: [{ at: "@.", text: "dots every operation" }] },
            { code: `v = [1, 2, 3]
v .= v .* 2
println(v)`, notes: [{ at: ".=", text: "writes into v" }] }
          ]
        },
        {
          id: "map-and-reduce", n: 4, title: "map, reduce and mapreduce", level: 2,
          gloss: "Compares map with broadcasting and folds with reduce.",
          examples: [
            { code: `println(map(x -> x * 2, [1, 2, 3]))
println([1, 2, 3] .* 2)`, notes: [{ at: "map", text: "same result, explicit function" }] },
            { code: `println(mapreduce(x -> x^2, +, 1:4))
println(reduce(+, 1:4))`, notes: [{ at: "mapreduce", text: "map then fold" }] },
            { code: `println(collect(zip([1, 2], ["a", "b"])))
println(map((a, b) -> a * b, [1, 2], [3, 4]))`, notes: [{ at: "zip", text: "pairs elements" }] }
          ]
        }
      ]
    },
    {
      id: "macros-basics",
      n: 10,
      title: "macros basics",
      concepts: [
        {
          id: "using-macros", n: 1, title: "using built-in macros", level: 1,
          gloss: "Calls macros with an at sign to inspect, assert and time code.",
          examples: [
            { code: `x = 5
@show x
@assert x > 0
println("ok")`, notes: [{ at: "@show", text: "prints name and value" }, { at: "@assert", text: "errors when false" }] },
            { code: `t = @elapsed sum(1:1000)
println(t >= 0)`, notes: [{ at: "@elapsed", text: "seconds taken" }] },
            { code: `using Test
@test 1 + 1 == 2`, notes: [{ at: "@test", text: "from the Test library" }] }
          ]
        },
        {
          id: "inspecting-macros", n: 2, title: "timing and expanding", level: 2,
          gloss: "Times expressions and shows what a macro call expands to.",
          examples: [
            { code: `@time sum(1:1_000_000)`, notes: [{ at: "@time", text: "prints time and allocations" }] },
            { code: `println(@macroexpand @assert true)`, notes: [{ at: "@macroexpand", text: "shows the generated code" }] },
            { code: `using Test
@testset "arithmetic" begin
    @test 2 * 3 == 6
    @test 7 % 2 == 1
end`, notes: [{ at: "@testset", text: "groups tests" }] }
          ]
        },
        {
          id: "defining-macros", n: 3, title: "defining macros", level: 3,
          gloss: "Writes macros that return code to be compiled in place of the call.",
          examples: [
            { code: `macro twice(expr)
    return quote
        $(esc(expr))
        $(esc(expr))
    end
end
@twice println("hi")`, notes: [{ at: "macro", text: "receives unevaluated code" }, { at: "esc", text: "keeps the caller's scope" }] },
            { code: `macro square(x)
    return :($(esc(x))^2)
end
println(@square(4))`, notes: [] },
            { code: `macro hello()
    return :(println("hello"))
end
@hello`, notes: [] }
          ]
        },
        {
          id: "expressions-and-quoting", n: 4, title: "expressions and quoting", level: 3,
          gloss: "Represents code as data with quote and evaluates it with eval.",
          examples: [
            { code: `ex = :(1 + 2)
println(eval(ex))
println(typeof(ex))`, notes: [{ at: ":(1 + 2)", text: "quoted expression" }] },
            { code: `ex = quote
    a = 1
    a + 1
end
println(eval(ex))`, notes: [{ at: "quote", text: "multi-line expression" }] },
            { code: `x = 10
ex = :($x + 1)
println(ex)
println(eval(ex))`, notes: [{ at: "$x", text: "splices in the value" }] }
          ]
        }
      ]
    },
    {
      id: "modules-packages",
      n: 11,
      title: "modules & packages",
      concepts: [
        {
          id: "modules", n: 1, title: "modules", level: 1,
          gloss: "Groups definitions in a module and brings them in with using.",
          examples: [
            { code: `module Geometry
export area
area(r) = 3.14159 * r^2
end
using .Geometry
println(area(2))`, notes: [{ at: "export", text: "names exposed by using" }, { at: ".Geometry", text: "module in this file" }] },
            { code: `module Shop
const TAX = 0.2
price(base) = base * (1 + TAX)
end
println(Shop.price(100))`, notes: [{ at: "Shop.price", text: "qualified access" }] },
            { code: `module Util
export clamp01
clamp01(x) = clamp(x, 0, 1)
end
import .Util: clamp01
println(clamp01(3))`, notes: [] }
          ]
        },
        {
          id: "standard-library", n: 2, title: "using the standard library", level: 1,
          gloss: "Loads standard library modules with using and import.",
          examples: [
            { code: `using Statistics
println(mean([1, 2, 3]))
println(std([1, 2, 3]))`, notes: [{ at: "using", text: "brings exports into scope" }] },
            { code: `using Dates
d = Date(2024, 3, 15)
println(d + Day(10))`, notes: [] },
            { code: `import Random
Random.seed!(1)
println(rand(1:10) in 1:10)`, notes: [{ at: "import", text: "names stay qualified" }] }
          ]
        },
        {
          id: "extending-and-selecting", n: 3, title: "selecting and extending names", level: 2,
          gloss: "Imports single names and extends functions from Base.",
          examples: [
            { code: `using LinearAlgebra: dot
println(dot([1, 2], [3, 4]))`, notes: [{ at: ": dot", text: "only this name" }] },
            { code: `import Base: length
struct Playlist
    songs::Vector{String}
end
length(p::Playlist) = length(p.songs)
println(length(Playlist(["a", "b"])))`, notes: [{ at: "import Base: length", text: "allows adding methods" }] },
            { code: `using Printf: @printf
@printf("%5.2f\\n", 3.14159)`, notes: [] }
          ]
        },
        {
          id: "nested-modules", n: 4, title: "nested modules and scope", level: 2,
          gloss: "Nests modules and reports the current module.",
          examples: [
            { code: `module Outer
module Inner
name() = string(@__MODULE__)
end
end
println(Outer.Inner.name())`, notes: [{ at: "@__MODULE__", text: "current module" }] },
            { code: `println(@__MODULE__)
println(parentmodule(sum))`, notes: [{ at: "parentmodule", text: "where a function lives" }] },
            { code: `module Config
export setting
setting = 3
end
using .Config
println(setting)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "error-handling",
      n: 12,
      title: "error handling",
      concepts: [
        {
          id: "try-catch", n: 1, title: "try and catch", level: 1,
          gloss: "Handles exceptions with try, catch and an optional bound variable.",
          examples: [
            { code: `try
    parse(Int, "abc")
catch e
    println("failed: ", typeof(e))
end`, notes: [{ at: "catch e", text: "binds the exception" }] },
            { code: `try
    sqrt(-1)
catch e
    println(e isa DomainError)
end`, notes: [] },
            { code: `result = try
    div(10, 0)
catch
    0
end
println(result)`, notes: [{ at: "try", text: "is an expression" }] }
          ]
        },
        {
          id: "throwing", n: 2, title: "throw and error", level: 1,
          gloss: "Raises errors with error, throw and custom exception types.",
          examples: [
            { code: `function withdraw(balance, amount)
    amount > balance && throw(ArgumentError("insufficient funds"))
    return balance - amount
end
println(withdraw(100, 30))`, notes: [{ at: "throw", text: "raises an exception object" }] },
            { code: `struct NotFound <: Exception
    id::Int
end
try
    throw(NotFound(7))
catch e
    println("missing ", e.id)
end`, notes: [{ at: "<: Exception", text: "custom exception type" }] },
            { code: `function check(x)
    x < 0 && error("negative value")
    return x
end
println(check(3))`, notes: [{ at: "error", text: "raises an ErrorException" }] }
          ]
        },
        {
          id: "finally-rethrow", n: 3, title: "finally and rethrow", level: 2,
          gloss: "Runs cleanup with finally and passes errors on with rethrow.",
          examples: [
            { code: `try
    println("work")
finally
    println("cleanup")
end`, notes: [{ at: "finally", text: "always runs" }] },
            { code: `try
    try
        error("inner")
    catch e
        rethrow()
    end
catch e
    println(e.msg)
end`, notes: [{ at: "rethrow", text: "keeps the original error" }] },
            { code: `try
    throw(DomainError(-1, "bad input"))
catch e
    println(sprint(showerror, e))
end`, notes: [{ at: "showerror", text: "readable message" }] }
          ]
        },
        {
          id: "safe-alternatives", n: 4, title: "assertions and safe lookups", level: 2,
          gloss: "Avoids exceptions with assertions, defaults and tryparse.",
          examples: [
            { code: `@assert 1 + 1 == 2 "math works"
println("passed")`, notes: [{ at: "@assert", text: "optional message" }] },
            { code: `d = Dict("a" => 1)
println(get(d, "b", nothing))
println(get(() -> 0, d, "b"))`, notes: [{ at: "get(() -> 0", text: "lazy default" }] },
            { code: `println(tryparse(Int, "12"))
println(tryparse(Int, "x"))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "iterators",
      n: 13,
      title: "iterators",
      concepts: [
        {
          id: "iterating-collections", n: 1, title: "iterating collections", level: 1,
          gloss: "Loops over arrays, dictionaries and strings with for.",
          examples: [
            { code: `for x in [10, 20, 30]
    println(x)
end`, notes: [] },
            { code: `for (k, v) in Dict("a" => 1)
    println(k, "=", v)
end`, notes: [{ at: "(k, v)", text: "unpacks each pair" }] },
            { code: `for (i, c) in enumerate("abc")
    println(i, c)
end`, notes: [] }
          ]
        },
        {
          id: "zip-and-iterators", n: 2, title: "zip and the Iterators module", level: 2,
          gloss: "Combines and slices sequences with zip and Iterators helpers.",
          examples: [
            { code: `for (a, b) in zip([1, 2, 3], ["x", "y", "z"])
    println(a, b)
end`, notes: [{ at: "zip", text: "stops at the shortest" }] },
            { code: `println(collect(Iterators.take(1:10, 3)))
println(collect(Iterators.drop(1:5, 3)))`, notes: [{ at: "Iterators.take", text: "first n items" }] },
            { code: `println(collect(Iterators.partition(1:6, 2)))
println(collect(Iterators.product(1:2, 3:4)))`, notes: [{ at: "partition", text: "chunks of two" }] }
          ]
        },
        {
          id: "custom-iterators", n: 3, title: "custom iterators", level: 3,
          gloss: "Makes a type iterable by defining Base.iterate.",
          examples: [
            { code: `struct Squares
    n::Int
end
Base.iterate(s::Squares, i=1) = i > s.n ? nothing : (i^2, i + 1)
Base.length(s::Squares) = s.n
println(collect(Squares(4)))`, notes: [{ at: "nothing", text: "signals the end" }, { at: "(i^2, i + 1)", text: "value and next state" }] },
            { code: `struct Countdown
    from::Int
end
function Base.iterate(c::Countdown, state=c.from)
    state < 1 && return nothing
    return (state, state - 1)
end
for n in Countdown(3)
    println(n)
end`, notes: [] },
            { code: `struct Evens
    limit::Int
end
function Base.iterate(e::Evens, n=0)
    n > e.limit ? nothing : (n, n + 2)
end
Base.length(e::Evens) = div(e.limit, 2) + 1
println(collect(Evens(6)))`, notes: [] }
          ]
        },
        {
          id: "generators-lazy", n: 4, title: "generators and lazy sequences", level: 2,
          gloss: "Produces values on demand with generators and Iterators.",
          examples: [
            { code: `gen = (n^2 for n in 1:5)
println(sum(gen))
println(first(gen))`, notes: [{ at: "(n^2 for n in 1:5)", text: "lazy generator" }] },
            { code: `println(collect(Iterators.filter(iseven, 1:10)))
println(collect(Iterators.map(x -> x * 2, 1:3)))`, notes: [] },
            { code: `cycled = Iterators.cycle([1, 2])
println(collect(Iterators.take(cycled, 5)))`, notes: [{ at: "cycle", text: "repeats forever" }] }
          ]
        }
      ]
    }
  ]
};
