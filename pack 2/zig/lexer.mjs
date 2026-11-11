export default {
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
};
