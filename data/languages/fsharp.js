export default {
  id: "fsharp",
  name: "F#",
  short: "FS",
  pigment: "fsharp",
  family: null,
  version: "10",
  lexer: "fsharp",
  indent: 4,
  topics: [
    {
      id: "values-let",
      n: 1,
      title: "values and let",
      concepts: [
        {
          id: "let-bindings", n: 1, title: "let bindings", level: 1,
          gloss: "Binds a name to a value that never changes after it is set.",
          examples: [
            { code: `let city = "Oslo"
let visits = 3
printfn "%s: %d" city visits`, notes: [{ at: "let", text: "binds a name to a value" }, { at: "%s", text: "a string placeholder" }] },
            { code: `let width = 4
let height = 5
let area = width * height`, notes: [] },
            { code: `let greeting = "Hello"
let name = "Ada"
let message = greeting + ", " + name`, notes: [] }
          ]
        },
        {
          id: "mutable-values", n: 2, title: "mutable values", level: 1,
          gloss: "Allows reassignment of a binding that is declared with mutable.",
          examples: [
            { code: `let mutable count = 0
count <- count + 1
printfn "%d" count`, notes: [{ at: "mutable", text: "allows reassignment" }, { at: "<-", text: "assigns a new value" }] },
            { code: `let mutable total = 0
for n in 1 .. 4 do
    total <- total + n`, notes: [] },
            { code: `let mutable name = "ada"
name <- name.ToUpper()`, notes: [] }
          ]
        },
        {
          id: "shadowing-annotations", n: 3, title: "shadowing and annotations", level: 2,
          gloss: "Reuses a name in a new binding and states types explicitly.",
          examples: [
            { code: `let calculate () =
    let x = 5
    let x = x * 2
    x`, notes: [{ at: "let x = x * 2", text: "a new binding shadows the old" }] },
            { code: `let price: float = 9.5
let count: int = 3`, notes: [{ at: ": float", text: "a type annotation" }] },
            { code: `let items: string list = [ "pen"; "ink" ]`, notes: [{ at: "string list", text: "a list of strings" }] }
          ]
        }
      ]
    },
    {
      id: "basic-types",
      n: 2,
      title: "basic types",
      concepts: [
        {
          id: "numbers", n: 1, title: "numbers", level: 1,
          gloss: "Calculates with integers, floats and explicit numeric suffixes.",
          examples: [
            { code: `let sum = 7 + 3 * 2
let half = 7 / 2
let exact = 7.0 / 2.0`, notes: [{ at: "7 / 2", text: "integer division gives 3" }] },
            { code: `let big = 10_000_000L
let ratio = 3.5f
let hex = 0xFF`, notes: [{ at: "L", text: "a 64 bit integer" }] },
            { code: `let remainder = 17 % 5
let power = 2.0 ** 10.0`, notes: [{ at: "**", text: "exponent for floats" }] }
          ]
        },
        {
          id: "strings", n: 2, title: "strings and interpolation", level: 1,
          gloss: "Builds text with interpolated strings and string functions.",
          examples: [
            { code: `let name = "Ada"
let hello = $"Hello, {name}!"`, notes: [{ at: "{name}", text: "an interpolated value" }] },
            { code: `let upper = "ada".ToUpper()
let length = "hello".Length`, notes: [] },
            { code: `let amount = 4.5
let line = $"Total: {amount:F2} USD"`, notes: [{ at: ":F2", text: "two decimal places" }] }
          ]
        },
        {
          id: "booleans", n: 3, title: "booleans and comparison", level: 1,
          gloss: "Compares values with equals and combines conditions with logical operators.",
          examples: [
            { code: `let same = (3 = 3)
let different = (3 <> 4)`, notes: [{ at: "=", text: "equality, not assignment" }, { at: "<>", text: "not equal" }] },
            { code: `let ok = 5 > 3 && 2 < 4
let either = false || true`, notes: [] },
            { code: `let inRange = 10 >= 1 && 10 <= 20
let flipped = not inRange`, notes: [{ at: "not", text: "boolean negation" }] }
          ]
        }
      ]
    },
    {
      id: "functions",
      n: 3,
      title: "functions",
      concepts: [
        {
          id: "defining", n: 1, title: "defining functions", level: 1,
          gloss: "Declares a function with let and calls it by writing the arguments after it.",
          examples: [
            { code: `let square x = x * x
let result = square 7`, notes: [{ at: "square x", text: "a function of one argument" }] },
            { code: `let add a b = a + b
let total = add 3 4`, notes: [] },
            { code: `let greet (name: string) = $"Hello, {name}"`, notes: [{ at: "(name: string)", text: "typed parameter" }] }
          ]
        },
        {
          id: "lambdas", n: 2, title: "lambda expressions", level: 1,
          gloss: "Writes an unnamed function inline with the fun keyword.",
          examples: [
            { code: `let double = fun x -> x * 2
let six = double 3`, notes: [{ at: "fun", text: "an unnamed function" }] },
            { code: `let evens = [ 1 .. 10 ] |> List.filter (fun n -> n % 2 = 0)`, notes: [] },
            { code: `type Person = { Name: string; Age: int }
let names = [ { Name = "Ada"; Age = 36 } ] |> List.map _.Name`, notes: [{ at: "_.Name", text: "shorthand for fun p -> p.Name" }] }
          ]
        },
        {
          id: "currying", n: 3, title: "partial application", level: 2,
          gloss: "Fixes some arguments of a function to create a new function.",
          examples: [
            { code: `let add a b = a + b
let addFive = add 5
let ten = addFive 5`, notes: [{ at: "add 5", text: "a function waiting for b" }] },
            { code: `let multiply a b = a * b
let triple = multiply 3
let nine = triple 3`, notes: [] },
            { code: `let format prefix (value: int) = $"{prefix}: {value}"
let logInfo = format "INFO"`, notes: [] }
          ]
        },
        {
          id: "recursion", n: 4, title: "recursion", level: 2,
          gloss: "Calls a function from itself when declared with let rec.",
          examples: [
            { code: `let rec factorial n =
    if n <= 1 then 1 else n * factorial (n - 1)`, notes: [{ at: "rec", text: "allows self reference" }] },
            { code: `let rec sum list =
    match list with
    | [] -> 0
    | head :: tail -> head + sum tail`, notes: [] },
            { code: `let rec fib n =
    if n < 2 then n else fib (n - 1) + fib (n - 2)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "pipelines",
      n: 4,
      title: "pipelines and composition",
      concepts: [
        {
          id: "pipe-forward", n: 1, title: "pipe forward", level: 1,
          gloss: "Passes a value into a function from the left with the pipe operator.",
          examples: [
            { code: `let result = [ 1; 2; 3 ] |> List.map (fun x -> x * 2)`, notes: [{ at: "|>", text: "feeds the value on its left" }] },
            { code: `let total =
    [ 1 .. 5 ]
    |> List.filter (fun n -> n % 2 = 1)
    |> List.sum`, notes: [] },
            { code: `let shout = "hello" |> fun s -> s.ToUpper()`, notes: [] }
          ]
        },
        {
          id: "composition", n: 2, title: "composition", level: 2,
          gloss: "Joins two functions into a new one with the composition operator.",
          examples: [
            { code: `let addOne x = x + 1
let double x = x * 2
let both = addOne >> double`, notes: [{ at: ">>", text: "runs left then right" }] },
            { code: `let size = String.map System.Char.ToUpper >> String.length`, notes: [] },
            { code: `let inc = (+) 1
let incTwice = inc >> inc`, notes: [] }
          ]
        },
        {
          id: "backward-pipe", n: 3, title: "other pipes", level: 2,
          gloss: "Applies a function with the backward pipe and combines tuples with double pipe.",
          examples: [
            { code: `let text = string <| 42`, notes: [{ at: "<|", text: "applies the function on the left" }] },
            { code: `let sum = (3, 4) ||> (+)`, notes: [{ at: "||>", text: "spreads a tuple into two arguments" }] },
            { code: `let length = "hello" |> String.length |> string`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "lists",
      n: 5,
      title: "lists",
      concepts: [
        {
          id: "list-basics", n: 1, title: "list basics", level: 1,
          gloss: "Builds immutable lists with literals, ranges and the cons operator.",
          examples: [
            { code: `let numbers = [ 1; 2; 3 ]
let words = [ "pen"; "ink" ]`, notes: [{ at: ";", text: "separates list items" }] },
            { code: `let range = [ 1 .. 5 ]
let stepped = [ 0 .. 5 .. 20 ]`, notes: [{ at: "0 .. 5 .. 20", text: "start, step, end" }] },
            { code: `let list = [ 2; 3 ]
let longer = 1 :: list
let joined = [ 1; 2 ] @ [ 3; 4 ]`, notes: [{ at: "::", text: "adds one item at the front" }] }
          ]
        },
        {
          id: "list-module", n: 2, title: "list functions", level: 1,
          gloss: "Transforms lists with map, filter, fold and sum from the List module.",
          examples: [
            { code: `let doubled = [ 1; 2; 3 ] |> List.map (fun x -> x * 2)`, notes: [{ at: "List.map", text: "transforms every item" }] },
            { code: `let big = [ 1; 5; 9 ] |> List.filter (fun x -> x > 3)`, notes: [] },
            { code: `let total = [ 1; 2; 3 ] |> List.fold (fun acc x -> acc + x) 0`, notes: [{ at: "fold", text: "accumulates a single result" }] }
          ]
        },
        {
          id: "comprehensions", n: 3, title: "list comprehensions", level: 2,
          gloss: "Generates lists with a for expression and yield.",
          examples: [
            { code: `let squares = [ for n in 1 .. 5 -> n * n ]`, notes: [{ at: "->", text: "shorthand for do yield" }] },
            { code: `let evens = [ for n in 1 .. 10 do if n % 2 = 0 then yield n ]`, notes: [] },
            { code: `let pairs = [ for x in 1 .. 2 do for y in 1 .. 2 -> (x, y) ]`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "arrays-sequences",
      n: 6,
      title: "arrays and sequences",
      concepts: [
        {
          id: "arrays", n: 1, title: "arrays", level: 1,
          gloss: "Stores items in a mutable array that is indexed from zero.",
          examples: [
            { code: `let scores = [| 90; 85; 70 |]
let first = scores[0]`, notes: [{ at: "[|", text: "starts an array literal" }, { at: "scores[0]", text: "index without a dot" }] },
            { code: `let data = Array.zeroCreate<int> 3
data[1] <- 42`, notes: [] },
            { code: `let upper = [| "a"; "b" |] |> Array.map (fun s -> s.ToUpper())`, notes: [] }
          ]
        },
        {
          id: "slicing", n: 2, title: "slicing", level: 2,
          gloss: "Takes a part of a list or array with range syntax.",
          examples: [
            { code: `let middle = [| 1; 2; 3; 4; 5 |][1..3]`, notes: [{ at: "[1..3]", text: "inclusive slice" }] },
            { code: `let start = [ 10; 20; 30; 40 ][..1]`, notes: [] },
            { code: `let tail = "hello"[2..]`, notes: [] }
          ]
        },
        {
          id: "sequences", n: 3, title: "sequences", level: 2,
          gloss: "Describes lazy collections with seq that compute items on demand.",
          examples: [
            { code: `let naturals = Seq.initInfinite (fun i -> i + 1)
let firstFive = naturals |> Seq.take 5 |> Seq.toList`, notes: [{ at: "Seq", text: "lazy, computed when read" }] },
            { code: `let squares = seq { for n in 1 .. 5 -> n * n }`, notes: [] },
            { code: `let total =
    seq { 1 .. 100 }
    |> Seq.filter (fun n -> n % 3 = 0)
    |> Seq.sum`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "tuples-records",
      n: 7,
      title: "tuples and records",
      concepts: [
        {
          id: "tuples", n: 1, title: "tuples", level: 1,
          gloss: "Groups a fixed number of values of different types without a declaration.",
          examples: [
            { code: `let pair = ("Ada", 36)
let name, age = pair`, notes: [{ at: "let name, age", text: "unpacks the tuple" }] },
            { code: `let point = (3, 4)
let swapped = (snd point, fst point)`, notes: [] },
            { code: `let divide a b = (a / b, a % b)
let quotient, remainder = divide 17 5`, notes: [] }
          ]
        },
        {
          id: "records", n: 2, title: "records", level: 1,
          gloss: "Declares a named set of fields and creates values with braces.",
          examples: [
            { code: `type Person = { Name: string; Age: int }
let ada = { Name = "Ada"; Age = 36 }`, notes: [{ at: "type", text: "declares the record" }] },
            { code: `type Point = { X: float; Y: float }
let origin = { X = 0.0; Y = 0.0 }
let distance = sqrt (origin.X ** 2.0 + origin.Y ** 2.0)`, notes: [] },
            { code: `type Book = { Title: string; Pages: int }
let books = [ { Title = "Dune"; Pages = 412 } ]`, notes: [] }
          ]
        },
        {
          id: "copy-update", n: 3, title: "copy and update", level: 2,
          gloss: "Creates a changed copy of a record with the with keyword.",
          examples: [
            { code: `type Person = { Name: string; Age: int }
let ada = { Name = "Ada"; Age = 36 }
let older = { ada with Age = 37 }`, notes: [{ at: "with", text: "copies with changed fields" }] },
            { code: `type Config = { Host: string; Port: int }
let local = { Host = "localhost"; Port = 80 }
let dev = { local with Port = 3000 }`, notes: [] },
            { code: `type Item = { Id: int; Done: bool }
let item = { Id = 1; Done = false }
let finished = { item with Done = true }`, notes: [] }
          ]
        },
        {
          id: "anonymous-records", n: 4, title: "anonymous records", level: 2,
          gloss: "Creates a record on the fly without declaring a type.",
          examples: [
            { code: `let point = {| X = 1; Y = 2 |}
let x = point.X`, notes: [{ at: "{| X", text: "an anonymous record" }] },
            { code: `let summary = {| Total = 10; Average = 2.5 |}`, notes: [] },
            { code: `let rows = [ {| Id = 1; Name = "a" |}; {| Id = 2; Name = "b" |} ]`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "unions-matching",
      n: 8,
      title: "unions and matching",
      concepts: [
        {
          id: "unions", n: 1, title: "discriminated unions", level: 1,
          gloss: "Declares a type that is exactly one of several named cases.",
          examples: [
            { code: `type Shape =
    | Circle of radius: float
    | Rectangle of width: float * height: float`, notes: [{ at: "|", text: "one case per line" }] },
            { code: `type Direction = North | East | South | West`, notes: [] },
            { code: `type Command =
    | Quit
    | Move of int * int
    | Say of string`, notes: [] }
          ]
        },
        {
          id: "match-expressions", n: 2, title: "match expressions", level: 1,
          gloss: "Chooses a result by matching a value against patterns.",
          examples: [
            { code: `let describe n =
    match n with
    | 0 -> "zero"
    | 1 -> "one"
    | _ -> "many"`, notes: [{ at: "match", text: "compares against patterns" }, { at: "_", text: "matches anything else" }] },
            { code: `type Shape = Circle of float | Square of float
let area shape =
    match shape with
    | Circle r -> 3.14 * r * r
    | Square s -> s * s`, notes: [] },
            { code: `let first list =
    match list with
    | [] -> None
    | head :: _ -> Some head`, notes: [] }
          ]
        },
        {
          id: "guards-patterns", n: 3, title: "guards and active patterns", level: 2,
          gloss: "Adds conditions to patterns and names reusable patterns.",
          examples: [
            { code: `let sign n =
    match n with
    | n when n < 0 -> "negative"
    | 0 -> "zero"
    | _ -> "positive"`, notes: [{ at: "when", text: "adds a condition to a pattern" }] },
            { code: `let (|Even|Odd|) n = if n % 2 = 0 then Even else Odd
let label n =
    match n with
    | Even -> "even"
    | Odd -> "odd"`, notes: [{ at: "(|Even|Odd|)", text: "a complete active pattern" }] },
            { code: `let describe pair =
    match pair with
    | (0, 0) -> "origin"
    | (x, 0) | (0, x) -> $"axis {x}"
    | _ -> "plane"`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "options-results",
      n: 9,
      title: "options and results",
      concepts: [
        {
          id: "option", n: 1, title: "option", level: 1,
          gloss: "Represents a value that may be missing with Some and None.",
          examples: [
            { code: `let found = Some 42
let missing: int option = None`, notes: [{ at: "Some", text: "a present value" }, { at: "None", text: "no value" }] },
            { code: `let parse (s: string) =
    match System.Int32.TryParse s with
    | true, n -> Some n
    | _ -> None`, notes: [] },
            { code: `let first = [ 1; 2; 3 ] |> List.tryHead`, notes: [{ at: "tryHead", text: "gives none for an empty list" }] }
          ]
        },
        {
          id: "option-functions", n: 2, title: "option functions", level: 2,
          gloss: "Transforms optional values without matching with the Option module.",
          examples: [
            { code: `let doubled = Some 4 |> Option.map (fun x -> x * 2)`, notes: [{ at: "Option.map", text: "changes the inner value" }] },
            { code: `let value = None |> Option.defaultValue 0`, notes: [{ at: "defaultValue", text: "a fallback for None" }] },
            { code: `let positive n = if n > 0 then Some n else None
let result = Some 3 |> Option.bind positive`, notes: [] }
          ]
        },
        {
          id: "results", n: 3, title: "results", level: 2,
          gloss: "Reports success or a typed error with Ok and Error.",
          examples: [
            { code: `let divide a b =
    if b = 0 then Error "divide by zero" else Ok (a / b)`, notes: [{ at: "Ok", text: "the success case" }, { at: "Error", text: "the failure case" }] },
            { code: `let doubled: Result<int, string> = Ok 5 |> Result.map (fun x -> x * 2)`, notes: [] },
            { code: `let describe result =
    match result with
    | Ok v -> $"value {v}"
    | Error e -> $"failed: {e}"`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "classes",
      n: 10,
      title: "classes and interfaces",
      concepts: [
        {
          id: "classes", n: 1, title: "classes", level: 2,
          gloss: "Declares a type with a primary constructor and members.",
          examples: [
            { code: `type Counter() =
    let mutable count = 0
    member _.Next() =
        count <- count + 1
        count`, notes: [{ at: "Counter()", text: "the primary constructor" }, { at: "member", text: "a method on the type" }] },
            { code: `type Person(name: string, age: int) =
    member _.Name = name
    member _.Age = age
    member this.Greet() = $"Hi, I am {this.Name}"`, notes: [] },
            { code: `type Account(owner: string) =
    member val Balance = 0.0 with get, set
    member _.Owner = owner`, notes: [] }
          ]
        },
        {
          id: "interfaces", n: 2, title: "interfaces", level: 3,
          gloss: "Declares a contract and implements it on a type.",
          examples: [
            { code: `type IShape =
    abstract Area: unit -> float

type Square(side: float) =
    interface IShape with
        member _.Area() = side * side`, notes: [{ at: "abstract", text: "a member without a body" }, { at: "interface IShape with", text: "implements the contract" }] },
            { code: `type IGreeter =
    abstract Greet: string -> string

let polite =
    { new IGreeter with
        member _.Greet name = $"Good day, {name}" }`, notes: [{ at: "{ new IGreeter with", text: "an object expression" }] },
            { code: `type ILogger =
    abstract Log: string -> unit

type ConsoleLogger() =
    interface ILogger with
        member _.Log msg = printfn "%s" msg`, notes: [] }
          ]
        },
        {
          id: "inheritance", n: 3, title: "inheritance", level: 3,
          gloss: "Extends a class and overrides a virtual member.",
          examples: [
            { code: `type Animal() =
    abstract Sound: unit -> string
    default _.Sound() = "..."

type Dog() =
    inherit Animal()
    override _.Sound() = "Woof"`, notes: [{ at: "inherit", text: "the base class" }, { at: "override", text: "replaces the base member" }] },
            { code: `[<AbstractClass>]
type Shape() =
    abstract Area: float

type Circle(r: float) =
    inherit Shape()
    override _.Area = 3.14 * r * r`, notes: [] },
            { code: `type Base() =
    member _.Name = "base"

type Child() =
    inherit Base()
    member this.Hello = $"I am {this.Name}"`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "modules",
      n: 11,
      title: "modules",
      concepts: [
        {
          id: "module-declaration", n: 1, title: "module declaration", level: 1,
          gloss: "Groups related values and functions inside a module.",
          examples: [
            { code: `module Math =
    let square x = x * x
    let cube x = x * x * x

let nine = Math.square 3`, notes: [{ at: "module", text: "a named group of definitions" }] },
            { code: `module Text =
    let shout (s: string) = s.ToUpper() + "!"

let loud = Text.shout "hey"`, notes: [] },
            { code: `module Constants =
    let pi = 3.14159
    let e = 2.71828`, notes: [] }
          ]
        },
        {
          id: "open-modules", n: 2, title: "open declarations", level: 1,
          gloss: "Brings module members into scope with open.",
          examples: [
            { code: `module Util =
    let double x = x * 2

open Util
let ten = double 5`, notes: [{ at: "open", text: "use names without a prefix" }] },
            { code: `open System
let today = DateTime.Today.Year`, notes: [] },
            { code: `open System.Collections.Generic
let list = List<int>()`, notes: [] }
          ]
        },
        {
          id: "nested-private", n: 3, title: "nested and private", level: 2,
          gloss: "Nests modules and hides helpers with private.",
          examples: [
            { code: `module Outer =
    module Inner =
        let value = 42

let v = Outer.Inner.value`, notes: [{ at: "Inner", text: "a module inside a module" }] },
            { code: `module Bank =
    let private fee = 2
    let charge amount = amount + fee`, notes: [{ at: "private", text: "hidden outside the module" }] },
            { code: `[<RequireQualifiedAccess>]
module Color =
    let red = "#ff0000"

let c = Color.red`, notes: [{ at: "RequireQualifiedAccess", text: "forces the module prefix" }] }
          ]
        }
      ]
    },
    {
      id: "collections",
      n: 12,
      title: "maps and sets",
      concepts: [
        {
          id: "maps", n: 1, title: "maps", level: 2,
          gloss: "Stores key and value pairs in an immutable Map.",
          examples: [
            { code: `let ages = Map [ "ada", 36; "bob", 41 ]
let ada = ages["ada"]`, notes: [{ at: "Map", text: "immutable dictionary" }] },
            { code: `let updated = Map.empty |> Map.add "x" 1 |> Map.add "y" 2`, notes: [{ at: "Map.add", text: "returns a new map" }] },
            { code: `let found = Map [ "a", 1 ] |> Map.tryFind "b"`, notes: [] }
          ]
        },
        {
          id: "sets", n: 2, title: "sets", level: 2,
          gloss: "Keeps unique items in an immutable Set.",
          examples: [
            { code: `let tags = set [ "a"; "b"; "a" ]
let count = tags.Count`, notes: [{ at: "set", text: "duplicates disappear" }] },
            { code: `let both = Set.intersect (set [ 1; 2; 3 ]) (set [ 2; 3; 4 ])`, notes: [] },
            { code: `let has = set [ 1; 2 ] |> Set.contains 2`, notes: [] }
          ]
        },
        {
          id: "dictionaries", n: 3, title: "dictionaries", level: 3,
          gloss: "Creates a mutable dictionary and counts with it.",
          examples: [
            { code: `let d = System.Collections.Generic.Dictionary<string, int>()
d["a"] <- 1`, notes: [{ at: "Dictionary", text: "mutable key value store" }] },
            { code: `let counts =
    [ "a"; "b"; "a" ]
    |> List.countBy id
    |> dict`, notes: [{ at: "countBy", text: "pairs of item and count" }] },
            { code: `let lookup = dict [ "one", 1; "two", 2 ]
let two = lookup["two"]`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "computation",
      n: 13,
      title: "computation expressions",
      concepts: [
        {
          id: "seq-expressions", n: 1, title: "sequence expressions", level: 1,
          gloss: "Builds a lazy sequence with seq and yield.",
          examples: [
            { code: `let numbers = seq {
    yield 1
    yield 2
    yield 3
}`, notes: [{ at: "yield", text: "adds an item" }] },
            { code: `let evens = seq { for n in 1 .. 10 do if n % 2 = 0 then yield n }`, notes: [] },
            { code: `let nested = seq { for a in 1 .. 2 do for b in 1 .. 2 -> a * b }`, notes: [] }
          ]
        },
        {
          id: "async-workflows", n: 2, title: "async workflows", level: 2,
          gloss: "Runs asynchronous work in an async block with let bang.",
          examples: [
            { code: `let work = async { return 21 * 2 }
let result = work |> Async.RunSynchronously`, notes: [{ at: "async", text: "a computation to run later" }] },
            { code: `let compute = async {
    do! Async.Sleep 10
    return "done"
}`, notes: [{ at: "do!", text: "waits for async work" }] },
            { code: `let both =
    [ async { return 1 }; async { return 2 } ]
    |> Async.Parallel
    |> Async.RunSynchronously`, notes: [] }
          ]
        },
        {
          id: "task-expressions", n: 3, title: "task expressions", level: 2,
          gloss: "Works with .NET tasks through the task block.",
          examples: [
            { code: `let t = task { return 42 }
let value = t.Result`, notes: [{ at: "task", text: "a .NET Task" }] },
            { code: `let delayed = task {
    do! System.Threading.Tasks.Task.Delay 10
    return "ok"
}`, notes: [] },
            { code: `let download = task {
    let! n = task { return 3 }
    return n * 2
}`, notes: [{ at: "let!", text: "awaits a result" }] }
          ]
        }
      ]
    },
    {
      id: "errors-resources",
      n: 14,
      title: "errors and resources",
      concepts: [
        {
          id: "exceptions", n: 1, title: "exceptions", level: 1,
          gloss: "Raises errors with failwith and handles them with try and with.",
          examples: [
            { code: `let result =
    try
        failwith "boom"
    with ex -> ex.Message`, notes: [{ at: "try", text: "starts a guarded block" }] },
            { code: `let safeDivide a b =
    try Some (a / b) with :? System.DivideByZeroException -> None`, notes: [] },
            { code: `let check n = if n < 0 then invalidArg "n" "must be positive" else n`, notes: [{ at: "invalidArg", text: "argument errors" }] }
          ]
        },
        {
          id: "finally-use", n: 2, title: "finally and use", level: 2,
          gloss: "Releases resources with finally and the use binding.",
          examples: [
            { code: `let value =
    try
        42
    finally
        printfn "cleanup"`, notes: [{ at: "finally", text: "always runs" }] },
            { code: `let text =
    use reader = new System.IO.StringReader "hello"
    reader.ReadToEnd()`, notes: [{ at: "use", text: "disposes at the end of the scope" }] },
            { code: `let run () =
    use x = { new System.IDisposable with member _.Dispose() = () }
    42`, notes: [] }
          ]
        },
        {
          id: "custom-exceptions", n: 3, title: "custom exceptions", level: 2,
          gloss: "Declares your own exception type and raises it.",
          examples: [
            { code: `exception NotFound of string

let find key = raise (NotFound key)`, notes: [{ at: "exception", text: "declares an exception type" }] },
            { code: `exception Invalid of code: int

let handle () =
    try raise (Invalid 7) with Invalid code -> code`, notes: [] },
            { code: `let attempt () =
    try
        raise (System.InvalidOperationException "bad state")
    with :? System.InvalidOperationException as e -> e.Message`, notes: [] }
          ]
        }
      ]
    }
  ]
};
