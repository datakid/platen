export default {
  keywords: [
    "alias", "and", "begin", "BEGIN", "break", "case", "class", "def", "defined?", "do", "else",
    "elsif", "end", "END", "ensure", "false", "for", "if", "in", "module", "next", "nil", "not",
    "or", "redo", "rescue", "retry", "return", "self", "super", "then", "true", "undef", "unless",
    "until", "when", "while", "yield", "__method__", "attr_reader", "attr_writer", "attr_accessor",
    "include", "extend", "prepend", "private", "protected", "public", "require", "raise", "lambda",
    "proc", "puts", "p", "print", "loop"
  ],
  lineComment: "#",
  blockComment: null,
  strings: { quotes: ['"', "'"], prefix: /^$/ },
  numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO]?[0-7_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)[ri]?/y,
  clusters: [
    "<=>", "===", "**=", "<<=", ">>=", "&&=", "||=", "&.", "...", "..", "=>", "->", "::", "==", "!=",
    "<=", ">=", "&&", "||", "=~", "!~", "**", "<<", ">>", "+=", "-=", "*=", "/=", "%=", "|=", "&="
  ]
};
