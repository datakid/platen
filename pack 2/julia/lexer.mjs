export default {
  keywords: [
    "abstract", "baremodule", "begin", "break", "catch", "const", "continue", "do", "else", "elseif",
    "end", "export", "finally", "for", "function", "global", "if", "import", "in", "isa", "let",
    "local", "macro", "module", "mutable", "primitive", "quote", "return", "struct", "try", "type",
    "using", "where", "while", "true", "false", "nothing", "missing", "Inf", "NaN", "pi"
  ],
  lineComment: "#",
  blockComment: ["#=", "=#"],
  strings: { quotes: ['"""', '"', "'"], prefix: /^(?:r|raw|b|v|s)$/ },
  numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|(?:\d[\d_]*\.?[\d_]*|\.\d[\d_]*)(?:[eEf][+-]?\d+)?(?:im)?)/y,
  clusters: [
    "...", ">>>", "===", "!==", "<:", ">:", "->", "=>", "==", "!=", "<=", ">=", "&&", "||", "::",
    "|>", ".+", ".-", ".*", "./", ".^", ".=", ".>", ".<", "+=", "-=", "*=", "/=", "^=", "%=", "//", "<<", ">>"
  ]
};
