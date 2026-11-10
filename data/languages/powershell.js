export default {
  id: "powershell",
  name: "PowerShell",
  short: "PS",
  pigment: "powershell",
  family: null,
  version: "7.x",
  lexer: "powershell",
  indent: 4,
  topics: [
    {
      id: "variables-types",
      n: 1,
      title: "variables & types",
      concepts: [
        {
          id: "variables", n: 1, title: "variables", level: 1,
          gloss: "Stores values in variables that start with a dollar sign.",
          examples: [
            { code: `$name = "ada"
$count = 3
Write-Output "$name $count"`, notes: [{ at: "$name", text: "no declaration needed" }] },
            { code: `$price = 9.99
$total = $price * 3
$total`, notes: [{ at: "$total", text: "a bare expression is output" }] },
            { code: `$a, $b = 1, 2
$a + $b`, notes: [{ at: "$a, $b", text: "assigns several at once" }] }
          ]
        },
        {
          id: "type-conversion", n: 2, title: "type conversion", level: 1,
          gloss: "Converts values with type accelerators in square brackets.",
          examples: [
            { code: `[int]$n = "42"
$n + 1`, notes: [{ at: "[int]", text: "converts and locks the type" }] },
            { code: `$d = [datetime]"2024-05-06"
$d.Year`, notes: [{ at: "[datetime]", text: "text becomes a date" }] },
            { code: `$s = [string]123
$s.GetType().Name`, notes: [{ at: "GetType()", text: "reports the .NET type" }] }
          ]
        },
        {
          id: "automatic-variables", n: 3, title: "automatic variables", level: 2,
          gloss: "Reads built-in variables such as $_, $PWD and $?.",
          examples: [
            { code: `$here = $PWD.Path
$here`, notes: [{ at: "$PWD", text: "the current location" }] },
            { code: `Get-Item notes.txt | Out-Null
$?`, notes: [{ at: "$?", text: "true when the last command succeeded" }] },
            { code: `1, 2, 3 | ForEach-Object { $_ * 2 }`, notes: [{ at: "$_", text: "the current pipeline item" }] }
          ]
        },
        {
          id: "null-handling", n: 4, title: "null handling", level: 2,
          gloss: "Handles null values with coalescing and conditional operators.",
          examples: [
            { code: `$value = $null
$value ?? "default"`, notes: [{ at: "??", text: "the right side when the left is null" }] },
            { code: `$name = $null
$name ??= "guest"
$name`, notes: [{ at: "??=", text: "assigns only when null" }] },
            { code: `$text = $null
\${text}?.Length`, notes: [{ at: "?.", text: "null-conditional member access" }] }
          ]
        }
      ]
    },
    {
      id: "strings-herestrings",
      n: 2,
      title: "strings & here-strings",
      concepts: [
        {
          id: "quoting", n: 1, title: "quoting", level: 1,
          gloss: "Chooses between expanding and literal strings.",
          examples: [
            { code: `$name = "ada"
"hello $name"`, notes: [{ at: "\"hello $name\"", text: "variables expand" }] },
            { code: `'cost: $5'`, notes: [{ at: "'cost: $5'", text: "nothing expands" }] },
            { code: `$n = 3
"items: $($n * 2)"`, notes: [{ at: "$($n * 2)", text: "an expression inside a string" }] }
          ]
        },
        {
          id: "string-methods", n: 2, title: "string methods", level: 1,
          gloss: "Transforms and searches strings with .NET methods.",
          examples: [
            { code: `"  Hello  ".Trim().ToUpper()`, notes: [{ at: "Trim()", text: "returns a new string" }] },
            { code: `"a,b,c".Split(",")`, notes: [] },
            { code: `"hello world".Contains("world")`, notes: [] }
          ]
        },
        {
          id: "string-operators", n: 3, title: "string operators", level: 2,
          gloss: "Works with text through the -split, -join and -replace operators.",
          examples: [
            { code: `"a,b,c" -split ","`, notes: [{ at: "-split", text: "an operator, regex by default" }] },
            { code: `"a", "b", "c" -join "-"`, notes: [{ at: "-join", text: "glues the items together" }] },
            { code: `"2024-05" -replace "(\\d+)-(\\d+)", '$2/$1'`, notes: [{ at: "'$2/$1'", text: "single quotes keep the groups literal" }] }
          ]
        },
        {
          id: "here-strings", n: 4, title: "here-strings", level: 2,
          gloss: "Writes multi-line text with here-strings.",
          examples: [
            { code: `$text = @"
line one
line two
"@
$text`, notes: [{ at: "@\"", text: "starts a here-string" }] },
            { code: `$name = "ada"
@"
user: $name
"@`, notes: [{ at: "$name", text: "expanded in a double-quoted here-string" }] },
            { code: `@'
cost: $5
'@`, notes: [{ at: "@'", text: "single-quoted, nothing expands" }] }
          ]
        },
        {
          id: "string-format", n: 5, title: "formatting", level: 2,
          gloss: "Formats values with the -f operator and format strings.",
          examples: [
            { code: `"{0} is {1}" -f "ada", 36`, notes: [{ at: "{0}", text: "the first argument" }] },
            { code: `"{0:N2}" -f 3.14159`, notes: [{ at: "{0:N2}", text: "two decimal places" }] },
            { code: `"{0:yyyy-MM-dd}" -f (Get-Date "2024-05-06")`, notes: [{ at: "yyyy-MM-dd", text: "a date format string" }] }
          ]
        }
      ]
    },
    {
      id: "arrays-hashtables",
      n: 3,
      title: "arrays & hashtables",
      concepts: [
        {
          id: "arrays", n: 1, title: "arrays", level: 1,
          gloss: "Stores ordered values in an array.",
          examples: [
            { code: `$nums = 1, 2, 3
$nums[0]`, notes: [{ at: "1, 2, 3", text: "a comma makes an array" }] },
            { code: `$names = @("ada", "grace")
$names += "linus"
$names.Count`, notes: [{ at: "+=", text: "builds a new array each time" }] },
            { code: `$nums = 1..5
$nums[1..3]`, notes: [{ at: "1..5", text: "a range" }] }
          ]
        },
        {
          id: "array-operations", n: 2, title: "array operations", level: 2,
          gloss: "Tests membership and combines arrays.",
          examples: [
            { code: `$nums = 1, 2, 3
$nums -contains 2`, notes: [{ at: "-contains", text: "the collection is on the left" }] },
            { code: `2 -in 1, 2, 3`, notes: [{ at: "-in", text: "the item is on the left" }] },
            { code: `$a = 1, 2
$b = 3, 4
$a + $b`, notes: [] }
          ]
        },
        {
          id: "hashtables", n: 3, title: "hashtables", level: 1,
          gloss: "Maps keys to values with a hashtable.",
          examples: [
            { code: `$ages = @{ ada = 36; grace = 85 }
$ages["ada"]`, notes: [{ at: "@{ ada = 36; grace = 85 }", text: "a hashtable literal" }] },
            { code: `$ages = @{}
$ages["linus"] = 54
$ages.ContainsKey("linus")`, notes: [] },
            { code: `$ages = @{ ada = 36 }
$ages.Remove("ada")
$ages.Count`, notes: [] }
          ]
        },
        {
          id: "hashtable-iteration", n: 4, title: "iterating hashtables", level: 2,
          gloss: "Loops over a hashtable's keys and values.",
          examples: [
            { code: `$ages = @{ ada = 36; grace = 85 }
foreach ($key in $ages.Keys) {
    "$key is $($ages[$key])"
}`, notes: [{ at: "$ages.Keys", text: "the keys, in no fixed order" }] },
            { code: `$ages = @{ ada = 36 }
$ages.GetEnumerator() | ForEach-Object { "$($_.Key)=$($_.Value)" }`, notes: [{ at: "GetEnumerator()", text: "key and value pairs" }] },
            { code: `$ordered = [ordered]@{ b = 2; a = 1 }
$ordered.Keys`, notes: [{ at: "[ordered]", text: "keeps insertion order" }] }
          ]
        },
        {
          id: "custom-objects", n: 5, title: "custom objects", level: 2,
          gloss: "Builds objects with named properties.",
          examples: [
            { code: `$p = [pscustomobject]@{ Name = "ada"; Age = 36 }
$p.Name`, notes: [{ at: "[pscustomobject]", text: "a hashtable becomes an object" }] },
            { code: `$p = [pscustomobject]@{ Name = "ada" }
$p | Add-Member -NotePropertyName Age -NotePropertyValue 36 -PassThru`, notes: [{ at: "Add-Member", text: "adds a property later" }] },
            { code: `$people = @(
    [pscustomobject]@{ N = "a" },
    [pscustomobject]@{ N = "b" }
)
$people.N`, notes: [{ at: "$people.N", text: "reads the property from every item" }] }
          ]
        }
      ]
    },
    {
      id: "pipeline",
      n: 4,
      title: "the pipeline",
      concepts: [
        {
          id: "pipeline-basics", n: 1, title: "pipeline basics", level: 1,
          gloss: "Passes objects from one command to the next.",
          examples: [
            { code: `Get-ChildItem src | Select-Object Name`, notes: [{ at: "|", text: "objects, not text, flow through" }] },
            { code: `Get-Process | Select-Object -First 3`, notes: [] },
            { code: `Get-Content notes.txt | Measure-Object -Line`, notes: [{ at: "Measure-Object", text: "counts, sums or averages" }] }
          ]
        },
        {
          id: "pipeline-objects", n: 2, title: "working with objects", level: 2,
          gloss: "Works with the properties of pipeline objects instead of text.",
          examples: [
            { code: `Get-ChildItem src | ForEach-Object { $_.Name.ToUpper() }`, notes: [{ at: "$_.Name", text: "a property of each file object" }] },
            { code: `Get-ChildItem src -File | Select-Object Name, Length`, notes: [] },
            { code: `(Get-Item notes.txt).LastWriteTime`, notes: [{ at: "(Get-Item notes.txt)", text: "evaluate first, then read the property" }] }
          ]
        },
        {
          id: "output-commands", n: 3, title: "formatting and exporting", level: 2,
          gloss: "Formats or exports pipeline output.",
          examples: [
            { code: `Get-ChildItem src | Format-Table Name, Length`, notes: [{ at: "Format-Table", text: "for display only" }] },
            { code: `Get-ChildItem src | Out-File listing.txt`, notes: [{ at: "Out-File", text: "writes the formatted text" }] },
            { code: `Get-ChildItem src | Format-List Name`, notes: [] }
          ]
        },
        {
          id: "pipeline-input", n: 4, title: "pipeline input", level: 3,
          gloss: "Accepts pipeline input in your own functions.",
          examples: [
            { code: `function Show-Name {
    process {
        "name: $_"
    }
}
"ada", "grace" | Show-Name`, notes: [{ at: "process", text: "runs once per item" }] },
            { code: `function Get-Double {
    param([Parameter(ValueFromPipeline)] [int]$n)
    process { $n * 2 }
}
1, 2, 3 | Get-Double`, notes: [{ at: "ValueFromPipeline", text: "binds each incoming item" }] },
            { code: `1..3 | ForEach-Object -Begin { $sum = 0 } \`
    -Process { $sum += $_ } \`
    -End { $sum }`, notes: [{ at: "-End", text: "runs after the last item" }] }
          ]
        }
      ]
    },
    {
      id: "where-select",
      n: 5,
      title: "Where-Object & Select-Object",
      concepts: [
        {
          id: "where-object", n: 1, title: "Where-Object", level: 1,
          gloss: "Keeps the items that pass a test.",
          examples: [
            { code: `1..10 | Where-Object { $_ -gt 7 }`, notes: [{ at: "{ $_ -gt 7 }", text: "the test for each item" }] },
            { code: `Get-ChildItem src -File | Where-Object Length -gt 0`, notes: [{ at: "Length -gt 0", text: "simplified syntax, no braces" }] },
            { code: `"ada", "grace", "al" | Where-Object { $_.Length -gt 2 }`, notes: [] }
          ]
        },
        {
          id: "select-object", n: 2, title: "Select-Object", level: 1,
          gloss: "Chooses properties or the first and last items.",
          examples: [
            { code: `Get-ChildItem src | Select-Object Name, LastWriteTime`, notes: [{ at: "Name, LastWriteTime", text: "only these properties" }] },
            { code: `1..10 | Select-Object -First 3`, notes: [{ at: "-First 3", text: "stops reading early" }] },
            { code: `1..10 | Select-Object -Last 2`, notes: [] }
          ]
        },
        {
          id: "calculated-properties", n: 3, title: "calculated properties", level: 2,
          gloss: "Adds computed properties with Select-Object.",
          examples: [
            { code: `Get-ChildItem src -File |
    Select-Object Name, @{ n = "KB"; e = { $_.Length / 1KB } }`, notes: [{ at: "@{ n = \"KB\"; e = { $_.Length / 1KB } }", text: "a name and an expression" }] },
            { code: `1..3 | Select-Object @{ n = "Square"; e = { $_ * $_ } }`, notes: [] },
            { code: `Get-ChildItem src | Select-Object -ExpandProperty Name`, notes: [{ at: "-ExpandProperty", text: "plain values, not objects" }] }
          ]
        },
        {
          id: "distinct-measure", n: 4, title: "unique and measure", level: 2,
          gloss: "Removes duplicates and computes statistics.",
          examples: [
            { code: `1, 2, 2, 3 | Select-Object -Unique`, notes: [{ at: "-Unique", text: "drops repeated values" }] },
            { code: `1..5 | Measure-Object -Sum -Average`, notes: [] },
            { code: `(Get-Content notes.txt | Where-Object { $_ }).Count`, notes: [{ at: "Where-Object { $_ }", text: "skips empty lines" }] }
          ]
        }
      ]
    },
    {
      id: "loops-foreach",
      n: 6,
      title: "loops & ForEach-Object",
      concepts: [
        {
          id: "foreach-loop", n: 1, title: "the foreach loop", level: 1,
          gloss: "Repeats a block for each item in a collection.",
          examples: [
            { code: `foreach ($n in 1..3) {
    "round $n"
}`, notes: [{ at: "foreach ($n in 1..3)", text: "one pass per item" }] },
            { code: `foreach ($file in Get-ChildItem src -File) {
    $file.Name
}`, notes: [] },
            { code: `$names = "ada", "grace"
foreach ($name in $names) {
    $name.ToUpper()
}`, notes: [] }
          ]
        },
        {
          id: "for-while", n: 2, title: "for and while", level: 1,
          gloss: "Counts with for and loops with while and do.",
          examples: [
            { code: `for ($i = 0; $i -lt 3; $i++) {
    $i
}`, notes: [{ at: "-lt", text: "less than" }] },
            { code: `$n = 3
while ($n -gt 0) {
    $n--
}`, notes: [] },
            { code: `$i = 0
do {
    $i++
} while ($i -lt 3)`, notes: [{ at: "do", text: "runs the body at least once" }] }
          ]
        },
        {
          id: "foreach-object", n: 3, title: "ForEach-Object", level: 2,
          gloss: "Processes pipeline items with ForEach-Object.",
          examples: [
            { code: `1..3 | ForEach-Object { $_ * 2 }`, notes: [{ at: "$_", text: "the current item" }] },
            { code: `1..3 | ForEach-Object { "item $_" }`, notes: [] },
            { code: `"ada", "grace" | ForEach-Object -Parallel { $_.ToUpper() }`, notes: [{ at: "-Parallel", text: "runs items on separate threads" }] }
          ]
        },
        {
          id: "break-continue", n: 4, title: "break and continue", level: 2,
          gloss: "Skips items or leaves a loop early.",
          examples: [
            { code: `foreach ($n in 1..5) {
    if ($n -eq 3) { break }
    $n
}`, notes: [{ at: "break", text: "leaves the loop" }] },
            { code: `foreach ($n in 1..5) {
    if ($n % 2 -eq 0) { continue }
    $n
}`, notes: [{ at: "continue", text: "skips to the next item" }] },
            { code: `:outer foreach ($a in 1..3) {
    foreach ($b in 1..3) {
        if ($b -eq 2) { continue outer }
        "$a$b"
    }
}`, notes: [{ at: ":outer", text: "a label for the outer loop" }] }
          ]
        }
      ]
    },
    {
      id: "functions-parameters",
      n: 7,
      title: "functions & parameters",
      concepts: [
        {
          id: "function-basics", n: 1, title: "function basics", level: 1,
          gloss: "Defines a reusable function.",
          examples: [
            { code: `function Get-Greeting {
    "hello"
}
Get-Greeting`, notes: [{ at: "Get-Greeting", text: "verb-noun naming" }] },
            { code: `function Get-Square {
    param($n)
    $n * $n
}
Get-Square 4`, notes: [{ at: "param", text: "declares the parameters" }] },
            { code: `function Get-Sum($a, $b) {
    $a + $b
}
Get-Sum 2 3`, notes: [{ at: "Get-Sum 2 3", text: "no parentheses or commas" }] }
          ]
        },
        {
          id: "typed-parameters", n: 2, title: "typed parameters", level: 2,
          gloss: "Types and validates parameters with param blocks.",
          examples: [
            { code: `function Get-Double {
    param([int]$Number)
    $Number * 2
}
Get-Double -Number 4`, notes: [{ at: "[int]", text: "input is converted or rejected" }] },
            { code: `function Set-Level {
    param([ValidateSet("low", "high")] [string]$Level)
    $Level
}
Set-Level -Level high`, notes: [{ at: "ValidateSet", text: "rejects any other value" }] },
            { code: `function Get-Name {
    param([string]$Name = "guest")
    $Name
}
Get-Name`, notes: [] }
          ]
        },
        {
          id: "mandatory-switch", n: 3, title: "mandatory and switch parameters", level: 2,
          gloss: "Requires parameters and adds switch flags.",
          examples: [
            { code: `function Show-User {
    param([Parameter(Mandatory)] [string]$Name)
    $Name
}
Show-User -Name ada`, notes: [{ at: "Mandatory", text: "prompts when missing" }] },
            { code: `function Get-Info {
    param([switch]$Detailed)
    if ($Detailed) { "full" } else { "short" }
}
Get-Info -Detailed`, notes: [{ at: "[switch]", text: "a flag with no value" }] },
            { code: `function Join-Words {
    param([Parameter(ValueFromRemainingArguments)] [string[]]$Words)
    $Words -join " "
}
Join-Words a b c`, notes: [] }
          ]
        },
        {
          id: "return-output", n: 4, title: "returning output", level: 2,
          gloss: "Returns values by writing them to the output.",
          examples: [
            { code: `function Get-Pair {
    1, 2
}
$a, $b = Get-Pair`, notes: [{ at: "1, 2", text: "everything output is returned" }] },
            { code: `function Test-Even {
    param([int]$n)
    return $n % 2 -eq 0
}
Test-Even 4`, notes: [{ at: "return", text: "ends the function and outputs" }] },
            { code: `function Get-Noisy {
    Write-Host "log"
    42
}
$r = Get-Noisy`, notes: [{ at: "Write-Host", text: "goes to the host, not the output" }] }
          ]
        },
        {
          id: "advanced-functions", n: 5, title: "advanced functions", level: 3,
          gloss: "Adds common parameters with CmdletBinding.",
          examples: [
            { code: `function Get-Thing {
    [CmdletBinding()]
    param([string]$Name)
    Write-Verbose "looking up $Name"
    $Name
}
Get-Thing -Name ada -Verbose`, notes: [{ at: "CmdletBinding", text: "adds -Verbose and friends" }] },
            { code: `function Remove-Thing {
    [CmdletBinding(SupportsShouldProcess)]
    param([string]$Name)
    if ($PSCmdlet.ShouldProcess($Name)) { "removed $Name" }
}
Remove-Thing -Name x -WhatIf`, notes: [{ at: "-WhatIf", text: "shows what would happen" }] },
            { code: `function Get-Count {
    [CmdletBinding()]
    param([Parameter(Mandatory)] [int[]]$Numbers)
    $Numbers.Count
}
Get-Count -Numbers 1, 2, 3`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "if-switch",
      n: 8,
      title: "if & switch",
      concepts: [
        {
          id: "if-else", n: 1, title: "if and else", level: 1,
          gloss: "Branches with if, elseif and else.",
          examples: [
            { code: `$n = 7
if ($n -gt 5) {
    "big"
} else {
    "small"
}`, notes: [] },
            { code: `$age = 20
if ($age -lt 13) {
    "child"
} elseif ($age -lt 18) {
    "teen"
} else {
    "adult"
}`, notes: [{ at: "elseif", text: "tested only if the first fails" }] },
            { code: `$name = "ada"
if ($name) {
    "has a name"
}`, notes: [{ at: "if ($name)", text: "empty and null are false" }] }
          ]
        },
        {
          id: "comparison-operators", n: 2, title: "comparison operators", level: 1,
          gloss: "Compares values with -eq, -ne, -gt and friends.",
          examples: [
            { code: `5 -gt 3
5 -eq 5
"a" -ne "b"`, notes: [{ at: "-gt", text: "greater than" }] },
            { code: `"Hello" -eq "hello"
"Hello" -ceq "hello"`, notes: [{ at: "-ceq", text: "the c prefix makes it case-sensitive" }] },
            { code: `"report.txt" -like "*.txt"
"abc123" -match "\\d+"`, notes: [{ at: "-like", text: "wildcards, while -match uses regex" }] }
          ]
        },
        {
          id: "logical-operators", n: 3, title: "logical operators", level: 2,
          gloss: "Combines tests with -and, -or and -not.",
          examples: [
            { code: `$n = 5
($n -gt 3) -and ($n -lt 10)`, notes: [{ at: "-and", text: "both tests must pass" }] },
            { code: `$x = $null
($x -eq $null) -or ($x -eq "")`, notes: [] },
            { code: `-not (Test-Path missing.txt)`, notes: [{ at: "-not", text: "has a one-character short form" }] }
          ]
        },
        {
          id: "switch-statement", n: 4, title: "switch", level: 2,
          gloss: "Matches one value against several cases.",
          examples: [
            { code: `$day = 3
switch ($day) {
    1 { "mon" }
    3 { "wed" }
    default { "other" }
}`, notes: [{ at: "default", text: "runs when nothing matches" }] },
            { code: `switch -Wildcard ("report.txt") {
    "*.txt" { "text" }
    "*.csv" { "csv" }
}`, notes: [{ at: "-Wildcard", text: "cases are patterns" }] },
            { code: `switch -Regex ("abc123") {
    "^\\d+$" { "digits" }
    "\\d" { "has a digit" }
}`, notes: [{ at: "-Regex", text: "cases are regular expressions" }] }
          ]
        },
        {
          id: "ternary", n: 5, title: "the ternary operator", level: 2,
          gloss: "Chooses a value inline with the ternary operator.",
          examples: [
            { code: `$n = 7
$n -gt 5 ? "big" : "small"`, notes: [{ at: "? \"big\" :", text: "new in PowerShell 7" }] },
            { code: `$name = $null
$label = $name ? $name : "anonymous"`, notes: [] },
            { code: `$count = 1
"$count item$($count -eq 1 ? '' : 's')"`, notes: [{ at: "$($count -eq 1 ? '' : 's')", text: "the ternary inside a string" }] }
          ]
        }
      ]
    },
    {
      id: "try-catch-finally",
      n: 9,
      title: "try, catch, finally",
      concepts: [
        {
          id: "try-catch", n: 1, title: "try and catch", level: 1,
          gloss: "Handles terminating errors with try and catch.",
          examples: [
            { code: `try {
    1 / 0
} catch {
    "caught: $($_.Exception.Message)"
}`, notes: [{ at: "$_", text: "the error record inside catch" }] },
            { code: `try {
    Get-Content missing.txt -ErrorAction Stop
} catch {
    "file not found"
}`, notes: [{ at: "-ErrorAction Stop", text: "makes the error catchable" }] },
            { code: `try {
    [int]"abc"
} catch [System.Management.Automation.RuntimeException] {
    "not a number"
}`, notes: [{ at: "catch [", text: "handles one error type" }] }
          ]
        },
        {
          id: "finally", n: 2, title: "finally", level: 2,
          gloss: "Runs cleanup code with finally.",
          examples: [
            { code: `try {
    "working"
} finally {
    "cleanup"
}`, notes: [{ at: "finally", text: "runs whether or not it threw" }] },
            { code: `$reader = [System.IO.StringReader]::new("hi")
try {
    $reader.ReadLine()
} finally {
    $reader.Dispose()
}`, notes: [] },
            { code: `try {
    throw "boom"
} catch {
    "caught"
} finally {
    "done"
}`, notes: [] }
          ]
        },
        {
          id: "throwing", n: 3, title: "throwing", level: 2,
          gloss: "Raises errors with throw and Write-Error.",
          examples: [
            { code: `try {
    throw "bad input"
} catch {
    $_.ToString()
}`, notes: [{ at: "throw", text: "a terminating error" }] },
            { code: `Write-Error "not fatal" -ErrorAction SilentlyContinue`, notes: [{ at: "Write-Error", text: "a non-terminating error" }] },
            { code: `function Test-Age {
    param([int]$Age)
    if ($Age -lt 0) { throw [ArgumentException]::new("age < 0") }
    $Age
}
Test-Age 5`, notes: [] }
          ]
        },
        {
          id: "error-variables", n: 4, title: "error variables", level: 3,
          gloss: "Inspects errors with $Error, $_ and $ErrorActionPreference.",
          examples: [
            { code: `try {
    Get-Item missing.txt -ErrorAction Stop
} catch {
    $_.CategoryInfo.Category
}`, notes: [{ at: "CategoryInfo", text: "the kind of failure" }] },
            { code: `Get-Item missing.txt -ErrorAction SilentlyContinue
$Error[0].Exception.Message`, notes: [{ at: "$Error[0]", text: "the most recent error" }] },
            { code: `$ErrorActionPreference = "Stop"
try {
    Get-Item missing.txt
} catch {
    "stopped"
}`, notes: [{ at: "$ErrorActionPreference", text: "the default for every command" }] }
          ]
        }
      ]
    },
    {
      id: "files-paths",
      n: 10,
      title: "files & paths",
      concepts: [
        {
          id: "read-files", n: 1, title: "reading files", level: 1,
          gloss: "Reads file contents with Get-Content.",
          examples: [
            { code: `Get-Content notes.txt`, notes: [{ at: "Get-Content", text: "one string per line" }] },
            { code: `Get-Content notes.txt -TotalCount 2`, notes: [{ at: "-TotalCount", text: "only the first lines" }] },
            { code: `Get-Content notes.txt -Raw`, notes: [{ at: "-Raw", text: "one string instead of lines" }] }
          ]
        },
        {
          id: "write-files", n: 2, title: "writing files", level: 1,
          gloss: "Writes and appends text to files.",
          examples: [
            { code: `"hello" | Set-Content out.txt`, notes: [{ at: "Set-Content", text: "replaces the file" }] },
            { code: `Add-Content out.txt "another line"`, notes: [{ at: "Add-Content", text: "appends a line" }] },
            { code: `"a", "b" | Out-File list.txt -Append`, notes: [{ at: "-Append", text: "adds to the end" }] }
          ]
        },
        {
          id: "paths", n: 3, title: "paths", level: 2,
          gloss: "Builds and inspects paths.",
          examples: [
            { code: `Join-Path src "a.py"`, notes: [{ at: "Join-Path", text: "uses the right separator" }] },
            { code: `Split-Path "src/lib/c.py" -Leaf`, notes: [{ at: "-Leaf", text: "just the file name" }] },
            { code: `Test-Path notes.txt`, notes: [] }
          ]
        },
        {
          id: "file-operations", n: 4, title: "copy, move and remove", level: 2,
          gloss: "Manages files with Copy-Item, Move-Item and Remove-Item.",
          examples: [
            { code: `Copy-Item notes.txt backup.txt`, notes: [{ at: "Copy-Item", text: "keeps the original" }] },
            { code: `New-Item -ItemType Directory -Path archive | Out-Null
Move-Item notes.txt archive`, notes: [{ at: "Move-Item", text: "the original is gone" }] },
            { code: `Remove-Item tmp/old.tmp`, notes: [{ at: "Remove-Item", text: "deletes without a recycle bin" }] }
          ]
        },
        {
          id: "item-properties", n: 5, title: "file properties", level: 2,
          gloss: "Reads a file's size, extension and timestamps.",
          examples: [
            { code: `(Get-Item notes.txt).Length`, notes: [{ at: "Length", text: "the size in bytes" }] },
            { code: `(Get-Item notes.txt).Extension`, notes: [] },
            { code: `Get-Item notes.txt | Select-Object Name, LastWriteTime`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "get-childitem",
      n: 11,
      title: "Get-ChildItem",
      concepts: [
        {
          id: "listing", n: 1, title: "listing", level: 1,
          gloss: "Lists the contents of a folder.",
          examples: [
            { code: `Get-ChildItem`, notes: [{ at: "Get-ChildItem", text: "files and folders" }] },
            { code: `Get-ChildItem src`, notes: [] },
            { code: `Get-ChildItem -Name`, notes: [{ at: "-Name", text: "names only" }] }
          ]
        },
        {
          id: "recurse-filter", n: 2, title: "recursing and filtering", level: 2,
          gloss: "Searches folders with -Recurse and filters.",
          examples: [
            { code: `Get-ChildItem src -Recurse`, notes: [{ at: "-Recurse", text: "includes subfolders" }] },
            { code: `Get-ChildItem -Recurse -Filter *.py`, notes: [{ at: "-Filter", text: "applied by the file system, fast" }] },
            { code: `Get-ChildItem -Recurse -Include *.py, *.md`, notes: [{ at: "-Include", text: "several patterns at once" }] }
          ]
        },
        {
          id: "files-directories", n: 3, title: "files and directories", level: 2,
          gloss: "Limits results to files or directories.",
          examples: [
            { code: `Get-ChildItem -File`, notes: [{ at: "-File", text: "files only" }] },
            { code: `Get-ChildItem -Directory`, notes: [] },
            { code: `Get-ChildItem -Recurse -File | Where-Object Length -gt 0`, notes: [] }
          ]
        },
        {
          id: "hidden-depth", n: 4, title: "depth and hidden items", level: 3,
          gloss: "Controls depth and hidden items.",
          examples: [
            { code: `Get-ChildItem -Recurse -Depth 1`, notes: [{ at: "-Depth 1", text: "one level below the start" }] },
            { code: `Get-ChildItem -Force`, notes: [{ at: "-Force", text: "includes hidden items" }] },
            { code: `Get-ChildItem -Recurse -Exclude *.pyc`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "sort-group",
      n: 12,
      title: "Sort-Object & Group-Object",
      concepts: [
        {
          id: "sort-object", n: 1, title: "Sort-Object", level: 1,
          gloss: "Orders objects by one or more properties.",
          examples: [
            { code: `Get-ChildItem src -File | Sort-Object Length`, notes: [{ at: "Sort-Object Length", text: "smallest first" }] },
            { code: `3, 1, 2 | Sort-Object -Descending`, notes: [] },
            { code: `Get-ChildItem -Recurse -File | Sort-Object Extension, Name`, notes: [{ at: "Extension, Name", text: "ties sort by name" }] }
          ]
        },
        {
          id: "group-object", n: 2, title: "Group-Object", level: 2,
          gloss: "Groups objects by a property.",
          examples: [
            { code: `Get-ChildItem -Recurse -File | Group-Object Extension`, notes: [{ at: "Group-Object", text: "a Count and a Group per key" }] },
            { code: `"a", "bb", "cc" | Group-Object Length`, notes: [] },
            { code: `Get-ChildItem -Recurse -File |
    Group-Object Extension -NoElement`, notes: [{ at: "-NoElement", text: "counts only, no members" }] }
          ]
        },
        {
          id: "measure-unique", n: 3, title: "totals and duplicates", level: 2,
          gloss: "Summarizes grouped data: counts, totals and unique values.",
          examples: [
            { code: `Get-ChildItem -Recurse -File | Measure-Object Length -Sum -Maximum`, notes: [{ at: "-Sum -Maximum", text: "several statistics at once" }] },
            { code: `1, 2, 2, 3 | Sort-Object -Unique`, notes: [] },
            { code: `"b", "a", "b" | Group-Object | Sort-Object Count -Descending`, notes: [{ at: "Count", text: "how many items in each group" }] }
          ]
        },
        {
          id: "top-n", n: 4, title: "top results", level: 3,
          gloss: "Takes the largest or smallest items with Sort-Object and Select-Object.",
          examples: [
            { code: `Get-ChildItem -Recurse -File |
    Sort-Object Length -Descending |
    Select-Object -First 2`, notes: [{ at: "-First 2", text: "the two largest files" }] },
            { code: `1..10 | Sort-Object { -$_ } | Select-Object -First 3`, notes: [{ at: "{ -$_ }", text: "a script block as the sort key" }] },
            { code: `Get-Content notes.txt | Sort-Object { $_.Length } -Descending`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "csv-json",
      n: 13,
      title: "CSV & JSON",
      concepts: [
        {
          id: "import-csv", n: 1, title: "Import-Csv", level: 1,
          gloss: "Reads CSV rows as objects.",
          examples: [
            { code: `Import-Csv data.csv`, notes: [{ at: "Import-Csv", text: "one object per row" }] },
            { code: `Import-Csv data.csv | Where-Object { [int]$_.score -gt 80 }`, notes: [{ at: "[int]", text: "all csv values are text" }] },
            { code: `Import-Csv data.csv | Select-Object -ExpandProperty name`, notes: [] }
          ]
        },
        {
          id: "export-csv", n: 2, title: "Export-Csv", level: 2,
          gloss: "Writes objects to a CSV file.",
          examples: [
            { code: `Import-Csv data.csv | Export-Csv copy.csv`, notes: [{ at: "Export-Csv", text: "one row per object" }] },
            { code: `Get-ChildItem src -File |
    Select-Object Name, Length |
    Export-Csv files.csv`, notes: [{ at: "Select-Object", text: "chooses the columns first" }] },
            { code: `Import-Csv data.csv | ConvertTo-Csv`, notes: [{ at: "ConvertTo-Csv", text: "text instead of a file" }] }
          ]
        },
        {
          id: "json-read", n: 3, title: "reading JSON", level: 1,
          gloss: "Parses JSON text into objects.",
          examples: [
            { code: `$obj = '{"name": "ada", "age": 36}' | ConvertFrom-Json
$obj.name`, notes: [{ at: "ConvertFrom-Json", text: "text becomes objects" }] },
            { code: `$items = '[1, 2, 3]' | ConvertFrom-Json
$items.Count`, notes: [] },
            { code: `$cfg = Get-Content config.json | ConvertFrom-Json
$cfg.port`, notes: [{ at: "Get-Content", text: "pipes the file's text in" }] }
          ]
        },
        {
          id: "json-write", n: 4, title: "writing JSON", level: 2,
          gloss: "Converts objects to JSON text.",
          examples: [
            { code: `@{ name = "ada"; age = 36 } | ConvertTo-Json`, notes: [{ at: "ConvertTo-Json", text: "objects become text" }] },
            { code: `[pscustomobject]@{ Id = 1; Tags = "a", "b" } | ConvertTo-Json -Compress`, notes: [{ at: "-Compress", text: "one line, no spaces" }] },
            { code: `$data = @{ items = @(@{ id = 1 }) }
$data | ConvertTo-Json -Depth 4`, notes: [{ at: "-Depth", text: "how many levels are written" }] }
          ]
        }
      ]
    },
    {
      id: "regular-expressions",
      n: 14,
      title: "regular expressions",
      concepts: [
        {
          id: "match-operator", n: 1, title: "the -match operator", level: 1,
          gloss: "Tests text against a pattern with -match.",
          examples: [
            { code: `"order 42" -match "\\d+"`, notes: [{ at: "-match", text: "true or false" }] },
            { code: `if ("order 42" -match "(\\d+)") {
    $Matches[1]
}`, notes: [{ at: "$Matches", text: "holds the captured text" }] },
            { code: `"abc" -notmatch "\\d"`, notes: [] }
          ]
        },
        {
          id: "replace-split", n: 2, title: "replace and split", level: 2,
          gloss: "Replaces and splits text with regular expressions.",
          examples: [
            { code: `"a1b22" -replace "\\d+", "#"`, notes: [{ at: "-replace", text: "regex by default" }] },
            { code: `"a, b;c" -split "[,;]\\s*"`, notes: [] },
            { code: `"2024-05-06" -replace "(\\d+)-(\\d+)-(\\d+)", '$3/$2/$1'`, notes: [{ at: "'$3/$2/$1'", text: "reorders the groups" }] }
          ]
        },
        {
          id: "select-string", n: 3, title: "Select-String", level: 2,
          gloss: "Searches files and text with Select-String.",
          examples: [
            { code: `Select-String -Path app.log -Pattern ERROR`, notes: [{ at: "Select-String", text: "a grep for PowerShell" }] },
            { code: `Select-String -Path "src/*.py" -Pattern "print" -SimpleMatch`, notes: [{ at: "-SimpleMatch", text: "plain text, no regex" }] },
            { code: `Get-Content app.log | Select-String "ERROR" | ForEach-Object { $_.Line }`, notes: [{ at: "$_.Line", text: "the matching line" }] }
          ]
        },
        {
          id: "regex-class", n: 4, title: "the Regex class", level: 3,
          gloss: "Uses the .NET Regex class for matches and named groups.",
          examples: [
            { code: `[regex]::Matches("a1b22", "\\d+").Value`, notes: [{ at: "[regex]", text: "the .NET class" }] },
            { code: `$m = [regex]::Match("2024-05", "(?<year>\\d+)-(?<month>\\d+)")
$m.Groups["year"].Value`, notes: [{ at: "(?<year>", text: "a named group" }] },
            { code: `[regex]::Replace("a1b2", "\\d", { param($m) [int]$m.Value * 2 })`, notes: [{ at: "{ param($m)", text: "builds each replacement" }] }
          ]
        }
      ]
    },
    {
      id: "classes",
      n: 15,
      title: "classes",
      concepts: [
        {
          id: "class-basics", n: 1, title: "class basics", level: 3,
          gloss: "Defines a class with properties and methods.",
          examples: [
            { code: `class Dog {
    [string]$Name
    [string] Speak() {
        return "$($this.Name) barks"
    }
}
$d = [Dog]::new()
$d.Name = "rex"
$d.Speak()`, notes: [{ at: "[Dog]::new()", text: "creates an instance" }] },
            { code: `class Counter {
    [int]$Count = 0
    [void] Increment() {
        $this.Count++
    }
}
$c = [Counter]::new()
$c.Increment()`, notes: [{ at: "[void]", text: "the method returns nothing" }] },
            { code: `class Point {
    [int]$X
    [int]$Y
}
$p = [Point]@{ X = 1; Y = 2 }`, notes: [{ at: "[Point]@{", text: "a hashtable cast to the class" }] }
          ]
        },
        {
          id: "constructors", n: 2, title: "constructors", level: 3,
          gloss: "Initializes objects with constructors.",
          examples: [
            { code: `class User {
    [string]$Name
    User([string]$name) {
        $this.Name = $name
    }
}
[User]::new("ada")`, notes: [{ at: "User([string]$name)", text: "same name as the class" }] },
            { code: `class Temp {
    [double]$C
    Temp() { $this.C = 20 }
    Temp([double]$c) { $this.C = $c }
}
[Temp]::new(25)`, notes: [{ at: "Temp([double]$c)", text: "an overload" }] },
            { code: `class Box {
    [int]$Size = 3
}
[Box]::new().Size`, notes: [{ at: "= 3", text: "a default value" }] }
          ]
        },
        {
          id: "inheritance", n: 3, title: "inheritance", level: 3,
          gloss: "Extends a class and overrides its methods.",
          examples: [
            { code: `class Animal {
    [string] Speak() { return "..." }
}
class Dog : Animal {
    [string] Speak() { return "woof" }
}
[Dog]::new().Speak()`, notes: [{ at: ": Animal", text: "inherits from Animal" }] },
            { code: `class Base {
    [string] Name() { return "base" }
}
class Child : Base {
    [string] Name() { return "child" }
}`, notes: [] },
            { code: `class Shape {
    [double] Area() { return 0 }
}
class Square : Shape {
    [double]$Side = 2
    [double] Area() { return $this.Side * $this.Side }
}
[Square]::new().Area()`, notes: [{ at: "$this.Side", text: "this is explicit in methods" }] }
          ]
        },
        {
          id: "static-hidden", n: 4, title: "static and hidden members", level: 3,
          gloss: "Adds static members and hidden properties.",
          examples: [
            { code: `class Id {
    static [int]$Next = 1
    static [int] Make() {
        return [Id]::Next++
    }
}
[Id]::Make()`, notes: [{ at: "static", text: "belongs to the class" }] },
            { code: `class Secret {
    hidden [string]$Key = "x"
    [string] Reveal() { return $this.Key }
}`, notes: [{ at: "hidden", text: "left out of completion and Get-Member" }] },
            { code: `class Config {
    static [string]$Name = "app"
}
[Config]::Name`, notes: [] }
          ]
        },
        {
          id: "enums", n: 5, title: "enums", level: 2,
          gloss: "Names constants with enum.",
          examples: [
            { code: `enum Color { Red; Green; Blue }
[Color]::Green`, notes: [{ at: "[Color]::Green", text: "members are accessed on the type" }] },
            { code: `enum Level { Low = 1; High = 5 }
[int][Level]::High`, notes: [{ at: "[int]", text: "reads the underlying value" }] },
            { code: `enum Day { Mon; Tue }
[Day]"Tue"`, notes: [{ at: "[Day]\"Tue\"", text: "text converts to the member" }] }
          ]
        }
      ]
    },
    {
      id: "modules",
      n: 16,
      title: "modules",
      concepts: [
        {
          id: "find-commands", n: 1, title: "finding commands", level: 1,
          gloss: "Finds commands and where they come from.",
          examples: [
            { code: `Get-Command *-Item`, notes: [{ at: "Get-Command", text: "searches by name pattern" }] },
            { code: `Get-Command Get-ChildItem | Select-Object Name, Source`, notes: [{ at: "Source", text: "the module that provides it" }] },
            { code: `Get-Command -Module Microsoft.PowerShell.Management |
    Select-Object -First 3`, notes: [] }
          ]
        },
        {
          id: "modules", n: 2, title: "loading modules", level: 2,
          gloss: "Lists and loads modules.",
          examples: [
            { code: `Get-Module -ListAvailable | Select-Object -First 3 Name`, notes: [{ at: "-ListAvailable", text: "installed, not necessarily loaded" }] },
            { code: `Import-Module Microsoft.PowerShell.Utility`, notes: [{ at: "Import-Module", text: "loads the commands into the session" }] },
            { code: `Get-Module | Select-Object Name, Version`, notes: [] }
          ]
        },
        {
          id: "module-files", n: 3, title: "writing modules", level: 3,
          gloss: "Writes a module and imports it from a file or a script block.",
          examples: [
            { code: `@'
function Get-Greeting {
    "hello"
}
'@ | Set-Content Greeting.psm1
Import-Module ./Greeting.psm1`, notes: [{ at: ".psm1", text: "a script module file" }] },
            { code: `New-Module -Name Demo -ScriptBlock {
    function Get-Two { 2 }
    Export-ModuleMember -Function Get-Two
} | Import-Module
Get-Two`, notes: [{ at: "Export-ModuleMember", text: "chooses what the module exposes" }] },
            { code: `$env:PSModulePath -split [IO.Path]::PathSeparator`, notes: [{ at: "PSModulePath", text: "where modules are searched" }] }
          ]
        }
      ]
    }
  ]
};
