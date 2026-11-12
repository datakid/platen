export default {
  id: "php",
  name: "PHP",
  short: "PHP",
  pigment: "php",
  family: null,
  version: "8.3",
  lexer: "php",
  indent: 4,
  topics: [
    {
      id: "variables-types",
      n: 1,
      title: "variables & types",
      concepts: [
        {
          id: "variables", n: 1, title: "variables and assignment", level: 1,
          gloss: "Stores values in variables whose names start with a dollar sign.",
          examples: [
            { code: `$city = 'Oslo';
$visits = 0;
$visits++;`, notes: [{ at: "$city", text: "every variable starts with $" }] },
            { code: `$price = 9.99;
$quantity = 3;
$total = $price * $quantity;`, notes: [] },
            { code: `$name = 'ada';
$copy = $name;
$copy = 'grace';
echo $name;`, notes: [{ at: "$copy =", text: "assignment copies the value" }] }
          ]
        },
        {
          id: "scalar-types", n: 2, title: "scalar types", level: 1,
          gloss: "Works with int, float, bool and string values and inspects them with var_dump.",
          examples: [
            { code: `$count = 42;
$ratio = 0.75;
$active = true;
$label = 'ready';
var_dump($count, $ratio, $active, $label);`, notes: [{ at: "var_dump", text: "shows type and value" }] },
            { code: `$value = '42';
echo gettype($value), PHP_EOL;
echo gettype((int) $value), PHP_EOL;`, notes: [{ at: "gettype", text: "type name as a string" }] },
            { code: `$big = PHP_INT_MAX;
$float = 1.5e3;
$hex = 0xFF;
$bin = 0b1010;
var_dump($hex + $bin);`, notes: [{ at: "PHP_INT_MAX", text: "largest integer" }] }
          ]
        },
        {
          id: "casting-and-juggling", n: 3, title: "casting and type juggling", level: 2,
          gloss: "Converts values with casts and notes how operators coerce types.",
          examples: [
            { code: `$text = '12 apples';
$number = (int) $text;
$flag = (bool) 'a';`, notes: [{ at: "(int)", text: "explicit cast" }] },
            { code: `$sum = '5' + 3;
$joined = '5' . 3;
var_dump($sum, $joined);`, notes: [{ at: "+", text: "numeric addition" }, { at: ".", text: "string concatenation" }] },
            { code: `var_dump(0 == 'a');
var_dump(0 === 'a');
var_dump('1' == '01');`, notes: [{ at: "===", text: "compares type and value" }] }
          ]
        },
        {
          id: "constants", n: 4, title: "constants", level: 1,
          gloss: "Defines values that never change with const, define and class constants.",
          examples: [
            { code: `const MAX_USERS = 100;
define('APP_NAME', 'billing');
echo MAX_USERS, ' ', APP_NAME;`, notes: [{ at: "const", text: "compile-time constant" }] },
            { code: `class Limits
{
    public const int MAX = 10;
    public const string UNIT = 'MB';
}
echo Limits::MAX, Limits::UNIT;`, notes: [{ at: "const int", text: "typed class constant" }] },
            { code: `const TAX_RATE = 0.2;
$price = 40;
echo $price * (1 + TAX_RATE);`, notes: [] }
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
          id: "quotes-and-interpolation", n: 1, title: "quotes and interpolation", level: 1,
          gloss: "Embeds variables in double-quoted strings and keeps single quotes literal.",
          examples: [
            { code: `$name = 'ada';
echo "Hello, $name", PHP_EOL;
echo 'Hello, $name';`, notes: [{ at: "\"Hello, $name\"", text: "variables expand" }, { at: "'Hello, $name'", text: "taken literally" }] },
            { code: `$user = ['name' => 'grace', 'age' => 36];
echo "Name: {$user['name']}";`, notes: [{ at: "{$", text: "braces for complex expressions" }] },
            { code: `$item = 'tea';
$qty = 3;
echo "$qty x {$item}s", PHP_EOL;`, notes: [] }
          ]
        },
        {
          id: "heredoc-nowdoc", n: 2, title: "heredoc and nowdoc", level: 2,
          gloss: "Writes multiline text with heredoc interpolation or nowdoc literals.",
          examples: [
            { code: `$name = 'ada';
echo <<<TEXT
Dear $name,
welcome aboard.
TEXT;`, notes: [{ at: "<<<TEXT", text: "heredoc, expands variables" }] },
            { code: `$sql = <<<'SQL'
SELECT id, name
FROM users
WHERE active = 1
SQL;
echo $sql;`, notes: [{ at: "<<<'SQL'", text: "nowdoc, no expansion" }] },
            { code: `$total = 42;
$report = <<<EOT
    Total: {$total}
      indented
    EOT;
echo $report;`, notes: [{ at: "EOT;", text: "closing indent is removed" }] }
          ]
        },
        {
          id: "string-functions", n: 3, title: "string functions", level: 1,
          gloss: "Handles whitespace, splitting, joining and prefix tests with built-in functions.",
          examples: [
            { code: `$title = '  Quarterly Report  ';
echo trim($title), PHP_EOL;
echo strtoupper(trim($title)), PHP_EOL;`, notes: [{ at: "trim", text: "removes outer whitespace" }] },
            { code: `$csv = 'ada,grace,linus';
$names = explode(',', $csv);
echo implode(' | ', $names);`, notes: [{ at: "explode", text: "string to array" }, { at: "implode", text: "array to string" }] },
            { code: `$file = 'report.final.pdf';
var_dump(str_ends_with($file, '.pdf'));
var_dump(str_starts_with($file, 'report'));
echo substr($file, 0, 6);`, notes: [{ at: "str_ends_with", text: "boolean check" }] }
          ]
        },
        {
          id: "search-and-format", n: 4, title: "searching and formatting", level: 2,
          gloss: "Replaces text, pads strings and formats numbers.",
          examples: [
            { code: `$text = 'red apple, red car';
echo str_replace('red', 'green', $text), PHP_EOL;
echo strpos($text, 'apple');`, notes: [{ at: "strpos", text: "offset or false" }] },
            { code: `echo str_pad('7', 3, '0', STR_PAD_LEFT), PHP_EOL;
echo number_format(1234567.891, 2), PHP_EOL;
echo ucfirst('hello');`, notes: [{ at: "STR_PAD_LEFT", text: "pads on the left" }] },
            { code: `printf("%s has %d items (%.1f%%)\\n", 'cart', 3, 42.5);
echo sprintf('%05.1f', 3.14159);`, notes: [{ at: "%%", text: "literal percent sign" }] }
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
          id: "indexed-arrays", n: 1, title: "indexed arrays", level: 1,
          gloss: "Stores ordered values in a list-style array.",
          examples: [
            { code: `$scores = [90, 72, 85];
$scores[] = 60;
echo count($scores);`, notes: [{ at: "[] =", text: "appends an element" }] },
            { code: `$names = ['ada', 'grace'];
array_unshift($names, 'linus');
array_pop($names);
print_r($names);`, notes: [{ at: "array_unshift", text: "adds at the front" }] },
            { code: `$squares = range(1, 5);
echo implode(', ', array_slice($squares, 0, 2));`, notes: [{ at: "range", text: "inclusive sequence" }] }
          ]
        },
        {
          id: "associative-arrays", n: 2, title: "associative arrays", level: 1,
          gloss: "Maps string keys to values and loops over key and value pairs.",
          examples: [
            { code: `$stock = ['apple' => 4, 'pear' => 0];
$stock['plum'] = 7;
echo $stock['apple'];`, notes: [{ at: "=>", text: "key to value" }] },
            { code: `$prices = ['tea' => 2.5, 'cake' => 4.0];
unset($prices['tea']);
var_dump(array_key_exists('cake', $prices));`, notes: [{ at: "unset", text: "removes the key" }] },
            { code: `$ages = ['ada' => 36, 'linus' => 54];
foreach ($ages as $name => $age) {
    echo "$name: $age", PHP_EOL;
}`, notes: [] }
          ]
        },
        {
          id: "array-functions", n: 3, title: "map, filter and reduce", level: 2,
          gloss: "Transforms arrays with array_map, array_filter and array_reduce.",
          examples: [
            { code: `$nums = [1, 2, 3, 4];
$doubled = array_map(fn($n) => $n * 2, $nums);
print_r($doubled);`, notes: [{ at: "fn", text: "arrow function" }] },
            { code: `$prices = [5.0, 12.5, 8.0];
$cheap = array_filter($prices, fn($p) => $p < 10);
print_r($cheap);`, notes: [{ at: "array_filter", text: "keeps original keys" }] },
            { code: `$nums = [3, 5, 7];
$total = array_reduce($nums, fn($carry, $n) => $carry + $n, 0);
echo $total, ' ', array_sum($nums);`, notes: [{ at: "$carry", text: "running result" }] }
          ]
        },
        {
          id: "destructuring-and-spread", n: 4, title: "destructuring and spread", level: 2,
          gloss: "Unpacks arrays into variables and merges arrays with the spread operator.",
          examples: [
            { code: `[$first, $second] = [10, 20];
echo $first + $second;`, notes: [{ at: "[$first, $second]", text: "list destructuring" }] },
            { code: `['name' => $name, 'age' => $age] = ['name' => 'ada', 'age' => 36];
echo "$name is $age";`, notes: [{ at: "'name' => $name", text: "pulls out by key" }] },
            { code: `$base = [1, 2];
$all = [...$base, 3, 4];
$config = [...['debug' => false], ...['debug' => true]];
print_r($all);`, notes: [{ at: "...", text: "spread operator" }] }
          ]
        },
        {
          id: "sorting-arrays", n: 5, title: "sorting arrays", level: 2,
          gloss: "Orders arrays by value, key or a custom comparison.",
          examples: [
            { code: `$names = ['grace', 'ada', 'linus'];
sort($names);
print_r($names);`, notes: [{ at: "sort", text: "sorts in place" }] },
            { code: `$ages = ['ada' => 36, 'linus' => 54, 'grace' => 30];
asort($ages);
ksort($ages);
print_r($ages);`, notes: [{ at: "asort", text: "by value, keeps keys" }, { at: "ksort", text: "by key" }] },
            { code: `$users = [['age' => 36], ['age' => 30]];
usort($users, fn($a, $b) => $a['age'] <=> $b['age']);
print_r($users);`, notes: [{ at: "<=>", text: "spaceship comparison" }] }
          ]
        }
      ]
    },
    {
      id: "control-flow-match",
      n: 4,
      title: "control flow & match",
      concepts: [
        {
          id: "if-else", n: 1, title: "conditionals", level: 1,
          gloss: "Branches with if, elseif, else and the ternary operators.",
          examples: [
            { code: `$temperature = 28;
if ($temperature > 25) {
    echo 'warm';
} elseif ($temperature > 10) {
    echo 'mild';
} else {
    echo 'cold';
}`, notes: [{ at: "elseif", text: "one word" }] },
            { code: `$score = 72;
echo $score >= 60 ? 'pass' : 'fail';`, notes: [{ at: "? 'pass'", text: "ternary" }] },
            { code: `$name = '';
echo $name ?: 'guest';`, notes: [{ at: "?:", text: "falls back on any falsy value" }] }
          ]
        },
        {
          id: "for-foreach", n: 2, title: "for and foreach loops", level: 1,
          gloss: "Repeats code with counters and iterates over arrays.",
          examples: [
            { code: `for ($i = 1; $i <= 3; $i++) {
    echo $i;
}`, notes: [] },
            { code: `$items = ['tea', 'cake'];
foreach ($items as $index => $item) {
    echo "$index: $item\\n";
}`, notes: [{ at: "$index => $item", text: "key and value" }] },
            { code: `$prices = ['tea' => 2.5, 'cake' => 4.0];
foreach ($prices as $name => &$price) {
    $price *= 2;
}
unset($price);
print_r($prices);`, notes: [{ at: "&$price", text: "reference to the element" }] }
          ]
        },
        {
          id: "while-loops", n: 3, title: "while, do-while and loop control", level: 1,
          gloss: "Loops on a condition and controls iterations with break and continue.",
          examples: [
            { code: `$n = 3;
while ($n > 0) {
    echo $n--;
}`, notes: [] },
            { code: `$tries = 0;
do {
    $tries++;
} while ($tries < 3);
echo $tries;`, notes: [{ at: "do {", text: "body runs at least once" }] },
            { code: `foreach (range(1, 10) as $i) {
    if ($i === 3) {
        continue;
    }
    if ($i > 5) {
        break;
    }
    echo $i;
}`, notes: [] }
          ]
        },
        {
          id: "match-expressions", n: 4, title: "match expressions", level: 2,
          gloss: "Chooses a value with strict comparison and no fall-through.",
          examples: [
            { code: `$code = 404;
echo match ($code) {
    200 => 'ok',
    404 => 'not found',
    default => 'other',
};`, notes: [{ at: "match", text: "expression, strict ===" }] },
            { code: `$score = 85;
echo match (true) {
    $score >= 90 => 'A',
    $score >= 80 => 'B',
    default => 'C',
};`, notes: [{ at: "match (true)", text: "first true arm wins" }] },
            { code: `$day = 'sat';
$weekend = match ($day) {
    'sat', 'sun' => true,
    default => false,
};
var_dump($weekend);`, notes: [{ at: "'sat', 'sun'", text: "several values per arm" }] }
          ]
        }
      ]
    },
    {
      id: "functions-arrow-functions",
      n: 5,
      title: "functions & arrow functions",
      concepts: [
        {
          id: "declaring-functions", n: 1, title: "declaring functions", level: 1,
          gloss: "Defines functions with typed parameters and return types.",
          examples: [
            { code: `function square(int $n): int
{
    return $n * $n;
}
echo square(4);`, notes: [{ at: ": int", text: "return type" }] },
            { code: `function greet(string $name, string $greeting = 'Hello'): string
{
    return "$greeting, $name";
}
echo greet('ada');`, notes: [{ at: "= 'Hello'", text: "default value" }] },
            { code: `function log_message(string $message): void
{
    echo "[log] $message\\n";
}
log_message('started');`, notes: [{ at: "void", text: "returns nothing" }] }
          ]
        },
        {
          id: "named-and-variadic", n: 2, title: "named arguments and variadics", level: 2,
          gloss: "Passes arguments by name and collects extras with a variadic parameter.",
          examples: [
            { code: `function dial(string $host, int $port = 80, bool $tls = false): string
{
    return "$host:$port";
}
echo dial(host: 'example.com', tls: true);`, notes: [{ at: "host:", text: "named argument" }] },
            { code: `function sum(int ...$numbers): int
{
    return array_sum($numbers);
}
echo sum(1, 2, 3);`, notes: [{ at: "...$numbers", text: "collects into an array" }] },
            { code: `function total(int ...$values): int
{
    return array_sum($values);
}
$data = [4, 5, 6];
echo total(...$data);`, notes: [{ at: "total(...", text: "unpacks an array" }] }
          ]
        },
        {
          id: "arrow-and-closures", n: 3, title: "arrow functions and closures", level: 2,
          gloss: "Writes short anonymous functions and captures variables with use.",
          examples: [
            { code: `$double = fn(int $n): int => $n * 2;
echo $double(4);`, notes: [{ at: "fn", text: "one expression only" }] },
            { code: `$rate = 0.2;
$withTax = fn(float $price) => $price * (1 + $rate);
echo $withTax(40);`, notes: [{ at: "$rate", text: "captured automatically" }] },
            { code: `$total = 0;
$add = function (int $n) use (&$total): void {
    $total += $n;
};
$add(5);
echo $total;`, notes: [{ at: "use (&$total)", text: "capture by reference" }] }
          ]
        },
        {
          id: "first-class-callables", n: 4, title: "first-class callables", level: 3,
          gloss: "Turns functions and methods into closures with the ellipsis syntax.",
          examples: [
            { code: `$length = strlen(...);
echo $length('kotlin');`, notes: [{ at: "strlen(...)", text: "closure from a function" }] },
            { code: `class Math
{
    public function square(int $n): int
    {
        return $n * $n;
    }
}
$square = (new Math())->square(...);
echo $square(5);`, notes: [] },
            { code: `$names = ['ada', 'grace'];
echo implode(',', array_map(strtoupper(...), $names));`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "classes-constructor-promotion",
      n: 6,
      title: "classes & constructor promotion",
      concepts: [
        {
          id: "declaring-classes", n: 1, title: "declaring classes", level: 1,
          gloss: "Groups state and behaviour in a class with properties and methods.",
          examples: [
            { code: `class Counter
{
    private int $value = 0;

    public function increment(): void
    {
        $this->value++;
    }
}`, notes: [{ at: "$this", text: "the current object" }, { at: "private", text: "hidden from outside" }] },
            { code: `class Rectangle
{
    public float $width = 0;
    public float $height = 0;

    public function area(): float
    {
        return $this->width * $this->height;
    }
}`, notes: [] },
            { code: `class MathUtil
{
    public static function clamp(int $n, int $min, int $max): int
    {
        return max($min, min($n, $max));
    }
}
echo MathUtil::clamp(15, 0, 10);`, notes: [{ at: "static", text: "called on the class" }] }
          ]
        },
        {
          id: "constructor-promotion", n: 2, title: "constructor promotion", level: 1,
          gloss: "Declares and assigns properties directly in the constructor signature.",
          examples: [
            { code: `class User
{
    public function __construct(
        public string $name,
        public int $age,
    ) {}
}`, notes: [{ at: "public string $name", text: "declares and assigns" }] },
            { code: `class Point
{
    public function __construct(
        public readonly float $x = 0,
        public readonly float $y = 0,
    ) {}
}`, notes: [] },
            { code: `class Order
{
    public function __construct(
        private array $items = [],
        protected string $status = 'new',
    ) {}
}`, notes: [{ at: "protected", text: "visible to subclasses" }] }
          ]
        },
        {
          id: "inheritance", n: 3, title: "inheritance and abstract classes", level: 2,
          gloss: "Extends classes, overrides methods and declares abstract members.",
          examples: [
            { code: `class Animal
{
    public function speak(): string { return '...'; }
}
class Dog extends Animal
{
    public function speak(): string { return 'woof'; }
}`, notes: [{ at: "extends", text: "inherits members" }] },
            { code: `class Vehicle
{
    public function __construct(protected int $wheels) {}
}
class Bike extends Vehicle
{
    public function __construct()
    {
        parent::__construct(2);
    }
}`, notes: [{ at: "parent::", text: "calls the parent method" }] },
            { code: `abstract class Shape
{
    abstract public function area(): float;
}
class Square extends Shape
{
    public function __construct(private float $side) {}
    public function area(): float { return $this->side ** 2; }
}`, notes: [{ at: "abstract", text: "no body, must be implemented" }] }
          ]
        },
        {
          id: "static-and-magic", n: 4, title: "static members and magic methods", level: 2,
          gloss: "Shares state with static properties and customises objects with double-underscore methods.",
          examples: [
            { code: `class Counter
{
    public static int $count = 0;
    public static function bump(): int
    {
        return ++self::$count;
    }
}
echo Counter::bump();`, notes: [{ at: "self::", text: "refers to this class" }] },
            { code: `class Greeting
{
    public function __construct(private string $name) {}
    public function __toString(): string
    {
        return "Hello, {$this->name}";
    }
}
echo new Greeting('ada');`, notes: [{ at: "__toString", text: "used when echoed" }] },
            { code: `class Settings
{
    private array $data = ['theme' => 'dark'];
    public function __get(string $key): mixed
    {
        return $this->data[$key] ?? null;
    }
}
echo (new Settings())->theme;`, notes: [{ at: "__get", text: "reads inaccessible properties" }] }
          ]
        }
      ]
    },
    {
      id: "interfaces-traits",
      n: 7,
      title: "interfaces & traits",
      concepts: [
        {
          id: "interfaces", n: 1, title: "interfaces", level: 1,
          gloss: "Declares method signatures that classes must implement.",
          examples: [
            { code: `interface Greeter
{
    public function greet(string $name): string;
}
class Formal implements Greeter
{
    public function greet(string $name): string
    {
        return "Good day, $name";
    }
}`, notes: [{ at: "implements", text: "promises the interface" }] },
            { code: `interface Shape
{
    public const SIDES = 0;
    public function area(): float;
}
class Square implements Shape
{
    public function __construct(private float $s) {}
    public function area(): float { return $this->s ** 2; }
}`, notes: [{ at: "public const", text: "interface constant" }] },
            { code: `interface Loggable { public function log(): string; }
interface Printable { public function print(): void; }
class Report implements Loggable, Printable
{
    public function log(): string { return 'report'; }
    public function print(): void { echo $this->log(); }
}`, notes: [{ at: "Loggable, Printable", text: "several interfaces" }] }
          ]
        },
        {
          id: "built-in-interfaces", n: 2, title: "built-in interfaces", level: 2,
          gloss: "Plugs classes into the language with Countable, IteratorAggregate and Stringable.",
          examples: [
            { code: `class Basket implements Countable
{
    private array $items = ['tea', 'cake'];
    public function count(): int { return count($this->items); }
}
echo count(new Basket());`, notes: [{ at: "Countable", text: "works with count()" }] },
            { code: `class Playlist implements IteratorAggregate
{
    public function __construct(private array $songs) {}
    public function getIterator(): Iterator
    {
        return new ArrayIterator($this->songs);
    }
}
foreach (new Playlist(['a', 'b']) as $song) { echo $song; }`, notes: [{ at: "IteratorAggregate", text: "works with foreach" }] },
            { code: `class Tag implements Stringable
{
    public function __construct(private string $label) {}
    public function __toString(): string { return "#{$this->label}"; }
}
echo new Tag('php');`, notes: [] }
          ]
        },
        {
          id: "traits", n: 3, title: "traits", level: 2,
          gloss: "Reuses methods and properties across classes with traits.",
          examples: [
            { code: `trait Greets
{
    public function hello(): string
    {
        return 'hello from ' . static::class;
    }
}
class Robot
{
    use Greets;
}
echo (new Robot())->hello();`, notes: [{ at: "use", text: "imports the trait" }] },
            { code: `trait Timestamps
{
    public ?string $createdAt = null;
    public function touch(): void
    {
        $this->createdAt = date('Y-m-d');
    }
}
class Post { use Timestamps; }`, notes: [] },
            { code: `trait Counts
{
    private int $count = 0;
    public function increment(): int { return ++$this->count; }
}
class Visits { use Counts; }
echo (new Visits())->increment();`, notes: [] }
          ]
        },
        {
          id: "trait-composition", n: 4, title: "trait composition", level: 3,
          gloss: "Resolves name clashes between traits and requires methods with abstract.",
          examples: [
            { code: `trait Logs { public function note(): string { return 'log'; } }
trait Audits { public function note(): string { return 'audit'; } }
class Service
{
    use Logs, Audits {
        Logs::note insteadof Audits;
        Audits::note as auditNote;
    }
}
echo (new Service())->auditNote();`, notes: [{ at: "insteadof", text: "picks one trait method" }, { at: "as", text: "keeps the other under a new name" }] },
            { code: `trait Describes
{
    abstract public function name(): string;
    public function say(): string { return 'I am ' . $this->name(); }
}
class Cat
{
    use Describes;
    public function name(): string { return 'cat'; }
}
echo (new Cat())->say();`, notes: [{ at: "abstract", text: "the class must supply it" }] },
            { code: `trait Factory
{
    public static function make(): static { return new static(); }
}
class Box { use Factory; }
$box = Box::make();
echo $box::class;`, notes: [{ at: "static", text: "late static binding" }] }
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
          id: "pure-enums", n: 1, title: "pure enums", level: 1,
          gloss: "Names a fixed set of values with the enum keyword.",
          examples: [
            { code: `enum Status
{
    case Active;
    case Paused;
    case Closed;
}
$status = Status::Active;`, notes: [{ at: "case", text: "one enum member" }] },
            { code: `enum Direction { case North; case East; case South; case West; }
var_dump(Direction::East === Direction::East);`, notes: [{ at: "===", text: "cases are singletons" }] },
            { code: `enum Suit
{
    case Hearts;
    case Spades;
}
print_r(Suit::cases());`, notes: [{ at: "cases()", text: "list of all members" }] }
          ]
        },
        {
          id: "backed-enums", n: 2, title: "backed enums", level: 1,
          gloss: "Attaches an int or string value to each case and converts back with from.",
          examples: [
            { code: `enum Level: int
{
    case Low = 1;
    case High = 3;
}
echo Level::High->value;`, notes: [{ at: ": int", text: "backing type" }, { at: "->value", text: "the backing value" }] },
            { code: `enum Role: string
{
    case Admin = 'admin';
    case Guest = 'guest';
}
$role = Role::from('admin');
echo $role->name;`, notes: [{ at: "from", text: "throws on unknown values" }] },
            { code: `enum Status: string
{
    case Active = 'active';
    case Closed = 'closed';
}
var_dump(Status::tryFrom('missing'));`, notes: [{ at: "tryFrom", text: "null on unknown values" }] }
          ]
        },
        {
          id: "enum-methods", n: 3, title: "methods, constants and interfaces", level: 2,
          gloss: "Adds methods, constants and interface implementations to enums.",
          examples: [
            { code: `enum Suit: string
{
    case Hearts = 'H';
    case Spades = 'S';

    public function label(): string
    {
        return ucfirst(strtolower($this->name));
    }
}`, notes: [{ at: "$this->name", text: "the case name" }] },
            { code: `interface HasColor { public function color(): string; }
enum Light implements HasColor
{
    case Red;
    case Green;
    public function color(): string
    {
        return strtolower($this->name);
    }
}`, notes: [] },
            { code: `enum Size
{
    case Small;
    case Large;
    const DEFAULT = self::Small;
}
var_dump(Size::DEFAULT);`, notes: [{ at: "const", text: "may point at a case" }] }
          ]
        },
        {
          id: "enums-with-match", n: 4, title: "enums with match", level: 2,
          gloss: "Matches on enum cases and loops over them with cases.",
          examples: [
            { code: `enum Light { case Red; case Green; }
echo match (Light::Red) {
    Light::Red => 'stop',
    Light::Green => 'go',
};`, notes: [{ at: "match", text: "exhaustive over cases" }] },
            { code: `enum Level: int { case Low = 1; case High = 3; }
$names = array_map(fn(Level $l) => $l->name, Level::cases());
print_r($names);`, notes: [] },
            { code: `enum Status: string
{
    case Active = 'active';
    case Closed = 'closed';
    public function isOpen(): bool
    {
        return $this === self::Active;
    }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "namespaces-autoloading",
      n: 9,
      title: "namespaces & autoloading",
      concepts: [
        {
          id: "declaring-namespaces", n: 1, title: "declaring namespaces", level: 1,
          gloss: "Groups classes, functions and constants under a namespace.",
          examples: [
            { code: `namespace App\\Models;

class User
{
    public function __construct(public string $name) {}
}
echo User::class;`, notes: [{ at: "namespace", text: "must come first" }, { at: "User::class", text: "fully qualified name" }] },
            { code: `namespace App\\Services;

function greet(string $name): string
{
    return "Hello, $name";
}
echo \\App\\Services\\greet('ada');`, notes: [{ at: "\\App", text: "leading backslash is absolute" }] },
            { code: `namespace Shop;

const TAX = 0.2;
echo TAX, ' ', \\Shop\\TAX;`, notes: [] }
          ]
        },
        {
          id: "use-imports", n: 2, title: "use imports and aliases", level: 1,
          gloss: "Imports names with use and renames them with as.",
          examples: [
            { code: `namespace App;
use DateTimeImmutable as Clock;

$clock = new Clock('2024-01-01');
echo $clock->format('Y');`, notes: [{ at: "as Clock", text: "local alias" }] },
            { code: `namespace App;
use function strtoupper as shout;
use const PHP_EOL as NL;

echo shout('hi') . NL;`, notes: [{ at: "use function", text: "imports a function" }] },
            { code: `namespace App\\Http;
use App\\Models\\{User, Post};

echo User::class . ', ' . Post::class;`, notes: [{ at: "{User, Post}", text: "grouped import" }] }
          ]
        },
        {
          id: "autoloading", n: 3, title: "autoloading with spl_autoload_register", level: 2,
          gloss: "Loads class files on demand through a registered autoloader.",
          examples: [
            { code: `spl_autoload_register(function (string $class): void {
    echo "loading $class\\n";
});
class_exists('App\\Missing');`, notes: [{ at: "spl_autoload_register", text: "called for unknown classes" }] },
            { code: `spl_autoload_register(function (string $class): void {
    $file = __DIR__ . '/src/' . str_replace('\\\\', '/', $class) . '.php';
    if (is_file($file)) {
        require $file;
    }
});`, notes: [{ at: "str_replace", text: "namespace to path" }] },
            { code: `$loader = function (string $class): void {
    $path = str_replace('\\\\', DIRECTORY_SEPARATOR, $class);
    echo "$path.php\\n";
};
spl_autoload_register($loader);
class_exists('Shop\\Cart');`, notes: [] }
          ]
        },
        {
          id: "names-and-class-constant", n: 4, title: "::class and namespace constants", level: 2,
          gloss: "Resolves names with ::class, __NAMESPACE__ and fully qualified calls.",
          examples: [
            { code: `namespace App\\Models;

class Order {}
echo __NAMESPACE__, "\\n", Order::class;`, notes: [{ at: "__NAMESPACE__", text: "current namespace" }] },
            { code: `namespace App;

echo \\strlen('abc');
echo \\PHP_VERSION_ID > 80000 ? 'modern' : 'old';`, notes: [{ at: "\\strlen", text: "global function" }] },
            { code: `namespace App;

$class = 'App\\Models\\User';
var_dump(class_exists($class));`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "null-safe-null-coalescing",
      n: 10,
      title: "null-safe & null coalescing",
      concepts: [
        {
          id: "null-coalescing", n: 1, title: "null coalescing", level: 1,
          gloss: "Supplies a default when a value is null or missing with the double question mark.",
          examples: [
            { code: `$name = $_GET['name'] ?? 'guest';
echo $name;`, notes: [{ at: "??", text: "no warning on a missing key" }] },
            { code: `$config = ['debug' => false];
$level = $config['level'] ?? 'info';
echo $level;`, notes: [] },
            { code: `$user = null;
$user ??= ['name' => 'ada'];
echo $user['name'];`, notes: [{ at: "??=", text: "assigns only when null" }] }
          ]
        },
        {
          id: "null-safe-operator", n: 2, title: "null-safe operator", level: 2,
          gloss: "Stops a method or property chain at null with the question-arrow operator.",
          examples: [
            { code: `class Profile { public ?string $email = null; }
$profile = new Profile();
echo $profile?->email ?? 'none';`, notes: [{ at: "?->", text: "short-circuits on null" }] },
            { code: `$user = null;
var_dump($user?->name);`, notes: [] },
            { code: `class Address
{
    public function __construct(public ?string $city = null) {}
}
class User
{
    public function __construct(public ?Address $address = null) {}
}
$user = new User();
echo $user?->address?->city ?? 'unknown';`, notes: [{ at: "?->address?->", text: "chains stay safe" }] }
          ]
        },
        {
          id: "nullable-types", n: 3, title: "nullable types and checks", level: 1,
          gloss: "Declares optional values with a question mark and tests them with isset and empty.",
          examples: [
            { code: `function find(array $users, int $id): ?string
{
    return $users[$id] ?? null;
}`, notes: [{ at: "?string", text: "string or null" }] },
            { code: `$value = null;
var_dump(isset($value), is_null($value), empty($value));`, notes: [{ at: "isset", text: "false for null" }] },
            { code: `function describe(?int $age = null): string
{
    return $age === null ? 'unknown' : "$age years";
}`, notes: [] }
          ]
        },
        {
          id: "nested-defaults", n: 4, title: "defaults for nested data", level: 2,
          gloss: "Reads deep array keys and chains fallbacks with the coalescing operator.",
          examples: [
            { code: `$settings = ['db' => ['host' => 'localhost']];
echo $settings['db']['port'] ?? 3306;`, notes: [{ at: "??", text: "works through missing levels" }] },
            { code: `$items = ['a' => 1];
echo $items['b'] ?? $items['a'] ?? 0;`, notes: [{ at: "?? $items", text: "chains left to right" }] },
            { code: `function pick(?array $opts): string
{
    return $opts['mode'] ?? 'default';
}
echo pick(null);`, notes: [] }
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
          id: "try-catch", n: 1, title: "try and catch", level: 1,
          gloss: "Handles errors thrown by the engine or by library code.",
          examples: [
            { code: `try {
    $result = intdiv(10, 0);
} catch (DivisionByZeroError $e) {
    echo 'cannot divide: ', $e->getMessage();
}`, notes: [{ at: "catch", text: "receives the thrown object" }] },
            { code: `try {
    new DateTimeImmutable('not a date');
} catch (Exception $e) {
    echo 'invalid date';
}`, notes: [] },
            { code: `try {
    json_decode('{', flags: JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    echo $e->getMessage();
}`, notes: [{ at: "JSON_THROW_ON_ERROR", text: "errors become exceptions" }] }
          ]
        },
        {
          id: "throwing", n: 2, title: "throwing exceptions", level: 1,
          gloss: "Signals failure with throw and a fitting exception class.",
          examples: [
            { code: `function withdraw(float $balance, float $amount): float
{
    if ($amount > $balance) {
        throw new RuntimeException('insufficient funds');
    }
    return $balance - $amount;
}`, notes: [{ at: "throw", text: "an expression since PHP 8" }] },
            { code: `function parseAge(int $age): int
{
    return $age >= 0 ? $age : throw new RangeException('negative age');
}
echo parseAge(30);`, notes: [{ at: "throw", text: "usable inside an expression" }] },
            { code: `function load(int $id): never
{
    throw new LogicException("item $id missing");
}`, notes: [{ at: "never", text: "function cannot return" }] }
          ]
        },
        {
          id: "custom-exceptions", n: 3, title: "custom exceptions", level: 2,
          gloss: "Extends built-in exceptions to carry extra data.",
          examples: [
            { code: `class ValidationException extends InvalidArgumentException
{
    public function __construct(public readonly string $field)
    {
        parent::__construct("invalid $field");
    }
}`, notes: [{ at: "extends", text: "inherits getMessage" }] },
            { code: `class NotFound extends Exception {}
try {
    throw new NotFound('user 7 missing');
} catch (NotFound $e) {
    echo $e->getMessage();
}`, notes: [] },
            { code: `final class PaymentFailed extends RuntimeException
{
    public function __construct(string $reason, private int $amount)
    {
        parent::__construct($reason);
    }
    public function amount(): int { return $this->amount; }
}`, notes: [] }
          ]
        },
        {
          id: "finally-and-chaining", n: 4, title: "finally, multi-catch and chaining", level: 2,
          gloss: "Runs cleanup with finally, catches several types and wraps causes.",
          examples: [
            { code: `try {
    echo 'work';
} finally {
    echo 'cleanup';
}`, notes: [{ at: "finally", text: "always runs" }] },
            { code: `try {
    throw new TypeError('bad type');
} catch (TypeError | ValueError $e) {
    echo get_class($e);
}`, notes: [{ at: "TypeError | ValueError", text: "one handler, two types" }] },
            { code: `try {
    try {
        throw new RuntimeException('inner');
    } catch (RuntimeException $e) {
        throw new LogicException('outer', 0, $e);
    }
} catch (LogicException $e) {
    echo $e->getPrevious()->getMessage();
}`, notes: [{ at: "getPrevious", text: "the wrapped cause" }] }
          ]
        }
      ]
    },
    {
      id: "pdo-prepared-statements",
      n: 12,
      title: "PDO & prepared statements",
      concepts: [
        {
          id: "connecting", n: 1, title: "connecting with PDO", level: 2,
          gloss: "Opens a database connection and configures error handling.",
          examples: [
            { code: `$pdo = new PDO('sqlite::memory:');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->exec('CREATE TABLE users (id INTEGER, name TEXT)');`, notes: [{ at: "ERRMODE_EXCEPTION", text: "failures throw" }] },
            { code: `$pdo = new PDO('sqlite::memory:', options: [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);`, notes: [{ at: "options:", text: "named argument" }] },
            { code: `$pdo = new PDO('sqlite::memory:');
echo $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);`, notes: [{ at: "sqlite::memory:", text: "dsn for a temporary database" }] }
          ]
        },
        {
          id: "prepared-statements", n: 2, title: "prepared statements", level: 2,
          gloss: "Sends user data separately from SQL with placeholders.",
          examples: [
            { code: `$pdo = new PDO('sqlite::memory:');
$pdo->exec('CREATE TABLE users (id INTEGER, name TEXT)');
$stmt = $pdo->prepare('INSERT INTO users (id, name) VALUES (?, ?)');
$stmt->execute([1, 'ada']);`, notes: [{ at: "?", text: "positional placeholder" }] },
            { code: `$pdo = new PDO('sqlite::memory:');
$pdo->exec('CREATE TABLE users (name TEXT)');
$stmt = $pdo->prepare('INSERT INTO users (name) VALUES (:name)');
$stmt->execute(['name' => 'grace']);`, notes: [{ at: ":name", text: "named placeholder" }] },
            { code: `$pdo = new PDO('sqlite::memory:');
$pdo->exec('CREATE TABLE users (name TEXT)');
$stmt = $pdo->prepare('SELECT * FROM users WHERE name = :name');
$stmt->bindValue(':name', 'ada', PDO::PARAM_STR);
$stmt->execute();`, notes: [{ at: "bindValue", text: "explicit parameter type" }] }
          ]
        },
        {
          id: "fetching-results", n: 3, title: "fetching results", level: 2,
          gloss: "Reads rows as arrays with fetch, fetchAll and fetchColumn.",
          examples: [
            { code: `$pdo = new PDO('sqlite::memory:');
$pdo->exec('CREATE TABLE users (name TEXT)');
$pdo->exec("INSERT INTO users VALUES ('ada')");
$query = $pdo->query('SELECT name FROM users');
print_r($query->fetchAll(PDO::FETCH_ASSOC));`, notes: [{ at: "fetchAll", text: "every row at once" }] },
            { code: `$pdo = new PDO('sqlite::memory:');
$pdo->exec("CREATE TABLE users (id INTEGER, name TEXT)");
$pdo->exec("INSERT INTO users VALUES (1, 'ada')");
$stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
$stmt->execute([1]);
print_r($stmt->fetch(PDO::FETCH_ASSOC));`, notes: [{ at: "fetch", text: "one row" }] },
            { code: `$pdo = new PDO('sqlite::memory:');
$pdo->exec("CREATE TABLE users (name TEXT)");
$pdo->exec("INSERT INTO users VALUES ('ada'), ('grace')");
echo $pdo->query('SELECT COUNT(*) FROM users')->fetchColumn();`, notes: [{ at: "fetchColumn", text: "first column of one row" }] }
          ]
        },
        {
          id: "transactions", n: 4, title: "transactions", level: 3,
          gloss: "Groups statements so they all succeed or all roll back.",
          examples: [
            { code: `$pdo = new PDO('sqlite::memory:');
$pdo->exec('CREATE TABLE accounts (id INTEGER, balance INTEGER)');
$pdo->beginTransaction();
$pdo->exec('INSERT INTO accounts VALUES (1, 100)');
$pdo->commit();
echo $pdo->query('SELECT COUNT(*) FROM accounts')->fetchColumn();`, notes: [{ at: "commit", text: "makes changes permanent" }] },
            { code: `$pdo = new PDO('sqlite::memory:');
$pdo->exec('CREATE TABLE accounts (balance INTEGER)');
$pdo->beginTransaction();
$pdo->exec('INSERT INTO accounts VALUES (100)');
$pdo->rollBack();
echo $pdo->query('SELECT COUNT(*) FROM accounts')->fetchColumn();`, notes: [{ at: "rollBack", text: "discards changes" }] },
            { code: `$pdo = new PDO('sqlite::memory:');
$pdo->exec('CREATE TABLE notes (id INTEGER PRIMARY KEY, body TEXT)');
$stmt = $pdo->prepare('INSERT INTO notes (body) VALUES (?)');
$stmt->execute(['first']);
echo $pdo->lastInsertId();`, notes: [{ at: "lastInsertId", text: "id of the new row" }] }
          ]
        }
      ]
    },
    {
      id: "files-json",
      n: 13,
      title: "files & JSON",
      concepts: [
        {
          id: "reading-writing-files", n: 1, title: "reading and writing files", level: 1,
          gloss: "Saves and loads whole files with file_put_contents and file_get_contents.",
          examples: [
            { code: `$path = sys_get_temp_dir() . '/notes.txt';
file_put_contents($path, "first\\nsecond\\n");
echo file_get_contents($path);`, notes: [{ at: "sys_get_temp_dir", text: "portable temp folder" }] },
            { code: `$path = sys_get_temp_dir() . '/log.txt';
file_put_contents($path, "start\\n", FILE_APPEND);
file_put_contents($path, "end\\n", FILE_APPEND);
print_r(file($path, FILE_IGNORE_NEW_LINES));`, notes: [{ at: "FILE_APPEND", text: "adds instead of replacing" }, { at: "file", text: "lines as an array" }] },
            { code: `$path = sys_get_temp_dir() . '/data.txt';
file_put_contents($path, 'x');
var_dump(file_exists($path), filesize($path));
unlink($path);`, notes: [] }
          ]
        },
        {
          id: "file-handles", n: 2, title: "file handles", level: 2,
          gloss: "Streams data line by line with fopen, fgets and fclose.",
          examples: [
            { code: `$handle = fopen('php://memory', 'w+');
fwrite($handle, "a\\nb\\n");
rewind($handle);
while (($line = fgets($handle)) !== false) {
    echo trim($line);
}
fclose($handle);`, notes: [{ at: "fgets", text: "one line, false at the end" }] },
            { code: `$out = fopen('php://memory', 'w+');
fputcsv($out, ['ada', 36]);
fputcsv($out, ['grace', 30]);
rewind($out);
echo stream_get_contents($out);`, notes: [{ at: "fputcsv", text: "writes one CSV row" }] },
            { code: `$in = fopen('php://memory', 'w+');
fwrite($in, "ada,36\\ngrace,30\\n");
rewind($in);
while (($row = fgetcsv($in)) !== false) {
    echo $row[0], ' is ', $row[1], PHP_EOL;
}`, notes: [{ at: "fgetcsv", text: "parses a CSV row" }] }
          ]
        },
        {
          id: "json-encode-decode", n: 3, title: "encoding and decoding JSON", level: 1,
          gloss: "Converts arrays to JSON text and back.",
          examples: [
            { code: `$user = ['name' => 'ada', 'age' => 36];
echo json_encode($user);`, notes: [{ at: "json_encode", text: "array to JSON" }] },
            { code: `$json = '{"name":"ada","tags":["a","b"]}';
$data = json_decode($json, true);
echo $data['tags'][1];`, notes: [{ at: "true", text: "decode objects as arrays" }] },
            { code: `$order = ['id' => 7, 'items' => ['tea', 'cake']];
echo json_encode($order, JSON_PRETTY_PRINT);`, notes: [] }
          ]
        },
        {
          id: "json-errors-objects", n: 4, title: "JSON errors and objects", level: 2,
          gloss: "Validates JSON, reports errors and serialises objects.",
          examples: [
            { code: `$data = json_decode('{"a":1}');
echo $data->a;`, notes: [{ at: "json_decode", text: "objects by default" }] },
            { code: `try {
    json_decode('{bad', false, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    echo $e->getMessage();
}`, notes: [] },
            { code: `var_dump(json_validate('{"a":1}'));
var_dump(json_validate('{a:1}'));`, notes: [{ at: "json_validate", text: "checks syntax only, PHP 8.3" }] },
            { code: `class Point implements JsonSerializable
{
    public function __construct(private int $x, private int $y) {}
    public function jsonSerialize(): array
    {
        return ['x' => $this->x, 'y' => $this->y];
    }
}
echo json_encode(new Point(1, 2));`, notes: [{ at: "JsonSerializable", text: "controls the output" }] }
          ]
        }
      ]
    },
    {
      id: "readonly-type-declarations",
      n: 14,
      title: "readonly & type declarations",
      concepts: [
        {
          id: "scalar-declarations", n: 1, title: "parameter and return types", level: 1,
          gloss: "Declares parameter and return types and opts into strict typing.",
          examples: [
            { code: `declare(strict_types=1);

function half(int $n): float
{
    return $n / 2;
}
echo half(5);`, notes: [{ at: "strict_types", text: "no silent coercion" }] },
            { code: `function label(int|string $id): string
{
    return "#$id";
}
echo label(7), label('x');`, notes: [{ at: "int|string", text: "union type" }] },
            { code: `function parse(?string $raw = null): int|false
{
    return $raw === null ? false : (int) $raw;
}
var_dump(parse('12'));`, notes: [{ at: "int|false", text: "union with false" }] }
          ]
        },
        {
          id: "union-intersection-mixed", n: 2, title: "union, intersection and mixed types", level: 2,
          gloss: "Combines types with pipes and ampersands or accepts anything with mixed.",
          examples: [
            { code: `function describe(int|float $n): string
{
    return "number $n";
}
echo describe(2.5);`, notes: [] },
            { code: `function dump(mixed $value): void
{
    var_dump($value);
}
dump([1, 2]);`, notes: [{ at: "mixed", text: "any value" }] },
            { code: `function size(Countable&Traversable $items): int
{
    return count($items);
}
echo size(new ArrayIterator([1, 2, 3]));`, notes: [{ at: "&", text: "must satisfy both types" }] }
          ]
        },
        {
          id: "readonly-properties", n: 3, title: "readonly properties and classes", level: 2,
          gloss: "Locks properties after construction with readonly.",
          examples: [
            { code: `class User
{
    public function __construct(public readonly string $name) {}
}
$user = new User('ada');
echo $user->name;`, notes: [{ at: "readonly", text: "assigned once" }] },
            { code: `final class Money
{
    public function __construct(
        public readonly int $amount,
        public readonly string $currency,
    ) {}
}`, notes: [] },
            { code: `readonly class Point
{
    public function __construct(public int $x, public int $y) {}
}
$p = new Point(1, 2);
try { $p->x = 5; } catch (Error $e) { echo $e->getMessage(); }`, notes: [{ at: "readonly class", text: "every property readonly" }] }
          ]
        },
        {
          id: "return-types", n: 4, title: "special return types", level: 2,
          gloss: "Uses static, void and never to describe what a method returns.",
          examples: [
            { code: `class Builder
{
    private array $parts = [];
    public function add(string $p): static
    {
        $this->parts[] = $p;
        return $this;
    }
}`, notes: [{ at: "static", text: "returns the same class" }] },
            { code: `function fail(string $msg): never
{
    throw new RuntimeException($msg);
}`, notes: [] },
            { code: `function maybe(bool $found): ?int
{
    return $found ? 42 : null;
}
var_dump(maybe(false));`, notes: [{ at: "?int", text: "int or null" }] }
          ]
        }
      ]
    }
  ]
};
