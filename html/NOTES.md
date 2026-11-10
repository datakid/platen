Verified with Python 3 html.parser plus a tag-balance check on every example, and a local script for the A7 rules (shape, lengths, glosses, notes, anchors).
Not run: the W3C validator or a browser, so attribute values and newer features (details name, dialog method) are checked by reading only, unverified in a browser.
Version stays at the floor of 5; lexer.mjs treats element names as keywords with ignoreCase and lexes </ and /> as units.
