export default {
  id: "go",
  name: "Go",
  short: "GO",
  pigment: "go",
  family: null,
  version: "1.22",
  lexer: "go",
  indent: 4,
  topics: [
    {
      id: "packages-imports",
      n: 1,
      title: "packages & imports",
      concepts: [
        {
          id: "package-main", n: 1, title: "package main", level: 1,
          gloss: "Declares the package that every executable program starts in.",
          examples: [
            { code: `package main

func main() {
}`, notes: [{ at: "package main", text: "the entry package for programs" }] },
            { code: `import "fmt"

func main() {
    fmt.Println("hello")
}`, notes: [{ at: "func main()", text: "where execution begins" }] },
            { code: `package greet

func Hello() string {
    return "hello"
}`, notes: [{ at: "package greet", text: "a library package, not a program" }] }
          ]
        },
        {
          id: "import-forms", n: 2, title: "import forms", level: 1,
          gloss: "Pulls in other packages by path, singly or in a block.",
          examples: [
            { code: `import "fmt"`, notes: [] },
            { code: `import (
    "fmt"
    "strings"
)`, notes: [{ at: "(", text: "a block groups several imports" }] },
            { code: `import (
    "fmt"
    str "strings"
)`, notes: [{ at: 'str "strings"', text: "an alias for the package name" }] }
          ]
        },
        {
          id: "exported-names", n: 3, title: "exported names", level: 1,
          gloss: "Exports a name by capitalizing its first letter.",
          examples: [
            { code: `func Add(a, b int) int {
    return a + b
}`, notes: [{ at: "Add", text: "capitalized: visible to other packages" }] },
            { code: `func add(a, b int) int {
    return a + b
}`, notes: [{ at: "add", text: "lowercase: private to the package" }] },
            { code: `var Version = "1.0"`, notes: [] }
          ]
        },
        {
          id: "init-functions", n: 4, title: "init functions", level: 2,
          gloss: "Runs setup code automatically before main starts.",
          examples: [
            { code: `func init() {
    fmt.Println("starting")
}`, notes: [{ at: "func init()", text: "runs once, before main" }] },
            { code: `var table = map[string]int{}

func init() {
    table["one"] = 1
}`, notes: [] },
            { code: `import _ "embed"`, notes: [{ at: "_", text: "imported only for its side effects" }] }
          ]
        }
      ]
    },
    {
      id: "variables-constants",
      n: 2,
      title: "var, :=, const, iota",
      concepts: [
        {
          id: "var-declarations", n: 1, title: "var declarations", level: 1,
          gloss: "Declares variables with an explicit type or an initial value.",
          examples: [
            { code: `var count int`, notes: [{ at: "count int", text: "starts at the zero value" }] },
            { code: `var name, age = "ada", 36`, notes: [] },
            { code: `var (
    host = "localhost"
    port = 8080
)`, notes: [{ at: "var (", text: "a block groups declarations" }] }
          ]
        },
        {
          id: "short-declarations", n: 2, title: "short declarations", level: 1,
          gloss: "Declares and initializes a variable inside a function.",
          examples: [
            { code: `count := 0`, notes: [{ at: ":=", text: "only allowed inside functions" }] },
            { code: `name, age := "ada", 36`, notes: [] },
            { code: `n, err := strconv.Atoi("42")`, notes: [{ at: "n, err", text: "two results, two new variables" }] }
          ]
        },
        {
          id: "constants", n: 3, title: "constants", level: 1,
          gloss: "Names values that are fixed at compile time.",
          examples: [
            { code: `const Pi = 3.14159`, notes: [{ at: "const", text: "cannot be reassigned" }] },
            { code: `const (
    KB = 1024
    MB = 1024 * KB
)`, notes: [] },
            { code: `const greeting string = "hello"`, notes: [] }
          ]
        },
        {
          id: "iota", n: 4, title: "iota", level: 2,
          gloss: "Numbers constants automatically inside a const block.",
          examples: [
            { code: `const (
    Red = iota
    Green
    Blue
)`, notes: [{ at: "iota", text: "0 here, then 1 and 2 below" }] },
            { code: `type Weekday int

const (
    Sunday Weekday = iota
    Monday
    Tuesday
)`, notes: [{ at: "Sunday Weekday", text: "the type carries to the next lines" }] },
            { code: `const (
    _  = iota
    KB = 1 << (10 * iota)
    MB
)`, notes: [{ at: "_", text: "skips the zero value" }] }
          ]
        },
        {
          id: "shadowing", n: 5, title: "shadowing and scope", level: 2,
          gloss: "Hides an outer variable by redeclaring its name in an inner block.",
          examples: [
            { code: `x := 1
if true {
    x := 2
    fmt.Println(x)
}
fmt.Println(x)`, notes: [{ at: "x := 2", text: "a new x that shadows the outer one" }] },
            { code: `if n, err := strconv.Atoi("7"); err == nil {
    fmt.Println(n)
}`, notes: [{ at: "n, err :=", text: "scoped to the if statement" }] },
            { code: `x, y := 1, 2
x, z := 3, 4
fmt.Println(x, y, z)`, notes: [{ at: "x, z :=", text: "reuses x and declares z" }] }
          ]
        }
      ]
    },
    {
      id: "types-zero-values",
      n: 3,
      title: "types & zero values",
      concepts: [
        {
          id: "basic-types", n: 1, title: "basic types", level: 1,
          gloss: "Declares numbers, text and booleans with Go's built-in types.",
          examples: [
            { code: `var i int = 42
var f float64 = 3.5
var ok bool = true`, notes: [] },
            { code: `var s string = "hi"
var r rune = 'x'
var b byte = 255`, notes: [{ at: "rune", text: "an alias for int32: a code point" }] },
            { code: `var big int64 = 1 << 40
var small uint8 = 200`, notes: [{ at: "uint8", text: "0 through 255 only" }] }
          ]
        },
        {
          id: "zero-values", n: 2, title: "zero values", level: 1,
          gloss: "Gives every variable a usable default instead of leaving it undefined.",
          examples: [
            { code: `var n int
var s string
var b bool`, notes: [{ at: "var n int", text: "0, the empty string and false" }] },
            { code: `var p *int
var sl []int
var m map[string]int`, notes: [{ at: "var p *int", text: "nil for pointers, slices and maps" }] },
            { code: `var n int
var s string
var sl []int
fmt.Println(n == 0, s == "", sl == nil)`, notes: [] }
          ]
        },
        {
          id: "type-conversion", n: 3, title: "type conversion", level: 1,
          gloss: "Converts between types explicitly, never implicitly.",
          examples: [
            { code: `f := float64(7) / 2`, notes: [{ at: "float64(7)", text: "convert before dividing" }] },
            { code: `x := 3.9
n := int(x)`, notes: [{ at: "int(x)", text: "truncates toward zero" }] },
            { code: `s := strconv.Itoa(42)
n, _ := strconv.Atoi(s)`, notes: [{ at: "strconv.Itoa", text: "int to text; int(x) would give a rune" }] }
          ]
        },
        {
          id: "defined-types", n: 4, title: "defined types", level: 2,
          gloss: "Creates a new type from an existing one so it can carry methods.",
          examples: [
            { code: `type Celsius float64`, notes: [{ at: "Celsius float64", text: "a distinct type, not an alias" }] },
            { code: `type Celsius float64

func (c Celsius) Fahrenheit() float64 {
    return float64(c)*9/5 + 32
}`, notes: [] },
            { code: `type ID = string`, notes: [{ at: "=", text: "an alias: the same type, another name" }] }
          ]
        },
        {
          id: "pointers", n: 5, title: "pointers", level: 2,
          gloss: "Refers to a variable's memory with & and reads or writes it with *.",
          examples: [
            { code: `x := 5
p := &x
*p = 6`, notes: [{ at: "&x", text: "the address of x" }] },
            { code: `func inc(n *int) {
    *n++
}`, notes: [{ at: "*n++", text: "changes the caller's variable" }] },
            { code: `p := new(int)
*p = 3`, notes: [{ at: "new(int)", text: "allocates a zeroed int" }] }
          ]
        }
      ]
    },
    {
      id: "slices",
      n: 4,
      title: "slices",
      concepts: [
        {
          id: "slice-literals", n: 1, title: "slice literals", level: 1,
          gloss: "Creates a growable sequence from values or with make.",
          examples: [
            { code: `nums := []int{1, 2, 3}`, notes: [{ at: "[]int", text: "no size between the brackets" }] },
            { code: `names := make([]string, 0, 10)`, notes: [{ at: "0, 10", text: "length 0, capacity 10" }] },
            { code: `var empty []int`, notes: [{ at: "var empty", text: "nil, but safe to append to" }] }
          ]
        },
        {
          id: "append", n: 2, title: "append", level: 1,
          gloss: "Grows a slice and returns the new one.",
          examples: [
            { code: `nums := []int{1, 2}
nums = append(nums, 3)`, notes: [{ at: "nums =", text: "append may return a new array" }] },
            { code: `a := []int{1}
b := []int{2, 3}
a = append(a, b...)`, notes: [{ at: "b...", text: "spreads a slice into arguments" }] },
            { code: `var s []string
s = append(s, "a", "b")`, notes: [] }
          ]
        },
        {
          id: "slicing", n: 3, title: "slicing", level: 1,
          gloss: "Takes a window of a slice with start and stop indexes.",
          examples: [
            { code: `nums := []int{0, 1, 2, 3, 4}
mid := nums[1:4]`, notes: [{ at: "1:4", text: "stop is excluded" }] },
            { code: `nums := []int{0, 1, 2, 3, 4}
head := nums[:2]
tail := nums[2:]`, notes: [] },
            { code: `nums := []int{0, 1, 2, 3, 4}
last := nums[len(nums)-1]`, notes: [{ at: "len(nums)-1", text: "there is no negative indexing" }] }
          ]
        },
        {
          id: "length-capacity", n: 4, title: "length and capacity", level: 2,
          gloss: "Tells how many items a slice holds and how many it can hold before growing.",
          examples: [
            { code: `s := make([]int, 2, 5)
fmt.Println(len(s), cap(s))`, notes: [{ at: "cap(s)", text: "room before a reallocation" }] },
            { code: `s := make([]int, 2, 5)
s = append(s, 1)
fmt.Println(len(s), cap(s))`, notes: [] },
            { code: `s := make([]int, 2, 5)
t := s[:4]`, notes: [{ at: "s[:4]", text: "may reach up to the capacity" }] }
          ]
        },
        {
          id: "copying", n: 5, title: "copying slices", level: 2,
          gloss: "Copies elements into a new slice instead of sharing the old array.",
          examples: [
            { code: `dst := make([]int, 3)
n := copy(dst, []int{1, 2, 3})`, notes: [{ at: "copy", text: "returns how many items it copied" }] },
            { code: `nums := []int{1, 2, 3}
clone := slices.Clone(nums)`, notes: [] },
            { code: `a := []int{1, 2, 3}
b := a
b[0] = 99`, notes: [{ at: "b := a", text: "shares the same backing array" }] }
          ]
        },
        {
          id: "slices-package", n: 6, title: "the slices package", level: 2,
          gloss: "Sorts and searches slices with generic helpers.",
          examples: [
            { code: `nums := []int{3, 1, 2}
slices.Sort(nums)`, notes: [{ at: "slices.Sort", text: "sorts in place, no comparator needed" }] },
            { code: `nums := []int{1, 2, 3}
i, found := slices.BinarySearch(nums, 3)`, notes: [{ at: "BinarySearch", text: "the slice must be sorted" }] },
            { code: `nums := []int{1, 2, 3}
fmt.Println(slices.Contains(nums, 2), slices.Max(nums))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "maps",
      n: 5,
      title: "maps",
      concepts: [
        {
          id: "map-literals", n: 1, title: "map literals", level: 1,
          gloss: "Creates a key-value table from literals or with make.",
          examples: [
            { code: `ages := map[string]int{"ada": 36, "lin": 29}`, notes: [{ at: "map[string]int", text: "key type, then value type" }] },
            { code: `counts := make(map[string]int)`, notes: [] },
            { code: `var m map[string]int`, notes: [{ at: "var m", text: "nil: reading works, writing panics" }] }
          ]
        },
        {
          id: "reading-writing", n: 2, title: "reading and writing", level: 1,
          gloss: "Manages entries by key: set, read or delete.",
          examples: [
            { code: `ages := map[string]int{}
ages["sam"] = 41`, notes: [] },
            { code: `ages := map[string]int{"ada": 36}
age := ages["ada"]`, notes: [{ at: 'ages["ada"]', text: "the zero value if the key is missing" }] },
            { code: `ages := map[string]int{"ada": 36}
delete(ages, "ada")`, notes: [{ at: "delete", text: "does nothing if the key is absent" }] }
          ]
        },
        {
          id: "comma-ok", n: 3, title: "comma ok", level: 1,
          gloss: "Tells a missing key apart from a stored zero value.",
          examples: [
            { code: `ages := map[string]int{"ada": 36}
age, ok := ages["ada"]
if !ok {
    fmt.Println("missing")
}`, notes: [{ at: "age, ok", text: "ok is false for a missing key" }] },
            { code: `ages := map[string]int{"lin": 29}
if _, found := ages["lin"]; found {
    fmt.Println("lin is here")
}`, notes: [] },
            { code: `counts := map[string]int{}
counts["go"]++`, notes: [{ at: "++", text: "a missing key starts at zero" }] }
          ]
        },
        {
          id: "iterating-maps", n: 4, title: "iterating maps", level: 2,
          gloss: "Visits every entry with range, in random order.",
          examples: [
            { code: `ages := map[string]int{"ada": 36, "lin": 29}
for k, v := range ages {
    fmt.Println(k, v)
}`, notes: [{ at: "range ages", text: "the order is random" }] },
            { code: `ages := map[string]int{"ada": 36, "lin": 29}
keys := make([]string, 0, len(ages))
for k := range ages {
    keys = append(keys, k)
}
sort.Strings(keys)`, notes: [{ at: "sort.Strings", text: "sort the keys for a stable order" }] },
            { code: `ages := map[string]int{"ada": 36}
clear(ages)`, notes: [{ at: "clear", text: "empties the map, Go 1.21" }] }
          ]
        },
        {
          id: "nested-maps", n: 5, title: "maps of structures", level: 2,
          gloss: "Groups values by key with slices, structs or maps as values.",
          examples: [
            { code: `groups := map[string][]string{}
groups["a"] = append(groups["a"], "x")`, notes: [{ at: 'groups["a"]', text: "a missing key gives a nil slice" }] },
            { code: `type Point struct{ X, Y int }

seen := map[Point]bool{}
seen[Point{1, 2}] = true`, notes: [{ at: "map[Point]bool", text: "structs can be keys if comparable" }] },
            { code: `nested := map[string]map[string]int{}
nested["a"] = map[string]int{"x": 1}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "structs",
      n: 6,
      title: "structs",
      concepts: [
        {
          id: "defining-structs", n: 1, title: "defining structs", level: 1,
          gloss: "Groups related fields into one named type.",
          examples: [
            { code: `type User struct {
    Name string
    Age  int
}`, notes: [{ at: "type User struct", text: "fields are listed by name and type" }] },
            { code: `type Point struct{ X, Y float64 }`, notes: [{ at: "X, Y", text: "two fields sharing one type" }] },
            { code: `type Config struct {
    Host string
    Port int
    TLS  bool
}`, notes: [] }
          ]
        },
        {
          id: "struct-literals", n: 2, title: "struct literals", level: 1,
          gloss: "Creates a value by naming fields or listing them in order.",
          examples: [
            { code: `type User struct {
    Name string
    Age  int
}

u := User{Name: "ada", Age: 36}`, notes: [{ at: "Name: ", text: "named fields can be in any order" }] },
            { code: `type Point struct{ X, Y int }
p := Point{1, 2}`, notes: [{ at: "{1, 2}", text: "positional: fields in order" }] },
            { code: `type User struct {
    Name string
    Age  int
}

var u User`, notes: [{ at: "var u User", text: "every field starts at its zero value" }] }
          ]
        },
        {
          id: "fields-and-pointers", n: 3, title: "fields and pointers", level: 1,
          gloss: "Reads and changes fields directly or through a pointer.",
          examples: [
            { code: `type User struct {
    Name string
    Age  int
}

u := &User{Name: "ada"}
u.Age = 36`, notes: [{ at: "u.Age", text: "pointers need no arrow syntax" }] },
            { code: `type User struct {
    Name string
    Age  int
}

func birthday(u *User) {
    u.Age++
}`, notes: [] },
            { code: `type User struct {
    Name string
    Age  int
}

users := []User{{"ada", 36}, {"lin", 29}}`, notes: [{ at: "{{", text: "the inner type name can be omitted" }] }
          ]
        },
        {
          id: "embedding", n: 4, title: "embedding", level: 2,
          gloss: "Promotes one struct's fields and methods into another.",
          examples: [
            { code: `type Animal struct{ Name string }

type Dog struct {
    Animal
    Breed string
}`, notes: [{ at: "Animal", text: "an embedded field has no name of its own" }] },
            { code: `type Animal struct{ Name string }
type Dog struct {
    Animal
    Breed string
}

d := Dog{Animal: Animal{Name: "rex"}, Breed: "lab"}`, notes: [{ at: "Animal: Animal", text: "build the embedded value by type name" }] },
            { code: `type Animal struct{ Name string }
type Dog struct{ Animal }

func (a Animal) Speak() string { return a.Name + " speaks" }`, notes: [{ at: "type Dog", text: "the Dog type gets Speak for free" }] }
          ]
        },
        {
          id: "struct-tags", n: 5, title: "struct tags", level: 2,
          gloss: "Attaches metadata to fields for packages such as encoding/json.",
          examples: [
            { code: `type User struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}`, notes: [{ at: '`json:"name"`', text: "the key used in JSON output" }] },
            { code: `type User struct {
    Name  string \`json:"name"\`
    Email string \`json:"email,omitempty"\`
}`, notes: [{ at: "omitempty", text: "left out when the field is empty" }] },
            { code: `type User struct {
    Name     string \`json:"name"\`
    Password string \`json:"-"\`
}`, notes: [{ at: '"-"', text: "never encoded" }] }
          ]
        }
      ]
    },
    {
      id: "methods",
      n: 7,
      title: "methods & receivers",
      concepts: [
        {
          id: "value-receivers", n: 1, title: "value receivers", level: 1,
          gloss: "Attaches a function to a type that works on a copy of the value.",
          examples: [
            { code: `type Rect struct{ W, H float64 }

func (r Rect) Area() float64 {
    return r.W * r.H
}`, notes: [{ at: "(r Rect)", text: "the receiver, before the name" }] },
            { code: `type Rect struct{ W, H float64 }

func (r Rect) Perimeter() float64 {
    return 2 * (r.W + r.H)
}`, notes: [] },
            { code: `type Rect struct{ W, H float64 }

func (r Rect) Scale(k float64) Rect {
    return Rect{r.W * k, r.H * k}
}`, notes: [{ at: "Rect{", text: "returns a new value, original intact" }] }
          ]
        },
        {
          id: "pointer-receivers", n: 2, title: "pointer receivers", level: 1,
          gloss: "Changes the receiver in place by taking a pointer to it.",
          examples: [
            { code: `type Counter struct{ n int }

func (c *Counter) Inc() {
    c.n++
}`, notes: [{ at: "*Counter", text: "modifies the caller's value" }] },
            { code: `type Counter struct{ n int }

func (c *Counter) Value() int {
    return c.n
}`, notes: [] },
            { code: `type Counter struct{ n int }

func (c *Counter) Inc()   { c.n++ }
func (c *Counter) Reset() { c.n = 0 }`, notes: [{ at: "Reset", text: "the compiler takes &c for you at calls" }] }
          ]
        },
        {
          id: "methods-on-any-type", n: 3, title: "methods on any type", level: 2,
          gloss: "Defines methods on slices, numbers and even function types.",
          examples: [
            { code: `type IntList []int

func (l IntList) Sum() int {
    total := 0
    for _, n := range l {
        total += n
    }
    return total
}`, notes: [] },
            { code: `type Celsius float64

func (c Celsius) String() string {
    return fmt.Sprintf("%.1fC", float64(c))
}`, notes: [{ at: "String()", text: "satisfies fmt.Stringer" }] },
            { code: `type Handler func(string)

func (h Handler) Call(s string) {
    h(s)
}`, notes: [{ at: "type Handler func", text: "even function types can have methods" }] }
          ]
        },
        {
          id: "constructor-functions", n: 4, title: "constructor functions", level: 1,
          gloss: "Builds a ready-to-use value with a New function.",
          examples: [
            { code: `type User struct{ Name string }

func NewUser(name string) *User {
    return &User{Name: name}
}`, notes: [{ at: "NewUser", text: "a convention, not a keyword" }] },
            { code: `func NewPort(n int) (int, error) {
    if n < 1 || n > 65535 {
        return 0, errors.New("port out of range")
    }
    return n, nil
}`, notes: [{ at: "(int, error)", text: "constructors can report failure" }] },
            { code: `type Server struct{ Addr string }

func NewServer(addr string) *Server {
    if addr == "" {
        addr = ":8080"
    }
    return &Server{Addr: addr}
}`, notes: [] }
          ]
        },
        {
          id: "method-values", n: 5, title: "method values", level: 3,
          gloss: "Binds a method to a receiver so it can be passed around like a function.",
          examples: [
            { code: `var sb strings.Builder
write := sb.WriteString
write("hi")`, notes: [{ at: "sb.WriteString", text: "a method value bound to sb" }] },
            { code: `f := (*strings.Builder).WriteString
var sb strings.Builder
f(&sb, "hi")`, notes: [{ at: "(*strings.Builder).WriteString", text: "a method expression: pass the receiver" }] },
            { code: `fn := strings.ToUpper
fmt.Println(fn("go"))`, notes: [{ at: "strings.ToUpper", text: "a function is a value too" }] }
          ]
        }
      ]
    },
    {
      id: "interfaces",
      n: 8,
      title: "interfaces",
      concepts: [
        {
          id: "defining-interfaces", n: 1, title: "defining interfaces", level: 2,
          gloss: "Describes behavior as a set of method signatures.",
          examples: [
            { code: `type Shape interface {
    Area() float64
}`, notes: [{ at: "interface", text: "lists methods, no bodies" }] },
            { code: `type Reader interface {
    Read(p []byte) (n int, err error)
}`, notes: [] },
            { code: `type Stringer interface {
    String() string
}`, notes: [] }
          ]
        },
        {
          id: "implicit-implementation", n: 2, title: "implicit implementation", level: 2,
          gloss: "Satisfies an interface just by having the right methods.",
          examples: [
            { code: `type Shape interface{ Area() float64 }
type Rect struct{ W, H float64 }

func (r Rect) Area() float64 { return r.W * r.H }`, notes: [{ at: "func (r Rect) Area()", text: "no implements keyword needed" }] },
            { code: `type Rect struct{ W, H float64 }

func (r Rect) Area() float64      { return r.W * r.H }
func (r Rect) Perimeter() float64 { return 2 * (r.W + r.H) }`, notes: [{ at: "Perimeter", text: "one type can satisfy many interfaces" }] },
            { code: `type Speaker interface{ Speak() string }
type Dog struct{}
type Cat struct{}

func (Dog) Speak() string { return "woof" }
func (Cat) Speak() string { return "meow" }`, notes: [] }
          ]
        },
        {
          id: "any-and-assertions", n: 3, title: "any and type assertions", level: 2,
          gloss: "Stores any value and recovers its concrete type.",
          examples: [
            { code: `var x any = 42
n := x.(int)`, notes: [{ at: "x.(int)", text: "panics if x is not an int" }] },
            { code: `var x any = "hi"
s, ok := x.(string)
if !ok {
    fmt.Println("not a string")
}`, notes: [{ at: "s, ok", text: "the comma-ok form never panics" }] },
            { code: `var x any = 42
switch v := x.(type) {
case int:
    fmt.Println("int", v)
case string:
    fmt.Println("string", v)
}`, notes: [{ at: "x.(type)", text: "only valid inside a switch" }] }
          ]
        },
        {
          id: "composing-interfaces", n: 4, title: "composing interfaces", level: 3,
          gloss: "Builds larger interfaces by embedding smaller ones.",
          examples: [
            { code: `type ReadCloser interface {
    io.Reader
    io.Closer
}`, notes: [{ at: "io.Reader", text: "embeds every method of Reader" }] },
            { code: `var _ io.Writer = (*bytes.Buffer)(nil)`, notes: [{ at: "var _", text: "a compile-time interface check" }] },
            { code: `func Copy(dst io.Writer, src io.Reader) error {
    _, err := io.Copy(dst, src)
    return err
}`, notes: [{ at: "io.Writer", text: "accept interfaces, return structs" }] }
          ]
        },
        {
          id: "stringer-and-error", n: 5, title: "Stringer and error", level: 2,
          gloss: "Customizes printing and error messages through two tiny interfaces.",
          examples: [
            { code: `type Color int

func (c Color) String() string {
    return [...]string{"red", "green", "blue"}[c]
}`, notes: [{ at: "[...]string", text: "an array whose length is counted for you" }] },
            { code: `type MyErr struct{ Code int }

func (e MyErr) Error() string {
    return fmt.Sprintf("code %d", e.Code)
}`, notes: [{ at: "Error()", text: "makes it satisfy the error interface" }] },
            { code: `type Color int

func (c Color) String() string { return "color" }`, notes: [{ at: "String()", text: "fmt.Println(Color(1)) calls this" }] }
          ]
        }
      ]
    },
    {
      id: "errors",
      n: 9,
      title: "errors",
      concepts: [
        {
          id: "returning-errors", n: 1, title: "returning errors", level: 1,
          gloss: "Reports failure as an ordinary second return value.",
          examples: [
            { code: `func div(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("divide by zero")
    }
    return a / b, nil
}`, notes: [{ at: "errors.New", text: "creates a simple error value" }] },
            { code: `func parse(s string) (int, error) {
    n, err := strconv.Atoi(s)
    if err != nil {
        return 0, err
    }
    return n, nil
}`, notes: [{ at: "err != nil", text: "check right after the call" }] },
            { code: `if err := os.Remove("tmp.txt"); err != nil {
    fmt.Println("error:", err)
}`, notes: [] }
          ]
        },
        {
          id: "wrapping-errors", n: 2, title: "wrapping errors", level: 2,
          gloss: "Adds context to an error while keeping the original inside.",
          examples: [
            { code: `func load(path string) error {
    _, err := os.ReadFile(path)
    if err != nil {
        return fmt.Errorf("load %s: %w", path, err)
    }
    return nil
}`, notes: [{ at: "%w", text: "wraps err so callers can unwrap it" }] },
            { code: `err := fmt.Errorf("outer: %w", io.EOF)
fmt.Println(errors.Unwrap(err) == io.EOF)`, notes: [] },
            { code: `joined := errors.Join(errors.New("a"), errors.New("b"))
fmt.Println(joined)`, notes: [{ at: "errors.Join", text: "combines several errors, Go 1.20" }] }
          ]
        },
        {
          id: "is-and-as", n: 3, title: "errors.Is and errors.As", level: 2,
          gloss: "Inspects wrapped errors by identity or by type.",
          examples: [
            { code: `_, err := os.Open("missing.txt")
if errors.Is(err, os.ErrNotExist) {
    fmt.Println("no such file")
}`, notes: [{ at: "errors.Is", text: "matches anywhere in the chain" }] },
            { code: `_, err := os.Open("missing.txt")
var pe *fs.PathError
if errors.As(err, &pe) {
    fmt.Println(pe.Path)
}`, notes: [{ at: "&pe", text: "errors.As fills in the matching error" }] },
            { code: `var ErrNotFound = errors.New("not found")

func find(id int) error {
    return fmt.Errorf("user %d: %w", id, ErrNotFound)
}`, notes: [{ at: "ErrNotFound", text: "a sentinel error callers can test" }] }
          ]
        },
        {
          id: "custom-error-types", n: 4, title: "custom error types", level: 2,
          gloss: "Carries structured details by implementing the error interface.",
          examples: [
            { code: `type NotFoundError struct{ Name string }

func (e *NotFoundError) Error() string {
    return e.Name + " not found"
}`, notes: [{ at: "*NotFoundError", text: "a pointer receiver: use &NotFoundError" }] },
            { code: `type QueryError struct {
    Query string
    Err   error
}

func (e *QueryError) Unwrap() error { return e.Err }`, notes: [{ at: "Unwrap", text: "lets errors.Is and As see inside" }] },
            { code: `type ValidationError struct {
    Field string
    Msg   string
}

func (e ValidationError) Error() string {
    return e.Field + ": " + e.Msg
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "defer-panic",
      n: 10,
      title: "defer, panic, recover",
      concepts: [
        {
          id: "defer", n: 1, title: "defer", level: 1,
          gloss: "Schedules a call to run when the surrounding function returns.",
          examples: [
            { code: `f, err := os.Open("data.txt")
if err != nil {
    return
}
defer f.Close()`, notes: [{ at: "defer f.Close()", text: "runs when the function returns" }] },
            { code: `for i := 0; i < 3; i++ {
    defer fmt.Println(i)
}`, notes: [{ at: "defer", text: "deferred calls run last in, first out" }] },
            { code: `func trace(name string) func() {
    fmt.Println("enter", name)
    return func() { fmt.Println("exit", name) }
}`, notes: [{ at: "return func()", text: "use as defer trace(name)()" }] }
          ]
        },
        {
          id: "panic", n: 2, title: "panic", level: 2,
          gloss: "Stops normal execution for errors that should never happen.",
          examples: [
            { code: `panic("something went wrong")`, notes: [{ at: "panic", text: "unwinds the stack, running defers" }] },
            { code: `var m map[string]int
m["a"] = 1`, notes: [{ at: 'm["a"] = 1', text: "writing to a nil map panics" }] },
            { code: `s := []int{1, 2}
idx := 10
fmt.Println(s[idx])`, notes: [{ at: "s[idx]", text: "index out of range panics" }] }
          ]
        },
        {
          id: "recover", n: 3, title: "recover", level: 3,
          gloss: "Catches a panic inside a deferred function and resumes normally.",
          examples: [
            { code: `func safe() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("recovered:", r)
        }
    }()
    panic("boom")
}`, notes: [{ at: "recover()", text: "only works inside a deferred function" }] },
            { code: `func try(f func()) (err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic: %v", r)
        }
    }()
    f()
    return nil
}`, notes: [{ at: "err =", text: "sets the named result from the defer" }] },
            { code: `defer func() {
    if r := recover(); r != nil {
        fmt.Println("recovered:", r)
    }
}()
panic("boom")`, notes: [] }
          ]
        },
        {
          id: "defer-details", n: 4, title: "defer details", level: 3,
          gloss: "Evaluates deferred arguments immediately and can edit named results.",
          examples: [
            { code: `func double(n int) (result int) {
    defer func() { result *= 2 }()
    return n + 1
}`, notes: [{ at: "result *= 2", text: "runs after the return value is set" }] },
            { code: `var mu sync.Mutex
mu.Lock()
defer mu.Unlock()`, notes: [{ at: "defer mu.Unlock()", text: "pairs the unlock with the lock" }] },
            { code: `x := 1
defer fmt.Println(x)
x = 2`, notes: [{ at: "defer fmt.Println(x)", text: "arguments are evaluated now: prints 1" }] }
          ]
        }
      ]
    },
    {
      id: "goroutines",
      n: 11,
      title: "goroutines",
      concepts: [
        {
          id: "go-statements", n: 1, title: "go statements", level: 2,
          gloss: "Runs a function concurrently in a new goroutine.",
          examples: [
            { code: `go fmt.Println("in the background")`, notes: [{ at: "go", text: "the call runs concurrently" }] },
            { code: `go func() {
    fmt.Println("anonymous")
}()`, notes: [{ at: "}()", text: "the function is called right away" }] },
            { code: `for i := range 3 {
    go fmt.Println(i)
}`, notes: [{ at: "range 3", text: "range over an int, Go 1.22" }] }
          ]
        },
        {
          id: "waiting-for-goroutines", n: 2, title: "waiting for goroutines", level: 2,
          gloss: "Blocks until background work has finished.",
          examples: [
            { code: `var wg sync.WaitGroup
wg.Add(1)
go func() {
    defer wg.Done()
    fmt.Println("work")
}()
wg.Wait()`, notes: [{ at: "wg.Wait()", text: "blocks until the count reaches zero" }] },
            { code: `time.Sleep(100 * time.Millisecond)`, notes: [{ at: "time.Sleep", text: "a crude wait; prefer a WaitGroup" }] },
            { code: `var wg sync.WaitGroup
for i := range 3 {
    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println(i)
    }()
}
wg.Wait()`, notes: [{ at: "go func()", text: "from Go 1.22, i is per iteration" }] }
          ]
        },
        {
          id: "loop-variables", n: 3, title: "loop variables", level: 3,
          gloss: "Gives each iteration its own copy of the loop variable since Go 1.22.",
          examples: [
            { code: `for i := 0; i < 3; i++ {
    go func() { fmt.Println(i) }()
}`, notes: [{ at: "i < 3", text: "before 1.22 all three shared one i" }] },
            { code: `for _, name := range []string{"a", "b"} {
    go func() { fmt.Println(name) }()
}`, notes: [] },
            { code: `fns := make([]func(), 0)
for i := range 3 {
    fns = append(fns, func() { fmt.Println(i) })
}`, notes: [{ at: "func() {", text: "each closure captures its own i" }] }
          ]
        },
        {
          id: "runtime-helpers", n: 4, title: "runtime helpers", level: 3,
          gloss: "Reads and tunes how goroutines are scheduled.",
          examples: [
            { code: `fmt.Println(runtime.NumCPU())`, notes: [{ at: "runtime.NumCPU", text: "the number of logical CPUs" }] },
            { code: `runtime.GOMAXPROCS(2)`, notes: [{ at: "GOMAXPROCS", text: "limits threads running Go code" }] },
            { code: `runtime.Gosched()`, notes: [{ at: "Gosched", text: "lets other goroutines run" }] }
          ]
        }
      ]
    },
    {
      id: "channels",
      n: 12,
      title: "channels",
      concepts: [
        {
          id: "send-receive", n: 1, title: "make, send and receive", level: 2,
          gloss: "Passes values between goroutines through a typed pipe.",
          examples: [
            { code: `ch := make(chan int)
go func() { ch <- 42 }()
fmt.Println(<-ch)`, notes: [{ at: "<-ch", text: "blocks until a value arrives" }] },
            { code: `ch := make(chan string, 2)
ch <- "a"
ch <- "b"`, notes: [{ at: "2", text: "buffered: two sends before blocking" }] },
            { code: `ch := make(chan int)
close(ch)
v, ok := <-ch`, notes: [{ at: "ok", text: "false once closed and empty" }] }
          ]
        },
        {
          id: "close-and-range", n: 2, title: "close and range", level: 2,
          gloss: "Signals that no more values will come, ending a range loop.",
          examples: [
            { code: `ch := make(chan int)
go func() {
    defer close(ch)
    for i := range 3 {
        ch <- i
    }
}()
for v := range ch {
    fmt.Println(v)
}`, notes: [{ at: "close(ch)", text: "ends the receiver's range loop" }] },
            { code: `ch := make(chan int, 1)
ch <- 1
close(ch)`, notes: [{ at: "close(ch)", text: "only the sender should close" }] },
            { code: `done := make(chan struct{})
close(done)
<-done`, notes: [{ at: "struct{}", text: "carries no data, just a signal" }] }
          ]
        },
        {
          id: "channel-directions", n: 3, title: "channel directions", level: 3,
          gloss: "Restricts a channel to sending or receiving in a function signature.",
          examples: [
            { code: `func produce(out chan<- int) {
    out <- 1
}`, notes: [{ at: "chan<-", text: "send-only" }] },
            { code: `func consume(in <-chan int) int {
    return <-in
}`, notes: [{ at: "<-chan", text: "receive-only" }] },
            { code: `func gen(n int) <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        for i := range n {
            ch <- i
        }
    }()
    return ch
}`, notes: [{ at: "<-chan int", text: "callers can only receive" }] }
          ]
        },
        {
          id: "worker-pools", n: 4, title: "worker pools", level: 3,
          gloss: "Spreads jobs across goroutines with an input and an output channel.",
          examples: [
            { code: `jobs := make(chan int, 5)
results := make(chan int, 5)
go func() {
    for j := range jobs {
        results <- j * 2
    }
}()`, notes: [{ at: "range jobs", text: "runs until jobs is closed" }] },
            { code: `jobs := make(chan int, 3)
for i := range 3 {
    jobs <- i
}
close(jobs)`, notes: [] },
            { code: `results := make(chan int, 3)
for range 3 {
    fmt.Println(<-results)
}`, notes: [{ at: "for range 3", text: "no loop variable needed, Go 1.22" }] }
          ]
        }
      ]
    },
    {
      id: "select",
      n: 13,
      title: "select",
      concepts: [
        {
          id: "select-basics", n: 1, title: "select basics", level: 2,
          gloss: "Waits on several channel operations and runs the first one that is ready.",
          examples: [
            { code: `results := make(chan string)
errs := make(chan error)

select {
case r := <-results:
    fmt.Println("got", r)
case err := <-errs:
    fmt.Println("failed:", err)
}`, notes: [{ at: "select", text: "ready cases are picked at random" }] },
            { code: `jobs := make(chan int, 1)

select {
case jobs <- 42:
    fmt.Println("queued")
case <-time.After(time.Second):
    fmt.Println("queue full")
}`, notes: [{ at: "jobs <- 42", text: "a send can be a case too" }] },
            { code: `a, b := make(chan int), make(chan int)

for {
    select {
    case v := <-a:
        fmt.Println("a", v)
    case v := <-b:
        fmt.Println("b", v)
    }
}`, notes: [{ at: "for", text: "keeps serving whichever is ready" }] }
          ]
        },
        {
          id: "select-default", n: 2, title: "default case", level: 2,
          gloss: "Adds a default case so a select never blocks.",
          examples: [
            { code: `ready := make(chan int)

select {
case v := <-ready:
    fmt.Println("received", v)
default:
    fmt.Println("nothing ready")
}`, notes: [{ at: "default", text: "runs when no case can proceed" }] },
            { code: `alerts := make(chan string, 1)

select {
case alerts <- "disk full":
default:
    fmt.Println("alert dropped")
}`, notes: [{ at: "default", text: "a non-blocking send" }] },
            { code: `ready := make(chan int)

for i := range 3 {
    select {
    case v := <-ready:
        fmt.Println(v)
    default:
        fmt.Println("tick", i)
    }
}`, notes: [] }
          ]
        },
        {
          id: "select-timeout", n: 3, title: "timeouts", level: 2,
          gloss: "Gives up on a channel receive after a deadline.",
          examples: [
            { code: `results := make(chan string)

select {
case res := <-results:
    fmt.Println(res)
case <-time.After(2 * time.Second):
    fmt.Println("timed out")
}`, notes: [{ at: "time.After", text: "a channel that fires once" }] },
            { code: `lines := make(chan string)
timer := time.NewTimer(500 * time.Millisecond)
defer timer.Stop()

select {
case line := <-lines:
    fmt.Println(line)
case <-timer.C:
    fmt.Println("no input")
}`, notes: [{ at: "timer.Stop()", text: "frees the timer if unused" }] },
            { code: `done := make(chan struct{})
ticker := time.NewTicker(time.Second)
defer ticker.Stop()

for {
    select {
    case t := <-ticker.C:
        fmt.Println("tick", t.Unix())
    case <-done:
        return
    }
}`, notes: [{ at: "ticker.C", text: "fires every second" }] }
          ]
        },
        {
          id: "quit-signal", n: 4, title: "quit signals", level: 3,
          gloss: "Stops goroutines by closing a done channel.",
          examples: [
            { code: `done := make(chan struct{})
go func() {
    <-done
    fmt.Println("stopping")
}()
close(done)`, notes: [{ at: "struct{}", text: "carries no data, only the signal" }, { at: "close(done)", text: "wakes every receiver" }] },
            { code: `func worker(done <-chan struct{}, jobs <-chan int) {
    for {
        select {
        case <-done:
            return
        case j := <-jobs:
            fmt.Println("job", j)
        }
    }
}`, notes: [{ at: "done <-chan", text: "receive-only parameter" }] },
            { code: `func count(done <-chan struct{}, out chan<- int) {
    for i := 0; ; i++ {
        select {
        case out <- i:
        case <-done:
            return
        }
    }
}`, notes: [{ at: "out <- i", text: "send, unless done fires first" }] }
          ]
        }
      ]
    },
    {
      id: "sync",
      n: 14,
      title: "sync",
      concepts: [
        {
          id: "waitgroup", n: 1, title: "WaitGroup", level: 2,
          gloss: "Waits for a group of goroutines to finish.",
          examples: [
            { code: `var wg sync.WaitGroup

for i := range 3 {
    wg.Add(1)
    go func() {
        defer wg.Done()
        fmt.Println("worker", i)
    }()
}
wg.Wait()`, notes: [{ at: "wg.Add(1)", text: "count before starting the goroutine" }, { at: "wg.Wait()", text: "blocks until the count is zero" }] },
            { code: `func fetchAll(urls []string) {
    var wg sync.WaitGroup
    for _, u := range urls {
        wg.Add(1)
        go func() {
            defer wg.Done()
            http.Get(u)
        }()
    }
    wg.Wait()
}`, notes: [{ at: "defer wg.Done()", text: "runs even on early return" }] },
            { code: `inputs := []int{1, 2, 3}
results := make([]int, len(inputs))
var wg sync.WaitGroup

for i, n := range inputs {
    wg.Add(1)
    go func() {
        defer wg.Done()
        results[i] = n * n
    }()
}
wg.Wait()`, notes: [{ at: "results[i]", text: "each goroutine owns one slot" }] }
          ]
        },
        {
          id: "mutex", n: 2, title: "Mutex", level: 2,
          gloss: "Guards shared data so only one goroutine touches it at a time.",
          examples: [
            { code: `type Counter struct {
    mu sync.Mutex
    n  int
}

func (c *Counter) Inc() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.n++
}`, notes: [{ at: "defer c.mu.Unlock()", text: "unlocks on every return path" }] },
            { code: `var (
    mu    sync.Mutex
    cache = map[string]int{}
)

func put(key string, v int) {
    mu.Lock()
    cache[key] = v
    mu.Unlock()
}`, notes: [{ at: "mu.Lock()", text: "others wait here until Unlock" }] },
            { code: `type SafeMap struct {
    sync.Mutex
    items map[string]string
}

func (m *SafeMap) Get(k string) string {
    m.Lock()
    defer m.Unlock()
    return m.items[k]
}`, notes: [{ at: "sync.Mutex", text: "embedded, so Lock is promoted" }] }
          ]
        },
        {
          id: "rwmutex", n: 3, title: "RWMutex", level: 3,
          gloss: "Allows many readers at once but only one writer.",
          examples: [
            { code: `type Store struct {
    mu   sync.RWMutex
    data map[string]int
}

func (s *Store) Get(k string) int {
    s.mu.RLock()
    defer s.mu.RUnlock()
    return s.data[k]
}`, notes: [{ at: "RLock", text: "shared with other readers" }] },
            { code: `type Store struct {
    mu   sync.RWMutex
    data map[string]int
}

func (s *Store) Set(k string, v int) {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.data[k] = v
}`, notes: [{ at: "s.mu.Lock()", text: "exclusive, blocks all readers" }] },
            { code: `var (
    mu    sync.RWMutex
    stats = map[string]int{}
)

func count() int {
    mu.RLock()
    defer mu.RUnlock()
    return len(stats)
}`, notes: [] }
          ]
        },
        {
          id: "sync-once", n: 4, title: "Once", level: 2,
          gloss: "Runs an initialization exactly once, however many goroutines call it.",
          examples: [
            { code: `var once sync.Once

func setup() {
    once.Do(func() {
        fmt.Println("initialized")
    })
}`, notes: [{ at: "once.Do", text: "later calls return immediately" }] },
            { code: `var (
    settings map[string]string
    once     sync.Once
)

func Settings() map[string]string {
    once.Do(func() {
        settings = map[string]string{"mode": "prod"}
    })
    return settings
}`, notes: [] },
            { code: `var loadHome = sync.OnceValue(func() string {
    home, _ := os.UserHomeDir()
    return home
})`, notes: [{ at: "sync.OnceValue", text: "caches the first result" }] }
          ]
        },
        {
          id: "atomic-counters", n: 5, title: "atomic counters", level: 3,
          gloss: "Updates a shared value without a lock using sync/atomic types.",
          examples: [
            { code: `var hits atomic.Int64

hits.Add(1)
fmt.Println(hits.Load())`, notes: [{ at: "atomic.Int64", text: "safe from many goroutines" }] },
            { code: `var ready atomic.Bool

ready.Store(true)
if ready.Load() {
    fmt.Println("ready")
}`, notes: [] },
            { code: `var state atomic.Int32

if state.CompareAndSwap(0, 1) {
    fmt.Println("won the race")
}`, notes: [{ at: "CompareAndSwap(0, 1)", text: "sets 1 only if still 0" }] }
          ]
        }
      ]
    },
    {
      id: "generics",
      n: 15,
      title: "generics",
      concepts: [
        {
          id: "generic-functions", n: 1, title: "generic functions", level: 2,
          gloss: "Writes one function that works for many types.",
          examples: [
            { code: `func Map[T, U any](items []T, f func(T) U) []U {
    out := make([]U, 0, len(items))
    for _, it := range items {
        out = append(out, f(it))
    }
    return out
}`, notes: [{ at: "[T, U any]", text: "type parameters" }] },
            { code: `func Keys[K comparable, V any](m map[K]V) []K {
    keys := make([]K, 0, len(m))
    for k := range m {
        keys = append(keys, k)
    }
    return keys
}`, notes: [{ at: "comparable", text: "usable as a map key" }] },
            { code: `func First[T any](items []T) (T, bool) {
    var zero T
    if len(items) == 0 {
        return zero, false
    }
    return items[0], true
}`, notes: [{ at: "var zero T", text: "the zero value of any type" }] }
          ]
        },
        {
          id: "constraints", n: 2, title: "constraints", level: 2,
          gloss: "Limits a type parameter to the types that support an operation.",
          examples: [
            { code: `func Max[T cmp.Ordered](a, b T) T {
    if a > b {
        return a
    }
    return b
}`, notes: [{ at: "cmp.Ordered", text: "types that support < and >" }] },
            { code: `type Number interface {
    ~int | ~int64 | ~float64
}

func Sum[T Number](xs []T) T {
    var total T
    for _, x := range xs {
        total += x
    }
    return total
}`, notes: [{ at: "~int", text: "also types built on int" }] },
            { code: `func Contains[T comparable](items []T, want T) bool {
    for _, it := range items {
        if it == want {
            return true
        }
    }
    return false
}`, notes: [{ at: "it == want", text: "needs comparable" }] }
          ]
        },
        {
          id: "generic-types", n: 3, title: "generic types", level: 2,
          gloss: "Declares a type that holds values of a type the caller chooses.",
          examples: [
            { code: `type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(v T) {
    s.items = append(s.items, v)
}`, notes: [{ at: "Stack[T]", text: "methods repeat the parameter" }] },
            { code: `type Pair[K comparable, V any] struct {
    Key   K
    Value V
}

var age = Pair[string, int]{"age", 36}`, notes: [{ at: "Pair[string, int]", text: "instantiated with real types" }] },
            { code: `type List[T any] struct {
    head *node[T]
}

type node[T any] struct {
    val  T
    next *node[T]
}`, notes: [] }
          ]
        },
        {
          id: "type-inference", n: 4, title: "type inference", level: 2,
          gloss: "Lets the compiler infer type arguments from the call.",
          examples: [
            { code: `nums := []int{3, 1, 2}

fmt.Println(slices.Max(nums))
fmt.Println(slices.Contains(nums, 2))`, notes: [{ at: "slices.Max(nums)", text: "the type argument is inferred" }] },
            { code: `names := []string{"bo", "al", "cy"}

slices.Sort(names)
idx, found := slices.BinarySearch(names, "bo")
fmt.Println(idx, found)`, notes: [] },
            { code: `func Zero[T any]() T {
    var z T
    return z
}

var n = Zero[int]()`, notes: [{ at: "Zero[int]()", text: "nothing to infer from, so name it" }] }
          ]
        }
      ]
    },
    {
      id: "context",
      n: 16,
      title: "context",
      concepts: [
        {
          id: "with-cancel", n: 1, title: "cancellation", level: 2,
          gloss: "Creates a context you can cancel to stop related work.",
          examples: [
            { code: `ctx, cancel := context.WithCancel(context.Background())
defer cancel()

go func() {
    <-ctx.Done()
    fmt.Println("stopped:", ctx.Err())
}()`, notes: [{ at: "defer cancel()", text: "always release the context" }, { at: "ctx.Done()", text: "closed when canceled" }] },
            { code: `parent, cancel := context.WithCancel(context.Background())
child, stop := context.WithCancel(parent)
defer stop()

cancel()
fmt.Println(child.Err())`, notes: [{ at: "cancel()", text: "also cancels every child" }] },
            { code: `ctx, cancel := context.WithCancelCause(context.Background())

cancel(errors.New("shutting down"))
fmt.Println(context.Cause(ctx))`, notes: [{ at: "context.Cause", text: "why it was canceled" }] }
          ]
        },
        {
          id: "with-timeout", n: 2, title: "timeouts and deadlines", level: 2,
          gloss: "Cancels a context automatically after a duration.",
          examples: [
            { code: `ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
defer cancel()

fmt.Println(ctx.Err())`, notes: [{ at: "WithTimeout", text: "relative duration" }] },
            { code: `deadline := time.Now().Add(30 * time.Second)
ctx, cancel := context.WithDeadline(context.Background(), deadline)
defer cancel()

fmt.Println(ctx.Deadline())`, notes: [{ at: "WithDeadline", text: "an absolute time" }] },
            { code: `url := "https://example.com"
ctx, cancel := context.WithTimeout(context.Background(), time.Second)
defer cancel()

req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)`, notes: [{ at: "NewRequestWithContext", text: "the request obeys the context" }] }
          ]
        },
        {
          id: "ctx-done", n: 3, title: "watching for cancellation", level: 3,
          gloss: "Checks a context inside long work so it can stop early.",
          examples: [
            { code: `func poll(ctx context.Context) error {
    for {
        select {
        case <-ctx.Done():
            return ctx.Err()
        case <-time.After(time.Second):
            fmt.Println("polling")
        }
    }
}`, notes: [{ at: "ctx.Err()", text: "canceled or deadline exceeded" }] },
            { code: `func process(ctx context.Context, items []string) error {
    for _, item := range items {
        if err := ctx.Err(); err != nil {
            return err
        }
        fmt.Println("handling", item)
    }
    return nil
}`, notes: [] },
            { code: `func cancelled(ctx context.Context) bool {
    select {
    case <-ctx.Done():
        return true
    default:
        return false
    }
}`, notes: [{ at: "default", text: "checks without blocking" }] }
          ]
        },
        {
          id: "ctx-parameter", n: 4, title: "context parameters", level: 2,
          gloss: "Passes the context as the first parameter of any call that may block.",
          examples: [
            { code: `func fetchUser(ctx context.Context, id int) (string, error) {
    if err := ctx.Err(); err != nil {
        return "", err
    }
    return fmt.Sprintf("user-%d", id), nil
}`, notes: [{ at: "ctx context.Context", text: "first, named ctx" }] },
            { code: `func handler(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), time.Second)
    defer cancel()
    fmt.Fprintln(w, ctx.Err())
}`, notes: [{ at: "r.Context()", text: "ends when the client leaves" }] },
            { code: `func step(ctx context.Context, name string) error {
    select {
    case <-ctx.Done():
        return fmt.Errorf("%s: %w", name, ctx.Err())
    default:
        return nil
    }
}`, notes: [{ at: "%w", text: "keeps the cause for errors.Is" }] }
          ]
        },
        {
          id: "context-values", n: 5, title: "context values", level: 3,
          gloss: "Attaches request-scoped values to a context under a typed key.",
          examples: [
            { code: `type ctxKey string

ctx := context.WithValue(context.Background(), ctxKey("user"), "ada")
fmt.Println(ctx.Value(ctxKey("user")))`, notes: [{ at: "ctxKey", text: "a private type avoids collisions" }] },
            { code: `type ctxKey string

func userFrom(ctx context.Context) (string, bool) {
    u, ok := ctx.Value(ctxKey("user")).(string)
    return u, ok
}`, notes: [{ at: ".(string)", text: "value returns any" }] },
            { code: `type requestID struct{}

ctx := context.WithValue(context.Background(), requestID{}, "abc123")
fmt.Println(ctx.Value(requestID{}))`, notes: [{ at: "requestID{}", text: "an empty struct works as a key" }] }
          ]
        }
      ]
    },
    {
      id: "encoding-json",
      n: 17,
      title: "encoding/json",
      concepts: [
        {
          id: "json-marshal", n: 1, title: "marshal", level: 1,
          gloss: "Encodes a Go value as JSON bytes.",
          examples: [
            { code: `user := map[string]any{"name": "ada", "age": 36}

data, err := json.Marshal(user)
fmt.Println(string(data), err)`, notes: [{ at: "json.Marshal", text: "returns []byte and an error" }] },
            { code: `type Point struct {
    X, Y int
}

data, _ := json.Marshal(Point{X: 1, Y: 2})
fmt.Println(string(data))`, notes: [{ at: "X, Y", text: "only exported fields are encoded" }] },
            { code: `tags := []string{"go", "json"}

data, err := json.Marshal(tags)
if err != nil {
    log.Fatal(err)
}
fmt.Println(string(data))`, notes: [] }
          ]
        },
        {
          id: "json-indent", n: 2, title: "indented output", level: 2,
          gloss: "Formats JSON output with indentation for people to read.",
          examples: [
            { code: `cfg := map[string]int{"port": 8080, "workers": 4}

out, err := json.MarshalIndent(cfg, "", "    ")
fmt.Println(string(out), err)`, notes: [{ at: "\"\", \"    \"", text: "line prefix, then indent unit" }] },
            { code: `enc := json.NewEncoder(os.Stdout)
enc.SetIndent("", "  ")
enc.Encode(map[string]int{"port": 8080})`, notes: [] },
            { code: `cfg := struct {
    Host string
    Port int
}{"localhost", 8080}

out, _ := json.MarshalIndent(cfg, "", "  ")
fmt.Println(string(out))`, notes: [] }
          ]
        },
        {
          id: "struct-tags", n: 3, title: "struct tags", level: 1,
          gloss: "Controls how each field appears in JSON with struct tags.",
          examples: [
            { code: `type User struct {
    ID    int    \`json:"id"\`
    Name  string \`json:"name"\`
    Email string \`json:"email,omitempty"\`
}`, notes: [{ at: "omitempty", text: "left out when empty" }, { at: "`json:\"id\"`", text: "the key name in the JSON" }] },
            { code: `type Account struct {
    Owner    string \`json:"owner"\`
    Password string \`json:"-"\`
}`, notes: [{ at: "\"-\"", text: "never encoded or decoded" }] },
            { code: `type Event struct {
    Name string    \`json:"name"\`
    At   time.Time \`json:"at"\`
    Seq  int64     \`json:"seq,string"\`
}`, notes: [{ at: ",string", text: "number written as a string" }] }
          ]
        },
        {
          id: "json-unmarshal", n: 4, title: "unmarshal", level: 1,
          gloss: "Decodes JSON bytes into a Go value.",
          examples: [
            { code: `data := []byte(\`{"id": 7, "name": "ada"}\`)
var user struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
}

err := json.Unmarshal(data, &user)`, notes: [{ at: "&user", text: "pass a pointer so it can be filled" }] },
            { code: `var ids []int

err := json.Unmarshal([]byte("[1, 2, 3]"), &ids)
fmt.Println(ids, err)`, notes: [] },
            { code: `var cfg map[string]any
err := json.Unmarshal([]byte("{oops"), &cfg)

var syn *json.SyntaxError
if errors.As(err, &syn) {
    fmt.Println("bad byte at", syn.Offset)
}`, notes: [{ at: "errors.As", text: "pulls out the typed error" }] }
          ]
        },
        {
          id: "json-any", n: 5, title: "unknown shapes", level: 2,
          gloss: "Decodes JSON of unknown shape into maps and slices.",
          examples: [
            { code: `var doc map[string]any

json.Unmarshal([]byte(\`{"n": 1, "ok": true}\`), &doc)
fmt.Println(doc["n"])`, notes: [{ at: "doc[\"n\"]", text: "numbers arrive as float64" }] },
            { code: `var v any
json.Unmarshal([]byte(\`[1, "two", null]\`), &v)

for _, item := range v.([]any) {
    fmt.Println(item)
}`, notes: [{ at: "v.([]any)", text: "arrays become []any" }] },
            { code: `var doc map[string]any
json.Unmarshal([]byte(\`{"name": "ada"}\`), &doc)

if name, ok := doc["name"].(string); ok {
    fmt.Println(name)
}`, notes: [{ at: ".(string)", text: "check the type before use" }] }
          ]
        },
        {
          id: "json-streams", n: 6, title: "streaming", level: 3,
          gloss: "Reads and writes JSON values on a stream instead of in memory.",
          examples: [
            { code: `enc := json.NewEncoder(os.Stdout)

enc.Encode(map[string]int{"a": 1})
enc.Encode(map[string]int{"a": 2})`, notes: [{ at: "Encode", text: "one value per line" }] },
            { code: `dec := json.NewDecoder(os.Stdin)

for {
    var event map[string]any
    if err := dec.Decode(&event); err == io.EOF {
        break
    }
    fmt.Println(event)
}`, notes: [{ at: "io.EOF", text: "the stream has ended" }] },
            { code: `func readUser(r *http.Request) (map[string]any, error) {
    var u map[string]any
    err := json.NewDecoder(r.Body).Decode(&u)
    return u, err
}`, notes: [{ at: "r.Body", text: "decode straight from the request" }] }
          ]
        }
      ]
    },
    {
      id: "testing",
      n: 18,
      title: "testing",
      concepts: [
        {
          id: "test-functions", n: 1, title: "test functions", level: 1,
          gloss: "Checks behavior in a TestXxx function that receives a *testing.T.",
          examples: [
            { code: `func TestUpper(t *testing.T) {
    got := strings.ToUpper("go")
    if got != "GO" {
        t.Errorf("got %q, want %q", got, "GO")
    }
}`, notes: [{ at: "t.Errorf", text: "fails the test and keeps going" }] },
            { code: `func TestParse(t *testing.T) {
    n, err := strconv.Atoi("42")
    if err != nil {
        t.Fatal(err)
    }
    if n != 42 {
        t.Errorf("n = %d, want 42", n)
    }
}`, notes: [{ at: "t.Fatal", text: "fails and stops this test" }] },
            { code: `func TestAtoiRejectsText(t *testing.T) {
    _, err := strconv.Atoi("abc")
    if err == nil {
        t.Fatal("expected an error")
    }
}`, notes: [] }
          ]
        },
        {
          id: "table-driven-tests", n: 2, title: "table-driven tests", level: 2,
          gloss: "Runs one check over a slice of inputs and expected outputs.",
          examples: [
            { code: `func TestAbs(t *testing.T) {
    cases := []struct{ in, want float64 }{
        {-3, 3},
        {0, 0},
        {2.5, 2.5},
    }
    for _, c := range cases {
        if got := math.Abs(c.in); got != c.want {
            t.Errorf("Abs(%v) = %v, want %v", c.in, got, c.want)
        }
    }
}`, notes: [{ at: "cases", text: "each row is one scenario" }] },
            { code: `func TestTrim(t *testing.T) {
    tests := []struct{ in, want string }{
        {" go ", "go"},
        {"", ""},
    }
    for _, tc := range tests {
        if got := strings.TrimSpace(tc.in); got != tc.want {
            t.Errorf("TrimSpace(%q) = %q", tc.in, got)
        }
    }
}`, notes: [] },
            { code: `func TestMax(t *testing.T) {
    tests := map[string]struct{ a, b, want int }{
        "first":  {3, 1, 3},
        "second": {1, 4, 4},
    }
    for name, tc := range tests {
        if got := max(tc.a, tc.b); got != tc.want {
            t.Errorf("%s: got %d", name, got)
        }
    }
}`, notes: [{ at: "\"first\"", text: "the key doubles as the case name" }] }
          ]
        },
        {
          id: "subtests", n: 3, title: "subtests", level: 2,
          gloss: "Groups related checks as named subtests with t.Run.",
          examples: [
            { code: `func TestStrings(t *testing.T) {
    t.Run("upper", func(t *testing.T) {
        if strings.ToUpper("go") != "GO" {
            t.Fail()
        }
    })
    t.Run("lower", func(t *testing.T) {
        if strings.ToLower("GO") != "go" {
            t.Fail()
        }
    })
}`, notes: [{ at: "t.Run", text: "each name can be run alone" }] },
            { code: `func TestHasPrefix(t *testing.T) {
    for _, s := range []string{"gopher", "golang"} {
        t.Run(s, func(t *testing.T) {
            if !strings.HasPrefix(s, "go") {
                t.Errorf("%s lacks the prefix", s)
            }
        })
    }
}`, notes: [] },
            { code: `func TestCases(t *testing.T) {
    for _, n := range []int{1, 2, 3} {
        t.Run(strconv.Itoa(n), func(t *testing.T) {
            t.Parallel()
            time.Sleep(time.Duration(n) * time.Millisecond)
        })
    }
}`, notes: [{ at: "t.Parallel()", text: "runs beside sibling subtests" }] }
          ]
        },
        {
          id: "test-helpers", n: 4, title: "test helpers", level: 2,
          gloss: "Marks a function as a helper so failures point at the caller.",
          examples: [
            { code: `func mustAtoi(t *testing.T, s string) int {
    t.Helper()
    n, err := strconv.Atoi(s)
    if err != nil {
        t.Fatal(err)
    }
    return n
}`, notes: [{ at: "t.Helper()", text: "reports the caller's line" }] },
            { code: `func assertEqual(t *testing.T, got, want string) {
    t.Helper()
    if got != want {
        t.Errorf("got %q, want %q", got, want)
    }
}`, notes: [] },
            { code: `func requireNoError(t *testing.T, err error) {
    t.Helper()
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }
}`, notes: [] }
          ]
        },
        {
          id: "test-cleanup", n: 5, title: "temp files and cleanup", level: 2,
          gloss: "Creates scratch files and environment that the test cleans up itself.",
          examples: [
            { code: `func TestFiles(t *testing.T) {
    dir := t.TempDir()
    path := dir + "/note.txt"
    os.WriteFile(path, []byte("hi"), 0o644)
}`, notes: [{ at: "t.TempDir()", text: "removed when the test ends" }] },
            { code: `func TestWithResource(t *testing.T) {
    f, err := os.CreateTemp("", "scratch")
    if err != nil {
        t.Fatal(err)
    }
    t.Cleanup(func() { os.Remove(f.Name()) })
}`, notes: [{ at: "t.Cleanup", text: "runs after the test, last in first out" }] },
            { code: `func TestEnv(t *testing.T) {
    t.Setenv("APP_MODE", "test")
    if os.Getenv("APP_MODE") != "test" {
        t.Fatal("env not set")
    }
}`, notes: [{ at: "t.Setenv", text: "restored after the test" }] }
          ]
        },
        {
          id: "benchmarks", n: 6, title: "benchmarks", level: 3,
          gloss: "Measures speed in a BenchmarkXxx function that loops b.N times.",
          examples: [
            { code: `func BenchmarkUpper(b *testing.B) {
    for i := 0; i < b.N; i++ {
        strings.ToUpper("gopher")
    }
}`, notes: [{ at: "b.N", text: "the framework picks the count" }] },
            { code: `func BenchmarkSort(b *testing.B) {
    data := make([]int, 1000)
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        sort.Ints(data)
    }
}`, notes: [{ at: "b.ResetTimer()", text: "excludes the setup above" }] },
            { code: `func BenchmarkJoin(b *testing.B) {
    b.ReportAllocs()
    words := []string{"a", "b", "c"}
    for i := 0; i < b.N; i++ {
        strings.Join(words, ",")
    }
}`, notes: [{ at: "ReportAllocs", text: "adds allocation counts" }] }
          ]
        }
      ]
    }
  ]
};
