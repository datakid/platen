export default {
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
};
