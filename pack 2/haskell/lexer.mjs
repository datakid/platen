export default {
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
};
