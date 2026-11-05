import os
import tempfile
import warnings

import joblib
import numpy as np
import pandas as pd
from joblib import Parallel, delayed, parallel_backend
from scipy import sparse
from scipy.stats import loguniform
from sklearn.base import BaseEstimator, TransformerMixin, clone
from sklearn.cluster import DBSCAN, AgglomerativeClustering, KMeans
from sklearn.compose import ColumnTransformer, make_column_selector, make_column_transformer
from sklearn.datasets import make_classification, make_regression
from sklearn.decomposition import PCA, TruncatedSVD
from sklearn.ensemble import (
    GradientBoostingClassifier,
    GradientBoostingRegressor,
    HistGradientBoostingClassifier,
    RandomForestClassifier,
    RandomForestRegressor,
)
from sklearn.impute import SimpleImputer
from sklearn.linear_model import ElasticNet, Lasso, LinearRegression, LogisticRegression, Ridge
from sklearn.manifold import TSNE
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    mean_absolute_error,
    mean_squared_error,
    precision_recall_curve,
    precision_score,
    r2_score,
    recall_score,
    roc_auc_score,
    roc_curve,
    silhouette_score,
)
from sklearn.model_selection import (
    GridSearchCV,
    KFold,
    RandomizedSearchCV,
    StratifiedKFold,
    cross_val_predict,
    cross_val_score,
    cross_validate,
    train_test_split,
)
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.preprocessing import (
    FunctionTransformer,
    LabelEncoder,
    MinMaxScaler,
    OneHotEncoder,
    OrdinalEncoder,
    PolynomialFeatures,
    RobustScaler,
    StandardScaler,
)
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.utils.validation import check_is_fitted

os.chdir(tempfile.mkdtemp())
warnings.simplefilter("error")

rng = np.random.default_rng(0)
X, y = make_classification(n_samples=200, n_features=5, n_informative=3, random_state=0)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
X_reg, y_reg = make_regression(n_samples=200, n_features=4, noise=5, random_state=0)
X_missing = X.copy()
X_missing[::10, 0] = np.nan
df = pd.DataFrame(
    {
        "age": rng.integers(18, 70, 200),
        "income": rng.normal(50000, 12000, 200).round(),
        "city": rng.choice(["paris", "oslo", "rome"], 200),
        "plan": rng.choice(["free", "pro"], 200),
    }
)
y_true = np.array([0, 1, 1, 0, 1, 1, 0, 0])
y_pred = np.array([0, 1, 0, 0, 1, 1, 1, 0])
y_score = np.array([0.1, 0.9, 0.4, 0.2, 0.8, 0.7, 0.6, 0.3])
y3_true = np.array([0, 1, 2, 2, 1, 0, 2, 1])
y3_pred = np.array([0, 2, 2, 2, 1, 0, 1, 1])
y_true_r = np.array([3.0, 5.0, 2.5, 7.0])
y_pred_r = np.array([2.5, 5.0, 4.0, 8.0])
