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
  },
  html: {
    ignoreCase: true,
    keywords: [
      "html", "head", "body", "title", "meta", "link", "script", "style", "base",
      "header", "nav", "main", "footer", "section", "article", "aside", "address",
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "blockquote", "q", "cite",
      "em", "strong", "code", "kbd", "mark", "sub", "sup", "time", "span", "div", "pre",
      "a", "img", "picture", "source", "track", "audio", "video", "iframe", "figure", "figcaption",
      "ul", "ol", "li", "dl", "dt", "dd",
      "table", "caption", "colgroup", "col", "thead", "tbody", "tfoot", "tr", "th", "td",
      "form", "label", "input", "button", "select", "option", "optgroup", "datalist",
      "textarea", "fieldset", "legend", "output", "progress", "meter",
      "details", "summary", "dialog", "template", "slot", "noscript", "canvas", "svg",
      "doctype"
    ],
    lineComment: null,
    blockComment: ["<!--", "-->"],
    strings: { quotes: ['"', "'"], prefix: /^$/, rawQuotes: ['"', "'"], multiline: ['"', "'"] },
    numberRe: /\d+(?:\.\d+)?/y,
    clusters: ["</", "/>", "<!"]
  },
  css: {
    ignoreCase: true,
    keywords: [
      "@media", "@container", "@layer", "@import", "@font-face", "@keyframes", "@supports", "@property", "@scope", "@starting-style",
      "display", "position", "top", "right", "bottom", "left", "inset", "inset-inline", "inset-block", "z-index",
      "margin", "margin-inline", "margin-block", "padding", "padding-inline", "padding-block", "border", "border-radius", "outline", "box-sizing",
      "width", "height", "min-width", "max-width", "min-height", "max-height", "inline-size", "block-size", "aspect-ratio", "overflow",
      "color", "background", "background-color", "opacity", "box-shadow", "filter", "transform", "transition", "animation",
      "font", "font-family", "font-size", "font-weight", "font-style", "line-height", "letter-spacing", "text-align", "text-transform", "text-decoration", "white-space",
      "flex-direction", "flex-wrap", "flex-grow", "flex-shrink", "flex-basis", "gap", "row-gap", "column-gap", "justify-content", "align-items", "align-content", "align-self", "justify-items", "place-items", "order",
      "grid", "grid-template-columns", "grid-template-rows", "grid-template-areas", "grid-area", "grid-column", "grid-row", "grid-auto-flow", "grid-auto-columns", "grid-auto-rows",
      "container-type", "container-name", "cursor", "content", "visibility", "pointer-events", "object-fit", "will-change",
      "and", "not", "only", "from", "to", "screen", "print", "important",
      "none", "auto", "inherit", "initial", "unset", "revert", "block", "inline", "inline-block", "flex", "relative", "absolute", "fixed", "sticky", "static",
      "solid", "dashed", "dotted", "transparent", "currentcolor", "center", "start", "end", "space-between", "space-around", "space-evenly", "stretch", "wrap", "nowrap", "row", "column",
      "repeat", "minmax", "fit-content", "auto-fill", "auto-fit", "span", "calc", "clamp", "min", "max", "var", "env", "url", "rgb", "rgba", "hsl", "oklch", "oklab", "color-mix", "light-dark",
      "ease", "ease-in", "ease-out", "ease-in-out", "linear", "infinite", "forwards", "alternate", "normal", "bold", "italic", "hidden", "visible", "scroll", "pointer", "cover", "contain",
      "is", "where", "has", "nth-child", "nth-of-type", "first-child", "last-child", "hover", "focus", "focus-visible", "focus-within", "active", "disabled", "checked", "before", "after", "root", "host"
    ],
    lineComment: null,
    blockComment: ["/*", "*/"],
    strings: { quotes: ['"', "'"], prefix: /^$/ },
    numberRe: /[+-]?(?:\d+\.?\d*|\.\d+)(?:%|[a-zA-Z]+)?/y,
    clusters: ["::", "||", ">=", "<=", "~=", "|=", "^=", "$=", "*=", "!="]
  },
  dockerfile: {
    ignoreCase: true,
    keywords: [
      "FROM", "RUN", "CMD", "LABEL", "MAINTAINER", "EXPOSE", "ENV", "ADD", "COPY", "ENTRYPOINT",
      "VOLUME", "USER", "WORKDIR", "ARG", "ONBUILD", "STOPSIGNAL", "HEALTHCHECK", "SHELL",
      "AS", "NONE", "EOF", "EOT"
    ],
    lineComment: "#",
    blockComment: null,
    commentBoundary: true,
    strings: { quotes: ['"', "'"], prefix: /^$/ },
    numberRe: /\d+(?:\.\d+)*(?:[a-zA-Z]+)?/y,
    clusters: ["&&", "||", ">>", "<<", "${", "$(", "--"]
  },
  angular: {
    keywords: [
      "import", "from", "export", "class", "extends", "implements", "abstract", "interface", "type", "const", "let",
      "var", "function", "async", "await", "return", "new", "private", "protected", "public", "readonly", "static",
      "this", "true", "false", "null", "undefined", "void", "typeof", "if", "else", "for", "of", "in", "throw",
      "string", "number", "boolean", "unknown", "never", "as", "default", "get", "set",
      "Component", "Directive", "Pipe", "Injectable", "InjectionToken", "inject", "signal", "computed", "effect",
      "input", "output", "model", "resource", "selector", "template", "imports", "providers", "host"
    ],
    lineComment: "//",
    blockComment: ["/*", "*/"],
    strings: { quotes: ["`", '"', "'"], prefix: /^$/, multiline: ["`"] },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|\d[\d_]*(?:\.\d+)?)/y,
    clusters: ["...", "===", "!==", "=>", "==", "!=", "<=", ">=", "&&", "||", "??", "?.", "++", "--", "+=", "-=", "*=", "/="]
  },
  svelte: {
    keywords: [
      "if", "else", "each", "as", "await", "then", "catch", "snippet", "render", "html", "const", "key", "debug",
      "let", "var", "function", "async", "return", "import", "from", "export", "new", "for", "of", "in", "out",
      "true", "false", "null", "undefined", "typeof", "this", "break", "continue", "while", "switch", "case",
      "default", "try", "throw", "class", "script", "style", "bind", "transition", "animate", "use", "global",
      "$state", "$derived", "$effect", "$props", "$bindable", "$inspect", "$host", "by", "raw", "snapshot", "pre", "root"
    ],
    lineComment: "//",
    blockComment: ["/*", "*/"],
    strings: { quotes: ["`", '"', "'"], prefix: /^$/, multiline: ["`"] },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|\d[\d_]*(?:\.\d+)?)/y,
    clusters: ["...", "===", "!==", "=>", "==", "!=", "<=", ">=", "&&", "||", "??", "?.", "++", "--", "+=", "-=", "*=", "/=", "{#", "{:", "{/", "{@", "</", "/>"]
  },
  vue: {
    keywords: [
      "template", "script", "setup", "style", "scoped", "lang", "slot", "if", "else", "for", "in", "show", "model",
      "bind", "on", "html", "once", "deep", "const", "let", "var", "function", "async", "await", "return", "new",
      "of", "true", "false", "null", "undefined", "typeof", "throw", "this", "import", "from", "export", "default",
      "defineProps", "defineEmits", "defineModel", "ref", "reactive", "computed", "watch", "watchEffect",
      "onMounted", "onUnmounted", "provide", "inject", "nextTick", "interface", "type", "string", "number", "boolean"
    ],
    lineComment: "//",
    blockComment: ["/*", "*/"],
    strings: { quotes: ["`", '"', "'"], prefix: /^$/, multiline: ["`"] },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|\d[\d_]*(?:\.\d+)?)/y,
    clusters: ["...", "===", "!==", "=>", "==", "!=", "<=", ">=", "&&", "||", "??", "?.", "++", "--", "+=", "-=", "*=", "/=", "{{", "}}", "</", "/>"]
  },
  kotlin: {
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
  },
  swift: {
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
  },
  elixir: {
    keywords: [
      "def", "defp", "defmodule", "defmacro", "defmacrop", "defstruct", "defprotocol", "defimpl",
      "defguard", "defdelegate", "do", "end", "fn", "case", "cond", "with", "if", "else", "unless",
      "for", "when", "in", "and", "or", "not", "true", "false", "nil", "import", "require", "alias",
      "use", "receive", "after", "rescue", "try", "catch", "raise", "throw", "quote", "unquote",
      "super", "__MODULE__"
    ],
    lineComment: "#",
    blockComment: null,
    strings: { quotes: ['"""', '"', "'"], prefix: /^$/ },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)/y,
    clusters: [
      "|>", "->", "<-", "===", "!==", "==", "!=", "<=", ">=", "&&", "||", "++", "--", "<>", "..",
      "=>", "::", "\\\\", "<<", ">>", "**", "//"
    ]
  },
  haskell: {
    keywords: [
      "case", "class", "data", "default", "deriving", "do", "else", "forall", "if", "import", "in",
      "infix", "infixl", "infixr", "instance", "let", "module", "newtype", "of", "then", "type",
      "where", "qualified", "as", "hiding", "True", "False", "Nothing", "Just", "Left", "Right",
      "otherwise", "undefined"
    ],
    lineComment: "--",
    blockComment: ["{-", "-}"],
    strings: { quotes: ['"'], prefix: /^$/ },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)/y,
    clusters: [
      ">=>", "<$>", "<*>", "<|>", ">>=", "=<<", "<>", "->", "<-", "=>", "::", "..", "==", "/=", "<=",
      ">=", "&&", "||", "++", "!!", ">>", "<$", "*>", "<*", "$!", "\\\\"
    ]
  },
  julia: {
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
  },
  php: {
    keywords: [
      "abstract", "and", "array", "as", "break", "callable", "case", "catch", "class", "clone",
      "const", "continue", "declare", "default", "do", "echo", "else", "elseif", "empty", "enddeclare",
      "endfor", "endforeach", "endif", "endswitch", "endwhile", "enum", "extends", "final",
      "finally", "fn", "for", "foreach", "function", "global", "goto", "if", "implements", "include",
      "include_once", "instanceof", "insteadof", "interface", "isset", "list", "match", "namespace",
      "new", "or", "print", "private", "protected", "public", "readonly", "require", "require_once",
      "return", "static", "switch", "throw", "trait", "try", "unset", "use", "var", "while", "xor",
      "yield", "self", "parent", "null", "true", "false", "mixed", "never", "void", "int", "float",
      "string", "bool", "iterable", "object", "__DIR__", "__FILE__", "__LINE__", "__NAMESPACE__"
    ],
    lineComment: "//",
    blockComment: ["/*", "*/"],
    strings: { quotes: ['"', "'"], prefix: /^$/ },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)/y,
    clusters: [
      "<=>", "===", "!==", "??=", "...", "?->", "**=", "<<=", ">>=", "=>", "->", "::", "==", "!=",
      "<>", "<=", ">=", "&&", "||", "??", "++", "--", "+=", "-=", "*=", "/=", ".=", "%=", "**", "<<", ">>"
    ]
  },
  r: {
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
  },
  ruby: {
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
  },
  scala: {
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
  },
  zig: {
    keywords: [
      "addrspace", "align", "allowzero", "and", "anyframe", "anytype", "asm", "break", "callconv",
      "catch", "comptime", "const", "continue", "defer", "else", "enum", "errdefer", "error",
      "export", "extern", "fn", "for", "if", "inline", "linksection", "noalias", "nosuspend",
      "opaque", "or", "orelse", "packed", "pub", "resume", "return", "struct", "suspend", "switch",
      "test", "threadlocal", "try", "union", "unreachable", "var", "volatile", "while", "true",
      "false", "null", "undefined"
    ],
    lineComment: "//",
    blockComment: null,
    strings: { quotes: ['"', "'"], prefix: /^$/ },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)/y,
    clusters: [
      "...", "..", "==", "!=", "<=", ">=", "<<", ">>", "+=", "-=", "*=", "/=", "%=", "++", "**",
      "||", "=>", ".*", ".?", "+%", "-%", "*%", "+|", "-|", "*|"
    ]
  },
  perl: {
    keywords: [
      "my", "our", "local", "sub", "if", "elsif", "else", "unless", "while", "until", "for", "foreach",
      "return", "last", "next", "redo", "use", "no", "package", "require", "do", "eval", "die", "warn",
      "print", "printf", "and", "or", "not", "xor", "eq", "ne", "lt", "gt", "le", "ge", "cmp", "x",
      "defined", "undef", "ref", "bless", "scalar", "wantarray", "qw", "qq", "q", "qr", "tr", "s", "m",
      "__PACKAGE__", "BEGIN", "END"
    ],
    lineComment: "#",
    commentBoundary: true,
    blockComment: null,
    strings: { quotes: ['"', "'", "`"], prefix: /^$/ },
    numberRe: /(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)/y,
    clusters: [
      "<=>", "**=", "||=", "&&=", "//=", "...", "=>", "->", "==", "!=", "<=", ">=", "&&", "||", "//",
      "**", "..", ".=", "+=", "-=", "*=", "/=", "=~", "!~", "++", "--", "::", "<<", ">>"
    ]
  }
};
