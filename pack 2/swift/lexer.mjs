export default {
  keywords: [
    "import", "class", "struct", "enum", "protocol", "extension", "actor", "func", "var", "let",
    "init", "deinit", "subscript", "typealias", "associatedtype", "operator", "if", "else", "guard",
    "switch", "case", "default", "for", "while", "repeat", "in", "where", "do", "catch", "throw",
    "throws", "rethrows", "try", "return", "break", "continue", "fallthrough", "defer", "as", "is",
    "self", "Self", "super", "nil", "true", "false", "static", "final", "override", "mutating",
    "nonmutating", "lazy", "weak", "unowned", "private", "fileprivate", "internal", "public", "open",
    "inout", "async", "await", "some", "any", "convenience", "required", "indirect", "isolated",
    "nonisolated", "willSet", "didSet", "get", "set"
  ],
  lineComment: "//",
  blockComment: ["/*", "*/"],
  strings: { quotes: ['"""', '"'], prefix: /^$/ },
  numberRe: /(?:0[xX][0-9a-fA-F_]+(?:\.[0-9a-fA-F_]+)?(?:[pP][+-]?\d+)?|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)/y,
  clusters: [
    "...", "..<", "===", "!==", "?.", "??", "->", "==", "!=", "<=", ">=", "&&", "||", "+=", "-=",
    "*=", "/=", "%=", "<<", ">>", "&+", "&-", "&*"
  ]
};
