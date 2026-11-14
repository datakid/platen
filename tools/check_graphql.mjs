import { createRequire } from "node:module";
import { join, resolve } from "node:path";
const dir = resolve(process.env.GRAPHQL_DIR || ".");
const { parse, validate, buildSchema } = createRequire(join(dir, "x.js"))("graphql");
const d = (await import("../data/languages/graphql.js")).default;

const reference = buildSchema(`
interface Node { id: ID! }
type Query {
  me: User
  book(id: ID!): Book
  books(first: Int = 10, after: String, genre: Genre): [Book!]!
  author(id: ID!): Author
  search(term: String!): [SearchResult!]!
  node(id: ID!): Node
}
type Mutation {
  addReview(input: AddReviewInput!): Review!
  removeBook(id: ID!): Boolean!
  updateBook(id: ID!, input: BookInput!): Book
}
type Subscription { reviewAdded(bookId: ID!): Review! }
type Book implements Node {
  id: ID!
  title: String!
  pages: Int
  price: Float!
  genre: Genre!
  author: Author!
  reviews(limit: Int = 5): [Review!]!
  tags: [String!]!
  isbn: String
}
type Author implements Node { id: ID! name: String! books: [Book!]! born: Int }
type Review implements Node { id: ID! rating: Int! body: String reviewer: User! book: Book! }
type User implements Node { id: ID! name: String! email: String! }
union SearchResult = Book | Author
enum Genre { FANTASY SCIFI HISTORY }
input AddReviewInput { bookId: ID! rating: Int! body: String }
input BookInput { title: String! pages: Int genre: Genre }
`);

const isOperation = (code) => /^\s*(\{|query\b|mutation\b|subscription\b|fragment\b)/.test(code);
let n = 0, bad = 0;
for (const t of d.topics) for (const c of t.concepts) for (const [i, e] of c.examples.entries()) {
  n++;
  const id = `${t.id}/${c.id}/${i}`;
  try {
    if (isOperation(e.code)) {
      const errors = validate(reference, parse(e.code));
      if (errors.length) throw new Error(errors[0].message);
    } else {
      const needsQuery = !/type Query|schema\s*\{/.test(e.code);
      buildSchema(e.code + (needsQuery ? "\ntype Query { stub: Int }" : ""));
    }
  } catch (err) {
    bad++;
    console.log(id, "|", String(err.message).split("\n")[0].slice(0, 150));
  }
}
console.log(`graphql: ${n} snippets, ${bad} failed`);
