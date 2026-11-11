export default {
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
};
