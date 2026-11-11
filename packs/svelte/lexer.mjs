export default {
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
};
