export default {
  id: "scala",
  name: "Scala",
  short: "SC",
  pigment: "scala",
  family: null,
  version: "3.10",
  lexer: "scala",
  indent: 2,
  topics: [
    {
      id: "val-var-types",
      n: 1,
      title: "val, var & types",
      concepts: [
        {
          id: "val-and-var", n: 1, title: "val and var", level: 1,
          gloss: "Binds names to immutable values with val and mutable ones with var.",
          examples: [
            { code: `val city = "Oslo"
var visits = 0
visits += 1
println(s"$city: $visits")`, notes: [{ at: "val", text: "cannot be reassigned" }, { at: "var", text: "can be reassigned" }] },
            { code: `val price = 9.99
val quantity = 3
val total = price * quantity
println(total)`, notes: [] },
            { code: `val (a, b) = (1, 2)
val Array(x, y) = Array(10, 20)
println(a + b + x + y)`, notes: [{ at: "val (a, b)", text: "destructures a tuple" }] }
          ]
        },
        {
          id: "types-and-inference", n: 2, title: "types and inference", level: 1,
          gloss: "Lets the compiler infer types or states them after a colon.",
          examples: [
            { code: `val count: Int = 42
val ratio: Double = 0.75
val flag: Boolean = true
val letter: Char = 'k'
println((count, ratio, flag, letter))`, notes: [{ at: ": Int", text: "explicit type" }] },
            { code: `val big: Long = 3_000_000_000L
val small: Byte = 127
val f: Float = 1.5f
println(big + small + f)`, notes: [{ at: "3_000_000_000L", text: "a Long literal" }] },
            { code: `println(7 / 2)
println(7 / 2.0)
println(7 % 2)
println(math.pow(2, 10))`, notes: [{ at: "7 / 2", text: "integer division" }] }
          ]
        },
        {
          id: "numeric-conversion", n: 3, title: "numeric conversion", level: 1,
          gloss: "Converts between numbers and strings with explicit methods.",
          examples: [
            { code: `println("42".toInt + 1)
println("3.5".toDouble * 2)
println(7.toString + "!")
println("x1".toIntOption)`, notes: [{ at: "toIntOption", text: "returns None on bad input" }] },
            { code: `println(3.7.toInt)
println(3.toDouble)
println(math.round(2.5))
println(Int.MaxValue)`, notes: [{ at: "toInt", text: "truncates" }] },
            { code: `val n = 300
println(n.toByte)
println(n.toChar.toInt)
println(BigInt(2).pow(70))`, notes: [{ at: "BigInt", text: "arbitrary precision" }] }
          ]
        },
        {
          id: "lazy-and-aliases", n: 4, title: "lazy val, aliases and Any", level: 2,
          gloss: "Delays evaluation with lazy val and names types with type aliases.",
          examples: [
            { code: `lazy val expensive = { println("computing"); 42 }
println("before")
println(expensive)`, notes: [{ at: "lazy val", text: "computed on first use" }] },
            { code: `type UserId = Int
val id: UserId = 7
println(id)`, notes: [{ at: "type", text: "alias for Int" }] },
            { code: `val missing: Option[Int] = None
val anything: Any = "text"
println((missing, anything))`, notes: [{ at: "Any", text: "supertype of everything" }] }
          ]
        }
      ]
    },
    {
      id: "strings-interpolation",
      n: 2,
      title: "strings & interpolation",
      concepts: [
        {
          id: "interpolators", n: 1, title: "string interpolation", level: 1,
          gloss: "Embeds values in strings with the s, f and raw prefixes.",
          examples: [
            { code: `val name = "ada"
println(s"Hello, $name")
println(s"Sum: \${2 + 3}")`, notes: [{ at: "s\"Hello, $name\"", text: "interpolation" }, { at: "${2 + 3}", text: "any expression" }] },
            { code: `val item = "tea"
val qty = 3
println(s"$qty x \${item}s")`, notes: [] },
            { code: `val price = 4.5
println(f"Price: $price%.2f EUR")
println(raw"no\\tescape")`, notes: [{ at: "f\"Price", text: "printf-style format" }, { at: "raw\"no", text: "no escape processing" }] }
          ]
        },
        {
          id: "multiline-concatenation", n: 2, title: "multiline strings and concatenation", level: 2,
          gloss: "Writes multiline text in triple quotes and joins or repeats strings.",
          examples: [
            { code: `val poem = """first line
second line"""
println(poem)`, notes: [{ at: "\"\"\"", text: "may span lines" }] },
            { code: `val text = """
  |one
  |two
  """.stripMargin
println(text)`, notes: [{ at: "stripMargin", text: "removes up to the pipe" }] },
            { code: `println("ab" * 3)
println("Hello" + ", " + "world")`, notes: [] }
          ]
        },
        {
          id: "string-methods", n: 3, title: "string methods", level: 1,
          gloss: "Handles trimming, splitting and searching with standard string methods.",
          examples: [
            { code: `val title = "  Quarterly Report  "
println(title.trim)
println(title.trim.toUpperCase)`, notes: [{ at: "trim", text: "removes outer whitespace" }] },
            { code: `val csv = "ada,grace,linus"
val names = csv.split(",")
println(names.mkString(" | "))`, notes: [{ at: "mkString", text: "joins with a separator" }] },
            { code: `val file = "report.final.pdf"
println(file.endsWith(".pdf"))
println(file.startsWith("report"))
println(file.take(6))`, notes: [{ at: "take", text: "first six characters" }] },
            { code: `val text = "red apple, red car"
println(text.replace("red", "green"))
println(text.indexOf("apple"))
println(text.contains("car"))`, notes: [] }
          ]
        },
        {
          id: "chars-and-regex", n: 4, title: "characters and regex", level: 2,
          gloss: "Reads characters and matches text with regular expressions.",
          examples: [
            { code: `val word = "scala"
println(word(0))
println(word.last)
println(word.length)`, notes: [{ at: "word(0)", text: "index with parentheses" }] },
            { code: `println("banana".count(_ == 'a'))
println("stream".reverse)
println("abc".map(_.toUpper))`, notes: [{ at: "_ == 'a'", text: "placeholder lambda" }] },
            { code: `val Pattern = """(\\d+)-(\\d+)""".r
"call 555-1234" match
  case Pattern(a, b) => println(s"$a / $b")
  case _ => println("no match")`, notes: [{ at: ".r", text: "compiles a regex" }] },
            { code: `println("a1b22".replaceAll("\\\\d+", "#"))
println("2024-01-15".matches("\\\\d{4}-\\\\d{2}-\\\\d{2}"))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "collections",
      n: 3,
      title: "collections",
      concepts: [
        {
          id: "lists", n: 1, title: "lists", level: 1,
          gloss: "Stores ordered immutable values in a List.",
          examples: [
            { code: `val scores = List(90, 72, 85)
println(scores.head)
println(scores.tail)
println(scores.length)`, notes: [{ at: "head", text: "first element" }, { at: "tail", text: "everything else" }] },
            { code: `val nums = List(1, 2, 3)
println(0 :: nums)
println(nums :+ 4)
println(nums ++ List(7, 8))`, notes: [{ at: "::", text: "prepend" }, { at: ":+", text: "append" }] },
            { code: `println(List.fill(3)("x"))
println(List.range(0, 5))
println((1 to 5).toList)`, notes: [] }
          ]
        },
        {
          id: "vectors-and-mutable", n: 2, title: "vectors, arrays and buffers", level: 1,
          gloss: "Indexes sequences quickly and changes arrays and buffers in place.",
          examples: [
            { code: `import scala.collection.mutable.ArrayBuffer
val buf = ArrayBuffer(1, 2)
buf += 3
buf.remove(0)
println(buf)`, notes: [{ at: "ArrayBuffer", text: "mutable and growable" }] },
            { code: `val v = Vector(1, 2, 3)
println(v.updated(1, 20))
println(v(2))`, notes: [{ at: "updated", text: "new vector, one change" }] },
            { code: `val arr = Array(3, 1, 2)
arr(0) = 9
println(arr.sorted.mkString(","))`, notes: [{ at: "arr(0) =", text: "arrays are mutable" }] }
          ]
        },
        {
          id: "maps", n: 3, title: "maps", level: 1,
          gloss: "Associates keys with values in an immutable Map.",
          examples: [
            { code: `val stock = Map("apple" -> 4, "pear" -> 0)
println(stock("apple"))
println(stock.getOrElse("plum", 0))`, notes: [{ at: "->", text: "builds a pair" }, { at: "getOrElse", text: "default for missing keys" }] },
            { code: `val prices = Map("tea" -> 2.5)
val more = prices + ("cake" -> 4.0)
println(more)
println(more.removed("tea"))`, notes: [{ at: "+", text: "returns a new map" }] },
            { code: `val ages = Map("ada" -> 36, "linus" -> 54)
for (name, age) <- ages do println(s"$name: $age")`, notes: [{ at: "(name, age)", text: "destructures each entry" }] }
          ]
        },
        {
          id: "sets-and-tuples", n: 4, title: "sets and tuples", level: 1,
          gloss: "Keeps unique values in sets and groups mixed values in tuples.",
          examples: [
            { code: `val tags = Set("scala", "jvm", "scala")
println(tags.size)
println(tags + "web")`, notes: [{ at: "Set", text: "duplicates removed" }] },
            { code: `val a = Set(1, 2, 3)
val b = Set(3, 4)
println(a & b)
println(a | b)
println(a -- b)`, notes: [{ at: "&", text: "intersection" }, { at: "|", text: "union" }] },
            { code: `val pair = ("ada", 36)
println(pair._1)
val (name, age) = pair
println(s"$name $age")`, notes: [{ at: "pair._1", text: "first element" }] }
          ]
        },
        {
          id: "transforming", n: 5, title: "map, filter and fold", level: 2,
          gloss: "Transforms and summarises collections with higher-order methods.",
          examples: [
            { code: `val nums = List(1, 2, 3, 4)
println(nums.map(_ * 2))
println(nums.filter(_ % 2 == 0))`, notes: [{ at: "_ * 2", text: "placeholder lambda" }] },
            { code: `println(List(3, 5, 7).sum)
println(List(3, 5, 7).foldLeft(0)(_ + _))
println(List(3, 5, 7).reduce(_ max _))`, notes: [{ at: "foldLeft(0)", text: "starts from zero" }] },
            { code: `val words = List("apple", "avocado", "banana")
println(words.groupBy(_.head))
println(words.sortBy(_.length))
println(words.partition(_.startsWith("a")))`, notes: [{ at: "groupBy", text: "map of key to list" }] }
          ]
        }
      ]
    },
    {
      id: "functions-lambdas",
      n: 4,
      title: "functions & lambdas",
      concepts: [
        {
          id: "defining-functions", n: 1, title: "defining functions", level: 1,
          gloss: "Defines methods with typed parameters and an expression body.",
          examples: [
            { code: `def square(n: Int): Int = n * n
println(square(4))`, notes: [{ at: "=", text: "body is an expression" }] },
            { code: `def greet(name: String, greeting: String = "Hello"): String =
  s"$greeting, $name"
println(greet("ada"))`, notes: [{ at: "= \"Hello\"", text: "default argument" }] },
            { code: `def area(w: Double, h: Double): Double =
  val result = w * h
  result
println(area(3, 4))`, notes: [{ at: "val result", text: "block without braces" }] }
          ]
        },
        {
          id: "named-and-varargs", n: 2, title: "named arguments and varargs", level: 2,
          gloss: "Names arguments at the call site and accepts repeated parameters.",
          examples: [
            { code: `def connect(host: String, port: Int = 80): String = s"$host:$port"
println(connect(port = 8080, host = "example.com"))`, notes: [{ at: "port =", text: "named argument" }] },
            { code: `def total(values: Int*): Int = values.sum
println(total(1, 2, 3))`, notes: [{ at: "Int*", text: "repeated parameter" }] },
            { code: `def tags(names: String*): String = names.mkString(",")
val all = List("a", "b")
println(tags(all*))`, notes: [{ at: "all*", text: "spreads a sequence" }] }
          ]
        },
        {
          id: "lambdas", n: 3, title: "lambdas and higher-order functions", level: 1,
          gloss: "Writes anonymous functions and passes them to other functions.",
          examples: [
            { code: `val double = (n: Int) => n * 2
println(double(4))
println(List(1, 2, 3).map(double))`, notes: [{ at: "=>", text: "lambda arrow" }] },
            { code: `def apply(n: Int, f: Int => Int): Int = f(n)
println(apply(4, _ + 1))`, notes: [{ at: "Int => Int", text: "function type" }] },
            { code: `val add: (Int, Int) => Int = _ + _
println(add(2, 3))
println(List(3, 1, 2).sortWith(_ > _))`, notes: [] }
          ]
        },
        {
          id: "currying-closures", n: 4, title: "currying and closures", level: 2,
          gloss: "Splits parameter lists and captures surrounding variables.",
          examples: [
            { code: `def add(a: Int)(b: Int): Int = a + b
val addFive = add(5)
println(addFive(10))`, notes: [{ at: "(a: Int)(b: Int)", text: "two parameter lists" }] },
            { code: `def makeCounter(): () => Int =
  var count = 0
  () => { count += 1; count }
val counter = makeCounter()
counter()
println(counter())`, notes: [{ at: "count", text: "captured and updated" }] },
            { code: `val rate = 0.2
val withTax = (price: Double) => price * (1 + rate)
println(withTax(40))`, notes: [] }
          ]
        },
        {
          id: "by-name-recursion", n: 5, title: "by-name parameters and recursion", level: 3,
          gloss: "Delays argument evaluation and writes tail-recursive functions.",
          examples: [
            { code: `def twice(action: => Unit): Unit =
  action
  action
twice(println("hi"))`, notes: [{ at: "=> Unit", text: "evaluated at each use" }] },
            { code: `import scala.annotation.tailrec
@tailrec
def sum(n: Int, acc: Int = 0): Int =
  if n == 0 then acc else sum(n - 1, acc + n)
println(sum(100))`, notes: [{ at: "@tailrec", text: "compiler checks the loop" }] },
            { code: `def fib(n: Int): Int =
  if n < 2 then n else fib(n - 1) + fib(n - 2)
println(fib(10))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "case-classes",
      n: 5,
      title: "case classes",
      concepts: [
        {
          id: "declaring-case-classes", n: 1, title: "declaring case classes", level: 1,
          gloss: "Creates immutable data classes with generated members.",
          examples: [
            { code: `case class User(name: String, age: Int)
val ada = User("ada", 36)
println(ada)`, notes: [{ at: "case class", text: "generates toString and more" }, { at: "User(\"ada\"", text: "no new needed" }] },
            { code: `case class Point(x: Int, y: Int)
val p = Point(1, 2)
println(p.x + p.y)`, notes: [] },
            { code: `case class Product(sku: String, price: Double, stock: Int = 0)
println(Product("A1", 9.5))`, notes: [{ at: "stock: Int = 0", text: "default value" }] }
          ]
        },
        {
          id: "copy-and-equality", n: 2, title: "copy and equality", level: 1,
          gloss: "Copies instances with changes and compares them by value.",
          examples: [
            { code: `case class User(name: String, age: Int)
val ada = User("ada", 36)
println(ada.copy(age = 37))`, notes: [{ at: "copy", text: "new instance, changed fields" }] },
            { code: `case class Point(x: Int, y: Int)
println(Point(1, 2) == Point(1, 2))
println(Point(1, 2).hashCode == Point(1, 2).hashCode)`, notes: [{ at: "==", text: "compares fields" }] },
            { code: `case class Order(id: Int, total: Double)
val first = Order(1, 9.5)
val second = first.copy(id = 2)
println(List(first, second))`, notes: [] }
          ]
        },
        {
          id: "methods-and-companions", n: 3, title: "methods and companions", level: 2,
          gloss: "Adds methods to case classes and factory functions to companion objects.",
          examples: [
            { code: `case class Rectangle(w: Double, h: Double):
  def area: Double = w * h
println(Rectangle(3, 4).area)`, notes: [{ at: ":", text: "starts the class body" }] },
            { code: `case class Temperature(celsius: Double)
object Temperature:
  def fromF(f: Double): Temperature = Temperature((f - 32) * 5 / 9)
println(Temperature.fromF(212))`, notes: [{ at: "object", text: "companion of the class" }] },
            { code: `case class Money(cents: Int):
  def +(other: Money): Money = Money(cents + other.cents)
println(Money(5) + Money(7))`, notes: [{ at: "def +", text: "operator method" }] }
          ]
        },
        {
          id: "destructuring", n: 4, title: "destructuring and collections", level: 2,
          gloss: "Unpacks case classes and processes lists of them.",
          examples: [
            { code: `case class Point(x: Int, y: Int)
val Point(a, b) = Point(3, 4)
println(a + b)`, notes: [{ at: "Point(a, b)", text: "pattern on the left" }] },
            { code: `case class User(name: String, age: Int)
val users = List(User("ada", 36), User("grace", 30))
println(users.map(_.name))
println(users.sortBy(_.age).head)`, notes: [] },
            { code: `case class Item(name: String, qty: Int)
val items = List(Item("pen", 3), Item("ink", 1))
println(items.map(i => i.qty).sum)
println(items.maxBy(_.qty))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "pattern-matching",
      n: 6,
      title: "pattern matching",
      concepts: [
        {
          id: "match-expressions", n: 1, title: "match expressions", level: 1,
          gloss: "Selects a result by matching a value against cases.",
          examples: [
            { code: `val code = 404
val msg = code match
  case 200 => "ok"
  case 404 => "not found"
  case _ => "other"
println(msg)`, notes: [{ at: "match", text: "is an expression" }, { at: "_", text: "wildcard" }] },
            { code: `def describe(x: Any): String = x match
  case i: Int => s"int $i"
  case s: String => s"string $s"
  case _ => "other"
println(describe(5))`, notes: [{ at: "i: Int", text: "type pattern" }] },
            { code: `val n = 5
n match
  case x if x < 0 => println("negative")
  case 0 => println("zero")
  case _ => println("positive")`, notes: [{ at: "if x < 0", text: "guard" }] }
          ]
        },
        {
          id: "destructuring-patterns", n: 2, title: "destructuring patterns", level: 1,
          gloss: "Matches tuples, lists and case classes by their shape.",
          examples: [
            { code: `val pair = (1, "one")
pair match
  case (n, s) => println(s"$n=$s")`, notes: [] },
            { code: `val list = List(1, 2, 3)
list match
  case Nil => println("empty")
  case head :: tail => println(s"$head then $tail")`, notes: [{ at: "head :: tail", text: "list pattern" }] },
            { code: `case class Point(x: Int, y: Int)
Point(0, 5) match
  case Point(0, y) => println(s"on y axis at $y")
  case Point(x, y) => println(s"$x,$y")`, notes: [] }
          ]
        },
        {
          id: "alternatives-binders", n: 3, title: "alternatives and binders", level: 2,
          gloss: "Combines cases with a pipe, names matched values with at and adds guards.",
          examples: [
            { code: `val day = "sat"
day match
  case "sat" | "sun" => println("weekend")
  case _ => println("weekday")`, notes: [{ at: "|", text: "alternative patterns" }] },
            { code: `val list = List(1, 2, 3)
list match
  case all @ (first :: _) => println(s"$first of $all")
  case Nil => println("empty")`, notes: [{ at: "all @", text: "binds the whole value" }] },
            { code: `val score = 85
val grade = score match
  case s if s >= 90 => "A"
  case s if s >= 80 => "B"
  case _ => "C"
println(grade)`, notes: [] }
          ]
        },
        {
          id: "extractors", n: 4, title: "extractors and type patterns", level: 3,
          gloss: "Defines custom patterns with unapply and matches by runtime type.",
          examples: [
            { code: `object Even:
  def unapply(n: Int): Boolean = n % 2 == 0
5 match
  case Even() => println("even")
  case _ => println("odd")`, notes: [{ at: "unapply", text: "makes a pattern" }] },
            { code: `object Email:
  def unapply(s: String): Option[(String, String)] =
    s.split("@") match
      case Array(user, host) => Some((user, host))
      case _ => None
"ada@example.com" match
  case Email(user, host) => println(s"$user at $host")
  case _ => println("invalid")`, notes: [] },
            { code: `val items: List[Any] = List(1, "two", 3.0)
for item <- items do
  item match
    case i: Int => println(s"int $i")
    case s: String => println(s"string $s")
    case d: Double => println(s"double $d")`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "traits-classes",
      n: 7,
      title: "traits & classes",
      concepts: [
        {
          id: "classes", n: 1, title: "classes", level: 1,
          gloss: "Defines classes with constructor parameters, fields and methods.",
          examples: [
            { code: `class Counter:
  private var value = 0
  def increment(): Unit = value += 1
  def current: Int = value
val c = Counter()
c.increment()
println(c.current)`, notes: [{ at: "private", text: "hidden from outside" }, { at: "Counter()", text: "no new needed" }] },
            { code: `class User(val name: String, var age: Int)
val ada = User("ada", 36)
ada.age += 1
println(s"\${ada.name} \${ada.age}")`, notes: [{ at: "val name", text: "public read-only field" }] },
            { code: `class Rectangle(width: Double, height: Double):
  def area: Double = width * height
println(Rectangle(3, 4).area)`, notes: [{ at: "width", text: "plain parameter, not a field" }] }
          ]
        },
        {
          id: "traits", n: 2, title: "traits", level: 1,
          gloss: "Declares abstract and concrete members that classes mix in.",
          examples: [
            { code: `trait Greeter:
  def greet(name: String): String
class Formal extends Greeter:
  def greet(name: String): String = s"Good day, $name"
println(Formal().greet("ada"))`, notes: [{ at: "trait", text: "interface with optional code" }] },
            { code: `trait Logging:
  def log(msg: String): Unit = println(s"[log] $msg")
class Service extends Logging
Service().log("started")`, notes: [{ at: "def log", text: "concrete method in a trait" }] },
            { code: `trait Shape:
  def area: Double
  def describe: String = s"area $area"
class Square(side: Double) extends Shape:
  def area: Double = side * side
println(Square(2).describe)`, notes: [] }
          ]
        },
        {
          id: "inheritance", n: 3, title: "inheritance and override", level: 2,
          gloss: "Extends classes, overrides members and calls super.",
          examples: [
            { code: `class Animal:
  def speak: String = "..."
class Dog extends Animal:
  override def speak: String = "woof"
println(Dog().speak)`, notes: [{ at: "override", text: "required keyword" }] },
            { code: `abstract class Vehicle(val wheels: Int)
class Bike extends Vehicle(2)
println(Bike().wheels)`, notes: [{ at: "extends Vehicle(2)", text: "passes the argument" }] },
            { code: `class Employee(val name: String):
  def describe: String = s"employee $name"
class Manager(name: String) extends Employee(name):
  override def describe: String = s"manager \${super.describe}"
println(Manager("ada").describe)`, notes: [] }
          ]
        },
        {
          id: "objects-composition", n: 4, title: "objects and mixin composition", level: 2,
          gloss: "Creates singletons, factories and classes that mix in several traits.",
          examples: [
            { code: `object Config:
  val name = "app"
  def debug: Boolean = false
println(Config.name)`, notes: [{ at: "object", text: "singleton" }] },
            { code: `class User private (val name: String)
object User:
  def apply(name: String): User = new User(name)
println(User("ada").name)`, notes: [{ at: "private", text: "only the companion can construct" }] },
            { code: `trait Walks:
  def walk: String = "walking"
trait Swims:
  def swim: String = "swimming"
class Duck extends Walks, Swims
println(Duck().walk + " " + Duck().swim)`, notes: [{ at: "extends Walks, Swims", text: "several traits" }] }
          ]
        }
      ]
    },
    {
      id: "enums-adts",
      n: 8,
      title: "enums & ADTs",
      concepts: [
        {
          id: "enums", n: 1, title: "enums", level: 1,
          gloss: "Declares a fixed set of values with enum.",
          examples: [
            { code: `enum Color:
  case Red, Green, Blue
println(Color.Red)
println(Color.values.toList)`, notes: [{ at: "case", text: "lists the values" }, { at: "values", text: "all cases" }] },
            { code: `enum Level(val value: Int):
  case Low extends Level(1)
  case High extends Level(10)
println(Level.High.value)`, notes: [{ at: "Level(val value: Int)", text: "enum with a field" }] },
            { code: `enum Direction:
  case North, South
  def opposite: Direction = this match
    case North => South
    case South => North
println(Direction.North.opposite)`, notes: [] }
          ]
        },
        {
          id: "algebraic-types", n: 2, title: "algebraic data types", level: 2,
          gloss: "Models data as enums whose cases carry values.",
          examples: [
            { code: `enum Shape:
  case Circle(r: Double)
  case Rect(w: Double, h: Double)
println(Shape.Circle(2.0))`, notes: [{ at: "Circle(r: Double)", text: "case with a payload" }] },
            { code: `enum Expr:
  case Num(n: Int)
  case Add(l: Expr, r: Expr)
println(Expr.Add(Expr.Num(1), Expr.Num(2)))`, notes: [{ at: "Add(l: Expr, r: Expr)", text: "recursive case" }] },
            { code: `enum Result[+T]:
  case Ok(value: T)
  case Err(message: String)
println(Result.Ok(42))`, notes: [{ at: "[+T]", text: "generic enum" }] }
          ]
        },
        {
          id: "matching-adts", n: 3, title: "matching on ADTs", level: 2,
          gloss: "Evaluates data by matching each case of an enum.",
          examples: [
            { code: `enum Shape:
  case Circle(r: Double)
  case Square(s: Double)
def area(shape: Shape): Double = shape match
  case Shape.Circle(r) => 3.14159 * r * r
  case Shape.Square(s) => s * s
println(area(Shape.Square(3)))`, notes: [{ at: "match", text: "exhaustiveness is checked" }] },
            { code: `enum Expr:
  case Num(n: Int)
  case Add(l: Expr, r: Expr)
def eval(e: Expr): Int = e match
  case Expr.Num(n) => n
  case Expr.Add(l, r) => eval(l) + eval(r)
println(eval(Expr.Add(Expr.Num(1), Expr.Num(2))))`, notes: [] },
            { code: `enum Light:
  case Red, Green
def action(l: Light): String = l match
  case Light.Red => "stop"
  case Light.Green => "go"
println(action(Light.Green))`, notes: [] }
          ]
        },
        {
          id: "sealed-and-utilities", n: 4, title: "sealed traits and enum utilities", level: 2,
          gloss: "Closes a hierarchy with sealed and reads enum names and positions.",
          examples: [
            { code: `sealed trait Animal
case class Dog(name: String) extends Animal
case class Cat(name: String) extends Animal
def sound(a: Animal): String = a match
  case Dog(_) => "woof"
  case Cat(_) => "meow"
println(sound(Dog("rex")))`, notes: [{ at: "sealed", text: "subtypes known in this file" }] },
            { code: `enum Planet:
  case Mercury, Venus
println(Planet.valueOf("Venus"))
println(Planet.Venus.ordinal)`, notes: [{ at: "valueOf", text: "case by name" }, { at: "ordinal", text: "position" }] },
            { code: `enum Status:
  case Active, Closed
println(Status.values.map(_.toString).mkString(", "))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "option-either-try",
      n: 9,
      title: "Option, Either, Try",
      concepts: [
        {
          id: "option", n: 1, title: "Option", level: 1,
          gloss: "Represents a possibly missing value with Some and None.",
          examples: [
            { code: `val some: Option[Int] = Some(5)
val none: Option[Int] = None
println((some, none))`, notes: [{ at: "Some", text: "a present value" }, { at: "None", text: "no value" }] },
            { code: `val users = Map("ada" -> 36)
println(users.get("ada"))
println(users.get("linus"))`, notes: [{ at: "get", text: "returns an Option" }] },
            { code: `def firstEven(xs: List[Int]): Option[Int] = xs.find(_ % 2 == 0)
println(firstEven(List(1, 3, 4)))`, notes: [] }
          ]
        },
        {
          id: "option-operations", n: 2, title: "working with Option", level: 1,
          gloss: "Transforms and unwraps options with map, flatMap and getOrElse.",
          examples: [
            { code: `val value: Option[Int] = Some(3)
println(value.map(_ + 1))
println(value.getOrElse(0))
println(value.filter(_ > 5))`, notes: [{ at: "getOrElse", text: "default for None" }] },
            { code: `val a = Some(2)
val b = Some(3)
println(a.flatMap(x => b.map(y => x * y)))`, notes: [{ at: "flatMap", text: "chains optional steps" }] },
            { code: `println(Option.empty[String].orElse(Some("fallback")))
println(Some(5).fold("none")(n => s"got $n"))`, notes: [{ at: "fold", text: "one result for each case" }] }
          ]
        },
        {
          id: "either", n: 3, title: "Either", level: 1,
          gloss: "Returns a result or an error with Right and Left.",
          examples: [
            { code: `def parse(s: String): Either[String, Int] =
  s.toIntOption.toRight(s"not a number: $s")
println(parse("42"))
println(parse("x"))`, notes: [{ at: "toRight", text: "turns an Option into Either" }] },
            { code: `def divide(a: Int, b: Int): Either[String, Int] =
  if b == 0 then Left("division by zero") else Right(a / b)
println(divide(10, 2))
println(divide(1, 0))`, notes: [{ at: "Left", text: "conventionally the error" }] },
            { code: `val result: Either[String, Int] = Right(5)
println(result.map(_ * 2))
println(result.fold(e => s"error $e", v => s"value $v"))`, notes: [] }
          ]
        },
        {
          id: "try", n: 4, title: "Try", level: 2,
          gloss: "Wraps code that may throw in Success or Failure.",
          examples: [
            { code: `import scala.util.Try
println(Try("42".toInt))
println(Try("x".toInt).isFailure)`, notes: [{ at: "Try", text: "captures exceptions" }] },
            { code: `import scala.util.{Try, Success, Failure}
Try(10 / 0) match
  case Success(v) => println(v)
  case Failure(e) => println(s"failed: \${e.getMessage}")`, notes: [{ at: "Failure(e)", text: "holds the exception" }] },
            { code: `import scala.util.Try
println(Try("x".toInt).getOrElse(0))
println(Try(1 / 0).recover { case _: ArithmeticException => -1 })`, notes: [{ at: "recover", text: "turns a failure into a value" }] }
          ]
        }
      ]
    },
    {
      id: "for-comprehensions",
      n: 10,
      title: "for-comprehensions",
      concepts: [
        {
          id: "for-loops", n: 1, title: "for loops", level: 1,
          gloss: "Loops over ranges and collections with for and do.",
          examples: [
            { code: `for n <- 1 to 3 do println(n)`, notes: [{ at: "1 to 3", text: "inclusive range" }] },
            { code: `val names = List("ada", "grace")
for (name, i) <- names.zipWithIndex do println(s"$i: $name")`, notes: [{ at: "zipWithIndex", text: "pairs with positions" }] },
            { code: `for
  x <- 1 to 2
  y <- List("a", "b")
do println(s"$x$y")`, notes: [{ at: "y <- List", text: "nested loops" }] }
          ]
        },
        {
          id: "yield", n: 2, title: "yield and filters", level: 1,
          gloss: "Builds a new collection from generators and conditions.",
          examples: [
            { code: `val squares = for n <- 1 to 5 yield n * n
println(squares)`, notes: [{ at: "yield", text: "collects the results" }] },
            { code: `val evens = for n <- 1 to 10 if n % 2 == 0 yield n
println(evens)`, notes: [{ at: "if", text: "filter inside the loop" }] },
            { code: `val pairs = for
  x <- List(1, 2)
  y <- List("a", "b")
yield (x, y)
println(pairs)`, notes: [] }
          ]
        },
        {
          id: "for-with-options", n: 3, title: "for with Option, Either and Try", level: 2,
          gloss: "Sequences Option, Either and Try values and stops at the first failure.",
          examples: [
            { code: `val a = Some(2)
val b = Some(3)
val sum = for
  x <- a
  y <- b
yield x + y
println(sum)`, notes: [{ at: "yield x + y", text: "every step succeeded" }] },
            { code: `def parse(s: String): Either[String, Int] = s.toIntOption.toRight("bad")
val r = for
  a <- parse("4")
  b <- parse("x")
yield a + b
println(r)`, notes: [{ at: "b <- parse(\"x\")", text: "first failure wins" }] },
            { code: `import scala.util.Try
val result = for
  a <- Try("4".toInt)
  b <- Try("5".toInt)
yield a * b
println(result)`, notes: [] }
          ]
        },
        {
          id: "definitions-and-guards", n: 4, title: "definitions and guards", level: 2,
          gloss: "Binds intermediate values and filters entries inside a for.",
          examples: [
            { code: `val result = for
  n <- 1 to 5
  square = n * n
  if square > 5
yield square
println(result)`, notes: [{ at: "square =", text: "local definition" }] },
            { code: `val users = Map("ada" -> 36, "linus" -> 54)
for (name, age) <- users if age > 40 do println(name)`, notes: [{ at: "if age > 40", text: "guard in the loop" }] },
            { code: `val nested = List(List(1, 2), List(3))
val flat = for
  inner <- nested
  n <- inner
yield n * 10
println(flat)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "given-using",
      n: 11,
      title: "given & using",
      concepts: [
        {
          id: "givens", n: 1, title: "given instances and using clauses", level: 2,
          gloss: "Provides contextual values with given and receives them with using.",
          examples: [
            { code: `given Int = 42
def show(using n: Int): String = s"value $n"
println(show)`, notes: [{ at: "given", text: "contextual value" }, { at: "using", text: "filled in by the compiler" }] },
            { code: `trait Greeter:
  def greet(name: String): String
given Greeter with
  def greet(name: String): String = s"Hello, $name"
def welcome(name: String)(using g: Greeter): String = g.greet(name)
println(welcome("ada"))`, notes: [{ at: "given Greeter with", text: "anonymous instance" }] },
            { code: `given String = "default"
def label(using s: String): String = s.toUpperCase
println(label)`, notes: [] }
          ]
        },
        {
          id: "summoning-ordering", n: 2, title: "summon and Ordering", level: 2,
          gloss: "Looks up givens with summon and sorts with Ordering instances.",
          examples: [
            { code: `println(summon[Ordering[Int]].compare(1, 2))`, notes: [{ at: "summon", text: "fetches a given" }] },
            { code: `def largest[T](xs: List[T])(using ord: Ordering[T]): T = xs.max
println(largest(List(3, 9, 2)))`, notes: [] },
            { code: `given Ordering[String] = Ordering.by(_.length)
println(List("ccc", "a", "bb").sorted)`, notes: [{ at: "Ordering.by", text: "order by a key" }] }
          ]
        },
        {
          id: "type-classes", n: 3, title: "type classes", level: 3,
          gloss: "Describes behaviour for many types with a trait and given instances.",
          examples: [
            { code: `trait Show[A]:
  def show(a: A): String
given Show[Int] with
  def show(a: Int): String = s"int $a"
def display[A](a: A)(using s: Show[A]): String = s.show(a)
println(display(5))`, notes: [{ at: "Show[A]", text: "behaviour per type" }] },
            { code: `trait Monoid[A]:
  def empty: A
  def combine(x: A, y: A): A
given Monoid[Int] with
  def empty = 0
  def combine(x: Int, y: Int) = x + y
def fold[A](xs: List[A])(using m: Monoid[A]): A =
  xs.foldLeft(m.empty)(m.combine)
println(fold(List(1, 2, 3)))`, notes: [] },
            { code: `trait Describe[A]:
  extension (a: A) def describe: String
given Describe[Boolean] with
  extension (b: Boolean) def describe = if b then "yes" else "no"
println(true.describe)`, notes: [{ at: "extension", text: "method inside the type class" }] }
          ]
        },
        {
          id: "context-bounds", n: 4, title: "context bounds and explicit using", level: 2,
          gloss: "Shortens using clauses with context bounds and passes givens by hand.",
          examples: [
            { code: `def maxOf[T: Ordering](a: T, b: T): T = summon[Ordering[T]].max(a, b)
println(maxOf(3, 8))`, notes: [{ at: "T: Ordering", text: "context bound" }] },
            { code: `import scala.math.Ordering.Implicits.infixOrderingOps
def bigger[T: Ordering](a: T, b: T): Boolean = a > b
println(bigger("b", "a"))`, notes: [] },
            { code: `def run(using name: String): String = s"running $name"
println(run(using "manual"))`, notes: [{ at: "using \"manual\"", text: "explicit argument" }] }
          ]
        }
      ]
    },
    {
      id: "extension-methods",
      n: 12,
      title: "extension methods",
      concepts: [
        {
          id: "simple-extensions", n: 1, title: "simple extensions", level: 1,
          gloss: "Adds methods to existing types with extension.",
          examples: [
            { code: `extension (s: String)
  def shout: String = s.toUpperCase + "!"
println("hey".shout)`, notes: [{ at: "extension", text: "adds methods to String" }] },
            { code: `extension (n: Int)
  def isEven: Boolean = n % 2 == 0
  def squared: Int = n * n
println(4.isEven)
println(3.squared)`, notes: [] },
            { code: `extension (d: Double)
  def round2: Double = (d * 100).round / 100.0
println(3.14159.round2)`, notes: [] }
          ]
        },
        {
          id: "generic-extensions", n: 2, title: "generic extensions", level: 2,
          gloss: "Writes extensions with type parameters.",
          examples: [
            { code: `extension [T](xs: List[T])
  def second: Option[T] = xs.drop(1).headOption
println(List(1, 2, 3).second)`, notes: [{ at: "[T]", text: "works for any element type" }] },
            { code: `extension [T](x: T)
  def pipe[R](f: T => R): R = f(x)
println(5.pipe(_ + 1))`, notes: [] },
            { code: `extension (xs: List[Int])
  def average: Double = xs.sum.toDouble / xs.length
println(List(1, 2, 3, 4).average)`, notes: [{ at: "List[Int]", text: "only for int lists" }] }
          ]
        },
        {
          id: "operators-and-custom", n: 3, title: "extensions on your own types", level: 2,
          gloss: "Adds operators and conversions to case classes.",
          examples: [
            { code: `case class Money(cents: Int)
extension (m: Money)
  def +(other: Money): Money = Money(m.cents + other.cents)
println(Money(5) + Money(7))`, notes: [{ at: "def +", text: "operator extension" }] },
            { code: `case class Vec(x: Int, y: Int)
extension (v: Vec)
  def *(k: Int): Vec = Vec(v.x * k, v.y * k)
println(Vec(1, 2) * 3)`, notes: [] },
            { code: `case class Temp(c: Double)
extension (t: Temp)
  def toF: Double = t.c * 9 / 5 + 32
println(Temp(100).toF)`, notes: [] }
          ]
        },
        {
          id: "grouped-extensions", n: 4, title: "grouped extensions and imports", level: 3,
          gloss: "Groups several methods in one extension and exports them from an object.",
          examples: [
            { code: `extension (s: String)
  def isPalindrome: Boolean = s == s.reverse
  def words: List[String] = s.split(" ").toList
println("level".isPalindrome)
println("a b c".words)`, notes: [{ at: "def words", text: "shares the receiver" }] },
            { code: `extension (xs: List[Int])
  def sumBy(f: Int => Int): Int = xs.map(f).sum
println(List(1, 2, 3).sumBy(_ * 10))`, notes: [] },
            { code: `object Syntax:
  extension (s: String) def twice: String = s + s
import Syntax.*
println("ab".twice)`, notes: [{ at: "import Syntax.*", text: "brings the extension in" }] }
          ]
        }
      ]
    },
    {
      id: "future",
      n: 13,
      title: "Future",
      concepts: [
        {
          id: "creating-futures", n: 1, title: "creating futures", level: 1,
          gloss: "Starts asynchronous work with Future and waits with Await.",
          examples: [
            { code: `import scala.concurrent.{Future, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.*
val f = Future(6 * 7)
println(Await.result(f, 1.second))`, notes: [{ at: "Future(6", text: "runs on the thread pool" }, { at: "Await.result", text: "blocks for the value" }] },
            { code: `import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
val done = Future.successful(1)
val failed = Future.failed(new RuntimeException("boom"))
println(done.isCompleted)`, notes: [{ at: "Future.successful", text: "already completed" }] },
            { code: `import scala.concurrent.{Future, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.*
val slow = Future { Thread.sleep(50); "done" }
println(Await.result(slow, 2.seconds))`, notes: [] }
          ]
        },
        {
          id: "transforming-futures", n: 2, title: "transforming futures", level: 2,
          gloss: "Chains results with map, flatMap and for.",
          examples: [
            { code: `import scala.concurrent.{Future, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.*
val f = Future(2).map(_ + 1)
println(Await.result(f, 1.second))`, notes: [{ at: "map", text: "transforms the eventual value" }] },
            { code: `import scala.concurrent.{Future, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.*
val total = for
  a <- Future(1)
  b <- Future(2)
yield a + b
println(Await.result(total, 1.second))`, notes: [] },
            { code: `import scala.concurrent.{Future, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.*
val f = Future(10).flatMap(n => Future(n * 2))
println(Await.result(f, 1.second))`, notes: [{ at: "flatMap", text: "next step returns a Future" }] }
          ]
        },
        {
          id: "combining-futures", n: 3, title: "combining futures and handling errors", level: 2,
          gloss: "Collects several futures and recovers from failures.",
          examples: [
            { code: `import scala.concurrent.{Future, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.*
val all = Future.sequence(List(Future(1), Future(2)))
println(Await.result(all, 1.second))`, notes: [{ at: "Future.sequence", text: "list of futures to future of list" }] },
            { code: `import scala.concurrent.{Future, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.*
val safe = Future(1 / 0).recover { case _: ArithmeticException => -1 }
println(Await.result(safe, 1.second))`, notes: [{ at: "recover", text: "value instead of a failure" }] },
            { code: `import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
Future(10).onComplete(r => println(r))
Thread.sleep(100)`, notes: [{ at: "onComplete", text: "callback with a Try" }] }
          ]
        },
        {
          id: "promises-parallelism", n: 4, title: "promises and parallel futures", level: 3,
          gloss: "Completes futures by hand and runs independent futures in parallel.",
          examples: [
            { code: `import scala.concurrent.{Promise, Await}
import scala.concurrent.duration.*
val p = Promise[Int]()
p.success(42)
println(Await.result(p.future, 1.second))`, notes: [{ at: "Promise", text: "a future you complete yourself" }] },
            { code: `import scala.concurrent.{Future, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.*
val a = Future { Thread.sleep(50); 1 }
val b = Future { Thread.sleep(50); 2 }
val sum = for x <- a; y <- b yield x + y
println(Await.result(sum, 2.seconds))`, notes: [{ at: "val b", text: "started before the for" }] },
            { code: `import scala.concurrent.{Future, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.*
val results = Future.traverse(List(1, 2, 3))(n => Future(n * n))
println(Await.result(results, 1.second))`, notes: [{ at: "traverse", text: "map then sequence" }] }
          ]
        }
      ]
    }
  ]
};
