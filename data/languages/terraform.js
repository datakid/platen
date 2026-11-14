export default {
  id: "terraform",
  name: "Terraform",
  short: "TF",
  pigment: "terraform",
  family: null,
  version: "1.x",
  lexer: "terraform",
  indent: 2,
  topics: [
    {
      id: "blocks-arguments",
      n: 1,
      title: "blocks and arguments",
      concepts: [
        {
          id: "block-syntax", n: 1, title: "block syntax", level: 1,
          gloss: "Declares infrastructure with typed blocks that hold arguments.",
          examples: [
            { code: `resource "aws_s3_bucket" "logs" {
  bucket = "acme-logs-2026"
}`, notes: [{ at: "resource", text: "block type" }, { at: "\"logs\"", text: "local name" }] },
            { code: `resource "aws_instance" "web" {
  ami           = "ami-0abcd1234example"
  instance_type = "t3.micro"
}`, notes: [] },
            { code: `resource "terraform_data" "marker" {
  input = "deployed"
}`, notes: [] }
          ]
        },
        {
          id: "argument-values", n: 2, title: "argument values", level: 1,
          gloss: "Assigns strings, numbers, booleans, lists and maps to arguments.",
          examples: [
            { code: `locals {
  retries = 3
  enabled = true
  region  = "eu-west-1"
}`, notes: [{ at: "locals", text: "named values for reuse" }] },
            { code: `locals {
  zones = ["eu-west-1a", "eu-west-1b"]
}`, notes: [] },
            { code: `locals {
  tags = {
    team = "data"
    env  = "prod"
  }
}`, notes: [] }
          ]
        },
        {
          id: "nested-blocks", n: 3, title: "nested blocks", level: 2,
          gloss: "Nests blocks inside a resource for structured settings.",
          examples: [
            { code: `resource "aws_instance" "web" {
  ami           = "ami-0abcd1234example"
  instance_type = "t3.micro"

  root_block_device {
    volume_size = 30
  }
}`, notes: [{ at: "root_block_device", text: "a nested block" }] },
            { code: `resource "aws_security_group" "web" {
  name = "web"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`, notes: [] },
            { code: `resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443

  default_action {
    type = "forward"
  }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "input-variables",
      n: 2,
      title: "input variables",
      concepts: [
        {
          id: "variable-declaration", n: 1, title: "variable declaration", level: 1,
          gloss: "Declares an input with a type, a default and a description.",
          examples: [
            { code: `variable "region" {
  type        = string
  default     = "eu-west-1"
  description = "Region for all resources."
}`, notes: [{ at: "type", text: "constrains the value" }, { at: "default", text: "used when no value is given" }] },
            { code: `variable "instance_count" {
  type    = number
  default = 2
}`, notes: [] },
            { code: `variable "enable_logs" {
  type    = bool
  default = false
}`, notes: [] }
          ]
        },
        {
          id: "validation-rules", n: 2, title: "validation rules", level: 2,
          gloss: "Rejects bad input early with a validation block and an error message.",
          examples: [
            { code: `variable "env" {
  type = string

  validation {
    condition     = contains(["dev", "prod"], var.env)
    error_message = "env must be dev or prod."
  }
}`, notes: [{ at: "condition", text: "must be true to pass" }] },
            { code: `variable "port" {
  type = number

  validation {
    condition     = var.port >= 1024 && var.port <= 65535
    error_message = "port must be between 1024 and 65535."
  }
}`, notes: [] },
            { code: `variable "bucket" {
  type = string

  validation {
    condition     = can(regex("^[a-z0-9-]+$", var.bucket))
    error_message = "Use lowercase letters, digits and hyphens."
  }
}`, notes: [{ at: "can(", text: "turns an error into false" }] }
          ]
        },
        {
          id: "sensitive-nullable", n: 3, title: "sensitive and nullable", level: 2,
          gloss: "Hides secret values in output and controls whether null is accepted.",
          examples: [
            { code: `variable "db_password" {
  type      = string
  sensitive = true
}`, notes: [{ at: "sensitive", text: "redacted in plan output" }] },
            { code: `variable "owner" {
  type     = string
  default  = null
  nullable = true
}`, notes: [] },
            { code: `variable "cidr" {
  type     = string
  nullable = false
  default  = "10.0.0.0/16"
}`, notes: [{ at: "nullable = false", text: "null falls back to default" }] }
          ]
        }
      ]
    },
    {
      id: "locals-outputs",
      n: 3,
      title: "locals and outputs",
      concepts: [
        {
          id: "locals", n: 1, title: "locals", level: 1,
          gloss: "Names an expression once so it can be reused across the module.",
          examples: [
            { code: `variable "app" {
  type    = string
  default = "billing"
}

locals {
  prefix = "\${var.app}-prod"
}`, notes: [{ at: "local", text: "referenced as local.prefix" }] },
            { code: `locals {
  base_tags = { team = "data" }
  tags      = merge(local.base_tags, { env = "prod" })
}`, notes: [] },
            { code: `locals {
  ports = [80, 443]
  total = length(local.ports)
}`, notes: [] }
          ]
        },
        {
          id: "outputs", n: 2, title: "outputs", level: 1,
          gloss: "Exposes a value after apply with an output block.",
          examples: [
            { code: `resource "terraform_data" "app" {
  input = "v1"
}

output "app_id" {
  value = terraform_data.app.id
}`, notes: [{ at: "output", text: "printed after apply" }] },
            { code: `locals {
  endpoint = "https://api.example.com"
}

output "endpoint" {
  value       = local.endpoint
  description = "Public API address."
}`, notes: [] },
            { code: `variable "token" {
  type    = string
  default = "demo"
}

output "token" {
  value     = var.token
  sensitive = true
}`, notes: [] }
          ]
        },
        {
          id: "chained-locals", n: 3, title: "chained locals", level: 2,
          gloss: "Builds one local from another to keep expressions short.",
          examples: [
            { code: `locals {
  env    = "prod"
  prefix = "app-\${local.env}"
  bucket = "\${local.prefix}-assets"
}`, notes: [{ at: "local.env", text: "reads a sibling local" }] },
            { code: `locals {
  cidr    = "10.0.0.0/16"
  subnets = [cidrsubnet(local.cidr, 8, 1), cidrsubnet(local.cidr, 8, 2)]
}`, notes: [] },
            { code: `locals {
  names = ["web", "api"]
  upper = [for n in local.names : upper(n)]
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "types-collections",
      n: 4,
      title: "types and collections",
      concepts: [
        {
          id: "primitive-types", n: 1, title: "primitive types", level: 1,
          gloss: "Constrains a variable to a string, number or bool.",
          examples: [
            { code: `variable "name" {
  type = string
}`, notes: [{ at: "string", text: "text value" }] },
            { code: `variable "replicas" {
  type    = number
  default = 3
}`, notes: [] },
            { code: `variable "public" {
  type    = bool
  default = true
}`, notes: [] }
          ]
        },
        {
          id: "collection-types", n: 2, title: "collection types", level: 1,
          gloss: "Declares lists, maps and sets with an element type.",
          examples: [
            { code: `variable "zones" {
  type    = list(string)
  default = ["a", "b"]
}`, notes: [{ at: "list(string)", text: "ordered strings" }] },
            { code: `variable "limits" {
  type    = map(number)
  default = { cpu = 2, memory = 4 }
}`, notes: [] },
            { code: `variable "admins" {
  type    = set(string)
  default = ["ada", "grace"]
}`, notes: [{ at: "set", text: "unique, unordered" }] }
          ]
        },
        {
          id: "structural-types", n: 3, title: "object and tuple types", level: 2,
          gloss: "Describes records with named attributes and optional defaults.",
          examples: [
            { code: `variable "server" {
  type = object({
    name = string
    port = number
  })
}`, notes: [{ at: "object(", text: "fixed attribute names" }] },
            { code: `variable "settings" {
  type = object({
    region = string
    tier   = optional(string, "standard")
  })
}`, notes: [{ at: "optional(", text: "attribute may be omitted" }] },
            { code: `variable "pair" {
  type    = tuple([string, number])
  default = ["web", 80]
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "expressions",
      n: 5,
      title: "expressions",
      concepts: [
        {
          id: "string-templates", n: 1, title: "string templates", level: 1,
          gloss: "Builds strings by interpolating values with a dollar and braces.",
          examples: [
            { code: `locals {
  name = "app"
  tag  = "\${local.name}-prod"
}`, notes: [{ at: "${", text: "starts an interpolation" }] },
            { code: `locals {
  greeting = "Hello, \${upper("ada")}!"
}`, notes: [] },
            { code: `locals {
  script = <<-EOT
    echo starting
    echo done
  EOT
}`, notes: [{ at: "<<-EOT", text: "indented heredoc" }] }
          ]
        },
        {
          id: "conditionals", n: 2, title: "conditional expressions", level: 1,
          gloss: "Chooses between two values with a ternary expression.",
          examples: [
            { code: `variable "env" {
  default = "dev"
}

locals {
  size = var.env == "prod" ? 3 : 1
}`, notes: [{ at: "?", text: "then" }, { at: ":", text: "else" }] },
            { code: `variable "create" {
  default = true
}

locals {
  names = var.create ? ["web"] : []
}`, notes: [] },
            { code: `locals {
  zone = length("abc") > 2 ? "long" : "short"
}`, notes: [] }
          ]
        },
        {
          id: "operators", n: 3, title: "operators", level: 1,
          gloss: "Combines values with arithmetic, comparison and logical operators.",
          examples: [
            { code: `locals {
  total = 2 * 3 + 4
  half  = 10 / 4
  rest  = 10 % 4
}`, notes: [] },
            { code: `locals {
  ok = 5 >= 3 && 2 != 4
}`, notes: [{ at: "&&", text: "logical and" }] },
            { code: `locals {
  blocked = !true || false
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "for-splat",
      n: 6,
      title: "for and splat",
      concepts: [
        {
          id: "for-lists", n: 1, title: "for over lists", level: 2,
          gloss: "Transforms or filters a list with a for expression.",
          examples: [
            { code: `locals {
  names = ["web", "api"]
  upper = [for n in local.names : upper(n)]
}`, notes: [{ at: "[for", text: "builds a tuple" }] },
            { code: `locals {
  ports = [22, 80, 443, 8080]
  low   = [for p in local.ports : p if p < 1024]
}`, notes: [{ at: "if p < 1024", text: "filters items" }] },
            { code: `locals {
  users = ["ada", "grace"]
  tags  = [for i, u in local.users : "\${i}-\${u}"]
}`, notes: [] }
          ]
        },
        {
          id: "for-maps", n: 2, title: "for into maps", level: 2,
          gloss: "Builds or reshapes a map with a for expression and an arrow.",
          examples: [
            { code: `locals {
  envs = ["dev", "prod"]
  size = { for e in local.envs : e => upper(e) }
}`, notes: [{ at: "=>", text: "pairs a key with a value" }] },
            { code: `locals {
  limits = { cpu = 2, memory = 4 }
  double = { for k, v in local.limits : k => v * 2 }
}`, notes: [] },
            { code: `locals {
  staff = [
    { name = "ada", team = "eng" },
    { name = "alan", team = "eng" },
  ]
  by_team = { for s in local.staff : s.team => s.name... }
}`, notes: [{ at: "...", text: "groups values by key" }] }
          ]
        },
        {
          id: "splat", n: 3, title: "splat expressions", level: 2,
          gloss: "Collects one attribute from every instance with the star operator.",
          examples: [
            { code: `resource "terraform_data" "node" {
  count = 3
  input = "node-\${count.index}"
}

output "ids" {
  value = terraform_data.node[*].id
}`, notes: [{ at: "[*]", text: "every instance" }] },
            { code: `locals {
  servers = [{ name = "a" }, { name = "b" }]
  names   = local.servers[*].name
}`, notes: [] },
            { code: `resource "terraform_data" "item" {
  for_each = toset(["x", "y"])
  input    = each.key
}

output "values" {
  value = values(terraform_data.item)[*].output
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "functions",
      n: 7,
      title: "functions",
      concepts: [
        {
          id: "string-functions", n: 1, title: "string functions", level: 1,
          gloss: "Transforms text with built in functions for joining, splitting and formatting.",
          examples: [
            { code: `locals {
  csv   = join(",", ["a", "b", "c"])
  parts = split("-", "eu-west-1")
}`, notes: [{ at: "join", text: "list to string" }] },
            { code: `locals {
  label = format("%s-%03d", "app", 7)
  clean = trimspace("  prod  ")
}`, notes: [{ at: "format", text: "printf style template" }] },
            { code: `locals {
  lower = lower("PROD")
  slug  = replace("My App", " ", "-")
  start = startswith("prod-db", "prod")
}`, notes: [] }
          ]
        },
        {
          id: "collection-functions", n: 2, title: "collection functions", level: 1,
          gloss: "Reshapes lists and maps with built in functions that measure, merge and look up.",
          examples: [
            { code: `locals {
  all = concat(["a"], ["b", "c"])
  n   = length(local.all)
}`, notes: [{ at: "concat", text: "joins lists" }] },
            { code: `locals {
  base   = { env = "prod" }
  tags   = merge(local.base, { team = "data" })
  region = lookup(local.tags, "region", "eu-west-1")
}`, notes: [{ at: "lookup", text: "value with a fallback" }] },
            { code: `locals {
  nested = [["a", "b"], ["b", "c"]]
  flat   = distinct(flatten(local.nested))
  keys   = keys({ cpu = 2, mem = 4 })
}`, notes: [] }
          ]
        },
        {
          id: "numeric-encoding", n: 3, title: "numbers and encoding", level: 2,
          gloss: "Rounds numbers and converts values to JSON, base64 and CIDR blocks.",
          examples: [
            { code: `locals {
  big   = max(3, 9, 4)
  pages = ceil(10 / 3)
}`, notes: [{ at: "ceil", text: "rounds up" }] },
            { code: `locals {
  doc  = jsonencode({ name = "app", ports = [80, 443] })
  back = jsondecode(local.doc)
}`, notes: [{ at: "jsonencode", text: "value to JSON text" }] },
            { code: `locals {
  net  = "10.0.0.0/16"
  web  = cidrsubnet(local.net, 8, 1)
  hash = sha256("app")
}`, notes: [{ at: "cidrsubnet", text: "carves out a subnet" }] }
          ]
        }
      ]
    },
    {
      id: "references",
      n: 8,
      title: "resources and references",
      concepts: [
        {
          id: "attribute-references", n: 1, title: "attribute references", level: 1,
          gloss: "Reads an attribute of another resource to pass data between them.",
          examples: [
            { code: `resource "terraform_data" "first" {
  input = "alpha"
}

resource "terraform_data" "second" {
  input = terraform_data.first.output
}`, notes: [{ at: "terraform_data.first.output", text: "type, name, then attribute" }] },
            { code: `resource "terraform_data" "db" {
  input = "db.internal"
}

locals {
  url = "postgres://\${terraform_data.db.output}:5432"
}`, notes: [] },
            { code: `resource "terraform_data" "a" {
  input = 1
}

output "a_id" {
  value = terraform_data.a.id
}`, notes: [] }
          ]
        },
        {
          id: "implicit-order", n: 2, title: "implicit ordering", level: 2,
          gloss: "Orders creation automatically from the references between resources.",
          examples: [
            { code: `resource "terraform_data" "network" {
  input = "net"
}

resource "terraform_data" "server" {
  input = terraform_data.network.id
}`, notes: [{ at: "terraform_data.network.id", text: "creates the dependency" }] },
            { code: `resource "terraform_data" "bucket" {
  input = "assets"
}

resource "terraform_data" "policy" {
  input = "allow \${terraform_data.bucket.output}"
}`, notes: [] },
            { code: `resource "terraform_data" "key" {
  input = "kms"
}

resource "terraform_data" "disk" {
  input = "encrypted by \${terraform_data.key.id}"
}`, notes: [] }
          ]
        },
        {
          id: "depends-on", n: 3, title: "depends_on", level: 2,
          gloss: "Forces an ordering that no attribute reference expresses.",
          examples: [
            { code: `resource "terraform_data" "setup" {
  input = "migrate"
}

resource "terraform_data" "app" {
  input      = "start"
  depends_on = [terraform_data.setup]
}`, notes: [{ at: "depends_on", text: "explicit dependency" }] },
            { code: `resource "terraform_data" "role" {
  input = "iam"
}

resource "terraform_data" "job" {
  input      = "run"
  depends_on = [terraform_data.role]
}`, notes: [] },
            { code: `resource "terraform_data" "dns" {
  input = "zone"
}

resource "terraform_data" "cert" {
  input      = "tls"
  depends_on = [terraform_data.dns]
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "count-for-each",
      n: 9,
      title: "count and for_each",
      concepts: [
        {
          id: "count", n: 1, title: "count", level: 1,
          gloss: "Creates several copies of a resource from a number.",
          examples: [
            { code: `resource "terraform_data" "worker" {
  count = 3
  input = "worker-\${count.index}"
}`, notes: [{ at: "count.index", text: "zero based position" }] },
            { code: `variable "enabled" {
  default = true
}

resource "terraform_data" "optional" {
  count = var.enabled ? 1 : 0
  input = "on"
}`, notes: [{ at: "? 1 : 0", text: "switches a resource on or off" }] },
            { code: `locals {
  names = ["web", "api"]
}

resource "terraform_data" "svc" {
  count = length(local.names)
  input = local.names[count.index]
}`, notes: [] }
          ]
        },
        {
          id: "for-each-set", n: 2, title: "for_each with a set", level: 2,
          gloss: "Creates one resource per item of a set with a stable key.",
          examples: [
            { code: `resource "terraform_data" "user" {
  for_each = toset(["ada", "grace"])
  input    = each.key
}`, notes: [{ at: "each.key", text: "the set item" }, { at: "toset", text: "converts a list to a set" }] },
            { code: `variable "buckets" {
  default = ["logs", "assets"]
}

resource "terraform_data" "bucket" {
  for_each = toset(var.buckets)
  input    = "acme-\${each.key}"
}`, notes: [] },
            { code: `locals {
  zones = toset(["a", "b", "c"])
}

resource "terraform_data" "zone" {
  for_each = local.zones
  input    = "zone-\${each.value}"
}`, notes: [] }
          ]
        },
        {
          id: "for-each-map", n: 3, title: "for_each with a map", level: 2,
          gloss: "Creates one resource per map entry and reads its key and value.",
          examples: [
            { code: `resource "terraform_data" "server" {
  for_each = {
    web = "t3.small"
    api = "t3.medium"
  }
  input = "\${each.key}:\${each.value}"
}`, notes: [{ at: "each.value", text: "the map value" }] },
            { code: `locals {
  users = {
    ada   = { role = "admin" }
    grace = { role = "dev" }
  }
}

resource "terraform_data" "user" {
  for_each = local.users
  input    = each.value.role
}`, notes: [] },
            { code: `variable "ports" {
  default = { http = 80, https = 443 }
}

resource "terraform_data" "rule" {
  for_each = var.ports
  input    = "\${each.key}-\${each.value}"
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "dynamic-blocks",
      n: 10,
      title: "dynamic blocks",
      concepts: [
        {
          id: "dynamic-basics", n: 1, title: "dynamic basics", level: 2,
          gloss: "Generates repeated nested blocks from a collection.",
          examples: [
            { code: `resource "aws_security_group" "web" {
  name = "web"

  dynamic "ingress" {
    for_each = [80, 443]
    content {
      from_port = ingress.value
      to_port   = ingress.value
      protocol  = "tcp"
    }
  }
}`, notes: [{ at: "dynamic", text: "repeats a nested block" }, { at: "content", text: "the body of each block" }] },
            { code: `resource "aws_lb_listener" "app" {
  port = 443

  dynamic "default_action" {
    for_each = ["forward"]
    content {
      type = default_action.value
    }
  }
}`, notes: [] },
            { code: `resource "aws_instance" "db" {
  dynamic "ebs_block_device" {
    for_each = [20, 50]
    content {
      device_name = "/dev/sd\${ebs_block_device.key}"
      volume_size = ebs_block_device.value
    }
  }
}`, notes: [] }
          ]
        },
        {
          id: "dynamic-iterator", n: 2, title: "iterator names", level: 2,
          gloss: "Renames the loop variable with the iterator argument.",
          examples: [
            { code: `resource "aws_security_group" "web" {
  dynamic "ingress" {
    for_each = [80, 443]
    iterator = port
    content {
      from_port = port.value
      to_port   = port.value
      protocol  = "tcp"
    }
  }
}`, notes: [{ at: "iterator", text: "custom loop name" }] },
            { code: `resource "aws_instance" "web" {
  dynamic "root_block_device" {
    for_each = [30]
    iterator = disk
    content {
      volume_size = disk.value
    }
  }
}`, notes: [] },
            { code: `resource "aws_lb" "main" {
  dynamic "access_logs" {
    for_each = ["logs"]
    iterator = target
    content {
      bucket  = target.value
      enabled = true
    }
  }
}`, notes: [] }
          ]
        },
        {
          id: "dynamic-optional", n: 3, title: "optional blocks", level: 2,
          gloss: "Adds a nested block only when a condition holds.",
          examples: [
            { code: `resource "aws_lb" "main" {
  dynamic "access_logs" {
    for_each = var.logging ? [1] : []
    content {
      bucket  = "acme-lb-logs"
      enabled = true
    }
  }
}`, notes: [{ at: "[1] : []", text: "one block or none" }] },
            { code: `resource "aws_ebs_volume" "data" {
  size = 20

  dynamic "tag_specifications" {
    for_each = var.encrypt ? [1] : []
    content {
      resource_type = "volume"
    }
  }
}`, notes: [] },
            { code: `variable "cert" {
  default = null
}

resource "aws_lb_listener" "https" {
  dynamic "default_action" {
    for_each = var.cert == null ? [] : [var.cert]
    content {
      type = "forward"
    }
  }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "data-sources",
      n: 11,
      title: "data sources",
      concepts: [
        {
          id: "data-blocks", n: 1, title: "data blocks", level: 1,
          gloss: "Reads existing infrastructure with a data block.",
          examples: [
            { code: `data "aws_caller_identity" "current" {}`, notes: [{ at: "data", text: "read only lookup" }] },
            { code: `data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
}`, notes: [] },
            { code: `data "aws_vpc" "main" {
  default = true
}`, notes: [] }
          ]
        },
        {
          id: "data-references", n: 2, title: "data references", level: 1,
          gloss: "Uses a data source attribute with the data prefix.",
          examples: [
            { code: `data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
}`, notes: [{ at: "data.aws_ami.ubuntu.id", text: "data prefix then type and name" }] },
            { code: `data "aws_caller_identity" "current" {}

output "account" {
  value = data.aws_caller_identity.current.account_id
}`, notes: [] },
            { code: `data "aws_availability_zones" "all" {}

locals {
  first_zone = data.aws_availability_zones.all.names[0]
}`, notes: [] }
          ]
        },
        {
          id: "remote-state", n: 3, title: "remote state", level: 2,
          gloss: "Reads outputs from another configuration with terraform_remote_state.",
          examples: [
            { code: `data "terraform_remote_state" "network" {
  backend = "local"
  config = {
    path = "../network/terraform.tfstate"
  }
}`, notes: [{ at: "terraform_remote_state", text: "outputs of another state" }] },
            { code: `data "terraform_remote_state" "network" {
  backend = "local"
  config = {
    path = "../network/terraform.tfstate"
  }
}

locals {
  vpc_id = data.terraform_remote_state.network.outputs.vpc_id
}`, notes: [] },
            { code: `data "terraform_remote_state" "base" {
  backend = "s3"
  config = {
    bucket = "acme-state"
    key    = "base/terraform.tfstate"
    region = "eu-west-1"
  }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "modules",
      n: 12,
      title: "modules",
      concepts: [
        {
          id: "module-calls", n: 1, title: "module calls", level: 1,
          gloss: "Calls a reusable module and passes values as arguments.",
          examples: [
            { code: `module "network" {
  source = "./modules/network"
  cidr   = "10.0.0.0/16"
}`, notes: [{ at: "source", text: "where the module lives" }] },
            { code: `module "storage" {
  source = "./modules/bucket"
  name   = "acme-assets"
}`, notes: [] },
            { code: `module "app" {
  source   = "./modules/app"
  replicas = 3
  tags     = { team = "data" }
}`, notes: [] }
          ]
        },
        {
          id: "module-outputs", n: 2, title: "module outputs", level: 2,
          gloss: "Reads a value that a module exposes with the module prefix.",
          examples: [
            { code: `module "network" {
  source = "./modules/network"
}

output "vpc_id" {
  value = module.network.vpc_id
}`, notes: [{ at: "module.network.vpc_id", text: "an output of the module" }] },
            { code: `module "network" {
  source = "./modules/network"
}

resource "aws_instance" "web" {
  subnet_id = module.network.subnet_ids[0]
}`, notes: [] },
            { code: `module "db" {
  source = "./modules/db"
}

locals {
  db_url = "postgres://\${module.db.host}:5432"
}`, notes: [] }
          ]
        },
        {
          id: "registry-modules", n: 3, title: "registry modules", level: 2,
          gloss: "Pins a published module to a version range.",
          examples: [
            { code: `module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 6.0"
  name    = "main"
}`, notes: [{ at: "~> 6.0", text: "any 6.x release" }] },
            { code: `module "s3" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "5.1.0"
}`, notes: [] },
            { code: `module "network" {
  source = "git::https://example.com/org/network.git?ref=v2.3.0"
}`, notes: [{ at: "?ref=", text: "pins a git tag" }] }
          ]
        }
      ]
    },
    {
      id: "lifecycle",
      n: 13,
      title: "lifecycle and conditions",
      concepts: [
        {
          id: "lifecycle-flags", n: 1, title: "lifecycle flags", level: 2,
          gloss: "Changes how a resource is replaced or protected with lifecycle.",
          examples: [
            { code: `resource "terraform_data" "db" {
  input = "primary"

  lifecycle {
    prevent_destroy = true
  }
}`, notes: [{ at: "prevent_destroy", text: "blocks a destroy plan" }] },
            { code: `resource "terraform_data" "app" {
  input = "v2"

  lifecycle {
    create_before_destroy = true
  }
}`, notes: [{ at: "create_before_destroy", text: "new one first" }] },
            { code: `resource "terraform_data" "cache" {
  input = "redis"
  lifecycle {
    replace_triggered_by = [terraform_data.app]
  }
}

resource "terraform_data" "app" {
  input = "v1"
}`, notes: [] }
          ]
        },
        {
          id: "ignore-changes", n: 2, title: "ignore changes", level: 2,
          gloss: "Ignores drift in chosen attributes so a plan stays quiet.",
          examples: [
            { code: `resource "terraform_data" "server" {
  input = "web"

  lifecycle {
    ignore_changes = [input]
  }
}`, notes: [{ at: "ignore_changes", text: "list of attributes" }] },
            { code: `resource "terraform_data" "fleet" {
  input = { size = 3 }

  lifecycle {
    ignore_changes = [input["size"]]
  }
}`, notes: [] },
            { code: `resource "terraform_data" "job" {
  input = "nightly"

  lifecycle {
    ignore_changes = all
  }
}`, notes: [] }
          ]
        },
        {
          id: "conditions", n: 3, title: "preconditions and postconditions", level: 3,
          gloss: "Checks assumptions before and after a resource is changed.",
          examples: [
            { code: `variable "env" { default = "prod" }

resource "terraform_data" "app" {
  input = var.env
  lifecycle {
    precondition {
      condition     = var.env != ""
      error_message = "env must not be empty."
    }
  }
}`, notes: [{ at: "precondition", text: "checked before apply" }] },
            { code: `resource "terraform_data" "svc" {
  input = "api"

  lifecycle {
    postcondition {
      condition     = self.output == "api"
      error_message = "unexpected output."
    }
  }
}`, notes: [{ at: "self", text: "the resource itself" }] },
            { code: `variable "size" { default = 3 }

resource "terraform_data" "pool" {
  input = var.size
  lifecycle {
    precondition {
      condition     = var.size > 0
      error_message = "size must be positive."
    }
  }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "providers-backends",
      n: 14,
      title: "providers and backends",
      concepts: [
        {
          id: "required-providers", n: 1, title: "required providers", level: 1,
          gloss: "Declares the Terraform version and the providers a module needs.",
          examples: [
            { code: `terraform {
  required_version = ">= 1.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}`, notes: [{ at: "required_providers", text: "source and version" }] },
            { code: `terraform {
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = ">= 3.6"
    }
  }
}`, notes: [] },
            { code: `terraform {
  required_version = "~> 1.9.0"
}`, notes: [] }
          ]
        },
        {
          id: "provider-config", n: 2, title: "provider configuration", level: 1,
          gloss: "Configures a provider with settings such as the region.",
          examples: [
            { code: `provider "aws" {
  region = "eu-west-1"
}`, notes: [{ at: "provider", text: "configures the plugin" }] },
            { code: `provider "aws" {
  region = var.region

  default_tags {
    tags = { team = "data" }
  }
}`, notes: [] },
            { code: `provider "google" {
  project = "acme-prod"
  region  = "europe-west1"
}`, notes: [] }
          ]
        },
        {
          id: "provider-alias", n: 3, title: "provider aliases", level: 2,
          gloss: "Runs a second configuration of a provider and selects it per resource.",
          examples: [
            { code: `provider "aws" {
  alias  = "east"
  region = "us-east-1"
}`, notes: [{ at: "alias", text: "a second configuration" }] },
            { code: `provider "aws" {
  alias  = "east"
  region = "us-east-1"
}

resource "aws_s3_bucket" "replica" {
  provider = aws.east
  bucket   = "acme-replica"
}`, notes: [{ at: "aws.east", text: "picks the alias" }] },
            { code: `provider "aws" {
  alias  = "dr"
  region = "eu-central-1"
}

module "backup" {
  source    = "./modules/backup"
  providers = { aws = aws.dr }
}`, notes: [] }
          ]
        },
        {
          id: "backends", n: 4, title: "backends", level: 2,
          gloss: "Stores state remotely with a backend block inside terraform.",
          examples: [
            { code: `terraform {
  backend "s3" {
    bucket = "acme-state"
    key    = "prod/terraform.tfstate"
    region = "eu-west-1"
  }
}`, notes: [{ at: "backend", text: "where state lives" }] },
            { code: `terraform {
  backend "local" {
    path = "state/terraform.tfstate"
  }
}`, notes: [] },
            { code: `terraform {
  backend "gcs" {
    bucket = "acme-state"
    prefix = "prod"
  }
}`, notes: [] }
          ]
        }
      ]
    },
    {
      id: "refactoring",
      n: 15,
      title: "refactoring blocks",
      concepts: [
        {
          id: "moved-blocks", n: 1, title: "moved blocks", level: 2,
          gloss: "Renames a resource in code without destroying the real object.",
          examples: [
            { code: `resource "terraform_data" "web" {
  input = "app"
}

moved {
  from = terraform_data.server
  to   = terraform_data.web
}`, notes: [{ at: "moved", text: "records a rename" }] },
            { code: `resource "terraform_data" "api" {
  count = 2
  input = "api"
}

moved {
  from = terraform_data.api
  to   = terraform_data.api[0]
}`, notes: [] },
            { code: `module "network" {
  source = "./modules/network"
}

moved {
  from = module.vpc
  to   = module.network
}`, notes: [] }
          ]
        },
        {
          id: "import-blocks", n: 2, title: "import blocks", level: 3,
          gloss: "Brings an existing real object under management from the configuration.",
          examples: [
            { code: `import {
  to = aws_s3_bucket.logs
  id = "acme-logs-2026"
}

resource "aws_s3_bucket" "logs" {
  bucket = "acme-logs-2026"
}`, notes: [{ at: "import", text: "adopts an existing object" }] },
            { code: `import {
  to = aws_instance.web
  id = "i-0abcd1234example"
}

resource "aws_instance" "web" {
  ami           = "ami-0abcd1234example"
  instance_type = "t3.micro"
}`, notes: [] },
            { code: `import {
  for_each = toset(["logs", "assets"])
  to       = aws_s3_bucket.managed[each.key]
  id       = "acme-\${each.key}"
}

resource "aws_s3_bucket" "managed" {
  for_each = toset(["logs", "assets"])
  bucket   = "acme-\${each.key}"
}`, notes: [] }
          ]
        },
        {
          id: "check-blocks", n: 3, title: "check blocks", level: 3,
          gloss: "Runs assertions on every plan without blocking the apply.",
          examples: [
            { code: `variable "api_up" { default = true }

check "api_health" {
  assert {
    condition     = var.api_up
    error_message = "API health check failed."
  }
}`, notes: [{ at: "check", text: "warns instead of failing" }] },
            { code: `variable "replicas" {
  default = 3
}

check "replicas" {
  assert {
    condition     = var.replicas >= 2
    error_message = "Run at least two replicas."
  }
}`, notes: [] },
            { code: `locals {
  zones = ["a", "b"]
}

check "zones" {
  assert {
    condition     = length(local.zones) == 2
    error_message = "Expected two zones."
  }
}`, notes: [] }
          ]
        },
        {
          id: "removed-blocks", n: 4, title: "removed blocks", level: 3,
          gloss: "Stops managing a resource without destroying the real object.",
          examples: [
            { code: `removed {
  from = aws_s3_bucket.logs

  lifecycle {
    destroy = false
  }
}`, notes: [{ at: "destroy = false", text: "keeps the real bucket" }] },
            { code: `removed {
  from = terraform_data.legacy

  lifecycle {
    destroy = false
  }
}`, notes: [] },
            { code: `removed {
  from = module.old_network

  lifecycle {
    destroy = false
  }
}`, notes: [] }
          ]
        }
      ]
    }
  ]
};
