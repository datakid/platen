Verified with lightningcss (npm, strict parse with error recovery off) on all 212 examples individually, plus the local A7 validator (0 issues).
Not verified: rendering in a browser, so layout and animation results are checked by reading only; newer features (container queries, nesting, :has) are parsed but not run.
Version stays at the floor of 2024; lexer.mjs colors common properties, at-rules and keyword values, and lexes :: and attribute operators as units.
