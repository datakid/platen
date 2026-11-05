import os
import tempfile
import warnings

import numpy as np
import pandas as pd

os.chdir(tempfile.mkdtemp())
warnings.simplefilter("error")

names = ["ada", "lin", "sam", "kai", "eve", "joy", "max", "zoe"]
df = pd.DataFrame(
    {
        "name": names,
        "email": [n + "@example.com" for n in names],
        "city": ["paris", "oslo", "paris", "rome", "oslo", "rome", "paris", "oslo"],
        "category": ["a", "b", "a", "c", "b", "a", "c", "b"],
        "age": [34, 28, 45, 23, 39, 31, 52, 27],
        "price": [9.5, 12.0, 7.25, 30.0, 15.5, 8.0, 22.0, 11.0],
        "qty": [3, 1, 4, 2, 5, 2, 1, 6],
        "score": [88.0, 92.5, np.nan, 75.0, 81.0, np.nan, 69.5, 95.0],
        "signup": pd.to_datetime(
            ["2023-01-15", "2023-02-03", "2023-03-21", "2023-04-09",
             "2023-05-30", "2023-06-12", "2023-07-04", "2023-08-25"]
        ),
        "active": [True, False, True, True, False, True, False, True],
        "notes": [" Alpha ", "beta", "Gamma ", "delta", "  Epsilon", "zeta ", "Eta", "theta"],
    }
)
s = pd.Series([3, 1, 4, 1, 5, 9, 2, 6], name="count")
customers = pd.DataFrame({"id": [1, 2, 3], "name": ["ada", "lin", "sam"], "city": ["paris", "oslo", "rome"]})
orders = pd.DataFrame({"order_id": [10, 11, 12, 13], "customer_id": [1, 1, 2, 4], "total": [20.0, 35.5, 12.0, 8.0]})
left = pd.DataFrame({"key": ["a", "b", "c"], "lval": [1, 2, 3]})
right = pd.DataFrame({"key": ["b", "c", "d"], "rval": [20, 30, 40]})
jan = pd.DataFrame({"city": ["paris", "oslo"], "sales": [100, 80]})
feb = pd.DataFrame({"city": ["paris", "rome"], "sales": [120, 60]})
extra = pd.DataFrame({"city": ["lima"], "sales": [50], "note": ["new"]})
tidy = pd.DataFrame({"day": [1, 1, 2, 2], "k": ["x", "y", "x", "y"], "v": [1, 2, 3, 4]})
wide = pd.DataFrame({"id": [1, 2], "x": [5, 6], "y": [7, 8]})
ts = pd.DataFrame({"sales": np.arange(60.0)}, index=pd.date_range("2024-01-01", periods=60, freq="D"))
df[["signup", "city", "category", "price", "qty"]].rename(columns={"signup": "date"}).to_csv("sales.csv", index=False)
df[["name", "email", "age"]].to_csv("users.csv", index=False)
df.to_parquet("data.parquet")
