export default {
  id: "cpp",
  name: "C++",
  short: "CPP",
  pigment: "cpp",
  family: null,
  version: "20",
  lexer: "cpp",
  indent: 4,
  topics: [
    {
      id: "iostream-format",
      n: 1,
      title: "iostream & std::format",
      concepts: [
        {
          id: "cout", n: 1, title: "output with cout", level: 1,
          gloss: "Writes values to standard output with the stream insertion operator.",
          examples: [
            { code: `std::cout << "hello, world\\n";`, notes: [{ at: "<<", text: "inserts into the stream" }] },
            { code: `int count = 3;
std::cout << "count: " << count << '\\n';`, notes: [{ at: "'\\n'", text: "a newline without a flush" }] },
            { code: `std::cout << "done" << std::endl;`, notes: [{ at: "std::endl", text: "newline plus a flush" }] }
          ]
        },
        {
          id: "cin", n: 2, title: "input with cin", level: 1,
          gloss: "Reads whitespace-separated values from standard input.",
          examples: [
            { code: `int age;
std::cin >> age;`, notes: [{ at: ">>", text: "extracts into the variable" }] },
            { code: `std::string name;
std::getline(std::cin, name);`, notes: [{ at: "std::getline", text: "reads a whole line" }] },
            { code: `int a, b;
if (std::cin >> a >> b)
    std::cout << a + b << '\\n';`, notes: [{ at: "std::cin >> a >> b", text: "true when both reads succeed" }] }
          ]
        },
        {
          id: "format", n: 3, title: "std::format", level: 2,
          gloss: "Builds a string from a format pattern with replacement fields.",
          examples: [
            { code: `std::string name = "ada";
int age = 36;
std::string s = std::format("{} is {}", name, age);`, notes: [{ at: "{}", text: "filled by the next argument" }] },
            { code: `std::string s = std::format("{:.2f}", 3.14159);`, notes: [{ at: "{:.2f}", text: "two decimal places" }] },
            { code: `std::string row = std::format("{:>8}|{:<8}|", "right", "left");`, notes: [{ at: "{:>8}", text: "right-aligned in 8 columns" }] }
          ]
        },
        {
          id: "string-streams", n: 4, title: "string streams", level: 2,
          gloss: "Builds or parses text in memory with a stringstream.",
          examples: [
            { code: `std::ostringstream out;
out << "id=" << 7;
std::string s = out.str();`, notes: [{ at: ".str()", text: "copies the buffered text out" }] },
            { code: `std::istringstream in("12 30");
int h, m;
in >> h >> m;`, notes: [] },
            { code: `std::stringstream ss("a,b,c");
std::string part;
std::getline(ss, part, ',');`, notes: [{ at: "','", text: "a custom line delimiter" }] }
          ]
        }
      ]
    },
    {
      id: "references-const",
      n: 2,
      title: "references & const",
      concepts: [
        {
          id: "references", n: 1, title: "references", level: 1,
          gloss: "Gives a second name to an existing variable with an ampersand.",
          examples: [
            { code: `int x = 5;
int& ref = x;
ref = 9;`, notes: [{ at: "int& ref", text: "an alias, not a copy" }] },
            { code: `void increment(int& n) {
    ++n;
}`, notes: [{ at: "int& n", text: "changes the caller's value" }] },
            { code: `std::vector<int> v{1, 2, 3};
int& first = v[0];
first = 10;`, notes: [] }
          ]
        },
        {
          id: "const-references", n: 2, title: "const references", level: 1,
          gloss: "Passes large objects without copying and without allowing changes.",
          examples: [
            { code: `void print(const std::string& s) {
    std::cout << s << '\\n';
}`, notes: [{ at: "const std::string&", text: "no copy, read-only" }] },
            { code: `double total(const std::vector<double>& xs) {
    return std::accumulate(xs.begin(), xs.end(), 0.0);
}`, notes: [] },
            { code: `const int& r = 42;`, notes: [{ at: "const int&", text: "can bind to a temporary" }] }
          ]
        },
        {
          id: "const-correctness", n: 3, title: "const correctness", level: 2,
          gloss: "Marks values and member functions that must not change.",
          examples: [
            { code: `const int limit = 100;`, notes: [] },
            { code: `class Counter {
public:
    int value() const { return n_; }
private:
    int n_ = 0;
};`, notes: [{ at: "const {", text: "promises not to modify the object" }] },
            { code: `constexpr int kBufferSize = 256;`, notes: [{ at: "constexpr", text: "evaluated at compile time" }] }
          ]
        },
        {
          id: "references-vs-pointers", n: 4, title: "references versus pointers", level: 2,
          gloss: "Chooses between a reference and a pointer by whether the value may be absent.",
          examples: [
            { code: `struct Widget {};
void use(Widget& w);
void maybe_use(Widget* w);`, notes: [{ at: "Widget* w", text: "may be nullptr" }] },
            { code: `int* p = nullptr;
if (p)
    *p = 1;`, notes: [{ at: "nullptr", text: "the typed null pointer" }] },
            { code: `int a = 1, b = 2;
int* p = &a;
p = &b;`, notes: [{ at: "p = &b", text: "a pointer can be reseated" }] }
          ]
        }
      ]
    },
    {
      id: "auto-bindings",
      n: 3,
      title: "auto & structured bindings",
      concepts: [
        {
          id: "auto", n: 1, title: "auto", level: 1,
          gloss: "Lets the compiler deduce a variable's type from its initializer.",
          examples: [
            { code: `auto count = 42;`, notes: [] },
            { code: `auto name = std::string("ada");`, notes: [] },
            { code: `auto ratio = 3 / 2.0;`, notes: [{ at: "3 / 2.0", text: "deduces double" }] }
          ]
        },
        {
          id: "auto-loops", n: 2, title: "auto in loops", level: 1,
          gloss: "Avoids long element and iterator types in loops.",
          examples: [
            { code: `std::vector<int> v{1, 2, 3};
for (auto x : v)
    std::cout << x << '\\n';`, notes: [{ at: "auto x", text: "a copy of each element" }] },
            { code: `std::vector<std::string> names{"ada", "lin"};
for (const auto& s : names)
    std::cout << s << '\\n';`, notes: [{ at: "const auto&", text: "no copies, no changes" }] },
            { code: `std::vector<int> v{1, 2, 3};
for (auto& x : v)
    x *= 2;`, notes: [{ at: "auto&", text: "modifies elements in place" }] }
          ]
        },
        {
          id: "structured-bindings", n: 3, title: "structured bindings", level: 2,
          gloss: "Unpacks a pair, tuple or struct into named variables.",
          examples: [
            { code: `std::pair<int, int> p{3, 4};
auto [x, y] = p;`, notes: [{ at: "[x, y]", text: "names for first and second" }] },
            { code: `std::map<std::string, int> ages{{"ada", 36}};
for (const auto& [name, age] : ages)
    std::cout << name << ' ' << age << '\\n';`, notes: [] },
            { code: `struct Point { int x, y; };
Point pt{1, 2};
auto [px, py] = pt;`, notes: [] }
          ]
        },
        {
          id: "decltype", n: 4, title: "decltype", level: 3,
          gloss: "Names the type of an expression without evaluating it.",
          examples: [
            { code: `int x = 5;
decltype(x) y = 10;`, notes: [{ at: "decltype(x)", text: "int, the type of x" }] },
            { code: `std::vector<int> v;
decltype(v)::value_type first = 0;`, notes: [{ at: "::value_type", text: "the element type" }] },
            { code: `template <typename A, typename B>
auto add(A a, B b) -> decltype(a + b) {
    return a + b;
}`, notes: [{ at: "-> decltype(a + b)", text: "a trailing return type" }] }
          ]
        }
      ]
    },
    {
      id: "string",
      n: 4,
      title: "std::string",
      concepts: [
        {
          id: "creating-strings", n: 1, title: "creating strings", level: 1,
          gloss: "Creates and combines text with std::string.",
          examples: [
            { code: `std::string name = "ada";`, notes: [] },
            { code: `std::string first = "ada", last = "lovelace";
std::string full = first + " " + last;`, notes: [] },
            { code: `std::string stars(5, '*');`, notes: [{ at: "(5, '*')", text: "five copies of the character" }] }
          ]
        },
        {
          id: "size-access", n: 2, title: "size and access", level: 1,
          gloss: "Reads the length, characters and substrings of a string.",
          examples: [
            { code: `std::string s = "platen";
std::size_t n = s.size();
char first = s[0];`, notes: [] },
            { code: `std::string s = "platen";
std::string word = s.substr(1, 3);`, notes: [{ at: "substr(1, 3)", text: "start at 1, length 3" }] },
            { code: `std::string s = "done";
s.push_back('!');
s += " ok";`, notes: [] }
          ]
        },
        {
          id: "finding-text", n: 3, title: "finding text", level: 2,
          gloss: "Searches a string with find and checks its start with starts_with.",
          examples: [
            { code: `std::string s = "a tale of two cities";
std::size_t pos = s.find("two");
if (pos != std::string::npos)
    std::cout << pos << '\\n';`, notes: [{ at: "npos", text: "returned when nothing matches" }] },
            { code: `std::string s = "https://example.com";
bool is_url = s.starts_with("https://");`, notes: [{ at: "starts_with", text: "added in C++20" }] },
            { code: `std::string s = "hello world";
s.replace(0, 5, "HELLO");`, notes: [{ at: "replace(0, 5", text: "swaps the first five characters" }] }
          ]
        },
        {
          id: "string-view", n: 4, title: "string_view", level: 2,
          gloss: "Refers to text without copying it.",
          examples: [
            { code: `std::string_view sv = "read only view";`, notes: [] },
            { code: `void greet(std::string_view name) {
    std::cout << "hello, " << name << '\\n';
}`, notes: [{ at: "std::string_view", text: "accepts literals and strings" }] },
            { code: `std::string s = "hello world";
std::string_view head = std::string_view(s).substr(0, 5);`, notes: [{ at: "head", text: "dangles if s is destroyed" }] }
          ]
        },
        {
          id: "number-conversion", n: 5, title: "number conversion", level: 1,
          gloss: "Converts between text and numbers with stoi and to_string.",
          examples: [
            { code: `int n = std::stoi("42");`, notes: [{ at: "std::stoi", text: "throws on invalid input" }] },
            { code: `std::string s = std::to_string(3.5);`, notes: [] },
            { code: `double d = std::stod("2.75");`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "vector",
      n: 5,
      title: "std::vector",
      concepts: [
        {
          id: "creating-vectors", n: 1, title: "creating vectors", level: 1,
          gloss: "Creates a resizable array with std::vector.",
          examples: [
            { code: `std::vector<int> v{1, 2, 3};`, notes: [] },
            { code: `std::vector<double> zeros(10, 0.0);`, notes: [{ at: "(10, 0.0)", text: "ten copies of 0.0" }] },
            { code: `std::vector<std::string> names;`, notes: [] }
          ]
        },
        {
          id: "adding-removing", n: 2, title: "adding and removing", level: 1,
          gloss: "Appends with push_back or emplace_back and removes from the end.",
          examples: [
            { code: `std::vector<int> v{1, 2, 3};
v.push_back(4);`, notes: [] },
            { code: `std::vector<std::string> names;
names.emplace_back("ada");`, notes: [{ at: "emplace_back", text: "constructs the element in place" }] },
            { code: `std::vector<int> v{1, 2, 3};
v.pop_back();`, notes: [] }
          ]
        },
        {
          id: "indexing-size", n: 3, title: "indexing and size", level: 1,
          gloss: "Reads elements by index, with at for bounds checking.",
          examples: [
            { code: `std::vector<int> v{10, 20, 30};
int first = v[0];`, notes: [] },
            { code: `std::vector<int> v{10, 20, 30};
int second = v.at(1);`, notes: [{ at: ".at(1)", text: "throws if out of range" }] },
            { code: `std::vector<int> v{10, 20, 30};
if (!v.empty())
    std::cout << v.back() << '\\n';`, notes: [{ at: ".back()", text: "the last element" }] }
          ]
        },
        {
          id: "insert-erase", n: 4, title: "inserting and erasing", level: 2,
          gloss: "Inserts or removes elements at a position or by value.",
          examples: [
            { code: `std::vector<int> v{1, 2, 3};
v.insert(v.begin() + 1, 99);`, notes: [{ at: "v.begin() + 1", text: "an iterator to index 1" }] },
            { code: `std::vector<int> v{1, 2, 3};
v.erase(v.begin());`, notes: [] },
            { code: `std::vector<int> v{3, 1, 3, 2};
std::erase(v, 3);`, notes: [{ at: "std::erase", text: "removes every equal value, C++20" }] }
          ]
        },
        {
          id: "capacity", n: 5, title: "capacity", level: 2,
          gloss: "Reserves space up front to avoid repeated reallocation.",
          examples: [
            { code: `std::vector<int> v;
v.reserve(1000);`, notes: [{ at: "reserve", text: "allocates without adding elements" }] },
            { code: `std::vector<int> v;
std::size_t cap = v.capacity();`, notes: [] },
            { code: `std::vector<int> v(100);
v.resize(10);
v.shrink_to_fit();`, notes: [{ at: "shrink_to_fit", text: "a request, not a guarantee" }] }
          ]
        }
      ]
    },
    {
      id: "maps",
      n: 6,
      title: "map & unordered_map",
      concepts: [
        {
          id: "map-basics", n: 1, title: "std::map", level: 1,
          gloss: "Stores key-value pairs sorted by key.",
          examples: [
            { code: `std::map<std::string, int> ages{{"ada", 36}, {"lin", 29}};`, notes: [] },
            { code: `std::map<std::string, int> ages;
ages["ada"] = 36;`, notes: [{ at: 'ages["ada"]', text: "inserts the key if missing" }] },
            { code: `std::map<std::string, int> ages{{"ada", 36}};
int age = ages.at("ada");`, notes: [{ at: ".at(", text: "throws if the key is missing" }] }
          ]
        },
        {
          id: "unordered-map", n: 2, title: "unordered_map", level: 1,
          gloss: "Stores key-value pairs in a hash table for fast lookup.",
          examples: [
            { code: `std::unordered_map<std::string, int> counts;
counts["apple"]++;`, notes: [{ at: "counts[", text: "a missing key starts at zero" }] },
            { code: `std::unordered_map<int, std::string> names{{1, "ada"}, {2, "lin"}};`, notes: [] },
            { code: `std::unordered_map<std::string, int> counts;
counts.reserve(100);`, notes: [] }
          ]
        },
        {
          id: "lookup", n: 3, title: "lookup and membership", level: 2,
          gloss: "Checks for a key with contains or find without inserting it.",
          examples: [
            { code: `std::map<std::string, int> ages{{"ada", 36}};
if (ages.contains("ada"))
    std::cout << "found\\n";`, notes: [{ at: "contains", text: "added in C++20" }] },
            { code: `std::map<std::string, int> ages{{"lin", 29}};
auto it = ages.find("lin");
if (it != ages.end())
    std::cout << it->second << '\\n';`, notes: [{ at: "it->second", text: "the value of the pair" }] },
            { code: `std::map<std::string, int> ages;
auto [it, inserted] = ages.emplace("lin", 29);`, notes: [{ at: "inserted", text: "false if the key already existed" }] }
          ]
        },
        {
          id: "iterating-maps", n: 4, title: "iterating maps", level: 1,
          gloss: "Walks every pair, in key order for std::map.",
          examples: [
            { code: `std::map<std::string, int> ages{{"ada", 36}};
for (const auto& [name, age] : ages)
    std::cout << name << ": " << age << '\\n';`, notes: [] },
            { code: `std::map<std::string, int> scores{{"ada", 1}};
for (auto& [key, value] : scores)
    value += 1;`, notes: [{ at: "auto&", text: "lets the loop change values" }] },
            { code: `std::map<std::string, int> ages{{"ada", 36}};
std::erase_if(ages, [](const auto& kv) { return kv.second < 18; });`, notes: [{ at: "std::erase_if", text: "removes entries matching a test" }] }
          ]
        }
      ]
    },
    {
      id: "range-for",
      n: 7,
      title: "range-for",
      concepts: [
        {
          id: "range-for-basics", n: 1, title: "range-based for", level: 1,
          gloss: "Visits every element of a container without indexes.",
          examples: [
            { code: `std::vector<int> v{1, 2, 3};
int sum = 0;
for (int x : v)
    sum += x;`, notes: [] },
            { code: `for (char c : std::string("abc"))
    std::cout << c << '\\n';`, notes: [] },
            { code: `int a[] = {4, 5, 6};
for (int x : a)
    std::cout << x << '\\n';`, notes: [{ at: "int x : a", text: "works on plain arrays too" }] }
          ]
        },
        {
          id: "range-for-init", n: 2, title: "init statements", level: 2,
          gloss: "Declares a helper variable inside a range-based for.",
          examples: [
            { code: `std::vector<int> v{5, 6, 7};
for (int i = 0; auto x : v) {
    std::cout << i++ << ": " << x << '\\n';
}`, notes: [{ at: "int i = 0;", text: "an init-statement, C++20" }] },
            { code: `std::vector<std::vector<int>> grid(3, std::vector<int>(3));
for (auto& row : grid)
    for (auto& cell : row)
        cell = 0;`, notes: [] },
            { code: `std::vector<int> v{1, 2, 3};
for (std::size_t i = 0; i < v.size(); ++i)
    std::cout << v[i] << '\\n';`, notes: [{ at: "i < v.size()", text: "use this when you need the index" }] }
          ]
        },
        {
          id: "iterator-loops", n: 3, title: "iterator loops", level: 2,
          gloss: "Uses begin and end iterators when you need to erase or go backwards.",
          examples: [
            { code: `std::vector<int> v{1, 2, 3};
for (auto it = v.begin(); it != v.end(); ++it)
    std::cout << *it << '\\n';`, notes: [{ at: "*it", text: "dereference to read the element" }] },
            { code: `std::vector<int> v{1, 2, 3, 4};
auto it = v.begin();
while (it != v.end())
    it = (*it % 2 == 0) ? v.erase(it) : it + 1;`, notes: [{ at: "v.erase(it)", text: "returns the next valid iterator" }] },
            { code: `std::vector<int> v{1, 2, 3};
for (auto it = v.rbegin(); it != v.rend(); ++it)
    std::cout << *it << '\\n';`, notes: [{ at: "rbegin", text: "starts at the last element" }] }
          ]
        }
      ]
    },
    {
      id: "classes-raii",
      n: 8,
      title: "classes & RAII",
      concepts: [
        {
          id: "class-basics", n: 1, title: "class basics", level: 1,
          gloss: "Bundles data and functions into a class with access control.",
          examples: [
            { code: `class Counter {
public:
    void increment() { ++value_; }
    int value() const { return value_; }
private:
    int value_ = 0;
};`, notes: [{ at: "private:", text: "only members can touch value_" }] },
            { code: `struct Point {
    double x = 0;
    double y = 0;
};`, notes: [{ at: "struct", text: "members are public by default" }] },
            { code: `class Account {
public:
    void deposit(double amount) { balance_ += amount; }
private:
    double balance_ = 0;
};`, notes: [] }
          ]
        },
        {
          id: "raii", n: 2, title: "RAII", level: 2,
          gloss: "Ties a resource's lifetime to an object so cleanup is automatic.",
          examples: [
            { code: `class FileHandle {
public:
    explicit FileHandle(const char* path)
        : f_(std::fopen(path, "r")) {}
    ~FileHandle() { if (f_) std::fclose(f_); }
private:
    std::FILE* f_;
};`, notes: [{ at: "~FileHandle", text: "closes the file on scope exit" }] },
            { code: `std::mutex m;
int counter = 0;
void bump() {
    std::lock_guard lock(m);
    ++counter;
}`, notes: [{ at: "std::lock_guard lock(m)", text: "unlocks when lock is destroyed" }] },
            { code: `class Timer {
public:
    Timer() : start_(std::chrono::steady_clock::now()) {}
    ~Timer() { std::cout << "done\\n"; }
private:
    std::chrono::steady_clock::time_point start_;
};`, notes: [] }
          ]
        },
        {
          id: "destructors", n: 3, title: "destructors", level: 2,
          gloss: "Runs cleanup code when an object goes out of scope.",
          examples: [
            { code: `class Logger {
public:
    ~Logger() { std::cout << "closing\\n"; }
};`, notes: [{ at: "~Logger", text: "runs when the object is destroyed" }] },
            { code: `struct Logger { ~Logger() { std::cout << "bye\\n"; } };
void f() {
    Logger log;
}`, notes: [{ at: "Logger log;", text: "destroyed at the closing brace" }] },
            { code: `struct Shape {
    virtual ~Shape() = default;
    virtual double area() const = 0;
};`, notes: [{ at: "virtual ~Shape", text: "needed to delete through a base pointer" }] }
          ]
        },
        {
          id: "encapsulation", n: 4, title: "encapsulation", level: 1,
          gloss: "Hides data behind private members and exposes it through functions.",
          examples: [
            { code: `class Temperature {
public:
    double celsius() const { return c_; }
    void set_celsius(double c) { c_ = c; }
private:
    double c_ = 0;
};`, notes: [] },
            { code: `class Id {
public:
    static int next() { return counter_++; }
private:
    static inline int counter_ = 0;
};`, notes: [{ at: "static inline", text: "one shared variable, defined in place" }] },
            { code: `class Stack {
public:
    void push(int v) { items_.push_back(v); }
    bool empty() const { return items_.empty(); }
private:
    std::vector<int> items_;
};`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "constructors",
      n: 9,
      title: "constructors & initializer lists",
      concepts: [
        {
          id: "constructors", n: 1, title: "constructors", level: 1,
          gloss: "Initializes an object's members when it is created.",
          examples: [
            { code: `class Point {
public:
    Point(double x, double y) : x_(x), y_(y) {}
private:
    double x_, y_;
};`, notes: [{ at: ": x_(x), y_(y)", text: "the member initializer list" }] },
            { code: `struct Config {
    Config() = default;
    int port = 8080;
};`, notes: [{ at: "= default", text: "the compiler writes the body" }] },
            { code: `struct Point {
    Point(double x, double y) : x(x), y(y) {}
    double x, y;
};
Point p{3.0, 4.0};`, notes: [] }
          ]
        },
        {
          id: "member-init-lists", n: 2, title: "member initializer lists", level: 2,
          gloss: "Initializes members before the constructor body runs.",
          examples: [
            { code: `class Person {
public:
    Person(std::string name, int age)
        : name_(std::move(name)), age_(age) {}
private:
    std::string name_;
    int age_;
};`, notes: [{ at: "std::move(name)", text: "moves instead of copying" }] },
            { code: `class Circle {
public:
    explicit Circle(double r) : radius_(r) {}
private:
    const double radius_;
};`, notes: [{ at: ": radius_(r)", text: "the only way to set a const member" }] },
            { code: `struct Range {
    int lo, hi;
    Range(int a, int b) : lo(a), hi(b) {}
};`, notes: [{ at: ": lo(a), hi(b)", text: "runs in declaration order" }] }
          ]
        },
        {
          id: "initializer-list", n: 3, title: "initializer_list constructors", level: 3,
          gloss: "Accepts a braced list of values with std::initializer_list.",
          examples: [
            { code: `class Bag {
public:
    Bag(std::initializer_list<int> items) : items_(items) {}
private:
    std::vector<int> items_;
};`, notes: [{ at: "std::initializer_list<int>", text: "receives the braced values" }] },
            { code: `class Bag {
public:
    Bag(std::initializer_list<int> items) : items_(items) {}
private:
    std::vector<int> items_;
};
Bag b{1, 2, 3};`, notes: [{ at: "{1, 2, 3}", text: "calls the list constructor" }] },
            { code: `std::vector<int> a{3, 4};
std::vector<int> b(3, 4);`, notes: [{ at: "{3, 4}", text: "two elements: 3 and 4" }, { at: "(3, 4)", text: "three elements, all 4" }] }
          ]
        },
        {
          id: "explicit-delegating", n: 4, title: "explicit and delegating", level: 3,
          gloss: "Blocks implicit conversions with explicit and reuses constructors by delegating.",
          examples: [
            { code: `struct Meters {
    explicit Meters(double v) : value(v) {}
    double value;
};`, notes: [{ at: "explicit", text: "no silent conversion from double" }] },
            { code: `struct Window {
    Window() : Window(800, 600) {}
    Window(int w, int h) : w(w), h(h) {}
    int w, h;
};`, notes: [{ at: ": Window(800, 600)", text: "delegates to the other constructor" }] },
            { code: `struct Id { explicit Id(int v) : v(v) {} int v; };
Id a{7};
Id b = Id(8);`, notes: [{ at: "Id a{7}", text: "direct initialization is allowed" }] }
          ]
        }
      ]
    },
    {
      id: "rule-of-five",
      n: 10,
      title: "rule of zero & five",
      concepts: [
        {
          id: "rule-of-zero", n: 1, title: "rule of zero", level: 2,
          gloss: "Lets members manage themselves so no special functions are needed.",
          examples: [
            { code: `class Person {
public:
    explicit Person(std::string name) : name_(std::move(name)) {}
private:
    std::string name_;
};`, notes: [{ at: "std::string name_", text: "cleans itself up, no destructor" }] },
            { code: `struct Inventory {
    std::vector<std::string> items;
    std::map<std::string, int> counts;
};`, notes: [] },
            { code: `struct Session {
    std::unique_ptr<int> token;
    std::string user;
};`, notes: [{ at: "std::unique_ptr", text: "makes Session move-only for free" }] }
          ]
        },
        {
          id: "rule-of-five-members", n: 2, title: "rule of five", level: 3,
          gloss: "Declares copy, move and destructor together when a class owns a raw resource.",
          examples: [
            { code: `class Buffer {
public:
    Buffer(const Buffer& other);
    Buffer& operator=(const Buffer& other);
    Buffer(Buffer&& other) noexcept;
    Buffer& operator=(Buffer&& other) noexcept;
    ~Buffer();
};`, notes: [{ at: "Buffer(Buffer&& other)", text: "the move constructor" }] },
            { code: `class Buffer {
public:
    Buffer(Buffer&& other) noexcept
        : size_(other.size_), data_(other.data_) {
        other.data_ = nullptr;
    }
private:
    std::size_t size_;
    char* data_;
};`, notes: [{ at: "other.data_ = nullptr", text: "the moved-from object owns nothing" }] },
            { code: `class Handle {
public:
    Handle(const Handle&) = delete;
    Handle& operator=(const Handle&) = delete;
};`, notes: [{ at: "= delete", text: "makes copying a compile error" }] }
          ]
        },
        {
          id: "default-delete", n: 3, title: "default and delete", level: 2,
          gloss: "Asks for or forbids compiler-generated special functions.",
          examples: [
            { code: `struct Plain {
    Plain() = default;
    ~Plain() = default;
};`, notes: [] },
            { code: `struct NoCopy {
    NoCopy() = default;
    NoCopy(const NoCopy&) = delete;
};`, notes: [{ at: "NoCopy(const NoCopy&)", text: "the copy constructor" }] },
            { code: `struct Movable {
    Movable() = default;
    Movable(Movable&&) = default;
    Movable& operator=(Movable&&) = default;
};`, notes: [{ at: "= default", text: "the compiler writes the body" }] }
          ]
        }
      ]
    },
    {
      id: "smart-pointers",
      n: 11,
      title: "unique_ptr & shared_ptr",
      concepts: [
        {
          id: "unique-ptr", n: 1, title: "unique_ptr", level: 2,
          gloss: "Owns one heap object and frees it automatically.",
          examples: [
            { code: `auto p = std::make_unique<int>(42);`, notes: [{ at: "make_unique", text: "allocates and wraps in one step" }] },
            { code: `struct Widget {};
std::unique_ptr<Widget> w = std::make_unique<Widget>();`, notes: [] },
            { code: `auto arr = std::make_unique<int[]>(10);
arr[0] = 1;`, notes: [{ at: "int[]", text: "an owning array" }] }
          ]
        },
        {
          id: "ownership-transfer", n: 2, title: "transferring ownership", level: 2,
          gloss: "Moves a unique_ptr so exactly one owner remains.",
          examples: [
            { code: `auto a = std::make_unique<int>(1);
auto b = std::move(a);`, notes: [{ at: "std::move(a)", text: "a is now empty" }] },
            { code: `void consume(std::unique_ptr<int> p);
void run() {
    consume(std::make_unique<int>(5));
}`, notes: [] },
            { code: `std::unique_ptr<int> make() {
    return std::make_unique<int>(7);
}`, notes: [{ at: "return", text: "moved out automatically" }] }
          ]
        },
        {
          id: "shared-ptr", n: 3, title: "shared_ptr", level: 2,
          gloss: "Shares ownership of an object using reference counting.",
          examples: [
            { code: `auto s = std::make_shared<std::string>("hello");`, notes: [] },
            { code: `auto a = std::make_shared<int>(10);
auto b = a;
std::cout << a.use_count() << '\\n';`, notes: [{ at: ".use_count()", text: "2 owners now" }] },
            { code: `std::vector<std::shared_ptr<int>> pool;
pool.push_back(std::make_shared<int>(1));`, notes: [] }
          ]
        },
        {
          id: "weak-ptr", n: 4, title: "weak_ptr", level: 3,
          gloss: "Observes a shared object without keeping it alive.",
          examples: [
            { code: `auto sp = std::make_shared<int>(5);
std::weak_ptr<int> wp = sp;`, notes: [] },
            { code: `auto sp = std::make_shared<int>(5);
std::weak_ptr<int> wp = sp;
if (auto locked = wp.lock())
    std::cout << *locked << '\\n';`, notes: [{ at: ".lock()", text: "empty if the object is gone" }] },
            { code: `struct Node {
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev;
};`, notes: [{ at: "weak_ptr", text: "breaks the ownership cycle" }] }
          ]
        }
      ]
    },
    {
      id: "move-semantics",
      n: 12,
      title: "move semantics",
      concepts: [
        {
          id: "std-move", n: 1, title: "std::move", level: 2,
          gloss: "Casts an object to an rvalue so its resources can be taken.",
          examples: [
            { code: `std::string a = "text";
std::string b = std::move(a);`, notes: [{ at: "std::move(a)", text: "a is valid but unspecified" }] },
            { code: `std::vector<int> big(1000);
std::vector<int> mine = std::move(big);`, notes: [] },
            { code: `std::vector<std::string> names;
std::string line = "ada";
names.push_back(std::move(line));`, notes: [] }
          ]
        },
        {
          id: "rvalue-references", n: 2, title: "rvalue references", level: 3,
          gloss: "Binds to temporaries with a double ampersand to overload on movable arguments.",
          examples: [
            { code: `void take(std::string&& s);
void take(const std::string& s);`, notes: [{ at: "&&", text: "binds to temporaries" }] },
            { code: `int&& r = 5 + 3;`, notes: [] },
            { code: `std::string name;
void set_name(std::string&& n) {
    name = std::move(n);
}`, notes: [] }
          ]
        },
        {
          id: "move-constructors", n: 3, title: "move constructors", level: 3,
          gloss: "Steals another object's resources instead of copying them.",
          examples: [
            { code: `struct Blob {
    std::vector<char> bytes;
    Blob(Blob&& other) noexcept : bytes(std::move(other.bytes)) {}
};`, notes: [{ at: "noexcept", text: "lets vector move instead of copy" }] },
            { code: `struct Blob { std::vector<char> bytes; };
Blob make() {
    Blob b;
    return b;
}`, notes: [{ at: "return b", text: "moved or elided, never copied" }] },
            { code: `std::vector<int> a{1}, b{2};
a.swap(b);`, notes: [{ at: ".swap(", text: "exchanges contents without copying" }] }
          ]
        },
        {
          id: "perfect-forwarding", n: 4, title: "perfect forwarding", level: 3,
          gloss: "Passes arguments on unchanged with forwarding references.",
          examples: [
            { code: `void target(int);
template <typename T>
void wrapper(T&& arg) {
    target(std::forward<T>(arg));
}`, notes: [{ at: "T&&", text: "binds to lvalues and rvalues" }] },
            { code: `template <typename T, typename... Args>
std::unique_ptr<T> make(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}`, notes: [{ at: "std::forward<Args>(args)...", text: "keeps each argument's category" }] },
            { code: `template <typename F, typename... Args>
decltype(auto) call(F&& f, Args&&... args) {
    return std::forward<F>(f)(std::forward<Args>(args)...);
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "templates",
      n: 13,
      title: "templates",
      concepts: [
        {
          id: "function-templates", n: 1, title: "function templates", level: 2,
          gloss: "Writes one function that works for many types.",
          examples: [
            { code: `template <typename T>
T maximum(T a, T b) {
    return a > b ? a : b;
}`, notes: [{ at: "typename T", text: "a placeholder for any type" }] },
            { code: `template <typename T>
void print(const T& value) {
    std::cout << value << '\\n';
}`, notes: [] },
            { code: `template <typename T, std::size_t N>
std::size_t length(const T (&)[N]) {
    return N;
}`, notes: [{ at: "std::size_t N", text: "a non-type template parameter" }] }
          ]
        },
        {
          id: "class-templates", n: 2, title: "class templates", level: 2,
          gloss: "Parameterizes a whole class by type.",
          examples: [
            { code: `template <typename T>
class Box {
public:
    explicit Box(T value) : value_(std::move(value)) {}
    const T& get() const { return value_; }
private:
    T value_;
};`, notes: [] },
            { code: `template <typename T>
struct Pair {
    T first;
    T second;
};`, notes: [] },
            { code: `template <typename T>
struct Wrapper {
    T value;
};
Wrapper w{3.5};`, notes: [{ at: "Wrapper w{3.5}", text: "deduces T as double" }] }
          ]
        },
        {
          id: "specialization", n: 3, title: "specialization", level: 3,
          gloss: "Provides a different implementation for one specific type.",
          examples: [
            { code: `template <typename T>
struct Name { static const char* get() { return "other"; } };
template <>
struct Name<int> { static const char* get() { return "int"; } };`, notes: [{ at: "template <>", text: "a full specialization" }] },
            { code: `template <typename T>
constexpr bool is_int = false;
template <>
constexpr bool is_int<int> = true;`, notes: [] },
            { code: `template <typename T>
auto describe(T v) {
    if constexpr (std::is_integral_v<T>)
        return "integer";
    else
        return "other";
}`, notes: [{ at: "if constexpr", text: "the dead branch is not compiled" }] }
          ]
        },
        {
          id: "variadic-templates", n: 4, title: "variadic templates", level: 3,
          gloss: "Accepts any number of arguments of any types with a parameter pack.",
          examples: [
            { code: `template <typename... Args>
void log(Args... args) {
    (std::cout << ... << args) << '\\n';
}`, notes: [{ at: "(std::cout << ... << args)", text: "a fold expression" }] },
            { code: `template <typename... Ts>
auto sum(Ts... xs) {
    return (xs + ...);
}`, notes: [{ at: "(xs + ...)", text: "adds every argument" }] },
            { code: `template <typename... Ts>
constexpr std::size_t count = sizeof...(Ts);`, notes: [{ at: "sizeof...(Ts)", text: "the number of types in the pack" }] }
          ]
        }
      ]
    },
    {
      id: "concepts",
      n: 14,
      title: "concepts",
      concepts: [
        {
          id: "requires-clauses", n: 1, title: "requires clauses", level: 3,
          gloss: "Restricts a template to types that satisfy a condition.",
          examples: [
            { code: `template <typename T>
requires std::integral<T>
T twice(T x) {
    return x * 2;
}`, notes: [{ at: "requires", text: "rejects types that fail the test" }] },
            { code: `template <typename T>
    requires std::is_arithmetic_v<T>
T square(T x) {
    return x * x;
}`, notes: [] },
            { code: `template <typename T>
T half(T x) requires std::floating_point<T> {
    return x / 2;
}`, notes: [{ at: "requires", text: "a trailing requires clause" }] }
          ]
        },
        {
          id: "standard-concepts", n: 2, title: "standard concepts", level: 3,
          gloss: "Constrains a parameter with a named concept from the library.",
          examples: [
            { code: `template <std::integral T>
T gcd2(T a, T b) {
    return b == 0 ? a : gcd2(b, a % b);
}`, notes: [{ at: "std::integral T", text: "a concept replaces typename" }] },
            { code: `auto add(std::integral auto a, std::integral auto b) {
    return a + b;
}`, notes: [{ at: "std::integral auto", text: "an abbreviated function template" }] },
            { code: `template <std::copyable T>
T duplicate(const T& x) {
    return x;
}`, notes: [] }
          ]
        },
        {
          id: "defining-concepts", n: 3, title: "defining concepts", level: 3,
          gloss: "Names a reusable requirement with the concept keyword.",
          examples: [
            { code: `template <typename T>
concept Numeric = std::is_arithmetic_v<T>;`, notes: [{ at: "concept Numeric", text: "a named compile-time test" }] },
            { code: `template <typename T>
concept Printable = requires(T x) {
    std::cout << x;
};`, notes: [{ at: "requires(T x)", text: "valid expressions form the test" }] },
            { code: `template <typename T>
concept HasSize = requires(const T& c) {
    { c.size() } -> std::convertible_to<std::size_t>;
};`, notes: [{ at: "-> std::convertible_to", text: "also checks the result type" }] }
          ]
        },
        {
          id: "using-concepts", n: 4, title: "using your concepts", level: 3,
          gloss: "Applies a custom concept to a function template.",
          examples: [
            { code: `template <typename T>
concept Numeric = std::is_arithmetic_v<T>;
template <Numeric T>
T triple(T x) { return x * 3; }`, notes: [{ at: "template <Numeric T>", text: "only numeric types are accepted" }] },
            { code: `template <typename T>
concept Numeric = std::is_arithmetic_v<T>;
Numeric auto total = 0;`, notes: [] },
            { code: `void show(std::integral auto n) {
    std::cout << "int " << n << '\\n';
}
void show(std::floating_point auto x) {
    std::cout << "real " << x << '\\n';
}`, notes: [{ at: "std::floating_point auto", text: "chosen for float and double" }] }
          ]
        }
      ]
    },
    {
      id: "lambdas",
      n: 15,
      title: "lambdas",
      concepts: [
        {
          id: "lambda-expressions", n: 1, title: "lambda expressions", level: 1,
          gloss: "Defines an unnamed function object inline.",
          examples: [
            { code: `auto square = [](int n) { return n * n; };`, notes: [{ at: "[]", text: "the capture list" }] },
            { code: `auto add = [](int a, int b) { return a + b; };
int r = add(2, 3);`, notes: [] },
            { code: `auto greet = [] { std::cout << "hi\\n"; };
greet();`, notes: [] }
          ]
        },
        {
          id: "captures", n: 2, title: "captures", level: 2,
          gloss: "Gives a lambda access to local variables by value or by reference.",
          examples: [
            { code: `int factor = 3;
auto scale = [factor](int n) { return n * factor; };`, notes: [{ at: "[factor]", text: "copies factor into the lambda" }] },
            { code: `int total = 0;
auto add = [&total](int n) { total += n; };`, notes: [{ at: "&total", text: "refers to the original" }] },
            { code: `int a = 1, b = 2;
auto f = [=] { return a + b; };`, notes: [{ at: "[=]", text: "captures every used variable by value" }] }
          ]
        },
        {
          id: "lambdas-with-algorithms", n: 3, title: "lambdas with algorithms", level: 2,
          gloss: "Passes a lambda to an algorithm to customize it.",
          examples: [
            { code: `std::vector<int> v{3, 1, 2};
std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });`, notes: [{ at: "a > b", text: "sorts in descending order" }] },
            { code: `std::vector<int> v{4, 11, 7};
auto it = std::ranges::find_if(v, [](int x) { return x > 10; });`, notes: [] },
            { code: `std::vector<int> v{1, 2, 3, 4};
auto n = std::ranges::count_if(v, [](int x) { return x % 2 == 0; });`, notes: [] }
          ]
        },
        {
          id: "generic-lambdas", n: 4, title: "generic lambdas", level: 3,
          gloss: "Accepts any type by declaring parameters as auto.",
          examples: [
            { code: `auto add = [](auto a, auto b) { return a + b; };`, notes: [{ at: "auto a, auto b", text: "each parameter can be any type" }] },
            { code: `auto print = [](const auto& x) { std::cout << x << '\\n'; };`, notes: [] },
            { code: `auto id = []<typename T>(T x) { return x; };`, notes: [{ at: "<typename T>", text: "explicit template parameters, C++20" }] }
          ]
        },
        {
          id: "storing-lambdas", n: 5, title: "storing lambdas", level: 3,
          gloss: "Stores a lambda in std::function when its type must be named.",
          examples: [
            { code: `std::function<int(int)> f = [](int n) { return n + 1; };`, notes: [{ at: "int(int)", text: "takes an int, returns an int" }] },
            { code: `std::vector<std::function<void()>> tasks;
tasks.push_back([] { std::cout << "run\\n"; });`, notes: [] },
            { code: `std::function<int(int, int)> op = std::plus<int>();`, notes: [{ at: "std::plus<int>()", text: "a library function object" }] }
          ]
        }
      ]
    },
    {
      id: "algorithms",
      n: 16,
      title: "<algorithm>",
      concepts: [
        {
          id: "sorting", n: 1, title: "sorting", level: 1,
          gloss: "Orders a range in place with std::sort.",
          examples: [
            { code: `std::vector<int> v{3, 1, 2};
std::sort(v.begin(), v.end());`, notes: [] },
            { code: `std::vector<int> v{3, 1, 2};
std::sort(v.begin(), v.end(), std::greater<int>());`, notes: [{ at: "std::greater<int>()", text: "sorts descending" }] },
            { code: `std::vector<int> v{3, 1, 2};
std::ranges::sort(v);`, notes: [{ at: "std::ranges::sort", text: "takes the container directly" }] }
          ]
        },
        {
          id: "find-count", n: 2, title: "find and count", level: 1,
          gloss: "Searches a range for a value or a match.",
          examples: [
            { code: `std::vector<int> v{4, 7, 9};
auto it = std::find(v.begin(), v.end(), 7);
if (it != v.end())
    std::cout << *it << '\\n';`, notes: [{ at: "it != v.end()", text: "end means not found" }] },
            { code: `std::vector<int> v{2, 5, 2};
int n = std::count(v.begin(), v.end(), 2);`, notes: [] },
            { code: `std::vector<int> v{5, 150};
bool any_big = std::ranges::any_of(v, [](int x) { return x > 100; });`, notes: [] }
          ]
        },
        {
          id: "transform", n: 3, title: "transform", level: 2,
          gloss: "Applies a function to every element and writes the results.",
          examples: [
            { code: `std::vector<int> v{1, 2, 3};
std::vector<int> out(v.size());
std::transform(v.begin(), v.end(), out.begin(),
               [](int x) { return x * x; });`, notes: [{ at: "out.begin()", text: "where results are written" }] },
            { code: `std::string s = "abc";
std::transform(s.begin(), s.end(), s.begin(), ::toupper);`, notes: [{ at: "s.begin(), ::toupper", text: "writes back in place" }] },
            { code: `std::vector<int> v{1, 2, 3};
std::for_each(v.begin(), v.end(), [](int& x) { x += 1; });`, notes: [{ at: "int& x", text: "a reference lets it modify elements" }] }
          ]
        },
        {
          id: "accumulate", n: 4, title: "accumulate and reduce", level: 2,
          gloss: "Folds a range into a single value.",
          examples: [
            { code: `std::vector<int> v{1, 2, 3};
int sum = std::accumulate(v.begin(), v.end(), 0);`, notes: [{ at: "0", text: "the starting value" }] },
            { code: `std::vector<int> v{1, 2, 3};
double avg = std::accumulate(v.begin(), v.end(), 0.0) / v.size();`, notes: [{ at: "0.0", text: "a double start gives a double result" }] },
            { code: `std::vector<int> v{1, 2, 3};
int total = std::reduce(v.begin(), v.end());`, notes: [] }
          ]
        },
        {
          id: "remove-erase", n: 5, title: "remove and erase", level: 2,
          gloss: "Deletes matching elements with the erase-remove idiom or erase_if.",
          examples: [
            { code: `std::vector<int> v{1, 3, 2, 3};
v.erase(std::remove(v.begin(), v.end(), 3), v.end());`, notes: [{ at: "std::remove", text: "moves kept elements to the front" }] },
            { code: `std::vector<int> v{1, -2, 3};
std::erase_if(v, [](int x) { return x < 0; });`, notes: [{ at: "std::erase_if", text: "one call in C++20" }] },
            { code: `std::vector<int> v{1, 1, 2, 2, 3};
auto last = std::unique(v.begin(), v.end());
v.erase(last, v.end());`, notes: [{ at: "std::unique", text: "collapses adjacent duplicates" }] }
          ]
        }
      ]
    },
    {
      id: "ranges",
      n: 17,
      title: "ranges & views",
      concepts: [
        {
          id: "range-algorithms", n: 1, title: "range algorithms", level: 2,
          gloss: "Calls algorithms on a whole container instead of iterator pairs.",
          examples: [
            { code: `std::vector<int> v{3, 1, 2};
std::ranges::sort(v);`, notes: [] },
            { code: `std::vector<int> v{4, 7, 9};
auto it = std::ranges::find(v, 7);`, notes: [] },
            { code: `std::vector<int> v{1, 2, 3};
bool ok = std::ranges::all_of(v, [](int x) { return x > 0; });`, notes: [] }
          ]
        },
        {
          id: "views", n: 2, title: "views", level: 3,
          gloss: "Builds lazy, composable views over a range.",
          examples: [
            { code: `std::vector<int> v{1, 2, 3, 4};
auto evens = v | std::views::filter([](int x) { return x % 2 == 0; });`, notes: [{ at: "|", text: "pipes the range into a view" }] },
            { code: `std::vector<int> v{1, 2, 3};
auto squares = v | std::views::transform([](int x) { return x * x; });`, notes: [] },
            { code: `std::vector<int> v{1, 2, 3, 4, 5};
auto first_three = v | std::views::take(3);`, notes: [{ at: "take(3)", text: "lazy: nothing is copied" }] }
          ]
        },
        {
          id: "view-pipelines", n: 3, title: "view pipelines", level: 3,
          gloss: "Chains several views to filter, transform and limit lazily.",
          examples: [
            { code: `std::vector<int> v{-1, 2, 3, 4, 5, 6, 7};
auto result = v
    | std::views::filter([](int x) { return x > 0; })
    | std::views::transform([](int x) { return x * 2; })
    | std::views::take(5);`, notes: [{ at: "std::views::take(5)", text: "stops after five items" }] },
            { code: `for (int x : std::views::iota(1, 6))
    std::cout << x << ' ';`, notes: [{ at: "iota(1, 6)", text: "1 through 5, generated lazily" }] },
            { code: `std::vector<int> v{1, 2, 3};
for (int x : v | std::views::reverse)
    std::cout << x << '\\n';`, notes: [] }
          ]
        },
        {
          id: "range-utilities", n: 4, title: "range utilities", level: 3,
          gloss: "Measures and slices ranges with helpers like size and subrange.",
          examples: [
            { code: `std::vector<int> v{1, 2, 3};
auto n = std::ranges::size(v);`, notes: [] },
            { code: `std::vector<int> v{4, 9, 2};
auto [mn, mx] = std::ranges::minmax(v);`, notes: [{ at: "minmax", text: "returns both extremes at once" }] },
            { code: `std::vector<int> v{1, 2, 3};
auto tail = std::ranges::subrange(v.begin() + 1, v.end());`, notes: [] }
          ]
        },
        {
          id: "projections", n: 5, title: "projections", level: 3,
          gloss: "Sorts or searches by a member with a projection argument.",
          examples: [
            { code: `struct P { std::string name; int age; };
std::vector<P> people;
std::ranges::sort(people, {}, &P::age);`, notes: [{ at: "&P::age", text: "the projection: sort by age" }] },
            { code: `struct P { std::string name; int age; };
std::vector<P> people;
auto it = std::ranges::find(people, "ada", &P::name);`, notes: [] },
            { code: `struct P { std::string name; int age; };
std::vector<P> people;
auto oldest = std::ranges::max_element(people, {}, &P::age);`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "optional-variant",
      n: 18,
      title: "optional, variant & result patterns",
      concepts: [
        {
          id: "optional", n: 1, title: "std::optional", level: 2,
          gloss: "Represents a value that may be absent.",
          examples: [
            { code: `std::optional<int> parse(const std::string& s) {
    if (s.empty())
        return std::nullopt;
    return std::stoi(s);
}`, notes: [{ at: "std::nullopt", text: "the empty value" }] },
            { code: `std::optional<int> parse(const std::string&);
std::optional<int> r = parse("42");
if (r)
    std::cout << *r << '\\n';`, notes: [{ at: "*r", text: "the contained value" }] },
            { code: `std::optional<int> r;
int n = r.value_or(0);`, notes: [{ at: "value_or(0)", text: "the fallback when empty" }] }
          ]
        },
        {
          id: "variant", n: 2, title: "std::variant", level: 3,
          gloss: "Holds exactly one value out of several alternative types.",
          examples: [
            { code: `std::variant<int, std::string> v = 42;`, notes: [] },
            { code: `std::variant<int, std::string> v = 1;
v = std::string("text");
std::cout << v.index() << '\\n';`, notes: [{ at: "v.index()", text: "which alternative is active" }] },
            { code: `std::variant<int, std::string> v = 7;
int n = std::get<int>(v);`, notes: [{ at: "std::get<int>", text: "throws if int is not active" }] }
          ]
        },
        {
          id: "visit", n: 3, title: "std::visit", level: 3,
          gloss: "Calls a function on whichever alternative a variant holds.",
          examples: [
            { code: `std::variant<int, std::string> v = 7;
std::visit([](const auto& x) { std::cout << x << '\\n'; }, v);`, notes: [{ at: "const auto& x", text: "instantiated for each alternative" }] },
            { code: `struct Printer {
    void operator()(int n) const { std::cout << n << '\\n'; }
    void operator()(const std::string& s) const {
        std::cout << s << '\\n';
    }
};`, notes: [{ at: "operator()", text: "one overload per alternative" }] },
            { code: `std::variant<int, std::string> v = 3;
if (std::holds_alternative<int>(v))
    std::cout << "int\\n";`, notes: [] }
          ]
        },
        {
          id: "result-patterns", n: 4, title: "error results", level: 3,
          gloss: "Returns a value or an error without exceptions using a variant.",
          examples: [
            { code: `struct Error { std::string message; };
using Result = std::variant<int, Error>;`, notes: [{ at: "using Result", text: "a readable name for the variant" }] },
            { code: `struct Error { std::string message; };
using Result = std::variant<int, Error>;
Result divide(int a, int b) {
    if (b == 0)
        return Error{"division by zero"};
    return a / b;
}`, notes: [] },
            { code: `struct Error { std::string message; };
using Result = std::variant<int, Error>;
Result r = 4;
if (auto* ok = std::get_if<int>(&r))
    std::cout << *ok << '\\n';`, notes: [{ at: "std::get_if", text: "null instead of throwing" }] }
          ]
        }
      ]
    }
  ]
};
