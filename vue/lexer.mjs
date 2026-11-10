export default {
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
};
