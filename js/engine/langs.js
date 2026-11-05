export const lexers = {
  python: {
    keywords: [
      "False", "None", "True", "and", "as", "assert", "async", "await", "break", "class",
      "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global",
      "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise",
      "return", "try", "while", "with", "yield"
    ],
    softKeywords: ["match", "case", "type"],
    lineComment: "#",
    blockComment: null,
    strings: { quotes: ['"""', "'''", '"', "'"], prefix: /^[rRbBfFuU]{1,2}$/ },
    clusters: [
      "**=", "//=", ">>=", "<<=", "...", "->", "**", "//", "==", "!=", "<=", ">=", "+=", "-=",
      "*=", "/=", "%=", ":=", "<<", ">>", "&=", "|=", "^="
    ]
  },
  c: {
    keywords: [
      "auto", "break", "case", "char", "const", "continue", "default", "do", "double", "else",
      "enum", "extern", "float", "for", "goto", "if", "inline", "int", "long", "register",
      "restrict", "return", "short", "signed", "sizeof", "static", "struct", "switch", "typedef",
      "union", "unsigned", "void", "volatile", "while", "_Bool", "_Alignas", "_Alignof", "_Atomic",
      "_Generic", "_Noreturn", "_Static_assert", "_Thread_local"
    ],
    directives: true,
    lineComment: "//",
    blockComment: ["/*", "*/"],
    strings: { quotes: ['"', "'"], prefix: /^(?:L|u|U|u8)$/ },
    numberRe: /(?:0[xX][0-9a-fA-F]+|0[bB][01]+|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)[uUlLfF]*/y,
    clusters: [
      "<<=", ">>=", "...", "->", "++", "--", "<<", ">>", "<=", ">=", "==", "!=", "&&", "||",
      "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^="
    ]
  },
  cpp: {
    keywords: [
      "alignas", "alignof", "asm", "auto", "bool", "break", "case", "catch", "char", "char8_t",
      "char16_t", "char32_t", "class", "concept", "const", "consteval", "constexpr", "constinit",
      "const_cast", "continue", "co_await", "co_return", "co_yield", "decltype", "default", "delete",
      "do", "double", "dynamic_cast", "else", "enum", "explicit", "export", "extern", "false",
      "final", "float", "for", "friend", "goto", "if", "inline", "int", "long", "mutable",
      "namespace", "new", "noexcept", "nullptr", "operator", "override", "private", "protected",
      "public", "register", "reinterpret_cast", "requires", "return", "short", "signed", "sizeof",
      "static", "static_assert", "static_cast", "struct", "switch", "template", "this",
      "thread_local", "throw", "true", "try", "typedef", "typeid", "typename", "union", "unsigned",
      "using", "virtual", "void", "volatile", "wchar_t", "while"
    ],
    directives: true,
    lineComment: "//",
    blockComment: ["/*", "*/"],
    strings: { quotes: ['"', "'"], prefix: /^(?:L|u|U|u8)$/ },
    numberRe: /(?:0[xX][0-9a-fA-F]+(?:'[0-9a-fA-F]+)*|0[bB][01]+(?:'[01]+)*|(?:\d+(?:'\d+)*\.?\d*(?:'\d+)*|\.\d+)(?:[eE][+-]?\d+)?)[uUlLfFzZ]*/y,
    clusters: [
      "<=>", "<<=", ">>=", "...", "::", "->", "++", "--", "<<", ">>", "<=", ">=", "==", "!=", "&&",
      "||", "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^="
    ]
  },
  lua: {
    keywords: [
      "and", "break", "do", "else", "elseif", "end", "false", "for", "function", "goto", "if", "in",
      "local", "nil", "not", "or", "repeat", "return", "then", "true", "until", "while"
    ],
    lineComment: "--",
    blockComment: ["--[[", "]]"],
    strings: { quotes: ['"', "'"], prefix: /^$/ },
    numberRe: /(?:0[xX][0-9a-fA-F]+|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/y,
    clusters: ["...", "..", "==", "~=", "<=", ">=", "//", "<<", ">>", "::"]
  },
  go: {
    keywords: [
      "break", "case", "chan", "const", "continue", "default", "defer", "else", "fallthrough", "for",
      "func", "go", "goto", "if", "import", "interface", "map", "package", "range", "return",
      "select", "struct", "switch", "type", "var"
    ],
    lineComment: "//",
    blockComment: ["/*", "*/"],
    strings: { quotes: ['"', "'", "`"], prefix: /^$/, rawQuotes: ["`"] },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|(?:\d[\d_]*\.?[\d_]*|\.\d[\d_]*)(?:[eE][+-]?\d+)?)i?/y,
    clusters: [
      "<<=", ">>=", "&^=", "...", ":=", "<-", "&&", "||", "==", "!=", "<=", ">=", "++", "--", "+=",
      "-=", "*=", "/=", "%=", "&=", "|=", "^=", "<<", ">>", "&^"
    ]
  }
};
