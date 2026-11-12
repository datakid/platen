export default {
  id: "dart",
  name: "Dart",
  short: "DT",
  pigment: "dart",
  family: null,
  version: "3.x",
  lexer: "dart",
  indent: 2,
  topics: [
    {
      id: "variables-null-safety",
      n: 1,
      title: "variables & null safety",
      concepts: [
        {
          id: "var-and-types", n: 1, title: "var and typed variables", level: 1,
          gloss: "Declares variables with var, an explicit type or num.",
          examples: [
            { code: `var city = 'Oslo';
var visits = 3;
double ratio = visits / 4;`, notes: [{ at: "var", text: "type inferred from the value" }, { at: "double", text: "explicit type" }] },
            { code: `String title = 'Report';
int pages = 12;
bool draft = true;`, notes: [{ at: "int", text: "whole numbers" }] },
            { code: `var scores = [90, 85, 77];
var total = 0;
num average = 84.5;`, notes: [{ at: "num", text: "int or double" }] }
          ]
        },
        {
          id: "final-and-const", n: 2, title: "final and const", level: 1,
          gloss: "Creates variables that are assigned once with final or const.",
          examples: [
            { code: `final now = DateTime.now();
const maxRetries = 3;`, notes: [{ at: "final", text: "set once at runtime" }, { at: "const", text: "fixed at compile time" }] },
            { code: `final String owner = 'ada';
const List<int> primes = [2, 3, 5, 7];`, notes: [{ at: "const List", text: "deeply immutable list" }] },
            { code: `const taxRate = 0.2;
final price = 40.0;
final total = price * (1 + taxRate);`, notes: [] }
          ]
        },
        {
          id: "nullable-types", n: 3, title: "nullable types", level: 2,
          gloss: "Marks values that may be absent by adding a question mark to the type.",
          examples: [
            { code: `String? nickname;
nickname = 'ada';
nickname = null;`, notes: [{ at: "String?", text: "may hold null" }] },
            { code: `int? age = int.tryParse('42');
List<String>? tags;
Map<String, int>? stock;`, notes: [{ at: "tryParse", text: "returns null on bad input" }] },
            { code: `String? lookup(Map<String, String> users, String id) {
  return users[id];
}`, notes: [{ at: "users[id]", text: "map lookups are nullable" }] }
          ]
        },
        {
          id: "null-aware-operators", n: 4, title: "null-aware operators", level: 2,
          gloss: "Handles nullable values with ??, ?., ??= and the bang operator.",
          examples: [
            { code: `String? name;
final label = name ?? 'guest';
final size = name?.length;`, notes: [{ at: "??", text: "fallback when null" }, { at: "?.", text: "skips the call on null" }] },
            { code: `Map<String, int> counts = {};
counts['a'] ??= 0;
counts['a'] = counts['a']! + 1;`, notes: [{ at: "??=", text: "assigns only when null" }, { at: "!", text: "asserts non-null" }] },
            { code: `int parse(String? raw) {
  return int.parse(raw!);
}`, notes: [{ at: "raw!", text: "throws if raw is null" }] }
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
          id: "quotes-and-interpolation", n: 1, title: "quotes and interpolation", level: 1,
          gloss: "Builds strings with single or double quotes and embedded expressions.",
          examples: [
            { code: `final user = 'ada';
final greeting = 'Hello, $user';
final total = 'Sum: \${2 + 3}';`, notes: [{ at: "$user", text: "simple variable" }, { at: "${2 + 3}", text: "any expression" }] },
            { code: `final item = 'tea';
final qty = 3;
final line = '$qty x $item = \${qty * 4}';`, notes: [] },
            { code: `final note = "It's ready";
final path = 'C:\\\\temp\\\\logs';
final tabbed = 'name\\tcity';`, notes: [{ at: "\\\\", text: "escaped backslash" }, { at: "\\t", text: "tab character" }] }
          ]
        },
        {
          id: "multiline-and-raw", n: 2, title: "multiline and raw strings", level: 2,
          gloss: "Writes multiline, raw and adjacent string literals.",
          examples: [
            { code: `final poem = '''
first line
second line''';`, notes: [{ at: "'''", text: "spans several lines" }] },
            { code: `final pattern = r'\\d+\\.\\d+';
final winPath = r'C:\\temp\\logs';`, notes: [{ at: "r'", text: "raw, no escapes" }] },
            { code: `final message = 'Order '
    'shipped '
    'today';`, notes: [{ at: "'shipped '", text: "adjacent literals join" }] }
          ]
        },
        {
          id: "string-methods", n: 3, title: "common string methods", level: 1,
          gloss: "Transforms and inspects strings with built-in methods.",
          examples: [
            { code: `final title = '  Quarterly Report  ';
final trimmed = title.trim();
final upper = trimmed.toUpperCase();`, notes: [{ at: "trim", text: "removes outer whitespace" }] },
            { code: `final csv = 'ada,grace,linus';
final names = csv.split(',');
final joined = names.join(' | ');`, notes: [{ at: "split", text: "returns a list" }] },
            { code: `final file = 'report.final.pdf';
final isPdf = file.endsWith('.pdf');
final stem = file.substring(0, file.lastIndexOf('.'));`, notes: [{ at: "lastIndexOf", text: "last match position" }] },
            { code: `final id = '7'.padLeft(3, '0');
final dashes = '-' * 10;
final has = 'dart'.contains('ar');`, notes: [{ at: "padLeft", text: "pads to a width" }] }
          ]
        },
        {
          id: "string-buffer", n: 4, title: "StringBuffer", level: 2,
          gloss: "Builds long strings efficiently with a StringBuffer.",
          examples: [
            { code: `final buffer = StringBuffer();
buffer.write('id=');
buffer.writeln(42);`, notes: [{ at: "writeln", text: "adds a newline" }] },
            { code: `final buffer = StringBuffer()
  ..write('Total: ')
  ..write(19.5)
  ..write(' EUR');
final text = buffer.toString();`, notes: [{ at: "..", text: "cascade on the same object" }] },
            { code: `final parts = ['a', 'b', 'c'];
final buffer = StringBuffer();
buffer.writeAll(parts, '-');
print(buffer);`, notes: [{ at: "writeAll", text: "joins with a separator" }] }
          ]
        }
      ]
    },
    {
      id: "list-map-set",
      n: 3,
      title: "List, Map, Set",
      concepts: [
        {
          id: "lists", n: 1, title: "lists", level: 1,
          gloss: "Stores ordered items in a growable list.",
          examples: [
            { code: `final scores = [90, 72, 85];
scores.add(60);
final top = scores.first;`, notes: [{ at: "add", text: "appends at the end" }] },
            { code: `final names = <String>['ada', 'grace'];
names.insert(0, 'linus');
names.remove('grace');
print(names.length);`, notes: [{ at: "<String>", text: "explicit element type" }] },
            { code: `final squares = List<int>.generate(5, (i) => i * i);
final copy = [...squares];
final last = squares.last;`, notes: [{ at: "generate", text: "builds from the index" }] }
          ]
        },
        {
          id: "maps", n: 2, title: "maps", level: 1,
          gloss: "Associates keys with values in a map.",
          examples: [
            { code: `final stock = {'apple': 4, 'pear': 0};
stock['plum'] = 7;
final apples = stock['apple'];`, notes: [{ at: "stock['plum']", text: "adds or replaces a key" }] },
            { code: `final prices = <String, double>{'tea': 2.5, 'cake': 4.0};
prices.remove('tea');
print(prices.containsKey('cake'));`, notes: [] },
            { code: `final ages = {'ada': 36, 'linus': 54};
for (final entry in ages.entries) {
  print('\${entry.key}: \${entry.value}');
}`, notes: [{ at: "entries", text: "key and value pairs" }] }
          ]
        },
        {
          id: "sets", n: 3, title: "sets", level: 1,
          gloss: "Keeps unique items in a set and combines sets with set operations.",
          examples: [
            { code: `final tags = <String>{'dart', 'web'};
tags.add('dart');
tags.add('cli');`, notes: [{ at: "add", text: "ignores duplicates" }] },
            { code: `final a = {1, 2, 3};
final b = {3, 4};
print(a.union(b));
print(a.intersection(b));`, notes: [{ at: "union", text: "items in either set" }] },
            { code: `final seen = <int>{};
for (final n in [4, 4, 7]) {
  if (!seen.add(n)) print('repeat $n');
}`, notes: [{ at: "seen.add", text: "false when already present" }] }
          ]
        },
        {
          id: "collection-literals", n: 4, title: "collection if, for and spread", level: 2,
          gloss: "Builds collections with spread, if and for elements.",
          examples: [
            { code: `final base = [1, 2];
final all = [...base, 3, 4];`, notes: [{ at: "...", text: "spread operator" }] },
            { code: `final admin = true;
final menu = ['home', if (admin) 'settings', 'help'];`, notes: [{ at: "if", text: "conditional element" }] },
            { code: `final names = ['ada', 'grace'];
final tags = [for (final n in names) n.toUpperCase()];`, notes: [{ at: "for", text: "loop inside a literal" }] }
          ]
        }
      ]
    },
    {
      id: "functions-named-parameters",
      n: 4,
      title: "functions & named parameters",
      concepts: [
        {
          id: "functions-and-arrows", n: 1, title: "functions and arrow syntax", level: 1,
          gloss: "Defines functions with block bodies or the arrow shorthand.",
          examples: [
            { code: `int square(int n) => n * n;`, notes: [{ at: "=>", text: "single expression body" }] },
            { code: `double area(double w, double h) => w * h;
bool isEven(int n) => n % 2 == 0;`, notes: [] },
            { code: `String greet(String name) {
  return 'Hello, $name';
}`, notes: [{ at: "return", text: "block body needs return" }] }
          ]
        },
        {
          id: "optional-positional", n: 2, title: "optional positional parameters", level: 2,
          gloss: "Makes trailing positional parameters optional with square brackets.",
          examples: [
            { code: `String join(String a, [String b = '', String c = '']) {
  return '$a$b$c';
}`, notes: [{ at: "[", text: "optional positional group" }] },
            { code: `int add(int a, [int? b]) => a + (b ?? 0);`, notes: [{ at: "int? b", text: "optional without a default" }] },
            { code: `void log(String message, [String level = 'info']) {
  print('[$level] $message');
}`, notes: [] }
          ]
        },
        {
          id: "named-parameters", n: 3, title: "named and required parameters", level: 1,
          gloss: "Takes labelled arguments with braces, defaults and required.",
          examples: [
            { code: `void connect({required String host, int port = 80}) {
  print('$host:$port');
}`, notes: [{ at: "required", text: "caller must pass it" }, { at: "port = 80", text: "default value" }] },
            { code: `double price({required double base, double tax = 0.2}) {
  return base * (1 + tax);
}`, notes: [] },
            { code: `void send(String to, {String? subject, bool urgent = false}) {
  print('$to $subject $urgent');
}`, notes: [{ at: "{String? subject", text: "optional named" }] }
          ]
        },
        {
          id: "functions-as-values", n: 4, title: "functions as values", level: 2,
          gloss: "Stores and passes functions as first-class values.",
          examples: [
            { code: `final doubler = (int n) => n * 2;
print(doubler(4));`, notes: [{ at: "(int n) =>", text: "anonymous function" }] },
            { code: `List<int> apply(List<int> xs, int Function(int) f) {
  return xs.map(f).toList();
}`, notes: [{ at: "int Function(int)", text: "function type" }] },
            { code: `final names = ['ada', 'grace'];
names.forEach((n) => print(n));
final lengths = names.map((n) => n.length).toList();`, notes: [{ at: "map", text: "lazy until toList" }] }
          ]
        }
      ]
    },
    {
      id: "classes-constructors",
      n: 5,
      title: "classes & constructors",
      concepts: [
        {
          id: "fields-and-methods", n: 1, title: "fields and methods", level: 1,
          gloss: "Groups state and behaviour in a class with fields and methods.",
          examples: [
            { code: `class Counter {
  int value = 0;
  void increment() => value++;
}`, notes: [{ at: "value++", text: "mutates the field" }] },
            { code: `class Rectangle {
  double width = 0;
  double height = 0;
  double get area => width * height;
}`, notes: [{ at: "get", text: "computed property" }] },
            { code: `class Temperature {
  double celsius = 20;
  double toFahrenheit() => celsius * 9 / 5 + 32;
}`, notes: [] }
          ]
        },
        {
          id: "initializing-formals", n: 2, title: "initializing formals", level: 1,
          gloss: "Assigns fields directly from constructor parameters with this.",
          examples: [
            { code: `class User {
  final String name;
  final int age;
  User(this.name, this.age);
}`, notes: [{ at: "this.name", text: "assigns the field" }] },
            { code: `class Point {
  final double x;
  final double y;
  const Point(this.x, this.y);
}`, notes: [{ at: "const", text: "allows compile-time instances" }] },
            { code: `class Item {
  final String sku;
  final int qty;
  Item({required this.sku, this.qty = 1});
}`, notes: [{ at: "this.qty = 1", text: "named with default" }] },
            { code: `class Circle {
  final double radius;
  final double area;
  Circle(this.radius) : area = 3.14159 * radius * radius;
}`, notes: [{ at: ": area", text: "initializer list" }] }
          ]
        },
        {
          id: "named-constructors", n: 3, title: "named constructors", level: 2,
          gloss: "Adds alternative constructors with distinct names.",
          examples: [
            { code: `class Point {
  final double x;
  final double y;
  Point(this.x, this.y);
  Point.origin() : x = 0, y = 0;
}`, notes: [{ at: "Point.origin", text: "named constructor" }] },
            { code: `class Color {
  final int value;
  Color(this.value);
  Color.fromHex(String hex) : value = int.parse(hex, radix: 16);
}`, notes: [{ at: "radix: 16", text: "parses hexadecimal" }] },
            { code: `class Range {
  final int start;
  final int end;
  Range(this.start, this.end);
  Range.upTo(int end) : this(0, end);
}`, notes: [{ at: ": this", text: "redirects to another constructor" }] }
          ]
        },
        {
          id: "factory-constructors", n: 4, title: "factory constructors", level: 3,
          gloss: "Returns shared or computed instances with factory constructors.",
          examples: [
            { code: `class Logger {
  static final Logger _instance = Logger._();
  Logger._();
  factory Logger() => _instance;
}`, notes: [{ at: "Logger._", text: "private constructor" }, { at: "factory", text: "may return an existing object" }] },
            { code: `class Config {
  final Map<String, String> values;
  Config(this.values);
  factory Config.empty() => Config({});
}`, notes: [] },
            { code: `class User {
  final String name;
  User(this.name);
  factory User.fromJson(Map<String, dynamic> json) {
    return User(json['name'] as String);
  }
}`, notes: [{ at: "as String", text: "cast from dynamic" }] }
          ]
        }
      ]
    },
    {
      id: "inheritance-mixins",
      n: 6,
      title: "inheritance & mixins",
      concepts: [
        {
          id: "extends-and-super", n: 1, title: "extends and super", level: 1,
          gloss: "Reuses and overrides behaviour with extends and super.",
          examples: [
            { code: `class Animal {
  void speak() => print('...');
}
class Dog extends Animal {
  @override
  void speak() => print('woof');
}`, notes: [{ at: "extends", text: "inherits members" }, { at: "@override", text: "replaces the parent method" }] },
            { code: `class Vehicle {
  final int wheels;
  Vehicle(this.wheels);
}
class Bike extends Vehicle {
  Bike() : super(2);
}`, notes: [{ at: "super(2)", text: "calls the parent constructor" }] },
            { code: `class Employee {
  String describe() => 'employee';
}
class Manager extends Employee {
  @override
  String describe() => 'manager, \${super.describe()}';
}`, notes: [] }
          ]
        },
        {
          id: "abstract-classes", n: 2, title: "abstract classes", level: 2,
          gloss: "Declares members that subclasses must implement.",
          examples: [
            { code: `abstract class Shape {
  double area();
}
class Square extends Shape {
  final double side;
  Square(this.side);
  @override
  double area() => side * side;
}`, notes: [{ at: "abstract", text: "cannot be instantiated" }] },
            { code: `abstract class Repository {
  Future<String> load(String id);
  void log(String message) => print(message);
}`, notes: [{ at: "load", text: "no body, must be overridden" }] },
            { code: `abstract class Payment {
  double get fee;
  double total(double amount) => amount + fee;
}`, notes: [{ at: "get fee", text: "abstract getter" }] }
          ]
        },
        {
          id: "implements-interfaces", n: 3, title: "implements and interfaces", level: 2,
          gloss: "Promises an interface with implements and overrides every member.",
          examples: [
            { code: `abstract interface class Greeter {
  String greet(String name);
}
class Formal implements Greeter {
  @override
  String greet(String name) => 'Good day, $name';
}`, notes: [{ at: "interface", text: "can only be implemented" }] },
            { code: `class Printer {
  void printLine(String s) => print(s);
}
class Quiet implements Printer {
  @override
  void printLine(String s) {}
}`, notes: [{ at: "implements", text: "no inherited code" }] },
            { code: `class Version implements Comparable<Version> {
  final int major;
  Version(this.major);
  @override
  int compareTo(Version other) => major.compareTo(other.major);
}`, notes: [] }
          ]
        },
        {
          id: "mixins", n: 4, title: "mixins", level: 2,
          gloss: "Shares behaviour across classes with mixins and with.",
          examples: [
            { code: `mixin Walker {
  void walk() => print('walking');
}
class Robot with Walker {}`, notes: [{ at: "with", text: "applies the mixin" }] },
            { code: `mixin Logging {
  void log(String message) => print('[log] $message');
}
class Service with Logging {
  void run() => log('running');
}`, notes: [] },
            { code: `class Animal {}
mixin Swimmer on Animal {
  void swim() => print('swimming');
}
class Fish extends Animal with Swimmer {}`, notes: [{ at: "on Animal", text: "restricts which classes can use it" }] }
          ]
        }
      ]
    },
    {
      id: "future-async-await",
      n: 7,
      title: "Future & async/await",
      concepts: [
        {
          id: "async-and-await", n: 1, title: "async functions and await", level: 1,
          gloss: "Writes asynchronous code that reads top to bottom with async and await.",
          examples: [
            { code: `Future<String> fetchName() async {
  await Future.delayed(const Duration(seconds: 1));
  return 'ada';
}`, notes: [{ at: "async", text: "wraps the result in a Future" }, { at: "await", text: "pauses until completion" }] },
            { code: `Future<int> total() async {
  final a = await Future.value(2);
  final b = await Future.value(3);
  return a + b;
}`, notes: [] },
            { code: `Future<void> main() async {
  final name = await Future.value('ada');
  print(name);
}`, notes: [{ at: "Future<void>", text: "async main" }] }
          ]
        },
        {
          id: "creating-futures", n: 2, title: "creating futures", level: 2,
          gloss: "Creates futures that complete with a value, an error or a computation.",
          examples: [
            { code: `final ready = Future.value(42);
final failed = Future<int>.error(StateError('no data'));`, notes: [{ at: "Future.value", text: "already completed" }] },
            { code: `final later = Future.delayed(
  const Duration(milliseconds: 50),
  () => 'done',
);`, notes: [{ at: "delayed", text: "completes after a pause" }] },
            { code: `Future<int> compute() {
  return Future(() => 6 * 7);
}`, notes: [{ at: "Future(", text: "runs the callback soon" }] }
          ]
        },
        {
          id: "future-errors", n: 3, title: "handling future errors", level: 2,
          gloss: "Catches failed futures with try, on and catchError.",
          examples: [
            { code: `Future<void> load() async {
  try {
    await Future.error(Exception('offline'));
  } catch (e) {
    print('failed: $e');
  }
}`, notes: [{ at: "catch", text: "receives the thrown error" }] },
            { code: `Future<int> parse(String raw) async {
  try {
    return int.parse(raw);
  } on FormatException {
    return -1;
  } finally {
    print('parsed');
  }
}`, notes: [{ at: "on FormatException", text: "match one error type" }] },
            { code: `Future<String> fetch() => Future.error(Exception('timeout'));
final safe = fetch().catchError((e) => 'fallback');`, notes: [{ at: "catchError", text: "handler value replaces failure" }] }
          ]
        },
        {
          id: "waiting-on-futures", n: 4, title: "running futures together", level: 2,
          gloss: "Starts several futures at once and waits for all of them.",
          examples: [
            { code: `Future<void> run() async {
  final results = await Future.wait([
    Future.value(1),
    Future.value(2),
  ]);
  print(results);
}`, notes: [{ at: "Future.wait", text: "collects results in order" }] },
            { code: `Future<void> run() async {
  final a = Future.delayed(const Duration(seconds: 1), () => 1);
  final b = Future.delayed(const Duration(seconds: 1), () => 2);
  print(await a + await b);
}`, notes: [{ at: "final b", text: "starts before any await" }] },
            { code: `Future<String> slow() {
  return Future.delayed(const Duration(seconds: 5), () => 'ok');
}
final limited = slow().timeout(const Duration(seconds: 1));`, notes: [{ at: "timeout", text: "fails after the duration" }] }
          ]
        }
      ]
    },
    {
      id: "streams",
      n: 8,
      title: "Streams",
      concepts: [
        {
          id: "creating-streams", n: 1, title: "creating streams", level: 1,
          gloss: "Produces a sequence of values over time with async* or stream constructors.",
          examples: [
            { code: `Stream<int> countTo(int n) async* {
  for (var i = 1; i <= n; i++) {
    yield i;
  }
}`, notes: [{ at: "async*", text: "generator of a Stream" }, { at: "yield", text: "emits one value" }] },
            { code: `final letters = Stream.fromIterable(['a', 'b', 'c']);`, notes: [{ at: "fromIterable", text: "stream from a list" }] },
            { code: `final ticks = Stream.periodic(const Duration(seconds: 1), (i) => i);`, notes: [{ at: "periodic", text: "emits at a fixed interval" }] }
          ]
        },
        {
          id: "consuming-streams", n: 2, title: "consuming streams", level: 1,
          gloss: "Reads stream events with await for or listen.",
          examples: [
            { code: `Future<void> main() async {
  await for (final n in Stream.fromIterable([1, 2, 3])) {
    print(n);
  }
}`, notes: [{ at: "await for", text: "loops over events" }] },
            { code: `final numbers = Stream.fromIterable([1, 2, 3]);
final sub = numbers.listen(
  print,
  onDone: () => print('done'),
);`, notes: [{ at: "listen", text: "callback style" }] },
            { code: `Future<int> sum(Stream<int> values) async {
  var total = 0;
  await for (final v in values) {
    total += v;
  }
  return total;
}`, notes: [] }
          ]
        },
        {
          id: "stream-transformations", n: 3, title: "stream transformations", level: 2,
          gloss: "Reshapes streams with map, where, take and toList.",
          examples: [
            { code: `final squares = Stream.fromIterable([1, 2, 3, 4]).map((n) => n * n);`, notes: [{ at: "map", text: "transforms each event" }] },
            { code: `final source = Stream.fromIterable([1, 2, 3, 4, 5, 6]);
final evens = source.where((n) => n.isEven);`, notes: [{ at: "where", text: "filters events" }] },
            { code: `Future<List<int>> firstTwo(Stream<int> s) {
  return s.take(2).toList();
}`, notes: [{ at: "take", text: "stops after two events" }] }
          ]
        },
        {
          id: "stream-controllers", n: 4, title: "StreamController", level: 3,
          gloss: "Pushes events into a stream by hand with a StreamController.",
          examples: [
            { code: `import 'dart:async';

final controller = StreamController<String>();
controller.add('first');
controller.close();`, notes: [{ at: "StreamController", text: "sink and stream pair" }] },
            { code: `import 'dart:async';

final events = StreamController<int>.broadcast();
events.stream.listen((n) => print('a $n'));
events.stream.listen((n) => print('b $n'));`, notes: [{ at: "broadcast", text: "many listeners allowed" }] },
            { code: `import 'dart:async';

final log = StreamController<String>();
log.stream.listen(print);
log.add('started');
log.addError(StateError('failed'));`, notes: [{ at: "addError", text: "emits an error event" }] }
          ]
        }
      ]
    },
    {
      id: "records-patterns",
      n: 9,
      title: "records & patterns",
      concepts: [
        {
          id: "records", n: 1, title: "records", level: 1,
          gloss: "Bundles several values into a record with positional or named fields.",
          examples: [
            { code: `final point = (3, 4);
final named = (name: 'ada', age: 36);`, notes: [{ at: "(3, 4)", text: "positional record" }, { at: "name:", text: "named field" }] },
            { code: `(int, String) pair() => (1, 'one');`, notes: [{ at: "(int, String)", text: "record type" }] },
            { code: `final user = (name: 'grace', id: 7);
print(user.name);
print(user.id);`, notes: [{ at: "user.name", text: "named field access" }] }
          ]
        },
        {
          id: "destructuring", n: 2, title: "destructuring", level: 2,
          gloss: "Unpacks records and collections into variables with patterns.",
          examples: [
            { code: `final (x, y) = (3, 4);
print(x + y);`, notes: [{ at: "(x, y)", text: "record pattern" }] },
            { code: `final (:name, :age) = (name: 'ada', age: 36);
print('$name is $age');`, notes: [{ at: ":name", text: "binds a variable called name" }] },
            { code: `final [first, second] = [10, 20];
print(first + second);`, notes: [{ at: "[first, second]", text: "list pattern" }] }
          ]
        },
        {
          id: "switch-patterns", n: 3, title: "switch with patterns", level: 2,
          gloss: "Matches on type, shape and value in a switch statement.",
          examples: [
            { code: `void show(Object value) {
  switch (value) {
    case (int a, int b):
      print(a + b);
    case String s:
      print(s);
    default:
      print('other');
  }
}`, notes: [{ at: "(int a, int b)", text: "record shape" }, { at: "String s", text: "type test and bind" }] },
            { code: `void check(int n) {
  switch (n) {
    case 0:
      print('zero');
    case > 0 && < 10:
      print('digit');
    default:
      print('large or negative');
  }
}`, notes: [{ at: "> 0 && < 10", text: "relational patterns" }] },
            { code: `void route(List<String> parts) {
  switch (parts) {
    case ['home']:
      print('home');
    case ['user', var id]:
      print('user $id');
  }
}`, notes: [{ at: "var id", text: "binds the second element" }] }
          ]
        },
        {
          id: "if-case-and-objects", n: 4, title: "if-case and object patterns", level: 3,
          gloss: "Tests and destructures values with if-case and object patterns.",
          examples: [
            { code: `void parse(Map<String, Object?> json) {
  if (json case {'name': String name, 'age': int age}) {
    print('$name $age');
  }
}`, notes: [{ at: "if (json case", text: "pattern test in an if" }] },
            { code: `class Point {
  final int x;
  final int y;
  Point(this.x, this.y);
}
String place(Point p) => switch (p) {
  Point(x: 0, y: 0) => 'origin',
  Point(:var x) when x < 0 => 'left',
  Point() => 'elsewhere',
};`, notes: [{ at: "when", text: "extra guard condition" }] },
            { code: `void total(Object? v) {
  if (v case int n when n > 100) {
    print('big $n');
  }
}`, notes: [{ at: "int n", text: "type pattern" }] }
          ]
        }
      ]
    },
    {
      id: "enums-switch-expressions",
      n: 10,
      title: "enums & switch expressions",
      concepts: [
        {
          id: "simple-enums", n: 1, title: "simple enums", level: 1,
          gloss: "Names a fixed set of constants with an enum.",
          examples: [
            { code: `enum Status { active, paused, closed }`, notes: [{ at: "enum", text: "fixed set of values" }] },
            { code: `enum Level { low, medium, high }
final current = Level.medium;
final all = Level.values;`, notes: [{ at: "values", text: "list of every constant" }] },
            { code: `enum Direction { north, east, south, west }
void main() {
  print(Direction.east.name);
  print(Direction.east.index);
}`, notes: [{ at: "name", text: "constant as a string" }, { at: "index", text: "zero-based position" }] }
          ]
        },
        {
          id: "enhanced-enums", n: 2, title: "enhanced enums", level: 2,
          gloss: "Gives enum constants fields, constructors and methods.",
          examples: [
            { code: `enum Planet {
  earth(5.97),
  mars(0.642);

  const Planet(this.mass);
  final double mass;
}`, notes: [{ at: "earth(5.97)", text: "constructor arguments" }] },
            { code: `enum Coin {
  penny(1),
  dime(10);

  final int cents;
  const Coin(this.cents);
  String get label => '$cents cents';
}`, notes: [] },
            { code: `enum Weekday {
  mon, tue, wed;

  bool get isFirst => this == Weekday.mon;
}`, notes: [{ at: ";", text: "ends the constant list" }] }
          ]
        },
        {
          id: "switch-expressions", n: 3, title: "switch expressions", level: 1,
          gloss: "Returns a value from a switch expression with arrow cases.",
          examples: [
            { code: `enum Level { low, medium, high }
String label(Level level) => switch (level) {
  Level.low => 'ok',
  Level.medium => 'watch',
  Level.high => 'act',
};`, notes: [{ at: "switch", text: "expression, not statement" }, { at: "Level.high", text: "exhaustive without default" }] },
            { code: `int score(String grade) => switch (grade) {
  'A' => 4,
  'B' => 3,
  _ => 0,
};`, notes: [{ at: "_", text: "wildcard case" }] },
            { code: `String describe(int n) => switch (n) {
  0 => 'zero',
  > 0 && < 10 => 'digit',
  _ => 'big',
};`, notes: [] }
          ]
        },
        {
          id: "sealed-classes", n: 4, title: "sealed classes", level: 3,
          gloss: "Closes a class hierarchy so switches can check every case.",
          examples: [
            { code: `sealed class Result {}
class Ok extends Result {
  final int value;
  Ok(this.value);
}
class Failure extends Result {}
int unwrap(Result r) => switch (r) {
  Ok(:final value) => value,
  Failure() => -1,
};`, notes: [{ at: "sealed", text: "subtypes known to the compiler" }] },
            { code: `sealed class Event {}
class Click extends Event {}
class Key extends Event {
  final String code;
  Key(this.code);
}
String name(Event e) => switch (e) {
  Click() => 'click',
  Key(:final code) => 'key $code',
};`, notes: [] },
            { code: `sealed class Light {}
class Red extends Light {}
class Green extends Light {}
String action(Light l) {
  return switch (l) {
    Red() => 'stop',
    Green() => 'go',
  };
}`, notes: [{ at: "switch", text: "compiler checks every case" }] }
          ]
        }
      ]
    },
    {
      id: "extension-methods",
      n: 11,
      title: "extension methods",
      concepts: [
        {
          id: "extending-types", n: 1, title: "extending built-in types", level: 2,
          gloss: "Adds methods to an existing type with an extension.",
          examples: [
            { code: `extension StringX on String {
  bool get isBlank => trim().isEmpty;
}`, notes: [{ at: "extension", text: "adds members to String" }] },
            { code: `extension on String {
  String capitalized() {
    if (isEmpty) return this;
    return this[0].toUpperCase() + substring(1);
  }
}`, notes: [{ at: "extension on", text: "unnamed extension" }] },
            { code: `extension DurationX on int {
  Duration get seconds => Duration(seconds: this);
  Duration get minutes => Duration(minutes: this);
}`, notes: [{ at: "this", text: "the int being extended" }] }
          ]
        },
        {
          id: "extension-use", n: 2, title: "calling extensions", level: 2,
          gloss: "Calls extension members like ordinary members on the target type.",
          examples: [
            { code: `extension StringX on String {
  String get initial => isEmpty ? '' : this[0];
}
final first = 'dart'.initial;`, notes: [{ at: "'dart'.initial", text: "used like a getter" }] },
            { code: `extension IntX on int {
  bool get isPositive => this > 0;
}
final yes = 5.isPositive;
final no = (-2).isPositive;`, notes: [{ at: "(-2)", text: "parentheses keep the sign" }] },
            { code: `extension ListX on List<int> {
  int get total => fold(0, (a, b) => a + b);
}
final sum = [1, 2, 3].total;`, notes: [{ at: "on List<int>", text: "only applies to int lists" }] }
          ]
        },
        {
          id: "generic-and-nullable-extensions", n: 3, title: "generic and nullable extensions", level: 3,
          gloss: "Writes extensions with type parameters or on nullable types.",
          examples: [
            { code: `extension ListX<T> on List<T> {
  T? get secondOrNull => length > 1 ? this[1] : null;
}`, notes: [{ at: "<T>", text: "works for any element type" }] },
            { code: `extension on String? {
  bool get isNullOrEmpty => this?.isEmpty ?? true;
}`, notes: [{ at: "String?", text: "receiver may be null" }] },
            { code: `extension IterableX<T> on Iterable<T> {
  List<T> toSortedList(int Function(T, T) compare) {
    return toList()..sort(compare);
  }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "generics",
      n: 12,
      title: "generics",
      concepts: [
        {
          id: "generic-classes", n: 1, title: "generic classes", level: 2,
          gloss: "Parameterises a class over a type with angle brackets.",
          examples: [
            { code: `class Box<T> {
  final T value;
  Box(this.value);
}`, notes: [{ at: "<T>", text: "type parameter" }] },
            { code: `class Stack<E> {
  final List<E> _items = [];
  void push(E item) => _items.add(item);
  E pop() => _items.removeLast();
}`, notes: [{ at: "_items", text: "private to the library" }] },
            { code: `class Pair<A, B> {
  final A first;
  final B second;
  const Pair(this.first, this.second);
}`, notes: [{ at: "<A, B>", text: "two type parameters" }] }
          ]
        },
        {
          id: "generic-functions", n: 2, title: "generic functions", level: 2,
          gloss: "Writes functions that work for any type with a type parameter.",
          examples: [
            { code: `T firstOf<T>(List<T> items) => items.first;`, notes: [{ at: "firstOf<T>", text: "type inferred from the call" }] },
            { code: `T pick<T>(bool flag, T a, T b) => flag ? a : b;`, notes: [] },
            { code: `List<R> mapAll<T, R>(List<T> xs, R Function(T) f) {
  return xs.map(f).toList();
}`, notes: [{ at: "R Function(T)", text: "generic function type" }] }
          ]
        },
        {
          id: "bounded-types", n: 3, title: "bounded type parameters", level: 3,
          gloss: "Restricts a type parameter with extends.",
          examples: [
            { code: `T largest<T extends num>(List<T> xs) {
  return xs.reduce((a, b) => a > b ? a : b);
}`, notes: [{ at: "extends num", text: "only numbers allowed" }] },
            { code: `class Cache<T extends Comparable<T>> {
  final List<T> items = [];
  void add(T item) => items.add(item);
}`, notes: [] },
            { code: `double sum<T extends num>(Iterable<T> xs) {
  return xs.fold(0.0, (a, b) => a + b);
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "exceptions",
      n: 13,
      title: "exceptions",
      concepts: [
        {
          id: "try-and-catch", n: 1, title: "try, on and catch", level: 1,
          gloss: "Handles errors with try, on and catch clauses.",
          examples: [
            { code: `try {
  final n = int.parse('abc');
  print(n);
} on FormatException {
  print('not a number');
}`, notes: [{ at: "on", text: "filters by type" }] },
            { code: `try {
  final items = <int>[];
  print(items.first);
} catch (e) {
  print('error: $e');
}`, notes: [{ at: "catch (e)", text: "any thrown object" }] },
            { code: `void risky() => throw ArgumentError('bad input');
try {
  risky();
} on ArgumentError catch (e) {
  print(e.message);
} on Exception {
  print('other');
}`, notes: [{ at: "on ArgumentError catch", text: "type plus variable" }] }
          ]
        },
        {
          id: "throwing", n: 2, title: "throwing exceptions", level: 1,
          gloss: "Signals a failure with throw and a standard error type.",
          examples: [
            { code: `void withdraw(double balance, double amount) {
  if (amount > balance) {
    throw ArgumentError('insufficient funds');
  }
}`, notes: [{ at: "throw", text: "raises an error" }] },
            { code: `int divide(int a, int b) {
  if (b == 0) throw StateError('division by zero');
  return a ~/ b;
}`, notes: [{ at: "~/", text: "integer division" }] },
            { code: `void checkAge(int age) {
  if (age < 0) throw RangeError.value(age, 'age');
}`, notes: [] }
          ]
        },
        {
          id: "custom-exceptions", n: 3, title: "custom exceptions", level: 2,
          gloss: "Defines exception types by implementing Exception.",
          examples: [
            { code: `class ValidationException implements Exception {
  final String message;
  ValidationException(this.message);
}`, notes: [{ at: "implements Exception", text: "marks recoverable errors" }] },
            { code: `class NotFound implements Exception {
  final String id;
  const NotFound(this.id);
  @override
  String toString() => 'NotFound: $id';
}`, notes: [] },
            { code: `class ApiError extends Error {
  final int status;
  ApiError(this.status);
}`, notes: [{ at: "extends Error", text: "programmer errors" }] }
          ]
        },
        {
          id: "finally-and-rethrow", n: 4, title: "finally and rethrow", level: 2,
          gloss: "Runs cleanup with finally and passes errors on with rethrow.",
          examples: [
            { code: `final out = StringBuffer();
try {
  out.write('data');
} finally {
  out.clear();
}`, notes: [{ at: "finally", text: "always runs" }] },
            { code: `try {
  int.parse('x');
} catch (e) {
  print('logging');
  rethrow;
}`, notes: [{ at: "rethrow", text: "keeps the original stack" }] },
            { code: `try {
  int.parse('x');
} catch (e, stack) {
  print(e);
  print(stack);
}`, notes: [{ at: "stack", text: "second catch parameter" }] }
          ]
        }
      ]
    },
    {
      id: "statelesswidget",
      n: 14,
      title: "StatelessWidget",
      concepts: [
        {
          id: "minimal-stateless", n: 1, title: "a minimal StatelessWidget", level: 1,
          gloss: "Describes fixed UI by overriding build in a StatelessWidget.",
          examples: [
            { code: `class Greeting extends StatelessWidget {
  const Greeting({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('Hello');
  }
}`, notes: [{ at: "StatelessWidget", text: "needs package:flutter/material.dart" }, { at: "build", text: "returns the widget tree" }] },
            { code: `class Logo extends StatelessWidget {
  const Logo({super.key});

  @override
  Widget build(BuildContext context) {
    return const Icon(Icons.flutter_dash);
  }
}`, notes: [] },
            { code: `class Gap extends StatelessWidget {
  const Gap({super.key});

  @override
  Widget build(BuildContext context) => const SizedBox(height: 8);
}`, notes: [] }
          ]
        },
        {
          id: "widget-parameters", n: 2, title: "widget parameters", level: 1,
          gloss: "Passes configuration into a widget through final constructor fields.",
          examples: [
            { code: `class SectionTitle extends StatelessWidget {
  const SectionTitle({super.key, required this.text});
  final String text;

  @override
  Widget build(BuildContext context) => Text(text);
}`, notes: [{ at: "required this.text", text: "named argument" }] },
            { code: `class CountBadge extends StatelessWidget {
  const CountBadge({super.key, required this.count});
  final int count;

  @override
  Widget build(BuildContext context) {
    return Text('$count new');
  }
}`, notes: [] },
            { code: `class PriceTag extends StatelessWidget {
  const PriceTag({super.key, required this.amount, this.unit = 'EUR'});
  final double amount;
  final String unit;

  @override
  Widget build(BuildContext context) => Text('$amount $unit');
}`, notes: [] }
          ]
        },
        {
          id: "composing-widgets", n: 3, title: "composing widgets", level: 2,
          gloss: "Nests widgets with Column, Row, Padding and Center.",
          examples: [
            { code: `class Profile extends StatelessWidget {
  const Profile({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [Text('Ada'), Text('Engineer')],
    );
  }
}`, notes: [{ at: "children", text: "list of child widgets" }] },
            { code: `class Rating extends StatelessWidget {
  const Rating({super.key});

  @override
  Widget build(BuildContext context) {
    return const Row(children: [Icon(Icons.star), Text('4.5')]);
  }
}`, notes: [] },
            { code: `class Welcome extends StatelessWidget {
  const Welcome({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.all(16),
      child: Center(child: Text('Welcome')),
    );
  }
}`, notes: [{ at: "child", text: "single child widget" }] }
          ]
        },
        {
          id: "styling-widgets", n: 4, title: "styling text and boxes", level: 2,
          gloss: "Styles widgets with TextStyle, Container and colors.",
          examples: [
            { code: `class Heading extends StatelessWidget {
  const Heading({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text(
      'Total',
      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
    );
  }
}`, notes: [{ at: "TextStyle", text: "font size and weight" }] },
            { code: `class NoteCard extends StatelessWidget {
  const NoteCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      color: Colors.amber,
      child: const Text('Note'),
    );
  }
}`, notes: [] },
            { code: `class Spaced extends StatelessWidget {
  const Spaced({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [Text('One'), SizedBox(height: 8), Text('Two')],
    );
  }
}`, notes: [{ at: "mainAxisAlignment", text: "centres along the column" }] }
          ]
        }
      ]
    },
    {
      id: "statefulwidget-setstate",
      n: 15,
      title: "StatefulWidget & setState",
      concepts: [
        {
          id: "stateful-skeleton", n: 1, title: "StatefulWidget and State", level: 1,
          gloss: "Pairs a StatefulWidget with a State class that holds mutable fields.",
          examples: [
            { code: `class Counter extends StatefulWidget {
  const Counter({super.key});
  @override
  State<Counter> createState() => _CounterState();
}
class _CounterState extends State<Counter> {
  int count = 0;
  @override
  Widget build(BuildContext context) => Text('$count');
}`, notes: [{ at: "StatefulWidget", text: "needs package:flutter/material.dart" }, { at: "createState", text: "creates the State object" }, { at: "int count", text: "state lives in the State class" }] },
            { code: `class Clock extends StatefulWidget {
  const Clock({super.key});
  @override
  State<Clock> createState() => _ClockState();
}
class _ClockState extends State<Clock> {
  String label = 'idle';
  @override
  Widget build(BuildContext context) => Text(label);
}`, notes: [] },
            { code: `class Likes extends StatefulWidget {
  const Likes({super.key});
  @override
  State<Likes> createState() => _LikesState();
}
class _LikesState extends State<Likes> {
  bool liked = false;
  @override
  Widget build(BuildContext context) => Text(liked ? 'liked' : 'like');
}`, notes: [] }
          ]
        },
        {
          id: "set-state", n: 2, title: "updating with setState", level: 1,
          gloss: "Rebuilds the widget after a change by calling setState.",
          examples: [
            { code: `class Counter extends StatefulWidget {
  @override
  State<Counter> createState() => _CounterState();
}
class _CounterState extends State<Counter> {
  int count = 0;
  @override
  Widget build(BuildContext context) => TextButton(
    onPressed: () => setState(() => count++),
    child: Text('$count'),
  );
}`, notes: [{ at: "setState", text: "schedules a rebuild" }, { at: "count++", text: "change inside the callback" }] },
            { code: `class Toggle extends StatefulWidget {
  @override
  State<Toggle> createState() => _ToggleState();
}
class _ToggleState extends State<Toggle> {
  bool on = false;
  @override
  Widget build(BuildContext context) => TextButton(
    onPressed: () => setState(() => on = !on),
    child: Text(on ? 'on' : 'off'),
  );
}`, notes: [{ at: "!on", text: "flips the boolean" }] },
            { code: `class Todos extends StatefulWidget {
  @override
  State<Todos> createState() => _TodosState();
}
class _TodosState extends State<Todos> {
  final items = <String>[];
  @override
  Widget build(BuildContext context) => TextButton(
    onPressed: () => setState(() => items.add('task')),
    child: Text('\${items.length}'),
  );
}`, notes: [{ at: "items.add", text: "mutates the list in place" }] }
          ]
        },
        {
          id: "lifecycle", n: 3, title: "initState and dispose", level: 2,
          gloss: "Sets up and releases resources in initState and dispose.",
          examples: [
            { code: `class Clock extends StatefulWidget {
  @override
  State<Clock> createState() => _ClockState();
}
class _ClockState extends State<Clock> {
  int ticks = 0;
  @override
  void initState() { super.initState(); ticks = 1; }
  @override
  Widget build(BuildContext context) => Text('$ticks');
}`, notes: [{ at: "initState", text: "runs once before build" }, { at: "super.initState", text: "call it first" }] },
            { code: `class Search extends StatefulWidget {
  @override
  State<Search> createState() => _SearchState();
}
class _SearchState extends State<Search> {
  final input = TextEditingController();
  @override
  void dispose() { input.dispose(); super.dispose(); }
  @override
  Widget build(BuildContext context) => const Text('search');
}`, notes: [{ at: "dispose", text: "release resources here" }, { at: "super.dispose", text: "call it last" }] },
            { code: `class Report extends StatefulWidget {
  @override
  State<Report> createState() => _ReportState();
}
class _ReportState extends State<Report> {
  late final List<int> data;
  @override
  void initState() { super.initState(); data = [1, 2, 3]; }
  @override
  Widget build(BuildContext context) => Text('\${data.length}');
}`, notes: [{ at: "late final", text: "assigned once in initState" }] }
          ]
        },
        {
          id: "widget-property", n: 4, title: "reading widget properties", level: 2,
          gloss: "Reads constructor arguments from the State class through widget.",
          examples: [
            { code: `class Greeter extends StatefulWidget {
  const Greeter({super.key, required this.name});
  final String name;
  @override
  State<Greeter> createState() => _GreeterState();
}
class _GreeterState extends State<Greeter> {
  @override
  Widget build(BuildContext context) => Text('Hi \${widget.name}');
}`, notes: [{ at: "widget.name", text: "reads the widget field" }] },
            { code: `class Quantity extends StatefulWidget {
  const Quantity({super.key, this.start = 0});
  final int start;
  @override
  State<Quantity> createState() => _QuantityState();
}
class _QuantityState extends State<Quantity> {
  late int value = widget.start;
  @override
  Widget build(BuildContext context) => Text('$value');
}`, notes: [{ at: "late int", text: "initialised on first use" }] },
            { code: `class Panel extends StatefulWidget {
  const Panel({super.key, required this.title});
  final String title;
  @override
  State<Panel> createState() => _PanelState();
}
class _PanelState extends State<Panel> {
  bool open = false;
  @override
  Widget build(BuildContext context) => Text(open ? widget.title : '-');
}`, notes: [] }
          ]
        }
      ]
    }
  ]
};
