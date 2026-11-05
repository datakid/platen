export function createInput(host, h) {
  const ta = document.createElement("textarea");
  ta.className = "sink";
  ta.setAttribute("aria-label", "typing input");
  ta.setAttribute("autocomplete", "off");
  ta.setAttribute("autocapitalize", "off");
  ta.setAttribute("autocorrect", "off");
  ta.setAttribute("spellcheck", "false");
  host.append(ta);
  let composing = false;

  const clear = () => {
    ta.value = "";
  };

  ta.addEventListener("compositionstart", () => {
    composing = true;
  });
  ta.addEventListener("compositionend", (e) => {
    composing = false;
    for (const ch of e.data || "") h.text(ch);
    clear();
  });
  ta.addEventListener("beforeinput", (e) => {
    if (composing || e.isComposing || e.inputType === "insertCompositionText") return;
    e.preventDefault();
    switch (e.inputType) {
      case "insertText":
        for (const ch of e.data || "") h.text(ch);
        break;
      case "insertLineBreak":
      case "insertParagraph":
        h.text("\n");
        break;
      case "deleteContentBackward":
        h.back(false);
        break;
      case "deleteWordBackward":
        h.back(true);
        break;
      default:
        break;
    }
    clear();
  });
  ta.addEventListener("keydown", (e) => {
    if (composing || e.isComposing) return;
    const mod = e.ctrlKey || e.metaKey;
    if (e.key === "Tab") {
      e.preventDefault();
      h.tab();
    } else if (e.key === "Escape") {
      e.preventDefault();
      h.esc();
    } else if (e.key === "Backspace") {
      e.preventDefault();
      h.back(e.ctrlKey || e.altKey);
    } else if (e.key === "Enter" && !mod) {
      e.preventDefault();
      h.text("\n");
    } else if (mod && e.key === "ArrowRight") {
      e.preventDefault();
      h.step(1);
    } else if (mod && e.key === "ArrowLeft") {
      e.preventDefault();
      h.step(-1);
    }
  });
  ta.addEventListener("focus", () => h.focus(true));
  ta.addEventListener("blur", () => h.focus(false));

  return {
    ta,
    focus: () => ta.focus({ preventScroll: true }),
    moveTo: (x, y) => {
      ta.style.transform = `translate(${x}px, ${y}px)`;
    },
    destroy: () => ta.remove()
  };
}
