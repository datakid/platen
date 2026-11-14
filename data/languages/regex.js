export default {
  id: "regex",
  name: "Regex",
  short: "RX",
  pigment: "regex",
  family: null,
  version: "ES2026",
  lexer: "regex",
  indent: 2,
  topics: [
    {
      id: "literals-escapes",
      n: 1,
      title: "literals and escapes",
      concepts: [
        {
          id: "plain-characters", n: 1, title: "plain characters", level: 1,
          gloss: "Matches the exact text of ordinary characters in order.",
          examples: [
            { code: `cat`, notes: [{ at: "cat", text: "matches the word cat" }] },
            { code: `invoice 1042`, notes: [{ at: "1042", text: "digits match themselves" }] },
            { code: `Hello, world`, notes: [] }
          ]
        },
        {
          id: "escaped-metacharacters", n: 2, title: "escaped metacharacters", level: 1,
          gloss: "Matches special symbols as plain text by escaping them with a backslash.",
          examples: [
            { code: `3\\.14`, notes: [{ at: "\\.", text: "a literal dot" }] },
            { code: `\\(draft\\)`, notes: [{ at: "\\(", text: "a literal parenthesis" }] },
            { code: `a\\+b\\?`, notes: [] },
            { code: `C:\\\\Users`, notes: [{ at: "\\\\", text: "one backslash" }] }
          ]
        },
        {
          id: "character-escapes", n: 3, title: "character escapes", level: 2,
          gloss: "Matches tabs, line breaks and code points with escape sequences.",
          examples: [
            { code: `col1\\tcol2`, notes: [{ at: "\\t", text: "a tab" }] },
            { code: `line one\\nline two`, notes: [{ at: "\\n", text: "a line feed" }] },
            { code: `\\x41\\u0042`, notes: [{ at: "\\x41", text: "code point 41 in hex" }, { at: "\\u0042", text: "four hex digits" }] }
          ]
        }
      ]
    },
    {
      id: "character-sets",
      n: 2,
      title: "character sets",
      concepts: [
        {
          id: "sets-ranges", n: 1, title: "sets and ranges", level: 1,
          gloss: "Matches one character from a listed set or from a range.",
          examples: [
            { code: `[aeiou]`, notes: [{ at: "[aeiou]", text: "any one vowel" }] },
            { code: `[A-Za-z0-9]`, notes: [{ at: "A-Z", text: "a range of capitals" }] },
            { code: `gr[ae]y`, notes: [] },
            { code: `[0-9a-f]`, notes: [] }
          ]
        },
        {
          id: "negated-sets", n: 2, title: "negated sets", level: 1,
          gloss: "Matches one character that is not in the set by starting it with a caret.",
          examples: [
            { code: `[^0-9]`, notes: [{ at: "[^", text: "negates the set" }] },
            { code: `q[^u]`, notes: [] },
            { code: `"[^"]*"`, notes: [{ at: "[^\"]*", text: "everything up to the next quote" }] },
            { code: `[^,]+`, notes: [] }
          ]
        },
        {
          id: "special-in-sets", n: 3, title: "special characters in sets", level: 2,
          gloss: "Places hyphens, brackets and carets in a set without extra escapes.",
          examples: [
            { code: `[a-z-]`, notes: [{ at: "-", text: "literal when last in the set" }] },
            { code: `[.*+?]`, notes: [{ at: "[.*+?]", text: "metacharacters lose their meaning" }] },
            { code: `[+\\-*/]`, notes: [] },
            { code: `[$^]`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "shorthand-classes",
      n: 3,
      title: "shorthand classes",
      concepts: [
        {
          id: "digit-word-space", n: 1, title: "digit, word and space", level: 1,
          gloss: "Matches a digit, a word character or whitespace with d, w and s escapes.",
          examples: [
            { code: `\\d\\d\\d`, notes: [{ at: "\\d", text: "one digit" }] },
            { code: `\\w+`, notes: [{ at: "\\w", text: "letter, digit or underscore" }] },
            { code: `\\d+\\s\\w+`, notes: [{ at: "\\s", text: "space, tab or line break" }] }
          ]
        },
        {
          id: "negated-shorthands", n: 2, title: "negated shorthands", level: 1,
          gloss: "Matches anything except digits, word characters or whitespace.",
          examples: [
            { code: `\\D+`, notes: [{ at: "\\D", text: "any non digit" }] },
            { code: `\\W`, notes: [] },
            { code: `\\S+\\s\\S+`, notes: [{ at: "\\S", text: "any non whitespace" }] }
          ]
        },
        {
          id: "any-character", n: 3, title: "any character", level: 1,
          gloss: "Matches any single character except a line break with a dot.",
          examples: [
            { code: `a.c`, notes: [{ at: ".", text: "any one character" }] },
            { code: `..:..`, notes: [] },
            { code: `c.t`, notes: [{ at: "c.t", text: "cat, cut and c7t" }] }
          ]
        }
      ]
    },
    {
      id: "anchors-boundaries",
      n: 4,
      title: "anchors and boundaries",
      concepts: [
        {
          id: "line-anchors", n: 1, title: "line anchors", level: 1,
          gloss: "Pins a match to the start or the end of the input.",
          examples: [
            { code: `^Dear`, notes: [{ at: "^", text: "start of the input" }] },
            { code: `\\.pdf$`, notes: [{ at: "$", text: "end of the input" }] },
            { code: `^\\d+$`, notes: [] }
          ]
        },
        {
          id: "word-boundaries", n: 2, title: "word boundaries", level: 2,
          gloss: "Matches the edge of a word with b and the inside of a word with B.",
          examples: [
            { code: `\\bcat\\b`, notes: [{ at: "\\b", text: "a word edge" }] },
            { code: `\\Bing\\b`, notes: [{ at: "\\B", text: "not a word edge" }] },
            { code: `\\b\\d+\\b`, notes: [] }
          ]
        },
        {
          id: "blank-lines", n: 3, title: "blank lines", level: 2,
          gloss: "Matches empty or whitespace only input by combining anchors and classes.",
          examples: [
            { code: `^$`, notes: [{ at: "^$", text: "an empty input" }] },
            { code: `^\\s*$`, notes: [{ at: "\\s*", text: "any amount of whitespace" }] },
            { code: `^\\S.*$`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "quantifiers",
      n: 5,
      title: "quantifiers",
      concepts: [
        {
          id: "basic-quantifiers", n: 1, title: "star, plus and question", level: 1,
          gloss: "Repeats the previous token zero or more, one or more or at most once.",
          examples: [
            { code: `colou?r`, notes: [{ at: "?", text: "zero or one" }] },
            { code: `\\d+`, notes: [{ at: "+", text: "one or more" }] },
            { code: `ab*c`, notes: [{ at: "*", text: "zero or more" }] }
          ]
        },
        {
          id: "counted-repetition", n: 2, title: "counted repetition", level: 1,
          gloss: "Repeats the previous token an exact or bounded number of times.",
          examples: [
            { code: `\\d{4}`, notes: [{ at: "{4}", text: "exactly four" }] },
            { code: `\\w{2,8}`, notes: [{ at: "{2,8}", text: "between two and eight" }] },
            { code: `\\s{2,}`, notes: [{ at: "{2,}", text: "two or more" }] }
          ]
        },
        {
          id: "lazy-quantifiers", n: 3, title: "lazy quantifiers", level: 2,
          gloss: "Matches as little as possible by adding a question mark after a quantifier.",
          examples: [
            { code: `<.+?>`, notes: [{ at: "+?", text: "shortest match" }] },
            { code: `".*?"`, notes: [] },
            { code: `\\d+?`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "alternation-groups",
      n: 6,
      title: "alternation and groups",
      concepts: [
        {
          id: "alternation", n: 1, title: "alternation", level: 1,
          gloss: "Matches one of several alternatives separated by a vertical bar.",
          examples: [
            { code: `cat|dog`, notes: [{ at: "|", text: "either side" }] },
            { code: `jpg|png|gif`, notes: [] },
            { code: `^(?:GET|POST)`, notes: [] }
          ]
        },
        {
          id: "non-capturing-groups", n: 2, title: "non capturing groups", level: 2,
          gloss: "Groups tokens for repetition without storing a capture.",
          examples: [
            { code: `(?:ab)+`, notes: [{ at: "(?:", text: "group without a capture" }] },
            { code: `^(?:https?|ftp)://`, notes: [] },
            { code: `(?:\\d{3}-){2}\\d{4}`, notes: [] }
          ]
        },
        {
          id: "nested-groups", n: 3, title: "nested groups", level: 2,
          gloss: "Quantifies a whole group or nests groups inside each other.",
          examples: [
            { code: `(?:na)+ batman`, notes: [] },
            { code: `\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b`, notes: [{ at: "{3}", text: "repeats the whole group" }] },
            { code: `^(?:[a-z]+\\s)*end$`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "captures-backreferences",
      n: 7,
      title: "captures and backreferences",
      concepts: [
        {
          id: "capture-groups", n: 1, title: "capture groups", level: 2,
          gloss: "Stores the text of each parenthesized part so code can read it.",
          examples: [
            { code: `(\\d{4})-(\\d{2})-(\\d{2})`, notes: [{ at: "(\\d{4})", text: "capture number one" }] },
            { code: `(\\w+)@(\\w+)\\.com`, notes: [] },
            { code: `^(\\w+)\\s(\\w+)$`, notes: [] }
          ]
        },
        {
          id: "backreferences", n: 2, title: "backreferences", level: 2,
          gloss: "Matches the same text again with a numbered backreference.",
          examples: [
            { code: `(\\w)\\1`, notes: [{ at: "\\1", text: "repeats capture one" }] },
            { code: `\\b(\\w+)\\s+\\1\\b`, notes: [{ at: "\\b(\\w+)", text: "a repeated word" }] },
            { code: `(['"]).*?\\1`, notes: [] }
          ]
        },
        {
          id: "named-groups", n: 3, title: "named groups", level: 2,
          gloss: "Names a capture with angle brackets and refers back to it by name.",
          examples: [
            { code: `(?<year>\\d{4})-(?<month>\\d{2})`, notes: [{ at: "(?<year>", text: "names the capture" }] },
            { code: `(?<quote>['"]).*?\\k<quote>`, notes: [{ at: "\\k<quote>", text: "a named backreference" }] },
            { code: `(?<user>\\w+)@(?<host>[\\w.]+)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "lookaround",
      n: 8,
      title: "lookaround",
      concepts: [
        {
          id: "lookahead", n: 1, title: "lookahead", level: 3,
          gloss: "Asserts that text follows without including it in the match.",
          examples: [
            { code: `\\d+(?=%)`, notes: [{ at: "(?=%)", text: "followed by a percent sign" }] },
            { code: `\\w+(?=\\.js$)`, notes: [] },
            { code: `[a-z]+(?=\\d)`, notes: [] }
          ]
        },
        {
          id: "negative-lookahead", n: 2, title: "negative lookahead", level: 3,
          gloss: "Asserts that the given text does not follow the current position.",
          examples: [
            { code: `\\d+(?!px)`, notes: [{ at: "(?!px)", text: "not followed by px" }] },
            { code: `^(?!admin)\\w+$`, notes: [] },
            { code: `q(?!u)`, notes: [] }
          ]
        },
        {
          id: "lookbehind", n: 3, title: "lookbehind", level: 3,
          gloss: "Asserts what comes before the current position, positive or negative.",
          examples: [
            { code: `(?<=\\$)\\d+`, notes: [{ at: "(?<=\\$)", text: "preceded by a dollar sign" }] },
            { code: `(?<!\\d)\\d{3}(?!\\d)`, notes: [{ at: "(?<!\\d)", text: "not preceded by a digit" }] },
            { code: `(?<=@)\\w+`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "flags",
      n: 9,
      title: "flags",
      concepts: [
        {
          id: "case-global", n: 1, title: "case and global", level: 1,
          gloss: "Ignores letter case with i and finds every match with g.",
          examples: [
            { code: `/error/i`, notes: [{ at: "i", text: "ignores case" }] },
            { code: `/\\d+/g`, notes: [{ at: "g", text: "every match, not just the first" }] },
            { code: `/todo/gi`, notes: [] }
          ]
        },
        {
          id: "multiline-dotall", n: 2, title: "multiline and dotall", level: 2,
          gloss: "Anchors every line with m and lets a dot cross line breaks with s.",
          examples: [
            { code: `/^\\w+:/gm`, notes: [{ at: "m", text: "anchors match at each line" }] },
            { code: `/start.*end/s`, notes: [{ at: "s", text: "dot matches line breaks" }] },
            { code: `/^$/gm`, notes: [] }
          ]
        },
        {
          id: "unicode-sticky", n: 3, title: "unicode and sticky", level: 3,
          gloss: "Reads full Unicode with u and matches only at lastIndex with y.",
          examples: [
            { code: `/\\p{L}+/u`, notes: [{ at: "\\p{L}", text: "any letter in any script" }] },
            { code: `/\\u{1F600}/u`, notes: [{ at: "\\u{1F600}", text: "a code point above FFFF" }] },
            { code: `/\\d+/y`, notes: [{ at: "y", text: "sticky position" }] }
          ]
        }
      ]
    },
    {
      id: "common-patterns",
      n: 10,
      title: "common patterns",
      concepts: [
        {
          id: "dates-times", n: 1, title: "dates and times", level: 2,
          gloss: "Matches ISO dates and clock times with fixed digit counts.",
          examples: [
            { code: `\\d{4}-\\d{2}-\\d{2}`, notes: [] },
            { code: `([01]\\d|2[0-3]):[0-5]\\d`, notes: [{ at: "2[0-3]", text: "hours up to 23" }] },
            { code: `\\d{1,2}/\\d{1,2}/\\d{4}`, notes: [] }
          ]
        },
        {
          id: "identifiers-emails", n: 2, title: "identifiers and emails", level: 2,
          gloss: "Matches variable names, usernames and simple email addresses.",
          examples: [
            { code: `[A-Za-z_]\\w*`, notes: [] },
            { code: `[\\w.+-]+@[\\w-]+\\.[\\w.]+`, notes: [{ at: "[\\w.+-]+", text: "the local part" }] },
            { code: `^[a-z0-9_-]{3,16}$`, notes: [] }
          ]
        },
        {
          id: "numbers-colors", n: 3, title: "numbers and colors", level: 2,
          gloss: "Matches decimals, hex colors and dotted number groups.",
          examples: [
            { code: `-?\\d+(?:\\.\\d+)?`, notes: [{ at: "-?", text: "optional sign" }] },
            { code: `#(?:[0-9a-f]{3}){1,2}\\b`, notes: [{ at: "{1,2}", text: "three or six digits" }] },
            { code: `\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "javascript-methods",
      n: 11,
      title: "JavaScript methods",
      concepts: [
        {
          id: "test-match", n: 1, title: "test and match", level: 2,
          gloss: "Checks or extracts matches with test and match.",
          examples: [
            { code: `const zip = "90210";
const ok = /^\\d{5}$/.test(zip);`, notes: [{ at: "test", text: "returns true or false" }] },
            { code: `const text = "Ada paid 40 on day 7";
const first = text.match(/\\d+/);`, notes: [{ at: "match", text: "array with the first match" }] },
            { code: `const text = "Ada Grace Alan";
const names = text.match(/[A-Z]\\w+/g) ?? [];`, notes: [{ at: "?? []", text: "no match gives null" }] }
          ]
        },
        {
          id: "match-all", n: 2, title: "matchAll", level: 3,
          gloss: "Walks every match and its capture groups with matchAll.",
          examples: [
            { code: `const log = "a1 b22 c333";
for (const m of log.matchAll(/[a-z](\\d+)/g)) {
  console.log(m[1]);
}`, notes: [{ at: "matchAll", text: "needs the g flag" }] },
            { code: `const row = "2026-11-14";
const m = row.match(/(?<y>\\d{4})-(?<m>\\d{2})/);
console.log(m.groups.y);`, notes: [{ at: "groups", text: "holds the named captures" }] },
            { code: `const text = "x=1, y=22";
const pairs = [...text.matchAll(/(\\w)=(\\d+)/g)];`, notes: [] }
          ]
        },
        {
          id: "replace-split", n: 3, title: "replace and split", level: 2,
          gloss: "Rewrites or splits text with replace, replaceAll and split.",
          examples: [
            { code: `const iso = "2026-11-14";
const out = iso.replace(/(\\d+)-(\\d+)-(\\d+)/, "$3/$2/$1");`, notes: [{ at: "$3", text: "inserts capture three" }] },
            { code: `const name = "Lovelace, Ada";
const swapped = name.replace(/(?<l>\\w+), (?<f>\\w+)/, "$<f> $<l>");`, notes: [] },
            { code: `const cells = "a, b;c".split(/[,;]\\s*/);`, notes: [{ at: "split", text: "accepts a pattern" }] }
          ]
        }
      ]
    },
    {
      id: "precise-patterns",
      n: 12,
      title: "precise patterns",
      concepts: [
        {
          id: "specific-classes", n: 1, title: "specific classes", level: 2,
          gloss: "Prefers a precise class over a dot so the match stays predictable.",
          examples: [
            { code: `"[^"]*"`, notes: [{ at: "[^\"]*", text: "no runaway match" }] },
            { code: `<[^>]+>`, notes: [] },
            { code: `[^,\\n]+`, notes: [] }
          ]
        },
        {
          id: "anchored-patterns", n: 2, title: "anchored patterns", level: 2,
          gloss: "Anchors a pattern to validate a whole string instead of a part.",
          examples: [
            { code: `^\\d{3}-\\d{4}$`, notes: [] },
            { code: `^[A-Z]{2}\\d{6}$`, notes: [] },
            { code: `^\\s*\\w+\\s*=\\s*\\d+\\s*$`, notes: [] }
          ]
        },
        {
          id: "bounded-repeats", n: 3, title: "bounded repeats", level: 3,
          gloss: "Bounds repetition so a failing pattern gives up quickly.",
          examples: [
            { code: `^(?:\\d+,)*\\d+$`, notes: [{ at: "(?:\\d+,)*", text: "one clear separator" }] },
            { code: `\\w{1,32}`, notes: [] },
            { code: `^[^\\s@]{1,64}@[^\\s@]{1,255}$`, notes: [{ at: "{1,64}", text: "an upper limit" }] }
          ]
        }
      ]
    }
  ]
};
