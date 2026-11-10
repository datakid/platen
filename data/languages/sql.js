export default {
  id: "sql",
  name: "SQL",
  short: "SQL",
  pigment: "sql",
  family: null,
  version: "ANSI",
  lexer: "sql",
  indent: 2,
  topics: [
    {
      id: "select-where",
      n: 1,
      title: "SELECT & WHERE",
      concepts: [
        {
          id: "select-columns", n: 1, title: "choosing columns", level: 1,
          gloss: "Chooses which columns to return from a table.",
          examples: [
            { code: `SELECT name, city
FROM customers;`, notes: [{ at: "SELECT", text: "the columns to return" }] },
            { code: `SELECT *
FROM products;`, notes: [{ at: "*", text: "every column" }] },
            { code: `SELECT name AS customer, country AS nation
FROM customers;`, notes: [{ at: "AS customer", text: "renames the output column" }] }
          ]
        },
        {
          id: "distinct-expressions", n: 2, title: "distinct and expressions", level: 1,
          gloss: "Returns unique rows and computed columns.",
          examples: [
            { code: `SELECT DISTINCT country
FROM customers;`, notes: [{ at: "DISTINCT", text: "drops duplicate rows" }] },
            { code: `SELECT name, price * 1.2 AS gross
FROM products;`, notes: [{ at: "price * 1.2", text: "computed for every row" }] },
            { code: `SELECT name || ' (' || country || ')' AS label
FROM customers;`, notes: [{ at: "||", text: "joins text" }] }
          ]
        },
        {
          id: "where-comparisons", n: 3, title: "comparisons", level: 1,
          gloss: "Filters rows with comparison and logical operators.",
          examples: [
            { code: `SELECT name
FROM customers
WHERE country = 'UK';`, notes: [{ at: "WHERE", text: "keeps rows that are true" }] },
            { code: `SELECT id, total
FROM orders
WHERE total > 50 AND status = 'paid';`, notes: [{ at: "AND", text: "both conditions must hold" }] },
            { code: `SELECT name
FROM products
WHERE category = 'books' OR price < 20;`, notes: [] }
          ]
        },
        {
          id: "where-patterns", n: 4, title: "ranges, lists and patterns", level: 2,
          gloss: "Matches ranges, lists and text patterns in a WHERE clause.",
          examples: [
            { code: `SELECT id
FROM orders
WHERE total BETWEEN 50 AND 150;`, notes: [{ at: "BETWEEN", text: "both ends are included" }] },
            { code: `SELECT name
FROM customers
WHERE country IN ('UK', 'US');`, notes: [{ at: "IN", text: "matches any listed value" }] },
            { code: `SELECT name
FROM customers
WHERE name LIKE 'A%';`, notes: [{ at: "'A%'", text: "starts with A" }] }
          ]
        }
      ]
    },
    {
      id: "order-limit",
      n: 2,
      title: "ORDER BY & LIMIT",
      concepts: [
        {
          id: "order-by", n: 1, title: "ORDER BY", level: 1,
          gloss: "Sorts the result by one or more columns.",
          examples: [
            { code: `SELECT name, salary
FROM employees
ORDER BY salary DESC;`, notes: [{ at: "DESC", text: "largest first" }] },
            { code: `SELECT name, dept, salary
FROM employees
ORDER BY dept, salary DESC;`, notes: [{ at: "dept, salary DESC", text: "ties on dept sort by salary" }] },
            { code: `SELECT name, salary * 12 AS yearly
FROM employees
ORDER BY yearly;`, notes: [{ at: "yearly", text: "an alias works in ORDER BY" }] }
          ]
        },
        {
          id: "limit-offset", n: 2, title: "LIMIT and OFFSET", level: 1,
          gloss: "Returns only part of the sorted result.",
          examples: [
            { code: `SELECT id, total
FROM orders
ORDER BY total DESC
LIMIT 3;`, notes: [{ at: "LIMIT 3", text: "the three largest orders" }] },
            { code: `SELECT id, total
FROM orders
ORDER BY id
LIMIT 2 OFFSET 2;`, notes: [{ at: "OFFSET 2", text: "skips the first two rows" }] },
            { code: `SELECT name
FROM products
ORDER BY price
LIMIT 1;`, notes: [{ at: "LIMIT 1", text: "the cheapest product" }] }
          ]
        },
        {
          id: "order-nulls", n: 3, title: "sorting NULLs", level: 2,
          gloss: "Controls where NULL values sort.",
          examples: [
            { code: `SELECT name, city
FROM customers
ORDER BY city NULLS LAST;`, notes: [{ at: "NULLS LAST", text: "missing cities go to the end" }] },
            { code: `SELECT name, city
FROM customers
ORDER BY city DESC NULLS FIRST;`, notes: [] },
            { code: `SELECT name, COALESCE(city, 'unknown') AS city
FROM customers
ORDER BY city;`, notes: [{ at: "COALESCE", text: "replaces NULL before sorting" }] }
          ]
        },
        {
          id: "order-expressions", n: 4, title: "sorting by expressions", level: 2,
          gloss: "Sorts by computed values and by column positions.",
          examples: [
            { code: `SELECT name
FROM customers
ORDER BY LENGTH(name);`, notes: [{ at: "LENGTH(name)", text: "sorts by a computed value" }] },
            { code: `SELECT name, price
FROM products
ORDER BY 2 DESC;`, notes: [{ at: "2", text: "the second selected column" }] },
            { code: `SELECT name
FROM employees
ORDER BY CASE WHEN dept = 'eng' THEN 0 ELSE 1 END, name;`, notes: [{ at: "CASE", text: "a custom sort order" }] }
          ]
        }
      ]
    },
    {
      id: "aggregates-group-by",
      n: 3,
      title: "aggregates & GROUP BY",
      concepts: [
        {
          id: "aggregate-functions", n: 1, title: "aggregate functions", level: 1,
          gloss: "Collapses many rows into one value.",
          examples: [
            { code: `SELECT COUNT(*) AS orders, SUM(total) AS revenue
FROM orders;`, notes: [{ at: "COUNT(*)", text: "counts every row" }] },
            { code: `SELECT MIN(price), MAX(price), AVG(price)
FROM products;`, notes: [] },
            { code: `SELECT COUNT(city) AS with_city, COUNT(*) AS everyone
FROM customers;`, notes: [{ at: "COUNT(city)", text: "skips NULL values" }] }
          ]
        },
        {
          id: "group-by", n: 2, title: "GROUP BY", level: 1,
          gloss: "Computes one aggregate row per group.",
          examples: [
            { code: `SELECT status, COUNT(*) AS n
FROM orders
GROUP BY status;`, notes: [{ at: "GROUP BY", text: "one row per status" }] },
            { code: `SELECT dept, AVG(salary) AS avg_salary
FROM employees
GROUP BY dept;`, notes: [] },
            { code: `SELECT customer_id, SUM(total) AS spent
FROM orders
GROUP BY customer_id
ORDER BY spent DESC;`, notes: [] }
          ]
        },
        {
          id: "group-multiple", n: 3, title: "several grouping keys", level: 2,
          gloss: "Groups by several columns or expressions.",
          examples: [
            { code: `SELECT dept, manager_id, COUNT(*) AS n
FROM employees
GROUP BY dept, manager_id;`, notes: [{ at: "dept, manager_id", text: "one row per pair" }] },
            { code: `SELECT SUBSTR(placed, 1, 7) AS month, SUM(total) AS revenue
FROM orders
GROUP BY SUBSTR(placed, 1, 7);`, notes: [{ at: "SUBSTR(placed, 1, 7)", text: "year and month of an ISO date" }] },
            { code: `SELECT country, COUNT(*) AS n
FROM customers
GROUP BY country
ORDER BY n DESC, country;`, notes: [] }
          ]
        },
        {
          id: "distinct-aggregates", n: 4, title: "distinct and filtered aggregates", level: 2,
          gloss: "Counts distinct values, joins text and filters inside a group.",
          examples: [
            { code: `SELECT COUNT(DISTINCT customer_id) AS buyers
FROM orders;`, notes: [{ at: "DISTINCT", text: "each customer counted once" }] },
            { code: `SELECT dept, string_agg(name, ', ') AS names
FROM employees
GROUP BY dept;`, notes: [{ at: "string_agg", text: "joins the values in each group" }] },
            { code: `SELECT status, SUM(total) FILTER (WHERE total > 50) AS big
FROM orders
GROUP BY status;`, notes: [{ at: "FILTER", text: "aggregates only matching rows" }] }
          ]
        }
      ]
    },
    {
      id: "having",
      n: 4,
      title: "HAVING",
      concepts: [
        {
          id: "having-basics", n: 1, title: "HAVING", level: 2,
          gloss: "Filters groups after aggregation.",
          examples: [
            { code: `SELECT customer_id, SUM(total) AS spent
FROM orders
GROUP BY customer_id
HAVING SUM(total) > 100;`, notes: [{ at: "HAVING", text: "tests the aggregate, not a row" }] },
            { code: `SELECT dept, COUNT(*) AS n
FROM employees
GROUP BY dept
HAVING COUNT(*) >= 2;`, notes: [] },
            { code: `SELECT status, AVG(total) AS avg_total
FROM orders
GROUP BY status
HAVING AVG(total) < 100;`, notes: [] }
          ]
        },
        {
          id: "where-vs-having", n: 2, title: "WHERE versus HAVING", level: 2,
          gloss: "Separates row filters from group filters.",
          examples: [
            { code: `SELECT customer_id, COUNT(*) AS n
FROM orders
WHERE status = 'paid'
GROUP BY customer_id
HAVING COUNT(*) > 1;`, notes: [{ at: "WHERE", text: "filters rows before grouping" }, { at: "HAVING", text: "filters groups afterwards" }] },
            { code: `SELECT dept, MAX(salary) AS top
FROM employees
WHERE hired >= '2021-01-01'
GROUP BY dept
HAVING MAX(salary) > 80;`, notes: [] },
            { code: `SELECT category, COUNT(*) AS n
FROM products
WHERE price > 10
GROUP BY category
HAVING COUNT(*) = 1;`, notes: [] }
          ]
        },
        {
          id: "having-combined", n: 3, title: "combined conditions", level: 3,
          gloss: "Combines several aggregate conditions in HAVING.",
          examples: [
            { code: `SELECT customer_id, COUNT(*) AS n, SUM(total) AS spent
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 1 AND SUM(total) > 100;`, notes: [{ at: "AND", text: "both aggregates must pass" }] },
            { code: `SELECT country, COUNT(*) AS n
FROM customers
GROUP BY country
HAVING COUNT(*) > 1 OR country = 'US';`, notes: [{ at: "country = 'US'", text: "a grouped column is allowed" }] },
            { code: `SELECT dept, MIN(salary) AS low, MAX(salary) AS high
FROM employees
GROUP BY dept
HAVING MAX(salary) - MIN(salary) > 10;`, notes: [{ at: "MAX(salary) - MIN(salary)", text: "the spread within a group" }] }
          ]
        }
      ]
    },
    {
      id: "joins",
      n: 5,
      title: "joins",
      concepts: [
        {
          id: "inner-join", n: 1, title: "INNER JOIN", level: 1,
          gloss: "Combines rows from two tables where the keys match.",
          examples: [
            { code: `SELECT c.name, o.total
FROM customers c
JOIN orders o ON o.customer_id = c.id;`, notes: [{ at: "ON o.customer_id = c.id", text: "the matching condition" }] },
            { code: `SELECT o.id, p.name, i.qty
FROM order_items i
JOIN orders o ON o.id = i.order_id
JOIN products p ON p.id = i.product_id;`, notes: [{ at: "JOIN products", text: "joins can chain" }] },
            { code: `SELECT c.name, SUM(o.total) AS spent
FROM customers c
JOIN orders o ON o.customer_id = c.id
GROUP BY c.name;`, notes: [] }
          ]
        },
        {
          id: "outer-joins", n: 2, title: "outer joins", level: 2,
          gloss: "Keeps unmatched rows from one or both sides.",
          examples: [
            { code: `SELECT c.name, o.id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;`, notes: [{ at: "LEFT JOIN", text: "every customer, matched or not" }] },
            { code: `SELECT c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;`, notes: [{ at: "o.id IS NULL", text: "customers with no orders" }] },
            { code: `SELECT c.name, o.id
FROM customers c
FULL OUTER JOIN orders o ON o.customer_id = c.id;`, notes: [{ at: "FULL OUTER JOIN", text: "unmatched rows from both sides" }] }
          ]
        },
        {
          id: "self-cross-joins", n: 3, title: "self and cross joins", level: 3,
          gloss: "Joins a table to itself or builds every combination.",
          examples: [
            { code: `SELECT e.name, m.name AS manager
FROM employees e
JOIN employees m ON m.id = e.manager_id;`, notes: [{ at: "employees m", text: "the same table, a second alias" }] },
            { code: `SELECT p.name, c.name AS customer
FROM products p
CROSS JOIN customers c;`, notes: [{ at: "CROSS JOIN", text: "every pair of rows" }] },
            { code: `SELECT a.name, b.name AS peer
FROM employees a
JOIN employees b ON a.dept = b.dept AND a.id < b.id;`, notes: [{ at: "a.id < b.id", text: "each pair appears once" }] }
          ]
        },
        {
          id: "join-aggregates", n: 4, title: "joins with aggregates", level: 2,
          gloss: "Joins first, then aggregates the combined rows.",
          examples: [
            { code: `SELECT p.category, SUM(i.qty) AS units
FROM order_items i
JOIN products p ON p.id = i.product_id
GROUP BY p.category;`, notes: [{ at: "GROUP BY", text: "runs after the join" }] },
            { code: `SELECT c.country, COUNT(o.id) AS orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.country;`, notes: [{ at: "COUNT(o.id)", text: "0 for customers without orders" }] },
            { code: `SELECT o.id, SUM(i.qty * p.price) AS value
FROM orders o
JOIN order_items i ON i.order_id = o.id
JOIN products p ON p.id = i.product_id
GROUP BY o.id;`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "subqueries",
      n: 6,
      title: "subqueries",
      concepts: [
        {
          id: "scalar-subqueries", n: 1, title: "scalar subqueries", level: 2,
          gloss: "Uses a single value from a nested query.",
          examples: [
            { code: `SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);`, notes: [{ at: "(SELECT AVG(price) FROM products)", text: "one value, computed once" }] },
            { code: `SELECT id, total, total - (SELECT AVG(total) FROM orders) AS diff
FROM orders;`, notes: [] },
            { code: `SELECT name
FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);`, notes: [] }
          ]
        },
        {
          id: "in-exists", n: 2, title: "IN and EXISTS", level: 2,
          gloss: "Tests membership with IN and EXISTS subqueries.",
          examples: [
            { code: `SELECT name
FROM customers
WHERE id IN (SELECT customer_id FROM orders);`, notes: [{ at: "IN", text: "matches any value the subquery returns" }] },
            { code: `SELECT name
FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);`, notes: [{ at: "SELECT 1", text: "the selected value is ignored" }] },
            { code: `SELECT name
FROM customers
WHERE id NOT IN (
  SELECT customer_id FROM orders WHERE customer_id IS NOT NULL
);`, notes: [{ at: "IS NOT NULL", text: "a NULL breaks NOT IN" }] }
          ]
        },
        {
          id: "correlated-subqueries", n: 3, title: "correlated subqueries", level: 3,
          gloss: "Runs a nested query once per outer row.",
          examples: [
            { code: `SELECT e.name, e.salary
FROM employees e
WHERE e.salary > (
  SELECT AVG(salary) FROM employees WHERE dept = e.dept
);`, notes: [{ at: "dept = e.dept", text: "refers to the outer row" }] },
            { code: `SELECT c.name,
  (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS n
FROM customers c;`, notes: [{ at: "AS n", text: "a subquery as a column" }] },
            { code: `SELECT o.id, o.total
FROM orders o
WHERE o.total = (
  SELECT MAX(total) FROM orders WHERE customer_id = o.customer_id
);`, notes: [] }
          ]
        },
        {
          id: "derived-tables", n: 4, title: "derived tables", level: 2,
          gloss: "Selects from a subquery in the FROM clause.",
          examples: [
            { code: `SELECT dept, avg_salary
FROM (
  SELECT dept, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY dept
) t
WHERE avg_salary > 90;`, notes: [{ at: "t", text: "a derived table needs an alias" }] },
            { code: `SELECT MAX(n)
FROM (SELECT COUNT(*) AS n FROM orders GROUP BY customer_id) t;`, notes: [{ at: "MAX(n)", text: "an aggregate of aggregates" }] },
            { code: `SELECT t.customer_id, t.spent
FROM (
  SELECT customer_id, SUM(total) AS spent
  FROM orders
  GROUP BY customer_id
) t
ORDER BY t.spent DESC
LIMIT 1;`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "ctes",
      n: 7,
      title: "CTEs",
      concepts: [
        {
          id: "with-basics", n: 1, title: "WITH", level: 2,
          gloss: "Names a subquery with WITH so a query reads top to bottom.",
          examples: [
            { code: `WITH paid AS (
  SELECT * FROM orders WHERE status = 'paid'
)
SELECT customer_id, SUM(total) AS spent
FROM paid
GROUP BY customer_id;`, notes: [{ at: "paid", text: "usable like a table below" }] },
            { code: `WITH big AS (
  SELECT id, total FROM orders WHERE total > 100
)
SELECT COUNT(*) AS n FROM big;`, notes: [] },
            { code: `WITH uk AS (
  SELECT id, name FROM customers WHERE country = 'UK'
)
SELECT uk.name, o.total
FROM uk
JOIN orders o ON o.customer_id = uk.id;`, notes: [] }
          ]
        },
        {
          id: "multiple-ctes", n: 2, title: "several CTEs", level: 2,
          gloss: "Chains several CTEs, each able to use the earlier ones.",
          examples: [
            { code: `WITH paid AS (
  SELECT * FROM orders WHERE status = 'paid'
),
spend AS (
  SELECT customer_id, SUM(total) AS spent
  FROM paid
  GROUP BY customer_id
)
SELECT * FROM spend WHERE spent > 100;`, notes: [{ at: "spend", text: "reads from paid" }] },
            { code: `WITH a AS (SELECT dept, AVG(salary) AS s FROM employees GROUP BY dept),
  b AS (SELECT AVG(salary) AS overall FROM employees)
SELECT a.dept
FROM a, b
WHERE a.s > b.overall;`, notes: [{ at: "b", text: "a second CTE, separated by a comma" }] },
            { code: `WITH totals AS (
  SELECT customer_id, SUM(total) AS t FROM orders GROUP BY customer_id
),
ranked AS (
  SELECT customer_id, t FROM totals ORDER BY t DESC LIMIT 2
)
SELECT c.name, r.t
FROM ranked r
JOIN customers c ON c.id = r.customer_id;`, notes: [] }
          ]
        },
        {
          id: "recursive-ctes", n: 3, title: "recursive CTEs", level: 3,
          gloss: "Walks hierarchies or generates sequences with WITH RECURSIVE.",
          examples: [
            { code: `WITH RECURSIVE nums(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM nums WHERE n < 5
)
SELECT n FROM nums;`, notes: [{ at: "UNION ALL", text: "the recursive part repeats" }, { at: "WHERE n < 5", text: "the stop condition" }] },
            { code: `WITH RECURSIVE chain(id, name, depth) AS (
  SELECT id, name, 0 FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, c.depth + 1
  FROM employees e
  JOIN chain c ON e.manager_id = c.id
)
SELECT name, depth FROM chain;`, notes: [{ at: "manager_id IS NULL", text: "the top of the tree" }] },
            { code: `WITH RECURSIVE days(d) AS (
  SELECT 1
  UNION ALL
  SELECT d + 1 FROM days WHERE d < 7
)
SELECT d, d * d AS square FROM days;`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "window-functions",
      n: 8,
      title: "window functions",
      concepts: [
        {
          id: "row-number-rank", n: 1, title: "numbering and ranking", level: 2,
          gloss: "Numbers or ranks rows within an ordering.",
          examples: [
            { code: `SELECT name, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn
FROM employees;`, notes: [{ at: "OVER", text: "defines the window" }] },
            { code: `SELECT name, dept, salary,
  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rk
FROM employees;`, notes: [{ at: "PARTITION BY", text: "restarts the rank per dept" }] },
            { code: `SELECT name, salary,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dr
FROM employees;`, notes: [{ at: "DENSE_RANK", text: "no gaps after ties" }] }
          ]
        },
        {
          id: "aggregate-windows", n: 2, title: "aggregate windows", level: 2,
          gloss: "Adds running and per-group aggregates without collapsing rows.",
          examples: [
            { code: `SELECT id, total,
  SUM(total) OVER (ORDER BY placed, id) AS running
FROM orders;`, notes: [{ at: "SUM(total) OVER", text: "a running total" }] },
            { code: `SELECT name, dept, salary,
  AVG(salary) OVER (PARTITION BY dept) AS dept_avg
FROM employees;`, notes: [] },
            { code: `SELECT id, total,
  total * 100.0 / SUM(total) OVER () AS pct
FROM orders;`, notes: [{ at: "OVER ()", text: "the whole result is one window" }] }
          ]
        },
        {
          id: "lag-lead", n: 3, title: "LAG and LEAD", level: 3,
          gloss: "Reads values from the previous or next row.",
          examples: [
            { code: `SELECT id, total,
  LAG(total) OVER (ORDER BY placed, id) AS prev
FROM orders;`, notes: [{ at: "LAG", text: "the previous row's value" }] },
            { code: `SELECT id, placed,
  LEAD(placed) OVER (ORDER BY placed, id) AS next_placed
FROM orders;`, notes: [{ at: "LEAD", text: "the next row's value" }] },
            { code: `SELECT id, total,
  total - LAG(total, 1, 0) OVER (ORDER BY placed, id) AS change
FROM orders;`, notes: [{ at: "LAG(total, 1, 0)", text: "offset one, default 0" }] }
          ]
        },
        {
          id: "window-frames", n: 4, title: "frames", level: 3,
          gloss: "Limits a window to a frame of nearby rows.",
          examples: [
            { code: `SELECT id, total,
  AVG(total) OVER (
    ORDER BY placed, id
    ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
  ) AS avg2
FROM orders;`, notes: [{ at: "1 PRECEDING", text: "this row and the one before" }] },
            { code: `SELECT id, total,
  SUM(total) OVER (
    ORDER BY placed, id
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running
FROM orders;`, notes: [{ at: "UNBOUNDED PRECEDING", text: "from the first row" }] },
            { code: `SELECT id,
  COUNT(*) OVER (
    ORDER BY id
    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
  ) AS neighbours
FROM orders;`, notes: [] }
          ]
        },
        {
          id: "window-picks", n: 5, title: "top rows per group", level: 3,
          gloss: "Picks the first rows of each group and buckets rows into tiles.",
          examples: [
            { code: `SELECT name, dept
FROM (
  SELECT name, dept,
    ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
  FROM employees
) t
WHERE rn = 1;`, notes: [{ at: "rn = 1", text: "the top earner per dept" }] },
            { code: `SELECT name, salary,
  FIRST_VALUE(name) OVER (
    PARTITION BY dept ORDER BY salary DESC
  ) AS top_earner
FROM employees;`, notes: [{ at: "FIRST_VALUE", text: "the first row of the window" }] },
            { code: `SELECT name, salary,
  NTILE(2) OVER (ORDER BY salary) AS half
FROM employees;`, notes: [{ at: "NTILE(2)", text: "splits the rows into two tiles" }] }
          ]
        }
      ]
    },
    {
      id: "case",
      n: 9,
      title: "CASE",
      concepts: [
        {
          id: "searched-case", n: 1, title: "searched CASE", level: 1,
          gloss: "Chooses a value by testing conditions in order.",
          examples: [
            { code: `SELECT name,
  CASE WHEN salary >= 100 THEN 'high' ELSE 'standard' END AS band
FROM employees;`, notes: [{ at: "ELSE", text: "the fallback when nothing matches" }] },
            { code: `SELECT id,
  CASE
    WHEN total >= 200 THEN 'large'
    WHEN total >= 50 THEN 'medium'
    ELSE 'small'
  END AS size
FROM orders;`, notes: [{ at: "WHEN total >= 50", text: "tested only if the first fails" }] },
            { code: `SELECT name,
  CASE WHEN city IS NULL THEN 'unknown' ELSE city END AS city
FROM customers;`, notes: [] }
          ]
        },
        {
          id: "simple-case", n: 2, title: "simple CASE", level: 1,
          gloss: "Maps one column's values to labels.",
          examples: [
            { code: `SELECT id,
  CASE status
    WHEN 'paid' THEN 1
    WHEN 'pending' THEN 0
    ELSE -1
  END AS code
FROM orders;`, notes: [{ at: "CASE status", text: "compares one column to each value" }] },
            { code: `SELECT name,
  CASE country
    WHEN 'UK' THEN 'Britain'
    WHEN 'US' THEN 'America'
    ELSE country
  END AS nation
FROM customers;`, notes: [] },
            { code: `SELECT name, CASE dept WHEN 'eng' THEN 'E' ELSE 'O' END AS code
FROM employees;`, notes: [] }
          ]
        },
        {
          id: "conditional-aggregation", n: 3, title: "conditional aggregation", level: 2,
          gloss: "Counts or sums only the rows that match a condition.",
          examples: [
            { code: `SELECT COUNT(CASE WHEN status = 'paid' THEN 1 END) AS paid
FROM orders;`, notes: [{ at: "THEN 1 END", text: "no ELSE gives NULL, which COUNT skips" }] },
            { code: `SELECT
  SUM(CASE WHEN status = 'paid' THEN total ELSE 0 END) AS paid_total
FROM orders;`, notes: [{ at: "ELSE 0", text: "other rows add nothing" }] },
            { code: `SELECT dept,
  SUM(CASE WHEN salary >= 100 THEN 1 ELSE 0 END) AS high
FROM employees
GROUP BY dept;`, notes: [] }
          ]
        },
        {
          id: "case-order-update", n: 4, title: "CASE in ORDER BY and UPDATE", level: 3,
          gloss: "Uses CASE for custom sort orders and conditional updates.",
          examples: [
            { code: `SELECT id, status
FROM orders
ORDER BY CASE status WHEN 'pending' THEN 0 ELSE 1 END, id;`, notes: [{ at: "CASE", text: "pending rows come first" }] },
            { code: `UPDATE employees
SET salary = CASE WHEN dept = 'eng' THEN salary + 5 ELSE salary END;`, notes: [{ at: "ELSE salary", text: "other rows keep their value" }] },
            { code: `UPDATE orders
SET status = CASE
  WHEN total = 0 THEN 'void'
  ELSE status
END;`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "insert-update-delete",
      n: 10,
      title: "INSERT, UPDATE, DELETE",
      concepts: [
        {
          id: "insert", n: 1, title: "INSERT", level: 1,
          gloss: "Adds rows to a table with INSERT.",
          examples: [
            { code: `INSERT INTO customers (id, name, city, country)
VALUES (6, 'Barbara', 'Boston', 'US');`, notes: [{ at: "(id, name, city, country)", text: "the columns being filled" }] },
            { code: `INSERT INTO products (id, name, price, category)
VALUES (5, 'Cable', 5.00, 'hardware'),
       (6, 'Stand', 25.00, 'hardware');`, notes: [{ at: "VALUES", text: "several rows in one statement" }] },
            { code: `INSERT INTO orders (id, customer_id, total, status, placed)
SELECT 7, id, 0, 'pending', '2024-04-01'
FROM customers
WHERE country = 'FI';`, notes: [{ at: "SELECT", text: "the rows come from a query" }] }
          ]
        },
        {
          id: "update", n: 2, title: "UPDATE", level: 1,
          gloss: "Changes existing rows with UPDATE and WHERE.",
          examples: [
            { code: `UPDATE customers
SET city = 'Cambridge'
WHERE id = 4;`, notes: [{ at: "WHERE", text: "without it every row changes" }] },
            { code: `UPDATE products
SET price = price * 1.1
WHERE category = 'hardware';`, notes: [{ at: "price * 1.1", text: "uses the current value" }] },
            { code: `UPDATE employees
SET salary = salary + 5, dept = 'eng'
WHERE id = 5;`, notes: [{ at: "salary + 5, dept = 'eng'", text: "several columns at once" }] }
          ]
        },
        {
          id: "delete", n: 3, title: "DELETE", level: 1,
          gloss: "Removes rows with DELETE and WHERE.",
          examples: [
            { code: `DELETE FROM orders
WHERE status = 'cancelled';`, notes: [{ at: "WHERE", text: "without it every row goes" }] },
            { code: `DELETE FROM customers
WHERE id NOT IN (
  SELECT customer_id FROM orders WHERE customer_id IS NOT NULL
);`, notes: [] },
            { code: `DELETE FROM order_items
WHERE qty = 0;`, notes: [] }
          ]
        },
        {
          id: "upsert-returning", n: 4, title: "upsert and RETURNING", level: 3,
          gloss: "Inserts or updates in one statement and returns the changed rows.",
          examples: [
            { code: `INSERT INTO customers (id, name, country)
VALUES (1, 'Ada L.', 'UK')
ON CONFLICT (id) DO UPDATE SET name = excluded.name;`, notes: [{ at: "excluded", text: "the row that was rejected" }] },
            { code: `INSERT INTO products (id, name, price, category)
VALUES (9, 'Hub', 30.00, 'hardware')
RETURNING id, name;`, notes: [{ at: "RETURNING", text: "sends back the new row" }] },
            { code: `DELETE FROM orders
WHERE status = 'cancelled'
RETURNING id;`, notes: [] }
          ]
        },
        {
          id: "update-from", n: 5, title: "UPDATE from another table", level: 3,
          gloss: "Updates a table using values from another table.",
          examples: [
            { code: `UPDATE orders
SET status = 'vip'
FROM customers c
WHERE orders.customer_id = c.id AND c.country = 'UK';`, notes: [{ at: "FROM customers c", text: "the second table" }] },
            { code: `UPDATE products
SET price = price - 1
WHERE id IN (SELECT product_id FROM order_items);`, notes: [] },
            { code: `UPDATE employees
SET salary = (SELECT AVG(salary) FROM employees)
WHERE id = 6;`, notes: [{ at: "(SELECT AVG(salary) FROM employees)", text: "a single computed value" }] }
          ]
        }
      ]
    },
    {
      id: "create-table-constraints",
      n: 11,
      title: "CREATE TABLE & constraints",
      concepts: [
        {
          id: "create-table", n: 1, title: "CREATE TABLE", level: 1,
          gloss: "Defines a table with column names and types.",
          examples: [
            { code: `CREATE TABLE users (
  id INTEGER,
  name TEXT,
  active BOOLEAN
);`, notes: [{ at: "INTEGER", text: "a whole-number column" }] },
            { code: `CREATE TABLE prices (
  sku TEXT,
  amount DECIMAL(10, 2),
  currency TEXT
);`, notes: [{ at: "DECIMAL(10, 2)", text: "ten digits, two after the point" }] },
            { code: `CREATE TABLE log_entries (
  id INTEGER,
  logged_at TEXT,
  message TEXT
);`, notes: [] }
          ]
        },
        {
          id: "keys-constraints", n: 2, title: "keys and constraints", level: 1,
          gloss: "Enforces rules with PRIMARY KEY, NOT NULL and UNIQUE.",
          examples: [
            { code: `CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL
);`, notes: [{ at: "PRIMARY KEY", text: "unique and never NULL" }] },
            { code: `CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  label TEXT UNIQUE
);`, notes: [] },
            { code: `CREATE TABLE accounts (
  id INTEGER,
  region TEXT,
  PRIMARY KEY (id, region)
);`, notes: [{ at: "PRIMARY KEY (id, region)", text: "a composite key" }] }
          ]
        },
        {
          id: "check-default", n: 3, title: "CHECK and DEFAULT", level: 2,
          gloss: "Validates values with CHECK and fills gaps with DEFAULT.",
          examples: [
            { code: `CREATE TABLE items (
  id INTEGER PRIMARY KEY,
  qty INTEGER CHECK (qty >= 0)
);`, notes: [{ at: "CHECK", text: "rejects rows that fail the test" }] },
            { code: `CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  state TEXT DEFAULT 'open'
);`, notes: [{ at: "DEFAULT", text: "used when no value is given" }] },
            { code: `CREATE TABLE ratings (
  id INTEGER PRIMARY KEY,
  stars INTEGER NOT NULL CHECK (stars BETWEEN 1 AND 5)
);`, notes: [] }
          ]
        },
        {
          id: "foreign-keys", n: 4, title: "foreign keys", level: 2,
          gloss: "Links tables with FOREIGN KEY references.",
          examples: [
            { code: `CREATE TABLE invoices (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers (id)
);`, notes: [{ at: "REFERENCES", text: "must match an existing customer" }] },
            { code: `CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id)
);`, notes: [{ at: "FOREIGN KEY", text: "the table-level form" }] },
            { code: `CREATE TABLE shipments (
  id INTEGER PRIMARY KEY,
  order_id INTEGER REFERENCES orders (id)
);`, notes: [] }
          ]
        },
        {
          id: "alter-drop", n: 5, title: "ALTER and DROP", level: 2,
          gloss: "Changes or removes tables with ALTER and DROP.",
          examples: [
            { code: `ALTER TABLE customers ADD COLUMN phone TEXT;`, notes: [{ at: "ADD COLUMN", text: "existing rows get NULL" }] },
            { code: `CREATE TABLE temp_notes (id INTEGER);
DROP TABLE temp_notes;`, notes: [{ at: "DROP TABLE", text: "removes the table and its rows" }] },
            { code: `DROP TABLE IF EXISTS archive;`, notes: [{ at: "IF EXISTS", text: "no error when it is missing" }] }
          ]
        },
        {
          id: "views", n: 6, title: "views", level: 2,
          gloss: "Saves a query under a name so it can be selected from.",
          examples: [
            { code: `CREATE VIEW paid_orders AS
SELECT * FROM orders
WHERE status = 'paid';`, notes: [{ at: "VIEW", text: "stores the query, not the rows" }] },
            { code: `CREATE VIEW customer_spend AS
SELECT customer_id, SUM(total) AS spent
FROM orders
GROUP BY customer_id;`, notes: [] },
            { code: `CREATE VIEW uk_customers AS
SELECT * FROM customers WHERE country = 'UK';
DROP VIEW uk_customers;`, notes: [{ at: "DROP VIEW", text: "removes the name only" }] }
          ]
        }
      ]
    },
    {
      id: "indexes-explain",
      n: 12,
      title: "indexes & EXPLAIN",
      concepts: [
        {
          id: "create-index", n: 1, title: "CREATE INDEX", level: 2,
          gloss: "Speeds up lookups by building an index on a column.",
          examples: [
            { code: `CREATE INDEX idx_orders_customer
ON orders (customer_id);`, notes: [{ at: "ON orders", text: "the table being indexed" }] },
            { code: `CREATE UNIQUE INDEX idx_customers_name
ON customers (name);`, notes: [{ at: "UNIQUE", text: "also forbids duplicates" }] },
            { code: `CREATE INDEX idx_orders_status_placed
ON orders (status, placed);`, notes: [{ at: "(status, placed)", text: "column order matters" }] }
          ]
        },
        {
          id: "explain", n: 2, title: "EXPLAIN", level: 2,
          gloss: "Shows the plan the database chooses with EXPLAIN.",
          examples: [
            { code: `EXPLAIN
SELECT * FROM orders WHERE customer_id = 1;`, notes: [{ at: "EXPLAIN", text: "shows the plan, not the rows" }] },
            { code: `CREATE INDEX idx_orders_customer ON orders (customer_id);
EXPLAIN
SELECT * FROM orders WHERE customer_id = 1;`, notes: [{ at: "EXPLAIN", text: "compare with and without the index" }] },
            { code: `EXPLAIN
SELECT c.name, o.total
FROM customers c
JOIN orders o ON o.customer_id = c.id;`, notes: [] }
          ]
        },
        {
          id: "index-use", n: 3, title: "conditions an index can serve", level: 3,
          gloss: "Writes conditions that an index can serve.",
          examples: [
            { code: `CREATE INDEX idx_c_name ON customers (name);
SELECT * FROM customers WHERE name = 'Ada';`, notes: [{ at: "name = 'Ada'", text: "an equality on the indexed column" }] },
            { code: `CREATE INDEX idx_o_total ON orders (total);
SELECT * FROM orders WHERE total > 50;`, notes: [{ at: "total > 50", text: "a range on the indexed column" }] },
            { code: `CREATE INDEX idx_o_placed ON orders (placed);
SELECT * FROM orders WHERE placed >= '2024-03-01';`, notes: [] }
          ]
        },
        {
          id: "drop-index", n: 4, title: "DROP INDEX", level: 2,
          gloss: "Removes an index that is no longer needed.",
          examples: [
            { code: `CREATE INDEX idx_tmp ON orders (total);
DROP INDEX idx_tmp;`, notes: [{ at: "DROP INDEX", text: "the table data stays" }] },
            { code: `DROP INDEX IF EXISTS idx_missing;`, notes: [] },
            { code: `CREATE INDEX idx_a ON products (category);
DROP INDEX IF EXISTS idx_a;`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "null-handling",
      n: 13,
      title: "NULL handling",
      concepts: [
        {
          id: "is-null", n: 1, title: "IS NULL", level: 1,
          gloss: "Tests for missing values with IS NULL.",
          examples: [
            { code: `SELECT name
FROM customers
WHERE city IS NULL;`, notes: [{ at: "IS NULL", text: "true for a missing value" }] },
            { code: `SELECT name
FROM customers
WHERE city IS NOT NULL;`, notes: [] },
            { code: `SELECT name
FROM customers
WHERE city = NULL;`, notes: [{ at: "= NULL", text: "never true, even for NULL" }] }
          ]
        },
        {
          id: "coalesce-nullif", n: 2, title: "COALESCE and NULLIF", level: 1,
          gloss: "Replaces NULL with a default or turns a value into NULL.",
          examples: [
            { code: `SELECT name, COALESCE(city, 'unknown') AS city
FROM customers;`, notes: [{ at: "COALESCE", text: "the first argument that is not NULL" }] },
            { code: `SELECT name, COALESCE(city, country, 'n/a') AS place
FROM customers;`, notes: [] },
            { code: `SELECT order_id, qty, 100 / NULLIF(qty, 0) AS per_unit
FROM order_items;`, notes: [{ at: "NULLIF", text: "avoids a division by zero" }] }
          ]
        },
        {
          id: "null-logic", n: 3, title: "NULL in comparisons", level: 2,
          gloss: "Shows how NULL behaves in comparisons and aggregates.",
          examples: [
            { code: `SELECT name
FROM customers
WHERE city <> 'London';`, notes: [{ at: "<>", text: "rows with a NULL city are dropped too" }] },
            { code: `SELECT COUNT(*) AS total_rows, COUNT(city) AS cities
FROM customers;`, notes: [{ at: "COUNT(city)", text: "ignores NULL values" }] },
            { code: `SELECT SUM(salary) AS total, AVG(manager_id) AS avg_manager
FROM employees;`, notes: [{ at: "AVG(manager_id)", text: "null values are ignored" }] }
          ]
        },
        {
          id: "distinct-from", n: 4, title: "NULL-safe comparison", level: 3,
          gloss: "Compares values with NULL-safe operators.",
          examples: [
            { code: `SELECT name
FROM customers
WHERE city IS DISTINCT FROM 'London';`, notes: [{ at: "IS DISTINCT FROM", text: "treats NULL as a value" }] },
            { code: `SELECT e.name
FROM employees e
JOIN employees m ON e.manager_id IS NOT DISTINCT FROM m.id;`, notes: [{ at: "IS NOT DISTINCT FROM", text: "two NULLs count as equal" }] },
            { code: `SELECT name
FROM customers
ORDER BY city IS NULL, city;`, notes: [{ at: "city IS NULL", text: "puts missing cities last" }] }
          ]
        }
      ]
    },
    {
      id: "set-operations",
      n: 14,
      title: "set operations",
      concepts: [
        {
          id: "union", n: 1, title: "UNION", level: 2,
          gloss: "Stacks the results of two queries, with or without duplicates.",
          examples: [
            { code: `SELECT country FROM customers
UNION
SELECT category FROM products;`, notes: [{ at: "UNION", text: "removes duplicates" }] },
            { code: `SELECT name FROM customers
UNION ALL
SELECT name FROM employees;`, notes: [{ at: "UNION ALL", text: "keeps duplicates" }] },
            { code: `SELECT id, 'order' AS kind FROM orders
UNION ALL
SELECT id, 'customer' FROM customers;`, notes: [{ at: "'order' AS kind", text: "tags where each row came from" }] }
          ]
        },
        {
          id: "intersect-except", n: 2, title: "INTERSECT and EXCEPT", level: 2,
          gloss: "Keeps only shared rows or removes rows found in a second query.",
          examples: [
            { code: `SELECT id FROM customers
INTERSECT
SELECT customer_id FROM orders;`, notes: [{ at: "INTERSECT", text: "only values in both results" }] },
            { code: `SELECT id FROM customers
EXCEPT
SELECT customer_id FROM orders;`, notes: [{ at: "EXCEPT", text: "customers who never ordered" }] },
            { code: `SELECT name FROM customers
INTERSECT
SELECT name FROM employees;`, notes: [] }
          ]
        },
        {
          id: "compound-ordering", n: 3, title: "ordering a combined result", level: 3,
          gloss: "Sorts and limits the combined result of a set operation.",
          examples: [
            { code: `SELECT name FROM customers
UNION
SELECT name FROM employees
ORDER BY name;`, notes: [{ at: "ORDER BY name", text: "applies to the whole union" }] },
            { code: `SELECT name, 'c' AS src FROM customers
UNION ALL
SELECT name, 'e' FROM employees
ORDER BY src, name;`, notes: [] },
            { code: `SELECT total FROM orders
UNION
SELECT price FROM products
ORDER BY 1 DESC
LIMIT 3;`, notes: [{ at: "ORDER BY 1", text: "position in the combined columns" }] }
          ]
        }
      ]
    },
    {
      id: "dates-strings",
      n: 15,
      title: "dates & strings",
      concepts: [
        {
          id: "iso-dates", n: 1, title: "ISO dates", level: 1,
          gloss: "Stores dates as ISO text so they sort and compare correctly.",
          examples: [
            { code: `SELECT id, placed
FROM orders
WHERE placed >= '2024-02-01'
ORDER BY placed;`, notes: [{ at: "'2024-02-01'", text: "text order is date order" }] },
            { code: `SELECT id
FROM orders
WHERE placed BETWEEN '2024-01-01' AND '2024-02-29';`, notes: [] },
            { code: `SELECT MIN(placed) AS first_order, MAX(placed) AS last_order
FROM orders;`, notes: [{ at: "MIN(placed)", text: "the earliest date" }] }
          ]
        },
        {
          id: "date-parts", n: 2, title: "date parts", level: 2,
          gloss: "Extracts the year and month from ISO text with SUBSTR.",
          examples: [
            { code: `SELECT id, SUBSTR(placed, 1, 4) AS year
FROM orders;`, notes: [{ at: "SUBSTR(placed, 1, 4)", text: "the first four characters" }] },
            { code: `SELECT SUBSTR(placed, 1, 7) AS month, COUNT(*) AS n
FROM orders
GROUP BY SUBSTR(placed, 1, 7)
ORDER BY month;`, notes: [] },
            { code: `SELECT id, CAST(SUBSTR(placed, 6, 2) AS INTEGER) AS month_number
FROM orders;`, notes: [{ at: "CAST", text: "text to integer" }] }
          ]
        },
        {
          id: "current-date", n: 3, title: "the current date", level: 2,
          gloss: "Reads today's date with CURRENT_DATE.",
          examples: [
            { code: `SELECT CURRENT_DATE;`, notes: [{ at: "CURRENT_DATE", text: "no parentheses" }] },
            { code: `SELECT id, placed
FROM orders
WHERE placed < CAST(CURRENT_DATE AS TEXT);`, notes: [] },
            { code: `SELECT COUNT(*) AS older
FROM customers
WHERE created < CAST(CURRENT_DATE AS TEXT);`, notes: [] }
          ]
        },
        {
          id: "string-functions", n: 4, title: "string functions", level: 1,
          gloss: "Changes and measures text with string functions.",
          examples: [
            { code: `SELECT UPPER(name), LOWER(country), LENGTH(name)
FROM customers;`, notes: [{ at: "LENGTH", text: "counts characters" }] },
            { code: `SELECT TRIM('  padded  ') AS cleaned,
  REPLACE('a-b-c', '-', '+') AS swapped;`, notes: [{ at: "REPLACE", text: "swaps every occurrence" }] },
            { code: `SELECT name, SUBSTR(name, 1, 3) AS short, INSTR(name, 'a') AS pos
FROM customers;`, notes: [{ at: "INSTR", text: "0 when not found" }] }
          ]
        },
        {
          id: "text-patterns", n: 5, title: "patterns and concatenation", level: 2,
          gloss: "Matches and builds text with LIKE and concatenation.",
          examples: [
            { code: `SELECT name
FROM customers
WHERE name LIKE '%a%';`, notes: [{ at: "%", text: "any run of characters" }] },
            { code: `SELECT name || ' <' || country || '>' AS contact
FROM customers;`, notes: [] },
            { code: `SELECT name
FROM products
WHERE name LIKE '_ouse';`, notes: [{ at: "_", text: "exactly one character" }] }
          ]
        }
      ]
    },
    {
      id: "transactions",
      n: 16,
      title: "transactions",
      concepts: [
        {
          id: "begin-commit", n: 1, title: "BEGIN and COMMIT", level: 2,
          gloss: "Groups statements so they succeed or fail together.",
          examples: [
            { code: `BEGIN;
UPDATE employees SET salary = salary - 10 WHERE id = 2;
UPDATE employees SET salary = salary + 10 WHERE id = 3;
COMMIT;`, notes: [{ at: "COMMIT", text: "makes both changes permanent" }] },
            { code: `BEGIN;
INSERT INTO orders (id, customer_id, total, status, placed)
VALUES (10, 1, 20.00, 'paid', '2024-04-02');
INSERT INTO order_items VALUES (10, 2, 1);
COMMIT;`, notes: [{ at: "BEGIN", text: "opens the transaction" }] },
            { code: `BEGIN;
DELETE FROM order_items WHERE order_id = 5;
DELETE FROM orders WHERE id = 5;
COMMIT;`, notes: [] }
          ]
        },
        {
          id: "rollback", n: 2, title: "ROLLBACK", level: 2,
          gloss: "Undoes every change made since BEGIN.",
          examples: [
            { code: `BEGIN;
DELETE FROM orders;
ROLLBACK;`, notes: [{ at: "ROLLBACK", text: "the table is back as it was" }] },
            { code: `BEGIN;
UPDATE products SET price = 0;
SELECT COUNT(*) AS free FROM products WHERE price = 0;
ROLLBACK;`, notes: [{ at: "SELECT", text: "sees the change before the rollback" }] },
            { code: `BEGIN;
INSERT INTO customers (id, name) VALUES (9, 'Test');
ROLLBACK;`, notes: [] }
          ]
        },
        {
          id: "transaction-patterns", n: 3, title: "multi-step updates", level: 3,
          gloss: "Wraps common multi-step updates in one transaction.",
          examples: [
            { code: `BEGIN TRANSACTION;
UPDATE employees SET salary = salary * 1.05 WHERE dept = 'ops';
COMMIT;`, notes: [{ at: "BEGIN TRANSACTION", text: "the long form of BEGIN" }] },
            { code: `BEGIN;
UPDATE orders SET status = 'paid' WHERE id = 3;
INSERT INTO order_items VALUES (3, 1, 1);
COMMIT;`, notes: [] },
            { code: `BEGIN;
DELETE FROM customers WHERE id = 5;
SELECT COUNT(*) AS remaining FROM customers;
COMMIT;`, notes: [{ at: "remaining", text: "counts inside the transaction" }] }
          ]
        }
      ]
    }
  ]
};
