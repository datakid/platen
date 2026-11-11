export default {
  keywords: [
    "abstract", "case", "catch", "class", "def", "do", "else", "enum", "export", "extends", "false",
    "final", "finally", "for", "given", "if", "implicit", "import", "lazy", "match", "new", "null",
    "object", "override", "package", "private", "protected", "return", "sealed", "super", "then",
    "this", "throw", "trait", "true", "try", "type", "val", "var", "while", "with", "yield",
    "using", "extension", "inline", "opaque", "transparent", "open", "end"
  ],
  lineComment: "//",
  blockComment: ["/*", "*/"],
  strings: { quotes: ['"""', '"', "'"], prefix: /^(?:s|f|raw)$/ },
  numberRe: /(?:0[xX][0-9a-fA-F_]+[lL]?|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?[lLfFdD]?)/y,
  clusters: [
    "=>>", "?=>", "=>", "<-", "->", "<:", ">:", "::", ":::", "++", "==", "!=", "<=", ">=", "&&",
    "||", "+=", "-=", "*=", "/=", "%=", "--", "**"
  ]
};
