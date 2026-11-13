export default {
  id: "m",
  name: "M (Power Query)",
  short: "M",
  pigment: "m",
  family: null,
  version: "Power Query",
  lexer: "m",
  indent: 4,
  topics: [
    {
      id: "let-in",
      n: 1,
      title: "let expressions",
      concepts: [
        {
          id: "let-basics", n: 1, title: "let and in", level: 1,
          gloss: "Names intermediate values in a let block and returns one with in.",
          examples: [
            { code: `let
    price = 20,
    tax = price * 0.2
in
    price + tax`, notes: [{ at: "let", text: "starts the named steps" }, { at: "in", text: "returns the final value" }] },
            { code: `let
    first = "Ada",
    last = "Lovelace"
in
    first & " " & last`, notes: [] },
            { code: `let
    width = 8,
    height = 5
in
    width * height`, notes: [] }
          ]
        },
        {
          id: "step-chain", n: 2, title: "steps that build on each other", level: 1,
          gloss: "Passes each step to the next so the query reads from top to bottom.",
          examples: [
            { code: `let
    Source = {1, 2, 3, 4},
    Doubled = List.Transform(Source, each _ * 2),
    Total = List.Sum(Doubled)
in
    Total`, notes: [{ at: "Doubled", text: "later steps use earlier names" }] },
            { code: `let
    Raw = "  report  ",
    Clean = Text.Trim(Raw),
    Upper = Text.Upper(Clean)
in
    Upper`, notes: [] },
            { code: `let
    Base = 100,
    WithTax = Base * 1.2,
    Rounded = Number.Round(WithTax, 0)
in
    Rounded`, notes: [] }
          ]
        },
        {
          id: "quoted-names", n: 3, title: "quoted step names", level: 2,
          gloss: "Writes step names that contain spaces with a hash sign and double quotes.",
          examples: [
            { code: `let
    #"Total price" = 20 * 3
in
    #"Total price"`, notes: [{ at: "#\"Total price\"", text: "quoted identifier" }] },
            { code: `let
    #"Net amount" = 100,
    #"Gross amount" = #"Net amount" * 1.2
in
    #"Gross amount"`, notes: [] },
            { code: `let
    #"First step" = {1, 2, 3},
    Count = List.Count(#"First step")
in
    Count`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "values",
      n: 2,
      title: "values and types",
      concepts: [
        {
          id: "literals", n: 1, title: "numbers, text and logical values", level: 1,
          gloss: "Writes numbers, text in double quotes and the logical values true and false.",
          examples: [
            { code: `let
    n = 42,
    ratio = 0.75,
    name = "Oslo",
    ready = true
in
    {n, ratio, name, ready}`, notes: [{ at: "true", text: "lowercase logical" }] },
            { code: `let
    big = 1.5e6,
    hex = 0xFF,
    flag = false
in
    {big, hex, flag}`, notes: [] },
            { code: `let
    quote = "She said ""hello""",
    path = "C:\\data\\sales.csv"
in
    {quote, path}`, notes: [{ at: "\"\"", text: "doubled quote inside text" }] }
          ]
        },
        {
          id: "null-values", n: 2, title: "null", level: 1,
          gloss: "Represents a missing value with null and tests for it.",
          examples: [
            { code: `let
    missing = null,
    result = missing = null
in
    result`, notes: [{ at: "null", text: "no value" }] },
            { code: `let
    value = null,
    safe = if value = null then 0 else value
in
    safe`, notes: [] },
            { code: `let
    a = null,
    b = 5
in
    a ?? b`, notes: [{ at: "??", text: "first non-null value" }] }
          ]
        },
        {
          id: "dates-durations", n: 3, title: "dates and durations", level: 2,
          gloss: "Writes dates, times and durations with the hash constructors.",
          examples: [
            { code: `let
    day = #date(2026, 11, 12)
in
    day`, notes: [{ at: "#date", text: "year, month, day" }] },
            { code: `let
    stamp = #datetime(2026, 11, 12, 9, 30, 0)
in
    stamp`, notes: [] },
            { code: `let
    span = #duration(1, 2, 30, 0),
    start = #date(2026, 1, 1)
in
    start + span`, notes: [{ at: "#duration", text: "days, hours, minutes, seconds" }] }
          ]
        }
      ]
    },
    {
      id: "text",
      n: 3,
      title: "text functions",
      concepts: [
        {
          id: "case-trim", n: 1, title: "case and trimming", level: 1,
          gloss: "Changes case and removes surrounding spaces with Text functions.",
          examples: [
            { code: `let
    s = "  Quiet Report  "
in
    Text.Upper(Text.Trim(s))`, notes: [{ at: "Text.Trim", text: "removes outer spaces" }] },
            { code: `let
    name = "ada lovelace"
in
    Text.Proper(name)`, notes: [] },
            { code: `let
    code = "ab-1042"
in
    {Text.Upper(code), Text.Length(code)}`, notes: [] }
          ]
        },
        {
          id: "slicing", n: 2, title: "Text.Start, Text.End and Text.Middle", level: 1,
          gloss: "Takes parts of a text value by position.",
          examples: [
            { code: `let
    s = "2026-11-12"
in
    {Text.Start(s, 4), Text.End(s, 2)}`, notes: [{ at: "Text.Start", text: "first characters" }] },
            { code: `let
    s = "2026-11-12"
in
    Text.Middle(s, 5, 2)`, notes: [] },
            { code: `let
    s = "Report.xlsx"
in
    Text.BeforeDelimiter(s, ".")`, notes: [] }
          ]
        },
        {
          id: "search-replace", n: 3, title: "search and replace", level: 1,
          gloss: "Tests for and replaces text with Text.Contains and Text.Replace.",
          examples: [
            { code: `let
    s = "red green red"
in
    Text.Replace(s, "red", "blue")`, notes: [{ at: "Text.Replace", text: "replaces every match" }] },
            { code: `let
    s = "Quarterly report"
in
    Text.Contains(s, "report")`, notes: [] },
            { code: `let
    path = "reports\\2026\\jan.csv"
in
    Text.PositionOf(path, "\\")`, notes: [] }
          ]
        },
        {
          id: "split-combine", n: 4, title: "split and combine", level: 2,
          gloss: "Breaks text into a list with Text.Split and joins a list with Text.Combine.",
          examples: [
            { code: `let
    parts = Text.Split("a,b,c", ",")
in
    parts`, notes: [{ at: "Text.Split", text: "returns a list" }] },
            { code: `let
    words = {"one", "two", "three"}
in
    Text.Combine(words, "-")`, notes: [] },
            { code: `let
    n = 7,
    label = "item " & Text.From(n)
in
    label`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "lists",
      n: 4,
      title: "lists",
      concepts: [
        {
          id: "list-literals", n: 1, title: "list literals and ranges", level: 1,
          gloss: "Writes a list in braces or builds a number range with two dots.",
          examples: [
            { code: `let
    primes = {2, 3, 5, 7}
in
    primes`, notes: [{ at: "{", text: "list literal" }] },
            { code: `let
    nums = {1..5}
in
    nums`, notes: [{ at: "1..5", text: "inclusive range" }] },
            { code: `let
    mixed = {"a", 2, true, null}
in
    List.Count(mixed)`, notes: [] }
          ]
        },
        {
          id: "list-math", n: 2, title: "List.Sum and friends", level: 1,
          gloss: "Reduces a list of numbers with Sum, Average, Min and Max.",
          examples: [
            { code: `let
    v = {3, 8, 1, 9}
in
    List.Sum(v)`, notes: [{ at: "List.Sum", text: "total" }] },
            { code: `let
    v = {2, 4, 6, 8}
in
    {List.Average(v), List.Min(v), List.Max(v)}`, notes: [] },
            { code: `let
    v = {5, 3, 5, 1}
in
    {List.Count(v), List.Distinct(v)}`, notes: [] }
          ]
        },
        {
          id: "list-transform", n: 3, title: "List.Transform and List.Select", level: 1,
          gloss: "Maps and filters a list with each and the underscore.",
          examples: [
            { code: `let
    v = {1, 2, 3}
in
    List.Transform(v, each _ * 10)`, notes: [{ at: "each _", text: "the current item" }] },
            { code: `let
    v = {3, 8, 1, 9}
in
    List.Select(v, each _ > 2)`, notes: [] },
            { code: `let
    names = {"ada", "grace"}
in
    List.Transform(names, each Text.Proper(_))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "records",
      n: 5,
      title: "records",
      concepts: [
        {
          id: "record-literals", n: 1, title: "record literals", level: 1,
          gloss: "Writes a record with named fields in square brackets.",
          examples: [
            { code: `let
    person = [Name = "Ada", Age = 36]
in
    person`, notes: [{ at: "[Name =", text: "field in a record" }] },
            { code: `let
    point = [X = 3, Y = 4]
in
    point`, notes: [] },
            { code: `let
    item = [Sku = "A-1", Qty = 2, Price = 9.5]
in
    item`, notes: [] }
          ]
        },
        {
          id: "field-access", n: 2, title: "field access", level: 1,
          gloss: "Reads a field with square brackets or with Record.Field.",
          examples: [
            { code: `let
    person = [Name = "Ada", Age = 36]
in
    person[Name]`, notes: [{ at: "person[Name]", text: "field lookup" }] },
            { code: `let
    cfg = [Host = "localhost", Port = 5432]
in
    Record.Field(cfg, "Port")`, notes: [] },
            { code: `let
    r = [A = 1]
in
    r[B]?`, notes: [{ at: "?", text: "null if the field is missing" }] }
          ]
        },
        {
          id: "record-ops", n: 3, title: "Record functions", level: 2,
          gloss: "Lists field names and values or adds and removes fields.",
          examples: [
            { code: `let
    r = [A = 1, B = 2]
in
    Record.FieldNames(r)`, notes: [] },
            { code: `let
    r = [A = 1, B = 2]
in
    Record.AddField(r, "C", 3)`, notes: [] },
            { code: `let
    r = [A = 1, B = 2, C = 3]
in
    Record.RemoveFields(r, {"B"})`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "tables",
      n: 6,
      title: "tables",
      concepts: [
        {
          id: "table-literals", n: 1, title: "building tables", level: 1,
          gloss: "Creates a small table from column names and rows with #table.",
          examples: [
            { code: `let
    t = #table({"Item", "Qty"}, {{"Tea", 2}, {"Cake", 1}})
in
    t`, notes: [{ at: "#table", text: "column names then rows" }] },
            { code: `let
    t = #table(
        type table [Name = text, Age = number],
        {{"Ada", 36}, {"Grace", 85}}
    )
in
    t`, notes: [] },
            { code: `let
    t = Table.FromRecords({[X = 1, Y = 2], [X = 3, Y = 4]})
in
    t`, notes: [] }
          ]
        },
        {
          id: "add-columns", n: 2, title: "adding columns", level: 1,
          gloss: "Adds a computed column with Table.AddColumn and an each expression.",
          examples: [
            { code: `let
    Source = #table({"Qty", "Price"}, {{2, 5}, {3, 4}}),
    Total = Table.AddColumn(Source, "Total", each [Qty] * [Price])
in
    Total`, notes: [{ at: "[Qty]", text: "column of the current row" }] },
            { code: `let
    Source = #table({"First", "Last"}, {{"Ada", "Lovelace"}}),
    Full = Table.AddColumn(Source, "Full", each [First] & " " & [Last])
in
    Full`, notes: [] },
            { code: `let
    Source = #table({"N"}, {{1}, {2}, {3}}),
    Index = Table.AddIndexColumn(Source, "Row", 1, 1)
in
    Index`, notes: [] }
          ]
        },
        {
          id: "select-rows", n: 3, title: "filtering rows", level: 1,
          gloss: "Keeps the rows that meet a condition with Table.SelectRows.",
          examples: [
            { code: `let
    Source = #table({"Name", "Age"}, {{"Ada", 36}, {"Bo", 12}}),
    Adults = Table.SelectRows(Source, each [Age] >= 18)
in
    Adults`, notes: [{ at: "Table.SelectRows", text: "keeps matching rows" }] },
            { code: `let
    Source = #table({"City"}, {{"Oslo"}, {"Rome"}}),
    Only = Table.SelectRows(Source, each [City] = "Oslo")
in
    Only`, notes: [] },
            { code: `let
    Source = #table({"N"}, {{1}, {5}, {9}}),
    Mid = Table.SelectRows(Source, each [N] > 2 and [N] < 9)
in
    Mid`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "transforms",
      n: 7,
      title: "table transformations",
      concepts: [
        {
          id: "column-types", n: 1, title: "column types", level: 1,
          gloss: "Sets each column's data type with Table.TransformColumnTypes.",
          examples: [
            { code: `let
    Source = #table({"Qty"}, {{"2"}, {"3"}}),
    Typed = Table.TransformColumnTypes(Source, {{"Qty", Int64.Type}})
in
    Typed`, notes: [{ at: "Int64.Type", text: "whole number type" }] },
            { code: `let
    Source = #table({"Date"}, {{"2026-11-12"}}),
    Typed = Table.TransformColumnTypes(Source, {{"Date", type date}})
in
    Typed`, notes: [] },
            { code: `let
    Source = #table({"A", "B"}, {{"1.5", "x"}}),
    Typed = Table.TransformColumnTypes(
        Source,
        {{"A", type number}, {"B", type text}}
    )
in
    Typed`, notes: [] }
          ]
        },
        {
          id: "shape-columns", n: 2, title: "renaming and removing columns", level: 1,
          gloss: "Renames or removes columns with Table.RenameColumns and Table.RemoveColumns.",
          examples: [
            { code: `let
    Source = #table({"a", "b"}, {{1, 2}}),
    Renamed = Table.RenameColumns(Source, {{"a", "Alpha"}})
in
    Renamed`, notes: [{ at: "Table.RenameColumns", text: "old name, new name" }] },
            { code: `let
    Source = #table({"a", "b", "c"}, {{1, 2, 3}}),
    Slim = Table.RemoveColumns(Source, {"b"})
in
    Slim`, notes: [] },
            { code: `let
    Source = #table({"a", "b", "c"}, {{1, 2, 3}}),
    Keep = Table.SelectColumns(Source, {"c", "a"})
in
    Keep`, notes: [] }
          ]
        },
        {
          id: "sort-group", n: 3, title: "sorting and grouping", level: 2,
          gloss: "Orders rows with Table.Sort and summarizes them with Table.Group.",
          examples: [
            { code: `let
    Source = #table({"Name", "Score"}, {{"Ada", 90}, {"Bo", 75}}),
    Sorted = Table.Sort(Source, {{"Score", Order.Descending}})
in
    Sorted`, notes: [{ at: "Order.Descending", text: "high to low" }] },
            { code: `let
    Source = #table({"City", "Amt"}, {{"Oslo", 5}, {"Oslo", 7}}),
    Totals = Table.Group(
        Source,
        {"City"},
        {{"Sum", each List.Sum([Amt]), type number}}
    )
in
    Totals`, notes: [] },
            { code: `let
    Source = #table({"N"}, {{3}, {3}, {5}}),
    Unique = Table.Distinct(Source)
in
    Unique`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "functions",
      n: 8,
      title: "functions",
      concepts: [
        {
          id: "each-underscore", n: 1, title: "each and the underscore", level: 1,
          gloss: "Writes a one-argument function with each and refers to its argument as underscore.",
          examples: [
            { code: `let
    double = each _ * 2
in
    double(21)`, notes: [{ at: "each", text: "shorthand for (_) =>" }] },
            { code: `let
    v = {1, 2, 3},
    squares = List.Transform(v, each _ * _)
in
    squares`, notes: [] },
            { code: `let
    keep = each Text.Length(_) > 3
in
    List.Select({"tea", "coffee"}, keep)`, notes: [] }
          ]
        },
        {
          id: "custom-functions", n: 2, title: "custom functions", level: 1,
          gloss: "Defines a named function with parameters, an arrow and a body.",
          examples: [
            { code: `let
    area = (r as number) as number => 3.14159 * r * r
in
    area(3)`, notes: [{ at: "=>", text: "separates parameters and body" }] },
            { code: `let
    greet = (name as text) => "Hello, " & name
in
    greet("Ada")`, notes: [] },
            { code: `let
    add = (a, b) => a + b
in
    add(4, 5)`, notes: [] }
          ]
        },
        {
          id: "optional-recursive", n: 3, title: "optional and recursive functions", level: 3,
          gloss: "Marks a parameter optional and refers to a function by name with an at sign for recursion.",
          examples: [
            { code: `let
    power = (base as number, optional exp as nullable number) =>
        Number.Power(base, exp ?? 2)
in
    power(5)`, notes: [{ at: "optional", text: "argument may be omitted" }] },
            { code: `let
    factorial = (n as number) as number =>
        if n <= 1 then 1 else n * @factorial(n - 1)
in
    factorial(5)`, notes: [{ at: "@factorial", text: "recursive reference" }] },
            { code: `let
    gcd = (a as number, b as number) as number =>
        if b = 0 then a else @gcd(b, Number.Mod(a, b))
in
    gcd(48, 18)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "logic",
      n: 9,
      title: "conditions and errors",
      concepts: [
        {
          id: "if-then-else", n: 1, title: "if then else", level: 1,
          gloss: "Chooses a value with if, then and else, which always needs an else branch.",
          examples: [
            { code: `let
    score = 82,
    grade =
        if score >= 90 then "A" else if score >= 80 then "B" else "C"
in
    grade`, notes: [{ at: "else", text: "required" }] },
            { code: `let
    n = -3
in
    if n < 0 then "negative" else "not negative"`, notes: [] },
            { code: `let
    qty = 0
in
    if qty = 0 then null else 100 / qty`, notes: [] }
          ]
        },
        {
          id: "try-otherwise", n: 2, title: "try and otherwise", level: 2,
          gloss: "Replaces a failing expression with a fallback value using try and otherwise.",
          examples: [
            { code: `let
    safe = try Number.From("abc") otherwise 0
in
    safe`, notes: [{ at: "try", text: "catches the error" }] },
            { code: `let
    ratio = try 10 / 0 otherwise null
in
    ratio`, notes: [] },
            { code: `let
    parsed = try Date.FromText("not a date") otherwise #date(1900, 1, 1)
in
    parsed`, notes: [] }
          ]
        },
        {
          id: "raise-errors", n: 3, title: "raising errors", level: 2,
          gloss: "Signals a failure with error and inspects it with try.",
          examples: [
            { code: `let
    check = (n as number) => if n < 0 then error "negative" else n
in
    check(5)`, notes: [{ at: "error", text: "raises an error" }] },
            { code: `let
    result = try error "boom"
in
    result[HasError]`, notes: [] },
            { code: `let
    e = try error [Reason = "Bad", Message = "Invalid row"]
in
    e[Error][Message]`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "sources",
      n: 10,
      title: "data sources",
      concepts: [
        {
          id: "workbook-source", n: 1, title: "workbook tables", level: 1,
          gloss: "Reads a named table from the current workbook.",
          examples: [
            { code: `let
    Source = Excel.CurrentWorkbook(){[Name = "Sales"]}[Content]
in
    Source`, notes: [{ at: "Excel.CurrentWorkbook", text: "tables and ranges" }] },
            { code: `let
    Source = Excel.CurrentWorkbook(){[Name = "Table1"]}[Content],
    Typed = Table.TransformColumnTypes(Source, {{"Amt", type number}})
in
    Typed`, notes: [] },
            { code: `let
    Source = Excel.Workbook(File.Contents("C:\\data\\sales.xlsx"), true),
    Sheet = Source{[Item = "Q1", Kind = "Sheet"]}[Data]
in
    Sheet`, notes: [] }
          ]
        },
        {
          id: "file-sources", n: 2, title: "CSV and JSON files", level: 1,
          gloss: "Loads delimited text and JSON from a file path.",
          examples: [
            { code: `let
    Source = Csv.Document(
        File.Contents("C:\\data\\sales.csv"),
        [Delimiter = ","]
    ),
    Promoted = Table.PromoteHeaders(Source)
in
    Promoted`, notes: [{ at: "Csv.Document", text: "parses delimited text" }] },
            { code: `let
    Source = Json.Document(File.Contents("C:\\data\\config.json")),
    Port = Source[port]
in
    Port`, notes: [] },
            { code: `let
    Source = Folder.Files("C:\\data\\reports"),
    Csvs = Table.SelectRows(Source, each [Extension] = ".csv")
in
    Csvs`, notes: [] }
          ]
        },
        {
          id: "web-sql", n: 3, title: "web and database sources", level: 2,
          gloss: "Pulls data from a web address or a SQL Server database.",
          examples: [
            { code: `let
    Source = Json.Document(Web.Contents("https://example.com/items"))
in
    Source`, notes: [{ at: "Web.Contents", text: "downloads from a URL" }] },
            { code: `let
    Source = Sql.Database("server01", "Sales"),
    Orders = Source{[Schema = "dbo", Item = "Orders"]}[Data]
in
    Orders`, notes: [] },
            { code: `let
    Source = Web.Page(Web.Contents("https://example.com/table")),
    Data = Source{0}[Data]
in
    Data`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "dates",
      n: 11,
      title: "dates and times",
      concepts: [
        {
          id: "date-parts", n: 1, title: "date parts", level: 1,
          gloss: "Reads the year, month and day of a date with Date functions.",
          examples: [
            { code: `let
    d = #date(2026, 11, 12)
in
    {Date.Year(d), Date.Month(d), Date.Day(d)}`, notes: [{ at: "Date.Year", text: "year number" }] },
            { code: `let
    d = #date(2026, 11, 12)
in
    Date.DayOfWeekName(d)`, notes: [] },
            { code: `let
    d = #date(2026, 11, 12)
in
    Date.QuarterOfYear(d)`, notes: [] }
          ]
        },
        {
          id: "date-math", n: 2, title: "adding and measuring", level: 1,
          gloss: "Moves a date with AddDays and AddMonths and measures the gap between two dates.",
          examples: [
            { code: `let
    d = #date(2026, 11, 12)
in
    Date.AddDays(d, 30)`, notes: [{ at: "Date.AddDays", text: "shifted date" }] },
            { code: `let
    d = #date(2026, 1, 31)
in
    Date.AddMonths(d, 1)`, notes: [] },
            { code: `let
    a = #date(2026, 1, 1),
    b = #date(2026, 11, 12)
in
    Duration.Days(b - a)`, notes: [] }
          ]
        },
        {
          id: "date-text", n: 3, title: "converting dates and text", level: 2,
          gloss: "Converts between dates and text with Date.ToText and Date.FromText.",
          examples: [
            { code: `let
    d = #date(2026, 11, 12)
in
    Date.ToText(d, "yyyy-MM-dd")`, notes: [] },
            { code: `let
    d = Date.FromText("2026-11-12")
in
    d`, notes: [] },
            { code: `let
    now = DateTime.LocalNow()
in
    Date.From(now)`, notes: [{ at: "DateTime.LocalNow", text: "current local time" }] }
          ]
        }
      ]
    },
    {
      id: "combine",
      n: 12,
      title: "merging and combining",
      concepts: [
        {
          id: "append-tables", n: 1, title: "appending tables", level: 1,
          gloss: "Stacks tables with the same columns using Table.Combine.",
          examples: [
            { code: `let
    a = #table({"N"}, {{1}, {2}}),
    b = #table({"N"}, {{3}})
in
    Table.Combine({a, b})`, notes: [{ at: "Table.Combine", text: "stacks rows" }] },
            { code: `let
    jan = #table({"Item", "Qty"}, {{"Tea", 2}}),
    feb = #table({"Item", "Qty"}, {{"Tea", 5}})
in
    Table.Combine({jan, feb})`, notes: [] },
            { code: `let
    files = Folder.Files("C:\\data\\monthly"),
    tables = List.Transform(files[Content], each Csv.Document(_))
in
    Table.Combine(tables)`, notes: [] }
          ]
        },
        {
          id: "merge-join", n: 2, title: "merging tables", level: 2,
          gloss: "Joins two tables on a key column with Table.NestedJoin and expands the result.",
          examples: [
            { code: `let
    a = #table({"Id", "Name"}, {{1, "Ada"}}),
    b = #table({"Id", "City"}, {{1, "London"}}),
    J = Table.NestedJoin(a, "Id", b, "Id", "Info", JoinKind.LeftOuter)
in
    J`, notes: [{ at: "JoinKind.LeftOuter", text: "keep every left row" }] },
            { code: `let
    a = #table({"Id", "Name"}, {{1, "Ada"}}),
    b = #table({"Id", "City"}, {{1, "London"}}),
    J = Table.NestedJoin(a, "Id", b, "Id", "Info", JoinKind.Inner),
    X = Table.ExpandTableColumn(J, "Info", {"City"})
in
    X`, notes: [] },
            { code: `let
    a = #table({"Id", "A"}, {{1, "x"}}),
    b = #table({"Id", "B"}, {{1, "y"}}),
    J = Table.Join(a, "Id", b, "Id")
in
    J`, notes: [] }
          ]
        },
        {
          id: "expand-pivot", n: 3, title: "expanding and pivoting", level: 3,
          gloss: "Expands nested records and spreads values across columns with Table.Pivot.",
          examples: [
            { code: `let
    Source = #table({"Data"}, {{[A = 1, B = 2]}}),
    Expanded = Table.ExpandRecordColumn(Source, "Data", {"A", "B"})
in
    Expanded`, notes: [{ at: "Table.ExpandRecordColumn", text: "record to columns" }] },
            { code: `let
    Source = #table({"Key", "Val"}, {{"x", 1}, {"y", 2}}),
    Pivoted = Table.Pivot(Source, {"x", "y"}, "Key", "Val")
in
    Pivoted`, notes: [] },
            { code: `let
    Source = #table({"A", "B"}, {{1, 2}}),
    L = Table.UnpivotOtherColumns(Source, {"A"}, "Attribute", "Value")
in
    L`, notes: [] }
          ]
        }
      ]
    }
  ]
};
