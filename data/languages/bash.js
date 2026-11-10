export default {
  id: "bash",
  name: "Bash",
  short: "SH",
  pigment: "bash",
  family: null,
  version: "5.x",
  lexer: "bash",
  indent: 2,
  topics: [
    {
      id: "variables-quoting",
      n: 1,
      title: "variables & quoting",
      concepts: [
        {
          id: "assign-expand", n: 1, title: "assigning and expanding", level: 1,
          gloss: "Stores text in a variable and expands it with a dollar sign.",
          examples: [
            { code: `name="ada"
echo "hello $name"`, notes: [{ at: "name=", text: "no spaces around the equals sign" }] },
            { code: `count=3
echo "count is \${count}"`, notes: [{ at: "${count}", text: "braces mark where the name ends" }] },
            { code: `dir=src
echo "\${dir}_backup"`, notes: [{ at: "${dir}_backup", text: "braces end the name before _backup" }] }
          ]
        },
        {
          id: "quoting", n: 2, title: "quoting", level: 1,
          gloss: "Controls word splitting and expansion with quotes.",
          examples: [
            { code: `file="my notes.txt"
touch "$file"`, notes: [{ at: "\"$file\"", text: "keeps the space inside one word" }] },
            { code: `echo 'cost: $5'`, notes: [{ at: "'cost: $5'", text: "single quotes expand nothing" }] },
            { code: `msg="path is $PWD"
echo "$msg"`, notes: [{ at: "\"path is $PWD\"", text: "double quotes still expand" }] }
          ]
        },
        {
          id: "command-substitution", n: 3, title: "command substitution", level: 2,
          gloss: "Captures a command's output with command substitution.",
          examples: [
            { code: `today=$(date +%F)
echo "$today"`, notes: [{ at: "$(date +%F)", text: "runs the command, keeps its output" }] },
            { code: `lines=$(wc -l < notes.txt)
echo "$lines lines"`, notes: [] },
            { code: `files=$(ls src | wc -l)
echo "src has $files entries"`, notes: [] }
          ]
        },
        {
          id: "env-export", n: 4, title: "export and readonly", level: 2,
          gloss: "Controls which variables child processes see and which can change.",
          examples: [
            { code: `export LOG_LEVEL=debug
bash -c 'echo $LOG_LEVEL'`, notes: [{ at: "export", text: "child processes inherit it" }] },
            { code: `LOG_LEVEL=info bash -c 'echo $LOG_LEVEL'`, notes: [{ at: "LOG_LEVEL=info", text: "set for this one command only" }] },
            { code: `readonly VERSION=1.2
echo "$VERSION"`, notes: [{ at: "readonly", text: "cannot be changed later" }] }
          ]
        }
      ]
    },
    {
      id: "conditionals-tests",
      n: 2,
      title: "conditionals & tests",
      concepts: [
        {
          id: "if-else", n: 1, title: "if and else", level: 1,
          gloss: "Branches on a command's exit status with if.",
          examples: [
            { code: `if [ -f notes.txt ]; then
  echo "found"
else
  echo "missing"
fi`, notes: [{ at: "[ -f notes.txt ]", text: "a command that returns a status" }] },
            { code: `if grep -q ERROR app.log; then
  echo "errors found"
fi`, notes: [{ at: "grep -q", text: "quiet, only the status matters" }] },
            { code: `if [ "$1" = "alpha" ]; then
  echo "first"
elif [ "$1" = "beta" ]; then
  echo "second"
else
  echo "other"
fi`, notes: [{ at: "elif", text: "the next test when the first fails" }] }
          ]
        },
        {
          id: "test-operators", n: 2, title: "test operators", level: 1,
          gloss: "Tests files, strings and numbers inside brackets.",
          examples: [
            { code: `[ -d src ] && echo "src is a directory"`, notes: [{ at: "-d", text: "true for a directory" }] },
            { code: `n=5
[ "$n" -gt 3 ] && echo "big"`, notes: [{ at: "-gt", text: "a numeric comparison" }] },
            { code: `s=""
[ -z "$s" ] && echo "empty"`, notes: [{ at: "-z", text: "true for an empty string" }] }
          ]
        },
        {
          id: "double-brackets", n: 3, title: "double brackets", level: 2,
          gloss: "Uses [[ ]] for pattern matching and safer tests.",
          examples: [
            { code: `name="report.txt"
if [[ $name == *.txt ]]; then
  echo "text file"
fi`, notes: [{ at: "*.txt", text: "an unquoted glob pattern" }] },
            { code: `s="abc123"
if [[ $s =~ ^[a-z]+[0-9]+$ ]]; then
  echo "matches"
fi`, notes: [{ at: "=~", text: "a regular expression match" }] },
            { code: `a=3
b=4
if [[ $a -lt 5 && $b -lt 5 ]]; then
  echo "both small"
fi`, notes: [{ at: "&&", text: "allowed inside [[ ]]" }] }
          ]
        },
        {
          id: "case-statements", n: 4, title: "case", level: 2,
          gloss: "Matches one value against several patterns with case.",
          examples: [
            { code: `case "$1" in
  alpha) echo "a" ;;
  beta) echo "b" ;;
  *) echo "other" ;;
esac`, notes: [{ at: ";;", text: "ends each branch" }] },
            { code: `file="photo.png"
case "$file" in
  *.png|*.jpg) echo "image" ;;
  *.txt) echo "text" ;;
esac`, notes: [{ at: "*.png|*.jpg", text: "either pattern" }] },
            { code: `answer="y"
case "$answer" in
  [yY]*) echo "yes" ;;
  *) echo "no" ;;
esac`, notes: [{ at: "[yY]*", text: "y or Y followed by anything" }] }
          ]
        }
      ]
    },
    {
      id: "loops",
      n: 3,
      title: "loops",
      concepts: [
        {
          id: "for-loops", n: 1, title: "for loops", level: 1,
          gloss: "Repeats a command for each word in a list.",
          examples: [
            { code: `for name in ada grace linus; do
  echo "$name"
done`, notes: [{ at: "for name in", text: "one pass per word" }] },
            { code: `for f in src/*.py; do
  echo "$f"
done`, notes: [{ at: "src/*.py", text: "a glob expands to matching files" }] },
            { code: `for i in {1..3}; do
  echo "round $i"
done`, notes: [{ at: "{1..3}", text: "brace expansion" }] }
          ]
        },
        {
          id: "while-until", n: 2, title: "while and until", level: 1,
          gloss: "Loops while or until a condition holds.",
          examples: [
            { code: `n=3
while [ "$n" -gt 0 ]; do
  echo "$n"
  n=$((n - 1))
done`, notes: [{ at: "while", text: "repeats as long as the test passes" }] },
            { code: `i=0
until [ "$i" -ge 3 ]; do
  i=$((i + 1))
done
echo "$i"`, notes: [{ at: "until", text: "repeats until the test passes" }] },
            { code: `while read -r line; do
  echo "$line"
done < notes.txt`, notes: [{ at: "< notes.txt", text: "feeds the file to read" }] }
          ]
        },
        {
          id: "c-style-loops", n: 3, title: "C-style loops", level: 2,
          gloss: "Counts with a C-style for loop.",
          examples: [
            { code: `for ((i = 0; i < 3; i++)); do
  echo "$i"
done`, notes: [{ at: "((i = 0; i < 3; i++))", text: "arithmetic, no dollar signs" }] },
            { code: `for ((i = 10; i > 0; i -= 5)); do
  echo "$i"
done`, notes: [] },
            { code: `total=0
for ((i = 1; i <= 4; i++)); do
  total=$((total + i))
done
echo "$total"`, notes: [] }
          ]
        },
        {
          id: "break-continue", n: 4, title: "break and continue", level: 2,
          gloss: "Skips items or leaves a loop early.",
          examples: [
            { code: `for n in 1 2 3 4; do
  [ "$n" -eq 3 ] && break
  echo "$n"
done`, notes: [{ at: "break", text: "leaves the loop" }] },
            { code: `for f in src/*; do
  [ -d "$f" ] && continue
  echo "$f"
done`, notes: [{ at: "continue", text: "skips to the next item" }] },
            { code: `while true; do
  echo "once"
  break
done`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "functions",
      n: 4,
      title: "functions",
      concepts: [
        {
          id: "define-call", n: 1, title: "defining and calling", level: 1,
          gloss: "Groups commands under a name you can call.",
          examples: [
            { code: `greet() {
  echo "hello $1"
}
greet ada`, notes: [{ at: "$1", text: "the first argument of the call" }] },
            { code: `say_date() {
  date +%F
}
say_date`, notes: [] },
            { code: `function banner {
  echo "== $1 =="
}
banner build`, notes: [{ at: "function", text: "the other definition form" }] }
          ]
        },
        {
          id: "return-values", n: 2, title: "return values", level: 2,
          gloss: "Returns a status code or prints a result.",
          examples: [
            { code: `is_even() {
  [ $(($1 % 2)) -eq 0 ]
}
is_even 4 && echo "even"`, notes: [{ at: "[ $(($1 % 2)) -eq 0 ]", text: "its status is the function's status" }] },
            { code: `add() {
  echo $(($1 + $2))
}
sum=$(add 2 3)
echo "$sum"`, notes: [{ at: "$(add 2 3)", text: "captures what the function prints" }] },
            { code: `check() {
  [ -f "$1" ] || return 1
  return 0
}
check notes.txt; echo $?`, notes: [{ at: "return 1", text: "only status codes, 0 to 255" }] }
          ]
        },
        {
          id: "local-variables", n: 3, title: "local variables", level: 2,
          gloss: "Keeps variables inside a function with local.",
          examples: [
            { code: `f() {
  local x=1
  echo "$x"
}
f`, notes: [{ at: "local", text: "invisible outside the function" }] },
            { code: `counter=0
bump() {
  counter=$((counter + 1))
}
bump
echo "$counter"`, notes: [{ at: "counter", text: "a global, shared with the caller" }] },
            { code: `greet() {
  local who="\${1:-world}"
  echo "hello $who"
}
greet`, notes: [] }
          ]
        },
        {
          id: "function-args", n: 4, title: "function arguments", level: 2,
          gloss: "Reads arguments with $1, $@ and shift.",
          examples: [
            { code: `show_all() {
  for a in "$@"; do
    echo "- $a"
  done
}
show_all one two`, notes: [{ at: "\"$@\"", text: "each argument stays one word" }] },
            { code: `count_args() {
  echo "$# arguments"
}
count_args a b c`, notes: [{ at: "$#", text: "the number of arguments" }] },
            { code: `first_then_rest() {
  local first="$1"
  shift
  echo "$first / $*"
}
first_then_rest a b c`, notes: [{ at: "shift", text: "drops the first argument" }] }
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
          id: "indexed-arrays", n: 1, title: "indexed arrays", level: 1,
          gloss: "Stores a list of values in an indexed array.",
          examples: [
            { code: `fruits=(apple banana cherry)
echo "\${fruits[0]}"`, notes: [{ at: "${fruits[0]}", text: "indexes start at 0" }] },
            { code: `fruits=(apple banana)
fruits+=(cherry)
echo "\${#fruits[@]}"`, notes: [{ at: "${#fruits[@]}", text: "the number of elements" }] },
            { code: `files=(src/*.py)
echo "\${files[@]}"`, notes: [{ at: "src/*.py", text: "a glob fills the array" }] }
          ]
        },
        {
          id: "array-iteration", n: 2, title: "looping over arrays", level: 1,
          gloss: "Loops over array elements safely.",
          examples: [
            { code: `names=("ada l" grace)
for n in "\${names[@]}"; do
  echo "$n"
done`, notes: [{ at: "\"${names[@]}\"", text: "keeps ada l as one item" }] },
            { code: `nums=(3 1 2)
for i in "\${!nums[@]}"; do
  echo "$i: \${nums[$i]}"
done`, notes: [{ at: "${!nums[@]}", text: "the indexes" }] },
            { code: `mapfile -t lines < notes.txt
echo "\${#lines[@]}"`, notes: [{ at: "mapfile", text: "reads a file into an array" }] }
          ]
        },
        {
          id: "array-slices", n: 3, title: "slices and removal", level: 2,
          gloss: "Slices arrays, reads from the end and removes elements.",
          examples: [
            { code: `a=(a b c d e)
echo "\${a[@]:1:3}"`, notes: [{ at: ":1:3", text: "start at 1, take 3" }] },
            { code: `a=(a b c)
echo "\${a[-1]}"`, notes: [{ at: "[-1]", text: "the last element" }] },
            { code: `a=(a b c)
unset 'a[1]'
echo "\${a[@]}"`, notes: [{ at: "unset", text: "removes one element" }] }
          ]
        },
        {
          id: "associative-arrays", n: 4, title: "associative arrays", level: 3,
          gloss: "Maps keys to values with an associative array.",
          examples: [
            { code: `declare -A ages
ages[ada]=36
echo "\${ages[ada]}"`, notes: [{ at: "declare -A", text: "needed for string keys" }] },
            { code: `declare -A colors=([red]=1 [blue]=2)
for k in "\${!colors[@]}"; do
  echo "$k=\${colors[$k]}"
done`, notes: [{ at: "${!colors[@]}", text: "the keys" }] },
            { code: `declare -A seen
for w in a b a; do
  seen[$w]=$(( \${seen[$w]:-0} + 1 ))
done
echo "\${seen[a]}"`, notes: [{ at: ":-0", text: "zero for a key not seen yet" }] }
          ]
        }
      ]
    },
    {
      id: "parameter-expansion",
      n: 6,
      title: "parameter expansion",
      concepts: [
        {
          id: "defaults", n: 1, title: "default values", level: 1,
          gloss: "Supplies a default when a variable is unset or empty.",
          examples: [
            { code: `echo "\${name:-guest}"`, notes: [{ at: ":-", text: "use the default, do not assign" }] },
            { code: `: "\${PORT:=8080}"
echo "$PORT"`, notes: [{ at: ":=", text: "assigns the default too" }] },
            { code: `echo "\${1:?missing argument}"`, notes: [{ at: ":?", text: "stops with an error when unset" }] }
          ]
        },
        {
          id: "trimming", n: 2, title: "trimming", level: 2,
          gloss: "Removes a prefix or suffix from a value.",
          examples: [
            { code: `path="src/main.py"
echo "\${path%.py}"`, notes: [{ at: "%.py", text: "strips the shortest matching suffix" }] },
            { code: `path="src/lib/main.py"
echo "\${path##*/}"`, notes: [{ at: "##*/", text: "strips everything up to the last slash" }] },
            { code: `file="archive.tar.gz"
echo "\${file%%.*}"`, notes: [{ at: "%%.*", text: "strips from the first dot on" }] }
          ]
        },
        {
          id: "substitution-case", n: 3, title: "replace and case", level: 2,
          gloss: "Replaces text and changes case inside an expansion.",
          examples: [
            { code: `s="a-b-c"
echo "\${s//-/_}"`, notes: [{ at: "//", text: "replaces every match" }] },
            { code: `s="hello"
echo "\${s^^}"`, notes: [{ at: "^^", text: "uppercase everything" }] },
            { code: `s="Hello"
echo "\${s,,}"`, notes: [{ at: ",,", text: "lowercase everything" }] }
          ]
        },
        {
          id: "length-substring", n: 4, title: "length and substrings", level: 2,
          gloss: "Measures and slices a string.",
          examples: [
            { code: `s="platen"
echo "\${#s}"`, notes: [{ at: "#s", text: "the length" }] },
            { code: `s="platen"
echo "\${s:2:3}"`, notes: [{ at: ":2:3", text: "from offset 2, three characters" }] },
            { code: `s="platen"
echo "\${s: -3}"`, notes: [{ at: ": -3", text: "the space avoids the default form" }] }
          ]
        }
      ]
    },
    {
      id: "pipes-redirects",
      n: 7,
      title: "pipes & redirects",
      concepts: [
        {
          id: "pipes", n: 1, title: "pipes", level: 1,
          gloss: "Feeds one command's output into the next.",
          examples: [
            { code: `cat notes.txt | sort | uniq`, notes: [{ at: "|", text: "stdout becomes the next stdin" }] },
            { code: `ls src | wc -l`, notes: [] },
            { code: `cut -d, -f2 data.csv | sort | head -3`, notes: [] }
          ]
        },
        {
          id: "redirects", n: 2, title: "redirects", level: 1,
          gloss: "Sends output to files and reads input from them.",
          examples: [
            { code: `echo "run" > out.txt`, notes: [{ at: ">", text: "overwrites the file" }] },
            { code: `echo "again" >> out.txt`, notes: [{ at: ">>", text: "appends" }] },
            { code: `sort < numbers.txt`, notes: [{ at: "<", text: "reads stdin from a file" }] }
          ]
        },
        {
          id: "stderr-redirects", n: 3, title: "redirecting stderr", level: 2,
          gloss: "Redirects error output separately from normal output.",
          examples: [
            { code: `ls missing 2> errors.txt`, notes: [{ at: "2>", text: "file descriptor 2 is stderr" }] },
            { code: `ls src missing > out.txt 2>&1`, notes: [{ at: "2>&1", text: "stderr follows stdout" }] },
            { code: `ls missing 2> /dev/null`, notes: [{ at: "/dev/null", text: "discards the output" }] }
          ]
        },
        {
          id: "tee", n: 4, title: "tee", level: 2,
          gloss: "Writes output to a file and to the screen at once.",
          examples: [
            { code: `echo hi | tee out.txt`, notes: [{ at: "tee", text: "copies the stream to a file" }] },
            { code: `ls src | tee -a listing.txt`, notes: [{ at: "-a", text: "appends instead of overwriting" }] },
            { code: `sort numbers.txt | tee sorted.txt | head -1`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "grep-sed-awk",
      n: 8,
      title: "grep, sed, awk",
      concepts: [
        {
          id: "grep", n: 1, title: "grep", level: 1,
          gloss: "Searches text for lines that match a pattern.",
          examples: [
            { code: `grep ERROR app.log`, notes: [] },
            { code: `grep -c ERROR app.log`, notes: [{ at: "-c", text: "counts matching lines" }] },
            { code: `grep -ri todo src`, notes: [{ at: "-ri", text: "recursive, ignoring case" }] }
          ]
        },
        {
          id: "sed", n: 2, title: "sed", level: 2,
          gloss: "Edits text in a stream with sed.",
          examples: [
            { code: `sed 's/todo/TODO/' notes.txt`, notes: [{ at: "s/todo/TODO/", text: "the first match on each line" }] },
            { code: `sed -n '2,3p' notes.txt`, notes: [{ at: "-n", text: "print only what p selects" }] },
            { code: `sed '/^$/d' notes.txt`, notes: [{ at: "^$", text: "an empty line" }] }
          ]
        },
        {
          id: "awk", n: 3, title: "awk", level: 2,
          gloss: "Splits lines into fields and computes with awk.",
          examples: [
            { code: `awk -F, '{ print $2 }' data.csv`, notes: [{ at: "-F,", text: "comma as the field separator" }] },
            { code: `awk -F, 'NR > 1 { sum += $3 } END { print sum }' data.csv`, notes: [{ at: "END", text: "runs after the last line" }] },
            { code: `awk '{ print NR ": " $0 }' notes.txt`, notes: [{ at: "NR", text: "the line number" }] }
          ]
        },
        {
          id: "cut-sort-uniq", n: 4, title: "cut, sort, uniq", level: 1,
          gloss: "Reshapes columns and counts duplicates.",
          examples: [
            { code: `cut -d, -f1,3 data.csv`, notes: [{ at: "-f1,3", text: "columns one and three" }] },
            { code: `sort -t, -k3 -n data.csv | tail -2`, notes: [{ at: "-k3", text: "sort by the third field" }] },
            { code: `grep -o 'ERROR\\|INFO' app.log | sort | uniq -c`, notes: [{ at: "uniq -c", text: "counts adjacent duplicates" }] }
          ]
        }
      ]
    },
    {
      id: "find-xargs",
      n: 9,
      title: "find & xargs",
      concepts: [
        {
          id: "find-basics", n: 1, title: "find basics", level: 1,
          gloss: "Lists files that match name, type or size tests.",
          examples: [
            { code: `find src -name "*.py"`, notes: [{ at: "-name", text: "matches the file name" }] },
            { code: `find . -type d -name lib`, notes: [{ at: "-type d", text: "directories only" }] },
            { code: `find . -type f -size +0 -name "*.md"`, notes: [{ at: "-size +0", text: "larger than zero bytes" }] }
          ]
        },
        {
          id: "find-actions", n: 2, title: "find actions", level: 2,
          gloss: "Acts on matches with -exec and -delete.",
          examples: [
            { code: `find tmp -name "*.tmp" -delete`, notes: [{ at: "-delete", text: "removes every match" }] },
            { code: `find src -name "*.py" -exec wc -l {} +`, notes: [{ at: "{}", text: "the matched file names" }] },
            { code: `find build -type f -exec echo {} \\;`, notes: [{ at: "\\;", text: "runs the command once per file" }] }
          ]
        },
        {
          id: "xargs", n: 3, title: "xargs", level: 2,
          gloss: "Builds commands from input lines with xargs.",
          examples: [
            { code: `ls src | xargs -n 1 echo`, notes: [{ at: "-n 1", text: "one argument per command" }] },
            { code: `find src -name "*.py" -print0 | xargs -0 wc -l`, notes: [{ at: "-print0", text: "safe for names with spaces" }] },
            { code: `echo "a b c" | xargs -n 2 echo`, notes: [] }
          ]
        },
        {
          id: "find-filters", n: 4, title: "combining tests", level: 3,
          gloss: "Combines find tests with or, not and depth limits.",
          examples: [
            { code: `find . -name "*.py" -o -name "*.md"`, notes: [{ at: "-o", text: "either test" }] },
            { code: `find src -type f ! -name "*.pyc"`, notes: [{ at: "!", text: "negates the test" }] },
            { code: `find . -maxdepth 1 -type f -newer notes.txt`, notes: [{ at: "-maxdepth 1", text: "does not descend into folders" }] }
          ]
        }
      ]
    },
    {
      id: "arguments-getopts",
      n: 10,
      title: "arguments & getopts",
      concepts: [
        {
          id: "positional-args", n: 1, title: "positional arguments", level: 1,
          gloss: "Reads the arguments a script receives.",
          examples: [
            { code: `echo "first: $1, second: $2"`, notes: [{ at: "$1", text: "the first argument" }] },
            { code: `echo "got $# arguments"`, notes: [{ at: "$#", text: "how many were passed" }] },
            { code: `for arg in "$@"; do
  echo "$arg"
done`, notes: [{ at: "\"$@\"", text: "every argument, kept separate" }] }
          ]
        },
        {
          id: "shift-loop", n: 2, title: "shift loops", level: 2,
          gloss: "Walks through arguments with shift.",
          examples: [
            { code: `while [ $# -gt 0 ]; do
  echo "$1"
  shift
done`, notes: [{ at: "shift", text: "moves the next argument into $1" }] },
            { code: `while [ $# -gt 0 ]; do
  case "$1" in
    -v) verbose=1 ;;
    *) echo "arg: $1" ;;
  esac
  shift
done`, notes: [{ at: "-v", text: "a flag with no value" }] },
            { code: `cmd="\${1:-help}"
shift || true
echo "$cmd"`, notes: [{ at: "shift || true", text: "no error when nothing is left" }] }
          ]
        },
        {
          id: "getopts", n: 3, title: "getopts", level: 3,
          gloss: "Parses short options with getopts.",
          examples: [
            { code: `while getopts "vn:" opt; do
  case "$opt" in
    v) verbose=1 ;;
    n) name="$OPTARG" ;;
  esac
done`, notes: [{ at: "\"vn:\"", text: "n takes a value, v does not" }] },
            { code: `while getopts "h" opt; do
  case "$opt" in
    h) echo "usage: run [-h]"; exit 0 ;;
  esac
done
shift $((OPTIND - 1))`, notes: [{ at: "OPTIND", text: "the index of the first non-option" }] },
            { code: `while getopts ":f:" opt; do
  case "$opt" in
    f) file="$OPTARG" ;;
    :) echo "-$OPTARG needs a value" ;;
  esac
done`, notes: [{ at: "\":f:\"", text: "the leading colon makes errors yours" }] }
          ]
        },
        {
          id: "usage-checks", n: 4, title: "usage checks", level: 2,
          gloss: "Validates arguments before doing any work.",
          examples: [
            { code: `[ $# -ge 1 ] || { echo "usage: run NAME"; exit 1; }`, notes: [{ at: "|| {", text: "runs only when the test fails" }] },
            { code: `if [ $# -lt 2 ]; then
  echo "need two arguments" >&2
  exit 2
fi`, notes: [{ at: ">&2", text: "the message goes to stderr" }] },
            { code: `file="\${1:?usage: run FILE}"
[ -r "$file" ] || echo "cannot read $file"`, notes: [{ at: "-r", text: "true when the file is readable" }] }
          ]
        }
      ]
    },
    {
      id: "exit-codes-strict",
      n: 11,
      title: "exit codes & strict mode",
      concepts: [
        {
          id: "exit-status", n: 1, title: "exit status", level: 1,
          gloss: "Checks whether the last command succeeded.",
          examples: [
            { code: `ls src
echo "status $?"`, notes: [{ at: "$?", text: "the last exit status" }] },
            { code: `grep -q ERROR app.log
echo $?`, notes: [{ at: "echo $?", text: "0 is success, anything else a failure" }] },
            { code: `false
echo $?`, notes: [] }
          ]
        },
        {
          id: "and-or-lists", n: 2, title: "and and or lists", level: 1,
          gloss: "Chains commands on success or failure.",
          examples: [
            { code: `mkdir -p build && echo "ready"`, notes: [{ at: "&&", text: "runs only if the first succeeded" }] },
            { code: `grep -q TODO notes.txt || echo "none"`, notes: [{ at: "||", text: "runs only if the first failed" }] },
            { code: `cd src && ls || echo "no src"`, notes: [] }
          ]
        },
        {
          id: "strict-mode", n: 3, title: "strict mode", level: 2,
          gloss: "Stops on errors and unset variables with set options.",
          examples: [
            { code: `set -euo pipefail
echo "strict"`, notes: [{ at: "-euo pipefail", text: "stop on error, unset name, pipe failure" }] },
            { code: `set -e
false
echo "not reached"`, notes: [{ at: "false", text: "set -e stops here" }] },
            { code: `set -u
echo "\${missing:-fallback}"`, notes: [{ at: ":-", text: "a default avoids the unset error" }] }
          ]
        },
        {
          id: "error-handling", n: 4, title: "handling failures", level: 2,
          gloss: "Handles failures explicitly with exit and conditions.",
          examples: [
            { code: `if ! cp notes.txt backup.txt; then
  echo "copy failed" >&2
  exit 1
fi`, notes: [{ at: "!", text: "negates the status" }] },
            { code: `cp notes.txt backup.txt || { echo "copy failed"; exit 1; }`, notes: [] },
            { code: `result=$(grep -c ERROR app.log) || result=0
echo "$result"`, notes: [{ at: "|| result=0", text: "a fallback when grep finds nothing" }] }
          ]
        }
      ]
    },
    {
      id: "heredocs-process-substitution",
      n: 12,
      title: "here-docs & process substitution",
      concepts: [
        {
          id: "here-docs", n: 1, title: "here-docs", level: 2,
          gloss: "Embeds multi-line text in a script with a here-doc.",
          examples: [
            { code: `cat <<EOF
hello
world
EOF`, notes: [{ at: "<<EOF", text: "everything up to EOF is the input" }] },
            { code: `name=ada
cat <<EOF
user: $name
EOF`, notes: [{ at: "$name", text: "expanded inside the here-doc" }] },
            { code: `cat <<'EOF'
cost: $5
EOF`, notes: [{ at: "'EOF'", text: "quoting turns expansion off" }] }
          ]
        },
        {
          id: "here-strings", n: 2, title: "here-strings", level: 2,
          gloss: "Feeds a string to stdin with a here-string.",
          examples: [
            { code: `grep -c a <<< "banana"`, notes: [{ at: "<<<", text: "a string as stdin" }] },
            { code: `read -r first second <<< "ada lovelace"
echo "$second"`, notes: [] },
            { code: `wc -w <<< "one two three"`, notes: [] }
          ]
        },
        {
          id: "process-substitution", n: 3, title: "process substitution", level: 3,
          gloss: "Treats a command's output as a file.",
          examples: [
            { code: `diff <(sort notes.txt) <(sort numbers.txt)`, notes: [{ at: "<(sort notes.txt)", text: "looks like a file name" }] },
            { code: `while read -r line; do
  echo "$line"
done < <(ls src)`, notes: [{ at: "< <(", text: "avoids a subshell for the loop" }] },
            { code: `comm -12 <(sort notes.txt) <(sort notes.txt)`, notes: [{ at: "comm -12", text: "only the lines both inputs share" }] }
          ]
        },
        {
          id: "heredoc-redirect", n: 4, title: "here-docs into files", level: 3,
          gloss: "Writes a here-doc straight into a file.",
          examples: [
            { code: `cat > config.ini <<EOF
[app]
name=platen
EOF`, notes: [{ at: "> config.ini", text: "the here-doc becomes the file" }] },
            { code: `cat <<EOF >> app.conf
retries=3
EOF`, notes: [{ at: ">>", text: "appends the lines" }] },
            { code: `tee settings.txt <<EOF > /dev/null
mode=fast
EOF`, notes: [{ at: "> /dev/null", text: "write the file, hide the echo" }] }
          ]
        }
      ]
    },
    {
      id: "traps",
      n: 13,
      title: "traps",
      concepts: [
        {
          id: "trap-exit", n: 1, title: "the EXIT trap", level: 2,
          gloss: "Runs cleanup code when the script exits.",
          examples: [
            { code: `trap 'echo "bye"' EXIT
echo "working"`, notes: [{ at: "EXIT", text: "runs on every exit" }] },
            { code: `tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT
echo "data" > "$tmp"`, notes: [{ at: "rm -f", text: "the temp file is always removed" }] },
            { code: `cleanup() {
  rm -f scratch.txt
}
trap cleanup EXIT
touch scratch.txt`, notes: [{ at: "trap cleanup", text: "a function can be the handler" }] }
          ]
        },
        {
          id: "trap-signals", n: 2, title: "signal traps", level: 3,
          gloss: "Reacts to signals such as INT and TERM.",
          examples: [
            { code: `trap 'echo "interrupted"; exit 130' INT
sleep 0.1`, notes: [{ at: "INT", text: "sent by Ctrl-C" }] },
            { code: `trap 'echo "stopping"' TERM
kill -TERM $$`, notes: [{ at: "$$", text: "the shell's own process id" }] },
            { code: `trap '' HUP
echo "ignores hangup"`, notes: [{ at: "''", text: "an empty handler ignores the signal" }] }
          ]
        },
        {
          id: "trap-err", n: 3, title: "the ERR trap", level: 3,
          gloss: "Reports where a command failed with an ERR trap.",
          examples: [
            { code: `trap 'echo "failed at line $LINENO"' ERR
false`, notes: [{ at: "$LINENO", text: "the line of the failure" }] },
            { code: `set -E
trap 'echo "error in a function"' ERR
f() { false; }
f`, notes: [{ at: "set -E", text: "functions inherit the trap" }] },
            { code: `trap 'echo "failed"' ERR
trap - ERR`, notes: [{ at: "trap - ERR", text: "removes the handler" }] }
          ]
        }
      ]
    },
    {
      id: "arithmetic",
      n: 14,
      title: "arithmetic",
      concepts: [
        {
          id: "arithmetic-expansion", n: 1, title: "arithmetic expansion", level: 1,
          gloss: "Computes integers with the dollar-parenthesis form.",
          examples: [
            { code: `echo $((2 + 3 * 4))`, notes: [{ at: "$((2 + 3 * 4))", text: "normal operator precedence" }] },
            { code: `a=7
b=2
echo $((a / b)) $((a % b))`, notes: [{ at: "/", text: "integer division" }] },
            { code: `n=5
n=$((n * n))
echo "$n"`, notes: [] }
          ]
        },
        {
          id: "increment-assign", n: 2, title: "incrementing", level: 1,
          gloss: "Updates numbers with increment, compound assignment and let.",
          examples: [
            { code: `i=0
((i++))
echo "$i"`, notes: [{ at: "((i++))", text: "adds one in place" }] },
            { code: `total=10
((total += 5))
echo "$total"`, notes: [{ at: "+=", text: "compound assignment" }] },
            { code: `let "x = 3 * 4"
echo "$x"`, notes: [{ at: "let", text: "evaluates an arithmetic expression" }] }
          ]
        },
        {
          id: "arithmetic-compare", n: 3, title: "arithmetic comparisons", level: 2,
          gloss: "Compares numbers inside double parentheses.",
          examples: [
            { code: `if ((5 > 3)); then
  echo "greater"
fi`, notes: [{ at: "((5 > 3))", text: "real comparison operators" }] },
            { code: `n=4
if ((n % 2 == 0)); then
  echo "even"
fi`, notes: [] },
            { code: `a=3
b=9
max=$(( a > b ? a : b ))
echo "$max"`, notes: [{ at: "a > b ? a : b", text: "a ternary expression" }] }
          ]
        },
        {
          id: "floats-awk", n: 4, title: "decimals", level: 3,
          gloss: "Handles decimals with awk, since the shell only does integers.",
          examples: [
            { code: `awk 'BEGIN { print 10 / 3 }'`, notes: [{ at: "BEGIN", text: "runs before any input" }] },
            { code: `awk 'BEGIN { printf "%.2f\\n", 10 / 3 }'`, notes: [{ at: "%.2f", text: "two decimal places" }] },
            { code: `echo "3.5 2" | awk '{ print $1 * $2 }'`, notes: [{ at: "$1 * $2", text: "fields are converted to numbers" }] }
          ]
        }
      ]
    }
  ]
};
