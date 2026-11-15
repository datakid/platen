export default {
  id: "jq",
  name: "jq",
  short: "JQ",
  pigment: "jq",
  family: null,
  version: "1.8",
  lexer: "bash",
  indent: 2,
  topics: [
    {
      id: "basics",
      n: 1,
      title: "basics",
      concepts: [
        {
          id: "identity-fields", n: 1, title: "identity and fields", level: 1,
          gloss: "Reads the whole input with a dot or one field with its name.",
          examples: [
            { code: `jq '.' <<< '{"name":"Ada","age":36}'`, notes: [{ at: ".", text: "the whole input, pretty printed" }] },
            { code: `jq '.name' <<< '{"name":"Ada","age":36}'`, notes: [{ at: ".name", text: "one field" }] },
            { code: `jq '.user.city' <<< '{"user":{"city":"Oslo"}}'`, notes: [{ at: ".user.city", text: "nested fields" }] }
          ]
        },
        {
          id: "array-index", n: 2, title: "array index", level: 1,
          gloss: "Picks array items by position with square brackets.",
          examples: [
            { code: `jq '.[0]' <<< '["a","b","c"]'`, notes: [{ at: ".[0]", text: "the first item" }] },
            { code: `jq '.[-1]' <<< '["a","b","c"]'`, notes: [{ at: "-1", text: "counts from the end" }] },
            { code: `jq '.[1:3]' <<< '[10,20,30,40]'`, notes: [{ at: "1:3", text: "a slice" }] }
          ]
        },
        {
          id: "raw-output", n: 3, title: "raw output", level: 1,
          gloss: "Prints strings without quotes using the dash r option.",
          examples: [
            { code: `jq -r '.name' <<< '{"name":"Ada"}'`, notes: [{ at: "-r", text: "raw strings" }] },
            { code: `jq -r '.[]' <<< '["a","b"]'`, notes: [] },
            { code: `jq -r '.user.email' <<< '{"user":{"email":"ada@example.com"}}'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "iteration-pipes",
      n: 2,
      title: "iteration and pipes",
      concepts: [
        {
          id: "iterate", n: 1, title: "iterate", level: 1,
          gloss: "Produces every item of an array or object with the empty brackets.",
          examples: [
            { code: `jq '.[]' <<< '[1,2,3]'`, notes: [{ at: ".[]", text: "one result per item" }] },
            { code: `jq '.[].name' <<< '[{"name":"a"},{"name":"b"}]'`, notes: [] },
            { code: `jq '.[]' <<< '{"x":1,"y":2}'`, notes: [{ at: ".[]", text: "values of an object" }] }
          ]
        },
        {
          id: "pipes", n: 2, title: "pipes", level: 1,
          gloss: "Feeds the output of one filter into the next with a vertical bar.",
          examples: [
            { code: `jq '.items | length' <<< '{"items":[1,2,3]}'`, notes: [{ at: "|", text: "pipe" }] },
            { code: `jq '.[] | .name' <<< '[{"name":"a"},{"name":"b"}]'`, notes: [] },
            { code: `jq '.user | .name | ascii_upcase' <<< '{"user":{"name":"ada"}}'`, notes: [] }
          ]
        },
        {
          id: "comma-recursion", n: 3, title: "comma and recursive descent", level: 2,
          gloss: "Emits several results with a comma and walks all depths with two dots.",
          examples: [
            { code: `jq '.a, .b' <<< '{"a":1,"b":2}'`, notes: [{ at: ",", text: "two outputs" }] },
            { code: `jq '[.a, .b]' <<< '{"a":1,"b":2}'`, notes: [{ at: "[.a, .b]", text: "collects outputs into an array" }] },
            { code: `jq '[.. | numbers]' <<< '{"a":1,"b":{"c":2}}'`, notes: [{ at: "..", text: "every value at every depth" }] }
          ]
        }
      ]
    },
    {
      id: "select-map",
      n: 3,
      title: "select and map",
      concepts: [
        {
          id: "select", n: 1, title: "select", level: 1,
          gloss: "Keeps only the items for which a condition is true.",
          examples: [
            { code: `jq '.[] | select(.age > 30)' <<< '[{"age":25},{"age":36}]'`, notes: [{ at: "select", text: "filters items" }] },
            { code: `jq '.[] | select(.name == "ada")' <<< '[{"name":"ada"},{"name":"bob"}]'`, notes: [] },
            { code: `jq '.[] | select(.t | contains(["x"]))' <<< '[{"t":["x"]},{"t":[]}]'`, notes: [] }
          ]
        },
        {
          id: "map", n: 2, title: "map", level: 1,
          gloss: "Applies a filter to every item of an array and collects the results.",
          examples: [
            { code: `jq 'map(. * 2)' <<< '[1,2,3]'`, notes: [{ at: "map", text: "transforms each item" }] },
            { code: `jq 'map(.name)' <<< '[{"name":"a"},{"name":"b"}]'`, notes: [] },
            { code: `jq 'map(select(. > 1))' <<< '[1,2,3]'`, notes: [{ at: "select(", text: "filters inside map" }] }
          ]
        },
        {
          id: "tests", n: 3, title: "tests", level: 2,
          gloss: "Checks keys and conditions with has, any and all.",
          examples: [
            { code: `jq 'has("name")' <<< '{"name":"Ada"}'`, notes: [{ at: "has", text: "true when the key exists" }] },
            { code: `jq 'any(.[]; . > 2)' <<< '[1,2,3]'`, notes: [{ at: "any", text: "true if one item matches" }] },
            { code: `jq 'all(.[]; . > 0)' <<< '[1,2,3]'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "construction",
      n: 4,
      title: "building values",
      concepts: [
        {
          id: "object-construction", n: 1, title: "object construction", level: 1,
          gloss: "Builds a new object from selected fields.",
          examples: [
            { code: `jq '{name: .user}' <<< '{"user":"Ada","age":36}'`, notes: [{ at: "{name:", text: "a new object" }] },
            { code: `jq '{name, age}' <<< '{"name":"Ada","age":36,"x":1}'`, notes: [{ at: "{name, age}", text: "shorthand for same keys" }] },
            { code: `jq '.[] | {id, title}' <<< '[{"id":1,"title":"a","x":0}]'`, notes: [] }
          ]
        },
        {
          id: "computed-keys", n: 2, title: "computed keys", level: 2,
          gloss: "Uses an expression as the key of a new object entry.",
          examples: [
            { code: `jq '{(.k): .v}' <<< '{"k":"color","v":"red"}'`, notes: [{ at: "(.k)", text: "key from a value" }] },
            { code: `jq '{(.name | ascii_upcase): .age}' <<< '{"name":"ada","age":36}'`, notes: [] },
            { code: `jq 'map({(.id): .n}) | add' <<< '[{"id":"a","n":1},{"id":"b","n":2}]'`, notes: [] }
          ]
        },
        {
          id: "interpolation", n: 3, title: "string interpolation", level: 1,
          gloss: "Embeds filters in a string with backslash and parentheses.",
          examples: [
            { code: `jq '"Hi \\(.name)"' <<< '{"name":"Ada"}'`, notes: [{ at: "\\(.name)", text: "evaluates inside the string" }] },
            { code: `jq -r '"\\(.name) is \\(.age)"' <<< '{"name":"Ada","age":36}'`, notes: [] },
            { code: `jq -r '.[] | "\\(.id): \\(.title)"' <<< '[{"id":1,"title":"a"}]'`, notes: [] }
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
          id: "measure-order", n: 1, title: "length and ordering", level: 1,
          gloss: "Counts items and sorts or reverses them.",
          examples: [
            { code: `jq 'length' <<< '[1,2,3]'`, notes: [{ at: "length", text: "number of items" }] },
            { code: `jq 'sort' <<< '[3,1,2]'`, notes: [] },
            { code: `jq 'sort_by(.age) | reverse' <<< '[{"age":30},{"age":20}]'`, notes: [{ at: "sort_by", text: "orders by a key" }] }
          ]
        },
        {
          id: "grouping", n: 2, title: "grouping", level: 2,
          gloss: "Collects equal items into groups, removes duplicates and finds extremes.",
          examples: [
            { code: `jq 'group_by(.t)' <<< '[{"t":"a"},{"t":"b"},{"t":"a"}]'`, notes: [{ at: "group_by", text: "arrays of equal keys" }] },
            { code: `jq 'unique' <<< '[1,2,2,3,1]'`, notes: [] },
            { code: `jq 'max_by(.n) | .id' <<< '[{"id":"a","n":3},{"id":"b","n":9}]'`, notes: [] }
          ]
        },
        {
          id: "combine-slice", n: 3, title: "combine and slice", level: 2,
          gloss: "Totals numbers, flattens nested arrays and picks first or last items.",
          examples: [
            { code: `jq 'add' <<< '[1,2,3]'`, notes: [{ at: "add", text: "sum of numbers" }] },
            { code: `jq 'flatten' <<< '[[1,2],[3,[4]]]'`, notes: [] },
            { code: `jq '[first, last]' <<< '[5,6,7]'`, notes: [{ at: "first", text: "the first item" }] }
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
          id: "string-basics", n: 1, title: "string basics", level: 1,
          gloss: "Changes the case of text, splits it and joins it back with built in functions.",
          examples: [
            { code: `jq 'ascii_downcase' <<< '"HELLO"'`, notes: [{ at: "ascii_downcase", text: "lowercase letters" }] },
            { code: `jq 'split(",")' <<< '"a,b,c"'`, notes: [{ at: "split", text: "string to array" }] },
            { code: `jq 'join("-")' <<< '["a","b","c"]'`, notes: [] }
          ]
        },
        {
          id: "regex", n: 2, title: "regular expressions", level: 2,
          gloss: "Matches text against a pattern to test, extract or replace it.",
          examples: [
            { code: `jq 'test("^a")' <<< '"apple"'`, notes: [{ at: "test", text: "true or false" }] },
            { code: `jq 'capture("(?<y>\\\\d{4})-(?<m>\\\\d{2})")' <<< '"2026-11"'`, notes: [{ at: "capture", text: "named groups become keys" }] },
            { code: `jq 'gsub("-"; "+")' <<< '"a-b-c"'`, notes: [] }
          ]
        },
        {
          id: "trim-affix", n: 3, title: "trim and affixes", level: 2,
          gloss: "Cuts whitespace and known prefixes or suffixes from strings.",
          examples: [
            { code: `jq 'trim' <<< '"  hi  "'`, notes: [{ at: "trim", text: "strips whitespace" }] },
            { code: `jq 'ltrimstr("v")' <<< '"v1.2"'`, notes: [{ at: "ltrimstr", text: "removes a prefix" }] },
            { code: `jq 'startswith("ab"), endswith("c")' <<< '"abc"'`, notes: [] }
          ]
        },
        {
          id: "format-strings", n: 4, title: "format strings", level: 2,
          gloss: "Encodes output for CSV, URLs, shells and base64 with at sign formats.",
          examples: [
            { code: `jq -r '@csv' <<< '["a",1,"b"]'`, notes: [{ at: "@csv", text: "one CSV line" }] },
            { code: `jq -r '@base64' <<< '"hello"'`, notes: [] },
            { code: `jq -r '@uri' <<< '"a b&c"'`, notes: [{ at: "@uri", text: "percent encoding" }] }
          ]
        }
      ]
    },
    {
      id: "logic",
      n: 7,
      title: "conditions and errors",
      concepts: [
        {
          id: "conditionals", n: 1, title: "conditionals", level: 1,
          gloss: "Chooses between values with if, elif and else.",
          examples: [
            { code: `jq 'if . > 5 then "big" else "small" end' <<< '9'`, notes: [{ at: "end", text: "closes the conditional" }] },
            { code: `jq 'if . < 0 then "neg" elif . == 0 then "zero" else "pos" end' <<< '0'`, notes: [] },
            { code: `jq 'map(if . % 2 == 0 then "even" else "odd" end)' <<< '[1,2,3]'`, notes: [] }
          ]
        },
        {
          id: "alternatives", n: 2, title: "alternative operator", level: 1,
          gloss: "Falls back to a default when a value is null or false.",
          examples: [
            { code: `jq '.nickname // "none"' <<< '{"name":"Ada"}'`, notes: [{ at: "//", text: "default when null" }] },
            { code: `jq '.port // 8080' <<< '{"port":3000}'`, notes: [] },
            { code: `jq '[.[] | .score // 0]' <<< '[{"score":5},{}]'`, notes: [] }
          ]
        },
        {
          id: "errors", n: 3, title: "optional access and errors", level: 2,
          gloss: "Skips failures with a question mark and handles them with try.",
          examples: [
            { code: `jq '.a?' <<< '5'`, notes: [{ at: "?", text: "ignore the error" }] },
            { code: `jq 'try error("bad") catch "caught"' <<< 'null'`, notes: [{ at: "try", text: "handles an error" }] },
            { code: `jq '[.[] | tonumber?]' <<< '["1","x","3"]'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "variables-functions",
      n: 8,
      title: "variables and functions",
      concepts: [
        {
          id: "variables", n: 1, title: "variables", level: 2,
          gloss: "Names a value with as and reuses it later in the filter.",
          examples: [
            { code: `jq '.price as $p | $p * 2' <<< '{"price":4}'`, notes: [{ at: "as $p", text: "binds a variable" }] },
            { code: `jq '.a as $x | .b as $y | $x + $y' <<< '{"a":1,"b":2}'`, notes: [] },
            { code: `jq '.base as $b | .items | map(. + $b)' <<< '{"base":10,"items":[1,2]}'`, notes: [] }
          ]
        },
        {
          id: "reduce-foreach", n: 2, title: "reduce", level: 2,
          gloss: "Folds an array into one value with reduce.",
          examples: [
            { code: `jq 'reduce .[] as $n (0; . + $n)' <<< '[1,2,3]'`, notes: [{ at: "reduce", text: "accumulates a result" }] },
            { code: `jq 'reduce .[] as $s ({}; .[$s] += 1)' <<< '["a","b","a"]'`, notes: [] },
            { code: `jq '[foreach .[] as $n (0; . + $n)]' <<< '[1,2,3]'`, notes: [{ at: "foreach", text: "emits each step" }] }
          ]
        },
        {
          id: "define-functions", n: 3, title: "define functions", level: 3,
          gloss: "Defines a reusable named filter with def.",
          examples: [
            { code: `jq 'def double: . * 2; map(double)' <<< '[1,2,3]'`, notes: [{ at: "def", text: "declares a filter" }] },
            { code: `jq 'def add2($n): . + $n; map(add2(2))' <<< '[1,2]'`, notes: [] },
            { code: `jq 'def fac: if . <= 1 then 1 else . * (. - 1 | fac) end; fac' <<< '5'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "updates",
      n: 9,
      title: "paths and updates",
      concepts: [
        {
          id: "update-assign", n: 1, title: "update assignment", level: 1,
          gloss: "Changes values in place with the update and assignment operators.",
          examples: [
            { code: `jq '.age |= . + 1' <<< '{"age":36}'`, notes: [{ at: "|=", text: "update with a filter" }] },
            { code: `jq '.name = "Bob"' <<< '{"name":"Ada"}'`, notes: [{ at: "=", text: "plain assignment" }] },
            { code: `jq '.count += 1' <<< '{"count":1}'`, notes: [] }
          ]
        },
        {
          id: "delete-pick", n: 2, title: "delete and pick", level: 2,
          gloss: "Removes keys with del and keeps chosen ones with pick.",
          examples: [
            { code: `jq 'del(.secret)' <<< '{"id":1,"secret":"x"}'`, notes: [{ at: "del", text: "removes a path" }] },
            { code: `jq 'del(.[0])' <<< '[1,2,3]'`, notes: [] },
            { code: `jq 'pick(.id, .name)' <<< '{"id":1,"name":"a","x":0}'`, notes: [{ at: "pick", text: "keeps only these paths" }] }
          ]
        },
        {
          id: "entries", n: 3, title: "entries", level: 2,
          gloss: "Converts between objects and key value lists with to_entries and with_entries.",
          examples: [
            { code: `jq 'to_entries' <<< '{"a":1}'`, notes: [{ at: "to_entries", text: "key and value pairs" }] },
            { code: `jq 'with_entries(.value += 1)' <<< '{"a":1,"b":2}'`, notes: [{ at: "with_entries", text: "edits every pair" }] },
            { code: `jq 'map_values(. * 10)' <<< '{"a":1,"b":2}'`, notes: [] }
          ]
        },
        {
          id: "walk-paths", n: 4, title: "walk and paths", level: 3,
          gloss: "Visits nested values with walk and lists paths with paths.",
          examples: [
            { code: `jq 'walk(if type == "number" then . + 1 else . end)' <<< '[1,{"a":2}]'`, notes: [{ at: "walk", text: "transforms every nested value" }] },
            { code: `jq '[paths]' <<< '{"a":{"b":1}}'`, notes: [{ at: "paths", text: "each path as an array" }] },
            { code: `jq 'getpath(["a","b"])' <<< '{"a":{"b":7}}'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "options",
      n: 10,
      title: "command line options",
      concepts: [
        {
          id: "output-options", n: 1, title: "output options", level: 1,
          gloss: "Controls formatting with compact, raw and sorted output flags.",
          examples: [
            { code: `jq -c '.' <<< '{"a":[1,2]}'`, notes: [{ at: "-c", text: "compact on one line" }] },
            { code: `jq -S '.' <<< '{"b":1,"a":2}'`, notes: [{ at: "-S", text: "sorts the keys" }] },
            { code: `jq --tab '.' <<< '{"a":1}'`, notes: [] }
          ]
        },
        {
          id: "pass-values", n: 2, title: "passing values", level: 2,
          gloss: "Passes shell values into the filter with arg and argjson.",
          examples: [
            { code: `jq --arg who Ada '"Hi " + $who' <<< 'null'`, notes: [{ at: "--arg", text: "a string variable" }] },
            { code: `jq --argjson n 5 '. + $n' <<< '10'`, notes: [{ at: "--argjson", text: "a typed variable" }] },
            { code: `jq -n --arg k id --arg v 7 '{($k): $v}'`, notes: [{ at: "-n", text: "no input at all" }] }
          ]
        },
        {
          id: "input-modes", n: 3, title: "input modes", level: 2,
          gloss: "Reads raw lines or collects every input into one array.",
          examples: [
            { code: `printf '1\\n2\\n3\\n' | jq -s 'add'`, notes: [{ at: "-s", text: "slurp everything into an array" }] },
            { code: `printf 'a\\nb\\n' | jq -R '.'`, notes: [{ at: "-R", text: "read raw lines as strings" }] },
            { code: `printf '{"a":1}\\n{"a":2}\\n' | jq -c '.a'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "numbers-dates",
      n: 11,
      title: "numbers and dates",
      concepts: [
        {
          id: "math", n: 1, title: "math", level: 1,
          gloss: "Rounds and computes with the built in math functions.",
          examples: [
            { code: `jq 'floor, ceil, round' <<< '2.5'`, notes: [{ at: "floor", text: "round down" }] },
            { code: `jq 'sqrt' <<< '16'`, notes: [] },
            { code: `jq 'pow(.; 3)' <<< '2'`, notes: [] }
          ]
        },
        {
          id: "numbers-conversion", n: 2, title: "converting numbers", level: 1,
          gloss: "Converts between strings and numbers.",
          examples: [
            { code: `jq 'tonumber' <<< '"42"'`, notes: [{ at: "tonumber", text: "string to number" }] },
            { code: `jq 'tostring' <<< '42'`, notes: [] },
            { code: `jq 'map(tonumber) | add' <<< '["1","2"]'`, notes: [] }
          ]
        },
        {
          id: "dates", n: 3, title: "dates", level: 2,
          gloss: "Converts timestamps and dates with todate, fromdate and strftime.",
          examples: [
            { code: `jq 'todate' <<< '0'`, notes: [{ at: "todate", text: "seconds to an ISO date" }] },
            { code: `jq 'fromdate' <<< '"2026-11-14T00:00:00Z"'`, notes: [] },
            { code: `jq 'strftime("%Y-%m-%d")' <<< '86400'`, notes: [{ at: "strftime", text: "custom date format" }] }
          ]
        }
      ]
    }
  ]
};
