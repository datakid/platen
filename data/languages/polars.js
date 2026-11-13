export default {
  id: "polars",
  name: "polars",
  short: "PL",
  pigment: "polars",
  family: "python",
  version: "2.x",
  lexer: "python",
  indent: 4,
  topics: [
    {
      id: "dataframe-basics",
      n: 1,
      title: "DataFrame basics",
      concepts: [
        {
          id: "creating-dataframes", n: 1, title: "creating a DataFrame", level: 1,
          gloss: "Builds a table from a dict of columns.",
          examples: [
            { code: `people = pl.DataFrame({"name": ["ada", "lin"], "age": [36, 29]})`, notes: [{ at: '"age": [36, 29]', text: "one list per column" }] },
            { code: `people = pl.DataFrame(
    [("ada", 36), ("lin", 29)],
    schema=["name", "age"],
    orient="row",
)`, notes: [{ at: 'orient="row"', text: "each tuple is one row" }] },
            { code: `nums = pl.Series("count", [3, 1, 4])`, notes: [{ at: "pl.Series", text: "a single named column" }] }
          ]
        },
        {
          id: "inspecting", n: 2, title: "inspecting data", level: 1,
          gloss: "Shows the shape, types and a summary of a frame.",
          examples: [
            { code: `print(df.shape)`, notes: [{ at: ".shape", text: "a tuple of rows and columns" }] },
            { code: `print(df.schema)`, notes: [{ at: ".schema", text: "column names mapped to dtypes" }] },
            { code: `print(df.describe())`, notes: [] }
          ]
        },
        {
          id: "peeking", n: 3, title: "head, tail and sample", level: 1,
          gloss: "Looks at a few rows without printing the whole frame.",
          examples: [
            { code: `df.head(3)`, notes: [] },
            { code: `df.tail(2)`, notes: [] },
            { code: `df.sample(3, seed=0)`, notes: [{ at: "seed=0", text: "makes the sample repeatable" }] }
          ]
        },
        {
          id: "reading-columns", n: 4, title: "reading columns", level: 1,
          gloss: "Pulls one column or one row out of a frame.",
          examples: [
            { code: `ages = df["age"]`, notes: [{ at: '["age"]', text: "a Series, not a DataFrame" }] },
            { code: `names = df.get_column("name")`, notes: [] },
            { code: `first = df.row(0, named=True)`, notes: [{ at: "named=True", text: "a dict instead of a tuple" }] }
          ]
        },
        {
          id: "converting-out", n: 5, title: "converting out", level: 1,
          gloss: "Turns a frame into Python lists, dicts or arrays.",
          examples: [
            { code: `rows = df.to_dicts()`, notes: [{ at: ".to_dicts()", text: "one dict per row" }] },
            { code: `ages = df["age"].to_list()`, notes: [] },
            { code: `arr = df.select("age", "qty").to_numpy()`, notes: [{ at: ".to_numpy()", text: "a 2-D NumPy array" }] }
          ]
        }
      ]
    },
    {
      id: "read-scan",
      n: 2,
      title: "read vs scan",
      concepts: [
        {
          id: "read-csv", n: 1, title: "read_csv", level: 1,
          gloss: "Loads a CSV file into memory right away.",
          examples: [
            { code: `sales = pl.read_csv("sales.csv")`, notes: [{ at: "read_csv", text: "eager: the whole file is loaded" }] },
            { code: `sales = pl.read_csv("sales.csv", columns=["city", "price"])`, notes: [{ at: "columns=", text: "loads only these columns" }] },
            { code: `sales = pl.read_csv("sales.csv", try_parse_dates=True)`, notes: [{ at: "try_parse_dates", text: "turns date-like text into dates" }] }
          ]
        },
        {
          id: "scan-csv", n: 2, title: "scan_csv", level: 2,
          gloss: "Builds a lazy query over a file without reading it yet.",
          examples: [
            { code: `lf = pl.scan_csv("sales.csv")`, notes: [{ at: "scan_csv", text: "lazy: nothing is read yet" }] },
            { code: `lf = pl.scan_csv("sales.csv").filter(pl.col("price") > 10)`, notes: [] },
            { code: `lf = pl.scan_parquet("data.parquet")`, notes: [{ at: "scan_parquet", text: "reads only needed columns and rows" }] }
          ]
        },
        {
          id: "writing-files", n: 3, title: "writing files", level: 1,
          gloss: "Saves a frame as CSV or Parquet.",
          examples: [
            { code: `df.write_csv("out.csv")`, notes: [] },
            { code: `df.write_parquet("out.parquet")`, notes: [] },
            { code: `df.write_parquet("out.parquet", compression="zstd")`, notes: [{ at: 'compression="zstd"', text: "small files, fast to read" }] }
          ]
        },
        {
          id: "read-parquet", n: 4, title: "read_parquet", level: 1,
          gloss: "Loads a Parquet file, optionally only some columns or rows.",
          examples: [
            { code: `table = pl.read_parquet("data.parquet")`, notes: [] },
            { code: `table = pl.read_parquet("data.parquet", columns=["city", "price"])`, notes: [] },
            { code: `table = pl.read_parquet("data.parquet", n_rows=3)`, notes: [{ at: "n_rows=3", text: "stops after three rows" }] }
          ]
        },
        {
          id: "schema-overrides", n: 5, title: "schema and null options", level: 2,
          gloss: "Controls column types and missing-value markers while reading.",
          examples: [
            { code: `sales = pl.read_csv("sales.csv", schema_overrides={"qty": pl.Int32})`, notes: [{ at: "schema_overrides", text: "forces a type for chosen columns" }] },
            { code: `sales = pl.read_csv("sales.csv", null_values=["n/a", "-"])`, notes: [] },
            { code: `sales = pl.read_csv("sales.csv", infer_schema_length=1000)`, notes: [{ at: "infer_schema_length", text: "rows sampled to guess the types" }] }
          ]
        }
      ]
    },
    {
      id: "select-col",
      n: 3,
      title: "select & pl.col",
      concepts: [
        {
          id: "select", n: 1, title: "select", level: 1,
          gloss: "Picks or computes columns and returns a new frame.",
          examples: [
            { code: `df.select("name", "age")`, notes: [] },
            { code: `df.select(pl.col("name"), pl.col("age") + 1)`, notes: [{ at: 'pl.col("age") + 1', text: "an expression, evaluated per row" }] },
            { code: `df.select(pl.all())`, notes: [{ at: "pl.all()", text: "every column" }] }
          ]
        },
        {
          id: "col-expressions", n: 2, title: "pl.col expressions", level: 1,
          gloss: "Describes a column so you can transform it.",
          examples: [
            { code: `df.select(pl.col("price") * pl.col("qty"))`, notes: [] },
            { code: `df.select(total=pl.col("price") * pl.col("qty"))`, notes: [{ at: "total=", text: "names the output column" }] },
            { code: `df.select((pl.col("price") * 1.2).alias("with_tax"))`, notes: [{ at: ".alias(", text: "renames the result" }] }
          ]
        },
        {
          id: "several-columns", n: 3, title: "several columns at once", level: 2,
          gloss: "Applies one expression to many columns.",
          examples: [
            { code: `df.select(pl.col("price", "qty") * 2)`, notes: [{ at: '"price", "qty"', text: "one expression, two columns" }] },
            { code: `df.select(pl.col(pl.Float64).round(1))`, notes: [{ at: "pl.Float64", text: "selects columns by dtype" }] },
            { code: `df.select(pl.col("^(price|qty)$"))`, notes: [{ at: "^(price|qty)$", text: "a regex picks columns by name" }] }
          ]
        },
        {
          id: "selectors", n: 4, title: "selectors", level: 3,
          gloss: "Chooses columns by type or name pattern with the selectors module.",
          examples: [
            { code: `df.select(cs.numeric())`, notes: [{ at: "cs.numeric()", text: "every numeric column" }] },
            { code: `df.select(cs.string())`, notes: [] },
            { code: `df.select(cs.numeric() - cs.by_name("age"))`, notes: [{ at: "-", text: "set difference of selectors" }] }
          ]
        },
        {
          id: "drop-rename", n: 5, title: "dropping and renaming", level: 1,
          gloss: "Removes columns or changes their names.",
          examples: [
            { code: `df.drop("notes", "email")`, notes: [] },
            { code: `df.select(pl.exclude("notes"))`, notes: [{ at: "pl.exclude", text: "every column except these" }] },
            { code: `df.rename({"qty": "quantity"})`, notes: [{ at: '{"qty": "quantity"}', text: "old name to new name" }] }
          ]
        }
      ]
    },
    {
      id: "with-columns",
      n: 4,
      title: "with_columns",
      concepts: [
        {
          id: "adding-columns", n: 1, title: "with_columns", level: 1,
          gloss: "Adds or replaces columns while keeping all the others.",
          examples: [
            { code: `df.with_columns(total=pl.col("price") * pl.col("qty"))`, notes: [] },
            { code: `df.with_columns((pl.col("price") * 1.2).alias("gross"))`, notes: [] },
            { code: `df.with_columns(pl.col("age") + 1)`, notes: [{ at: 'pl.col("age") + 1', text: "keeps the name, replaces the column" }] }
          ]
        },
        {
          id: "several-new-columns", n: 2, title: "several new columns", level: 2,
          gloss: "Computes many columns in parallel in one call.",
          examples: [
            { code: `df.with_columns(
    total=pl.col("price") * pl.col("qty"),
    age_next=pl.col("age") + 1,
)`, notes: [{ at: "total=", text: "these run in parallel, not in order" }] },
            { code: `df.with_columns(pl.col("price", "qty").cast(pl.Float64))`, notes: [] },
            { code: `df.with_columns(pl.lit("fr").alias("country"))`, notes: [{ at: "pl.lit", text: "a constant column" }] }
          ]
        },
        {
          id: "casting", n: 3, title: "casting types", level: 1,
          gloss: "Converts a column to another dtype.",
          examples: [
            { code: `df.with_columns(pl.col("age").cast(pl.Float64))`, notes: [] },
            { code: `df.with_columns(pl.col("qty").cast(pl.String))`, notes: [{ at: "pl.String", text: "text, formerly called Utf8" }] },
            { code: `df.with_columns(pl.col("price").cast(pl.Int64, strict=False))`, notes: [{ at: "strict=False", text: "failed casts become null" }] }
          ]
        },
        {
          id: "row-index", n: 4, title: "row index and rank", level: 1,
          gloss: "Numbers the rows or ranks a column.",
          examples: [
            { code: `df.with_row_index("idx")`, notes: [{ at: "with_row_index", text: "the name that replaced with_row_count" }] },
            { code: `df.with_row_index("idx", offset=1)`, notes: [] },
            { code: `df.with_columns(rank=pl.col("price").rank())`, notes: [] }
          ]
        },
        {
          id: "sorting", n: 5, title: "sorting", level: 1,
          gloss: "Orders rows by one or more columns.",
          examples: [
            { code: `df.sort("price")`, notes: [] },
            { code: `df.sort("price", descending=True)`, notes: [{ at: "descending=True", text: "largest first" }] },
            { code: `df.sort(["city", "price"], descending=[False, True])`, notes: [{ at: "descending=[False, True]", text: "one direction per column" }] }
          ]
        }
      ]
    },
    {
      id: "filter",
      n: 5,
      title: "filter",
      concepts: [
        {
          id: "filter-basics", n: 1, title: "filter", level: 1,
          gloss: "Keeps the rows where an expression is true.",
          examples: [
            { code: `df.filter(pl.col("age") >= 30)`, notes: [] },
            { code: `df.filter(pl.col("city") == "paris")`, notes: [] },
            { code: `df.filter(pl.col("price") < 10)`, notes: [] }
          ]
        },
        {
          id: "combining-conditions", n: 2, title: "combining conditions", level: 1,
          gloss: "Joins conditions with & and | inside parentheses.",
          examples: [
            { code: `df.filter((pl.col("age") > 30) & (pl.col("price") < 15))`, notes: [{ at: "&", text: "and: wrap each test in parentheses" }] },
            { code: `df.filter(pl.col("city") == "oslo", pl.col("qty") > 2)`, notes: [{ at: ", pl.col", text: "several arguments are and-ed" }] },
            { code: `df.filter(~pl.col("active"))`, notes: [{ at: "~", text: "negates the boolean column" }] }
          ]
        },
        {
          id: "is-in-between", n: 3, title: "is_in and is_between", level: 1,
          gloss: "Tests membership in a list or a range.",
          examples: [
            { code: `df.filter(pl.col("city").is_in(["oslo", "rome"]))`, notes: [] },
            { code: `df.filter(pl.col("age").is_between(25, 40))`, notes: [{ at: ".is_between(25, 40)", text: "inclusive on both ends" }] },
            { code: `df.filter(pl.col("name").str.starts_with("a"))`, notes: [] }
          ]
        },
        {
          id: "filtering-nulls", n: 4, title: "filtering nulls", level: 2,
          gloss: "Keeps or removes rows with missing values.",
          examples: [
            { code: `df.filter(pl.col("score").is_not_null())`, notes: [] },
            { code: `df.filter(pl.col("score").is_null())`, notes: [{ at: ".is_null()", text: "true where the value is missing" }] },
            { code: `df.drop_nulls("score")`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "group-by-agg",
      n: 6,
      title: "group_by & agg",
      concepts: [
        {
          id: "group-by", n: 1, title: "group_by", level: 2,
          gloss: "Splits rows by key and aggregates each group.",
          examples: [
            { code: `df.group_by("city").agg(pl.col("price").mean())`, notes: [{ at: "group_by", text: "the name that replaced groupby" }] },
            { code: `df.group_by("category").agg(pl.col("qty").sum())`, notes: [] },
            { code: `df.group_by("city", "category").agg(pl.col("price").max())`, notes: [{ at: '"city", "category"', text: "one group per pair" }] }
          ]
        },
        {
          id: "several-aggregations", n: 2, title: "several aggregations", level: 2,
          gloss: "Computes many statistics per group in one pass.",
          examples: [
            { code: `df.group_by("city").agg(
    pl.col("price").mean().alias("avg_price"),
    pl.col("qty").sum().alias("total_qty"),
)`, notes: [] },
            { code: `df.group_by("city").agg(avg_price=pl.col("price").mean(), n=pl.len())`, notes: [{ at: "pl.len()", text: "the number of rows per group" }] },
            { code: `df.group_by("city").agg(pl.col("price", "qty").sum())`, notes: [] }
          ]
        },
        {
          id: "group-order", n: 3, title: "group order", level: 2,
          gloss: "Sorts the result, since group order is not guaranteed.",
          examples: [
            { code: `df.group_by("city").agg(pl.col("price").mean()).sort("city")`, notes: [{ at: '.sort("city")', text: "groups come back in any order" }] },
            { code: `df.group_by("city", maintain_order=True).agg(pl.len())`, notes: [{ at: "maintain_order=True", text: "keeps first-seen group order" }] },
            { code: `df.group_by("city").len().sort("len", descending=True)`, notes: [] }
          ]
        },
        {
          id: "expressions-in-agg", n: 4, title: "expressions inside agg", level: 3,
          gloss: "Filters or collects values inside each group before aggregating.",
          examples: [
            { code: `df.group_by("city").agg(pl.col("name"))`, notes: [{ at: 'pl.col("name")', text: "collects each group's names into a list" }] },
            { code: `df.group_by("city").agg(
    pl.col("price").filter(pl.col("qty") > 2).sum()
)`, notes: [{ at: ".filter(", text: "filters within each group" }] },
            { code: `df.group_by("city").agg(pl.col("age").max() - pl.col("age").min())`, notes: [] }
          ]
        },
        {
          id: "counting", n: 5, title: "counting values", level: 1,
          gloss: "Counts rows and distinct values.",
          examples: [
            { code: `df["city"].value_counts()`, notes: [{ at: ".value_counts()", text: "a frame of values and counts" }] },
            { code: `df["city"].n_unique()`, notes: [] },
            { code: `df.select(pl.col("city").unique())`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "joins",
      n: 7,
      title: "joins",
      concepts: [
        {
          id: "join-basics", n: 1, title: "join", level: 2,
          gloss: "Combines two frames on matching key columns.",
          examples: [
            { code: `merged = left.join(right, on="key")`, notes: [{ at: 'on="key"', text: "the column present in both" }] },
            { code: `merged = customers.join(orders, left_on="id", right_on="customer_id")`, notes: [{ at: "left_on", text: "key names that differ per side" }] },
            { code: `merged = orders.join(customers, left_on="customer_id", right_on="id")`, notes: [] }
          ]
        },
        {
          id: "join-types", n: 2, title: "join types", level: 2,
          gloss: "Chooses which unmatched rows to keep with how.",
          examples: [
            { code: `out = left.join(right, on="key", how="left")`, notes: [{ at: 'how="left"', text: "keeps every row of the left frame" }] },
            { code: `out = left.join(right, on="key", how="full")`, notes: [{ at: '"full"', text: "keeps rows from both sides" }] },
            { code: `out = left.join(right, on="key", how="inner")`, notes: [] }
          ]
        },
        {
          id: "semi-anti", n: 3, title: "semi and anti joins", level: 3,
          gloss: "Filters one frame by whether its keys exist in another.",
          examples: [
            { code: `out = left.join(right, on="key", how="semi")`, notes: [{ at: '"semi"', text: "left rows that have a match" }] },
            { code: `out = left.join(right, on="key", how="anti")`, notes: [{ at: '"anti"', text: "left rows with no match" }] },
            { code: `out = customers.join(
    orders, left_on="id", right_on="customer_id", how="anti"
)`, notes: [] }
          ]
        },
        {
          id: "suffix-validate", n: 4, title: "suffix and validate", level: 3,
          gloss: "Renames overlapping columns and checks that keys are unique.",
          examples: [
            { code: `out = df.join(df, on="name", suffix="_right")`, notes: [{ at: 'suffix="_right"', text: "added to overlapping column names" }] },
            { code: `out = left.join(right, on="key", validate="1:1")`, notes: [{ at: 'validate="1:1"', text: "raises if keys repeat" }] },
            { code: `out = left.join(right, on="key", how="full", coalesce=True)`, notes: [{ at: "coalesce=True", text: "merges the two key columns" }] }
          ]
        },
        {
          id: "stacking-frames", n: 5, title: "stacking frames", level: 1,
          gloss: "Appends frames one after another with concat.",
          examples: [
            { code: `both = pl.concat([jan, feb])`, notes: [{ at: "[jan, feb]", text: "stacks vertically by default" }] },
            { code: `both = pl.concat([jan, extra], how="diagonal")`, notes: [{ at: 'how="diagonal"', text: "fills missing columns with null" }] },
            { code: `both = pl.concat([jan, feb]).unique()`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "lazy-collect",
      n: 8,
      title: "lazy & collect",
      concepts: [
        {
          id: "lazy-basics", n: 1, title: "lazy and collect", level: 2,
          gloss: "Builds a query plan and runs it only on collect.",
          examples: [
            { code: `lf = df.lazy()`, notes: [{ at: ".lazy()", text: "turns a frame into a lazy query" }] },
            { code: `out = df.lazy().filter(pl.col("age") > 30).select("name").collect()`, notes: [{ at: ".collect()", text: "runs the whole plan now" }] },
            { code: `lf = pl.scan_csv("sales.csv")
out = lf.group_by("city").agg(pl.col("price").sum()).collect()`, notes: [] }
          ]
        },
        {
          id: "explain", n: 2, title: "explain", level: 3,
          gloss: "Shows the optimized query plan before running it.",
          examples: [
            { code: `print(df.lazy().filter(pl.col("age") > 30).explain())`, notes: [{ at: ".explain()", text: "prints the plan as text" }] },
            { code: `lf = pl.scan_csv("sales.csv").select("city", "price")
print(lf.explain())`, notes: [] },
            { code: `lf = pl.scan_csv("sales.csv").select("city")
print(lf.explain(optimized=False))`, notes: [{ at: "optimized=False", text: "the plan as you wrote it" }] }
          ]
        },
        {
          id: "pushdown", n: 3, title: "projection and predicate pushdown", level: 3,
          gloss: "Lets the engine read only the columns and rows a query needs.",
          examples: [
            { code: `lf = pl.scan_parquet("data.parquet")
out = lf.select("city", "price").filter(pl.col("price") > 10).collect()`, notes: [{ at: '.select("city", "price")', text: "only these columns are read" }] },
            { code: `lf = pl.scan_parquet("data.parquet")
out = lf.filter(pl.col("city") == "oslo").select("price").collect()`, notes: [] },
            { code: `lf = pl.scan_csv("sales.csv").select(pl.col("city"))
print(lf.collect_schema())`, notes: [] }
          ]
        },
        {
          id: "collect-options", n: 4, title: "collect options", level: 3,
          gloss: "Runs a query with another engine or writes it without collecting.",
          examples: [
            { code: `df.lazy().head(2).collect()`, notes: [] },
            { code: `df.lazy().collect(engine="streaming")`, notes: [{ at: 'engine="streaming"', text: "processes in batches to save memory" }] },
            { code: `df.lazy().sink_parquet("out.parquet")`, notes: [{ at: "sink_parquet", text: "writes results without loading them" }] }
          ]
        },
        {
          id: "collect-schema", n: 5, title: "collect_schema", level: 2,
          gloss: "Reads a lazy query's column names and types without running it.",
          examples: [
            { code: `df.lazy().collect_schema()`, notes: [] },
            { code: `print(df.lazy().collect_schema().names())`, notes: [] },
            { code: `df.lazy().with_columns(x=pl.lit(1)).collect_schema()`, notes: [{ at: "x=pl.lit(1)", text: "a new column shows up in the schema" }] }
          ]
        }
      ]
    },
    {
      id: "window-functions",
      n: 9,
      title: "window functions",
      concepts: [
        {
          id: "over", n: 1, title: "over", level: 3,
          gloss: "Computes an aggregate per group while keeping every row.",
          examples: [
            { code: `df.with_columns(city_avg=pl.col("price").mean().over("city"))`, notes: [{ at: '.over("city")', text: "the window: one value per city" }] },
            { code: `df.with_columns(
    share=pl.col("price") / pl.col("price").sum().over("city")
)`, notes: [] },
            { code: `df.with_columns(n=pl.len().over("category"))`, notes: [] }
          ]
        },
        {
          id: "rank-cumulative", n: 2, title: "rank and cumulative", level: 3,
          gloss: "Ranks rows or keeps running totals, overall or within a group.",
          examples: [
            { code: `df.with_columns(rank=pl.col("price").rank().over("city"))`, notes: [] },
            { code: `df.with_columns(running=pl.col("qty").cum_sum())`, notes: [{ at: ".cum_sum()", text: "a running total down the column" }] },
            { code: `df.with_columns(running=pl.col("qty").cum_sum().over("city"))`, notes: [{ at: ".over(", text: "restarts the total for each city" }] }
          ]
        },
        {
          id: "shift-diff", n: 3, title: "shift and diff", level: 3,
          gloss: "Compares each row with the one before it.",
          examples: [
            { code: `df.with_columns(prev=pl.col("price").shift(1))`, notes: [{ at: ".shift(1)", text: "the previous row's value" }] },
            { code: `df.with_columns(change=pl.col("price").diff())`, notes: [] },
            { code: `df.with_columns(pct=pl.col("price").pct_change())`, notes: [] }
          ]
        },
        {
          id: "rolling-windows", n: 4, title: "rolling windows", level: 3,
          gloss: "Aggregates over a sliding window of neighboring rows.",
          examples: [
            { code: `df.with_columns(avg3=pl.col("price").rolling_mean(window_size=3))`, notes: [{ at: "window_size=3", text: "the first two rows are null" }] },
            { code: `df.with_columns(
    sum3=pl.col("qty").rolling_sum(window_size=3, min_samples=1)
)`, notes: [{ at: "min_samples=1", text: "allows partial windows at the start" }] },
            { code: `df.with_columns(ewm=pl.col("price").ewm_mean(span=3))`, notes: [] }
          ]
        },
        {
          id: "top-per-group", n: 5, title: "top rows per group", level: 3,
          gloss: "Selects the best rows within each group.",
          examples: [
            { code: `df.filter(pl.col("price") == pl.col("price").max().over("city"))`, notes: [] },
            { code: `df.sort("price", descending=True).group_by("city").head(1)`, notes: [{ at: ".head(1)", text: "the first row of each group" }] },
            { code: `df.filter(pl.col("price").rank(descending=True).over("city") <= 2)`, notes: [{ at: "<= 2", text: "the top two per city" }] }
          ]
        }
      ]
    },
    {
      id: "when-then",
      n: 10,
      title: "when / then / otherwise",
      concepts: [
        {
          id: "when-then-otherwise", n: 1, title: "when, then, otherwise", level: 2,
          gloss: "Builds conditional columns, like if and else for expressions.",
          examples: [
            { code: `df.with_columns(
    tier=pl.when(pl.col("price") > 15)
    .then(pl.lit("high"))
    .otherwise(pl.lit("low"))
)`, notes: [{ at: ".otherwise(", text: "the value when the test fails" }] },
            { code: `df.with_columns(flag=pl.when(pl.col("age") > 40).then(1).otherwise(0))`, notes: [] },
            { code: `df.with_columns(
    pl.when(pl.col("qty") > 4)
    .then(4)
    .otherwise(pl.col("qty"))
    .alias("capped")
)`, notes: [{ at: ".alias(", text: "names the new column" }] }
          ]
        },
        {
          id: "chained-conditions", n: 2, title: "chained conditions", level: 3,
          gloss: "Adds more branches by chaining when after then.",
          examples: [
            { code: `df.with_columns(
    band=pl.when(pl.col("age") < 30).then(pl.lit("young"))
    .when(pl.col("age") < 50).then(pl.lit("mid"))
    .otherwise(pl.lit("senior"))
)`, notes: [{ at: ".when(pl.col", text: "checked only if earlier tests failed" }] },
            { code: `df.with_columns(
    size=pl.when(pl.col("qty") >= 5).then(pl.lit("bulk"))
    .when(pl.col("qty") >= 2).then(pl.lit("few"))
    .otherwise(pl.lit("single"))
)`, notes: [] },
            { code: `df.with_columns(
    label=pl.when(pl.col("score") > 80).then(pl.lit("high"))
    .otherwise(None)
)`, notes: [{ at: "None", text: "unmatched rows become null" }] }
          ]
        },
        {
          id: "clip-replace", n: 3, title: "clip and replace", level: 2,
          gloss: "Limits or swaps values without writing a conditional.",
          examples: [
            { code: `df.with_columns(capped=pl.col("price").clip(upper_bound=20))`, notes: [{ at: "upper_bound=20", text: "larger values become 20" }] },
            { code: `df.with_columns(pl.col("city").replace({"paris": "PAR", "oslo": "OSL"}))`, notes: [{ at: ".replace(", text: "unmatched values stay as they are" }] },
            { code: `df.with_columns(pl.col("price").clip(5, 25))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "str-dt",
      n: 11,
      title: "str & dt namespaces",
      concepts: [
        {
          id: "string-case", n: 1, title: "case and trimming", level: 1,
          gloss: "Cleans text columns with the str namespace.",
          examples: [
            { code: `df.with_columns(pl.col("name").str.to_uppercase())`, notes: [] },
            { code: `df.with_columns(pl.col("notes").str.strip_chars())`, notes: [{ at: ".str.", text: "string methods live in this namespace" }] },
            { code: `df.with_columns(pl.col("name").str.to_titlecase())`, notes: [] }
          ]
        },
        {
          id: "string-search", n: 2, title: "searching text", level: 1,
          gloss: "Filters rows by substring and measures string length.",
          examples: [
            { code: `df.filter(pl.col("email").str.contains("example"))`, notes: [{ at: ".str.contains", text: "a regex unless literal=True" }] },
            { code: `df.filter(pl.col("name").str.starts_with("a"))`, notes: [] },
            { code: `df.with_columns(n=pl.col("name").str.len_chars())`, notes: [{ at: "len_chars", text: "characters, not bytes" }] }
          ]
        },
        {
          id: "split-extract", n: 3, title: "split and extract", level: 2,
          gloss: "Breaks strings into parts or captures regex groups.",
          examples: [
            { code: `df.with_columns(domain=pl.col("email").str.split("@").list.last())`, notes: [{ at: ".list.last()", text: "split returns a list per row" }] },
            { code: `df.with_columns(user=pl.col("email").str.extract(r"^(\\w+)@", 1))`, notes: [{ at: ", 1", text: "the capture group number" }] },
            { code: `df.with_columns(pl.col("notes").str.replace_all(r"\\s+", " "))`, notes: [{ at: "replace_all", text: "replaces every match, not just one" }] }
          ]
        },
        {
          id: "date-parts", n: 4, title: "date parts", level: 1,
          gloss: "Reads the year, month and weekday of a date column.",
          examples: [
            { code: `df.with_columns(year=pl.col("signup").dt.year())`, notes: [{ at: ".dt.", text: "date methods live in this namespace" }] },
            { code: `df.with_columns(month=pl.col("signup").dt.month())`, notes: [] },
            { code: `df.with_columns(weekday=pl.col("signup").dt.weekday())`, notes: [{ at: ".dt.weekday()", text: "monday is 1, sunday is 7" }] }
          ]
        },
        {
          id: "parsing-dates", n: 5, title: "parsing dates", level: 2,
          gloss: "Converts text to dates and formats dates as text.",
          examples: [
            { code: `raw = pl.DataFrame({"d": ["2024-01-05"]})
out = raw.with_columns(pl.col("d").str.to_date())`, notes: [{ at: ".str.to_date()", text: "guesses the common ISO format" }] },
            { code: `df.with_columns(pl.col("signup").dt.strftime("%Y-%m"))`, notes: [] },
            { code: `raw = pl.DataFrame({"d": ["05/01/2024"]})
out = raw.with_columns(pl.col("d").str.to_date("%d/%m/%Y"))`, notes: [{ at: '"%d/%m/%Y"', text: "day first, then month" }] }
          ]
        },
        {
          id: "date-arithmetic", n: 6, title: "date arithmetic", level: 2,
          gloss: "Adds durations, offsets and truncates dates to a period.",
          examples: [
            { code: `df.with_columns(renewal=pl.col("signup") + pl.duration(days=365))`, notes: [{ at: "pl.duration", text: "a fixed span of time" }] },
            { code: `df.with_columns(pl.col("signup").dt.offset_by("1mo"))`, notes: [{ at: '"1mo"', text: "a calendar-aware month step" }] },
            { code: `df.with_columns(pl.col("signup").dt.truncate("1mo"))`, notes: [{ at: ".truncate(", text: "rounds down to the start of the month" }] }
          ]
        }
      ]
    },
    {
      id: "list-struct",
      n: 12,
      title: "list & struct columns",
      concepts: [
        {
          id: "list-namespace", n: 1, title: "the list namespace", level: 2,
          gloss: "Works on columns whose cells are lists.",
          examples: [
            { code: `nested.select(pl.col("tags").list.len())`, notes: [{ at: ".list.", text: "list methods live in this namespace" }] },
            { code: `nested.select(pl.col("tags").list.first())`, notes: [] },
            { code: `nested.select(pl.col("tags").list.contains("a"))`, notes: [] }
          ]
        },
        {
          id: "explode", n: 2, title: "explode", level: 2,
          gloss: "Turns each list item into its own row.",
          examples: [
            { code: `nested.explode("tags", empty_as_null=True)`, notes: [{ at: "empty_as_null=True", text: "an empty list becomes one null row" }] },
            { code: `nested.explode("tags", empty_as_null=False)`, notes: [{ at: "empty_as_null=False", text: "an empty list produces no rows" }] },
            { code: `nested.select(pl.col("tags").explode(empty_as_null=True))`, notes: [] }
          ]
        },
        {
          id: "list-eval", n: 3, title: "working inside lists", level: 3,
          gloss: "Transforms the items inside each list, then sorts or joins them.",
          examples: [
            { code: `nested.select(
    pl.col("tags").list.eval(pl.element().str.to_uppercase())
)`, notes: [{ at: "pl.element()", text: "each item inside the list" }] },
            { code: `nested.select(pl.col("tags").list.join(","))`, notes: [] },
            { code: `nested.select(pl.col("tags").list.sort(descending=True))`, notes: [] }
          ]
        },
        {
          id: "struct-columns", n: 4, title: "struct columns", level: 2,
          gloss: "Packs several fields into one column and unpacks them again.",
          examples: [
            { code: `nested.select(pl.col("pt").struct.field("x"))`, notes: [{ at: ".struct.field", text: "reads one field of the struct" }] },
            { code: `nested.unnest("pt")`, notes: [{ at: ".unnest(", text: "one column per field" }] },
            { code: `df.select(pl.struct("name", "age").alias("person"))`, notes: [{ at: "pl.struct", text: "bundles columns into one" }] }
          ]
        },
        {
          id: "building-lists", n: 5, title: "building lists", level: 2,
          gloss: "Combines columns or rows into list values.",
          examples: [
            { code: `df.select(pl.concat_list("price", "qty"))`, notes: [{ at: "pl.concat_list", text: "a list built from several columns" }] },
            { code: `df.select(pl.col("name").implode())`, notes: [{ at: ".implode()", text: "all rows become one list" }] },
            { code: `df.group_by("city").agg(pl.col("name").alias("members"))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "pivot-unpivot",
      n: 13,
      title: "pivot & unpivot",
      concepts: [
        {
          id: "pivot", n: 1, title: "pivot", level: 2,
          gloss: "Reshapes long data to wide, aggregating duplicates.",
          examples: [
            { code: `tidy.pivot(on="k", index="day", values="v")`, notes: [{ at: 'on="k"', text: "its values become the columns" }] },
            { code: `df.pivot(
    on="category",
    index="city",
    values="price",
    aggregate_function="mean",
)`, notes: [{ at: "aggregate_function", text: "needed when keys repeat" }] },
            { code: `df.pivot(
    on="category", index="city", values="qty", aggregate_function="sum"
)`, notes: [] }
          ]
        },
        {
          id: "unpivot", n: 2, title: "unpivot", level: 2,
          gloss: "Turns wide columns into long rows.",
          examples: [
            { code: `wide.unpivot(index="id")`, notes: [{ at: "unpivot", text: "the new name for melt" }] },
            { code: `wide.unpivot(index="id", variable_name="metric", value_name="amount")`, notes: [] },
            { code: `wide.unpivot(on=["x"], index="id")`, notes: [{ at: 'on=["x"]', text: "only unpivot these columns" }] }
          ]
        },
        {
          id: "transpose", n: 3, title: "transpose", level: 2,
          gloss: "Swaps rows and columns.",
          examples: [
            { code: `wide.transpose()`, notes: [] },
            { code: `wide.transpose(include_header=True, column_names=["r1", "r2"])`, notes: [{ at: "include_header=True", text: "keeps the old column names" }] },
            { code: `wide.drop("id").transpose()`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "nulls",
      n: 14,
      title: "nulls",
      concepts: [
        {
          id: "detecting-nulls", n: 1, title: "detecting nulls", level: 1,
          gloss: "Finds missing values and counts them.",
          examples: [
            { code: `df.select(pl.col("score").is_null())`, notes: [] },
            { code: `df.null_count()`, notes: [{ at: ".null_count()", text: "nulls per column" }] },
            { code: `df.select(pl.col("score").null_count())`, notes: [] }
          ]
        },
        {
          id: "filling-nulls", n: 2, title: "filling nulls", level: 1,
          gloss: "Replaces nulls with a value, a statistic or a neighbor.",
          examples: [
            { code: `df.with_columns(pl.col("score").fill_null(0))`, notes: [] },
            { code: `df.with_columns(
    pl.col("score").fill_null(pl.col("score").mean())
)`, notes: [{ at: '.mean()', text: "the mean ignores nulls" }] },
            { code: `df.with_columns(pl.col("score").fill_null(strategy="forward"))`, notes: [{ at: 'strategy="forward"', text: "carries the last value forward" }] }
          ]
        },
        {
          id: "dropping-nulls", n: 3, title: "dropping nulls", level: 1,
          gloss: "Removes rows that contain nulls.",
          examples: [
            { code: `df.drop_nulls()`, notes: [{ at: "drop_nulls()", text: "any null in any column" }] },
            { code: `df.drop_nulls(subset="score")`, notes: [] },
            { code: `df.drop_nulls(subset=["score", "age"])`, notes: [] }
          ]
        },
        {
          id: "null-versus-nan", n: 4, title: "null versus NaN", level: 3,
          gloss: "Treats missing data and not-a-number as different things.",
          examples: [
            { code: `s = pl.Series([1.0, None, float("nan")])
print(s.is_null())`, notes: [{ at: "is_null()", text: "true only for None, not NaN" }] },
            { code: `s = pl.Series([1.0, float("nan")])
print(s.is_nan())`, notes: [] },
            { code: `s = pl.Series([1.0, float("nan")])
clean = s.fill_nan(None)`, notes: [{ at: "fill_nan(None)", text: "turns NaN into a proper null" }] }
          ]
        },
        {
          id: "nulls-in-expressions", n: 5, title: "nulls in expressions", level: 2,
          gloss: "Propagates through arithmetic but is skipped by aggregates.",
          examples: [
            { code: `df.select(pl.col("score") + 1)`, notes: [{ at: "+ 1", text: "null plus 1 is still null" }] },
            { code: `df.select(pl.col("score").mean())`, notes: [{ at: ".mean()", text: "aggregates skip nulls" }] },
            { code: `df.select(pl.col("score").sum())`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "sql-context",
      n: 15,
      title: "SQLContext",
      concepts: [
        {
          id: "sql-context-basics", n: 1, title: "SQLContext", level: 2,
          gloss: "Runs SQL queries over frames registered by name.",
          examples: [
            { code: `ctx = pl.SQLContext(frames={"people": df})`, notes: [{ at: "frames=", text: "table names mapped to frames" }] },
            { code: `ctx = pl.SQLContext(people=df)
out = ctx.execute("SELECT name, age FROM people", eager=True)`, notes: [{ at: "eager=True", text: "returns a DataFrame, not a lazy query" }] },
            { code: `ctx = pl.SQLContext(people=df)
out = ctx.execute("SELECT * FROM people WHERE age > 30").collect()`, notes: [] }
          ]
        },
        {
          id: "dataframe-sql", n: 2, title: "DataFrame.sql", level: 2,
          gloss: "Queries a frame directly, calling it self inside the SQL.",
          examples: [
            { code: `df.sql("SELECT name, age FROM self WHERE age > 30")`, notes: [{ at: "FROM self", text: "refers to the frame being queried" }] },
            { code: `out = df.sql(
    "SELECT city, AVG(price) AS avg_price FROM self GROUP BY city"
)`, notes: [] },
            { code: `df.sql("SELECT COUNT(*) AS n FROM self")`, notes: [] }
          ]
        },
        {
          id: "sql-joins", n: 3, title: "joins in SQL", level: 3,
          gloss: "Joins registered tables with ordinary SQL syntax.",
          examples: [
            { code: `ctx = pl.SQLContext(customers=customers, orders=orders)
query = (
    "SELECT c.name, o.total FROM customers c "
    "JOIN orders o ON c.id = o.customer_id"
)
out = ctx.execute(query, eager=True)`, notes: [{ at: "JOIN orders o", text: "the same join as in the DataFrame API" }] },
            { code: `ctx = pl.SQLContext()
ctx.register("people", df)`, notes: [{ at: ".register(", text: "adds a frame under a table name" }] },
            { code: `ctx = pl.SQLContext()
ctx.register("people", df)
print(ctx.tables())`, notes: [] }
          ]
        },
        {
          id: "lazy-sql", n: 4, title: "lazy SQL results", level: 3,
          gloss: "Gets a lazy query back from SQL and runs it when ready.",
          examples: [
            { code: `ctx = pl.SQLContext(people=df)
lf = ctx.execute("SELECT * FROM people")`, notes: [{ at: "lf", text: "a LazyFrame; nothing has run yet" }] },
            { code: `ctx = pl.SQLContext(people=df)
out = ctx.execute("SELECT city FROM people").collect()`, notes: [] },
            { code: `out = pl.sql("SELECT 1 AS one").collect()`, notes: [{ at: "pl.sql", text: "a query with no frames at all" }] }
          ]
        }
      ]
    }
  ]
};
