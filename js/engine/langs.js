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
  },
  rust: {
    keywords: [
      "as", "async", "await", "break", "const", "continue", "crate", "dyn", "else", "enum", "extern",
      "false", "fn", "for", "if", "impl", "in", "let", "loop", "match", "mod", "move", "mut", "pub",
      "ref", "return", "self", "Self", "static", "struct", "super", "trait", "true", "type", "unsafe",
      "use", "where", "while"
    ],
    lineComment: "//",
    blockComment: ["/*", "*/"],
    lifetimes: true,
    strings: { quotes: ['"', "'"], prefix: /^(?:b|r|br)$/, rawHash: true },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|(?:\d[\d_]*(?:\.(?![.A-Za-z_])[\d_]*)?|\.\d[\d_]*)(?:[eE][+-]?\d+)?)(?:[iu](?:8|16|32|64|128|size)|f32|f64)?/y,
    clusters: [
      "<<=", ">>=", "..=", "...", "::", "->", "=>", "..", "==", "!=", "<=", ">=", "&&", "||", "+=",
      "-=", "*=", "/=", "%=", "&=", "|=", "^=", "<<", ">>"
    ]
  },
  csharp: {
    keywords: [
      "abstract", "as", "base", "bool", "break", "byte", "case", "catch", "char", "checked", "class",
      "const", "continue", "decimal", "default", "delegate", "do", "double", "else", "enum", "event",
      "explicit", "extern", "false", "finally", "fixed", "float", "for", "foreach", "goto", "if",
      "implicit", "in", "int", "interface", "internal", "is", "lock", "long", "namespace", "new",
      "null", "object", "operator", "out", "override", "params", "private", "protected", "public",
      "readonly", "ref", "return", "sbyte", "sealed", "short", "sizeof", "stackalloc", "static",
      "string", "struct", "switch", "this", "throw", "true", "try", "typeof", "uint", "ulong",
      "unchecked", "unsafe", "ushort", "using", "virtual", "void", "volatile", "while", "var",
      "record", "async", "await", "yield", "get", "set", "init", "with", "when", "and", "or", "not",
      "required", "partial", "where", "global"
    ],
    lineComment: "//",
    blockComment: ["/*", "*/"],
    strings: { quotes: ['"""', '"', "'"], prefix: /^$/ },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|(?:\d[\d_]*(?:\.(?![.A-Za-z_])[\d_]*)?|\.\d[\d_]*)(?:[eE][+-]?\d+)?)[uUlLfFdDmM]*/y,
    clusters: [
      "??=", "<<=", ">>=", "=>", "??", "?.", "::", "->", "++", "--", "==", "!=", "<=", ">=", "&&",
      "||", "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=", "<<", ">>", ".."
    ]
  },
  javascript: {
    keywords: [
      "async", "await", "break", "case", "catch", "class", "const", "continue", "debugger", "default",
      "delete", "do", "else", "export", "extends", "false", "finally", "for", "from", "function", "get",
      "if", "import", "in", "instanceof", "let", "new", "null", "of", "return", "set", "static",
      "super", "switch", "this", "throw", "true", "try", "typeof", "undefined", "var", "void",
      "while", "with", "yield"
    ],
    lineComment: "//",
    blockComment: ["/*", "*/"],
    regexLiterals: true,
    strings: { quotes: ['"', "'", "`"], prefix: /^$/, multiline: ["`"] },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|(?:\d[\d_]*(?:\.(?!\.)[\d_]*)?|\.\d[\d_]*)(?:[eE][+-]?\d+)?)n?/y,
    clusters: [
      "...", "===", "!==", "**=", ">>>", ">>=", "<<=", "??=", "||=", "&&=", "=>", "?.", "??", "**",
      "==", "!=", "<=", ">=", "&&", "||", "++", "--", "+=", "-=", "*=", "/=", "%=", "<<", ">>", "&=",
      "|=", "^="
    ]
  },
  typescript: {
    keywords: [
      "abstract", "any", "as", "asserts", "async", "await", "bigint", "boolean", "break", "case",
      "catch", "class", "const", "continue", "declare", "default", "delete", "do", "else", "enum",
      "export", "extends", "false", "finally", "for", "from", "function", "get", "if", "implements",
      "import", "in", "infer", "instanceof", "interface", "is", "keyof", "let", "module", "namespace",
      "never", "new", "null", "number", "object", "of", "override", "private", "protected", "public",
      "readonly", "return", "satisfies", "set", "static", "string", "super", "switch", "symbol",
      "this", "throw", "true", "try", "type", "typeof", "undefined", "unique", "unknown", "var",
      "void", "while", "yield"
    ],
    lineComment: "//",
    blockComment: ["/*", "*/"],
    regexLiterals: true,
    strings: { quotes: ['"', "'", "`"], prefix: /^$/, multiline: ["`"] },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|(?:\d[\d_]*(?:\.(?!\.)[\d_]*)?|\.\d[\d_]*)(?:[eE][+-]?\d+)?)n?/y,
    clusters: [
      "...", "===", "!==", "**=", ">>>", ">>=", "<<=", "??=", "||=", "&&=", "=>", "?.", "??", "**",
      "==", "!=", "<=", ">=", "&&", "||", "++", "--", "+=", "-=", "*=", "/=", "%=", "<<", ">>", "&=",
      "|=", "^="
    ]
  },
  sql: {
    ignoreCase: true,
    keywords: [
      "ADD", "ALL", "ALTER", "AND", "AS", "ASC", "AVG", "BEGIN", "BETWEEN", "BY", "CASE", "CAST",
      "CHECK", "COMMIT", "CONSTRAINT", "COUNT", "CREATE", "CROSS", "CURRENT_DATE", "DEFAULT",
      "DELETE", "DESC", "DISTINCT", "DROP", "ELSE", "END", "EXCEPT", "EXISTS", "EXPLAIN", "FALSE",
      "FILTER", "FIRST", "FOLLOWING", "FOREIGN", "FROM", "FULL", "GROUP", "HAVING", "IN", "INDEX",
      "INNER", "INSERT", "INTERSECT", "INTO", "IS", "JOIN", "KEY", "LAST", "LEFT", "LIKE", "LIMIT",
      "MAX", "MIN", "NOT", "NULL", "NULLS", "OFFSET", "ON", "OR", "ORDER", "OUTER", "OVER",
      "PARTITION", "PRECEDING", "PRIMARY", "RANGE", "RECURSIVE", "REFERENCES", "RIGHT", "ROLLBACK",
      "ROW", "ROWS", "SAVEPOINT", "SELECT", "SET", "SUM", "TABLE", "THEN", "TRUE", "UNBOUNDED",
      "UNION", "UNIQUE", "UPDATE", "VALUES", "VIEW", "WHEN", "WHERE", "WINDOW", "WITH"
    ],
    lineComment: "--",
    blockComment: ["/*", "*/"],
    strings: { quotes: ["'", '"'], prefix: /^$/, rawQuotes: ["'", '"'] },
    numberRe: /(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/y,
    clusters: ["->>", "<>", "<=", ">=", "!=", "||", "::", "->"]
  },
  bash: {
    keywords: [
      "if", "then", "else", "elif", "fi", "for", "while", "until", "do", "done", "case", "esac", "in",
      "function", "select", "time", "return", "break", "continue", "local", "export", "readonly",
      "declare", "unset", "shift", "trap", "exit", "source", "alias", "set", "eval", "exec"
    ],
    lineComment: "#",
    commentBoundary: true,
    blockComment: null,
    strings: { quotes: ['"', "'"], prefix: /^$/, rawQuotes: ["'"] },
    clusters: ["<<<", "&&", "||", ";;", "[[", "]]", "((", "))", "==", "!=", "=~", "<=", ">=", "+=", "**", "|&", ">>", "<<", "&>"]
  },
  java: {
    keywords: [
      "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class", "const",
      "continue", "default", "do", "double", "else", "enum", "extends", "final", "finally", "float",
      "for", "goto", "if", "implements", "import", "instanceof", "int", "interface", "long", "native",
      "new", "package", "private", "protected", "public", "return", "short", "static", "strictfp",
      "super", "switch", "synchronized", "this", "throw", "throws", "transient", "try", "void",
      "volatile", "while", "true", "false", "null", "var", "record", "sealed", "permits", "yield"
    ],
    lineComment: "//",
    blockComment: ["/*", "*/"],
    strings: { quotes: ['"""', '"', "'"], prefix: /^$/ },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|(?:\d[\d_]*(?:\.(?![.A-Za-z_])[\d_]*)?|\.\d[\d_]*)(?:[eE][+-]?\d+)?)[lLfFdD]?/y,
    clusters: [
      "...", ">>>", "<<=", ">>=", "->", "::", "++", "--", "==", "!=", "<=", ">=", "&&", "||", "+=",
      "-=", "*=", "/=", "%=", "<<", ">>", "&=", "|=", "^="
    ]
  },
  dart: {
    keywords: [
      "abstract", "as", "assert", "async", "await", "base", "break", "case", "catch", "class",
      "const", "continue", "covariant", "default", "deferred", "do", "dynamic", "else", "enum",
      "export", "extends", "extension", "external", "factory", "false", "final", "finally", "for",
      "Function", "get", "hide", "if", "implements", "import", "in", "interface", "is", "late",
      "library", "mixin", "new", "null", "on", "operator", "part", "required", "rethrow", "return",
      "sealed", "set", "show", "static", "super", "switch", "sync", "this", "throw", "true", "try",
      "typedef", "var", "void", "when", "while", "with", "yield"
    ],
    lineComment: "//",
    blockComment: ["/*", "*/"],
    strings: { quotes: ["'''", '"""', '"', "'"], prefix: /^r$/ },
    numberRe: /(?:0[xX][0-9a-fA-F]+|(?:\d+(?:\.(?![.A-Za-z_])\d*)?|\.\d+)(?:[eE][+-]?\d+)?)/y,
    clusters: [
      "??=", "~/=", "...?", "...", "?..", "=>", "??", "?.", "~/", "==", "!=", "<=", ">=", "&&", "||",
      "++", "--", "+=", "-=", "*=", "/=", "%=", "<<", ">>", ".."
    ]
  },
  powershell: {
    ignoreCase: true,
    keywords: [
      "begin", "break", "catch", "class", "continue", "data", "do", "dynamicparam", "else", "elseif",
      "end", "enum", "exit", "filter", "finally", "for", "foreach", "from", "function", "if", "in",
      "param", "process", "return", "switch", "throw", "trap", "try", "until", "using", "while",
      "hidden", "static"
    ],
    dashWords: [
      "eq", "ne", "gt", "ge", "lt", "le", "like", "notlike", "match", "notmatch", "contains",
      "notcontains", "in", "notin", "and", "or", "not", "xor", "is", "isnot", "as", "replace", "split",
      "join", "ceq", "cne", "ieq", "ine", "f"
    ],
    lineComment: "#",
    blockComment: ["<#", "#>"],
    strings: { quotes: ['"', "'"], prefix: /^$/, rawQuotes: ["'"], escape: "`" },
    clusters: ["::", "&&", "||", "++", "--", "+=", "-=", "*=", "/=", "%=", ".."]
  }
};
