export default {
  id: "kotlin",
  name: "Kotlin",
  short: "KT",
  pigment: "kotlin",
  family: null,
  version: "2.4",
  lexer: "kotlin",
  indent: 4,
  topics: [
    {
      id: "val-var-types",
      n: 1,
      title: "val, var & types",
      concepts: [
        {
          id: "val-and-var", n: 1, title: "val and var", level: 1,
          gloss: "Binds a name to a value with val for read-only or var for mutable.",
          examples: [
            { code: `val city = "Oslo"
var visits = 0`, notes: [{ at: "val", text: "cannot be reassigned" }, { at: "var", text: "can be reassigned" }] },
            { code: `val limit = 10
var attempts = limit`, notes: [] },
            { code: `val names = listOf("ada", "grace")
var current = names.first()`, notes: [{ at: "listOf", text: "a read-only list" }] }
          ]
        },
        {
          id: "types-and-inference", n: 2, title: "types and inference", level: 1,
          gloss: "Lets the compiler infer a type or states one explicitly after a colon.",
          examples: [
            { code: `val count: Int = 42
val price: Double = 9.99
val flag: Boolean = true`, notes: [{ at: ": Int", text: "explicit type" }] },
            { code: `val ratio = 3 / 4
val exact = 3 / 4.0`, notes: [{ at: "3 / 4", text: "integer division gives 0" }] },
            { code: `val letter: Char = 'k'
val big: Long = 3_000_000_000
val small: Byte = 127`, notes: [{ at: "3_000_000_000", text: "underscores group digits" }] }
          ]
        },
        {
          id: "numeric-conversion", n: 3, title: "numeric conversion", level: 1,
          gloss: "Converts between number types with explicit conversion functions.",
          examples: [
            { code: `val whole = 7
val half = whole.toDouble() / 2`, notes: [{ at: "toDouble", text: "no implicit widening" }] },
            { code: `val text = "42"
val n = text.toInt()
val maybe = "x1".toIntOrNull()`, notes: [{ at: "toIntOrNull", text: "null on bad input" }] },
            { code: `val total = 5L + 3
val asInt = total.toInt()
val hex = 0xFF
val bits = 0b1010`, notes: [] }
          ]
        },
        {
          id: "const-and-lateinit", n: 4, title: "const and lateinit", level: 2,
          gloss: "Declares compile-time constants and properties that are assigned later.",
          examples: [
            { code: `const val MAX_USERS = 100
const val BASE_URL = "https://example.com"`, notes: [{ at: "const val", text: "compile-time constant" }] },
            { code: `class Session {
    lateinit var token: String
}`, notes: [{ at: "lateinit", text: "assigned after construction" }] },
            { code: `object Config {
    const val VERSION = "2.4"
    val retries = 3
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "strings-templates",
      n: 2,
      title: "strings & templates",
      concepts: [
        {
          id: "string-templates", n: 1, title: "string templates", level: 1,
          gloss: "Embeds variables and expressions in strings with a dollar sign.",
          examples: [
            { code: `val name = "ada"
val greeting = "Hello, $name"
val total = "Sum: \${2 + 3}"`, notes: [{ at: "$name", text: "simple variable" }, { at: "${2 + 3}", text: "any expression" }] },
            { code: `val items = listOf("tea", "cake")
val line = "Order has \${items.size} items"`, notes: [] },
            { code: `val price = 4.5
val label = "Price: $price EUR"
val shout = "\${label.uppercase()}!"`, notes: [] }
          ]
        },
        {
          id: "raw-strings", n: 2, title: "raw strings", level: 2,
          gloss: "Writes multiline text in triple quotes and trims its indentation.",
          examples: [
            { code: `val sql = """
    SELECT id
    FROM users
""".trimIndent()`, notes: [{ at: "trimIndent", text: "removes common indent" }] },
            { code: `val path = """C:\\temp\\logs"""`, notes: [{ at: "\"\"\"", text: "no escapes needed" }] },
            { code: `val text = """
    |first
    |second
""".trimMargin()`, notes: [{ at: "trimMargin", text: "strips up to the pipe" }] }
          ]
        },
        {
          id: "string-functions", n: 3, title: "string functions", level: 1,
          gloss: "Transforms and inspects strings with standard library functions.",
          examples: [
            { code: `val title = "  Report  "
val trimmed = title.trim()
val upper = trimmed.uppercase()`, notes: [{ at: "trim", text: "removes outer whitespace" }] },
            { code: `val csv = "ada,grace,linus"
val parts = csv.split(",")
val joined = parts.joinToString(" | ")`, notes: [{ at: "split", text: "returns a list" }] },
            { code: `val file = "report.pdf"
val isPdf = file.endsWith(".pdf")
val stem = file.substringBeforeLast(".")
val padded = "7".padStart(3, '0')`, notes: [{ at: "padStart", text: "pads on the left" }] }
          ]
        },
        {
          id: "characters-and-indexing", n: 4, title: "characters and indexing", level: 1,
          gloss: "Reads single characters by index and processes a string as a sequence.",
          examples: [
            { code: `val word = "kotlin"
val first = word[0]
val last = word.last()`, notes: [{ at: "word[0]", text: "index operator" }] },
            { code: `val word = "banana"
val count = word.count { it == 'a' }
val reversed = word.reversed()`, notes: [{ at: "count {", text: "counts matching chars" }] },
            { code: `val letters = "abc".toList()
val code = 'a'.code
val back = 97.toChar()`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "null-safety",
      n: 3,
      title: "null safety",
      concepts: [
        {
          id: "nullable-types", n: 1, title: "nullable types", level: 1,
          gloss: "Marks values that may be absent by adding a question mark to the type.",
          examples: [
            { code: `var nickname: String? = null
nickname = "ada"`, notes: [{ at: "String?", text: "may hold null" }] },
            { code: `val age: Int? = "42".toIntOrNull()
val tags: List<String>? = null`, notes: [] },
            { code: `fun find(users: Map<String, String>, id: String): String? {
    return users[id]
}`, notes: [{ at: "users[id]", text: "map lookups are nullable" }] }
          ]
        },
        {
          id: "safe-call-and-elvis", n: 2, title: "safe calls and elvis", level: 1,
          gloss: "Handles null with the safe call operator and the elvis fallback.",
          examples: [
            { code: `val name: String? = null
val size = name?.length
val label = name ?: "guest"`, notes: [{ at: "?.", text: "null when the receiver is null" }, { at: "?:", text: "fallback value" }] },
            { code: `fun describe(city: String?): String {
    return city?.uppercase() ?: "unknown"
}`, notes: [] },
            { code: `val input: String? = readLine()
val length = input?.trim()?.length ?: 0`, notes: [{ at: "?.trim()?.", text: "safe calls chain" }] }
          ]
        },
        {
          id: "assertions-and-smart-casts", n: 3, title: "assertions and smart casts", level: 2,
          gloss: "Narrows nullable types with checks or asserts non-null with a double bang.",
          examples: [
            { code: `fun parse(raw: String?): Int {
    return raw!!.toInt()
}`, notes: [{ at: "!!", text: "throws if null" }] },
            { code: `fun shout(text: String?) {
    if (text != null) {
        println(text.uppercase())
    }
}`, notes: [{ at: "text != null", text: "smart cast to String" }] },
            { code: `fun length(value: Any): Int {
    return if (value is String) value.length else 0
}`, notes: [{ at: "is String", text: "smart cast inside the branch" }] }
          ]
        },
        {
          id: "let-and-require", n: 4, title: "let and requireNotNull", level: 2,
          gloss: "Runs code only for non-null values or fails fast with a message.",
          examples: [
            { code: `val email: String? = "ada@example.com"
email?.let { println("Sending to $it") }`, notes: [{ at: "let", text: "runs only when non-null" }] },
            { code: `fun send(to: String?) {
    val target = requireNotNull(to) { "address missing" }
    println(target)
}`, notes: [{ at: "requireNotNull", text: "throws IllegalArgumentException" }] },
            { code: `val values = listOf("1", "x", "3")
val numbers = values.mapNotNull { it.toIntOrNull() }`, notes: [{ at: "mapNotNull", text: "drops null results" }] }
          ]
        }
      ]
    },
    {
      id: "functions-default-arguments",
      n: 4,
      title: "functions & default arguments",
      concepts: [
        {
          id: "declaring-functions", n: 1, title: "declaring functions", level: 1,
          gloss: "Defines functions with block bodies or a single expression.",
          examples: [
            { code: `fun square(n: Int): Int {
    return n * n
}`, notes: [] },
            { code: `fun area(w: Double, h: Double) = w * h`, notes: [{ at: "=", text: "expression body" }] },
            { code: `fun log(message: String) {
    println("[log] $message")
}`, notes: [{ at: "log(message: String)", text: "returns Unit" }] }
          ]
        },
        {
          id: "default-arguments", n: 2, title: "default arguments", level: 1,
          gloss: "Gives parameters default values so callers can leave them out.",
          examples: [
            { code: `fun greet(name: String, greeting: String = "Hello"): String {
    return "$greeting, $name"
}`, notes: [{ at: "= \"Hello\"", text: "default value" }] },
            { code: `fun connect(host: String, port: Int = 80, secure: Boolean = false) {
    println("$host:$port $secure")
}`, notes: [] },
            { code: `fun pad(text: String, width: Int = 8, fill: Char = ' '): String {
    return text.padStart(width, fill)
}`, notes: [] }
          ]
        },
        {
          id: "named-arguments", n: 3, title: "named arguments", level: 2,
          gloss: "Passes arguments by parameter name in any order.",
          examples: [
            { code: `fun connect(host: String, port: Int = 80) = "$host:$port"
val url = connect(host = "example.com", port = 8080)`, notes: [{ at: "host =", text: "named argument" }] },
            { code: `fun box(width: Int, height: Int, depth: Int = 1): Int {
    return width * height * depth
}
val volume = box(height = 2, width = 3)`, notes: [{ at: "height = 2", text: "order does not matter" }] },
            { code: `fun price(amount: Double, digits: Int = 2, unit: String = "EUR") =
    "%.\${digits}f $unit".format(amount)
val text = price(9.5, unit = "USD")`, notes: [{ at: "unit =", text: "skips digits" }] }
          ]
        },
        {
          id: "vararg-parameters", n: 4, title: "vararg parameters", level: 2,
          gloss: "Accepts any number of arguments and spreads arrays into them.",
          examples: [
            { code: `fun sum(vararg numbers: Int): Int {
    return numbers.sum()
}`, notes: [{ at: "vararg", text: "arrives as an IntArray" }] },
            { code: `fun tags(vararg names: String) = names.joinToString(", ")
val all = tags("a", "b", "c")`, notes: [] },
            { code: `fun total(vararg values: Int) = values.sum()
val data = intArrayOf(1, 2, 3)
val result = total(*data)`, notes: [{ at: "*", text: "spread operator" }] }
          ]
        }
      ]
    },
    {
      id: "lambdas-higher-order-functions",
      n: 5,
      title: "lambdas & higher-order functions",
      concepts: [
        {
          id: "lambda-syntax", n: 1, title: "lambda syntax", level: 1,
          gloss: "Writes anonymous functions in braces with an arrow.",
          examples: [
            { code: `val doubler = { n: Int -> n * 2 }`, notes: [{ at: "->", text: "separates parameters from body" }] },
            { code: `val greet: (String) -> String = { name -> "Hello, $name" }`, notes: [{ at: "(String) -> String", text: "function type" }] },
            { code: `val add = { a: Int, b: Int -> a + b }
val sum = add(2, 3)`, notes: [] }
          ]
        },
        {
          id: "it-and-trailing-lambdas", n: 2, title: "it and trailing lambdas", level: 1,
          gloss: "Uses the implicit it parameter and moves lambdas outside the parentheses.",
          examples: [
            { code: `val numbers = listOf(1, 2, 3)
val doubled = numbers.map { it * 2 }`, notes: [{ at: "it", text: "single implicit parameter" }] },
            { code: `val names = listOf("ada", "grace")
names.forEach { println(it) }`, notes: [{ at: "forEach {", text: "trailing lambda" }] },
            { code: `val words = listOf("kotlin", "java")
val longest = words.maxByOrNull { it.length }`, notes: [] }
          ]
        },
        {
          id: "higher-order-functions", n: 3, title: "higher-order functions", level: 2,
          gloss: "Accepts or returns functions as values.",
          examples: [
            { code: `fun apply(n: Int, op: (Int) -> Int): Int {
    return op(n)
}`, notes: [{ at: "op: (Int) -> Int", text: "function parameter" }] },
            { code: `fun repeatAction(times: Int, action: () -> Unit) {
    for (i in 1..times) action()
}`, notes: [] },
            { code: `fun compose(f: (Int) -> Int, g: (Int) -> Int): (Int) -> Int {
    return { x -> g(f(x)) }
}`, notes: [{ at: "return {", text: "returns a lambda" }] }
          ]
        },
        {
          id: "references-and-closures", n: 4, title: "function references and closures", level: 2,
          gloss: "Passes named functions with double colon and captures outer variables.",
          examples: [
            { code: `fun isEven(n: Int) = n % 2 == 0
val evens = listOf(1, 2, 3, 4).filter(::isEven)`, notes: [{ at: "::isEven", text: "function reference" }] },
            { code: `fun counter(): () -> Int {
    var count = 0
    return { count++ }
}`, notes: [{ at: "count", text: "captured and mutated" }] },
            { code: `val lengths = listOf("a", "bb").map(String::length)
val trimmed = listOf(" a ", "b ").map(String::trim)`, notes: [{ at: "String::length", text: "member reference" }] }
          ]
        }
      ]
    },
    {
      id: "list-map-set",
      n: 6,
      title: "List, Map, Set",
      concepts: [
        {
          id: "lists", n: 1, title: "lists", level: 1,
          gloss: "Stores ordered items in read-only or mutable lists.",
          examples: [
            { code: `val scores = listOf(90, 72, 85)
val top = scores.first()`, notes: [{ at: "listOf", text: "read-only" }] },
            { code: `val names = mutableListOf("ada", "grace")
names.add("linus")
names.remove("grace")`, notes: [{ at: "mutableListOf", text: "can change" }] },
            { code: `val squares = List(5) { it * it }
val last = squares.last()
val size = squares.size`, notes: [{ at: "List(5) {", text: "builds from the index" }] }
          ]
        },
        {
          id: "maps", n: 2, title: "maps", level: 1,
          gloss: "Associates keys with values using to pairs.",
          examples: [
            { code: `val stock = mapOf("apple" to 4, "pear" to 0)
val apples = stock["apple"]`, notes: [{ at: "to", text: "builds a key-value pair" }] },
            { code: `val prices = mutableMapOf("tea" to 2.5)
prices["cake"] = 4.0
prices.remove("tea")`, notes: [] },
            { code: `val ages = mapOf("ada" to 36, "linus" to 54)
for ((name, age) in ages) {
    println("$name: $age")
}`, notes: [{ at: "(name, age)", text: "destructures each entry" }] }
          ]
        },
        {
          id: "sets", n: 3, title: "sets", level: 1,
          gloss: "Keeps unique items and combines sets with infix operations.",
          examples: [
            { code: `val tags = mutableSetOf("kotlin", "web")
tags.add("kotlin")
tags.add("cli")`, notes: [{ at: "add", text: "ignores duplicates" }] },
            { code: `val a = setOf(1, 2, 3)
val b = setOf(3, 4)
val both = a intersect b
val either = a union b`, notes: [{ at: "intersect", text: "infix function" }] },
            { code: `val seen = mutableSetOf<Int>()
val isNew = seen.add(7)`, notes: [{ at: "add", text: "returns false if present" }] }
          ]
        },
        {
          id: "ranges", n: 4, title: "ranges and progressions", level: 1,
          gloss: "Builds sequences of numbers with .., downTo, until and step.",
          examples: [
            { code: `val digits = 0..9
val countdown = 10 downTo 1`, notes: [{ at: "..", text: "inclusive range" }] },
            { code: `val evens = 0..20 step 2
val half = 0 until 5`, notes: [{ at: "until", text: "excludes the end" }] },
            { code: `for (i in 1..3) {
    println(i)
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "collection-operations",
      n: 7,
      title: "collection operations",
      concepts: [
        {
          id: "map-and-filter", n: 1, title: "map and filter", level: 1,
          gloss: "Transforms and selects elements with map and filter.",
          examples: [
            { code: `val prices = listOf(5.0, 12.5, 8.0)
val cheap = prices.filter { it < 10 }
val labels = prices.map { "$it EUR" }`, notes: [{ at: "filter", text: "keeps matches" }, { at: "map", text: "transforms each element" }] },
            { code: `val users = listOf("ada", "grace", "linus")
val short = users.filter { it.length <= 4 }`, notes: [] },
            { code: `val nums = listOf(1, 2, 3, 4, 5, 6)
val evenSquares = nums.filter { it % 2 == 0 }.map { it * it }`, notes: [] }
          ]
        },
        {
          id: "aggregation", n: 2, title: "aggregation", level: 1,
          gloss: "Reduces a collection to one value with sum, fold and counting functions.",
          examples: [
            { code: `val nums = listOf(3, 5, 7)
val total = nums.sum()
val average = nums.average()`, notes: [] },
            { code: `val words = listOf("a", "bb", "ccc")
val chars = words.fold(0) { acc, w -> acc + w.length }`, notes: [{ at: "fold", text: "starts from an initial value" }] },
            { code: `val prices = listOf(5, 9, 2)
val highest = prices.max()
val count = prices.count { it > 3 }`, notes: [] }
          ]
        },
        {
          id: "grouping", n: 3, title: "grouping and splitting", level: 2,
          gloss: "Splits and groups elements with groupBy, associateWith and partition.",
          examples: [
            { code: `val words = listOf("apple", "avocado", "banana")
val byLetter = words.groupBy { it.first() }`, notes: [{ at: "groupBy", text: "map of key to list" }] },
            { code: `val names = listOf("ada", "grace")
val lengths = names.associateWith { it.length }`, notes: [{ at: "associateWith", text: "element to value" }] },
            { code: `val nums = listOf(1, 2, 3, 4)
val (even, odd) = nums.partition { it % 2 == 0 }`, notes: [{ at: "partition", text: "pair of lists" }] }
          ]
        },
        {
          id: "sorting-and-slicing", n: 4, title: "sorting and slicing", level: 1,
          gloss: "Orders and slices collections with sorted, take, drop and zip.",
          examples: [
            { code: `val names = listOf("grace", "ada", "linus")
val sorted = names.sorted()
val byLength = names.sortedBy { it.length }`, notes: [{ at: "sortedBy", text: "sorts by a key" }] },
            { code: `val nums = listOf(5, 3, 9, 1)
val top = nums.sortedDescending().take(2)`, notes: [] },
            { code: `val items = listOf("a", "b", "c", "d")
val firstTwo = items.take(2)
val rest = items.drop(2)
val pairs = items.zip(listOf(1, 2, 3, 4))`, notes: [] }
          ]
        },
        {
          id: "sequences", n: 5, title: "sequences", level: 3,
          gloss: "Processes elements lazily with sequences.",
          examples: [
            { code: `val firstBig = generateSequence(1) { it * 2 }
    .first { it > 1000 }`, notes: [{ at: "generateSequence", text: "infinite until stopped" }] },
            { code: `val result = (1..1_000_000).asSequence()
    .map { it * 2 }
    .filter { it % 3 == 0 }
    .take(3)
    .toList()`, notes: [{ at: "asSequence", text: "evaluates lazily" }] },
            { code: `val lines = listOf("a", "", "b")
val kept = lines.asSequence().filter { it.isNotEmpty() }.toList()`, notes: [] }
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
          id: "classes-and-constructors", n: 1, title: "classes and constructors", level: 1,
          gloss: "Declares classes with primary constructor properties.",
          examples: [
            { code: `class User(val name: String, var age: Int)`, notes: [{ at: "val name", text: "read-only property" }, { at: "var age", text: "mutable property" }] },
            { code: `class Rectangle(val width: Double, val height: Double) {
    fun area() = width * height
}`, notes: [] },
            { code: `class Counter {
    var value = 0
    fun increment() {
        value++
    }
}`, notes: [] }
          ]
        },
        {
          id: "custom-accessors", n: 2, title: "getters and setters", level: 2,
          gloss: "Computes or validates a property with custom get and set.",
          examples: [
            { code: `class Circle(val radius: Double) {
    val area: Double
        get() = 3.14159 * radius * radius
}`, notes: [{ at: "get()", text: "computed on each read" }] },
            { code: `class Temperature {
    var celsius = 20.0
        set(value) {
            field = value.coerceAtLeast(-273.15)
        }
}`, notes: [{ at: "field", text: "the backing field" }] },
            { code: `class Person(val first: String, val last: String) {
    val fullName get() = "$first $last"
}`, notes: [] }
          ]
        },
        {
          id: "init-and-secondary", n: 3, title: "init blocks and secondary constructors", level: 2,
          gloss: "Validates in init and adds alternative constructors.",
          examples: [
            { code: `class Port(val value: Int) {
    init {
        require(value in 1..65535) { "bad port" }
    }
}`, notes: [{ at: "init", text: "runs with the primary constructor" }] },
            { code: `class Point(val x: Int, val y: Int) {
    constructor() : this(0, 0)
}`, notes: [{ at: "constructor()", text: "secondary constructor" }] },
            { code: `class Greeter(private val name: String) {
    fun greet() = "Hello, $name"
}`, notes: [{ at: "private val", text: "hidden property" }] }
          ]
        },
        {
          id: "inheritance-and-visibility", n: 4, title: "inheritance and visibility", level: 2,
          gloss: "Extends open classes and hides state with visibility modifiers.",
          examples: [
            { code: `open class Animal {
    open fun speak() = "..."
}
class Dog : Animal() {
    override fun speak() = "woof"
}`, notes: [{ at: "open", text: "allows subclassing" }, { at: "override", text: "replaces the parent member" }] },
            { code: `abstract class Shape {
    abstract fun area(): Double
}
class Square(val side: Double) : Shape() {
    override fun area() = side * side
}`, notes: [] },
            { code: `class Wallet {
    private var cents = 0
    fun add(amount: Int) {
        cents += amount
    }
    fun total() = cents
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "data-classes",
      n: 9,
      title: "data classes",
      concepts: [
        {
          id: "declaring-data-classes", n: 1, title: "declaring data classes", level: 1,
          gloss: "Generates equals, toString and copy from constructor properties.",
          examples: [
            { code: `data class User(val name: String, val age: Int)`, notes: [{ at: "data", text: "generates members" }] },
            { code: `data class Point(val x: Int, val y: Int)
val origin = Point(0, 0)`, notes: [] },
            { code: `data class Product(
    val sku: String,
    val price: Double,
    val stock: Int = 0,
)`, notes: [{ at: "stock: Int = 0", text: "default value" }] }
          ]
        },
        {
          id: "copy-and-equality", n: 2, title: "copy and equality", level: 1,
          gloss: "Copies instances with changes and compares them by value.",
          examples: [
            { code: `data class User(val name: String, val age: Int)
val ada = User("ada", 36)
val older = ada.copy(age = 37)`, notes: [{ at: "copy", text: "new instance, changed fields" }] },
            { code: `data class Point(val x: Int, val y: Int)
val same = Point(1, 2) == Point(1, 2)`, notes: [{ at: "==", text: "compares property values" }] },
            { code: `data class Order(val id: Int, val total: Double)
val first = Order(1, 9.5)
val second = first.copy(id = 2)`, notes: [] }
          ]
        },
        {
          id: "destructuring-and-tuples", n: 3, title: "destructuring", level: 2,
          gloss: "Unpacks data classes, pairs and triples into variables.",
          examples: [
            { code: `data class Point(val x: Int, val y: Int)
val (x, y) = Point(3, 4)`, notes: [{ at: "(x, y)", text: "componentN functions" }] },
            { code: `val pair = Pair("ada", 36)
val (name, age) = pair`, notes: [] },
            { code: `val triple = Triple(1, "one", 1.0)
val (id, label, ratio) = triple`, notes: [] }
          ]
        },
        {
          id: "data-in-collections", n: 4, title: "data classes in collections", level: 2,
          gloss: "Sorts lists of data objects, removes duplicates and sums fields.",
          examples: [
            { code: `data class Item(val name: String, val qty: Int)
val items = listOf(Item("pen", 3), Item("ink", 1))
val sorted = items.sortedBy { it.qty }`, notes: [] },
            { code: `data class Tag(val label: String)
val unique = listOf(Tag("a"), Tag("a"), Tag("b")).distinct()`, notes: [{ at: "distinct", text: "uses value equality" }] },
            { code: `data class Row(val city: String, val sales: Int)
val rows = listOf(Row("Oslo", 3), Row("Rome", 5))
val total = rows.sumOf { it.sales }`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "sealed-classes-when",
      n: 10,
      title: "sealed classes & when",
      concepts: [
        {
          id: "when-expressions", n: 1, title: "when expressions", level: 1,
          gloss: "Chooses a value with when instead of a chain of ifs.",
          examples: [
            { code: `fun describe(n: Int) = when {
    n < 0 -> "negative"
    n == 0 -> "zero"
    else -> "positive"
}`, notes: [{ at: "when", text: "expression with a value" }] },
            { code: `fun label(code: Int): String = when (code) {
    200 -> "ok"
    404 -> "not found"
    else -> "other"
}`, notes: [] },
            { code: `fun kind(x: Any) = when (x) {
    is Int -> "int"
    is String -> "string"
    else -> "other"
}`, notes: [{ at: "is Int", text: "type check branch" }] }
          ]
        },
        {
          id: "when-ranges", n: 2, title: "ranges and multiple conditions", level: 1,
          gloss: "Matches ranges and several values in a single when branch.",
          examples: [
            { code: `fun grade(score: Int) = when (score) {
    in 90..100 -> "A"
    in 80..89 -> "B"
    else -> "C"
}`, notes: [{ at: "in 90..100", text: "range branch" }] },
            { code: `fun weekend(day: String) = when (day) {
    "sat", "sun" -> true
    else -> false
}`, notes: [{ at: "\"sat\", \"sun\"", text: "several values" }] },
            { code: `fun size(list: List<Int>) = when {
    list.isEmpty() -> "none"
    list.size == 1 -> "one"
    else -> "many"
}`, notes: [] }
          ]
        },
        {
          id: "sealed-types", n: 3, title: "sealed classes and interfaces", level: 2,
          gloss: "Restricts a hierarchy to a known set of subtypes.",
          examples: [
            { code: `sealed class Result
data class Success(val value: Int) : Result()
data class Failure(val message: String) : Result()`, notes: [{ at: "sealed", text: "subclasses known at compile time" }] },
            { code: `sealed interface Shape
data class Circle(val r: Double) : Shape
data class Square(val side: Double) : Shape`, notes: [] },
            { code: `sealed class Event {
    data object Click : Event()
    data class Key(val code: Int) : Event()
}`, notes: [{ at: "data object", text: "singleton with toString" }] }
          ]
        },
        {
          id: "exhaustive-when", n: 4, title: "exhaustive when", level: 3,
          gloss: "Covers every sealed subtype without an else branch.",
          examples: [
            { code: `sealed interface Shape
data class Circle(val r: Double) : Shape
data class Square(val side: Double) : Shape
fun area(s: Shape) = when (s) {
    is Circle -> 3.14159 * s.r * s.r
    is Square -> s.side * s.side
}`, notes: [{ at: "when (s)", text: "compiler checks every case" }] },
            { code: `sealed class Result
data class Ok(val value: Int) : Result()
data object Empty : Result()
fun show(r: Result) = when (r) {
    is Ok -> "value \${r.value}"
    Empty -> "empty"
}`, notes: [{ at: "Empty", text: "object compared directly" }] },
            { code: `sealed interface Light
data object Red : Light
data object Green : Light
fun action(l: Light) = when (l) {
    Red -> "stop"
    Green -> "go"
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "interfaces-objects",
      n: 11,
      title: "interfaces & objects",
      concepts: [
        {
          id: "interfaces", n: 1, title: "interfaces", level: 1,
          gloss: "Declares contracts that classes implement with override.",
          examples: [
            { code: `interface Greeter {
    fun greet(name: String): String
}
class Formal : Greeter {
    override fun greet(name: String) = "Good day, $name"
}`, notes: [{ at: ": Greeter", text: "implements the interface" }] },
            { code: `interface Shape {
    val sides: Int
    fun describe() = "$sides sides"
}
class Triangle : Shape {
    override val sides = 3
}`, notes: [{ at: "fun describe", text: "default implementation" }] },
            { code: `interface Logger {
    fun log(message: String)
}
class ConsoleLogger : Logger {
    override fun log(message: String) = println(message)
}`, notes: [] }
          ]
        },
        {
          id: "object-declarations", n: 2, title: "object declarations", level: 2,
          gloss: "Creates a singleton with the object keyword.",
          examples: [
            { code: `object Registry {
    val items = mutableListOf<String>()
    fun add(item: String) = items.add(item)
}`, notes: [{ at: "object", text: "single instance" }] },
            { code: `object Config {
    const val NAME = "app"
    var debug = false
}`, notes: [] },
            { code: `object Clock {
    fun now() = System.currentTimeMillis()
}`, notes: [] }
          ]
        },
        {
          id: "companion-objects", n: 3, title: "companion objects", level: 2,
          gloss: "Attaches static-like members to a class with a companion object.",
          examples: [
            { code: `class User(val name: String) {
    companion object {
        fun guest() = User("guest")
    }
}`, notes: [{ at: "companion", text: "called as User.guest()" }] },
            { code: `class Temperature(val celsius: Double) {
    companion object {
        const val FREEZING = 0.0
        fun fromF(f: Double) = Temperature((f - 32) * 5 / 9)
    }
}`, notes: [] },
            { code: `class Id private constructor(val value: Int) {
    companion object {
        fun of(value: Int) = Id(value)
    }
}`, notes: [{ at: "private constructor", text: "only the companion builds it" }] }
          ]
        },
        {
          id: "expressions-and-delegation", n: 4, title: "object expressions and delegation", level: 3,
          gloss: "Builds anonymous objects and delegates to other objects or lazily.",
          examples: [
            { code: `interface Clickable { fun click() }
val button = object : Clickable {
    override fun click() = println("clicked")
}`, notes: [{ at: "object :", text: "anonymous implementation" }] },
            { code: `interface Printer { fun print(text: String) }
class Console : Printer {
    override fun print(text: String) = println(text)
}
class Report(printer: Printer) : Printer by printer`, notes: [{ at: "by printer", text: "forwards every member" }] },
            { code: `val config: String by lazy {
    println("loading")
    "ready"
}`, notes: [{ at: "by lazy", text: "computed on first access" }] }
          ]
        }
      ]
    },
    {
      id: "extension-functions",
      n: 12,
      title: "extension functions",
      concepts: [
        {
          id: "extension-functions", n: 1, title: "extension functions", level: 1,
          gloss: "Adds functions to an existing type without inheritance.",
          examples: [
            { code: `fun String.isBlankOrShort() = isBlank() || length < 3`, notes: [{ at: "String.", text: "receiver type" }] },
            { code: `fun Int.isEven() = this % 2 == 0`, notes: [{ at: "this", text: "the receiver" }] },
            { code: `fun String.initial(): Char? = firstOrNull()`, notes: [] }
          ]
        },
        {
          id: "extension-properties", n: 2, title: "extension properties", level: 2,
          gloss: "Adds computed properties to a type with a custom getter.",
          examples: [
            { code: `val String.lastChar: Char
    get() = this[length - 1]`, notes: [{ at: "get()", text: "extensions have no backing field" }] },
            { code: `val Int.squared: Int
    get() = this * this`, notes: [] },
            { code: `val List<Int>.total: Int
    get() = sum()`, notes: [] }
          ]
        },
        {
          id: "generic-nullable-extensions", n: 3, title: "generic and nullable receivers", level: 3,
          gloss: "Writes extensions for generic types and nullable receivers.",
          examples: [
            { code: `fun <T> List<T>.secondOrNull(): T? = if (size > 1) this[1] else null`, notes: [{ at: "<T>", text: "works for any element type" }] },
            { code: `fun String?.orEmptyTrim(): String = this?.trim() ?: ""`, notes: [{ at: "String?", text: "nullable receiver" }] },
            { code: `fun <T : Comparable<T>> List<T>.isSorted(): Boolean {
    return zipWithNext().all { (a, b) -> a <= b }
}`, notes: [{ at: "T : Comparable<T>", text: "bounded type" }] }
          ]
        },
        {
          id: "using-extensions", n: 4, title: "calling extensions", level: 2,
          gloss: "Calls extensions like members and builds small DSL helpers.",
          examples: [
            { code: `fun String.shout() = uppercase() + "!"
val loud = "hey".shout()`, notes: [] },
            { code: `fun Int.times(action: () -> Unit) {
    repeat(this) { action() }
}`, notes: [{ at: "repeat", text: "runs the block this many times" }] },
            { code: `fun Double.round2() = "%.2f".format(this)
val price = 3.14159.round2()`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "scope-functions",
      n: 13,
      title: "scope functions",
      concepts: [
        {
          id: "let-and-also", n: 1, title: "let and also", level: 1,
          gloss: "Runs a block on a value with it and returns the result or the value.",
          examples: [
            { code: `val name: String? = "ada"
name?.let { println(it.uppercase()) }`, notes: [{ at: "let", text: "returns the lambda result" }] },
            { code: `val user = "ada".also { println("created $it") }`, notes: [{ at: "also", text: "returns the receiver" }] },
            { code: `val length = "kotlin".let { it.length * 2 }`, notes: [] }
          ]
        },
        {
          id: "apply-and-with", n: 2, title: "apply and with", level: 2,
          gloss: "Configures an object with apply or builds a value with with.",
          examples: [
            { code: `class Config {
    var host = ""
    var port = 0
}
val config = Config().apply {
    host = "localhost"
    port = 8080
}`, notes: [{ at: "apply", text: "returns the receiver" }] },
            { code: `val builder = StringBuilder().apply {
    append("a")
    append("b")
}`, notes: [] },
            { code: `val text = with(StringBuilder()) {
    append("total: ")
    append(42)
    toString()
}`, notes: [{ at: "with", text: "returns the last expression" }] }
          ]
        },
        {
          id: "run-and-takeif", n: 3, title: "run and takeIf", level: 2,
          gloss: "Groups statements with run and filters values with takeIf.",
          examples: [
            { code: `val result = run {
    val a = 2
    val b = 3
    a * b
}`, notes: [{ at: "run", text: "block as an expression" }] },
            { code: `val positive = 5.takeIf { it > 0 }
val negative = (-5).takeUnless { it > 0 }`, notes: [{ at: "takeIf", text: "null if the test fails" }] },
            { code: `val port = "8080".toIntOrNull()?.takeIf { it in 1..65535 }`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "coroutines-basics",
      n: 14,
      title: "coroutines basics",
      concepts: [
        {
          id: "suspend-functions", n: 1, title: "suspend functions", level: 2,
          gloss: "Declares functions that can pause without blocking a thread.",
          examples: [
            { code: `suspend fun fetchName(): String {
    delay(1000)
    return "ada"
}`, notes: [{ at: "suspend", text: "may pause" }, { at: "delay", text: "from kotlinx.coroutines" }] },
            { code: `suspend fun load(id: Int): String {
    delay(200)
    return "item $id"
}`, notes: [] },
            { code: `suspend fun load(id: Int): String {
    delay(200)
    return "item $id"
}
suspend fun total(): Int {
    val a = load(1).length
    val b = load(2).length
    return a + b
}`, notes: [{ at: "load(1)", text: "suspend call inside suspend" }] }
          ]
        },
        {
          id: "launch-and-runblocking", n: 2, title: "launch and runBlocking", level: 2,
          gloss: "Starts coroutines with launch inside a runBlocking scope.",
          examples: [
            { code: `fun main() = runBlocking {
    launch {
        delay(100)
        println("child")
    }
    println("parent")
}`, notes: [{ at: "runBlocking", text: "bridges to blocking code" }, { at: "launch", text: "fire and forget" }] },
            { code: `fun main() = runBlocking {
    val job = launch { delay(500) }
    job.join()
    println("done")
}`, notes: [{ at: "join", text: "waits for the job" }] },
            { code: `fun main() = runBlocking {
    repeat(3) { i ->
        launch { println("task $i") }
    }
}`, notes: [] }
          ]
        },
        {
          id: "async-and-await", n: 3, title: "async and await", level: 2,
          gloss: "Runs work concurrently and collects results with await.",
          examples: [
            { code: `fun main() = runBlocking {
    val a = async { 6 }
    val b = async { 7 }
    println(a.await() * b.await())
}`, notes: [{ at: "async", text: "returns a Deferred" }, { at: "await", text: "suspends for the result" }] },
            { code: `suspend fun both(): Pair<Int, Int> = coroutineScope {
    val x = async { 1 }
    val y = async { 2 }
    x.await() to y.await()
}`, notes: [{ at: "coroutineScope", text: "waits for its children" }] },
            { code: `fun main() = runBlocking {
    val deferred = async { "result" }
    println(deferred.await())
}`, notes: [] }
          ]
        },
        {
          id: "contexts-and-dispatchers", n: 4, title: "withContext and dispatchers", level: 3,
          gloss: "Switches the thread pool for a block with withContext.",
          examples: [
            { code: `suspend fun read(): String = withContext(Dispatchers.IO) {
    "data"
}`, notes: [{ at: "Dispatchers.IO", text: "blocking I/O pool" }] },
            { code: `suspend fun compute(): Int = withContext(Dispatchers.Default) {
    (1..100).sum()
}`, notes: [{ at: "Default", text: "for cpu-bound work" }] },
            { code: `suspend fun load(): String {
    val text = withContext(Dispatchers.IO) { "file" }
    return text.uppercase()
}`, notes: [] }
          ]
        }
      ]
    }
  ]
};
