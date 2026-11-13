export default {
  id: "json",
  name: "JSON",
  short: "JSN",
  pigment: "json",
  family: null,
  version: "RFC 8259",
  lexer: "json",
  indent: 2,
  topics: [
    {
      id: "values",
      n: 1,
      title: "values",
      concepts: [
        {
          id: "strings-numbers", n: 1, title: "strings and numbers", level: 1,
          gloss: "Writes the two scalar types that carry most JSON data.",
          examples: [
            { code: `{
  "city": "Oslo",
  "population": 709000
}`, notes: [{ at: "\"Oslo\"", text: "string in double quotes" }, { at: "709000", text: "number with no quotes" }] },
            { code: `{
  "title": "Annual report",
  "pages": 48,
  "rating": 4.5
}`, notes: [] },
            { code: `{
  "sku": "A-1042",
  "stock": 120,
  "weight": 0.75
}`, notes: [] }
          ]
        },
        {
          id: "booleans-null", n: 2, title: "booleans and null", level: 1,
          gloss: "Writes true, false and null as bare lowercase literals.",
          examples: [
            { code: `{
  "active": true,
  "verified": false,
  "deleted_at": null
}`, notes: [{ at: "null", text: "no value" }] },
            { code: `{
  "in_stock": true,
  "backorder": false,
  "discount": null
}`, notes: [] },
            { code: `{
  "admin": false,
  "last_login": null,
  "newsletter": true
}`, notes: [] }
          ]
        },
        {
          id: "whitespace", n: 3, title: "whitespace and layout", level: 1,
          gloss: "Lays out one document compactly or indented without changing its meaning.",
          examples: [
            { code: `{"id":7,"name":"Ada","admin":true}`, notes: [{ at: "{\"id\":7", text: "compact form" }] },
            { code: `{
  "id": 7,
  "name": "Ada",
  "admin": true
}`, notes: [] },
            { code: `{"id": 7,
 "name": "Ada",
 "admin": true}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "strings",
      n: 2,
      title: "strings",
      concepts: [
        {
          id: "escapes", n: 1, title: "escape sequences", level: 1,
          gloss: "Escapes quotes, backslashes and control characters inside a string.",
          examples: [
            { code: `{
  "quote": "She said \\"hello\\"",
  "path": "C:\\\\Users\\\\ada"
}`, notes: [{ at: "\\\"", text: "escaped quote" }, { at: "\\\\", text: "escaped backslash" }] },
            { code: `{
  "text": "line one\\nline two",
  "tabbed": "name\\tvalue"
}`, notes: [{ at: "\\n", text: "newline" }, { at: "\\t", text: "tab" }] },
            { code: `{
  "regex": "^\\\\d{3}-\\\\d{4}$",
  "slash": "a\\/b"
}`, notes: [] }
          ]
        },
        {
          id: "unicode", n: 2, title: "unicode escapes", level: 2,
          gloss: "Encodes characters as four-digit hex escapes or writes them directly.",
          examples: [
            { code: `{
  "copyright": "\\u00a9 2026",
  "euro": "\\u20ac"
}`, notes: [{ at: "\\u00a9", text: "four hex digits" }] },
            { code: `{
  "greeting": "Gr\\u00fc\\u00dfe",
  "plain": "Gruesse"
}`, notes: [] },
            { code: `{
  "emoji": "\\ud83d\\ude00",
  "smile": "\\u263a"
}`, notes: [{ at: "\\ud83d\\ude00", text: "surrogate pair" }] }
          ]
        },
        {
          id: "line-breaks", n: 3, title: "line breaks in strings", level: 2,
          gloss: "Stores line breaks with \\n because a raw newline cannot appear in a string.",
          examples: [
            { code: `{
  "poem": "first line\\nsecond line\\nthird line"
}`, notes: [] },
            { code: `{
  "address": "12 Rose Street\\nSuite 4\\nOslo 0150"
}`, notes: [] },
            { code: `{
  "message": "Dear Ada,\\n\\nYour order has shipped.\\n\\nSupport"
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "numbers",
      n: 3,
      title: "numbers",
      concepts: [
        {
          id: "integers-decimals", n: 1, title: "integers and decimals", level: 1,
          gloss: "Writes integers and decimals without leading zeros or a plus sign.",
          examples: [
            { code: `{
  "count": 0,
  "delta": -12,
  "pi": 3.14159
}`, notes: [{ at: "-12", text: "minus sign allowed" }] },
            { code: `{
  "year": 2026,
  "offset": -5,
  "ratio": 0.25
}`, notes: [] },
            { code: `{
  "quantity": 42,
  "price": 19.99,
  "tax": 0.2
}`, notes: [] }
          ]
        },
        {
          id: "exponents", n: 2, title: "exponent notation", level: 2,
          gloss: "Writes very large or very small values with an e exponent.",
          examples: [
            { code: `{
  "avogadro": 6.022e23,
  "planck": 6.626e-34
}`, notes: [{ at: "e23", text: "times ten to the 23" }] },
            { code: `{
  "speed_of_light": 3E8,
  "epsilon": 1e-9
}`, notes: [] },
            { code: `{
  "distance_km": 1.496e8,
  "mass_kg": 5.972E+24
}`, notes: [] }
          ]
        },
        {
          id: "special-values", n: 3, title: "special values", level: 3,
          gloss: "Stores missing numbers as null because NaN and Infinity are not valid JSON.",
          examples: [
            { code: `{
  "average": null,
  "samples": 0
}`, notes: [] },
            { code: `{
  "limit": "Infinity",
  "unit": "ms"
}`, notes: [] },
            { code: `{
  "score": null,
  "reason": "not graded"
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "objects",
      n: 4,
      title: "objects",
      concepts: [
        {
          id: "keys-values", n: 1, title: "keys and values", level: 1,
          gloss: "Pairs double-quoted string keys with values inside braces.",
          examples: [
            { code: `{
  "first": "Ada",
  "last": "Lovelace"
}`, notes: [{ at: "\"first\"", text: "key" }] },
            { code: `{
  "host": "localhost",
  "port": 5432
}`, notes: [] },
            { code: `{
  "sku": "A-1042",
  "qty": 3,
  "gift": false
}`, notes: [] }
          ]
        },
        {
          id: "empty-objects", n: 2, title: "empty objects", level: 1,
          gloss: "Writes an empty object as a pair of braces with nothing between them.",
          examples: [
            { code: `{
  "metadata": {},
  "id": 12
}`, notes: [{ at: "{}", text: "empty object" }] },
            { code: `{
  "headers": {},
  "body": null
}`, notes: [] },
            { code: `{
  "settings": {}
}`, notes: [] }
          ]
        },
        {
          id: "unique-keys", n: 3, title: "unique keys", level: 2,
          gloss: "Uses each key once per object because duplicate keys behave unpredictably.",
          examples: [
            { code: `{
  "en": "Hello",
  "fr": "Bonjour",
  "de": "Hallo"
}`, notes: [] },
            { code: `{
  "x": 10,
  "y": 20,
  "z": 30
}`, notes: [] },
            { code: `{
  "mon": 8,
  "tue": 7.5,
  "wed": 8
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "arrays",
      n: 5,
      title: "arrays",
      concepts: [
        {
          id: "lists", n: 1, title: "lists of values", level: 1,
          gloss: "Writes an ordered list of values between square brackets.",
          examples: [
            { code: `{
  "primes": [2, 3, 5, 7, 11]
}`, notes: [{ at: "[2", text: "array start" }] },
            { code: `{
  "tags": ["json", "api", "config"]
}`, notes: [] },
            { code: `{
  "flags": [true, false, true]
}`, notes: [] }
          ]
        },
        {
          id: "arrays-of-objects", n: 2, title: "arrays of objects", level: 1,
          gloss: "Holds several objects in one array to model table rows.",
          examples: [
            { code: `{
  "users": [
    {"id": 1, "name": "Ada"},
    {"id": 2, "name": "Grace"}
  ]
}`, notes: [] },
            { code: `{
  "items": [
    {"sku": "A-1", "qty": 2},
    {"sku": "B-7", "qty": 1}
  ]
}`, notes: [] },
            { code: `{
  "points": [
    {"x": 0, "y": 0},
    {"x": 4, "y": 9}
  ]
}`, notes: [] }
          ]
        },
        {
          id: "arrays-of-arrays", n: 3, title: "arrays of arrays", level: 2,
          gloss: "Nests arrays to hold grids and coordinate pairs.",
          examples: [
            { code: `{
  "grid": [[1, 2], [3, 4]]
}`, notes: [] },
            { code: `{
  "path": [[0, 0], [2, 3], [5, 1]],
  "closed": false
}`, notes: [] },
            { code: `{
  "rows": [[], [1], [1, 2]]
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "nesting",
      n: 6,
      title: "nesting",
      concepts: [
        {
          id: "nested-objects", n: 1, title: "nested objects", level: 1,
          gloss: "Places objects inside objects to group related fields.",
          examples: [
            { code: `{
  "user": {
    "name": "Ada",
    "address": {
      "city": "London",
      "zip": "N1 9GU"
    }
  }
}`, notes: [] },
            { code: `{
  "server": {
    "host": "localhost",
    "tls": {"enabled": true}
  }
}`, notes: [] },
            { code: `{
  "product": {
    "id": 9,
    "price": {"amount": 12.5, "currency": "EUR"}
  }
}`, notes: [] }
          ]
        },
        {
          id: "records", n: 2, title: "records with lists", level: 1,
          gloss: "Combines objects and arrays to describe a real record.",
          examples: [
            { code: `{
  "order": 1042,
  "lines": [
    {"sku": "A-1", "qty": 2},
    {"sku": "B-7", "qty": 1}
  ]
}`, notes: [] },
            { code: `{
  "team": "platform",
  "members": ["ada", "grace", "linus"]
}`, notes: [] },
            { code: `{
  "course": "Algebra",
  "grades": {"mid": [80, 92], "final": [88]}
}`, notes: [] }
          ]
        },
        {
          id: "root-values", n: 3, title: "top-level values", level: 2,
          gloss: "Uses any value, not only an object, as the whole document.",
          examples: [
            { code: `[1, 2, 3]`, notes: [{ at: "[1", text: "array as the root" }] },
            { code: `"plain text"`, notes: [] },
            { code: `[{"id": 1}, {"id": 2}]`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "api-responses",
      n: 7,
      title: "API responses",
      concepts: [
        {
          id: "envelope", n: 1, title: "response envelopes", level: 2,
          gloss: "Wraps results in an object with status, data and error fields.",
          examples: [
            { code: `{
  "status": "ok",
  "data": {"id": 7, "name": "Ada"},
  "error": null
}`, notes: [] },
            { code: `{
  "success": true,
  "result": [1, 2, 3]
}`, notes: [] },
            { code: `{
  "ok": true,
  "data": {"total": 42},
  "request_id": "r-9f3a"
}`, notes: [] }
          ]
        },
        {
          id: "pagination", n: 2, title: "pagination fields", level: 2,
          gloss: "Reports page, size and total counts beside the returned items.",
          examples: [
            { code: `{
  "items": [{"id": 1}, {"id": 2}],
  "page": 1,
  "per_page": 2,
  "total": 9
}`, notes: [] },
            { code: `{
  "data": [],
  "next_cursor": null,
  "has_more": false
}`, notes: [] },
            { code: `{
  "results": [{"id": 11}],
  "next": "/users?page=3",
  "previous": "/users?page=1"
}`, notes: [] }
          ]
        },
        {
          id: "error-payloads", n: 3, title: "error payloads", level: 2,
          gloss: "Describes a failure with a code, a message and field details.",
          examples: [
            { code: `{
  "error": {
    "code": 404,
    "message": "User not found"
  }
}`, notes: [] },
            { code: `{
  "errors": [
    {"field": "email", "message": "must be valid"}
  ]
}`, notes: [] },
            { code: `{
  "type": "validation_error",
  "status": 422,
  "detail": "age must be a number"
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "config-files",
      n: 8,
      title: "config files",
      concepts: [
        {
          id: "package-json", n: 1, title: "package.json", level: 2,
          gloss: "Describes a Node package with name, version, scripts and dependencies.",
          examples: [
            { code: `{
  "name": "billing-api",
  "version": "1.4.0",
  "private": true
}`, notes: [] },
            { code: `{
  "scripts": {
    "start": "node server.js",
    "test": "node --test"
  }
}`, notes: [] },
            { code: `{
  "dependencies": {
    "express": "^5.0.0"
  },
  "engines": {"node": ">=20"}
}`, notes: [] }
          ]
        },
        {
          id: "editor-settings", n: 2, title: "editor settings", level: 2,
          gloss: "Stores editor preferences as flat key-value pairs.",
          examples: [
            { code: `{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "files.autoSave": "afterDelay"
}`, notes: [] },
            { code: `{
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false
}`, notes: [] },
            { code: `{
  "workbench.colorTheme": "Default Dark Modern",
  "window.zoomLevel": 0
}`, notes: [] }
          ]
        },
        {
          id: "web-manifest", n: 3, title: "web app manifest", level: 3,
          gloss: "Declares the name, icons and display mode of an installable web app.",
          examples: [
            { code: `{
  "name": "Field Notes",
  "short_name": "Notes",
  "display": "standalone"
}`, notes: [] },
            { code: `{
  "start_url": "/",
  "theme_color": "#101418",
  "background_color": "#ffffff"
}`, notes: [] },
            { code: `{
  "icons": [
    {"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"}
  ]
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "json-schema",
      n: 9,
      title: "JSON Schema",
      concepts: [
        {
          id: "type-keyword", n: 1, title: "type keyword", level: 3,
          gloss: "Constrains a value to one JSON type with the type keyword.",
          examples: [
            { code: `{
  "type": "string"
}`, notes: [] },
            { code: `{
  "type": "array",
  "items": {"type": "integer"}
}`, notes: [] },
            { code: `{
  "type": ["string", "null"]
}`, notes: [] }
          ]
        },
        {
          id: "required-properties", n: 2, title: "required properties", level: 3,
          gloss: "Lists mandatory fields with required and describes each under properties.",
          examples: [
            { code: `{
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "age": {"type": "integer"}
  },
  "required": ["name"]
}`, notes: [] },
            { code: `{
  "type": "object",
  "properties": {"id": {"type": "integer"}},
  "required": ["id"],
  "additionalProperties": false
}`, notes: [] },
            { code: `{
  "type": "object",
  "properties": {"tags": {"type": "array"}},
  "required": []
}`, notes: [] }
          ]
        },
        {
          id: "value-limits", n: 3, title: "ranges, enums and patterns", level: 3,
          gloss: "Limits values with minimum, maximum, enum and pattern.",
          examples: [
            { code: `{
  "type": "integer",
  "minimum": 0,
  "maximum": 120
}`, notes: [] },
            { code: `{
  "type": "string",
  "enum": ["draft", "published", "archived"]
}`, notes: [] },
            { code: `{
  "type": "string",
  "pattern": "^[A-Z]{2}-\\\\d{4}$",
  "maxLength": 7
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "json-patch",
      n: 10,
      title: "pointer and patch",
      concepts: [
        {
          id: "json-pointer", n: 1, title: "JSON Pointer paths", level: 3,
          gloss: "Addresses a value inside a document with slash-separated path segments.",
          examples: [
            { code: `{
  "path": "/users/0/name"
}`, notes: [] },
            { code: `{
  "path": "/address/city"
}`, notes: [] },
            { code: `{
  "escaped": "/a~1b",
  "tilde": "/m~0n"
}`, notes: [] }
          ]
        },
        {
          id: "add-remove-replace", n: 2, title: "add, remove and replace", level: 3,
          gloss: "Edits a document with an array of add, remove and replace operations.",
          examples: [
            { code: `[
  {"op": "add", "path": "/email", "value": "ada@example.com"},
  {"op": "remove", "path": "/legacy_id"}
]`, notes: [] },
            { code: `[
  {"op": "replace", "path": "/status", "value": "shipped"}
]`, notes: [] },
            { code: `[
  {"op": "add", "path": "/tags/-", "value": "urgent"}
]`, notes: [] }
          ]
        },
        {
          id: "move-copy-test", n: 3, title: "move, copy and test", level: 3,
          gloss: "Relocates values with move and copy and guards a patch with test.",
          examples: [
            { code: `[
  {"op": "move", "from": "/old_name", "path": "/name"}
]`, notes: [] },
            { code: `[
  {"op": "copy", "from": "/billing", "path": "/shipping"}
]`, notes: [] },
            { code: `[
  {"op": "test", "path": "/version", "value": 3},
  {"op": "replace", "path": "/version", "value": 4}
]`, notes: [] }
          ]
        }
      ]
    }
  ]
};
