export default {
  id: "sklearn",
  name: "scikit-learn",
  short: "SK",
  pigment: "sklearn",
  family: "python",
  version: "1.5",
  lexer: "python",
  indent: 4,
  topics: [
    {
      id: "train-test-split",
      n: 1,
      title: "train_test_split",
      concepts: [
        {
          id: "basic-split", n: 1, title: "basic split", level: 1,
          gloss: "Splits data into a training set and a test set.",
          examples: [
            { code: `X_train, X_test, y_train, y_test = train_test_split(X, y)`, notes: [{ at: "train_test_split", text: "holds out 25% by default" }] },
            { code: `X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)`, notes: [{ at: "test_size=0.2", text: "a fraction, or a row count" }] },
            { code: `tr, te = train_test_split(np.arange(len(X)), random_state=0)`, notes: [{ at: "np.arange(len(X))", text: "splitting indices works too" }] }
          ]
        },
        {
          id: "stratified-split", n: 2, title: "stratified split", level: 2,
          gloss: "Keeps the class proportions the same in both sets.",
          examples: [
            { code: `X_train, X_test, y_train, y_test = train_test_split(
    X, y, stratify=y, random_state=0
)`, notes: [{ at: "stratify=y", text: "balances the labels in both sets" }] },
            { code: `X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, stratify=y, random_state=1
)`, notes: [] },
            { code: `X_train, X_test, y_train, y_test = train_test_split(
    X, y, stratify=y, random_state=0
)
print(np.bincount(y_train) / len(y_train))`, notes: [{ at: "np.bincount", text: "class shares, close to the full data" }] }
          ]
        },
        {
          id: "reproducible-splits", n: 3, title: "reproducible splits", level: 1,
          gloss: "Fixes the shuffle so the same split comes out every run.",
          examples: [
            { code: `X_train, X_test, y_train, y_test = train_test_split(
    X, y, random_state=42
)`, notes: [{ at: "random_state=42", text: "the same split every run" }] },
            { code: `X_train, X_test = train_test_split(X, test_size=0.2, shuffle=False)`, notes: [{ at: "shuffle=False", text: "keeps the original order" }] },
            { code: `X_rest, X_test, y_rest, y_test = train_test_split(X, y, test_size=0.2)
X_train, X_val, y_train, y_val = train_test_split(X_rest, y_rest)`, notes: [{ at: "X_val", text: "a validation set for tuning" }] }
          ]
        }
      ]
    },
    {
      id: "fit-predict-score",
      n: 2,
      title: "fit / predict / score",
      concepts: [
        {
          id: "fit-and-predict", n: 1, title: "fit and predict", level: 1,
          gloss: "Trains a model with fit and makes predictions with predict.",
          examples: [
            { code: `model = LogisticRegression()
model.fit(X_train, y_train)`, notes: [{ at: ".fit(", text: "learns from the training data" }] },
            { code: `model = LogisticRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)`, notes: [] },
            { code: `model = LogisticRegression()
model.fit(X_train, y_train)
proba = model.predict_proba(X_test)`, notes: [{ at: "predict_proba", text: "one probability per class" }] }
          ]
        },
        {
          id: "score", n: 2, title: "score", level: 1,
          gloss: "Evaluates a fitted model with its default metric.",
          examples: [
            { code: `model = LogisticRegression().fit(X_train, y_train)
print(model.score(X_test, y_test))`, notes: [{ at: ".fit(", text: "fit returns the estimator itself" }] },
            { code: `reg = LinearRegression().fit(X_reg, y_reg)
print(reg.score(X_reg, y_reg))`, notes: [{ at: ".score(", text: "for regressors, this is r squared" }] },
            { code: `model = LogisticRegression().fit(X_train, y_train)
acc = (model.predict(X_test) == y_test).mean()`, notes: [] }
          ]
        },
        {
          id: "learned-attributes", n: 3, title: "learned attributes", level: 2,
          gloss: "Reads what a model learned from attributes ending in an underscore.",
          examples: [
            { code: `reg = LinearRegression().fit(X_reg, y_reg)
print(reg.coef_)`, notes: [{ at: "coef_", text: "trailing underscore: set by fit" }] },
            { code: `reg = LinearRegression().fit(X_reg, y_reg)
print(reg.intercept_)`, notes: [] },
            { code: `clf = LogisticRegression().fit(X, y)
print(clf.classes_)`, notes: [] }
          ]
        },
        {
          id: "parameters", n: 4, title: "get_params and set_params", level: 2,
          gloss: "Reads and changes hyperparameters without rebuilding the model.",
          examples: [
            { code: `model = LogisticRegression(C=0.5, max_iter=500)`, notes: [{ at: "C=0.5", text: "a hyperparameter set up front" }] },
            { code: `model = LogisticRegression()
params = model.get_params()`, notes: [] },
            { code: `model = LogisticRegression()
model.set_params(C=2.0)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "scalers-encoders",
      n: 3,
      title: "scalers & encoders",
      concepts: [
        {
          id: "standard-scaler", n: 1, title: "StandardScaler", level: 1,
          gloss: "Rescales features to zero mean and unit variance.",
          examples: [
            { code: `scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)`, notes: [{ at: "fit_transform", text: "learn the statistics, then apply" }] },
            { code: `scaler = StandardScaler().fit(X_train)
X_test_scaled = scaler.transform(X_test)`, notes: [{ at: ".fit(X_train)", text: "learn from training data only" }] },
            { code: `scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_back = scaler.inverse_transform(X_scaled)`, notes: [] }
          ]
        },
        {
          id: "other-scalers", n: 2, title: "other scalers", level: 2,
          gloss: "Squeezes features into a range or tolerates outliers.",
          examples: [
            { code: `X_unit = MinMaxScaler().fit_transform(X)`, notes: [{ at: "MinMaxScaler", text: "maps each column to 0 through 1" }] },
            { code: `X_rob = RobustScaler().fit_transform(X)`, notes: [{ at: "RobustScaler", text: "uses the median and IQR" }] },
            { code: `X_range = MinMaxScaler(feature_range=(-1, 1)).fit_transform(X)`, notes: [] }
          ]
        },
        {
          id: "one-hot-encoder", n: 3, title: "OneHotEncoder", level: 2,
          gloss: "Turns categories into one binary column each.",
          examples: [
            { code: `enc = OneHotEncoder(handle_unknown="ignore")
codes = enc.fit_transform(df[["city"]])`, notes: [{ at: 'handle_unknown="ignore"', text: "unseen categories become all zeros" }] },
            { code: `enc = OneHotEncoder(sparse_output=False)
codes = enc.fit_transform(df[["city"]])`, notes: [{ at: "sparse_output=False", text: "returns a dense array" }] },
            { code: `enc = OneHotEncoder().fit(df[["city"]])
names = enc.get_feature_names_out()`, notes: [] }
          ]
        },
        {
          id: "ordinal-label", n: 4, title: "ordinal and label encoding", level: 2,
          gloss: "Maps categories or labels to integers.",
          examples: [
            { code: `enc = OrdinalEncoder()
codes = enc.fit_transform(df[["plan"]])`, notes: [{ at: "OrdinalEncoder", text: "for features that have an order" }] },
            { code: `le = LabelEncoder()
y_codes = le.fit_transform(df["city"])`, notes: [{ at: "LabelEncoder", text: "meant for targets, not features" }] },
            { code: `le = LabelEncoder()
y_codes = le.fit_transform(df["city"])
labels = le.inverse_transform(y_codes)`, notes: [] }
          ]
        },
        {
          id: "simple-imputer", n: 5, title: "SimpleImputer", level: 2,
          gloss: "Fills missing values with a statistic.",
          examples: [
            { code: `imp = SimpleImputer(strategy="mean")
X_full = imp.fit_transform(X_missing)`, notes: [{ at: 'strategy="mean"', text: "also median or most_frequent" }] },
            { code: `imp = SimpleImputer(strategy="median").fit(X_missing)`, notes: [] },
            { code: `imp = SimpleImputer(strategy="constant", fill_value=0)
X_full = imp.fit_transform(X_missing)`, notes: [{ at: "fill_value=0", text: "the constant to insert" }] }
          ]
        }
      ]
    },
    {
      id: "pipeline",
      n: 4,
      title: "Pipeline",
      concepts: [
        {
          id: "make-pipeline", n: 1, title: "make_pipeline", level: 2,
          gloss: "Chains preprocessing and a model into one estimator.",
          examples: [
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())`, notes: [{ at: "make_pipeline", text: "names the steps for you" }] },
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())
pipe.fit(X_train, y_train)`, notes: [{ at: "pipe.fit", text: "fits every step in order" }] },
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())
pipe.fit(X_train, y_train)
print(pipe.score(X_test, y_test))`, notes: [] }
          ]
        },
        {
          id: "pipeline-class", n: 2, title: "Pipeline class", level: 2,
          gloss: "Names each step explicitly.",
          examples: [
            { code: `pipe = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression()),
])`, notes: [{ at: '("scale"', text: "a step name, then the estimator" }] },
            { code: `pipe = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression()),
])
pipe.fit(X, y)
print(pipe.named_steps["clf"].coef_)`, notes: [{ at: ".named_steps", text: "look up a step by name" }] },
            { code: `pipe = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression()),
])
pipe.set_params(clf__C=0.1)`, notes: [{ at: "clf__C", text: "step name, two underscores, parameter" }] }
          ]
        },
        {
          id: "avoiding-leakage", n: 3, title: "avoiding leakage", level: 3,
          gloss: "Fits preprocessing inside cross-validation so test folds stay unseen.",
          examples: [
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())
scores = cross_val_score(pipe, X, y, cv=5)`, notes: [{ at: "pipe", text: "scaled inside each fold" }] },
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())
pipe.fit(X_train, y_train)
print(pipe.predict(X_test)[:5])`, notes: [{ at: "pipe.predict", text: "reuses the training scaling" }] },
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())
pipe.fit(X_train, y_train)
print(pipe[:-1].transform(X_test).shape)`, notes: [{ at: "pipe[:-1]", text: "every step except the model" }] }
          ]
        }
      ]
    },
    {
      id: "column-transformer",
      n: 5,
      title: "ColumnTransformer",
      concepts: [
        {
          id: "column-transformer-basics", n: 1, title: "ColumnTransformer", level: 2,
          gloss: "Applies different preprocessing to different columns.",
          examples: [
            { code: `pre = ColumnTransformer([
    ("num", StandardScaler(), ["age", "income"]),
    ("cat", OneHotEncoder(), ["city"]),
])`, notes: [{ at: '["age", "income"]', text: "the columns this step handles" }] },
            { code: `pre = ColumnTransformer([
    ("num", StandardScaler(), ["age", "income"]),
    ("cat", OneHotEncoder(), ["city"]),
])
X_all = pre.fit_transform(df)`, notes: [] },
            { code: `pre = ColumnTransformer([
    ("num", StandardScaler(), ["age", "income"]),
    ("cat", OneHotEncoder(), ["city"]),
])
pre.fit(df)
print(pre.get_feature_names_out())`, notes: [{ at: "get_feature_names_out", text: "names like num__age" }] }
          ]
        },
        {
          id: "selecting-by-dtype", n: 2, title: "selecting by dtype", level: 3,
          gloss: "Chooses columns by type instead of by name.",
          examples: [
            { code: `num = make_column_selector(dtype_include="number")
cat = make_column_selector(dtype_exclude="number")`, notes: [{ at: "make_column_selector", text: "picks columns at fit time" }] },
            { code: `pre = make_column_transformer(
    (StandardScaler(), make_column_selector(dtype_include="number")),
    (OneHotEncoder(), make_column_selector(dtype_exclude="number")),
)`, notes: [] },
            { code: `pre = ColumnTransformer(
    [("cat", OneHotEncoder(), ["city"])],
    remainder="passthrough",
)`, notes: [{ at: 'remainder="passthrough"', text: "keeps the columns not listed" }] }
          ]
        },
        {
          id: "preprocessing-plus-model", n: 3, title: "preprocessing plus model", level: 3,
          gloss: "Combines a ColumnTransformer and a classifier in one pipeline.",
          examples: [
            { code: `pre = make_column_transformer(
    (StandardScaler(), ["age", "income"]),
    (OneHotEncoder(), ["city", "plan"]),
)
model = make_pipeline(pre, LogisticRegression())`, notes: [] },
            { code: `pre = make_column_transformer(
    (StandardScaler(), ["age", "income"]),
    (OneHotEncoder(), ["city", "plan"]),
)
model = make_pipeline(pre, LogisticRegression())
model.fit(df, y)`, notes: [{ at: "model.fit(df, y)", text: "pass the raw DataFrame" }] },
            { code: `pre = make_column_transformer(
    (StandardScaler(), ["age", "income"]),
    (OneHotEncoder(), ["city", "plan"]),
)
model = make_pipeline(pre, LogisticRegression())
model.fit(df, y)
print(model.predict(df.head(3)))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "cross-validation",
      n: 6,
      title: "cross-validation",
      concepts: [
        {
          id: "cross-val-score", n: 1, title: "cross_val_score", level: 2,
          gloss: "Scores a model on several train and test splits.",
          examples: [
            { code: `scores = cross_val_score(LogisticRegression(), X, y, cv=5)`, notes: [{ at: "cv=5", text: "five folds" }] },
            { code: `scores = cross_val_score(LogisticRegression(), X, y, cv=5)
print(scores.mean(), scores.std())`, notes: [{ at: "scores.std()", text: "how much the folds disagree" }] },
            { code: `model = LogisticRegression()
scores = cross_val_score(model, X, y, scoring="f1")`, notes: [{ at: 'scoring="f1"', text: "any named metric" }] }
          ]
        },
        {
          id: "fold-splitters", n: 2, title: "KFold and StratifiedKFold", level: 2,
          gloss: "Controls how the data is split into folds.",
          examples: [
            { code: `cv = KFold(n_splits=5, shuffle=True, random_state=0)`, notes: [{ at: "shuffle=True", text: "mixes rows before splitting" }] },
            { code: `cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)`, notes: [{ at: "StratifiedKFold", text: "keeps class shares in every fold" }] },
            { code: `cv = KFold(n_splits=3)
for train_idx, test_idx in cv.split(X, y):
    print(len(train_idx), len(test_idx))`, notes: [] }
          ]
        },
        {
          id: "cross-validate", n: 3, title: "cross_validate", level: 3,
          gloss: "Returns several metrics and timings per fold.",
          examples: [
            { code: `model = LogisticRegression()
res = cross_validate(model, X, y, scoring=["accuracy", "f1"])`, notes: [{ at: '["accuracy", "f1"]', text: "several metrics at once" }] },
            { code: `model = LogisticRegression()
res = cross_validate(model, X, y, scoring=["accuracy", "f1"])
print(res["test_accuracy"].mean())`, notes: [{ at: '"test_accuracy"', text: "keys are test_ plus the metric" }] },
            { code: `model = LogisticRegression()
res = cross_validate(model, X, y, return_train_score=True)
print(res["train_score"].mean())`, notes: [{ at: "return_train_score=True", text: "reveals overfitting" }] }
          ]
        },
        {
          id: "out-of-fold-predictions", n: 4, title: "out-of-fold predictions", level: 3,
          gloss: "Predicts every row with a model that never saw it.",
          examples: [
            { code: `model = LogisticRegression()
y_cv = cross_val_predict(model, X, y, cv=5)`, notes: [{ at: "cross_val_predict", text: "one prediction per row" }] },
            { code: `model = LogisticRegression()
y_cv = cross_val_predict(model, X, y, cv=5)
print((y_cv == y).mean())`, notes: [] },
            { code: `model = LogisticRegression()
proba = cross_val_predict(model, X, y, method="predict_proba")`, notes: [{ at: 'method="predict_proba"', text: "probabilities instead of labels" }] }
          ]
        }
      ]
    },
    {
      id: "grid-search",
      n: 7,
      title: "GridSearchCV",
      concepts: [
        {
          id: "grid-basics", n: 1, title: "GridSearchCV", level: 2,
          gloss: "Tries every parameter combination with cross-validation.",
          examples: [
            { code: `params = {"C": [0.1, 1, 10]}
grid = GridSearchCV(LogisticRegression(), params, cv=3)`, notes: [{ at: "params", text: "a dict of lists to try" }] },
            { code: `params = {"C": [0.1, 1, 10]}
grid = GridSearchCV(LogisticRegression(), params, cv=3)
grid.fit(X, y)
print(grid.best_params_)`, notes: [{ at: "best_params_", text: "the winning combination" }] },
            { code: `params = {"C": [0.1, 1, 10]}
grid = GridSearchCV(LogisticRegression(), params, cv=3)
grid.fit(X, y)
print(grid.best_score_)`, notes: [{ at: "best_score_", text: "mean cross-validated score" }] }
          ]
        },
        {
          id: "tuning-a-pipeline", n: 2, title: "tuning a pipeline", level: 3,
          gloss: "Reaches into pipeline steps with double-underscore names.",
          examples: [
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())
params = {"logisticregression__C": [0.1, 1, 10]}
grid = GridSearchCV(pipe, params, cv=3)`, notes: [{ at: "logisticregression__C", text: "step name, two underscores, parameter" }] },
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())
params = {"logisticregression__C": [0.1, 1, 10]}
grid = GridSearchCV(pipe, params, cv=3)
grid.fit(X, y)`, notes: [] },
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())
params = {"logisticregression__C": [0.1, 1, 10]}
grid = GridSearchCV(pipe, params, cv=3).fit(X, y)
best = grid.best_estimator_`, notes: [{ at: "best_estimator_", text: "refit on all the data" }] }
          ]
        },
        {
          id: "randomized-search", n: 3, title: "RandomizedSearchCV", level: 3,
          gloss: "Samples a fixed number of combinations instead of trying all of them.",
          examples: [
            { code: `params = {"C": loguniform(1e-3, 1e2)}
search = RandomizedSearchCV(
    LogisticRegression(), params, n_iter=5, cv=3, random_state=0
)`, notes: [{ at: "loguniform", text: "samples on a log scale" }] },
            { code: `params = {"C": loguniform(1e-3, 1e2)}
search = RandomizedSearchCV(
    LogisticRegression(), params, n_iter=5, cv=3, random_state=0
)
search.fit(X, y)`, notes: [{ at: "n_iter=5", text: "only five random combinations" }] },
            { code: `params = {"C": loguniform(1e-3, 1e2)}
search = RandomizedSearchCV(
    LogisticRegression(), params, n_iter=5, cv=3, random_state=0
)
search.fit(X, y)
print(search.cv_results_["mean_test_score"])`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "classification-metrics",
      n: 8,
      title: "classification metrics",
      concepts: [
        {
          id: "accuracy-precision-recall", n: 1, title: "accuracy, precision and recall", level: 1,
          gloss: "Scores predictions against the true labels.",
          examples: [
            { code: `acc = accuracy_score(y_true, y_pred)`, notes: [{ at: "(y_true, y_pred)", text: "truth first, predictions second" }] },
            { code: `prec = precision_score(y_true, y_pred)`, notes: [{ at: "precision_score", text: "correct positives out of predicted" }] },
            { code: `rec = recall_score(y_true, y_pred)`, notes: [{ at: "recall_score", text: "found positives out of all positives" }] }
          ]
        },
        {
          id: "f1-reports", n: 2, title: "F1 and reports", level: 1,
          gloss: "Balances precision and recall and prints a per-class summary.",
          examples: [
            { code: `f1 = f1_score(y_true, y_pred)`, notes: [{ at: "f1_score", text: "the harmonic mean of the two" }] },
            { code: `print(classification_report(y_true, y_pred))`, notes: [] },
            { code: `print(classification_report(y_true, y_pred, digits=3))`, notes: [{ at: "digits=3", text: "three decimal places" }] }
          ]
        },
        {
          id: "confusion-matrix", n: 3, title: "confusion matrix", level: 2,
          gloss: "Counts true and predicted labels in a grid.",
          examples: [
            { code: `cm = confusion_matrix(y_true, y_pred)`, notes: [{ at: "cm", text: "rows are true, columns are predicted" }] },
            { code: `tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()`, notes: [{ at: ".ravel()", text: "flattens to tn, fp, fn, tp" }] },
            { code: `cm = confusion_matrix(y_true, y_pred, normalize="true")`, notes: [{ at: 'normalize="true"', text: "each row sums to 1" }] }
          ]
        },
        {
          id: "roc-auc", n: 4, title: "ROC AUC", level: 2,
          gloss: "Measures ranking quality from predicted scores.",
          examples: [
            { code: `auc = roc_auc_score(y_true, y_score)`, notes: [{ at: "y_score", text: "probabilities, not hard labels" }] },
            { code: `fpr, tpr, thresholds = roc_curve(y_true, y_score)`, notes: [] },
            { code: `precision, recall, _ = precision_recall_curve(y_true, y_score)`, notes: [] }
          ]
        },
        {
          id: "multiclass-averaging", n: 5, title: "averaging for multiclass", level: 3,
          gloss: "Chooses how per-class scores combine into one number.",
          examples: [
            { code: `score = f1_score(y3_true, y3_pred, average="macro")`, notes: [{ at: '"macro"', text: "every class counts equally" }] },
            { code: `score = f1_score(y3_true, y3_pred, average="weighted")`, notes: [{ at: '"weighted"', text: "larger classes count more" }] },
            { code: `scores = f1_score(y3_true, y3_pred, average=None)`, notes: [{ at: "average=None", text: "one score per class" }] }
          ]
        }
      ]
    },
    {
      id: "regression-models",
      n: 9,
      title: "regression models",
      concepts: [
        {
          id: "linear-regression", n: 1, title: "LinearRegression", level: 1,
          gloss: "Fits a straight-line model by least squares.",
          examples: [
            { code: `reg = LinearRegression()
reg.fit(X_reg, y_reg)`, notes: [] },
            { code: `reg = LinearRegression().fit(X_reg, y_reg)
pred = reg.predict(X_reg[:3])`, notes: [{ at: "X_reg[:3]", text: "predict takes a 2-D array" }] },
            { code: `reg = LinearRegression().fit(X_reg, y_reg)
print(reg.coef_.round(2))`, notes: [] }
          ]
        },
        {
          id: "regularized-models", n: 2, title: "Ridge and Lasso", level: 2,
          gloss: "Shrinks coefficients to reduce overfitting.",
          examples: [
            { code: `ridge = Ridge(alpha=1.0).fit(X_reg, y_reg)`, notes: [{ at: "alpha=1.0", text: "a larger alpha shrinks harder" }] },
            { code: `lasso = Lasso(alpha=0.1).fit(X_reg, y_reg)`, notes: [{ at: "Lasso", text: "can set coefficients exactly to zero" }] },
            { code: `enet = ElasticNet(alpha=0.1, l1_ratio=0.5).fit(X_reg, y_reg)`, notes: [{ at: "l1_ratio=0.5", text: "an even mix of Lasso and Ridge" }] }
          ]
        },
        {
          id: "regression-metrics", n: 3, title: "regression metrics", level: 1,
          gloss: "Measures error with MAE, MSE and R squared.",
          examples: [
            { code: `mae = mean_absolute_error(y_true_r, y_pred_r)`, notes: [] },
            { code: `rmse = mean_squared_error(y_true_r, y_pred_r) ** 0.5`, notes: [{ at: "** 0.5", text: "the square root turns MSE into RMSE" }] },
            { code: `r2 = r2_score(y_true_r, y_pred_r)`, notes: [{ at: "r2_score", text: "1.0 is perfect, 0.0 is the mean" }] }
          ]
        },
        {
          id: "polynomial-features", n: 4, title: "polynomial features", level: 3,
          gloss: "Adds squared and interaction terms so a linear model can curve.",
          examples: [
            { code: `poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X_reg)`, notes: [{ at: "include_bias=False", text: "skips the constant column" }] },
            { code: `model = make_pipeline(PolynomialFeatures(2), LinearRegression())`, notes: [] },
            { code: `model = make_pipeline(PolynomialFeatures(2), LinearRegression())
model.fit(X_reg, y_reg)`, notes: [] }
          ]
        },
        {
          id: "ensemble-regressors", n: 5, title: "ensemble regressors", level: 2,
          gloss: "Averages many trees or boosts them to model non-linear data.",
          examples: [
            { code: `forest = RandomForestRegressor(n_estimators=100, random_state=0)
forest.fit(X_reg, y_reg)`, notes: [{ at: "n_estimators=100", text: "the number of trees" }] },
            { code: `forest = RandomForestRegressor(random_state=0).fit(X_reg, y_reg)
print(forest.feature_importances_.round(2))`, notes: [] },
            { code: `gbr = GradientBoostingRegressor(random_state=0)
gbr.fit(X_reg, y_reg)`, notes: [{ at: "GradientBoostingRegressor", text: "trees built one after another" }] }
          ]
        }
      ]
    },
    {
      id: "classifiers",
      n: 10,
      title: "classifiers",
      concepts: [
        {
          id: "logistic-regression", n: 1, title: "LogisticRegression", level: 1,
          gloss: "Predicts class probabilities with a linear model.",
          examples: [
            { code: `clf = LogisticRegression(max_iter=500).fit(X_train, y_train)`, notes: [{ at: "max_iter=500", text: "more iterations to converge" }] },
            { code: `clf = LogisticRegression().fit(X_train, y_train)
print(clf.predict_proba(X_test[:2]))`, notes: [] },
            { code: `clf = LogisticRegression(C=0.1)`, notes: [{ at: "C=0.1", text: "smaller C means stronger regularization" }] }
          ]
        },
        {
          id: "trees-forests", n: 2, title: "trees and forests", level: 2,
          gloss: "Splits the data with decision rules, alone or in large groups.",
          examples: [
            { code: `tree = DecisionTreeClassifier(max_depth=3, random_state=0)`, notes: [{ at: "max_depth=3", text: "limits how deep the rules go" }] },
            { code: `forest = RandomForestClassifier(n_estimators=200, random_state=0)`, notes: [] },
            { code: `forest = RandomForestClassifier(random_state=0).fit(X, y)
print(forest.feature_importances_.round(2))`, notes: [{ at: "feature_importances_", text: "shares that sum to 1" }] }
          ]
        },
        {
          id: "knn-svm", n: 3, title: "KNN and SVM", level: 2,
          gloss: "Classifies by nearby points or by a maximum-margin boundary.",
          examples: [
            { code: `knn = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)`, notes: [{ at: "n_neighbors=5", text: "votes among the five closest points" }] },
            { code: `svm = SVC(kernel="rbf", C=1.0).fit(X_train, y_train)`, notes: [{ at: 'kernel="rbf"', text: "a curved decision boundary" }] },
            { code: `svm = SVC(probability=True).fit(X_train, y_train)`, notes: [{ at: "probability=True", text: "enables predict_proba, but is slower" }] }
          ]
        },
        {
          id: "gradient-boosting", n: 4, title: "gradient boosting", level: 3,
          gloss: "Builds trees one after another, each fixing the last one's errors.",
          examples: [
            { code: `clf = HistGradientBoostingClassifier().fit(X_train, y_train)`, notes: [{ at: "HistGradientBoosting", text: "fast, handles missing values natively" }] },
            { code: `clf = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1)`, notes: [{ at: "learning_rate=0.1", text: "how much each tree contributes" }] },
            { code: `clf = HistGradientBoostingClassifier().fit(X_train, y_train)
print(clf.score(X_test, y_test))`, notes: [] }
          ]
        },
        {
          id: "imbalanced-classes", n: 5, title: "imbalanced classes", level: 3,
          gloss: "Weights rare classes more heavily when the labels are uneven.",
          examples: [
            { code: `clf = LogisticRegression(class_weight="balanced")`, notes: [{ at: '"balanced"', text: "weights inversely to class size" }] },
            { code: `forest = RandomForestClassifier(class_weight="balanced_subsample")`, notes: [] },
            { code: `print(np.bincount(y))`, notes: [{ at: "np.bincount", text: "how many rows each class has" }] }
          ]
        }
      ]
    },
    {
      id: "kmeans",
      n: 11,
      title: "KMeans",
      concepts: [
        {
          id: "kmeans-fit", n: 1, title: "KMeans", level: 2,
          gloss: "Groups points into k clusters around centers.",
          examples: [
            { code: `km = KMeans(n_clusters=3, n_init=10, random_state=0)`, notes: [{ at: "n_init=10", text: "ten restarts, best result kept" }] },
            { code: `km = KMeans(n_clusters=3, n_init=10, random_state=0)
labels = km.fit_predict(X)`, notes: [{ at: "fit_predict", text: "fit, then label every row" }] },
            { code: `km = KMeans(n_clusters=3, n_init=10, random_state=0)
km.fit(X)
print(km.cluster_centers_.shape)`, notes: [{ at: "cluster_centers_", text: "one row per cluster" }] }
          ]
        },
        {
          id: "choosing-k", n: 2, title: "choosing k", level: 3,
          gloss: "Compares inertia or silhouette across several values of k.",
          examples: [
            { code: `inertia = [
    KMeans(n_clusters=k, n_init=10).fit(X).inertia_
    for k in range(1, 6)
]`, notes: [{ at: ".inertia_", text: "lower is tighter, but always falls" }] },
            { code: `km = KMeans(n_clusters=3, n_init=10, random_state=0)
labels = km.fit_predict(X)
score = silhouette_score(X, labels)`, notes: [{ at: "silhouette_score", text: "near 1 is well separated" }] },
            { code: `for k in range(2, 5):
    labels = KMeans(n_clusters=k, n_init=10).fit_predict(X)
    print(k, silhouette_score(X, labels))`, notes: [] }
          ]
        },
        {
          id: "assigning-new-points", n: 3, title: "assigning new points", level: 2,
          gloss: "Labels unseen rows by their nearest cluster center.",
          examples: [
            { code: `km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
new_labels = km.predict(X[:5])`, notes: [] },
            { code: `km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
dist = km.transform(X[:2])`, notes: [{ at: ".transform(", text: "distance to every center" }] },
            { code: `km = KMeans(n_clusters=3, n_init=10, random_state=0)
labels = km.fit_predict(X)
print(np.bincount(labels))`, notes: [] }
          ]
        },
        {
          id: "other-clustering", n: 4, title: "DBSCAN and agglomerative", level: 3,
          gloss: "Finds clusters by density or by merging the closest points.",
          examples: [
            { code: `db = DBSCAN(eps=0.5, min_samples=5)
labels = db.fit_predict(X)`, notes: [{ at: "eps=0.5", text: "the neighborhood radius" }] },
            { code: `labels = DBSCAN(eps=1.0).fit_predict(X)
print((labels == -1).sum())`, notes: [{ at: "== -1", text: "-1 marks noise points" }] },
            { code: `agg = AgglomerativeClustering(n_clusters=3).fit_predict(X)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "pca",
      n: 12,
      title: "PCA",
      concepts: [
        {
          id: "pca-basics", n: 1, title: "PCA", level: 2,
          gloss: "Projects data onto the directions of greatest variance.",
          examples: [
            { code: `pca = PCA(n_components=2)
X_2d = pca.fit_transform(X)`, notes: [{ at: "n_components=2", text: "keep the top two directions" }] },
            { code: `pca = PCA(n_components=2)
X_2d = pca.fit_transform(X)
print(pca.explained_variance_ratio_)`, notes: [{ at: "explained_variance_ratio_", text: "share of variance per component" }] },
            { code: `pca = PCA(n_components=2)
X_2d = pca.fit_transform(X)
X_back = pca.inverse_transform(X_2d)`, notes: [] }
          ]
        },
        {
          id: "keeping-variance", n: 2, title: "keeping variance", level: 3,
          gloss: "Keeps enough components to explain a share of the variance.",
          examples: [
            { code: `pca = PCA(n_components=0.95)
X_red = pca.fit_transform(X)`, notes: [{ at: "0.95", text: "a float means a variance fraction" }] },
            { code: `pca = PCA().fit(X)
print(np.cumsum(pca.explained_variance_ratio_))`, notes: [{ at: "np.cumsum", text: "running total of the variance" }] },
            { code: `pca = PCA(n_components=0.95).fit(X)
print(pca.n_components_)`, notes: [] }
          ]
        },
        {
          id: "scaled-pca", n: 3, title: "scaling before PCA", level: 2,
          gloss: "Standardizes features first so large units do not dominate.",
          examples: [
            { code: `pipe = make_pipeline(StandardScaler(), PCA(n_components=2))`, notes: [] },
            { code: `pipe = make_pipeline(StandardScaler(), PCA(n_components=2))
X_2d = pipe.fit_transform(X)`, notes: [] },
            { code: `pipe = make_pipeline(StandardScaler(), PCA(n_components=2))
pipe.fit(X)
print(pipe[-1].components_.shape)`, notes: [{ at: "pipe[-1]", text: "the last step, the PCA" }] }
          ]
        },
        {
          id: "truncated-svd", n: 4, title: "TruncatedSVD and t-SNE", level: 3,
          gloss: "Reduces sparse data or builds a two-dimensional map for plotting.",
          examples: [
            { code: `svd = TruncatedSVD(n_components=2)
X_2d = svd.fit_transform(X)`, notes: [{ at: "TruncatedSVD", text: "works on sparse data, no centering" }] },
            { code: `X_sparse = sparse.random(50, 20, density=0.1, random_state=0)
X_2d = TruncatedSVD(2).fit_transform(X_sparse)`, notes: [] },
            { code: `tsne = TSNE(n_components=2, random_state=0)
X_vis = tsne.fit_transform(X)`, notes: [{ at: "TSNE", text: "for plots only, not for modeling" }] }
          ]
        }
      ]
    },
    {
      id: "joblib-persistence",
      n: 13,
      title: "joblib persistence",
      concepts: [
        {
          id: "dump-load", n: 1, title: "dump and load", level: 1,
          gloss: "Saves a fitted model to disk and loads it back.",
          examples: [
            { code: `model = LogisticRegression().fit(X, y)
joblib.dump(model, "model.joblib")`, notes: [{ at: "joblib.dump", text: "writes the fitted object to a file" }] },
            { code: `model = LogisticRegression().fit(X, y)
joblib.dump(model, "model.joblib")
model = joblib.load("model.joblib")`, notes: [{ at: "joblib.load", text: "only load files you trust" }] },
            { code: `model = LogisticRegression().fit(X, y)
joblib.dump(model, "model.joblib")
print(joblib.load("model.joblib").predict(X[:3]))`, notes: [] }
          ]
        },
        {
          id: "saving-pipelines", n: 2, title: "saving pipelines", level: 2,
          gloss: "Persists preprocessing and model together so they cannot drift apart.",
          examples: [
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())
pipe.fit(X, y)
joblib.dump(pipe, "pipe.joblib")`, notes: [{ at: "joblib.dump(pipe", text: "scaler and model in one file" }] },
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())
pipe.fit(X, y)
joblib.dump(pipe, "pipe.joblib")
pipe = joblib.load("pipe.joblib")
print(pipe.predict(X[:3]))`, notes: [] },
            { code: `pipe = make_pipeline(StandardScaler(), LogisticRegression())
pipe.fit(X, y)
joblib.dump(pipe, "pipe.joblib", compress=3)`, notes: [{ at: "compress=3", text: "smaller file, slower to write" }] }
          ]
        },
        {
          id: "parallel-calls", n: 3, title: "Parallel and delayed", level: 3,
          gloss: "Runs independent calls on several CPU cores.",
          examples: [
            { code: `results = Parallel(n_jobs=2)(delayed(pow)(i, 2) for i in range(5))`, notes: [{ at: "delayed(pow)", text: "wraps the call so it can be scheduled" }] },
            { code: `model = LogisticRegression()
scores = cross_val_score(model, X, y, cv=5, n_jobs=-1)`, notes: [{ at: "n_jobs=-1", text: "uses every core" }] },
            { code: `model = LogisticRegression()
with parallel_backend("threading", n_jobs=2):
    scores = cross_val_score(model, X, y, cv=3)`, notes: [{ at: "parallel_backend", text: "chooses how work is spread out" }] }
          ]
        }
      ]
    },
    {
      id: "custom-transformers",
      n: 14,
      title: "custom transformers",
      concepts: [
        {
          id: "function-transformer", n: 1, title: "FunctionTransformer", level: 2,
          gloss: "Wraps a plain function as a pipeline step.",
          examples: [
            { code: `log_step = FunctionTransformer(np.log1p)
X_log = log_step.fit_transform(np.abs(X))`, notes: [{ at: "np.log1p", text: "log of 1 plus x, safe near zero" }] },
            { code: `pipe = make_pipeline(FunctionTransformer(np.log1p), StandardScaler())
X_out = pipe.fit_transform(np.abs(X))`, notes: [] },
            { code: `clip = FunctionTransformer(lambda a: np.clip(a, -3, 3))`, notes: [{ at: "lambda a", text: "lambdas cannot be pickled" }] }
          ]
        },
        {
          id: "transformer-classes", n: 2, title: "transformer classes", level: 3,
          gloss: "Writes a reusable transformer with fit and transform methods.",
          examples: [
            { code: `class ColumnMean(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        self.mean_ = X.mean(axis=0)
        return self

    def transform(self, X):
        return X - self.mean_`, notes: [{ at: "self.mean_", text: "learned in fit, so it ends in _" }] },
            { code: `class Clipper(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self

    def transform(self, X):
        return np.clip(X, -3, 3)`, notes: [{ at: "return self", text: "fit must return the estimator" }] },
            { code: `class Clipper(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self

    def transform(self, X):
        return np.clip(X, -3, 3)
pipe = make_pipeline(Clipper(), StandardScaler())`, notes: [] }
          ]
        },
        {
          id: "set-output", n: 3, title: "set_output", level: 3,
          gloss: "Makes transformers return DataFrames that keep column names.",
          examples: [
            { code: `scaler = StandardScaler().set_output(transform="pandas")
X_df = scaler.fit_transform(df[["age", "income"]])`, notes: [{ at: 'transform="pandas"', text: "a DataFrame, not an array" }] },
            { code: `pipe = make_pipeline(StandardScaler(), PCA(n_components=2))
pipe.set_output(transform="pandas")
X_df = pipe.fit_transform(df[["age", "income"]])`, notes: [] },
            { code: `scaler = StandardScaler().set_output(transform="pandas")
X_df = scaler.fit_transform(df[["age", "income"]])
print(X_df.columns.tolist())`, notes: [] }
          ]
        },
        {
          id: "cloning-estimators", n: 4, title: "cloning estimators", level: 3,
          gloss: "Copies an estimator's settings without any fitted state.",
          examples: [
            { code: `model = LogisticRegression().fit(X, y)
fresh = clone(model)`, notes: [{ at: "clone", text: "same parameters, nothing learned" }] },
            { code: `base = LogisticRegression()
models = [clone(base).set_params(C=c) for c in (0.1, 1, 10)]`, notes: [] },
            { code: `model = LogisticRegression().fit(X, y)
check_is_fitted(model)`, notes: [{ at: "check_is_fitted", text: "raises if fit has not run" }] }
          ]
        }
      ]
    }
  ]
};
