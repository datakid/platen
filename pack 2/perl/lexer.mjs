export default {
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
};
