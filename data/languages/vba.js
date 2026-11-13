export default {
  id: "vba",
  name: "VBA",
  short: "VBA",
  pigment: "vba",
  family: null,
  version: "7.1",
  lexer: "vba",
  indent: 4,
  topics: [
    {
      id: "procedures",
      n: 1,
      title: "procedures",
      concepts: [
        {
          id: "sub-procedures", n: 1, title: "Sub procedures", level: 1,
          gloss: "Wraps statements in a Sub that ends with End Sub.",
          examples: [
            { code: `Sub Hello()
    MsgBox "Hello, Oslo"
End Sub`, notes: [{ at: "Sub", text: "starts a procedure" }, { at: "End Sub", text: "ends it" }] },
            { code: `Sub PrintTotal()
    Debug.Print "Total orders:"; 42
End Sub`, notes: [] },
            { code: `Sub ShowDate()
    MsgBox "Today is " & Date
End Sub`, notes: [] }
          ]
        },
        {
          id: "output", n: 2, title: "MsgBox and Debug.Print", level: 1,
          gloss: "Shows a message with MsgBox or writes to the Immediate window with Debug.Print.",
          examples: [
            { code: `Sub Report()
    Debug.Print "Report ready"
End Sub`, notes: [{ at: "Debug.Print", text: "writes to the Immediate window" }] },
            { code: `Sub Ask()
    If MsgBox("Continue?", vbYesNo) = vbYes Then
        Debug.Print "yes"
    End If
End Sub`, notes: [{ at: "vbYesNo", text: "yes and no buttons" }] },
            { code: `Sub Alert()
    MsgBox "Saved", vbInformation, "Status"
End Sub`, notes: [] }
          ]
        },
        {
          id: "option-explicit", n: 3, title: "Option Explicit", level: 1,
          gloss: "Forces every variable to be declared by placing Option Explicit at the top of a module.",
          examples: [
            { code: `Option Explicit

Sub Main()
    Dim n As Long
    n = 5
    Debug.Print n
End Sub`, notes: [{ at: "Option Explicit", text: "requires Dim" }] },
            { code: `Option Explicit

Sub Total()
    Dim price As Double
    price = 19.5
    Debug.Print price * 2
End Sub`, notes: [] },
            { code: `Option Explicit

Sub Greet()
    Dim who As String
    who = "Ada"
    MsgBox "Hi, " & who
End Sub`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "variables",
      n: 2,
      title: "variables and types",
      concepts: [
        {
          id: "dim-types", n: 1, title: "Dim and data types", level: 1,
          gloss: "Declares typed variables with Dim and As.",
          examples: [
            { code: `Sub Types()
    Dim count As Long
    Dim ratio As Double
    Dim name As String
    count = 3: ratio = 0.75: name = "Ada"
    Debug.Print count, ratio, name
End Sub`, notes: [{ at: "As Long", text: "32-bit integer" }] },
            { code: `Sub Flags()
    Dim ready As Boolean
    Dim when As Date
    ready = True
    when = #11/12/2026#
    Debug.Print ready, when
End Sub`, notes: [{ at: "#11/12/2026#", text: "date literal" }] },
            { code: `Sub Several()
    Dim a As Integer, b As Integer
    a = 7
    b = a * 2
    Debug.Print a + b
End Sub`, notes: [] }
          ]
        },
        {
          id: "constants", n: 2, title: "Const", level: 1,
          gloss: "Names a fixed value with Const so it cannot be reassigned.",
          examples: [
            { code: `Sub UseConst()
    Const TAX_RATE As Double = 0.2
    Debug.Print 100 * TAX_RATE
End Sub`, notes: [{ at: "Const", text: "fixed value" }] },
            { code: `Const MAX_ROWS As Long = 1000

Sub Limit()
    Debug.Print MAX_ROWS
End Sub`, notes: [] },
            { code: `Sub Labels()
    Const TITLE As String = "Report"
    Const COPIES As Integer = 3
    Debug.Print TITLE, COPIES
End Sub`, notes: [] }
          ]
        },
        {
          id: "conversion", n: 3, title: "type conversion", level: 1,
          gloss: "Converts values with CLng, CDbl, CStr and Val.",
          examples: [
            { code: `Sub Convert()
    Dim n As Long
    n = CLng("42") + 1
    Debug.Print n
End Sub`, notes: [{ at: "CLng", text: "convert to Long" }] },
            { code: `Sub ToText()
    Dim s As String
    s = CStr(3.5) & " units"
    Debug.Print s
End Sub`, notes: [] },
            { code: `Sub Parse()
    Debug.Print Val("12.5kg") + 1
    Debug.Print CDbl("2.25") * 2
End Sub`, notes: [{ at: "Val", text: "reads leading digits" }] }
          ]
        }
      ]
    },
    {
      id: "strings",
      n: 3,
      title: "strings",
      concepts: [
        {
          id: "concat-case", n: 1, title: "concatenation and case", level: 1,
          gloss: "Joins strings with the ampersand and changes case with UCase and LCase.",
          examples: [
            { code: `Sub Joined()
    Dim full As String
    full = "Ada" & " " & "Lovelace"
    Debug.Print full
End Sub`, notes: [{ at: "&", text: "concatenation" }] },
            { code: `Sub Shout()
    Debug.Print UCase("quiet"), LCase("LOUD")
End Sub`, notes: [] },
            { code: `Sub Clean()
    Debug.Print "[" & Trim("  padded  ") & "]"
    Debug.Print Len("report")
End Sub`, notes: [] }
          ]
        },
        {
          id: "slicing", n: 2, title: "Left, Right and Mid", level: 1,
          gloss: "Takes parts of a string with Left, Right and Mid.",
          examples: [
            { code: `Sub Parts()
    Dim s As String
    s = "2026-11-12"
    Debug.Print Left(s, 4), Right(s, 2)
End Sub`, notes: [{ at: "Left", text: "first characters" }] },
            { code: `Sub Middle()
    Dim s As String
    s = "2026-11-12"
    Debug.Print Mid(s, 6, 2)
End Sub`, notes: [] },
            { code: `Sub Initial()
    Dim name As String
    name = "Grace"
    Debug.Print UCase(Left(name, 1)) & Mid(name, 2)
End Sub`, notes: [] }
          ]
        },
        {
          id: "search-replace", n: 3, title: "InStr and Replace", level: 1,
          gloss: "Finds text with InStr and swaps it with Replace.",
          examples: [
            { code: `Sub FindSlash()
    Dim path As String
    path = "reports\\2026.csv"
    Debug.Print InStr(path, "\\")
End Sub`, notes: [{ at: "InStr", text: "position or zero" }] },
            { code: `Sub Swap()
    Debug.Print Replace("red green red", "red", "blue")
End Sub`, notes: [] },
            { code: `Sub Ext()
    Dim f As String
    f = "data.backup.xlsx"
    Debug.Print Mid(f, InStrRev(f, ".") + 1)
End Sub`, notes: [{ at: "InStrRev", text: "search from the end" }] }
          ]
        },
        {
          id: "split-format", n: 4, title: "Split, Join and Format", level: 2,
          gloss: "Splits text into an array, rebuilds it with Join and formats values with Format.",
          examples: [
            { code: `Sub Pieces()
    Dim parts() As String
    parts = Split("a,b,c", ",")
    Debug.Print UBound(parts), parts(0)
End Sub`, notes: [{ at: "Split", text: "returns an array" }] },
            { code: `Sub Rebuild()
    Dim words As Variant
    words = Array("one", "two", "three")
    Debug.Print Join(words, "-")
End Sub`, notes: [] },
            { code: `Sub Money()
    Debug.Print Format(1234.5, "#,##0.00")
    Debug.Print Format(Date, "yyyy-mm-dd")
End Sub`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "control-flow",
      n: 4,
      title: "control flow",
      concepts: [
        {
          id: "if-else", n: 1, title: "If, ElseIf and Else", level: 1,
          gloss: "Chooses a branch with If, ElseIf and Else.",
          examples: [
            { code: `Sub Grade()
    Dim score As Long
    score = 82
    If score >= 90 Then
        Debug.Print "A"
    ElseIf score >= 80 Then
        Debug.Print "B"
    Else
        Debug.Print "C"
    End If
End Sub`, notes: [{ at: "ElseIf", text: "next condition" }] },
            { code: `Sub Sign()
    Dim n As Long
    n = -3
    If n < 0 Then
        Debug.Print "negative"
    Else
        Debug.Print "not negative"
    End If
End Sub`, notes: [] },
            { code: `Sub Guard()
    Dim balance As Double
    balance = 12.5
    If balance < 0 Then Debug.Print "overdrawn"
    Debug.Print balance
End Sub`, notes: [] }
          ]
        },
        {
          id: "select-case", n: 2, title: "Select Case", level: 1,
          gloss: "Matches one value against cases, ranges and Case Else.",
          examples: [
            { code: `Sub DayName()
    Dim d As Long
    d = 3
    Select Case d
        Case 1
            Debug.Print "Monday"
        Case 2 To 5
            Debug.Print "midweek"
        Case Else
            Debug.Print "weekend"
    End Select
End Sub`, notes: [{ at: "Case 2 To 5", text: "inclusive range" }] },
            { code: `Sub Command()
    Dim cmd As String
    cmd = "start"
    Select Case cmd
        Case "start", "run"
            Debug.Print "starting"
        Case Else
            Debug.Print "unknown"
    End Select
End Sub`, notes: [] },
            { code: `Sub Size()
    Dim n As Long
    n = 40
    Select Case True
        Case n < 10: Debug.Print "small"
        Case n < 100: Debug.Print "medium"
        Case Else: Debug.Print "large"
    End Select
End Sub`, notes: [] }
          ]
        },
        {
          id: "logic", n: 3, title: "And, Or and Not", level: 1,
          gloss: "Combines conditions with And, Or and Not.",
          examples: [
            { code: `Sub Rules()
    Dim a As Boolean, b As Boolean
    a = True: b = False
    Debug.Print a And b, a Or b, Not a
End Sub`, notes: [{ at: "And", text: "both true" }] },
            { code: `Sub Access()
    Dim member As Boolean, banned As Boolean
    member = True
    banned = False
    If member And Not banned Then Debug.Print "welcome"
End Sub`, notes: [] },
            { code: `Sub InRange()
    Dim n As Long
    n = 15
    If n >= 10 And n <= 20 Then Debug.Print "in range"
    If n < 0 Or n > 100 Then Debug.Print "out"
End Sub`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "loops",
      n: 5,
      title: "loops",
      concepts: [
        {
          id: "for-next", n: 1, title: "For Next", level: 1,
          gloss: "Repeats a block with a counter from a start to an end and an optional Step.",
          examples: [
            { code: `Sub CountUp()
    Dim i As Long
    For i = 1 To 3
        Debug.Print i
    Next i
End Sub`, notes: [{ at: "Next", text: "end of the loop" }] },
            { code: `Sub Evens()
    Dim i As Long
    For i = 2 To 10 Step 2
        Debug.Print i
    Next i
End Sub`, notes: [{ at: "Step 2", text: "increment" }] },
            { code: `Sub Countdown()
    Dim i As Long
    For i = 5 To 1 Step -1
        Debug.Print i
    Next i
End Sub`, notes: [] }
          ]
        },
        {
          id: "for-each", n: 2, title: "For Each", level: 1,
          gloss: "Visits every element of an array or collection with For Each.",
          examples: [
            { code: `Sub Walk()
    Dim item As Variant
    For Each item In Array("a", "b", "c")
        Debug.Print item
    Next item
End Sub`, notes: [{ at: "For Each", text: "every element" }] },
            { code: `Sub Total()
    Dim n As Variant, sum As Long
    For Each n In Array(3, 5, 9)
        sum = sum + n
    Next n
    Debug.Print sum
End Sub`, notes: [] },
            { code: `Sub ListSheets()
    Dim ws As Worksheet
    For Each ws In ThisWorkbook.Worksheets
        Debug.Print ws.Name
    Next ws
End Sub`, notes: [] }
          ]
        },
        {
          id: "do-loops", n: 3, title: "Do While and Do Until", level: 1,
          gloss: "Loops while a condition holds or until it becomes true.",
          examples: [
            { code: `Sub Halve()
    Dim n As Long
    n = 100
    Do While n > 5
        n = n \\ 2
    Loop
    Debug.Print n
End Sub`, notes: [{ at: "\\", text: "integer division" }] },
            { code: `Sub Grow()
    Dim n As Long
    n = 1
    Do Until n > 50
        n = n * 3
    Loop
    Debug.Print n
End Sub`, notes: [] },
            { code: `Sub AtLeastOnce()
    Dim i As Long
    Do
        i = i + 1
    Loop While i < 3
    Debug.Print i
End Sub`, notes: [] }
          ]
        },
        {
          id: "exit-loops", n: 4, title: "Exit For and Exit Do", level: 2,
          gloss: "Leaves a loop early with Exit For or Exit Do.",
          examples: [
            { code: `Sub FirstBig()
    Dim i As Long
    For i = 1 To 20
        If i * i > 50 Then Exit For
    Next i
    Debug.Print i
End Sub`, notes: [{ at: "Exit For", text: "leaves the loop" }] },
            { code: `Sub Wait()
    Dim n As Long
    Do
        n = n + 1
        If n = 7 Then Exit Do
    Loop
    Debug.Print n
End Sub`, notes: [] },
            { code: `Sub Odds()
    Dim i As Long
    For i = 1 To 6
        If i Mod 2 = 0 Then GoTo Skip
        Debug.Print i
Skip:
    Next i
End Sub`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "arrays",
      n: 6,
      title: "arrays and collections",
      concepts: [
        {
          id: "fixed-arrays", n: 1, title: "fixed arrays", level: 1,
          gloss: "Declares an array with a size and reads items by index.",
          examples: [
            { code: `Sub Scores()
    Dim marks(1 To 4) As Long
    marks(1) = 70: marks(2) = 85
    marks(3) = 90: marks(4) = 65
    Debug.Print marks(2), UBound(marks)
End Sub`, notes: [{ at: "1 To 4", text: "index range" }] },
            { code: `Sub Names()
    Dim names(0 To 2) As String
    names(0) = "Ada"
    names(1) = "Grace"
    names(2) = "Linus"
    Debug.Print names(1)
End Sub`, notes: [] },
            { code: `Sub Quick()
    Dim v As Variant
    v = Array(10, 20, 30)
    Debug.Print v(0), LBound(v), UBound(v)
End Sub`, notes: [{ at: "Array", text: "zero-based list" }] }
          ]
        },
        {
          id: "dynamic-arrays", n: 2, title: "ReDim and Preserve", level: 2,
          gloss: "Resizes an array at run time with ReDim and keeps its values with Preserve.",
          examples: [
            { code: `Sub Resize()
    Dim a() As Long
    ReDim a(1 To 3)
    a(1) = 5
    Debug.Print UBound(a)
End Sub`, notes: [{ at: "ReDim", text: "sets the size" }] },
            { code: `Sub Grow()
    Dim a() As Long
    ReDim a(1 To 2)
    a(1) = 1: a(2) = 2
    ReDim Preserve a(1 To 3)
    a(3) = 3
    Debug.Print a(1), a(3)
End Sub`, notes: [{ at: "Preserve", text: "keeps existing items" }] },
            { code: `Sub Collect()
    Dim a() As String, n As Long
    ReDim a(0 To 0)
    a(0) = "first"
    n = UBound(a) + 1
    ReDim Preserve a(0 To n)
    a(n) = "second"
    Debug.Print a(n)
End Sub`, notes: [] }
          ]
        },
        {
          id: "collections", n: 3, title: "Collection and Dictionary", level: 2,
          gloss: "Stores items by position in a Collection or by key in a Dictionary.",
          examples: [
            { code: `Sub Bag()
    Dim c As New Collection
    c.Add "apples"
    c.Add "pears"
    Debug.Print c.Count, c(1)
End Sub`, notes: [{ at: "Collection", text: "ordered group" }] },
            { code: `Sub Keyed()
    Dim c As New Collection
    c.Add 36, "Ada"
    c.Add 85, "Grace"
    Debug.Print c("Grace")
End Sub`, notes: [] },
            { code: `Sub Lookup()
    Dim d As Object
    Set d = CreateObject("Scripting.Dictionary")
    d("a") = 1
    d("b") = 2
    Debug.Print d.Exists("a"), d.Count
End Sub`, notes: [{ at: "Scripting.Dictionary", text: "key and value map" }] }
          ]
        }
      ]
    },
    {
      id: "functions",
      n: 7,
      title: "functions",
      concepts: [
        {
          id: "function-procedures", n: 1, title: "Function procedures", level: 1,
          gloss: "Returns a value from a Function by assigning to its own name.",
          examples: [
            { code: `Function Area(r As Double) As Double
    Area = 3.14159 * r * r
End Function`, notes: [{ at: "Area =", text: "sets the return value" }] },
            { code: `Function Twice(n As Long) As Long
    Twice = 2 * n
End Function

Sub Test()
    Debug.Print Twice(21)
End Sub`, notes: [] },
            { code: `Function Greet(name As String) As String
    Greet = "Hello, " & name
End Function`, notes: [] }
          ]
        },
        {
          id: "byval-byref", n: 2, title: "ByVal and ByRef", level: 2,
          gloss: "Passes a copy with ByVal or the original variable with ByRef.",
          examples: [
            { code: `Sub Bump(ByRef n As Long)
    n = n + 1
End Sub

Sub Test()
    Dim a As Long
    a = 5
    Bump a
    Debug.Print a
End Sub`, notes: [{ at: "ByRef", text: "changes the caller's variable" }] },
            { code: `Sub Try(ByVal n As Long)
    n = n + 1
End Sub

Sub Test()
    Dim a As Long
    a = 5
    Try a
    Debug.Print a
End Sub`, notes: [{ at: "ByVal", text: "passes a copy" }] },
            { code: `Sub Swap(ByRef a As Long, ByRef b As Long)
    Dim t As Long
    t = a: a = b: b = t
End Sub`, notes: [] }
          ]
        },
        {
          id: "optional-params", n: 3, title: "Optional and ParamArray", level: 2,
          gloss: "Makes an argument optional with a default or accepts any number of arguments.",
          examples: [
            { code: `Function Power(b As Double, Optional e As Long = 2) As Double
    Power = b ^ e
End Function`, notes: [{ at: "Optional", text: "argument can be omitted" }] },
            { code: `Function Total(ParamArray nums() As Variant) As Double
    Dim n As Variant
    For Each n In nums
        Total = Total + n
    Next n
End Function`, notes: [{ at: "ParamArray", text: "any number of values" }] },
            { code: `Function Label(t As String, Optional bold As Boolean = False) As String
    If bold Then Label = "*" & t & "*" Else Label = t
End Function`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "ranges",
      n: 8,
      title: "ranges and cells",
      concepts: [
        {
          id: "range-value", n: 1, title: "Range and Value", level: 1,
          gloss: "Reads and writes cells through the Range object.",
          examples: [
            { code: `Sub WriteCells()
    Range("A1").Value = "Name"
    Range("B1").Value = 42
End Sub`, notes: [{ at: "Range(\"A1\")", text: "one cell" }] },
            { code: `Sub Block()
    Range("A1:C1").Value = "x"
    Range("A2:A4").Value = 0
End Sub`, notes: [] },
            { code: `Sub ReadCell()
    Dim v As Variant
    v = Range("B1").Value
    Debug.Print v
End Sub`, notes: [] }
          ]
        },
        {
          id: "cells-offset", n: 2, title: "Cells and Offset", level: 1,
          gloss: "Addresses a cell by row and column number or relative to another cell.",
          examples: [
            { code: `Sub ByNumber()
    Cells(2, 3).Value = "C2"
    Cells(1, 1).Value = "A1"
End Sub`, notes: [{ at: "Cells(2, 3)", text: "row 2, column 3" }] },
            { code: `Sub OffsetCells()
    Range("A1").Offset(1, 0).Value = "below"
    Range("A1").Offset(0, 2).Value = "right"
End Sub`, notes: [{ at: "Offset", text: "relative cell" }] },
            { code: `Sub Fill()
    Dim r As Long
    For r = 1 To 5
        Cells(r, 1).Value = r * 10
    Next r
End Sub`, notes: [] }
          ]
        },
        {
          id: "last-row", n: 3, title: "finding the last row", level: 1,
          gloss: "Finds the last used row by jumping up from the bottom of a column.",
          examples: [
            { code: `Sub LastRow()
    Dim n As Long
    n = Cells(Rows.Count, 1).End(xlUp).Row
    Debug.Print n
End Sub`, notes: [{ at: "End(xlUp)", text: "jumps to the last filled cell" }] },
            { code: `Sub Append()
    Dim n As Long
    n = Cells(Rows.Count, "A").End(xlUp).Row + 1
    Cells(n, 1).Value = "new row"
End Sub`, notes: [] },
            { code: `Sub Region()
    Debug.Print Range("A1").CurrentRegion.Rows.Count
    Debug.Print Range("A1").CurrentRegion.Address
End Sub`, notes: [{ at: "CurrentRegion", text: "connected block of cells" }] }
          ]
        },
        {
          id: "range-loops", n: 4, title: "looping over cells", level: 2,
          gloss: "Visits each cell of a range with For Each.",
          examples: [
            { code: `Sub DoubleCells()
    Dim c As Range
    For Each c In Range("A1:A5")
        c.Value = c.Value * 2
    Next c
End Sub`, notes: [] },
            { code: `Sub Highlight()
    Dim c As Range
    For Each c In Range("B2:B20")
        If c.Value > 100 Then c.Interior.Color = vbYellow
    Next c
End Sub`, notes: [] },
            { code: `Sub Total()
    Dim r As Long, sum As Double
    For r = 2 To 10
        sum = sum + Cells(r, 3).Value
    Next r
    Debug.Print sum
End Sub`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "sheets",
      n: 9,
      title: "worksheets and workbooks",
      concepts: [
        {
          id: "worksheets", n: 1, title: "Worksheets", level: 1,
          gloss: "Refers to a sheet by name and adds or deletes sheets.",
          examples: [
            { code: `Sub Pick()
    Worksheets("Data").Range("A1").Value = "ok"
    Debug.Print ActiveSheet.Name
End Sub`, notes: [{ at: "Worksheets(\"Data\")", text: "sheet by name" }] },
            { code: `Sub NewSheet()
    Dim ws As Worksheet
    Set ws = Worksheets.Add
    ws.Name = "Summary"
End Sub`, notes: [] },
            { code: `Sub Remove()
    Application.DisplayAlerts = False
    Worksheets("Temp").Delete
    Application.DisplayAlerts = True
End Sub`, notes: [] }
          ]
        },
        {
          id: "workbooks", n: 2, title: "Workbooks", level: 2,
          gloss: "Opens a file, saves it and closes it through the Workbooks collection.",
          examples: [
            { code: `Sub OpenBook()
    Dim wb As Workbook
    Set wb = Workbooks.Open("C:\\data\\sales.xlsx")
    Debug.Print wb.Name
End Sub`, notes: [{ at: "Workbooks.Open", text: "opens a file" }] },
            { code: `Sub SaveBook()
    ThisWorkbook.Save
    Debug.Print ThisWorkbook.Name
End Sub`, notes: [] },
            { code: `Sub Finish()
    Workbooks("sales.xlsx").Close SaveChanges:=False
End Sub`, notes: [] }
          ]
        },
        {
          id: "with-blocks", n: 3, title: "With blocks", level: 2,
          gloss: "Sets several properties of one object inside a With block.",
          examples: [
            { code: `Sub Style()
    With Range("A1")
        .Value = "Title"
        .Font.Bold = True
        .Font.Size = 14
    End With
End Sub`, notes: [{ at: "With", text: "shared object" }] },
            { code: `Sub FormatHeader()
    With Range("A1:D1")
        .Interior.Color = RGB(30, 60, 120)
        .Font.Color = vbWhite
    End With
End Sub`, notes: [] },
            { code: `Sub Layout()
    With ActiveSheet
        .Columns("A:A").ColumnWidth = 20
        .Rows(1).Font.Bold = True
    End With
End Sub`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "errors",
      n: 10,
      title: "error handling",
      concepts: [
        {
          id: "resume-next", n: 1, title: "On Error Resume Next", level: 2,
          gloss: "Skips a failing statement and continues, then checks Err.Number.",
          examples: [
            { code: `Sub Skip()
    On Error Resume Next
    Debug.Print 1 / 0
    Debug.Print "still running"
End Sub`, notes: [{ at: "Resume Next", text: "ignore and continue" }] },
            { code: `Sub Exists()
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = Worksheets("Data")
    On Error GoTo 0
    Debug.Print ws Is Nothing
End Sub`, notes: [{ at: "GoTo 0", text: "turns handling off" }] },
            { code: `Sub Safe()
    On Error Resume Next
    Kill "C:\\temp\\old.txt"
    If Err.Number <> 0 Then Debug.Print "not found"
End Sub`, notes: [] }
          ]
        },
        {
          id: "on-error-goto", n: 2, title: "On Error GoTo", level: 1,
          gloss: "Jumps to a labelled handler when an error occurs.",
          examples: [
            { code: `Sub Divide()
    On Error GoTo Fail
    Debug.Print 10 / 0
    Exit Sub
Fail:
    Debug.Print "error caught"
End Sub`, notes: [{ at: "Exit Sub", text: "skips the handler" }] },
            { code: `Sub Load()
    On Error GoTo Handler
    Workbooks.Open "missing.xlsx"
    Exit Sub
Handler:
    MsgBox "Could not open the file"
End Sub`, notes: [] },
            { code: `Sub Cleanup()
    On Error GoTo Done
    Range("A1").Value = 1 / 0
Done:
    Application.ScreenUpdating = True
End Sub`, notes: [] }
          ]
        },
        {
          id: "err-object", n: 3, title: "the Err object", level: 2,
          gloss: "Reads the error number and message from Err and raises your own with Err.Raise.",
          examples: [
            { code: `Sub Report()
    On Error GoTo Fail
    Debug.Print 5 / 0
    Exit Sub
Fail:
    Debug.Print Err.Number, Err.Description
End Sub`, notes: [{ at: "Err.Description", text: "error message" }] },
            { code: `Sub Check(n As Long)
    If n < 0 Then Err.Raise 5, , "n must not be negative"
End Sub`, notes: [{ at: "Err.Raise", text: "signals an error" }] },
            { code: `Sub Retry()
    On Error GoTo Fail
    Err.Raise 1000, "Retry", "custom failure"
    Exit Sub
Fail:
    Debug.Print Err.Source
    Err.Clear
End Sub`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "objects",
      n: 11,
      title: "objects and classes",
      concepts: [
        {
          id: "set-objects", n: 1, title: "Set and object variables", level: 2,
          gloss: "Assigns an object reference with Set and releases it with Nothing.",
          examples: [
            { code: `Sub Ref()
    Dim ws As Worksheet
    Set ws = Worksheets("Data")
    ws.Range("A1").Value = "ok"
    Set ws = Nothing
End Sub`, notes: [{ at: "Set", text: "object assignment" }] },
            { code: `Sub Rng()
    Dim r As Range
    Set r = Range("A1:B5")
    Debug.Print r.Rows.Count, r.Columns.Count
End Sub`, notes: [] },
            { code: `Sub Book()
    Dim wb As Workbook
    Set wb = ThisWorkbook
    Debug.Print wb.Worksheets.Count
End Sub`, notes: [] }
          ]
        },
        {
          id: "class-modules", n: 2, title: "class modules", level: 3,
          gloss: "Defines a class with private fields and Property Get and Property Let.",
          examples: [
            { code: `Private pName As String
Public Property Get Name() As String
    Name = pName
End Property

Public Property Let Name(ByVal v As String)
    pName = v
End Property`, notes: [{ at: "Property Get", text: "reads a value" }, { at: "Property Let", text: "writes a value" }] },
            { code: `Private pTotal As Double
Public Sub Add(ByVal x As Double)
    pTotal = pTotal + x
End Sub

Public Function Total() As Double
    Total = pTotal
End Function`, notes: [] },
            { code: `Dim p As New Person

Sub Use()
    p.Name = "Ada"
    Debug.Print p.Name
End Sub`, notes: [] }
          ]
        },
        {
          id: "createobject", n: 3, title: "CreateObject", level: 3,
          gloss: "Creates a COM object by its programmatic identifier at run time.",
          examples: [
            { code: `Sub UseDict()
    Dim d As Object
    Set d = CreateObject("Scripting.Dictionary")
    d.Add "a", 1
    Debug.Print d.Count
End Sub`, notes: [{ at: "CreateObject", text: "late-bound object" }] },
            { code: `Sub Files()
    Dim fso As Object
    Set fso = CreateObject("Scripting.FileSystemObject")
    Debug.Print fso.FileExists("C:\\temp\\a.txt")
End Sub`, notes: [] },
            { code: `Sub PopupDone()
    Dim sh As Object
    Set sh = CreateObject("WScript.Shell")
    sh.Popup "Done", 2
End Sub`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "application",
      n: 12,
      title: "application and events",
      concepts: [
        {
          id: "app-settings", n: 1, title: "Application settings", level: 2,
          gloss: "Turns off screen updating and automatic calculation to speed up a macro.",
          examples: [
            { code: `Sub Fast()
    Application.ScreenUpdating = False
    Range("A1:A1000").Value = 1
    Application.ScreenUpdating = True
End Sub`, notes: [{ at: "ScreenUpdating", text: "redraw switch" }] },
            { code: `Sub Batch()
    Application.Calculation = xlCalculationManual
    Range("B1").Formula = "=SUM(A1:A100)"
    Application.Calculation = xlCalculationAutomatic
End Sub`, notes: [] },
            { code: `Sub Quiet()
    Application.DisplayAlerts = False
    ActiveWorkbook.Close
    Application.DisplayAlerts = True
End Sub`, notes: [] }
          ]
        },
        {
          id: "events", n: 2, title: "worksheet events", level: 2,
          gloss: "Runs code when a cell changes or a sheet opens by writing an event procedure.",
          examples: [
            { code: `Private Sub Worksheet_Change(ByVal Target As Range)
    If Target.Address = "$A$1" Then
        Range("B1").Value = Target.Value * 2
    End If
End Sub`, notes: [{ at: "Worksheet_Change", text: "fires on edits" }] },
            { code: `Private Sub Workbook_Open()
    MsgBox "Welcome back"
End Sub`, notes: [] },
            { code: `Private Sub Worksheet_SelectionChange(ByVal Target As Range)
    Debug.Print Target.Address
End Sub`, notes: [] }
          ]
        },
        {
          id: "input", n: 3, title: "InputBox and results", level: 2,
          gloss: "Asks for a value with InputBox and reacts to the button the user pressed.",
          examples: [
            { code: `Sub Ask()
    Dim name As String
    name = InputBox("Your name?")
    If name <> "" Then MsgBox "Hello, " & name
End Sub`, notes: [{ at: "InputBox", text: "prompts for text" }] },
            { code: `Sub Confirm()
    Dim ans As VbMsgBoxResult
    ans = MsgBox("Delete the sheet?", vbYesNo + vbQuestion)
    If ans = vbNo Then Exit Sub
    Debug.Print "deleting"
End Sub`, notes: [] },
            { code: `Sub Pick()
    Dim n As Variant
    n = Application.InputBox("Count?", Type:=1)
    If n = False Then Exit Sub
    Debug.Print n
End Sub`, notes: [] }
          ]
        }
      ]
    }
  ]
};
