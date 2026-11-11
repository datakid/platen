export default {
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
};
