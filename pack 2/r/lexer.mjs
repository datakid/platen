export default {
  keywords: [
    "if", "else", "repeat", "while", "function", "for", "in", "next", "break", "return",
    "TRUE", "FALSE", "NULL", "Inf", "NaN", "NA", "NA_integer_", "NA_real_", "NA_character_",
    "T", "F", "library", "require", "stop", "warning", "UseMethod", "NextMethod"
  ],
  lineComment: "#",
  blockComment: null,
  strings: { quotes: ['"', "'", "`"], prefix: /^$/ },
  numberRe: /(?:0[xX][0-9a-fA-F]+L?|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?[Li]?)/y,
  clusters: [
    "<<-", "->>", "<-", "->", "|>", "%in%", "%o%", "%*%", "%/%", "%%", ":::", "::", "==", "!=",
    "<=", ">=", "&&", "||"
  ]
};
