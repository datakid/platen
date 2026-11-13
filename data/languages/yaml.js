export default {
  id: "yaml",
  name: "YAML",
  short: "YML",
  pigment: "yaml",
  family: null,
  version: "1.2",
  lexer: "yaml",
  indent: 2,
  topics: [
    {
      id: "scalars",
      n: 1,
      title: "scalars",
      concepts: [
        {
          id: "strings-numbers", n: 1, title: "strings and numbers", level: 1,
          gloss: "Writes plain scalars that the parser reads as strings and numbers.",
          examples: [
            { code: `name: Ada
age: 36
score: 4.5`, notes: [{ at: "name:", text: "key then colon and space" }] },
            { code: `city: Oslo
population: 709000
area: 454.3`, notes: [] },
            { code: `sku: A-1042
stock: 120
weight: 0.75`, notes: [] }
          ]
        },
        {
          id: "booleans-null", n: 2, title: "booleans and null", level: 1,
          gloss: "Writes true, false and null, where a tilde or an empty value also means null.",
          examples: [
            { code: `active: true
verified: false
deleted_at: null`, notes: [] },
            { code: `admin: false
last_login: ~
newsletter: true`, notes: [{ at: "~", text: "also null" }] },
            { code: `enabled: true
proxy:
retries: 3`, notes: [{ at: "proxy:", text: "empty value is null" }] }
          ]
        },
        {
          id: "dates", n: 3, title: "dates and timestamps", level: 2,
          gloss: "Writes ISO 8601 dates and timestamps that parse as date values.",
          examples: [
            { code: `released: 2026-11-12`, notes: [] },
            { code: `created_at: 2026-11-12T09:30:00Z
expires: 2027-01-01`, notes: [] },
            { code: `start: 2026-03-01
end: 2026-03-31`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "quoting",
      n: 2,
      title: "quoting",
      concepts: [
        {
          id: "plain-vs-quoted", n: 1, title: "plain and quoted strings", level: 1,
          gloss: "Quotes a value when plain style would change its type.",
          examples: [
            { code: `version: "1.20"
zip: "02134"
enabled: "true"`, notes: [{ at: "\"1.20\"", text: "stays a string" }] },
            { code: `port: "8080"
name: ada`, notes: [] },
            { code: `build: "007"
flag: "no"
mode: strict`, notes: [] }
          ]
        },
        {
          id: "single-double", n: 2, title: "single and double quotes", level: 1,
          gloss: "Uses single quotes for literal text and double quotes for escape sequences.",
          examples: [
            { code: `path: 'C:\\Users\\ada'
quote: 'it''s fine'`, notes: [{ at: "''", text: "escaped single quote" }] },
            { code: `greeting: "line one\\nline two"
tabbed: "a\\tb"`, notes: [{ at: "\\n", text: "escape works in double quotes" }] },
            { code: `pattern: '^\\d{3}$'
label: "caf\\u00e9"`, notes: [] }
          ]
        },
        {
          id: "special-characters", n: 3, title: "special characters", level: 2,
          gloss: "Quotes values that hold a colon, a hash or a leading symbol.",
          examples: [
            { code: `time: "12:30"
url: "http://example.com:8080"`, notes: [] },
            { code: `tag: "#release"
note: "a # b"`, notes: [] },
            { code: `glob: "*.log"
bang: "!important"`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "multiline",
      n: 3,
      title: "multiline strings",
      concepts: [
        {
          id: "literal-block", n: 1, title: "literal blocks", level: 2,
          gloss: "Keeps every line break of a block with the pipe indicator.",
          examples: [
            { code: `message: |
  Dear Ada,
  Your order has shipped.
  Support`, notes: [{ at: "|", text: "literal block" }] },
            { code: `script: |
  npm ci
  npm test`, notes: [] },
            { code: `address: |
  12 Rose Street
  Oslo`, notes: [] }
          ]
        },
        {
          id: "folded-block", n: 2, title: "folded blocks", level: 2,
          gloss: "Folds the lines of a block into one paragraph with the greater-than indicator.",
          examples: [
            { code: `description: >
  A long sentence that
  wraps across lines.`, notes: [{ at: ">", text: "folded block" }] },
            { code: `summary: >
  First paragraph wraps
  here.

  Second paragraph.`, notes: [] },
            { code: `note: >
  Review the report
  before Friday.`, notes: [] }
          ]
        },
        {
          id: "chomping", n: 3, title: "chomping indicators", level: 3,
          gloss: "Controls the trailing newline of a block with the minus and plus indicators.",
          examples: [
            { code: `text: |-
  no trailing newline`, notes: [{ at: "|-", text: "strip final newline" }] },
            { code: `text: |+
  keeps trailing newlines

other: 1`, notes: [{ at: "|+", text: "keep all newlines" }] },
            { code: `text: >-
  folded without
  a final newline`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "mappings",
      n: 4,
      title: "mappings",
      concepts: [
        {
          id: "key-value", n: 1, title: "key and value pairs", level: 1,
          gloss: "Writes a mapping as one key, colon, space and value per line.",
          examples: [
            { code: `host: localhost
port: 5432`, notes: [] },
            { code: `first: Ada
last: Lovelace
role: admin`, notes: [] },
            { code: `sku: A-1042
qty: 3
gift: false`, notes: [] }
          ]
        },
        {
          id: "nested-maps", n: 2, title: "nested mappings", level: 1,
          gloss: "Indents child keys with spaces to nest one mapping inside another.",
          examples: [
            { code: `server:
  host: localhost
  port: 8080`, notes: [{ at: "host", text: "two spaces deeper" }] },
            { code: `database:
  primary:
    host: db1
    port: 5432`, notes: [] },
            { code: `user:
  name: Ada
  address:
    city: London`, notes: [] }
          ]
        },
        {
          id: "complex-keys", n: 3, title: "quoted and complex keys", level: 3,
          gloss: "Quotes keys with spaces or colons and marks long keys with a question mark.",
          examples: [
            { code: `"first name": Ada
"a:b": 1`, notes: [] },
            { code: `? a very long key name
: value`, notes: [{ at: "?", text: "explicit key" }] },
            { code: `"on": true
"yes": 1`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "sequences",
      n: 5,
      title: "sequences",
      concepts: [
        {
          id: "block-lists", n: 1, title: "block sequences", level: 1,
          gloss: "Writes a list with one dash and a space per item.",
          examples: [
            { code: `- apples
- pears
- plums`, notes: [{ at: "-", text: "one item" }] },
            { code: `tags:
  - json
  - api
  - config`, notes: [] },
            { code: `ports:
  - 80
  - 443`, notes: [] }
          ]
        },
        {
          id: "lists-of-maps", n: 2, title: "lists of mappings", level: 1,
          gloss: "Starts each item with a dash followed by the first key of a mapping.",
          examples: [
            { code: `users:
  - id: 1
    name: Ada
  - id: 2
    name: Grace`, notes: [] },
            { code: `items:
  - sku: A-1
    qty: 2
  - sku: B-7
    qty: 1`, notes: [] },
            { code: `points:
  - x: 0
    y: 0
  - x: 4
    y: 9`, notes: [] }
          ]
        },
        {
          id: "nested-lists", n: 3, title: "nested sequences", level: 2,
          gloss: "Nests lists with a bare dash or with inline brackets.",
          examples: [
            { code: `- - 1
  - 2
- - 3
  - 4`, notes: [] },
            { code: `matrix:
  -
    - a
    - b
  -
    - c`, notes: [] },
            { code: `grid:
  - [1, 2]
  - [3, 4]`, notes: [] }
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
          id: "maps-of-lists", n: 1, title: "mappings holding lists", level: 1,
          gloss: "Places a list under a key to hold several values.",
          examples: [
            { code: `team: platform
members:
  - ada
  - grace`, notes: [] },
            { code: `colors:
  warm: [red, orange]
  cool: [blue, green]`, notes: [] },
            { code: `env:
  dev:
    - alpha
    - beta
  prod:
    - stable`, notes: [] }
          ]
        },
        {
          id: "records", n: 2, title: "records with nesting", level: 2,
          gloss: "Combines mappings and lists to describe a full record.",
          examples: [
            { code: `order: 1042
lines:
  - sku: A-1
    qty: 2
  - sku: B-7
    qty: 1`, notes: [] },
            { code: `course: Algebra
grades:
  mid: [80, 92]
  final: [88]`, notes: [] },
            { code: `person:
  name: Ada
  langs:
    - en
    - fr`, notes: [] }
          ]
        },
        {
          id: "empty-collections", n: 3, title: "empty collections", level: 2,
          gloss: "Writes empty collections with braces and brackets.",
          examples: [
            { code: `labels: {}
items: []`, notes: [{ at: "{}", text: "empty mapping" }] },
            { code: `env: {}`, notes: [] },
            { code: `args: []
ports: []`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "anchors",
      n: 7,
      title: "anchors and aliases",
      concepts: [
        {
          id: "anchor-alias", n: 1, title: "anchors and aliases", level: 2,
          gloss: "Names a node with an ampersand and reuses it with an asterisk alias.",
          examples: [
            { code: `base: &base_url https://api.example.com
login: *base_url`, notes: [{ at: "&base_url", text: "anchor" }, { at: "*base_url", text: "alias" }] },
            { code: `retries: &retries 3
timeout: 30
backup_retries: *retries`, notes: [] },
            { code: `admin: &admin
  role: admin
  active: true
owner: *admin`, notes: [] }
          ]
        },
        {
          id: "merge-keys", n: 2, title: "merge keys", level: 3,
          gloss: "Copies one mapping into another with the double angle bracket merge key.",
          examples: [
            { code: `defaults: &defaults
  adapter: postgres
  pool: 5
dev:
  <<: *defaults
  database: app_dev`, notes: [{ at: "<<:", text: "merge key" }] },
            { code: `base: &base
  color: gray
  size: 10
button:
  <<: *base
  size: 14`, notes: [] },
            { code: `common: &common
  retries: 3
job:
  <<: *common
  name: sync`, notes: [] }
          ]
        },
        {
          id: "shared-defaults", n: 3, title: "shared defaults", level: 3,
          gloss: "Defines defaults once and overrides single fields per environment.",
          examples: [
            { code: `defaults: &d
  port: 80
  tls: false
prod:
  <<: *d
  tls: true`, notes: [] },
            { code: `x-common: &common
  restart: always
web:
  <<: *common
  image: nginx`, notes: [] },
            { code: `limits: &limits
  cpu: 1
  memory: 512
worker:
  <<: *limits
  cpu: 2`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "documents",
      n: 8,
      title: "documents",
      concepts: [
        {
          id: "separators", n: 1, title: "document separators", level: 2,
          gloss: "Separates several documents in one stream with three dashes.",
          examples: [
            { code: `name: first
---
name: second`, notes: [{ at: "---", text: "next document" }] },
            { code: `kind: Config
---
kind: Secret
---
kind: Service`, notes: [] },
            { code: `id: 1
---
id: 2
---
id: 3`, notes: [] }
          ]
        },
        {
          id: "start-marker", n: 2, title: "explicit start marker", level: 3,
          gloss: "Opens a document with three dashes before its content.",
          examples: [
            { code: `---
name: billing
version: 2`, notes: [] },
            { code: `---
- one
- two`, notes: [] },
            { code: `---
host: localhost
port: 8080`, notes: [] }
          ]
        },
        {
          id: "end-marker", n: 3, title: "document end marker", level: 3,
          gloss: "Closes a document with three dots before the next one begins.",
          examples: [
            { code: `name: first
...
---
name: second`, notes: [{ at: "...", text: "end of document" }] },
            { code: `status: done
...`, notes: [] },
            { code: `a: 1
...
---
b: 2
...`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "flow",
      n: 9,
      title: "flow style",
      concepts: [
        {
          id: "flow-maps", n: 1, title: "flow mappings", level: 2,
          gloss: "Writes a mapping inline with braces and commas.",
          examples: [
            { code: `point: {x: 3, y: 4}`, notes: [] },
            { code: `server: {host: localhost, port: 8080}`, notes: [] },
            { code: `user: {name: Ada, admin: true}`, notes: [] }
          ]
        },
        {
          id: "flow-sequences", n: 2, title: "flow sequences", level: 2,
          gloss: "Writes a list inline with square brackets and commas.",
          examples: [
            { code: `colors: [red, green, blue]`, notes: [] },
            { code: `primes: [2, 3, 5, 7]`, notes: [] },
            { code: `args: ["--port", "8080", "--verbose"]`, notes: [] }
          ]
        },
        {
          id: "mixed-styles", n: 3, title: "mixing block and flow", level: 2,
          gloss: "Combines inline collections with block mappings in one file.",
          examples: [
            { code: `service:
  name: api
  ports: [80, 443]`, notes: [] },
            { code: `users:
  - {id: 1, name: Ada}
  - {id: 2, name: Grace}`, notes: [] },
            { code: `matrix:
  os: [linux, macos]
  node: [20, 22]`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "compose",
      n: 10,
      title: "Docker Compose",
      concepts: [
        {
          id: "services", n: 1, title: "services", level: 2,
          gloss: "Declares containers under the services key with an image and ports.",
          examples: [
            { code: `services:
  web:
    image: nginx:1.27
    ports:
      - "8080:80"`, notes: [{ at: "\"8080:80\"", text: "quoted to stay a string" }] },
            { code: `services:
  api:
    build: .
    ports:
      - "3000:3000"`, notes: [] },
            { code: `services:
  cache:
    image: redis:7
    restart: unless-stopped`, notes: [] }
          ]
        },
        {
          id: "environment-volumes", n: 2, title: "environment and volumes", level: 2,
          gloss: "Sets environment variables and mounts volumes for a service.",
          examples: [
            { code: `services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: example`, notes: [] },
            { code: `services:
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:`, notes: [] },
            { code: `services:
  app:
    image: app:latest
    environment:
      - NODE_ENV=production
      - PORT=3000`, notes: [] }
          ]
        },
        {
          id: "depends-healthcheck", n: 3, title: "depends_on and healthchecks", level: 3,
          gloss: "Orders startup with depends_on and probes readiness with a healthcheck.",
          examples: [
            { code: `services:
  api:
    image: api:1.0
    depends_on:
      - db
  db:
    image: postgres:16`, notes: [] },
            { code: `services:
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD", "pg_isready"]
      interval: 10s`, notes: [] },
            { code: `services:
  api:
    image: api:1.0
    depends_on:
      db:
        condition: service_healthy`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "workflows",
      n: 11,
      title: "GitHub Actions",
      concepts: [
        {
          id: "triggers", n: 1, title: "workflow triggers", level: 2,
          gloss: "Starts a workflow from push, pull request or schedule events.",
          examples: [
            { code: `name: CI
on:
  push:
    branches: [main]`, notes: [] },
            { code: `on:
  pull_request:
    branches: [main]
  workflow_dispatch:`, notes: [] },
            { code: `on:
  schedule:
    - cron: "0 6 * * 1"`, notes: [] }
          ]
        },
        {
          id: "jobs-steps", n: 2, title: "jobs and steps", level: 2,
          gloss: "Defines jobs that run steps on a runner.",
          examples: [
            { code: `jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4`, notes: [] },
            { code: `jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm ci
      - run: npm test`, notes: [] },
            { code: `jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Check formatting
        run: npm run lint`, notes: [] }
          ]
        },
        {
          id: "matrix", n: 3, title: "build matrix", level: 3,
          gloss: "Runs one job across several versions with a strategy matrix.",
          examples: [
            { code: `jobs:
  test:
    strategy:
      matrix:
        node: [20, 22]
    runs-on: ubuntu-latest`, notes: [] },
            { code: `strategy:
  fail-fast: false
  matrix:
    os: [ubuntu-latest, windows-latest]`, notes: [] },
            { code: `steps:
  - uses: actions/setup-node@v4
    with:
      node-version: \${{ matrix.node }}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "kubernetes",
      n: 12,
      title: "Kubernetes",
      concepts: [
        {
          id: "deployment", n: 1, title: "Deployment spec", level: 3,
          gloss: "Declares replicas, a selector and a pod template for a Deployment.",
          examples: [
            { code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web`, notes: [] },
            { code: `spec:
  replicas: 3
  selector:
    matchLabels:
      app: web`, notes: [] },
            { code: `template:
  metadata:
    labels:
      app: web
  spec:
    containers:
      - name: web
        image: nginx:1.27`, notes: [] }
          ]
        },
        {
          id: "service-ports", n: 2, title: "Service and ports", level: 3,
          gloss: "Exposes pods through a Service that maps a port to a target port.",
          examples: [
            { code: `apiVersion: v1
kind: Service
metadata:
  name: web`, notes: [] },
            { code: `spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 8080`, notes: [] },
            { code: `spec:
  type: ClusterIP
  ports:
    - name: http
      port: 80`, notes: [] }
          ]
        },
        {
          id: "config-secret", n: 3, title: "ConfigMap and Secret", level: 3,
          gloss: "Stores settings in a ConfigMap and sensitive values in a Secret.",
          examples: [
            { code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: info`, notes: [] },
            { code: `apiVersion: v1
kind: Secret
metadata:
  name: db-pass
type: Opaque
stringData:
  password: example`, notes: [] },
            { code: `env:
  - name: LOG_LEVEL
    valueFrom:
      configMapKeyRef:
        name: app-config
        key: LOG_LEVEL`, notes: [] }
          ]
        }
      ]
    }
  ]
};
