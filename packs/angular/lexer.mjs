export default {
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
};
