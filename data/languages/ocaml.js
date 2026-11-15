export default {
  id: "ocaml",
  name: "OCaml",
  short: "OC",
  pigment: "ocaml",
  family: null,
  version: "5.5",
  lexer: "ocaml",
  indent: 2,
  topics: [
    {
      id: "values-bindings",
      n: 1,
      title: "values and bindings",
      concepts: [
        {
          id: "let-bindings", n: 1, title: "let bindings", level: 1,
          gloss: "Binds a name to a value that never changes after it is set.",
          examples: [
            { code: `let city = "Oslo"
let visits = 3
let () = print_endline city`, notes: [{ at: "let", text: "binds a name to a value" }, { at: "let ()", text: "runs an action for its effect" }] },
            { code: `let width = 4
let height = 5
let area = width * height`, notes: [] },
            { code: `let greeting = "Hello"
let name = "Ada"
let message = greeting ^ ", " ^ name`, notes: [{ at: "^", text: "joins two strings" }] }
          ]
        },
        {
          id: "local-bindings", n: 2, title: "local bindings", level: 1,
          gloss: "Limits a name to one expression with let and in.",
          examples: [
            { code: `let result =
  let x = 3 in
  let y = 4 in
  x * x + y * y`, notes: [{ at: "in", text: "the name is only visible below" }] },
            { code: `let hypotenuse =
  let a = 3.0 and b = 4.0 in
  sqrt ((a *. a) +. (b *. b))`, notes: [{ at: "and", text: "binds both at once" }] },
            { code: `let total = (let price = 9 in price * 3) + 1`, notes: [] }
          ]
        },
        {
          id: "references", n: 3, title: "references", level: 2,
          gloss: "Creates mutable cells with ref and reads them with the bang operator.",
          examples: [
            { code: `let count = ref 0
let () = count := !count + 1`, notes: [{ at: "ref", text: "a mutable cell" }, { at: ":=", text: "assigns a new value" }, { at: "!", text: "reads the cell" }] },
            { code: `let total = ref 10
let () = incr total
let () = decr total`, notes: [{ at: "incr", text: "adds one" }] },
            { code: `let name = ref "ada"
let () = name := String.uppercase_ascii !name`, notes: [] }
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
          gloss: "Calculates with integers and floats, which use different operators.",
          examples: [
            { code: `let sum = 7 + 3 * 2
let half = 7 / 2
let rest = 7 mod 2`, notes: [{ at: "mod", text: "the remainder" }] },
            { code: `let exact = 7.0 /. 2.0
let area = 3.14 *. 2.0 *. 2.0`, notes: [{ at: "/.", text: "float division" }] },
            { code: `let truncated = int_of_float 3.9
let widened = float_of_int 4`, notes: [{ at: "int_of_float", text: "converts and truncates" }] }
          ]
        },
        {
          id: "strings-chars", n: 2, title: "strings and chars", level: 1,
          gloss: "Works with text and single characters using the String and Char modules.",
          examples: [
            { code: `let hello = "Hello, " ^ "Ada"
let length = String.length hello`, notes: [{ at: "String.length", text: "number of bytes" }] },
            { code: `let part = String.sub "hello world" 6 5`, notes: [{ at: "String.sub", text: "start and length" }] },
            { code: `let letter = 'a'
let upper = Char.uppercase_ascii letter`, notes: [{ at: "'a'", text: "a character literal" }] }
          ]
        },
        {
          id: "booleans", n: 3, title: "booleans and comparison", level: 1,
          gloss: "Compares values structurally and combines conditions with logical operators.",
          examples: [
            { code: `let same = 3 = 3
let different = 3 <> 4`, notes: [{ at: "=", text: "structural equality" }, { at: "<>", text: "structural inequality" }] },
            { code: `let ok = 5 > 3 && 2 < 4
let either = false || true`, notes: [] },
            { code: `let a = [ 1; 2 ]
let b = [ 1; 2 ]
let structural = a = b
let physical = a == b`, notes: [{ at: "==", text: "the very same object" }] }
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
          gloss: "Declares a function with let and calls it by writing arguments after it.",
          examples: [
            { code: `let square x = x * x
let nine = square 3`, notes: [{ at: "square x", text: "a function of one argument" }] },
            { code: `let add a b = a + b
let total = add 3 4`, notes: [] },
            { code: `let greet (name : string) : string = "Hello, " ^ name`, notes: [{ at: "(name : string)", text: "a typed parameter" }] }
          ]
        },
        {
          id: "anonymous-partial", n: 2, title: "anonymous and partial", level: 1,
          gloss: "Writes unnamed functions with fun and fixes arguments to make new ones.",
          examples: [
            { code: `let double = fun x -> x * 2
let six = double 3`, notes: [{ at: "fun", text: "an unnamed function" }] },
            { code: `let add a b = a + b
let add_five = add 5
let ten = add_five 5`, notes: [{ at: "add 5", text: "a function waiting for b" }] },
            { code: `let doubled = List.map (( * ) 2) [ 1; 2; 3 ]`, notes: [{ at: "( * )", text: "an operator as a function" }] }
          ]
        },
        {
          id: "recursion", n: 3, title: "recursion", level: 2,
          gloss: "Calls a function from itself when declared with let rec.",
          examples: [
            { code: `let rec factorial n = if n <= 1 then 1 else n * factorial (n - 1)`, notes: [{ at: "rec", text: "allows self reference" }] },
            { code: `let rec sum_to n acc = if n = 0 then acc else sum_to (n - 1) (acc + n)`, notes: [{ at: "acc", text: "an accumulator keeps it tail recursive" }] },
            { code: `let rec is_even n = n = 0 || is_odd (n - 1)
and is_odd n = n <> 0 && is_even (n - 1)`, notes: [{ at: "and", text: "mutually recursive functions" }] }
          ]
        },
        {
          id: "labelled-arguments", n: 4, title: "labelled arguments", level: 2,
          gloss: "Names arguments with tilde and makes some optional with a question mark.",
          examples: [
            { code: `let greet ~name ~greeting = greeting ^ ", " ^ name
let message = greet ~greeting:"Hi" ~name:"Ada"`, notes: [{ at: "~name", text: "a labelled argument" }] },
            { code: `let join ?(sep = ",") a b = a ^ sep ^ b
let joined = join "x" "y"`, notes: [{ at: "?(sep = \",\")", text: "optional with a default" }] },
            { code: `let area ~width ~height = width * height
let result = area ~height:2 ~width:5`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "pipelines",
      n: 4,
      title: "pipelines and operators",
      concepts: [
        {
          id: "pipe-forward", n: 1, title: "pipe forward", level: 1,
          gloss: "Passes a value into a function from the left with the pipe operator.",
          examples: [
            { code: `let result = [ 1; 2; 3 ] |> List.map (fun x -> x * 2)`, notes: [{ at: "|>", text: "feeds the value on its left" }] },
            { code: `let total =
  [ 1; 2; 3; 4; 5 ]
  |> List.filter (fun n -> n mod 2 = 1)
  |> List.fold_left ( + ) 0`, notes: [] },
            { code: `let shout = "hello" |> String.uppercase_ascii |> String.length`, notes: [] }
          ]
        },
        {
          id: "application", n: 2, title: "application operator", level: 2,
          gloss: "Applies a function with the at operator to avoid extra parentheses.",
          examples: [
            { code: `let () = print_endline @@ string_of_int @@ 6 * 7`, notes: [{ at: "@@", text: "applies to everything on its right" }] },
            { code: `let text = String.concat ", " @@ List.map string_of_int [ 1; 2; 3 ]`, notes: [] },
            { code: `let n = List.length @@ List.filter (fun x -> x > 1) [ 1; 2; 3 ]`, notes: [] }
          ]
        },
        {
          id: "custom-operators", n: 3, title: "custom operators", level: 3,
          gloss: "Defines a new infix operator with let and parentheses.",
          examples: [
            { code: `let ( >> ) f g x = g (f x)
let inc_then_double = (fun x -> x + 1) >> (fun x -> x * 2)`, notes: [{ at: "( >> )", text: "defines an infix operator" }] },
            { code: `let ( ++ ) a b = a ^ " " ^ b
let sentence = "hello" ++ "world"`, notes: [] },
            { code: `let ( |? ) opt default = Option.value opt ~default
let name = None |? "anonymous"`, notes: [] }
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
          gloss: "Builds immutable lists with literals, the cons operator and append.",
          examples: [
            { code: `let numbers = [ 1; 2; 3 ]
let words = [ "pen"; "ink" ]`, notes: [{ at: ";", text: "separates list items" }] },
            { code: `let list = [ 2; 3 ]
let longer = 1 :: list`, notes: [{ at: "::", text: "adds one item at the front" }] },
            { code: `let joined = [ 1; 2 ] @ [ 3; 4 ]
let empty = []`, notes: [{ at: "@", text: "appends two lists" }] }
          ]
        },
        {
          id: "list-module", n: 2, title: "list functions", level: 1,
          gloss: "Transforms lists with map, filter and the fold functions.",
          examples: [
            { code: `let doubled = List.map (fun x -> x * 2) [ 1; 2; 3 ]`, notes: [{ at: "List.map", text: "transforms every item" }] },
            { code: `let big = List.filter (fun x -> x > 3) [ 1; 5; 9 ]`, notes: [] },
            { code: `let total = List.fold_left (fun acc x -> acc + x) 0 [ 1; 2; 3 ]`, notes: [{ at: "fold_left", text: "accumulates one result" }] }
          ]
        },
        {
          id: "list-lookup", n: 3, title: "searching and sorting", level: 2,
          gloss: "Finds items, looks up pairs and sorts with the List module.",
          examples: [
            { code: `let first_even = List.find_opt (fun x -> x mod 2 = 0) [ 1; 3; 4; 5 ]`, notes: [{ at: "find_opt", text: "gives an option" }] },
            { code: `let age = List.assoc "ada" [ ("ada", 36); ("bob", 41) ]`, notes: [{ at: "assoc", text: "value for a key in a pair list" }] },
            { code: `let sorted = List.sort compare [ 3; 1; 2 ]
let backwards = List.rev sorted`, notes: [] }
          ]
        },
        {
          id: "list-iteration", n: 4, title: "iterating", level: 2,
          gloss: "Runs an action for each item with iter and iteri.",
          examples: [
            { code: `let () = List.iter print_endline [ "a"; "b" ]`, notes: [{ at: "iter", text: "runs for each item" }] },
            { code: `let () =
  List.iteri (fun i s -> Printf.printf "%d:%s\\n" i s) [ "a"; "b" ]`, notes: [] },
            { code: `let indexed = List.mapi (fun i x -> (i, x)) [ "a"; "b" ]`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "tuples-records",
      n: 6,
      title: "tuples and records",
      concepts: [
        {
          id: "tuples", n: 1, title: "tuples", level: 1,
          gloss: "Groups a fixed number of values of different types.",
          examples: [
            { code: `let pair = ("Ada", 36)
let name, age = pair`, notes: [{ at: "let name, age", text: "unpacks the tuple" }] },
            { code: `let point = (3, 4)
let swapped = (snd point, fst point)`, notes: [] },
            { code: `let divide a b = (a / b, a mod b)
let quotient, remainder = divide 17 5`, notes: [] }
          ]
        },
        {
          id: "records", n: 2, title: "records", level: 1,
          gloss: "Declares a named set of fields and creates values with braces.",
          examples: [
            { code: `type person = { name : string; age : int }
let ada = { name = "Ada"; age = 36 }`, notes: [{ at: "type", text: "declares the record" }] },
            { code: `type point = { x : float; y : float }
let origin = { x = 0.0; y = 0.0 }
let dx = origin.x`, notes: [{ at: "origin.x", text: "reads one field" }] },
            { code: `type book = { title : string; pages : int }
let books = [ { title = "Dune"; pages = 412 } ]`, notes: [] }
          ]
        },
        {
          id: "update-mutable", n: 3, title: "update and mutable fields", level: 2,
          gloss: "Copies a record with changed fields or mutates a field in place.",
          examples: [
            { code: `type person = { name : string; age : int }
let ada = { name = "Ada"; age = 36 }
let older = { ada with age = 37 }`, notes: [{ at: "with", text: "copy with changed fields" }] },
            { code: `type counter = { mutable count : int }
let c = { count = 0 }
let () = c.count <- c.count + 1`, notes: [{ at: "mutable", text: "allows in place change" }, { at: "<-", text: "assigns a mutable field" }] },
            { code: `type config = { host : string; port : int }
let local = { host = "localhost"; port = 80 }
let dev = { local with port = 3000 }`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "variants",
      n: 7,
      title: "variants and matching",
      concepts: [
        {
          id: "variant-types", n: 1, title: "variant types", level: 1,
          gloss: "Declares a type that is exactly one of several named cases.",
          examples: [
            { code: `type shape =
  | Circle of float
  | Rectangle of float * float`, notes: [{ at: "|", text: "one case per line" }, { at: "of", text: "the data a case carries" }] },
            { code: `type direction = North | East | South | West`, notes: [] },
            { code: `type command =
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
            { code: `type shape = Circle of float | Square of float

let area = function
  | Circle r -> 3.14 *. r *. r
  | Square s -> s *. s`, notes: [{ at: "function", text: "a function that matches its argument" }] },
            { code: `let first list =
  match list with
  | [] -> None
  | head :: _ -> Some head`, notes: [] }
          ]
        },
        {
          id: "pattern-features", n: 3, title: "guards and recursion", level: 2,
          gloss: "Adds conditions to patterns and walks recursive variants.",
          examples: [
            { code: `let sign n =
  match n with
  | n when n < 0 -> "negative"
  | 0 -> "zero"
  | _ -> "positive"`, notes: [{ at: "when", text: "adds a condition to a pattern" }] },
            { code: `type tree = Leaf | Node of tree * int * tree

let rec size = function
  | Leaf -> 0
  | Node (l, _, r) -> size l + 1 + size r`, notes: [{ at: "Node (l, _, r)", text: "unpacks the case" }] },
            { code: `let kind c =
  match c with
  | 'a' | 'e' | 'i' | 'o' | 'u' -> "vowel"
  | _ -> "other"`, notes: [{ at: "|", text: "several patterns for one result" }] }
          ]
        }
      ]
    },
    {
      id: "options-results",
      n: 8,
      title: "options and results",
      concepts: [
        {
          id: "option", n: 1, title: "option", level: 1,
          gloss: "Represents a value that may be missing with Some and None.",
          examples: [
            { code: `let found = Some 42
let missing : int option = None`, notes: [{ at: "Some", text: "a present value" }, { at: "None", text: "no value" }] },
            { code: `let parse s = int_of_string_opt s
let n = parse "12"`, notes: [] },
            { code: `let first = List.nth_opt [ 1; 2; 3 ] 0`, notes: [] }
          ]
        },
        {
          id: "option-functions", n: 2, title: "option functions", level: 2,
          gloss: "Transforms optional values without matching with the Option module.",
          examples: [
            { code: `let doubled = Option.map (fun x -> x * 2) (Some 4)`, notes: [{ at: "Option.map", text: "changes the inner value" }] },
            { code: `let value = Option.value None ~default:0`, notes: [{ at: "~default", text: "a fallback for None" }] },
            { code: `let positive n = if n > 0 then Some n else None
let result = Option.bind (Some 3) positive`, notes: [] }
          ]
        },
        {
          id: "results", n: 3, title: "results", level: 2,
          gloss: "Reports success or a typed error with Ok and Error.",
          examples: [
            { code: `let divide a b = if b = 0 then Error "divide by zero" else Ok (a / b)`, notes: [{ at: "Ok", text: "the success case" }, { at: "Error", text: "the failure case" }] },
            { code: `let doubled = Result.map (fun x -> x * 2) (Ok 5 : (int, string) result)`, notes: [] },
            { code: `let describe = function
  | Ok v -> Printf.sprintf "value %d" v
  | Error e -> "failed: " ^ e`, notes: [] }
          ]
        },
        {
          id: "binding-operators", n: 4, title: "binding operators", level: 3,
          gloss: "Chains steps that may fail with the let star operator.",
          examples: [
            { code: `let ( let* ) = Option.bind

let total a b =
  let* x = int_of_string_opt a in
  let* y = int_of_string_opt b in
  Some (x + y)`, notes: [{ at: "let*", text: "continue only on Some" }] },
            { code: `let ( let* ) = Result.bind

let check n = if n > 0 then Ok n else Error "not positive"
let both = let* a = check 1 in check (a + 1)`, notes: [] },
            { code: `let ( let+ ) x f = Option.map f x
let doubled = let+ n = Some 21 in n * 2`, notes: [{ at: "let+", text: "maps without wrapping" }] }
          ]
        }
      ]
    },
    {
      id: "arrays-strings",
      n: 9,
      title: "arrays and strings",
      concepts: [
        {
          id: "arrays", n: 1, title: "arrays", level: 1,
          gloss: "Stores items in a mutable array that is indexed from zero.",
          examples: [
            { code: `let scores = [| 90; 85; 70 |]
let first = scores.(0)`, notes: [{ at: "[| 90", text: "an array literal" }, { at: ".(0)", text: "index with dot and parentheses" }] },
            { code: `let data = Array.make 3 0
let () = data.(1) <- 42`, notes: [{ at: "<-", text: "sets an element" }] },
            { code: `let upper = Array.map String.uppercase_ascii [| "a"; "b" |]`, notes: [] }
          ]
        },
        {
          id: "string-functions", n: 2, title: "string functions", level: 1,
          gloss: "Changes and takes apart strings with the String module.",
          examples: [
            { code: `let parts = String.split_on_char ',' "a,b,c"`, notes: [{ at: "split_on_char", text: "a list of pieces" }] },
            { code: `let line = String.concat "-" [ "a"; "b"; "c" ]`, notes: [] },
            { code: `let clean = String.trim "  hi  " |> String.uppercase_ascii`, notes: [] }
          ]
        },
        {
          id: "buffers-format", n: 3, title: "buffers and formatting", level: 2,
          gloss: "Builds long strings in a buffer and formats values with Printf.",
          examples: [
            { code: `let b = Buffer.create 16
let () = Buffer.add_string b "hello"
let text = Buffer.contents b`, notes: [{ at: "Buffer", text: "efficient string building" }] },
            { code: `let line = Printf.sprintf "%s is %d" "Ada" 36`, notes: [{ at: "%d", text: "an integer placeholder" }] },
            { code: `let money = Printf.sprintf "%.2f" 3.14159`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "modules",
      n: 10,
      title: "modules and signatures",
      concepts: [
        {
          id: "module-definition", n: 1, title: "defining modules", level: 1,
          gloss: "Groups related values and functions in a module with struct.",
          examples: [
            { code: `module Math = struct
  let square x = x * x
  let cube x = x * x * x
end

let nine = Math.square 3`, notes: [{ at: "struct", text: "opens the module body" }] },
            { code: `module Text = struct
  let shout s = String.uppercase_ascii s ^ "!"
end

let loud = Text.shout "hey"`, notes: [] },
            { code: `module Constants = struct
  let pi = 3.14159
  let e = 2.71828
end`, notes: [] }
          ]
        },
        {
          id: "open-include", n: 2, title: "open and include", level: 2,
          gloss: "Brings module names into scope or copies them into another module.",
          examples: [
            { code: `module Util = struct
  let double x = x * 2
end

open Util
let ten = double 5`, notes: [{ at: "open", text: "use names without a prefix" }] },
            { code: `let result = List.(map (fun x -> x + 1) [ 1; 2 ] |> rev)`, notes: [{ at: "List.(map", text: "opens a module locally" }] },
            { code: `module Base = struct
  let name = "base"
end

module Extended = struct
  include Base
  let hello = "hi " ^ name
end`, notes: [] }
          ]
        },
        {
          id: "signatures", n: 3, title: "signatures", level: 3,
          gloss: "Hides implementation details behind a module type.",
          examples: [
            { code: `module type COUNTER = sig
  val next : unit -> int
end

module Counter : COUNTER = struct
  let n = ref 0
  let next () = incr n; !n
end`, notes: [{ at: "module type", text: "a signature" }, { at: "sig", text: "lists what is visible" }] },
            { code: `module type SHAPE = sig
  type t
  val area : t -> float
end

module Square : SHAPE with type t = float = struct
  type t = float
  let area s = s *. s
end`, notes: [] },
            { code: `module Safe : sig
  val double : int -> int
end = struct
  let double x = x * 2
  let hidden = 1
end`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "functors-collections",
      n: 11,
      title: "functors and collections",
      concepts: [
        {
          id: "maps-sets", n: 1, title: "maps and sets", level: 2,
          gloss: "Creates ordered maps and sets by applying the Map and Set functors.",
          examples: [
            { code: `module StringMap = Map.Make (String)

let ages = StringMap.(empty |> add "ada" 36 |> add "bob" 41)
let ada = StringMap.find "ada" ages`, notes: [{ at: "Map.Make", text: "builds a map for a key type" }] },
            { code: `module IntSet = Set.Make (Int)

let s = IntSet.of_list [ 3; 1; 3; 2 ]
let size = IntSet.cardinal s`, notes: [{ at: "Set.Make", text: "builds a set for an element type" }] },
            { code: `module M = Map.Make (Int)

let m = M.add 1 "one" M.empty
let found = M.find_opt 2 m`, notes: [] }
          ]
        },
        {
          id: "hash-tables", n: 2, title: "hash tables", level: 2,
          gloss: "Stores mutable key and value pairs in a Hashtbl.",
          examples: [
            { code: `let table = Hashtbl.create 16
let () = Hashtbl.add table "a" 1
let found = Hashtbl.find_opt table "a"`, notes: [{ at: "Hashtbl", text: "mutable hash table" }] },
            { code: `let counts = Hashtbl.create 8

let () =
  List.iter
    (fun w ->
      let n = Option.value (Hashtbl.find_opt counts w) ~default:0 in
      Hashtbl.replace counts w (n + 1))
    [ "a"; "b"; "a" ]`, notes: [{ at: "replace", text: "overwrites an existing key" }] },
            { code: `let t = Hashtbl.create 4
let () = Hashtbl.replace t 1 "x"
let size = Hashtbl.length t`, notes: [] }
          ]
        },
        {
          id: "custom-functors", n: 3, title: "custom functors", level: 3,
          gloss: "Defines your own functor that builds a module from another module.",
          examples: [
            { code: `module type ORDERED = sig
  type t
  val compare : t -> t -> int
end
module MaxOf (O : ORDERED) = struct
  let max a b = if O.compare a b >= 0 then a else b
end

module IntMax = MaxOf (Int)
let biggest = IntMax.max 3 9`, notes: [{ at: "MaxOf (O : ORDERED)", text: "a module built from a module" }] },
            { code: `module Pair (A : sig type t end) (B : sig type t end) = struct
  type t = A.t * B.t
end

module IntString = Pair (Int) (String)`, notes: [] },
            { code: `module Logged (M : sig val name : string end) = struct
  let log msg = print_endline (M.name ^ ": " ^ msg)
end

module App = Logged (struct let name = "app" end)
let () = App.log "started"`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "exceptions",
      n: 12,
      title: "exceptions",
      concepts: [
        {
          id: "raising-handling", n: 1, title: "raising and handling", level: 1,
          gloss: "Raises errors with raise and handles them with try and with.",
          examples: [
            { code: `let result =
  try failwith "boom" with Failure msg -> msg`, notes: [{ at: "try", text: "starts a guarded expression" }, { at: "Failure", text: "the exception for failwith" }] },
            { code: `let safe_div a b = try Some (a / b) with Division_by_zero -> None`, notes: [] },
            { code: `let value = try int_of_string "x" with Failure _ -> 0`, notes: [] }
          ]
        },
        {
          id: "custom-exceptions", n: 2, title: "custom exceptions", level: 2,
          gloss: "Declares your own exception type and carries data with it.",
          examples: [
            { code: `exception Not_found_key of string

let find key = raise (Not_found_key key)`, notes: [{ at: "exception", text: "declares an exception" }] },
            { code: `exception Invalid of int

let handle () = try raise (Invalid 7) with Invalid code -> code`, notes: [] },
            { code: `exception Empty

let head = function [] -> raise Empty | x :: _ -> x`, notes: [] }
          ]
        },
        {
          id: "cleanup-assert", n: 3, title: "cleanup and assert", level: 2,
          gloss: "Runs cleanup code with Fun.protect and checks conditions with assert.",
          examples: [
            { code: `let value =
  Fun.protect
    ~finally:(fun () -> print_endline "cleanup")
    (fun () -> 42)`, notes: [{ at: "~finally", text: "always runs" }] },
            { code: `let () = assert (1 + 1 = 2)`, notes: [{ at: "assert", text: "raises when false" }] },
            { code: `let checked n =
  assert (n >= 0);
  n * 2`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "loops-sequences",
      n: 13,
      title: "loops and sequences",
      concepts: [
        {
          id: "for-while", n: 1, title: "for and while loops", level: 1,
          gloss: "Repeats imperative code with for and while.",
          examples: [
            { code: `let () =
  for i = 1 to 3 do
    print_int i
  done`, notes: [{ at: "for i = 1 to 3", text: "counts up" }] },
            { code: `let () =
  for i = 3 downto 1 do
    print_int i
  done`, notes: [] },
            { code: `let n = ref 0

let () =
  while !n < 3 do
    incr n
  done`, notes: [{ at: "while", text: "repeats while true" }] }
          ]
        },
        {
          id: "sequences", n: 2, title: "sequences", level: 2,
          gloss: "Describes lazy collections with Seq that compute items on demand.",
          examples: [
            { code: `let naturals = Seq.ints 1
let first_five = naturals |> Seq.take 5 |> List.of_seq`, notes: [{ at: "Seq", text: "lazy, computed when read" }] },
            { code: `let squares = Seq.map (fun x -> x * x) (List.to_seq [ 1; 2; 3 ])
let total = Seq.fold_left ( + ) 0 squares`, notes: [] },
            { code: `let evens =
  Seq.ints 0 |> Seq.filter (fun n -> n mod 2 = 0) |> Seq.take 3`, notes: [] }
          ]
        },
        {
          id: "in-out", n: 3, title: "input and output", level: 2,
          gloss: "Prints values and reads text with the standard library.",
          examples: [
            { code: `let () = print_endline "Hello"
let () = Printf.printf "%d items\\n" 3`, notes: [{ at: "Printf.printf", text: "formatted output" }] },
            { code: `let () = print_string "no newline"
let () = print_newline ()`, notes: [] },
            { code: `let () = prerr_endline "to stderr"`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "effects-domains",
      n: 14,
      title: "effects and domains",
      concepts: [
        {
          id: "effect-handlers", n: 1, title: "effect handlers", level: 3,
          gloss: "Pauses a computation with perform and resumes it from a handler.",
          examples: [
            { code: `open Effect.Deep
type _ Effect.t += Ask : int Effect.t

let answer =
  try_with (fun () -> Effect.perform Ask + 1) ()
    { effc = (fun (type a) (e : a Effect.t) ->
        match e with
        | Ask -> Some (fun (k : (a, _) continuation) -> continue k 41)
        | _ -> None) }`, notes: [{ at: "Effect.perform Ask", text: "pauses and asks the handler" }, { at: "continue k 41", text: "resumes the computation" }] },
            { code: `open Effect.Deep
type _ Effect.t += Log : string -> unit Effect.t

let () =
  try_with (fun () -> Effect.perform (Log "hi")) ()
    { effc = (fun (type a) (e : a Effect.t) ->
        match e with
        | Log m -> Some (fun (k : (a, _) continuation) ->
            print_endline m; continue k ())
        | _ -> None) }`, notes: [{ at: "Log : string", text: "an effect that carries a value" }] },
            { code: `open Effect.Deep
type _ Effect.t += Next : int Effect.t

let total =
  try_with (fun () -> Effect.perform Next + Effect.perform Next) ()
    { effc = (fun (type a) (e : a Effect.t) ->
        match e with
        | Next -> Some (fun (k : (a, _) continuation) -> continue k 20)
        | _ -> None) }`, notes: [] }
          ]
        },
        {
          id: "domains", n: 2, title: "domains", level: 2,
          gloss: "Runs work in parallel on another core with Domain.",
          examples: [
            { code: `let d = Domain.spawn (fun () -> 21 * 2)
let result = Domain.join d`, notes: [{ at: "Domain.spawn", text: "starts a parallel domain" }, { at: "Domain.join", text: "waits for its result" }] },
            { code: `let results =
  List.map (fun n -> Domain.spawn (fun () -> n * n)) [ 1; 2; 3 ]
  |> List.map Domain.join`, notes: [] },
            { code: `let cores = Domain.recommended_domain_count ()`, notes: [] }
          ]
        },
        {
          id: "atomics-mutex", n: 3, title: "atomics and mutexes", level: 2,
          gloss: "Shares state between domains safely with Atomic and Mutex.",
          examples: [
            { code: `let counter = Atomic.make 0
let () = Atomic.incr counter
let value = Atomic.get counter`, notes: [{ at: "Atomic", text: "safe across domains" }] },
            { code: `let m = Mutex.create ()
let shared = ref 0

let () =
  Mutex.lock m;
  incr shared;
  Mutex.unlock m`, notes: [{ at: "Mutex", text: "one domain at a time" }] },
            { code: `let m = Mutex.create ()
let total = Mutex.protect m (fun () -> 1 + 1)`, notes: [{ at: "Mutex.protect", text: "locks and always unlocks" }] }
          ]
        }
      ]
    }
  ]
};
