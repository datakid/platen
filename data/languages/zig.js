export default {
  id: "zig",
  name: "Zig",
  short: "ZG",
  pigment: "zig",
  family: null,
  version: "0.17.1",
  lexer: "zig",
  indent: 4,
  topics: [
    {
      id: "values-types",
      n: 1,
      title: "values & types",
      concepts: [
        {
          id: "const-and-var", n: 1, title: "const and var", level: 1,
          gloss: "Declares immutable values with const and mutable ones with var.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const city = "Oslo";
    var visits: u32 = 0;
    visits += 1;
    std.debug.print("{s}: {d}\\n", .{ city, visits });
}`, notes: [{ at: "const", text: "cannot change" }, { at: "var", text: "must actually be mutated" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const price: f64 = 9.99;
    const quantity: u32 = 3;
    const total = price * @as(f64, @floatFromInt(quantity));
    std.debug.print("{d:.2}\\n", .{total});
}`, notes: [{ at: "@floatFromInt", text: "explicit conversion" }] },
            { code: `const std = @import("std");

const max_users: usize = 100;
const app_name = "billing";
pub fn main() void {
    std.debug.print("{s} {d}\\n", .{ app_name, max_users });
}`, notes: [{ at: "const", text: "at file scope" }] }
          ]
        },
        {
          id: "numeric-types", n: 2, title: "integer and float types", level: 1,
          gloss: "Chooses exact-width integer and float types and converts between them.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const small: u8 = 255;
    const big: i64 = -9_000_000_000;
    const ratio: f32 = 0.5;
    std.debug.print("{d} {d} {d}\\n", .{ small, big, ratio });
}`, notes: [{ at: "u8", text: "unsigned 8-bit integer" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const n: i32 = 300;
    const byte: u8 = @intCast(n - 100);
    const f: f64 = @floatFromInt(n);
    std.debug.print("{d} {d}\\n", .{ byte, f });
}`, notes: [{ at: "@intCast", text: "checked in safe builds" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const max: u8 = std.math.maxInt(u8);
    const wrapped: u8 = max +% 1;
    const sat: u8 = max +| 10;
    std.debug.print("{d} {d} {d}\\n", .{ max, wrapped, sat });
}`, notes: [{ at: "+%", text: "wraps around" }, { at: "+|", text: "saturates at the maximum" }] }
          ]
        },
        {
          id: "bools-chars-strings", n: 3, title: "bools, bytes and strings", level: 1,
          gloss: "Uses booleans, byte values and string literals as byte slices.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const flag = true;
    const letter: u8 = 'k';
    const word = "zig";
    std.debug.print("{} {c} {s}\\n", .{ flag, letter, word });
    std.debug.print("{d}\\n", .{word.len});
}`, notes: [{ at: "'k'", text: "a u8 byte value" }, { at: "word.len", text: "length in bytes" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const same = std.mem.eql(u8, "zig", "zig");
    const at = std.mem.indexOf(u8, "hello", "ll");
    std.debug.print("{} {?d}\\n", .{ same, at });
}`, notes: [{ at: "mem.eql", text: "compares contents" }] },
            { code: `const std = @import("std");

const poem =
    \\\\first line
    \\\\second line
;
pub fn main() void {
    std.debug.print("{s}\\n", .{poem});
}`, notes: [{ at: "\\\\", text: "multiline string literal" }] }
          ]
        },
        {
          id: "inference-and-typeof", n: 4, title: "inference and @TypeOf", level: 2,
          gloss: "Lets the compiler infer types and inspects them at compile time.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const a = 5;
    const b: f32 = 2.5;
    std.debug.print("{s}\\n", .{@typeName(@TypeOf(b))});
    std.debug.print("{d}\\n", .{a + 1});
}`, notes: [{ at: "const a = 5", text: "comptime_int" }, { at: "@TypeOf", text: "type of an expression" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const x = @as(u16, 7);
    const y: u32 = x;
    std.debug.print("{d}\\n", .{y});
}`, notes: [{ at: "@as", text: "explicit coercion" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const count = 3;
    const arr: [count]u8 = @splat(0);
    std.debug.print("{d}\\n", .{arr.len});
}`, notes: [{ at: "@splat", text: "fills every element" }] }
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
          gloss: "Branches with if and uses if as an expression.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const temperature: i32 = 28;
    if (temperature > 25) {
        std.debug.print("warm\\n", .{});
    } else if (temperature > 10) {
        std.debug.print("mild\\n", .{});
    } else {
        std.debug.print("cold\\n", .{});
    }
}`, notes: [{ at: "(temperature > 25)", text: "parentheses required" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const score: u32 = 72;
    const grade = if (score >= 60) "pass" else "fail";
    std.debug.print("{s}\\n", .{grade});
}`, notes: [{ at: "if (score >= 60)", text: "yields a value" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const age: u32 = 20;
    const ok = age >= 18 and age < 65;
    std.debug.print("{}\\n", .{ok or age == 0});
}`, notes: [{ at: "and", text: "keyword, not &&" }] }
          ]
        },
        {
          id: "while-for", n: 2, title: "while and for loops", level: 1,
          gloss: "Repeats code with while, for over values and ranges.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    var n: u32 = 3;
    while (n > 0) : (n -= 1) {
        std.debug.print("{d}\\n", .{n});
    }
}`, notes: [{ at: ": (n -= 1)", text: "runs after each pass" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const names = [_][]const u8{ "ada", "grace" };
    for (names, 0..) |name, i| {
        std.debug.print("{d}: {s}\\n", .{ i, name });
    }
}`, notes: [{ at: "0..", text: "index counter" }] },
            { code: `const std = @import("std");

pub fn main() void {
    for (0..3) |i| {
        std.debug.print("{d}\\n", .{i});
    }
}`, notes: [{ at: "0..3", text: "half-open range" }] }
          ]
        },
        {
          id: "break-continue-labels", n: 3, title: "break, continue and labels", level: 2,
          gloss: "Controls loops with break and continue and returns values from labeled blocks.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    for (0..10) |i| {
        if (i == 3) continue;
        if (i > 5) break;
        std.debug.print("{d}\\n", .{i});
    }
}`, notes: [] },
            { code: `const std = @import("std");

pub fn main() void {
    outer: for (0..3) |i| {
        for (0..3) |j| {
            if (j == 2) continue :outer;
            std.debug.print("{d}{d}\\n", .{ i, j });
        }
    }
}`, notes: [{ at: "outer:", text: "label for the outer loop" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const found = blk: {
        for ([_]u32{ 4, 9, 16 }) |n| {
            if (n > 5) break :blk n;
        }
        break :blk 0;
    };
    std.debug.print("{d}\\n", .{found});
}`, notes: [{ at: "break :blk", text: "block yields a value" }] }
          ]
        },
        {
          id: "switch-statements", n: 4, title: "switch", level: 2,
          gloss: "Matches values, ranges and lists exhaustively with switch.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const code: u32 = 404;
    const msg = switch (code) {
        200 => "ok",
        404 => "not found",
        else => "other",
    };
    std.debug.print("{s}\\n", .{msg});
}`, notes: [{ at: "else", text: "required for coverage" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const n: u32 = 7;
    const kind = switch (n) {
        0 => "zero",
        1...9 => "digit",
        else => "large",
    };
    std.debug.print("{s}\\n", .{kind});
}`, notes: [{ at: "1...9", text: "inclusive range" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const day: u8 = 6;
    switch (day) {
        6, 7 => std.debug.print("weekend\\n", .{}),
        else => std.debug.print("weekday\\n", .{}),
    }
}`, notes: [{ at: "6, 7", text: "several values per prong" }] }
          ]
        }
      ]
    },
    {
      id: "functions",
      n: 3,
      title: "functions",
      concepts: [
        {
          id: "declaring-functions", n: 1, title: "declaring functions", level: 1,
          gloss: "Defines functions with typed parameters and a return type.",
          examples: [
            { code: `const std = @import("std");

fn square(n: i32) i32 {
    return n * n;
}
pub fn main() void {
    std.debug.print("{d}\\n", .{square(4)});
}`, notes: [{ at: "i32", text: "return type after the parameters" }] },
            { code: `const std = @import("std");

fn area(w: f64, h: f64) f64 {
    return w * h;
}
pub fn main() void {
    std.debug.print("{d}\\n", .{area(3, 4)});
}`, notes: [] },
            { code: `const std = @import("std");

inline fn double(n: u32) u32 {
    return n * 2;
}
pub fn main() void {
    std.debug.print("{d}\\n", .{double(21)});
}`, notes: [{ at: "inline", text: "forces inlining" }] }
          ]
        },
        {
          id: "multiple-results", n: 2, title: "returning several values", level: 2,
          gloss: "Returns tuples and destructures them at the call site.",
          examples: [
            { code: `const std = @import("std");

fn divmod(a: u32, b: u32) struct { u32, u32 } {
    return .{ a / b, a % b };
}
pub fn main() void {
    const q, const r = divmod(17, 5);
    std.debug.print("{d} {d}\\n", .{ q, r });
}`, notes: [{ at: "struct { u32, u32 }", text: "tuple type" }, { at: "const q, const r", text: "destructuring" }] },
            { code: `const std = @import("std");

const Range = struct { min: i32, max: i32 };
fn bounds(items: []const i32) Range {
    const lo = std.mem.min(i32, items);
    return .{ .min = lo, .max = std.mem.max(i32, items) };
}
pub fn main() void {
    const r = bounds(&[_]i32{ 3, 1, 2 });
    std.debug.print("{d} {d}\\n", .{ r.min, r.max });
}`, notes: [] },
            { code: `const std = @import("std");

fn swapped(a: i32, b: i32) [2]i32 {
    return .{ b, a };
}
pub fn main() void {
    std.debug.print("{any}\\n", .{swapped(1, 2)});
}`, notes: [{ at: ".{ b, a }", text: "array literal" }] }
          ]
        },
        {
          id: "generic-functions", n: 3, title: "generic functions", level: 2,
          gloss: "Writes functions over any type with anytype and comptime parameters.",
          examples: [
            { code: `const std = @import("std");

fn biggest(a: anytype, b: anytype) @TypeOf(a, b) {
    return if (a > b) a else b;
}
pub fn main() void {
    std.debug.print("{d} {d}\\n", .{ biggest(3, 9), biggest(2.5, 1.5) });
}`, notes: [{ at: "anytype", text: "type inferred per call" }] },
            { code: `const std = @import("std");

fn add(comptime T: type, a: T, b: T) T {
    return a + b;
}
pub fn main() void {
    std.debug.print("{d}\\n", .{add(u8, 200, 55)});
}`, notes: [{ at: "comptime T", text: "type passed as a value" }] },
            { code: `const std = @import("std");

fn zero(comptime T: type) T {
    return 0;
}
pub fn main() void {
    std.debug.print("{d} {d}\\n", .{ zero(i8), zero(f32) });
}`, notes: [] }
          ]
        },
        {
          id: "recursion-and-pointers", n: 4, title: "recursion and function values", level: 2,
          gloss: "Calls functions recursively and passes them as values.",
          examples: [
            { code: `const std = @import("std");

fn fib(n: u32) u32 {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}
pub fn main() void {
    std.debug.print("{d}\\n", .{fib(10)});
}`, notes: [] },
            { code: `const std = @import("std");

fn apply(f: fn (i32) i32, x: i32) i32 {
    return f(x);
}
fn inc(n: i32) i32 {
    return n + 1;
}
pub fn main() void {
    std.debug.print("{d}\\n", .{apply(inc, 4)});
}`, notes: [{ at: "fn (i32) i32", text: "function type" }] },
            { code: `const std = @import("std");

fn gcd(a: u32, b: u32) u32 {
    return if (b == 0) a else gcd(b, a % b);
}
pub fn main() void {
    std.debug.print("{d}\\n", .{gcd(48, 18)});
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "arrays-slices",
      n: 4,
      title: "arrays & slices",
      concepts: [
        {
          id: "arrays", n: 1, title: "arrays", level: 1,
          gloss: "Declares fixed-length arrays, fills them and joins them at compile time.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const scores = [3]i32{ 90, 72, 85 };
    const inferred = [_]u8{ 1, 2, 3, 4 };
    std.debug.print("{d} {d}\\n", .{ scores[0], inferred.len });
}`, notes: [{ at: "[3]i32", text: "length is part of the type" }, { at: "[_]", text: "length counted for you" }] },
            { code: `const std = @import("std");

pub fn main() void {
    var grid: [4]i32 = @splat(0);
    grid[2] = 7;
    std.debug.print("{any}\\n", .{grid});
}`, notes: [{ at: "@splat", text: "fills every element" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const a = [_]i32{ 1, 2 };
    const b = [_]i32{ 3, 4 };
    const joined = a ++ b;
    std.debug.print("{any} {d}\\n", .{ joined, joined.len });
}`, notes: [{ at: "++", text: "concatenates at compile time" }] }
          ]
        },
        {
          id: "slices", n: 2, title: "slices", level: 1,
          gloss: "Views part of an array with a pointer and a length.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const nums = [_]i32{ 10, 20, 30, 40 };
    const part = nums[1..3];
    std.debug.print("{any} {d}\\n", .{ part, part.len });
}`, notes: [{ at: "nums[1..3]", text: "elements one and two" }] },
            { code: `const std = @import("std");

fn sum(items: []const i32) i32 {
    var total: i32 = 0;
    for (items) |n| total += n;
    return total;
}
pub fn main() void {
    std.debug.print("{d}\\n", .{sum(&[_]i32{ 1, 2, 3 })});
}`, notes: [{ at: "[]const i32", text: "slice parameter" }] },
            { code: `const std = @import("std");

pub fn main() void {
    var buf = [_]u8{ 'a', 'b', 'c' };
    const view: []u8 = &buf;
    view[0] = 'z';
    std.debug.print("{s}\\n", .{buf});
}`, notes: [{ at: "[]u8", text: "mutable slice" }] }
          ]
        },
        {
          id: "searching-sorting", n: 3, title: "searching and sorting", level: 1,
          gloss: "Locates and compares elements with std.mem and orders them with std.sort.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const words = [_][]const u8{ "tea", "cake", "jam" };
    for (words) |w| std.debug.print("{s} ", .{w});
    std.debug.print("\\n", .{});
}`, notes: [] },
            { code: `const std = @import("std");

pub fn main() void {
    const nums = [_]i32{ 3, 8, 1 };
    const idx = std.mem.indexOfScalar(i32, &nums, 8);
    std.debug.print("{?d} {d}\\n", .{ idx, std.mem.max(i32, &nums) });
}`, notes: [{ at: "indexOfScalar", text: "optional index" }] },
            { code: `const std = @import("std");

pub fn main() void {
    var nums = [_]i32{ 3, 1, 2 };
    std.mem.sort(i32, &nums, {}, std.sort.asc(i32));
    std.debug.print("{any}\\n", .{nums});
}`, notes: [{ at: "std.sort.asc", text: "ascending comparator" }] }
          ]
        },
        {
          id: "byte-strings", n: 4, title: "working with strings", level: 2,
          gloss: "Handles splitting, counting and case changes on byte slices.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const text = "red apple, red car";
    std.debug.print("{d}\\n", .{std.mem.count(u8, text, "red")});
}`, notes: [] },
            { code: `const std = @import("std");

pub fn main() void {
    var it = std.mem.splitScalar(u8, "a,b,c", ',');
    while (it.next()) |part| {
        std.debug.print("{s}\\n", .{part});
    }
}`, notes: [{ at: "splitScalar", text: "iterator of pieces" }, { at: "it.next()", text: "optional, null at the end" }] },
            { code: `const std = @import("std");

pub fn main() void {
    var buf: [8]u8 = undefined;
    const up = std.ascii.upperString(&buf, "quiet");
    std.debug.print("{s}\\n", .{up});
}`, notes: [{ at: "buf", text: "caller supplies the memory" }] }
          ]
        }
      ]
    },
    {
      id: "structs-methods",
      n: 5,
      title: "structs & methods",
      concepts: [
        {
          id: "declaring-structs", n: 1, title: "declaring structs", level: 1,
          gloss: "Groups named fields with optional default values.",
          examples: [
            { code: `const std = @import("std");

const Point = struct {
    x: f64,
    y: f64,
};
pub fn main() void {
    const p = Point{ .x = 3, .y = 4 };
    std.debug.print("{d} {d}\\n", .{ p.x, p.y });
}`, notes: [{ at: ".x =", text: "field initializer" }] },
            { code: `const std = @import("std");

const Config = struct {
    host: []const u8 = "localhost",
    port: u16 = 80,
};
pub fn main() void {
    const c = Config{ .port = 8080 };
    std.debug.print("{s}:{d}\\n", .{ c.host, c.port });
}`, notes: [{ at: "= 80", text: "default field value" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const user = .{ .name = "ada", .age = 36 };
    std.debug.print("{s} {d}\\n", .{ user.name, user.age });
}`, notes: [{ at: ".{ .name", text: "anonymous struct" }] }
          ]
        },
        {
          id: "methods", n: 2, title: "methods", level: 1,
          gloss: "Adds functions to a struct that take the instance as self.",
          examples: [
            { code: `const std = @import("std");

const Rect = struct {
    w: f64,
    h: f64,
    fn area(self: Rect) f64 {
        return self.w * self.h;
    }
};
pub fn main() void {
    std.debug.print("{d}\\n", .{(Rect{ .w = 3, .h = 4 }).area()});
}`, notes: [{ at: "self: Rect", text: "first parameter makes a method" }] },
            { code: `const std = @import("std");
const Counter = struct {
    value: u32 = 0,
    fn increment(self: *Counter) void { self.value += 1; }
};
pub fn main() void {
    var c = Counter{};
    c.increment();
    std.debug.print("{d}\\n", .{c.value});
}`, notes: [{ at: "*Counter", text: "mutates through a pointer" }] },
            { code: `const std = @import("std");

const Temp = struct {
    celsius: f64,
    fn toF(self: Temp) f64 { return self.celsius * 9 / 5 + 32; }
};
pub fn main() void {
    std.debug.print("{d}\\n", .{(Temp{ .celsius = 100 }).toF()});
}`, notes: [] }
          ]
        },
        {
          id: "constructors-namespaces", n: 3, title: "init functions and namespaces", level: 2,
          gloss: "Builds values with init functions and groups constants and functions in structs.",
          examples: [
            { code: `const std = @import("std");
const User = struct {
    name: []const u8,
    age: u8,
    fn init(name: []const u8, age: u8) User {
        return .{ .name = name, .age = age };
    }
};
pub fn main() void {
    const u = User.init("ada", 36);
    std.debug.print("{s} {d}\\n", .{ u.name, u.age });
}`, notes: [{ at: "init", text: "conventional constructor name" }] },
            { code: `const std = @import("std");

const Math = struct {
    const pi = 3.14159;
    fn circle(r: f64) f64 {
        return pi * r * r;
    }
};
pub fn main() void {
    std.debug.print("{d}\\n", .{Math.circle(2)});
}`, notes: [{ at: "const pi", text: "declaration inside a struct" }] },
            { code: `const std = @import("std");

const Temp = struct {
    celsius: f64,
    fn fromF(f: f64) Temp {
        return .{ .celsius = (f - 32) * 5 / 9 };
    }
};
pub fn main() void {
    const t = Temp.fromF(212);
    std.debug.print("{d}\\n", .{t.celsius});
}`, notes: [] }
          ]
        },
        {
          id: "generic-structs", n: 4, title: "generic structs", level: 3,
          gloss: "Returns a struct type from a function that takes a type parameter.",
          examples: [
            { code: `const std = @import("std");

fn Box(comptime T: type) type {
    return struct {
        value: T,
    };
}
pub fn main() void {
    const b = Box(i32){ .value = 42 };
    std.debug.print("{d}\\n", .{b.value});
}`, notes: [{ at: "type", text: "functions can return types" }] },
            { code: `const std = @import("std");

fn Pair(comptime A: type, comptime B: type) type {
    return struct { first: A, second: B };
}
pub fn main() void {
    const p = Pair(u8, bool){ .first = 1, .second = true };
    std.debug.print("{d} {}\\n", .{ p.first, p.second });
}`, notes: [] },
            { code: `const std = @import("std");

fn Wrapper(comptime T: type) type {
    return struct {
        inner: T,
        fn get(self: @This()) T { return self.inner; }
    };
}
pub fn main() void {
    const w = Wrapper(f32){ .inner = 2.5 };
    std.debug.print("{d}\\n", .{w.get()});
}`, notes: [{ at: "@This()", text: "the enclosing type" }] }
          ]
        }
      ]
    },
    {
      id: "enums-unions",
      n: 6,
      title: "enums & unions",
      concepts: [
        {
          id: "enums", n: 1, title: "enums", level: 1,
          gloss: "Names a fixed set of values and converts them to names and integers.",
          examples: [
            { code: `const std = @import("std");

const Color = enum { red, green, blue };
pub fn main() void {
    const c = Color.green;
    std.debug.print("{s} {d}\\n", .{ @tagName(c), @intFromEnum(c) });
}`, notes: [{ at: "@tagName", text: "case name as a string" }, { at: "@intFromEnum", text: "integer value" }] },
            { code: `const std = @import("std");

const Level = enum(u8) { low = 1, mid = 5, high = 10 };
pub fn main() void {
    std.debug.print("{d}\\n", .{@intFromEnum(Level.mid)});
}`, notes: [{ at: "enum(u8)", text: "explicit integer type" }] },
            { code: `const std = @import("std");

const Status = enum { active, paused };
pub fn main() void {
    const s: Status = .active;
    if (s == .active) std.debug.print("running\\n", .{});
}`, notes: [{ at: ".active", text: "type inferred from s" }] }
          ]
        },
        {
          id: "enum-switch", n: 2, title: "switch on enums", level: 1,
          gloss: "Handles every enum case with an exhaustive switch.",
          examples: [
            { code: `const std = @import("std");

const Light = enum { red, green };
fn action(l: Light) []const u8 {
    return switch (l) {
        .red => "stop",
        .green => "go",
    };
}
pub fn main() void {
    std.debug.print("{s}\\n", .{action(.green)});
}`, notes: [{ at: "switch", text: "compile error if a case is missing" }] },
            { code: `const std = @import("std");

const Dir = enum { north, south };
pub fn main() void {
    const d = Dir.north;
    switch (d) {
        .north => std.debug.print("up\\n", .{}),
        .south => std.debug.print("down\\n", .{}),
    }
}`, notes: [] },
            { code: `const std = @import("std");

const Color = enum { red, green };
pub fn main() void {
    const c = std.meta.stringToEnum(Color, "green");
    std.debug.print("{?}\\n", .{c});
}`, notes: [{ at: "stringToEnum", text: "optional result" }] }
          ]
        },
        {
          id: "tagged-unions", n: 3, title: "tagged unions", level: 2,
          gloss: "Stores one of several typed payloads and matches on the active tag.",
          examples: [
            { code: `const std = @import("std");

const Value = union(enum) { int: i64, float: f64 };
pub fn main() void {
    const v = Value{ .int = 42 };
    switch (v) {
        .int => |n| std.debug.print("int {d}\\n", .{n}),
        .float => |f| std.debug.print("float {d}\\n", .{f}),
    }
}`, notes: [{ at: "union(enum)", text: "tagged union" }, { at: "|n|", text: "captures the payload" }] },
            { code: `const std = @import("std");

const Shape = union(enum) { circle: f64, square: f64 };
fn area(s: Shape) f64 {
    return switch (s) {
        .circle => |r| 3.14159 * r * r,
        .square => |side| side * side,
    };
}
pub fn main() void {
    std.debug.print("{d}\\n", .{area(.{ .square = 3 })});
}`, notes: [] },
            { code: `const std = @import("std");

const Token = union(enum) { number: u32, plus, minus };
pub fn main() void {
    const t: Token = .plus;
    std.debug.print("{}\\n", .{t == .plus});
}`, notes: [{ at: "plus", text: "variant without a payload" }] }
          ]
        },
        {
          id: "enum-methods", n: 4, title: "methods on enums", level: 2,
          gloss: "Attaches functions to enums and unions.",
          examples: [
            { code: `const std = @import("std");

const Dir = enum {
    north,
    south,
    fn opposite(self: Dir) Dir {
        return if (self == .north) .south else .north;
    }
};
pub fn main() void {
    std.debug.print("{s}\\n", .{@tagName(Dir.north.opposite())});
}`, notes: [] },
            { code: `const std = @import("std");

const Coin = enum(u32) {
    penny = 1,
    dime = 10,
    fn cents(self: Coin) u32 { return @intFromEnum(self); }
};
pub fn main() void {
    std.debug.print("{d}\\n", .{Coin.dime.cents()});
}`, notes: [] },
            { code: `const std = @import("std");

const Result = union(enum) {
    ok: u32,
    err: []const u8,
    fn isOk(self: Result) bool { return self == .ok; }
};
pub fn main() void {
    std.debug.print("{}\\n", .{(Result{ .ok = 1 }).isOk()});
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "optionals",
      n: 7,
      title: "optionals",
      concepts: [
        {
          id: "optional-types", n: 1, title: "optional types", level: 1,
          gloss: "Represents a possibly missing value with a question mark.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    var nickname: ?[]const u8 = null;
    std.debug.print("{any}\\n", .{nickname});
    nickname = "ada";
    std.debug.print("{?s}\\n", .{nickname});
}`, notes: [{ at: "?[]const u8", text: "string or null" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const maybe: ?u32 = 5;
    const none: ?u32 = null;
    std.debug.print("{?d} {?d}\\n", .{ maybe, none });
}`, notes: [{ at: "{?d}", text: "prints value or null" }] },
            { code: `const std = @import("std");

fn lookup(id: u32) ?[]const u8 {
    return if (id == 1) "ada" else null;
}
pub fn main() void {
    std.debug.print("{?s} {?s}\\n", .{ lookup(1), lookup(2) });
}`, notes: [] }
          ]
        },
        {
          id: "unwrapping", n: 2, title: "unwrapping optionals", level: 1,
          gloss: "Extracts the value with orelse, if captures and the dot-question operator.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const maybe: ?u32 = null;
    const value = maybe orelse 0;
    std.debug.print("{d}\\n", .{value});
}`, notes: [{ at: "orelse", text: "default for null" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const found: ?u32 = 7;
    if (found) |n| {
        std.debug.print("found {d}\\n", .{n});
    } else {
        std.debug.print("none\\n", .{});
    }
}`, notes: [{ at: "|n|", text: "unwrapped value" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const found: ?u32 = 7;
    std.debug.print("{d}\\n", .{found.?});
}`, notes: [{ at: ".?", text: "asserts non-null" }] }
          ]
        },
        {
          id: "optional-results", n: 3, title: "optional results and loops", level: 2,
          gloss: "Returns null for no result and loops while values are present.",
          examples: [
            { code: `const std = @import("std");

fn firstEven(items: []const u32) ?u32 {
    for (items) |n| if (n % 2 == 0) return n;
    return null;
}
pub fn main() void {
    std.debug.print("{?d}\\n", .{firstEven(&[_]u32{ 1, 3, 4 })});
}`, notes: [] },
            { code: `const std = @import("std");

pub fn main() void {
    var it = std.mem.splitScalar(u8, "a b", ' ');
    while (it.next()) |word| {
        std.debug.print("{s}\\n", .{word});
    }
}`, notes: [{ at: "while (it.next()) |word|", text: "stops on null" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const values = [_]?u32{ 1, null, 3 };
    for (values) |v| {
        if (v) |n| std.debug.print("{d}\\n", .{n});
    }
}`, notes: [] }
          ]
        },
        {
          id: "optional-pointers", n: 4, title: "optional pointers", level: 2,
          gloss: "Links values with nullable pointers.",
          examples: [
            { code: `const std = @import("std");

const Node = struct { value: i32, next: ?*const Node };
pub fn main() void {
    const b = Node{ .value = 2, .next = null };
    const a = Node{ .value = 1, .next = &b };
    std.debug.print("{d}\\n", .{a.next.?.value});
}`, notes: [{ at: "?*const Node", text: "pointer or null" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const x: u32 = 5;
    const p: ?*const u32 = &x;
    std.debug.print("{d}\\n", .{p.?.*});
}`, notes: [] },
            { code: `const std = @import("std");

pub fn main() void {
    const none: ?*const u32 = null;
    std.debug.print("{}\\n", .{none == null});
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "error-unions-try",
      n: 8,
      title: "error unions & try",
      concepts: [
        {
          id: "error-sets", n: 1, title: "error sets and returning errors", level: 1,
          gloss: "Declares error values and returns them from functions with a bang type.",
          examples: [
            { code: `const std = @import("std");

const MathError = error{DivideByZero};
fn divide(a: i32, b: i32) MathError!i32 {
    if (b == 0) return error.DivideByZero;
    return @divTrunc(a, b);
}
pub fn main() void {
    std.debug.print("{any}\\n", .{divide(1, 0)});
}`, notes: [{ at: "error{DivideByZero}", text: "a set of error names" }, { at: "MathError!i32", text: "error or integer" }] },
            { code: `const std = @import("std");

fn mayFail(fail: bool) !u8 {
    if (fail) return error.Oops;
    return 7;
}
pub fn main() void {
    std.debug.print("{any}\\n", .{mayFail(false)});
    std.debug.print("{any}\\n", .{mayFail(true)});
}`, notes: [{ at: "!u8", text: "inferred error set" }] },
            { code: `const std = @import("std");

const FileError = error{ NotFound, Denied };
pub fn main() void {
    const e: FileError = error.Denied;
    std.debug.print("{s}\\n", .{@errorName(e)});
}`, notes: [{ at: "@errorName", text: "error as a string" }] }
          ]
        },
        {
          id: "try-catch", n: 2, title: "try and catch", level: 1,
          gloss: "Propagates errors with try and handles them with catch.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const n = std.fmt.parseInt(u32, "abc", 10) catch |err| {
        std.debug.print("failed: {s}\\n", .{@errorName(err)});
        return;
    };
    std.debug.print("{d}\\n", .{n});
}`, notes: [{ at: "catch |err|", text: "handles the error" }] },
            { code: `const std = @import("std");

pub fn main() !void {
    const n = try std.fmt.parseInt(u32, "42", 10);
    std.debug.print("{d}\\n", .{n});
}`, notes: [{ at: "try", text: "returns the error to the caller" }, { at: "!void", text: "main may fail" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const n = std.fmt.parseInt(u32, "x", 10) catch 0;
    std.debug.print("{d}\\n", .{n});
}`, notes: [{ at: "catch 0", text: "default value on error" }] }
          ]
        },
        {
          id: "errdefer-switch", n: 3, title: "errdefer and switching on errors", level: 2,
          gloss: "Cleans up on failure with errdefer and branches on specific errors.",
          examples: [
            { code: `const std = @import("std");

fn work(fail: bool) !void {
    errdefer std.debug.print("cleanup\\n", .{});
    if (fail) return error.Broken;
}
pub fn main() void {
    work(true) catch {};
}`, notes: [{ at: "errdefer", text: "runs only on error return" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const r = std.fmt.parseInt(u8, "300", 10);
    if (r) |v| {
        std.debug.print("{d}\\n", .{v});
    } else |err| switch (err) {
        error.Overflow => std.debug.print("too big\\n", .{}),
        else => std.debug.print("other\\n", .{}),
    }
}`, notes: [{ at: "else |err|", text: "error branch of if" }] },
            { code: `const std = @import("std");

fn check(n: i32) !void {
    if (n < 0) return error.Negative;
}
pub fn main() void {
    check(-1) catch |e| std.debug.print("{s}\\n", .{@errorName(e)});
}`, notes: [] }
          ]
        },
        {
          id: "error-handling-patterns", n: 4, title: "error handling patterns", level: 2,
          gloss: "Combines errors with optionals and converts between them.",
          examples: [
            { code: `const std = @import("std");

fn first(items: []const u32) !u32 {
    if (items.len == 0) return error.Empty;
    return items[0];
}
pub fn main() void {
    const v = first(&[_]u32{}) catch 0;
    std.debug.print("{d}\\n", .{v});
}`, notes: [] },
            { code: `const std = @import("std");

pub fn main() void {
    const maybe: ?u32 = null;
    const r: anyerror!u32 = maybe orelse error.Missing;
    std.debug.print("{any}\\n", .{r});
}`, notes: [{ at: "orelse error", text: "optional to error" }] },
            { code: `const std = @import("std");

fn mustBePositive(n: i32) error{NotPositive}!i32 {
    return if (n > 0) n else error.NotPositive;
}
pub fn main() void {
    std.debug.print("{any}\\n", .{mustBePositive(5)});
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "pointers",
      n: 9,
      title: "pointers",
      concepts: [
        {
          id: "single-item-pointers", n: 1, title: "single-item pointers", level: 1,
          gloss: "Takes the address of a value and reads or writes through it.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    var x: i32 = 10;
    const p = &x;
    p.* += 5;
    std.debug.print("{d}\\n", .{x});
}`, notes: [{ at: "&x", text: "address of x" }, { at: "p.*", text: "dereference" }] },
            { code: `const std = @import("std");

fn increment(n: *i32) void {
    n.* += 1;
}
pub fn main() void {
    var count: i32 = 0;
    increment(&count);
    std.debug.print("{d}\\n", .{count});
}`, notes: [{ at: "*i32", text: "pointer parameter" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const value: i32 = 42;
    const p: *const i32 = &value;
    std.debug.print("{d}\\n", .{p.*});
}`, notes: [{ at: "*const i32", text: "read-only pointer" }] }
          ]
        },
        {
          id: "pointers-to-structs", n: 2, title: "pointers to structs", level: 1,
          gloss: "Reads and writes struct fields through a pointer with automatic dereference.",
          examples: [
            { code: `const std = @import("std");

const Point = struct { x: i32, y: i32 };
fn shift(p: *Point) void {
    p.x += 1;
}
pub fn main() void {
    var pt = Point{ .x = 1, .y = 2 };
    shift(&pt);
    std.debug.print("{d}\\n", .{pt.x});
}`, notes: [{ at: "p.x", text: "no explicit dereference needed" }] },
            { code: `const std = @import("std");

const Item = struct { qty: u32 };
pub fn main() void {
    var items = [_]Item{ .{ .qty = 1 }, .{ .qty = 2 } };
    for (&items) |*item| item.qty *= 10;
    std.debug.print("{d} {d}\\n", .{ items[0].qty, items[1].qty });
}`, notes: [{ at: "|*item|", text: "capture by pointer" }] },
            { code: `const std = @import("std");

const Counter = struct { n: u32 = 0 };
pub fn main() void {
    var c = Counter{};
    const p = &c;
    p.n += 3;
    std.debug.print("{d}\\n", .{c.n});
}`, notes: [] }
          ]
        },
        {
          id: "many-item-and-sentinel", n: 3, title: "many-item and sentinel pointers", level: 2,
          gloss: "Uses pointers to many items and zero-terminated slices.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const arr = [_]u8{ 1, 2, 3 };
    const ptr: [*]const u8 = &arr;
    std.debug.print("{d}\\n", .{ptr[1]});
}`, notes: [{ at: "[*]const u8", text: "no length, unchecked" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const s: [:0]const u8 = "hello";
    std.debug.print("{d} {d}\\n", .{ s.len, s[s.len] });
}`, notes: [{ at: "[:0]", text: "zero-terminated slice" }] },
            { code: `const std = @import("std");

pub fn main() void {
    const arr = [_]i32{ 5, 6, 7 };
    const slice: []const i32 = arr[0..].ptr[0..2];
    std.debug.print("{any}\\n", .{slice});
}`, notes: [{ at: ".ptr", text: "pointer from a slice" }] }
          ]
        },
        {
          id: "swapping-and-aliasing", n: 4, title: "out parameters and swapping", level: 2,
          gloss: "Swaps and fills values through pointers.",
          examples: [
            { code: `const std = @import("std");
fn swap(a: *i32, b: *i32) void {
    const tmp = a.*;
    a.* = b.*;
    b.* = tmp;
}
pub fn main() void {
    var x: i32 = 1;
    var y: i32 = 2;
    swap(&x, &y);
    std.debug.print("{d} {d}\\n", .{ x, y });
}`, notes: [] },
            { code: `const std = @import("std");

fn fill(out: *[3]u8, v: u8) void {
    for (out) |*b| b.* = v;
}
pub fn main() void {
    var buf: [3]u8 = undefined;
    fill(&buf, 9);
    std.debug.print("{any}\\n", .{buf});
}`, notes: [{ at: "*[3]u8", text: "pointer to an array" }] },
            { code: `const std = @import("std");

fn divmod(a: u32, b: u32, rem: *u32) u32 {
    rem.* = a % b;
    return a / b;
}
pub fn main() void {
    var r: u32 = 0;
    const q = divmod(17, 5, &r);
    std.debug.print("{d} {d}\\n", .{ q, r });
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "allocators-defer",
      n: 10,
      title: "allocators & defer",
      concepts: [
        {
          id: "defer", n: 1, title: "defer", level: 1,
          gloss: "Runs cleanup when the current scope ends, in reverse order.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    defer std.debug.print("last\\n", .{});
    std.debug.print("first\\n", .{});
}`, notes: [{ at: "defer", text: "runs at scope exit" }] },
            { code: `const std = @import("std");

pub fn main() void {
    defer std.debug.print("one\\n", .{});
    defer std.debug.print("two\\n", .{});
    std.debug.print("body\\n", .{});
}`, notes: [{ at: "two", text: "deferred last, runs first" }] },
            { code: `const std = @import("std");

pub fn main() void {
    for (0..2) |i| {
        defer std.debug.print("end {d}\\n", .{i});
        std.debug.print("start {d}\\n", .{i});
    }
}`, notes: [{ at: "defer", text: "runs each iteration" }] }
          ]
        },
        {
          id: "allocators", n: 2, title: "allocators", level: 2,
          gloss: "Requests and releases memory through an explicit allocator.",
          examples: [
            { code: `const std = @import("std");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    const buf = try allocator.alloc(u8, 4);
    defer allocator.free(buf);
    @memset(buf, 'x');
    std.debug.print("{s}\\n", .{buf});
}`, notes: [{ at: "alloc", text: "can fail with OutOfMemory" }, { at: "free", text: "returns the memory" }] },
            { code: `const std = @import("std");

pub fn main() !void {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const a = arena.allocator();
    const nums = try a.alloc(i32, 3);
    @memset(nums, 7);
    std.debug.print("{any}\\n", .{nums});
}`, notes: [{ at: "ArenaAllocator", text: "frees everything at once" }] },
            { code: `const std = @import("std");

pub fn main() !void {
    var storage: [16]u8 = undefined;
    var fba = std.heap.FixedBufferAllocator.init(&storage);
    const bytes = try fba.allocator().alloc(u8, 8);
    std.debug.print("{d}\\n", .{bytes.len});
}`, notes: [{ at: "FixedBufferAllocator", text: "memory from a local array" }] }
          ]
        },
        {
          id: "containers", n: 3, title: "ArrayList and HashMap", level: 2,
          gloss: "Grows collections that take an allocator for each mutation.",
          examples: [
            { code: `const std = @import("std");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    var list: std.ArrayList(i32) = .empty;
    defer list.deinit(allocator);
    try list.append(allocator, 1);
    try list.append(allocator, 2);
    std.debug.print("{any}\\n", .{list.items});
}`, notes: [{ at: ".empty", text: "no allocation yet" }, { at: "deinit(allocator)", text: "allocator passed explicitly" }] },
            { code: `const std = @import("std");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    var map = std.AutoHashMap(u32, u32).init(allocator);
    defer map.deinit();
    try map.put(1, 10);
    std.debug.print("{?d}\\n", .{map.get(1)});
}`, notes: [{ at: "AutoHashMap", text: "hashes integers by default" }] },
            { code: `const std = @import("std");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    var list: std.ArrayList(u8) = .empty;
    defer list.deinit(allocator);
    try list.appendSlice(allocator, "zig");
    std.debug.print("{s}\\n", .{list.items});
}`, notes: [{ at: "appendSlice", text: "adds many items" }] }
          ]
        },
        {
          id: "create-dupe-format", n: 4, title: "create, dupe and allocPrint", level: 2,
          gloss: "Allocates single values, copies slices and formats strings on the heap.",
          examples: [
            { code: `const std = @import("std");

const Point = struct { x: i32, y: i32 };
pub fn main() !void {
    const allocator = std.heap.page_allocator;
    const p = try allocator.create(Point);
    defer allocator.destroy(p);
    p.* = .{ .x = 1, .y = 2 };
    std.debug.print("{d}\\n", .{p.x + p.y});
}`, notes: [{ at: "create", text: "one value on the heap" }] },
            { code: `const std = @import("std");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    const copy = try allocator.dupe(u8, "abc");
    defer allocator.free(copy);
    copy[0] = 'z';
    std.debug.print("{s}\\n", .{copy});
}`, notes: [{ at: "dupe", text: "owned copy of a slice" }] },
            { code: `const std = @import("std");

pub fn main() !void {
    const allocator = std.heap.page_allocator;
    const s = try std.fmt.allocPrint(allocator, "{d}-{s}", .{ 7, "x" });
    defer allocator.free(s);
    std.debug.print("{s}\\n", .{s});
}`, notes: [{ at: "allocPrint", text: "formatted heap string" }] }
          ]
        }
      ]
    },
    {
      id: "comptime",
      n: 11,
      title: "comptime",
      concepts: [
        {
          id: "comptime-values", n: 1, title: "comptime values", level: 2,
          gloss: "Evaluates expressions and builds tables during compilation.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    const n = comptime 6 * 7;
    std.debug.print("{d}\\n", .{n});
}`, notes: [{ at: "comptime", text: "evaluated by the compiler" }] },
            { code: `const std = @import("std");

const squares = blk: {
    var t: [4]u32 = undefined;
    for (&t, 0..) |*slot, i| slot.* = i * i;
    break :blk t;
};
pub fn main() void {
    std.debug.print("{any}\\n", .{squares});
}`, notes: [{ at: "blk", text: "table computed at compile time" }] },
            { code: `const std = @import("std");

fn factorial(n: u64) u64 {
    return if (n < 2) 1 else n * factorial(n - 1);
}
const f10 = factorial(10);
pub fn main() void {
    std.debug.print("{d}\\n", .{f10});
}`, notes: [{ at: "const f10", text: "call runs at compile time" }] }
          ]
        },
        {
          id: "comptime-parameters", n: 2, title: "comptime parameters and types", level: 2,
          gloss: "Specialises functions by passing types and values at compile time.",
          examples: [
            { code: `const std = @import("std");

fn repeat(comptime n: usize) [n]u8 {
    return @splat('x');
}
pub fn main() void {
    std.debug.print("{s}\\n", .{repeat(3)});
}`, notes: [{ at: "comptime n", text: "part of the return type" }] },
            { code: `const std = @import("std");

fn describe(comptime T: type) []const u8 {
    return if (T == i32) "int" else "other";
}
pub fn main() void {
    std.debug.print("{s} {s}\\n", .{ describe(i32), describe(f64) });
}`, notes: [] },
            { code: `const std = @import("std");

fn maxOf(comptime T: type, items: []const T) T {
    var top = items[0];
    for (items) |v| if (v > top) {
        top = v;
    };
    return top;
}
pub fn main() void {
    std.debug.print("{d}\\n", .{maxOf(i32, &[_]i32{ 3, 9, 2 })});
}`, notes: [] }
          ]
        },
        {
          id: "reflection", n: 3, title: "type reflection", level: 3,
          gloss: "Inspects sizes, fields and kinds of types with builtin functions.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    std.debug.print("{d} {d}\\n", .{ @sizeOf(u32), @sizeOf(u64) });
}`, notes: [{ at: "@sizeOf", text: "bytes in memory" }] },
            { code: `const std = @import("std");

const P = struct { x: i32, y: i32 };
pub fn main() void {
    std.debug.print("{}\\n", .{@hasField(P, "x")});
    std.debug.print("{}\\n", .{@hasField(P, "z")});
}`, notes: [{ at: "@hasField", text: "compile-time check" }] },
            { code: `const std = @import("std");

const P = struct { x: i32, y: i32 };
pub fn main() void {
    const info = @typeInfo(P);
    std.debug.print("{d}\\n", .{info.@"struct".field_names.len});
}`, notes: [{ at: "@typeInfo", text: "description of a type" }] }
          ]
        },
        {
          id: "inline-loops", n: 4, title: "inline for and comptime branches", level: 3,
          gloss: "Unrolls loops and selects code by type during compilation.",
          examples: [
            { code: `const std = @import("std");

pub fn main() void {
    inline for ([_]u8{ 1, 2, 3 }) |n| {
        std.debug.print("{d}\\n", .{n});
    }
}`, notes: [{ at: "inline for", text: "unrolled at compile time" }] },
            { code: `const std = @import("std");

fn name(comptime T: type) []const u8 {
    if (T == u8) return "byte";
    return "other";
}
pub fn main() void {
    std.debug.print("{s}\\n", .{name(u8)});
}`, notes: [] },
            { code: `const std = @import("std");

fn sumFields(v: anytype) i32 {
    var total: i32 = 0;
    inline for (comptime std.meta.fieldNames(@TypeOf(v))) |name| {
        total += @field(v, name);
    }
    return total;
}
pub fn main() void {
    std.debug.print("{d}\\n", .{sumFields(.{ .a = 1, .b = 2 })});
}`, notes: [{ at: "@field", text: "field by comptime name" }] }
          ]
        }
      ]
    },
    {
      id: "testing",
      n: 12,
      title: "testing",
      concepts: [
        {
          id: "test-blocks", n: 1, title: "test blocks", level: 1,
          gloss: "Declares tests next to the code and checks them with std.testing.",
          examples: [
            { code: `const std = @import("std");

test "addition" {
    try std.testing.expect(1 + 1 == 2);
}`, notes: [{ at: "test", text: "run by zig test" }, { at: "try", text: "failure returns an error" }] },
            { code: `const std = @import("std");

test "string equality" {
    try std.testing.expectEqualStrings("zig", "zig");
}`, notes: [{ at: "expectEqualStrings", text: "prints a diff on failure" }] },
            { code: `const std = @import("std");

test "equal values" {
    try std.testing.expectEqual(@as(u32, 4), 2 + 2);
}`, notes: [{ at: "@as", text: "match the expected type" }] }
          ]
        },
        {
          id: "testing-functions", n: 2, title: "testing functions", level: 1,
          gloss: "Tests a function with values and with expected errors.",
          examples: [
            { code: `const std = @import("std");

fn square(n: i32) i32 {
    return n * n;
}
test "square" {
    try std.testing.expectEqual(@as(i32, 16), square(4));
}`, notes: [] },
            { code: `const std = @import("std");

fn divide(a: i32, b: i32) !i32 {
    if (b == 0) return error.DivideByZero;
    return @divTrunc(a, b);
}
test "divide by zero" {
    try std.testing.expectError(error.DivideByZero, divide(1, 0));
}`, notes: [{ at: "expectError", text: "asserts a specific error" }] },
            { code: `const std = @import("std");

fn isEven(n: u32) bool {
    return n % 2 == 0;
}
test "isEven" {
    try std.testing.expect(isEven(4));
    try std.testing.expect(!isEven(7));
}`, notes: [] }
          ]
        },
        {
          id: "testing-memory", n: 3, title: "testing allocators and slices", level: 2,
          gloss: "Detects leaks with the testing allocator and compares slices.",
          examples: [
            { code: `const std = @import("std");

test "no leak" {
    const buf = try std.testing.allocator.alloc(u8, 8);
    defer std.testing.allocator.free(buf);
    try std.testing.expectEqual(@as(usize, 8), buf.len);
}`, notes: [{ at: "testing.allocator", text: "fails on a leak" }] },
            { code: `const std = @import("std");

test "slices" {
    const a = [_]i32{ 1, 2 };
    const b = [_]i32{ 1, 2 };
    try std.testing.expectEqualSlices(i32, &a, &b);
}`, notes: [] },
            { code: `const std = @import("std");

test "list grows" {
    var list: std.ArrayList(u8) = .empty;
    defer list.deinit(std.testing.allocator);
    try list.append(std.testing.allocator, 'a');
    try std.testing.expectEqual(@as(usize, 1), list.items.len);
}`, notes: [] }
          ]
        },
        {
          id: "testing-structure", n: 4, title: "organising tests", level: 2,
          gloss: "Names tests, groups helpers and checks floating-point values.",
          examples: [
            { code: `const std = @import("std");

test "float close" {
    const x: f64 = 0.1 + 0.2;
    try std.testing.expectApproxEqAbs(0.3, x, 1e-9);
}`, notes: [{ at: "expectApproxEqAbs", text: "tolerance for floats" }] },
            { code: `const std = @import("std");

const Stack = struct {
    len: usize = 0,
    fn push(self: *Stack) void { self.len += 1; }
};
test "stack push" {
    var s = Stack{};
    s.push();
    try std.testing.expectEqual(@as(usize, 1), s.len);
}`, notes: [] },
            { code: `const std = @import("std");

test "optional is null" {
    const maybe: ?u32 = null;
    try std.testing.expect(maybe == null);
    try std.testing.expectEqual(@as(?u32, null), maybe);
}`, notes: [] }
          ]
        }
      ]
    }
  ]
};
