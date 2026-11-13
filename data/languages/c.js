export default {
  id: "c",
  name: "C",
  short: "C",
  pigment: "c",
  family: null,
  version: "23",
  lexer: "c",
  indent: 4,
  topics: [
    {
      id: "types-printf",
      n: 1,
      title: "types & printf",
      concepts: [
        {
          id: "integer-types", n: 1, title: "integer types", level: 1,
          gloss: "Declares whole numbers with int, long and fixed-width types.",
          examples: [
            { code: `int count = 42;
long big = 1234567890L;`, notes: [{ at: "1234567890L", text: "the L suffix makes it a long" }] },
            { code: `uint8_t flags = 0xFF;
int32_t id = -7;`, notes: [{ at: "uint8_t", text: "exactly 8 bits, from stdint.h" }] },
            { code: `size_t length = sizeof(int);`, notes: [{ at: "sizeof(int)", text: "size in bytes" }] }
          ]
        },
        {
          id: "floating-point", n: 2, title: "floating point", level: 1,
          gloss: "Stores fractional values with float and double.",
          examples: [
            { code: `double price = 19.99;`, notes: [{ at: "double", text: "the default floating type" }] },
            { code: `float ratio = 0.5f;`, notes: [{ at: "0.5f", text: "f makes a float literal" }] },
            { code: `int total = 17, count = 4;
double average = (double)total / count;`, notes: [{ at: "(double)total", text: "cast before dividing" }] }
          ]
        },
        {
          id: "printf-formats", n: 3, title: "printf formats", level: 1,
          gloss: "Prints formatted values with printf conversion specifiers.",
          examples: [
            { code: `int count = 3;
printf("count = %d\\n", count);`, notes: [{ at: "%d", text: "int placeholder" }] },
            { code: `double price = 4.5;
printf("%.2f\\n", price);`, notes: [{ at: "%.2f", text: "two decimal places" }] },
            { code: `size_t n = 8;
printf("%zu items\\n", n);`, notes: [{ at: "%zu", text: "size_t placeholder" }] }
          ]
        },
        {
          id: "char-bool", n: 4, title: "char and bool", level: 1,
          gloss: "Holds single characters and truth values.",
          examples: [
            { code: `char grade = 'A';`, notes: [] },
            { code: `bool done = false;`, notes: [{ at: "bool", text: "from stdbool.h" }] },
            { code: `char grade = 'A';
char next = grade + 1;`, notes: [{ at: "grade + 1", text: "chars are small integers" }] }
          ]
        }
      ]
    },
    {
      id: "control-flow",
      n: 2,
      title: "control flow",
      concepts: [
        {
          id: "if-else", n: 1, title: "if and else", level: 1,
          gloss: "Runs a block only when a condition holds.",
          examples: [
            { code: `int age = 20;
if (age >= 18) {
    puts("adult");
} else {
    puts("minor");
}`, notes: [] },
            { code: `int *ptr = NULL;
if (ptr == NULL) {
    return 1;
}`, notes: [{ at: "ptr == NULL", text: "compare, do not assign" }] },
            { code: `int n = 7;
if (n % 2 == 0)
    puts("even");
else
    puts("odd");`, notes: [] }
          ]
        },
        {
          id: "for-loop", n: 2, title: "for loop", level: 1,
          gloss: "Repeats a block with a counter that is set up, tested and stepped in one line.",
          examples: [
            { code: `for (int i = 0; i < 5; i++) {
    printf("%d\\n", i);
}`, notes: [{ at: "i < 5", text: "tested before every pass" }] },
            { code: `int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}`, notes: [] },
            { code: `int values[] = {3, 1, 4};
size_t len = 3;
int total = 0;
for (size_t i = 0; i < len; i++) {
    total += values[i];
}`, notes: [] }
          ]
        },
        {
          id: "while-loops", n: 3, title: "while and do while", level: 1,
          gloss: "Loops while a condition holds, testing before or after each pass.",
          examples: [
            { code: `int n = 10;
while (n > 0) {
    n /= 2;
}`, notes: [] },
            { code: `int tries = 0;
do {
    tries++;
} while (tries < 3);`, notes: [{ at: "do {", text: "the body runs at least once" }] },
            { code: `char *p = "abc";
while (*p) {
    putchar(*p++);
}`, notes: [{ at: "*p++", text: "read, then advance the pointer" }] }
          ]
        },
        {
          id: "switch", n: 4, title: "switch", level: 2,
          gloss: "Selects a branch by comparing one value against constant cases.",
          examples: [
            { code: `char key = 'q';
switch (key) {
case 'q':
    puts("quit");
    break;
default:
    puts("other");
}`, notes: [{ at: "break", text: "without it, execution falls through" }] },
            { code: `int day = 6, weekend;
switch (day) {
case 6:
case 7:
    weekend = 1;
    break;
default:
    weekend = 0;
}`, notes: [{ at: "case 6:", text: "falls into the next case" }] },
            { code: `int level = 2;
switch (level) {
case 1: puts("low"); break;
case 2: puts("mid"); break;
default: puts("high");
}`, notes: [] }
          ]
        },
        {
          id: "break-continue", n: 5, title: "break and continue", level: 1,
          gloss: "Leaves a loop early or skips to its next pass.",
          examples: [
            { code: `for (int i = 0; i < 10; i++) {
    if (i == 5)
        break;
}`, notes: [{ at: "break", text: "leaves the loop" }] },
            { code: `for (int i = 0; i < 10; i++) {
    if (i % 2)
        continue;
    printf("%d\\n", i);
}`, notes: [{ at: "continue", text: "jumps to i++" }] },
            { code: `int ready = 0;
while (1) {
    if (ready)
        break;
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "functions",
      n: 3,
      title: "functions & prototypes",
      concepts: [
        {
          id: "function-definition", n: 1, title: "function definition", level: 1,
          gloss: "Defines a function with a return type, parameters and a body.",
          examples: [
            { code: `int add(int a, int b) {
    return a + b;
}`, notes: [{ at: "int add", text: "the return type comes first" }] },
            { code: `double average(const int *values, size_t n) {
    double sum = 0;
    for (size_t i = 0; i < n; i++)
        sum += values[i];
    return sum / n;
}`, notes: [] },
            { code: `int is_even(int n) {
    return n % 2 == 0;
}`, notes: [] }
          ]
        },
        {
          id: "prototypes", n: 2, title: "prototypes", level: 1,
          gloss: "Declares a function before use so the compiler knows its signature.",
          examples: [
            { code: `int add(int a, int b);`, notes: [{ at: ";", text: "a declaration with no body" }] },
            { code: `void log_message(const char *text);`, notes: [] },
            { code: `size_t count_words(const char *text);`, notes: [] }
          ]
        },
        {
          id: "void-parameters", n: 3, title: "void parameters", level: 1,
          gloss: "Marks a function that takes no arguments with void.",
          examples: [
            { code: `int read_value(void) {
    return 42;
}`, notes: [{ at: "(void)", text: "empty () leaves arguments unspecified" }] },
            { code: `void reset(void);`, notes: [] },
            { code: `int main(void) {
    return 0;
}`, notes: [] }
          ]
        },
        {
          id: "output-parameters", n: 4, title: "output parameters", level: 2,
          gloss: "Returns extra results by writing through pointer arguments.",
          examples: [
            { code: `void min_max(const int *v, int n, int *lo, int *hi) {
    *lo = *hi = v[0];
    for (int i = 1; i < n; i++) {
        if (v[i] < *lo) *lo = v[i];
        if (v[i] > *hi) *hi = v[i];
    }
}`, notes: [] },
            { code: `void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}`, notes: [{ at: "int *a", text: "points at the caller's variable" }] },
            { code: `int parse_int(const char *s, int *out) {
    char *end;
    *out = (int)strtol(s, &end, 10);
    return *end == '\\0';
}`, notes: [{ at: "&end", text: "strtol reports where it stopped" }] }
          ]
        },
        {
          id: "static-functions", n: 5, title: "static functions", level: 2,
          gloss: "Limits a function to its own file with static.",
          examples: [
            { code: `static int clamp(int v, int lo, int hi) {
    return v < lo ? lo : v > hi ? hi : v;
}`, notes: [{ at: "static", text: "invisible to other files" }] },
            { code: `static void log_line(const char *s) {
    fprintf(stderr, "%s\\n", s);
}`, notes: [] },
            { code: `static inline int square(int n) {
    return n * n;
}`, notes: [{ at: "inline", text: "a hint to expand at the call" }] }
          ]
        }
      ]
    },
    {
      id: "pointers",
      n: 4,
      title: "pointers",
      concepts: [
        {
          id: "address-dereference", n: 1, title: "address and dereference", level: 1,
          gloss: "Takes a variable's address with & and reads it back with *.",
          examples: [
            { code: `int x = 7;
int *p = &x;`, notes: [{ at: "&x", text: "the address of x" }] },
            { code: `int x = 7;
int *p = &x;
*p = 9;`, notes: [{ at: "*p = 9", text: "writes through the pointer" }] },
            { code: `int n = 5;
int *p = &n;
int value = *p + 1;`, notes: [{ at: "*p", text: "the int that p points to" }] }
          ]
        },
        {
          id: "null-pointers", n: 2, title: "null pointers", level: 1,
          gloss: "Marks a pointer that points to nothing with NULL and checks it before use.",
          examples: [
            { code: `int *p = NULL;
if (p != NULL)
    *p = 1;`, notes: [] },
            { code: `char *name = NULL;
if (!name)
    name = "anonymous";`, notes: [{ at: "!name", text: "true when the pointer is NULL" }] },
            { code: `FILE *f = fopen("data.txt", "r");
if (f == NULL) {
    perror("fopen");
    return 1;
}`, notes: [{ at: "perror", text: "prints the reason for the failure" }] }
          ]
        },
        {
          id: "const-pointers", n: 3, title: "const pointers", level: 2,
          gloss: "Prevents writes through a pointer or prevents the pointer from moving.",
          examples: [
            { code: `const char *msg = "hello";`, notes: [{ at: "const char", text: "the characters are read-only" }] },
            { code: `char buffer[16];
char *const buf = buffer;`, notes: [{ at: "*const", text: "the pointer cannot be reassigned" }] },
            { code: `void print_all(const int *v, int n);`, notes: [{ at: "const int", text: "the function will not modify v" }] }
          ]
        },
        {
          id: "pointer-to-pointer", n: 4, title: "pointers to pointers", level: 3,
          gloss: "Stores the address of a pointer so another function can change it.",
          examples: [
            { code: `int n = 1;
int *p = &n;
int **pp = &p;
**pp = 2;`, notes: [{ at: "**pp = 2", text: "follows two pointers to n" }] },
            { code: `void set_name(char **out) {
    *out = "ada";
}`, notes: [] },
            { code: `char *words[] = {"app", "run"};
char **cursor = words;`, notes: [{ at: "char **", text: "points to a char pointer" }] }
          ]
        }
      ]
    },
    {
      id: "arrays",
      n: 5,
      title: "arrays",
      concepts: [
        {
          id: "declaring-arrays", n: 1, title: "declaring arrays", level: 1,
          gloss: "Declares a fixed-size block of items and fills it with an initializer.",
          examples: [
            { code: `int scores[5] = {90, 85, 77, 62, 100};`, notes: [] },
            { code: `double weights[3] = {0.2, 0.3, 0.5};`, notes: [] },
            { code: `int zeros[8] = {0};`, notes: [{ at: "{0}", text: "zero-fills the whole array" }] }
          ]
        },
        {
          id: "array-length", n: 2, title: "array length", level: 1,
          gloss: "Computes the number of elements with sizeof on the array itself.",
          examples: [
            { code: `int values[] = {4, 8, 15, 16, 23, 42};
size_t n = sizeof values / sizeof values[0];`, notes: [{ at: "sizeof values / sizeof values[0]", text: "bytes divided by element size" }] },
            { code: `char name[] = "ada";
size_t bytes = sizeof name;`, notes: [{ at: "sizeof name", text: "4: three letters and the nul" }] },
            { code: `double samples[100];
size_t count = sizeof(samples) / sizeof(*samples);`, notes: [] }
          ]
        },
        {
          id: "indexing-loops", n: 3, title: "indexing and loops", level: 1,
          gloss: "Reads and writes elements by zero-based index inside a loop.",
          examples: [
            { code: `int squares[10];
for (int i = 0; i < 10; i++)
    squares[i] = i * i;`, notes: [] },
            { code: `int data[] = {3, 1, 4, 1, 5};
int max = data[0];
for (int i = 1; i < 5; i++)
    if (data[i] > max)
        max = data[i];`, notes: [] },
            { code: `int prices[] = {5, 10, 15};
int n = 3, total = 0;
for (int i = 0; i < n; i++)
    total += prices[i];`, notes: [] }
          ]
        },
        {
          id: "two-dimensional", n: 4, title: "two-dimensional arrays", level: 2,
          gloss: "Stores rows and columns in an array of arrays.",
          examples: [
            { code: `int grid[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};`, notes: [] },
            { code: `int board[8][8] = {0};
board[3][4] = 1;`, notes: [{ at: "[3][4]", text: "row first, then column" }] },
            { code: `int grid[3][3];
for (int r = 0; r < 3; r++)
    for (int c = 0; c < 3; c++)
        grid[r][c] = r * c;`, notes: [] }
          ]
        },
        {
          id: "arrays-as-arguments", n: 5, title: "arrays as arguments", level: 2,
          gloss: "Passes an array to a function as a pointer plus a length.",
          examples: [
            { code: `int sum(const int *v, size_t n) {
    int total = 0;
    for (size_t i = 0; i < n; i++)
        total += v[i];
    return total;
}`, notes: [{ at: "size_t n", text: "the length must travel separately" }] },
            { code: `void fill(int v[], size_t n, int value) {
    for (size_t i = 0; i < n; i++)
        v[i] = value;
}`, notes: [{ at: "int v[]", text: "decays to a pointer" }] },
            { code: `void zero(int *v, size_t n) {
    memset(v, 0, n * sizeof *v);
}`, notes: [{ at: "n * sizeof *v", text: "count times element size" }] }
          ]
        }
      ]
    },
    {
      id: "strings",
      n: 6,
      title: "strings",
      concepts: [
        {
          id: "char-arrays", n: 1, title: "strings as char arrays", level: 1,
          gloss: "Stores text as a char array ending in a nul byte.",
          examples: [
            { code: `char name[] = "ada";`, notes: [{ at: "name[]", text: "size is 4 with the nul" }] },
            { code: `char greeting[16] = "hello";`, notes: [] },
            { code: `const char *label = "ready";`, notes: [{ at: "const char *", text: "a read-only literal" }] }
          ]
        },
        {
          id: "length-compare", n: 2, title: "length and comparison", level: 1,
          gloss: "Measures a string with strlen and compares with strcmp.",
          examples: [
            { code: `const char *word = "keyboard";
size_t n = strlen(word);`, notes: [{ at: "strlen", text: "counts up to the nul" }] },
            { code: `const char *cmd = "quit";
int running = 1;
if (strcmp(cmd, "quit") == 0)
    running = 0;`, notes: [{ at: "== 0", text: "strcmp returns 0 when equal" }] },
            { code: `int order = strcmp("apple", "banana");`, notes: [{ at: "strcmp", text: "negative when the first is smaller" }] }
          ]
        },
        {
          id: "copy-join", n: 3, title: "copying and joining", level: 2,
          gloss: "Copies or appends text into a fixed buffer.",
          examples: [
            { code: `const char *src = "ada lovelace";
char dest[8];
strncpy(dest, src, sizeof dest - 1);
dest[sizeof dest - 1] = '\\0';`, notes: [{ at: "'\\0'", text: "strncpy may not add the nul" }] },
            { code: `char buf[32];
strcpy(buf, "fixed text");`, notes: [{ at: "strcpy", text: "safe only if the source fits" }] },
            { code: `char path[64] = "/tmp/";
strcat(path, "run.log");`, notes: [{ at: "strcat", text: "appends after the existing text" }] }
          ]
        },
        {
          id: "snprintf", n: 4, title: "snprintf", level: 2,
          gloss: "Formats text into a buffer without overflowing it.",
          examples: [
            { code: `const char *name = "ada";
int score = 98;
char line[64];
snprintf(line, sizeof line, "%s: %d", name, score);`, notes: [{ at: "sizeof line", text: "the most it may write" }] },
            { code: `char tag[16];
int n = snprintf(tag, sizeof tag, "id-%04d", 42);`, notes: [{ at: "%04d", text: "zero-padded to four digits" }] },
            { code: `char msg[32];
snprintf(msg, sizeof msg, "%.1f%%", 99.5);`, notes: [{ at: "%%", text: "prints a literal percent sign" }] }
          ]
        },
        {
          id: "character-tests", n: 5, title: "character tests", level: 1,
          gloss: "Classifies and converts characters with ctype functions.",
          examples: [
            { code: `char ch = '7';
int digits = 0;
if (isdigit((unsigned char)ch))
    digits++;`, notes: [] },
            { code: `char ch = 'q';
char up = toupper((unsigned char)ch);`, notes: [{ at: "(unsigned char)", text: "avoids undefined behavior for negatives" }] },
            { code: `char text[] = "Hello World";
for (char *p = text; *p; p++)
    *p = tolower((unsigned char)*p);`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "structs",
      n: 7,
      title: "structs & typedef",
      concepts: [
        {
          id: "struct-definition", n: 1, title: "struct definition", level: 1,
          gloss: "Groups related fields into one named type.",
          examples: [
            { code: `struct point {
    int x;
    int y;
};`, notes: [{ at: "struct point", text: "the tag names the type" }] },
            { code: `struct user {
    char name[32];
    int age;
};`, notes: [] },
            { code: `struct point {
    int x, y;
};
struct point p = {3, 4};`, notes: [{ at: "{3, 4}", text: "fields in declaration order" }] }
          ]
        },
        {
          id: "typedef-struct", n: 2, title: "typedef struct", level: 1,
          gloss: "Names a struct type once so uses need no struct keyword.",
          examples: [
            { code: `typedef struct {
    double x;
    double y;
} Vec2;`, notes: [{ at: "Vec2", text: "the new type name" }] },
            { code: `typedef struct {
    char title[64];
    int pages;
} Book;`, notes: [] },
            { code: `typedef struct node {
    int value;
    struct node *next;
} Node;`, notes: [{ at: "struct node *next", text: "self-reference needs the tag" }] }
          ]
        },
        {
          id: "designated-initializers", n: 3, title: "designated initializers", level: 2,
          gloss: "Sets struct fields by name in any order.",
          examples: [
            { code: `typedef struct { double x, y; } Vec2;
Vec2 origin = {.x = 0.0, .y = 0.0};`, notes: [{ at: ".x = 0.0", text: "the field is named explicitly" }] },
            { code: `typedef struct { char title[64]; int pages; } Book;
Book b = {.pages = 320, .title = "Dune"};`, notes: [] },
            { code: `typedef struct { int port; int debug; } Config;
Config cfg = {.port = 8080};`, notes: [{ at: "{.port = 8080}", text: "other fields are zeroed" }] }
          ]
        },
        {
          id: "member-access", n: 4, title: "member access", level: 1,
          gloss: "Reads fields with a dot on values and an arrow on pointers.",
          examples: [
            { code: `typedef struct { double x, y; } Vec2;
Vec2 v = {1.5, 2.5};
double sum = v.x + v.y;`, notes: [] },
            { code: `typedef struct { double x, y; } Vec2;
Vec2 v = {1.5, 2.5};
Vec2 *pv = &v;
pv->x = 4.0;`, notes: [{ at: "pv->x", text: "same as (*pv).x" }] },
            { code: `typedef struct { double x, y; } Vec2;
void move(Vec2 *p, double dx) {
    p->x += dx;
}`, notes: [] }
          ]
        },
        {
          id: "passing-structs", n: 5, title: "passing structs", level: 2,
          gloss: "Passes small structs by value and large ones by pointer.",
          examples: [
            { code: `typedef struct { double x, y; } Vec2;
double length(Vec2 v) {
    return sqrt(v.x * v.x + v.y * v.y);
}`, notes: [{ at: "Vec2 v", text: "the whole struct is copied" }] },
            { code: `typedef struct { char name[32]; int scores[100]; } Report;
void print_report(const Report *r) {
    printf("%s\\n", r->name);
}`, notes: [{ at: "const Report *r", text: "no copy, no modification" }] },
            { code: `typedef struct { int w, h; } Size;
Size make_size(int w, int h) {
    return (Size){w, h};
}`, notes: [{ at: "(Size){w, h}", text: "a compound literal" }] }
          ]
        }
      ]
    },
    {
      id: "enums-unions",
      n: 8,
      title: "enums & unions",
      concepts: [
        {
          id: "enums", n: 1, title: "enums", level: 1,
          gloss: "Names a set of integer constants with enum.",
          examples: [
            { code: `enum color { RED, GREEN, BLUE };`, notes: [{ at: "RED", text: "values start at 0" }] },
            { code: `enum status { OK = 200, NOT_FOUND = 404, ERROR = 500 };`, notes: [] },
            { code: `enum color { RED, GREEN, BLUE };
enum color c = GREEN;`, notes: [] }
          ]
        },
        {
          id: "typedef-enum", n: 2, title: "typedef enum", level: 1,
          gloss: "Gives an enum a short type name.",
          examples: [
            { code: `typedef enum {
    DIR_UP,
    DIR_DOWN,
    DIR_LEFT,
    DIR_RIGHT
} Direction;`, notes: [] },
            { code: `typedef enum {
    LOG_DEBUG = 10,
    LOG_INFO = 20,
    LOG_ERROR = 40
} LogLevel;`, notes: [{ at: "= 20", text: "explicit values can skip numbers" }] },
            { code: `typedef enum { OFF, ON } Switch;
Switch lamp = OFF;`, notes: [] }
          ]
        },
        {
          id: "enum-switch", n: 3, title: "enum with switch", level: 2,
          gloss: "Handles each enum value in a switch.",
          examples: [
            { code: `typedef enum { UP, DOWN } Dir;
Dir dir = UP;
int y = 0;
switch (dir) {
case UP: y--; break;
case DOWN: y++; break;
}`, notes: [{ at: "case DOWN", text: "compilers can warn on missing cases" }] },
            { code: `enum color { RED, GREEN, BLUE };
const char *name(enum color c) {
    switch (c) {
    case RED: return "red";
    case GREEN: return "green";
    default: return "blue";
    }
}`, notes: [] },
            { code: `enum color { RED, GREEN, BLUE };
const char *names[] = {"red", "green", "blue"};
const char *label = names[GREEN];`, notes: [{ at: "names[GREEN]", text: "enum values work as indexes" }] }
          ]
        },
        {
          id: "unions", n: 4, title: "unions", level: 3,
          gloss: "Overlaps several fields in the same memory with union.",
          examples: [
            { code: `union value {
    int i;
    float f;
};`, notes: [{ at: "union", text: "fields share one block of memory" }] },
            { code: `union value { int i; float f; } v;
v.i = 7;`, notes: [{ at: "v.i = 7", text: "reading v.f now is not meaningful" }] },
            { code: `typedef struct {
    enum { INT, REAL } kind;
    union { int i; double d; } as;
} Number;`, notes: [{ at: "kind", text: "records which field is valid" }] }
          ]
        }
      ]
    },
    {
      id: "memory",
      n: 9,
      title: "malloc, calloc, free",
      concepts: [
        {
          id: "malloc-free", n: 1, title: "malloc and free", level: 2,
          gloss: "Requests heap memory and returns it with free.",
          examples: [
            { code: `int *p = malloc(sizeof *p);
if (p == NULL)
    return 1;
*p = 42;
free(p);`, notes: [{ at: "sizeof *p", text: "the size follows the pointer type" }] },
            { code: `double *buf = malloc(100 * sizeof *buf);`, notes: [{ at: "100 * sizeof *buf", text: "count times element size" }] },
            { code: `const char *src = "ada";
char *copy = malloc(strlen(src) + 1);
strcpy(copy, src);
free(copy);`, notes: [{ at: "+ 1", text: "room for the nul byte" }] }
          ]
        },
        {
          id: "calloc", n: 2, title: "calloc", level: 2,
          gloss: "Allocates zeroed memory for an array of items.",
          examples: [
            { code: `int *counts = calloc(26, sizeof *counts);`, notes: [{ at: "calloc", text: "every byte starts as zero" }] },
            { code: `size_t n = 128;
char *flags = calloc(n, 1);
free(flags);`, notes: [] },
            { code: `size_t rows = 4, cols = 5;
double *grid = calloc(rows * cols, sizeof *grid);`, notes: [] }
          ]
        },
        {
          id: "realloc", n: 3, title: "realloc", level: 3,
          gloss: "Resizes a heap block and keeps its contents.",
          examples: [
            { code: `int *items = malloc(4 * sizeof *items);
size_t new_cap = 8;
int *tmp = realloc(items, new_cap * sizeof *items);
if (tmp == NULL)
    return 1;
items = tmp;`, notes: [{ at: "tmp", text: "keeps items valid if realloc fails" }] },
            { code: `size_t len = 4, cap = 4;
int *data = malloc(cap * sizeof *data);
if (len == cap) {
    cap *= 2;
    data = realloc(data, cap * sizeof *data);
}`, notes: [{ at: "cap *= 2", text: "doubling keeps growth cheap" }] },
            { code: `char *text = calloc(1024, 1);
char *small = realloc(text, 64);
if (small)
    text = small;`, notes: [] }
          ]
        },
        {
          id: "freeing", n: 4, title: "freeing safely", level: 2,
          gloss: "Clears a pointer after free so it cannot be used by mistake.",
          examples: [
            { code: `char *buf = malloc(16);
free(buf);
buf = NULL;`, notes: [{ at: "buf = NULL", text: "a second free(buf) is harmless" }] },
            { code: `void destroy(char **p) {
    free(*p);
    *p = NULL;
}`, notes: [] },
            { code: `size_t n = 3;
char **rows = calloc(n, sizeof *rows);
for (size_t i = 0; i < n; i++)
    free(rows[i]);
free(rows);`, notes: [{ at: "free(rows)", text: "free the array after its items" }] }
          ]
        }
      ]
    },
    {
      id: "pointer-arithmetic",
      n: 10,
      title: "pointer arithmetic",
      concepts: [
        {
          id: "stepping", n: 1, title: "stepping through arrays", level: 2,
          gloss: "Moves a pointer by whole elements with ++ and +.",
          examples: [
            { code: `int a[] = {10, 20, 30};
int *p = a;
p++;`, notes: [{ at: "p++", text: "moves one int, not one byte" }] },
            { code: `int a[] = {10, 20, 30};
int second = *(a + 1);`, notes: [{ at: "*(a + 1)", text: "same as a[1]" }] },
            { code: `int a[] = {1, 2, 3, 4};
int *end = a + 4;`, notes: [{ at: "a + 4", text: "one past the last element" }] }
          ]
        },
        {
          id: "pointer-difference", n: 2, title: "pointer difference", level: 3,
          gloss: "Counts the elements between two pointers by subtracting them.",
          examples: [
            { code: `int a[] = {1, 2, 3, 4, 5};
ptrdiff_t n = &a[4] - &a[1];`, notes: [{ at: "ptrdiff_t", text: "signed type for differences" }] },
            { code: `const char *s = "platen";
ptrdiff_t len = strchr(s, 'e') - s;`, notes: [{ at: "strchr(s, 'e')", text: "pointer to the first match" }] },
            { code: `int a[8];
int *lo = a, *hi = a + 7;
ptrdiff_t span = hi - lo;`, notes: [] }
          ]
        },
        {
          id: "pointer-loops", n: 3, title: "walking with pointers", level: 2,
          gloss: "Iterates an array with a start pointer and an end pointer.",
          examples: [
            { code: `int a[] = {5, 6, 7};
int sum = 0;
for (int *p = a; p < a + 3; p++)
    sum += *p;`, notes: [] },
            { code: `const char *s = "hello";
int n = 0;
for (const char *p = s; *p; p++)
    n++;`, notes: [{ at: "*p", text: "stops at the nul byte" }] },
            { code: `int a[] = {3, 9, 4};
int *end = a + 3;
int max = *a;
for (int *p = a + 1; p != end; p++)
    if (*p > max)
        max = *p;`, notes: [] }
          ]
        },
        {
          id: "void-pointers", n: 4, title: "void pointers and casts", level: 3,
          gloss: "Handles untyped memory with void pointers and converts back to a real type.",
          examples: [
            { code: `void *raw = malloc(16);
int *nums = raw;`, notes: [{ at: "int *nums = raw", text: "void * converts implicitly in C" }] },
            { code: `uint32_t value = 0x01020304;
unsigned char *bytes = (unsigned char *)&value;`, notes: [{ at: "(unsigned char *)", text: "views any object as bytes" }] },
            { code: `int src[4] = {1, 2, 3, 4};
int dst[4];
size_t count = 4;
memcpy(dst, src, count * sizeof *dst);`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "function-pointers",
      n: 11,
      title: "function pointers",
      concepts: [
        {
          id: "declaring-function-pointers", n: 1, title: "declaring function pointers", level: 3,
          gloss: "Stores the address of a function in a typed pointer.",
          examples: [
            { code: `int add(int a, int b) { return a + b; }
int (*op)(int, int) = add;`, notes: [{ at: "(*op)", text: "parentheses make it a pointer" }] },
            { code: `typedef int (*BinaryOp)(int, int);`, notes: [{ at: "BinaryOp", text: "a name for the pointer type" }] },
            { code: `void (*handler)(int) = NULL;`, notes: [] }
          ]
        },
        {
          id: "calling-through-pointers", n: 2, title: "calling through pointers", level: 3,
          gloss: "Calls a function through its pointer like an ordinary function.",
          examples: [
            { code: `int add(int a, int b) { return a + b; }
int (*op)(int, int) = add;
int r = op(2, 3);`, notes: [{ at: "op(2, 3)", text: "same as (*op)(2, 3)" }] },
            { code: `typedef int (*BinaryOp)(int, int);
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
BinaryOp ops[] = {add, sub};`, notes: [{ at: "{add, sub}", text: "a table of functions" }] },
            { code: `void run(void (*task)(void)) {
    task();
}`, notes: [] }
          ]
        },
        {
          id: "callbacks", n: 3, title: "callbacks", level: 3,
          gloss: "Passes a function to another function to customize its behavior.",
          examples: [
            { code: `void apply(int *v, size_t n, int (*f)(int)) {
    for (size_t i = 0; i < n; i++)
        v[i] = f(v[i]);
}`, notes: [{ at: "int (*f)(int)", text: "any int-to-int function fits" }] },
            { code: `int by_value(const void *a, const void *b) {
    return *(const int *)a - *(const int *)b;
}`, notes: [{ at: "const void *", text: "qsort passes untyped pointers" }] },
            { code: `int by_value(const void *a, const void *b);
int nums[] = {5, 2, 9, 1};
size_t n = sizeof nums / sizeof nums[0];
qsort(nums, n, sizeof nums[0], by_value);`, notes: [{ at: "by_value", text: "the comparison callback" }] }
          ]
        }
      ]
    },
    {
      id: "file-io",
      n: 12,
      title: "file I/O",
      concepts: [
        {
          id: "opening-files", n: 1, title: "opening files", level: 1,
          gloss: "Opens a file with fopen and releases it with fclose.",
          examples: [
            { code: `FILE *f = fopen("notes.txt", "r");
if (f == NULL)
    return 1;
fclose(f);`, notes: [{ at: '"r"', text: "read mode" }] },
            { code: `FILE *out = fopen("log.txt", "w");
fclose(out);`, notes: [{ at: '"w"', text: "creates or truncates the file" }] },
            { code: `const char *path = "audit.bin";
FILE *f = fopen(path, "ab");`, notes: [{ at: '"ab"', text: "append in binary mode" }] }
          ]
        },
        {
          id: "reading-lines", n: 2, title: "reading lines", level: 1,
          gloss: "Reads a file one line at a time with fgets.",
          examples: [
            { code: `FILE *f = fopen("in.txt", "r");
char line[256];
while (fgets(line, sizeof line, f) != NULL)
    fputs(line, stdout);`, notes: [{ at: "sizeof line", text: "never reads past the buffer" }] },
            { code: `char buf[128];
if (fgets(buf, sizeof buf, stdin))
    buf[strcspn(buf, "\\n")] = '\\0';`, notes: [{ at: "strcspn", text: "index of the newline" }] },
            { code: `FILE *f = fopen("in.txt", "r");
int lines = 0;
int ch;
while ((ch = fgetc(f)) != EOF)
    if (ch == '\\n')
        lines++;`, notes: [{ at: "int ch", text: "int, so EOF fits" }] }
          ]
        },
        {
          id: "formatted-io", n: 3, title: "formatted file I/O", level: 2,
          gloss: "Writes and reads formatted values with fprintf and fscanf.",
          examples: [
            { code: `FILE *f = fopen("scores.csv", "a");
const char *name = "ada";
int score = 98;
fprintf(f, "%s,%d\\n", name, score);`, notes: [] },
            { code: `FILE *f = fopen("pairs.txt", "r");
int a, b;
if (fscanf(f, "%d %d", &a, &b) == 2)
    printf("%d\\n", a + b);`, notes: [{ at: "== 2", text: "fscanf returns items matched" }] },
            { code: `fprintf(stderr, "error: %s\\n", strerror(errno));`, notes: [{ at: "stderr", text: "the unbuffered error stream" }] }
          ]
        },
        {
          id: "binary-io", n: 4, title: "binary reads and writes", level: 3,
          gloss: "Reads and writes raw bytes with fread and fwrite.",
          examples: [
            { code: `FILE *f = fopen("data.bin", "wb");
int values[4] = {1, 2, 3, 4};
fwrite(values, sizeof values[0], 4, f);`, notes: [{ at: "sizeof values[0]", text: "the size of one item" }] },
            { code: `FILE *f = fopen("data.bin", "rb");
unsigned char buf[512];
size_t got = fread(buf, 1, sizeof buf, f);`, notes: [{ at: "got", text: "bytes actually read" }] },
            { code: `FILE *f = fopen("data.bin", "rb");
fseek(f, 0, SEEK_END);
long size = ftell(f);
rewind(f);`, notes: [{ at: "SEEK_END", text: "jumps to the end of the file" }] }
          ]
        }
      ]
    },
    {
      id: "preprocessor",
      n: 13,
      title: "preprocessor & headers",
      concepts: [
        {
          id: "include-define", n: 1, title: "include and define", level: 1,
          gloss: "Pulls in headers with include and names constants with define.",
          examples: [
            { code: `#include <stdio.h>
#include <stdlib.h>`, notes: [{ at: "<stdio.h>", text: "angle brackets search system paths" }] },
            { code: `#define MAX_USERS 64
int users[MAX_USERS];`, notes: [{ at: "MAX_USERS", text: "replaced before compiling" }] },
            { code: `#define PI 3.14159265358979
double r = 2.0;
double area = PI * r * r;`, notes: [] }
          ]
        },
        {
          id: "function-macros", n: 2, title: "function-like macros", level: 2,
          gloss: "Defines a macro that takes arguments and expands inline.",
          examples: [
            { code: `#define SQUARE(x) ((x) * (x))`, notes: [{ at: "((x) * (x))", text: "parenthesize every use of x" }] },
            { code: `#define MIN(a, b) ((a) < (b) ? (a) : (b))`, notes: [{ at: "(a) : (b)", text: "arguments may be evaluated twice" }] },
            { code: `#define ARRAY_LEN(a) (sizeof(a) / sizeof((a)[0]))`, notes: [] }
          ]
        },
        {
          id: "header-guards", n: 3, title: "header guards", level: 2,
          gloss: "Stops a header from being included twice.",
          examples: [
            { code: `#ifndef VEC2_H
#define VEC2_H

typedef struct { double x, y; } Vec2;
#endif`, notes: [{ at: "#ifndef", text: "skip everything if already defined" }] },
            { code: `#ifndef LOGGER_H
#define LOGGER_H
void log_line(const char *s);
#endif`, notes: [] },
            { code: `#pragma once
int clamp(int v, int lo, int hi);`, notes: [{ at: "#pragma once", text: "common, but not standard C" }] }
          ]
        },
        {
          id: "conditional-compilation", n: 4, title: "conditional compilation", level: 2,
          gloss: "Includes code only when a macro is defined.",
          examples: [
            { code: `int x = 3;
#ifdef DEBUG
    fprintf(stderr, "x = %d\\n", x);
#endif`, notes: [{ at: "#ifdef", text: "compiled only with -DDEBUG" }] },
            { code: `#if __STDC_VERSION__ >= 201112L
#define HAS_ATOMICS 1
#else
#define HAS_ATOMICS 0
#endif`, notes: [] },
            { code: `#ifndef BUFFER_SIZE
#define BUFFER_SIZE 512
#endif`, notes: [{ at: "#ifndef", text: "lets the build override the value" }] }
          ]
        }
      ]
    },
    {
      id: "bit-operations",
      n: 14,
      title: "bit operations",
      concepts: [
        {
          id: "bitwise-operators", n: 1, title: "bitwise operators", level: 2,
          gloss: "Combines and flips bits with &, |, ^ and ~.",
          examples: [
            { code: `unsigned a = 0xF0, b = 0x3C;
unsigned both = a & b;`, notes: [{ at: "a & b", text: "bits set in both" }] },
            { code: `unsigned a = 0xF0, b = 0x3C;
unsigned either = a | b;
unsigned diff = a ^ b;`, notes: [{ at: "a ^ b", text: "bits that differ" }] },
            { code: `uint8_t mask = 0x0F;
uint8_t inverted = ~mask;`, notes: [{ at: "~mask", text: "flips every bit" }] }
          ]
        },
        {
          id: "shifts", n: 2, title: "shifts", level: 2,
          gloss: "Moves bits left or right to scale by powers of two.",
          examples: [
            { code: `unsigned x = 1u << 4;`, notes: [{ at: "1u << 4", text: "16" }] },
            { code: `unsigned value = 200;
unsigned half = value >> 1;`, notes: [] },
            { code: `unsigned bits = 5;
uint32_t mask = (1u << bits) - 1;`, notes: [{ at: "(1u << bits) - 1", text: "the low bits all set" }] }
          ]
        },
        {
          id: "flag-masks", n: 3, title: "flag masks", level: 2,
          gloss: "Manages flags by setting, clearing and testing single bits with a mask.",
          examples: [
            { code: `enum { FLAG_READ = 1, FLAG_WRITE = 2 };
unsigned flags = 0;
flags |= FLAG_READ;`, notes: [{ at: "|=", text: "sets the bit" }] },
            { code: `enum { FLAG_READ = 1, FLAG_WRITE = 2 };
unsigned flags = FLAG_READ | FLAG_WRITE;
flags &= ~FLAG_WRITE;`, notes: [{ at: "&= ~", text: "clears the bit" }] },
            { code: `enum { FLAG_READ = 1, FLAG_WRITE = 2 };
unsigned flags = FLAG_READ;
if (flags & FLAG_READ)
    puts("readable");`, notes: [{ at: "flags & FLAG_READ", text: "nonzero when the bit is set" }] }
          ]
        },
        {
          id: "bit-extraction", n: 4, title: "bit extraction", level: 3,
          gloss: "Extracts and packs fields inside an integer with shifts and masks.",
          examples: [
            { code: `uint8_t byte = 0xA7;
uint8_t high = (byte >> 4) & 0x0F;
uint8_t low = byte & 0x0F;`, notes: [{ at: "& 0x0F", text: "keeps only the low four bits" }] },
            { code: `uint32_t r = 255, g = 128, b = 0, a = 255;
uint32_t rgba = (r << 24) | (g << 16) | (b << 8) | a;`, notes: [] },
            { code: `unsigned n = 64;
int is_pow2 = n && !(n & (n - 1));`, notes: [{ at: "n & (n - 1)", text: "clears the lowest set bit" }] }
          ]
        }
      ]
    }
  ]
};
