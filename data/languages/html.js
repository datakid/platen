export default {
  id: "html",
  name: "HTML",
  short: "HT",
  pigment: "html",
  family: null,
  version: "5",
  lexer: "html",
  indent: 2,
  topics: [
    {
      id: "document-skeleton",
      n: 1,
      title: "document skeleton",
      concepts: [
        {
          id: "doctype-root", n: 1, title: "doctype and root element", level: 1,
          gloss: "Opens a page with a doctype and a root html element.",
          examples: [
            { code: `<!doctype html>
<html lang="en">
  <body>Hello</body>
</html>`, notes: [{ at: "<!doctype html>", text: "triggers standards mode" }, { at: "lang=\"en\"", text: "declares the page language" }] },
            { code: `<!doctype html>
<html lang="fr">
  <body>Bonjour</body>
</html>`, notes: [{ at: "<html lang=\"fr\">", text: "root of the document" }] },
            { code: `<!doctype html>
<html lang="de" dir="ltr">
  <body>Hallo</body>
</html>`, notes: [{ at: "dir=\"ltr\"", text: "text direction" }] }
          ]
        },
        {
          id: "head-body", n: 2, title: "head and body", level: 1,
          gloss: "Splits a document into a head for metadata and a body for content.",
          examples: [
            { code: `<html lang="en">
  <head>
    <title>Order summary</title>
  </head>
  <body>
    <h1>Order 1042</h1>
  </body>
</html>`, notes: [{ at: "<head>", text: "metadata, not shown" }, { at: "<body>", text: "visible content" }] },
            { code: `<html lang="en">
  <head>
    <title>Invoice 2291</title>
  </head>
  <body>
    <p>Amount due: 480.00</p>
  </body>
</html>`, notes: [{ at: "<title>", text: "tab and bookmark name" }] },
            { code: `<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Weekly digest</title>
  </head>
  <body>
    <h1>This week</h1>
  </body>
</html>`, notes: [{ at: "<meta charset=\"utf-8\">", text: "text encoding" }] }
          ]
        },
        {
          id: "full-page", n: 3, title: "a complete page", level: 2,
          gloss: "Assembles a complete page from a doctype, a head and a body.",
          examples: [
            { code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Inventory</title>
  </head>
  <body>
    <h1>Stock levels</h1>
  </body>
</html>`, notes: [{ at: "<title>Inventory</title>", text: "required in the head" }] },
            { code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Trail map</title>
  </head>
  <body>
    <p>Pick a route.</p>
  </body>
</html>`, notes: [{ at: "<p>Pick a route.</p>", text: "body content" }] },
            { code: `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Menu</title>
  </head>
  <body>
    <h1>Platos del dia</h1>
  </body>
</html>`, notes: [{ at: "lang=\"es\"", text: "set to the content language" }] }
          ]
        }
      ]
    },
    {
      id: "text-headings",
      n: 2,
      title: "text & headings",
      concepts: [
        {
          id: "headings", n: 1, title: "headings", level: 1,
          gloss: "Marks section titles with h1 to h6 in a nested outline.",
          examples: [
            { code: `<h1>Quarterly report</h1>
<h2>Revenue</h2>
<h3>By region</h3>
<h2>Costs</h2>`, notes: [{ at: "<h1>", text: "one per page" }, { at: "<h3>", text: "nested under an h2" }] },
            { code: `<h1>Trail guide</h1>
<h2>Packing list</h2>
<h2>Route</h2>
<h3>Day one</h3>
<h3>Day two</h3>`, notes: [{ at: "<h2>Route</h2>", text: "a section of the guide" }] },
            { code: `<h1>Release notes</h1>
<h2>Added</h2>
<h2>Fixed</h2>`, notes: [{ at: "<h2>Fixed</h2>", text: "sibling of the previous h2" }] }
          ]
        },
        {
          id: "paragraphs-breaks", n: 2, title: "paragraphs and breaks", level: 1,
          gloss: "Groups prose into paragraphs and adds breaks or rules between content.",
          examples: [
            { code: `<p>Orders ship within two days.</p>
<p>Returns are free for 30 days.</p>`, notes: [{ at: "<p>", text: "one block of prose" }] },
            { code: `<p>Ship to:<br>12 Mill Road<br>Leeds</p>`, notes: [{ at: "<br>", text: "line break inside a paragraph" }] },
            { code: `<p>Part one ends here.</p>
<hr>
<p>Part two begins.</p>`, notes: [{ at: "<hr>", text: "thematic break" }] }
          ]
        },
        {
          id: "inline-emphasis", n: 3, title: "inline emphasis", level: 2,
          gloss: "Marks inline text as emphasis, code, highlight or keyboard input.",
          examples: [
            { code: `<p>Run <code>npm test</code> before you <strong>push</strong>.</p>`, notes: [{ at: "<code>", text: "literal code" }, { at: "<strong>", text: "strong importance" }] },
            { code: `<p>Do <em>not</em> delete the <mark>draft</mark> file.</p>`, notes: [{ at: "<em>", text: "stress emphasis" }, { at: "<mark>", text: "highlighted text" }] },
            { code: `<p>Press <kbd>Ctrl</kbd> and <kbd>S</kbd> to save.</p>`, notes: [{ at: "<kbd>", text: "keyboard input" }] },
            { code: `<p>Water is H<sub>2</sub>O and area is in m<sup>2</sup>.</p>`, notes: [{ at: "<sub>", text: "subscript" }, { at: "<sup>", text: "superscript" }] }
          ]
        },
        {
          id: "quotes", n: 4, title: "quotations", level: 2,
          gloss: "Quotes text with blockquote for blocks and q for inline phrases.",
          examples: [
            { code: `<blockquote cite="https://example.com/post">
  <p>Measure twice, cut once.</p>
</blockquote>`, notes: [{ at: "cite=\"https://example.com/post\"", text: "source url, not shown" }] },
            { code: `<p>She said <q>see you at noon</q> and left.</p>`, notes: [{ at: "<q>", text: "inline quote, quotes added by css" }] },
            { code: `<p>From <cite>The Pragmatic Programmer</cite>, chapter two.</p>`, notes: [{ at: "<cite>", text: "title of a work" }] }
          ]
        }
      ]
    },
    {
      id: "links-images",
      n: 3,
      title: "links & images",
      concepts: [
        {
          id: "links", n: 1, title: "links", level: 1,
          gloss: "Links to another page with an anchor element and an href.",
          examples: [
            { code: `<a href="/pricing">See pricing</a>`, notes: [{ at: "href=\"/pricing\"", text: "destination" }] },
            { code: `<a
  href="https://example.com/docs"
  target="_blank"
  rel="noopener noreferrer"
>
  Docs
</a>`, notes: [{ at: "target=\"_blank\"", text: "opens a new tab" }, { at: "rel=\"noopener noreferrer\"", text: "limits what the new page can do" }] },
            { code: `<a href="mailto:help@example.com">Email support</a>
<a href="tel:+15550100">Call us</a>`, notes: [{ at: "mailto:", text: "opens the mail app" }, { at: "tel:", text: "starts a call" }] }
          ]
        },
        {
          id: "fragment-links", n: 2, title: "in-page links", level: 2,
          gloss: "Jumps to a section of the same page with an id and a fragment.",
          examples: [
            { code: `<a href="#shipping">Shipping</a>
<h2 id="shipping">Shipping</h2>`, notes: [{ at: "href=\"#shipping\"", text: "matches the id below" }, { at: "id=\"shipping\"", text: "target of the fragment" }] },
            { code: `<ul>
  <li><a href="#setup">Setup</a></li>
  <li><a href="#usage">Usage</a></li>
</ul>`, notes: [{ at: "#setup", text: "fragment starts with a hash" }] },
            { code: `<body id="top">
  <a href="#top">Back to top</a>
</body>`, notes: [{ at: "id=\"top\"", text: "any element can be a target" }] }
          ]
        },
        {
          id: "images", n: 3, title: "images", level: 1,
          gloss: "Embeds a picture with img, alt text and explicit dimensions.",
          examples: [
            { code: `<img src="/img/chart.png" alt="Sales by month" width="640" height="360">`, notes: [{ at: "alt=\"Sales by month\"", text: "text for screen readers" }, { at: "width=\"640\"", text: "reserves space before load" }] },
            { code: `<img
  src="/img/team.jpg"
  alt="The support team"
  width="800"
  height="600"
  loading="lazy"
>`, notes: [{ at: "loading=\"lazy\"", text: "loads when near the viewport" }] },
            { code: `<img src="/img/divider.svg" alt="" width="200" height="8">`, notes: [{ at: "alt=\"\"", text: "empty for decoration" }] }
          ]
        },
        {
          id: "responsive-images", n: 4, title: "responsive images", level: 3,
          gloss: "Serves sized images with srcset, sizes and picture.",
          examples: [
            { code: `<img
  src="/img/hero-800.jpg"
  srcset="/img/hero-800.jpg 800w, /img/hero-1600.jpg 1600w"
  sizes="(min-width: 60rem) 50vw, 100vw"
  alt="Mountain ridge at dawn"
>`, notes: [{ at: "srcset=", text: "candidate files with widths" }, { at: "sizes=", text: "display width per condition" }] },
            { code: `<picture>
  <source srcset="/img/logo.avif" type="image/avif">
  <source srcset="/img/logo.webp" type="image/webp">
  <img src="/img/logo.png" alt="Company logo" width="120" height="40">
</picture>`, notes: [{ at: "<picture>", text: "picks the first usable source" }, { at: "type=\"image/avif\"", text: "skipped if unsupported" }] },
            { code: `<picture>
  <source media="(min-width: 50rem)" srcset="/img/wide.jpg">
  <img src="/img/narrow.jpg" alt="Harbor at night">
</picture>`, notes: [{ at: "media=", text: "art direction by viewport" }] }
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
          id: "unordered-lists", n: 1, title: "unordered lists", level: 1,
          gloss: "Builds a bulleted list from ul and li elements.",
          examples: [
            { code: `<ul>
  <li>Apples</li>
  <li>Rice</li>
  <li>Olive oil</li>
</ul>`, notes: [{ at: "<ul>", text: "items without order" }, { at: "<li>", text: "one list item" }] },
            { code: `<ul>
  <li><a href="/inbox">Inbox</a></li>
  <li><a href="/sent">Sent</a></li>
  <li><a href="/drafts">Drafts</a></li>
</ul>`, notes: [{ at: "<li><a href=\"/inbox\">", text: "links often live in items" }] },
            { code: `<ul>
  <li>Water bottle</li>
  <li>Rain jacket</li>
</ul>`, notes: [] }
          ]
        },
        {
          id: "ordered-lists", n: 2, title: "ordered lists", level: 1,
          gloss: "Numbers items in sequence with ol and its start and reversed attributes.",
          examples: [
            { code: `<ol>
  <li>Preheat the oven</li>
  <li>Mix the batter</li>
  <li>Bake for 25 minutes</li>
</ol>`, notes: [{ at: "<ol>", text: "numbered items" }] },
            { code: `<ol start="5">
  <li>Fifth place</li>
  <li>Sixth place</li>
</ol>`, notes: [{ at: "start=\"5\"", text: "first number shown" }] },
            { code: `<ol reversed>
  <li>Bronze</li>
  <li>Silver</li>
  <li>Gold</li>
</ol>`, notes: [{ at: "reversed", text: "counts down" }] }
          ]
        },
        {
          id: "description-lists", n: 3, title: "description lists", level: 2,
          gloss: "Pairs terms with descriptions using dl, dt and dd.",
          examples: [
            { code: `<dl>
  <dt>HTML</dt>
  <dd>Markup for document structure</dd>
  <dt>CSS</dt>
  <dd>Rules for presentation</dd>
</dl>`, notes: [{ at: "<dt>", text: "the term" }, { at: "<dd>", text: "its description" }] },
            { code: `<dl>
  <dt>Status</dt>
  <dd>Shipped</dd>
  <dt>Carrier</dt>
  <dd>Northline</dd>
</dl>`, notes: [{ at: "<dl>", text: "groups term and value pairs" }] },
            { code: `<dl>
  <dt>Email</dt>
  <dd>ada@example.com</dd>
  <dd>support@example.com</dd>
</dl>`, notes: [{ at: "<dd>support@example.com</dd>", text: "one term, many values" }] }
          ]
        },
        {
          id: "nested-lists", n: 4, title: "nested lists", level: 2,
          gloss: "Nests one list inside a list item to show hierarchy.",
          examples: [
            { code: `<ul>
  <li>Fruit
    <ul>
      <li>Apples</li>
      <li>Pears</li>
    </ul>
  </li>
  <li>Grains</li>
</ul>`, notes: [{ at: "<li>Fruit", text: "parent item stays open" }] },
            { code: `<ol>
  <li>Install
    <ol>
      <li>Download</li>
      <li>Verify</li>
    </ol>
  </li>
  <li>Configure</li>
</ol>`, notes: [{ at: "<li>Install", text: "inner list sits inside the item" }] },
            { code: `<ul>
  <li>Docs
    <ul>
      <li>Guides</li>
      <li>Reference</li>
    </ul>
  </li>
</ul>`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "tables",
      n: 5,
      title: "tables",
      concepts: [
        {
          id: "table-basics", n: 1, title: "rows and cells", level: 1,
          gloss: "Lays out data with table, thead, tbody, tr, th and td.",
          examples: [
            { code: `<table>
  <thead>
    <tr><th>Item</th><th>Qty</th></tr>
  </thead>
  <tbody>
    <tr><td>Pens</td><td>12</td></tr>
    <tr><td>Paper</td><td>4</td></tr>
  </tbody>
</table>`, notes: [{ at: "<thead>", text: "header rows" }, { at: "<tbody>", text: "data rows" }] },
            { code: `<table>
  <tr>
    <th>City</th>
    <th>Population</th>
  </tr>
  <tr>
    <td>Oslo</td>
    <td>709000</td>
  </tr>
</table>`, notes: [{ at: "<th>City</th>", text: "header cell" }, { at: "<td>Oslo</td>", text: "data cell" }] },
            { code: `<table>
  <thead>
    <tr><th>Day</th><th>Sales</th></tr>
  </thead>
  <tbody>
    <tr><td>Mon</td><td>320</td></tr>
    <tr><td>Tue</td><td>275</td></tr>
  </tbody>
</table>`, notes: [{ at: "<tr>", text: "one row" }] }
          ]
        },
        {
          id: "caption-scope", n: 2, title: "captions and scope", level: 2,
          gloss: "Names a table with caption and ties headers to cells with scope.",
          examples: [
            { code: `<table>
  <caption>Team scores</caption>
  <tr>
    <th scope="col">Team</th>
    <th scope="col">Points</th>
  </tr>
  <tr>
    <th scope="row">Reds</th>
    <td>41</td>
  </tr>
</table>`, notes: [{ at: "<caption>", text: "accessible table name" }, { at: "scope=\"col\"", text: "header for a column" }, { at: "scope=\"row\"", text: "header for a row" }] },
            { code: `<table>
  <caption>Monthly costs</caption>
  <tr>
    <th scope="col">Item</th>
    <th scope="col">Cost</th>
  </tr>
  <tr>
    <td>Hosting</td>
    <td>24</td>
  </tr>
</table>`, notes: [{ at: "<caption>Monthly costs</caption>", text: "first child of the table" }] },
            { code: `<table>
  <caption>Opening hours</caption>
  <tr>
    <th scope="row">Weekdays</th>
    <td>9 to 17</td>
  </tr>
  <tr>
    <th scope="row">Weekends</th>
    <td>Closed</td>
  </tr>
</table>`, notes: [] }
          ]
        },
        {
          id: "spanning-cells", n: 3, title: "spanning cells", level: 3,
          gloss: "Merges cells across columns and rows with colspan and rowspan.",
          examples: [
            { code: `<table>
  <tr>
    <th colspan="2">Contact</th>
  </tr>
  <tr>
    <td>Name</td>
    <td>Ada Lovelace</td>
  </tr>
</table>`, notes: [{ at: "colspan=\"2\"", text: "spans two columns" }] },
            { code: `<table>
  <tr>
    <th rowspan="2">Region</th>
    <td>North</td>
  </tr>
  <tr>
    <td>South</td>
  </tr>
</table>`, notes: [{ at: "rowspan=\"2\"", text: "spans two rows" }] },
            { code: `<table>
  <tbody>
    <tr><td>Tea</td><td>3.50</td></tr>
    <tr><td>Cake</td><td>4.25</td></tr>
  </tbody>
  <tfoot>
    <tr><td colspan="2">Prices include tax</td></tr>
  </tfoot>
</table>`, notes: [{ at: "<tfoot>", text: "footer rows" }] }
          ]
        }
      ]
    },
    {
      id: "forms",
      n: 6,
      title: "forms",
      concepts: [
        {
          id: "form-submit", n: 1, title: "form, action and method", level: 1,
          gloss: "Sends field values to a server with form, action and method.",
          examples: [
            { code: `<form action="/search" method="get">
  <input type="search" name="q">
  <button type="submit">Search</button>
</form>`, notes: [{ at: "action=\"/search\"", text: "where the data goes" }, { at: "method=\"get\"", text: "values in the url" }] },
            { code: `<form action="/login" method="post">
  <input type="email" name="email">
  <input type="password" name="password">
  <button type="submit">Sign in</button>
</form>`, notes: [{ at: "method=\"post\"", text: "values in the request body" }, { at: "name=\"email\"", text: "key sent to the server" }] },
            { code: `<form action="/avatar" method="post" enctype="multipart/form-data">
  <input type="file" name="photo">
  <button type="submit">Upload</button>
</form>`, notes: [{ at: "enctype=\"multipart/form-data\"", text: "required for files" }] }
          ]
        },
        {
          id: "label-input", n: 2, title: "labels and inputs", level: 1,
          gloss: "Pairs each field with a label through for and id.",
          examples: [
            { code: `<label for="email">Email</label>
<input id="email" name="email" type="email">`, notes: [{ at: "for=\"email\"", text: "matches the input id" }] },
            { code: `<label>
  Name
  <input name="name" type="text">
</label>`, notes: [{ at: "<label>", text: "wraps its field, no id needed" }] },
            { code: `<input id="news" name="news" type="checkbox">
<label for="news">Send me updates</label>`, notes: [{ at: "for=\"news\"", text: "click the text to toggle" }] }
          ]
        },
        {
          id: "input-types", n: 3, title: "input types", level: 1,
          gloss: "Picks a field kind with the type attribute of input.",
          examples: [
            { code: `<input type="email" name="email">
<input type="password" name="password">`, notes: [{ at: "type=\"email\"", text: "email keyboard and check" }, { at: "type=\"password\"", text: "hides typed text" }] },
            { code: `<input type="checkbox" name="terms" value="yes">
<input type="radio" name="plan" value="free">
<input type="radio" name="plan" value="pro">`, notes: [{ at: "type=\"radio\"", text: "one choice per name" }] },
            { code: `<input type="date" name="start">
<input type="number" name="seats">
<input type="range" name="volume">`, notes: [{ at: "type=\"date\"", text: "date picker" }] }
          ]
        },
        {
          id: "select-options", n: 4, title: "select and datalist", level: 2,
          gloss: "Offers choices with select and option, or suggestions with datalist.",
          examples: [
            { code: `<select name="size">
  <option value="s">Small</option>
  <option value="m" selected>Medium</option>
  <option value="l">Large</option>
</select>`, notes: [{ at: "selected", text: "preselected choice" }, { at: "value=\"s\"", text: "value sent on submit" }] },
            { code: `<select name="city">
  <optgroup label="Europe">
    <option>Paris</option>
    <option>Rome</option>
  </optgroup>
  <optgroup label="Asia">
    <option>Tokyo</option>
  </optgroup>
</select>`, notes: [{ at: "<optgroup label=\"Europe\">", text: "labeled group of options" }] },
            { code: `<input name="browser" list="browsers">
<datalist id="browsers">
  <option value="Firefox">
  <option value="Safari">
</datalist>`, notes: [{ at: "list=\"browsers\"", text: "links to the datalist id" }] }
          ]
        },
        {
          id: "textarea-buttons", n: 5, title: "textarea and buttons", level: 2,
          gloss: "Collects long text with textarea and triggers actions with button types.",
          examples: [
            { code: `<textarea name="note" rows="4" cols="40"></textarea>`, notes: [{ at: "rows=\"4\"", text: "visible lines" }] },
            { code: `<button type="submit">Save</button>
<button type="reset">Clear</button>
<button type="button">Preview</button>`, notes: [{ at: "type=\"reset\"", text: "restores starting values" }, { at: "type=\"button\"", text: "does nothing by itself" }] },
            { code: `<textarea name="bio" rows="3">Hello there</textarea>`, notes: [{ at: "Hello there", text: "default text sits between tags" }] }
          ]
        }
      ]
    },
    {
      id: "validation-attributes",
      n: 7,
      title: "validation attributes",
      concepts: [
        {
          id: "required-fields", n: 1, title: "required fields", level: 1,
          gloss: "Blocks empty submission with the required attribute.",
          examples: [
            { code: `<input name="email" type="email" required>`, notes: [{ at: "required", text: "must not be empty" }] },
            { code: `<select name="plan" required>
  <option value="">Choose a plan</option>
  <option value="pro">Pro</option>
</select>`, notes: [{ at: "value=\"\"", text: "empty value fails required" }] },
            { code: `<input id="terms" name="terms" type="checkbox" required>
<label for="terms">I agree to the terms</label>`, notes: [{ at: "type=\"checkbox\" required", text: "must be ticked" }] }
          ]
        },
        {
          id: "pattern-match", n: 2, title: "pattern", level: 2,
          gloss: "Constrains text to a regular expression with pattern and title.",
          examples: [
            { code: `<input name="zip" pattern="[0-9]{5}" title="Five digits">`, notes: [{ at: "pattern=\"[0-9]{5}\"", text: "regex for the whole value" }, { at: "title=\"Five digits\"", text: "shown with the error" }] },
            { code: `<input name="code" pattern="[A-Z]{3}-[0-9]{3}" title="Format ABC-123">`, notes: [{ at: "[A-Z]{3}", text: "three capital letters" }] },
            { code: `<input name="user" pattern="[a-z0-9_]{3,16}" title="3 to 16 characters">`, notes: [{ at: "{3,16}", text: "length range" }] }
          ]
        },
        {
          id: "range-limits", n: 3, title: "numeric and date limits", level: 2,
          gloss: "Bounds numbers and dates with min, max and step.",
          examples: [
            { code: `<input type="number" name="qty" min="1" max="10" step="1">`, notes: [{ at: "min=\"1\"", text: "lowest allowed value" }, { at: "step=\"1\"", text: "allowed increments" }] },
            { code: `<input type="date" name="start" min="2026-01-01" max="2026-12-31">`, notes: [{ at: "max=\"2026-12-31\"", text: "latest allowed date" }] },
            { code: `<input type="range" name="volume" min="0" max="100" step="5">`, notes: [{ at: "step=\"5\"", text: "slider moves in fives" }] }
          ]
        },
        {
          id: "length-limits", n: 4, title: "length limits", level: 2,
          gloss: "Limits text length with minlength and maxlength.",
          examples: [
            { code: `<input name="user" minlength="3" maxlength="16">`, notes: [{ at: "minlength=\"3\"", text: "checked on submit" }, { at: "maxlength=\"16\"", text: "stops further typing" }] },
            { code: `<textarea name="bio" maxlength="280"></textarea>`, notes: [{ at: "maxlength=\"280\"", text: "works on textarea too" }] },
            { code: `<input name="password" type="password" minlength="12">`, notes: [{ at: "minlength=\"12\"", text: "shortest allowed value" }] }
          ]
        },
        {
          id: "autocomplete-inputmode", n: 5, title: "autocomplete and inputmode", level: 3,
          gloss: "Hints keyboards and autofill with autocomplete and inputmode.",
          examples: [
            { code: `<input name="email" type="email" autocomplete="email">`, notes: [{ at: "autocomplete=\"email\"", text: "lets the browser fill it" }] },
            { code: `<input name="card" inputmode="numeric" autocomplete="cc-number">`, notes: [{ at: "inputmode=\"numeric\"", text: "number pad on phones" }, { at: "cc-number", text: "payment card field" }] },
            { code: `<input name="pass" type="password" autocomplete="new-password">`, notes: [{ at: "new-password", text: "offers a generated password" }] }
          ]
        }
      ]
    },
    {
      id: "semantic-layout",
      n: 8,
      title: "semantic layout",
      concepts: [
        {
          id: "landmarks", n: 1, title: "page landmarks", level: 1,
          gloss: "Marks page regions with header, nav, main and footer.",
          examples: [
            { code: `<header>
  <h1>Field Notes</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>`, notes: [{ at: "<header>", text: "intro or banner area" }, { at: "<nav>", text: "main navigation links" }] },
            { code: `<main>
  <h2>Latest posts</h2>
</main>
<footer>
  <p>Copyright 2026 Field Notes</p>
</footer>`, notes: [{ at: "<main>", text: "one per page" }, { at: "<footer>", text: "closing information" }] },
            { code: `<body>
  <header>Site name</header>
  <main>Content</main>
  <footer>Contact</footer>
</body>`, notes: [] }
          ]
        },
        {
          id: "article-section", n: 2, title: "article and section", level: 2,
          gloss: "Groups content with article, section and a heading for each.",
          examples: [
            { code: `<article>
  <h2>Why we moved to Postgres</h2>
  <p>Our reasons, in short.</p>
</article>`, notes: [{ at: "<article>", text: "stands alone when shared" }] },
            { code: `<section>
  <h2>Features</h2>
  <p>Small, local and private.</p>
</section>`, notes: [{ at: "<section>", text: "themed group with a heading" }] },
            { code: `<article>
  <h2>Trip report</h2>
  <section>
    <h3>Day one</h3>
  </section>
  <section>
    <h3>Day two</h3>
  </section>
</article>`, notes: [{ at: "<section>", text: "parts of one article" }] }
          ]
        },
        {
          id: "aside-time-address", n: 3, title: "aside, time and address", level: 2,
          gloss: "Adds side notes, dates and contact details with aside, time and address.",
          examples: [
            { code: `<aside>
  <h2>Related</h2>
  <a href="/guides">All guides</a>
</aside>`, notes: [{ at: "<aside>", text: "tangential content" }] },
            { code: `<p>Published on <time datetime="2026-11-07">7 November 2026</time></p>`, notes: [{ at: "datetime=\"2026-11-07\"", text: "machine readable date" }] },
            { code: `<address>
  Ada Lovelace<br>
  <a href="mailto:ada@example.com">ada@example.com</a>
</address>`, notes: [{ at: "<address>", text: "contact for the nearest article" }] }
          ]
        }
      ]
    },
    {
      id: "media-embeds",
      n: 9,
      title: "media & embeds",
      concepts: [
        {
          id: "audio", n: 1, title: "audio", level: 1,
          gloss: "Plays sound with audio, the controls attribute and source fallbacks.",
          examples: [
            { code: `<audio src="/media/intro.mp3" controls></audio>`, notes: [{ at: "controls", text: "shows the player ui" }] },
            { code: `<audio controls>
  <source src="/media/talk.ogg" type="audio/ogg">
  <source src="/media/talk.mp3" type="audio/mpeg">
  Your browser does not support audio.
</audio>`, notes: [{ at: "<source", text: "first playable file wins" }, { at: "Your browser does not support audio.", text: "fallback text" }] },
            { code: `<audio src="/media/episode-12.mp3" controls preload="none"></audio>`, notes: [{ at: "preload=\"none\"", text: "nothing downloads early" }] }
          ]
        },
        {
          id: "video", n: 2, title: "video", level: 1,
          gloss: "Plays video with controls, poster and source elements.",
          examples: [
            { code: `<video src="/media/demo.mp4" controls width="640"></video>`, notes: [{ at: "width=\"640\"", text: "display width in pixels" }] },
            { code: `<video
  src="/media/tour.mp4"
  poster="/img/tour.jpg"
  controls
></video>`, notes: [{ at: "poster=\"/img/tour.jpg\"", text: "image shown before play" }] },
            { code: `<video controls>
  <source src="/media/clip.webm" type="video/webm">
  <source src="/media/clip.mp4" type="video/mp4">
</video>`, notes: [{ at: "type=\"video/webm\"", text: "lets the browser skip early" }] }
          ]
        },
        {
          id: "track-captions", n: 3, title: "captions and tracks", level: 2,
          gloss: "Adds captions to media with a track element.",
          examples: [
            { code: `<video src="/media/talk.mp4" controls>
  <track
    kind="captions"
    src="/media/talk.en.vtt"
    srclang="en"
    label="English"
    default
  >
</video>`, notes: [{ at: "kind=\"captions\"", text: "speech and sounds as text" }, { at: "default", text: "on unless the viewer changes it" }] },
            { code: `<video src="/media/film.mp4" controls>
  <track kind="subtitles" src="/media/film.fr.vtt" srclang="fr">
  <track kind="subtitles" src="/media/film.es.vtt" srclang="es">
</video>`, notes: [{ at: "kind=\"subtitles\"", text: "translation of speech" }] },
            { code: `<video src="/media/course.mp4" controls>
  <track kind="chapters" src="/media/course.chapters.vtt">
</video>`, notes: [{ at: "kind=\"chapters\"", text: "named jump points" }] }
          ]
        },
        {
          id: "iframe-embed", n: 4, title: "iframes", level: 2,
          gloss: "Embeds another page with iframe, a title and a sandbox.",
          examples: [
            { code: `<iframe src="https://example.com/map" title="Store map"></iframe>`, notes: [{ at: "title=\"Store map\"", text: "names the frame for screen readers" }] },
            { code: `<iframe
  src="https://example.com/video"
  title="Product tour"
  width="560"
  height="315"
  loading="lazy"
></iframe>`, notes: [{ at: "loading=\"lazy\"", text: "defers offscreen frames" }] },
            { code: `<iframe
  src="https://example.com/widget"
  title="Booking widget"
  sandbox="allow-scripts allow-forms"
></iframe>`, notes: [{ at: "sandbox=", text: "restricts what the frame may do" }] }
          ]
        }
      ]
    },
    {
      id: "data-and-aria-attributes",
      n: 10,
      title: "data and aria attributes",
      concepts: [
        {
          id: "data-attributes", n: 1, title: "data attributes", level: 1,
          gloss: "Stores custom values on elements with data attributes.",
          examples: [
            { code: `<li data-id="42" data-status="open">Fix login</li>`, notes: [{ at: "data-id=\"42\"", text: "read in script as dataset.id" }] },
            { code: `<button data-action="delete" data-row="7">Delete</button>`, notes: [{ at: "data-action=\"delete\"", text: "hook for event handlers" }] },
            { code: `<div data-user-id="9" data-role="admin">Ada</div>`, notes: [{ at: "data-user-id", text: "read in script with camel case" }] }
          ]
        },
        {
          id: "aria-labels", n: 2, title: "aria labels", level: 2,
          gloss: "Names unlabeled controls with aria-label and aria-labelledby.",
          examples: [
            { code: `<button aria-label="Close dialog">X</button>`, notes: [{ at: "aria-label=", text: "text for assistive tech" }] },
            { code: `<nav aria-label="Breadcrumb">
  <a href="/">Home</a>
  <a href="/shop">Shop</a>
</nav>`, notes: [{ at: "aria-label=\"Breadcrumb\"", text: "tells landmarks apart" }] },
            { code: `<h2 id="billing-title">Billing</h2>
<section aria-labelledby="billing-title">
  <p>Invoices and cards.</p>
</section>`, notes: [{ at: "aria-labelledby=", text: "points at another id" }] }
          ]
        },
        {
          id: "aria-state", n: 3, title: "aria state and live regions", level: 3,
          gloss: "Exposes state with aria-expanded, aria-controls, aria-live and aria-invalid.",
          examples: [
            { code: `<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden></ul>`, notes: [{ at: "aria-expanded=\"false\"", text: "panel is collapsed" }, { at: "aria-controls=\"menu\"", text: "the element it toggles" }] },
            { code: `<p aria-live="polite">3 items in the cart</p>`, notes: [{ at: "aria-live=\"polite\"", text: "announces changes when idle" }] },
            { code: `<input aria-invalid="true" aria-describedby="email-error">
<p id="email-error">Enter a valid email</p>`, notes: [{ at: "aria-invalid=\"true\"", text: "marks the field as wrong" }, { at: "aria-describedby=", text: "links the error text" }] }
          ]
        },
        {
          id: "roles-hidden", n: 4, title: "roles and aria-hidden", level: 3,
          gloss: "Adds meaning with role and hides decoration with aria-hidden.",
          examples: [
            { code: `<div role="alert">Payment failed</div>`, notes: [{ at: "role=\"alert\"", text: "announced right away" }] },
            { code: `<p>Name <span aria-hidden="true">*</span></p>`, notes: [{ at: "aria-hidden=\"true\"", text: "skipped by screen readers" }] },
            { code: `<div
  role="progressbar"
  aria-valuenow="40"
  aria-valuemin="0"
  aria-valuemax="100"
></div>`, notes: [{ at: "aria-valuenow=\"40\"", text: "current value" }] }
          ]
        }
      ]
    },
    {
      id: "head-meta-tags",
      n: 11,
      title: "head & meta tags",
      concepts: [
        {
          id: "meta-basics", n: 1, title: "meta basics", level: 1,
          gloss: "Sets page metadata with meta charset, viewport and description.",
          examples: [
            { code: `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">`, notes: [{ at: "charset=\"utf-8\"", text: "must be in the first 1024 bytes" }, { at: "width=device-width", text: "matches the screen width" }] },
            { code: `<meta name="description" content="Track orders and returns.">`, notes: [{ at: "name=\"description\"", text: "snippet in search results" }] },
            { code: `<meta name="robots" content="noindex">
<meta name="theme-color" content="#1a1a1a">`, notes: [{ at: "noindex", text: "keeps the page out of search" }, { at: "theme-color", text: "tints the browser bar" }] }
          ]
        },
        {
          id: "link-tags", n: 2, title: "link tags", level: 2,
          gloss: "Connects stylesheets, icons and preloaded files with link elements.",
          examples: [
            { code: `<link rel="stylesheet" href="/css/site.css">`, notes: [{ at: "rel=\"stylesheet\"", text: "relationship of the file" }] },
            { code: `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`, notes: [{ at: "rel=\"icon\"", text: "tab icon" }] },
            { code: `<link
  rel="preload"
  href="/fonts/body.woff2"
  as="font"
  type="font/woff2"
  crossorigin
>`, notes: [{ at: "rel=\"preload\"", text: "fetch early" }, { at: "as=\"font\"", text: "sets request priority" }] }
          ]
        },
        {
          id: "script-loading", n: 3, title: "script loading", level: 2,
          gloss: "Loads scripts with defer, async and module types.",
          examples: [
            { code: `<script src="/js/app.js" defer></script>`, notes: [{ at: "defer", text: "runs after parsing, in order" }] },
            { code: `<script src="/js/analytics.js" async></script>`, notes: [{ at: "async", text: "runs as soon as it loads" }] },
            { code: `<script type="module" src="/js/main.js"></script>`, notes: [{ at: "type=\"module\"", text: "deferred by default" }] }
          ]
        },
        {
          id: "social-meta", n: 4, title: "link preview tags", level: 3,
          gloss: "Describes link previews with Open Graph and card meta tags.",
          examples: [
            { code: `<meta property="og:title" content="Field Notes">
<meta property="og:type" content="website">`, notes: [{ at: "property=\"og:title\"", text: "title in shared links" }] },
            { code: `<meta property="og:image" content="https://example.com/cover.png">
<meta property="og:url" content="https://example.com/">`, notes: [{ at: "og:image", text: "preview picture" }] },
            { code: `<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Field Notes">`, notes: [{ at: "summary_large_image", text: "big image layout" }] }
          ]
        }
      ]
    },
    {
      id: "details-dialog-template",
      n: 12,
      title: "details, dialog, template",
      concepts: [
        {
          id: "details-summary", n: 1, title: "details and summary", level: 1,
          gloss: "Reveals hidden content with details and summary.",
          examples: [
            { code: `<details>
  <summary>Shipping policy</summary>
  <p>Orders ship in two days.</p>
</details>`, notes: [{ at: "<summary>", text: "always visible label" }] },
            { code: `<details open>
  <summary>Order notes</summary>
  <p>Leave the parcel at the door.</p>
</details>`, notes: [{ at: "open", text: "starts expanded" }] },
            { code: `<details>
  <summary>Included files</summary>
  <ul>
    <li>readme.txt</li>
    <li>license.txt</li>
  </ul>
</details>`, notes: [] }
          ]
        },
        {
          id: "details-accordion", n: 2, title: "accordion groups", level: 2,
          gloss: "Groups details elements into an accordion with a shared name.",
          examples: [
            { code: `<details name="faq">
  <summary>How do I reset my password?</summary>
  <p>Use the reset link on the sign-in page.</p>
</details>
<details name="faq">
  <summary>Can I change my plan?</summary>
  <p>Yes, from the billing page.</p>
</details>`, notes: [{ at: "name=\"faq\"", text: "only one stays open" }] },
            { code: `<details name="steps" open>
  <summary>Step one</summary>
  <p>Create an account.</p>
</details>
<details name="steps">
  <summary>Step two</summary>
  <p>Verify your email.</p>
</details>`, notes: [{ at: "open", text: "the one shown first" }] },
            { code: `<details name="specs">
  <summary>Battery</summary>
  <p>Ten hours of use.</p>
</details>
<details name="specs">
  <summary>Display</summary>
  <p>Six inch panel.</p>
</details>
<details name="specs">
  <summary>Weight</summary>
  <p>180 grams.</p>
</details>`, notes: [] }
          ]
        },
        {
          id: "dialog-element", n: 3, title: "dialog", level: 2,
          gloss: "Shows modal content with dialog and a form whose method is dialog.",
          examples: [
            { code: `<dialog id="confirm">
  <p>Delete this file?</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="ok">Delete</button>
  </form>
</dialog>`, notes: [{ at: "method=\"dialog\"", text: "closes the dialog on submit" }, { at: "value=\"ok\"", text: "becomes the dialog result" }] },
            { code: `<dialog open>
  <p>Changes saved.</p>
</dialog>`, notes: [{ at: "open", text: "shown without script" }] },
            { code: `<dialog id="rename">
  <form method="dialog">
    <input name="title" autofocus>
    <button>Rename</button>
  </form>
</dialog>`, notes: [{ at: "autofocus", text: "focus lands here on open" }] }
          ]
        },
        {
          id: "template-element", n: 4, title: "template", level: 3,
          gloss: "Holds inert markup in a template element for later cloning.",
          examples: [
            { code: `<template id="row">
  <tr>
    <td></td>
    <td></td>
  </tr>
</template>`, notes: [{ at: "<template id=\"row\">", text: "not rendered or loaded" }] },
            { code: `<template id="card">
  <article class="card">
    <h3></h3>
    <p></p>
  </article>
</template>`, notes: [{ at: "id=\"card\"", text: "how script finds it" }] },
            { code: `<template id="tag">
  <li class="tag"></li>
</template>
<ul id="tags"></ul>`, notes: [{ at: "id=\"tags\"", text: "where clones are added" }] }
          ]
        }
      ]
    }
  ]
};
