export default {
  id: "graphql",
  name: "GraphQL",
  short: "GQ",
  pigment: "graphql",
  family: null,
  version: "2025",
  lexer: "graphql",
  indent: 2,
  topics: [
    {
      id: "queries-fields",
      n: 1,
      title: "queries and fields",
      concepts: [
        {
          id: "shorthand-query", n: 1, title: "shorthand query", level: 1,
          gloss: "Reads data by listing the fields you want inside braces.",
          examples: [
            { code: `{
  books {
    title
  }
}`, notes: [{ at: "books", text: "a field on the root query" }, { at: "title", text: "a scalar field" }] },
            { code: `{
  me {
    id
    name
    email
  }
}`, notes: [] },
            { code: `{
  author(id: "a1") {
    name
    born
  }
}`, notes: [] }
          ]
        },
        {
          id: "nested-selections", n: 2, title: "nested selections", level: 1,
          gloss: "Follows a relationship by nesting a selection under an object field.",
          examples: [
            { code: `{
  book(id: "b1") {
    title
    author {
      name
    }
  }
}`, notes: [{ at: "author {", text: "selects inside the relation" }] },
            { code: `{
  author(id: "a1") {
    name
    books {
      title
      pages
    }
  }
}`, notes: [] },
            { code: `{
  me {
    name
  }
  books(first: 3) {
    title
    reviews {
      rating
    }
  }
}`, notes: [] }
          ]
        },
        {
          id: "named-query", n: 3, title: "named operations", level: 1,
          gloss: "Names an operation with the query keyword so tools can identify it.",
          examples: [
            { code: `query BookTitles {
  books {
    title
  }
}`, notes: [{ at: "query", text: "operation type" }, { at: "BookTitles", text: "the operation name" }] },
            { code: `query CurrentUser {
  me {
    id
    name
  }
}`, notes: [] },
            { code: `query ShelfSummary {
  books(first: 20) {
    title
    genre
  }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "arguments-aliases",
      n: 2,
      title: "arguments and aliases",
      concepts: [
        {
          id: "field-arguments", n: 1, title: "field arguments", level: 1,
          gloss: "Passes arguments in parentheses to select or filter data.",
          examples: [
            { code: `{
  book(id: "b1") {
    title
  }
}`, notes: [{ at: "id: \"b1\"", text: "a named argument" }] },
            { code: `{
  books(first: 5, genre: FANTASY) {
    title
  }
}`, notes: [] },
            { code: `{
  search(term: "tolkien") {
    __typename
  }
}`, notes: [] }
          ]
        },
        {
          id: "argument-values", n: 2, title: "argument values", level: 1,
          gloss: "Writes strings, numbers, enums, booleans and null as literal values.",
          examples: [
            { code: `{
  books(first: 10, after: "cursor-9") {
    title
  }
}`, notes: [{ at: "\"cursor-9\"", text: "a string literal" }] },
            { code: `{
  books(first: 3, genre: HISTORY) {
    title
  }
}`, notes: [{ at: "HISTORY", text: "an enum value, no quotes" }] },
            { code: `{
  books(first: 3, after: null) {
    id
  }
}`, notes: [{ at: "null", text: "an explicit empty value" }] }
          ]
        },
        {
          id: "aliases", n: 3, title: "aliases", level: 2,
          gloss: "Renames a result field so one request can fetch the same field twice.",
          examples: [
            { code: `{
  dune: book(id: "b1") {
    title
  }
  emma: book(id: "b2") {
    title
  }
}`, notes: [{ at: "dune:", text: "the key in the response" }] },
            { code: `{
  newest: books(first: 1) {
    title
  }
  fantasy: books(first: 5, genre: FANTASY) {
    title
  }
}`, notes: [] },
            { code: `{
  writer: author(id: "a1") {
    fullName: name
  }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "variables-operations",
      n: 3,
      title: "variables and operations",
      concepts: [
        {
          id: "variables", n: 1, title: "variables", level: 1,
          gloss: "Declares typed variables on an operation and passes them as arguments.",
          examples: [
            { code: `query BookById($id: ID!) {
  book(id: $id) {
    title
  }
}`, notes: [{ at: "$id: ID!", text: "a required variable" }, { at: "$id)", text: "used inside the operation" }] },
            { code: `query Search($term: String!) {
  search(term: $term) {
    __typename
  }
}`, notes: [] },
            { code: `query Page($first: Int, $after: String) {
  books(first: $first, after: $after) {
    id
    title
  }
}`, notes: [] }
          ]
        },
        {
          id: "default-values", n: 2, title: "default values", level: 2,
          gloss: "Gives a variable a default so callers may leave it out.",
          examples: [
            { code: `query Shelf($first: Int = 10) {
  books(first: $first) {
    title
  }
}`, notes: [{ at: "= 10", text: "the default value" }] },
            { code: `query ByGenre($genre: Genre = FANTASY) {
  books(genre: $genre) {
    title
  }
}`, notes: [] },
            { code: `query Reviews($id: ID!, $limit: Int = 3) {
  book(id: $id) {
    reviews(limit: $limit) {
      rating
    }
  }
}`, notes: [] }
          ]
        },
        {
          id: "multiple-operations", n: 3, title: "multiple operations", level: 2,
          gloss: "Holds several named operations in one document and runs one by name.",
          examples: [
            { code: `query Titles {
  books {
    title
  }
}

query Authors {
  author(id: "a1") {
    name
  }
}`, notes: [{ at: "Authors", text: "chosen by name at run time" }] },
            { code: `query Me {
  me {
    name
  }
}

mutation Remove($id: ID!) {
  removeBook(id: $id)
}`, notes: [] },
            { code: `query First {
  books(first: 1) {
    id
  }
}

query Second {
  books(first: 2) {
    id
  }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "fragments",
      n: 4,
      title: "fragments",
      concepts: [
        {
          id: "named-fragments", n: 1, title: "named fragments", level: 2,
          gloss: "Reuses a selection by naming it with the fragment keyword.",
          examples: [
            { code: `query {
  book(id: "b1") {
    ...BookCard
  }
}

fragment BookCard on Book {
  id
  title
  pages
}`, notes: [{ at: "...BookCard", text: "spreads the fragment" }, { at: "on Book", text: "the type condition" }] },
            { code: `query {
  me {
    ...UserFields
  }
}

fragment UserFields on User {
  id
  name
  email
}`, notes: [] },
            { code: `query {
  books(first: 5) {
    ...Row
  }
}

fragment Row on Book {
  title
  genre
}`, notes: [] }
          ]
        },
        {
          id: "inline-fragments", n: 2, title: "inline fragments", level: 3,
          gloss: "Selects fields that exist only on one member of a union or interface.",
          examples: [
            { code: `{
  search(term: "dune") {
    ... on Book {
      title
    }
    ... on Author {
      name
    }
  }
}`, notes: [{ at: "... on Book", text: "only for books" }] },
            { code: `{
  node(id: "b1") {
    id
    ... on Review {
      rating
    }
  }
}`, notes: [] },
            { code: `{
  search(term: "herbert") {
    ... on Author {
      name
      books {
        title
      }
    }
  }
}`, notes: [] }
          ]
        },
        {
          id: "typename", n: 3, title: "typename", level: 2,
          gloss: "Asks for the concrete type name of each object with __typename.",
          examples: [
            { code: `{
  search(term: "dune") {
    __typename
    ... on Book {
      title
    }
  }
}`, notes: [{ at: "__typename", text: "the object type as a string" }] },
            { code: `{
  node(id: "a1") {
    __typename
    id
  }
}`, notes: [] },
            { code: `{
  me {
    __typename
    name
  }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "query-directives",
      n: 5,
      title: "query directives",
      concepts: [
        {
          id: "include-directive", n: 1, title: "include", level: 2,
          gloss: "Includes a field only when a boolean variable is true.",
          examples: [
            { code: `query Book($id: ID!, $withAuthor: Boolean!) {
  book(id: $id) {
    title
    author @include(if: $withAuthor) {
      name
    }
  }
}`, notes: [{ at: "@include", text: "keeps the field when true" }] },
            { code: `query Me($withEmail: Boolean = false) {
  me {
    name
    email @include(if: $withEmail)
  }
}`, notes: [] },
            { code: `query Shelf($detailed: Boolean!) {
  books {
    title
    pages @include(if: $detailed)
  }
}`, notes: [] }
          ]
        },
        {
          id: "skip-directive", n: 2, title: "skip", level: 2,
          gloss: "Leaves a field out when a boolean variable is true.",
          examples: [
            { code: `query Me($hideEmail: Boolean!) {
  me {
    name
    email @skip(if: $hideEmail)
  }
}`, notes: [{ at: "@skip", text: "drops the field when true" }] },
            { code: `query Book($id: ID!, $compact: Boolean!) {
  book(id: $id) {
    title
    reviews @skip(if: $compact) {
      rating
    }
  }
}`, notes: [] },
            { code: `query Authors($brief: Boolean!) {
  author(id: "a1") {
    name
    born @skip(if: $brief)
  }
}`, notes: [] }
          ]
        },
        {
          id: "directives-on-fragments", n: 3, title: "directives on fragments", level: 3,
          gloss: "Applies include or skip to a whole fragment spread or inline fragment.",
          examples: [
            { code: `query Book($id: ID!, $full: Boolean!) {
  book(id: $id) {
    title
    ...Details @include(if: $full)
  }
}

fragment Details on Book {
  pages
  isbn
}`, notes: [{ at: "...Details @include", text: "the whole spread is optional" }] },
            { code: `query Search($term: String!, $books: Boolean!) {
  search(term: $term) {
    ... on Book @include(if: $books) {
      title
    }
  }
}`, notes: [] },
            { code: `query Me($lite: Boolean!) {
  me {
    ...Contact @skip(if: $lite)
  }
}

fragment Contact on User {
  email
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "object-types",
      n: 6,
      title: "object types",
      concepts: [
        {
          id: "type-definition", n: 1, title: "type definition", level: 1,
          gloss: "Declares an object type and its fields in the schema language.",
          examples: [
            { code: `type Book {
  id: ID!
  title: String!
  pages: Int
}`, notes: [{ at: "type", text: "declares an object type" }, { at: "title: String!", text: "field name and type" }] },
            { code: `type Author {
  id: ID!
  name: String!
  born: Int
}`, notes: [] },
            { code: `type Warehouse {
  code: ID!
  city: String!
  capacity: Int!
}`, notes: [] }
          ]
        },
        {
          id: "built-in-scalars", n: 2, title: "built in scalars", level: 1,
          gloss: "Uses Int, Float, String, Boolean and ID as the leaf value types.",
          examples: [
            { code: `type Product {
  sku: ID!
  name: String!
  price: Float!
  stock: Int!
  active: Boolean!
}`, notes: [{ at: "Float", text: "a decimal number" }, { at: "ID", text: "a unique identifier" }] },
            { code: `type Reading {
  sensor: ID!
  celsius: Float!
  ok: Boolean!
}`, notes: [] },
            { code: `type Invoice {
  number: Int!
  customer: String!
  paid: Boolean!
}`, notes: [] }
          ]
        },
        {
          id: "custom-scalars", n: 3, title: "custom scalars", level: 2,
          gloss: "Declares a scalar for values such as dates that need their own parsing.",
          examples: [
            { code: `scalar DateTime

type Event {
  id: ID!
  startsAt: DateTime!
}`, notes: [{ at: "scalar", text: "a custom leaf type" }] },
            { code: `scalar URL

type Link {
  id: ID!
  target: URL!
}`, notes: [] },
            { code: `scalar JSON

type Setting {
  key: String!
  value: JSON
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "lists-non-null",
      n: 7,
      title: "lists and non-null",
      concepts: [
        {
          id: "non-null", n: 1, title: "non null", level: 1,
          gloss: "Marks a field as always present with an exclamation mark.",
          examples: [
            { code: `type User {
  id: ID!
  email: String!
  nickname: String
}`, notes: [{ at: "String!", text: "never null" }, { at: "nickname: String", text: "may be null" }] },
            { code: `type Order {
  id: ID!
  total: Float!
  note: String
}`, notes: [] },
            { code: `type Account {
  iban: String!
  closedAt: String
}`, notes: [] }
          ]
        },
        {
          id: "lists", n: 2, title: "lists", level: 1,
          gloss: "Declares a list of values with square brackets.",
          examples: [
            { code: `type Author {
  name: String!
  books: [String]
}`, notes: [{ at: "[String]", text: "a list of strings" }] },
            { code: `type Playlist {
  id: ID!
  tracks: [ID]
}`, notes: [] },
            { code: `type Matrix {
  rows: [[Int]]
}`, notes: [{ at: "[[Int]]", text: "a list of lists" }] }
          ]
        },
        {
          id: "null-combinations", n: 3, title: "list and null combinations", level: 2,
          gloss: "Controls nulls separately for the list and for its items.",
          examples: [
            { code: `type Shelf {
  titles: [String!]!
}`, notes: [{ at: "[String!]!", text: "no nulls anywhere" }] },
            { code: `type Search {
  hits: [String!]
}`, notes: [{ at: "[String!]", text: "the list itself may be null" }] },
            { code: `type Table {
  cells: [String]!
}`, notes: [{ at: "[String]!", text: "items may be null" }] }
          ]
        }
      ]
    },
    {
      id: "enums",
      n: 8,
      title: "enums",
      concepts: [
        {
          id: "enum-definition", n: 1, title: "enum types", level: 1,
          gloss: "Declares a fixed set of allowed values.",
          examples: [
            { code: `enum Genre {
  FANTASY
  SCIFI
  HISTORY
}`, notes: [{ at: "enum", text: "a closed set of values" }] },
            { code: `enum Role {
  ADMIN
  EDITOR
  VIEWER
}`, notes: [] },
            { code: `enum OrderStatus {
  PENDING
  SHIPPED
  DELIVERED
  CANCELLED
}`, notes: [] }
          ]
        },
        {
          id: "enum-usage", n: 2, title: "using enums", level: 1,
          gloss: "Uses an enum as a field type or an argument type with a default.",
          examples: [
            { code: `enum Genre {
  FANTASY
  SCIFI
}

type Book {
  genre: Genre!
}`, notes: [{ at: "genre: Genre!", text: "a field of enum type" }] },
            { code: `enum SortOrder {
  ASC
  DESC
}

type Query {
  names(order: SortOrder = ASC): [String!]!
}`, notes: [{ at: "= ASC", text: "default enum argument" }] },
            { code: `enum Level {
  INFO
  ERROR
}

type Entry {
  level: Level!
  text: String!
}`, notes: [] }
          ]
        },
        {
          id: "deprecated-values", n: 3, title: "deprecated values", level: 2,
          gloss: "Retires an enum value with the deprecated directive and a reason.",
          examples: [
            { code: `enum Status {
  ACTIVE
  DISABLED
  INACTIVE @deprecated(reason: "Use DISABLED.")
}`, notes: [{ at: "@deprecated", text: "hides it from new clients" }] },
            { code: `enum Plan {
  FREE
  PRO
  LEGACY @deprecated(reason: "Moved to PRO.")
}`, notes: [] },
            { code: `enum Color {
  RED
  GREEN
  GREY @deprecated(reason: "Use GREEN.")
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "interfaces-unions",
      n: 9,
      title: "interfaces and unions",
      concepts: [
        {
          id: "interfaces", n: 1, title: "interfaces", level: 2,
          gloss: "Declares fields that every implementing type must provide.",
          examples: [
            { code: `interface Node {
  id: ID!
}`, notes: [{ at: "interface", text: "a shared contract" }] },
            { code: `interface Timestamped {
  createdAt: String!
  updatedAt: String!
}`, notes: [] },
            { code: `interface Named {
  name: String!
}`, notes: [] }
          ]
        },
        {
          id: "implementing", n: 2, title: "implementing interfaces", level: 2,
          gloss: "Declares that a type implements one or more interfaces.",
          examples: [
            { code: `interface Node {
  id: ID!
}

type Book implements Node {
  id: ID!
  title: String!
}`, notes: [{ at: "implements Node", text: "must repeat the fields" }] },
            { code: `interface Named {
  name: String!
}
interface Aged {
  age: Int!
}

type Person implements Named & Aged {
  name: String!
  age: Int!
}`, notes: [{ at: "Named & Aged", text: "several interfaces" }] },
            { code: `interface Shape {
  area: Float!
}

type Circle implements Shape {
  area: Float!
  radius: Float!
}`, notes: [] }
          ]
        },
        {
          id: "unions", n: 3, title: "unions", level: 2,
          gloss: "Combines object types that share no fields into one result type.",
          examples: [
            { code: `type Book {
  title: String!
}
type Author {
  name: String!
}

union SearchResult = Book | Author`, notes: [{ at: "union", text: "one of several types" }] },
            { code: `type Photo {
  url: String!
}
type Video {
  url: String!
}

union Media = Photo | Video`, notes: [] },
            { code: `type Cat {
  lives: Int!
}
type Dog {
  barks: Boolean!
}

union Pet = Cat | Dog`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "input-types",
      n: 10,
      title: "input types",
      concepts: [
        {
          id: "input-objects", n: 1, title: "input objects", level: 2,
          gloss: "Declares a structured argument type with the input keyword.",
          examples: [
            { code: `input BookInput {
  title: String!
  pages: Int
}`, notes: [{ at: "input", text: "usable as an argument type" }] },
            { code: `input AddressInput {
  street: String!
  city: String!
  zip: String
}`, notes: [] },
            { code: `input ReviewInput {
  rating: Int!
  body: String
}`, notes: [] }
          ]
        },
        {
          id: "input-defaults", n: 2, title: "input defaults", level: 2,
          gloss: "Gives input fields default values so clients may omit them.",
          examples: [
            { code: `input SearchInput {
  term: String!
  limit: Int = 20
  offset: Int = 0
}`, notes: [{ at: "= 20", text: "default for a missing field" }] },
            { code: `input FilterInput {
  inStock: Boolean = true
  minPrice: Float = 0.0
}`, notes: [] },
            { code: `input PageInput {
  first: Int = 10
  after: String
}`, notes: [] }
          ]
        },
        {
          id: "nested-inputs", n: 3, title: "nested inputs", level: 3,
          gloss: "Nests input objects and lists inside a larger input.",
          examples: [
            { code: `input LineInput {
  sku: ID!
  quantity: Int!
}

input OrderInput {
  lines: [LineInput!]!
}`, notes: [{ at: "[LineInput!]!", text: "a list of inputs" }] },
            { code: `input GeoInput {
  lat: Float!
  lng: Float!
}

input PlaceInput {
  name: String!
  at: GeoInput
}`, notes: [] },
            { code: `input TagInput {
  name: String!
}

input PostInput {
  title: String!
  tags: [TagInput!]
}`, notes: [] }
          ]
        },
        {
          id: "one-of-inputs", n: 4, title: "one of inputs", level: 3,
          gloss: "Requires exactly one field of an input object to be set with the oneOf directive.",
          examples: [
            { code: `input UserBy @oneOf {
  id: ID
  email: String
}`, notes: [{ at: "@oneOf", text: "exactly one field is set" }, { at: "id: ID", text: "fields must be nullable" }] },
            { code: `input BookLookup @oneOf {
  isbn: String
  title: String
}`, notes: [] },
            { code: `input Pick @oneOf {
  sku: ID
  slug: String
  barcode: String
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "mutations",
      n: 11,
      title: "mutations",
      concepts: [
        {
          id: "mutation-operation", n: 1, title: "mutation operations", level: 1,
          gloss: "Changes data with a mutation operation and reads the result.",
          examples: [
            { code: `mutation AddReview($input: AddReviewInput!) {
  addReview(input: $input) {
    id
    rating
  }
}`, notes: [{ at: "mutation", text: "operation type" }, { at: "$input", text: "an input object variable" }] },
            { code: `mutation RemoveBook($id: ID!) {
  removeBook(id: $id)
}`, notes: [] },
            { code: `mutation Retitle($id: ID!, $input: BookInput!) {
  updateBook(id: $id, input: $input) {
    id
    title
  }
}`, notes: [] }
          ]
        },
        {
          id: "returned-selection", n: 2, title: "returned selection", level: 2,
          gloss: "Selects fields of the changed object to refresh the client.",
          examples: [
            { code: `mutation AddReview($input: AddReviewInput!) {
  addReview(input: $input) {
    id
    book {
      title
    }
    reviewer {
      name
    }
  }
}`, notes: [{ at: "book {", text: "nested selection on the result" }] },
            { code: `mutation Fix($id: ID!, $input: BookInput!) {
  updateBook(id: $id, input: $input) {
    title
    pages
    genre
  }
}`, notes: [] },
            { code: `mutation Rate($input: AddReviewInput!) {
  addReview(input: $input) {
    ...Rating
  }
}

fragment Rating on Review {
  id
  rating
}`, notes: [] }
          ]
        },
        {
          id: "mutation-schema", n: 3, title: "defining mutations", level: 2,
          gloss: "Declares mutation fields on a Mutation type with input arguments.",
          examples: [
            { code: `type Mutation {
  addBook(input: BookInput!): Book!
  removeBook(id: ID!): Boolean!
}
input BookInput {
  title: String!
}

type Book {
  id: ID!
  title: String!
}`, notes: [{ at: "type Mutation", text: "root type for writes" }] },
            { code: `type Mutation {
  rename(id: ID!, name: String!): User
}

type User {
  id: ID!
  name: String!
}`, notes: [] },
            { code: `type Mutation {
  signOut: Boolean!
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "subscriptions",
      n: 12,
      title: "subscriptions",
      concepts: [
        {
          id: "subscription-operation", n: 1, title: "subscription operations", level: 2,
          gloss: "Opens a stream of results with a subscription operation.",
          examples: [
            { code: `subscription ReviewFeed($bookId: ID!) {
  reviewAdded(bookId: $bookId) {
    id
    rating
  }
}`, notes: [{ at: "subscription", text: "long lived operation" }] },
            { code: `subscription NewReviews {
  reviewAdded(bookId: "b1") {
    body
  }
}`, notes: [] },
            { code: `subscription Ratings($bookId: ID!) {
  reviewAdded(bookId: $bookId) {
    rating
    reviewer {
      name
    }
  }
}`, notes: [] }
          ]
        },
        {
          id: "subscription-fragments", n: 2, title: "subscription selections", level: 2,
          gloss: "Selects nested fields and fragments from each event as it arrives.",
          examples: [
            { code: `subscription Feed($bookId: ID!) {
  reviewAdded(bookId: $bookId) {
    ...ReviewLine
  }
}

fragment ReviewLine on Review {
  id
  rating
  body
}`, notes: [{ at: "...ReviewLine", text: "reused for every event" }] },
            { code: `subscription Titles($bookId: ID!) {
  reviewAdded(bookId: $bookId) {
    book {
      title
    }
  }
}`, notes: [] },
            { code: `subscription Names($bookId: ID!) {
  reviewAdded(bookId: $bookId) {
    reviewer {
      id
      name
    }
  }
}`, notes: [] }
          ]
        },
        {
          id: "subscription-schema", n: 3, title: "defining subscriptions", level: 3,
          gloss: "Declares event fields on a Subscription root type.",
          examples: [
            { code: `type Subscription {
  reviewAdded(bookId: ID!): Review!
}

type Review {
  id: ID!
  rating: Int!
}`, notes: [{ at: "type Subscription", text: "root type for streams" }] },
            { code: `type Subscription {
  tick: Int!
}`, notes: [] },
            { code: `type Subscription {
  orderUpdated(id: ID!): Order!
}

type Order {
  id: ID!
  status: String!
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "schema-features",
      n: 13,
      title: "schema features",
      concepts: [
        {
          id: "descriptions", n: 1, title: "descriptions", level: 2,
          gloss: "Documents types and fields with quoted strings that tools display.",
          examples: [
            { code: `"""
A book in the catalog.
"""
type Book {
  "Unique identifier."
  id: ID!
  title: String!
}`, notes: [{ at: "\"\"\"", text: "block description" }, { at: "\"Unique identifier.\"", text: "single line description" }] },
            { code: `"A person who writes books."
type Author {
  name: String!
}`, notes: [] },
            { code: `enum Genre {
  "Stories set in invented worlds."
  FANTASY
  HISTORY
}`, notes: [] }
          ]
        },
        {
          id: "deprecated-fields", n: 2, title: "deprecated fields", level: 2,
          gloss: "Marks a field as retired while keeping old clients working.",
          examples: [
            { code: `type Book {
  title: String!
  name: String @deprecated(reason: "Use title.")
}`, notes: [{ at: "reason:", text: "tells clients what to use" }] },
            { code: `type Query {
  books(
    first: Int
    limit: Int @deprecated(reason: "Use first.")
  ): [String!]!
}`, notes: [] },
            { code: `type User {
  email: String!
  mail: String @deprecated
}`, notes: [] }
          ]
        },
        {
          id: "extend-types", n: 3, title: "extending types", level: 3,
          gloss: "Adds fields to an existing type from another file with extend.",
          examples: [
            { code: `type Book {
  id: ID!
}

extend type Book {
  isbn: String
}`, notes: [{ at: "extend type", text: "adds fields later" }] },
            { code: `type Query {
  ping: Boolean!
}

extend type Query {
  version: String!
}`, notes: [] },
            { code: `enum Role {
  ADMIN
}

extend enum Role {
  EDITOR
}`, notes: [] }
          ]
        },
        {
          id: "custom-directives", n: 4, title: "custom directives", level: 3,
          gloss: "Declares a directive with its arguments and allowed locations.",
          examples: [
            { code: `directive @auth(role: String = "user") on FIELD_DEFINITION`, notes: [{ at: "directive @auth", text: "defines a directive" }, { at: "FIELD_DEFINITION", text: "where it may appear" }] },
            { code: `directive @cacheControl(maxAge: Int!) on OBJECT | FIELD_DEFINITION

type Book @cacheControl(maxAge: 60) {
  title: String!
}`, notes: [] },
            { code: `directive @example(note: String) repeatable on OBJECT

type Item @example(note: "a") @example(note: "b") {
  id: ID!
}`, notes: [{ at: "repeatable", text: "may be used more than once" }] }
          ]
        },
        {
          id: "schema-definition", n: 5, title: "schema definition", level: 3,
          gloss: "Names the root operation types when they differ from the defaults.",
          examples: [
            { code: `schema {
  query: RootQuery
  mutation: RootMutation
}

type RootQuery {
  ping: Boolean!
}
type RootMutation {
  reset: Boolean!
}`, notes: [{ at: "schema {", text: "maps operations to types" }] },
            { code: `schema {
  query: Query
}

type Query {
  ok: Boolean!
}`, notes: [] },
            { code: `schema {
  query: Root
  subscription: Live
}

type Root {
  id: ID!
}
type Live {
  tick: Int!
}`, notes: [] }
          ]
        }
      ]
    }
  ]
};
