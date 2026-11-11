export default {
  keywords: [
    "package", "import", "class", "interface", "object", "fun", "val", "var", "typealias",
    "if", "else", "when", "for", "while", "do", "return", "break", "continue", "in", "is", "as",
    "try", "catch", "finally", "throw", "this", "super", "null", "true", "false",
    "by", "init", "constructor", "companion", "data", "sealed", "enum", "annotation", "value",
    "open", "override", "abstract", "final", "private", "protected", "public", "internal",
    "inner", "lateinit", "const", "suspend", "inline", "noinline", "crossinline", "reified",
    "out", "where", "get", "set", "vararg", "operator", "infix", "tailrec", "external",
    "expect", "actual", "field", "it"
  ],
  lineComment: "//",
  blockComment: ["/*", "*/"],
  strings: { quotes: ['"""', '"', "'"], prefix: /^$/ },
  numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)(?:[uU]?[lL]|[fF]|[uU])?/y,
  clusters: [
    "?.", "?:", "!!", "->", "::", "..<", "..", "===", "!==", "==", "!=", "<=", ">=", "&&", "||",
    "++", "--", "+=", "-=", "*=", "/=", "%="
  ]
};
