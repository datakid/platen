export default {
  id: "sed",
  name: "sed",
  short: "SED",
  pigment: "sed",
  family: null,
  version: "4.x",
  lexer: "bash",
  indent: 2,
  topics: [
    {
      id: "substitution",
      n: 1,
      title: "substitution",
      concepts: [
        {
          id: "basic-substitution", n: 1, title: "basic substitution", level: 1,
          gloss: "Replaces the first match on each line with the s command.",
          examples: [
            { code: `echo 'cat sat' | sed 's/cat/dog/'`, notes: [{ at: "s/cat/dog/", text: "replace cat with dog" }] },
            { code: `echo 'a b c' | sed 's/ /_/'`, notes: [{ at: "_/", text: "only the first space changes" }] },
            { code: `printf 'one\\ntwo\\n' | sed 's/o/0/'`, notes: [] }
          ]
        },
        {
          id: "global-flag", n: 2, title: "global flag", level: 1,
          gloss: "Replaces every match on a line or just a chosen occurrence.",
          examples: [
            { code: `echo 'a-b-c' | sed 's/-/+/g'`, notes: [{ at: "g", text: "every match on the line" }] },
            { code: `echo 'a-b-c' | sed 's/-/+/2'`, notes: [{ at: "/2", text: "only the second match" }] },
            { code: `echo 'a-b-c-d' | sed 's/-/+/2g'`, notes: [{ at: "2g", text: "second match onward" }] }
          ]
        },
        {
          id: "print-ignore-case", n: 3, title: "print and ignore case", level: 2,
          gloss: "Prints changed lines only and ignores letter case with flags.",
          examples: [
            { code: `printf 'a\\nb\\n' | sed -n 's/a/X/p'`, notes: [{ at: "-n", text: "no automatic printing" }, { at: "p", text: "print changed lines" }] },
            { code: `echo 'Hello' | sed 's/hello/hi/I'`, notes: [{ at: "I", text: "ignore case" }] },
            { code: `echo 'ABC abc' | sed 's/b/X/Ig'`, notes: [] }
          ]
        },
        {
          id: "other-delimiters", n: 4, title: "other delimiters", level: 1,
          gloss: "Swaps the slash for another delimiter when the text contains slashes.",
          examples: [
            { code: `echo '/usr/bin' | sed 's|/usr|/opt|'`, notes: [{ at: "|", text: "delimiter instead of a slash" }] },
            { code: `echo 'a/b' | sed 's#/#:#'`, notes: [] },
            { code: `echo 'x,y' | sed 's,x,z,'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "addresses",
      n: 2,
      title: "addresses",
      concepts: [
        {
          id: "line-numbers", n: 1, title: "line numbers", level: 1,
          gloss: "Limits a command to one line or a range of lines.",
          examples: [
            { code: `printf 'a\\nb\\nc\\n' | sed '2s/b/X/'`, notes: [{ at: "2", text: "only line two" }] },
            { code: `printf 'a\\nb\\nc\\n' | sed -n '2p'`, notes: [] },
            { code: `printf 'a\\nb\\nc\\nd\\n' | sed -n '2,3p'`, notes: [{ at: "2,3", text: "from line two to three" }] }
          ]
        },
        {
          id: "regex-addresses", n: 2, title: "regex addresses", level: 1,
          gloss: "Runs a command only on lines that match a pattern or lie between two patterns.",
          examples: [
            { code: `printf 'ok\\nerr\\nok\\n' | sed '/err/d'`, notes: [{ at: "/err/", text: "lines matching err" }] },
            { code: `printf 'a\\nSTART\\nb\\nEND\\nc\\n' | sed -n '/START/,/END/p'`, notes: [] },
            { code: `printf '#x\\ny\\n' | sed '/^#/!d'`, notes: [{ at: "!", text: "inverts the address" }] }
          ]
        },
        {
          id: "last-and-step", n: 3, title: "last line and steps", level: 2,
          gloss: "Targets the last line with a dollar sign or every nth line with a step.",
          examples: [
            { code: `printf 'a\\nb\\nc\\n' | sed -n '$p'`, notes: [{ at: "$", text: "the last line" }] },
            { code: `printf '1\\n2\\n3\\n4\\n5\\n' | sed -n '1~2p'`, notes: [{ at: "1~2", text: "every second line from one" }] },
            { code: `printf 'a\\nb\\nc\\n' | sed -n '2,$p'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "delete-print",
      n: 3,
      title: "delete and print",
      concepts: [
        {
          id: "delete-lines", n: 1, title: "delete lines", level: 1,
          gloss: "Removes lines by number, range or pattern with the d command.",
          examples: [
            { code: `printf 'a\\nb\\nc\\n' | sed '2d'`, notes: [{ at: "d", text: "delete the line" }] },
            { code: `printf 'a\\n\\nb\\n' | sed '/^$/d'`, notes: [{ at: "^$", text: "an empty line" }] },
            { code: `printf 'a\\nb\\nc\\n' | sed '1,2d'`, notes: [] }
          ]
        },
        {
          id: "print-quiet", n: 2, title: "print with quiet mode", level: 1,
          gloss: "Prints only chosen lines by turning off the default output with dash n.",
          examples: [
            { code: `printf 'a\\nb\\nc\\n' | sed -n '1p'`, notes: [{ at: "-n", text: "silence the default output" }] },
            { code: `printf 'ok 1\\nerr 2\\n' | sed -n '/ok/p'`, notes: [] },
            { code: `printf 'a\\nb\\n' | sed -n 'p;p'`, notes: [] }
          ]
        },
        {
          id: "quit-early", n: 3, title: "quit early", level: 2,
          gloss: "Stops reading input with the q command.",
          examples: [
            { code: `printf 'a\\nb\\nc\\n' | sed 2q`, notes: [{ at: "2q", text: "print two lines then stop" }] },
            { code: `printf 'a\\nstop\\nb\\n' | sed '/stop/q'`, notes: [] },
            { code: `printf 'a\\nb\\nc\\n' | sed -n '/b/{p;q}'`, notes: [{ at: "{p;q}", text: "several commands in a block" }] }
          ]
        }
      ]
    },
    {
      id: "regular-expressions",
      n: 4,
      title: "regular expressions",
      concepts: [
        {
          id: "anchors-sets", n: 1, title: "anchors and sets", level: 1,
          gloss: "Pins matches with anchors and picks characters with bracket sets.",
          examples: [
            { code: `echo 'hello' | sed 's/^/> /'`, notes: [{ at: "^", text: "start of the line" }] },
            { code: `echo 'hello' | sed 's/$/!/'`, notes: [{ at: "$", text: "end of the line" }] },
            { code: `echo 'education' | sed 's/[aeiou]//g'`, notes: [{ at: "[aeiou]", text: "any one vowel" }] }
          ]
        },
        {
          id: "extended-regex", n: 2, title: "extended regex", level: 1,
          gloss: "Enables alternation, groups and counted repeats with dash E.",
          examples: [
            { code: `echo 'abba' | sed -E 's/(a|b)+/X/'`, notes: [{ at: "-E", text: "extended syntax" }] },
            { code: `echo 'a123456' | sed -E 's/[0-9]{3}/N/'`, notes: [{ at: "{3}", text: "exactly three" }] },
            { code: `echo 'a   b' | sed -E 's/ +/ /g'`, notes: [] }
          ]
        },
        {
          id: "groups-backreferences", n: 3, title: "groups and backreferences", level: 2,
          gloss: "Reuses captured text with numbered backreferences and the ampersand.",
          examples: [
            { code: `echo 'ada lovelace' | sed -E 's/(\\w+) (\\w+)/\\2 \\1/'`, notes: [{ at: "\\2 \\1", text: "swapped captures" }] },
            { code: `echo 'abab' | sed 's/\\(ab\\)\\1/X/'`, notes: [{ at: "\\(ab\\)", text: "basic syntax escapes groups" }] },
            { code: `echo 'a1b22' | sed 's/[0-9]\\+/<&>/g'`, notes: [{ at: "&", text: "the whole match" }] }
          ]
        },
        {
          id: "case-conversion", n: 4, title: "case conversion", level: 2,
          gloss: "Changes letter case in the replacement with the GNU escapes.",
          examples: [
            { code: `echo 'hello world' | sed 's/.*/\\U&/'`, notes: [{ at: "\\U", text: "uppercase the rest" }] },
            { code: `echo 'hello world' | sed 's/\\w\\+/\\u&/g'`, notes: [{ at: "\\u", text: "uppercase the next letter" }] },
            { code: `echo 'SHOUT' | sed 's/.*/\\L&/'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "in-place",
      n: 5,
      title: "in place editing",
      concepts: [
        {
          id: "in-place-edit", n: 1, title: "in place edit", level: 1,
          gloss: "Rewrites a file directly with the dash i option.",
          examples: [
            { code: `printf 'a\\n' > f.txt
sed -i 's/a/b/' f.txt
cat f.txt`, notes: [{ at: "-i", text: "edits the file itself" }] },
            { code: `printf 'one\\ntwo\\n' > f.txt
sed -i '1d' f.txt
cat f.txt`, notes: [] },
            { code: `printf 'x\\n' > f.txt
sed -i 's/$/ done/' f.txt
cat f.txt`, notes: [] }
          ]
        },
        {
          id: "backup-suffix", n: 2, title: "backup suffix", level: 2,
          gloss: "Keeps a copy of the original by giving dash i a suffix.",
          examples: [
            { code: `printf 'a\\n' > f.txt
sed -i.bak 's/a/b/' f.txt
cat f.txt f.txt.bak`, notes: [{ at: ".bak", text: "suffix for the backup file" }] },
            { code: `printf 'a\\n' > f.txt
sed -i'.orig' 's/a/z/' f.txt
ls`, notes: [] },
            { code: `printf 'x\\n' > f.txt
sed -i.bak '$d' f.txt
cat f.txt.bak`, notes: [] }
          ]
        },
        {
          id: "several-files", n: 3, title: "several files", level: 2,
          gloss: "Edits many files in one command.",
          examples: [
            { code: `printf 'a\\n' > 1.txt
printf 'a\\n' > 2.txt
sed -i 's/a/b/' *.txt
cat 1.txt 2.txt`, notes: [{ at: "*.txt", text: "every matching file" }] },
            { code: `printf 'a\\nb\\n' > 1.txt
printf 'c\\nd\\n' > 2.txt
sed -n '1p' 1.txt 2.txt`, notes: [{ at: "1.txt 2.txt", text: "one stream of lines" }] },
            { code: `printf 'a\\nb\\n' > 1.txt
printf 'c\\nd\\n' > 2.txt
sed -s -n '1p' 1.txt 2.txt`, notes: [{ at: "-s", text: "each file counts separately" }] }
          ]
        }
      ]
    },
    {
      id: "commands",
      n: 6,
      title: "combining commands",
      concepts: [
        {
          id: "expressions", n: 1, title: "several expressions", level: 1,
          gloss: "Runs more than one command with dash e or a semicolon.",
          examples: [
            { code: `echo 'abc' | sed -e 's/a/1/' -e 's/c/3/'`, notes: [{ at: "-e", text: "one expression per option" }] },
            { code: `echo 'abc' | sed 's/a/1/; s/c/3/'`, notes: [{ at: ";", text: "separates commands" }] },
            { code: `printf 'a\\nb\\n' | sed -e '1d' -e 's/b/B/'`, notes: [] }
          ]
        },
        {
          id: "command-blocks", n: 2, title: "command blocks", level: 2,
          gloss: "Groups several commands under one address with braces.",
          examples: [
            { code: `printf 'a\\nb\\nc\\n' | sed '2,3{s/b/X/;s/c/Y/}'`, notes: [{ at: "2,3{", text: "braces share the address" }] },
            { code: `printf 'a\\nb\\n' | sed -n '/a/{=;p}'`, notes: [{ at: "=", text: "prints the line number" }] },
            { code: `printf 'x\\ny\\n' | sed '/y/{s/y/z/;s/$/!/}'`, notes: [] }
          ]
        },
        {
          id: "script-files", n: 3, title: "script files", level: 2,
          gloss: "Stores commands in a file and loads it with dash f.",
          examples: [
            { code: `printf 's/a/b/\\ns/c/d/\\n' > f.sed
echo 'ac' | sed -f f.sed`, notes: [{ at: "-f", text: "read commands from a file" }] },
            { code: `printf '/skip/d\\n' > f.sed
printf 'keep\\nskip\\n' | sed -f f.sed`, notes: [] },
            { code: `printf '1d\\ns/$/!/\\n' > f.sed
printf 'a\\nb\\n' | sed -f f.sed`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "edit-commands",
      n: 7,
      title: "append, insert and change",
      concepts: [
        {
          id: "append-line", n: 1, title: "append lines", level: 2,
          gloss: "Adds a new line after a matching line with the a command.",
          examples: [
            { code: `printf 'a\\nb\\n' | sed '1a added'`, notes: [{ at: "a", text: "text goes after the line" }] },
            { code: `printf 'a\\nb\\n' | sed '$a end'`, notes: [] },
            { code: `printf 'x\\ny\\n' | sed '/x/a after x'`, notes: [] }
          ]
        },
        {
          id: "insert-line", n: 2, title: "insert lines", level: 2,
          gloss: "Adds a new line before a matching line with the i command.",
          examples: [
            { code: `printf 'a\\nb\\n' | sed '1i header'`, notes: [{ at: "i", text: "text goes before the line" }] },
            { code: `printf 'x\\ny\\n' | sed '/y/i before y'`, notes: [] },
            { code: `printf 'a\\nb\\n' | sed '2i\\  indented'`, notes: [] }
          ]
        },
        {
          id: "change-line", n: 3, title: "change lines", level: 2,
          gloss: "Replaces whole lines or ranges with the c command.",
          examples: [
            { code: `printf 'a\\nb\\nc\\n' | sed '2c replaced'`, notes: [{ at: "c", text: "swap the whole line" }] },
            { code: `printf 'old\\nkeep\\n' | sed '/old/c new'`, notes: [] },
            { code: `printf 'a\\nb\\nc\\n' | sed '1,2c merged'`, notes: [{ at: "1,2c", text: "the range becomes one line" }] }
          ]
        }
      ]
    },
    {
      id: "hold-space",
      n: 8,
      title: "hold space",
      concepts: [
        {
          id: "double-space", n: 1, title: "double spacing", level: 2,
          gloss: "Adds a blank line after each line by appending the empty hold space.",
          examples: [
            { code: `printf 'a\\nb\\n' | sed G`, notes: [{ at: "G", text: "appends the hold space" }] },
            { code: `printf 'a\\nb\\n' | sed 'n;d'`, notes: [{ at: "n", text: "read the next line" }] },
            { code: `printf 'a\\nb\\nc\\n' | sed '$!G'`, notes: [] }
          ]
        },
        {
          id: "reverse-lines", n: 2, title: "reverse lines", level: 3,
          gloss: "Reverses the order of lines by stacking them in the hold space.",
          examples: [
            { code: `printf 'a\\nb\\nc\\n' | sed '1!G;h;$!d'`, notes: [{ at: "h", text: "copy to the hold space" }, { at: "1!G", text: "prepend what was held" }] },
            { code: `printf '1\\n2\\n3\\n' | sed -n '1!G;h;$p'`, notes: [] },
            { code: `printf 'x\\ny\\n' | sed -n '1!G;h;$p'`, notes: [] }
          ]
        },
        {
          id: "join-pairs", n: 3, title: "join pairs", level: 2,
          gloss: "Joins two lines into one with the N command.",
          examples: [
            { code: `printf 'a\\nb\\nc\\nd\\n' | sed 'N;s/\\n/ /'`, notes: [{ at: "N", text: "append the next line" }] },
            { code: `printf 'k1\\nv1\\nk2\\nv2\\n' | sed 'N;s/\\n/=/'`, notes: [] },
            { code: `printf 'a\\nb\\n' | sed '$!N;s/\\n/,/'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "branching",
      n: 9,
      title: "branching and loops",
      concepts: [
        {
          id: "join-all-lines", n: 1, title: "join all lines", level: 3,
          gloss: "Joins every line into one by looping with a label and a branch.",
          examples: [
            { code: `printf 'a\\nb\\nc\\n' | sed ':a;N;$!ba;s/\\n/,/g'`, notes: [{ at: ":a", text: "a label" }, { at: "ba", text: "branch back to the label" }] },
            { code: `printf 'x\\ny\\nz\\n' | sed -z 's/\\n/ /g'`, notes: [{ at: "-z", text: "treats the input as one line" }] },
            { code: `printf 'a\\nb\\n' | sed ':a;N;$!ba;s/\\n/ + /g'`, notes: [] }
          ]
        },
        {
          id: "conditional-branch", n: 2, title: "conditional branches", level: 3,
          gloss: "Repeats a substitution until it stops matching with the t command.",
          examples: [
            { code: `echo 'aaaa' | sed ':a;s/aa/a/;ta'`, notes: [{ at: "ta", text: "branch if a replacement happened" }] },
            { code: `printf 'x1\\ny\\n' | sed '/x/b;s/$/!/'`, notes: [{ at: "b", text: "skip to the end of the script" }] },
            { code: `echo '1234567' | sed ':a;s/\\B[0-9]\\{3\\}\\>/,&/;ta'`, notes: [] }
          ]
        },
        {
          id: "multiline-cycle", n: 3, title: "multiline cycle", level: 3,
          gloss: "Processes line pairs with the N, P and D commands.",
          examples: [
            { code: `printf 'a\\na\\nb\\n' | sed '$!N;/^\\(.*\\)\\n\\1$/!P;D'`, notes: [{ at: "P", text: "print up to the first newline" }, { at: "D", text: "delete up to the first newline" }] },
            { code: `printf 'a\\nb\\nc\\n' | sed '$!N;P;D'`, notes: [] },
            { code: `printf '1\\n2\\n3\\n' | sed -n '$!N;p'`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "transform-info",
      n: 10,
      title: "transliterate and inspect",
      concepts: [
        {
          id: "transliterate", n: 1, title: "transliterate", level: 1,
          gloss: "Maps characters one by one with the y command.",
          examples: [
            { code: `echo 'hello' | sed 'y/el/ip/'`, notes: [{ at: "y", text: "character for character" }] },
            { code: `echo 'a-b' | sed 'y/-/_/'`, notes: [] },
            { code: `echo 'abc' | sed 'y/abc/xyz/'`, notes: [] }
          ]
        },
        {
          id: "line-info", n: 2, title: "line numbers and counts", level: 2,
          gloss: "Counts lines with the equals command and shows hidden characters with l.",
          examples: [
            { code: `printf 'a\\nb\\nc\\n' | sed -n '$='`, notes: [{ at: "$=", text: "the number of lines" }] },
            { code: `printf 'a\\nb\\n' | sed =`, notes: [{ at: "=", text: "prints the line number first" }] },
            { code: `printf 'a\\tb\\n' | sed -n 'l'`, notes: [{ at: "l", text: "shows tabs and line ends" }] }
          ]
        },
        {
          id: "read-write-files", n: 3, title: "read and write files", level: 2,
          gloss: "Copies matching lines to a file with w and inserts a file with r.",
          examples: [
            { code: `printf 'a\\nb\\n' | sed -n '/a/w out.txt'`, notes: [{ at: "w", text: "write matching lines to a file" }] },
            { code: `printf 'x\\n' > extra.txt
printf 'a\\nb\\n' | sed '1r extra.txt'`, notes: [{ at: "r", text: "read a file after the line" }] },
            { code: `printf 'a\\nb\\n' | sed '/b/w picked.txt'`, notes: [] }
          ]
        }
      ]
    }
  ]
};
