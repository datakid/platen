export default {
  id: "csharp",
  name: "C#",
  short: "CS",
  pigment: "csharp",
  family: null,
  version: "12",
  lexer: "csharp",
  indent: 4,
  topics: [
    {
      id: "top-level-namespaces",
      n: 1,
      title: "top-level statements & namespaces",
      concepts: [
        {
          id: "top-level-statements", n: 1, title: "top-level statements", level: 1,
          gloss: "Starts a program without a Main method or a surrounding class.",
          examples: [
            { code: `Console.WriteLine("Hello, world");`, notes: [{ at: "Console.WriteLine", text: "no Main method needed" }] },
            { code: `var name = args.Length > 0 ? args[0] : "world";
Console.WriteLine($"Hello, {name}");`, notes: [{ at: "args", text: "available without declaring it" }] },
            { code: `Console.Write("name: ");
var input = Console.ReadLine();
Console.WriteLine(input);`, notes: [{ at: "ReadLine", text: "returns null at end of input" }] }
          ]
        },
        {
          id: "using-directives", n: 2, title: "using directives", level: 1,
          gloss: "Imports namespaces so types can be used by their short names.",
          examples: [
            { code: `using System.Text;

var sb = new StringBuilder();`, notes: [{ at: "using", text: "must come before the statements" }] },
            { code: `using System.Collections.Generic;
using System.Linq;

var evens = new List<int> { 1, 2, 3, 4 }.Where(n => n % 2 == 0);`, notes: [] },
            { code: `using System.Diagnostics;

var sw = Stopwatch.StartNew();`, notes: [{ at: "Stopwatch", text: "short name thanks to the using" }] }
          ]
        },
        {
          id: "using-alias", n: 3, title: "using aliases", level: 2,
          gloss: "Gives a long type or namespace a short name with using.",
          examples: [
            { code: `using Json = System.Text.Json.JsonSerializer;

var text = Json.Serialize(new { Id = 1 });`, notes: [{ at: "Json =", text: "an alias for a long name" }] },
            { code: `using Cache = System.Collections.Generic.Dictionary<string, int>;

var cache = new Cache();`, notes: [{ at: "Cache", text: "aliases can name constructed types" }] },
            { code: `using static System.Math;

var r = Sqrt(16) + Abs(-2);`, notes: [{ at: "using static", text: "call members without the type name" }] }
          ]
        },
        {
          id: "namespaces", n: 4, title: "namespaces", level: 1,
          gloss: "Organizes types under a file-scoped namespace.",
          examples: [
            { code: `namespace Shop.Models;

public class Product
{
    public string Name { get; set; } = "";
}`, notes: [{ at: "namespace Shop.Models;", text: "applies to the whole file" }] },
            { code: `namespace Shop.Services;

public interface IPriceService
{
    decimal Price(int id);
}`, notes: [] },
            { code: `namespace Shop.Utils;

public static class Money
{
    public static string Format(decimal d) =>
        d.ToString("F2");
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "var-types",
      n: 2,
      title: "var & types",
      concepts: [
        {
          id: "var-inference", n: 1, title: "var", level: 1,
          gloss: "Lets the compiler infer a local variable's type.",
          examples: [
            { code: `var count = 10;
var name = "ada";
var price = 9.99m;`, notes: [{ at: "9.99m", text: "the m suffix makes a decimal" }] },
            { code: `var items = new List<string>();
var map = new Dictionary<string, int>();`, notes: [{ at: "var", text: "the type is still fixed at compile time" }] },
            { code: `var now = DateTime.Now;
var year = now.Year;`, notes: [] }
          ]
        },
        {
          id: "builtin-types", n: 2, title: "built-in types", level: 1,
          gloss: "Picks a built-in type for numbers, text and flags.",
          examples: [
            { code: `int age = 36;
long big = 3_000_000_000L;
double ratio = 0.5;
float f = 1.5f;`, notes: [{ at: "3_000_000_000L", text: "underscores group digits" }] },
            { code: `bool ready = true;
char letter = 'a';
byte small = 255;`, notes: [{ at: "'a'", text: "char takes single quotes" }] },
            { code: `decimal total = 19.99m;
string label = "total";`, notes: [{ at: "decimal", text: "exact base-10 arithmetic for money" }] }
          ]
        },
        {
          id: "conversions", n: 3, title: "conversions", level: 2,
          gloss: "Converts between types with casts, Parse and TryParse.",
          examples: [
            { code: `double d = 3.7;
int n = (int)d;
long wide = n;`, notes: [{ at: "(int)d", text: "an explicit cast truncates" }] },
            { code: `int.TryParse("42", out var n);
Console.WriteLine(n);`, notes: [{ at: "TryParse", text: "returns false instead of throwing" }] },
            { code: `var n = int.Parse("42");
var text = n.ToString();
var d = Convert.ToDouble("2.5");`, notes: [] }
          ]
        },
        {
          id: "const-readonly", n: 4, title: "const and readonly", level: 2,
          gloss: "Fixes values with const and readonly.",
          examples: [
            { code: `const int MaxUsers = 100;
Console.WriteLine(MaxUsers);`, notes: [{ at: "const", text: "a compile-time constant" }] },
            { code: `class Config
{
    public const string Version = "1.0";
    public readonly int Retries;
    public Config(int retries) => Retries = retries;
}`, notes: [{ at: "readonly", text: "assigned only in the constructor" }] },
            { code: `const double Pi = 3.14159;
var area = Pi * 2 * 2;`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "strings-interpolation",
      n: 3,
      title: "strings & interpolation",
      concepts: [
        {
          id: "interpolation", n: 1, title: "interpolation", level: 1,
          gloss: "Embeds expressions in a string with a dollar sign and braces.",
          examples: [
            { code: `var name = "ada";
var age = 36;
var line = $"{name} is {age}";`, notes: [{ at: "{name}", text: "any expression fits here" }] },
            { code: `var price = 4.5m;
var text = $"total: {price:C}";`, notes: [{ at: ":C", text: "a format specifier" }] },
            { code: `var x = 7;
var msg = $"{x} squared is {x * x}";`, notes: [] }
          ]
        },
        {
          id: "string-methods", n: 2, title: "string methods", level: 1,
          gloss: "Transforms and searches text with string methods.",
          examples: [
            { code: `var s = "  Hello  ";
var t = s.Trim().ToUpper();`, notes: [{ at: "Trim()", text: "returns a new string" }] },
            { code: `var csv = "a,b,c";
var parts = csv.Split(',');
var joined = string.Join("-", parts);`, notes: [] },
            { code: `var text = "hello world";
var has = text.Contains("world");
var idx = text.IndexOf('o');`, notes: [] }
          ]
        },
        {
          id: "verbatim-raw", n: 3, title: "verbatim and raw strings", level: 2,
          gloss: "Writes paths and multi-line text without escape clutter.",
          examples: [
            { code: `var path = @"C:\\Users\\ada\\notes.txt";`, notes: [{ at: "@", text: "backslashes are literal" }] },
            { code: `var json = """
    {"name": "ada"}
    """;`, notes: [{ at: "\"\"\"", text: "a raw string needs no escaping" }] },
            { code: `var query = @"SELECT Id, Name
FROM Users";`, notes: [{ at: "@", text: "may span several lines" }] }
          ]
        },
        {
          id: "stringbuilder", n: 4, title: "StringBuilder", level: 2,
          gloss: "Builds large strings efficiently with StringBuilder.",
          examples: [
            { code: `var sb = new StringBuilder();
sb.Append("a");
sb.Append(1);
var s = sb.ToString();`, notes: [{ at: "ToString()", text: "produces the final string" }] },
            { code: `var sb = new StringBuilder();
for (var i = 0; i < 3; i++)
{
    sb.AppendLine($"line {i}");
}`, notes: [] },
            { code: `var sb = new StringBuilder("hello");
sb.Insert(0, ">> ");
sb.Replace("l", "L");`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "arrays-lists",
      n: 4,
      title: "arrays & List<T>",
      concepts: [
        {
          id: "arrays", n: 1, title: "arrays", level: 1,
          gloss: "Stores a fixed-size sequence of values of one type.",
          examples: [
            { code: `int[] nums = { 1, 2, 3 };
var first = nums[0];`, notes: [{ at: "nums[0]", text: "indexes start at 0" }] },
            { code: `var grid = new int[3, 3];
grid[1, 1] = 5;`, notes: [{ at: "[3, 3]", text: "a rectangular 2-D array" }] },
            { code: `var names = new string[2];
names[0] = "ada";`, notes: [{ at: "new string[2]", text: "elements start as null" }] }
          ]
        },
        {
          id: "list-basics", n: 2, title: "List<T>", level: 1,
          gloss: "Grows and shrinks a list with List<T>.",
          examples: [
            { code: `var names = new List<string> { "ada", "grace" };
names.Add("linus");`, notes: [{ at: "{ \"ada\", \"grace\" }", text: "a collection initializer" }] },
            { code: `var nums = new List<int>();
nums.AddRange(new[] { 3, 1, 2 });
nums.Sort();`, notes: [] },
            { code: `var items = new List<string> { "a", "b", "c" };
items.Remove("b");
items.RemoveAt(0);`, notes: [{ at: "RemoveAt", text: "removes by index" }] }
          ]
        },
        {
          id: "collection-expressions", n: 3, title: "collection expressions", level: 3,
          gloss: "Creates collections with a bracket expression.",
          examples: [
            { code: `int[] nums = [1, 2, 3];`, notes: [{ at: "[1, 2, 3]", text: "a collection expression, new in C# 12" }] },
            { code: `List<string> names = ["ada", "grace"];`, notes: [{ at: "List<string>", text: "the target type decides" }] },
            { code: `int[] a = [1, 2];
int[] b = [..a, 3, 4];`, notes: [{ at: "..", text: "spreads another collection in" }] }
          ]
        },
        {
          id: "ranges-indexes", n: 4, title: "ranges and indexes", level: 2,
          gloss: "Reads parts of an array or string with ranges and indexes.",
          examples: [
            { code: `var nums = new[] { 1, 2, 3, 4, 5 };
var last = nums[^1];`, notes: [{ at: "^1", text: "counts from the end" }] },
            { code: `var nums = new[] { 1, 2, 3, 4, 5 };
var mid = nums[1..4];`, notes: [{ at: "1..4", text: "start included, end excluded" }] },
            { code: `var text = "hello world";
var word = text[6..];`, notes: [] }
          ]
        },
        {
          id: "list-search", n: 5, title: "searching a list", level: 2,
          gloss: "Finds items in a List with Find, Exists and IndexOf.",
          examples: [
            { code: `var nums = new List<int> { 4, 8, 15 };
var big = nums.Find(n => n > 5);`, notes: [{ at: "Find", text: "returns default when nothing matches" }] },
            { code: `var names = new List<string> { "ada", "grace" };
var has = names.Exists(n => n.StartsWith("g"));`, notes: [] },
            { code: `var nums = new List<int> { 4, 8, 15 };
var idx = nums.IndexOf(8);
var all = nums.TrueForAll(n => n > 0);`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "dictionary",
      n: 5,
      title: "Dictionary",
      concepts: [
        {
          id: "dictionary-basics", n: 1, title: "dictionary basics", level: 1,
          gloss: "Maps unique keys to values with Dictionary.",
          examples: [
            { code: `var ages = new Dictionary<string, int>
{
    ["ada"] = 36,
    ["grace"] = 85,
};`, notes: [{ at: "[\"ada\"] = 36", text: "an index initializer" }] },
            { code: `var ages = new Dictionary<string, int>();
ages["ada"] = 36;
ages.Add("grace", 85);`, notes: [{ at: "Add", text: "throws if the key exists" }] },
            { code: `var ages = new Dictionary<string, int> { { "ada", 36 } };
var age = ages["ada"];`, notes: [{ at: "ages[\"ada\"]", text: "throws if the key is missing" }] }
          ]
        },
        {
          id: "dictionary-lookup", n: 2, title: "safe lookup", level: 1,
          gloss: "Reads values safely with TryGetValue and ContainsKey.",
          examples: [
            { code: `var ages = new Dictionary<string, int> { ["ada"] = 36 };
if (ages.TryGetValue("ada", out var age))
{
    Console.WriteLine(age);
}`, notes: [{ at: "out var age", text: "filled only when found" }] },
            { code: `var ages = new Dictionary<string, int> { ["ada"] = 36 };
var has = ages.ContainsKey("grace");`, notes: [] },
            { code: `var ages = new Dictionary<string, int> { ["ada"] = 36 };
var age = ages.GetValueOrDefault("grace", -1);`, notes: [{ at: "-1", text: "the fallback for a missing key" }] }
          ]
        },
        {
          id: "dictionary-iteration", n: 3, title: "iterating", level: 1,
          gloss: "Loops over the pairs, keys or values of a Dictionary.",
          examples: [
            { code: `var ages = new Dictionary<string, int> { ["ada"] = 36 };
foreach (var (name, age) in ages)
{
    Console.WriteLine($"{name} {age}");
}`, notes: [{ at: "(name, age)", text: "deconstructs each pair" }] },
            { code: `var ages = new Dictionary<string, int> { ["ada"] = 36 };
foreach (var key in ages.Keys)
{
    Console.WriteLine(key);
}`, notes: [] },
            { code: `var ages = new Dictionary<string, int> { ["ada"] = 36 };
var total = ages.Values.Sum();`, notes: [] }
          ]
        },
        {
          id: "dictionary-update", n: 4, title: "updating entries", level: 2,
          gloss: "Updates a Dictionary with TryAdd, indexers and Remove.",
          examples: [
            { code: `var ages = new Dictionary<string, int>();
ages.TryAdd("ada", 36);
ages.TryAdd("ada", 99);`, notes: [{ at: "TryAdd", text: "keeps the first value" }] },
            { code: `var counts = new Dictionary<string, int>();
foreach (var w in new[] { "a", "b", "a" })
{
    counts[w] = counts.GetValueOrDefault(w) + 1;
}`, notes: [{ at: "GetValueOrDefault", text: "0 for a new key" }] },
            { code: `var ages = new Dictionary<string, int> { ["ada"] = 36 };
ages.Remove("ada");
ages.Clear();`, notes: [] }
          ]
        },
        {
          id: "hashset", n: 5, title: "HashSet<T>", level: 2,
          gloss: "Stores unique items and tests membership quickly.",
          examples: [
            { code: `var seen = new HashSet<int> { 1, 2 };
var added = seen.Add(2);`, notes: [{ at: "Add", text: "returns false for a duplicate" }] },
            { code: `var a = new HashSet<int> { 1, 2, 3 };
var b = new HashSet<int> { 2, 3, 4 };
a.IntersectWith(b);`, notes: [{ at: "IntersectWith", text: "keeps only shared items" }] },
            { code: `var unique = new HashSet<string>(new[] { "a", "b", "a" });
var n = unique.Count;`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "control-flow-switch",
      n: 6,
      title: "control flow & switch expressions",
      concepts: [
        {
          id: "if-else", n: 1, title: "if and else", level: 1,
          gloss: "Chooses between branches with if, else if and else.",
          examples: [
            { code: `var n = 7;
if (n % 2 == 0)
{
    Console.WriteLine("even");
}
else
{
    Console.WriteLine("odd");
}`, notes: [] },
            { code: `var score = 82;
if (score >= 90) Console.WriteLine("A");
else if (score >= 80) Console.WriteLine("B");
else Console.WriteLine("C");`, notes: [{ at: "else if", text: "tested only if the first fails" }] },
            { code: `var age = 20;
var label = age >= 18 ? "adult" : "minor";`, notes: [{ at: "? \"adult\" :", text: "the conditional operator" }] }
          ]
        },
        {
          id: "loops", n: 2, title: "loops", level: 1,
          gloss: "Repeats work with for, while and foreach.",
          examples: [
            { code: `for (var i = 0; i < 3; i++)
{
    Console.WriteLine(i);
}`, notes: [] },
            { code: `var names = new[] { "ada", "grace" };
foreach (var name in names)
{
    Console.WriteLine(name);
}`, notes: [{ at: "foreach", text: "no index needed" }] },
            { code: `var n = 3;
while (n > 0)
{
    n--;
}`, notes: [] }
          ]
        },
        {
          id: "switch-statement", n: 3, title: "switch statement", level: 1,
          gloss: "Branches on one value with switch and case labels.",
          examples: [
            { code: `var day = 3;
switch (day)
{
    case 1:
        Console.WriteLine("mon");
        break;
    default:
        Console.WriteLine("other");
        break;
}`, notes: [{ at: "break", text: "required at the end of each case" }] },
            { code: `var cmd = "stop";
switch (cmd)
{
    case "go":
    case "start":
        Console.WriteLine("running");
        break;
    default:
        break;
}`, notes: [{ at: "case \"go\":", text: "stacked labels share a body" }] },
            { code: `var n = 5;
switch (n)
{
    case < 0:
        Console.WriteLine("negative");
        break;
    case > 0:
        Console.WriteLine("positive");
        break;
}`, notes: [{ at: "case < 0", text: "a relational pattern" }] }
          ]
        },
        {
          id: "switch-expression", n: 4, title: "switch expression", level: 2,
          gloss: "Returns a value from a compact switch expression.",
          examples: [
            { code: `var day = 3;
var name = day switch
{
    1 => "mon",
    2 => "tue",
    _ => "other",
};`, notes: [{ at: "_", text: "the discard matches anything else" }] },
            { code: `var n = 42;
var size = n switch
{
    < 10 => "small",
    < 100 => "medium",
    _ => "large",
};`, notes: [] },
            { code: `var (x, y) = (0, 5);
var place = (x, y) switch
{
    (0, 0) => "origin",
    (0, _) => "on y",
    _ => "elsewhere",
};`, notes: [{ at: "(x, y) switch", text: "match two values together" }] }
          ]
        }
      ]
    },
    {
      id: "methods-params",
      n: 7,
      title: "methods, params, out",
      concepts: [
        {
          id: "method-basics", n: 1, title: "methods", level: 1,
          gloss: "Declares a method with a return type and parameters.",
          examples: [
            { code: `static int Add(int a, int b)
{
    return a + b;
}`, notes: [] },
            { code: `static void Greet(string name) => Console.WriteLine($"hi {name}");`, notes: [{ at: "=>", text: "an expression-bodied method" }] },
            { code: `static double Area(double r) => Math.PI * r * r;`, notes: [] }
          ]
        },
        {
          id: "optional-named", n: 2, title: "optional and named arguments", level: 2,
          gloss: "Gives parameters defaults and passes arguments by name.",
          examples: [
            { code: `static string Greet(string name, string greeting = "hello") =>
    $"{greeting} {name}";

var a = Greet("ada");
var b = Greet("ada", greeting: "hey");`, notes: [{ at: "greeting:", text: "a named argument" }] },
            { code: `static void Connect(string host, int port = 80, bool tls = false) { }

Connect("example.com", tls: true);`, notes: [{ at: "tls: true", text: "skips port, which keeps 80" }] },
            { code: `static int Volume(int w, int h, int d = 1) => w * h * d;
var v = Volume(h: 2, w: 3);`, notes: [{ at: "h: 2, w: 3", text: "named arguments can reorder" }] }
          ]
        },
        {
          id: "params-array", n: 3, title: "params", level: 2,
          gloss: "Accepts a variable number of arguments with params.",
          examples: [
            { code: `static int Sum(params int[] nums) => nums.Sum();
var total = Sum(1, 2, 3);`, notes: [{ at: "params", text: "callers pass loose values" }] },
            { code: `static void Log(string level, params string[] parts)
{
    Console.WriteLine(level + ": " + string.Join(" ", parts));
}
Log("info", "ready", "now");`, notes: [{ at: "params", text: "must be the last parameter" }] },
            { code: `static double Max(params double[] xs) => xs.Max();
var m = Max(1.5, 2.5);`, notes: [] }
          ]
        },
        {
          id: "out-ref", n: 4, title: "out and ref", level: 2,
          gloss: "Returns extra values through out and ref parameters.",
          examples: [
            { code: `static void Split(string s, out string head, out string tail)
{
    head = s[..1];
    tail = s[1..];
}
Split("hello", out var h, out var t);`, notes: [{ at: "out var h", text: "declares the variable inline" }] },
            { code: `static void Swap(ref int a, ref int b)
{
    (a, b) = (b, a);
}
int x = 1, y = 2;
Swap(ref x, ref y);`, notes: [{ at: "ref", text: "passes the variable itself" }] },
            { code: `static bool TryFind(int[] xs, int target, out int index)
{
    index = Array.IndexOf(xs, target);
    return index >= 0;
}`, notes: [{ at: "index", text: "must be assigned before returning" }] }
          ]
        },
        {
          id: "local-functions", n: 5, title: "local functions", level: 3,
          gloss: "Declares a helper function inside another method.",
          examples: [
            { code: `int Total(int[] xs)
{
    int Square(int n) => n * n;
    return xs.Sum(Square);
}`, notes: [{ at: "Square", text: "visible only inside Total" }] },
            { code: `IEnumerable<int> Evens(int max)
{
    bool IsEven(int n) => n % 2 == 0;
    return Enumerable.Range(0, max).Where(IsEven);
}`, notes: [] },
            { code: `static int Factorial(int n)
{
    int Go(int k, int acc) => k <= 1 ? acc : Go(k - 1, acc * k);
    return Go(n, 1);
}`, notes: [{ at: "Go", text: "a local function can recurse" }] }
          ]
        }
      ]
    },
    {
      id: "classes-properties",
      n: 8,
      title: "classes & properties",
      concepts: [
        {
          id: "class-basics", n: 1, title: "classes", level: 1,
          gloss: "Defines a class with fields, a constructor and methods.",
          examples: [
            { code: `class Counter
{
    private int _count;

    public void Increment() => _count++;
    public int Value => _count;
}`, notes: [{ at: "_count", text: "a private field" }] },
            { code: `class Dog
{
    public string Name;
    public Dog(string name)
    {
        Name = name;
    }
    public string Speak() => $"{Name} says woof";
}`, notes: [{ at: "Dog(string name)", text: "the constructor" }] },
            { code: `class Greeter
{
    public static string Hello(string name) => $"hello {name}";
}`, notes: [{ at: "static", text: "called on the class, no instance" }] }
          ]
        },
        {
          id: "properties", n: 2, title: "properties", level: 1,
          gloss: "Exposes data through auto-properties with get and set.",
          examples: [
            { code: `class User
{
    public string Name { get; set; } = "";
    public int Age { get; set; }
}`, notes: [{ at: "{ get; set; }", text: "the compiler adds the field" }] },
            { code: `class Account
{
    public decimal Balance { get; private set; }
    public void Deposit(decimal amount) => Balance += amount;
}`, notes: [{ at: "private set", text: "only the class can assign it" }] },
            { code: `class Product
{
    public required string Sku { get; init; }
    public decimal Price { get; init; }
}`, notes: [{ at: "required", text: "callers must set it" }, { at: "init", text: "settable only while creating" }] }
          ]
        },
        {
          id: "computed-properties", n: 3, title: "computed properties", level: 2,
          gloss: "Computes a property's value each time it is read.",
          examples: [
            { code: `class Rect
{
    public double W { get; set; }
    public double H { get; set; }
    public double Area => W * H;
}`, notes: [{ at: "=> W * H", text: "no stored value" }] },
            { code: `class Person
{
    public string First { get; set; } = "";
    public string Last { get; set; } = "";
    public string Full => $"{First} {Last}";
}`, notes: [] },
            { code: `class Temp
{
    private double _c;
    public double F
    {
        get => _c * 9 / 5 + 32;
        set => _c = (value - 32) * 5 / 9;
    }
}`, notes: [{ at: "value", text: "the assigned value inside set" }] }
          ]
        },
        {
          id: "object-initializers", n: 4, title: "object initializers", level: 1,
          gloss: "Creates an object and sets properties in one expression.",
          examples: [
            { code: `var user = new User { Name = "ada", Age = 36 };

class User
{
    public string Name { get; set; } = "";
    public int Age { get; set; }
}`, notes: [{ at: "{ Name = \"ada\"", text: "sets properties after construction" }] },
            { code: `var list = new List<User>
{
    new() { Name = "ada" },
    new() { Name = "grace" },
};

class User
{
    public string Name { get; set; } = "";
}`, notes: [{ at: "new()", text: "the type is inferred" }] },
            { code: `var p = new Point { X = 1, Y = 2 };

class Point
{
    public int X { get; set; }
    public int Y { get; set; }
}`, notes: [] }
          ]
        },
        {
          id: "static-members", n: 5, title: "static members", level: 2,
          gloss: "Shares data and helpers across all instances with static.",
          examples: [
            { code: `class Id
{
    private static int _next = 1;
    public static int Next() => _next++;
}`, notes: [{ at: "_next", text: "one copy for every instance" }] },
            { code: `static class MathUtil
{
    public static int Square(int n) => n * n;
}`, notes: [{ at: "static class", text: "cannot be instantiated" }] },
            { code: `class Config
{
    public static readonly string Name = "app";
    public static int Count { get; set; }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "primary-constructors",
      n: 9,
      title: "primary constructors",
      concepts: [
        {
          id: "class-primary", n: 1, title: "class primary constructors", level: 2,
          gloss: "Declares constructor parameters right on the class.",
          examples: [
            { code: `class Greeter(string name)
{
    public string Hello() => $"hello {name}";
}`, notes: [{ at: "(string name)", text: "usable in every member" }] },
            { code: `class Counter(int start)
{
    private int _n = start;
    public int Next() => _n++;
}`, notes: [{ at: "= start", text: "initializes a field from the parameter" }] },
            { code: `class Repo(string path, int retries = 3)
{
    public string Describe() => $"{path} x{retries}";
}`, notes: [{ at: "retries = 3", text: "parameters can have defaults" }] }
          ]
        },
        {
          id: "properties-from-params", n: 2, title: "properties from parameters", level: 2,
          gloss: "Turns primary constructor parameters into properties.",
          examples: [
            { code: `class User(string name, int age)
{
    public string Name { get; } = name;
    public int Age { get; } = age;
}`, notes: [{ at: "= name", text: "copies the parameter into a property" }] },
            { code: `class Point(double x, double y)
{
    public double X { get; set; } = x;
    public double Y { get; set; } = y;
    public double Length => Math.Sqrt(x * x + y * y);
}`, notes: [] },
            { code: `class Box(int w, int h)
{
    public int Area { get; } = w * h;
}`, notes: [] }
          ]
        },
        {
          id: "primary-inheritance", n: 3, title: "primary constructors and inheritance", level: 3,
          gloss: "Passes primary constructor arguments to a base class.",
          examples: [
            { code: `class Animal(string name)
{
    public string Name { get; } = name;
}
class Dog(string name) : Animal(name)
{
    public string Speak() => $"{Name} barks";
}`, notes: [{ at: ": Animal(name)", text: "forwards the argument to the base" }] },
            { code: `struct Vec(int x, int y)
{
    public int Sum => x + y;
}`, notes: [{ at: "struct Vec", text: "structs support them too" }] },
            { code: `class Shape(string label)
{
    public virtual string Describe() => label;
}
class Circle(double r) : Shape("circle")
{
    public double R => r;
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "records",
      n: 10,
      title: "records",
      concepts: [
        {
          id: "record-basics", n: 1, title: "records", level: 2,
          gloss: "Declares an immutable data type in one line.",
          examples: [
            { code: `var p = new Point(1, 2);

record Point(int X, int Y);`, notes: [{ at: "record Point(int X, int Y)", text: "adds properties, equality and ToString" }] },
            { code: `var person = new Person("ada", 36);
Console.WriteLine(person);

record Person(string Name, int Age);`, notes: [] },
            { code: `var a = new Point(1, 2);
var b = new Point(1, 2);
var same = a == b;

record Point(int X, int Y);`, notes: [{ at: "a == b", text: "compares values, not references" }] }
          ]
        },
        {
          id: "with-expressions", n: 2, title: "with expressions", level: 2,
          gloss: "Copies a record with some properties changed.",
          examples: [
            { code: `var p = new Point(1, 2);
var q = p with { X = 5 };

record Point(int X, int Y);`, notes: [{ at: "with", text: "a copy, the original stays" }] },
            { code: `var user = new User("ada", "a@x.io");
var moved = user with { Email = "b@x.io" };

record User(string Name, string Email);`, notes: [] },
            { code: `var cfg = new Config(80, false);
var secure = cfg with { Tls = true };

record Config(int Port, bool Tls);`, notes: [] }
          ]
        },
        {
          id: "record-members", n: 3, title: "record members", level: 2,
          gloss: "Adds methods and computed properties to a record.",
          examples: [
            { code: `record Rect(double W, double H)
{
    public double Area => W * H;
}`, notes: [] },
            { code: `record Person(string First, string Last)
{
    public string Full => $"{First} {Last}";
}`, notes: [] },
            { code: `record Temp(double Celsius)
{
    public double Fahrenheit => Celsius * 9 / 5 + 32;
    public static Temp Freezing => new(0);
}`, notes: [{ at: "new(0)", text: "the target type is Temp" }] }
          ]
        },
        {
          id: "record-structs", n: 4, title: "record structs", level: 3,
          gloss: "Declares a value-type record with record struct.",
          examples: [
            { code: `var p = new Point(1, 2);

record struct Point(int X, int Y);`, notes: [{ at: "record struct", text: "a value type with value equality" }] },
            { code: `var p = new Point(1, 2);
p.X = 5;

record struct Point(int X, int Y);`, notes: [{ at: "p.X = 5", text: "mutable unless readonly" }] },
            { code: `var p = new Pixel(1, 2);

readonly record struct Pixel(int X, int Y);`, notes: [{ at: "readonly", text: "makes every property init-only" }] }
          ]
        }
      ]
    },
    {
      id: "structs",
      n: 11,
      title: "structs & enums",
      concepts: [
        {
          id: "struct-basics", n: 1, title: "structs", level: 2,
          gloss: "Defines a value type that is copied on assignment.",
          examples: [
            { code: `var a = new Point { X = 1, Y = 2 };
var b = a;
b.X = 9;

struct Point
{
    public int X;
    public int Y;
}`, notes: [{ at: "var b = a", text: "copies the whole value" }] },
            { code: `struct Money
{
    public decimal Amount;
    public string Currency;

    public override string ToString() => $"{Amount} {Currency}";
}`, notes: [{ at: "override", text: "replaces the inherited ToString" }] },
            { code: `struct Temperature
{
    public double Degrees { get; set; }
    public Temperature(double d) => Degrees = d;
}`, notes: [{ at: "Temperature(double d)", text: "must assign every field" }] }
          ]
        },
        {
          id: "readonly-struct", n: 2, title: "readonly structs", level: 3,
          gloss: "Marks a struct immutable with readonly.",
          examples: [
            { code: `readonly struct Point
{
    public int X { get; }
    public int Y { get; }
    public Point(int x, int y) => (X, Y) = (x, y);
}`, notes: [{ at: "readonly", text: "every member is read-only" }] },
            { code: `readonly struct Span2(int start, int end)
{
    public int Length => end - start;
}`, notes: [] },
            { code: `readonly struct Angle
{
    public double Degrees { get; init; }
}`, notes: [] }
          ]
        },
        {
          id: "struct-vs-class", n: 3, title: "value vs reference", level: 2,
          gloss: "Shows how value types and reference types differ on copy.",
          examples: [
            { code: `var p1 = new P { X = 1 };
var p2 = p1;
p2.X = 2;
Console.WriteLine(p1.X);

struct P
{
    public int X;
}`, notes: [{ at: "p2 = p1", text: "an independent copy" }] },
            { code: `var c1 = new C { X = 1 };
var c2 = c1;
c2.X = 2;
Console.WriteLine(c1.X);

class C
{
    public int X;
}`, notes: [{ at: "c2 = c1", text: "copies only the reference" }] },
            { code: `void Bump(ref P p) => p.X++;
var p = new P();
Bump(ref p);

struct P
{
    public int X;
}`, notes: [{ at: "ref P", text: "avoids a copy and lets it change" }] }
          ]
        },
        {
          id: "enums", n: 4, title: "enums", level: 1,
          gloss: "Names a set of related integer constants with enum.",
          examples: [
            { code: `var c = Color.Green;

enum Color
{
    Red,
    Green,
    Blue
}`, notes: [{ at: "Color.Green", text: "always qualified by the enum" }] },
            { code: `var p = Perm.Read | Perm.Write;

[Flags]
enum Perm
{
    None = 0,
    Read = 1,
    Write = 2
}`, notes: [{ at: "[Flags]", text: "values combine as bit flags" }] },
            { code: `var n = (int)Level.High;
var l = Enum.Parse<Level>("Low");

enum Level
{
    Low = 1,
    High = 5
}`, notes: [{ at: "Enum.Parse<Level>", text: "text to enum value" }] }
          ]
        }
      ]
    },
    {
      id: "interfaces",
      n: 12,
      title: "interfaces",
      concepts: [
        {
          id: "interface-definition", n: 1, title: "defining interfaces", level: 1,
          gloss: "Declares a contract that classes can implement.",
          examples: [
            { code: `interface IShape
{
    double Area();
}`, notes: [{ at: "IShape", text: "interface names start with I" }] },
            { code: `interface IRepository
{
    string Get(int id);
    void Save(int id, string value);
}`, notes: [] },
            { code: `interface IGreeter
{
    string Name { get; }
    string Greet() => $"hi {Name}";
}`, notes: [{ at: "=> $", text: "a default implementation" }] }
          ]
        },
        {
          id: "implementing", n: 2, title: "implementing interfaces", level: 1,
          gloss: "Implements an interface in a class.",
          examples: [
            { code: `interface IShape
{
    double Area();
}

class Circle(double r) : IShape
{
    public double Area() => Math.PI * r * r;
}`, notes: [{ at: ": IShape", text: "promises to supply Area" }] },
            { code: `class Name : IComparable<Name>
{
    public string Value = "";
    public int CompareTo(Name? other) =>
        string.Compare(Value, other?.Value);
}`, notes: [{ at: "IComparable<Name>", text: "enables sorting" }] },
            { code: `class Resource : IDisposable
{
    public void Dispose() => Console.WriteLine("closed");
}`, notes: [{ at: "IDisposable", text: "works with using" }] }
          ]
        },
        {
          id: "interface-polymorphism", n: 3, title: "polymorphism", level: 2,
          gloss: "Treats different classes through one interface type.",
          examples: [
            { code: `IAnimal[] pets = [new Dog(), new Cat()];
foreach (var p in pets)
{
    Console.WriteLine(p.Speak());
}

interface IAnimal { string Speak(); }
class Dog : IAnimal { public string Speak() => "woof"; }
class Cat : IAnimal { public string Speak() => "meow"; }`, notes: [{ at: "IAnimal[]", text: "one array, two classes" }] },
            { code: `void Print(IEnumerable<int> xs)
{
    foreach (var x in xs) Console.WriteLine(x);
}
Print(new List<int> { 1, 2 });
Print(new[] { 3, 4 });`, notes: [{ at: "IEnumerable<int>", text: "accepts lists and arrays" }] },
            { code: `ILogger log = new ConsoleLogger();
log.Log("started");

interface ILogger { void Log(string m); }
class ConsoleLogger : ILogger
{
    public void Log(string m) => Console.WriteLine(m);
}`, notes: [] }
          ]
        },
        {
          id: "explicit-implementation", n: 4, title: "explicit implementation", level: 3,
          gloss: "Implements a member that is only reachable through the interface.",
          examples: [
            { code: `class Report : IDisposable
{
    void IDisposable.Dispose() { }
}`, notes: [{ at: "IDisposable.Dispose", text: "callable only via the interface" }] },
            { code: `interface IA { string Name(); }
interface IB { string Name(); }
class Both : IA, IB
{
    string IA.Name() => "a";
    string IB.Name() => "b";
}`, notes: [{ at: "IA.Name", text: "separates clashing members" }] },
            { code: `var j = new Job();
((IRunner)j).Run();

interface IRunner { void Run(); }
class Job : IRunner
{
    void IRunner.Run() => Console.WriteLine("run");
}`, notes: [{ at: "(IRunner)j", text: "a cast reaches the hidden member" }] }
          ]
        },
        {
          id: "abstract-classes", n: 5, title: "abstract classes", level: 2,
          gloss: "Shares code while leaving some members for subclasses to fill in.",
          examples: [
            { code: `abstract class Shape
{
    public abstract double Area();
    public string Describe() => $"area {Area():F1}";
}`, notes: [{ at: "abstract", text: "no body, subclasses must override" }] },
            { code: `abstract class Animal
{
    public abstract string Sound();
}
class Dog : Animal
{
    public override string Sound() => "woof";
}`, notes: [{ at: "override", text: "fills in the abstract member" }] },
            { code: `abstract class Handler
{
    public void Run()
    {
        Console.WriteLine("before");
        Execute();
    }
    protected abstract void Execute();
}`, notes: [{ at: "protected abstract", text: "only subclasses use it" }] }
          ]
        }
      ]
    },
    {
      id: "generics",
      n: 13,
      title: "generics",
      concepts: [
        {
          id: "generic-methods", n: 1, title: "generic methods", level: 2,
          gloss: "Writes one method that works for many types.",
          examples: [
            { code: `static T Max<T>(T a, T b) where T : IComparable<T> =>
    a.CompareTo(b) >= 0 ? a : b;`, notes: [{ at: "where T : IComparable<T>", text: "the type must be comparable" }] },
            { code: `static void Swap<T>(ref T a, ref T b) =>
    (a, b) = (b, a);`, notes: [] },
            { code: `static List<T> Repeat<T>(T item, int n) =>
    Enumerable.Repeat(item, n).ToList();`, notes: [{ at: "<T>", text: "the caller picks T" }] }
          ]
        },
        {
          id: "generic-classes", n: 2, title: "generic classes", level: 2,
          gloss: "Declares a class that stores a type chosen by the caller.",
          examples: [
            { code: `class Box<T>(T value)
{
    public T Value { get; } = value;
}`, notes: [{ at: "Box<T>", text: "the caller chooses the type" }] },
            { code: `class Stack2<T>
{
    private readonly List<T> _items = new();
    public void Push(T item) => _items.Add(item);
    public T Pop()
    {
        var last = _items[^1];
        _items.RemoveAt(_items.Count - 1);
        return last;
    }
}`, notes: [] },
            { code: `class Pair<TKey, TValue>(TKey key, TValue value)
{
    public TKey Key { get; } = key;
    public TValue Value { get; } = value;
}`, notes: [{ at: "TKey, TValue", text: "several type parameters" }] }
          ]
        },
        {
          id: "constraints", n: 3, title: "constraints", level: 3,
          gloss: "Limits type arguments with where clauses.",
          examples: [
            { code: `class Repo<T> where T : class, new()
{
    public T Create() => new T();
}`, notes: [{ at: "class, new()", text: "a class with a parameterless constructor" }] },
            { code: `using System.Numerics;

static T Sum<T>(IEnumerable<T> xs) where T : INumber<T> =>
    xs.Aggregate(T.Zero, (a, b) => a + b);`, notes: [{ at: "INumber<T>", text: "generic math over any number type" }] },
            { code: `static void PrintAll<T>(List<T> xs) where T : notnull
{
    foreach (var x in xs) Console.WriteLine(x);
}`, notes: [{ at: "notnull", text: "rejects nullable arguments" }] }
          ]
        },
        {
          id: "generic-interfaces", n: 4, title: "generic interfaces", level: 2,
          gloss: "Uses and defines generic interfaces such as IEnumerable<T>.",
          examples: [
            { code: `IEnumerable<int> nums = new List<int> { 1, 2, 3 };
foreach (var n in nums) Console.WriteLine(n);`, notes: [{ at: "IEnumerable<int>", text: "anything that can be looped" }] },
            { code: `interface IRepository<T>
{
    T? Find(int id);
    void Add(T item);
}`, notes: [{ at: "T?", text: "may be null" }] },
            { code: `var byLength = Comparer<string>.Create((a, b) => a.Length - b.Length);
var names = new List<string> { "ada", "li" };
names.Sort(byLength);`, notes: [{ at: "Comparer<string>.Create", text: "a comparer from a lambda" }] }
          ]
        }
      ]
    },
    {
      id: "linq",
      n: 14,
      title: "LINQ",
      concepts: [
        {
          id: "where-select", n: 1, title: "Where and Select", level: 1,
          gloss: "Filters and projects a sequence with Where and Select.",
          examples: [
            { code: `var nums = new[] { 1, 2, 3, 4 };
var evens = nums.Where(n => n % 2 == 0);`, notes: [{ at: "Where", text: "keeps items that return true" }] },
            { code: `var names = new[] { "ada", "grace" };
var lens = names.Select(n => n.Length);`, notes: [{ at: "Select", text: "one output per input" }] },
            { code: `var words = new[] { "apple", "fig", "kiwi" };
var upper = words.Where(w => w.Length > 3).Select(w => w.ToUpper());`, notes: [{ at: ".Where(", text: "queries chain left to right" }] }
          ]
        },
        {
          id: "ordering", n: 2, title: "ordering", level: 1,
          gloss: "Sorts a sequence with OrderBy and ThenBy.",
          examples: [
            { code: `var sorted = new[] { 3, 1, 2 }.OrderBy(n => n);`, notes: [{ at: "OrderBy", text: "ascending by the key" }] },
            { code: `var words = new[] { "pear", "fig", "apple" };
var byLen = words.OrderByDescending(w => w.Length);`, notes: [] },
            { code: `var people = new[] { ("ada", 36), ("bob", 36), ("cy", 20) };
var sorted = people.OrderBy(p => p.Item2).ThenBy(p => p.Item1);`, notes: [{ at: "ThenBy", text: "breaks ties" }] }
          ]
        },
        {
          id: "aggregates", n: 3, title: "aggregates", level: 1,
          gloss: "Reduces a sequence to a single value.",
          examples: [
            { code: `var nums = new[] { 1, 2, 3 };
var total = nums.Sum();
var avg = nums.Average();`, notes: [] },
            { code: `var nums = new[] { 4, 9, 2 };
var lo = nums.Min();
var hi = nums.Max();`, notes: [] },
            { code: `var count = new[] { 1, 2, 3, 4 }.Count(n => n > 2);
var any = new[] { 1, 2 }.Any(n => n > 1);`, notes: [{ at: "Any", text: "stops at the first match" }] }
          ]
        },
        {
          id: "first-single", n: 4, title: "First and Single", level: 2,
          gloss: "Picks one element with First, Single and their OrDefault forms.",
          examples: [
            { code: `var nums = new[] { 5, 8, 12 };
var first = nums.First(n => n > 6);`, notes: [{ at: "First", text: "throws when nothing matches" }] },
            { code: `var nums = new[] { 5, 8 };
var big = nums.FirstOrDefault(n => n > 100, -1);`, notes: [{ at: "-1", text: "the fallback when nothing matches" }] },
            { code: `var only = new[] { 7 }.Single();`, notes: [{ at: "Single", text: "throws unless exactly one item" }] }
          ]
        },
        {
          id: "group-join", n: 5, title: "GroupBy and Join", level: 3,
          gloss: "Groups items by key and joins two sequences.",
          examples: [
            { code: `var words = new[] { "ant", "bee", "ape" };
var groups = words.GroupBy(w => w[0]);
foreach (var g in groups)
{
    Console.WriteLine($"{g.Key}: {g.Count()}");
}`, notes: [{ at: "g.Key", text: "the shared first letter" }] },
            { code: `var words = new[] { "ant", "bee", "elk", "tiger" };
var counts = words
    .GroupBy(w => w.Length)
    .ToDictionary(g => g.Key, g => g.Count());`, notes: [{ at: "ToDictionary", text: "key and value selectors" }] },
            { code: `var names = new[] { (1, "ada"), (2, "bob") };
var scores = new[] { (1, 90), (2, 70) };
var rows = names.Join(scores, n => n.Item1, s => s.Item1,
    (n, s) => $"{n.Item2}: {s.Item2}");`, notes: [{ at: "Join", text: "matches items by key" }] }
          ]
        },
        {
          id: "to-collections", n: 6, title: "materializing queries", level: 1,
          gloss: "Runs a query now and stores the result in a list, array or dictionary.",
          examples: [
            { code: `var list = Enumerable.Range(1, 5).Where(n => n % 2 == 1).ToList();`, notes: [{ at: ".ToList()", text: "executes the query now" }] },
            { code: `var arr = new[] { "b", "a" }.OrderBy(s => s).ToArray();`, notes: [] },
            { code: `var map = new[] { "ada", "bob" }.ToDictionary(n => n, n => n.Length);`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "nullable-reference-types",
      n: 15,
      title: "nullable reference types",
      concepts: [
        {
          id: "nullable-annotations", n: 1, title: "nullable annotations", level: 2,
          gloss: "Marks reference types that may or may not be null.",
          examples: [
            { code: `string name = "ada";
string? nickname = null;`, notes: [{ at: "string?", text: "may hold null" }] },
            { code: `static string? FindUser(int id) => id == 1 ? "ada" : null;`, notes: [{ at: "string?", text: "callers must check for null" }] },
            { code: `class User
{
    public string Name { get; set; } = "";
    public string? Email { get; set; }
}`, notes: [{ at: "= \"\"", text: "a non-null property needs a value" }] }
          ]
        },
        {
          id: "null-operators", n: 2, title: "null operators", level: 2,
          gloss: "Handles null with the ?., ?? and ??= operators.",
          examples: [
            { code: `string? name = null;
var len = name?.Length ?? 0;`, notes: [{ at: "?.", text: "stops and yields null" }, { at: "??", text: "the fallback value" }] },
            { code: `string? title = null;
title ??= "untitled";`, notes: [{ at: "??=", text: "assigns only when null" }] },
            { code: `List<string>? items = null;
var count = items?.Count ?? 0;
var first = items?[0];`, notes: [{ at: "?[", text: "null-safe indexing" }] }
          ]
        },
        {
          id: "null-guards", n: 3, title: "null guards", level: 2,
          gloss: "Checks for null before the value is used.",
          examples: [
            { code: `string? s = args.FirstOrDefault();
if (s is null)
{
    return;
}
Console.WriteLine(s.Length);`, notes: [{ at: "is null", text: "afterwards s is known non-null" }] },
            { code: `string? s = args.FirstOrDefault();
if (s is not null)
{
    Console.WriteLine(s.Length);
}`, notes: [] },
            { code: `string? value = args.FirstOrDefault();
ArgumentNullException.ThrowIfNull(value);
Console.WriteLine(value.Length);`, notes: [{ at: "ThrowIfNull", text: "throws, and the compiler knows" }] }
          ]
        },
        {
          id: "null-forgiving", n: 4, title: "null-forgiving operator", level: 3,
          gloss: "Tells the compiler a value is not null when it cannot tell.",
          examples: [
            { code: `string? s = Environment.GetEnvironmentVariable("HOME");
var len = s!.Length;`, notes: [{ at: "s!", text: "silences the warning, not the risk" }] },
            { code: `static string? FindUser(int id) => id == 1 ? "ada" : null;
var user = FindUser(1)!;`, notes: [] },
            { code: `class Entity
{
    public string Name { get; set; } = null!;
}`, notes: [{ at: "null!", text: "set later, for example by a framework" }] }
          ]
        }
      ]
    },
    {
      id: "exceptions",
      n: 16,
      title: "exceptions",
      concepts: [
        {
          id: "try-catch", n: 1, title: "try and catch", level: 1,
          gloss: "Handles runtime errors with try and catch.",
          examples: [
            { code: `try
{
    var n = int.Parse("x");
}
catch (FormatException ex)
{
    Console.WriteLine(ex.Message);
}`, notes: [{ at: "FormatException", text: "catches only this type" }] },
            { code: `try
{
    var r = 10 / int.Parse("0");
}
catch (DivideByZeroException)
{
    Console.WriteLine("divide by zero");
}`, notes: [] },
            { code: `try
{
    File.ReadAllText("a.txt");
}
catch (FileNotFoundException)
{
    Console.WriteLine("missing");
}
catch (IOException ex)
{
    Console.WriteLine(ex.Message);
}`, notes: [{ at: "catch (IOException", text: "order specific to general" }] }
          ]
        },
        {
          id: "finally-using", n: 2, title: "finally and using", level: 2,
          gloss: "Runs cleanup code with finally and using.",
          examples: [
            { code: `var reader = new StringReader("hi");
try
{
    Console.WriteLine(reader.ReadLine());
}
finally
{
    reader.Dispose();
}`, notes: [{ at: "finally", text: "runs whether or not it threw" }] },
            { code: `using var reader = new StringReader("hi");
Console.WriteLine(reader.ReadLine());`, notes: [{ at: "using var", text: "disposed at the end of the scope" }] },
            { code: `using (var w = new StringWriter())
{
    w.Write("x");
}`, notes: [] }
          ]
        },
        {
          id: "throwing", n: 3, title: "throwing", level: 1,
          gloss: "Raises an exception with throw.",
          examples: [
            { code: `static void Check(int age)
{
    if (age < 0) throw new ArgumentOutOfRangeException(nameof(age));
}`, notes: [{ at: "nameof(age)", text: "keeps the name in sync" }] },
            { code: `string? input = args.FirstOrDefault();
var value = input ?? throw new ArgumentException("input required");`, notes: [{ at: "?? throw", text: "a throw expression" }] },
            { code: `try
{
    DoWork();
}
catch (Exception)
{
    throw;
}

static void DoWork() { }`, notes: [{ at: "throw;", text: "rethrows, keeping the stack trace" }] }
          ]
        },
        {
          id: "custom-exceptions", n: 4, title: "custom exceptions", level: 2,
          gloss: "Defines your own exception type.",
          examples: [
            { code: `class NotFoundException(string message) : Exception(message);`, notes: [{ at: ": Exception(message)", text: "passes the text to the base" }] },
            { code: `class InvalidInput(string field, string msg) : Exception(msg)
{
    public string Field { get; } = field;
}`, notes: [] },
            { code: `try
{
    throw new NotFoundException("user 7");
}
catch (NotFoundException ex)
{
    Console.WriteLine(ex.Message);
}

class NotFoundException(string message) : Exception(message);`, notes: [] }
          ]
        },
        {
          id: "exception-filters", n: 5, title: "exception filters", level: 3,
          gloss: "Catches an exception only when a condition holds.",
          examples: [
            { code: `try
{
    await new HttpClient().GetStringAsync("http://x");
}
catch (HttpRequestException ex) when ((int?)ex.StatusCode == 404)
{
    Console.WriteLine("not found");
}`, notes: [{ at: "when", text: "the catch runs only if true" }] },
            { code: `try
{
    File.ReadAllText("a.txt");
}
catch (IOException ex) when (ex.Message.Contains("disk"))
{
    Console.WriteLine("disk problem");
}`, notes: [] },
            { code: `try
{
    await Task.Delay(10);
}
catch (Exception ex) when (ex is not OperationCanceledException)
{
    Console.WriteLine(ex.Message);
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "async-await",
      n: 17,
      title: "async/await",
      concepts: [
        {
          id: "async-methods", n: 1, title: "async methods", level: 1,
          gloss: "Marks a method async so it can await long-running work.",
          examples: [
            { code: `static async Task<int> GetNumberAsync()
{
    await Task.Delay(100);
    return 42;
}`, notes: [{ at: "Task<int>", text: "an int that arrives later" }] },
            { code: `static async Task SaveAsync(string text)
{
    await File.WriteAllTextAsync("out.txt", text);
}`, notes: [{ at: "Task", text: "no result value" }] },
            { code: `var n = await GetNumberAsync();

static async Task<int> GetNumberAsync()
{
    await Task.Delay(100);
    return 7;
}`, notes: [{ at: "await", text: "top-level code can await directly" }] }
          ]
        },
        {
          id: "task-when", n: 2, title: "WhenAll and WhenAny", level: 2,
          gloss: "Runs several tasks at once and waits with Task.WhenAll.",
          examples: [
            { code: `var tasks = new[] { Task.Delay(50), Task.Delay(80) };
await Task.WhenAll(tasks);`, notes: [{ at: "Task.WhenAll", text: "waits for every task" }] },
            { code: `var results = await Task.WhenAll(Fetch(1), Fetch(2));

static async Task<int> Fetch(int id)
{
    await Task.Delay(10);
    return id * 2;
}`, notes: [{ at: "results", text: "an int[] in call order" }] },
            { code: `var first = await Task.WhenAny(Task.Delay(500), Task.Delay(10));`, notes: [{ at: "Task.WhenAny", text: "completes with the first finisher" }] }
          ]
        },
        {
          id: "cancellation", n: 3, title: "cancellation", level: 3,
          gloss: "Stops async work cooperatively with a CancellationToken.",
          examples: [
            { code: `using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(1));
await Task.Delay(10, cts.Token);`, notes: [{ at: "cts.Token", text: "handed to anything cancelable" }] },
            { code: `static async Task LoopAsync(CancellationToken token)
{
    while (!token.IsCancellationRequested)
    {
        await Task.Delay(100, token);
    }
}`, notes: [] },
            { code: `var cts = new CancellationTokenSource();
cts.Cancel();
cts.Token.ThrowIfCancellationRequested();`, notes: [{ at: "Cancel()", text: "signals every listener" }] }
          ]
        },
        {
          id: "http-async", n: 4, title: "async HTTP", level: 2,
          gloss: "Fetches data over HTTP without blocking the caller.",
          examples: [
            { code: `using var client = new HttpClient();
var html = await client.GetStringAsync("https://example.com");`, notes: [{ at: "GetStringAsync", text: "the body as a string" }] },
            { code: `using var client = new HttpClient();
var response = await client.GetAsync("https://example.com");
response.EnsureSuccessStatusCode();`, notes: [{ at: "EnsureSuccessStatusCode", text: "throws on 4xx and 5xx" }] },
            { code: `using System.Net.Http.Json;

using var client = new HttpClient();
var data = await client.GetFromJsonAsync<int[]>("http://x/a");`, notes: [{ at: "GetFromJsonAsync<int[]>", text: "downloads and deserializes" }] }
          ]
        }
      ]
    },
    {
      id: "pattern-matching",
      n: 18,
      title: "pattern matching",
      concepts: [
        {
          id: "type-patterns", n: 1, title: "type patterns", level: 2,
          gloss: "Tests a value's type and binds it in one step.",
          examples: [
            { code: `object o = "hello";
if (o is string s)
{
    Console.WriteLine(s.Length);
}`, notes: [{ at: "is string s", text: "test and bind together" }] },
            { code: `object o = 42;
var text = o switch
{
    int n => $"int {n}",
    string s => $"string {s}",
    _ => "other",
};`, notes: [] },
            { code: `object o = 3.5;
if (o is not double d) return;
Console.WriteLine(d);`, notes: [{ at: "is not", text: "d is assigned after the guard" }] }
          ]
        },
        {
          id: "property-patterns", n: 2, title: "property patterns", level: 2,
          gloss: "Matches on the properties of an object.",
          examples: [
            { code: `var user = new User("ada", 36);
if (user is { Age: >= 18 })
{
    Console.WriteLine("adult");
}

record User(string Name, int Age);`, notes: [{ at: "{ Age: >= 18 }", text: "a property with a relational test" }] },
            { code: `var order = new Order(120);
var label = order switch
{
    { Total: > 100 } => "large",
    { Total: 0 } => "empty",
    _ => "normal",
};

record Order(decimal Total);`, notes: [] },
            { code: `var p = new Person("grace");
if (p is { Name.Length: > 3 })
{
    Console.WriteLine("long name");
}

record Person(string Name);`, notes: [{ at: "Name.Length", text: "an extended property pattern" }] }
          ]
        },
        {
          id: "list-patterns", n: 3, title: "list patterns", level: 3,
          gloss: "Matches the shape and contents of arrays and lists.",
          examples: [
            { code: `int[] nums = [1, 2, 3];
if (nums is [1, .., 3])
{
    Console.WriteLine("starts 1, ends 3");
}`, notes: [{ at: "..", text: "any number of items" }] },
            { code: `int[] nums = [4, 5];
var r = nums switch
{
    [] => "empty",
    [var only] => $"one: {only}",
    [var first, ..] => $"first {first}",
};`, notes: [{ at: "[var only]", text: "exactly one item" }] },
            { code: `string[] words = ["run", "fast"];
if (words is ["run", var mode])
{
    Console.WriteLine(mode);
}`, notes: [] }
          ]
        },
        {
          id: "tuple-positional", n: 4, title: "tuple and positional patterns", level: 2,
          gloss: "Matches tuples and records by position.",
          examples: [
            { code: `var (isAdmin, isActive) = (true, false);
var access = (isAdmin, isActive) switch
{
    (true, true) => "full",
    (true, false) => "locked",
    _ => "none",
};`, notes: [] },
            { code: `var p = new Point(0, 5);
if (p is (0, var y))
{
    Console.WriteLine(y);
}

record Point(int X, int Y);`, notes: [{ at: "(0, var y)", text: "deconstructs the record" }] },
            { code: `var t = (1, "one");
if (t is (> 0, string s))
{
    Console.WriteLine(s);
}`, notes: [] }
          ]
        },
        {
          id: "pattern-combinators", n: 5, title: "pattern combinators", level: 3,
          gloss: "Combines patterns with and, or and not.",
          examples: [
            { code: `var n = 7;
var ok = n is > 0 and < 10;`, notes: [{ at: "and", text: "both patterns must match" }] },
            { code: `char c = 'x';
var vowel = c is 'a' or 'e' or 'i' or 'o' or 'u';`, notes: [{ at: "or", text: "either pattern may match" }] },
            { code: `object? o = null;
var present = o is not null;`, notes: [{ at: "is not null", text: "the idiomatic null test" }] }
          ]
        }
      ]
    },
    {
      id: "delegates-events",
      n: 19,
      title: "delegates, Func, events",
      concepts: [
        {
          id: "delegates", n: 1, title: "delegates", level: 2,
          gloss: "Declares a type that holds a reference to a method.",
          examples: [
            { code: `Operation add = (a, b) => a + b;
Console.WriteLine(add(2, 3));

delegate int Operation(int a, int b);`, notes: [{ at: "delegate", text: "a method signature as a type" }] },
            { code: `Operation op = Multiply;
var r = op(3, 4);

static int Multiply(int a, int b) => a * b;
delegate int Operation(int a, int b);`, notes: [{ at: "Multiply", text: "a method group converts to the delegate" }] },
            { code: `Action log = () => Console.WriteLine("a");
log += () => Console.WriteLine("b");
log();`, notes: [{ at: "+=", text: "adds another method to call" }] }
          ]
        },
        {
          id: "func-action", n: 2, title: "Func and Action", level: 1,
          gloss: "Passes behavior around with Func, Action and Predicate.",
          examples: [
            { code: `Func<int, int> square = x => x * x;
var n = square(4);`, notes: [{ at: "Func<int, int>", text: "takes an int, returns an int" }] },
            { code: `Action<string> print = s => Console.WriteLine(s);
print("hi");`, notes: [{ at: "Action", text: "returns nothing" }] },
            { code: `Predicate<int> isEven = n => n % 2 == 0;
var ok = isEven(4);`, notes: [{ at: "Predicate", text: "returns bool" }] }
          ]
        },
        {
          id: "lambda-capture", n: 3, title: "captured variables", level: 2,
          gloss: "Captures variables from the enclosing scope in a lambda.",
          examples: [
            { code: `var factor = 3;
Func<int, int> scale = x => x * factor;
factor = 10;
Console.WriteLine(scale(2));`, notes: [{ at: "factor = 10", text: "the lambda sees the new value" }] },
            { code: `var counter = 0;
Action bump = () => counter++;
bump();
bump();`, notes: [] },
            { code: `Func<int, Func<int, int>> adder = a => b => a + b;
var add5 = adder(5);`, notes: [{ at: "a => b =>", text: "a lambda returning a lambda" }] }
          ]
        },
        {
          id: "events", n: 4, title: "events", level: 3,
          gloss: "Publishes notifications that other code can subscribe to.",
          examples: [
            { code: `class Button
{
    public event EventHandler? Clicked;
    public void Click() => Clicked?.Invoke(this, EventArgs.Empty);
}`, notes: [{ at: "event", text: "outsiders can only += and -=" }] },
            { code: `var b = new Button();
b.Clicked += (s, e) => Console.WriteLine("clicked");
b.Click();

class Button
{
    public event EventHandler? Clicked;
    public void Click() => Clicked?.Invoke(this, EventArgs.Empty);
}`, notes: [{ at: "b.Clicked +=", text: "subscribes a handler" }] },
            { code: `class Ticker
{
    public event Action<int>? Tick;
    public void Fire(int n) => Tick?.Invoke(n);
}`, notes: [{ at: "Action<int>?", text: "the event carries an int" }] }
          ]
        }
      ]
    }
  ]
};
