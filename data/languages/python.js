export default {
  id: "python",
  name: "Python",
  short: "PY",
  pigment: "python",
  family: null,
  version: "3.12",
  lexer: "python",
  indent: 4,
  topics: [
    {
      id: "values-types",
      n: 1,
      title: "values & types",
      concepts: [
        {
          id: "assignment",
          n: 1,
          title: "assignment",
          level: 1,
          gloss: "Binds a name to a value with a single equals sign.",
          examples: [
            {
              code: `width = 80  # columns
height = 24`,
              notes: [{ at: "width", text: "the name goes on the left" }]
            },
            {
              code: `title = "Dune"
pages = 412
in_stock = True`,
              notes: [{ at: "True", text: "booleans are capitalized" }]
            },
            {
              code: `count = 10
count = count + 1`,
              notes: [{ at: "count + 1", text: "reads the old value first" }]
            }
          ]
        },
        {
          id: "conversion",
          n: 2,
          title: "conversion",
          level: 1,
          gloss: "Converts a value to another type by calling the type like a function.",
          examples: [
            { code: `age = int("42")`, notes: [{ at: 'int("42")', text: "text to whole number" }] },
            {
              code: `ratio = float("3.5")
label = str(404)`,
              notes: [{ at: "str(404)", text: "number to text" }]
            },
            {
              code: `count = int(input("how many? "))`,
              notes: [{ at: "input(", text: "always returns text" }]
            }
          ]
        },
        {
          id: "none-checks",
          n: 3,
          title: "none checks",
          level: 2,
          gloss: "Tests for a missing value with is None instead of ==.",
          examples: [
            {
              code: `if result is None:
    print("no result")`,
              notes: [{ at: "is None", text: "identity test, not equality" }]
            },
            {
              code: `name = None
if name is not None:
    print(name.upper())`,
              notes: [{ at: "is not None", text: "guards the call below" }]
            },
            {
              code: `user = None
status = "guest" if user is None else "member"`,
              notes: []
            }
          ]
        },
        {
          id: "division",
          n: 4,
          title: "division",
          level: 1,
          gloss: "Divides with / for a float and with // for a whole-number quotient.",
          examples: [
            {
              code: `half = 7 / 2
whole = 7 // 2`,
              notes: [{ at: "7 // 2", text: "floors to 3" }]
            },
            {
              code: `minutes = 135 // 60
left = 135 % 60`,
              notes: [{ at: "%", text: "remainder after dividing" }]
            },
            {
              code: `average = total / count
whole = total // count`,
              notes: []
            }
          ]
        }
      ]
    },
    {
      id: "strings",
      n: 2,
      title: "strings & f-strings",
      concepts: [
        {
          id: "f-string",
          n: 1,
          title: "f-string",
          level: 1,
          gloss: "Embeds expressions directly inside a string literal with an f prefix.",
          examples: [
            { code: `greeting = f"hello, {name}"`, notes: [{ at: "{name}", text: "value is inserted here" }] },
            { code: `line = f"{item}: {qty * price}"`, notes: [{ at: "qty * price", text: "any expression works" }] },
            { code: `label = f"{user.name} ({user.age})"`, notes: [] }
          ]
        },
        {
          id: "format-spec",
          n: 2,
          title: "format spec",
          level: 2,
          gloss: "Formats a number inside an f-string with a colon and a spec.",
          examples: [
            { code: `print(f"{ratio:.2f}")`, notes: [{ at: ".2f", text: "two decimal places" }] },
            { code: `print(f"{count:05d}")`, notes: [{ at: "05d", text: "zero-padded to 5 digits" }] },
            { code: `print(f"{share:.1%}")`, notes: [{ at: ".1%", text: "percent, one decimal" }] }
          ]
        },
        {
          id: "string-methods",
          n: 3,
          title: "string methods",
          level: 1,
          gloss: "Transforms text with methods that return a new string.",
          examples: [
            { code: `clean = raw.strip().lower()`, notes: [{ at: ".strip()", text: "trims both ends" }] },
            {
              code: `slug = title.lower().replace(" ", "-")`,
              notes: [{ at: "replace", text: "swaps every match" }]
            },
            { code: `ending = name.title() + "."`, notes: [] }
          ]
        },
        {
          id: "split-join",
          n: 4,
          title: "split and join",
          level: 1,
          gloss: "Splits text into a list and joins a list back into text.",
          examples: [
            { code: `words = sentence.split()`, notes: [{ at: "split()", text: "splits on any whitespace" }] },
            { code: `csv_line = ",".join(fields)`, notes: [{ at: '","', text: "the separator comes first" }] },
            {
              code: `tags = "a,b,c".split(",")
back = "-".join(tags)`,
              notes: []
            }
          ]
        }
      ]
    },
    {
      id: "lists-slicing",
      n: 3,
      title: "lists & slicing",
      concepts: [
        {
          id: "list-literal",
          n: 1,
          title: "list literal",
          level: 1,
          gloss: "Creates a list and reads items by zero-based index.",
          examples: [
            {
              code: `fruits = ["apple", "pear", "plum"]
first = fruits[0]`,
              notes: [{ at: "[0]", text: "index starts at zero" }]
            },
            {
              code: `scores = [90, 72, 85]
last = scores[-1]`,
              notes: [{ at: "[-1]", text: "counts from the end" }]
            },
            {
              code: `grid = [[1, 2], [3, 4]]
value = grid[1][0]`,
              notes: [{ at: "[1][0]", text: "row first, then column" }]
            }
          ]
        },
        {
          id: "append-extend",
          n: 2,
          title: "append and extend",
          level: 1,
          gloss: "Adds one item with append and many items with extend.",
          examples: [
            { code: `queue.append(task)`, notes: [{ at: "append", text: "adds a single item" }] },
            { code: `names.extend(["lin", "sam"])`, notes: [{ at: "extend", text: "adds each item in turn" }] },
            {
              code: `stack = [1, 2]
stack.append(3)
stack.extend([4, 5])`,
              notes: []
            }
          ]
        },
        {
          id: "slicing",
          n: 3,
          title: "slicing",
          level: 1,
          gloss: "Takes a sub-list with start:stop, where stop is excluded.",
          examples: [
            { code: `head = items[:3]`, notes: [{ at: "[:3]", text: "first three items" }] },
            { code: `tail = items[2:]`, notes: [{ at: "[2:]", text: "from index 2 onward" }] },
            { code: `middle = items[1:-1]`, notes: [{ at: "-1", text: "stops before the last item" }] }
          ]
        },
        {
          id: "slice-step",
          n: 4,
          title: "slice step",
          level: 2,
          gloss: "Steps through a list with a third slice value, even backwards.",
          examples: [
            { code: `evens = numbers[::2]`, notes: [{ at: "::2", text: "every second item" }] },
            { code: `backwards = numbers[::-1]`, notes: [{ at: "::-1", text: "reversed copy" }] },
            { code: `sample = numbers[1:8:3]`, notes: [{ at: "1:8:3", text: "start, stop, step" }] }
          ]
        }
      ]
    },
    {
      id: "tuples-unpacking",
      n: 4,
      title: "tuples & unpacking",
      concepts: [
        {
          id: "tuple-literal", n: 1, title: "tuple literal", level: 1,
          gloss: "Groups fixed values into a tuple that cannot be changed.",
          examples: [
            { code: `origin = (0, 0)`, notes: [{ at: "(0, 0)", text: "immutable pair" }] },
            { code: `rgb = (255, 128, 0)
red = rgb[0]`, notes: [{ at: "rgb[0]", text: "index like a list" }] },
            { code: `single = (42,)`, notes: [{ at: ",", text: "the comma makes the tuple" }] }
          ]
        },
        {
          id: "unpacking", n: 2, title: "unpacking", level: 1,
          gloss: "Assigns each item of a tuple to its own name in one statement.",
          examples: [
            { code: `x, y = (3, 4)`, notes: [{ at: "x, y", text: "one name per item" }] },
            { code: `name, age = user_record`, notes: [] },
            { code: `a, b = b, a`, notes: [{ at: "b, a", text: "swaps without a temp variable" }] }
          ]
        },
        {
          id: "star-unpacking", n: 3, title: "star unpacking", level: 2,
          gloss: "Collects the leftover items into a list with a starred name.",
          examples: [
            { code: `first, *rest = scores`, notes: [{ at: "*rest", text: "takes everything else" }] },
            { code: `head, *middle, tail = readings`, notes: [{ at: "*middle", text: "always a list" }] },
            { code: `*init, last = path_parts`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "dicts",
      n: 5,
      title: "dicts",
      concepts: [
        {
          id: "dict-literal", n: 1, title: "dict literal", level: 1,
          gloss: "Maps keys to values with curly braces and colons.",
          examples: [
            { code: `user = {"name": "Ada", "age": 36}`, notes: [{ at: '"name"', text: "a key" }] },
            { code: `prices = {"apple": 0.5, "pear": 0.75}
cost = prices["pear"]`, notes: [{ at: 'prices["pear"]', text: "lookup by key" }] },
            { code: `config = dict(host="localhost", port=8080)`, notes: [{ at: "dict(", text: "keywords become keys" }] }
          ]
        },
        {
          id: "dict-get", n: 2, title: "get with default", level: 1,
          gloss: "Reads a key without raising an error when it is missing.",
          examples: [
            { code: `port = config.get("port", 80)`, notes: [{ at: "80", text: "fallback value" }] },
            { code: `nickname = user.get("nickname")`, notes: [{ at: ".get(", text: "returns None when missing" }] },
            { code: `retries = settings.get("retries", 3) + 1`, notes: [] }
          ]
        },
        {
          id: "dict-iteration", n: 3, title: "dict iteration", level: 1,
          gloss: "Loops over keys, values or pairs with keys, values and items.",
          examples: [
            { code: `for name, score in scores.items():
    print(name, score)`, notes: [{ at: ".items()", text: "yields key and value pairs" }] },
            { code: `total = sum(prices.values())`, notes: [{ at: ".values()", text: "values only" }] },
            { code: `for key in settings:
    print(key)`, notes: [{ at: "in settings", text: "iterating a dict yields keys" }] }
          ]
        },
        {
          id: "dict-merge", n: 4, title: "merging dicts", level: 2,
          gloss: "Combines two dicts into one with the pipe operator or update.",
          examples: [
            { code: `merged = defaults | overrides`, notes: [{ at: "|", text: "right side wins on conflicts" }] },
            { code: `settings |= {"debug": True}`, notes: [{ at: "|=", text: "updates in place" }] },
            { code: `config.update(host="0.0.0.0", port=9000)`, notes: [{ at: ".update(", text: "mutates the original dict" }] }
          ]
        }
      ]
    },
    {
      id: "sets",
      n: 6,
      title: "sets",
      concepts: [
        {
          id: "set-literal", n: 1, title: "set literal", level: 1,
          gloss: "Stores unique values in an unordered set.",
          examples: [
            { code: `tags = {"python", "typing", "python"}`, notes: [{ at: '"python"', nth: 1, text: "duplicates collapse" }] },
            { code: `unique_ids = set(user_ids)`, notes: [{ at: "set(", text: "removes duplicates" }] },
            { code: `empty = set()`, notes: [{ at: "set()", text: "{} would make a dict" }] }
          ]
        },
        {
          id: "set-operations", n: 2, title: "set operations", level: 2,
          gloss: "Combines sets with union, intersection and difference operators.",
          examples: [
            { code: `both = admins & editors`, notes: [{ at: "&", text: "in both sets" }] },
            { code: `everyone = admins | editors`, notes: [{ at: "|", text: "in either set" }] },
            { code: `only_admins = admins - editors`, notes: [{ at: "-", text: "in the first set only" }] }
          ]
        },
        {
          id: "membership", n: 3, title: "membership tests", level: 1,
          gloss: "Checks whether a value is present with in, which is fast on sets.",
          examples: [
            { code: `if user_id in banned:
    deny_access()`, notes: [{ at: "in banned", text: "constant time on average" }] },
            { code: `allowed = ext in {".png", ".jpg", ".gif"}`, notes: [] },
            { code: `if token not in seen:
    seen.add(token)`, notes: [{ at: "not in", text: "negated membership test" }] }
          ]
        }
      ]
    },
    {
      id: "conditionals-match",
      n: 7,
      title: "conditionals & match",
      concepts: [
        {
          id: "if-elif-else", n: 1, title: "if elif else", level: 1,
          gloss: "Chooses one branch of code based on a chain of conditions.",
          examples: [
            { code: `if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"`, notes: [{ at: "elif", text: "checked only if the first fails" }] },
            { code: `if not items:
    print("nothing to do")
else:
    process(items)`, notes: [{ at: "not items", text: "empty lists are falsy" }] },
            { code: `if 0 < age < 18:
    category = "minor"`, notes: [{ at: "0 < age < 18", text: "chained comparison" }] }
          ]
        },
        {
          id: "conditional-expression", n: 2, title: "conditional expression", level: 1,
          gloss: "Picks one of two values inline with if and else.",
          examples: [
            { code: `label = "even" if n % 2 == 0 else "odd"`, notes: [{ at: "if n % 2 == 0", text: "the condition sits in the middle" }] },
            { code: `shown = name if name else "anonymous"`, notes: [] },
            { code: `delay = base * (2 if retry else 1)`, notes: [] }
          ]
        },
        {
          id: "boolean-operators", n: 3, title: "boolean operators", level: 1,
          gloss: "Combines conditions with and, or and not.",
          examples: [
            { code: `if is_admin or (is_owner and not is_locked):
    allow()`, notes: [{ at: "and not", text: "not binds tighter than and" }] },
            { code: `title = user_title or "member"`, notes: [{ at: "or", text: "falls back when falsy" }] },
            { code: `ready = connected and authenticated`, notes: [{ at: "and", text: "stops at the first falsy value" }] }
          ]
        },
        {
          id: "match-statement", n: 4, title: "match statement", level: 2,
          gloss: "Branches on the shape of a value with structural pattern matching.",
          examples: [
            { code: `match command:
    case "start":
        run()
    case "stop":
        halt()
    case _:
        print("unknown")`, notes: [{ at: "_", text: "wildcard matches anything" }] },
            { code: `match point:
    case (0, 0):
        print("origin")
    case (x, 0):
        print(f"on x axis at {x}")`, notes: [{ at: "(x, 0)", text: "binds x when y is zero" }] },
            { code: `match event:
    case {"type": "click", "pos": (x, y)}:
        handle_click(x, y)`, notes: [{ at: '"pos": (x, y)', text: "matches and unpacks the value" }] }
          ]
        }
      ]
    },
    {
      id: "loops",
      n: 8,
      title: "loops",
      concepts: [
        {
          id: "for-range", n: 1, title: "for with range", level: 1,
          gloss: "Repeats a block a fixed number of times with range.",
          examples: [
            { code: `for i in range(5):
    print(i)`, notes: [{ at: "range(5)", text: "0 through 4" }] },
            { code: `for day in range(1, 8):
    schedule(day)`, notes: [{ at: "range(1, 8)", text: "stop is excluded" }] },
            { code: `for tick in range(10, 0, -2):
    countdown(tick)`, notes: [{ at: "-2", text: "negative step counts down" }] }
          ]
        },
        {
          id: "enumerate", n: 2, title: "enumerate", level: 1,
          gloss: "Pairs each item with its index while looping.",
          examples: [
            { code: `for i, line in enumerate(lines):
    print(i, line)`, notes: [{ at: "enumerate(lines)", text: "yields index and item" }] },
            { code: `for rank, name in enumerate(leaders, start=1):
    print(rank, name)`, notes: [{ at: "start=1", text: "the first index is 1" }] },
            { code: `for n, row in enumerate(rows):
    if n == 0:
        continue
    parse(row)`, notes: [{ at: "continue", text: "skips to the next item" }] }
          ]
        },
        {
          id: "zip", n: 3, title: "zip", level: 1,
          gloss: "Walks several iterables in parallel with zip.",
          examples: [
            { code: `for name, score in zip(names, scores):
    print(name, score)`, notes: [{ at: "zip(names, scores)", text: "stops at the shortest" }] },
            { code: `pairs = dict(zip(keys, values))`, notes: [{ at: "zip(keys, values)", text: "builds a dict from two lists" }] },
            { code: `for a, b in zip(xs, xs[1:]):
    gaps.append(b - a)`, notes: [{ at: "xs[1:]", text: "the list shifted by one" }] }
          ]
        },
        {
          id: "while-loop", n: 4, title: "while loop", level: 1,
          gloss: "Repeats a block while a condition stays true.",
          examples: [
            { code: `while queue:
    task = queue.pop()
    run(task)`, notes: [{ at: "while queue", text: "loops until the list is empty" }] },
            { code: `attempts = 0
while attempts < 3:
    attempts += 1`, notes: [] },
            { code: `while True:
    line = input("> ")
    if line == "quit":
        break`, notes: [{ at: "break", text: "leaves the loop" }] }
          ]
        }
      ]
    },
    {
      id: "comprehensions",
      n: 9,
      title: "comprehensions",
      concepts: [
        {
          id: "list-comp", n: 1, title: "list comprehension", level: 1,
          gloss: "Builds a new list by transforming each item of an iterable.",
          examples: [
            { code: `squares = [n * n for n in range(10)]`, notes: [{ at: "range(10)", text: "source: 0 to 9" }] },
            { code: `names = [user.name for user in users]`, notes: [] },
            { code: `upper = [s.upper() for s in words if s]`, notes: [{ at: "if s", text: "skips empty strings" }] }
          ]
        },
        {
          id: "dict-comp", n: 2, title: "dict comprehension", level: 2,
          gloss: "Builds a dict from key and value expressions in one line.",
          examples: [
            { code: `lengths = {w: len(w) for w in words}`, notes: [{ at: "w: len(w)", text: "key: value" }] },
            { code: `by_id = {u.id: u for u in users}`, notes: [] },
            { code: `inverted = {v: k for k, v in mapping.items()}`, notes: [{ at: "k, v", text: "unpacks each pair" }] }
          ]
        },
        {
          id: "set-comp", n: 3, title: "set comprehension", level: 2,
          gloss: "Builds a set of unique results with braces and a for clause.",
          examples: [
            { code: `domains = {email.split("@")[1] for email in emails}`, notes: [{ at: 'split("@")[1]', text: "the text after the @" }] },
            { code: `seen = {ch.lower() for ch in text if ch.isalpha()}`, notes: [] },
            { code: `evens = {n for n in range(20) if n % 2 == 0}`, notes: [] }
          ]
        },
        {
          id: "generator-expression", n: 4, title: "generator expression", level: 2,
          gloss: "Produces items lazily with parentheses instead of building a list.",
          examples: [
            { code: `total = sum(price * qty for price, qty in cart)`, notes: [{ at: "sum(", text: "no extra brackets needed" }] },
            { code: `has_admin = any(u.is_admin for u in users)`, notes: [{ at: "any(", text: "stops at the first match" }] },
            { code: `longest = max(len(line) for line in lines)`, notes: [] }
          ]
        },
        {
          id: "nested-comprehension", n: 5, title: "nested comprehension", level: 3,
          gloss: "Flattens or builds nested data with two for clauses in a row.",
          examples: [
            { code: `flat = [x for row in matrix for x in row]`, notes: [{ at: "for row in matrix for x in row", text: "the outer loop comes first" }] },
            { code: `pairs = [(a, b) for a in range(3) for b in range(3)]`, notes: [] },
            { code: `grid = [[0] * 4 for _ in range(3)]`, notes: [{ at: "_", text: "throwaway loop variable" }] }
          ]
        }
      ]
    },
    {
      id: "functions",
      n: 10,
      title: "functions",
      concepts: [
        {
          id: "def-return", n: 1, title: "defining functions", level: 1,
          gloss: "Packages reusable code in a function that returns a value.",
          examples: [
            { code: `def area(width, height):
    return width * height`, notes: [{ at: "return", text: "sends the result back" }] },
            { code: `def greet(name):
    return f"hello, {name}"`, notes: [] },
            { code: `def is_even(n):
    return n % 2 == 0`, notes: [] }
          ]
        },
        {
          id: "default-arguments", n: 2, title: "default arguments", level: 1,
          gloss: "Gives a parameter a fallback value used when the caller omits it.",
          examples: [
            { code: `def connect(host, port=5432):
    return open_socket(host, port)`, notes: [{ at: "port=5432", text: "used when not passed" }] },
            { code: `def paginate(items, size=20, page=1):
    start = (page - 1) * size
    return items[start:start + size]`, notes: [] },
            { code: `def log(msg, level="info"):
    print(f"[{level}] {msg}")`, notes: [] }
          ]
        },
        {
          id: "args-kwargs", n: 3, title: "args and kwargs", level: 2,
          gloss: "Accepts any number of positional or keyword arguments.",
          examples: [
            { code: `def total(*numbers):
    return sum(numbers)`, notes: [{ at: "*numbers", text: "collects extras into a tuple" }] },
            { code: `def tag(name, **attrs):
    return name, attrs`, notes: [{ at: "**attrs", text: "collects keywords into a dict" }] },
            { code: `def wrapper(*args, **kwargs):
    return func(*args, **kwargs)`, notes: [{ at: "func(*args, **kwargs)", text: "forwards every argument" }] }
          ]
        },
        {
          id: "keyword-only", n: 4, title: "keyword-only parameters", level: 2,
          gloss: "Forces callers to name certain arguments by placing them after a star.",
          examples: [
            { code: `def resize(image, *, width, height):
    return image.scale(width, height)`, notes: [{ at: "*,", text: "everything after must be named" }] },
            { code: `def fetch(url, *, timeout=10, retries=3):
    return get(url, timeout, retries)`, notes: [] },
            { code: `def save(path, *, overwrite=False):
    write(path, overwrite)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "lambdas-sorting",
      n: 11,
      title: "lambdas & sorting",
      concepts: [
        {
          id: "lambda", n: 1, title: "lambda expression", level: 1,
          gloss: "Creates a small anonymous function inline.",
          examples: [
            { code: `square = lambda n: n * n`, notes: [{ at: "lambda n", text: "parameters come before the colon" }] },
            { code: `add = lambda a, b: a + b`, notes: [] },
            { code: `is_adult = lambda user: user.age >= 18`, notes: [] }
          ]
        },
        {
          id: "sorted-key", n: 2, title: "sorting with key", level: 1,
          gloss: "Orders items by a computed value with the key argument.",
          examples: [
            { code: `ordered = sorted(words, key=len)`, notes: [{ at: "key=len", text: "sorts by length" }] },
            { code: `by_age = sorted(users, key=lambda u: u.age)`, notes: [] },
            { code: `ranked = sorted(scores, key=lambda s: s["points"], reverse=True)`, notes: [{ at: "reverse=True", text: "highest first" }] }
          ]
        },
        {
          id: "list-sort", n: 3, title: "list sort", level: 1,
          gloss: "Sorts a list in place and returns None.",
          examples: [
            { code: `names.sort()`, notes: [{ at: ".sort()", text: "modifies the list itself" }] },
            { code: `files.sort(key=lambda f: f.stat().st_size)`, notes: [] },
            { code: `rows.sort(key=lambda r: (r.city, r.name))`, notes: [{ at: "(r.city, r.name)", text: "sorts by city, then name" }] }
          ]
        },
        {
          id: "min-max-key", n: 4, title: "min and max with key", level: 2,
          gloss: "Finds the extreme item by a computed value.",
          examples: [
            { code: `cheapest = min(products, key=lambda p: p.price)`, notes: [] },
            { code: `oldest = max(users, key=lambda u: u.age)`, notes: [] },
            { code: `longest = max(lines, key=len, default="")`, notes: [{ at: 'default=""', text: "used when lines is empty" }] }
          ]
        },
        {
          id: "map-filter", n: 5, title: "map and filter", level: 2,
          gloss: "Applies a function to every item or keeps only the items that pass a test.",
          examples: [
            { code: `doubled = list(map(lambda n: n * 2, numbers))`, notes: [{ at: "list(", text: "map returns a lazy iterator" }] },
            { code: `evens = list(filter(lambda n: n % 2 == 0, numbers))`, notes: [] },
            { code: `names = list(map(str.strip, raw_names))`, notes: [{ at: "str.strip", text: "a method passed as a function" }] }
          ]
        }
      ]
    },
    {
      id: "classes",
      n: 12,
      title: "classes",
      concepts: [
        {
          id: "class-init", n: 1, title: "class and init", level: 1,
          gloss: "Defines a type whose instances are set up by __init__.",
          examples: [
            { code: `class Dog:
    def __init__(self, name):
        self.name = name`, notes: [{ at: "self.name", text: "stores state on the instance" }] },
            { code: `class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance`, notes: [] },
            { code: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height`, notes: [] }
          ]
        },
        {
          id: "instance-methods", n: 2, title: "instance methods", level: 1,
          gloss: "Adds behavior to a class with methods that take self.",
          examples: [
            { code: `class Counter:
    def __init__(self):
        self.value = 0

    def increment(self):
        self.value += 1`, notes: [{ at: "def increment(self)", text: "self is the instance" }] },
            { code: `class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2`, notes: [] },
            { code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)`, notes: [] }
          ]
        },
        {
          id: "properties", n: 3, title: "properties", level: 2,
          gloss: "Exposes a computed attribute with the property decorator.",
          examples: [
            { code: `class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def diameter(self):
        return self.radius * 2`, notes: [{ at: "@property", text: "read it without parentheses" }] },
            { code: `class User:
    def __init__(self, first, last):
        self.first = first
        self.last = last

    @property
    def full_name(self):
        return f"{self.first} {self.last}"`, notes: [] },
            { code: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9 / 5 + 32`, notes: [] }
          ]
        },
        {
          id: "inheritance", n: 4, title: "inheritance", level: 2,
          gloss: "Reuses a base class by listing it in parentheses and calling super.",
          examples: [
            { code: `class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "woof"`, notes: [{ at: "Dog(Animal)", text: "the subclass names its parent" }] },
            { code: `class Employee(Person):
    def __init__(self, name, salary):
        super().__init__(name)
        self.salary = salary`, notes: [{ at: "super()", text: "calls the parent class" }] },
            { code: `class AdminUser(User):
    def can_delete(self):
        return True`, notes: [] }
          ]
        },
        {
          id: "special-methods", n: 5, title: "special methods", level: 3,
          gloss: "Customizes built-in behavior with methods like __repr__ and __eq__.",
          examples: [
            { code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"`, notes: [{ at: "__repr__", text: "what print and the repl show" }] },
            { code: `class Version:
    def __init__(self, major, minor):
        self.major = major
        self.minor = minor

    def __eq__(self, other):
        return (self.major, self.minor) == (other.major, other.minor)`, notes: [] },
            { code: `class Playlist:
    def __init__(self, songs):
        self.songs = songs

    def __len__(self):
        return len(self.songs)`, notes: [{ at: "__len__", text: "makes len(playlist) work" }] }
          ]
        }
      ]
    },
    {
      id: "dataclasses",
      n: 13,
      title: "dataclasses",
      concepts: [
        {
          id: "dataclass", n: 1, title: "dataclass", level: 1,
          gloss: "Generates __init__ and __repr__ from annotated fields.",
          examples: [
            { code: `from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float`, notes: [{ at: "@dataclass", text: "writes __init__ for you" }] },
            { code: `@dataclass
class Order:
    id: int
    customer: str
    total: float`, notes: [] },
            { code: `@dataclass
class Config:
    host: str
    port: int
    debug: bool`, notes: [] }
          ]
        },
        {
          id: "field-defaults", n: 2, title: "field defaults", level: 1,
          gloss: "Gives dataclass fields default values, using field for mutable ones.",
          examples: [
            { code: `@dataclass
class Server:
    host: str = "localhost"
    port: int = 8080`, notes: [] },
            { code: `@dataclass
class Basket:
    items: list[str] = field(default_factory=list)`, notes: [{ at: "default_factory=list", text: "a new list per instance" }] },
            { code: `@dataclass
class Job:
    name: str
    retries: int = 3
    tags: list[str] = field(default_factory=list)`, notes: [] }
          ]
        },
        {
          id: "frozen-order", n: 3, title: "frozen and ordered", level: 2,
          gloss: "Makes instances immutable or sortable with decorator arguments.",
          examples: [
            { code: `@dataclass(frozen=True)
class Coordinate:
    lat: float
    lon: float`, notes: [{ at: "frozen=True", text: "assigning to a field raises" }] },
            { code: `@dataclass(order=True)
class Version:
    major: int
    minor: int`, notes: [{ at: "order=True", text: "adds comparison operators" }] },
            { code: `@dataclass(frozen=True, slots=True)
class Token:
    kind: str
    text: str`, notes: [{ at: "slots=True", text: "uses less memory" }] }
          ]
        },
        {
          id: "post-init", n: 4, title: "post init", level: 3,
          gloss: "Runs validation or derived setup right after a dataclass is created.",
          examples: [
            { code: `@dataclass
class Rectangle:
    width: float
    height: float
    area: float = field(init=False)

    def __post_init__(self):
        self.area = self.width * self.height`, notes: [{ at: "init=False", text: "not an __init__ parameter" }] },
            { code: `@dataclass
class Account:
    balance: float

    def __post_init__(self):
        if self.balance < 0:
            raise ValueError("balance cannot be negative")`, notes: [] },
            { code: `@dataclass
class User:
    name: str

    def __post_init__(self):
        self.name = self.name.strip().title()`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "exceptions",
      n: 14,
      title: "exceptions",
      concepts: [
        {
          id: "try-except", n: 1, title: "try and except", level: 1,
          gloss: "Handles an error without crashing the program.",
          examples: [
            { code: `try:
    value = int(text)
except ValueError:
    value = 0`, notes: [{ at: "ValueError", text: "catch the specific error" }] },
            { code: `try:
    data = json.loads(payload)
except json.JSONDecodeError:
    data = {}`, notes: [] },
            { code: `try:
    result = total / count
except ZeroDivisionError:
    result = 0.0`, notes: [] }
          ]
        },
        {
          id: "else-finally", n: 2, title: "else and finally", level: 2,
          gloss: "Runs code only on success with else and always with finally.",
          examples: [
            { code: `try:
    conn = connect()
except ConnectionError:
    print("offline")
else:
    sync(conn)
finally:
    cleanup()`, notes: [{ at: "else:", text: "runs only if no error" }] },
            { code: `try:
    amount = float(raw)
except ValueError:
    amount = None
else:
    print("parsed ok")`, notes: [] },
            { code: `try:
    job.run()
finally:
    job.release()`, notes: [{ at: "finally", text: "runs even after an error" }] }
          ]
        },
        {
          id: "raise", n: 3, title: "raising exceptions", level: 1,
          gloss: "Signals a problem by raising an exception.",
          examples: [
            { code: `raise ValueError("age must be positive")`, notes: [] },
            { code: `if not user:
    raise KeyError("user not found")`, notes: [] },
            { code: `def withdraw(balance, amount):
    if amount > balance:
        raise ValueError("insufficient funds")
    return balance - amount`, notes: [] }
          ]
        },
        {
          id: "custom-exception", n: 4, title: "custom exceptions", level: 2,
          gloss: "Defines your own error type by subclassing Exception.",
          examples: [
            { code: `class ValidationError(Exception):
    pass`, notes: [{ at: "(Exception)", text: "inherit from Exception" }] },
            { code: `class ApiError(Exception):
    def __init__(self, status, message):
        super().__init__(message)
        self.status = status`, notes: [] },
            { code: `class RetryLimitExceeded(RuntimeError):
    """Raised when every retry has failed."""`, notes: [] }
          ]
        },
        {
          id: "exception-chaining", n: 5, title: "exception chaining", level: 3,
          gloss: "Links a new exception to its cause with raise from.",
          examples: [
            { code: `try:
    config = load(path)
except OSError as err:
    raise RuntimeError("cannot load config") from err`, notes: [{ at: "from err", text: "keeps the original as the cause" }] },
            { code: `try:
    parse(line)
except ValueError as exc:
    raise SyntaxError(f"bad line: {line}") from exc`, notes: [] },
            { code: `def lookup(key):
    try:
        return cache[key]
    except KeyError:
        raise LookupError(key) from None`, notes: [{ at: "from None", text: "hides the original traceback" }] }
          ]
        }
      ]
    },
    {
      id: "context-managers",
      n: 15,
      title: "context managers",
      concepts: [
        {
          id: "with-open", n: 1, title: "with open", level: 1,
          gloss: "Opens a file and closes it automatically when the block ends.",
          examples: [
            { code: `with open("notes.txt") as f:
    text = f.read()`, notes: [{ at: "as f", text: "binds the open file" }] },
            { code: `with open("out.csv", "w", newline="") as f:
    f.write(header)`, notes: [] },
            { code: `with open(path, encoding="utf-8") as f:
    for line in f:
        print(line.strip())`, notes: [{ at: 'encoding="utf-8"', text: "be explicit about encoding" }] }
          ]
        },
        {
          id: "multiple-with", n: 2, title: "multiple context managers", level: 2,
          gloss: "Manages several resources in one with statement.",
          examples: [
            { code: `with open("in.txt") as src, open("out.txt", "w") as dst:
    dst.write(src.read())`, notes: [] },
            { code: `with lock, open(path) as f:
    data = f.read()`, notes: [] },
            { code: `with (
    open("a.txt") as a,
    open("b.txt") as b,
):
    merged = a.read() + b.read()`, notes: [{ at: "(", text: "parentheses allow line breaks" }] }
          ]
        },
        {
          id: "contextmanager", n: 3, title: "contextmanager decorator", level: 3,
          gloss: "Writes a context manager as a generator with a single yield.",
          examples: [
            { code: `from contextlib import contextmanager

@contextmanager
def timer():
    start = time.perf_counter()
    yield
    print(time.perf_counter() - start)`, notes: [{ at: "yield", text: "the with body runs here" }] },
            { code: `@contextmanager
def cd(path):
    old = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(old)`, notes: [] },
            { code: `@contextmanager
def opened(path):
    f = open(path)
    try:
        yield f
    finally:
        f.close()`, notes: [{ at: "yield f", text: "the value bound by as" }] }
          ]
        },
        {
          id: "enter-exit", n: 4, title: "enter and exit", level: 3,
          gloss: "Implements the context manager protocol on a class.",
          examples: [
            { code: `class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc, tb):
        self.elapsed = time.perf_counter() - self.start`, notes: [] },
            { code: `class Transaction:
    def __enter__(self):
        self.db.begin()
        return self

    def __exit__(self, exc_type, exc, tb):
        if exc_type:
            self.db.rollback()
        else:
            self.db.commit()`, notes: [{ at: "exc_type", text: "set only when an error occurred" }] },
            { code: `class Ignore:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        return True`, notes: [{ at: "return True", text: "swallows the exception" }] }
          ]
        }
      ]
    },
    {
      id: "generators",
      n: 16,
      title: "generators & yield",
      concepts: [
        {
          id: "generator-function", n: 1, title: "generator function", level: 2,
          gloss: "Produces values one at a time with yield instead of return.",
          examples: [
            { code: `def countdown(n):
    while n > 0:
        yield n
        n -= 1`, notes: [{ at: "yield n", text: "pauses here until asked again" }] },
            { code: `def read_lines(path):
    with open(path) as f:
        for line in f:
            yield line.rstrip()`, notes: [] },
            { code: `def squares(limit):
    for n in range(limit):
        yield n * n`, notes: [] }
          ]
        },
        {
          id: "next-iteration", n: 2, title: "next and iteration", level: 2,
          gloss: "Pulls values from a generator with next or a for loop.",
          examples: [
            { code: `gen = countdown(3)
first = next(gen)`, notes: [{ at: "next(gen)", text: "runs to the first yield" }] },
            { code: `first = next(iter(users), None)`, notes: [{ at: "None", text: "returned when empty" }] },
            { code: `for value in squares(5):
    print(value)`, notes: [] }
          ]
        },
        {
          id: "yield-from", n: 3, title: "yield from", level: 3,
          gloss: "Delegates to another iterable from inside a generator.",
          examples: [
            { code: `def chain(*iterables):
    for it in iterables:
        yield from it`, notes: [{ at: "yield from it", text: "yields each item of it" }] },
            { code: `def walk(tree):
    yield tree.value
    for child in tree.children:
        yield from walk(child)`, notes: [] },
            { code: `def flatten(rows):
    for row in rows:
        yield from row`, notes: [] }
          ]
        },
        {
          id: "lazy-pipelines", n: 4, title: "lazy pipelines", level: 3,
          gloss: "Chains generators so each item flows through without building lists.",
          examples: [
            { code: `lines = (line.strip() for line in f)
nonempty = (line for line in lines if line)`, notes: [] },
            { code: `numbers = (int(x) for x in raw)
evens = (n for n in numbers if n % 2 == 0)`, notes: [] },
            { code: `squares = (n * n for n in range(1_000_000))
first_big = next(n for n in squares if n > 5000)`, notes: [{ at: "1_000_000", text: "underscores aid readability" }] }
          ]
        }
      ]
    },
    {
      id: "decorators",
      n: 17,
      title: "decorators",
      concepts: [
        {
          id: "writing-decorator", n: 1, title: "writing a decorator", level: 3,
          gloss: "Wraps a function to add behavior before or after it runs.",
          examples: [
            { code: `def shout(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper`, notes: [{ at: "return wrapper", text: "hands back the replacement" }] },
            { code: `def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper`, notes: [] },
            { code: `def timed(func):
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(time.perf_counter() - start)
        return result
    return wrapper`, notes: [] }
          ]
        },
        {
          id: "applying-decorator", n: 2, title: "applying a decorator", level: 2,
          gloss: "Applies a decorator to a function with the at sign.",
          examples: [
            { code: `@log_calls
def add(a, b):
    return a + b`, notes: [{ at: "@log_calls", text: "same as add = log_calls(add)" }] },
            { code: `@timed
def load_users():
    return db.fetch_all()`, notes: [] },
            { code: `@shout
@log_calls
def greet(name):
    return f"hello, {name}"`, notes: [{ at: "@shout", text: "the outermost decorator" }] }
          ]
        },
        {
          id: "functools-wraps", n: 3, title: "functools wraps", level: 3,
          gloss: "Keeps the wrapped function's name and docstring with wraps.",
          examples: [
            { code: `def log_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper`, notes: [{ at: "@functools.wraps(func)", text: "copies name and docstring" }] },
            { code: `def retry(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        for _ in range(3):
            try:
                return func(*args, **kwargs)
            except OSError:
                pass
    return wrapper`, notes: [] },
            { code: `def memo(func):
    cache = {}
    @wraps(func)
    def wrapper(n):
        if n not in cache:
            cache[n] = func(n)
        return cache[n]
    return wrapper`, notes: [] }
          ]
        },
        {
          id: "decorator-arguments", n: 4, title: "decorators with arguments", level: 3,
          gloss: "Adds an outer function so a decorator can take its own arguments.",
          examples: [
            { code: `def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                func(*args, **kwargs)
        return wrapper
    return decorator`, notes: [{ at: "def decorator(func)", text: "the real decorator" }] },
            { code: `@repeat(3)
def ping():
    print("ping")`, notes: [{ at: "repeat(3)", text: "called first, returns the decorator" }] },
            { code: `def require_role(role):
    def decorator(func):
        def wrapper(user, *args):
            if role not in user.roles:
                raise PermissionError(role)
            return func(user, *args)
        return wrapper
    return decorator`, notes: [] }
          ]
        },
        {
          id: "builtin-decorators", n: 5, title: "built-in decorators", level: 2,
          gloss: "Uses classmethod, staticmethod and cache from the standard library.",
          examples: [
            { code: `class Month:
    def __init__(self, year, month):
        self.year = year
        self.month = month

    @classmethod
    def from_string(cls, text):
        year, month = text.split("-")
        return cls(int(year), int(month))`, notes: [{ at: "cls(", text: "builds an instance of this class" }] },
            { code: `class Math:
    @staticmethod
    def clamp(value, low, high):
        return max(low, min(value, high))`, notes: [{ at: "@staticmethod", text: "no self or cls parameter" }] },
            { code: `@functools.cache
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)`, notes: [{ at: "@functools.cache", text: "remembers results by argument" }] }
          ]
        }
      ]
    },
    {
      id: "typing",
      n: 18,
      title: "typing",
      concepts: [
        {
          id: "type-hints", n: 1, title: "type hints", level: 1,
          gloss: "Annotates parameters and return values with types.",
          examples: [
            { code: `def greet(name: str) -> str:
    return f"hello, {name}"`, notes: [{ at: "-> str", text: "the return type" }] },
            { code: `def total(prices: list[float]) -> float:
    return sum(prices)`, notes: [{ at: "list[float]", text: "built-in generics, no import" }] },
            { code: `timeout: float = 2.5
names: list[str] = []`, notes: [] }
          ]
        },
        {
          id: "unions-optional", n: 2, title: "unions and optional", level: 2,
          gloss: "Allows more than one type with the pipe operator, including None.",
          examples: [
            { code: `def find(users: list[User], user_id: int) -> User | None:
    ...`, notes: [{ at: "User | None", text: "may return None" }] },
            { code: `value: int | str = "7"`, notes: [{ at: "int | str", text: "either type is accepted" }] },
            { code: `def parse(text: str | None = None) -> dict:
    return json.loads(text or "{}")`, notes: [] }
          ]
        },
        {
          id: "typeddict", n: 3, title: "TypedDict", level: 3,
          gloss: "Describes the exact keys and value types of a dict.",
          examples: [
            { code: `class Movie(TypedDict):
    title: str
    year: int`, notes: [] },
            { code: `class Options(TypedDict, total=False):
    verbose: bool
    retries: int`, notes: [{ at: "total=False", text: "every key is optional" }] },
            { code: `movie: Movie = {"title": "Alien", "year": 1979}`, notes: [] }
          ]
        },
        {
          id: "generic-functions", n: 4, title: "generic functions", level: 3,
          gloss: "Writes a function that works for any type using type parameters.",
          examples: [
            { code: `def first[T](items: list[T]) -> T:
    return items[0]`, notes: [{ at: "[T]", text: "type parameter syntax, 3.12" }] },
            { code: `class Box[T]:
    def __init__(self, item: T):
        self.item = item`, notes: [] },
            { code: `type Pair[A, B] = tuple[A, B]`, notes: [{ at: "type Pair", text: "type alias statement, 3.12" }] }
          ]
        },
        {
          id: "protocol", n: 5, title: "Protocol", level: 3,
          gloss: "Defines structural typing where any class with the right methods matches.",
          examples: [
            { code: `class Drawable(Protocol):
    def draw(self) -> None: ...`, notes: [{ at: "(Protocol)", text: "no inheritance needed to match" }] },
            { code: `class SupportsClose(Protocol):
    def close(self) -> None: ...

def shutdown(resource: SupportsClose) -> None:
    resource.close()`, notes: [] },
            { code: `class Comparable(Protocol):
    def __lt__(self, other: Self) -> bool: ...`, notes: [{ at: "Self", text: "the implementing class" }] }
          ]
        }
      ]
    },
    {
      id: "pathlib-files",
      n: 19,
      title: "pathlib & files",
      concepts: [
        {
          id: "building-paths", n: 1, title: "building paths", level: 1,
          gloss: "Builds file paths with the slash operator on Path objects.",
          examples: [
            { code: `config = Path("etc") / "app" / "settings.toml"`, notes: [{ at: "/", text: "joins path parts" }] },
            { code: `home = Path.home()
cache = home / ".cache" / "app"`, notes: [{ at: "Path.home()", text: "the user's home folder" }] },
            { code: `logs = Path(__file__).parent / "logs"`, notes: [{ at: ".parent", text: "folder containing this file" }] }
          ]
        },
        {
          id: "read-write", n: 2, title: "reading and writing", level: 1,
          gloss: "Reads or writes a whole file in one call.",
          examples: [
            { code: `text = Path("notes.txt").read_text(encoding="utf-8")`, notes: [] },
            { code: `Path("out.json").write_text(json.dumps(data))`, notes: [] },
            { code: `raw = image_path.read_bytes()`, notes: [{ at: "read_bytes", text: "returns bytes, not text" }] }
          ]
        },
        {
          id: "globbing", n: 3, title: "globbing", level: 2,
          gloss: "Finds files that match a pattern with glob and rglob.",
          examples: [
            { code: `for path in Path("data").glob("*.csv"):
    load(path)`, notes: [{ at: '"*.csv"', text: "files in this folder only" }] },
            { code: `images = list(Path("assets").rglob("*.png"))`, notes: [{ at: "rglob", text: "searches subfolders too" }] },
            { code: `largest = max(root.glob("*.log"), key=lambda p: p.stat().st_size)`, notes: [] }
          ]
        },
        {
          id: "path-properties", n: 4, title: "path properties", level: 1,
          gloss: "Reads the name, suffix and stem of a path without string slicing.",
          examples: [
            { code: `path = Path("archive/report.final.pdf")
print(path.stem, path.suffix)`, notes: [{ at: ".stem", text: "name without the last suffix" }] },
            { code: `backup = path.with_suffix(".bak")`, notes: [{ at: ".with_suffix", text: "returns a new path" }] },
            { code: `if path.exists() and path.is_file():
    path.unlink()`, notes: [{ at: ".unlink()", text: "deletes the file" }] }
          ]
        },
        {
          id: "creating-folders", n: 5, title: "creating folders", level: 1,
          gloss: "Creates a folder and any missing parents.",
          examples: [
            { code: `out_dir.mkdir(parents=True, exist_ok=True)`, notes: [{ at: "exist_ok=True", text: "no error if it exists" }] },
            { code: `Path("build/cache").mkdir(parents=True, exist_ok=True)`, notes: [] },
            { code: `target = Path(tmp) / "run"
target.mkdir(exist_ok=True)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "collections-itertools",
      n: 20,
      title: "collections & itertools",
      concepts: [
        {
          id: "counter", n: 1, title: "Counter", level: 2,
          gloss: "Counts hashable items and ranks them with Counter.",
          examples: [
            { code: `counts = Counter(words)`, notes: [] },
            { code: `top = Counter(text.split()).most_common(3)`, notes: [{ at: ".most_common(3)", text: "three most frequent items" }] },
            { code: `votes = Counter()
votes["ada"] += 1`, notes: [{ at: 'votes["ada"]', text: "missing keys start at zero" }] }
          ]
        },
        {
          id: "defaultdict", n: 2, title: "defaultdict", level: 2,
          gloss: "Creates missing dict values on first access.",
          examples: [
            { code: `groups = defaultdict(list)
groups[user.city].append(user)`, notes: [{ at: "defaultdict(list)", text: "a missing key gets a list" }] },
            { code: `totals = defaultdict(int)
for sale in sales:
    totals[sale.region] += sale.amount`, notes: [] },
            { code: `graph = defaultdict(set)
graph[a].add(b)`, notes: [] }
          ]
        },
        {
          id: "deque", n: 3, title: "deque", level: 2,
          gloss: "Adds and removes from both ends in constant time.",
          examples: [
            { code: `queue = deque([1, 2, 3])
queue.appendleft(0)`, notes: [{ at: "appendleft", text: "push on the left end" }] },
            { code: `window = deque(maxlen=5)
window.append(reading)`, notes: [{ at: "maxlen=5", text: "old items fall off" }] },
            { code: `item = queue.popleft()`, notes: [{ at: "popleft", text: "remove from the left end" }] }
          ]
        },
        {
          id: "chain-islice", n: 4, title: "chain and islice", level: 3,
          gloss: "Combines or slices iterables without copying them.",
          examples: [
            { code: `merged = chain(first_list, second_list)`, notes: [] },
            { code: `top_ten = islice(scores, 10)`, notes: [{ at: "islice", text: "a lazy slice of any iterable" }] },
            { code: `for a, b in pairwise(readings):
    deltas.append(b - a)`, notes: [{ at: "pairwise", text: "overlapping neighbor pairs" }] }
          ]
        },
        {
          id: "groupby", n: 5, title: "itertools groupby", level: 3,
          gloss: "Groups consecutive items that share a key.",
          examples: [
            { code: `for city, rows in groupby(sorted_rows, key=lambda r: r.city):
    print(city, len(list(rows)))`, notes: [{ at: "sorted_rows", text: "input must be sorted by the key" }] },
            { code: `groups = {k: list(g) for k, g in groupby(data, key=len)}`, notes: [] },
            { code: `runs = [(k, len(list(g))) for k, g in groupby("aaabbc")]`, notes: [{ at: '"aaabbc"', text: "consecutive runs" }] }
          ]
        }
      ]
    },
    {
      id: "asyncio-basics",
      n: 21,
      title: "asyncio basics",
      concepts: [
        {
          id: "async-await", n: 1, title: "async def and await", level: 2,
          gloss: "Defines a coroutine and waits for another with await.",
          examples: [
            { code: `async def fetch_user(user_id):
    await asyncio.sleep(0.1)
    return {"id": user_id}`, notes: [{ at: "await", text: "pauses until the sleep finishes" }] },
            { code: `async def main():
    user = await fetch_user(7)
    print(user)`, notes: [] },
            { code: `async def load(path):
    data = await read_file(path)
    return parse(data)`, notes: [] }
          ]
        },
        {
          id: "asyncio-run", n: 2, title: "asyncio run", level: 2,
          gloss: "Starts the event loop and runs a coroutine to completion.",
          examples: [
            { code: `asyncio.run(main())`, notes: [{ at: "main()", text: "creates the coroutine object" }] },
            { code: `if __name__ == "__main__":
    asyncio.run(main())`, notes: [] },
            { code: `result = asyncio.run(fetch_user(1))`, notes: [] }
          ]
        },
        {
          id: "gather", n: 3, title: "gather", level: 3,
          gloss: "Runs several coroutines concurrently and collects their results.",
          examples: [
            { code: `users = await asyncio.gather(fetch_user(1), fetch_user(2))`, notes: [{ at: "gather(", text: "results come back in order" }] },
            { code: `pages = await asyncio.gather(*(fetch(u) for u in urls))`, notes: [{ at: "*(", text: "unpacks the generator" }] },
            { code: `results = await asyncio.gather(*tasks, return_exceptions=True)`, notes: [{ at: "return_exceptions=True", text: "errors are returned, not raised" }] }
          ]
        },
        {
          id: "tasks", n: 4, title: "tasks", level: 3,
          gloss: "Schedules a coroutine to run in the background.",
          examples: [
            { code: `task = asyncio.create_task(fetch_user(3))
user = await task`, notes: [{ at: "create_task", text: "starts running right away" }] },
            { code: `async def main():
    task = asyncio.create_task(heartbeat())
    await run_server()
    task.cancel()`, notes: [] },
            { code: `async with asyncio.TaskGroup() as tg:
    first = tg.create_task(fetch_user(1))
    second = tg.create_task(fetch_user(2))`, notes: [{ at: "TaskGroup", text: "waits for every task" }] }
          ]
        },
        {
          id: "timeouts", n: 5, title: "timeouts", level: 3,
          gloss: "Cancels slow work after a deadline with asyncio timeout.",
          examples: [
            { code: `async with asyncio.timeout(5):
    data = await fetch(url)`, notes: [{ at: "timeout(5)", text: "seconds before cancelling" }] },
            { code: `try:
    async with asyncio.timeout(2):
        await slow()
except TimeoutError:
    print("too slow")`, notes: [] },
            { code: `result = await asyncio.wait_for(job(), timeout=3)`, notes: [] }
          ]
        }
      ]
    }

  ]
};
