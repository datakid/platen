export default {
  id: "clojure",
  name: "Clojure",
  short: "CLJ",
  pigment: "clojure",
  family: null,
  version: "1.12",
  lexer: "clojure",
  indent: 2,
  topics: [
    {
      id: "values-def",
      n: 1,
      title: "values and def",
      concepts: [
        {
          id: "def-values", n: 1, title: "def", level: 1,
          gloss: "Binds a name to a value in the namespace, with clojure.string and clojure.set assumed.",
          examples: [
            { code: `(def city "Oslo")
(def visits 3)
(println city visits)`, notes: [{ at: "def", text: "binds a global name" }] },
            { code: `(def width 4)
(def height 5)
(def area (* width height))`, notes: [{ at: "(* width height)", text: "the operator comes first" }] },
            { code: `(def greeting (str "Hello, " "Ada"))`, notes: [{ at: "str", text: "joins values into a string" }] }
          ]
        },
        {
          id: "literals", n: 2, title: "literals", level: 1,
          gloss: "Writes numbers, strings, keywords, booleans and nil directly.",
          examples: [
            { code: `(def answer 42)
(def ratio 3/4)
(def pi 3.14159)`, notes: [{ at: "3/4", text: "an exact fraction" }] },
            { code: `(def status :active)
(def user "Ada")`, notes: [{ at: ":active", text: "a keyword" }] },
            { code: `(def nothing nil)
(def yes true)
(def letter \\a)`, notes: [{ at: "nil", text: "the absence of a value" }] }
          ]
        },
        {
          id: "local-bindings", n: 3, title: "local bindings", level: 1,
          gloss: "Names values inside one expression with let.",
          examples: [
            { code: `(let [x 3
      y 4]
  (+ (* x x) (* y y)))`, notes: [{ at: "let", text: "bindings only visible inside" }] },
            { code: `(let [name "Ada"
      greeting (str "Hello, " name)]
  (println greeting))`, notes: [] },
            { code: `(let [total 10
      doubled (* total 2)]
  (+ total doubled))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "functions",
      n: 2,
      title: "functions",
      concepts: [
        {
          id: "defn", n: 1, title: "defining functions", level: 1,
          gloss: "Declares a named function with defn, a parameter vector and a body.",
          examples: [
            { code: `(defn square [x]
  (* x x))`, notes: [{ at: "defn", text: "a named function" }, { at: "[x]", text: "the parameter vector" }] },
            { code: `(defn add [a b]
  (+ a b))
(add 3 4)`, notes: [] },
            { code: `(defn greet [name]
  (str "Hello, " name "!"))`, notes: [] }
          ]
        },
        {
          id: "anonymous", n: 2, title: "anonymous functions", level: 1,
          gloss: "Writes an unnamed function with fn or the short hash form.",
          examples: [
            { code: `(def doubler (fn [x] (* x 2)))`, notes: [{ at: "fn", text: "an unnamed function" }] },
            { code: `(map #(* % 2) [1 2 3])`, notes: [{ at: "#(*", text: "a short anonymous function" }, { at: "%", text: "the first argument" }] },
            { code: `(map (fn [a b] (+ a b)) [1 2] [10 20])`, notes: [] }
          ]
        },
        {
          id: "arities", n: 3, title: "arities and variadics", level: 2,
          gloss: "Handles several argument counts and extra arguments in one function.",
          examples: [
            { code: `(defn greet
  ([] (greet "world"))
  ([name] (str "Hello, " name)))`, notes: [{ at: "([name]", text: "one arity" }] },
            { code: `(defn total [& numbers]
  (apply + numbers))`, notes: [{ at: "&", text: "gathers the remaining arguments" }] },
            { code: `(defn log [level & parts]
  (str level ": " (apply str parts)))`, notes: [] }
          ]
        },
        {
          id: "higher-order", n: 4, title: "higher order functions", level: 2,
          gloss: "Builds new functions from old ones with partial, comp and juxt.",
          examples: [
            { code: `(def add5 (partial + 5))
(add5 10)`, notes: [{ at: "partial", text: "fixes the first arguments" }] },
            { code: `(def shout (comp clojure.string/upper-case str))
(shout "hey")`, notes: [{ at: "comp", text: "runs right to left" }] },
            { code: `((juxt first last count) [1 2 3])`, notes: [{ at: "juxt", text: "applies several functions to one value" }] }
          ]
        }
      ]
    },
    {
      id: "collections",
      n: 3,
      title: "vectors and lists",
      concepts: [
        {
          id: "vectors", n: 1, title: "vectors", level: 1,
          gloss: "Stores ordered items in a vector with fast access by index.",
          examples: [
            { code: `(def scores [90 85 70])
(first scores)`, notes: [{ at: "[90 85 70]", text: "a vector literal" }] },
            { code: `(nth [10 20 30] 1)
(get [10 20 30] 5 :none)`, notes: [{ at: "get", text: "returns a default when missing" }] },
            { code: `(def more (conj [1 2] 3))
(count more)`, notes: [{ at: "conj", text: "adds at the end of a vector" }] }
          ]
        },
        {
          id: "lists", n: 2, title: "lists", level: 1,
          gloss: "Builds linked lists that grow at the front.",
          examples: [
            { code: `(def items '(1 2 3))
(first items)`, notes: [{ at: "'", text: "quote, do not evaluate" }] },
            { code: `(conj '(2 3) 1)`, notes: [{ at: "conj", text: "adds at the front of a list" }] },
            { code: `(list 1 2 3)
(rest '(1 2 3))`, notes: [] }
          ]
        },
        {
          id: "stack-slices", n: 3, title: "slices and ends", level: 2,
          gloss: "Reads the ends of a vector and takes parts with subvec.",
          examples: [
            { code: `(def v [1 2 3 4 5])
(subvec v 1 3)`, notes: [{ at: "subvec", text: "a part of a vector" }] },
            { code: `(peek [1 2 3])
(pop [1 2 3])`, notes: [{ at: "peek", text: "the last item of a vector" }] },
            { code: `(take 2 [1 2 3 4])
(drop 2 [1 2 3 4])
(last [1 2 3])`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "maps-sets",
      n: 4,
      title: "maps and sets",
      concepts: [
        {
          id: "maps", n: 1, title: "maps", level: 1,
          gloss: "Stores key and value pairs in a map and reads them with get.",
          examples: [
            { code: `(def person {:name "Ada" :age 36})
(get person :name)`, notes: [{ at: "{:name \"Ada\" :age 36}", text: "a map literal" }] },
            { code: `(:age {:name "Ada" :age 36})`, notes: [{ at: "(:age {", text: "a keyword is a function" }] },
            { code: `(def ages {"ada" 36 "bob" 41})
(ages "bob")`, notes: [] }
          ]
        },
        {
          id: "map-updates", n: 2, title: "updating maps", level: 1,
          gloss: "Returns changed copies of a map with assoc, dissoc and update.",
          examples: [
            { code: `(assoc {:a 1} :b 2)`, notes: [{ at: "assoc", text: "adds or replaces a key" }] },
            { code: `(dissoc {:a 1 :b 2} :a)`, notes: [] },
            { code: `(update {:count 1} :count inc)`, notes: [{ at: "update", text: "applies a function to a value" }] }
          ]
        },
        {
          id: "map-functions", n: 3, title: "map functions", level: 2,
          gloss: "Reads keys and values, merges maps and selects entries.",
          examples: [
            { code: `(keys {:a 1 :b 2})
(vals {:a 1 :b 2})`, notes: [] },
            { code: `(merge {:a 1} {:b 2} {:a 3})`, notes: [{ at: "merge", text: "later maps win" }] },
            { code: `(select-keys {:id 1 :name "a" :x 0} [:id :name])`, notes: [] }
          ]
        },
        {
          id: "sets", n: 4, title: "sets", level: 2,
          gloss: "Keeps unique items in a set and tests membership.",
          examples: [
            { code: `(def tags #{:a :b})
(contains? tags :a)`, notes: [{ at: "#{:a :b}", text: "a set literal" }] },
            { code: `(conj #{1 2} 2 3)`, notes: [] },
            { code: `(clojure.set/union #{1 2} #{2 3})`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "sequences",
      n: 5,
      title: "sequences",
      concepts: [
        {
          id: "map-filter", n: 1, title: "map and filter", level: 1,
          gloss: "Transforms and selects items of any collection lazily.",
          examples: [
            { code: `(map inc [1 2 3])`, notes: [{ at: "map", text: "transforms every item" }] },
            { code: `(filter even? [1 2 3 4])`, notes: [{ at: "filter", text: "keeps items that pass" }] },
            { code: `(remove odd? [1 2 3 4])`, notes: [] }
          ]
        },
        {
          id: "reduce", n: 2, title: "reduce", level: 1,
          gloss: "Folds a collection into one value with reduce.",
          examples: [
            { code: `(reduce + [1 2 3 4])`, notes: [{ at: "reduce", text: "accumulates a result" }] },
            { code: `(reduce + 100 [1 2 3])`, notes: [{ at: "100", text: "the starting value" }] },
            { code: `(reduce (fn [acc x] (conj acc (* x x))) [] [1 2 3])`, notes: [] }
          ]
        },
        {
          id: "ranges-lazy", n: 3, title: "ranges and laziness", level: 2,
          gloss: "Generates numbers lazily and takes only what is needed.",
          examples: [
            { code: `(range 5)
(range 2 10 3)`, notes: [{ at: "range", text: "a lazy sequence of numbers" }] },
            { code: `(take 5 (iterate #(* 2 %) 1))`, notes: [{ at: "iterate", text: "an endless sequence" }] },
            { code: `(take 3 (cycle [:a :b]))`, notes: [] }
          ]
        },
        {
          id: "comprehensions", n: 4, title: "for and doseq", level: 2,
          gloss: "Builds sequences with for and runs side effects with doseq.",
          examples: [
            { code: `(for [x (range 3)] (* x x))`, notes: [{ at: "for", text: "builds a lazy sequence" }] },
            { code: `(for [x [1 2] y [:a :b]] [x y])`, notes: [] },
            { code: `(doseq [n [1 2 3]]
  (println n))`, notes: [{ at: "doseq", text: "runs for effect" }] }
          ]
        }
      ]
    },
    {
      id: "threading",
      n: 6,
      title: "threading macros",
      concepts: [
        {
          id: "thread-first", n: 1, title: "thread first", level: 1,
          gloss: "Passes a value as the first argument through a chain of calls.",
          examples: [
            { code: `(-> {:a 1}
    (assoc :b 2)
    (dissoc :a))`, notes: [{ at: "->", text: "value becomes the first argument" }] },
            { code: `(-> "  hello "
    clojure.string/trim
    clojure.string/upper-case)`, notes: [] },
            { code: `(-> 5 inc (* 2))`, notes: [] }
          ]
        },
        {
          id: "thread-last", n: 2, title: "thread last", level: 1,
          gloss: "Passes a value as the last argument through a chain of sequence calls.",
          examples: [
            { code: `(->> [1 2 3 4 5]
     (filter odd?)
     (map #(* % %)))`, notes: [{ at: "->>", text: "value becomes the last argument" }] },
            { code: `(->> (range 10)
     (filter even?)
     (reduce +))`, notes: [] },
            { code: `(->> ["a" "b" "c"]
     (map clojure.string/upper-case)
     (clojure.string/join ","))`, notes: [] }
          ]
        },
        {
          id: "conditional-threading", n: 3, title: "conditional threading", level: 2,
          gloss: "Stops on nil with some arrow and applies steps conditionally with cond arrow.",
          examples: [
            { code: `(some-> {:user {:name "Ada"}}
        :user
        :name)`, notes: [{ at: "some->", text: "stops when a step gives nil" }] },
            { code: `(cond-> {:id 1}
  true (assoc :ok true)
  false (assoc :skip true))`, notes: [{ at: "cond->", text: "applies steps whose test is true" }] },
            { code: `(as-> 5 n
  (inc n)
  (* n 2))`, notes: [{ at: "as->", text: "names the threaded value" }] }
          ]
        }
      ]
    },
    {
      id: "conditionals",
      n: 7,
      title: "conditionals",
      concepts: [
        {
          id: "if-when", n: 1, title: "if and when", level: 1,
          gloss: "Chooses between expressions with if and runs a body with when.",
          examples: [
            { code: `(if (> 5 3) "bigger" "smaller")`, notes: [{ at: "if", text: "test, then, else" }] },
            { code: `(when (pos? 5)
  (println "positive")
  :done)`, notes: [{ at: "when", text: "an if without an else" }] },
            { code: `(if-not (empty? []) "has items" "empty")`, notes: [] }
          ]
        },
        {
          id: "cond-case", n: 2, title: "cond and case", level: 1,
          gloss: "Selects among many branches with cond and case.",
          examples: [
            { code: `(defn size [n]
  (cond
    (< n 10) :small
    (< n 100) :medium
    :else :large))`, notes: [{ at: ":else", text: "the final catch all" }] },
            { code: `(case 2
  1 "one"
  2 "two"
  "many")`, notes: [{ at: "case", text: "compares with constants" }] },
            { code: `(cond
  (neg? -1) "negative"
  :else "other")`, notes: [] }
          ]
        },
        {
          id: "if-let", n: 3, title: "if let and when let", level: 2,
          gloss: "Binds a value and tests it in a single step.",
          examples: [
            { code: `(if-let [user (get {:name "Ada"} :name)]
  (str "Hi " user)
  "nobody")`, notes: [{ at: "if-let", text: "binds and tests together" }] },
            { code: `(when-let [items (seq [1 2])]
  (count items))`, notes: [] },
            { code: `(and 1 2 3)
(or nil false :default)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "destructuring",
      n: 8,
      title: "destructuring",
      concepts: [
        {
          id: "vector-destructuring", n: 1, title: "vector destructuring", level: 2,
          gloss: "Unpacks vector items into names in a binding form.",
          examples: [
            { code: `(let [[a b] [1 2]]
  (+ a b))`, notes: [{ at: "[a b]", text: "names for the first two items" }] },
            { code: `(let [[head & tail] [1 2 3]]
  [head tail])`, notes: [{ at: "& tail", text: "the rest of the items" }] },
            { code: `(let [[x _ z] [1 2 3]]
  [x z])`, notes: [] }
          ]
        },
        {
          id: "map-destructuring", n: 2, title: "map destructuring", level: 2,
          gloss: "Unpacks map values by key with keys and or.",
          examples: [
            { code: `(let [{:keys [name age]} {:name "Ada" :age 36}]
  (str name " is " age))`, notes: [{ at: ":keys", text: "names from keyword keys" }] },
            { code: `(let [{:keys [host port] :or {port 80}} {:host "a"}]
  [host port])`, notes: [{ at: ":or", text: "defaults for missing keys" }] },
            { code: `(let [{n :name} {:name "Ada"}]
  n)`, notes: [] }
          ]
        },
        {
          id: "function-destructuring", n: 3, title: "in function parameters", level: 2,
          gloss: "Destructures arguments directly in the parameter vector.",
          examples: [
            { code: `(defn full-name [{:keys [first last]}]
  (str first " " last))`, notes: [{ at: "{:keys [first last]}", text: "a map parameter" }] },
            { code: `(defn sum-pair [[a b]]
  (+ a b))`, notes: [] },
            { code: `(defn describe [{:keys [name] :as person}]
  [name (count person)])`, notes: [{ at: ":as", text: "the whole value" }] }
          ]
        }
      ]
    },
    {
      id: "recursion",
      n: 9,
      title: "loops and recursion",
      concepts: [
        {
          id: "loop-recur", n: 1, title: "loop and recur", level: 1,
          gloss: "Repeats work without growing the stack using loop and recur.",
          examples: [
            { code: `(loop [i 0 total 0]
  (if (< i 5)
    (recur (inc i) (+ total i))
    total))`, notes: [{ at: "recur", text: "jumps back to loop" }] },
            { code: `(defn countdown [n]
  (loop [i n acc []]
    (if (zero? i) acc (recur (dec i) (conj acc i)))))`, notes: [] },
            { code: `(loop [n 10]
  (when (> n 7)
    (recur (dec n))))`, notes: [] }
          ]
        },
        {
          id: "defn-recur", n: 2, title: "recursive functions", level: 2,
          gloss: "Recurses in tail position with recur inside a function.",
          examples: [
            { code: `(defn factorial [n]
  (loop [i n acc 1]
    (if (<= i 1) acc (recur (dec i) (* acc i)))))`, notes: [{ at: "loop", text: "carries an accumulator" }] },
            { code: `(defn sum-to [n acc]
  (if (zero? n) acc (recur (dec n) (+ acc n))))`, notes: [{ at: "recur", text: "tail call in a function" }] },
            { code: `(defn fib [n]
  (if (< n 2) n (+ (fib (- n 1)) (fib (- n 2)))))`, notes: [] }
          ]
        },
        {
          id: "looping-forms", n: 3, title: "dotimes and while", level: 2,
          gloss: "Runs fixed or conditional loops for side effects.",
          examples: [
            { code: `(dotimes [i 3]
  (println i))`, notes: [{ at: "dotimes", text: "runs a fixed number of times" }] },
            { code: `(def n (atom 0))
(while (< @n 3)
  (swap! n inc))`, notes: [] },
            { code: `(doseq [[k v] {:a 1 :b 2}]
  (println k v))`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "strings-regex",
      n: 10,
      title: "strings and regex",
      concepts: [
        {
          id: "string-basics", n: 1, title: "string basics", level: 1,
          gloss: "Builds and slices strings with str, subs and count.",
          examples: [
            { code: `(str "a" 1 :b)`, notes: [{ at: "str", text: "any values to text" }] },
            { code: `(subs "hello world" 6)`, notes: [{ at: "subs", text: "substring from an index" }] },
            { code: `(count "hello")
(format "%s is %d" "Ada" 36)`, notes: [] }
          ]
        },
        {
          id: "string-library", n: 2, title: "clojure.string", level: 1,
          gloss: "Changes case, trims, splits and joins with the clojure.string namespace.",
          examples: [
            { code: `(clojure.string/upper-case "hello")`, notes: [{ at: "clojure.string", text: "the string helpers" }] },
            { code: `(clojure.string/split "a,b,c" #",")`, notes: [] },
            { code: `(clojure.string/join "-" ["a" "b" "c"])
(clojure.string/trim "  hi  ")`, notes: [] }
          ]
        },
        {
          id: "regex", n: 3, title: "regular expressions", level: 2,
          gloss: "Matches text with re-find, re-seq and re-matches.",
          examples: [
            { code: `(re-find #"\\d+" "order 42")`, notes: [{ at: "#\"\\d+\"", text: "a regex literal" }] },
            { code: `(re-seq #"\\d+" "1 and 22 and 333")`, notes: [] },
            { code: `(re-matches #"(\\w+)@(\\w+)\\.com" "ada@example.com")`, notes: [{ at: "re-matches", text: "the whole string must match" }] }
          ]
        }
      ]
    },
    {
      id: "state",
      n: 11,
      title: "atoms and state",
      concepts: [
        {
          id: "atoms", n: 1, title: "atoms", level: 1,
          gloss: "Holds changing state in an atom and updates it with swap bang.",
          examples: [
            { code: `(def counter (atom 0))
(swap! counter inc)
@counter`, notes: [{ at: "atom", text: "a managed mutable value" }, { at: "@", text: "reads the current value" }] },
            { code: `(def state (atom {:count 0}))
(swap! state update :count inc)`, notes: [] },
            { code: `(def flag (atom false))
(reset! flag true)`, notes: [{ at: "reset!", text: "sets without a function" }] }
          ]
        },
        {
          id: "refs-agents", n: 2, title: "refs and agents", level: 3,
          gloss: "Coordinates changes with ref transactions or sends work to an agent.",
          examples: [
            { code: `(def a (ref 100))
(def b (ref 0))
(dosync
  (alter a - 10)
  (alter b + 10))`, notes: [{ at: "dosync", text: "a transaction" }] },
            { code: `(def log (agent []))
(send log conj "started")
(await log)`, notes: [{ at: "send", text: "asynchronous update" }] },
            { code: `(def balance (ref 0))
(dosync (ref-set balance 50))`, notes: [] }
          ]
        },
        {
          id: "delay-memoize", n: 3, title: "delay and memoize", level: 2,
          gloss: "Computes a value once on demand and caches function results.",
          examples: [
            { code: `(def expensive (delay (+ 1 2)))
@expensive`, notes: [{ at: "delay", text: "computed on first read" }] },
            { code: `(def slow-square (memoize (fn [x] (* x x))))
(slow-square 12)`, notes: [{ at: "memoize", text: "caches by arguments" }] },
            { code: `(def p (promise))
(deliver p 42)
@p`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "namespaces",
      n: 12,
      title: "namespaces",
      concepts: [
        {
          id: "ns-form", n: 1, title: "the ns form", level: 1,
          gloss: "Declares a namespace and loads libraries with require.",
          examples: [
            { code: `(ns demo.core
  (:require [clojure.string :as str]))

(str/upper-case "ok")`, notes: [{ at: ":require", text: "loads a library" }, { at: ":as", text: "a short alias" }] },
            { code: `(ns demo.sets
  (:require [clojure.set :refer [union]]))

(union #{1} #{2})`, notes: [{ at: ":refer", text: "use a name without a prefix" }] },
            { code: `(ns demo.util
  (:import (java.util Date)))

(class (Date.))`, notes: [] }
          ]
        },
        {
          id: "require-forms", n: 2, title: "require and alias", level: 2,
          gloss: "Loads a namespace at runtime with require.",
          examples: [
            { code: `(require '[clojure.string :as s])
(s/join "," [1 2 3])`, notes: [] },
            { code: `(require '[clojure.walk :as walk])
(walk/keywordize-keys {"a" 1})`, notes: [] },
            { code: `(require '[clojure.set :as set])
(set/difference #{1 2 3} #{2})`, notes: [] }
          ]
        },
        {
          id: "private", n: 3, title: "private definitions", level: 2,
          gloss: "Hides helpers from other namespaces with defn dash.",
          examples: [
            { code: `(defn- helper [x] (* x 2))
(defn api [x] (helper x))`, notes: [{ at: "defn-", text: "private to the namespace" }] },
            { code: `(def ^:private secret 42)`, notes: [{ at: "^:private", text: "metadata hides the var" }] },
            { code: `(defonce settings (atom {}))`, notes: [{ at: "defonce", text: "defined only the first time" }] }
          ]
        }
      ]
    },
    {
      id: "polymorphism",
      n: 13,
      title: "records and protocols",
      concepts: [
        {
          id: "records", n: 1, title: "records", level: 1,
          gloss: "Declares a named map like type with defrecord.",
          examples: [
            { code: `(defrecord Person [name age])
(def ada (->Person "Ada" 36))`, notes: [{ at: "defrecord", text: "a type with fixed fields" }] },
            { code: `(defrecord Point [x y])
(:x (->Point 1 2))`, notes: [] },
            { code: `(defrecord Book [title pages])
(map->Book {:title "Dune" :pages 412})`, notes: [{ at: "map->Book", text: "builds from a map" }] }
          ]
        },
        {
          id: "protocols", n: 2, title: "protocols", level: 2,
          gloss: "Defines a set of functions that types can implement.",
          examples: [
            { code: `(defprotocol Shape
  (area [s]))

(defrecord Square [side]
  Shape
  (area [_] (* side side)))`, notes: [{ at: "defprotocol", text: "declares the functions" }] },
            { code: `(defprotocol Greeter
  (greet [g name]))

(extend-protocol Greeter
  String
  (greet [g name] (str g ", " name)))`, notes: [{ at: "extend-protocol", text: "adds it to an existing type" }] },
            { code: `(defprotocol Named
  (label [x]))

(extend-type clojure.lang.Keyword
  Named
  (label [k] (name k)))`, notes: [] }
          ]
        },
        {
          id: "multimethods", n: 3, title: "multimethods", level: 3,
          gloss: "Dispatches on any function of the arguments with defmulti and defmethod.",
          examples: [
            { code: `(defmulti area :shape)
(defmethod area :square [{:keys [side]}] (* side side))
(defmethod area :circle [{:keys [r]}] (* 3 r r))`, notes: [{ at: "defmulti", text: "picks a method by dispatch value" }] },
            { code: `(defmulti greet class)
(defmethod greet String [s] (str "Hi " s))
(defmethod greet :default [x] "Hello")`, notes: [{ at: ":default", text: "used when nothing matches" }] },
            { code: `(defmulti kind (fn [n] (if (even? n) :even :odd)))
(defmethod kind :even [_] "even")
(defmethod kind :odd [_] "odd")`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "errors-interop",
      n: 14,
      title: "errors and Java interop",
      concepts: [
        {
          id: "exceptions", n: 1, title: "try and catch", level: 1,
          gloss: "Handles errors with try, catch and finally.",
          examples: [
            { code: `(try
  (/ 1 0)
  (catch ArithmeticException e
    (.getMessage e)))`, notes: [{ at: "catch", text: "handles a type of error" }] },
            { code: `(try
  (Integer/parseInt "x")
  (catch NumberFormatException _ 0)
  (finally (println "done")))`, notes: [{ at: "finally", text: "always runs" }] },
            { code: `(try (throw (Exception. "boom")) (catch Exception e (.getMessage e)))`, notes: [] }
          ]
        },
        {
          id: "ex-info", n: 2, title: "ex info", level: 2,
          gloss: "Raises errors that carry a map of data with ex-info.",
          examples: [
            { code: `(try
  (throw (ex-info "bad input" {:code 400}))
  (catch clojure.lang.ExceptionInfo e
    (ex-data e)))`, notes: [{ at: "ex-info", text: "an error with data" }] },
            { code: `(defn check [n]
  (when (neg? n)
    (throw (ex-info "negative" {:n n}))))`, notes: [] },
            { code: `(ex-message (ex-info "hello" {}))`, notes: [] }
          ]
        },
        {
          id: "interop", n: 3, title: "Java interop", level: 2,
          gloss: "Calls Java methods and constructors from Clojure.",
          examples: [
            { code: `(Math/abs -5)`, notes: [{ at: "Math/abs", text: "a static method" }] },
            { code: `(.toUpperCase "hello")`, notes: [{ at: ".toUpperCase", text: "an instance method" }] },
            { code: `(def sb (StringBuilder. "ab"))
(.append sb "cd")
(.toString sb)`, notes: [{ at: "StringBuilder.", text: "calls a constructor" }] }
          ]
        }
      ]
    },
    {
      id: "macros",
      n: 15,
      title: "macros",
      concepts: [
        {
          id: "defmacro", n: 1, title: "defmacro", level: 2,
          gloss: "Writes code that generates code with defmacro.",
          examples: [
            { code: `(defmacro unless [test & body]
  (list 'if test nil (cons 'do body)))`, notes: [{ at: "defmacro", text: "runs at compile time" }] },
            { code: `(defmacro twice [expr]
  (list 'do expr expr))`, notes: [] },
            { code: `(macroexpand '(when true :ok))`, notes: [{ at: "macroexpand", text: "shows the generated code" }] }
          ]
        },
        {
          id: "syntax-quote", n: 2, title: "syntax quote", level: 2,
          gloss: "Builds code templates with a backtick and fills them with a tilde.",
          examples: [
            { code: `(defmacro my-when [test & body]
  \`(if ~test (do ~@body)))`, notes: [{ at: "`", text: "a code template" }, { at: "~", text: "inserts a value" }, { at: "~@", text: "splices a list in place" }] },
            { code: `(defmacro square-of [x]
  \`(* ~x ~x))`, notes: [] },
            { code: `(let [n 3] \`(+ ~n 1))`, notes: [] }
          ]
        },
        {
          id: "hygiene", n: 3, title: "generated names", level: 3,
          gloss: "Avoids name clashes with a hash suffix inside syntax quote.",
          examples: [
            { code: `(defmacro with-timing [expr]
  \`(let [start# (System/nanoTime)
         result# ~expr]
     [result# (- (System/nanoTime) start#)]))`, notes: [{ at: "start#", text: "a unique generated name" }] },
            { code: `(defmacro swap-values [a b]
  \`(let [tmp# ~a] [~b tmp#]))`, notes: [] },
            { code: `(defmacro debug [expr]
  \`(let [v# ~expr] (println '~expr "=>" v#) v#))`, notes: [] }
          ]
        }
      ]
    }
  ]
};
