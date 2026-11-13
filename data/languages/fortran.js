export default {
  id: "fortran",
  name: "Fortran",
  short: "FT",
  pigment: "fortran",
  family: null,
  version: "2023",
  lexer: "fortran",
  indent: 2,
  topics: [
    {
      id: "program-structure",
      n: 1,
      title: "program structure",
      concepts: [
        {
          id: "program-unit", n: 1, title: "program unit", level: 1,
          gloss: "Wraps statements in a program unit that ends with end program.",
          examples: [
            { code: `program hello
  implicit none
  print *, "Hello, Oslo"
end program hello`, notes: [{ at: "program", text: "opens the unit" }, { at: "end program", text: "closes the unit" }] },
            { code: `program report
  implicit none
  print *, "Total orders:", 42
end program report`, notes: [] },
            { code: `program greet
  implicit none
  character(len=3) :: name
  name = "Ada"
  print *, "Hello, ", name
end program greet`, notes: [] }
          ]
        },
        {
          id: "implicit-none", n: 2, title: "implicit none", level: 1,
          gloss: "Requires every variable to be declared before it is used.",
          examples: [
            { code: `program check
  implicit none
  integer :: count
  count = 3
  print *, count
end program check`, notes: [{ at: "implicit none", text: "no guessed types" }] },
            { code: `program totals
  implicit none
  real :: price, tax
  price = 20.0
  tax = price * 0.2
  print *, price + tax
end program totals`, notes: [] },
            { code: `program flags
  implicit none
  logical :: ready
  ready = .true.
  print *, ready
end program flags`, notes: [] }
          ]
        },
        {
          id: "continuation", n: 3, title: "continuation and semicolons", level: 2,
          gloss: "Continues a long statement with an ampersand and joins statements with semicolons.",
          examples: [
            { code: `program long_sum
  implicit none
  integer :: total
  total = 1 + 2 + 3 + &
          4 + 5
  print *, total
end program long_sum`, notes: [{ at: "&", text: "continues on the next line" }] },
            { code: `program pair
  implicit none
  integer :: a, b
  a = 1; b = 2
  print *, a, b
end program pair`, notes: [] },
            { code: `program text
  implicit none
  print *, "first part, " // &
           "second part"
end program text`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "types",
      n: 2,
      title: "types and declarations",
      concepts: [
        {
          id: "numeric-types", n: 1, title: "integer and real types", level: 1,
          gloss: "Declares integer and real variables after a double colon.",
          examples: [
            { code: `program counts
  implicit none
  integer :: users = 120
  real :: ratio = 0.75
  print *, users, ratio
end program counts`, notes: [{ at: "::", text: "separates type and names" }] },
            { code: `program dims
  implicit none
  integer :: width, height
  width = 8
  height = 5
  print *, width * height
end program dims`, notes: [] },
            { code: `program temp
  implicit none
  real :: celsius, fahrenheit
  celsius = 21.5
  fahrenheit = celsius * 9.0 / 5.0 + 32.0
  print *, fahrenheit
end program temp`, notes: [] }
          ]
        },
        {
          id: "logical-character", n: 2, title: "logical and character types", level: 1,
          gloss: "Declares logical flags and fixed-length character variables.",
          examples: [
            { code: `program status
  implicit none
  logical :: done = .false.
  character(len=6) :: label = "queued"
  print *, done, label
end program status`, notes: [{ at: "len=6", text: "fixed length" }] },
            { code: `program login
  implicit none
  logical :: admin
  admin = .true.
  print *, "admin:", admin
end program login`, notes: [] },
            { code: `program names
  implicit none
  character(len=10) :: city
  city = "Cairo"
  print *, trim(city)
end program names`, notes: [] }
          ]
        },
        {
          id: "kinds-parameters", n: 3, title: "kinds and parameters", level: 2,
          gloss: "Fixes precision with kind values and names constants with the parameter attribute.",
          examples: [
            { code: `program precise
  use, intrinsic :: iso_fortran_env, only: real64
  implicit none
  real(real64) :: third
  third = 1.0_real64 / 3.0_real64
  print *, third
end program precise`, notes: [{ at: "real64", text: "double precision kind" }] },
            { code: `program constants
  implicit none
  real, parameter :: pi = 3.14159
  integer, parameter :: days = 7
  print *, pi, days
end program constants`, notes: [{ at: "parameter", text: "constant value" }] },
            { code: `program big
  use, intrinsic :: iso_fortran_env, only: int64
  implicit none
  integer(int64) :: trillion
  trillion = 10_int64**12
  print *, trillion
end program big`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "operators",
      n: 3,
      title: "operators",
      concepts: [
        {
          id: "arithmetic", n: 1, title: "arithmetic operators", level: 1,
          gloss: "Combines numbers with plus, minus, times, divide and the power operator.",
          examples: [
            { code: `program math
  implicit none
  print *, 7 + 3, 7 - 3, 7 * 3
  print *, 7 / 3, 7.0 / 3.0, 2 ** 10
end program math`, notes: [{ at: "7 / 3", text: "integer division" }, { at: "**", text: "power" }] },
            { code: `program remainder
  implicit none
  print *, mod(17, 5), modulo(-17, 5)
  print *, abs(-4), sqrt(16.0)
end program remainder`, notes: [] },
            { code: `program area
  implicit none
  real :: r
  r = 2.5
  print *, 3.14159 * r ** 2
end program area`, notes: [] }
          ]
        },
        {
          id: "relational", n: 2, title: "relational operators", level: 1,
          gloss: "Compares values with symbols such as == and /= or the older dotted forms.",
          examples: [
            { code: `program compare
  implicit none
  integer :: a = 4, b = 9
  print *, a == b, a /= b, a < b
  print *, a >= b
end program compare`, notes: [{ at: "/=", text: "not equal" }] },
            { code: `program old_style
  implicit none
  integer :: n = 5
  print *, n .eq. 5, n .gt. 7
end program old_style`, notes: [] },
            { code: `program limit
  implicit none
  real :: load = 0.82
  print *, load <= 0.9
end program limit`, notes: [] }
          ]
        },
        {
          id: "logical", n: 3, title: "logical operators", level: 1,
          gloss: "Combines conditions with the dotted and, or, not and eqv operators.",
          examples: [
            { code: `program rules
  implicit none
  logical :: a = .true., b = .false.
  print *, a .and. b, a .or. b, .not. a
end program rules`, notes: [{ at: ".and.", text: "both true" }] },
            { code: `program access
  implicit none
  logical :: member = .true., banned = .false.
  print *, member .and. .not. banned
end program access`, notes: [] },
            { code: `program same
  implicit none
  logical :: x = .true., y = .true.
  print *, x .eqv. y, x .neqv. y
end program same`, notes: [] }
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
          id: "if-construct", n: 1, title: "if constructs", level: 1,
          gloss: "Chooses between branches with if, else if, else and end if.",
          examples: [
            { code: `program grade
  implicit none
  integer :: score = 82
  if (score >= 90) then
    print *, "A"
  else if (score >= 80) then
    print *, "B"
  else
    print *, "C"
  end if
end program grade`, notes: [{ at: "then", text: "required after the condition" }] },
            { code: `program sign
  implicit none
  integer :: n = -3
  if (n < 0) then
    print *, "negative"
  else
    print *, "not negative"
  end if
end program sign`, notes: [] },
            { code: `program guard
  implicit none
  real :: balance = 12.5
  if (balance < 0.0) print *, "overdrawn"
  print *, balance
end program guard`, notes: [{ at: "if (balance < 0.0)", text: "one-line if" }] }
          ]
        },
        {
          id: "select-case", n: 2, title: "select case", level: 1,
          gloss: "Matches one value against cases, ranges and a default branch.",
          examples: [
            { code: `program weekday
  implicit none
  integer :: day = 3
  select case (day)
  case (1)
    print *, "Monday"
  case (2:5)
    print *, "midweek"
  case default
    print *, "weekend"
  end select
end program weekday`, notes: [{ at: "case (2:5)", text: "inclusive range" }] },
            { code: `program command
  implicit none
  character(len=5) :: cmd = "start"
  select case (trim(cmd))
  case ("start", "run")
    print *, "starting"
  case default
    print *, "unknown"
  end select
end program command`, notes: [] },
            { code: `program size_class
  implicit none
  integer :: n = 40
  select case (n)
  case (:9)
    print *, "small"
  case (10:99)
    print *, "medium"
  case (100:)
    print *, "large"
  end select
end program size_class`, notes: [] }
          ]
        },
        {
          id: "do-loops", n: 3, title: "counted do loops", level: 1,
          gloss: "Repeats a block for each value of an index with a start, end and optional step.",
          examples: [
            { code: `program count
  implicit none
  integer :: i
  do i = 1, 3
    print *, i
  end do
end program count`, notes: [{ at: "do i = 1, 3", text: "start and end" }] },
            { code: `program evens
  implicit none
  integer :: i
  do i = 2, 10, 2
    print *, i
  end do
end program evens`, notes: [] },
            { code: `program countdown
  implicit none
  integer :: i
  do i = 5, 1, -1
    print *, i
  end do
end program countdown`, notes: [] }
          ]
        },
        {
          id: "while-exit", n: 4, title: "do while, exit and cycle", level: 2,
          gloss: "Loops while a condition holds and leaves or skips an iteration with exit and cycle.",
          examples: [
            { code: `program halve
  implicit none
  integer :: n = 100
  do while (n > 5)
    n = n / 2
  end do
  print *, n
end program halve`, notes: [{ at: "do while", text: "condition loop" }] },
            { code: `program first_big
  implicit none
  integer :: i
  do i = 1, 20
    if (i * i > 50) exit
  end do
  print *, i
end program first_big`, notes: [{ at: "exit", text: "leaves the loop" }] },
            { code: `program odds
  implicit none
  integer :: i
  do i = 1, 6
    if (mod(i, 2) == 0) cycle
    print *, i
  end do
end program odds`, notes: [{ at: "cycle", text: "skips to the next pass" }] }
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
          id: "declarations", n: 1, title: "array declarations", level: 1,
          gloss: "Declares fixed-size arrays with a dimension and fills them with constructors.",
          examples: [
            { code: `program scores
  implicit none
  integer :: marks(4) = [70, 85, 90, 65]
  print *, marks
  print *, size(marks)
end program scores`, notes: [{ at: "[70", text: "array constructor" }] },
            { code: `program grid
  implicit none
  integer :: m(2, 3)
  m = reshape([1, 2, 3, 4, 5, 6], [2, 3])
  print *, m
end program grid`, notes: [{ at: "reshape", text: "fills column by column" }] },
            { code: `program offsets
  implicit none
  real :: x(0:2) = [0.5, 1.5, 2.5]
  print *, x(0), x(2)
end program offsets`, notes: [{ at: "0:2", text: "custom bounds" }] }
          ]
        },
        {
          id: "sections", n: 2, title: "array sections", level: 1,
          gloss: "Selects part of an array with a start, stop and stride.",
          examples: [
            { code: `program parts
  implicit none
  integer :: a(6) = [1, 2, 3, 4, 5, 6]
  print *, a(2:4)
  print *, a(1:6:2)
end program parts`, notes: [{ at: "a(2:4)", text: "elements two to four" }] },
            { code: `program tail
  implicit none
  integer :: a(5) = [10, 20, 30, 40, 50]
  print *, a(:2), a(4:)
end program tail`, notes: [] },
            { code: `program rows
  implicit none
  integer :: m(2, 2) = reshape([1, 2, 3, 4], [2, 2])
  print *, m(1, :)
  print *, m(:, 2)
end program rows`, notes: [] }
          ]
        },
        {
          id: "whole-array", n: 3, title: "whole-array operations", level: 2,
          gloss: "Applies arithmetic and intrinsics to a whole array at once.",
          examples: [
            { code: `program scale
  implicit none
  real :: prices(3) = [10.0, 20.0, 30.0]
  prices = prices * 1.2
  print *, prices
end program scale`, notes: [] },
            { code: `program stats
  implicit none
  real :: v(4) = [2.0, 4.0, 6.0, 8.0]
  print *, sum(v), maxval(v), minval(v)
  print *, sum(v) / size(v)
end program stats`, notes: [{ at: "sum(v)", text: "reduction" }] },
            { code: `program dot
  implicit none
  integer :: a(3) = [1, 2, 3], b(3) = [4, 5, 6]
  print *, a * b
  print *, dot_product(a, b)
end program dot`, notes: [] }
          ]
        },
        {
          id: "where-merge", n: 4, title: "where and merge", level: 2,
          gloss: "Updates only the elements that satisfy a mask with where or merge.",
          examples: [
            { code: `program clamp
  implicit none
  real :: x(4) = [-2.0, 3.0, -1.0, 5.0]
  where (x < 0.0) x = 0.0
  print *, x
end program clamp`, notes: [{ at: "where", text: "masked assignment" }] },
            { code: `program labels
  implicit none
  integer :: n(3) = [4, 11, 7]
  print *, merge(1, 0, n > 5)
end program labels`, notes: [] },
            { code: `program safe_div
  implicit none
  real :: a(3) = [6.0, 8.0, 9.0], d(3) = [2.0, 0.0, 3.0]
  real :: r(3) = 0.0
  where (d /= 0.0) r = a / d
  print *, r
end program safe_div`, notes: [] }
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
          id: "character-variables", n: 1, title: "character variables", level: 1,
          gloss: "Stores text in a character variable of fixed or assumed length.",
          examples: [
            { code: `program words
  implicit none
  character(len=8) :: word = "fortran"
  print *, word
  print *, len(word)
end program words`, notes: [{ at: "len(word)", text: "declared length" }] },
            { code: `program names
  implicit none
  character(len=*), parameter :: title = "Annual report"
  print *, title
end program names`, notes: [{ at: "len=*", text: "length from the value" }] },
            { code: `program letters
  implicit none
  character(len=5) :: s = "hello"
  print *, s(1:1), s(2:4)
end program letters`, notes: [] }
          ]
        },
        {
          id: "concat-trim", n: 2, title: "concatenation and trim", level: 1,
          gloss: "Joins strings with double slashes and removes trailing blanks with trim.",
          examples: [
            { code: `program join
  implicit none
  character(len=4) :: a = "data"
  character(len=4) :: b = "base"
  print *, a // b
end program join`, notes: [{ at: "//", text: "concatenation" }] },
            { code: `program full_name
  implicit none
  character(len=8) :: first = "Ada", last = "Lovelace"
  print *, trim(first) // " " // trim(last)
end program full_name`, notes: [{ at: "trim", text: "drops trailing blanks" }] },
            { code: `program shout
  implicit none
  character(len=6) :: s = "quiet"
  print *, adjustl(s) // "!"
end program shout`, notes: [] }
          ]
        },
        {
          id: "search", n: 3, title: "index and len_trim", level: 2,
          gloss: "Finds a substring with index and measures text length without trailing blanks.",
          examples: [
            { code: `program find
  implicit none
  character(len=20) :: path = "reports/2026.csv"
  print *, index(path, "/")
end program find`, notes: [{ at: "index", text: "position or zero" }] },
            { code: `program used
  implicit none
  character(len=12) :: s = "report"
  print *, len(s), len_trim(s)
end program used`, notes: [] },
            { code: `program check
  implicit none
  character(len=9) :: s = "abc123"
  print *, scan(s, "0123456789")
  print *, verify(s, "abc")
end program check`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "procedures",
      n: 7,
      title: "procedures",
      concepts: [
        {
          id: "functions", n: 1, title: "functions", level: 1,
          gloss: "Computes and returns one value from a function with a result.",
          examples: [
            { code: `program use_area
  implicit none
  print *, area(3.0)
contains
  real function area(r)
    real, intent(in) :: r
    area = 3.14159 * r * r
  end function area
end program use_area`, notes: [{ at: "contains", text: "introduces procedures" }] },
            { code: `program use_double
  implicit none
  print *, twice(21)
contains
  integer function twice(n)
    integer, intent(in) :: n
    twice = 2 * n
  end function twice
end program use_double`, notes: [] },
            { code: `program use_mean
  implicit none
  print *, mean([2.0, 4.0, 9.0])
contains
  real function mean(v)
    real, intent(in) :: v(:)
    mean = sum(v) / size(v)
  end function mean
end program use_mean`, notes: [] }
          ]
        },
        {
          id: "subroutines", n: 2, title: "subroutines", level: 1,
          gloss: "Runs a block of statements with call and returns values through arguments.",
          examples: [
            { code: `program run
  implicit none
  call hello("Ada")
contains
  subroutine hello(name)
    character(len=*), intent(in) :: name
    print *, "Hello, ", name
  end subroutine hello
end program run`, notes: [{ at: "call", text: "invokes a subroutine" }] },
            { code: `program swap_demo
  implicit none
  integer :: a = 1, b = 2
  call swap(a, b)
  print *, a, b
contains
  subroutine swap(x, y)
    integer, intent(inout) :: x, y
    integer :: t
    t = x; x = y; y = t
  end subroutine swap
end program swap_demo`, notes: [] },
            { code: `program stats_demo
  implicit none
  real :: lo, hi
  call range([3.0, 9.0, 5.0], lo, hi)
  print *, lo, hi
contains
  subroutine range(v, low, high)
    real, intent(in) :: v(:)
    real, intent(out) :: low, high
    low = minval(v); high = maxval(v)
  end subroutine range
end program stats_demo`, notes: [] }
          ]
        },
        {
          id: "intent", n: 3, title: "intent attributes", level: 2,
          gloss: "Declares each dummy argument as in, out or inout so the compiler can check it.",
          examples: [
            { code: `program tax_demo
  implicit none
  print *, with_tax(100.0, 0.2)
contains
  real function with_tax(net, rate)
    real, intent(in) :: net, rate
    with_tax = net * (1.0 + rate)
  end function with_tax
end program tax_demo`, notes: [{ at: "intent(in)", text: "read only" }] },
            { code: `program bump_demo
  implicit none
  integer :: n = 5
  call bump(n)
  print *, n
contains
  subroutine bump(k)
    integer, intent(inout) :: k
    k = k + 1
  end subroutine bump
end program bump_demo`, notes: [{ at: "intent(inout)", text: "read and write" }] },
            { code: `program split_demo
  implicit none
  integer :: q, r
  call split(17, 5, q, r)
  print *, q, r
contains
  subroutine split(a, b, quot, rem)
    integer, intent(in) :: a, b
    integer, intent(out) :: quot, rem
    quot = a / b; rem = mod(a, b)
  end subroutine split
end program split_demo`, notes: [] }
          ]
        },
        {
          id: "optional-keyword", n: 4, title: "optional and keyword arguments", level: 2,
          gloss: "Makes an argument optional with present and passes arguments by name.",
          examples: [
            { code: `program greet_demo
  implicit none
  call greet("Ada", greeting="Welcome")
contains
  subroutine greet(name, greeting)
    character(len=*), intent(in) :: name
    character(len=*), intent(in), optional :: greeting
    if (present(greeting)) print *, greeting, ", ", name
  end subroutine greet
end program greet_demo`, notes: [{ at: "present", text: "tests an optional argument" }] },
            { code: `program pad_demo
  implicit none
  print *, scaled(4.0), scaled(4.0, factor=3.0)
contains
  real function scaled(x, factor)
    real, intent(in) :: x
    real, intent(in), optional :: factor
    scaled = x * 2.0
    if (present(factor)) scaled = x * factor
  end function scaled
end program pad_demo`, notes: [] },
            { code: `program keyword_demo
  implicit none
  print *, volume(length=2.0, width=3.0, height=4.0)
contains
  real function volume(length, width, height)
    real, intent(in) :: length, width, height
    volume = length * width * height
  end function volume
end program keyword_demo`, notes: [{ at: "length=2.0", text: "keyword argument" }] }
          ]
        }
      ]
    },
    {
      id: "modules",
      n: 8,
      title: "modules",
      concepts: [
        {
          id: "module-basics", n: 1, title: "modules", level: 1,
          gloss: "Groups procedures and data in a module that other units can use.",
          examples: [
            { code: `module geometry
  implicit none
contains
  real function area(r)
    real, intent(in) :: r
    area = 3.14159 * r ** 2
  end function area
end module geometry`, notes: [{ at: "module", text: "opens the module" }] },
            { code: `module greetings
  implicit none
contains
  subroutine hello(name)
    character(len=*), intent(in) :: name
    print *, "Hello, ", name
  end subroutine hello
end module greetings`, notes: [] },
            { code: `module temperature
  implicit none
contains
  real function to_f(c)
    real, intent(in) :: c
    to_f = c * 9.0 / 5.0 + 32.0
  end function to_f
end module temperature`, notes: [] }
          ]
        },
        {
          id: "use-intrinsic", n: 2, title: "use and only", level: 2,
          gloss: "Imports names from a module with use and limits them with only.",
          examples: [
            { code: `program show_kinds
  use, intrinsic :: iso_fortran_env, only: int32, real64
  implicit none
  print *, kind(1_int32), kind(1.0_real64)
end program show_kinds`, notes: [{ at: "only", text: "imports just these names" }] },
            { code: `program constants
  use, intrinsic :: iso_fortran_env, only: output_unit
  implicit none
  write (output_unit, *) "to standard output"
end program constants`, notes: [] },
            { code: `program limits
  use, intrinsic :: iso_fortran_env, only: int8
  implicit none
  print *, huge(1_int8)
end program limits`, notes: [] }
          ]
        },
        {
          id: "public-private", n: 3, title: "public and private", level: 2,
          gloss: "Hides module internals with private and exposes chosen names with public.",
          examples: [
            { code: `module counter
  implicit none
  private
  public :: next_id
  integer :: last = 0
contains
  integer function next_id()
    last = last + 1
    next_id = last
  end function next_id
end module counter`, notes: [{ at: "private", text: "default hides names" }] },
            { code: `module secrets
  implicit none
  private
  public :: mask
contains
  function mask(s) result(r)
    character(len=*), intent(in) :: s
    character(len=len(s)) :: r
    r = repeat("*", len(s))
  end function mask
end module secrets`, notes: [] },
            { code: `module config
  implicit none
  public :: port
  integer, parameter :: port = 8080
  integer, parameter, private :: retries = 3
end module config`, notes: [] }
          ]
        },
        {
          id: "module-constants", n: 4, title: "module constants and variables", level: 2,
          gloss: "Shares constants and variables across programs by declaring them in a module.",
          examples: [
            { code: `module constants
  implicit none
  real, parameter :: pi = 3.14159
  real, parameter :: e = 2.71828
end module constants`, notes: [] },
            { code: `module settings
  implicit none
  character(len=*), parameter :: app_name = "billing"
  integer :: verbosity = 1
end module settings`, notes: [] },
            { code: `module limits
  implicit none
  integer, parameter :: max_users = 100
  integer, parameter :: max_items = 5000
end module limits`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "derived-types",
      n: 9,
      title: "derived types",
      concepts: [
        {
          id: "type-definitions", n: 1, title: "type definitions", level: 2,
          gloss: "Defines a record type that groups components of different types.",
          examples: [
            { code: `program point_demo
  implicit none
  type :: point
    real :: x, y
  end type point
  type(point) :: p
  p = point(3.0, 4.0)
  print *, p%x, p%y
end program point_demo`, notes: [{ at: "type ::", text: "defines a type" }, { at: "p%x", text: "component access" }] },
            { code: `program person_demo
  implicit none
  type :: person
    character(len=10) :: name
    integer :: age
  end type person
  type(person) :: ada
  ada = person("Ada", 36)
  print *, trim(ada%name), ada%age
end program person_demo`, notes: [] },
            { code: `program item_demo
  implicit none
  type :: item
    integer :: id
    real :: price
  end type item
  type(item) :: tea = item(7, 3.5)
  print *, tea%id, tea%price
end program item_demo`, notes: [] }
          ]
        },
        {
          id: "defaults-arrays", n: 2, title: "defaults and arrays of types", level: 2,
          gloss: "Gives components default values and stores many records in an array.",
          examples: [
            { code: `program defaults
  implicit none
  type :: config
    integer :: port = 8080
    logical :: debug = .false.
  end type config
  type(config) :: c
  print *, c%port, c%debug
end program defaults`, notes: [{ at: "= 8080", text: "default value" }] },
            { code: `program table
  implicit none
  type :: row
    integer :: id
    real :: total
  end type row
  type(row) :: rows(2)
  rows = [row(1, 9.5), row(2, 12.0)]
  print *, rows(2)%total
end program table`, notes: [] },
            { code: `program update
  implicit none
  type :: counter
    integer :: n = 0
  end type counter
  type(counter) :: c
  c%n = c%n + 5
  print *, c%n
end program update`, notes: [] }
          ]
        },
        {
          id: "type-bound", n: 3, title: "type-bound procedures", level: 3,
          gloss: "Attaches procedures to a type so they can be called with the percent operator.",
          examples: [
            { code: `module shapes
  type :: circle
    real :: r
  contains
    procedure :: area
  end type circle
contains
  real function area(self)
    class(circle), intent(in) :: self
    area = 3.14159 * self%r ** 2
  end function area
end module shapes`, notes: [{ at: "procedure", text: "binds area to circle" }, { at: "class(circle)", text: "polymorphic argument" }] },
            { code: `module accounts
  type :: account
    real :: balance = 0.0
  contains
    procedure :: clear
  end type account
contains
  subroutine clear(self)
    class(account), intent(inout) :: self
    self%balance = 0.0
  end subroutine clear
end module accounts`, notes: [] },
            { code: `module vectors
  type :: vec
    real :: x, y
  contains
    procedure :: norm
  end type vec
contains
  real function norm(self)
    class(vec), intent(in) :: self
    norm = sqrt(self%x ** 2 + self%y ** 2)
  end function norm
end module vectors`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "io",
      n: 10,
      title: "input and output",
      concepts: [
        {
          id: "list-directed", n: 1, title: "print and write", level: 1,
          gloss: "Prints values with print * or write to a numbered unit.",
          examples: [
            { code: `program out
  implicit none
  print *, "total", 42, 3.5
  write (*, *) "same as print"
end program out`, notes: [{ at: "write (*, *)", text: "unit and format" }] },
            { code: `program labels
  implicit none
  integer :: n = 3
  print *, "items:", n
  print *, "done"
end program labels`, notes: [] },
            { code: `program errors
  use, intrinsic :: iso_fortran_env, only: error_unit
  implicit none
  write (error_unit, *) "warning: low disk"
end program errors`, notes: [{ at: "error_unit", text: "standard error" }] }
          ]
        },
        {
          id: "formats", n: 2, title: "format descriptors", level: 2,
          gloss: "Controls output width and precision with a format string.",
          examples: [
            { code: `program money
  implicit none
  real :: price = 19.5
  print "(f8.2)", price
end program money`, notes: [{ at: "f8.2", text: "width 8, two decimals" }] },
            { code: `program table
  implicit none
  integer :: id = 7
  real :: total = 42.125
  write (*, "(i4, 2x, f7.3)") id, total
end program table`, notes: [{ at: "i4", text: "integer width 4" }] },
            { code: `program labelled
  implicit none
  integer :: n = 12
  write (*, "(a, i0)") "count: ", n
end program labelled`, notes: [{ at: "i0", text: "minimal width" }] }
          ]
        },
        {
          id: "internal-io", n: 3, title: "internal read and write", level: 2,
          gloss: "Converts between text and numbers by reading from and writing to strings.",
          examples: [
            { code: `program parse
  implicit none
  character(len=8) :: text = "42"
  integer :: n
  read (text, *) n
  print *, n + 1
end program parse`, notes: [{ at: "read (text, *)", text: "reads from a string" }] },
            { code: `program build
  implicit none
  character(len=12) :: label
  write (label, "(a, i0)") "item-", 7
  print *, trim(label)
end program build`, notes: [] },
            { code: `program split
  implicit none
  character(len=12) :: line = "3.5 8.25"
  real :: a, b
  read (line, *) a, b
  print *, a + b
end program split`, notes: [] }
          ]
        },
        {
          id: "files", n: 4, title: "file input and output", level: 2,
          gloss: "Opens a file on a unit, writes or reads records and closes it.",
          examples: [
            { code: `program save
  implicit none
  integer :: u
  open (newunit=u, file="notes.txt", status="replace")
  write (u, "(a)") "first line"
  close (u)
end program save`, notes: [{ at: "newunit", text: "picks a free unit" }] },
            { code: `program numbers
  implicit none
  integer :: u, i
  open (newunit=u, file="nums.txt", status="replace")
  do i = 1, 3
    write (u, *) i * i
  end do
  close (u)
end program numbers`, notes: [] },
            { code: `program read_back
  implicit none
  integer :: u, n
  open (newunit=u, status="scratch")
  write (u, *) 7
  rewind (u)
  read (u, *) n
  print *, n
end program read_back`, notes: [{ at: "rewind", text: "back to the start" }] }
          ]
        }
      ]
    },
    {
      id: "allocation",
      n: 11,
      title: "allocation and pointers",
      concepts: [
        {
          id: "allocatable", n: 1, title: "allocatable arrays", level: 2,
          gloss: "Sizes an array at run time with allocate and frees it with deallocate.",
          examples: [
            { code: `program dynamic
  implicit none
  integer, allocatable :: a(:)
  allocate (a(5))
  a = [1, 2, 3, 4, 5]
  print *, sum(a)
  deallocate (a)
end program dynamic`, notes: [{ at: "allocatable", text: "size chosen later" }] },
            { code: `program table
  implicit none
  real, allocatable :: m(:, :)
  allocate (m(2, 3))
  m = 0.0
  print *, shape(m)
end program table`, notes: [] },
            { code: `program count_n
  implicit none
  integer :: n, i
  integer, allocatable :: squares(:)
  n = 4
  allocate (squares(n))
  squares = [(i * i, i = 1, n)]
  print *, squares
end program count_n`, notes: [] }
          ]
        },
        {
          id: "auto-grow", n: 2, title: "growing arrays", level: 3,
          gloss: "Grows an allocatable array by assigning a longer array to it.",
          examples: [
            { code: `program grow
  implicit none
  integer, allocatable :: a(:)
  a = [1, 2]
  a = [a, 3]
  print *, a
end program grow`, notes: [{ at: "[a, 3]", text: "automatic reallocation" }] },
            { code: `program collect
  implicit none
  real, allocatable :: v(:)
  integer :: i
  v = [real ::]
  do i = 1, 3
    v = [v, real(i) / 2.0]
  end do
  print *, v
end program collect`, notes: [] },
            { code: `program move
  implicit none
  integer, allocatable :: a(:), b(:)
  a = [4, 5, 6]
  call move_alloc(a, b)
  print *, allocated(a), size(b)
end program move`, notes: [{ at: "move_alloc", text: "transfers ownership" }] }
          ]
        },
        {
          id: "pointers", n: 3, title: "pointers and targets", level: 3,
          gloss: "Points at a variable declared with the target attribute.",
          examples: [
            { code: `program alias
  implicit none
  integer, target :: n = 5
  integer, pointer :: p
  p => n
  p = 9
  print *, n
end program alias`, notes: [{ at: "=>", text: "pointer assignment" }] },
            { code: `program view
  implicit none
  real, target :: v(4) = [1.0, 2.0, 3.0, 4.0]
  real, pointer :: tail(:)
  tail => v(3:)
  print *, tail
end program view`, notes: [] },
            { code: `program check
  implicit none
  integer, target :: n = 1
  integer, pointer :: p => null()
  print *, associated(p)
  p => n
  print *, associated(p)
end program check`, notes: [{ at: "associated", text: "tests a pointer" }] }
          ]
        }
      ]
    },
    {
      id: "modern",
      n: 12,
      title: "modern features",
      concepts: [
        {
          id: "pure-elemental", n: 1, title: "pure and elemental procedures", level: 3,
          gloss: "Marks side-effect-free procedures as pure and array-friendly ones as elemental.",
          examples: [
            { code: `program use_square
  implicit none
  print *, square([1.0, 2.0, 3.0])
contains
  elemental real function square(x)
    real, intent(in) :: x
    square = x * x
  end function square
end program use_square`, notes: [{ at: "elemental", text: "works on arrays" }] },
            { code: `program use_clamp
  implicit none
  print *, clamp(7, 0, 5)
contains
  pure integer function clamp(n, lo, hi)
    integer, intent(in) :: n, lo, hi
    clamp = min(max(n, lo), hi)
  end function clamp
end program use_clamp`, notes: [{ at: "pure", text: "no side effects" }] },
            { code: `program use_gross
  implicit none
  print *, gross([10.0, 20.0], 0.2)
contains
  elemental real function gross(net, rate)
    real, intent(in) :: net, rate
    gross = net * (1.0 + rate)
  end function gross
end program use_gross`, notes: [] }
          ]
        },
        {
          id: "do-concurrent", n: 2, title: "do concurrent", level: 3,
          gloss: "Declares that loop iterations are independent so they can run in any order.",
          examples: [
            { code: `program fill
  implicit none
  integer :: i
  real :: x(5)
  do concurrent (i = 1:5)
    x(i) = real(i) ** 2
  end do
  print *, x
end program fill`, notes: [{ at: "do concurrent", text: "independent iterations" }] },
            { code: `program scale
  implicit none
  integer :: i
  real :: v(4) = [1.0, 2.0, 3.0, 4.0]
  do concurrent (i = 1:4)
    v(i) = v(i) * 10.0
  end do
  print *, v
end program scale`, notes: [] },
            { code: `program masked
  implicit none
  integer :: i
  integer :: a(6) = [3, -1, 4, -1, 5, -9]
  do concurrent (i = 1:6, a(i) < 0)
    a(i) = 0
  end do
  print *, a
end program masked`, notes: [] }
          ]
        },
        {
          id: "intrinsics", n: 3, title: "array intrinsics", level: 2,
          gloss: "Reduces and searches arrays with count, any, all, minloc and maxval.",
          examples: [
            { code: `program query
  implicit none
  integer :: a(5) = [3, 8, 1, 9, 4]
  print *, count(a > 3), any(a > 8), all(a > 0)
end program query`, notes: [{ at: "count", text: "number of true values" }] },
            { code: `program where_is
  implicit none
  real :: v(4) = [2.5, 0.5, 7.0, 3.0]
  print *, minloc(v), maxloc(v)
end program where_is`, notes: [] },
            { code: `program order
  implicit none
  integer :: a(4) = [4, 1, 3, 2]
  print *, product(a), cshift(a, 1)
end program order`, notes: [] }
          ]
        }
      ]
    }
  ]
};
