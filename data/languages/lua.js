export default {
  id: "lua",
  name: "Lua",
  short: "LU",
  pigment: "lua",
  family: null,
  version: "5.5",
  lexer: "lua",
  indent: 4,
  topics: [
    {
      id: "locals-types",
      n: 1,
      title: "locals & types",
      concepts: [
        {
          id: "local-variables", n: 1, title: "local variables", level: 1,
          gloss: "Declares a variable that lives only in its scope.",
          examples: [
            { code: `local count = 0`, notes: [{ at: "local", text: "without it, the variable is global" }] },
            { code: `local name, age = "ada", 36`, notes: [] },
            { code: `local limit <const> = 100`, notes: [{ at: "<const>", text: "cannot be reassigned, Lua 5.4" }] }
          ]
        },
        {
          id: "types", n: 2, title: "types and type()", level: 1,
          gloss: "Reports a value's type name with type.",
          examples: [
            { code: `print(type(42), type("hi"), type(nil))`, notes: [] },
            { code: `print(type({}), type(print))`, notes: [] },
            { code: `local x = 3.0
print(math.type(x))`, notes: [{ at: "math.type", text: "distinguishes integer from float" }] }
          ]
        },
        {
          id: "nil-booleans", n: 3, title: "nil and booleans", level: 1,
          gloss: "Treats only nil and false as false in conditions.",
          examples: [
            { code: `if 0 then print("zero is true") end`, notes: [{ at: "0", text: "numbers are always truthy" }] },
            { code: `local name = nil
print(name or "anonymous")`, notes: [{ at: "or", text: "falls back when nil or false" }] },
            { code: `print(not nil, not 0)`, notes: [] }
          ]
        },
        {
          id: "numbers", n: 4, title: "integers and floats", level: 1,
          gloss: "Distinguishes integer and float numbers, with // and / for division.",
          examples: [
            { code: `print(7 // 2, 7 / 2)`, notes: [{ at: "7 // 2", text: "floor division gives 3" }] },
            { code: `print(7 % 3, 2 ^ 10)`, notes: [{ at: "2 ^ 10", text: "exponents always give a float" }] },
            { code: `print(math.floor(3.7), math.ceil(3.2))`, notes: [] }
          ]
        },
        {
          id: "converting-values", n: 5, title: "converting values", level: 1,
          gloss: "Converts between text and numbers with tonumber and tostring.",
          examples: [
            { code: `local n = tonumber("42")`, notes: [] },
            { code: `print(tonumber("abc"))`, notes: [{ at: "tonumber", text: "returns nil when it cannot parse" }] },
            { code: `print(tostring(3.5) .. " units")`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "strings-concatenation",
      n: 2,
      title: "strings & concatenation",
      concepts: [
        {
          id: "concatenation", n: 1, title: "concatenation", level: 1,
          gloss: "Joins strings with the double-dot operator.",
          examples: [
            { code: `local s = "hello" .. ", " .. "world"`, notes: [{ at: "..", text: "the concatenation operator" }] },
            { code: `local line = "id=" .. 7`, notes: [{ at: "7", text: "numbers convert automatically" }] },
            { code: `local parts = {"a", "b", "c"}
print(table.concat(parts, "-"))`, notes: [{ at: "table.concat", text: "faster than repeated concatenation" }] }
          ]
        },
        {
          id: "length-case", n: 2, title: "length and case", level: 1,
          gloss: "Measures a string and changes its case.",
          examples: [
            { code: `print(#"platen")`, notes: [{ at: "#", text: "the length operator" }] },
            { code: `local s = "Hello"
print(s:lower(), s:upper())`, notes: [{ at: "s:lower()", text: "sugar for string.lower(s)" }] },
            { code: `print(("x"):rep(3, ","))`, notes: [{ at: ":rep(3", text: "repeats the string three times" }] }
          ]
        },
        {
          id: "sub-find", n: 3, title: "sub and find", level: 1,
          gloss: "Slices strings by position and searches for text.",
          examples: [
            { code: `print(("platen"):sub(1, 3))`, notes: [{ at: "1, 3", text: "1-based, both ends included" }] },
            { code: `print(("a tale"):find("tale"))`, notes: [{ at: ":find(", text: "returns start and end positions" }] },
            { code: `print(("platen"):sub(-3))`, notes: [{ at: "-3", text: "counts from the end" }] }
          ]
        },
        {
          id: "string-format", n: 4, title: "string.format", level: 1,
          gloss: "Builds text from a template with printf-style specifiers.",
          examples: [
            { code: `print(string.format("%d items", 3))`, notes: [] },
            { code: `print(string.format("%.2f", 3.14159))`, notes: [{ at: "%.2f", text: "two decimal places" }] },
            { code: `print(string.format("%-8s|%5d", "ada", 42))`, notes: [{ at: "%-8s", text: "left-aligned in 8 columns" }] }
          ]
        },
        {
          id: "bytes-characters", n: 5, title: "bytes and characters", level: 2,
          gloss: "Converts between characters and their numeric codes.",
          examples: [
            { code: `print(("A"):byte())`, notes: [{ at: ":byte()", text: "the code of the first byte" }] },
            { code: `print(string.char(72, 105))`, notes: [] },
            { code: `print(utf8.char(72, 228))`, notes: [{ at: "utf8.char", text: "builds text from code points" }] }
          ]
        }
      ]
    },
    {
      id: "tables-arrays",
      n: 3,
      title: "tables as arrays",
      concepts: [
        {
          id: "array-literals", n: 1, title: "array literals", level: 1,
          gloss: "Stores a sequence in a table indexed from one.",
          examples: [
            { code: `local fruits = {"apple", "pear", "plum"}
print(fruits[1])`, notes: [{ at: "fruits[1]", text: "arrays start at 1 in Lua" }] },
            { code: `local nums = {10, 20, 30}
print(#nums)`, notes: [] },
            { code: `local grid = {{1, 2}, {3, 4}}
print(grid[2][1])`, notes: [{ at: "grid[2][1]", text: "row first, then column" }] }
          ]
        },
        {
          id: "appending-inserting", n: 2, title: "appending and inserting", level: 1,
          gloss: "Grows an array with table.insert or by index.",
          examples: [
            { code: `local t = {1, 2}
table.insert(t, 3)`, notes: [{ at: "table.insert(t, 3)", text: "appends to the end" }] },
            { code: `local t = {1, 2}
table.insert(t, 1, 0)`, notes: [{ at: "1, 0", text: "insert 0 at position 1" }] },
            { code: `local t = {1, 2, 3}
t[#t + 1] = 4`, notes: [{ at: "#t + 1", text: "the first free slot" }] }
          ]
        },
        {
          id: "removing-items", n: 3, title: "removing items", level: 1,
          gloss: "Takes items out of an array and shifts the rest down.",
          examples: [
            { code: `local t = {1, 2, 3}
table.remove(t)`, notes: [{ at: "table.remove(t)", text: "removes and returns the last item" }] },
            { code: `local t = {1, 2, 3}
table.remove(t, 1)`, notes: [] },
            { code: `local t = {1, 2, 3}
local last = table.remove(t)`, notes: [] }
          ]
        },
        {
          id: "sorting-unpacking", n: 4, title: "sorting and unpacking", level: 2,
          gloss: "Orders an array in place and spreads it into separate values.",
          examples: [
            { code: `local t = {3, 1, 2}
table.sort(t)`, notes: [{ at: "table.sort", text: "sorts in place, returns nothing" }] },
            { code: `local t = {3, 1, 2}
table.sort(t, function(a, b) return a > b end)`, notes: [{ at: "function(a, b)", text: "returns true if a goes first" }] },
            { code: `print(table.unpack({1, 2, 3}))`, notes: [] }
          ]
        },
        {
          id: "holes-length", n: 5, title: "holes and length", level: 3,
          gloss: "Counts arguments and array items reliably despite nil holes.",
          examples: [
            { code: `local t = {1, 2, nil, 4}
print(#t)`, notes: [{ at: "nil", text: "a hole makes # unreliable" }] },
            { code: `print(select("#", 1, nil, 3))`, notes: [{ at: '"#"', text: "counts arguments, even nils" }] },
            { code: `local packed = table.pack(1, nil, 3)
print(packed.n)`, notes: [{ at: ".n", text: "the true count, holes included" }] }
          ]
        }
      ]
    },
    {
      id: "tables-maps",
      n: 4,
      title: "tables as maps",
      concepts: [
        {
          id: "records", n: 1, title: "records", level: 1,
          gloss: "Maps string keys to values with table fields.",
          examples: [
            { code: `local user = {name = "ada", age = 36}`, notes: [{ at: "name =", text: "a key written as a bare name" }] },
            { code: `local user = {name = "ada", age = 36}
print(user.name)`, notes: [] },
            { code: `local user = {name = "ada", age = 36}
user["age"] = 37`, notes: [{ at: '["age"]', text: "the same as user.age" }] }
          ]
        },
        {
          id: "missing-keys", n: 2, title: "missing keys", level: 1,
          gloss: "Returns nil for keys that do not exist instead of raising an error.",
          examples: [
            { code: `local t = {}
print(t.missing)`, notes: [{ at: "t.missing", text: "nil, not an error" }] },
            { code: `local counts = {}
counts.apple = (counts.apple or 0) + 1`, notes: [{ at: "or 0", text: "a default for a missing key" }] },
            { code: `local t = {}
if t.name == nil then print("unset") end`, notes: [] }
          ]
        },
        {
          id: "deleting-keys", n: 3, title: "deleting keys", level: 1,
          gloss: "Removes a key by assigning nil and counts what is left.",
          examples: [
            { code: `local t = {a = 1, b = 2}
t.a = nil`, notes: [{ at: "t.a = nil", text: "assigning nil deletes the key" }] },
            { code: `print(next({}) == nil)`, notes: [{ at: "next", text: "returns nil for an empty table" }] },
            { code: `local n = 0
for _ in pairs({a = 1, b = 2}) do n = n + 1 end`, notes: [{ at: "_", text: "a throwaway loop variable" }] }
          ]
        },
        {
          id: "nested-tables", n: 4, title: "nested tables", level: 2,
          gloss: "Builds structured data by putting tables inside tables.",
          examples: [
            { code: `local cfg = {db = {host = "localhost", port = 5432}}
print(cfg.db.port)`, notes: [] },
            { code: `local cfg = {db = {port = 5432}}
cfg.db.port = 5433`, notes: [] },
            { code: `local list = {{id = 1}, {id = 2}}
print(list[2].id)`, notes: [] }
          ]
        },
        {
          id: "any-value-keys", n: 5, title: "any value as a key", level: 2,
          gloss: "Uses numbers, strings or even tables as keys.",
          examples: [
            { code: `local t = {[10] = "ten", ["a b"] = 1}`, notes: [{ at: "[10]", text: "brackets allow non-name keys" }] },
            { code: `local key = {}
local t = {[key] = "value"}`, notes: [{ at: "[key]", text: "a table used as a key" }] },
            { code: `local t = {}
t[1.0] = "a"
print(t[1])`, notes: [{ at: "t[1.0]", text: "floats with whole values become integers" }] }
          ]
        }
      ]
    },
    {
      id: "ipairs-pairs",
      n: 5,
      title: "ipairs & pairs",
      concepts: [
        {
          id: "ipairs", n: 1, title: "ipairs", level: 1,
          gloss: "Walks an array in order until the first nil.",
          examples: [
            { code: `for i, v in ipairs({"a", "b", "c"}) do
    print(i, v)
end`, notes: [{ at: "ipairs", text: "index and value, in order" }] },
            { code: `local total = 0
for _, n in ipairs({1, 2, 3}) do
    total = total + n
end`, notes: [] },
            { code: `for i, v in ipairs({1, 2, nil, 4}) do
    print(i, v)
end`, notes: [{ at: "nil", text: "iteration stops at the first hole" }] }
          ]
        },
        {
          id: "pairs", n: 2, title: "pairs", level: 1,
          gloss: "Visits every key and value, in no guaranteed order.",
          examples: [
            { code: `for k, v in pairs({a = 1, b = 2}) do
    print(k, v)
end`, notes: [{ at: "pairs", text: "the order is not guaranteed" }] },
            { code: `local keys = {}
for k in pairs({x = 1, y = 2}) do
    keys[#keys + 1] = k
end`, notes: [] },
            { code: `local t = {10, 20, a = 1}
for k, v in pairs(t) do
    print(k, v)
end`, notes: [{ at: "pairs(t)", text: "visits array and map parts alike" }] }
          ]
        },
        {
          id: "numeric-for", n: 3, title: "numeric for", level: 1,
          gloss: "Counts with a start, a stop and an optional step.",
          examples: [
            { code: `for i = 1, 3 do
    print(i)
end`, notes: [{ at: "1, 3", text: "both ends are included" }] },
            { code: `for i = 10, 1, -3 do
    print(i)
end`, notes: [{ at: "-3", text: "a negative step counts down" }] },
            { code: `local t = {"a", "b", "c"}
for i = #t, 1, -1 do
    print(t[i])
end`, notes: [] }
          ]
        },
        {
          id: "sorted-iteration", n: 4, title: "sorted iteration", level: 2,
          gloss: "Sorts the keys first when a stable order matters.",
          examples: [
            { code: `local t = {b = 2, a = 1}
local keys = {}
for k in pairs(t) do
    keys[#keys + 1] = k
end
table.sort(keys)`, notes: [{ at: "table.sort(keys)", text: "now the order is predictable" }] },
            { code: `local keys = {"a", "b", "c"}
table.sort(keys, function(x, y) return x > y end)`, notes: [] },
            { code: `local t = {b = 2, a = 1}
local keys = {}
for k in pairs(t) do
    keys[#keys + 1] = k
end
table.sort(keys)
for _, k in ipairs(keys) do
    print(k, t[k])
end`, notes: [] }
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
          id: "if-elseif-else", n: 1, title: "if, elseif, else", level: 1,
          gloss: "Chooses one branch of code based on a chain of conditions.",
          examples: [
            { code: `local score = 85
if score >= 90 then
    print("A")
elseif score >= 80 then
    print("B")
else
    print("C")
end`, notes: [{ at: "elseif", text: "one word in Lua" }] },
            { code: `local x = 5
if x ~= nil and x > 0 then
    print("positive")
end`, notes: [{ at: "~=", text: "the not-equal operator" }] },
            { code: `local age = 20
local label = age >= 18 and "adult" or "minor"`, notes: [{ at: "and", text: "the and/or idiom acts as a ternary" }] }
          ]
        },
        {
          id: "while-repeat", n: 2, title: "while and repeat", level: 1,
          gloss: "Loops while a condition holds, testing before or after each pass.",
          examples: [
            { code: `local n = 10
while n > 0 do
    n = n // 2
end`, notes: [] },
            { code: `local tries = 0
repeat
    tries = tries + 1
until tries >= 3`, notes: [{ at: "until", text: "the body runs at least once" }] },
            { code: `local i = 1
while true do
    i = i + 1
    if i > 5 then break end
end`, notes: [{ at: "break", text: "leaves the loop" }] }
          ]
        },
        {
          id: "goto-continue", n: 3, title: "goto continue", level: 3,
          gloss: "Skips to the next iteration with a goto label.",
          examples: [
            { code: `for i = 1, 5 do
    if i % 2 == 0 then goto continue end
    print(i)
    ::continue::
end`, notes: [{ at: "::continue::", text: "a label at the end of the loop body" }] },
            { code: `for i = 1, 3 do
    for j = 1, 3 do
        if j == 2 then goto next_i end
        print(i, j)
    end
    ::next_i::
end`, notes: [{ at: "goto next_i", text: "jumps out of the inner loop" }] },
            { code: `for _, name in ipairs({"a", "", "b"}) do
    if name == "" then goto skip end
    print(name)
    ::skip::
end`, notes: [] }
          ]
        },
        {
          id: "comparison-logic", n: 4, title: "comparison and logic", level: 1,
          gloss: "Compares values without coercion and combines them with and, or and not.",
          examples: [
            { code: `print(1 == 1.0, "1" == 1)`, notes: [{ at: '"1" == 1', text: "no coercion, so false" }] },
            { code: `print(nil and 1, false or "x")`, notes: [{ at: "nil and 1", text: "and returns its first falsy operand" }] },
            { code: `print(1 < 2, "a" < "b")`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "functions-varargs",
      n: 7,
      title: "functions & varargs",
      concepts: [
        {
          id: "defining-functions", n: 1, title: "defining functions", level: 1,
          gloss: "Packages reusable code in a function that returns a value.",
          examples: [
            { code: `local function add(a, b)
    return a + b
end`, notes: [{ at: "local function", text: "visible to itself for recursion" }] },
            { code: `local square = function(n) return n * n end`, notes: [] },
            { code: `function greet(name)
    return "hello, " .. name
end`, notes: [{ at: "function greet", text: "a global function" }] }
          ]
        },
        {
          id: "default-arguments", n: 2, title: "default arguments", level: 1,
          gloss: "Fills in a missing argument with the or operator.",
          examples: [
            { code: `local function greet(name)
    name = name or "world"
    return "hello, " .. name
end`, notes: [{ at: 'name or "world"', text: "used when name is nil or false" }] },
            { code: `local function pad(n, width)
    width = width or 4
    return string.format("%0" .. width .. "d", n)
end`, notes: [] },
            { code: `local function retry(times)
    times = times or 3
    return times
end`, notes: [] }
          ]
        },
        {
          id: "varargs", n: 3, title: "varargs", level: 2,
          gloss: "Accepts any number of arguments with three dots.",
          examples: [
            { code: `local function sum(...)
    local total = 0
    for _, n in ipairs({...}) do
        total = total + n
    end
    return total
end`, notes: [{ at: "...", text: "packs the extra arguments" }] },
            { code: `local function count(...)
    return select("#", ...)
end`, notes: [{ at: 'select("#", ...)', text: "counts arguments, nils included" }] },
            { code: `local function first(...)
    return (select(1, ...))
end`, notes: [{ at: "(select(1, ...))", text: "parentheses keep one value" }] }
          ]
        },
        {
          id: "named-arguments", n: 4, title: "named arguments", level: 2,
          gloss: "Passes a table so the arguments can be named.",
          examples: [
            { code: `local function connect(opts)
    return opts.host .. ":" .. opts.port
end
print(connect{host = "localhost", port = 80})`, notes: [{ at: "connect{", text: "a table call needs no parentheses" }] },
            { code: `local function box(opts)
    local w = opts.width or 10
    local h = opts.height or 5
    return w * h
end`, notes: [] },
            { code: `local greet = function(t)
    return t.greeting .. ", " .. t.name
end
print(greet{greeting = "hi", name = "ada"})`, notes: [] }
          ]
        },
        {
          id: "functions-as-values", n: 5, title: "functions as values", level: 2,
          gloss: "Passes functions around like any other value.",
          examples: [
            { code: `local function apply(f, x)
    return f(x)
end
print(apply(math.sqrt, 16))`, notes: [{ at: "math.sqrt", text: "passed without calling it" }] },
            { code: `local ops = {add = function(a, b) return a + b end}
print(ops.add(2, 3))`, notes: [] },
            { code: `local t = {3, 1, 2}
table.sort(t, function(a, b) return a > b end)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "multiple-returns",
      n: 8,
      title: "multiple returns",
      concepts: [
        {
          id: "returning-several", n: 1, title: "returning several values", level: 1,
          gloss: "Hands back more than one result from a function.",
          examples: [
            { code: `local function minmax(a, b)
    if a < b then return a, b end
    return b, a
end`, notes: [] },
            { code: `local function divmod(a, b)
    return a // b, a % b
end`, notes: [{ at: "a // b, a % b", text: "two results, separated by a comma" }] },
            { code: `local function stats(t)
    return #t, t[1], t[#t]
end`, notes: [] }
          ]
        },
        {
          id: "receiving-values", n: 2, title: "receiving several values", level: 1,
          gloss: "Assigns each returned value to its own variable.",
          examples: [
            { code: `local function two() return 1, 2 end
local a, b = two()`, notes: [] },
            { code: `local function two() return 1, 2 end
local a = two()`, notes: [{ at: "local a", text: "extra values are dropped" }] },
            { code: `local function two() return 1, 2 end
local a, b, c = two()`, notes: [{ at: "c", text: "missing values become nil" }] }
          ]
        },
        {
          id: "adjusting-values", n: 3, title: "when values are cut", level: 2,
          gloss: "Keeps only the first value when a call is not the last expression.",
          examples: [
            { code: `local function two() return 1, 2 end
print(two(), 10)`, notes: [{ at: "two()", text: "only the first value, not last" }] },
            { code: `local function two() return 1, 2 end
print(10, two())`, notes: [{ at: "two()", text: "last position: all values kept" }] },
            { code: `local function two() return 1, 2 end
local t = {two()}
print(#t)`, notes: [] }
          ]
        },
        {
          id: "unpack-pack", n: 4, title: "unpack and pack", level: 2,
          gloss: "Converts between tables and lists of values.",
          examples: [
            { code: `print(table.unpack({1, 2, 3}))`, notes: [] },
            { code: `local t = {table.unpack({1, 2, 3}, 2)}`, notes: [{ at: ", 2", text: "start from index 2" }] },
            { code: `local function wrap(...)
    return table.pack(...)
end`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "closures",
      n: 9,
      title: "closures",
      concepts: [
        {
          id: "closure-basics", n: 1, title: "closures", level: 2,
          gloss: "Captures local variables so a function remembers them.",
          examples: [
            { code: `local function counter()
    local n = 0
    return function()
        n = n + 1
        return n
    end
end`, notes: [{ at: "n = n + 1", text: "n lives on after counter returns" }] },
            { code: `local function counter()
    local n = 0
    return function()
        n = n + 1
        return n
    end
end
local next_id = counter()
print(next_id(), next_id())`, notes: [{ at: "counter()", text: "each call makes a fresh n" }] },
            { code: `local function adder(x)
    return function(y) return x + y end
end
local add5 = adder(5)
print(add5(10))`, notes: [] }
          ]
        },
        {
          id: "shared-upvalues", n: 2, title: "shared upvalues", level: 3,
          gloss: "Shares one variable between several closures.",
          examples: [
            { code: `local function account(balance)
    local function deposit(n) balance = balance + n end
    local function get() return balance end
    return deposit, get
end`, notes: [{ at: "balance", text: "one variable, two closures" }] },
            { code: `local function account(balance)
    local function deposit(n) balance = balance + n end
    local function get() return balance end
    return deposit, get
end
local deposit, get = account(100)
deposit(50)
print(get())`, notes: [] },
            { code: `local fns = {}
for i = 1, 3 do
    fns[i] = function() return i end
end
print(fns[1](), fns[3]())`, notes: [{ at: "for i", text: "each iteration gets a fresh i" }] }
          ]
        },
        {
          id: "iterator-closures", n: 3, title: "iterators and callbacks", level: 3,
          gloss: "Builds stateful iterators and higher-order helpers from closures.",
          examples: [
            { code: `local function range(n)
    local i = 0
    return function()
        i = i + 1
        if i <= n then return i end
    end
end`, notes: [{ at: "if i <= n", text: "returning nothing ends the loop" }] },
            { code: `local function range(n)
    local i = 0
    return function()
        i = i + 1
        if i <= n then return i end
    end
end
for v in range(3) do
    print(v)
end`, notes: [] },
            { code: `local function map(f, t)
    local out = {}
    for i, v in ipairs(t) do out[i] = f(v) end
    return out
end`, notes: [] }
          ]
        },
        {
          id: "memoization", n: 4, title: "memoization", level: 3,
          gloss: "Caches results inside a closure so repeated calls are cheap.",
          examples: [
            { code: `local function memoize(f)
    local cache = {}
    return function(x)
        if cache[x] == nil then cache[x] = f(x) end
        return cache[x]
    end
end`, notes: [{ at: "local cache", text: "private to this wrapper" }] },
            { code: `local function memoize(f)
    local cache = {}
    return function(x)
        if cache[x] == nil then cache[x] = f(x) end
        return cache[x]
    end
end
local fast = memoize(function(n) return n * n end)
print(fast(4), fast(4))`, notes: [] },
            { code: `local function once(f)
    local done, result
    return function(...)
        if not done then done, result = true, f(...) end
        return result
    end
end`, notes: [{ at: "done, result", text: "two upvalues, both nil at first" }] }
          ]
        }
      ]
    },
    {
      id: "metatables",
      n: 10,
      title: "metatables",
      concepts: [
        {
          id: "setmetatable", n: 1, title: "setmetatable", level: 2,
          gloss: "Attaches a metatable that customizes a table's behavior.",
          examples: [
            { code: `local t = setmetatable({}, {})`, notes: [{ at: "setmetatable", text: "returns the table it was given" }] },
            { code: `local mt = {}
local t = setmetatable({}, mt)
print(getmetatable(t) == mt)`, notes: [] },
            { code: `print(getmetatable("abc").__index == string)`, notes: [{ at: "__index", text: "strings share the string table" }] }
          ]
        },
        {
          id: "index-metamethod", n: 2, title: "__index", level: 2,
          gloss: "Falls back to another table or function for missing keys.",
          examples: [
            { code: `local defaults = {color = "red"}
local t = setmetatable({}, {__index = defaults})
print(t.color)`, notes: [{ at: "__index = defaults", text: "missing keys are looked up here" }] },
            { code: `local t = setmetatable({}, {
    __index = function(_, key) return key .. "?" end,
})
print(t.name)`, notes: [{ at: "function(_, key)", text: "receives the table and the key" }] },
            { code: `local t = setmetatable({}, {__index = function() return 0 end})
t.hits = t.hits + 1`, notes: [] }
          ]
        },
        {
          id: "newindex-metamethod", n: 3, title: "__newindex", level: 3,
          gloss: "Intercepts writes to keys that do not exist yet.",
          examples: [
            { code: `local log = {}
local t = setmetatable({}, {
    __newindex = function(_, k, v) log[#log + 1] = k end,
})
t.x = 1`, notes: [{ at: "__newindex", text: "runs only for keys not yet present" }] },
            { code: `local ro = setmetatable({}, {
    __newindex = function() error("read-only table") end,
})`, notes: [] },
            { code: `local t = setmetatable({}, {__newindex = function() end})
rawset(t, "x", 1)
print(rawget(t, "x"))`, notes: [{ at: "rawset", text: "bypasses the metamethods" }] }
          ]
        },
        {
          id: "operator-metamethods", n: 4, title: "operator metamethods", level: 3,
          gloss: "Defines what +, == and tostring do for your own tables.",
          examples: [
            { code: `local V = {}
V.__index = V
V.__add = function(a, b)
    return setmetatable({x = a.x + b.x}, V)
end`, notes: [{ at: "V.__add", text: "runs for a + b on these tables" }] },
            { code: `local mt = {__tostring = function(t) return "<" .. t.x .. ">" end}
print(setmetatable({x = 1}, mt))`, notes: [{ at: "__tostring", text: "used by print and tostring" }] },
            { code: `local mt = {__eq = function(a, b) return a.x == b.x end}
local p = setmetatable({x = 1}, mt)
local q = setmetatable({x = 1}, mt)
print(p == q)`, notes: [{ at: "__eq", text: "only called when both are tables" }] }
          ]
        },
        {
          id: "call-len-concat", n: 5, title: "__call, __len and __concat", level: 3,
          gloss: "Makes tables callable, measurable and joinable.",
          examples: [
            { code: `local f = setmetatable({}, {__call = function(_, x) return x * 2 end})
print(f(4))`, notes: [{ at: "__call", text: "lets a table be called like a function" }] },
            { code: `local t = setmetatable({}, {__len = function() return 99 end})
print(#t)`, notes: [] },
            { code: `local t = setmetatable({}, {__concat = function() return "joined" end})
print(t .. "x")`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "oop-metatables",
      n: 11,
      title: "OOP via metatables",
      concepts: [
        {
          id: "class-pattern", n: 1, title: "the class pattern", level: 2,
          gloss: "Builds classes from a table, __index and a constructor.",
          examples: [
            { code: `local Dog = {}
Dog.__index = Dog

function Dog.new(name)
    return setmetatable({name = name}, Dog)
end`, notes: [{ at: "Dog.__index = Dog", text: "instances look up methods on Dog" }] },
            { code: `local Dog = {}
Dog.__index = Dog
function Dog.new(name) return setmetatable({name = name}, Dog) end
function Dog:speak() return self.name .. " says woof" end
print(Dog.new("rex"):speak())`, notes: [] },
            { code: `local Point = {}
Point.__index = Point
function Point.new(x, y)
    return setmetatable({x = x, y = y}, Point)
end
function Point:len2() return self.x ^ 2 + self.y ^ 2 end`, notes: [] }
          ]
        },
        {
          id: "colon-syntax", n: 2, title: "colon syntax", level: 2,
          gloss: "Passes the object as self when calling with a colon.",
          examples: [
            { code: `local t = {n = 0}
function t:inc() self.n = self.n + 1 end
t:inc()`, notes: [{ at: "t:inc()", text: "same as t.inc(t)" }] },
            { code: `local t = {n = 0}
function t.inc(self) self.n = self.n + 1 end
t.inc(t)`, notes: [{ at: "t.inc(t)", text: "what the colon does for you" }] },
            { code: `print(("abc"):upper())`, notes: [] }
          ]
        },
        {
          id: "inheritance", n: 3, title: "inheritance", level: 3,
          gloss: "Reuses a base class by chaining metatables.",
          examples: [
            { code: `local Animal = {}
Animal.__index = Animal
local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog`, notes: [{ at: "{__index = Animal}", text: "lookups fall through to Animal" }] },
            { code: `local Animal = {}
Animal.__index = Animal
function Animal:name() return "animal" end
local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog
print(setmetatable({}, Dog):name())`, notes: [] },
            { code: `local Animal = {}
Animal.__index = Animal
function Animal:speak() return "..." end
local Dog = setmetatable({}, {__index = Animal})
Dog.__index = Dog
function Dog:speak() return Animal.speak(self) .. " woof" end
print(setmetatable({}, Dog):speak())`, notes: [{ at: "Animal.speak(self)", text: "calls the parent's version" }] }
          ]
        },
        {
          id: "printing-objects", n: 4, title: "printing and comparing objects", level: 3,
          gloss: "Gives instances readable output and ordering with metamethods.",
          examples: [
            { code: `local P = {}
P.__index = P
P.__tostring = function(p) return "(" .. p.x .. ", " .. p.y .. ")" end
print(setmetatable({x = 1, y = 2}, P))`, notes: [] },
            { code: `local P = {}
P.__index = P
P.__add = function(a, b) return setmetatable({x = a.x + b.x}, P) end
print((setmetatable({x = 1}, P) + setmetatable({x = 2}, P)).x)`, notes: [{ at: "P.__add", text: "defines + for instances" }] },
            { code: `local P = {}
P.__index = P
P.__lt = function(a, b) return a.x < b.x end
print(setmetatable({x = 1}, P) < setmetatable({x = 2}, P))`, notes: [{ at: "P.__lt", text: "defines < for instances" }] }
          ]
        },
        {
          id: "private-state", n: 5, title: "private state", level: 3,
          gloss: "Hides data in a closure instead of a field.",
          examples: [
            { code: `local function Counter()
    local n = 0
    return {inc = function() n = n + 1 return n end}
end`, notes: [{ at: "local n", text: "unreachable from outside" }] },
            { code: `local function Counter()
    local n = 0
    return {inc = function() n = n + 1 return n end}
end
local c = Counter()
print(c.inc(), c.inc())`, notes: [] },
            { code: `local function Account(balance)
    return {
        deposit = function(n) balance = balance + n end,
        balance = function() return balance end,
    }
end`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "modules-require",
      n: 12,
      title: "modules & require",
      concepts: [
        {
          id: "require", n: 1, title: "require", level: 1,
          gloss: "Loads a module once and returns what the module returns.",
          examples: [
            { code: `local mathx = require("mathx")
print(mathx.square(4))`, notes: [{ at: 'require("mathx")', text: "finds mathx.lua on the search path" }] },
            { code: `local square = require("mathx").square`, notes: [{ at: ".square", text: "keeps just one function" }] },
            { code: `print(require("mathx") == require("mathx"))`, notes: [{ at: "==", text: "true: both calls return the same table" }] }
          ]
        },
        {
          id: "module-pattern", n: 2, title: "writing a module", level: 2,
          gloss: "Returns a table of functions from a file.",
          examples: [
            { code: `local M = {}
function M.square(n) return n * n end
function M.cube(n) return n * n * n end

return M`, notes: [{ at: "return M", text: "what require hands to the caller" }] },
            { code: `local M = {}
local secret = 42
function M.reveal() return secret end
return M`, notes: [{ at: "local secret", text: "private: not exported" }] },
            { code: `local M = {count = 0}
function M.bump()
    M.count = M.count + 1
    return M.count
end
return M`, notes: [{ at: "M.count", text: "module state is shared by all callers" }] }
          ]
        },
        {
          id: "package-tables", n: 3, title: "package.path and loaded", level: 3,
          gloss: "Controls where require looks and what it has already loaded.",
          examples: [
            { code: `print(package.path)`, notes: [{ at: "package.path", text: "semicolon-separated search templates" }] },
            { code: `package.path = "./lib/?.lua;" .. package.path`, notes: [{ at: "?", text: "replaced by the module name" }] },
            { code: `package.loaded["fake"] = {answer = 42}
print(require("fake").answer)`, notes: [{ at: "package.loaded", text: "the cache require consults first" }] }
          ]
        },
        {
          id: "optional-modules", n: 4, title: "optional modules", level: 3,
          gloss: "Loads a module that may be missing without crashing.",
          examples: [
            { code: `local ok, mod = pcall(require, "missing_module")`, notes: [{ at: "pcall", text: "returns false instead of raising" }] },
            { code: `local ok, mod = pcall(require, "missing_module")
if not ok then print("module not found") end`, notes: [] },
            { code: `local ok, mod = pcall(require, "mathx")
local square = ok and mod.square or function(n) return n * n end`, notes: [{ at: "ok and mod.square or", text: "a fallback when loading fails" }] }
          ]
        }
      ]
    },
    {
      id: "string-patterns",
      n: 13,
      title: "string patterns",
      concepts: [
        {
          id: "find-match", n: 1, title: "find and match", level: 2,
          gloss: "Searches strings with Lua patterns instead of regexes.",
          examples: [
            { code: `print(("order 42"):match("%d+"))`, notes: [{ at: "%d+", text: "one or more digits" }] },
            { code: `print(("key=value"):match("(%w+)=(%w+)"))`, notes: [{ at: "(%w+)=(%w+)", text: "each group is returned" }] },
            { code: `print(("a.b"):find(".", 1, true))`, notes: [{ at: "1, true", text: "plain search, no patterns" }] }
          ]
        },
        {
          id: "gsub", n: 2, title: "gsub", level: 2,
          gloss: "Replaces every match, returning the new string and a count.",
          examples: [
            { code: `print(("a b c"):gsub(" ", "-"))`, notes: [{ at: ":gsub(", text: "returns the string and the count" }] },
            { code: `print(("hello"):gsub("l", string.upper))`, notes: [{ at: "string.upper", text: "a function computes each replacement" }] },
            { code: `local s = ("  trim  "):gsub("^%s+", ""):gsub("%s+$", "")`, notes: [{ at: "^%s+", text: "^ anchors to the start" }] }
          ]
        },
        {
          id: "gmatch", n: 3, title: "gmatch", level: 2,
          gloss: "Iterates over every match in a string.",
          examples: [
            { code: `for word in ("a bb ccc"):gmatch("%a+") do
    print(word)
end`, notes: [{ at: "%a+", text: "runs of letters" }] },
            { code: `for k, v in ("a=1,b=2"):gmatch("(%w+)=(%w+)") do
    print(k, v)
end`, notes: [] },
            { code: `local n = 0
for _ in ("banana"):gmatch("a") do n = n + 1 end`, notes: [] }
          ]
        },
        {
          id: "pattern-classes", n: 4, title: "pattern classes", level: 2,
          gloss: "Matches character classes such as %d, %a and %s.",
          examples: [
            { code: `print(("abc123"):match("%a+"))`, notes: [{ at: "%a", text: "a letter" }] },
            { code: `print(("x1y22"):gsub("%d", "#"))`, notes: [{ at: "%d", text: "a digit" }] },
            { code: `print(("a,b;c"):find("[,;]"))`, notes: [{ at: "[,;]", text: "a set: comma or semicolon" }] }
          ]
        },
        {
          id: "anchors-captures", n: 5, title: "anchors and captures", level: 3,
          gloss: "Pins a match to the ends of the string and captures parts of it.",
          examples: [
            { code: `print(("2024-01-05"):match("^(%d+)-(%d+)-(%d+)$"))`, notes: [{ at: "$", text: "anchors to the end of the string" }] },
            { code: `print(("hello world"):match("^(%w+)"))`, notes: [] },
            { code: `print(("  x"):match("^%s*(.-)%s*$"))`, notes: [{ at: "(.-)", text: "a lazy match of anything" }] }
          ]
        }
      ]
    },
    {
      id: "errors-pcall",
      n: 14,
      title: "errors & pcall",
      concepts: [
        {
          id: "error-pcall", n: 1, title: "error and pcall", level: 2,
          gloss: "Raises an error and catches it with pcall.",
          examples: [
            { code: `local ok, err = pcall(function() error("boom") end)
print(ok, err)`, notes: [{ at: "pcall", text: "a protected call that never raises" }] },
            { code: `local ok, res = pcall(function() return 1 + 1 end)
print(ok, res)`, notes: [{ at: "ok, res", text: "true plus the return values" }] },
            { code: `print(pcall(error, "x"))`, notes: [] }
          ]
        },
        {
          id: "error-values", n: 2, title: "error values", level: 2,
          gloss: "Raises tables or strings and controls the level reported.",
          examples: [
            { code: `local ok, e = pcall(error, {code = 404})
print(e.code)`, notes: [{ at: "{code = 404}", text: "any value can be an error" }] },
            { code: `local ok, e = pcall(function() error("bad input", 2) end)`, notes: [{ at: ", 2", text: "blames the caller, not this line" }] },
            { code: `local ok, e = pcall(error, "plain", 0)
print(e)`, notes: [{ at: ", 0", text: "no position prefix added" }] }
          ]
        },
        {
          id: "assert", n: 3, title: "assert", level: 1,
          gloss: "Raises an error unless its first argument is truthy.",
          examples: [
            { code: `local n = assert(tonumber("42"), "not a number")`, notes: [{ at: "assert", text: "returns its arguments when they pass" }] },
            { code: `print(pcall(assert, false, "failed"))`, notes: [] },
            { code: `print(pcall(assert, io.open("missing.txt")))`, notes: [{ at: "io.open", text: "returns nil plus a message on failure" }] }
          ]
        },
        {
          id: "xpcall", n: 4, title: "xpcall and tracebacks", level: 3,
          gloss: "Runs code with a handler that sees the error first.",
          examples: [
            { code: `local ok, msg = xpcall(
    function() error("oops") end,
    function(e) return "handled: " .. e end
)`, notes: [{ at: "function(e)", text: "the handler receives the error value" }] },
            { code: `print(xpcall(function() return 1 end, print))`, notes: [] },
            { code: `local ok, tb = xpcall(error, debug.traceback, "x")`, notes: [{ at: "debug.traceback", text: "adds a stack trace to the message" }] }
          ]
        },
        {
          id: "nil-plus-message", n: 5, title: "nil plus a message", level: 2,
          gloss: "Signals expected failures by returning nil and a message.",
          examples: [
            { code: `local function parse(s)
    local n = tonumber(s)
    if not n then return nil, "not a number" end
    return n
end`, notes: [{ at: 'nil, "not a number"', text: "the usual Lua failure convention" }] },
            { code: `local function parse(s)
    local n = tonumber(s)
    if not n then return nil, "not a number" end
    return n
end
local n, err = parse("abc")
print(n, err)`, notes: [] },
            { code: `local f, err = io.open("missing.txt")
print(f, err)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "coroutines",
      n: 15,
      title: "coroutines",
      concepts: [
        {
          id: "create-resume", n: 1, title: "create and resume", level: 2,
          gloss: "Runs a function that can pause and continue later.",
          examples: [
            { code: `local co = coroutine.create(function() print("hi") end)
coroutine.resume(co)`, notes: [{ at: "coroutine.resume", text: "starts or continues the coroutine" }] },
            { code: `local co = coroutine.wrap(function() print("run") end)
co()`, notes: [{ at: "coroutine.wrap", text: "returns a plain function to resume it" }] },
            { code: `local co = coroutine.create(function() end)
print(coroutine.status(co))`, notes: [{ at: "status", text: "suspended, running or dead" }] }
          ]
        },
        {
          id: "yield", n: 2, title: "yield", level: 2,
          gloss: "Pauses a coroutine and hands a value back.",
          examples: [
            { code: `local co = coroutine.wrap(function()
    coroutine.yield(1)
    coroutine.yield(2)
end)
print(co(), co())`, notes: [{ at: "coroutine.yield(1)", text: "pauses and returns 1 to the caller" }] },
            { code: `local co = coroutine.create(function()
    coroutine.yield("paused")
end)
print(coroutine.resume(co))`, notes: [{ at: "coroutine.resume(co)", text: "returns true plus the yielded value" }] },
            { code: `local co = coroutine.create(function(a)
    local b = coroutine.yield(a + 1)
    return a + b
end)
print(coroutine.resume(co, 1))
print(coroutine.resume(co, 10))`, notes: [{ at: "coroutine.yield(a + 1)", text: "the next resume's value comes back here" }] }
          ]
        },
        {
          id: "generators", n: 3, title: "generators", level: 3,
          gloss: "Produces a sequence lazily with a coroutine iterator.",
          examples: [
            { code: `local function gen(n)
    return coroutine.wrap(function()
        for i = 1, n do coroutine.yield(i) end
    end)
end`, notes: [{ at: "coroutine.wrap", text: "the result works directly in a for loop" }] },
            { code: `local function gen(n)
    return coroutine.wrap(function()
        for i = 1, n do coroutine.yield(i) end
    end)
end
for v in gen(3) do print(v) end`, notes: [] },
            { code: `local function fib()
    return coroutine.wrap(function()
        local a, b = 0, 1
        while true do
            coroutine.yield(a)
            a, b = b, a + b
        end
    end)
end`, notes: [{ at: "while true", text: "infinite, yet only runs when asked" }] }
          ]
        },
        {
          id: "status-and-errors", n: 4, title: "status and errors", level: 3,
          gloss: "Checks whether a coroutine finished or failed.",
          examples: [
            { code: `local co = coroutine.create(function() end)
coroutine.resume(co)
print(coroutine.status(co))`, notes: [{ at: "coroutine.status(co)", text: "dead once the function returns" }] },
            { code: `local co = coroutine.create(function() error("x") end)
print(coroutine.resume(co))`, notes: [{ at: "coroutine.resume(co)", text: "false plus the error message" }] },
            { code: `local co = coroutine.create(function() end)
coroutine.resume(co)
print(coroutine.resume(co))`, notes: [{ at: "print(coroutine.resume(co))", text: "false: cannot resume a dead coroutine" }] }
          ]
        },
        {
          id: "coroutine-utilities", n: 5, title: "producers and utilities", level: 3,
          gloss: "Passes items between coroutines and asks where code is running.",
          examples: [
            { code: `local producer = coroutine.wrap(function()
    for _, item in ipairs({"a", "b"}) do coroutine.yield(item) end
end)
print(producer(), producer())`, notes: [] },
            { code: `print(coroutine.isyieldable())`, notes: [{ at: "isyieldable", text: "false on the main thread" }] },
            { code: `local co, main = coroutine.running()
print(main)`, notes: [{ at: "main", text: "true on the main thread" }] }
          ]
        }
      ]
    }
  ]
};
