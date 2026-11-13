export default {
  id: "r",
  name: "R",
  short: "R",
  pigment: "r",
  family: null,
  version: "4.6",
  lexer: "r",
  indent: 2,
  topics: [
    {
      id: "vectors-types",
      n: 1,
      title: "vectors & types",
      concepts: [
        {
          id: "creating-vectors", n: 1, title: "creating vectors", level: 1,
          gloss: "Combines values of one type into a vector with c, colon and seq.",
          examples: [
            { code: `scores <- c(90, 72, 85)
names <- c("ada", "grace")
flags <- c(TRUE, FALSE, TRUE)
print(scores)`, notes: [{ at: "c(90", text: "combines values" }, { at: "<-", text: "assignment arrow" }] },
            { code: `squares <- (1:5)^2
print(squares)
print(length(squares))`, notes: [{ at: "1:5", text: "integer sequence" }] },
            { code: `evens <- seq(0, 10, by = 2)
tea <- rep("tea", times = 3)
print(evens)
print(tea)`, notes: [{ at: "rep", text: "repeats a value" }] }
          ]
        },
        {
          id: "types-and-coercion", n: 2, title: "types and coercion", level: 1,
          gloss: "Inspects vector types and converts between them.",
          examples: [
            { code: `x <- 42L
y <- 3.14
z <- "text"
print(class(x))
print(class(y))
print(class(z))`, notes: [{ at: "42L", text: "integer literal" }] },
            { code: `mixed <- c(1, "a", TRUE)
print(mixed)
print(class(mixed))`, notes: [{ at: "c(1, \"a\", TRUE)", text: "coerced to character" }] },
            { code: `print(as.integer("42") + 1L)
print(as.numeric("3.5"))
print(as.character(7))
print(is.numeric(7))`, notes: [{ at: "as.integer", text: "explicit conversion" }] }
          ]
        },
        {
          id: "named-vectors", n: 3, title: "named vectors", level: 1,
          gloss: "Labels elements with names and reads them by name.",
          examples: [
            { code: `prices <- c(tea = 2.5, cake = 4)
print(prices["tea"])
print(names(prices))`, notes: [{ at: "tea =", text: "element name" }] },
            { code: `ages <- c(ada = 36, linus = 54)
ages["grace"] <- 30
print(ages)`, notes: [{ at: "ages[\"grace\"] <-", text: "adds a new element" }] },
            { code: `stock <- c(apple = 4, pear = 0)
names(stock)[2] <- "plum"
print(stock)`, notes: [{ at: "names(stock)[2]", text: "renames one element" }] }
          ]
        },
        {
          id: "sorting-and-summaries", n: 4, title: "sorting and summaries", level: 1,
          gloss: "Orders vectors and summarises them with built-in functions.",
          examples: [
            { code: `nums <- c(3, 1, 2)
print(sort(nums))
print(rev(nums))
print(order(nums))`, notes: [{ at: "order", text: "positions in sorted order" }] },
            { code: `nums <- c(3, 5, 7)
print(sum(nums))
print(mean(nums))
print(range(nums))`, notes: [{ at: "range", text: "minimum and maximum" }] },
            { code: `v <- 1:10
print(head(v, 3))
print(tail(v, 2))
print(which(v > 7))`, notes: [{ at: "which", text: "positions where true" }] }
          ]
        }
      ]
    },
    {
      id: "vectorised-operations",
      n: 2,
      title: "vectorised operations",
      concepts: [
        {
          id: "arithmetic-recycling", n: 1, title: "arithmetic and recycling", level: 1,
          gloss: "Applies operators to every element and recycles shorter vectors.",
          examples: [
            { code: `prices <- c(5, 12.5, 8)
print(prices * 2)
print(prices + c(1, 2, 3))`, notes: [{ at: "*", text: "applies to each element" }] },
            { code: `a <- c(1, 2, 3, 4)
b <- c(10, 20)
print(a + b)`, notes: [{ at: "b", text: "recycled to length four" }] },
            { code: `x <- 1:5
print(x^2)
print(x %% 2 == 0)
print(x %/% 2)`, notes: [{ at: "%%", text: "remainder" }, { at: "%/%", text: "integer division" }] }
          ]
        },
        {
          id: "comparison-and-logic", n: 2, title: "comparison and logic", level: 1,
          gloss: "Compares elements and combines logical vectors.",
          examples: [
            { code: `scores <- c(90, 55, 72)
print(scores >= 60)
print(sum(scores >= 60))`, notes: [{ at: "sum(scores", text: "counts the TRUE values" }] },
            { code: `x <- c(TRUE, FALSE, TRUE)
y <- c(TRUE, TRUE, FALSE)
print(x & y)
print(x | y)
print(!x)`, notes: [{ at: "&", text: "element-wise and" }] },
            { code: `nums <- c(3, 8, 1)
print(any(nums > 5))
print(all(nums > 0))
print(ifelse(nums > 2, "high", "low"))`, notes: [{ at: "ifelse", text: "vectorised if" }] }
          ]
        },
        {
          id: "math-functions", n: 3, title: "math functions", level: 2,
          gloss: "Rounds and accumulates numeric vectors with built-in functions.",
          examples: [
            { code: `x <- c(1.234, 5.678)
print(round(x, 1))
print(floor(x))
print(sqrt(c(4, 9)))`, notes: [{ at: "round(x, 1)", text: "one decimal place" }] },
            { code: `nums <- c(2, 4, 6)
print(cumsum(nums))
print(diff(nums))
print(prod(nums))`, notes: [{ at: "cumsum", text: "running total" }, { at: "diff", text: "successive differences" }] },
            { code: `v <- c(10, 20, 30)
print(mean(v))
print(sd(v))
print(max(v) - min(v))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "lists",
      n: 3,
      title: "lists",
      concepts: [
        {
          id: "creating-lists", n: 1, title: "creating lists", level: 1,
          gloss: "Holds values of different types and lengths in a list.",
          examples: [
            { code: `user <- list(name = "ada", age = 36)
print(user$name)
print(user[["age"]])`, notes: [{ at: "$", text: "by name" }, { at: "[[\"age\"]]", text: "extracts one element" }] },
            { code: `items <- list(1, "two", TRUE)
print(length(items))
print(class(items[[2]]))`, notes: [] },
            { code: `config <- list(host = "localhost", ports = c(80, 443))
str(config)`, notes: [{ at: "str", text: "compact structure view" }] }
          ]
        },
        {
          id: "modifying-lists", n: 2, title: "modifying lists", level: 1,
          gloss: "Adds and removes list elements by name.",
          examples: [
            { code: `user <- list(name = "ada")
user$age <- 36
user[["email"]] <- "ada@example.com"
print(names(user))`, notes: [{ at: "user$age <-", text: "adds an element" }] },
            { code: `user <- list(name = "ada", age = 36)
user$age <- NULL
print(length(user))`, notes: [{ at: "NULL", text: "removes the element" }] },
            { code: `inventory <- list(tea = 4, cake = 0)
print(inventory["tea"])
print(inventory[["tea"]])`, notes: [{ at: "inventory[\"tea\"]", text: "returns a sub-list" }, { at: "inventory[[\"tea\"]]", text: "returns the value" }] }
          ]
        },
        {
          id: "nested-lists", n: 3, title: "nested lists", level: 2,
          gloss: "Reaches into lists inside lists.",
          examples: [
            { code: `order <- list(id = 7, customer = list(name = "ada", city = "Oslo"))
print(order$customer$city)`, notes: [{ at: "$customer$city", text: "chained access" }] },
            { code: `people <- list(list(name = "ada"), list(name = "grace"))
print(people[[2]]$name)`, notes: [] },
            { code: `cfg <- list(db = list(host = "localhost"))
cfg$db$port <- 5432
str(cfg)`, notes: [{ at: "cfg$db$port <-", text: "assigns deep" }] }
          ]
        },
        {
          id: "list-helpers", n: 4, title: "iterating and combining lists", level: 2,
          gloss: "Loops over list names, flattens lists and joins them.",
          examples: [
            { code: `user <- list(name = "ada", age = 36)
for (key in names(user)) {
  cat(key, "=", format(user[[key]]), "\\n")
}`, notes: [{ at: "names(user)", text: "loop over the keys" }] },
            { code: `parts <- list(a = 1:2, b = 3)
print(unlist(parts))`, notes: [{ at: "unlist", text: "flattens to a vector" }] },
            { code: `a <- list(x = 1)
b <- list(y = 2)
print(c(a, b))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "data-frames",
      n: 4,
      title: "data frames",
      concepts: [
        {
          id: "creating-data-frames", n: 1, title: "creating data frames", level: 1,
          gloss: "Builds a table of equal-length columns with data.frame.",
          examples: [
            { code: `users <- data.frame(
  name = c("ada", "grace", "linus"),
  age = c(36, 30, 54)
)
print(users)`, notes: [{ at: "data.frame", text: "columns of equal length" }] },
            { code: `prices <- data.frame(item = c("tea", "cake"), price = c(2.5, 4))
str(prices)`, notes: [] },
            { code: `df <- data.frame(id = 1:3, score = c(90, 72, 85))
print(nrow(df))
print(ncol(df))
print(names(df))`, notes: [{ at: "nrow", text: "number of rows" }] }
          ]
        },
        {
          id: "columns-and-rows", n: 2, title: "columns and rows", level: 1,
          gloss: "Reads columns with a dollar sign and adds or selects rows.",
          examples: [
            { code: `df <- data.frame(name = c("ada", "grace"), age = c(36, 30))
print(df$age)
df$senior <- df$age > 32
print(df)`, notes: [{ at: "df$senior <-", text: "new column" }] },
            { code: `df <- data.frame(id = 1:3, score = c(90, 72, 85))
print(df[2, ])
print(df[df$score > 80, ])`, notes: [{ at: "df[2, ]", text: "row two, all columns" }] },
            { code: `df <- data.frame(id = 1:2, score = c(90, 72))
df <- rbind(df, data.frame(id = 3, score = 85))
print(df)`, notes: [{ at: "rbind", text: "stacks rows" }] }
          ]
        },
        {
          id: "summaries-ordering", n: 3, title: "summaries and ordering", level: 1,
          gloss: "Summarises columns and sorts rows by a column.",
          examples: [
            { code: `df <- data.frame(id = 1:3, score = c(90, 72, 85))
print(summary(df$score))
print(mean(df$score))`, notes: [{ at: "summary", text: "quartiles and mean" }] },
            { code: `df <- data.frame(name = c("ada", "grace"), age = c(36, 30))
print(df[order(df$age), ])`, notes: [{ at: "order(df$age)", text: "row order by age" }] },
            { code: `df <- data.frame(id = 1:3, score = c(90, 72, 85))
print(head(df, 2))
print(dim(df))`, notes: [] }
          ]
        },
        {
          id: "grouping-and-merging", n: 4, title: "grouping and merging", level: 2,
          gloss: "Aggregates by group, joins tables and filters with subset.",
          examples: [
            { code: `sales <- data.frame(city = c("Oslo", "Rome", "Oslo"), n = c(3, 5, 2))
print(aggregate(n ~ city, data = sales, FUN = sum))`, notes: [{ at: "n ~ city", text: "formula: n by city" }] },
            { code: `a <- data.frame(id = 1:2, name = c("ada", "grace"))
b <- data.frame(id = 1:2, age = c(36, 30))
print(merge(a, b, by = "id"))`, notes: [{ at: "merge", text: "joins on a key" }] },
            { code: `df <- data.frame(id = 1:3, score = c(90, 72, 85))
print(subset(df, score > 80, select = id))`, notes: [{ at: "subset", text: "filter rows and columns" }] }
          ]
        }
      ]
    },
    {
      id: "indexing-subsetting",
      n: 5,
      title: "indexing & subsetting",
      concepts: [
        {
          id: "vector-indexing", n: 1, title: "vector indexing", level: 1,
          gloss: "Selects elements by position, negative position or name.",
          examples: [
            { code: `v <- c(10, 20, 30, 40)
print(v[2])
print(v[c(1, 3)])
print(v[-1])`, notes: [{ at: "v[-1]", text: "drops the first element" }] },
            { code: `v <- c(10, 20, 30, 40)
print(v[v > 15])
print(v[2:3])`, notes: [{ at: "v[v > 15]", text: "logical index" }] },
            { code: `v <- c(a = 1, b = 2, c = 3)
print(v["b"])
v[["c"]] <- 30
print(v)`, notes: [] }
          ]
        },
        {
          id: "logical-selection", n: 2, title: "logical selection and which", level: 1,
          gloss: "Filters elements with conditions and finds their positions.",
          examples: [
            { code: `ages <- c(12, 40, 17, 65)
print(ages[ages >= 18])
print(which(ages >= 18))`, notes: [{ at: "which", text: "indices, not values" }] },
            { code: `x <- c(5, 3, 9)
print(which.max(x))
print(which.min(x))`, notes: [] },
            { code: `words <- c("tea", "cake", "jam")
print(words[nchar(words) > 3])
print(words %in% c("tea", "jam"))`, notes: [{ at: "%in%", text: "membership test" }] }
          ]
        },
        {
          id: "matrices", n: 3, title: "matrices", level: 2,
          gloss: "Indexes rows and columns of a two-dimensional array.",
          examples: [
            { code: `m <- matrix(1:6, nrow = 2)
print(m)
print(m[2, 3])
print(m[, 2])`, notes: [{ at: "m[, 2]", text: "whole column" }] },
            { code: `m <- matrix(1:4, nrow = 2, byrow = TRUE)
print(t(m))
print(m %*% m)`, notes: [{ at: "byrow", text: "fills across rows" }, { at: "%*%", text: "matrix product" }] },
            { code: `m <- matrix(1:6, nrow = 2)
print(dim(m))
print(rowSums(m))
print(colMeans(m))`, notes: [] }
          ]
        },
        {
          id: "frame-and-list-indexing", n: 4, title: "data frame and list indexing", level: 2,
          gloss: "Selects from data frames and lists with single and double brackets.",
          examples: [
            { code: `df <- data.frame(id = 1:3, score = c(90, 72, 85))
print(df[df$score > 80, "id"])
print(df[["score"]])`, notes: [{ at: "df[[\"score\"]]", text: "column as a vector" }] },
            { code: `user <- list(name = "ada", tags = c("a", "b"))
print(user$tags[2])
print(user[["tags"]][1])`, notes: [] },
            { code: `df <- data.frame(a = 1:3, b = letters[1:3])
print(df[2:3, ])
print(df[, "b", drop = FALSE])`, notes: [{ at: "drop = FALSE", text: "keeps a data frame" }] }
          ]
        }
      ]
    },
    {
      id: "factors",
      n: 6,
      title: "factors",
      concepts: [
        {
          id: "creating-factors", n: 1, title: "creating factors", level: 1,
          gloss: "Stores categorical data as integer codes with labelled levels.",
          examples: [
            { code: `sizes <- factor(c("small", "large", "small"))
print(sizes)
print(levels(sizes))`, notes: [{ at: "levels", text: "the distinct categories" }] },
            { code: `grades <- factor(c("B", "A", "B"), levels = c("A", "B", "C"))
print(table(grades))`, notes: [{ at: "levels =", text: "sets category order" }] },
            { code: `status <- factor(c("on", "off", "on"))
print(as.integer(status))
print(nlevels(status))`, notes: [{ at: "as.integer", text: "underlying codes" }] }
          ]
        },
        {
          id: "ordered-factors", n: 2, title: "ordered factors", level: 2,
          gloss: "Compares categories that have a natural order.",
          examples: [
            { code: `size <- factor(
  c("S", "L", "M"),
  levels = c("S", "M", "L"),
  ordered = TRUE
)
print(size < "L")`, notes: [{ at: "ordered = TRUE", text: "enables comparison" }] },
            { code: `rating <- factor("good", levels = c("bad", "good"), ordered = TRUE)
print(rating > "bad")`, notes: [] },
            { code: `x <- factor(c("lo", "hi", "lo"), levels = c("lo", "hi"))
print(sort(x))
print(max(as.integer(x)))`, notes: [] }
          ]
        },
        {
          id: "counting-by-group", n: 3, title: "counting by group", level: 2,
          gloss: "Tabulates and summarises values by factor level.",
          examples: [
            { code: `colors <- factor(c("red", "blue", "red"))
print(table(colors))`, notes: [{ at: "table", text: "counts per level" }] },
            { code: `sales <- c(3, 5, 2, 4)
city <- factor(c("Oslo", "Rome", "Oslo", "Rome"))
print(tapply(sales, city, sum))`, notes: [{ at: "tapply", text: "function per group" }] },
            { code: `df <- data.frame(g = factor(c("a", "b", "a")), v = 1:3)
print(split(df$v, df$g))`, notes: [{ at: "split", text: "list of groups" }] }
          ]
        },
        {
          id: "changing-levels", n: 4, title: "changing levels", level: 2,
          gloss: "Renames and drops levels and bins numbers into levels with cut.",
          examples: [
            { code: `f <- factor(c("a", "b", "c"))
levels(f)[levels(f) == "c"] <- "other"
print(f)`, notes: [{ at: "levels(f)[levels(f) == \"c\"]", text: "picks a level" }] },
            { code: `f <- factor(c("a", "b", "b"))
print(droplevels(f[f != "a"]))`, notes: [{ at: "droplevels", text: "removes unused levels" }] },
            { code: `ages <- c(5, 20, 65)
labels <- c("child", "adult", "senior")
print(cut(ages, breaks = c(0, 18, 64, Inf), labels = labels))`, notes: [{ at: "cut", text: "bins numbers into a factor" }] }
          ]
        }
      ]
    },
    {
      id: "functions-control-flow",
      n: 7,
      title: "functions & control flow",
      concepts: [
        {
          id: "defining-functions", n: 1, title: "defining functions", level: 1,
          gloss: "Defines functions whose last expression is the result.",
          examples: [
            { code: `square <- function(n) {
  n * n
}
print(square(4))`, notes: [{ at: "n * n", text: "last value is returned" }] },
            { code: `greet <- function(name, greeting = "Hello") {
  paste(greeting, name)
}
print(greet("ada"))`, notes: [{ at: "= \"Hello\"", text: "default argument" }] },
            { code: `area <- function(w, h) w * h
print(area(3, 4))`, notes: [{ at: "function(w, h) w * h", text: "one-expression body" }] }
          ]
        },
        {
          id: "conditionals", n: 2, title: "if, else and switch", level: 1,
          gloss: "Branches with if and else, switch and vectorised ifelse.",
          examples: [
            { code: `temp <- 28
if (temp > 25) {
  print("warm")
} else if (temp > 10) {
  print("mild")
} else {
  print("cold")
}`, notes: [{ at: "else if", text: "chained test" }] },
            { code: `code <- 404
msg <- switch(
  as.character(code),
  "200" = "ok",
  "404" = "not found",
  "other"
)
print(msg)`, notes: [{ at: "\"other\"", text: "unnamed default" }] },
            { code: `x <- c(5, -2, 0)
print(ifelse(x > 0, "pos", "non-pos"))`, notes: [] }
          ]
        },
        {
          id: "loops", n: 3, title: "loops", level: 1,
          gloss: "Repeats code with for and while and controls it with next and break.",
          examples: [
            { code: `for (i in 1:3) {
  print(i)
}`, notes: [] },
            { code: `n <- 3
while (n > 0) {
  cat(n, "")
  n <- n - 1
}
cat("\\n")`, notes: [{ at: "cat", text: "prints without quotes" }] },
            { code: `for (i in 1:10) {
  if (i == 3) next
  if (i > 5) break
  print(i)
}`, notes: [{ at: "next", text: "skips an iteration" }] }
          ]
        },
        {
          id: "returns-and-lambdas", n: 4, title: "return values, dots and lambdas", level: 2,
          gloss: "Returns lists, accepts extra arguments with dots and writes short lambdas.",
          examples: [
            { code: `stats <- function(x) {
  list(min = min(x), max = max(x))
}
result <- stats(c(3, 1, 2))
print(result$max)`, notes: [{ at: "list(min", text: "several results" }] },
            { code: `total <- function(...) {
  sum(...)
}
print(total(1, 2, 3))`, notes: [{ at: "...", text: "passes extra arguments on" }] },
            { code: `add_one <- \\(x) x + 1
print(add_one(4))
print(sapply(1:3, \\(i) i * 2))`, notes: [{ at: "\\(x)", text: "lambda shorthand" }] }
          ]
        }
      ]
    },
    {
      id: "the-apply-family",
      n: 8,
      title: "the apply family",
      concepts: [
        {
          id: "lapply-sapply", n: 1, title: "lapply and sapply", level: 1,
          gloss: "Applies a function to each element of a vector or list.",
          examples: [
            { code: `nums <- list(1:3, 4:6)
print(lapply(nums, sum))`, notes: [{ at: "lapply", text: "always returns a list" }] },
            { code: `words <- c("tea", "cake", "jam")
print(sapply(words, nchar))`, notes: [{ at: "sapply", text: "simplifies to a vector" }] },
            { code: `print(sapply(1:5, function(i) i^2))`, notes: [] }
          ]
        },
        {
          id: "vapply-mapply", n: 2, title: "vapply, mapply and Map", level: 2,
          gloss: "Applies functions with typed results or over several vectors at once.",
          examples: [
            { code: `x <- c(1, 4, 9)
print(vapply(x, sqrt, numeric(1)))`, notes: [{ at: "numeric(1)", text: "declared result type" }] },
            { code: `print(mapply(function(a, b) a + b, 1:3, 4:6))`, notes: [{ at: "mapply", text: "walks vectors in parallel" }] },
            { code: `print(Map(function(n, s) paste(n, s), c("a", "b"), c("x", "y")))`, notes: [] }
          ]
        },
        {
          id: "apply-matrices", n: 3, title: "apply on matrices", level: 2,
          gloss: "Applies a function across the rows or columns of a matrix.",
          examples: [
            { code: `m <- matrix(1:6, nrow = 2)
print(apply(m, 1, sum))
print(apply(m, 2, max))`, notes: [{ at: "1", text: "rows" }, { at: "2", text: "columns" }] },
            { code: `m <- matrix(c(1, 2, 3, 4), nrow = 2)
print(apply(m, c(1, 2), function(v) v * 10))`, notes: [{ at: "c(1, 2)", text: "every cell" }] },
            { code: `scores <- matrix(c(90, 80, 70, 60), nrow = 2)
print(apply(scores, 1, mean))`, notes: [] }
          ]
        },
        {
          id: "group-apply", n: 4, title: "tapply and split", level: 2,
          gloss: "Computes a summary per group by splitting data first.",
          examples: [
            { code: `sales <- c(3, 5, 2, 4)
city <- c("Oslo", "Rome", "Oslo", "Rome")
print(tapply(sales, city, sum))`, notes: [] },
            { code: `df <- data.frame(g = c("a", "b", "a"), v = 1:3)
print(sapply(split(df$v, df$g), sum))`, notes: [{ at: "split", text: "then sapply per piece" }] },
            { code: `words <- c("tea", "cake", "jam", "bun")
print(table(nchar(words)))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "strings-regex",
      n: 9,
      title: "strings & regex",
      concepts: [
        {
          id: "basic-string-functions", n: 1, title: "basic string functions", level: 1,
          gloss: "Joins text, measures lengths and cuts or splits character vectors.",
          examples: [
            { code: `name <- "ada"
print(paste("Hello,", name))
print(paste0("id_", 1:3))`, notes: [{ at: "paste0", text: "no separator" }] },
            { code: `title <- "Quarterly Report"
print(toupper(title))
print(nchar(title))
print(substr(title, 1, 9))`, notes: [{ at: "substr", text: "start and stop positions" }] },
            { code: `csv <- "ada,grace,linus"
parts <- strsplit(csv, ",")[[1]]
print(parts)
print(paste(parts, collapse = " | "))`, notes: [{ at: "[[1]]", text: "strsplit returns a list" }, { at: "collapse", text: "joins into one string" }] }
          ]
        },
        {
          id: "formatting", n: 2, title: "trimming and formatting", level: 1,
          gloss: "Formats numbers and text with padding, rounding and separators.",
          examples: [
            { code: `print(trimws("  padded  "))
print(sprintf("%05.1f", 3.14159))
print(sprintf("%s has %d items", "cart", 3L))`, notes: [{ at: "sprintf", text: "printf-style formatting" }] },
            { code: `print(format(1234567.891, big.mark = ",", nsmall = 2))
print(formatC(7, width = 3, flag = "0"))
print(format(0.5, nsmall = 2))`, notes: [{ at: "big.mark", text: "thousands separator" }] },
            { code: `x <- c("b", "a", "c")
print(sort(x))
print(rev(x))
print(sprintf("%-5s|", "ada"))`, notes: [] }
          ]
        },
        {
          id: "regular-expressions", n: 3, title: "regular expressions", level: 2,
          gloss: "Matches text with grepl and rewrites or extracts it with sub, gsub and regmatches.",
          examples: [
            { code: `files <- c("a.txt", "b.csv", "c.txt")
print(grepl("\\\\.txt$", files))
print(files[grepl("\\\\.txt$", files)])`, notes: [{ at: "\\\\.", text: "escaped dot" }] },
            { code: `text <- "red apple, red car"
print(sub("red", "green", text))
print(gsub("red", "green", text))`, notes: [{ at: "sub", text: "first match" }, { at: "gsub", text: "every match" }] },
            { code: `phone <- "call 555-1234 now"
print(regmatches(phone, regexpr("[0-9]+-[0-9]+", phone)))`, notes: [{ at: "regmatches", text: "returns matched text" }] }
          ]
        },
        {
          id: "searching-strings", n: 4, title: "searching and transforming", level: 2,
          gloss: "Tests prefixes, finds positions and swaps characters.",
          examples: [
            { code: `x <- c("tea", "cake")
print(startsWith(x, "t"))
print(endsWith(x, "e"))`, notes: [] },
            { code: `print(unlist(gregexpr("p", "apple")))`, notes: [{ at: "gregexpr", text: "all match positions" }] },
            { code: `print(chartr("abc", "xyz", "aabbcc"))
print(rev(strsplit("stream", "")[[1]]))`, notes: [{ at: "chartr", text: "character-for-character swap" }] }
          ]
        }
      ]
    },
    {
      id: "missing-values",
      n: 10,
      title: "missing values",
      concepts: [
        {
          id: "na-basics", n: 1, title: "NA basics", level: 1,
          gloss: "Detects missing values and handles them in arithmetic.",
          examples: [
            { code: `x <- c(5, NA, 3)
print(is.na(x))
print(sum(is.na(x)))`, notes: [{ at: "is.na", text: "logical vector" }] },
            { code: `y <- c(1, NA, 3)
print(sum(y))
print(sum(y, na.rm = TRUE))`, notes: [{ at: "na.rm", text: "ignore missing values" }] },
            { code: `print(NA + 1)
print(NA > 1)
print(NA & FALSE)`, notes: [{ at: "NA & FALSE", text: "still FALSE" }] }
          ]
        },
        {
          id: "removing-replacing", n: 2, title: "removing and replacing", level: 2,
          gloss: "Drops or fills missing values in vectors and data frames.",
          examples: [
            { code: `x <- c(5, NA, 3)
print(x[!is.na(x)])
print(as.vector(na.omit(x)))`, notes: [{ at: "na.omit", text: "drops missing values" }] },
            { code: `x <- c(5, NA, 3)
x[is.na(x)] <- 0
print(x)`, notes: [{ at: "x[is.na(x)] <-", text: "fills by index" }] },
            { code: `df <- data.frame(a = c(1, NA, 3), b = c("x", "y", NA))
print(complete.cases(df))
print(df[complete.cases(df), ])`, notes: [{ at: "complete.cases", text: "rows without NA" }] }
          ]
        },
        {
          id: "na-statistics", n: 3, title: "missing values in statistics", level: 2,
          gloss: "Computes summaries while skipping or replacing missing data.",
          examples: [
            { code: `scores <- c(90, NA, 70)
print(mean(scores, na.rm = TRUE))
print(max(scores, na.rm = TRUE))`, notes: [] },
            { code: `df <- data.frame(g = c("a", "b"), v = c(1, NA))
print(colSums(is.na(df)))`, notes: [{ at: "colSums", text: "counts of NA per column" }] },
            { code: `x <- c(1, NA, 3)
print(ifelse(is.na(x), mean(x, na.rm = TRUE), x))`, notes: [] }
          ]
        },
        {
          id: "null-nan-inf", n: 4, title: "NULL, NaN and Inf", level: 2,
          gloss: "Tells apart empty, undefined and infinite values.",
          examples: [
            { code: `print(is.null(NULL))
print(length(NULL))
l <- list(a = 1, b = NULL)
print(length(l))`, notes: [{ at: "NULL", text: "length zero" }] },
            { code: `print(0 / 0)
print(is.nan(0 / 0))
print(1 / 0)`, notes: [{ at: "is.nan", text: "true only for NaN" }] },
            { code: `x <- c(1, NaN, Inf, NA)
print(is.finite(x))
print(is.na(x))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "base-plotting",
      n: 11,
      title: "base plotting",
      concepts: [
        {
          id: "plot-basics", n: 1, title: "plot basics", level: 1,
          gloss: "Draws scatter and line plots with plot.",
          examples: [
            { code: `x <- 1:10
y <- x^2
plot(x, y)`, notes: [{ at: "plot", text: "scatter by default" }] },
            { code: `scores <- c(90, 72, 85)
plot(scores, type = "b", main = "Scores", xlab = "Test")`, notes: [{ at: "type = \"b\"", text: "points and lines" }] },
            { code: `x <- seq(0, 2 * pi, length.out = 50)
plot(x, sin(x), type = "l", col = "blue")`, notes: [{ at: "type = \"l\"", text: "line only" }] }
          ]
        },
        {
          id: "chart-types", n: 2, title: "chart types", level: 1,
          gloss: "Draws column charts, histograms and box plots.",
          examples: [
            { code: `sales <- c(Oslo = 3, Rome = 5, Paris = 4)
barplot(sales, main = "Sales", col = "steelblue")`, notes: [{ at: "barplot", text: "bars from named values" }] },
            { code: `values <- c(2, 3, 3, 4, 4, 4, 5)
hist(values, breaks = 4)`, notes: [{ at: "hist", text: "distribution of values" }] },
            { code: `groups <- data.frame(g = c("a", "a", "b", "b"), v = c(1, 2, 3, 5))
boxplot(v ~ g, data = groups)`, notes: [{ at: "v ~ g", text: "values by group" }] }
          ]
        },
        {
          id: "adding-layers", n: 3, title: "adding to a plot", level: 2,
          gloss: "Adds lines, points, fitted lines and legends to an existing plot.",
          examples: [
            { code: `x <- 1:5
plot(x, x, type = "l")
lines(x, x^2, col = "red")
points(x, x^2, pch = 19)`, notes: [{ at: "lines", text: "adds a line" }, { at: "points", text: "adds markers" }] },
            { code: `x <- c(1, 2, 3, 4)
y <- c(2, 4, 5, 8)
plot(x, y)
abline(lm(y ~ x), col = "red")`, notes: [{ at: "lm(y ~ x)", text: "linear model" }] },
            { code: `plot(1:3, c(2, 4, 3), type = "b", col = "blue")
legend("topleft", legend = "series", col = "blue", lty = 1)`, notes: [] }
          ]
        },
        {
          id: "devices-and-layout", n: 4, title: "saving and layout", level: 2,
          gloss: "Writes plots to files and arranges several plots on one page.",
          examples: [
            { code: `png("chart.png", width = 400, height = 300)
plot(1:5)
dev.off()`, notes: [{ at: "png", text: "opens a file device" }, { at: "dev.off", text: "closes and saves" }] },
            { code: `par(mfrow = c(1, 2))
plot(1:3)
hist(c(1, 2, 2, 3))`, notes: [{ at: "mfrow", text: "one row, two panels" }] },
            { code: `pdf("report.pdf")
barplot(c(a = 1, b = 2))
dev.off()`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "pipes-functional-tools",
      n: 12,
      title: "pipes & functional tools",
      concepts: [
        {
          id: "native-pipe", n: 1, title: "the native pipe", level: 1,
          gloss: "Passes the result of one call into the next with the pipe operator.",
          examples: [
            { code: `nums <- c(4, 9, 16)
nums |> sqrt() |> sum() |> print()`, notes: [{ at: "|>", text: "left side becomes first argument" }] },
            { code: `c(3, 1, 2) |> sort() |> rev() |> print()`, notes: [] },
            { code: `df <- data.frame(id = 1:3, score = c(90, 72, 85))
df |> subset(score > 80) |> nrow() |> print()`, notes: [] }
          ]
        },
        {
          id: "filter-map-reduce", n: 2, title: "Filter, Map and Reduce", level: 2,
          gloss: "Picks elements with Filter, transforms with Map and folds with Reduce.",
          examples: [
            { code: `nums <- 1:6
print(Filter(function(n) n %% 2 == 0, nums))
print(Map(function(n) n * 2, 1:2))`, notes: [{ at: "Filter", text: "keeps matching elements" }] },
            { code: `print(Reduce(\`+\`, 1:5))
print(Reduce(function(a, b) a * b, 1:5, accumulate = TRUE))`, notes: [{ at: "`+`", text: "operator as a function" }, { at: "accumulate", text: "keeps running results" }] },
            { code: `words <- c("tea", "cake", "jam")
print(Filter(function(w) nchar(w) > 3, words))
print(Position(function(w) w == "jam", words))`, notes: [] }
          ]
        },
        {
          id: "closures-composition", n: 3, title: "closures and composition", level: 2,
          gloss: "Returns functions from functions and chains them.",
          examples: [
            { code: `square <- \\(x) x^2
print(sapply(1:4, square))`, notes: [] },
            { code: `compose <- function(f, g) function(x) g(f(x))
inc_then_double <- compose(\\(x) x + 1, \\(x) x * 2)
print(inc_then_double(3))`, notes: [{ at: "function(x)", text: "returned closure" }] },
            { code: `add <- function(n) function(x) x + n
add5 <- add(5)
print(add5(10))`, notes: [{ at: "n", text: "remembered by the closure" }] }
          ]
        },
        {
          id: "do-call-vectorize", n: 4, title: "do.call and Vectorize", level: 3,
          gloss: "Calls functions with argument lists and lifts scalar functions to vectors.",
          examples: [
            { code: `args <- list(1:10)
print(do.call(mean, args))`, notes: [{ at: "do.call", text: "arguments from a list" }] },
            { code: `pieces <- list("a", "b", sep = "-")
print(do.call(paste, pieces))`, notes: [] },
            { code: `bigger <- Vectorize(function(a, b) if (a > b) a else b)
print(bigger(c(1, 5), c(3, 2)))`, notes: [{ at: "Vectorize", text: "scalar function over vectors" }] }
          ]
        }
      ]
    },
    {
      id: "s3-classes",
      n: 13,
      title: "S3 classes",
      concepts: [
        {
          id: "creating-objects", n: 1, title: "creating S3 objects", level: 1,
          gloss: "Tags a list with a class attribute to make an object.",
          examples: [
            { code: `dog <- list(name = "rex", sound = "woof")
class(dog) <- "animal"
print(class(dog))`, notes: [{ at: "class(dog) <-", text: "sets the class" }] },
            { code: `new_point <- function(x, y) {
  structure(list(x = x, y = y), class = "point")
}
p <- new_point(1, 2)
print(inherits(p, "point"))`, notes: [{ at: "structure", text: "list plus attributes" }] },
            { code: `account <- list(owner = "ada", balance = 100)
class(account) <- "account"
print(unclass(account)$balance)`, notes: [{ at: "unclass", text: "strips the class" }] }
          ]
        },
        {
          id: "generics-methods", n: 2, title: "generics and methods", level: 2,
          gloss: "Dispatches on class with UseMethod and name.class methods.",
          examples: [
            { code: `speak <- function(x) UseMethod("speak")
speak.default <- function(x) "..."
speak.dog <- function(x) "woof"
print(speak(structure(list(), class = "dog")))`, notes: [{ at: "UseMethod", text: "picks the method by class" }, { at: "speak.default", text: "fallback method" }] },
            { code: `print.point <- function(x, ...) {
  cat("Point(", x$x, ",", x$y, ")\\n")
}
p <- structure(list(x = 1, y = 2), class = "point")
print(p)`, notes: [{ at: "print.point", text: "used by print" }] },
            { code: `format.money <- function(x, ...) paste0(x$amount, " EUR")
m <- structure(list(amount = 5), class = "money")
print(format(m))`, notes: [] }
          ]
        },
        {
          id: "inheritance", n: 3, title: "inheritance and NextMethod", level: 2,
          gloss: "Chains class vectors and calls the next method with NextMethod.",
          examples: [
            { code: `describe <- function(x) UseMethod("describe")
describe.animal <- function(x) "an animal"
describe.dog <- function(x) paste("a dog,", NextMethod())
d <- structure(list(), class = c("dog", "animal"))
print(describe(d))`, notes: [{ at: "NextMethod", text: "calls the parent class method" }] },
            { code: `area <- function(s) UseMethod("area")
area.square <- function(s) s$side^2
area.circle <- function(s) pi * s$r^2
print(area(structure(list(side = 3), class = "square")))`, notes: [] },
            { code: `x <- structure(list(), class = c("child", "parent"))
print(inherits(x, "parent"))
print(inherits(x, c("a", "child"), which = TRUE))`, notes: [{ at: "class = c(\"child\", \"parent\")", text: "most specific first" }] }
          ]
        },
        {
          id: "operators-validators", n: 4, title: "operators and constructors", level: 3,
          gloss: "Overloads operators and validates input in constructor functions.",
          examples: [
            { code: `"+.money" <- function(e1, e2) {
  structure(list(amount = e1$amount + e2$amount), class = "money")
}
a <- structure(list(amount = 2), class = "money")
print((a + a)$amount)`, notes: [{ at: "\"+.money\"", text: "overloads the plus operator" }] },
            { code: `toString.point <- function(x, ...) paste0("(", x$x, ", ", x$y, ")")
p <- structure(list(x = 1, y = 2), class = "point")
print(toString(p))`, notes: [] },
            { code: `new_temp <- function(c) {
  stopifnot(is.numeric(c))
  structure(list(celsius = c), class = "temp")
}
print(new_temp(20)$celsius)`, notes: [{ at: "stopifnot", text: "validates the input" }] }
          ]
        }
      ]
    }
  ]
};
