export default {
  id: "haskell",
  name: "Haskell",
  short: "HS",
  pigment: "haskell",
  family: null,
  version: "9.8",
  lexer: "haskell",
  indent: 2,
  topics: [
    {
      id: "values-types",
      n: 1,
      title: "values & types",
      concepts: [
        {
          id: "values-and-signatures", n: 1, title: "values and type signatures", level: 1,
          gloss: "Names constant values and states their types with a double colon.",
          examples: [
            { code: `city :: String
city = "Oslo"
visits :: Int
visits = 3
main :: IO ()
main = putStrLn (city ++ ": " ++ show visits)`, notes: [{ at: "::", text: "has the type" }, { at: "show", text: "value to string" }] },
            { code: `price :: Double
price = 9.99
quantity :: Int
quantity = 3
total :: Double
total = price * fromIntegral quantity
main = print total`, notes: [{ at: "fromIntegral", text: "converts Int to Double" }] },
            { code: `pair :: (Int, String)
pair = (1, "one")
main = print (fst pair, snd pair)`, notes: [{ at: "(Int, String)", text: "tuple type" }] }
          ]
        },
        {
          id: "basic-types", n: 2, title: "basic types", level: 1,
          gloss: "Uses Int, Integer, Double, Char and Bool values.",
          examples: [
            { code: `main :: IO ()
main = do
  print (42 :: Int)
  print (3.14 :: Double)
  print 'x'
  print True`, notes: [{ at: ":: Int", text: "inline annotation" }] },
            { code: `big :: Integer
big = 2 ^ 100
main = print big`, notes: [{ at: "Integer", text: "no size limit" }] },
            { code: `ratio :: Rational
ratio = 3 / 4
main = do
  print ratio
  print (maxBound :: Int)`, notes: [{ at: "Rational", text: "exact fraction" }] }
          ]
        },
        {
          id: "numeric-conversion", n: 3, title: "numeric conversion", level: 1,
          gloss: "Converts between number types and divides integers explicitly.",
          examples: [
            { code: `main :: IO ()
main = do
  print (fromIntegral (7 :: Int) / 2 :: Double)
  print (7 \`div\` 2)
  print (7 \`mod\` 2)
  print (truncate (3.7 :: Double) :: Int)`, notes: [{ at: "`div`", text: "integer division" }, { at: "truncate", text: "drops the fraction" }] },
            { code: `main :: IO ()
main = do
  print (round (2.5 :: Double) :: Int)
  print (ceiling (2.1 :: Double) :: Int)
  print (floor (-2.1 :: Double) :: Int)`, notes: [{ at: "round", text: "banker's rounding" }] },
            { code: `main :: IO ()
main = do
  print (read "42" + 1 :: Int)
  print (show 3.5)`, notes: [{ at: "read", text: "string to value" }] }
          ]
        },
        {
          id: "tuples-and-aliases", n: 4, title: "tuples and type aliases", level: 1,
          gloss: "Groups values in tuples and gives types readable names.",
          examples: [
            { code: `type Point = (Double, Double)
origin :: Point
origin = (0, 0)
main = print origin`, notes: [{ at: "type", text: "alias, same type" }] },
            { code: `type Name = String
type Age = Int
person :: (Name, Age)
person = ("ada", 36)
main = putStrLn (fst person ++ " " ++ show (snd person))`, notes: [] },
            { code: `swap :: (a, b) -> (b, a)
swap (x, y) = (y, x)
main = print (swap (1, "one"))`, notes: [{ at: "a, b", text: "any types" }] }
          ]
        }
      ]
    },
    {
      id: "functions-currying",
      n: 2,
      title: "functions & currying",
      concepts: [
        {
          id: "defining-functions", n: 1, title: "defining functions", level: 1,
          gloss: "Defines functions with a signature and an equation.",
          examples: [
            { code: `square :: Int -> Int
square n = n * n
main = print (square 4)`, notes: [{ at: "Int -> Int", text: "takes Int, returns Int" }] },
            { code: `area :: Double -> Double -> Double
area w h = w * h
main = print (area 3 4)`, notes: [{ at: "area w h", text: "arguments separated by spaces" }] },
            { code: `greet :: String -> String -> String
greet greeting name = greeting ++ ", " ++ name
main = putStrLn (greet "Hello" "ada")`, notes: [] }
          ]
        },
        {
          id: "partial-application", n: 2, title: "currying and partial application", level: 1,
          gloss: "Fixes some arguments of a function to get a new function.",
          examples: [
            { code: `add :: Int -> Int -> Int
add a b = a + b
addFive :: Int -> Int
addFive = add 5
main = print (addFive 10)`, notes: [{ at: "add 5", text: "partial application" }] },
            { code: `main :: IO ()
main = print (map (* 2) [1, 2, 3])`, notes: [{ at: "(* 2)", text: "operator section" }] },
            { code: `scale :: Double -> Double -> Double
scale factor x = factor * x
main = print (map (scale 1.5) [2, 4])`, notes: [] }
          ]
        },
        {
          id: "operators-sections", n: 3, title: "operators and sections", level: 2,
          gloss: "Uses operators as functions and wraps them in sections.",
          examples: [
            { code: `main :: IO ()
main = do
  print (map (+ 1) [1, 2, 3])
  print (map (subtract 1) [1, 2, 3])
  print (filter (> 2) [1, 2, 3, 4])`, notes: [{ at: "subtract", text: "section for minus" }] },
            { code: `(|>) :: a -> (a -> b) -> b
x |> f = f x
main = print ([1, 2, 3] |> map (* 2) |> sum)`, notes: [{ at: "(|>)", text: "user-defined operator" }] },
            { code: `main :: IO ()
main = do
  print (10 \`div\` 3)
  print (div 10 3)
  print ((\`div\` 3) 10)`, notes: [{ at: "`div`", text: "function as infix" }] }
          ]
        },
        {
          id: "composition-lambdas", n: 4, title: "composition and lambdas", level: 2,
          gloss: "Chains functions with a dot and writes unnamed functions with a backslash.",
          examples: [
            { code: `inc :: Int -> Int
inc = (+ 1)
double :: Int -> Int
double = (* 2)
main = print ((double . inc) 5)`, notes: [{ at: ".", text: "composes right to left" }] },
            { code: `main :: IO ()
main = print (map (\\x -> x * x + 1) [1, 2, 3])`, notes: [{ at: "\\x ->", text: "lambda" }] },
            { code: `main :: IO ()
main = do
  print (flip (-) 1 10)
  print ((negate . abs) 5)
  print (($ 4) (+ 1))`, notes: [{ at: "flip", text: "swaps the arguments" }] }
          ]
        }
      ]
    },
    {
      id: "lists-comprehensions",
      n: 3,
      title: "lists & comprehensions",
      concepts: [
        {
          id: "list-basics", n: 1, title: "list basics", level: 1,
          gloss: "Builds lists with brackets, cons, append and ranges.",
          examples: [
            { code: `scores :: [Int]
scores = [90, 72, 85]
main = do
  print (head scores)
  print (length scores)`, notes: [{ at: "[Int]", text: "list of Int" }] },
            { code: `main :: IO ()
main = do
  print (1 : [2, 3])
  print ([1, 2] ++ [3, 4])
  print ([10, 20, 30] !! 1)`, notes: [{ at: ":", text: "adds at the front" }, { at: "!!", text: "index from zero" }] },
            { code: `main :: IO ()
main = do
  print [1 .. 5]
  print [0, 2 .. 10]
  print (take 3 [10, 20 ..])`, notes: [{ at: "[0, 2 .. 10]", text: "range with a step" }] }
          ]
        },
        {
          id: "list-functions", n: 2, title: "list functions", level: 1,
          gloss: "Reverses and slices lists and sums or searches them with Prelude functions.",
          examples: [
            { code: `main :: IO ()
main = do
  print (reverse [1, 2, 3])
  print (sum [3, 5, 7])
  print (maximum [3, 8, 1])`, notes: [] },
            { code: `main :: IO ()
main = do
  print (take 2 "haskell")
  print (drop 3 "haskell")
  print (splitAt 2 [1, 2, 3, 4])`, notes: [{ at: "splitAt", text: "pair of lists" }] },
            { code: `main :: IO ()
main = do
  print (zip [1, 2, 3] "abc")
  print (elem 3 [1, 2, 3])
  print (null [])`, notes: [{ at: "zip", text: "pairs up elements" }] }
          ]
        },
        {
          id: "comprehensions", n: 3, title: "list comprehensions", level: 2,
          gloss: "Builds lists from generators and conditions.",
          examples: [
            { code: `main :: IO ()
main = print [n * n | n <- [1 .. 5]]`, notes: [{ at: "n <-", text: "generator" }] },
            { code: `main :: IO ()
main = print [n | n <- [1 .. 10], even n]`, notes: [{ at: "even n", text: "filter" }] },
            { code: `main :: IO ()
main = print [(x, y) | x <- [1, 2], y <- "ab"]`, notes: [{ at: "x <- [1, 2], y <-", text: "all combinations" }] }
          ]
        },
        {
          id: "strings-as-lists", n: 4, title: "strings as lists", level: 1,
          gloss: "Treats strings as lists of characters.",
          examples: [
            { code: `main :: IO ()
main = do
  putStrLn (map succ "HAL")
  putStrLn (reverse "stream")
  print (words "red apple, red car")`, notes: [{ at: "map succ", text: "next character" }] },
            { code: `import Data.Char (toUpper)
main = putStrLn (map toUpper "quiet")`, notes: [{ at: "import", text: "brings toUpper into scope" }] },
            { code: `main :: IO ()
main = do
  print (lines "a\\nb\\nc")
  putStrLn (unwords ["a", "b"])
  putStrLn (unlines ["x", "y"])`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "pattern-matching-guards",
      n: 4,
      title: "pattern matching & guards",
      concepts: [
        {
          id: "function-patterns", n: 1, title: "patterns in functions", level: 1,
          gloss: "Selects an equation by matching the shape of the arguments.",
          examples: [
            { code: `isZero :: Int -> Bool
isZero 0 = True
isZero _ = False
main = print (isZero 0)`, notes: [{ at: "0", text: "literal pattern" }, { at: "_", text: "matches anything" }] },
            { code: `describe :: [a] -> String
describe [] = "empty"
describe [_] = "one"
describe _ = "many"
main = putStrLn (describe "ab")`, notes: [{ at: "[_]", text: "list with one element" }] },
            { code: `first :: (a, b, c) -> a
first (x, _, _) = x
main = print (first (1, 'a', True))`, notes: [] }
          ]
        },
        {
          id: "guards", n: 2, title: "guards", level: 1,
          gloss: "Chooses a result with boolean conditions introduced by pipes.",
          examples: [
            { code: `grade :: Int -> Char
grade n
  | n >= 90 = 'A'
  | n >= 80 = 'B'
  | otherwise = 'C'
main = print (grade 85)`, notes: [{ at: "|", text: "guard" }, { at: "otherwise", text: "always true" }] },
            { code: `sign :: Int -> String
sign n
  | n < 0 = "negative"
  | n == 0 = "zero"
  | otherwise = "positive"
main = putStrLn (sign (-3))`, notes: [] },
            { code: `bmi :: Double -> Double -> String
bmi w h
  | v < 18.5 = "under"
  | v < 25 = "normal"
  | otherwise = "over"
  where v = w / h ^ 2
main = putStrLn (bmi 70 1.75)`, notes: [{ at: "where v", text: "shared by all guards" }] }
          ]
        },
        {
          id: "case-expressions", n: 3, title: "case expressions", level: 1,
          gloss: "Matches a value against patterns inside an expression.",
          examples: [
            { code: `describe :: Int -> String
describe n = case n of
  0 -> "zero"
  1 -> "one"
  _ -> "many"
main = putStrLn (describe 1)`, notes: [{ at: "case n of", text: "pattern branches" }] },
            { code: `firstOr :: a -> [a] -> a
firstOr d xs = case xs of
  [] -> d
  (x : _) -> x
main = print (firstOr 0 [])`, notes: [{ at: "(x : _)", text: "head and ignored tail" }] },
            { code: `main :: IO ()
main = do
  let pair = (3, "x")
  case pair of
    (0, _) -> putStrLn "zero"
    (n, s) -> putStrLn (s ++ show n)`, notes: [] }
          ]
        },
        {
          id: "list-patterns", n: 4, title: "list patterns and as-patterns", level: 2,
          gloss: "Splits lists into head and tail and names the whole value with at.",
          examples: [
            { code: `sumList :: [Int] -> Int
sumList [] = 0
sumList (x : xs) = x + sumList xs
main = print (sumList [1, 2, 3])`, notes: [{ at: "(x : xs)", text: "head and tail" }] },
            { code: `firstTwo :: [a] -> Maybe (a, a)
firstTwo (x : y : _) = Just (x, y)
firstTwo _ = Nothing
main = print (firstTwo "abc")`, notes: [{ at: "x : y : _", text: "at least two elements" }] },
            { code: `dup :: [a] -> [a]
dup whole@(x : _) = x : whole
dup [] = []
main = print (dup "abc")`, notes: [{ at: "whole@", text: "names the entire list" }] }
          ]
        }
      ]
    },
    {
      id: "where-let",
      n: 5,
      title: "where & let",
      concepts: [
        {
          id: "where-clauses", n: 1, title: "where clauses", level: 1,
          gloss: "Defines helper values and functions after the main equation.",
          examples: [
            { code: `circleArea :: Double -> Double
circleArea r = pi * r2
  where r2 = r * r
main = print (circleArea 2)`, notes: [{ at: "where", text: "scope is the equation" }] },
            { code: `hypotenuse :: Double -> Double -> Double
hypotenuse a b = sqrt (sq a + sq b)
  where sq x = x * x
main = print (hypotenuse 3 4)`, notes: [{ at: "sq x", text: "local function" }] },
            { code: `stats :: [Double] -> (Double, Double)
stats xs = (total, total / count)
  where
    total = sum xs
    count = fromIntegral (length xs)
main = print (stats [2, 4, 6])`, notes: [] }
          ]
        },
        {
          id: "let-expressions", n: 2, title: "let expressions", level: 1,
          gloss: "Binds names inside an expression or a do block.",
          examples: [
            { code: `main :: IO ()
main = do
  let x = 5
      y = 6
  print (x * y)`, notes: [{ at: "let x = 5", text: "no in keyword in do" }] },
            { code: `volume :: Double -> Double -> Double -> Double
volume w h d = let base = w * h in base * d
main = print (volume 2 3 4)`, notes: [{ at: "let base = w * h in", text: "expression form" }] },
            { code: `main :: IO ()
main = print (let a = 2; b = 3 in a ^ b)`, notes: [] }
          ]
        },
        {
          id: "scoping-with-guards", n: 3, title: "where, let and guards together", level: 2,
          gloss: "Shares bindings with guards and comprehensions.",
          examples: [
            { code: `classify :: Int -> String
classify n
  | r == 0 = "even"
  | otherwise = "odd"
  where r = n \`mod\` 2
main = putStrLn (classify 7)`, notes: [] },
            { code: `squares :: [Int]
squares = [y | x <- [1 .. 4], let y = x * x, y > 3]
main = print squares`, notes: [{ at: "let y", text: "binding inside a comprehension" }] },
            { code: `roots :: Double -> Double -> Double -> (Double, Double)
roots a b c = (x1, x2)
  where
    d = sqrt (b * b - 4 * a * c)
    x1 = (-b + d) / (2 * a)
    x2 = (-b - d) / (2 * a)
main = print (roots 1 (-3) 2)`, notes: [] }
          ]
        },
        {
          id: "local-helpers", n: 4, title: "local helper functions", level: 2,
          gloss: "Hides accumulator loops in where blocks.",
          examples: [
            { code: `sumTo :: Int -> Int
sumTo n = go 0 n
  where
    go acc 0 = acc
    go acc k = go (acc + k) (k - 1)
main = print (sumTo 100)`, notes: [{ at: "go", text: "conventional helper name" }] },
            { code: `reverse' :: [a] -> [a]
reverse' = go []
  where
    go acc [] = acc
    go acc (x : xs) = go (x : acc) xs
main = print (reverse' [1, 2, 3])`, notes: [] },
            { code: `average :: [Double] -> Double
average xs = total / fromIntegral n
  where
    total = sum xs
    n = length xs
main = print (average [1, 2, 3, 4])`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "data-types-records",
      n: 6,
      title: "data types & records",
      concepts: [
        {
          id: "algebraic-types", n: 1, title: "algebraic data types", level: 1,
          gloss: "Declares types with several constructors using data.",
          examples: [
            { code: `data Color = Red | Green | Blue deriving (Show, Eq)
main = print [Red, Blue]`, notes: [{ at: "|", text: "separates constructors" }, { at: "deriving", text: "generates instances" }] },
            { code: `data Shape = Circle Double | Rect Double Double deriving Show
area :: Shape -> Double
area (Circle r) = pi * r * r
area (Rect w h) = w * h
main = print (area (Rect 3 4))`, notes: [{ at: "Rect Double Double", text: "constructor with fields" }] },
            { code: `data Direction = North | East | South | West
  deriving (Show, Enum, Bounded)
main = print [minBound .. maxBound :: Direction]`, notes: [{ at: "Enum, Bounded", text: "allows ranges" }] }
          ]
        },
        {
          id: "record-syntax", n: 2, title: "record syntax", level: 1,
          gloss: "Names the fields of a constructor and reads or updates them by name.",
          examples: [
            { code: `data User = User { name :: String, age :: Int } deriving Show
main = do
  let ada = User { name = "ada", age = 36 }
  print (name ada)`, notes: [{ at: "name", text: "field is also a function" }] },
            { code: `data Point = Point { px :: Double, py :: Double } deriving Show
main = print (Point { px = 1, py = 2 })`, notes: [] },
            { code: `data Config = Config { host :: String, port :: Int } deriving Show
defaults :: Config
defaults = Config { host = "localhost", port = 80 }
main = print (defaults { port = 8080 })`, notes: [{ at: "defaults { port = 8080 }", text: "copy with a change" }] }
          ]
        },
        {
          id: "parametric-types", n: 3, title: "parametric types and newtype", level: 2,
          gloss: "Parameterises types over other types and wraps one with newtype.",
          examples: [
            { code: `data Pair a b = Pair a b deriving Show
main = print (Pair 1 "one")`, notes: [{ at: "a b", text: "type parameters" }] },
            { code: `newtype Age = Age Int deriving Show
older :: Age -> Age
older (Age n) = Age (n + 1)
main = print (older (Age 36))`, notes: [{ at: "newtype", text: "one constructor, one field" }] },
            { code: `data Tree a = Leaf | Node (Tree a) a (Tree a)
size :: Tree a -> Int
size Leaf = 0
size (Node l _ r) = size l + 1 + size r
main = print (size (Node Leaf 'x' (Node Leaf 'y' Leaf)))`, notes: [{ at: "Tree a", text: "recursive type" }] }
          ]
        },
        {
          id: "deriving-instances", n: 4, title: "deriving instances", level: 2,
          gloss: "Gets equality, ordering and parsing from deriving.",
          examples: [
            { code: `data Level = Low | Mid | High deriving (Show, Eq, Ord)
main = print (Low < High, maximum [Low, High, Mid])`, notes: [{ at: "Ord", text: "follows constructor order" }] },
            { code: `data Suit = Hearts | Spades deriving (Show, Read, Eq)
main = print (read "Spades" :: Suit)`, notes: [{ at: "Read", text: "parses from a string" }] },
            { code: `data Point = Point Int Int deriving (Show, Eq, Ord)
main = print (compare (Point 1 2) (Point 1 3))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "type-classes",
      n: 7,
      title: "type classes",
      concepts: [
        {
          id: "using-classes", n: 1, title: "using standard classes", level: 1,
          gloss: "Relies on Show, Eq, Ord, Num and Read through constraints.",
          examples: [
            { code: `main :: IO ()
main = do
  print (show 42 ++ "!")
  print (1 == 1, 'a' < 'b')
  print (compare 3 5)`, notes: [{ at: "compare", text: "returns LT, EQ or GT" }] },
            { code: `main :: IO ()
main = do
  print (fromIntegral (3 :: Int) + 0.5 :: Double)
  print (minimum [3, 1, 2])
  print (read "42" + 1 :: Int)`, notes: [] },
            { code: `describe :: (Show a, Ord a) => a -> a -> String
describe a b = show (max a b)
main = putStrLn (describe 3 9)`, notes: [{ at: "(Show a, Ord a) =>", text: "class constraints" }] }
          ]
        },
        {
          id: "defining-classes", n: 2, title: "defining classes", level: 2,
          gloss: "Declares a class with method signatures and implements it for types.",
          examples: [
            { code: `class Describable a where
  describe :: a -> String
instance Describable Bool where
  describe True = "yes"
  describe False = "no"
main = putStrLn (describe True)`, notes: [{ at: "class", text: "set of required functions" }, { at: "instance", text: "implementation for a type" }] },
            { code: `class Shape a where
  area :: a -> Double
data Square = Square Double
instance Shape Square where
  area (Square s) = s * s
main = print (area (Square 3))`, notes: [] },
            { code: `class Container f where
  empty :: f a
  insert :: a -> f a -> f a
instance Container [] where
  empty = []
  insert = (:)
main = print (insert 1 (insert 2 empty) :: [Int])`, notes: [{ at: "f a", text: "class over type constructors" }] }
          ]
        },
        {
          id: "custom-instances", n: 3, title: "custom instances", level: 2,
          gloss: "Writes Show, Eq and Ord instances by hand.",
          examples: [
            { code: `data Point = Point Int Int
instance Show Point where
  show (Point x y) = "(" ++ show x ++ "," ++ show y ++ ")"
main = print (Point 1 2)`, notes: [{ at: "show", text: "used by print" }] },
            { code: `data Color = Red | Green
instance Eq Color where
  Red == Red = True
  Green == Green = True
  _ == _ = False
main = print (Red == Green)`, notes: [] },
            { code: `data Version = Version Int Int deriving (Eq, Show)
instance Ord Version where
  compare (Version a b) (Version c d) = compare (a, b) (c, d)
main = print (maximum [Version 1 2, Version 2 0])`, notes: [{ at: "compare", text: "minimal definition" }] }
          ]
        },
        {
          id: "semigroup-monoid", n: 4, title: "defaults, Semigroup and Monoid", level: 3,
          gloss: "Provides default methods and combines values with the Semigroup and Monoid classes.",
          examples: [
            { code: `newtype Total = Total Int deriving Show
instance Semigroup Total where
  Total a <> Total b = Total (a + b)
instance Monoid Total where
  mempty = Total 0
main = print (mconcat [Total 1, Total 2, Total 3])`, notes: [{ at: "<>", text: "combines two values" }, { at: "mempty", text: "the neutral value" }] },
            { code: `class Greeter a where
  greet :: a -> String
  greet _ = "hello"
data Robot = Robot
instance Greeter Robot
main = putStrLn (greet Robot)`, notes: [{ at: "greet _ =", text: "default method" }] },
            { code: `main :: IO ()
main = do
  print ([1, 2] <> [3])
  print (mconcat ["ab", "cd"])
  print (mempty :: String)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "maybe-either",
      n: 8,
      title: "Maybe & Either",
      concepts: [
        {
          id: "maybe-type", n: 1, title: "Maybe", level: 1,
          gloss: "Represents a value that may be missing with Just and Nothing.",
          examples: [
            { code: `safeDiv :: Int -> Int -> Maybe Int
safeDiv _ 0 = Nothing
safeDiv a b = Just (a \`div\` b)
main = print (safeDiv 10 2, safeDiv 1 0)`, notes: [{ at: "Maybe Int", text: "a Just number or Nothing" }] },
            { code: `main :: IO ()
main = do
  print (lookup 2 [(1, "a"), (2, "b")])
  print (lookup 9 [(1, "a")])`, notes: [{ at: "lookup", text: "returns a Maybe" }] },
            { code: `firstEven :: [Int] -> Maybe Int
firstEven xs = case filter even xs of
  [] -> Nothing
  (x : _) -> Just x
main = print (firstEven [1, 3, 4])`, notes: [] }
          ]
        },
        {
          id: "maybe-helpers", n: 2, title: "working with Maybe", level: 1,
          gloss: "Unwraps and transforms Maybe values with maybe, fromMaybe and fmap.",
          examples: [
            { code: `import Data.Maybe (fromMaybe)
main = print (fromMaybe 0 (lookup 'x' [('a', 1)]))`, notes: [{ at: "fromMaybe", text: "default for Nothing" }] },
            { code: `main :: IO ()
main = do
  print (maybe "none" show (Just 3))
  print (fmap (+ 1) (Just 2))
  print (fmap (+ 1) Nothing)`, notes: [{ at: "maybe", text: "case analysis as a function" }] },
            { code: `import Data.Maybe (catMaybes)
main = print (catMaybes [Just 1, Nothing, Just 3])`, notes: [{ at: "catMaybes", text: "drops Nothing values" }] }
          ]
        },
        {
          id: "either-type", n: 3, title: "Either", level: 1,
          gloss: "Returns a result or an error value with Right and Left.",
          examples: [
            { code: `parseAge :: Int -> Either String Int
parseAge n
  | n < 0 = Left "negative"
  | otherwise = Right n
main = print (parseAge 5, parseAge (-1))`, notes: [{ at: "Left", text: "conventionally the error" }, { at: "Right", text: "the success value" }] },
            { code: `main :: IO ()
main = do
  print (either length (* 2) (Left "abc" :: Either String Int))
  print (either length (* 2) (Right 4 :: Either String Int))`, notes: [{ at: "either", text: "handles both sides" }] },
            { code: `divide :: Double -> Double -> Either String Double
divide _ 0 = Left "division by zero"
divide a b = Right (a / b)
main = print (divide 1 0)`, notes: [] }
          ]
        },
        {
          id: "chaining", n: 4, title: "chaining with bind and do", level: 2,
          gloss: "Sequences computations that may fail with the bind operator and do blocks.",
          examples: [
            { code: `safeDiv :: Int -> Int -> Maybe Int
safeDiv _ 0 = Nothing
safeDiv a b = Just (a \`div\` b)
main = print (safeDiv 100 5 >>= safeDiv 60)`, notes: [{ at: ">>=", text: "passes the value on if Just" }] },
            { code: `calc :: Maybe Int
calc = do
  a <- Just 6
  b <- Just 7
  return (a * b)
main = print calc`, notes: [{ at: "a <-", text: "unwraps or short-circuits" }] },
            { code: `validate :: Int -> Either String Int
validate n = do
  a <- if n > 0 then Right n else Left "must be positive"
  b <- if even a then Right a else Left "must be even"
  return (a + b)
main = print (validate 4, validate 3)`, notes: [{ at: "Left \"must be positive\"", text: "a Left stops the chain" }] }
          ]
        }
      ]
    },
    {
      id: "map-filter-fold",
      n: 9,
      title: "map, filter, fold",
      concepts: [
        {
          id: "map-filter", n: 1, title: "map and filter", level: 1,
          gloss: "Transforms and selects list elements with higher-order functions.",
          examples: [
            { code: `main :: IO ()
main = do
  print (map (* 2) [1, 2, 3])
  print (filter even [1 .. 10])`, notes: [{ at: "map", text: "applies to every element" }, { at: "filter", text: "keeps matches" }] },
            { code: `main :: IO ()
main = print (map length ["tea", "cake", "jam"])`, notes: [] },
            { code: `main :: IO ()
main = print (takeWhile (< 10) (map (^ 2) [1 ..]))`, notes: [{ at: "takeWhile", text: "stops at the first miss" }] }
          ]
        },
        {
          id: "folds", n: 2, title: "folds", level: 1,
          gloss: "Reduces a list to one value with foldr, foldl and foldl'.",
          examples: [
            { code: `main :: IO ()
main = do
  print (foldr (+) 0 [1, 2, 3])
  print (foldl (-) 10 [1, 2, 3])`, notes: [{ at: "foldr", text: "folds from the right" }, { at: "foldl", text: "folds from the left" }] },
            { code: `count :: [a] -> Int
count = foldr (\\_ n -> n + 1) 0
main = print (count "haskell")`, notes: [{ at: "\\_ n", text: "ignores the element" }] },
            { code: `import Data.List (foldl')
main = print (foldl' (+) 0 [1 .. 100000])`, notes: [{ at: "foldl'", text: "strict, avoids thunks" }] }
          ]
        },
        {
          id: "zipping-iterating", n: 3, title: "zip, zipWith and iterate", level: 2,
          gloss: "Combines lists pairwise and generates sequences from a function.",
          examples: [
            { code: `main :: IO ()
main = print (zipWith (+) [1, 2, 3] [10, 20, 30])`, notes: [{ at: "zipWith", text: "combines with a function" }] },
            { code: `main :: IO ()
main = print (takeWhile (< 100) (iterate (* 2) 1))`, notes: [{ at: "iterate", text: "infinite sequence" }] },
            { code: `main :: IO ()
main = do
  print (zip3 [1, 2] "ab" [True, False])
  print (unzip [(1, 'a'), (2, 'b')])`, notes: [] }
          ]
        },
        {
          id: "data-list", n: 4, title: "sorting and grouping with Data.List", level: 2,
          gloss: "Orders and deduplicates lists and groups or partitions them with Data.List.",
          examples: [
            { code: `import Data.List (sort, sortBy, nub)
import Data.Ord (comparing)
main = do
  print (sort [3, 1, 2])
  print (sortBy (comparing negate) [3, 1, 2])
  print (nub [1, 1, 2])`, notes: [{ at: "comparing", text: "sort key" }] },
            { code: `import Data.List (group, sort)
main = print (map (\\g -> (head g, length g)) (group (sort "banana")))`, notes: [{ at: "group", text: "runs of equal elements" }] },
            { code: `import Data.List (partition, isPrefixOf)
main = do
  print (partition even [1 .. 6])
  print ("ha" \`isPrefixOf\` "haskell")`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "functors-monads-basics",
      n: 10,
      title: "functors & monads basics",
      concepts: [
        {
          id: "functors", n: 1, title: "Functor and fmap", level: 2,
          gloss: "Maps a function over values inside a container with fmap.",
          examples: [
            { code: `main :: IO ()
main = do
  print (fmap (+ 1) [1, 2, 3])
  print (fmap length (Just "abc"))
  print ((+ 1) <$> Just 2)`, notes: [{ at: "<$>", text: "infix fmap" }] },
            { code: `data Box a = Box a deriving Show
instance Functor Box where
  fmap f (Box x) = Box (f x)
main = print (fmap (* 2) (Box 21))`, notes: [{ at: "instance Functor", text: "defines fmap" }] },
            { code: `main :: IO ()
main = do
  print (fmap (* 2) (3, 4))
  print (fmap show (Right 5 :: Either String Int))`, notes: [{ at: "fmap (* 2) (3, 4)", text: "changes the second part" }] }
          ]
        },
        {
          id: "applicative", n: 2, title: "Applicative", level: 2,
          gloss: "Applies functions inside containers with pure and the apply operator.",
          examples: [
            { code: `main :: IO ()
main = do
  print (Just (+ 3) <*> Just 4)
  print ((+) <$> Just 1 <*> Just 2)
  print (pure 5 :: Maybe Int)`, notes: [{ at: "<*>", text: "applies a wrapped function" }] },
            { code: `main :: IO ()
main = print ((,) <$> [1, 2] <*> "ab")`, notes: [{ at: "(,)", text: "pair constructor as a function" }] },
            { code: `add3 :: Maybe Int -> Maybe Int -> Maybe Int -> Maybe Int
add3 a b c = (\\x y z -> x + y + z) <$> a <*> b <*> c
main = print (add3 (Just 1) (Just 2) Nothing)`, notes: [] }
          ]
        },
        {
          id: "monad-bind", n: 3, title: "Monad and bind", level: 2,
          gloss: "Chains dependent steps with the bind operator.",
          examples: [
            { code: `half :: Int -> Maybe Int
half n = if even n then Just (n \`div\` 2) else Nothing
main = print (Just 20 >>= half >>= half)`, notes: [{ at: ">>=", text: "feeds the result onward" }] },
            { code: `main :: IO ()
main = print ([1, 2, 3] >>= \\x -> [x, x * 10])`, notes: [{ at: "[1, 2, 3] >>=", text: "list monad is flat map" }] },
            { code: `pairs :: [(Int, Char)]
pairs = do
  n <- [1, 2]
  c <- "ab"
  return (n, c)
main = print pairs`, notes: [] }
          ]
        },
        {
          id: "monad-helpers", n: 4, title: "mapM, sequence and when", level: 3,
          gloss: "Runs and combines monadic actions with sequence, mapM and replicateM.",
          examples: [
            { code: `main :: IO ()
main = do
  print (sequence [Just 1, Just 2])
  print (sequence [Just 1, Nothing])
  print (mapM (\\x -> if x > 0 then Just x else Nothing) [1, 2])`, notes: [{ at: "sequence", text: "list of actions to action of list" }] },
            { code: `import Control.Monad (forM_, when)
main = forM_ [1, 2, 3] $ \\i -> when (odd i) (print i)`, notes: [{ at: "when", text: "runs only if true" }] },
            { code: `import Control.Monad (replicateM, zipWithM_)
main = do
  print (replicateM 2 "ab")
  zipWithM_ (\\i s -> putStrLn (show i ++ s)) [1 ..] ["a", "b"]`, notes: [{ at: "replicateM", text: "all combinations" }] }
          ]
        }
      ]
    },
    {
      id: "io-do-notation",
      n: 11,
      title: "IO & do notation",
      concepts: [
        {
          id: "printing", n: 1, title: "printing output", level: 1,
          gloss: "Writes text and values to standard output.",
          examples: [
            { code: `main :: IO ()
main = do
  putStrLn "Hello"
  putStr "no newline"
  putStrLn ""
  print (1 + 2)`, notes: [{ at: "putStr", text: "no trailing newline" }, { at: "print", text: "show then putStrLn" }] },
            { code: `main :: IO ()
main = do
  let name = "ada"
  putStrLn ("Hello, " ++ name)`, notes: [] },
            { code: `main :: IO ()
main = mapM_ putStrLn ["a", "b", "c"]`, notes: [{ at: "mapM_", text: "runs an action per element" }] }
          ]
        },
        {
          id: "reading-input", n: 2, title: "reading input", level: 1,
          gloss: "Reads lines from standard input and converts them.",
          examples: [
            { code: `main :: IO ()
main = do
  name <- getLine
  putStrLn ("Hello, " ++ name)`, notes: [{ at: "<-", text: "runs the action, binds the result" }] },
            { code: `main :: IO ()
main = do
  line <- getLine
  let n = read line :: Int
  print (n * 2)`, notes: [{ at: "let", text: "pure binding inside do" }] },
            { code: `main :: IO ()
main = do
  contents <- getContents
  print (length (lines contents))`, notes: [{ at: "getContents", text: "all of stdin, lazily" }] }
          ]
        },
        {
          id: "do-control", n: 3, title: "control flow in do blocks", level: 1,
          gloss: "Mixes pure bindings, conditionals and loops inside do blocks.",
          examples: [
            { code: `main :: IO ()
main = do
  let xs = [1, 2, 3]
  let total = sum xs
  putStrLn ("total: " ++ show total)`, notes: [] },
            { code: `main :: IO ()
main = do
  r <- return 5
  if r > 3
    then putStrLn "big"
    else putStrLn "small"`, notes: [{ at: "return", text: "wraps a value, does not exit" }] },
            { code: `import Control.Monad (forM_, when)
main = do
  forM_ [1 .. 3] $ \\i -> do
    when (even i) $ putStrLn "even"
    print i`, notes: [{ at: "forM_", text: "loop over a list" }] }
          ]
        },
        {
          id: "files-exceptions", n: 4, title: "files and exceptions", level: 2,
          gloss: "Reads and writes files and catches errors with try.",
          examples: [
            { code: `main :: IO ()
main = do
  writeFile "notes.txt" "first\\nsecond\\n"
  text <- readFile "notes.txt"
  putStr text`, notes: [{ at: "writeFile", text: "replaces the file" }] },
            { code: `main :: IO ()
main = do
  appendFile "log.txt" "start\\n"
  appendFile "log.txt" "end\\n"
  readFile "log.txt" >>= putStr`, notes: [{ at: "appendFile", text: "adds to the end" }] },
            { code: `import Control.Exception
main = do
  r <- try (evaluate (1 \`div\` 0)) :: IO (Either ArithException Int)
  print r`, notes: [{ at: "try", text: "an Either instead of a crash" }, { at: "evaluate", text: "forces the computation" }] }
          ]
        }
      ]
    },
    {
      id: "modules-imports",
      n: 12,
      title: "modules & imports",
      concepts: [
        {
          id: "importing", n: 1, title: "importing names", level: 1,
          gloss: "Brings selected functions into scope from library modules.",
          examples: [
            { code: `import Data.Char (toUpper, isDigit)
main = do
  putStrLn (map toUpper "quiet")
  print (filter isDigit "a1b2")`, notes: [{ at: "(toUpper, isDigit)", text: "import list" }] },
            { code: `import Data.List (sort, nub)
main = print (sort (nub [3, 1, 3, 2]))`, notes: [] },
            { code: `import Data.Maybe
main = print (fromMaybe 0 Nothing, isJust (Just 1))`, notes: [{ at: "import Data.Maybe", text: "no list imports all" }] }
          ]
        },
        {
          id: "qualified-imports", n: 2, title: "qualified imports", level: 1,
          gloss: "Imports a module under a prefix to avoid name clashes.",
          examples: [
            { code: `import qualified Data.Map as Map
main = print (Map.toList (Map.fromList [(1, "a"), (2, "b")]))`, notes: [{ at: "qualified", text: "names need a prefix" }, { at: "as Map", text: "short alias" }] },
            { code: `import qualified Data.Set as Set
main = print (Set.member 3 (Set.fromList [1, 2, 3]))`, notes: [] },
            { code: `import qualified Data.Char as C
main = putStrLn (map C.toUpper "shout")`, notes: [] }
          ]
        },
        {
          id: "hiding-and-operators", n: 3, title: "hiding names and importing operators", level: 2,
          gloss: "Hides clashing names and imports operators in parentheses.",
          examples: [
            { code: `import Prelude hiding (lookup)
lookup :: Int -> String
lookup n = "item " ++ show n
main = putStrLn (lookup 3)`, notes: [{ at: "hiding", text: "excludes a Prelude name" }] },
            { code: `import Data.List hiding (insert)
insert :: Int -> [Int] -> [Int]
insert x xs = x : xs
main = print (insert 1 [2])`, notes: [] },
            { code: `import Data.Function ((&))
main = print ([1, 2, 3] & map (* 2) & sum)`, notes: [{ at: "((&))", text: "operator in the import list" }] }
          ]
        },
        {
          id: "module-headers", n: 4, title: "module headers and exports", level: 2,
          gloss: "Declares a module and lists the names it exports.",
          examples: [
            { code: `module Main (main) where
greet :: String -> String
greet name = "Hello, " ++ name
main :: IO ()
main = putStrLn (greet "ada")`, notes: [{ at: "(main)", text: "export list" }] },
            { code: `module Main where
import Data.List (intercalate)
main :: IO ()
main = putStrLn (intercalate ", " ["a", "b"])`, notes: [] },
            { code: `module Geometry (Shape (..), area) where
data Shape = Square Double | Circle Double
area :: Shape -> Double
area (Square s) = s * s
area (Circle r) = pi * r * r`, notes: [{ at: "Shape (..)", text: "type and all constructors" }] }
          ]
        }
      ]
    },
    {
      id: "lazy-evaluation",
      n: 13,
      title: "lazy evaluation",
      concepts: [
        {
          id: "lazy-basics", n: 1, title: "lazy basics", level: 1,
          gloss: "Evaluates expressions only when their values are needed.",
          examples: [
            { code: `main :: IO ()
main = print (take 3 [1 ..])`, notes: [{ at: "[1 ..]", text: "infinite list" }] },
            { code: `main :: IO ()
main = print (fst (1, undefined))`, notes: [{ at: "undefined", text: "never evaluated" }] },
            { code: `main :: IO ()
main = print (length [undefined, undefined])`, notes: [{ at: "length", text: "counts without forcing elements" }] }
          ]
        },
        {
          id: "infinite-structures", n: 2, title: "infinite lists", level: 2,
          gloss: "Defines endless lists and consumes a finite part.",
          examples: [
            { code: `naturals :: [Integer]
naturals = [0 ..]
main = print (takeWhile (< 5) naturals)`, notes: [] },
            { code: `fibs :: [Integer]
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)
main = print (take 10 fibs)`, notes: [{ at: "fibs", text: "defined in terms of itself" }] },
            { code: `primes :: [Int]
primes = sieve [2 ..]
  where sieve (p : xs) = p : sieve [x | x <- xs, x \`mod\` p /= 0]
main = print (take 5 primes)`, notes: [] }
          ]
        },
        {
          id: "short-circuiting", n: 3, title: "laziness in practice", level: 2,
          gloss: "Skips unused work with short-circuit operators and conditionals.",
          examples: [
            { code: `main :: IO ()
main = print (True || undefined)`, notes: [{ at: "||", text: "right side not evaluated" }] },
            { code: `safeHead :: [a] -> Maybe a
safeHead xs = if null xs then Nothing else Just (head xs)
main = print (safeHead ([] :: [Int]))`, notes: [] },
            { code: `expensive :: Int
expensive = sum [1 .. 10000000]
main = print (if False then expensive else 0)`, notes: [{ at: "expensive", text: "never computed" }] }
          ]
        },
        {
          id: "strictness", n: 4, title: "forcing evaluation", level: 3,
          gloss: "Forces values early with seq, strict folds and bang patterns.",
          examples: [
            { code: `import Data.List (foldl')
main = print (foldl' (+) 0 [1 .. 1000000])`, notes: [] },
            { code: `main :: IO ()
main = do
  let x = 1 + 2 :: Int
  x \`seq\` putStrLn "forced"`, notes: [{ at: "seq", text: "evaluates the first argument" }] },
            { code: `mean :: [Double] -> Double
mean xs = go 0 0 xs
  where
    go !s !n [] = s / fromIntegral (n :: Int)
    go !s !n (y : ys) = go (s + y) (n + 1) ys
main = print (mean [1, 2, 3, 4])`, notes: [{ at: "!s", text: "bang pattern forces s" }] }
          ]
        }
      ]
    }
  ]
};
