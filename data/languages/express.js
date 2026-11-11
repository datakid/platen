export default {
  id: "express",
  name: "Express",
  short: "XP",
  pigment: "express",
  family: "javascript",
  version: "5.x",
  lexer: "javascript",
  indent: 2,
  topics: [
    {
      id: "app-listen",
      n: 1,
      title: "app & listen",
      concepts: [
        {
          id: "create-app", n: 1, title: "create an app", level: 1,
          gloss: "Creates an Express application and starts it listening on a port.",
          examples: [
            { code: `import express from 'express'

const app = express()
app.listen(3000)`, notes: [{ at: "const app", text: "later examples assume this" }, { at: "listen(3000)", text: "starts the http server" }] },
            { code: `import express from 'express'

const app = express()
const port = process.env.PORT ?? 3000
app.listen(port, () => {
  console.log(\`listening on \${port}\`)
})`, notes: [{ at: "process.env.PORT", text: "port from the environment" }, { at: "() =>", text: "runs once the server is ready" }] },
            { code: `import express from 'express'

const app = express()
const server = app.listen(0, '127.0.0.1')`, notes: [{ at: "0", text: "the system picks a free port" }, { at: "'127.0.0.1'", text: "local machine only" }] }
          ]
        },
        {
          id: "app-settings", n: 2, title: "app settings", level: 1,
          gloss: "Reads and writes application settings with set, get, enable and disable.",
          examples: [
            { code: `app.set('trust proxy', 1)`, notes: [{ at: "'trust proxy'", text: "reads the client ip behind a proxy" }] },
            { code: `app.disable('x-powered-by')`, notes: [{ at: "disable", text: "hides the framework header" }] },
            { code: `app.set('json spaces', 2)
console.log(app.get('json spaces'))`, notes: [{ at: "app.get", text: "reads a setting back" }] },
            { code: `app.enable('case sensitive routing')`, notes: [{ at: "enable", text: "sets a boolean setting to true" }] }
          ]
        },
        {
          id: "app-locals", n: 3, title: "app locals", level: 2,
          gloss: "Stores values on app.locals so every handler and template can read them.",
          examples: [
            { code: `app.locals.siteName = 'Orders'

app.get('/name', (req, res) => {
  res.send(req.app.locals.siteName)
})`, notes: [{ at: "req.app", text: "the app that handles the request" }] },
            { code: `app.locals.startedAt = new Date().toISOString()`, notes: [{ at: "app.locals", text: "lives as long as the app" }] },
            { code: `app.locals.config = { currency: 'EUR' }

app.get('/config', (req, res) => {
  res.json(app.locals.config)
})`, notes: [{ at: "app.locals.config", text: "shared settings object" }] }
          ]
        },
        {
          id: "graceful-shutdown", n: 4, title: "graceful shutdown", level: 3,
          gloss: "Closes the server on a signal so open requests can finish first.",
          examples: [
            { code: `const server = app.listen(3000)

process.on('SIGTERM', () => {
  server.close(() => process.exit(0))
})`, notes: [{ at: "server.close", text: "stops accepting new connections" }] },
            { code: `const server = app.listen(3000)

function shutdown() {
  server.close(() => console.log('closed'))
  server.closeIdleConnections()
}
process.on('SIGINT', shutdown)`, notes: [{ at: "closeIdleConnections", text: "drops keep-alive sockets" }] },
            { code: `const server = app.listen(3000)
server.keepAliveTimeout = 65_000
server.headersTimeout = 66_000`, notes: [{ at: "keepAliveTimeout", text: "must exceed the proxy timeout" }] }
          ]
        }
      ]
    },
    {
      id: "routes-methods",
      n: 2,
      title: "routes & methods",
      concepts: [
        {
          id: "get-routes", n: 1, title: "GET routes", level: 1,
          gloss: "Responds to GET requests for a path with a handler function.",
          examples: [
            { code: `app.get('/', (req, res) => {
  res.send('Orders API')
})`, notes: [{ at: "app.get", text: "assumes app = express()" }] },
            { code: `app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})`, notes: [{ at: "res.json", text: "sends a json body" }] },
            { code: `app.get('/orders', (req, res) => {
  res.status(200).json([{ id: 1, total: 42 }])
})`, notes: [{ at: "res.status(200)", text: "explicit status code" }] }
          ]
        },
        {
          id: "http-methods", n: 2, title: "other methods", level: 1,
          gloss: "Handles POST, PUT, PATCH and DELETE with the matching app methods.",
          examples: [
            { code: `app.post('/orders', (req, res) => {
  res.status(201).json({ id: 2 })
})`, notes: [{ at: "201", text: "created" }] },
            { code: `app.put('/orders/:id', (req, res) => {
  res.json({ id: req.params.id, replaced: true })
})`, notes: [{ at: "app.put", text: "full replacement" }] },
            { code: `app.patch('/orders/:id', (req, res) => {
  res.json({ id: req.params.id, patched: true })
})`, notes: [{ at: "app.patch", text: "partial update" }] },
            { code: `app.delete('/orders/:id', (req, res) => {
  res.sendStatus(204)
})`, notes: [{ at: "sendStatus(204)", text: "no content" }] }
          ]
        },
        {
          id: "route-chaining", n: 3, title: "chained methods", level: 2,
          gloss: "Chains several methods onto one path with app.route.",
          examples: [
            { code: `app.route('/orders')
  .get((req, res) => res.json([]))
  .post((req, res) => res.status(201).json({ id: 1 }))`, notes: [{ at: "app.route", text: "one path, many methods" }] },
            { code: `app.route('/orders/:id')
  .get((req, res) => res.json({ id: req.params.id }))
  .put((req, res) => res.json({ replaced: true }))
  .delete((req, res) => res.sendStatus(204))`, notes: [{ at: ".delete", text: "chained after put" }] },
            { code: `app.route('/login')
  .get((req, res) => res.send('login form'))
  .post((req, res) => res.redirect('/'))`, notes: [{ at: ".post", text: "same path, other method" }] }
          ]
        },
        {
          id: "route-patterns", n: 4, title: "path patterns", level: 3,
          gloss: "Matches optional segments, wildcards and regular expressions in route paths.",
          examples: [
            { code: `app.get('/users{/:id}', (req, res) => {
  res.json({ id: req.params.id ?? null })
})`, notes: [{ at: "{/:id}", text: "optional segment in express 5" }] },
            { code: `app.get('/files/{*path}', (req, res) => {
  res.json({ parts: req.params.path ?? [] })
})`, notes: [{ at: "{*path}", text: "optional wildcard, array of segments" }] },
            { code: `app.get(/^\\/orders\\/(\\d+)$/, (req, res) => {
  res.json({ id: req.params[0] })
})`, notes: [{ at: "req.params[0]", text: "regex groups by position" }] },
            { code: `app.all('/{*splat}', (req, res) => {
  res.status(404).json({ error: 'not found' })
})`, notes: [{ at: "/{*splat}", text: "also matches the root path" }] }
          ]
        }
      ]
    },
    {
      id: "params-query",
      n: 3,
      title: "params & query",
      concepts: [
        {
          id: "route-params", n: 1, title: "route parameters", level: 1,
          gloss: "Reads named path segments from req.params.",
          examples: [
            { code: `app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id })
})`, notes: [{ at: ":id", text: "assumes app = express()" }] },
            { code: `app.get('/users/:userId/orders/:orderId', (req, res) => {
  const { userId, orderId } = req.params
  res.json({ userId, orderId })
})`, notes: [{ at: "req.params", text: "every named segment" }] },
            { code: `app.get('/orders/:id', (req, res) => {
  const id = Number(req.params.id)
  res.json({ id, next: id + 1 })
})`, notes: [{ at: "Number(", text: "params always arrive as strings" }] }
          ]
        },
        {
          id: "param-callback", n: 2, title: "param callbacks", level: 2,
          gloss: "Runs code once for a named parameter with app.param before the handlers.",
          examples: [
            { code: `const users = new Map([['1', { name: 'Ada' }]])

app.param('id', (req, res, next, id) => {
  req.user = users.get(id)
  next()
})
app.get('/users/:id', (req, res) => res.json(req.user ?? null))`, notes: [{ at: "app.param", text: "runs for every :id in a route" }] },
            { code: `app.param('orderId', (req, res, next, value) => {
  if (!/^\\d+$/.test(value)) return res.sendStatus(400)
  next()
})
app.get('/orders/:orderId', (req, res) => {
  res.json({ id: req.params.orderId })
})`, notes: [{ at: "sendStatus(400)", text: "stops on a bad value" }] },
            { code: `app.param('slug', (req, res, next, slug) => {
  req.slug = slug.toLowerCase()
  next()
})
app.get('/posts/:slug', (req, res) => res.send(req.slug))`, notes: [{ at: "req.slug", text: "value prepared for the handler" }] }
          ]
        },
        {
          id: "query-string", n: 3, title: "query string", level: 1,
          gloss: "Reads query string values from req.query.",
          examples: [
            { code: `app.get('/search', (req, res) => {
  res.json({ q: req.query.q })
})`, notes: [{ at: "req.query.q", text: "value of ?q=" }] },
            { code: `app.get('/orders', (req, res) => {
  const limit = Number(req.query.limit ?? 10)
  res.json({ limit })
})`, notes: [{ at: "?? 10", text: "default when the key is absent" }] },
            { code: `app.get('/products', (req, res) => {
  const { category = 'all', sort = 'name' } = req.query
  res.json({ category, sort })
})`, notes: [{ at: "= 'all'", text: "destructuring default" }] }
          ]
        },
        {
          id: "query-arrays", n: 4, title: "repeated keys", level: 2,
          gloss: "Reads repeated keys as arrays and switches the query parser when needed.",
          examples: [
            { code: `app.get('/tags', (req, res) => {
  const tags = [].concat(req.query.tag ?? [])
  res.json({ tags })
})`, notes: [{ at: "[].concat", text: "one value or many" }] },
            { code: `app.set('query parser', 'extended')

app.get('/filter', (req, res) => {
  res.json(req.query.filter ?? {})
})`, notes: [{ at: "'extended'", text: "allows filter[status]=open" }] },
            { code: `app.get('/ids', (req, res) => {
  const ids = String(req.query.ids ?? '').split(',')
  res.json({ ids })
})`, notes: [{ at: "split(',')", text: "comma separated list" }] }
          ]
        }
      ]
    },
    {
      id: "middleware",
      n: 4,
      title: "middleware",
      concepts: [
        {
          id: "app-use", n: 1, title: "application middleware", level: 1,
          gloss: "Runs a function for every request before the route handlers.",
          examples: [
            { code: `app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})`, notes: [{ at: "next()", text: "assumes app = express()" }, { at: "app.use", text: "runs for every request" }] },
            { code: `app.use((req, res, next) => {
  req.startedAt = Date.now()
  next()
})`, notes: [{ at: "req.startedAt", text: "value for later handlers" }] },
            { code: `app.use((req, res, next) => {
  res.set('X-Request-Id', crypto.randomUUID())
  next()
})`, notes: [{ at: "res.set", text: "adds a response header" }] }
          ]
        },
        {
          id: "path-middleware", n: 2, title: "path scoped middleware", level: 2,
          gloss: "Limits middleware to a path prefix by passing the prefix to app.use.",
          examples: [
            { code: `app.use('/admin', (req, res, next) => {
  if (!req.get('x-admin-key')) return res.sendStatus(401)
  next()
})`, notes: [{ at: "'/admin'", text: "only paths under this prefix" }] },
            { code: `app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})`, notes: [{ at: "'/api'", text: "/api and everything below it" }] },
            { code: `app.use('/uploads', (req, res, next) => {
  console.log('upload request', req.path)
  next()
})`, notes: [{ at: "req.path", text: "relative to the mount path" }] }
          ]
        },
        {
          id: "route-middleware", n: 3, title: "route middleware", level: 2,
          gloss: "Passes middleware functions ahead of the handler of a single route.",
          examples: [
            { code: `function requireKey(req, res, next) {
  if (req.get('x-api-key') !== 'k-123') return res.sendStatus(401)
  next()
}
app.get('/reports', requireKey, (req, res) => res.json([]))`, notes: [{ at: "requireKey", text: "runs before the handler" }] },
            { code: `const requireJson = (req, res, next) => {
  if (!req.is('json')) return res.sendStatus(415)
  next()
}
app.post('/orders', express.json(), requireJson, (req, res) => {
  res.status(201).json(req.body)
})`, notes: [{ at: "req.is('json')", text: "checks the content type" }] },
            { code: `const log = (req, res, next) => next()
const auth = (req, res, next) => next()

app.get('/profile', [log, auth], (req, res) => res.send('ok'))`, notes: [{ at: "[log, auth]", text: "an array of middleware" }] }
          ]
        },
        {
          id: "middleware-factory", n: 4, title: "middleware factories", level: 3,
          gloss: "Returns a configured middleware function from a factory function.",
          examples: [
            { code: `function logger(prefix) {
  return (req, res, next) => {
    console.log(prefix, req.method, req.url)
    next()
  }
}
app.use(logger('[api]'))`, notes: [{ at: "logger('[api]')", text: "returns the middleware" }] },
            { code: `function limit(max) {
  let hits = 0
  return (req, res, next) => {
    if (++hits > max) return res.sendStatus(429)
    next()
  }
}
app.use(limit(100))`, notes: [{ at: "429", text: "too many requests" }] },
            { code: `function requireRole(role) {
  return (req, res, next) => {
    if (req.get('x-role') !== role) return res.sendStatus(403)
    next()
  }
}
app.delete('/users/:id', requireRole('admin'), (req, res) => {
  res.sendStatus(204)
})`, notes: [{ at: "requireRole('admin')", text: "checked per route" }] }
          ]
        }
      ]
    },
    {
      id: "json-bodies",
      n: 5,
      title: "JSON bodies",
      concepts: [
        {
          id: "json-parser", n: 1, title: "JSON parser", level: 1,
          gloss: "Parses JSON request bodies into req.body with express.json.",
          examples: [
            { code: `app.use(express.json())

app.post('/orders', (req, res) => {
  res.status(201).json(req.body)
})`, notes: [{ at: "express.json()", text: "assumes app = express()" }, { at: "req.body", text: "parsed object" }] },
            { code: `app.use(express.json({ limit: '1mb' }))`, notes: [{ at: "limit", text: "larger bodies get a 413" }] },
            { code: `app.post('/echo', express.json(), (req, res) => {
  res.json({ received: req.body })
})`, notes: [{ at: "express.json()", text: "parser for this route only" }] }
          ]
        },
        {
          id: "urlencoded-forms", n: 2, title: "form bodies", level: 2,
          gloss: "Parses HTML form bodies with express.urlencoded.",
          examples: [
            { code: `app.use(express.urlencoded({ extended: false }))

app.post('/login', (req, res) => {
  res.json({ user: req.body.username })
})`, notes: [{ at: "extended: false", text: "flat key and value pairs" }] },
            { code: `app.use(express.urlencoded({ extended: true }))`, notes: [{ at: "extended: true", text: "nested objects like user[name]" }] },
            { code: `const form = express.urlencoded({ extended: false })

app.post('/contact', form, (req, res) => {
  res.send(\`thanks \${req.body.name}\`)
})`, notes: [{ at: "req.body.name", text: "field name from the form" }] }
          ]
        },
        {
          id: "validate-body", n: 3, title: "validate input", level: 2,
          gloss: "Checks required fields in req.body and answers 400 when they are missing.",
          examples: [
            { code: `app.post('/users', express.json(), (req, res) => {
  const { name, email } = req.body ?? {}
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email required' })
  }
  res.status(201).json({ name, email })
})`, notes: [{ at: "?? {}", text: "body is undefined if not parsed" }] },
            { code: `app.post('/prices', express.json(), (req, res) => {
  const price = Number(req.body?.price)
  if (Number.isNaN(price)) return res.sendStatus(422)
  res.json({ price })
})`, notes: [{ at: "422", text: "well formed but invalid" }] },
            { code: `app.post('/batch', express.json(), (req, res) => {
  if (!Array.isArray(req.body)) return res.sendStatus(400)
  res.json({ count: req.body.length })
})`, notes: [{ at: "Array.isArray", text: "body must be a list" }] }
          ]
        },
        {
          id: "body-types", n: 4, title: "types and limits", level: 3,
          gloss: "Restricts a parser to a content type and rejects bodies that are too large.",
          examples: [
            { code: `app.use(express.json({ type: 'application/vnd.api+json' }))`, notes: [{ at: "type", text: "only this content type is parsed" }] },
            { code: `app.use(express.json({ limit: '10kb' }))`, notes: [{ at: "'10kb'", text: "bodies above it get a 413" }] },
            { code: `app.use(express.text({ type: 'text/plain' }))

app.post('/notes', (req, res) => {
  res.json({ length: req.body.length })
})`, notes: [{ at: "express.text", text: "body becomes a string" }] }
          ]
        }
      ]
    },
    {
      id: "static-files",
      n: 6,
      title: "static files",
      concepts: [
        {
          id: "static-dir", n: 1, title: "serve a folder", level: 1,
          gloss: "Serves the files of a folder with express.static.",
          examples: [
            { code: `app.use(express.static('public'))`, notes: [{ at: "express.static", text: "assumes app = express()" }] },
            { code: `app.use('/assets', express.static('public'))`, notes: [{ at: "'/assets'", text: "url prefix for the folder" }] },
            { code: `app.use(express.static(\`\${process.cwd()}/public\`))`, notes: [{ at: "process.cwd()", text: "absolute path, not relative" }] }
          ]
        },
        {
          id: "static-options", n: 2, title: "static options", level: 2,
          gloss: "Tunes caching and index files with the options of express.static.",
          examples: [
            { code: `app.use(express.static('public', { maxAge: '1d' }))`, notes: [{ at: "maxAge", text: "cache lifetime for browsers" }] },
            { code: `app.use(express.static('public', { index: false }))`, notes: [{ at: "index: false", text: "no index.html for folders" }] },
            { code: `app.use(express.static('public', { extensions: ['html'] }))`, notes: [{ at: "extensions", text: "/about serves about.html" }] },
            { code: `app.use(express.static('public', { immutable: true, maxAge: '1y' }))`, notes: [{ at: "immutable", text: "browser never revalidates" }] }
          ]
        },
        {
          id: "send-file", n: 3, title: "send a file", level: 2,
          gloss: "Sends one file from a route with res.sendFile and a root folder.",
          examples: [
            { code: `app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})`, notes: [{ at: "root", text: "folder the file name is resolved in" }] },
            { code: `app.get('/report', (req, res) => {
  res.download('files/report.pdf', 'q3-report.pdf')
})`, notes: [{ at: "res.download", text: "sets the attachment name" }] },
            { code: `app.get('/logo', (req, res) => {
  res.type('png').sendFile('logo.png', { root: 'public' })
})`, notes: [{ at: "res.type('png')", text: "sets the content type" }] }
          ]
        }
      ]
    },
    {
      id: "routers",
      n: 7,
      title: "routers",
      concepts: [
        {
          id: "router-basics", n: 1, title: "create a router", level: 1,
          gloss: "Groups related routes on an express.Router and mounts it with app.use.",
          examples: [
            { code: `const router = express.Router()
router.get('/', (req, res) => {
  res.json([])
})

app.use('/orders', router)`, notes: [{ at: "express.Router()", text: "assumes express and app" }, { at: "app.use('/orders'", text: "mounts every route under it" }] },
            { code: `const users = express.Router()

users.get('/:id', (req, res) => {
  res.json({ id: req.params.id })
})
app.use('/users', users)`, notes: [{ at: "users.get('/:id'", text: "becomes /users/:id" }] },
            { code: `const health = express.Router()

health.get('/live', (req, res) => res.send('live'))
health.get('/ready', (req, res) => res.send('ready'))
app.use('/health', health)`, notes: [{ at: "health", text: "two routes, one mount" }] }
          ]
        },
        {
          id: "router-params", n: 2, title: "mount parameters", level: 2,
          gloss: "Reads parameters of the mount path inside a router with mergeParams.",
          examples: [
            { code: `const items = express.Router({ mergeParams: true })

items.get('/', (req, res) => {
  res.json({ orderId: req.params.orderId })
})
app.use('/orders/:orderId/items', items)`, notes: [{ at: "mergeParams", text: "keeps the parent params" }] },
            { code: `const posts = express.Router({ mergeParams: true })

posts.get('/', (req, res) => res.json({ user: req.params.userId }))
app.use('/users/:userId/posts', posts)`, notes: [{ at: ":userId", text: "defined where the router mounts" }] },
            { code: `const lines = express.Router({ mergeParams: true })

lines.get('/:lineId', (req, res) => {
  res.json(req.params)
})
app.use('/orders/:orderId/lines', lines)`, notes: [{ at: "req.params", text: "parent and own params together" }] }
          ]
        },
        {
          id: "router-middleware", n: 3, title: "router middleware", level: 2,
          gloss: "Applies middleware to every route of a router with router.use.",
          examples: [
            { code: `const admin = express.Router()

admin.use((req, res, next) => {
  if (!req.get('x-admin-key')) return res.sendStatus(401)
  next()
})
admin.get('/stats', (req, res) => res.json({ users: 3 }))
app.use('/admin', admin)`, notes: [{ at: "admin.use", text: "guards every admin route" }] },
            { code: `const api = express.Router()

api.use(express.json())
api.post('/orders', (req, res) => res.status(201).json(req.body))
app.use('/api', api)`, notes: [{ at: "api.use(express.json())", text: "parser for this router only" }] },
            { code: `const reports = express.Router()

reports.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
reports.get('/daily', (req, res) => res.json([]))
app.use('/reports', reports)`, notes: [{ at: "no-store", text: "applies to every report route" }] }
          ]
        },
        {
          id: "router-nesting", n: 4, title: "nested routers", level: 3,
          gloss: "Mounts routers inside other routers to build a versioned api tree.",
          examples: [
            { code: `const v1 = express.Router()
const orders = express.Router()

orders.get('/', (req, res) => res.json([]))
v1.use('/orders', orders)
app.use('/api/v1', v1)`, notes: [{ at: "v1.use('/orders'", text: "router inside a router" }] },
            { code: `const users = express.Router()
const admin = express.Router()

users.get('/', (req, res) => res.json([]))
admin.use('/users', users)
app.use('/admin', admin)`, notes: [{ at: "admin.use('/users'", text: "final path is /admin/users" }] },
            { code: `const v1 = express.Router()
const v2 = express.Router()

v1.get('/status', (req, res) => res.send('v1'))
v2.get('/status', (req, res) => res.send('v2'))
app.use('/v1', v1)
app.use('/v2', v2)`, notes: [{ at: "v2", text: "same path, new version" }] }
          ]
        }
      ]
    },
    {
      id: "error-handling",
      n: 8,
      title: "error handling",
      concepts: [
        {
          id: "error-middleware", n: 1, title: "error middleware", level: 1,
          gloss: "Handles errors in a four argument middleware registered after the routes.",
          examples: [
            { code: `app.get('/boom', (req, res) => {
  throw new Error('boom')
})

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})`, notes: [{ at: "(err, req, res, next)", text: "four arguments mark it" }, { at: "app.get", text: "assumes app = express()" }] },
            { code: `app.get('/orders/:id', (req, res) => {
  const err = new Error('order not found')
  err.status = 404
  throw err
})
app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({ error: err.message })
})`, notes: [{ at: "err.status", text: "carries the http status" }] },
            { code: `app.get('/crash', () => {
  throw new Error('crash')
})
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Something went wrong')
})`, notes: [{ at: "console.error", text: "logs the full error" }] }
          ]
        },
        {
          id: "not-found", n: 2, title: "not found handler", level: 1,
          gloss: "Answers unknown paths with a 404 after every route has been tried.",
          examples: [
            { code: `app.use((req, res) => {
  res.status(404).json({ error: \`no route for \${req.path}\` })
})`, notes: [{ at: "res.status(404)", text: "last middleware in the chain" }] },
            { code: `app.get('/', (req, res) => res.send('home'))
app.use((req, res) => res.sendStatus(404))`, notes: [{ at: "sendStatus(404)", text: "body is the text not found" }] },
            { code: `app.use((req, res) => {
  res.status(404).type('text/plain').send('not found')
})`, notes: [{ at: "type('text/plain')", text: "plain text reply" }] }
          ]
        },
        {
          id: "next-error", n: 3, title: "forwarding errors", level: 2,
          gloss: "Passes an error to the error handler by calling next with it.",
          examples: [
            { code: `app.get('/users/:id', (req, res, next) => {
  const user = null
  if (!user) return next(new Error('user not found'))
  res.json(user)
})
app.use((err, req, res, next) => {
  res.status(404).json({ error: err.message })
})`, notes: [{ at: "next(new Error", text: "skips to the error handler" }] },
            { code: `app.get('/orders/:id', (req, res, next) => {
  const err = new Error('invalid id')
  err.status = 400
  next(err)
})
app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err.message })
})`, notes: [{ at: "err.status = 400", text: "picked up by the handler" }] },
            { code: `app.get('/users/:id', (req, res, next) => {
  if (req.params.id === 'me') return next('route')
  res.send('by id')
}, (req, res) => res.send('unreachable'))
app.get('/users/me', (req, res) => res.send('current user'))`, notes: [{ at: "next('route')", text: "skips to the next matching route" }] }
          ]
        },
        {
          id: "error-env", n: 4, title: "production errors", level: 3,
          gloss: "Hides stack traces in production and replies with a short message instead.",
          examples: [
            { code: `app.use((err, req, res, next) => {
  const body = { error: 'internal error' }
  if (process.env.NODE_ENV !== 'production') body.stack = err.stack
  res.status(500).json(body)
})`, notes: [{ at: "NODE_ENV", text: "controls how much detail leaks" }] },
            { code: `app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  res.status(500).json({ error: 'internal error' })
})`, notes: [{ at: "res.headersSent", text: "too late to change the reply" }] },
            { code: `app.use((err, req, res, next) => {
  const status = err.statusCode ?? err.status ?? 500
  const error = status < 500 ? err.message : 'failed'
  res.status(status).json({ error })
})`, notes: [{ at: "status < 500", text: "only client errors show detail" }] }
          ]
        }
      ]
    },
    {
      id: "cookies-sessions",
      n: 9,
      title: "cookies & sessions",
      concepts: [
        {
          id: "set-cookie", n: 1, title: "set a cookie", level: 1,
          gloss: "Sends a cookie to the browser with res.cookie.",
          examples: [
            { code: `app.get('/theme', (req, res) => {
  res.cookie('theme', 'dark')
  res.send('saved')
})`, notes: [{ at: "res.cookie", text: "assumes app = express()" }] },
            { code: `app.get('/login', (req, res) => {
  res.cookie('token', 'abc123', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  })
  res.sendStatus(204)
})`, notes: [{ at: "httpOnly", text: "hidden from page scripts" }, { at: "sameSite", text: "limits cross-site sending" }] },
            { code: `app.get('/visit', (req, res) => {
  res.cookie('visited', '1', { maxAge: 86_400_000 })
  res.send('welcome')
})`, notes: [{ at: "maxAge", text: "lifetime in milliseconds" }] },
            { code: `app.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.sendStatus(204)
})`, notes: [{ at: "clearCookie", text: "expires the cookie" }] }
          ]
        },
        {
          id: "read-cookie", n: 2, title: "read cookies", level: 1,
          gloss: "Reads incoming cookies from req.cookies once cookie-parser has run.",
          examples: [
            { code: `app.use(cookieParser())

app.get('/theme', (req, res) => {
  res.json({ theme: req.cookies.theme ?? 'light' })
})`, notes: [{ at: "cookieParser()", text: "from the cookie-parser package" }] },
            { code: `app.use(cookieParser('s3cret'))

app.get('/me', (req, res) => {
  res.json({ user: req.signedCookies.user })
})`, notes: [{ at: "'s3cret'", text: "secret used to sign cookies" }] },
            { code: `app.use(cookieParser('s3cret'))

app.get('/sign', (req, res) => {
  res.cookie('user', 'ada', { signed: true })
  res.sendStatus(204)
})`, notes: [{ at: "signed: true", text: "adds a tamper check" }] }
          ]
        },
        {
          id: "sessions", n: 3, title: "sessions", level: 2,
          gloss: "Keeps per-visitor state in req.session with express-session.",
          examples: [
            { code: `app.use(session({
  secret: 's3cret',
  resave: false,
  saveUninitialized: false,
}))

app.get('/views', (req, res) => {
  req.session.views = (req.session.views ?? 0) + 1
  res.json({ views: req.session.views })
})`, notes: [{ at: "session(", text: "from the express-session package" }, { at: "saveUninitialized", text: "no cookie until data is set" }] },
            { code: `app.use(session({
  secret: 's3cret', resave: false, saveUninitialized: false,
}))

app.post('/login', (req, res) => {
  req.session.userId = 42
  res.sendStatus(204)
})`, notes: [{ at: "req.session.userId", text: "stored on the server" }] },
            { code: `app.use(session({
  secret: 's3cret', resave: false, saveUninitialized: false,
}))

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.sendStatus(204))
})`, notes: [{ at: "destroy", text: "ends the session" }] }
          ]
        }
      ]
    },
    {
      id: "cors-headers",
      n: 10,
      title: "CORS & headers",
      concepts: [
        {
          id: "cors-middleware", n: 1, title: "CORS middleware", level: 1,
          gloss: "Allows cross-origin requests with the cors package.",
          examples: [
            { code: `app.use(cors())`, notes: [{ at: "cors()", text: "from the cors package, assumed" }] },
            { code: `app.use(cors({ origin: 'https://shop.example.com' }))`, notes: [{ at: "origin", text: "one allowed site" }] },
            { code: `app.use(cors({
  origin: ['https://shop.example.com', 'https://admin.example.com'],
}))`, notes: [{ at: "origin: [", text: "a list of allowed sites" }] },
            { code: `app.use(cors({ origin: true, credentials: true }))`, notes: [{ at: "credentials", text: "lets cookies cross origins" }] }
          ]
        },
        {
          id: "manual-cors", n: 2, title: "manual cors headers", level: 2,
          gloss: "Sets cors headers by hand with res.set when the package is not used.",
          examples: [
            { code: `app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://shop.example.com')
  next()
})`, notes: [{ at: "Access-Control-Allow-Origin", text: "the allowed site" }] },
            { code: `app.options('/orders', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  res.sendStatus(204)
})`, notes: [{ at: "app.options", text: "answers the preflight request" }] },
            { code: `app.use((req, res, next) => {
  res.vary('Origin')
  next()
})`, notes: [{ at: "res.vary", text: "caches keep one copy per origin" }] }
          ]
        },
        {
          id: "request-headers", n: 3, title: "request headers", level: 1,
          gloss: "Reads request headers case-insensitively with req.get and req.accepts.",
          examples: [
            { code: `app.get('/agent', (req, res) => {
  res.json({ agent: req.get('user-agent') })
})`, notes: [{ at: "req.get", text: "name is case-insensitive" }] },
            { code: `app.get('/type', (req, res) => {
  res.json({ type: req.headers['content-type'] ?? null })
})`, notes: [{ at: "req.headers", text: "plain object, lowercase keys" }] },
            { code: `app.get('/negotiate', (req, res) => {
  res.json({ type: req.accepts(['json', 'html']) })
})`, notes: [{ at: "req.accepts", text: "picks from the accept header" }] }
          ]
        },
        {
          id: "response-headers", n: 4, title: "response headers", level: 1,
          gloss: "Sets response headers with res.set, res.append and res.type.",
          examples: [
            { code: `app.get('/cached', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600')
  res.send('cached')
})`, notes: [{ at: "res.set", text: "replaces any earlier value" }] },
            { code: `app.get('/version', (req, res) => {
  res.set({ 'X-Version': '2', 'X-Region': 'eu' })
  res.send('ok')
})`, notes: [{ at: "res.set({", text: "several headers at once" }] },
            { code: `app.get('/page', (req, res) => {
  res.append('Link', '</page/2>; rel="next"')
  res.send('page 1')
})`, notes: [{ at: "res.append", text: "adds without replacing" }] },
            { code: `app.get('/export.csv', (req, res) => {
  res.type('text/csv').send('id,total\\n1,42')
})`, notes: [{ at: "res.type", text: "sets content-type" }] }
          ]
        }
      ]
    },
    {
      id: "async-handlers",
      n: 11,
      title: "async handlers",
      concepts: [
        {
          id: "async-route", n: 1, title: "async handlers", level: 1,
          gloss: "Uses async functions as handlers and awaits data before responding.",
          examples: [
            { code: `const getUser = async (id) => ({ id, name: 'Ada' })

app.get('/users/:id', async (req, res) => {
  res.json(await getUser(req.params.id))
})`, notes: [{ at: "async", text: "assumes app = express()" }, { at: "await", text: "pauses only this request" }] },
            { code: `const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

app.get('/slow', async (req, res) => {
  await sleep(50)
  res.send('done')
})`, notes: [{ at: "sleep", text: "a promise that resolves later" }] },
            { code: `const findOrder = async (id) => (id === '1' ? { id, total: 42 } : null)

app.get('/orders/:id', async (req, res) => {
  const order = await findOrder(req.params.id)
  if (!order) return res.sendStatus(404)
  res.json(order)
})`, notes: [{ at: "return res.sendStatus", text: "ends the handler early" }] }
          ]
        },
        {
          id: "async-errors", n: 2, title: "rejected promises", level: 1,
          gloss: "Forwards a rejected promise from an async handler to the error handler in Express 5.",
          examples: [
            { code: `app.get('/boom', async () => {
  throw new Error('db down')
})
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})`, notes: [{ at: "async ()", text: "no try and catch needed" }] },
            { code: `const load = async () => {
  throw new Error('timeout')
}
app.get('/data', async (req, res) => {
  res.json(await load())
})
app.use((err, req, res, next) => {
  res.status(502).json({ error: err.message })
})`, notes: [{ at: "await load()", text: "a rejection reaches the handler" }] },
            { code: `app.get('/orders/:id', async (req, res) => {
  const order = await Promise.reject(new Error('lookup failed'))
  res.json(order)
})
app.use((err, req, res, next) => res.status(500).send(err.message))`, notes: [{ at: "Promise.reject", text: "same path as a thrown error" }] }
          ]
        },
        {
          id: "parallel-awaits", n: 3, title: "parallel awaits", level: 2,
          gloss: "Runs independent lookups together with Promise.all before responding.",
          examples: [
            { code: `const getUser = async () => ({ name: 'Ada' })
const getOrders = async () => [1, 2]

app.get('/dashboard', async (req, res) => {
  const [user, orders] = await Promise.all([getUser(), getOrders()])
  res.json({ user, orders })
})`, notes: [{ at: "Promise.all", text: "total time is the slowest call" }] },
            { code: `const getStock = async () => 12
const getPrice = async () => 4.5

app.get('/offer', async (req, res) => {
  const [stock, price] = await Promise.all([getStock(), getPrice()])
  res.json({ stock, price })
})`, notes: [{ at: "[stock, price]", text: "results keep call order" }] },
            { code: `const check = async (name) => ({ name, up: true })

app.get('/status', async (req, res) => {
  const out = await Promise.allSettled([check('db'), check('cache')])
  res.json(out.map((r) => r.value ?? null))
})`, notes: [{ at: "allSettled", text: "one failure does not reject" }] }
          ]
        },
        {
          id: "background-work", n: 4, title: "work after the response", level: 3,
          gloss: "Starts slow work after responding so the client does not wait.",
          examples: [
            { code: `const sendWelcome = (email) => console.log('welcome', email)

app.post('/signup', (req, res) => {
  res.status(202).json({ queued: true })
  setImmediate(() => sendWelcome('ada@example.com'))
})`, notes: [{ at: "202", text: "accepted for later processing" }] },
            { code: `app.get('/report', (req, res) => {
  res.on('finish', () => console.log('response sent'))
  res.send('report')
})`, notes: [{ at: "'finish'", text: "fires after the reply is flushed" }] },
            { code: `const audit = []

app.delete('/orders/:id', (req, res) => {
  res.sendStatus(204)
  queueMicrotask(() => audit.push(req.params.id))
})`, notes: [{ at: "queueMicrotask", text: "runs right after this handler" }] }
          ]
        }
      ]
    },
    {
      id: "response-helpers",
      n: 12,
      title: "response helpers",
      concepts: [
        {
          id: "res-json", n: 1, title: "JSON responses", level: 1,
          gloss: "Sends objects and arrays as json with res.json and a status code.",
          examples: [
            { code: `app.get('/ok', (req, res) => {
  res.json({ ok: true })
})`, notes: [{ at: "res.json", text: "assumes app = express()" }] },
            { code: `app.post('/orders', (req, res) => {
  res.status(201).json({ id: 7 })
})`, notes: [{ at: "res.status(201)", text: "chained before json" }] },
            { code: `app.get('/prices', (req, res) => {
  res.json([{ sku: 'a1', price: 2.5 }, { sku: 'b2', price: 4 }])
})`, notes: [{ at: "[", text: "arrays are valid json bodies" }] }
          ]
        },
        {
          id: "res-redirect", n: 2, title: "redirects", level: 2,
          gloss: "Redirects to another path or url with res.redirect.",
          examples: [
            { code: `app.get('/old', (req, res) => {
  res.redirect('/new')
})`, notes: [{ at: "redirect", text: "status 302 by default" }] },
            { code: `app.get('/legacy', (req, res) => {
  res.redirect(301, '/orders')
})`, notes: [{ at: "301", text: "permanent redirect" }] },
            { code: `app.get('/docs', (req, res) => {
  res.redirect('https://example.com/docs')
})`, notes: [{ at: "https://", text: "absolute urls work too" }] }
          ]
        },
        {
          id: "res-format", n: 3, title: "content negotiation", level: 2,
          gloss: "Picks a response by the Accept header with res.format.",
          examples: [
            { code: `app.get('/orders', (req, res) => {
  res.format({
    json: () => res.json([{ id: 1 }]),
    text: () => res.send('1 order'),
  })
})`, notes: [{ at: "res.format", text: "one handler per type" }] },
            { code: `app.get('/report', (req, res) => {
  res.format({
    html: () => res.send('<p>report</p>'),
    default: () => res.sendStatus(406),
  })
})`, notes: [{ at: "default", text: "used when nothing matches" }] },
            { code: `app.get('/about', (req, res) => {
  if (req.accepts('html')) return res.send('<h1>About</h1>')
  res.json({ page: 'about' })
})`, notes: [{ at: "req.accepts", text: "manual version of format" }] }
          ]
        },
        {
          id: "res-download", n: 4, title: "downloads", level: 2,
          gloss: "Sends a file or generated text as an attachment.",
          examples: [
            { code: `app.get('/export', (req, res) => {
  res.download('files/report.pdf')
})`, notes: [{ at: "res.download", text: "sets content-disposition" }] },
            { code: `app.get('/export.csv', (req, res) => {
  res.attachment('orders.csv').send('id,total\\n1,42')
})`, notes: [{ at: "res.attachment", text: "names the download" }] },
            { code: `app.get('/invoice', (req, res) => {
  res.download('files/report.pdf', 'invoice.pdf', (err) => {
    if (err && !res.headersSent) res.sendStatus(404)
  })
})`, notes: [{ at: "(err)", text: "runs when the transfer ends" }] }
          ]
        },
        {
          id: "res-locals", n: 5, title: "response locals", level: 3,
          gloss: "Passes values to later middleware and templates with res.locals.",
          examples: [
            { code: `app.use((req, res, next) => {
  res.locals.user = { name: 'Ada' }
  next()
})
app.get('/me', (req, res) => res.json(res.locals.user))`, notes: [{ at: "res.locals", text: "lives for one request" }] },
            { code: `app.use((req, res, next) => {
  res.locals.requestId = crypto.randomUUID()
  next()
})
app.get('/id', (req, res) => res.send(res.locals.requestId))`, notes: [{ at: "crypto.randomUUID", text: "unique value per request" }] },
            { code: `app.use((req, res, next) => {
  res.locals.now = new Date().toISOString()
  next()
})
app.get('/time', (req, res) => res.json({ now: res.locals.now }))`, notes: [{ at: "res.locals.now", text: "read by a later handler" }] }
          ]
        }
      ]
    }
  ]
};
