export default {
  id: "pandas",
  name: "pandas",
  short: "PD",
  pigment: "pandas",
  family: "python",
  version: "2.2",
  lexer: "python",
  indent: 4,
  topics: [
    {
      id: "series-dataframe",
      n: 1,
      title: "Series & DataFrame",
      concepts: [
        {
          id: "series", n: 1, title: "Series", level: 1,
          gloss: "Holds a labeled one-dimensional column of values.",
          examples: [
            { code: `s = pd.Series([3, 1, 4], name="count")`, notes: [{ at: "name=", text: "the label of the column" }] },
            { code: `prices = pd.Series({"apple": 0.5, "pear": 0.75})`, notes: [{ at: "{", text: "dict keys become the index" }] },
            { code: `s = pd.Series([3, 1, 4], index=["a", "b", "c"])
value = s["b"]`, notes: [{ at: 's["b"]', text: "lookup by label" }] }
          ]
        },
        {
          id: "creating-dataframes", n: 2, title: "creating a DataFrame", level: 1,
          gloss: "Builds a table from a dict of columns.",
          examples: [
            { code: `people = pd.DataFrame({"name": ["ada", "lin"], "age": [36, 29]})`, notes: [{ at: '"age": [36, 29]', text: "one list per column" }] },
            { code: `rows = [{"name": "ada", "age": 36}, {"name": "lin", "age": 29}]
people = pd.DataFrame(rows)`, notes: [{ at: "pd.DataFrame(rows)", text: "a list of dicts gives one row each" }] },
            { code: `frame = pd.DataFrame(np.zeros((3, 2)), columns=["x", "y"])`, notes: [] }
          ]
        },
        {
          id: "inspecting", n: 3, title: "inspecting data", level: 1,
          gloss: "Summarizes a frame with head, info and describe.",
          examples: [
            { code: `df.head(3)`, notes: [{ at: "head(3)", text: "the first three rows" }] },
            { code: `df.info()`, notes: [{ at: "info()", text: "dtypes and non-null counts" }] },
            { code: `df.describe()`, notes: [{ at: "describe()", text: "count, mean, std and quartiles" }] }
          ]
        },
        {
          id: "selecting-columns", n: 4, title: "selecting columns", level: 1,
          gloss: "Pulls out one column as a Series or several as a DataFrame.",
          examples: [
            { code: `ages = df["age"]`, notes: [{ at: '["age"]', text: "one name gives a Series" }] },
            { code: `subset = df[["name", "age"]]`, notes: [{ at: "[[", text: "a list gives a DataFrame" }] },
            { code: `rows, cols = df.shape`, notes: [{ at: ".shape", text: "a tuple of rows and columns" }] }
          ]
        }
      ]
    },
    {
      id: "read-write",
      n: 2,
      title: "read & write",
      concepts: [
        {
          id: "read-csv", n: 1, title: "read_csv", level: 1,
          gloss: "Loads a CSV file into a DataFrame.",
          examples: [
            { code: `sales = pd.read_csv("sales.csv")`, notes: [] },
            { code: `sales = pd.read_csv("sales.csv", usecols=["city", "price"])`, notes: [{ at: "usecols", text: "loads only these columns" }] },
            { code: `sales = pd.read_csv("sales.csv", parse_dates=["date"])`, notes: [{ at: "parse_dates", text: "converts text to datetimes" }] }
          ]
        },
        {
          id: "to-csv", n: 2, title: "to_csv", level: 1,
          gloss: "Writes a DataFrame to a CSV file.",
          examples: [
            { code: `df.to_csv("out.csv", index=False)`, notes: [{ at: "index=False", text: "leaves out the row labels" }] },
            { code: `df[["name", "age"]].to_csv("people.csv", index=False)`, notes: [] },
            { code: `df.to_csv("out.tsv", sep="\\t", index=False)`, notes: [{ at: 'sep="\\t"', text: "tab-separated output" }] }
          ]
        },
        {
          id: "parquet", n: 3, title: "parquet", level: 2,
          gloss: "Reads and writes a compact columnar file format.",
          examples: [
            { code: `df.to_parquet("data.parquet")`, notes: [{ at: "to_parquet", text: "needs pyarrow or fastparquet" }] },
            { code: `table = pd.read_parquet("data.parquet")`, notes: [] },
            { code: `table = pd.read_parquet("data.parquet", columns=["city", "price"])`, notes: [{ at: "columns=", text: "reads only these columns" }] }
          ]
        },
        {
          id: "read-options", n: 4, title: "read_csv options", level: 2,
          gloss: "Controls types, missing values and chunking while reading.",
          examples: [
            { code: `sales = pd.read_csv("sales.csv", dtype={"qty": "int32"})`, notes: [] },
            { code: `sales = pd.read_csv("sales.csv", na_values=["n/a", "-"])`, notes: [{ at: "na_values", text: "extra strings that mean missing" }] },
            { code: `for chunk in pd.read_csv("sales.csv", chunksize=2):
    print(len(chunk))`, notes: [{ at: "chunksize=2", text: "yields frames of up to 2 rows" }] }
          ]
        }
      ]
    },
    {
      id: "loc-iloc",
      n: 3,
      title: "loc & iloc",
      concepts: [
        {
          id: "loc", n: 1, title: "loc", level: 1,
          gloss: "Selects rows and columns by label.",
          examples: [
            { code: `row = df.loc[2]`, notes: [] },
            { code: `cell = df.loc[2, "name"]`, notes: [{ at: 'df.loc[2, "name"]', text: "row label, then column label" }] },
            { code: `block = df.loc[1:3, ["name", "age"]]`, notes: [{ at: "1:3", text: "label slices include both ends" }] }
          ]
        },
        {
          id: "iloc", n: 2, title: "iloc", level: 1,
          gloss: "Selects rows and columns by integer position.",
          examples: [
            { code: `first = df.iloc[0]`, notes: [] },
            { code: `corner = df.iloc[:3, :2]`, notes: [{ at: ":3", text: "position slices stop before 3" }] },
            { code: `last = df.iloc[-1]`, notes: [{ at: "-1", text: "counts from the end" }] }
          ]
        },
        {
          id: "assigning-with-loc", n: 3, title: "assigning with loc", level: 2,
          gloss: "Sets values for selected rows and columns in one safe step.",
          examples: [
            { code: `df.loc[df["age"] > 40, "senior"] = True`, notes: [{ at: 'df["age"] > 40', text: "a mask picks the rows" }] },
            { code: `df.loc[0, "price"] = 10.0`, notes: [] },
            { code: `df.loc[df["score"].isna(), "score"] = 0.0`, notes: [] }
          ]
        },
        {
          id: "using-an-index", n: 4, title: "using an index", level: 2,
          gloss: "Moves a column into the index to select rows by key.",
          examples: [
            { code: `people = df.set_index("name")`, notes: [] },
            { code: `people = df.set_index("name")
row = people.loc["ada"]`, notes: [{ at: 'people.loc["ada"]', text: "lookup by the index key" }] },
            { code: `people = df.set_index("name")
flat = people.reset_index()`, notes: [{ at: "reset_index()", text: "moves the index back to a column" }] }
          ]
        }
      ]
    },
    {
      id: "filtering-query",
      n: 4,
      title: "boolean filtering & query",
      concepts: [
        {
          id: "boolean-masks", n: 1, title: "boolean masks", level: 1,
          gloss: "Keeps the rows where a condition is true.",
          examples: [
            { code: `adults = df[df["age"] >= 30]`, notes: [{ at: 'df["age"] >= 30', text: "a Series of True and False" }] },
            { code: `mask = df["city"] == "paris"
paris = df[mask]`, notes: [] },
            { code: `cheap = df[df["price"] < 10]`, notes: [] }
          ]
        },
        {
          id: "combining-conditions", n: 2, title: "combining conditions", level: 1,
          gloss: "Joins conditions with & and | inside parentheses.",
          examples: [
            { code: `both = df[(df["age"] > 30) & (df["price"] < 15)]`, notes: [{ at: "&", text: "and: wrap each test in parentheses" }] },
            { code: `either = df[(df["city"] == "oslo") | (df["city"] == "rome")]`, notes: [{ at: "|", text: "or" }] },
            { code: `not_paris = df[~(df["city"] == "paris")]`, notes: [{ at: "~", text: "negates the mask" }] }
          ]
        },
        {
          id: "isin-between", n: 3, title: "isin and between", level: 1,
          gloss: "Tests membership in a list or a range of values.",
          examples: [
            { code: `picked = df[df["city"].isin(["oslo", "rome"])]`, notes: [] },
            { code: `mid = df[df["age"].between(25, 40)]`, notes: [{ at: ".between(25, 40)", text: "inclusive on both ends" }] },
            { code: `others = df[~df["category"].isin(["a"])]`, notes: [] }
          ]
        },
        {
          id: "query", n: 4, title: "query", level: 2,
          gloss: "Filters rows with a readable string expression.",
          examples: [
            { code: `adults = df.query("age >= 30")`, notes: [] },
            { code: `local = df.query("city == 'paris' and price < 10")`, notes: [{ at: "and", text: "plain and, or and not work here" }] },
            { code: `limit = 12
cheap = df.query("price < @limit")`, notes: [{ at: "@limit", text: "refers to a Python variable" }] }
          ]
        }
      ]
    },
    {
      id: "new-columns",
      n: 5,
      title: "assign & new columns",
      concepts: [
        {
          id: "assign", n: 1, title: "assign", level: 1,
          gloss: "Returns a copy with new or replaced columns.",
          examples: [
            { code: `out = df.assign(total=df["price"] * df["qty"])`, notes: [{ at: "total=", text: "the keyword becomes the column name" }] },
            { code: `out = df.assign(age_next=lambda d: d["age"] + 1)`, notes: [{ at: "lambda d", text: "receives the frame so far" }] },
            { code: `out = df.assign(price=df["price"].round(), flag=True)`, notes: [] }
          ]
        },
        {
          id: "bracket-assignment", n: 2, title: "bracket assignment", level: 1,
          gloss: "Adds a column directly onto an existing DataFrame.",
          examples: [
            { code: `df["total"] = df["price"] * df["qty"]`, notes: [] },
            { code: `df["country"] = "fr"`, notes: [{ at: '"fr"', text: "a scalar fills every row" }] },
            { code: `df["rank"] = df["score"].rank()`, notes: [] }
          ]
        },
        {
          id: "conditional-columns", n: 3, title: "conditional columns", level: 2,
          gloss: "Sets a column from a condition with np.where or cut.",
          examples: [
            { code: `df["tier"] = np.where(df["price"] > 15, "high", "low")`, notes: [{ at: "np.where", text: "condition, if true, if false" }] },
            { code: `df["capped"] = df["price"].clip(upper=20)`, notes: [{ at: "upper=20", text: "values above 20 become 20" }] },
            { code: `bins = [0, 30, 50, 120]
df["band"] = pd.cut(df["age"], bins, labels=["y", "m", "s"])`, notes: [{ at: "pd.cut", text: "sorts numbers into labeled ranges" }] }
          ]
        },
        {
          id: "rename-drop", n: 4, title: "rename and drop", level: 1,
          gloss: "Renames columns or removes them without changing the original.",
          examples: [
            { code: `out = df.rename(columns={"qty": "quantity"})`, notes: [{ at: "columns=", text: "old name to new name" }] },
            { code: `out = df.drop(columns=["notes", "email"])`, notes: [] },
            { code: `out = df.drop(index=[0, 1])`, notes: [{ at: "index=", text: "drops rows by label" }] }
          ]
        }
      ]
    },
    {
      id: "vectorized-apply",
      n: 6,
      title: "vectorized ops vs apply",
      concepts: [
        {
          id: "vectorized-arithmetic", n: 1, title: "vectorized arithmetic", level: 1,
          gloss: "Computes on whole columns at once instead of looping.",
          examples: [
            { code: `total = df["price"] * df["qty"]`, notes: [{ at: "*", text: "multiplies matching rows" }] },
            { code: `tax = df["price"] * 0.2`, notes: [] },
            { code: `df["age_months"] = df["age"] * 12`, notes: [] }
          ]
        },
        {
          id: "apply", n: 2, title: "apply", level: 2,
          gloss: "Calls a Python function on each value or row when no vectorized form exists.",
          examples: [
            { code: `labels = df["name"].apply(lambda n: n.upper())`, notes: [] },
            { code: `row_totals = df.apply(lambda r: r["price"] * r["qty"], axis=1)`, notes: [{ at: "axis=1", text: "passes one row at a time" }] },
            { code: `df["bucket"] = df["age"].apply(lambda a: "old" if a > 40 else "young")`, notes: [] }
          ]
        },
        {
          id: "map", n: 3, title: "map", level: 2,
          gloss: "Replaces each value using a dict or a function.",
          examples: [
            { code: `codes = {"paris": "PAR", "oslo": "OSL", "rome": "ROM"}
df["city_code"] = df["city"].map(codes)`, notes: [{ at: ".map(codes)", text: "unmatched values become NaN" }] },
            { code: `sizes = df["name"].map(len)`, notes: [] },
            { code: `out = df[["price", "qty"]].map(lambda x: x * 2)`, notes: [{ at: ".map(", text: "the frame method that replaced applymap" }] }
          ]
        },
        {
          id: "avoiding-loops", n: 4, title: "avoiding loops", level: 2,
          gloss: "Prefers column expressions over iterating rows.",
          examples: [
            { code: `df["is_big"] = df["qty"] >= 3`, notes: [{ at: ">= 3", text: "compares every row at once" }] },
            { code: `total = (df["price"] * df["qty"]).sum()`, notes: [] },
            { code: `top = df["score"].where(df["score"] > 80)`, notes: [{ at: ".where(", text: "keeps matches, others become NaN" }] }
          ]
        }
      ]
    },
    {
      id: "groupby-agg",
      n: 7,
      title: "groupby & agg",
      concepts: [
        {
          id: "groupby", n: 1, title: "groupby", level: 2,
          gloss: "Splits rows by key, applies a function and combines the results.",
          examples: [
            { code: `df.groupby("city")["price"].mean()`, notes: [{ at: '["price"]', text: "the column to summarize" }] },
            { code: `df.groupby("category")["qty"].sum()`, notes: [] },
            { code: `df.groupby(["city", "category"])["price"].max()`, notes: [{ at: '["city", "category"]', text: "one group per pair" }] }
          ]
        },
        {
          id: "agg", n: 2, title: "agg", level: 2,
          gloss: "Computes several statistics per group in one call.",
          examples: [
            { code: `df.groupby("city")["price"].agg(["min", "max"])`, notes: [] },
            { code: `df.groupby("city").agg({"price": "mean", "qty": "sum"})`, notes: [{ at: '{"price": "mean"', text: "a function per column" }] },
            { code: `df.groupby("city")["price"].agg(["mean", "std"]).round(2)`, notes: [] }
          ]
        },
        {
          id: "transform", n: 3, title: "transform", level: 3,
          gloss: "Returns a result as long as the input, such as the group mean on every row.",
          examples: [
            { code: `df["city_avg"] = df.groupby("city")["price"].transform("mean")`, notes: [{ at: "transform", text: "keeps one value per original row" }] },
            { code: `df["share"] = df["price"] / df.groupby("city")["price"].transform("sum")`, notes: [] },
            { code: `df["rank_in_city"] = df.groupby("city")["price"].rank()`, notes: [] }
          ]
        },
        {
          id: "size-count", n: 4, title: "size and count", level: 1,
          gloss: "Counts rows per group with size, or non-null values with count.",
          examples: [
            { code: `df.groupby("city").size()`, notes: [{ at: ".size()", text: "counts rows, missing or not" }] },
            { code: `df.groupby("city")["score"].count()`, notes: [{ at: ".count()", text: "skips missing values" }] },
            { code: `df["city"].value_counts()`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "named-aggregation",
      n: 8,
      title: "named aggregation",
      concepts: [
        {
          id: "named-agg", n: 1, title: "named aggregation", level: 2,
          gloss: "Names each output column with keyword arguments to agg.",
          examples: [
            { code: `df.groupby("city").agg(avg_price=("price", "mean"))`, notes: [{ at: '("price", "mean")', text: "source column, then function" }] },
            { code: `df.groupby("city").agg(
    avg_price=("price", "mean"),
    total_qty=("qty", "sum"),
)`, notes: [] },
            { code: `df.groupby("category").agg(n=("name", "count"))`, notes: [] }
          ]
        },
        {
          id: "custom-aggregations", n: 2, title: "custom aggregations", level: 3,
          gloss: "Aggregates with a function you write.",
          examples: [
            { code: `df.groupby("city").agg(
    spread=("price", lambda x: x.max() - x.min()),
)`, notes: [{ at: "lambda x", text: "receives each group's column" }] },
            { code: `df.groupby("city")["age"].agg(lambda s: s.median())`, notes: [] },
            { code: `def spread(x):
    return x.max() - x.min()

stats = df.groupby("city")["price"].agg(spread)`, notes: [] }
          ]
        },
        {
          id: "flat-results", n: 3, title: "flat results", level: 2,
          gloss: "Turns group keys back into ordinary columns.",
          examples: [
            { code: `out = df.groupby("city")["price"].mean().reset_index()`, notes: [] },
            { code: `out = df.groupby("city", as_index=False)["price"].mean()`, notes: [{ at: "as_index=False", text: "keeps the keys as columns" }] },
            { code: `out = df.groupby("city").agg(avg=("price", "mean")).reset_index()`, notes: [] }
          ]
        },
        {
          id: "sorting-results", n: 4, title: "sorting results", level: 2,
          gloss: "Orders grouped results by their values.",
          examples: [
            { code: `df.groupby("city")["price"].mean().sort_values(ascending=False)`, notes: [] },
            { code: `df.groupby("city")["qty"].sum().nlargest(2)`, notes: [{ at: ".nlargest(2)", text: "the two biggest groups" }] },
            { code: `df["city"].value_counts().head(2)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "merge-join",
      n: 9,
      title: "merge & join",
      concepts: [
        {
          id: "merge", n: 1, title: "merge", level: 2,
          gloss: "Combines two tables on matching key columns.",
          examples: [
            { code: `merged = left.merge(right, on="key")`, notes: [{ at: 'on="key"', text: "the column present in both" }] },
            { code: `merged = customers.merge(orders, left_on="id", right_on="customer_id")`, notes: [{ at: "left_on", text: "key names that differ per side" }] },
            { code: `merged = pd.merge(left, right, on="key")`, notes: [] }
          ]
        },
        {
          id: "join-types", n: 2, title: "join types", level: 2,
          gloss: "Chooses which unmatched rows to keep with how.",
          examples: [
            { code: `out = left.merge(right, on="key", how="left")`, notes: [{ at: 'how="left"', text: "keeps every row of the left frame" }] },
            { code: `out = left.merge(right, on="key", how="outer")`, notes: [{ at: 'how="outer"', text: "keeps rows from both sides" }] },
            { code: `out = left.merge(right, on="key", how="inner")`, notes: [{ at: 'how="inner"', text: "only keys found in both" }] }
          ]
        },
        {
          id: "indicator-validate", n: 3, title: "indicator and validate", level: 3,
          gloss: "Tracks where rows came from and checks that keys are unique.",
          examples: [
            { code: `out = left.merge(right, on="key", how="outer", indicator=True)`, notes: [{ at: "indicator=True", text: "adds a _merge column" }] },
            { code: `out = left.merge(right, on="key", suffixes=("_l", "_r"))`, notes: [{ at: "suffixes", text: "renames overlapping columns" }] },
            { code: `check = left.merge(right, on="key", validate="one_to_one")`, notes: [{ at: "validate", text: "raises if keys are not unique" }] }
          ]
        },
        {
          id: "join", n: 4, title: "join", level: 2,
          gloss: "Combines tables on the index with DataFrame.join.",
          examples: [
            { code: `joined = left.set_index("key").join(right.set_index("key"))`, notes: [] },
            { code: `joined = left.set_index("key").join(right.set_index("key"), how="inner")`, notes: [] },
            { code: `joined = left.join(right.set_index("key"), on="key")`, notes: [{ at: 'on="key"', text: "matches a column against the index" }] }
          ]
        }
      ]
    },
    {
      id: "concat",
      n: 10,
      title: "concat",
      concepts: [
        {
          id: "stacking-rows", n: 1, title: "stacking rows", level: 1,
          gloss: "Appends frames one after another with concat.",
          examples: [
            { code: `both = pd.concat([jan, feb])`, notes: [{ at: "[jan, feb]", text: "a list of frames" }] },
            { code: `both = pd.concat([jan, feb], ignore_index=True)`, notes: [{ at: "ignore_index=True", text: "renumbers the rows" }] },
            { code: `parts = [jan, feb, jan]
all_rows = pd.concat(parts, ignore_index=True)`, notes: [] }
          ]
        },
        {
          id: "side-by-side", n: 2, title: "side by side", level: 2,
          gloss: "Joins frames next to each other by index with axis one.",
          examples: [
            { code: `wide = pd.concat([jan, feb], axis=1)`, notes: [{ at: "axis=1", text: "columns instead of rows" }] },
            { code: `wide = pd.concat([df["name"], df["age"]], axis=1)`, notes: [] },
            { code: `wide = pd.concat([jan, feb], axis=1, keys=["jan", "feb"])`, notes: [] }
          ]
        },
        {
          id: "labeling-sources", n: 3, title: "labeling sources", level: 2,
          gloss: "Adds an outer index level that records where each row came from.",
          examples: [
            { code: `both = pd.concat([jan, feb], keys=["jan", "feb"])`, notes: [{ at: "keys=", text: "one label per frame" }] },
            { code: `both = pd.concat([jan, feb], keys=["jan", "feb"])
jan_rows = both.loc["jan"]`, notes: [] },
            { code: `both = pd.concat({"jan": jan, "feb": feb}).reset_index(level=0)`, notes: [{ at: "level=0", text: "turns the label into a column" }] }
          ]
        },
        {
          id: "mismatched-columns", n: 4, title: "mismatched columns", level: 2,
          gloss: "Keeps the union of columns by default, or only shared ones with an inner join.",
          examples: [
            { code: `pd.concat([jan, extra])`, notes: [{ at: "extra", text: "has a column jan lacks" }] },
            { code: `pd.concat([jan, extra], join="inner")`, notes: [{ at: 'join="inner"', text: "keeps only shared columns" }] },
            { code: `pd.concat([jan, extra]).fillna("none")`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "pivot-melt",
      n: 11,
      title: "pivot_table & melt",
      concepts: [
        {
          id: "pivot-table", n: 1, title: "pivot_table", level: 2,
          gloss: "Summarizes values into a grid of rows and columns.",
          examples: [
            { code: `df.pivot_table(index="city", columns="category", values="price")`, notes: [{ at: "columns=", text: "its values become the columns" }] },
            { code: `df.pivot_table(index="city", values="qty", aggfunc="sum")`, notes: [{ at: "aggfunc", text: "the default is the mean" }] },
            { code: `df.pivot_table(
    index="city", columns="category",
    values="qty", aggfunc="sum", fill_value=0,
)`, notes: [{ at: "fill_value=0", text: "replaces empty cells" }] }
          ]
        },
        {
          id: "pivot", n: 2, title: "pivot", level: 2,
          gloss: "Reshapes long data to wide without aggregating.",
          examples: [
            { code: `wide = tidy.pivot(index="day", columns="k", values="v")`, notes: [{ at: "tidy.pivot", text: "each day and k pair must be unique" }] },
            { code: `wide = tidy.pivot(index="day", columns="k", values="v").reset_index()`, notes: [] },
            { code: `wide = tidy.set_index(["day", "k"])["v"].unstack()`, notes: [{ at: ".unstack()", text: "moves an index level into columns" }] }
          ]
        },
        {
          id: "melt", n: 3, title: "melt", level: 2,
          gloss: "Unpivots wide columns into long rows.",
          examples: [
            { code: `long = wide.melt(id_vars="id")`, notes: [{ at: 'id_vars="id"', text: "columns kept as identifiers" }] },
            { code: `long = wide.melt(id_vars="id", var_name="metric", value_name="amount")`, notes: [] },
            { code: `long = wide.melt(id_vars="id", value_vars=["x"])`, notes: [{ at: "value_vars", text: "only melt these columns" }] }
          ]
        },
        {
          id: "crosstab", n: 4, title: "crosstab", level: 2,
          gloss: "Counts how often each pair of categories occurs together.",
          examples: [
            { code: `pd.crosstab(df["city"], df["category"])`, notes: [] },
            { code: `pd.crosstab(df["city"], df["category"], normalize="index")`, notes: [{ at: 'normalize="index"', text: "each row sums to 1" }] },
            { code: `pd.crosstab(df["city"], df["active"], margins=True)`, notes: [{ at: "margins=True", text: "adds an All row and column" }] }
          ]
        }
      ]
    },
    {
      id: "missing-data",
      n: 12,
      title: "missing data",
      concepts: [
        {
          id: "detecting-missing", n: 1, title: "detecting missing values", level: 1,
          gloss: "Finds missing values with isna and counts them.",
          examples: [
            { code: `df["score"].isna()`, notes: [] },
            { code: `df.isna().sum()`, notes: [{ at: ".sum()", text: "each True counts as 1" }] },
            { code: `has_gap = df["score"].isna().any()`, notes: [] }
          ]
        },
        {
          id: "filling", n: 2, title: "filling", level: 1,
          gloss: "Replaces missing values with a constant or a statistic.",
          examples: [
            { code: `df["score"] = df["score"].fillna(0)`, notes: [] },
            { code: `df["score"] = df["score"].fillna(df["score"].mean())`, notes: [{ at: '.mean()', text: "mean skips missing values" }] },
            { code: `filled = df["score"].ffill()`, notes: [{ at: ".ffill()", text: "carries the last value forward" }] }
          ]
        },
        {
          id: "dropping", n: 3, title: "dropping", level: 1,
          gloss: "Removes rows or columns that contain missing values.",
          examples: [
            { code: `clean = df.dropna()`, notes: [{ at: "dropna()", text: "drops any row with a missing value" }] },
            { code: `clean = df.dropna(subset=["score"])`, notes: [{ at: "subset", text: "only these columns count" }] },
            { code: `clean = df.dropna(thresh=10)`, notes: [{ at: "thresh=10", text: "keeps rows with at least 10 values" }] }
          ]
        },
        {
          id: "interpolate-replace", n: 4, title: "interpolate and replace", level: 2,
          gloss: "Estimates gaps from neighbors or swaps sentinel values for NaN.",
          examples: [
            { code: `smooth = df["score"].interpolate()`, notes: [{ at: ".interpolate()", text: "linear between known points" }] },
            { code: `clean = df["qty"].replace(-1, np.nan)`, notes: [] },
            { code: `df["score"] = df["score"].replace(0, np.nan)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "datetimes",
      n: 13,
      title: "datetimes & resample",
      concepts: [
        {
          id: "to-datetime", n: 1, title: "to_datetime", level: 1,
          gloss: "Converts text into datetime values.",
          examples: [
            { code: `dates = pd.to_datetime(["2024-01-05", "2024-02-10"])`, notes: [] },
            { code: `df["signup"] = pd.to_datetime(df["signup"])`, notes: [] },
            { code: `when = pd.to_datetime("05/01/2024", format="%d/%m/%Y")`, notes: [{ at: 'format="%d/%m/%Y"', text: "day first, then month" }] }
          ]
        },
        {
          id: "dt-accessor", n: 2, title: "dt accessor", level: 1,
          gloss: "Reads parts of a datetime column such as year, month and weekday.",
          examples: [
            { code: `df["year"] = df["signup"].dt.year`, notes: [{ at: ".dt.", text: "datetime properties live here" }] },
            { code: `df["weekday"] = df["signup"].dt.day_name()`, notes: [] },
            { code: `df["month"] = df["signup"].dt.to_period("M")`, notes: [] }
          ]
        },
        {
          id: "resample", n: 3, title: "resample", level: 2,
          gloss: "Aggregates a time series into new time buckets.",
          examples: [
            { code: `ts["sales"].resample("W").sum()`, notes: [{ at: '"W"', text: "weekly buckets" }] },
            { code: `ts["sales"].resample("ME").mean()`, notes: [{ at: '"ME"', text: "month end; plain M is deprecated" }] },
            { code: `ts.resample("D").sum()`, notes: [] }
          ]
        },
        {
          id: "date-arithmetic", n: 4, title: "date arithmetic", level: 2,
          gloss: "Adds offsets and measures spans between dates.",
          examples: [
            { code: `df["renewal"] = df["signup"] + pd.Timedelta(days=365)`, notes: [] },
            { code: `df["days_since"] = (pd.Timestamp("2025-01-01") - df["signup"]).dt.days`, notes: [{ at: ".dt.days", text: "a Timedelta as whole days" }] },
            { code: `df["next_month"] = df["signup"] + pd.DateOffset(months=1)`, notes: [{ at: "DateOffset", text: "calendar-aware, unlike Timedelta" }] }
          ]
        },
        {
          id: "date-range", n: 5, title: "date_range", level: 2,
          gloss: "Generates a regular sequence of dates.",
          examples: [
            { code: `days = pd.date_range("2024-01-01", periods=7, freq="D")`, notes: [] },
            { code: `hours = pd.date_range("2024-01-01", periods=24, freq="h")`, notes: [{ at: 'freq="h"', text: "lowercase h, since H is deprecated" }] },
            { code: `months = pd.date_range("2024-01-31", periods=4, freq="ME")`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "str-accessor",
      n: 14,
      title: ".str accessor",
      concepts: [
        {
          id: "case-whitespace", n: 1, title: "case and whitespace", level: 1,
          gloss: "Cleans text columns with lower, title and strip.",
          examples: [
            { code: `df["notes"] = df["notes"].str.strip()`, notes: [{ at: ".str.", text: "string methods for a whole column" }] },
            { code: `df["name"] = df["name"].str.title()`, notes: [] },
            { code: `df["notes"] = df["notes"].str.strip().str.lower()`, notes: [{ at: ".str.lower()", text: "each step needs its own .str" }] }
          ]
        },
        {
          id: "searching-text", n: 2, title: "searching text", level: 1,
          gloss: "Filters rows by substring or pattern.",
          examples: [
            { code: `hits = df[df["email"].str.contains("example")]`, notes: [] },
            { code: `hits = df[df["name"].str.startswith("a")]`, notes: [] },
            { code: `hits = df[df["notes"].str.contains("^a", case=False, regex=True)]`, notes: [{ at: "case=False", text: "ignores upper and lower case" }] }
          ]
        },
        {
          id: "split-extract", n: 3, title: "split and extract", level: 2,
          gloss: "Breaks strings into parts or captures regex groups.",
          examples: [
            { code: `parts = df["email"].str.split("@", expand=True)`, notes: [{ at: "expand=True", text: "returns one column per piece" }] },
            { code: `domain = df["email"].str.split("@").str[1]`, notes: [{ at: ".str[1]", text: "index into each list" }] },
            { code: `user = df["email"].str.extract(r"^(\\w+)@")`, notes: [{ at: "(\\w+)", text: "the captured group" }] }
          ]
        },
        {
          id: "replacing-text", n: 4, title: "replacing text", level: 2,
          gloss: "Substitutes text with str.replace, including regex patterns.",
          examples: [
            { code: `df["name"] = df["name"].str.replace("a", "4")`, notes: [] },
            { code: `df["notes"] = df["notes"].str.replace(r"\\s+", " ", regex=True)`, notes: [{ at: "regex=True", text: "needed for pattern matching" }] },
            { code: `df["email"] = df["email"].str.replace("@example.com", "", regex=False)`, notes: [] }
          ]
        },
        {
          id: "length-slicing", n: 5, title: "length and slicing", level: 1,
          gloss: "Measures strings and takes characters by position.",
          examples: [
            { code: `df["n_chars"] = df["name"].str.len()`, notes: [] },
            { code: `df["initial"] = df["name"].str[0]`, notes: [{ at: ".str[0]", text: "the first character" }] },
            { code: `df["code"] = df["name"].str.upper().str[:3]`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "sorting-ranking",
      n: 15,
      title: "sorting & ranking",
      concepts: [
        {
          id: "sort-values", n: 1, title: "sort_values", level: 1,
          gloss: "Orders rows by one or more columns.",
          examples: [
            { code: `df.sort_values("price")`, notes: [] },
            { code: `df.sort_values("price", ascending=False)`, notes: [] },
            { code: `df.sort_values(["city", "price"], ascending=[True, False])`, notes: [{ at: "ascending=[True, False]", text: "one direction per column" }] }
          ]
        },
        {
          id: "sort-index", n: 2, title: "sort_index", level: 2,
          gloss: "Orders rows by the index or columns by their names.",
          examples: [
            { code: `df.sort_index()`, notes: [] },
            { code: `df.sort_index(axis=1)`, notes: [{ at: "axis=1", text: "sorts the column names" }] },
            { code: `df.set_index("name").sort_index()`, notes: [] }
          ]
        },
        {
          id: "rank", n: 3, title: "rank", level: 2,
          gloss: "Assigns each value its position in the sorted order.",
          examples: [
            { code: `df["price_rank"] = df["price"].rank()`, notes: [{ at: ".rank()", text: "ties get the average rank" }] },
            { code: `df["price_rank"] = df["price"].rank(ascending=False, method="min")`, notes: [{ at: 'method="min"', text: "ties share the lowest rank" }] },
            { code: `df["pct"] = df["price"].rank(pct=True)`, notes: [] }
          ]
        },
        {
          id: "top-bottom", n: 4, title: "top and bottom", level: 1,
          gloss: "Selects the largest or smallest rows without a full sort.",
          examples: [
            { code: `df.nlargest(3, "price")`, notes: [] },
            { code: `df.nsmallest(2, "age")`, notes: [] },
            { code: `df["price"].nlargest(3)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "method-chaining",
      n: 16,
      title: "method chaining",
      concepts: [
        {
          id: "chains", n: 1, title: "method chains", level: 2,
          gloss: "Reads a pipeline of transformations from top to bottom.",
          examples: [
            { code: `out = (
    df.query("age > 25")
    .assign(total=lambda d: d["price"] * d["qty"])
    .sort_values("total", ascending=False)
)`, notes: [{ at: "(", text: "parentheses allow line breaks" }] },
            { code: `out = (
    df.groupby("city")["price"]
    .mean()
    .round(2)
    .reset_index()
)`, notes: [] },
            { code: `out = (
    df.dropna(subset=["score"])
    .rename(columns={"score": "points"})
    .head(3)
)`, notes: [] }
          ]
        },
        {
          id: "pipe", n: 2, title: "pipe", level: 3,
          gloss: "Slots your own function into a chain.",
          examples: [
            { code: `def add_total(frame):
    return frame.assign(total=frame["price"] * frame["qty"])

out = df.pipe(add_total)`, notes: [{ at: "df.pipe(add_total)", text: "same as add_total(df)" }] },
            { code: `out = df.pipe(lambda d: d[d["age"] > 30])`, notes: [] },
            { code: `def top(frame, n):
    return frame.nlargest(n, "price")

out = df.pipe(top, 3)`, notes: [{ at: "top, 3", text: "extra arguments are passed along" }] }
          ]
        },
        {
          id: "assign-in-chains", n: 3, title: "assign in a chain", level: 3,
          gloss: "Uses callables so each step sees the frame produced so far.",
          examples: [
            { code: `out = (
    df.assign(total=lambda d: d["price"] * d["qty"])
    .query("total > 20")
)`, notes: [{ at: "lambda d", text: "d is the frame at this step" }] },
            { code: `out = (
    df.assign(total=lambda d: d["price"] * d["qty"])
    .assign(share=lambda d: d["total"] / d["total"].sum())
)`, notes: [] },
            { code: `out = df.loc[lambda d: d["age"] > 30]`, notes: [{ at: "lambda d", text: "a callable can select rows" }] }
          ]
        },
        {
          id: "safe-assignment", n: 4, title: "avoiding chained indexing", level: 2,
          gloss: "Writes with loc instead of chaining brackets, which may not write at all.",
          examples: [
            { code: `df.loc[df["age"] > 40, "price"] = 0.0`, notes: [{ at: "df.loc[", text: "one indexing step, so the write sticks" }] },
            { code: `adults = df[df["age"] > 30].copy()
adults["flag"] = True`, notes: [{ at: ".copy()", text: "makes it an independent frame" }] },
            { code: `out = df.copy()
out.loc[out["qty"] > 4, "qty"] = 4`, notes: [] }
          ]
        }
      ]
    }
  ]
};
