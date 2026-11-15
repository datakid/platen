export default {
  id: "awk",
  name: "awk",
  short: "AWK",
  pigment: "awk",
  family: null,
  version: "5.x",
  lexer: "bash",
  indent: 2,
  topics: [
    {
      id: "fields-print",
      n: 1,
      title: "fields and print",
      concepts: [
        {
          id: "print-fields", n: 1, title: "print fields", level: 1,
          gloss: "Prints chosen whitespace separated fields of each input line.",
          examples: [
            { code: `printf 'ada 36\\nbob 41\\n' | awk '{ print $1 }'`, notes: [{ at: "$1", text: "the first field" }, { at: "print", text: "writes a line" }] },
            { code: `printf 'ada 36\\nbob 41\\n' | awk '{ print $2, $1 }'`, notes: [{ at: ",", text: "joins with a space" }] },
            { code: `printf 'ada 36 oslo\\nbob 41 rome\\n' | awk '{ print $NF }'`, notes: [{ at: "$NF", text: "the last field" }] }
          ]
        },
        {
          id: "whole-line", n: 2, title: "whole line", level: 1,
          gloss: "Prints the full line with $0 or labels it with extra text.",
          examples: [
            { code: `printf 'ada 36\\nbob 41\\n' | awk '{ print $0 }'`, notes: [{ at: "$0", text: "the entire line" }] },
            { code: `printf 'ada 36\\nbob 41\\n' | awk '{ print "name:", $1 }'`, notes: [] },
            { code: `printf 'ada 36\\nbob 41\\n' | awk '{ print NR ": " $0 }'`, notes: [{ at: "NR", text: "the current line number" }] }
          ]
        },
        {
          id: "field-count", n: 3, title: "field count", level: 1,
          gloss: "Counts fields on each line with NF and addresses them by expression.",
          examples: [
            { code: `printf 'a b c\\nd e\\n' | awk '{ print NF }'`, notes: [{ at: "NF", text: "number of fields" }] },
            { code: `printf 'a b c\\nd e\\n' | awk '{ print $(NF - 1) }'`, notes: [{ at: "$(NF - 1)", text: "the second to last field" }] },
            { code: `printf 'a b c\\nd e f g\\n' | awk '{ print $1, $NF, NF }'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "patterns",
      n: 2,
      title: "patterns and conditions",
      concepts: [
        {
          id: "regex-patterns", n: 1, title: "regex patterns", level: 1,
          gloss: "Runs the action only on lines that match a regular expression.",
          examples: [
            { code: `printf 'ada 36\\nbob 41\\n' | awk '/bob/ { print $2 }'`, notes: [{ at: "/bob/", text: "pattern before the action" }] },
            { code: `printf 'ok 1\\nerr 2\\nok 3\\n' | awk '/^err/'`, notes: [{ at: "^err", text: "lines starting with err" }] },
            { code: `printf 'ada 36\\nbob 41\\n' | awk '$1 ~ /^a/ { print $1 }'`, notes: [{ at: "~", text: "matches a regular expression" }] }
          ]
        },
        {
          id: "comparisons", n: 2, title: "comparisons", level: 1,
          gloss: "Selects lines by comparing a field with a value.",
          examples: [
            { code: `printf 'ada 36\\nbob 41\\ncy 29\\n' | awk '$2 > 30 { print $1 }'`, notes: [{ at: "$2 > 30", text: "numeric comparison" }] },
            { code: `printf 'ada 36\\nbob 41\\n' | awk '$1 == "bob"'`, notes: [] },
            { code: `printf 'a 1\\nb 2\\nc 3\\n' | awk '$2 != 2 && $1 != "c"'`, notes: [] }
          ]
        },
        {
          id: "line-ranges", n: 3, title: "line ranges", level: 2,
          gloss: "Selects lines by number or between two patterns.",
          examples: [
            { code: `printf 'one\\ntwo\\nthree\\n' | awk 'NR == 2'`, notes: [{ at: "NR == 2", text: "only the second line" }] },
            { code: `printf 'a\\nb\\nc\\nd\\n' | awk 'NR >= 2 && NR <= 3'`, notes: [] },
            { code: `printf 'x\\nSTART\\ny\\nEND\\nz\\n' | awk '/START/,/END/'`, notes: [{ at: "/START/,/END/", text: "a range of lines" }] }
          ]
        }
      ]
    },
    {
      id: "variables",
      n: 3,
      title: "variables and built in names",
      concepts: [
        {
          id: "builtin-variables", n: 1, title: "built in variables", level: 1,
          gloss: "Reads the line number, field count and file position from built in variables.",
          examples: [
            { code: `printf 'a b\\nc d e\\n' | awk '{ print NR, NF }'`, notes: [{ at: "NR", text: "records read so far" }] },
            { code: `awk 'END { print NR }' <<< $'one\\ntwo\\nthree'`, notes: [{ at: "END", text: "runs after the last line" }] },
            { code: `printf 'a b c\\n' | awk '{ print FILENAME "|" NF }'`, notes: [] }
          ]
        },
        {
          id: "user-variables", n: 2, title: "user variables", level: 1,
          gloss: "Stores values in variables that start at zero or empty.",
          examples: [
            { code: `printf '3\\n4\\n5\\n' | awk '{ total += $1 } END { print total }'`, notes: [{ at: "total", text: "starts at zero" }] },
            { code: `printf 'a\\nb\\n' | awk '{ n = n + 1 } END { print n, "lines" }'`, notes: [] },
            { code: `printf '2\\n9\\n4\\n' | awk '$1 > max { max = $1 } END { print max }'`, notes: [] }
          ]
        },
        {
          id: "external-values", n: 3, title: "values from the shell", level: 2,
          gloss: "Passes a shell value into awk with the dash v option.",
          examples: [
            { code: `printf '5\\n9\\n' | awk -v limit=6 '$1 > limit'`, notes: [{ at: "-v", text: "sets a variable before running" }] },
            { code: `name=ada; echo hi | awk -v who="$name" '{ print $0, who }'`, notes: [] },
            { code: `printf '1\\n2\\n' | awk -v factor=10 '{ print $1 * factor }'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "strings",
      n: 4,
      title: "strings and text",
      concepts: [
        {
          id: "string-functions", n: 1, title: "string functions", level: 1,
          gloss: "Measures and slices text with length, substr and index.",
          examples: [
            { code: `echo hello | awk '{ print length($0) }'`, notes: [{ at: "length", text: "number of characters" }] },
            { code: `echo hello | awk '{ print substr($0, 2, 3) }'`, notes: [{ at: "substr", text: "text from position and size" }] },
            { code: `echo hello | awk '{ print index($0, "ll") }'`, notes: [{ at: "index", text: "position of a substring" }] }
          ]
        },
        {
          id: "case-concatenation", n: 2, title: "case and concatenation", level: 1,
          gloss: "Joins values by writing them side by side and changes letter case.",
          examples: [
            { code: `echo ada | awk '{ print toupper($1) }'`, notes: [{ at: "toupper", text: "uppercase copy" }] },
            { code: `echo ada | awk '{ print "Hello, " $1 "!" }'`, notes: [{ at: "\"Hello, \" $1", text: "concatenation has no operator" }] },
            { code: `echo 'Ada Lovelace' | awk '{ print tolower($2) }'`, notes: [] }
          ]
        },
        {
          id: "substitution", n: 3, title: "substitution", level: 2,
          gloss: "Replaces text with sub for the first match and gsub for every match.",
          examples: [
            { code: `echo 'a-b-c' | awk '{ sub(/-/, "+"); print }'`, notes: [{ at: "sub", text: "replaces the first match" }] },
            { code: `echo 'a-b-c' | awk '{ gsub(/-/, "+"); print }'`, notes: [{ at: "gsub", text: "replaces every match" }] },
            { code: `echo 'one  two   three' | awk '{ gsub(/ +/, " "); print }'`, notes: [] }
          ]
        },
        {
          id: "split-text", n: 4, title: "splitting text", level: 2,
          gloss: "Splits a string into an array with split.",
          examples: [
            { code: `echo 'a,b,c' | awk '{ n = split($0, p, ","); print n, p[2] }'`, notes: [{ at: "split", text: "fills an array" }] },
            { code: `echo '2026-11-14' | awk '{ split($0, d, "-"); print d[3] }'`, notes: [] },
            { code: `echo 'x y z' | awk '{ n = split($0, w, " "); print w[n] }'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "control-flow",
      n: 5,
      title: "control flow",
      concepts: [
        {
          id: "if-else", n: 1, title: "if and else", level: 1,
          gloss: "Chooses an action with if and else inside the action block.",
          examples: [
            { code: `printf '36\\n41\\n' |
  awk '{ if ($1 > 40) print "old"; else print "young" }'`, notes: [{ at: "if", text: "condition then action" }] },
            { code: `printf '5\\n0\\n' | awk '{ if ($1) print "set"; else print "zero" }'`, notes: [] },
            { code: `printf '7\\n' | awk '{ print ($1 % 2 == 0) ? "even" : "odd" }'`, notes: [{ at: "? \"even\"", text: "the ternary operator" }] }
          ]
        },
        {
          id: "loops", n: 2, title: "loops", level: 1,
          gloss: "Repeats work over fields or numbers with for and while.",
          examples: [
            { code: `echo 'a b c' | awk '{ for (i = 1; i <= NF; i++) print $i }'`, notes: [{ at: "for", text: "counted loop" }] },
            { code: `awk 'BEGIN { for (i = 1; i <= 3; i++) print i * i }'`, notes: [] },
            { code: `awk 'BEGIN { while (n < 3) { n++; print "tick", n } }'`, notes: [] }
          ]
        },
        {
          id: "next-exit", n: 3, title: "next and exit", level: 2,
          gloss: "Skips to the next line with next and stops early with exit.",
          examples: [
            { code: `printf 'a\\n#b\\nc\\n' | awk '/^#/ { next } { print }'`, notes: [{ at: "next", text: "skip the rest for this line" }] },
            { code: `printf 'a\\nb\\nc\\n' | awk 'NR == 2 { exit } { print }'`, notes: [{ at: "exit", text: "stop reading input" }] },
            { code: `printf '1\\n2\\n3\\n4\\n' | awk '$1 > 3 { print "big"; exit }'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "arrays",
      n: 6,
      title: "associative arrays",
      concepts: [
        {
          id: "counting", n: 1, title: "counting with arrays", level: 1,
          gloss: "Counts occurrences by using values as array keys.",
          examples: [
            { code: `printf 'a\\nb\\na\\n' | awk '{ n[$1]++ } END { print n["a"] }'`, notes: [{ at: "n[$1]++", text: "counts per key" }] },
            { code: `printf 'red\\nblue\\nred\\n' |
  awk '{ c[$1]++ } END { for (k in c) print k, c[k] }'`, notes: [{ at: "for (k in c)", text: "loops over keys" }] },
            { code: `printf 'x\\ny\\nx\\nx\\n' | awk '{ c[$1]++ } END { print length(c) }'`, notes: [] }
          ]
        },
        {
          id: "summing-groups", n: 2, title: "summing by group", level: 2,
          gloss: "Adds values per key to build totals for each group.",
          examples: [
            { code: `printf 'a 1\\nb 2\\na 3\\n' |
  awk '{ sum[$1] += $2 } END { print sum["a"] }'`, notes: [{ at: "sum[$1]", text: "one total per name" }] },
            { code: `printf 'a 1\\nb 2\\na 3\\n' |
  awk '{ s[$1] += $2 } END { for (k in s) print k, s[k] }'`, notes: [] },
            { code: `printf 'tea 3\\ntea 4\\ncoffee 5\\n' |
  awk '{ t[$1] += $2; n[$1]++ }
       END { print t["tea"] / n["tea"] }'`, notes: [] }
          ]
        },
        {
          id: "membership", n: 3, title: "membership and delete", level: 2,
          gloss: "Tests for a key with in and removes keys with delete.",
          examples: [
            { code: `printf 'a\\nb\\n' | awk '{ seen[$1] = 1 } END { print ("a" in seen) }'`, notes: [{ at: "in", text: "tests whether a key exists" }] },
            { code: `printf 'a\\nb\\n' |
  awk '{ s[$1] = 1 } END { delete s["a"]; print length(s) }'`, notes: [{ at: "delete", text: "removes one key" }] },
            { code: `awk 'BEGIN { a["x"] = 1; delete a; print length(a) }'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "printf-format",
      n: 7,
      title: "formatted output",
      concepts: [
        {
          id: "printf-basics", n: 1, title: "printf basics", level: 1,
          gloss: "Formats text and numbers with printf and format specifiers.",
          examples: [
            { code: `echo 'ada 36' | awk '{ printf "%s is %d\\n", $1, $2 }'`, notes: [{ at: "%s", text: "a string" }, { at: "%d", text: "an integer" }] },
            { code: `awk 'BEGIN { printf "%.2f\\n", 3.14159 }'`, notes: [{ at: "%.2f", text: "two decimals" }] },
            { code: `echo 'ada 36' | awk '{ printf "%s\\n", toupper($1) }'`, notes: [] }
          ]
        },
        {
          id: "widths", n: 2, title: "widths and alignment", level: 2,
          gloss: "Pads columns with a width and aligns them left or right.",
          examples: [
            { code: `printf 'ada 36\\nbob 41\\n' | awk '{ printf "%-6s %3d\\n", $1, $2 }'`, notes: [{ at: "%-6s", text: "left aligned in six columns" }] },
            { code: `printf 'a 1\\nbb 22\\n' | awk '{ printf "%5s|\\n", $1 }'`, notes: [] },
            { code: `awk 'BEGIN { printf "%05d\\n", 42 }'`, notes: [{ at: "%05d", text: "zero padded" }] }
          ]
        },
        {
          id: "number-formats", n: 3, title: "number formats", level: 2,
          gloss: "Prints percentages, hex and scientific notation with printf.",
          examples: [
            { code: `awk 'BEGIN { printf "%d%%\\n", 85 }'`, notes: [{ at: "%%", text: "a literal percent sign" }] },
            { code: `awk 'BEGIN { printf "%x\\n", 255 }'`, notes: [] },
            { code: `awk 'BEGIN { printf "%e\\n", 12345.678 }'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "begin-end",
      n: 8,
      title: "begin and end blocks",
      concepts: [
        {
          id: "begin-block", n: 1, title: "begin block", level: 1,
          gloss: "Runs setup code once before any input is read.",
          examples: [
            { code: `printf 'a\\nb\\n' | awk 'BEGIN { print "start" } { print }'`, notes: [{ at: "BEGIN", text: "runs before the first line" }] },
            { code: `awk 'BEGIN { print "Hello from awk" }'`, notes: [] },
            { code: `printf 'ada 36\\n' | awk 'BEGIN { OFS = "," } { print $1, $2 }'`, notes: [] }
          ]
        },
        {
          id: "end-block", n: 2, title: "end block", level: 1,
          gloss: "Runs summary code once after the last line.",
          examples: [
            { code: `printf '1\\n2\\n3\\n' | awk '{ s += $1 } END { print s }'`, notes: [{ at: "END", text: "runs after the last line" }] },
            { code: `printf '1\\n2\\n3\\n' | awk '{ s += $1 } END { print s / NR }'`, notes: [] },
            { code: `printf 'a\\nb\\n' | awk 'END { print NR, "lines" }'`, notes: [] }
          ]
        },
        {
          id: "report-patterns", n: 3, title: "summary reports", level: 2,
          gloss: "Combines begin and end blocks to print a header and a total.",
          examples: [
            { code: `printf 'tea 3\\ncoffee 5\\n' |
  awk 'BEGIN { print "ITEM QTY" }
       { print $1, $2 }
       END { print "total", NR }'`, notes: [{ at: "BEGIN", text: "header line" }] },
            { code: `printf '4\\n9\\n2\\n' |
  awk 'NR == 1 { min = max = $1 }
       $1 < min { min = $1 }
       $1 > max { max = $1 }
       END { print min, max }'`, notes: [] },
            { code: `printf '10\\n20\\n' |
  awk '{ s += $1 } END { printf "avg %.1f\\n", s / NR }'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "separators",
      n: 9,
      title: "field separators",
      concepts: [
        {
          id: "input-separator", n: 1, title: "input separator", level: 1,
          gloss: "Splits fields on a chosen character with the dash F option.",
          examples: [
            { code: `echo 'ada:36:oslo' | awk -F: '{ print $2 }'`, notes: [{ at: "-F:", text: "colon separates fields" }] },
            { code: `echo 'a,b,c' | awk -F, '{ print $3 }'`, notes: [] },
            { code: `printf 'a\\t1\\nb\\t2\\n' | awk -F'\\t' '{ print $2 }'`, notes: [] }
          ]
        },
        {
          id: "output-separator", n: 2, title: "output separator", level: 1,
          gloss: "Joins printed fields with OFS and rebuilds the line.",
          examples: [
            { code: `echo 'a b c' | awk 'BEGIN { OFS = "-" } { print $1, $2, $3 }'`, notes: [{ at: "OFS", text: "output field separator" }] },
            { code: `echo 'a b c' | awk 'BEGIN { OFS = "," } { $1 = $1; print }'`, notes: [{ at: "$1 = $1", text: "forces the line to be rebuilt" }] },
            { code: `echo 'a b c' | awk -v OFS='|' '{ print $1, $3 }'`, notes: [] }
          ]
        },
        {
          id: "regex-separator", n: 3, title: "regex separators", level: 2,
          gloss: "Splits on a pattern instead of a single character.",
          examples: [
            { code: `echo 'a1b22c' | awk -F'[0-9]+' '{ print $1, $2, $3 }'`, notes: [{ at: "[0-9]+", text: "any run of digits" }] },
            { code: `echo 'a, b;c' | awk -F'[,;] *' '{ print $2 }'`, notes: [] },
            { code: `echo 'x  y   z' | awk -F' +' '{ print $2 }'`, notes: [] }
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
          id: "builtin-math", n: 1, title: "math functions", level: 2,
          gloss: "Calculates roots, powers and integer parts with built in math functions.",
          examples: [
            { code: `awk 'BEGIN { print int(7.9), sqrt(16) }'`, notes: [{ at: "int", text: "truncates toward zero" }] },
            { code: `awk 'BEGIN { print 2 ^ 10, exp(0), log(1) }'`, notes: [] },
            { code: `awk 'BEGIN { srand(1); print (rand() < 1) }'`, notes: [] }
          ]
        },
        {
          id: "user-functions", n: 2, title: "user defined functions", level: 2,
          gloss: "Defines a reusable function with the function keyword.",
          examples: [
            { code: `awk 'function sq(n) { return n * n } BEGIN { print sq(7) }'`, notes: [{ at: "function", text: "declares a function" }] },
            { code: `awk 'function max(a, b) { return a > b ? a : b }
     BEGIN { print max(3, 9) }'`, notes: [] },
            { code: `printf '3\\n4\\n' |
  awk 'function cube(x) { return x * x * x } { print cube($1) }'`, notes: [] }
          ]
        },
        {
          id: "recursion-locals", n: 3, title: "recursion and locals", level: 3,
          gloss: "Recurses and keeps local variables as extra parameters.",
          examples: [
            { code: `awk 'function fact(n) { return n <= 1 ? 1 : n * fact(n - 1) }
     BEGIN { print fact(5) }'`, notes: [{ at: "fact(n - 1)", text: "calls itself" }] },
            { code: `awk 'function hello(name,   msg) { msg = "Hi " name; return msg }
     BEGIN { print hello("Ada") }'`, notes: [{ at: "name,   msg", text: "msg is a local variable" }] },
            { code: `awk 'function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2) }
     BEGIN { print fib(10) }'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "one-liners",
      n: 11,
      title: "one liners",
      concepts: [
        {
          id: "dedupe-count", n: 1, title: "dedupe and count", level: 2,
          gloss: "Removes duplicate lines and counts lines with short programs.",
          examples: [
            { code: `printf 'a\\nb\\na\\n' | awk '!seen[$0]++'`, notes: [{ at: "!seen[$0]++", text: "true only the first time" }] },
            { code: `printf 'a\\nb\\na\\n' | awk 'END { print NR }'`, notes: [] },
            { code: `printf 'x\\n\\ny\\n' | awk 'NF'`, notes: [{ at: "NF", text: "true when the line has fields" }] }
          ]
        },
        {
          id: "reshape-lines", n: 2, title: "reshape lines", level: 2,
          gloss: "Reverses fields, joins lines and numbers output.",
          examples: [
            { code: `echo 'a b c' |
  awk '{ for (i = NF; i > 0; i--) printf "%s ", $i; print "" }'`, notes: [] },
            { code: `printf 'a\\nb\\nc\\n' | awk '{ printf "%s,", $0 } END { print "" }'`, notes: [] },
            { code: `printf 'a\\nb\\n' | awk '{ print NR, $0 }'`, notes: [] }
          ]
        },
        {
          id: "column-tools", n: 3, title: "column tools", level: 2,
          gloss: "Adds up numbers, averages them or selects whole columns from tables.",
          examples: [
            { code: `printf 'a 1\\nb 2\\nc 3\\n' | awk '{ s += $2 } END { print s }'`, notes: [] },
            { code: `printf 'a 1 x\\nb 2 y\\n' | awk '{ print $1, $3 }'`, notes: [{ at: "$1, $3", text: "picks columns" }] },
            { code: `printf 'a 4\\nb 6\\n' | awk '{ s += $2 } END { print s / NR }'`, notes: [] }
          ]
        }
      ]
    }
  ]
};
