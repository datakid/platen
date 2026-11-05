import os
import tempfile
import warnings
from datetime import date

import polars as pl
import polars.selectors as cs

os.chdir(tempfile.mkdtemp())
warnings.simplefilter("error")

names = ["ada", "lin", "sam", "kai", "eve", "joy", "max", "zoe"]
df = pl.DataFrame(
    {
        "name": names,
        "email": [n + "@example.com" for n in names],
        "city": ["paris", "oslo", "paris", "rome", "oslo", "rome", "paris", "oslo"],
        "category": ["a", "b", "a", "c", "b", "a", "c", "b"],
        "age": [34, 28, 45, 23, 39, 31, 52, 27],
        "price": [9.5, 12.0, 7.25, 30.0, 15.5, 8.0, 22.0, 11.0],
        "qty": [3, 1, 4, 2, 5, 2, 1, 6],
        "score": [88.0, 92.5, None, 75.0, 81.0, None, 69.5, 95.0],
        "signup": [
            date(2023, 1, 15), date(2023, 2, 3), date(2023, 3, 21), date(2023, 4, 9),
            date(2023, 5, 30), date(2023, 6, 12), date(2023, 7, 4), date(2023, 8, 25),
        ],
        "active": [True, False, True, True, False, True, False, True],
        "notes": [" Alpha ", "beta", "Gamma ", "delta", "  Epsilon", "zeta ", "Eta", "theta"],
    }
)
customers = pl.DataFrame({"id": [1, 2, 3], "name": ["ada", "lin", "sam"], "city": ["paris", "oslo", "rome"]})
orders = pl.DataFrame({"order_id": [10, 11, 12, 13], "customer_id": [1, 1, 2, 4], "total": [20.0, 35.5, 12.0, 8.0]})
left = pl.DataFrame({"key": ["a", "b", "c"], "lval": [1, 2, 3]})
right = pl.DataFrame({"key": ["b", "c", "d"], "rval": [20, 30, 40]})
jan = pl.DataFrame({"city": ["paris", "oslo"], "sales": [100, 80]})
feb = pl.DataFrame({"city": ["paris", "rome"], "sales": [120, 60]})
extra = pl.DataFrame({"city": ["lima"], "sales": [50], "note": ["new"]})
tidy = pl.DataFrame({"day": [1, 1, 2, 2], "k": ["x", "y", "x", "y"], "v": [1, 2, 3, 4]})
wide = pl.DataFrame({"id": [1, 2], "x": [5, 6], "y": [7, 8]})
nested = pl.DataFrame(
    {
        "tags": [["a", "b"], ["c"], []],
        "pt": [{"x": 1, "y": 2}, {"x": 3, "y": 4}, {"x": 5, "y": 6}],
    }
)
df.select("signup", "city", "category", "price", "qty").rename({"signup": "date"}).write_csv("sales.csv")
df.write_parquet("data.parquet")
