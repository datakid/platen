export default {
  id: "elixir",
  name: "Elixir",
  short: "EX",
  pigment: "elixir",
  family: null,
  version: "1.20",
  lexer: "elixir",
  indent: 2,
  topics: [
    {
      id: "values-types",
      n: 1,
      title: "values & types",
      concepts: [
        {
          id: "basic-types", n: 1, title: "basic types", level: 1,
          gloss: "Prints and tests integers, floats, booleans, atoms and strings.",
          examples: [
            { code: `IO.puts(42)
IO.puts(3.14)
IO.puts(true)
IO.puts(:ok)
IO.puts("text")`, notes: [{ at: ":ok", text: "an atom" }] },
            { code: `IO.inspect(is_integer(42))
IO.inspect(is_float(1.5))
IO.inspect(is_atom(:ok))
IO.inspect(is_binary("hi"))`, notes: [{ at: "is_binary", text: "true for strings" }] },
            { code: `IO.inspect(7 / 2)
IO.inspect(div(7, 2))
IO.inspect(rem(7, 2))
IO.inspect(2 ** 10)`, notes: [{ at: "/", text: "always a float" }, { at: "div", text: "integer division" }] }
          ]
        },
        {
          id: "variables", n: 2, title: "variables and rebinding", level: 1,
          gloss: "Binds names to immutable values and rebinds them.",
          examples: [
            { code: `city = "Oslo"
visits = 0
visits = visits + 1
IO.puts("#{city}: #{visits}")`, notes: [{ at: "visits =", text: "rebinding, not mutation" }] },
            { code: `price = 9.99
quantity = 3
total = price * quantity
IO.puts(total)`, notes: [] },
            { code: `x = 1
rebound = fn -> x end
x = 2
IO.puts(rebound.())`, notes: [{ at: "fn -> x end", text: "captured the earlier value" }] }
          ]
        },
        {
          id: "atoms-booleans-nil", n: 3, title: "atoms, booleans and nil", level: 1,
          gloss: "Works with atoms and the logical operators and, or, not and the short-circuit pair.",
          examples: [
            { code: `status = :active
IO.inspect(status == :active)
IO.inspect(:"with space")`, notes: [{ at: ":\"with space\"", text: "atom with spaces" }] },
            { code: `IO.inspect(true and false)
IO.inspect(nil || "default")
IO.inspect(not true)`, notes: [{ at: "and", text: "needs booleans" }, { at: "||", text: "works with any value" }] },
            { code: `IO.inspect(nil)
IO.inspect(is_nil(nil))
IO.inspect(1 && 2)`, notes: [] }
          ]
        },
        {
          id: "strings", n: 4, title: "strings", level: 1,
          gloss: "Handles joining, interpolation and case changes of UTF-8 strings.",
          examples: [
            { code: `name = "ada"
IO.puts("Hello, #{name}")
IO.puts("Hello, " <> name)`, notes: [{ at: "#{name}", text: "interpolation" }, { at: "<>", text: "concatenation" }] },
            { code: `IO.puts(String.upcase("quiet"))
IO.puts(String.length("héllo"))
IO.inspect(String.split("a,b,c", ","))`, notes: [] },
            { code: `IO.inspect(String.trim("  padded  "))
IO.inspect(String.replace("red apple", "red", "green"))
IO.inspect(String.contains?("apple", "pl"))`, notes: [{ at: "contains?", text: "predicate ends in ?" }] }
          ]
        }
      ]
    },
    {
      id: "pattern-matching",
      n: 2,
      title: "pattern matching",
      concepts: [
        {
          id: "match-operator", n: 1, title: "the match operator", level: 1,
          gloss: "Binds variables by matching the right side against the left.",
          examples: [
            { code: `{status, value} = {:ok, 42}
IO.inspect(status)
IO.inspect(value)`, notes: [{ at: "=", text: "match, not assignment" }] },
            { code: `[first, second | rest] = [1, 2, 3, 4]
IO.inspect({first, second, rest})`, notes: [{ at: "| rest", text: "remaining elements" }] },
            { code: `x = 5
5 = x
IO.puts("matched")`, notes: [{ at: "5 = x", text: "succeeds because values equal" }] }
          ]
        },
        {
          id: "destructuring", n: 2, title: "maps, tuples and the pin operator", level: 2,
          gloss: "Extracts values from maps and tuples and matches existing values with a caret.",
          examples: [
            { code: `%{name: name, age: age} = %{name: "ada", age: 36}
IO.puts("#{name} is #{age}")`, notes: [{ at: "%{name: name, age: age}", text: "partial map match" }] },
            { code: `expected = 5
^expected = 5
IO.puts("pinned")`, notes: [{ at: "^expected", text: "use the existing value" }] },
            { code: `{:ok, %{id: id}} = {:ok, %{id: 7, role: :admin}}
IO.inspect(id)`, notes: [] }
          ]
        },
        {
          id: "function-heads", n: 3, title: "matching in function heads", level: 1,
          gloss: "Chooses a function clause by the shape of its arguments.",
          examples: [
            { code: `defmodule Math do
  def describe(0), do: "zero"
  def describe(n) when n > 0, do: "positive"
  def describe(_), do: "negative"
end
IO.puts(Math.describe(3))`, notes: [{ at: "when", text: "guard" }] },
            { code: `defmodule Shape do
  def area({:circle, r}), do: 3.14159 * r * r
  def area({:rect, w, h}), do: w * h
end
IO.puts(Shape.area({:rect, 3, 4}))`, notes: [{ at: "{:circle, r}", text: "tagged tuple" }] },
            { code: `defmodule Lists do
  def first([]), do: nil
  def first([head | _]), do: head
end
IO.inspect(Lists.first([1, 2]))`, notes: [] }
          ]
        },
        {
          id: "repeated-and-failed", n: 4, title: "repeated variables and match errors", level: 2,
          gloss: "Matches equal values with repeated names and raises MatchError otherwise.",
          examples: [
            { code: `case {1, 2} do
  {a, a} -> IO.puts("same")
  {a, b} -> IO.puts("different #{a} #{b}")
end`, notes: [{ at: "{a, a}", text: "both must be equal" }] },
            { code: `{_, second, _} = {1, 2, 3}
IO.puts(second)`, notes: [{ at: "_", text: "ignored value" }] },
            { code: `try do
  {:ok, _} = {:error, :bad}
rescue
  MatchError -> IO.puts("no match")
end`, notes: [{ at: "MatchError", text: "raised on failure" }] }
          ]
        }
      ]
    },
    {
      id: "functions-the-pipe-operator",
      n: 3,
      title: "functions & the pipe operator",
      concepts: [
        {
          id: "anonymous-functions", n: 1, title: "anonymous functions", level: 1,
          gloss: "Creates functions with fn and calls them with a dot.",
          examples: [
            { code: `square = fn n -> n * n end
IO.puts(square.(4))`, notes: [{ at: "square.(4)", text: "dot calls an anonymous function" }] },
            { code: `add = fn a, b -> a + b end
IO.puts(add.(2, 3))`, notes: [] },
            { code: `double = &(&1 * 2)
IO.inspect(Enum.map([1, 2, 3], double))`, notes: [{ at: "&1", text: "first argument of the capture" }] }
          ]
        },
        {
          id: "named-functions", n: 2, title: "named functions", level: 1,
          gloss: "Defines public and private functions inside modules.",
          examples: [
            { code: `defmodule Greeter do
  def hello(name), do: "Hello, #{name}"
end
IO.puts(Greeter.hello("ada"))`, notes: [{ at: "def", text: "public function" }] },
            { code: `defmodule Geometry do
  def area(w, h \\\\ 1), do: w * h
end
IO.puts(Geometry.area(3, 4))
IO.puts(Geometry.area(5))`, notes: [{ at: "\\\\", text: "default argument" }] },
            { code: `defmodule Util do
  defp secret, do: 42
  def reveal, do: secret()
end
IO.puts(Util.reveal())`, notes: [{ at: "defp", text: "private function" }] }
          ]
        },
        {
          id: "pipe-operator", n: 3, title: "the pipe operator", level: 1,
          gloss: "Passes the result of one call as the first argument of the next.",
          examples: [
            { code: `"  Hello World "
|> String.trim()
|> String.downcase()
|> IO.puts()`, notes: [{ at: "|>", text: "result becomes first argument" }] },
            { code: `[1, 2, 3, 4]
|> Enum.filter(&(&1 > 1))
|> Enum.map(&(&1 * 10))
|> IO.inspect()`, notes: [] },
            { code: `"a,b,c"
|> String.split(",")
|> Enum.join("-")
|> IO.puts()`, notes: [] }
          ]
        },
        {
          id: "captures-composition", n: 4, title: "captures and composition", level: 2,
          gloss: "Turns named functions into values and builds functions from functions.",
          examples: [
            { code: `IO.inspect(Enum.map(["a", "b"], &String.upcase/1))`, notes: [{ at: "&String.upcase/1", text: "function capture" }] },
            { code: `add_one = &(&1 + 1)
IO.inspect(add_one.(5))
IO.inspect((&Kernel.+/2).(1, 2))`, notes: [{ at: "&Kernel.+/2", text: "operator as a function" }] },
            { code: `compose = fn f, g -> fn x -> g.(f.(x)) end end
inc_then_double = compose.(&(&1 + 1), &(&1 * 2))
IO.puts(inc_then_double.(3))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "lists-tuples-keyword-lists",
      n: 4,
      title: "lists, tuples, keyword lists",
      concepts: [
        {
          id: "lists", n: 1, title: "lists", level: 1,
          gloss: "Works with linked lists using head, tail and list operators.",
          examples: [
            { code: `scores = [90, 72, 85]
IO.inspect(hd(scores))
IO.inspect(tl(scores))
IO.inspect(length(scores))`, notes: [{ at: "hd", text: "first element" }, { at: "tl", text: "everything else" }] },
            { code: `IO.inspect([1, 2] ++ [3, 4])
IO.inspect([1, 2, 3, 2] -- [2])
IO.inspect(0 in [0, 1])`, notes: [{ at: "--", text: "removes the first match" }] },
            { code: `list = [3, 1, 2]
IO.inspect(Enum.sort(list))
IO.inspect(Enum.reverse(list))
IO.inspect([0 | list])`, notes: [{ at: "[0 | list]", text: "prepend is cheap" }] }
          ]
        },
        {
          id: "tuples", n: 2, title: "tuples", level: 1,
          gloss: "Groups a fixed number of values and reads them by position.",
          examples: [
            { code: `point = {3, 4}
IO.inspect(elem(point, 0))
IO.inspect(tuple_size(point))`, notes: [{ at: "elem", text: "zero-based position" }] },
            { code: `result = {:ok, "data"}
{:ok, body} = result
IO.puts(body)`, notes: [{ at: "{:ok, body}", text: "conventional result tuple" }] },
            { code: `IO.inspect(put_elem({1, 2}, 1, 9))
IO.inspect(Tuple.to_list({1, 2, 3}))`, notes: [] }
          ]
        },
        {
          id: "keyword-lists", n: 3, title: "keyword lists", level: 1,
          gloss: "Stores ordered options as lists of two-element tuples with atom keys.",
          examples: [
            { code: `opts = [debug: true, level: 2]
IO.inspect(opts[:level])
IO.inspect(Keyword.get(opts, :debug))`, notes: [{ at: "debug: true", text: "shorthand for a tuple" }] },
            { code: `defaults = [port: 80, host: "localhost"]
merged = Keyword.merge(defaults, port: 8080)
IO.inspect(merged)`, notes: [] },
            { code: `IO.inspect([a: 1] == [{:a, 1}])
IO.inspect(Keyword.keys([a: 1, b: 2]))`, notes: [] }
          ]
        },
        {
          id: "ranges-charlists", n: 4, title: "ranges and charlists", level: 2,
          gloss: "Builds ranges and converts between charlists and strings.",
          examples: [
            { code: `IO.inspect(Enum.to_list(1..5))
IO.inspect(Enum.to_list(1..10//3))`, notes: [{ at: "1..10//3", text: "range with a step" }] },
            { code: `IO.inspect(Enum.sum(1..100))
IO.inspect(5 in 1..10)`, notes: [] },
            { code: `IO.inspect(~c"abc")
IO.inspect(to_charlist("hi"))
IO.inspect(List.to_string([104, 105]))`, notes: [{ at: "~c\"abc\"", text: "charlist of codepoints" }] }
          ]
        }
      ]
    },
    {
      id: "maps-structs",
      n: 5,
      title: "maps & structs",
      concepts: [
        {
          id: "maps", n: 1, title: "maps", level: 1,
          gloss: "Stores key-value pairs with atom or string keys.",
          examples: [
            { code: `user = %{name: "ada", age: 36}
IO.puts(user.name)
IO.puts(user[:age])`, notes: [{ at: "user.name", text: "raises if the key is missing" }] },
            { code: `stock = %{"apple" => 4, "pear" => 0}
IO.inspect(stock["apple"])
IO.inspect(Map.get(stock, "plum", 0))`, notes: [{ at: "=>", text: "any key type" }] },
            { code: `prices = %{tea: 2.5}
prices = Map.put(prices, :cake, 4.0)
IO.inspect(Map.delete(prices, :tea))`, notes: [] }
          ]
        },
        {
          id: "updating-maps", n: 2, title: "updating maps", level: 1,
          gloss: "Changes maps by returning new ones.",
          examples: [
            { code: `user = %{name: "ada", age: 36}
older = %{user | age: 37}
IO.inspect(older)`, notes: [{ at: "%{user | age: 37}", text: "key must exist" }] },
            { code: `base = %{a: 1}
IO.inspect(Map.merge(base, %{b: 2}))
IO.inspect(Map.keys(base))`, notes: [] },
            { code: `config = %{db: %{host: "localhost"}}
updated = put_in(config, [:db, :port], 5432)
IO.inspect(get_in(updated, [:db, :port]))`, notes: [{ at: "put_in", text: "updates a nested path" }] }
          ]
        },
        {
          id: "structs", n: 3, title: "structs", level: 2,
          gloss: "Defines named maps with fixed keys and defaults using defstruct.",
          examples: [
            { code: `defmodule User do
  defstruct name: "", age: 0
  def new, do: %User{name: "ada", age: 36}
end
IO.inspect(User.new())`, notes: [{ at: "defstruct", text: "fields and defaults" }] },
            { code: `defmodule Point do
  defstruct [:x, :y]
  def new, do: %Point{x: 1, y: 2}
end
IO.inspect(%{Point.new() | y: 5})`, notes: [] },
            { code: `defmodule Account do
  @enforce_keys [:owner]
  defstruct [:owner, balance: 0]
  def open(owner), do: %Account{owner: owner}
end
IO.inspect(Account.open("ada"))`, notes: [{ at: "@enforce_keys", text: "required at creation" }] }
          ]
        },
        {
          id: "iterating-maps", n: 4, title: "iterating and transforming maps", level: 2,
          gloss: "Loops over entries and builds new maps from old ones.",
          examples: [
            { code: `ages = %{ada: 36, linus: 54}
for {name, age} <- ages do
  IO.puts("#{name}: #{age}")
end`, notes: [{ at: "{name, age} <-", text: "destructures each entry" }] },
            { code: `prices = %{tea: 2.5, cake: 4.0}
IO.inspect(Map.new(prices, fn {k, v} -> {k, v * 2} end))
IO.inspect(Map.values(prices))`, notes: [] },
            { code: `stock = %{apple: 4, pear: 0}
IO.inspect(Enum.filter(stock, fn {_, n} -> n > 0 end))
IO.inspect(Map.to_list(stock))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "enum-stream",
      n: 6,
      title: "Enum & Stream",
      concepts: [
        {
          id: "enum-basics", n: 1, title: "map, filter and reduce", level: 1,
          gloss: "Transforms and summarises any enumerable with Enum.",
          examples: [
            { code: `nums = [1, 2, 3, 4]
IO.inspect(Enum.map(nums, &(&1 * 2)))
IO.inspect(Enum.filter(nums, &(rem(&1, 2) == 0)))`, notes: [{ at: "Enum.map", text: "works on any enumerable" }] },
            { code: `IO.inspect(Enum.reduce([1, 2, 3], 0, fn x, acc -> acc + x end))
IO.inspect(Enum.sum([3, 5, 7]))
IO.inspect(Enum.count([1, 2, 3], &(&1 > 1)))`, notes: [{ at: "reduce", text: "accumulator last" }] },
            { code: `words = ["tea", "cake", "jam"]
IO.inspect(Enum.map(words, &String.length/1))
IO.inspect(Enum.find(words, &(String.length(&1) > 3)))`, notes: [] }
          ]
        },
        {
          id: "sorting-grouping", n: 2, title: "sorting and grouping", level: 1,
          gloss: "Sorts and groups elements and counts occurrences with Enum.",
          examples: [
            { code: `IO.inspect(Enum.sort([3, 1, 2], :desc))
IO.inspect(Enum.sort_by(["pear", "fig"], &String.length/1))
IO.inspect(Enum.max([3, 8, 1]))`, notes: [{ at: "sort_by", text: "sort by a computed key" }] },
            { code: `words = ["apple", "avocado", "banana"]
IO.inspect(Enum.group_by(words, &String.first/1))`, notes: [{ at: "group_by", text: "map of key to list" }] },
            { code: `IO.inspect(Enum.frequencies(["a", "b", "a"]))
IO.inspect(Enum.uniq([1, 1, 2]))
IO.inspect(Enum.chunk_every([1, 2, 3, 4, 5], 2))`, notes: [] }
          ]
        },
        {
          id: "slicing-zipping", n: 3, title: "slicing and zipping", level: 2,
          gloss: "Slices and zips collections with take, drop, split and with_index.",
          examples: [
            { code: `IO.inspect(Enum.zip([1, 2], ["a", "b"]))
IO.inspect(Enum.with_index(["a", "b"]))`, notes: [{ at: "with_index", text: "pairs with positions" }] },
            { code: `IO.inspect(Enum.take(1..10, 3))
IO.inspect(Enum.drop(1..5, 3))
IO.inspect(Enum.split([1, 2, 3, 4], 2))`, notes: [] },
            { code: `IO.inspect(Enum.flat_map([1, 2], fn x -> [x, x * 10] end))
IO.inspect(Enum.into([a: 1], %{}))`, notes: [{ at: "into", text: "collects into a map" }] }
          ]
        },
        {
          id: "comprehensions", n: 4, title: "comprehensions", level: 2,
          gloss: "Generates and filters collections with for.",
          examples: [
            { code: `IO.inspect(for n <- 1..5, do: n * n)`, notes: [{ at: "<-", text: "generator" }] },
            { code: `IO.inspect(for n <- 1..10, rem(n, 2) == 0, do: n)`, notes: [{ at: "rem(n, 2) == 0", text: "filter" }] },
            { code: `IO.inspect(for x <- [1, 2], y <- ["a", "b"], do: {x, y})`, notes: [] }
          ]
        },
        {
          id: "streams", n: 5, title: "Stream", level: 2,
          gloss: "Builds lazy pipelines that compute only what is taken.",
          examples: [
            { code: `stream = Stream.map(1..1_000_000, &(&1 * 2))
IO.inspect(Enum.take(stream, 3))`, notes: [{ at: "Stream.map", text: "lazy" }] },
            { code: `IO.inspect(Stream.iterate(1, &(&1 * 2)) |> Enum.take(5))`, notes: [{ at: "Stream.iterate", text: "infinite sequence" }] },
            { code: `evens =
  1..100
  |> Stream.filter(&(rem(&1, 2) == 0))
  |> Stream.map(&(&1 * &1))
IO.inspect(Enum.take(evens, 3))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "case-cond-with",
      n: 7,
      title: "case, cond, with",
      concepts: [
        {
          id: "case-expressions", n: 1, title: "case", level: 1,
          gloss: "Branches by matching a value against several patterns.",
          examples: [
            { code: `result = {:ok, 42}
case result do
  {:ok, value} -> IO.puts("got #{value}")
  {:error, reason} -> IO.puts("failed: #{reason}")
end`, notes: [{ at: "case", text: "first matching clause wins" }] },
            { code: `case 5 do
  n when n < 0 -> IO.puts("negative")
  0 -> IO.puts("zero")
  _ -> IO.puts("positive")
end`, notes: [{ at: "_", text: "catch-all clause" }] },
            { code: `case [1, 2, 3] do
  [] -> IO.puts("empty")
  [head | _] -> IO.puts("starts with #{head}")
end`, notes: [] }
          ]
        },
        {
          id: "cond-and-if", n: 2, title: "cond and if", level: 1,
          gloss: "Branches on conditions with cond, if and the else keyword.",
          examples: [
            { code: `temperature = 28
cond do
  temperature > 25 -> IO.puts("warm")
  temperature > 10 -> IO.puts("mild")
  true -> IO.puts("cold")
end`, notes: [{ at: "true ->", text: "default branch" }] },
            { code: `score = 72
label = if score >= 60, do: "pass", else: "fail"
IO.puts(label)`, notes: [{ at: "do:", text: "keyword form" }] },
            { code: `done = false
if !done do
  IO.puts("still working")
end`, notes: [] }
          ]
        },
        {
          id: "with-expressions", n: 3, title: "with", level: 2,
          gloss: "Chains matches and stops at the first one that fails.",
          examples: [
            { code: `user = %{name: "ada", age: 36}
with {:ok, name} <- Map.fetch(user, :name),
     {:ok, age} <- Map.fetch(user, :age) do
  IO.puts("#{name} #{age}")
end`, notes: [{ at: "<-", text: "match or stop" }] },
            { code: `parse = fn s ->
  case Integer.parse(s) do
    {n, ""} -> {:ok, n}
    _ -> {:error, :invalid}
  end
end
result =
  with {:ok, a} <- parse.("4"),
       {:ok, b} <- parse.("x") do
    {:ok, a + b}
  end
IO.inspect(result)`, notes: [{ at: "result", text: "the first non-matching value" }] },
            { code: `with {:ok, x} <- {:ok, 1},
     {:ok, y} <- {:ok, 2} do
  IO.puts(x + y)
else
  _ -> IO.puts("failed")
end`, notes: [{ at: "else", text: "handles non-matches" }] }
          ]
        },
        {
          id: "guards-in-functions", n: 4, title: "guards and multi-clause functions", level: 2,
          gloss: "Chooses clauses of anonymous functions and case with guards.",
          examples: [
            { code: `classify = fn
  0 -> "zero"
  n when n > 0 -> "positive"
  _ -> "negative"
end
IO.puts(classify.(-5))`, notes: [{ at: "classify = fn", text: "several clauses in one fn" }] },
            { code: `check = fn
  x when is_binary(x) -> "string"
  x when is_integer(x) -> "integer"
  _ -> "other"
end
IO.puts(check.(7))`, notes: [] },
            { code: `case {1, 2} do
  {x, y} when x + y > 2 -> IO.puts("big")
  _ -> IO.puts("small")
end`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "modules-guards",
      n: 8,
      title: "modules & guards",
      concepts: [
        {
          id: "modules", n: 1, title: "modules and attributes", level: 1,
          gloss: "Groups functions in modules and shares constants with module attributes.",
          examples: [
            { code: `defmodule Math do
  def square(n), do: n * n
  def cube(n), do: n * square(n)
end
IO.puts(Math.cube(3))`, notes: [{ at: "defmodule", text: "named group of functions" }] },
            { code: `defmodule Greeting do
  @salutation "Hello"
  def greet(name), do: "#{@salutation}, #{name}"
end
IO.puts(Greeting.greet("ada"))`, notes: [{ at: "@salutation", text: "compile-time constant" }] },
            { code: `defmodule Shop do
  @tax 0.2
  def price(base), do: base * (1 + @tax)
end
IO.puts(Shop.price(100))`, notes: [] }
          ]
        },
        {
          id: "guards", n: 2, title: "guards", level: 1,
          gloss: "Restricts function clauses with when and guard-safe functions.",
          examples: [
            { code: `defmodule Check do
  def kind(x) when is_integer(x), do: "integer"
  def kind(x) when is_binary(x), do: "string"
  def kind(_), do: "other"
end
IO.puts(Check.kind("a"))`, notes: [{ at: "is_integer", text: "allowed in guards" }] },
            { code: `defmodule Age do
  def category(n) when n < 13, do: "child"
  def category(n) when n < 20, do: "teen"
  def category(_), do: "adult"
end
IO.puts(Age.category(15))`, notes: [] },
            { code: `defmodule Guards do
  defguard is_small(n) when is_integer(n) and n < 10
  def small?(n) when is_small(n), do: true
  def small?(_), do: false
end
IO.puts(Guards.small?(3))`, notes: [{ at: "defguard", text: "reusable guard" }] }
          ]
        },
        {
          id: "alias-import", n: 3, title: "alias and import", level: 2,
          gloss: "Shortens module names with alias and brings functions in with import.",
          examples: [
            { code: `defmodule App.Models.User do
  defstruct [:name]
  def new(name), do: %__MODULE__{name: name}
end
alias App.Models.User
IO.inspect(User.new("ada"))`, notes: [{ at: "alias", text: "short name for a module" }] },
            { code: `import List, only: [first: 1]
IO.inspect(first([7, 8]))`, notes: [{ at: "only:", text: "import selected functions" }] },
            { code: `defmodule Util do
  def shout(s), do: String.upcase(s) <> "!"
end
defmodule Main do
  import Util
  def run, do: IO.puts(shout("hey"))
end
Main.run()`, notes: [] }
          ]
        },
        {
          id: "docs-specs", n: 4, title: "docs and typespecs", level: 2,
          gloss: "Documents modules and declares function types with attributes.",
          examples: [
            { code: `defmodule Calc do
  @moduledoc "Small calculator."
  @doc "Adds two numbers."
  @spec add(number, number) :: number
  def add(a, b), do: a + b
end
IO.puts(Calc.add(1, 2))`, notes: [{ at: "@spec", text: "checked by dialyzer" }] },
            { code: `defmodule Limits do
  @ceiling 10
  def limit, do: @ceiling
end
IO.puts(Limits.limit())`, notes: [] },
            { code: `defmodule Temp do
  @type celsius :: float
  @spec to_f(celsius) :: float
  def to_f(c), do: c * 9 / 5 + 32
end
IO.puts(Temp.to_f(100.0))`, notes: [{ at: "@type", text: "custom type name" }] }
          ]
        }
      ]
    },
    {
      id: "recursion",
      n: 9,
      title: "recursion",
      concepts: [
        {
          id: "basic-recursion", n: 1, title: "basic recursion", level: 1,
          gloss: "Solves problems by calling a function on smaller input.",
          examples: [
            { code: `defmodule Math do
  def factorial(0), do: 1
  def factorial(n), do: n * factorial(n - 1)
end
IO.puts(Math.factorial(5))`, notes: [{ at: "factorial(0)", text: "base case" }] },
            { code: `defmodule Count do
  def down(0), do: :done
  def down(n) do
    IO.puts(n)
    down(n - 1)
  end
end
Count.down(3)`, notes: [] },
            { code: `defmodule Fib do
  def fib(0), do: 0
  def fib(1), do: 1
  def fib(n), do: fib(n - 1) + fib(n - 2)
end
IO.puts(Fib.fib(10))`, notes: [] }
          ]
        },
        {
          id: "list-recursion", n: 2, title: "recursion over lists", level: 1,
          gloss: "Processes a list by matching its head and tail.",
          examples: [
            { code: `defmodule MyList do
  def sum([]), do: 0
  def sum([h | t]), do: h + sum(t)
end
IO.puts(MyList.sum([1, 2, 3]))`, notes: [{ at: "[h | t]", text: "head and tail" }] },
            { code: `defmodule MyList do
  def double([]), do: []
  def double([h | t]), do: [h * 2 | double(t)]
end
IO.inspect(MyList.double([1, 2, 3]))`, notes: [] },
            { code: `defmodule MyList do
  def len([]), do: 0
  def len([_ | t]), do: 1 + len(t)
end
IO.puts(MyList.len(~w(a b c)))`, notes: [{ at: "~w(a b c)", text: "word list sigil" }] }
          ]
        },
        {
          id: "tail-recursion", n: 3, title: "tail recursion and accumulators", level: 2,
          gloss: "Carries an accumulator so the last call is the recursive one.",
          examples: [
            { code: `defmodule Sum do
  def to(n), do: loop(n, 0)
  defp loop(0, acc), do: acc
  defp loop(n, acc), do: loop(n - 1, acc + n)
end
IO.puts(Sum.to(100))`, notes: [{ at: "loop", text: "tail call, no stack growth" }] },
            { code: `defmodule Rev do
  def reverse(list), do: go(list, [])
  defp go([], acc), do: acc
  defp go([h | t], acc), do: go(t, [h | acc])
end
IO.inspect(Rev.reverse([1, 2, 3]))`, notes: [] },
            { code: `defmodule Pow do
  def pow(_, 0, acc), do: acc
  def pow(b, e, acc), do: pow(b, e - 1, acc * b)
end
IO.puts(Pow.pow(2, 10, 1))`, notes: [] }
          ]
        },
        {
          id: "recursion-in-practice", n: 4, title: "recursion in practice", level: 2,
          gloss: "Traverses nested data and compares recursion with Enum.reduce.",
          examples: [
            { code: `IO.puts(Enum.reduce(1..5, 1, &*/2))`, notes: [{ at: "&*/2", text: "multiplication as a function" }] },
            { code: `defmodule Walk do
  def flatten([]), do: []
  def flatten([h | t]) when is_list(h), do: flatten(h) ++ flatten(t)
  def flatten([h | t]), do: [h | flatten(t)]
end
IO.inspect(Walk.flatten([1, [2, [3]]]))`, notes: [] },
            { code: `defmodule Collatz do
  def steps(1, n), do: n
  def steps(x, n) when rem(x, 2) == 0, do: steps(div(x, 2), n + 1)
  def steps(x, n), do: steps(3 * x + 1, n + 1)
end
IO.puts(Collatz.steps(6, 0))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "processes-messages",
      n: 10,
      title: "processes & messages",
      concepts: [
        {
          id: "spawning", n: 1, title: "spawning processes", level: 1,
          gloss: "Starts lightweight processes with spawn and identifies them with pids.",
          examples: [
            { code: `pid = spawn(fn -> IO.puts("in a process") end)
IO.inspect(is_pid(pid))
Process.sleep(50)`, notes: [{ at: "spawn", text: "returns a pid" }] },
            { code: `IO.inspect(is_pid(self()))
IO.inspect(Process.alive?(self()))`, notes: [{ at: "self()", text: "the current pid" }] },
            { code: `parent = self()
spawn(fn -> send(parent, :hello) end)
receive do
  :hello -> IO.puts("got hello")
end`, notes: [{ at: "send", text: "asynchronous message" }] }
          ]
        },
        {
          id: "send-receive", n: 2, title: "send and receive", level: 1,
          gloss: "Delivers messages to a mailbox and matches them with receive.",
          examples: [
            { code: `send(self(), {:greet, "ada"})
receive do
  {:greet, name} -> IO.puts("hello #{name}")
end`, notes: [{ at: "receive", text: "matches mailbox messages" }] },
            { code: `send(self(), :ping)
receive do
  :pong -> IO.puts("pong")
after
  100 -> IO.puts("timeout")
end`, notes: [{ at: "after", text: "gives up after 100 ms" }] },
            { code: `send(self(), 1)
send(self(), 2)
IO.inspect(Process.info(self(), :message_queue_len))`, notes: [] }
          ]
        },
        {
          id: "message-loops", n: 3, title: "message loops and names", level: 2,
          gloss: "Keeps a process listening by recursing and registers names for pids.",
          examples: [
            { code: `defmodule Echo do
  def loop do
    receive do
      msg -> IO.puts("got #{msg}")
    end
    loop()
  end
end
send(spawn(&Echo.loop/0), "hi")
Process.sleep(50)`, notes: [{ at: "loop()", text: "waits for the next message" }] },
            { code: `pid =
  spawn(fn ->
    receive do
      msg -> IO.puts("got #{msg}")
    end
  end)
Process.register(pid, :printer)
send(:printer, "hello")
Process.sleep(50)`, notes: [{ at: "Process.register", text: "send by name" }] },
            { code: `send(self(), {:low, 1})
send(self(), {:high, 2})
receive do
  {:high, n} -> IO.puts("high #{n}")
end
receive do
  {:low, n} -> IO.puts("low #{n}")
end`, notes: [{ at: "receive", text: "skips non-matching messages" }] }
          ]
        },
        {
          id: "links-monitors", n: 4, title: "links and monitors", level: 3,
          gloss: "Observes process exits with monitors, links and kill signals.",
          examples: [
            { code: `{pid, ref} = spawn_monitor(fn -> :ok end)
receive do
  {:DOWN, ^ref, :process, ^pid, reason} -> IO.inspect(reason)
end`, notes: [{ at: "spawn_monitor", text: "watches without linking" }] },
            { code: `Process.flag(:trap_exit, true)
pid = spawn_link(fn -> exit(:boom) end)
receive do
  {:EXIT, ^pid, reason} -> IO.inspect(reason)
end`, notes: [{ at: "trap_exit", text: "exits arrive as messages" }] },
            { code: `pid = spawn(fn -> Process.sleep(1000) end)
Process.exit(pid, :kill)
Process.sleep(10)
IO.inspect(Process.alive?(pid))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "genserver",
      n: 11,
      title: "GenServer",
      concepts: [
        {
          id: "basic-genserver", n: 1, title: "a basic GenServer", level: 2,
          gloss: "Wraps state in a process that answers calls and handles casts.",
          examples: [
            { code: `defmodule Counter do
  use GenServer
  @impl true
  def init(n), do: {:ok, n}
  @impl true
  def handle_call(:get, _from, n), do: {:reply, n, n}
  @impl true
  def handle_cast(:inc, n), do: {:noreply, n + 1}
end
{:ok, pid} = GenServer.start_link(Counter, 0)
GenServer.cast(pid, :inc)
IO.puts(GenServer.call(pid, :get))`, notes: [{ at: "handle_call", text: "synchronous request" }, { at: "handle_cast", text: "asynchronous request" }] },
            { code: `defmodule KV do
  use GenServer
  def init(_), do: {:ok, %{}}
  def handle_cast({:put, k, v}, m), do: {:noreply, Map.put(m, k, v)}
  def handle_call({:get, k}, _from, m), do: {:reply, m[k], m}
end
{:ok, kv} = GenServer.start_link(KV, nil)
GenServer.cast(kv, {:put, :a, 1})
IO.inspect(GenServer.call(kv, {:get, :a}))`, notes: [{ at: "{:reply, m[k], m}", text: "reply and new state" }] },
            { code: `defmodule Stack do
  use GenServer
  def start_link(list), do: GenServer.start_link(__MODULE__, list)
  def push(pid, x), do: GenServer.cast(pid, {:push, x})
  def pop(pid), do: GenServer.call(pid, :pop)
  def handle_cast({:push, x}, list), do: {:noreply, [x | list]}
  def handle_call(:pop, _from, [h | t]), do: {:reply, h, t}
end
{:ok, s} = Stack.start_link([])
Stack.push(s, 1)
IO.puts(Stack.pop(s))`, notes: [{ at: "Stack.push", text: "client API hides messages" }] }
          ]
        },
        {
          id: "lifecycle", n: 2, title: "callbacks and lifecycle", level: 2,
          gloss: "Reacts to plain messages and names or stops servers.",
          examples: [
            { code: `defmodule Ticker do
  use GenServer
  def init(n) do
    send(self(), :tick)
    {:ok, n}
  end
  def handle_info(:tick, n), do: {:noreply, n + 1}
end
{:ok, pid} = GenServer.start_link(Ticker, 0)
Process.sleep(10)
IO.inspect(:sys.get_state(pid))`, notes: [{ at: "handle_info", text: "any other message" }] },
            { code: `defmodule Greeter do
  use GenServer
  def init(name), do: {:ok, name}
  def handle_call(:greet, _from, name), do: {:reply, "hi #{name}", name}
end
GenServer.start_link(Greeter, "ada", name: Greeter)
IO.puts(GenServer.call(Greeter, :greet))`, notes: [{ at: "name: Greeter", text: "registered name" }] },
            { code: `defmodule Worker do
  use GenServer
  def init(_), do: {:ok, nil}
end
{:ok, pid} = GenServer.start_link(Worker, nil)
GenServer.stop(pid)
IO.inspect(Process.alive?(pid))`, notes: [{ at: "stop", text: "shuts the server down" }] }
          ]
        },
        {
          id: "supervisors", n: 3, title: "supervisors", level: 3,
          gloss: "Restarts failed child processes with a Supervisor.",
          examples: [
            { code: `children = [{Agent, fn -> 0 end}]
{:ok, sup} = Supervisor.start_link(children, strategy: :one_for_one)
IO.inspect(Supervisor.count_children(sup).active)`, notes: [{ at: "one_for_one", text: "restart only the failed child" }] },
            { code: `defmodule Worker do
  use GenServer
  def start_link(arg), do: GenServer.start_link(__MODULE__, arg)
  def init(_), do: {:ok, 0}
end
{:ok, sup} = Supervisor.start_link([Worker], strategy: :one_for_one)
IO.inspect(length(Supervisor.which_children(sup)))`, notes: [{ at: "[Worker]", text: "child spec from the module" }] },
            { code: `children = [{Agent, fn -> 0 end}]
{:ok, sup} = Supervisor.start_link(children, strategy: :one_for_one)
[{_, pid, _, _}] = Supervisor.which_children(sup)
Process.exit(pid, :kill)
Process.sleep(50)
[{_, new_pid, _, _}] = Supervisor.which_children(sup)
IO.inspect(pid != new_pid)`, notes: [{ at: "new_pid", text: "a restarted child" }] }
          ]
        }
      ]
    },
    {
      id: "task-agent",
      n: 12,
      title: "Task & Agent",
      concepts: [
        {
          id: "task-async", n: 1, title: "Task.async and await", level: 1,
          gloss: "Runs work concurrently and collects the result with await.",
          examples: [
            { code: `task = Task.async(fn -> 6 * 7 end)
IO.puts(Task.await(task))`, notes: [{ at: "Task.await", text: "waits up to five seconds" }] },
            { code: `tasks = for n <- 1..3, do: Task.async(fn -> n * n end)
IO.inspect(Enum.map(tasks, &Task.await/1))`, notes: [] },
            { code: `task =
  Task.async(fn ->
    Process.sleep(50)
    :done
  end)
IO.inspect(Task.await(task, 1000))`, notes: [{ at: "1000", text: "custom timeout in ms" }] }
          ]
        },
        {
          id: "task-streams", n: 2, title: "async_stream and start", level: 2,
          gloss: "Maps over collections in parallel and starts fire-and-forget tasks.",
          examples: [
            { code: `results = Task.async_stream(1..3, fn n -> n * 10 end) |> Enum.to_list()
IO.inspect(results)`, notes: [{ at: "async_stream", text: "yields {:ok, value}" }] },
            { code: `1..3
|> Task.async_stream(&(&1 * 2))
|> Enum.map(fn {:ok, v} -> v end)
|> IO.inspect()`, notes: [] },
            { code: `{:ok, pid} = Task.start(fn -> IO.puts("fire and forget") end)
Process.sleep(50)
IO.inspect(is_pid(pid))`, notes: [{ at: "Task.start", text: "no result to await" }] }
          ]
        },
        {
          id: "agents", n: 3, title: "Agent", level: 1,
          gloss: "Keeps shared state in a process with get and update.",
          examples: [
            { code: `{:ok, agent} = Agent.start_link(fn -> 0 end)
Agent.update(agent, &(&1 + 5))
IO.puts(Agent.get(agent, & &1))`, notes: [{ at: "& &1", text: "identity capture" }] },
            { code: `{:ok, cart} = Agent.start_link(fn -> [] end)
Agent.update(cart, &["tea" | &1])
Agent.update(cart, &["cake" | &1])
IO.inspect(Agent.get(cart, & &1))`, notes: [] },
            { code: `{:ok, _} = Agent.start_link(fn -> %{} end, name: :stats)
Agent.update(:stats, &Map.put(&1, :hits, 1))
IO.inspect(Agent.get(:stats, & &1))`, notes: [{ at: "name: :stats", text: "access by name" }] }
          ]
        },
        {
          id: "task-patterns", n: 4, title: "timeouts and combined results", level: 3,
          gloss: "Polls tasks without blocking and updates agents atomically.",
          examples: [
            { code: `task = Task.async(fn -> Process.sleep(500) end)
IO.inspect(Task.yield(task, 10))
Task.shutdown(task)`, notes: [{ at: "yield", text: "nil if not finished" }] },
            { code: `tasks = [Task.async(fn -> 1 end), Task.async(fn -> 2 end)]
IO.inspect(Task.await_many(tasks))`, notes: [{ at: "await_many", text: "list of results" }] },
            { code: `{:ok, agent} = Agent.start_link(fn -> 1 end)
value = Agent.get_and_update(agent, fn n -> {n, n + 1} end)
IO.inspect({value, Agent.get(agent, & &1)})`, notes: [{ at: "get_and_update", text: "returns and changes" }] }
          ]
        }
      ]
    },
    {
      id: "protocols-behaviours",
      n: 13,
      title: "protocols & behaviours",
      concepts: [
        {
          id: "protocols", n: 1, title: "protocols", level: 2,
          gloss: "Dispatches a function on the type of its first argument.",
          examples: [
            { code: `defprotocol Describe do
  def describe(value)
end
defimpl Describe, for: Integer do
  def describe(n), do: "integer #{n}"
end
IO.puts(Describe.describe(5))`, notes: [{ at: "defprotocol", text: "the interface" }, { at: "defimpl", text: "one implementation" }] },
            { code: `defprotocol Area do
  def area(shape)
end
defmodule Square do
  defstruct [:side]
end
defimpl Area, for: Square do
  def area(s), do: s.side * s.side
end
IO.puts(Area.area(struct(Square, side: 3)))`, notes: [{ at: "for: Square", text: "implemented for a struct" }] },
            { code: `defprotocol Size do
  def size(data)
end
defimpl Size, for: BitString do
  def size(s), do: byte_size(s)
end
defimpl Size, for: List do
  def size(l), do: length(l)
end
IO.puts(Size.size("abc") + Size.size([1, 2]))`, notes: [] }
          ]
        },
        {
          id: "protocol-fallbacks", n: 2, title: "fallbacks and several types", level: 2,
          gloss: "Handles unknown types with Any and shares one implementation across types.",
          examples: [
            { code: `defprotocol Greet do
  @fallback_to_any true
  def hello(x)
end
defimpl Greet, for: Any do
  def hello(_), do: "hello, whoever"
end
IO.puts(Greet.hello(:atom))`, notes: [{ at: "@fallback_to_any", text: "use Any when missing" }] },
            { code: `defprotocol Label do
  def label(x)
end
defimpl Label, for: [Integer, Float] do
  def label(n), do: "number #{n}"
end
IO.puts(Label.label(1.5))`, notes: [{ at: "for: [Integer, Float]", text: "one impl, two types" }] },
            { code: `defprotocol Name do
  def name(x)
end
defimpl Name, for: Atom do
  def name(a), do: Atom.to_string(a)
end
IO.puts(Name.name(:ada))`, notes: [] }
          ]
        },
        {
          id: "behaviours", n: 3, title: "behaviours", level: 2,
          gloss: "Declares callbacks that modules promise to implement.",
          examples: [
            { code: `defmodule Parser do
  @callback parse(String.t()) :: {:ok, term} | {:error, term}
end
defmodule IntParser do
  @behaviour Parser
  def parse(s), do: {:ok, String.to_integer(s)}
end
IO.inspect(IntParser.parse("42"))`, notes: [{ at: "@callback", text: "required function type" }, { at: "@behaviour", text: "promises the callbacks" }] },
            { code: `defmodule Shape do
  @callback area(map) :: number
end
defmodule Square do
  @behaviour Shape
  def area(%{side: s}), do: s * s
end
IO.puts(Square.area(%{side: 3}))`, notes: [] },
            { code: `defmodule Notifier do
  @callback notify(String.t()) :: :ok
  def deliver(mod, msg), do: mod.notify(msg)
end
defmodule Console do
  @behaviour Notifier
  def notify(msg), do: IO.puts(msg)
end
Notifier.deliver(Console, "hi")`, notes: [{ at: "mod.notify", text: "module chosen at runtime" }] }
          ]
        },
        {
          id: "behaviour-extras", n: 4, title: "optional callbacks and @impl", level: 3,
          gloss: "Marks optional callbacks, checks implementations with @impl and lists callbacks.",
          examples: [
            { code: `defmodule Plugin do
  @callback name() :: String.t()
  @callback setup() :: :ok
  @optional_callbacks setup: 0
end
defmodule Logger2 do
  @behaviour Plugin
  @impl true
  def name, do: "logger"
end
IO.puts(Logger2.name())`, notes: [{ at: "@optional_callbacks", text: "need not be defined" }, { at: "@impl true", text: "marks a callback" }] },
            { code: `defmodule Store do
  @callback get(atom) :: term
end
defmodule MemStore do
  @behaviour Store
  @impl Store
  def get(key), do: {:memory, key}
end
IO.inspect(MemStore.get(:a))`, notes: [] },
            { code: `defmodule Shape do
  @callback area(term) :: number
end
IO.inspect(Shape.behaviour_info(:callbacks))`, notes: [{ at: "behaviour_info", text: "lists the callbacks" }] }
          ]
        }
      ]
    }
  ]
};
