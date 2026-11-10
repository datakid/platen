export default {
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
};
