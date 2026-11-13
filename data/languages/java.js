export default {
  id: "java",
  name: "Java",
  short: "JV",
  pigment: "java",
  family: null,
  version: "25",
  lexer: "java",
  indent: 4,
  topics: [
    {
      id: "basics-types",
      n: 1,
      title: "basics & types",
      concepts: [
        {
          id: "variables", n: 1, title: "variables", level: 1,
          gloss: "Declares typed variables for numbers, text and flags.",
          examples: [
            { code: `int count = 3;
double price = 9.99;
boolean ready = true;`, notes: [{ at: "int", text: "a 32-bit whole number" }] },
            { code: `long big = 3_000_000_000L;
float ratio = 0.5f;
char grade = 'A';`, notes: [{ at: "3_000_000_000L", text: "the L makes it a long" }] },
            { code: `final int MAX = 100;
String name = "ada";`, notes: [{ at: "final", text: "cannot be reassigned" }] }
          ]
        },
        {
          id: "operators", n: 2, title: "operators", level: 1,
          gloss: "Combines values with arithmetic, comparison and logical operators.",
          examples: [
            { code: `int a = 7;
int b = 2;
int q = a / b;
int r = a % b;`, notes: [{ at: "a / b", text: "integer division drops the fraction" }] },
            { code: `int a = 7, b = 2;
boolean ok = a > 3 && b < 5;`, notes: [{ at: "&&", text: "both sides must be true" }] },
            { code: `int n = 5;
n += 2;
n++;`, notes: [] }
          ]
        },
        {
          id: "casting", n: 3, title: "casting and parsing", level: 2,
          gloss: "Converts between numeric types with casts and parse methods.",
          examples: [
            { code: `double d = 3.7;
int i = (int) d;`, notes: [{ at: "(int)", text: "truncates toward zero" }] },
            { code: `int n = Integer.parseInt("42");
double x = Double.parseDouble("2.5");`, notes: [{ at: "parseInt", text: "throws on bad input" }] },
            { code: `int small = 10;
long wide = small;
double f = wide;`, notes: [{ at: "wide", text: "widening needs no cast" }] }
          ]
        },
        {
          id: "conditionals", n: 4, title: "conditionals", level: 1,
          gloss: "Branches with if, else and the ternary operator.",
          examples: [
            { code: `int age = 20;
if (age >= 18) {
    System.out.println("adult");
} else {
    System.out.println("minor");
}`, notes: [] },
            { code: `int score = 82;
String grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";`, notes: [{ at: "?", text: "the ternary operator" }] },
            { code: `int n = 7;
boolean even = n % 2 == 0;
if (!even) {
    System.out.println("odd");
}`, notes: [] }
          ]
        },
        {
          id: "loops", n: 5, title: "loops", level: 1,
          gloss: "Repeats work with for, while and enhanced for loops.",
          examples: [
            { code: `for (int i = 0; i < 3; i++) {
    System.out.println(i);
}`, notes: [] },
            { code: `int[] nums = {1, 2, 3};
for (int n : nums) {
    System.out.println(n);
}`, notes: [{ at: "int n : nums", text: "the enhanced for loop" }] },
            { code: `int n = 3;
while (n > 0) {
    n--;
}`, notes: [] }
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
          id: "string-basics", n: 1, title: "string basics", level: 1,
          gloss: "Reads and compares strings with length, charAt and equals.",
          examples: [
            { code: `String s = "hello";
int n = s.length();
char first = s.charAt(0);`, notes: [{ at: "charAt(0)", text: "indexes start at 0" }] },
            { code: `String a = "java";
String b = "Java";
boolean same = a.equals(b);`, notes: [{ at: "equals", text: "compares content, not identity" }] },
            { code: `String a = "java";
String b = "JAVA";
boolean same = a.equalsIgnoreCase(b);`, notes: [] }
          ]
        },
        {
          id: "string-methods", n: 2, title: "string methods", level: 1,
          gloss: "Transforms and searches strings with built-in methods.",
          examples: [
            { code: `String s = "  Hello  ";
String t = s.trim().toUpperCase();`, notes: [{ at: "trim()", text: "returns a new string" }] },
            { code: `String csv = "a,b,c";
String[] parts = csv.split(",");
String joined = String.join("-", parts);`, notes: [] },
            { code: `String s = "hello world";
boolean has = s.contains("world");
int i = s.indexOf('o');`, notes: [{ at: "indexOf", text: "-1 when not found" }] }
          ]
        },
        {
          id: "substring-replace", n: 3, title: "substrings and replacing", level: 2,
          gloss: "Cuts and replaces parts of a string.",
          examples: [
            { code: `String s = "hello world";
String w = s.substring(6);
String h = s.substring(0, 5);`, notes: [{ at: "substring(0, 5)", text: "the end index is excluded" }] },
            { code: `String t = "a-b-c".replace("-", "+");`, notes: [{ at: "replace", text: "every occurrence" }] },
            { code: `String t = "2024-05".replaceAll("(\\\\d+)-(\\\\d+)", "$2/$1");`, notes: [{ at: "\"$2/$1\"", text: "refers to the captured groups" }] }
          ]
        },
        {
          id: "string-builder", n: 4, title: "StringBuilder", level: 2,
          gloss: "Builds strings efficiently with StringBuilder.",
          examples: [
            { code: `StringBuilder sb = new StringBuilder();
sb.append("a").append(1);
String s = sb.toString();`, notes: [{ at: "append", text: "returns the builder, so calls chain" }] },
            { code: `StringBuilder sb = new StringBuilder("hello");
sb.insert(0, ">> ");
sb.reverse();`, notes: [] },
            { code: `StringBuilder sb = new StringBuilder();
for (int i = 0; i < 3; i++) {
    sb.append(i).append(',');
}`, notes: [] }
          ]
        },
        {
          id: "formatting", n: 5, title: "formatting", level: 2,
          gloss: "Formats text with String.format and formatted.",
          examples: [
            { code: `String s = String.format("%s is %d", "ada", 36);`, notes: [{ at: "%s is %d", text: "placeholders by type" }] },
            { code: `String s = String.format("%.2f", 3.14159);`, notes: [{ at: "%.2f", text: "two decimal places" }] },
            { code: `String s = "%s has %d items".formatted("cart", 3);`, notes: [{ at: "formatted", text: "an instance method form" }] }
          ]
        }
      ]
    },
    {
      id: "arrays-arraylist",
      n: 3,
      title: "arrays & ArrayList",
      concepts: [
        {
          id: "arrays", n: 1, title: "arrays", level: 1,
          gloss: "Stores a fixed-size sequence of values of one type.",
          examples: [
            { code: `int[] nums = {1, 2, 3};
int first = nums[0];`, notes: [{ at: "{1, 2, 3}", text: "an array initializer" }] },
            { code: `int[] zeros = new int[5];
zeros[2] = 9;`, notes: [{ at: "new int[5]", text: "elements start at 0" }] },
            { code: `String[] names = {"ada", "grace"};
int n = names.length;`, notes: [{ at: "length", text: "a field, not a method" }] }
          ]
        },
        {
          id: "array-utilities", n: 2, title: "Arrays helpers", level: 2,
          gloss: "Handles sorting, copying and printing with the Arrays class.",
          examples: [
            { code: `int[] nums = {3, 1, 2};
Arrays.sort(nums);`, notes: [{ at: "sort", text: "sorts in place" }] },
            { code: `int[] a = {1, 2, 3};
int[] b = Arrays.copyOf(a, 5);`, notes: [{ at: "copyOf(a, 5)", text: "pads with zeros" }] },
            { code: `int[] nums = {1, 2, 3};
System.out.println(Arrays.toString(nums));`, notes: [{ at: "toString", text: "a readable form of an array" }] }
          ]
        },
        {
          id: "arraylist-basics", n: 3, title: "ArrayList", level: 1,
          gloss: "Grows and shrinks a list with ArrayList.",
          examples: [
            { code: `List<String> names = new ArrayList<>();
names.add("ada");
names.add("grace");`, notes: [{ at: "<>", text: "the type argument is inferred" }] },
            { code: `List<Integer> nums = new ArrayList<>(List.of(3, 1, 2));
nums.remove(Integer.valueOf(1));`, notes: [{ at: "Integer.valueOf", text: "removes the value, not the index" }] },
            { code: `List<String> items = new ArrayList<>(List.of("a", "b", "c"));
items.remove(0);
int n = items.size();`, notes: [{ at: "remove(0)", text: "removes by index" }] }
          ]
        },
        {
          id: "list-operations", n: 4, title: "list operations", level: 2,
          gloss: "Searches and sorts a List.",
          examples: [
            { code: `List<Integer> nums = new ArrayList<>(List.of(3, 1, 2));
Collections.sort(nums);`, notes: [] },
            { code: `List<String> names = List.of("ada", "grace");
boolean has = names.contains("ada");
int i = names.indexOf("grace");`, notes: [] },
            { code: `List<Integer> nums = new ArrayList<>(List.of(3, 1, 2));
nums.sort(Comparator.reverseOrder());`, notes: [{ at: "Comparator.reverseOrder()", text: "largest first" }] }
          ]
        },
        {
          id: "immutable-lists", n: 5, title: "immutable lists", level: 2,
          gloss: "Creates unmodifiable lists with List.of and List.copyOf.",
          examples: [
            { code: `List<String> names = List.of("ada", "grace");`, notes: [{ at: "List.of", text: "cannot be changed afterwards" }] },
            { code: `List<Integer> source = new ArrayList<>(List.of(1, 2));
List<Integer> copy = List.copyOf(source);`, notes: [{ at: "copyOf", text: "a frozen snapshot" }] },
            { code: `List<String> base = new ArrayList<>(List.of("a"));
List<String> view = Collections.unmodifiableList(base);`, notes: [{ at: "unmodifiableList", text: "a read-only view" }] }
          ]
        }
      ]
    },
    {
      id: "hashmap-collections",
      n: 4,
      title: "HashMap & collections",
      concepts: [
        {
          id: "hashmap-basics", n: 1, title: "HashMap", level: 1,
          gloss: "Maps keys to values with HashMap.",
          examples: [
            { code: `Map<String, Integer> ages = new HashMap<>();
ages.put("ada", 36);
ages.put("grace", 85);`, notes: [{ at: "put", text: "replaces an existing key" }] },
            { code: `Map<String, Integer> ages = new HashMap<>(Map.of("ada", 36));
Integer age = ages.get("ada");`, notes: [{ at: "get", text: "null when the key is missing" }] },
            { code: `Map<String, Integer> m = new HashMap<>();
m.put("a", 1);
m.remove("a");
boolean has = m.containsKey("a");`, notes: [] }
          ]
        },
        {
          id: "map-lookup", n: 2, title: "safe lookups", level: 2,
          gloss: "Reads values safely with getOrDefault, putIfAbsent and merge.",
          examples: [
            { code: `Map<String, Integer> m = new HashMap<>();
int n = m.getOrDefault("x", 0);`, notes: [{ at: "getOrDefault", text: "a fallback for a missing key" }] },
            { code: `Map<String, Integer> m = new HashMap<>();
m.putIfAbsent("a", 1);
m.putIfAbsent("a", 2);`, notes: [{ at: "putIfAbsent", text: "keeps the first value" }] },
            { code: `Map<String, Integer> counts = new HashMap<>();
for (String w : List.of("a", "b", "a")) {
    counts.merge(w, 1, Integer::sum);
}`, notes: [{ at: "merge", text: "adds to the existing value" }] }
          ]
        },
        {
          id: "map-iteration", n: 3, title: "iterating a Map", level: 1,
          gloss: "Loops over the entries, keys or values of a Map.",
          examples: [
            { code: `Map<String, Integer> ages = Map.of("ada", 36);
for (Map.Entry<String, Integer> e : ages.entrySet()) {
    System.out.println(e.getKey() + "=" + e.getValue());
}`, notes: [{ at: "entrySet()", text: "key and value together" }] },
            { code: `Map<String, Integer> ages = Map.of("ada", 36);
for (String name : ages.keySet()) {
    System.out.println(name);
}`, notes: [] },
            { code: `Map<String, Integer> ages = Map.of("ada", 36);
ages.forEach((k, v) -> System.out.println(k + " " + v));`, notes: [{ at: "(k, v)", text: "a lambda over each entry" }] }
          ]
        },
        {
          id: "sets", n: 4, title: "sets", level: 1,
          gloss: "Keeps unique values with HashSet and TreeSet.",
          examples: [
            { code: `Set<Integer> seen = new HashSet<>();
boolean added = seen.add(3);
boolean again = seen.add(3);`, notes: [{ at: "add", text: "false for a duplicate" }] },
            { code: `Set<String> sorted = new TreeSet<>(List.of("b", "a", "c"));`, notes: [{ at: "TreeSet", text: "keeps elements sorted" }] },
            { code: `Set<Integer> a = new HashSet<>(List.of(1, 2, 3));
Set<Integer> b = Set.of(2, 3, 4);
a.retainAll(b);`, notes: [{ at: "retainAll", text: "keeps only shared items" }] }
          ]
        },
        {
          id: "queues-deques", n: 5, title: "queues and deques", level: 2,
          gloss: "Processes items first in, first out with Queue and Deque.",
          examples: [
            { code: `Queue<String> q = new ArrayDeque<>();
q.offer("a");
String next = q.poll();`, notes: [{ at: "poll", text: "null when empty" }] },
            { code: `Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);
int top = stack.pop();`, notes: [{ at: "stack.push(1)", text: "a stack with Deque" }] },
            { code: `PriorityQueue<Integer> pq = new PriorityQueue<>(List.of(3, 1, 2));
int smallest = pq.poll();`, notes: [{ at: "PriorityQueue", text: "smallest first" }] }
          ]
        }
      ]
    },
    {
      id: "classes-objects",
      n: 5,
      title: "classes & objects",
      concepts: [
        {
          id: "class-basics", n: 1, title: "class basics", level: 1,
          gloss: "Defines a class with fields, a constructor and methods.",
          examples: [
            { code: `class Dog {
    String name;
    Dog(String name) {
        this.name = name;
    }
    String speak() {
        return name + " barks";
    }
}`, notes: [{ at: "this.name = name", text: "this separates field from parameter" }] },
            { code: `class Counter {
    private int count;
    void increment() {
        count++;
    }
    int value() {
        return count;
    }
}`, notes: [{ at: "private", text: "hidden from other classes" }] },
            { code: `class Point {
    final int x;
    final int y;
    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}`, notes: [{ at: "final", text: "set once in the constructor" }] }
          ]
        },
        {
          id: "creating-objects", n: 2, title: "creating objects", level: 1,
          gloss: "Creates instances with new and calls their members.",
          examples: [
            { code: `class Dog { String name; Dog(String n) { name = n; } }
Dog d = new Dog("rex");
System.out.println(d.name);`, notes: [{ at: "new Dog", text: "calls the constructor" }] },
            { code: `class Box { int size = 3; }
Box a = new Box();
Box b = a;
b.size = 9;`, notes: [{ at: "Box b = a", text: "both names refer to one object" }] },
            { code: `class Light { boolean on; }
Light l = new Light();
l.on = !l.on;`, notes: [] }
          ]
        },
        {
          id: "constructors-overload", n: 3, title: "overloaded constructors", level: 2,
          gloss: "Overloads constructors and chains them with this.",
          examples: [
            { code: `class User {
    String name;
    int age;
    User(String name) {
        this(name, 0);
    }
    User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}`, notes: [{ at: "this(name, 0)", text: "calls the other constructor" }] },
            { code: `class Temp {
    double c;
    Temp() {
        c = 20.0;
    }
    Temp(double c) {
        this.c = c;
    }
}`, notes: [] },
            { code: `class Greeter {
    String greet() { return "hi"; }
    String greet(String name) { return "hi " + name; }
}`, notes: [{ at: "greet(String name)", text: "an overload: same name, new parameters" }] }
          ]
        },
        {
          id: "static-members", n: 4, title: "static members", level: 2,
          gloss: "Shares data and helpers across all instances with static.",
          examples: [
            { code: `class Id {
    private static int next = 1;
    static int make() {
        return next++;
    }
}`, notes: [{ at: "static", text: "one copy for the whole class" }] },
            { code: `class MathUtil {
    static int square(int n) {
        return n * n;
    }
}
int r = MathUtil.square(4);`, notes: [{ at: "MathUtil.square", text: "called on the class" }] },
            { code: `class Config {
    static final String NAME = "app";
}
String n = Config.NAME;`, notes: [] }
          ]
        },
        {
          id: "inheritance", n: 5, title: "inheritance", level: 2,
          gloss: "Extends a class and overrides its methods.",
          examples: [
            { code: `class Animal {
    String speak() { return "..."; }
}
class Dog extends Animal {
    @Override
    String speak() { return "woof"; }
}`, notes: [{ at: "@Override", text: "the compiler checks it overrides" }] },
            { code: `class Base {
    String name() { return "base"; }
}
class Child extends Base {
    String name() { return super.name() + "+child"; }
}`, notes: [{ at: "super.name()", text: "calls the parent version" }] },
            { code: `abstract class Shape {
    abstract double area();
}
class Square extends Shape {
    double side = 2;
    double area() { return side * side; }
}`, notes: [{ at: "abstract", text: "subclasses must implement area" }] }
          ]
        }
      ]
    },
    {
      id: "interfaces-polymorphism",
      n: 6,
      title: "interfaces & polymorphism",
      concepts: [
        {
          id: "interfaces", n: 1, title: "interfaces", level: 1,
          gloss: "Declares a contract that classes implement.",
          examples: [
            { code: `interface Shape {
    double area();
}`, notes: [{ at: "area()", text: "implicitly public and abstract" }] },
            { code: `interface Greeter {
    String name();
    default String greet() {
        return "hi " + name();
    }
}`, notes: [{ at: "default", text: "a method body inside an interface" }] },
            { code: `interface Util {
    static int twice(int n) {
        return n * 2;
    }
}`, notes: [] }
          ]
        },
        {
          id: "implementing", n: 2, title: "implementing interfaces", level: 1,
          gloss: "Implements interfaces in classes.",
          examples: [
            { code: `interface Shape { double area(); }
class Circle implements Shape {
    double r = 1;
    public double area() { return Math.PI * r * r; }
}`, notes: [{ at: "public", text: "interface methods are public" }] },
            { code: `class Name implements Comparable<Name> {
    String v = "";
    public int compareTo(Name o) { return v.compareTo(o.v); }
}`, notes: [{ at: "Comparable<Name>", text: "enables sorting" }] },
            { code: `class Res implements AutoCloseable {
    public void close() { System.out.println("closed"); }
}`, notes: [{ at: "AutoCloseable", text: "works with try-with-resources" }] }
          ]
        },
        {
          id: "polymorphism", n: 3, title: "polymorphism", level: 2,
          gloss: "Calls the right method through a shared type.",
          examples: [
            { code: `interface Animal { String speak(); }
class Dog implements Animal {
    public String speak() { return "woof"; }
}
class Cat implements Animal {
    public String speak() { return "meow"; }
}
for (Animal a : List.of(new Dog(), new Cat())) {
    System.out.println(a.speak());
}`, notes: [{ at: "Animal a", text: "the variable type is the interface" }] },
            { code: `Object o = "text";
System.out.println(o.toString());
System.out.println(o instanceof String);`, notes: [{ at: "instanceof", text: "tests the real type" }] },
            { code: `List<Number> nums = List.of(1, 2.5, 3L);
double total = 0;
for (Number n : nums) {
    total += n.doubleValue();
}`, notes: [] }
          ]
        },
        {
          id: "functional-interfaces", n: 4, title: "functional interfaces", level: 2,
          gloss: "Marks an interface with one abstract method for lambdas.",
          examples: [
            { code: `@FunctionalInterface
interface Op {
    int apply(int a, int b);
}`, notes: [{ at: "@FunctionalInterface", text: "the compiler checks for one method" }] },
            { code: `interface Op { int apply(int a, int b); }
Op add = (a, b) -> a + b;
int r = add.apply(2, 3);`, notes: [{ at: "(a, b) ->", text: "a lambda implements the method" }] },
            { code: `Function<Integer, Integer> inc = n -> n + 1;
Supplier<String> s = () -> "x";
Predicate<String> empty = String::isEmpty;`, notes: [{ at: "Predicate", text: "takes a value, returns boolean" }] }
          ]
        }
      ]
    },
    {
      id: "records",
      n: 7,
      title: "records",
      concepts: [
        {
          id: "record-basics", n: 1, title: "record basics", level: 2,
          gloss: "Declares an immutable data carrier in one line.",
          examples: [
            { code: `record Point(int x, int y) {}
Point p = new Point(1, 2);
int x = p.x();`, notes: [{ at: "p.x()", text: "accessors have no get prefix" }] },
            { code: `record User(String name, int age) {}
User u = new User("ada", 36);
System.out.println(u);`, notes: [{ at: "println(u)", text: "toString is generated" }] },
            { code: `record Pair(int a, int b) {}
boolean same = new Pair(1, 2).equals(new Pair(1, 2));`, notes: [{ at: "equals", text: "compares the components" }] }
          ]
        },
        {
          id: "compact-constructors", n: 2, title: "compact constructors", level: 3,
          gloss: "Validates or normalizes components in a compact constructor.",
          examples: [
            { code: `record Range(int lo, int hi) {
    Range {
        if (lo > hi) throw new IllegalArgumentException("lo > hi");
    }
}`, notes: [{ at: "Range {", text: "no parameter list, runs before assigning" }] },
            { code: `record Name(String value) {
    Name {
        value = value.trim();
    }
}`, notes: [{ at: "value = value.trim()", text: "reassigns the parameter" }] },
            { code: `record Email(String address) {
    Email {
        if (!address.contains("@")) {
            throw new IllegalArgumentException(address);
        }
    }
}`, notes: [] }
          ]
        },
        {
          id: "record-members", n: 3, title: "record members", level: 2,
          gloss: "Adds methods and static factories to a record.",
          examples: [
            { code: `record Rect(double w, double h) {
    double area() {
        return w * h;
    }
}`, notes: [{ at: "w * h", text: "components are readable by name" }] },
            { code: `record Point(int x, int y) {
    static Point origin() {
        return new Point(0, 0);
    }
}`, notes: [{ at: "static", text: "a factory method" }] },
            { code: `record Temp(double celsius) {
    double fahrenheit() {
        return celsius * 9 / 5 + 32;
    }
}`, notes: [] }
          ]
        },
        {
          id: "record-patterns", n: 4, title: "record patterns", level: 3,
          gloss: "Deconstructs records inside instanceof and switch.",
          examples: [
            { code: `record Point(int x, int y) {}
Object o = new Point(1, 2);
if (o instanceof Point(int x, int y)) {
    System.out.println(x + y);
}`, notes: [{ at: "Point(int x, int y)", text: "binds the components" }] },
            { code: `record Point(int x, int y) {}
Point p = new Point(0, 5);
String where = switch (p) {
    case Point(int x, int y) when x == 0 -> "on the y axis";
    default -> "elsewhere";
};`, notes: [{ at: "when x == 0", text: "a guard on the pattern" }] },
            { code: `record Box(Object content) {}
Object o = new Box("hi");
if (o instanceof Box(String s)) {
    System.out.println(s.length());
}`, notes: [{ at: "Box(String s)", text: "a nested type pattern" }] }
          ]
        }
      ]
    },
    {
      id: "enums",
      n: 8,
      title: "enums",
      concepts: [
        {
          id: "enum-basics", n: 1, title: "enum basics", level: 1,
          gloss: "Names a fixed set of constants with enum.",
          examples: [
            { code: `enum Color { RED, GREEN, BLUE }
Color c = Color.GREEN;`, notes: [{ at: "Color.GREEN", text: "constants live in the enum" }] },
            { code: `enum Day { MON, TUE, WED }
for (Day d : Day.values()) {
    System.out.println(d);
}`, notes: [{ at: "values()", text: "every constant in order" }] },
            { code: `enum Level { LOW, HIGH }
Level l = Level.valueOf("HIGH");
int pos = l.ordinal();`, notes: [{ at: "ordinal()", text: "the position, starting at 0" }] }
          ]
        },
        {
          id: "enum-fields", n: 2, title: "enum fields", level: 2,
          gloss: "Gives enum constants fields, constructors and methods.",
          examples: [
            { code: `enum Planet {
    EARTH(5.97), MARS(0.64);
    final double mass;
    Planet(double mass) {
        this.mass = mass;
    }
}`, notes: [{ at: "EARTH(5.97)", text: "arguments go to the constructor" }] },
            { code: `enum Size {
    S(1), M(2), L(3);
    private final int code;
    Size(int code) { this.code = code; }
    int code() { return code; }
}`, notes: [] },
            { code: `enum Op {
    ADD("+"), SUB("-");
    final String symbol;
    Op(String symbol) { this.symbol = symbol; }
}`, notes: [] }
          ]
        },
        {
          id: "enum-switch", n: 3, title: "switching on enums", level: 2,
          gloss: "Switches over enum constants.",
          examples: [
            { code: `enum Light { RED, GREEN }
Light l = Light.RED;
String action = switch (l) {
    case RED -> "stop";
    case GREEN -> "go";
};`, notes: [{ at: "case GREEN", text: "every constant covered, no default" }] },
            { code: `enum Day { SAT, SUN, MON }
Day d = Day.SAT;
boolean weekend = switch (d) {
    case SAT, SUN -> true;
    default -> false;
};`, notes: [{ at: "SAT, SUN", text: "several labels in one case" }] },
            { code: `enum Level { LOW, HIGH }
Level l = Level.LOW;
switch (l) {
    case LOW:
        System.out.println("low");
        break;
    case HIGH:
        System.out.println("high");
        break;
}`, notes: [{ at: "break", text: "old-style cases fall through without it" }] }
          ]
        },
        {
          id: "enum-collections", n: 4, title: "EnumMap and EnumSet", level: 3,
          gloss: "Uses EnumMap and EnumSet for enum keys.",
          examples: [
            { code: `enum Day { MON, TUE }
Map<Day, String> plan = new EnumMap<>(Day.class);
plan.put(Day.MON, "gym");`, notes: [{ at: "EnumMap", text: "ordered by the enum, fast" }] },
            { code: `enum Perm { READ, WRITE, EXEC }
Set<Perm> p = EnumSet.of(Perm.READ, Perm.WRITE);`, notes: [{ at: "EnumSet", text: "a compact set of constants" }] },
            { code: `enum Perm { READ, WRITE }
Set<Perm> all = EnumSet.allOf(Perm.class);
Set<Perm> none = EnumSet.noneOf(Perm.class);`, notes: [{ at: "allOf", text: "every constant" }] }
          ]
        }
      ]
    },
    {
      id: "generics",
      n: 9,
      title: "generics",
      concepts: [
        {
          id: "generic-classes", n: 1, title: "generic classes", level: 2,
          gloss: "Declares a class that stores a type chosen by the caller.",
          examples: [
            { code: `class Box<T> {
    private T value;
    Box(T value) { this.value = value; }
    T get() { return value; }
}
Box<String> b = new Box<>("hi");`, notes: [{ at: "Box<T>", text: "the type is a placeholder" }] },
            { code: `class Pair<A, B> {
    final A first;
    final B second;
    Pair(A first, B second) {
        this.first = first;
        this.second = second;
    }
}`, notes: [{ at: "<A, B>", text: "several type parameters" }] },
            { code: `class Stack<T> {
    private final List<T> items = new ArrayList<>();
    void push(T x) { items.add(x); }
    T pop() { return items.remove(items.size() - 1); }
}`, notes: [] }
          ]
        },
        {
          id: "generic-methods", n: 2, title: "generic methods", level: 2,
          gloss: "Writes one method that works for many types.",
          examples: [
            { code: `static <T> T first(List<T> items) {
    return items.get(0);
}`, notes: [{ at: "<T>", text: "declared before the return type" }] },
            { code: `static <T> void printAll(List<T> items) {
    for (T it : items) {
        System.out.println(it);
    }
}`, notes: [] },
            { code: `static <A, B> Map<A, B> single(A k, B v) {
    return Map.of(k, v);
}`, notes: [{ at: "<A, B>", text: "inferred at each call" }] }
          ]
        },
        {
          id: "bounded-types", n: 3, title: "bounded types", level: 3,
          gloss: "Limits type parameters with extends.",
          examples: [
            { code: `static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}`, notes: [{ at: "extends Comparable<T>", text: "the type must be comparable" }] },
            { code: `static <T extends Number> double sum(List<T> xs) {
    double s = 0;
    for (T x : xs) {
        s += x.doubleValue();
    }
    return s;
}`, notes: [{ at: "T extends Number", text: "numeric methods are available" }] },
            { code: `class Cache<K extends Comparable<K>, V> {
    final TreeMap<K, V> map = new TreeMap<>();
}`, notes: [] }
          ]
        },
        {
          id: "wildcards", n: 4, title: "wildcards", level: 3,
          gloss: "Accepts families of types with wildcards.",
          examples: [
            { code: `static double total(List<? extends Number> xs) {
    double t = 0;
    for (Number n : xs) {
        t += n.doubleValue();
    }
    return t;
}`, notes: [{ at: "? extends Number", text: "read-only: any Number subtype" }] },
            { code: `static void fill(List<? super Integer> xs) {
    xs.add(1);
    xs.add(2);
}`, notes: [{ at: "? super Integer", text: "write-friendly: Integer or a parent" }] },
            { code: `static void show(List<?> xs) {
    System.out.println(xs.size());
}`, notes: [{ at: "List<?>", text: "a list of anything" }] }
          ]
        }
      ]
    },
    {
      id: "lambdas-streams",
      n: 10,
      title: "lambdas & streams",
      concepts: [
        {
          id: "lambdas", n: 1, title: "lambdas", level: 2,
          gloss: "Writes short functions with lambda syntax.",
          examples: [
            { code: `Function<Integer, Integer> square = x -> x * x;
int r = square.apply(4);`, notes: [{ at: "x -> x * x", text: "parameter, arrow, body" }] },
            { code: `BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
int r = add.apply(2, 3);`, notes: [] },
            { code: `Runnable r = () -> System.out.println("run");
r.run();`, notes: [{ at: "() ->", text: "no parameters" }] }
          ]
        },
        {
          id: "method-references", n: 2, title: "method references", level: 2,
          gloss: "Refers to an existing method instead of writing a lambda.",
          examples: [
            { code: `List<String> names = List.of("ada", "grace");
names.forEach(System.out::println);`, notes: [{ at: "System.out::println", text: "a method reference" }] },
            { code: `Function<String, Integer> len = String::length;`, notes: [{ at: "String::length", text: "an instance method of the argument" }] },
            { code: `Supplier<List<String>> make = ArrayList::new;`, notes: [{ at: "ArrayList::new", text: "a constructor reference" }] }
          ]
        },
        {
          id: "stream-basics", n: 3, title: "stream basics", level: 2,
          gloss: "Transforms collections with filter, map and collect.",
          examples: [
            { code: `List<Integer> evens = Stream.of(1, 2, 3, 4)
    .filter(n -> n % 2 == 0)
    .toList();`, notes: [{ at: "toList()", text: "an unmodifiable list" }] },
            { code: `List<String> upper = List.of("a", "b").stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());`, notes: [{ at: "map", text: "one output per input" }] },
            { code: `int total = List.of(1, 2, 3).stream()
    .mapToInt(Integer::intValue)
    .sum();`, notes: [{ at: "mapToInt", text: "a primitive stream with sum" }] }
          ]
        },
        {
          id: "stream-terminals", n: 4, title: "terminal operations", level: 2,
          gloss: "Ends a stream with reduce, count and matching operations.",
          examples: [
            { code: `long n = Stream.of("a", "bb", "ccc")
    .filter(s -> s.length() > 1)
    .count();`, notes: [{ at: "count()", text: "ends the stream with a number" }] },
            { code: `boolean any = Stream.of(1, 2, 3).anyMatch(n -> n > 2);
boolean all = Stream.of(1, 2, 3).allMatch(n -> n > 0);`, notes: [{ at: "anyMatch", text: "stops at the first match" }] },
            { code: `int product = Stream.of(1, 2, 3, 4).reduce(1, (a, b) -> a * b);`, notes: [{ at: "reduce(1,", text: "the starting value" }] }
          ]
        },
        {
          id: "collectors", n: 5, title: "collectors", level: 3,
          gloss: "Groups and joins stream results with Collectors.",
          examples: [
            { code: `Map<Integer, List<String>> byLen = Stream.of("a", "bb", "cc")
    .collect(Collectors.groupingBy(String::length));`, notes: [{ at: "groupingBy", text: "a map from key to list" }] },
            { code: `String joined = Stream.of("a", "b", "c")
    .collect(Collectors.joining(", "));`, notes: [{ at: "joining", text: "a delimiter between items" }] },
            { code: `Map<Boolean, List<Integer>> parts = Stream.of(1, 2, 3, 4)
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));`, notes: [{ at: "partitioningBy", text: "two groups, true and false" }] }
          ]
        }
      ]
    },
    {
      id: "optional",
      n: 11,
      title: "Optional",
      concepts: [
        {
          id: "optional-basics", n: 1, title: "Optional basics", level: 2,
          gloss: "Represents a value that may be absent.",
          examples: [
            { code: `Optional<String> name = Optional.of("ada");
Optional<String> none = Optional.empty();`, notes: [{ at: "Optional.empty()", text: "no value present" }] },
            { code: `String raw = null;
Optional<String> maybe = Optional.ofNullable(raw);`, notes: [{ at: "ofNullable", text: "accepts null, gives empty" }] },
            { code: `Optional<Integer> n = Optional.of(5);
boolean present = n.isPresent();`, notes: [] }
          ]
        },
        {
          id: "optional-values", n: 2, title: "reading the value", level: 2,
          gloss: "Reads the value with orElse, orElseGet and orElseThrow.",
          examples: [
            { code: `Optional<String> name = Optional.empty();
String s = name.orElse("guest");`, notes: [{ at: "orElse", text: "a default value" }] },
            { code: `Optional<String> name = Optional.empty();
String s = name.orElseGet(() -> "guest");`, notes: [{ at: "orElseGet", text: "computed only when empty" }] },
            { code: `Optional<String> name = Optional.of("ada");
String s = name.orElseThrow();`, notes: [{ at: "orElseThrow", text: "throws if empty" }] }
          ]
        },
        {
          id: "optional-transform", n: 3, title: "transforming", level: 3,
          gloss: "Transforms an Optional with map, filter and flatMap.",
          examples: [
            { code: `Optional<String> name = Optional.of("ada");
Optional<Integer> len = name.map(String::length);`, notes: [{ at: "map", text: "applies only when present" }] },
            { code: `Optional<Integer> n = Optional.of(5);
Optional<Integer> big = n.filter(x -> x > 3);`, notes: [{ at: "filter", text: "empties the Optional on false" }] },
            { code: `Optional<String> name = Optional.of("ada");
Optional<String> first = name.flatMap(
    s -> Optional.of(s.substring(0, 1)));`, notes: [{ at: "flatMap", text: "the function returns an Optional" }] }
          ]
        },
        {
          id: "optional-ifpresent", n: 4, title: "acting on a value", level: 2,
          gloss: "Acts on a present value without a null check.",
          examples: [
            { code: `Optional<String> name = Optional.of("ada");
name.ifPresent(System.out::println);`, notes: [{ at: "ifPresent", text: "runs only when present" }] },
            { code: `Optional<String> name = Optional.empty();
name.ifPresentOrElse(
    s -> System.out.println(s),
    () -> System.out.println("none"));`, notes: [{ at: "ifPresentOrElse", text: "a branch for each case" }] },
            { code: `List<Integer> nums = List.of(1, 2, 3);
Optional<Integer> max = nums.stream().max(Integer::compare);
max.ifPresent(m -> System.out.println(m));`, notes: [{ at: "max", text: "an empty stream gives an empty Optional" }] }
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
          id: "try-catch", n: 1, title: "try and catch", level: 1,
          gloss: "Handles runtime errors with try and catch.",
          examples: [
            { code: `try {
    int n = Integer.parseInt("x");
} catch (NumberFormatException e) {
    System.out.println(e.getMessage());
}`, notes: [{ at: "NumberFormatException", text: "catches only this type" }] },
            { code: `try {
    int[] a = new int[2];
    a[5] = 1;
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("bad index");
}`, notes: [] },
            { code: `try {
    Object o = "x";
    Integer i = (Integer) o;
} catch (ClassCastException | NullPointerException e) {
    System.out.println(e.getClass().getSimpleName());
}`, notes: [{ at: "ClassCastException | NullPointerException", text: "one handler, two types" }] }
          ]
        },
        {
          id: "finally-resources", n: 2, title: "finally and resources", level: 2,
          gloss: "Runs cleanup with finally and try-with-resources.",
          examples: [
            { code: `try {
    System.out.println("work");
} finally {
    System.out.println("cleanup");
}`, notes: [{ at: "finally", text: "runs whether or not it threw" }] },
            { code: `try (var reader = new java.io.StringReader("hi")) {
    System.out.println(reader.read());
} catch (java.io.IOException e) {
    System.out.println("io");
}`, notes: [{ at: "try (", text: "closes the resource automatically" }] },
            { code: `class Res implements AutoCloseable {
    public void close() { System.out.println("closed"); }
}
try (Res r = new Res()) {
    System.out.println("using");
}`, notes: [] }
          ]
        },
        {
          id: "throwing", n: 3, title: "throwing", level: 1,
          gloss: "Raises exceptions with throw and declares them with throws.",
          examples: [
            { code: `static void check(int age) {
    if (age < 0) throw new IllegalArgumentException("age < 0");
}`, notes: [{ at: "IllegalArgumentException", text: "unchecked, no throws needed" }] },
            { code: `static String read(String path) throws java.io.IOException {
    return java.nio.file.Files.readString(java.nio.file.Path.of(path));
}`, notes: [{ at: "throws", text: "callers must handle or declare it" }] },
            { code: `try {
    throw new IllegalStateException("bad state");
} catch (RuntimeException e) {
    System.out.println(e.getMessage());
}`, notes: [] }
          ]
        },
        {
          id: "custom-exceptions", n: 4, title: "custom exceptions", level: 2,
          gloss: "Defines your own exception types.",
          examples: [
            { code: `class NotFoundException extends Exception {
    NotFoundException(String message) {
        super(message);
    }
}`, notes: [{ at: "extends Exception", text: "a checked exception" }] },
            { code: `class InvalidInput extends RuntimeException {
    InvalidInput(String msg) { super(msg); }
}`, notes: [{ at: "RuntimeException", text: "unchecked, no throws needed" }] },
            { code: `class AppException extends Exception {
    AppException(String msg, Throwable cause) {
        super(msg, cause);
    }
}`, notes: [{ at: "cause", text: "keeps the original error" }] }
          ]
        }
      ]
    },
    {
      id: "switch-pattern-matching",
      n: 13,
      title: "switch expressions & pattern matching",
      concepts: [
        {
          id: "switch-expressions", n: 1, title: "switch expressions", level: 2,
          gloss: "Returns a value from a switch expression.",
          examples: [
            { code: `int day = 3;
String name = switch (day) {
    case 1 -> "mon";
    case 2 -> "tue";
    default -> "other";
};`, notes: [{ at: "->", text: "no fall-through" }] },
            { code: `String s = "b";
int n = switch (s) {
    case "a", "b" -> 1;
    default -> 0;
};`, notes: [{ at: "\"a\", \"b\"", text: "several labels in one case" }] },
            { code: `int n = 7;
String size = switch (n) {
    case 1, 2, 3 -> "small";
    default -> {
        String label = n > 100 ? "huge" : "large";
        yield label;
    }
};`, notes: [{ at: "yield", text: "returns from a block branch" }] }
          ]
        },
        {
          id: "type-patterns", n: 2, title: "type patterns", level: 2,
          gloss: "Tests an object's type and binds it in one step.",
          examples: [
            { code: `Object o = "hello";
if (o instanceof String s) {
    System.out.println(s.length());
}`, notes: [{ at: "String s", text: "a pattern variable" }] },
            { code: `Object o = 42;
String text = switch (o) {
    case Integer i -> "int " + i;
    case String s -> "string " + s;
    default -> "other";
};`, notes: [{ at: "case Integer i", text: "matches by type" }] },
            { code: `Object o = 3.5;
if (!(o instanceof Double d)) {
    return;
}
System.out.println(d);`, notes: [{ at: "!(o instanceof Double d)", text: "d is in scope after the guard" }] }
          ]
        },
        {
          id: "guards-null", n: 3, title: "guards and null", level: 3,
          gloss: "Refines patterns with when guards and handles null.",
          examples: [
            { code: `Object o = 15;
String s = switch (o) {
    case Integer i when i > 10 -> "big";
    case Integer i -> "small";
    default -> "other";
};`, notes: [{ at: "when i > 10", text: "a guard on the pattern" }] },
            { code: `String s = null;
String r = switch (s) {
    case null -> "none";
    case String t -> t;
};`, notes: [{ at: "case null", text: "null can be a case" }] },
            { code: `Object o = "x";
String r = switch (o) {
    case String t when t.isEmpty() -> "empty";
    case String t -> t;
    default -> "?";
};`, notes: [{ at: "case String t -> t", text: "after the guarded case" }] }
          ]
        }
      ]
    },
    {
      id: "sealed-types",
      n: 14,
      title: "sealed types",
      concepts: [
        {
          id: "sealed-interfaces", n: 1, title: "sealed interfaces", level: 3,
          gloss: "Restricts which types may implement an interface.",
          examples: [
            { code: `sealed interface Shape permits Circle, Square {}
record Circle(double r) implements Shape {}
record Square(double side) implements Shape {}`, notes: [{ at: "permits", text: "lists every allowed subtype" }] },
            { code: `sealed interface Result permits Ok, Err {}
record Ok(String value) implements Result {}
record Err(String message) implements Result {}`, notes: [] },
            { code: `sealed abstract class Vehicle permits Car, Bike {}
final class Car extends Vehicle {}
final class Bike extends Vehicle {}`, notes: [{ at: "final", text: "subtypes are final, sealed or non-sealed" }] }
          ]
        },
        {
          id: "sealed-switch", n: 2, title: "switching over sealed types", level: 3,
          gloss: "Switches exhaustively over a sealed hierarchy.",
          examples: [
            { code: `sealed interface Shape permits Circle, Square {}
record Circle(double r) implements Shape {}
record Square(double side) implements Shape {}
static double area(Shape s) {
    return switch (s) {
        case Circle c -> Math.PI * c.r() * c.r();
        case Square q -> q.side() * q.side();
    };
}`, notes: [{ at: "case Square q", text: "no default: every subtype is covered" }] },
            { code: `sealed interface Result permits Ok, Err {}
record Ok(int value) implements Result {}
record Err(String msg) implements Result {}
static String show(Result r) {
    return switch (r) {
        case Ok o -> "ok " + o.value();
        case Err e -> "error " + e.msg();
    };
}`, notes: [] },
            { code: `sealed interface Result permits Ok, Err {}
record Ok(int v) implements Result {}
record Err(String m) implements Result {}
static int value(Result r) {
    return switch (r) {
        case Ok(int v) -> v;
        case Err(String m) -> -1;
    };
}`, notes: [{ at: "Ok(int v)", text: "a record pattern in a sealed switch" }] }
          ]
        },
        {
          id: "non-sealed", n: 3, title: "non-sealed", level: 3,
          gloss: "Opens part of a sealed hierarchy with non-sealed.",
          examples: [
            { code: `sealed interface Node permits Leaf, Branch {}
record Leaf(int v) implements Node {}
non-sealed interface Branch extends Node {}`, notes: [{ at: "non-sealed", text: "anyone may extend Branch" }] },
            { code: `sealed class Base permits A, B {}
final class A extends Base {}
non-sealed class B extends Base {}
class C extends B {}`, notes: [{ at: "class C", text: "allowed because B is non-sealed" }] },
            { code: `sealed interface Expr permits Num, Add {}
record Num(int n) implements Expr {}
record Add(Expr l, Expr r) implements Expr {}`, notes: [{ at: "Expr l", text: "a record can hold the sealed type itself" }] }
          ]
        }
      ]
    },
    {
      id: "text-blocks-var",
      n: 15,
      title: "text blocks & var",
      concepts: [
        {
          id: "text-blocks", n: 1, title: "text blocks", level: 2,
          gloss: "Writes multi-line strings with triple quotes.",
          examples: [
            { code: `String json = """
    {"name": "ada"}
    """;`, notes: [{ at: "\"\"\"", text: "the closing delimiter sets the indent" }] },
            { code: `String sql = """
    SELECT id, name
    FROM users
    WHERE active = true
    """;`, notes: [] },
            { code: `String html = """
    <p>Hello,
    world</p>
    """;`, notes: [] }
          ]
        },
        {
          id: "text-block-escapes", n: 2, title: "escapes in text blocks", level: 3,
          gloss: "Controls line breaks and spacing inside text blocks.",
          examples: [
            { code: `String s = """
    one \\
    two
    """;`, notes: [{ at: "\\", text: "a trailing backslash joins lines" }] },
            { code: `String s = """
    a\\tb
    "quoted"
    """;`, notes: [{ at: "\\t", text: "escapes still work" }] },
            { code: `String s = """
    price: %d
    """.formatted(5);`, notes: [{ at: "formatted", text: "fills the placeholders" }] }
          ]
        },
        {
          id: "var-inference", n: 3, title: "var", level: 1,
          gloss: "Lets the compiler infer local variable types with var.",
          examples: [
            { code: `var count = 10;
var name = "ada";
var items = new ArrayList<String>();`, notes: [{ at: "var", text: "the type is still fixed at compile time" }] },
            { code: `var map = new HashMap<String, Integer>();
map.put("a", 1);
for (var e : map.entrySet()) {
    System.out.println(e.getKey());
}`, notes: [{ at: "var e", text: "inferred as Map.Entry" }] },
            { code: `var list = List.of(1, 2, 3);
var total = 0;
for (var n : list) {
    total += n;
}`, notes: [] }
          ]
        },
        {
          id: "string-helpers", n: 4, title: "newer String helpers", level: 2,
          gloss: "Uses newer String helpers such as strip, isBlank, lines and repeat.",
          examples: [
            { code: `String s = "  hi  ";
String t = s.strip();
boolean blank = " ".isBlank();`, notes: [{ at: "strip()", text: "trims Unicode whitespace too" }] },
            { code: `long n = "a\\nb\\nc".lines().count();`, notes: [{ at: "lines()", text: "a stream of lines" }] },
            { code: `String line = "=".repeat(10);`, notes: [{ at: "repeat", text: "the string, n times" }] }
          ]
        }
      ]
    },
    {
      id: "concurrency-basics",
      n: 16,
      title: "concurrency basics",
      concepts: [
        {
          id: "threads", n: 1, title: "threads", level: 2,
          gloss: "Runs work on a new thread.",
          examples: [
            { code: `Thread t = new Thread(() -> System.out.println("hi"));
t.start();
t.join();`, notes: [{ at: "join()", text: "waits for the thread" }] },
            { code: `Runnable task = () -> System.out.println("task");
Thread t = new Thread(task);
t.start();`, notes: [{ at: "start()", text: "runs on a new thread, run() would not" }] },
            { code: `Thread t = Thread.ofVirtual()
    .start(() -> System.out.println("virtual"));`, notes: [{ at: "ofVirtual", text: "a lightweight virtual thread" }] }
          ]
        },
        {
          id: "executors", n: 2, title: "executors", level: 2,
          gloss: "Runs tasks on a pool of threads with an ExecutorService.",
          examples: [
            { code: `ExecutorService pool = Executors.newFixedThreadPool(2);
pool.submit(() -> System.out.println("job"));
pool.shutdown();`, notes: [{ at: "shutdown", text: "finishes queued jobs, takes no more" }] },
            { code: `try (var pool = Executors.newVirtualThreadPerTaskExecutor()) {
    pool.submit(() -> System.out.println("job"));
}`, notes: [{ at: "try", text: "close() waits for the tasks" }] },
            { code: `ExecutorService pool = Executors.newFixedThreadPool(2);
Future<Integer> f = pool.submit(() -> 6 * 7);
int answer = f.get();
pool.shutdown();`, notes: [{ at: "f.get()", text: "blocks until the result is ready" }] }
          ]
        },
        {
          id: "completable-future", n: 3, title: "CompletableFuture", level: 3,
          gloss: "Chains asynchronous steps with CompletableFuture.",
          examples: [
            { code: `CompletableFuture<String> f =
    CompletableFuture.supplyAsync(() -> "ada");
String s = f.get();`, notes: [{ at: "supplyAsync", text: "runs the supplier on another thread" }] },
            { code: `CompletableFuture<Integer> f = CompletableFuture
    .supplyAsync(() -> 20)
    .thenApply(n -> n + 1);`, notes: [{ at: "thenApply", text: "transforms the result when ready" }] },
            { code: `var a = CompletableFuture.supplyAsync(() -> 1);
var b = CompletableFuture.supplyAsync(() -> 2);
int sum = a.thenCombine(b, Integer::sum).get();`, notes: [{ at: "thenCombine", text: "waits for both" }] }
          ]
        },
        {
          id: "synchronized-atomic", n: 4, title: "synchronized and atomics", level: 3,
          gloss: "Protects shared state with synchronized and atomic classes.",
          examples: [
            { code: `class Counter {
    private int n;
    synchronized void inc() {
        n++;
    }
}`, notes: [{ at: "synchronized", text: "one thread at a time" }] },
            { code: `AtomicInteger hits = new AtomicInteger();
hits.incrementAndGet();
int v = hits.get();`, notes: [{ at: "AtomicInteger", text: "a lock-free counter" }] },
            { code: `ConcurrentHashMap<String, Integer> m = new ConcurrentHashMap<>();
m.merge("a", 1, Integer::sum);`, notes: [{ at: "ConcurrentHashMap", text: "safe for many threads" }] }
          ]
        }
      ]
    }
  ]
};
