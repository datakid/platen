export default {
  id: "numpy",
  name: "NumPy",
  short: "NP",
  pigment: "numpy",
  family: "python",
  version: "2.x",
  lexer: "python",
  indent: 4,
  topics: [
    {
      id: "creating-arrays",
      n: 1,
      title: "creating arrays",
      concepts: [
        {
          id: "array", n: 1, title: "np.array", level: 1,
          gloss: "Builds an array from a Python list.",
          examples: [
            { code: `a = np.array([3, 1, 4, 1, 5])`, notes: [] },
            { code: `m = np.array([[1, 2, 3], [4, 5, 6]])`, notes: [{ at: "[[1, 2, 3], [4, 5, 6]]", text: "nested lists make a 2-D array" }] },
            { code: `f = np.array([1, 2, 3], dtype=np.float64)`, notes: [{ at: "dtype=", text: "forces the element type" }] }
          ]
        },
        {
          id: "ranges", n: 2, title: "arange and linspace", level: 1,
          gloss: "Generates evenly spaced numbers by step or by count.",
          examples: [
            { code: `a = np.arange(10)`, notes: [{ at: "10", text: "0 through 9; stop is excluded" }] },
            { code: `a = np.arange(0, 1, 0.25)`, notes: [{ at: "0.25", text: "the step size" }] },
            { code: `x = np.linspace(0, 1, 5)`, notes: [{ at: "5", text: "the number of points, ends included" }] }
          ]
        },
        {
          id: "filled-arrays", n: 3, title: "zeros, ones and full", level: 1,
          gloss: "Creates arrays pre-filled with a constant.",
          examples: [
            { code: `z = np.zeros((2, 3))`, notes: [{ at: "(2, 3)", text: "the shape is a tuple" }] },
            { code: `o = np.ones(4, dtype=int)`, notes: [] },
            { code: `f = np.full((2, 2), 7.5)`, notes: [] }
          ]
        },
        {
          id: "eye-like", n: 4, title: "eye and like", level: 2,
          gloss: "Creates identity matrices and arrays shaped like another.",
          examples: [
            { code: `i3 = np.eye(3)`, notes: [{ at: "np.eye", text: "ones on the diagonal" }] },
            { code: `a = np.arange(6)
z = np.zeros_like(a)`, notes: [{ at: "zeros_like", text: "same shape and dtype as a" }] },
            { code: `d = np.diag([1, 2, 3])`, notes: [{ at: "np.diag", text: "puts the values on the diagonal" }] }
          ]
        }
      ]
    },
    {
      id: "dtypes",
      n: 2,
      title: "dtypes",
      concepts: [
        {
          id: "checking-dtypes", n: 1, title: "checking dtypes", level: 1,
          gloss: "Reads an array's element type with dtype.",
          examples: [
            { code: `a = np.array([1, 2, 3])
print(a.dtype)`, notes: [{ at: ".dtype", text: "whole numbers default to int64" }] },
            { code: `f = np.array([1.5, 2.5])
print(f.dtype)`, notes: [] },
            { code: `b = np.array([True, False])
print(b.dtype)`, notes: [] }
          ]
        },
        {
          id: "astype", n: 2, title: "astype", level: 1,
          gloss: "Converts an array to another element type.",
          examples: [
            { code: `a = np.array([1.7, 2.2, 3.9])
b = a.astype(int)`, notes: [{ at: ".astype(int)", text: "truncates toward zero" }] },
            { code: `f = np.arange(3).astype(np.float32)`, notes: [] },
            { code: `s = np.array(["1", "2"]).astype(int)`, notes: [{ at: 'np.array(["1", "2"])', text: "text parsed into numbers" }] }
          ]
        },
        {
          id: "sized-types", n: 3, title: "sized types", level: 2,
          gloss: "Picks a smaller type to save memory when the range allows.",
          examples: [
            { code: `a = np.zeros(1000, dtype=np.float32)
print(a.nbytes)`, notes: [{ at: ".nbytes", text: "total bytes used" }] },
            { code: `u = np.array([200, 255], dtype=np.uint8)`, notes: [{ at: "np.uint8", text: "0 to 255 only" }] },
            { code: `i = np.iinfo(np.int32)
print(i.max)`, notes: [{ at: "np.iinfo", text: "the limits of an integer type" }] }
          ]
        },
        {
          id: "integer-overflow", n: 4, title: "integer overflow", level: 3,
          gloss: "Wraps around silently when a fixed-size integer overflows.",
          examples: [
            { code: `a = np.array([250], dtype=np.uint8)
print(a + 10)`, notes: [{ at: "a + 10", text: "wraps around to 4" }] },
            { code: `a = np.array([100], dtype=np.int8)
b = a.astype(np.int16) * 2`, notes: [{ at: ".astype(np.int16)", text: "widen first to avoid wrapping" }] },
            { code: `big = np.array([2**31 - 1], dtype=np.int32)
print(big + 1)`, notes: [] }
          ]
        },
        {
          id: "type-promotion", n: 5, title: "type promotion", level: 3,
          gloss: "Mixes types by promoting to one that can hold both.",
          examples: [
            { code: `mixed = np.array([1, 2]) + 0.5`, notes: [{ at: "+ 0.5", text: "ints become float64" }] },
            { code: `kind = np.result_type(np.int32, np.float32)`, notes: [{ at: "np.result_type", text: "asks numpy what the mix becomes" }] },
            { code: `small = np.arange(3, dtype=np.int8) + 1
print(small.dtype)`, notes: [{ at: "+ 1", text: "a Python int keeps int8 in NumPy 2" }] }
          ]
        }
      ]
    },
    {
      id: "shape-reshape",
      n: 3,
      title: "shape & reshape",
      concepts: [
        {
          id: "shape-ndim", n: 1, title: "shape and ndim", level: 1,
          gloss: "Reads an array's dimensions.",
          examples: [
            { code: `m = np.zeros((3, 4))
print(m.shape)`, notes: [{ at: ".shape", text: "a tuple: rows, columns" }] },
            { code: `m = np.zeros((3, 4))
print(m.ndim, m.size)`, notes: [{ at: ".size", text: "the total number of elements" }] },
            { code: `m = np.zeros((3, 4))
rows, cols = m.shape`, notes: [] }
          ]
        },
        {
          id: "reshape", n: 2, title: "reshape", level: 1,
          gloss: "Gives the same data a new shape.",
          examples: [
            { code: `a = np.arange(12)
m = a.reshape(3, 4)`, notes: [{ at: "3, 4", text: "the sizes must multiply to 12" }] },
            { code: `m = np.arange(12).reshape(2, -1)`, notes: [{ at: "-1", text: "numpy infers this length" }] },
            { code: `cube = np.arange(24).reshape(2, 3, 4)`, notes: [] }
          ]
        },
        {
          id: "flatten-ravel", n: 3, title: "flatten and ravel", level: 2,
          gloss: "Collapses an array to one dimension.",
          examples: [
            { code: `m = np.arange(6).reshape(2, 3)
flat = m.ravel()`, notes: [{ at: ".ravel()", text: "a view when possible" }] },
            { code: `m = np.arange(6).reshape(2, 3)
copy = m.flatten()`, notes: [{ at: ".flatten()", text: "always a copy" }] },
            { code: `m = np.arange(6).reshape(2, 3)
flat = m.reshape(-1)`, notes: [] }
          ]
        },
        {
          id: "transpose", n: 4, title: "transpose", level: 2,
          gloss: "Swaps the axes of an array.",
          examples: [
            { code: `m = np.arange(6).reshape(2, 3)
t = m.T`, notes: [{ at: ".T", text: "rows become columns" }] },
            { code: `m = np.arange(6).reshape(2, 3)
t = m.transpose(1, 0)`, notes: [] },
            { code: `m = np.arange(6).reshape(2, 3)
t = m.mT`, notes: [{ at: ".mT", text: "transposes the last two axes" }] }
          ]
        },
        {
          id: "adding-axes", n: 5, title: "adding axes", level: 2,
          gloss: "Inserts a length-1 axis with newaxis or expand_dims.",
          examples: [
            { code: `a = np.arange(3)
col = a[:, np.newaxis]`, notes: [{ at: "np.newaxis", text: "adds an axis of length 1" }] },
            { code: `a = np.arange(3)
row = np.expand_dims(a, axis=0)`, notes: [] },
            { code: `col = np.zeros((3, 1))
flat = np.squeeze(col)`, notes: [{ at: "np.squeeze", text: "removes length-1 axes" }] }
          ]
        }
      ]
    },
    {
      id: "indexing-slicing",
      n: 4,
      title: "indexing & slicing",
      concepts: [
        {
          id: "basic-indexing", n: 1, title: "basic indexing", level: 1,
          gloss: "Reads single elements by position.",
          examples: [
            { code: `a = np.array([10, 20, 30])
first = a[0]`, notes: [] },
            { code: `m = np.arange(12).reshape(3, 4)
item = m[1, 2]`, notes: [{ at: "m[1, 2]", text: "row, then column, in one bracket" }] },
            { code: `a = np.array([10, 20, 30])
last = a[-1]`, notes: [] }
          ]
        },
        {
          id: "slicing", n: 2, title: "slicing", level: 1,
          gloss: "Takes ranges of elements with start, stop and step.",
          examples: [
            { code: `a = np.arange(10)
part = a[2:5]`, notes: [{ at: "2:5", text: "indexes 2, 3 and 4" }] },
            { code: `a = np.arange(10)
every_other = a[::2]`, notes: [] },
            { code: `m = np.arange(12).reshape(3, 4)
block = m[:2, 1:3]`, notes: [{ at: "[:2, 1:3]", text: "rows 0-1, columns 1-2" }] }
          ]
        },
        {
          id: "views", n: 3, title: "slices are views", level: 2,
          gloss: "Shares memory with the original, so writes show through.",
          examples: [
            { code: `a = np.arange(5)
v = a[1:4]
v[0] = 99`, notes: [{ at: "v[0] = 99", text: "also changes a[1]" }] },
            { code: `a = np.arange(5)
c = a[1:4].copy()
c[0] = 99`, notes: [{ at: ".copy()", text: "an independent array" }] },
            { code: `a = np.arange(5)
print(np.shares_memory(a, a[1:]))`, notes: [] }
          ]
        },
        {
          id: "rows-columns", n: 4, title: "rows and columns", level: 1,
          gloss: "Selects whole rows or columns of a matrix.",
          examples: [
            { code: `m = np.arange(12).reshape(3, 4)
row = m[1]`, notes: [] },
            { code: `m = np.arange(12).reshape(3, 4)
col = m[:, 2]`, notes: [{ at: "[:, 2]", text: "every row, column 2" }] },
            { code: `m = np.arange(12).reshape(3, 4)
m[0, :] = 0`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "boolean-masks",
      n: 5,
      title: "boolean masks",
      concepts: [
        {
          id: "creating-masks", n: 1, title: "creating masks", level: 1,
          gloss: "Compares an array to get a boolean array.",
          examples: [
            { code: `a = np.array([3, 8, 1, 9])
mask = a > 4`, notes: [{ at: "a > 4", text: "one true or false per element" }] },
            { code: `a = np.array([3, 8, 1, 9])
mask = (a >= 2) & (a < 9)`, notes: [{ at: "&", text: "element-wise and; keep the parentheses" }] },
            { code: `a = np.array([3, 8, 1, 9])
mask = ~(a > 4)`, notes: [{ at: "~", text: "element-wise not" }] }
          ]
        },
        {
          id: "filtering", n: 2, title: "filtering with masks", level: 1,
          gloss: "Keeps the elements where a mask is true.",
          examples: [
            { code: `a = np.array([3, 8, 1, 9])
big = a[a > 4]`, notes: [] },
            { code: `a = np.array([3, 8, 1, 9])
evens = a[a % 2 == 0]`, notes: [] },
            { code: `m = np.arange(6).reshape(2, 3)
small = m[m < 3]`, notes: [{ at: "m[m < 3]", text: "a 1-D result in row order" }] }
          ]
        },
        {
          id: "mask-assignment", n: 3, title: "assigning with masks", level: 2,
          gloss: "Overwrites only the elements a mask selects.",
          examples: [
            { code: `a = np.array([3, 8, 1, 9])
a[a > 4] = 0`, notes: [] },
            { code: `scores = np.array([55, 82, 101, 90])
scores[scores > 100] = 100`, notes: [] },
            { code: `a = np.array([-2, 5, -1])
a[a < 0] *= -1`, notes: [{ at: "*= -1", text: "flips only the negatives" }] }
          ]
        },
        {
          id: "any-all", n: 4, title: "any, all and counting", level: 1,
          gloss: "Summarizes a mask with any, all and sum.",
          examples: [
            { code: `a = np.array([3, 8, 1, 9])
print((a > 5).any())`, notes: [] },
            { code: `a = np.array([3, 8, 1, 9])
print((a > 0).all())`, notes: [] },
            { code: `a = np.array([3, 8, 1, 9])
count = (a > 4).sum()`, notes: [{ at: ".sum()", text: "true counts as 1" }] }
          ]
        }
      ]
    },
    {
      id: "fancy-indexing",
      n: 6,
      title: "fancy indexing",
      concepts: [
        {
          id: "index-arrays", n: 1, title: "integer index arrays", level: 2,
          gloss: "Picks arbitrary elements with a list of positions.",
          examples: [
            { code: `a = np.array([10, 20, 30, 40])
picked = a[[0, 2, 3]]`, notes: [{ at: "[[0, 2, 3]]", text: "a list picks several positions" }] },
            { code: `a = np.array([10, 20, 30, 40])
picked = a[np.array([3, 3, 0])]`, notes: [{ at: "[3, 3, 0]", text: "repeats and any order are fine" }] },
            { code: `a = np.array([10, 20, 30, 40])
a[[0, 1]] = 0`, notes: [] }
          ]
        },
        {
          id: "fancy-2d", n: 2, title: "rows and cells", level: 2,
          gloss: "Selects rows, or single cells with paired index arrays.",
          examples: [
            { code: `m = np.arange(12).reshape(3, 4)
rows = m[[0, 2]]`, notes: [] },
            { code: `m = np.arange(12).reshape(3, 4)
cells = m[[0, 1, 2], [1, 2, 3]]`, notes: [{ at: "[[0, 1, 2], [1, 2, 3]]", text: "pairs: (0, 1), (1, 2), (2, 3)" }] },
            { code: `m = np.arange(12).reshape(3, 4)
corner = m[np.ix_([0, 2], [1, 3])]`, notes: [{ at: "np.ix_", text: "every row and column combination" }] }
          ]
        },
        {
          id: "take-put", n: 3, title: "take and put", level: 2,
          gloss: "Gathers or scatters values with take and put.",
          examples: [
            { code: `a = np.array([10, 20, 30, 40])
vals = np.take(a, [1, 3])`, notes: [] },
            { code: `a = np.array([10, 20, 30, 40])
np.put(a, [0, 2], [-1, -2])`, notes: [{ at: "np.put", text: "writes values at flat positions" }] },
            { code: `m = np.arange(6).reshape(2, 3)
cols = np.take(m, [0, 2], axis=1)`, notes: [] }
          ]
        },
        {
          id: "locating-extremes", n: 4, title: "locating extremes", level: 2,
          gloss: "Finds where the largest or smallest value sits with argmax and argmin.",
          examples: [
            { code: `a = np.array([3, 9, 4])
i = a.argmax()`, notes: [{ at: ".argmax()", text: "the index, not the value" }] },
            { code: `m = np.array([[1, 5], [7, 2]])
row, col = np.unravel_index(m.argmax(), m.shape)`, notes: [{ at: "np.unravel_index", text: "turns a flat index into row and column" }] },
            { code: `a = np.array([3, 9, 4])
best = a[a.argmax()]`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "broadcasting",
      n: 7,
      title: "broadcasting",
      concepts: [
        {
          id: "scalar-broadcast", n: 1, title: "scalars", level: 1,
          gloss: "Applies one number to every element.",
          examples: [
            { code: `a = np.arange(4)
b = a * 10`, notes: [] },
            { code: `a = np.arange(4)
c = a + 0.5`, notes: [] },
            { code: `a = np.arange(4)
d = a ** 2`, notes: [] }
          ]
        },
        {
          id: "row-column-broadcast", n: 2, title: "rows and columns", level: 2,
          gloss: "Stretches a smaller array across a larger one.",
          examples: [
            { code: `m = np.arange(6).reshape(2, 3)
row = np.array([10, 20, 30])
out = m + row`, notes: [{ at: "m + row", text: "row repeats for each matrix row" }] },
            { code: `m = np.arange(6).reshape(2, 3)
col = np.array([[100], [200]])
out = m + col`, notes: [{ at: "[[100], [200]]", text: "shape (2, 1) stretches across columns" }] },
            { code: `m = np.arange(6).reshape(2, 3)
centered = m - m.mean(axis=0)`, notes: [{ at: "axis=0", text: "one mean per column" }] }
          ]
        },
        {
          id: "building-grids", n: 3, title: "building grids", level: 2,
          gloss: "Combines a column and a row into a table with broadcasting.",
          examples: [
            { code: `a = np.arange(1, 4)
table = a[:, None] * a[None, :]`, notes: [{ at: "[:, None]", text: "the same as np.newaxis here" }] },
            { code: `x = np.arange(3)
y = np.arange(2)
grid = x + y[:, None]`, notes: [] },
            { code: `xs, ys = np.meshgrid(np.arange(3), np.arange(2))`, notes: [{ at: "np.meshgrid", text: "full coordinate grids" }] }
          ]
        },
        {
          id: "shape-rules", n: 4, title: "shape rules", level: 3,
          gloss: "Aligns shapes from the right, and each pair must match or be one.",
          examples: [
            { code: `a = np.ones((3, 4))
b = np.ones(4)
print((a + b).shape)`, notes: [{ at: "a + b", text: "4 matches 4; b gains a leading axis" }] },
            { code: `print(np.broadcast_shapes((3, 1), (1, 4)))`, notes: [{ at: "(3, 1), (1, 4)", text: "each 1 stretches to match" }] },
            { code: `try:
    np.ones((3, 2)) + np.ones(3)
except ValueError:
    print("shapes do not align")`, notes: [{ at: "ValueError", text: "trailing axes 2 and 3 differ" }] }
          ]
        }
      ]
    },
    {
      id: "ufuncs",
      n: 8,
      title: "ufuncs",
      concepts: [
        {
          id: "math-ufuncs", n: 1, title: "math functions", level: 1,
          gloss: "Applies a function to every element at C speed.",
          examples: [
            { code: `a = np.array([1.0, 4.0, 9.0])
roots = np.sqrt(a)`, notes: [] },
            { code: `y = np.exp(np.linspace(0, 1, 5))`, notes: [] },
            { code: `r = np.round(np.array([1.234, 5.678]), 1)`, notes: [] }
          ]
        },
        {
          id: "binary-ufuncs", n: 2, title: "binary ufuncs", level: 2,
          gloss: "Combines two arrays element by element.",
          examples: [
            { code: `a = np.array([1, 5, 3])
b = np.array([4, 2, 6])
bigger = np.maximum(a, b)`, notes: [{ at: "np.maximum", text: "element-wise, not the array maximum" }] },
            { code: `a = np.array([1, 5, 3])
b = np.array([4, 2, 6])
diff = np.subtract(b, a)`, notes: [] },
            { code: `a = np.array([1, 5, 3])
p = np.power(a, 2)`, notes: [] }
          ]
        },
        {
          id: "ufunc-methods", n: 3, title: "reduce and accumulate", level: 3,
          gloss: "Runs a ufunc along an axis with reduce and accumulate.",
          examples: [
            { code: `a = np.array([1, 2, 3, 4])
total = np.add.reduce(a)`, notes: [{ at: "np.add.reduce", text: "the same as a.sum()" }] },
            { code: `a = np.array([1, 2, 3, 4])
running = np.add.accumulate(a)`, notes: [{ at: "accumulate", text: "keeps every partial result" }] },
            { code: `a = np.array([1, 2, 3, 4])
table = np.multiply.outer(a, a)`, notes: [{ at: ".outer", text: "every pairwise product" }] }
          ]
        },
        {
          id: "out-where", n: 4, title: "out and where", level: 3,
          gloss: "Writes results into an existing array and skips masked elements.",
          examples: [
            { code: `a = np.arange(5.0)
out = np.empty(5)
np.sqrt(a, out=out)`, notes: [{ at: "out=out", text: "no new array is allocated" }] },
            { code: `a = np.array([4.0, -1.0, 9.0])
r = np.sqrt(a, where=a >= 0, out=np.zeros(3))`, notes: [{ at: "where=a >= 0", text: "skips the negative value" }] },
            { code: `a = np.arange(5)
np.add(a, 1, out=a)`, notes: [] }
          ]
        },
        {
          id: "nan-checks", n: 5, title: "nan and inf checks", level: 2,
          gloss: "Tests each element for NaN or infinity.",
          examples: [
            { code: `a = np.array([1.0, np.nan, 3.0])
mask = np.isnan(a)`, notes: [{ at: "np.isnan", text: "nan never equals itself" }] },
            { code: `a = np.array([1.0, np.nan, 3.0])
clean = a[~np.isnan(a)]`, notes: [] },
            { code: `print(np.isfinite(np.array([1.0, np.inf])))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "aggregation-axis",
      n: 9,
      title: "aggregation & axis",
      concepts: [
        {
          id: "basic-aggregates", n: 1, title: "sum, mean and friends", level: 1,
          gloss: "Reduces an array to a single number.",
          examples: [
            { code: `a = np.array([3, 1, 4, 1, 5])
print(a.sum(), a.mean())`, notes: [] },
            { code: `a = np.array([3, 1, 4, 1, 5])
print(a.min(), a.max())`, notes: [] },
            { code: `a = np.array([3, 1, 4, 1, 5])
print(a.std(), a.var())`, notes: [{ at: ".std()", text: "population standard deviation" }] }
          ]
        },
        {
          id: "axis-argument", n: 2, title: "the axis argument", level: 2,
          gloss: "Collapses one dimension of a matrix at a time.",
          examples: [
            { code: `m = np.arange(6).reshape(2, 3)
col_sums = m.sum(axis=0)`, notes: [{ at: "axis=0", text: "collapses the rows" }] },
            { code: `m = np.arange(6).reshape(2, 3)
row_sums = m.sum(axis=1)`, notes: [{ at: "axis=1", text: "collapses the columns" }] },
            { code: `cube = np.ones((2, 3, 4))
totals = cube.sum(axis=(0, 2))`, notes: [{ at: "(0, 2)", text: "collapses two axes at once" }] }
          ]
        },
        {
          id: "keepdims", n: 3, title: "keepdims", level: 3,
          gloss: "Keeps the reduced axis so the result still broadcasts.",
          examples: [
            { code: `m = np.arange(6).reshape(2, 3)
row_sums = m.sum(axis=1, keepdims=True)`, notes: [{ at: "keepdims=True", text: "shape (2, 1) instead of (2,)" }] },
            { code: `m = np.arange(1, 7).reshape(2, 3)
share = m / m.sum(axis=1, keepdims=True)`, notes: [] },
            { code: `m = np.arange(6).reshape(2, 3)
centered = m - m.mean(axis=0, keepdims=True)`, notes: [] }
          ]
        },
        {
          id: "cumulative", n: 4, title: "cumulative and diff", level: 2,
          gloss: "Tracks running totals and differences between neighbors.",
          examples: [
            { code: `a = np.array([1, 2, 3, 4])
running = a.cumsum()`, notes: [] },
            { code: `a = np.array([1, 4, 9, 16])
steps = np.diff(a)`, notes: [{ at: "np.diff", text: "one fewer element than a" }] },
            { code: `fact = np.cumprod(np.arange(1, 6))`, notes: [] }
          ]
        },
        {
          id: "nan-aggregates", n: 5, title: "nan-aware aggregates", level: 2,
          gloss: "Ignores missing values with the nan versions of reducers.",
          examples: [
            { code: `a = np.array([1.0, np.nan, 3.0])
print(np.nanmean(a))`, notes: [{ at: "np.nanmean", text: "plain mean would return nan" }] },
            { code: `a = np.array([1.0, np.nan, 3.0])
print(np.nansum(a))`, notes: [] },
            { code: `a = np.array([1.0, np.nan, 3.0])
print(np.nanmax(a))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "linear-algebra",
      n: 10,
      title: "linear algebra",
      concepts: [
        {
          id: "matrix-multiplication", n: 1, title: "matrix multiplication", level: 2,
          gloss: "Multiplies matrices with the at operator.",
          examples: [
            { code: `a = np.array([[1, 2], [3, 4]])
b = np.array([[0, 1], [1, 0]])
c = a @ b`, notes: [{ at: "@", text: "matrix product, not element-wise" }] },
            { code: `a = np.array([[1, 2], [3, 4]])
v = np.array([1, 2])
w = a @ v`, notes: [] },
            { code: `a = np.array([[1, 2], [3, 4]])
b = np.array([[0, 1], [1, 0]])
d = np.dot(a, b)`, notes: [{ at: "np.dot", text: "the same result for 2-D arrays" }] }
          ]
        },
        {
          id: "solving-systems", n: 2, title: "solving systems", level: 2,
          gloss: "Solves a linear system with np.linalg.solve.",
          examples: [
            { code: `A = np.array([[2.0, 1.0], [1.0, 3.0]])
b = np.array([3.0, 5.0])
x = np.linalg.solve(A, b)`, notes: [{ at: "np.linalg.solve", text: "preferred over inverting A" }] },
            { code: `A = np.array([[2.0, 1.0], [1.0, 3.0]])
b = np.array([3.0, 5.0])
x = np.linalg.solve(A, b)
print(np.allclose(A @ x, b))`, notes: [{ at: "np.allclose", text: "float equality with a tolerance" }] },
            { code: `A = np.array([[1.0, 1.0], [1.0, 2.0], [1.0, 3.0]])
y = np.array([1.0, 2.0, 2.0])
coef = np.linalg.lstsq(A, y)[0]`, notes: [{ at: "lstsq", text: "least squares for tall systems" }] }
          ]
        },
        {
          id: "inverse-determinant", n: 3, title: "inverse and determinant", level: 2,
          gloss: "Computes the inverse and determinant of a square matrix.",
          examples: [
            { code: `A = np.array([[4.0, 7.0], [2.0, 6.0]])
inv_a = np.linalg.inv(A)`, notes: [] },
            { code: `A = np.array([[4.0, 7.0], [2.0, 6.0]])
d = np.linalg.det(A)`, notes: [{ at: "np.linalg.det", text: "zero means no inverse exists" }] },
            { code: `A = np.array([[4.0, 7.0], [2.0, 6.0]])
inv_a = np.linalg.inv(A)
print(np.allclose(A @ inv_a, np.eye(2)))`, notes: [] }
          ]
        },
        {
          id: "norms-eigen", n: 4, title: "norms and eigenvalues", level: 3,
          gloss: "Measures vector length and finds eigenvalues.",
          examples: [
            { code: `v = np.array([3.0, 4.0])
length = np.linalg.norm(v)`, notes: [{ at: "np.linalg.norm", text: "5.0 for a 3-4-5 triangle" }] },
            { code: `A = np.array([[2.0, 0.0], [0.0, 3.0]])
vals, vecs = np.linalg.eig(A)`, notes: [] },
            { code: `A = np.array([[2.0, 0.0], [0.0, 3.0]])
u, s, vt = np.linalg.svd(A)`, notes: [{ at: "np.linalg.svd", text: "singular value decomposition" }] }
          ]
        },
        {
          id: "vector-products", n: 5, title: "dot, outer and cross", level: 2,
          gloss: "Combines two vectors into a scalar, a matrix or a perpendicular vector.",
          examples: [
            { code: `a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a @ b)`, notes: [{ at: "a @ b", text: "dot product of two vectors" }] },
            { code: `a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
table = np.outer(a, b)`, notes: [] },
            { code: `a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(np.cross(a, b))`, notes: [{ at: "np.cross", text: "needs 3-element vectors" }] }
          ]
        }
      ]
    },
    {
      id: "random-generator",
      n: 11,
      title: "random Generator",
      concepts: [
        {
          id: "default-rng", n: 1, title: "default_rng", level: 2,
          gloss: "Creates a random generator, optionally seeded for repeatability.",
          examples: [
            { code: `rng = np.random.default_rng(42)`, notes: [{ at: "42", text: "the same seed gives the same numbers" }] },
            { code: `rng = np.random.default_rng()`, notes: [{ at: "default_rng()", text: "seeded from the operating system" }] },
            { code: `x = np.random.default_rng(7).random(3)`, notes: [] }
          ]
        },
        {
          id: "random-draws", n: 2, title: "drawing numbers", level: 2,
          gloss: "Draws uniform, integer and normal samples from a generator.",
          examples: [
            { code: `rng = np.random.default_rng(0)
u = rng.random(5)`, notes: [{ at: ".random(5)", text: "floats in [0, 1)" }] },
            { code: `rng = np.random.default_rng(0)
dice = rng.integers(1, 7, size=10)`, notes: [{ at: "1, 7", text: "high is exclusive" }] },
            { code: `rng = np.random.default_rng(0)
z = rng.normal(loc=0, scale=1, size=100)`, notes: [] }
          ]
        },
        {
          id: "choice-shuffle", n: 3, title: "choice and shuffle", level: 2,
          gloss: "Samples from an array or shuffles it.",
          examples: [
            { code: `rng = np.random.default_rng(1)
pick = rng.choice(["a", "b", "c"])`, notes: [] },
            { code: `rng = np.random.default_rng(1)
deck = np.arange(5)
rng.shuffle(deck)`, notes: [{ at: ".shuffle(", text: "shuffles in place" }] },
            { code: `rng = np.random.default_rng(1)
sample = rng.choice(10, size=3, replace=False)`, notes: [{ at: "replace=False", text: "no repeats" }] }
          ]
        },
        {
          id: "independent-streams", n: 4, title: "independent streams", level: 3,
          gloss: "Creates separate generators that do not overlap, for parallel work.",
          examples: [
            { code: `parent = np.random.SeedSequence(123)
children = parent.spawn(3)`, notes: [{ at: ".spawn(3)", text: "three independent seeds" }] },
            { code: `parent = np.random.SeedSequence(123)
gens = [np.random.default_rng(s) for s in parent.spawn(3)]`, notes: [] },
            { code: `rng = np.random.default_rng(5)
order = rng.permutation(5)`, notes: [{ at: ".permutation(5)", text: "a shuffled copy of 0 to 4" }] }
          ]
        }
      ]
    },
    {
      id: "stack-concatenate",
      n: 12,
      title: "stack & concatenate",
      concepts: [
        {
          id: "concatenate", n: 1, title: "concatenate", level: 1,
          gloss: "Joins arrays along an existing axis.",
          examples: [
            { code: `a = np.array([1, 2])
b = np.array([3, 4])
c = np.concatenate([a, b])`, notes: [] },
            { code: `m = np.ones((2, 2))
tall = np.concatenate([m, m], axis=0)`, notes: [{ at: "axis=0", text: "stacks rows downward" }] },
            { code: `a = np.array([1, 2])
b = np.array([3, 4])
c = np.concat([a, b])`, notes: [{ at: "np.concat", text: "a NumPy 2 alias of concatenate" }] }
          ]
        },
        {
          id: "stack", n: 2, title: "stack", level: 2,
          gloss: "Joins arrays along a new axis.",
          examples: [
            { code: `a = np.array([1, 2])
b = np.array([3, 4])
m = np.stack([a, b])`, notes: [{ at: "np.stack", text: "makes a new first axis" }] },
            { code: `a = np.array([1, 2])
b = np.array([3, 4])
cols = np.stack([a, b], axis=1)`, notes: [] },
            { code: `a = np.array([1, 2])
b = np.array([3, 4])
print(np.stack([a, b]).shape)`, notes: [] }
          ]
        },
        {
          id: "vstack-hstack", n: 3, title: "vstack and hstack", level: 1,
          gloss: "Stacks arrays vertically or horizontally.",
          examples: [
            { code: `a = np.array([1, 2])
b = np.array([3, 4])
rows = np.vstack([a, b])`, notes: [] },
            { code: `a = np.array([1, 2])
b = np.array([3, 4])
flat = np.hstack([a, b])`, notes: [] },
            { code: `a = np.array([1, 2])
b = np.array([3, 4])
cols = np.column_stack([a, b])`, notes: [{ at: "np.column_stack", text: "1-D inputs become columns" }] }
          ]
        },
        {
          id: "splitting", n: 4, title: "splitting", level: 2,
          gloss: "Cuts an array into equal or uneven pieces.",
          examples: [
            { code: `a = np.arange(6)
parts = np.split(a, 3)`, notes: [{ at: "3", text: "three equal pieces" }] },
            { code: `a = np.arange(6)
head, tail = np.split(a, [2])`, notes: [{ at: "[2]", text: "cut before index 2" }] },
            { code: `m = np.arange(8).reshape(2, 4)
left, right = np.hsplit(m, 2)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "where-select",
      n: 13,
      title: "where & select",
      concepts: [
        {
          id: "where-three", n: 1, title: "np.where", level: 1,
          gloss: "Chooses between two values for each element based on a condition.",
          examples: [
            { code: `a = np.array([3, -1, 4])
out = np.where(a > 0, a, 0)`, notes: [{ at: "a > 0, a, 0", text: "condition, if true, if false" }] },
            { code: `a = np.array([3, -1, 4])
labels = np.where(a > 0, "pos", "neg")`, notes: [] },
            { code: `scores = np.array([55, 82, 91])
grade = np.where(scores >= 60, "pass", "fail")`, notes: [] }
          ]
        },
        {
          id: "where-one", n: 2, title: "np.where with one argument", level: 2,
          gloss: "Returns the indices where a condition is true.",
          examples: [
            { code: `a = np.array([3, 8, 1, 9])
idx = np.where(a > 4)[0]`, notes: [{ at: "[0]", text: "the tuple holds one array per axis" }] },
            { code: `rows, cols = np.where(np.eye(3) == 1)`, notes: [] },
            { code: `a = np.array([3, 8, 1, 9])
first = np.argmax(a > 4)`, notes: [{ at: "np.argmax", text: "the first True in a boolean array" }] }
          ]
        },
        {
          id: "select", n: 3, title: "np.select", level: 2,
          gloss: "Picks from several choices with a list of conditions.",
          examples: [
            { code: `a = np.arange(10)
conds = [a < 3, a < 7]
out = np.select(conds, ["low", "mid"], default="high")`, notes: [{ at: "default=", text: "used when no condition matches" }] },
            { code: `a = np.arange(10)
bands = np.select([a % 2 == 0], [a], default=-1)`, notes: [] },
            { code: `a = np.arange(10)
size = np.select([a < 5, a < 8], [0, 1], 2)`, notes: [{ at: "[a < 5, a < 8]", text: "the first true condition wins" }] }
          ]
        },
        {
          id: "clipping", n: 4, title: "clipping", level: 1,
          gloss: "Limits values to a range.",
          examples: [
            { code: `a = np.array([-5, 3, 12])
print(np.clip(a, 0, 10))`, notes: [{ at: "0, 10", text: "lower and upper limits" }] },
            { code: `a = np.array([-5, 3, 12])
print(a.clip(min=0))`, notes: [] },
            { code: `a = np.array([-5, 3, 12])
print(np.minimum(a, 10))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "sort-argsort",
      n: 14,
      title: "sort & argsort",
      concepts: [
        {
          id: "sort", n: 1, title: "sort", level: 1,
          gloss: "Returns a sorted copy of an array.",
          examples: [
            { code: `a = np.array([3, 1, 4, 1, 5])
b = np.sort(a)`, notes: [] },
            { code: `a = np.array([3, 1, 4, 1, 5])
a.sort()`, notes: [{ at: ".sort()", text: "sorts in place and returns None" }] },
            { code: `a = np.array([3, 1, 4, 1, 5])
desc = np.sort(a)[::-1]`, notes: [{ at: "[::-1]", text: "reverses the sorted order" }] }
          ]
        },
        {
          id: "argsort", n: 2, title: "argsort", level: 2,
          gloss: "Returns the indices that would sort an array.",
          examples: [
            { code: `a = np.array([30, 10, 20])
order = np.argsort(a)`, notes: [{ at: "np.argsort", text: "indices, not values" }] },
            { code: `a = np.array([30, 10, 20])
names = np.array(["c", "a", "b"])
ranked = names[np.argsort(a)]`, notes: [{ at: "names[np.argsort(a)]", text: "reorders one array by another" }] },
            { code: `a = np.array([30, 10, 20])
top2 = np.argsort(a)[-2:]`, notes: [] }
          ]
        },
        {
          id: "sorting-axis", n: 3, title: "sorting along an axis", level: 2,
          gloss: "Sorts each row or column of a matrix independently.",
          examples: [
            { code: `m = np.array([[3, 1, 2], [9, 7, 8]])
rows = np.sort(m, axis=1)`, notes: [] },
            { code: `m = np.array([[3, 1, 2], [9, 7, 8]])
cols = np.sort(m, axis=0)`, notes: [] },
            { code: `m = np.array([[3, 1, 2], [9, 7, 8]])
order = np.argsort(m, axis=1)`, notes: [] }
          ]
        },
        {
          id: "unique-searchsorted", n: 4, title: "unique and searchsorted", level: 2,
          gloss: "Finds distinct values and insertion points in sorted data.",
          examples: [
            { code: `a = np.array([3, 1, 3, 2, 1])
vals = np.unique(a)`, notes: [{ at: "np.unique", text: "sorted distinct values" }] },
            { code: `a = np.array([3, 1, 3, 2, 1])
vals, counts = np.unique(a, return_counts=True)`, notes: [{ at: "return_counts=True", text: "how often each value occurs" }] },
            { code: `pos = np.searchsorted(np.array([10, 20, 30]), 25)`, notes: [{ at: "25", text: "would be inserted at index 2" }] }
          ]
        },
        {
          id: "partition", n: 5, title: "partition", level: 3,
          gloss: "Finds the k smallest values without a full sort.",
          examples: [
            { code: `a = np.array([9, 2, 7, 4])
smallest = np.partition(a, 1)[:2]`, notes: [{ at: "np.partition", text: "the two smallest, in no set order" }] },
            { code: `a = np.array([9, 2, 7, 4])
idx = np.argpartition(a, 1)[:2]`, notes: [] },
            { code: `a = np.array([9, 2, 7, 4])
kth = np.partition(a, 2)[2]`, notes: [{ at: "[2]", text: "the third smallest value" }] }
          ]
        }
      ]
    },
    {
      id: "save-load",
      n: 15,
      title: "save & load",
      concepts: [
        {
          id: "npy-files", n: 1, title: "save and load", level: 1,
          gloss: "Writes an array to a binary file and reads it back.",
          examples: [
            { code: `a = np.arange(5)
np.save("data.npy", a)`, notes: [{ at: "np.save", text: "writes the .npy format" }] },
            { code: `np.save("data.npy", np.arange(5))
b = np.load("data.npy")`, notes: [] },
            { code: `np.save("data.npy", np.arange(5))
m = np.load("data.npy", mmap_mode="r")`, notes: [{ at: 'mmap_mode="r"', text: "maps the file instead of loading it" }] }
          ]
        },
        {
          id: "npz-archives", n: 2, title: "savez", level: 2,
          gloss: "Stores several named arrays in one archive.",
          examples: [
            { code: `np.savez("pack.npz", x=np.arange(3), y=np.ones(2))`, notes: [{ at: "x=", text: "each keyword becomes a name" }] },
            { code: `np.savez_compressed("pack.npz", x=np.arange(1000))`, notes: [{ at: "savez_compressed", text: "smaller file, slower to write" }] },
            { code: `np.savez("pack.npz", x=np.arange(3))
with np.load("pack.npz") as pack:
    x = pack["x"]`, notes: [{ at: "with np.load", text: "closes the archive when done" }] }
          ]
        },
        {
          id: "text-files", n: 3, title: "text files", level: 1,
          gloss: "Reads and writes plain-text numbers with loadtxt and savetxt.",
          examples: [
            { code: `m = np.arange(6).reshape(2, 3)
np.savetxt("nums.csv", m, delimiter=",")`, notes: [{ at: 'delimiter=","', text: "comma-separated columns" }] },
            { code: `np.savetxt("nums.csv", np.ones((2, 3)), delimiter=",")
m = np.loadtxt("nums.csv", delimiter=",")`, notes: [] },
            { code: `np.savetxt("nums.csv", np.ones((2, 3)), delimiter=",")
m = np.loadtxt("nums.csv", delimiter=",", usecols=(0, 2))`, notes: [{ at: "usecols=(0, 2)", text: "reads only these columns" }] }
          ]
        },
        {
          id: "genfromtxt", n: 4, title: "text with gaps", level: 2,
          gloss: "Loads text that has missing fields with genfromtxt.",
          examples: [
            { code: `with open("raw.csv", "w") as f:
    f.write("1,2\\n3,\\n")
m = np.genfromtxt("raw.csv", delimiter=",")`, notes: [{ at: "genfromtxt", text: "gaps become nan" }] },
            { code: `with open("raw.csv", "w") as f:
    f.write("1,2\\n3,\\n")
m = np.genfromtxt("raw.csv", delimiter=",", filling_values=0)`, notes: [{ at: "filling_values=0", text: "the value used for gaps" }] },
            { code: `with open("raw.csv", "w") as f:
    f.write("a,b\\n1,2\\n")
m = np.genfromtxt("raw.csv", delimiter=",", skip_header=1)`, notes: [{ at: "skip_header=1", text: "ignores the header line" }] }
          ]
        }
      ]
    }
  ]
};
