export default {
  id: "markdown",
  name: "Markdown",
  short: "MD",
  pigment: "markdown",
  family: null,
  version: "CommonMark 0.31",
  lexer: "markdown",
  indent: 2,
  topics: [
    {
      id: "headings",
      n: 1,
      title: "headings",
      concepts: [
        {
          id: "atx-headings", n: 1, title: "hash headings", level: 1,
          gloss: "Marks a heading with one to six hash signs followed by a space.",
          examples: [
            { code: `# Project title`, notes: [{ at: "#", text: "level one" }] },
            { code: `## Installation`, notes: [] },
            { code: `### Environment variables`, notes: [] }
          ]
        },
        {
          id: "setext-headings", n: 2, title: "underlined headings", level: 2,
          gloss: "Underlines a line with equals signs or dashes to make a level one or two heading.",
          examples: [
            { code: `Project title
=============`, notes: [{ at: "===", text: "level one" }] },
            { code: `Installation
------------`, notes: [{ at: "---", text: "level two" }] },
            { code: `Release notes
=============

Changes
-------`, notes: [] }
          ]
        },
        {
          id: "outline", n: 3, title: "document outline", level: 1,
          gloss: "Nests heading levels so the document reads as an outline.",
          examples: [
            { code: `# Guide
## Setup
### Requirements`, notes: [] },
            { code: `# Changelog
## 2.1.0
### Fixed`, notes: [] },
            { code: `# API
## Users
## Orders`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "emphasis",
      n: 2,
      title: "emphasis",
      concepts: [
        {
          id: "italic-bold", n: 1, title: "italic and bold", level: 1,
          gloss: "Wraps text in one asterisk for italic and two for bold.",
          examples: [
            { code: `This is *important* and this is **critical**.`, notes: [{ at: "*important*", text: "italic" }, { at: "**critical**", text: "bold" }] },
            { code: `Use *caution* when you **delete** files.`, notes: [] },
            { code: `The *quick* brown fox and the **lazy** dog.`, notes: [] }
          ]
        },
        {
          id: "combined", n: 2, title: "bold and italic together", level: 1,
          gloss: "Combines three asterisks or nested markers for bold italic text.",
          examples: [
            { code: `This is ***very*** important.`, notes: [{ at: "***", text: "bold and italic" }] },
            { code: `This is **bold with _italic_ inside**.`, notes: [] },
            { code: `Read the ***release notes*** first.`, notes: [] }
          ]
        },
        {
          id: "strikethrough", n: 3, title: "strikethrough", level: 2,
          gloss: "Crosses out text by wrapping it in two tildes.",
          examples: [
            { code: `The price is ~~$20~~ $15 today.`, notes: [{ at: "~~", text: "strikethrough" }] },
            { code: `~~Deprecated~~ Use the new endpoint.`, notes: [] },
            { code: `Meeting moved from ~~Monday~~ Tuesday.`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "paragraphs",
      n: 3,
      title: "paragraphs and breaks",
      concepts: [
        {
          id: "paragraphs", n: 1, title: "paragraphs", level: 1,
          gloss: "Separates paragraphs with one blank line.",
          examples: [
            { code: `First paragraph of text.

Second paragraph of text.`, notes: [] },
            { code: `Install the package.

Run the tests and open a pull request.`, notes: [] },
            { code: `Short intro line.

A longer second paragraph follows here.`, notes: [] }
          ]
        },
        {
          id: "hard-breaks", n: 2, title: "hard line breaks", level: 2,
          gloss: "Ends a line with a backslash to force a line break inside a paragraph.",
          examples: [
            { code: `12 Rose Street\\
Oslo 0150\\
Norway`, notes: [{ at: "\\", text: "forced line break" }] },
            { code: `Roses are red,\\
violets are blue.`, notes: [] },
            { code: `Name: Ada\\
Role: Engineer`, notes: [] }
          ]
        },
        {
          id: "soft-wrapping", n: 3, title: "soft line wraps", level: 2,
          gloss: "Joins consecutive lines into one paragraph when no blank line separates them.",
          examples: [
            { code: `This sentence is written on
two source lines but renders
as one paragraph.`, notes: [] },
            { code: `Long documentation lines can be
wrapped at eighty columns without
changing the rendered text.`, notes: [] },
            { code: `First line
second line
third line`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "lists",
      n: 4,
      title: "lists",
      concepts: [
        {
          id: "unordered", n: 1, title: "bullet lists", level: 1,
          gloss: "Starts each item with a dash, asterisk or plus followed by a space.",
          examples: [
            { code: `- apples
- pears
- plums`, notes: [{ at: "-", text: "bullet" }] },
            { code: `* red
* green
* blue`, notes: [] },
            { code: `+ north
+ south`, notes: [] }
          ]
        },
        {
          id: "ordered", n: 2, title: "numbered lists", level: 1,
          gloss: "Numbers items with digits and a period, and renumbers them when rendered.",
          examples: [
            { code: `1. Clone the repository
2. Install dependencies
3. Run the tests`, notes: [{ at: "1.", text: "start number" }] },
            { code: `1. First
1. Second
1. Third`, notes: [] },
            { code: `3. Third step
4. Fourth step`, notes: [] }
          ]
        },
        {
          id: "nested", n: 3, title: "nested lists", level: 2,
          gloss: "Indents child items by two or more spaces to nest them under an item.",
          examples: [
            { code: `- Fruit
  - apples
  - pears
- Vegetables
  - carrots`, notes: [] },
            { code: `1. Setup
   - install node
   - install git
2. Build`, notes: [] },
            { code: `- Backend
  1. api
  2. worker
- Frontend`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "links",
      n: 5,
      title: "links",
      concepts: [
        {
          id: "inline-links", n: 1, title: "inline links", level: 1,
          gloss: "Writes a link as bracketed text followed by a parenthesized URL.",
          examples: [
            { code: `Read the [documentation](https://example.com/docs).`, notes: [{ at: "[documentation]", text: "link text" }, { at: "(https://example.com/docs)", text: "target" }] },
            { code: `See [the guide](https://example.com/guide) for details.`, notes: [] },
            { code: `Report bugs on [GitHub](https://github.com/example/app/issues).`, notes: [] }
          ]
        },
        {
          id: "titles-autolinks", n: 2, title: "titles and autolinks", level: 2,
          gloss: "Adds a hover title after the URL or wraps a bare URL in angle brackets.",
          examples: [
            { code: `[Home](https://example.com "Go to the home page")`, notes: [{ at: "\"Go to the home page\"", text: "hover title" }] },
            { code: `Visit <https://example.com> today.`, notes: [{ at: "<https:", text: "autolink" }] },
            { code: `Email <ada@example.com> for help.`, notes: [] }
          ]
        },
        {
          id: "relative-anchors", n: 3, title: "relative links and anchors", level: 2,
          gloss: "Links to a file in the repository or to a heading on the same page.",
          examples: [
            { code: `See [the changelog](CHANGELOG.md).`, notes: [] },
            { code: `Jump to [installation](#installation).`, notes: [{ at: "#installation", text: "heading anchor" }] },
            { code: `Read [the API notes](docs/api.md#errors).`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "images",
      n: 6,
      title: "images",
      concepts: [
        {
          id: "image-syntax", n: 1, title: "image syntax", level: 1,
          gloss: "Writes an image like a link with an exclamation mark in front.",
          examples: [
            { code: `![Company logo](logo.png)`, notes: [{ at: "![", text: "image marker" }, { at: "Company logo", text: "alt text" }] },
            { code: `![Architecture diagram](docs/architecture.svg)`, notes: [] },
            { code: `![Screenshot of the dashboard](images/dashboard.png)`, notes: [] }
          ]
        },
        {
          id: "image-titles", n: 2, title: "image titles", level: 2,
          gloss: "Adds a title after the file name that shows as a tooltip.",
          examples: [
            { code: `![Chart](chart.png "Monthly revenue")`, notes: [] },
            { code: `![Team photo](team.jpg "Oslo office, 2026")`, notes: [] },
            { code: `![Diagram](flow.svg "Request flow")`, notes: [] }
          ]
        },
        {
          id: "linked-images", n: 3, title: "linked images", level: 2,
          gloss: "Wraps an image in a link so that clicking it opens a page.",
          examples: [
            { code: `[![Build status](badge.svg)](https://example.com/ci)`, notes: [{ at: "[![", text: "link around image" }] },
            { code: `[![Logo](logo.png)](https://example.com)`, notes: [] },
            { code: `[![License](license.svg)](LICENSE)`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "code",
      n: 7,
      title: "code",
      concepts: [
        {
          id: "inline-code", n: 1, title: "inline code", level: 1,
          gloss: "Wraps a short code term in single backticks.",
          examples: [
            { code: `Run \`npm install\` to fetch packages.`, notes: [{ at: "`", text: "backtick" }] },
            { code: `The \`--verbose\` flag prints more output.`, notes: [] },
            { code: `Set \`PORT\` before you start the \`server\`.`, notes: [] }
          ]
        },
        {
          id: "fenced-blocks", n: 2, title: "fenced code blocks", level: 1,
          gloss: "Fences a block of code with three backticks and names the language.",
          examples: [
            { code: `\`\`\`js
const total = 3 + 4;
console.log(total);
\`\`\``, notes: [{ at: "```js", text: "language name" }] },
            { code: `\`\`\`bash
npm ci
npm test
\`\`\``, notes: [] },
            { code: `\`\`\`json
{"name": "billing-api"}
\`\`\``, notes: [] }
          ]
        },
        {
          id: "backtick-escapes", n: 3, title: "backticks inside code", level: 3,
          gloss: "Uses double backticks or a longer fence to show backticks as code.",
          examples: [
            { code: `Type \`\`use \`code\` here\`\` in a note.`, notes: [{ at: "``", text: "longer delimiter" }] },
            { code: `\`\`\`\`md
\`\`\`js
run();
\`\`\`
\`\`\`\``, notes: [] },
            { code: `Use \`\` \` \`\` for a lone backtick.`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "blockquotes",
      n: 8,
      title: "blockquotes",
      concepts: [
        {
          id: "simple-quote", n: 1, title: "simple quotes", level: 1,
          gloss: "Starts a line with a greater-than sign to quote text.",
          examples: [
            { code: `> Simplicity is prerequisite for reliability.`, notes: [{ at: ">", text: "quote marker" }] },
            { code: `> Measure twice, cut once.`, notes: [] },
            { code: `> Premature optimization is the root of all evil.`, notes: [] }
          ]
        },
        {
          id: "multi-paragraph", n: 2, title: "multi-paragraph quotes", level: 2,
          gloss: "Keeps a quote going across paragraphs with a marker on the blank line.",
          examples: [
            { code: `> First paragraph of the quote.
>
> Second paragraph of the quote.`, notes: [] },
            { code: `> Note
>
> Back up your data first.`, notes: [] },
            { code: `> Reviewer comment:
>
> Please add a test.`, notes: [] }
          ]
        },
        {
          id: "nested-quotes", n: 3, title: "nested and rich quotes", level: 3,
          gloss: "Nests quotes with a second marker and holds lists or code inside a quote.",
          examples: [
            { code: `> Outer quote
>
>> Inner quote`, notes: [] },
            { code: `> Steps:
>
> - install
> - configure`, notes: [] },
            { code: `> Run this:
>
> \`\`\`bash
> npm test
> \`\`\``, notes: [] }
          ]
        }
      ]
    },
    {
      id: "tables",
      n: 9,
      title: "tables",
      concepts: [
        {
          id: "basic-table", n: 1, title: "basic tables", level: 2,
          gloss: "Builds a table from pipe-separated cells and a dashed header row.",
          examples: [
            { code: `| Name | Role |
| ---- | ---- |
| Ada  | Admin |
| Linus | User |`, notes: [{ at: "| ----", text: "header separator" }] },
            { code: `| Item | Price |
| --- | --- |
| Tea | 3.50 |
| Cake | 4.25 |`, notes: [] },
            { code: `| Key | Value |
|-----|-------|
| host | localhost |`, notes: [] }
          ]
        },
        {
          id: "alignment", n: 2, title: "column alignment", level: 2,
          gloss: "Aligns columns with colons in the separator row.",
          examples: [
            { code: `| Item | Qty | Price |
| :--- | :-: | ----: |
| Tea | 2 | 7.00 |`, notes: [{ at: ":---", text: "left aligned" }, { at: ":-:", text: "centered" }, { at: "----:", text: "right aligned" }] },
            { code: `| Name | Score |
| :--- | ----: |
| Ada | 98 |
| Grace | 95 |`, notes: [] },
            { code: `| Day | Open |
| :-: | :-: |
| Mon | 9 |`, notes: [] }
          ]
        },
        {
          id: "cell-content", n: 3, title: "formatting inside cells", level: 2,
          gloss: "Puts inline code, links and emphasis inside table cells.",
          examples: [
            { code: `| Flag | Meaning |
| --- | --- |
| \`--help\` | Shows **usage** |`, notes: [] },
            { code: `| Package | Docs |
| --- | --- |
| core | [guide](docs/core.md) |`, notes: [] },
            { code: `| Type | Escaped pipe |
| --- | --- |
| union | \`a \\| b\` |`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "task-lists",
      n: 10,
      title: "task lists",
      concepts: [
        {
          id: "checkboxes", n: 1, title: "checkboxes", level: 2,
          gloss: "Writes a task as a list item with a bracketed space or x.",
          examples: [
            { code: `- [ ] Write tests
- [x] Fix the bug`, notes: [{ at: "[x]", text: "checked item" }] },
            { code: `- [x] Install
- [x] Configure
- [ ] Deploy`, notes: [] },
            { code: `- [ ] Review the pull request`, notes: [] }
          ]
        },
        {
          id: "nested-tasks", n: 2, title: "nested tasks", level: 2,
          gloss: "Nests subtasks under a task by indenting the child items.",
          examples: [
            { code: `- [ ] Release
  - [x] Update the changelog
  - [ ] Tag the commit`, notes: [] },
            { code: `- [x] Setup
  - [x] Clone
  - [x] Install`, notes: [] },
            { code: `- [ ] Launch
  - [ ] Test
  - [ ] Announce`, notes: [] }
          ]
        },
        {
          id: "todo-in-readme", n: 3, title: "roadmap checklists", level: 2,
          gloss: "Tracks progress in a README with a checklist of planned features.",
          examples: [
            { code: `## Roadmap

- [x] Login
- [ ] Billing`, notes: [] },
            { code: `## Todo

- [ ] Dark mode
- [ ] Export to CSV`, notes: [] },
            { code: `## Milestones

- [x] v1.0
- [ ] v2.0`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "breaks-escapes",
      n: 11,
      title: "breaks and escapes",
      concepts: [
        {
          id: "thematic-breaks", n: 1, title: "thematic breaks", level: 1,
          gloss: "Draws a horizontal rule with three or more dashes, asterisks or underscores.",
          examples: [
            { code: `Above the line

---
Below the line`, notes: [{ at: "---", text: "horizontal rule" }] },
            { code: `Part one

***
Part two`, notes: [] },
            { code: `Intro

___
Details`, notes: [] }
          ]
        },
        {
          id: "backslash-escapes", n: 2, title: "backslash escapes", level: 2,
          gloss: "Escapes punctuation with a backslash so it prints literally.",
          examples: [
            { code: `\\*not italic\\* and \\# not a heading`, notes: [{ at: "\\*", text: "literal asterisk" }] },
            { code: `1\\. Not a list item`, notes: [] },
            { code: `Use \\[brackets\\] without making a link.`, notes: [] }
          ]
        },
        {
          id: "inline-html", n: 3, title: "inline HTML", level: 3,
          gloss: "Mixes inline HTML such as kbd and details into Markdown.",
          examples: [
            { code: `Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.`, notes: [] },
            { code: `<details>
<summary>More</summary>

Hidden text.
</details>`, notes: [] },
            { code: `Line one<br>Line two`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "references",
      n: 12,
      title: "references and footnotes",
      concepts: [
        {
          id: "reference-links", n: 1, title: "reference links", level: 2,
          gloss: "Defines a link target once and refers to it by a label.",
          examples: [
            { code: `Read the [docs][d] first.

[d]: https://example.com/docs`, notes: [{ at: "[d]:", text: "link definition" }] },
            { code: `See [the guide][guide] and [the FAQ][faq].

[guide]: https://example.com/guide
[faq]: https://example.com/faq`, notes: [] },
            { code: `[Example][1]

[1]: https://example.com "Example site"`, notes: [] }
          ]
        },
        {
          id: "reference-images", n: 2, title: "reference images", level: 2,
          gloss: "Defines an image path once and refers to it by a label.",
          examples: [
            { code: `![Logo][logo]

[logo]: images/logo.png`, notes: [] },
            { code: `![Chart][c1] and ![Table][t1]

[c1]: chart.png
[t1]: table.png`, notes: [] },
            { code: `![Diagram][flow]

[flow]: flow.svg "Request flow"`, notes: [] }
          ]
        },
        {
          id: "footnotes", n: 3, title: "footnotes", level: 3,
          gloss: "Adds a numbered note with a caret label and a matching definition.",
          examples: [
            { code: `Markdown is popular.[^1]

[^1]: Created in 2004.`, notes: [{ at: "[^1]", text: "footnote marker" }] },
            { code: `The spec is stable.[^spec]

[^spec]: See the CommonMark site.`, notes: [] },
            { code: `First claim.[^a] Second claim.[^b]

[^a]: Source A.
[^b]: Source B.`, notes: [] }
          ]
        }
      ]
    }
  ]
};
