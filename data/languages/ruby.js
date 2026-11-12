export default {
  id: "ruby",
  name: "Ruby",
  short: "RB",
  pigment: "ruby",
  family: null,
  version: "3.4",
  lexer: "ruby",
  indent: 2,
  topics: [
    {
      id: "variables-types",
      n: 1,
      title: "variables & types",
      concepts: [
        {
          id: "variables", n: 1, title: "variables and assignment", level: 1,
          gloss: "Binds names to values without declarations or types.",
          examples: [
            { code: `city = "Oslo"
visits = 0
visits += 1
puts "#{city}: #{visits}"`, notes: [{ at: "+=", text: "shorthand for visits + 1" }] },
            { code: `price = 9.99
quantity = 3
total = price * quantity
puts total`, notes: [] },
            { code: `a, b = 1, 2
a, b = b, a
puts a, b`, notes: [{ at: "a, b = b, a", text: "swaps without a temp" }] }
          ]
        },
        {
          id: "core-types", n: 2, title: "core types", level: 1,
          gloss: "Inspects the class of integers, floats, strings, booleans and nil.",
          examples: [
            { code: `puts 42.class
puts 3.14.class
puts "text".class
puts nil.class`, notes: [{ at: ".class", text: "every value is an object" }] },
            { code: `count = 42
ratio = 0.75
active = true
p [count.class, ratio.class, active.class]`, notes: [{ at: "true", text: "class is TrueClass" }] },
            { code: `big = 2**100
puts big
puts big.class`, notes: [{ at: "2**100", text: "integers grow without limit" }] }
          ]
        },
        {
          id: "conversions", n: 3, title: "conversions and arithmetic", level: 1,
          gloss: "Converts between numbers and strings and applies the arithmetic operators.",
          examples: [
            { code: `puts "42".to_i + 1
puts "3.5".to_f * 2
puts 7.to_s + "!"`, notes: [{ at: "to_i", text: "string to integer" }] },
            { code: `puts 7 / 2
puts 7 % 2
puts 7.fdiv(2)
puts 2**10`, notes: [{ at: "7 / 2", text: "integer division" }, { at: "fdiv", text: "float division" }] },
            { code: `puts Integer("42")
puts Float("1.5")
p Integer("abc", exception: false)`, notes: [{ at: "exception: false", text: "nil instead of raising" }] }
          ]
        },
        {
          id: "constants-and-nil", n: 4, title: "constants and nil", level: 1,
          gloss: "Defines constants and handles the absence of a value with nil.",
          examples: [
            { code: `MAX_USERS = 100
APP_NAME = "billing".freeze
puts MAX_USERS, APP_NAME`, notes: [{ at: "MAX_USERS", text: "capitalised name is a constant" }] },
            { code: `name = nil
puts name.nil?
p name.to_a`, notes: [{ at: "nil?", text: "predicate method ends in ?" }] },
            { code: `value = nil
label = value || "default"
other = value&.length
p label, other`, notes: [{ at: "||", text: "fallback for nil or false" }, { at: "&.", text: "safe navigation" }] }
          ]
        }
      ]
    },
    {
      id: "strings-symbols",
      n: 2,
      title: "strings & symbols",
      concepts: [
        {
          id: "literals-and-interpolation", n: 1, title: "literals and interpolation", level: 1,
          gloss: "Builds strings with double quotes that expand embedded expressions.",
          examples: [
            { code: `name = "ada"
puts "Hello, #{name}"
puts 'Hello, #{name}'`, notes: [{ at: "\"Hello, #{name}\"", text: "interpolation" }, { at: "'Hello, #{name}'", text: "no interpolation" }] },
            { code: `item = "tea"
qty = 3
puts "#{qty} x #{item}s = #{qty * 4}"`, notes: [] },
            { code: `puts "tab\\tseparated"
puts 'it\\'s here'
puts "She said \\"hi\\""`, notes: [{ at: "\\t", text: "escape only in double quotes" }] }
          ]
        },
        {
          id: "heredocs", n: 2, title: "heredocs", level: 2,
          gloss: "Writes multiline text with squiggly heredocs that strip indentation.",
          examples: [
            { code: `text = <<~TEXT
  Dear team,
    welcome aboard.
TEXT
puts text`, notes: [{ at: "<<~", text: "removes common indent" }] },
            { code: `sql = <<~'SQL'
  SELECT id, name
  FROM users
SQL
puts sql`, notes: [{ at: "<<~'SQL'", text: "quoted, no interpolation" }] },
            { code: `puts <<~EOS.upcase
  quiet words
EOS`, notes: [{ at: ".upcase", text: "method on the heredoc" }] }
          ]
        },
        {
          id: "string-methods", n: 3, title: "string methods", level: 1,
          gloss: "Handles trimming, splitting and searching with built-in string methods.",
          examples: [
            { code: `title = "  Quarterly Report  "
puts title.strip
puts title.strip.upcase`, notes: [{ at: "strip", text: "removes outer whitespace" }] },
            { code: `csv = "ada,grace,linus"
names = csv.split(",")
puts names.join(" | ")`, notes: [] },
            { code: `file = "report.final.pdf"
puts file.end_with?(".pdf")
puts file.start_with?("report")
puts file[0, 6]`, notes: [{ at: "file[0, 6]", text: "start and length" }] },
            { code: `text = "red apple, red car"
puts text.sub("red", "green")
puts text.gsub("red", "green")
puts text.index("apple")`, notes: [{ at: "sub", text: "first match only" }, { at: "gsub", text: "every match" }] }
          ]
        },
        {
          id: "symbols", n: 4, title: "symbols", level: 2,
          gloss: "Uses symbols as lightweight, immutable names.",
          examples: [
            { code: `status = :active
puts status.class
puts status == :active`, notes: [{ at: ":active", text: "a symbol" }] },
            { code: `p "ready".to_sym
puts :ready.to_s`, notes: [{ at: "to_sym", text: "string to symbol" }] },
            { code: `colors = %i[red green blue]
p colors
puts :a.object_id == :a.object_id`, notes: [{ at: "%i[red", text: "array of symbols" }, { at: "object_id", text: "same symbol, same object" }] }
          ]
        },
        {
          id: "mutation-and-freezing", n: 5, title: "mutable and frozen strings", level: 2,
          gloss: "Changes strings in place and locks them with freeze.",
          examples: [
            { code: `greeting = +"Hello"
greeting << ", world"
puts greeting`, notes: [{ at: "<<", text: "appends in place" }, { at: "+\"Hello\"", text: "unfrozen copy" }] },
            { code: `word = "ruby".dup
word.upcase!
puts word`, notes: [{ at: "upcase!", text: "bang changes the receiver" }] },
            { code: `LABEL = "fixed".freeze
puts LABEL.frozen?
puts LABEL.upcase`, notes: [{ at: "freeze", text: "blocks later changes" }] }
          ]
        }
      ]
    },
    {
      id: "arrays",
      n: 3,
      title: "arrays",
      concepts: [
        {
          id: "creating-and-reading", n: 1, title: "creating and reading arrays", level: 1,
          gloss: "Creates arrays and reads elements by index or range.",
          examples: [
            { code: `scores = [90, 72, 85]
puts scores.first
puts scores.last
puts scores[1]`, notes: [{ at: "scores[1]", text: "zero-based index" }] },
            { code: `names = %w[ada grace linus]
puts names.length
puts names[-1]`, notes: [{ at: "%w[ada", text: "array of words" }, { at: "[-1]", text: "counts from the end" }] },
            { code: `squares = Array.new(5) { |i| i * i }
p squares
p squares[1..3]`, notes: [{ at: "1..3", text: "slice by range" }] }
          ]
        },
        {
          id: "adding-and-removing", n: 2, title: "adding and removing", level: 1,
          gloss: "Grows and shrinks arrays at either end or at an index.",
          examples: [
            { code: `items = ["tea"]
items << "cake"
items.push("jam")
p items`, notes: [{ at: "<<", text: "append" }] },
            { code: `names = %w[ada grace linus]
names.delete("grace")
names.unshift("kay")
p names.pop`, notes: [{ at: "unshift", text: "add at the front" }] },
            { code: `queue = [1, 2, 3]
first = queue.shift
queue.insert(1, 9)
p first, queue`, notes: [{ at: "shift", text: "remove from the front" }] }
          ]
        },
        {
          id: "iterating-and-searching", n: 3, title: "iterating and searching", level: 1,
          gloss: "Walks arrays with blocks and finds elements.",
          examples: [
            { code: `%w[ada grace].each_with_index do |name, i|
  puts "#{i}: #{name}"
end`, notes: [{ at: "each_with_index", text: "element and position" }] },
            { code: `nums = [3, 8, 1, 9]
puts nums.include?(8)
puts nums.index(1)
puts nums.max`, notes: [] },
            { code: `nums = [3, 8, 1, 9]
p nums.sort
p nums.sort_by { |n| -n }
p nums.minmax`, notes: [{ at: "sort_by", text: "sort by a computed key" }] }
          ]
        },
        {
          id: "slicing-and-combining", n: 4, title: "slicing and combining", level: 2,
          gloss: "Combines arrays with set operators and splits them into parts.",
          examples: [
            { code: `a = [1, 2, 3]
b = [3, 4]
p a + b
p a & b
p a | b`, notes: [{ at: "&", text: "intersection" }, { at: "|", text: "union" }] },
            { code: `words = %w[a b c d e]
p words.take(2)
p words.drop(3)
p words.each_slice(2).to_a`, notes: [{ at: "each_slice", text: "chunks of two" }] },
            { code: `first, *rest = [1, 2, 3]
p first, rest
p [[1, 2], [3]].flatten`, notes: [{ at: "*rest", text: "collects the remainder" }] }
          ]
        }
      ]
    },
    {
      id: "hashes",
      n: 4,
      title: "hashes",
      concepts: [
        {
          id: "hash-basics", n: 1, title: "hash basics", level: 1,
          gloss: "Stores key-value pairs with string or symbol keys.",
          examples: [
            { code: `stock = { "apple" => 4, "pear" => 0 }
stock["plum"] = 7
puts stock["apple"]`, notes: [{ at: "=>", text: "key to value" }] },
            { code: `user = { name: "ada", age: 36 }
puts user[:name]
user[:email] = "ada@example.com"`, notes: [{ at: "name:", text: "symbol key shorthand" }] },
            { code: `prices = Hash.new(0)
prices[:tea] += 3
p prices`, notes: [{ at: "Hash.new(0)", text: "default for missing keys" }] }
          ]
        },
        {
          id: "reading-hashes", n: 2, title: "reading and fetching", level: 1,
          gloss: "Reads values safely with fetch, dig and key checks.",
          examples: [
            { code: `config = { port: 8080 }
puts config.fetch(:port)
puts config.fetch(:host, "localhost")`, notes: [{ at: "fetch", text: "default or KeyError" }] },
            { code: `user = { name: "ada", address: { city: "Oslo" } }
puts user.dig(:address, :city)`, notes: [{ at: "dig", text: "safe nested lookup" }] },
            { code: `h = { a: 1 }
puts h.key?(:a)
p h[:b]
puts h.fetch(:b) { "missing" }`, notes: [{ at: "key?", text: "membership test" }] }
          ]
        },
        {
          id: "iterating-hashes", n: 3, title: "iterating and transforming", level: 2,
          gloss: "Loops over pairs and builds new hashes with transform and filter methods.",
          examples: [
            { code: `ages = { ada: 36, linus: 54 }
ages.each do |name, age|
  puts "#{name}: #{age}"
end`, notes: [{ at: "|name, age|", text: "destructures each pair" }] },
            { code: `prices = { tea: 2.5, cake: 4.0 }
doubled = prices.transform_values { |v| v * 2 }
p doubled`, notes: [{ at: "transform_values", text: "new hash, same keys" }] },
            { code: `stock = { apple: 4, pear: 0, plum: 7 }
p stock.select { |_, n| n > 0 }
p stock.reject { |_, n| n > 0 }`, notes: [{ at: "_", text: "ignored block parameter" }] }
          ]
        },
        {
          id: "merging-and-grouping", n: 4, title: "merging, grouping and counting", level: 2,
          gloss: "Combines hashes and summarises collections as hashes.",
          examples: [
            { code: `defaults = { debug: false, level: 1 }
p defaults.merge({ debug: true })`, notes: [{ at: "merge", text: "right side wins" }] },
            { code: `words = %w[apple avocado banana]
p words.group_by { |w| w[0] }`, notes: [{ at: "group_by", text: "hash of key to array" }] },
            { code: `counts = %w[a b a].tally
p counts
p counts.sort_by { |_, n| -n }.first`, notes: [{ at: "tally", text: "counts occurrences" }] }
          ]
        }
      ]
    },
    {
      id: "blocks-procs-lambdas",
      n: 5,
      title: "blocks, procs & lambdas",
      concepts: [
        {
          id: "blocks-and-yield", n: 1, title: "blocks and yield", level: 1,
          gloss: "Passes a block to a method and runs it with yield.",
          examples: [
            { code: `def repeat(times)
  times.times { |i| yield i }
end
repeat(2) { |i| puts "step #{i}" }`, notes: [{ at: "yield", text: "runs the caller's block" }] },
            { code: `def with_logging
  puts "start"
  result = yield
  puts "done"
  result
end
with_logging { 6 * 7 }`, notes: [{ at: "result = yield", text: "block value comes back" }] },
            { code: `def greet(name)
  return "Hello, #{name}" unless block_given?
  yield "Hello, #{name}"
end
puts greet("ada")
greet("ada") { |text| puts text.upcase }`, notes: [{ at: "block_given?", text: "was a block passed" }] }
          ]
        },
        {
          id: "lambdas-and-procs", n: 2, title: "lambdas and procs", level: 2,
          gloss: "Stores code in lambda and proc objects and calls them later.",
          examples: [
            { code: `double = ->(n) { n * 2 }
puts double.call(4)
puts double.(5)
puts double[6]`, notes: [{ at: "->", text: "lambda literal" }, { at: "double.(5)", text: "shorthand for call" }] },
            { code: `square = lambda { |n| n * n }
adder = proc { |a, b| (a || 0) + (b || 0) }
puts square.call(3)
puts adder.call(1)`, notes: [{ at: "proc", text: "lenient about arguments" }] },
            { code: `greet = ->(name, greeting: "Hello") { "#{greeting}, #{name}" }
puts greet.call("ada", greeting: "Hi")`, notes: [{ at: "greeting:", text: "lambdas take keywords" }] }
          ]
        },
        {
          id: "closures-and-references", n: 3, title: "closures and method references", level: 2,
          gloss: "Captures local variables and converts methods or symbols to procs.",
          examples: [
            { code: `def make_counter
  count = 0
  -> { count += 1 }
end
counter = make_counter
counter.call
puts counter.call`, notes: [{ at: "count", text: "captured and kept alive" }] },
            { code: `rate = 0.2
with_tax = ->(price) { price * (1 + rate) }
puts with_tax.call(40)`, notes: [] },
            { code: `upcase = :upcase.to_proc
puts upcase.call("ruby")
p %w[a b].map(&:upcase)`, notes: [{ at: "&:upcase", text: "symbol to proc" }] }
          ]
        },
        {
          id: "lambda-vs-proc", n: 4, title: "lambda versus proc", level: 3,
          gloss: "Contrasts argument checking and return behaviour of lambdas and procs.",
          examples: [
            { code: `l = lambda { |a, b| [a, b] }
begin
  l.call(1)
rescue ArgumentError => e
  puts e.message
end`, notes: [{ at: "lambda", text: "strict arity" }] },
            { code: `pr = proc { |a, b| [a, b] }
p pr.call(1)
p pr.call(1, 2, 3)`, notes: [{ at: "proc", text: "missing become nil, extras drop" }] },
            { code: `def run
  l = -> { return 1 }
  l.call
  2
end
puts run`, notes: [{ at: "return", text: "leaves only the lambda" }] }
          ]
        }
      ]
    },
    {
      id: "enumerable",
      n: 6,
      title: "Enumerable",
      concepts: [
        {
          id: "map-select-reject", n: 1, title: "map, select and reject", level: 1,
          gloss: "Transforms and filters collections with block methods.",
          examples: [
            { code: `nums = [1, 2, 3, 4]
p nums.map { |n| n * 2 }
p nums.select(&:even?)
p nums.reject(&:even?)`, notes: [{ at: "select", text: "keeps matches" }, { at: "reject", text: "drops matches" }] },
            { code: `prices = [5.0, 12.5, 8.0]
cheap = prices.select { |p| p < 10 }
labels = prices.map { |p| "#{p} EUR" }
p cheap, labels`, notes: [] },
            { code: `words = %w[swift go rust]
p words.map(&:length)
p words.find { |w| w.length > 3 }`, notes: [{ at: "find", text: "first match or nil" }] }
          ]
        },
        {
          id: "reduce-and-sum", n: 2, title: "reduce, sum and counting", level: 1,
          gloss: "Combines elements into one value with sum, reduce and count.",
          examples: [
            { code: `nums = [3, 5, 7]
puts nums.sum
puts nums.reduce(:*)
puts nums.inject { |a, b| a + b }`, notes: [{ at: "reduce(:*)", text: "symbol as the operation" }] },
            { code: `words = %w[a bb ccc]
puts words.sum { |w| w.length }
puts words.count { |w| w.length > 1 }`, notes: [] },
            { code: `prices = [5, 9, 2]
puts prices.max
puts prices.min_by { |p| (p - 6).abs }
p prices.minmax`, notes: [{ at: "min_by", text: "smallest by a key" }] }
          ]
        },
        {
          id: "predicates-and-partitions", n: 3, title: "predicates and partitions", level: 2,
          gloss: "Tests collections with all?, any? and none? and splits them with partition.",
          examples: [
            { code: `nums = [2, 4, 6]
puts nums.all?(&:even?)
puts nums.any? { |n| n > 5 }
puts nums.none?(&:zero?)`, notes: [] },
            { code: `nums = [1, 2, 3, 4]
even, odd = nums.partition(&:even?)
p even, odd`, notes: [{ at: "partition", text: "two arrays" }] },
            { code: `p((1..10).each_slice(3).to_a)
p [1, 2, 3].each_cons(2).to_a`, notes: [{ at: "each_cons", text: "overlapping windows" }] }
          ]
        },
        {
          id: "lazy-zip-and-objects", n: 4, title: "lazy, zip and each_with_object", level: 3,
          gloss: "Builds lazy pipelines and accumulates results while iterating.",
          examples: [
            { code: `squares = (1..Float::INFINITY).lazy.map { |n| n * n }
p squares.first(3)`, notes: [{ at: "lazy", text: "evaluates on demand" }] },
            { code: `result = %w[a b c].each_with_object({}) do |letter, memo|
  memo[letter] = letter.ord
end
p result`, notes: [{ at: "each_with_object", text: "shared accumulator" }] },
            { code: `names = %w[ada grace]
ages = [36, 30]
p names.zip(ages)
p names.zip(ages).to_h`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "methods-keyword-arguments",
      n: 7,
      title: "methods & keyword arguments",
      concepts: [
        {
          id: "defining-methods", n: 1, title: "defining methods", level: 1,
          gloss: "Defines methods with positional parameters and default values.",
          examples: [
            { code: `def square(n)
  n * n
end
puts square(4)`, notes: [{ at: "n * n", text: "last expression is returned" }] },
            { code: `def greet(name, greeting = "Hello")
  "#{greeting}, #{name}"
end
puts greet("ada")`, notes: [{ at: "= \"Hello\"", text: "default value" }] },
            { code: `def divide(a, b)
  return nil if b.zero?
  a / b
end
p divide(6, 3), divide(1, 0)`, notes: [{ at: "return", text: "early exit" }] }
          ]
        },
        {
          id: "keyword-arguments", n: 2, title: "keyword arguments", level: 1,
          gloss: "Takes named parameters, required or with defaults.",
          examples: [
            { code: `def connect(host:, port: 80)
  "#{host}:#{port}"
end
puts connect(host: "example.com")`, notes: [{ at: "host:", text: "required keyword" }, { at: "port: 80", text: "optional keyword" }] },
            { code: `def price(base:, tax: 0.2, discount: 0)
  base * (1 + tax) - discount
end
puts price(base: 100, discount: 5)`, notes: [] },
            { code: `def log(message, level: :info)
  puts "[#{level}] #{message}"
end
log("started", level: :debug)`, notes: [] }
          ]
        },
        {
          id: "splats", n: 3, title: "splat and double splat", level: 2,
          gloss: "Collects extra arguments with star and double star.",
          examples: [
            { code: `def sum(*numbers)
  numbers.sum
end
puts sum(1, 2, 3)`, notes: [{ at: "*numbers", text: "collects into an array" }] },
            { code: `def tags(**options)
  options.map { |k, v| "#{k}=#{v}" }.join(",")
end
puts tags(a: 1, b: 2)`, notes: [{ at: "**options", text: "collects keywords" }] },
            { code: `def total(*values)
  values.sum
end
data = [4, 5, 6]
puts total(*data)`, notes: [{ at: "total(*", text: "spreads an array" }] }
          ]
        },
        {
          id: "return-values", n: 4, title: "return values and endless methods", level: 2,
          gloss: "Returns several values and writes one-line methods.",
          examples: [
            { code: `def min_max(values)
  [values.min, values.max]
end
low, high = min_max([3, 1, 2])
puts low, high`, notes: [{ at: "low, high", text: "destructures the array" }] },
            { code: `def square(n) = n * n
puts square(5)`, notes: [{ at: "def square(n) =", text: "endless method" }] },
            { code: `def full_name(first, last) = "#{first} #{last}"
puts full_name("ada", "lovelace")`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "classes-modules",
      n: 8,
      title: "classes & modules",
      concepts: [
        {
          id: "classes-and-initialize", n: 1, title: "classes and initialize", level: 1,
          gloss: "Defines classes whose instances keep state in instance variables.",
          examples: [
            { code: `class Counter
  def initialize
    @value = 0
  end

  def increment
    @value += 1
  end
end`, notes: [{ at: "initialize", text: "runs on new" }, { at: "@value", text: "instance variable" }] },
            { code: `class Rectangle
  def initialize(width, height)
    @width = width
    @height = height
  end

  def area = @width * @height
end
puts Rectangle.new(3, 4).area`, notes: [] },
            { code: `class User
  def initialize(name)
    @name = name
  end

  def to_s = "User(#{@name})"
end
puts User.new("ada")`, notes: [{ at: "to_s", text: "used by puts" }] }
          ]
        },
        {
          id: "class-methods", n: 2, title: "class methods and constants", level: 2,
          gloss: "Adds methods to the class itself and defines shared constants.",
          examples: [
            { code: `class Circle
  PI = 3.14159
  def self.unit = new(1)
  def initialize(radius)
    @radius = radius
  end
  def area = PI * @radius**2
end
puts Circle.unit.area`, notes: [{ at: "self.unit", text: "class method" }] },
            { code: `class Config
  @@count = 0
  def self.count = @@count
  def initialize
    @@count += 1
  end
end
Config.new
puts Config.count`, notes: [{ at: "@@count", text: "shared by all instances" }] },
            { code: `class Logger
  class << self
    def default
      @default ||= new
    end
  end
end
p Logger.default.equal?(Logger.default)`, notes: [{ at: "class << self", text: "opens the singleton class" }, { at: "||=", text: "assigns once" }] }
          ]
        },
        {
          id: "inheritance", n: 3, title: "inheritance and super", level: 2,
          gloss: "Subclasses with the less-than sign and reuses behaviour with super.",
          examples: [
            { code: `class Animal
  def speak = "..."
end

class Dog < Animal
  def speak = "woof"
end
puts Dog.new.speak`, notes: [{ at: "<", text: "inherits from" }] },
            { code: `class Vehicle
  def initialize(wheels)
    @wheels = wheels
  end
end

class Bike < Vehicle
  def initialize
    super(2)
  end
end`, notes: [{ at: "super(2)", text: "calls the parent method" }] },
            { code: `class Employee
  def describe = "employee"
end

class Manager < Employee
  def describe = "manager, #{super}"
end
puts Manager.new.describe`, notes: [{ at: "super", text: "passes arguments along" }] }
          ]
        },
        {
          id: "modules-as-namespaces", n: 4, title: "modules as namespaces", level: 2,
          gloss: "Groups constants, methods and classes under a module name.",
          examples: [
            { code: `module Shop
  TAX = 0.2

  def self.price(base) = base * (1 + TAX)
end
puts Shop.price(100)`, notes: [{ at: "module", text: "cannot be instantiated" }] },
            { code: `module Billing
  class Invoice
    def total = 42
  end
end
puts Billing::Invoice.new.total`, notes: [{ at: "::", text: "scope operator" }] },
            { code: `module Util
  module_function

  def clamp(n, min, max) = [[n, min].max, max].min
end
puts Util.clamp(15, 0, 10)`, notes: [{ at: "module_function", text: "callable on the module" }] }
          ]
        }
      ]
    },
    {
      id: "attr-accessors-visibility",
      n: 9,
      title: "attr accessors & visibility",
      concepts: [
        {
          id: "attr-methods", n: 1, title: "attr_reader, attr_writer and attr_accessor", level: 1,
          gloss: "Generates getter and setter methods for instance variables.",
          examples: [
            { code: `class User
  attr_reader :name
  attr_accessor :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end`, notes: [{ at: "attr_reader", text: "getter only" }, { at: "attr_accessor", text: "getter and setter" }] },
            { code: `class Point
  attr_reader :x, :y

  def initialize(x, y)
    @x, @y = x, y
  end
end
puts Point.new(1, 2).x`, notes: [] },
            { code: `class Account
  attr_writer :owner

  def owner_name = @owner.to_s.upcase
end
account = Account.new
account.owner = "ada"
puts account.owner_name`, notes: [{ at: "attr_writer", text: "setter only" }] }
          ]
        },
        {
          id: "custom-accessors", n: 2, title: "custom setters and derived readers", level: 2,
          gloss: "Validates assignments and computes values from other attributes.",
          examples: [
            { code: `class Temperature
  attr_reader :celsius

  def celsius=(value)
    raise ArgumentError, "below zero kelvin" if value < -273.15
    @celsius = value
  end
end`, notes: [{ at: "celsius=", text: "custom setter" }] },
            { code: `class Person
  attr_reader :first, :last
  def initialize(first, last)
    @first = first
    @last = last
  end
  def full_name = "#{first} #{last}"
end
puts Person.new("ada", "lovelace").full_name`, notes: [] },
            { code: `class Item
  attr_reader :price

  def price=(value)
    @price = value.round(2)
  end
end
item = Item.new
item.price = 3.14159
puts item.price`, notes: [] }
          ]
        },
        {
          id: "visibility", n: 3, title: "private and protected", level: 2,
          gloss: "Hides methods with private and shares them between instances with protected.",
          examples: [
            { code: `class Wallet
  def initialize
    @cents = 0
  end
  def add(amount) = deposit(amount)
  private
  def deposit(amount)
    @cents += amount
  end
end`, notes: [{ at: "private", text: "everything below is hidden" }] },
            { code: `class Safe
  def open? = secret == 1234
  private
  def secret = 1234
end
puts Safe.new.open?`, notes: [] },
            { code: `class Money
  attr_reader :cents
  protected :cents
  def initialize(cents)
    @cents = cents
  end
  def bigger_than?(other) = cents > other.cents
end
puts Money.new(5).bigger_than?(Money.new(3))`, notes: [{ at: "protected", text: "callable by same-class objects" }] }
          ]
        },
        {
          id: "introspection", n: 4, title: "private constants and introspection", level: 3,
          gloss: "Hides constants and inspects or calls members dynamically.",
          examples: [
            { code: `class Config
  SECRET = "x".freeze
  private_constant :SECRET

  def self.check = SECRET.length
end
puts Config.check`, notes: [{ at: "private_constant", text: "hidden outside the class" }] },
            { code: `user = Object.new
user.instance_variable_set(:@name, "ada")
p user.instance_variables`, notes: [{ at: "instance_variable_set", text: "sets by name" }] },
            { code: `class Greeter
  private def hello = "hi"
end
puts Greeter.new.send(:hello)`, notes: [{ at: "send", text: "ignores visibility" }] }
          ]
        }
      ]
    },
    {
      id: "mixins-comparable",
      n: 10,
      title: "mixins & Comparable",
      concepts: [
        {
          id: "include-and-prepend", n: 1, title: "include and prepend", level: 1,
          gloss: "Mixes module methods into a class with include or prepend.",
          examples: [
            { code: `module Greets
  def hello = "hello from #{self.class}"
end

class Robot
  include Greets
end
puts Robot.new.hello`, notes: [{ at: "include", text: "module joins the ancestors" }] },
            { code: `module Walkable
  def walk = "#{name} walks"
end

class Dog
  include Walkable
  def name = "Rex"
end
puts Dog.new.walk`, notes: [] },
            { code: `module Loud
  def speak = super.upcase
end

class Cat
  prepend Loud
  def speak = "meow"
end
puts Cat.new.speak`, notes: [{ at: "prepend", text: "runs before the class method" }] }
          ]
        },
        {
          id: "comparable", n: 2, title: "Comparable", level: 2,
          gloss: "Gains comparison operators from a single spaceship method.",
          examples: [
            { code: `class Version
  include Comparable
  attr_reader :major
  def initialize(major)
    @major = major
  end
  def <=>(other) = major <=> other.major
end
puts Version.new(2) > Version.new(1)`, notes: [{ at: "<=>", text: "the only required method" }] },
            { code: `class Money
  include Comparable
  attr_reader :cents
  def initialize(cents)
    @cents = cents
  end
  def <=>(other) = cents <=> other.cents
end
puts [Money.new(5), Money.new(2)].min.cents`, notes: [] },
            { code: `class Grade
  include Comparable
  attr_reader :points
  def initialize(points)
    @points = points
  end
  def <=>(other) = points <=> other.points
end
puts Grade.new(5).between?(Grade.new(1), Grade.new(9))`, notes: [{ at: "between?", text: "comes from Comparable" }] }
          ]
        },
        {
          id: "enumerable-mixin", n: 3, title: "Enumerable in your own class", level: 2,
          gloss: "Adds map, select and sort to a class that defines each.",
          examples: [
            { code: `class Playlist
  include Enumerable
  def initialize(songs)
    @songs = songs
  end
  def each(&block) = @songs.each(&block)
end
p Playlist.new(%w[b a]).sort`, notes: [{ at: "each", text: "the only required method" }] },
            { code: `class Countdown
  include Enumerable

  def each
    3.downto(1) { |n| yield n }
  end
end
p Countdown.new.map { |n| n * 2 }`, notes: [] },
            { code: `class Basket
  include Enumerable
  def initialize(*items)
    @items = items
  end
  def each(&) = @items.each(&)
end
puts Basket.new("tea", "cake").include?("tea")`, notes: [{ at: "(&)", text: "anonymous block forwarding" }] }
          ]
        },
        {
          id: "hooks-and-extend", n: 4, title: "extend and included hooks", level: 3,
          gloss: "Adds class-level behaviour with extend and the included hook.",
          examples: [
            { code: `module Countable
  def self.included(base) = base.extend(ClassMethods)

  module ClassMethods
    def count = 3
  end
end
class Item
  include Countable
end
puts Item.count`, notes: [{ at: "included", text: "runs on include" }] },
            { code: `module Greeting
  def hi = "hi"
end
obj = Object.new
obj.extend(Greeting)
puts obj.hi`, notes: [{ at: "extend", text: "adds to one object" }] },
            { code: `module Plugin
  def self.extended(base) = puts("extended #{base}")
end
class Host
  extend Plugin
end`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "exceptions",
      n: 11,
      title: "exceptions",
      concepts: [
        {
          id: "begin-rescue", n: 1, title: "begin and rescue", level: 1,
          gloss: "Handles errors with rescue clauses by exception class.",
          examples: [
            { code: `begin
  Integer("abc")
rescue ArgumentError => e
  puts "invalid: #{e.message}"
end`, notes: [{ at: "=> e", text: "binds the exception" }] },
            { code: `begin
  10 / 0
rescue ZeroDivisionError
  puts "cannot divide"
end`, notes: [] },
            { code: `def parse(raw)
  Integer(raw)
rescue ArgumentError
  nil
end
p parse("12"), parse("x")`, notes: [{ at: "rescue", text: "works at method level" }] }
          ]
        },
        {
          id: "raising-and-custom", n: 2, title: "raising and custom errors", level: 1,
          gloss: "Raises errors with raise and defines subclasses of StandardError.",
          examples: [
            { code: `def withdraw(balance, amount)
  raise ArgumentError, "insufficient funds" if amount > balance
  balance - amount
end
puts withdraw(100, 30)`, notes: [{ at: "raise", text: "class and message" }] },
            { code: `class NotFound < StandardError; end

begin
  raise NotFound, "user 7 missing"
rescue NotFound => e
  puts e.message
end`, notes: [{ at: "< StandardError", text: "custom error class" }] },
            { code: `class PaymentError < StandardError
  attr_reader :amount

  def initialize(message, amount)
    super(message)
    @amount = amount
  end
end`, notes: [] }
          ]
        },
        {
          id: "ensure-retry-else", n: 3, title: "ensure, retry and else", level: 2,
          gloss: "Runs cleanup, repeats attempts and separates the success path.",
          examples: [
            { code: `begin
  puts "work"
ensure
  puts "cleanup"
end`, notes: [{ at: "ensure", text: "always runs" }] },
            { code: `attempts = 0
begin
  attempts += 1
  raise "flaky" if attempts < 3
  puts "ok after #{attempts}"
rescue
  retry
end`, notes: [{ at: "retry", text: "reruns the begin block" }] },
            { code: `begin
  value = Integer("42")
rescue ArgumentError
  puts "bad"
else
  puts "parsed #{value}"
end`, notes: [{ at: "else", text: "only when nothing was raised" }] }
          ]
        },
        {
          id: "causes-and-catch", n: 4, title: "causes, multiple rescues and catch", level: 3,
          gloss: "Chains causes, handles several classes and exits early with throw.",
          examples: [
            { code: `begin
  begin
    Integer("x")
  rescue ArgumentError
    raise RuntimeError, "config invalid"
  end
rescue => outer
  puts outer.cause.class
end`, notes: [{ at: "cause", text: "set automatically" }] },
            { code: `def risky
  yield
rescue ZeroDivisionError, TypeError => e
  puts "#{e.class}: #{e.message}"
end
risky { 1 / 0 }`, notes: [{ at: "ZeroDivisionError, TypeError", text: "one clause, two classes" }] },
            { code: `result = catch(:found) do
  [1, 2, 3].each { |n| throw :found, n if n > 1 }
  nil
end
puts result`, notes: [{ at: "throw", text: "unwinds to the matching catch" }] }
          ]
        }
      ]
    },
    {
      id: "pattern-matching",
      n: 12,
      title: "pattern matching",
      concepts: [
        {
          id: "case-in", n: 1, title: "case and in", level: 1,
          gloss: "Matches a value against patterns with case and in.",
          examples: [
            { code: `value = 42
case value
in Integer => n if n > 40
  puts "big #{n}"
in Integer
  puts "small"
end`, notes: [{ at: "in", text: "pattern branch" }, { at: "if", text: "guard clause" }] },
            { code: `case "hello"
in String => s
  puts s.upcase
end`, notes: [{ at: "=> s", text: "binds the match" }] },
            { code: `code = 404
message = case code
          in 200 then "ok"
          in 404 then "not found"
          else "other"
          end
puts message`, notes: [] }
          ]
        },
        {
          id: "array-hash-patterns", n: 2, title: "array and hash patterns", level: 2,
          gloss: "Destructures arrays and hashes while testing their shape.",
          examples: [
            { code: `point = [3, 4]
case point
in [x, y]
  puts x + y
end`, notes: [{ at: "[x, y]", text: "array pattern" }] },
            { code: `user = { name: "ada", age: 36 }
case user
in { name: String => name, age: Integer => age }
  puts "#{name} is #{age}"
end`, notes: [{ at: "{ name: String", text: "hash pattern" }] },
            { code: `case [1, [2, 3]]
in [a, [b, *rest]]
  p a, b, rest
end`, notes: [{ at: "[b, *rest]", text: "nested with splat" }] }
          ]
        },
        {
          id: "alternatives-pin-find", n: 3, title: "alternatives, pin and subsets", level: 2,
          gloss: "Combines patterns with pipes, pins existing values and ignores extra keys.",
          examples: [
            { code: `case 2
in 1 | 2 | 3
  puts "low"
in Integer
  puts "other"
end`, notes: [{ at: "1 | 2 | 3", text: "alternatives" }] },
            { code: `expected = 5
case 5
in ^expected
  puts "matches"
end`, notes: [{ at: "^expected", text: "pin existing variable" }] },
            { code: `case { status: "ok", items: [1, 2] }
in { status: "ok", items: [first, *] }
  puts first
end`, notes: [] }
          ]
        },
        {
          id: "one-line-and-structs", n: 4, title: "one-line patterns and structs", level: 3,
          gloss: "Tests or destructures in a single expression and matches Struct and Data.",
          examples: [
            { code: `config = { db: { host: "localhost", port: 5432 } }
config => { db: { host: } }
puts host`, notes: [{ at: "=>", text: "destructure or raise" }] },
            { code: `response = { status: :ok }
ok = (response in { status: :ok })
puts ok`, notes: [{ at: "in", text: "returns true or false" }] },
            { code: `Point = Data.define(:x, :y)
case Point.new(x: 1, y: 2)
in { x:, y: }
  puts x + y
end`, notes: [{ at: "x:, y:", text: "binds the keys" }] }
          ]
        }
      ]
    },
    {
      id: "string-formatting",
      n: 13,
      title: "string formatting",
      concepts: [
        {
          id: "format-and-percent", n: 1, title: "format and the percent operator", level: 1,
          gloss: "Formats values with printf-style directives.",
          examples: [
            { code: `puts format("%s has %d items", "cart", 3)
puts "%.2f" % 3.14159`, notes: [{ at: "%.2f", text: "two decimals" }] },
            { code: `puts "%05d" % 42
puts "%-8s|" % "ada"
puts "%8s|" % "ada"`, notes: [{ at: "%-8s", text: "left aligned" }] },
            { code: `puts "%s is %d years" % ["ada", 36]
puts "%x %o %b" % [255, 8, 5]`, notes: [{ at: "%x %o %b", text: "hex, octal, binary" }] }
          ]
        },
        {
          id: "named-and-nested", n: 2, title: "named references", level: 2,
          gloss: "Formats with named placeholders and combines interpolation with format.",
          examples: [
            { code: `puts format("%<name>s: %<score>.1f", name: "ada", score: 9.5)`, notes: [{ at: "%<name>s", text: "named with a directive" }] },
            { code: `puts format("%{a} and %{b}", a: "tea", b: "cake")`, notes: [{ at: "%{a}", text: "named, plain substitution" }] },
            { code: `price = 1234.5
puts "Total: #{'%.2f' % price}"
puts "Total: #{price.round(1)}"`, notes: [] }
          ]
        },
        {
          id: "justify-and-numbers", n: 3, title: "justifying and rounding", level: 1,
          gloss: "Aligns text with ljust, rjust and center and rounds numbers.",
          examples: [
            { code: `puts "ada".ljust(8, ".") + "36"
puts "7".rjust(3, "0")
puts "title".center(11, "*")`, notes: [{ at: "center", text: "pads both sides" }] },
            { code: `puts 1234567.to_s.reverse.scan(/\\d{1,3}/).join(",").reverse`, notes: [{ at: "scan", text: "all regex matches" }] },
            { code: `puts 12.3456.round(2)
puts 10.fdiv(3).floor(2)
puts 1e3.to_i
puts 255.to_s(2)`, notes: [{ at: "to_s(2)", text: "binary string" }] }
          ]
        },
        {
          id: "tables-and-dates", n: 4, title: "tables and dates", level: 2,
          gloss: "Prints aligned rows and formats times with strftime.",
          examples: [
            { code: `rows = [["tea", 2.5], ["cake", 4.0]]
rows.each { |name, price| puts "%-6s %5.2f" % [name, price] }`, notes: [{ at: "%5.2f", text: "width five, two decimals" }] },
            { code: `puts "=" * 20
puts "Report".center(20)
puts "=" * 20`, notes: [{ at: "\"=\" * 20", text: "repeats the string" }] },
            { code: `time = Time.at(0).utc
puts time.strftime("%Y-%m-%d %H:%M")`, notes: [{ at: "strftime", text: "date and time directives" }] }
          ]
        }
      ]
    },
    {
      id: "files-struct",
      n: 14,
      title: "files & Struct",
      concepts: [
        {
          id: "reading-writing", n: 1, title: "reading and writing files", level: 1,
          gloss: "Saves and loads files with File.write, File.read and File.open.",
          examples: [
            { code: `File.write("notes.txt", "first\\nsecond\\n")
puts File.read("notes.txt")
File.delete("notes.txt")`, notes: [{ at: "File.write", text: "replaces the file" }] },
            { code: `File.open("log.txt", "a") do |file|
  file.puts "start"
  file.puts "end"
end
p File.readlines("log.txt", chomp: true)
File.delete("log.txt")`, notes: [{ at: "\"a\"", text: "append mode" }, { at: "do |file|", text: "closes the file after" }] },
            { code: `File.write("data.txt", "x")
puts File.exist?("data.txt")
puts File.size("data.txt")
File.delete("data.txt")`, notes: [] }
          ]
        },
        {
          id: "lines-and-paths", n: 2, title: "lines and paths", level: 2,
          gloss: "Streams lines and splits or joins file paths.",
          examples: [
            { code: `File.write("names.txt", "ada\\ngrace\\n")
File.foreach("names.txt") do |line|
  puts line.chomp.upcase
end
File.delete("names.txt")`, notes: [{ at: "foreach", text: "one line at a time" }] },
            { code: `path = "/var/log/app/server.log"
puts File.basename(path)
puts File.extname(path)
puts File.dirname(path)`, notes: [] },
            { code: `Dir.mkdir("out") unless Dir.exist?("out")
File.write("out/a.txt", "x")
p Dir.glob("out/*.txt")
File.delete("out/a.txt")
Dir.rmdir("out")`, notes: [{ at: "Dir.glob", text: "files matching a pattern" }] }
          ]
        },
        {
          id: "struct", n: 3, title: "Struct", level: 2,
          gloss: "Creates small value classes with generated accessors.",
          examples: [
            { code: `Point = Struct.new(:x, :y)
point = Point.new(3, 4)
puts point.x
point.y = 9
p point`, notes: [{ at: "Struct.new", text: "generates accessors" }] },
            { code: `User = Struct.new(:name, :age) do
  def adult? = age >= 18
end
puts User.new("ada", 36).adult?`, notes: [{ at: "do", text: "block adds methods" }] },
            { code: `Item = Struct.new(:sku, :qty, keyword_init: true)
item = Item.new(sku: "A1", qty: 2)
p item.to_h`, notes: [{ at: "keyword_init", text: "named arguments" }] }
          ]
        },
        {
          id: "data", n: 4, title: "Data", level: 2,
          gloss: "Defines immutable value objects with Data.define.",
          examples: [
            { code: `Coord = Data.define(:lat, :lng)
spot = Coord.new(lat: 59.9, lng: 10.7)
puts spot.lat`, notes: [{ at: "Data.define", text: "immutable value object" }] },
            { code: `Money = Data.define(:amount, :currency) do
  def to_s = "#{amount} #{currency}"
end
puts Money.new(5, "EUR")`, notes: [] },
            { code: `Point = Data.define(:x, :y)
a = Point.new(x: 1, y: 2)
b = a.with(y: 5)
p a, b
puts a == Point.new(1, 2)`, notes: [{ at: "with", text: "copy with changes" }] }
          ]
        }
      ]
    }
  ]
};
