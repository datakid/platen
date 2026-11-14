export default {
  id: "dockerfile",
  name: "Dockerfile",
  short: "DK",
  pigment: "dockerfile",
  family: null,
  version: "29",
  lexer: "dockerfile",
  indent: 2,
  topics: [
    {
      id: "from-base-images",
      n: 1,
      title: "from & base images",
      concepts: [
        {
          id: "from-tags", n: 1, title: "version tags", level: 1,
          gloss: "Starts an image from a base image pinned to a version tag.",
          examples: [
            { code: `FROM python:3.12-slim
WORKDIR /app`, notes: [{ at: "python:3.12-slim", text: "language version and variant" }] },
            { code: `FROM node:22-alpine
WORKDIR /app`, notes: [{ at: "alpine", text: "small musl based variant" }] },
            { code: `FROM ubuntu:24.04
RUN apt-get update`, notes: [{ at: "24.04", text: "a fixed release, not latest" }] }
          ]
        },
        {
          id: "from-scratch", n: 2, title: "scratch image", level: 2,
          gloss: "Starts from the empty scratch image to ship a single static binary.",
          examples: [
            { code: `FROM scratch
COPY server /server
ENTRYPOINT ["/server"]`, notes: [{ at: "scratch", text: "empty image with no shell" }] },
            { code: `FROM scratch
COPY --chmod=755 api /api
CMD ["/api"]`, notes: [{ at: "--chmod=755", text: "sets the executable bit" }] },
            { code: `FROM scratch
ADD rootfs.tar.xz /
CMD ["/bin/sh"]`, notes: [{ at: "ADD rootfs.tar.xz /", text: "unpacks into the root" }] }
          ]
        },
        {
          id: "from-platform", n: 3, title: "platform flag", level: 2,
          gloss: "Selects the target architecture of a base image with the --platform flag.",
          examples: [
            { code: `FROM --platform=linux/amd64 node:22-alpine
WORKDIR /app`, notes: [{ at: "--platform=linux/amd64", text: "forces one architecture" }] },
            { code: `FROM --platform=$BUILDPLATFORM golang:1.23 AS build
WORKDIR /src`, notes: [{ at: "$BUILDPLATFORM", text: "the machine doing the build" }] },
            { code: `FROM --platform=linux/arm64 debian:bookworm-slim
RUN apt-get update`, notes: [{ at: "linux/arm64", text: "os and architecture pair" }] }
          ]
        },
        {
          id: "from-alias", n: 4, title: "stage aliases", level: 1,
          gloss: "Names a stage with AS so later stages and flags can refer to it.",
          examples: [
            { code: `FROM golang:1.23 AS build
WORKDIR /src`, notes: [{ at: "AS build", text: "the stage name" }] },
            { code: `FROM node:22-alpine AS deps
COPY package.json package-lock.json ./
RUN npm ci`, notes: [{ at: "AS deps", text: "reused by later stages" }] },
            { code: `FROM python:3.12-slim AS base
ENV PYTHONUNBUFFERED=1`, notes: [{ at: "AS base", text: "other stages start from it" }] }
          ]
        }
      ]
    },
    {
      id: "run-layers",
      n: 2,
      title: "RUN & layers",
      concepts: [
        {
          id: "run-basics", n: 1, title: "RUN commands", level: 1,
          gloss: "Runs a command during the build and saves the result as a new layer.",
          examples: [
            { code: `FROM ubuntu:24.04
RUN apt-get update`, notes: [{ at: "RUN", text: "executes at build time" }] },
            { code: `FROM node:22-alpine
RUN npm install -g pnpm@9`, notes: [{ at: "-g", text: "installs globally in the image" }] },
            { code: `FROM python:3.12-slim
RUN pip install --no-cache-dir requests==2.32.3`, notes: [{ at: "--no-cache-dir", text: "keeps the layer small" }] }
          ]
        },
        {
          id: "run-chaining", n: 2, title: "chained commands", level: 1,
          gloss: "Chains commands with && so one layer holds the install and its cleanup.",
          examples: [
            { code: `FROM debian:bookworm-slim
RUN apt-get update \\
  && apt-get install -y --no-install-recommends curl \\
  && rm -rf /var/lib/apt/lists`, notes: [{ at: "&&", text: "stops at the first failure" }, { at: "rm -rf /var/lib/apt/lists", text: "cleanup in the same layer" }] },
            { code: `FROM alpine:3.20
RUN apk add --no-cache git openssh-client`, notes: [{ at: "--no-cache", text: "no package index left behind" }] },
            { code: `FROM python:3.12-slim
RUN pip install --no-cache-dir flask gunicorn \\
  && useradd --create-home app`, notes: [{ at: "\\", text: "continues the instruction" }] }
          ]
        },
        {
          id: "run-cache-mount", n: 3, title: "cache mounts", level: 2,
          gloss: "Keeps package caches between builds with a BuildKit cache mount.",
          examples: [
            { code: `FROM python:3.12-slim
RUN --mount=type=cache,target=/root/.cache/pip \\
  pip install -r requirements.txt`, notes: [{ at: "type=cache", text: "survives between builds" }, { at: "target=/root/.cache/pip", text: "the pip download cache" }] },
            { code: `FROM node:22-alpine
RUN --mount=type=cache,target=/root/.npm \\
  npm ci`, notes: [{ at: "target=/root/.npm", text: "the npm download cache" }] },
            { code: `FROM golang:1.23
RUN --mount=type=cache,target=/go/pkg/mod \\
  go build ./...`, notes: [{ at: "target=/go/pkg/mod", text: "the module cache" }] }
          ]
        },
        {
          id: "run-heredoc", n: 4, title: "heredocs", level: 3,
          gloss: "Writes a multi-line script into one RUN step with a heredoc.",
          examples: [
            { code: `FROM debian:bookworm-slim
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends curl
rm -rf /var/lib/apt/lists
EOF`, notes: [{ at: "<<EOF", text: "the body runs as one script" }] },
            { code: `FROM alpine:3.20
RUN <<EOF
set -e
adduser -D app
mkdir -p /data
chown app /data
EOF`, notes: [{ at: "set -e", text: "stop at the first failing line" }] },
            { code: `FROM python:3.12-slim
RUN python3 <<EOF
import sys
print(sys.version)
EOF`, notes: [{ at: "python3 <<EOF", text: "the body goes to python" }] }
          ]
        }
      ]
    },
    {
      id: "copy-add",
      n: 3,
      title: "COPY & ADD",
      concepts: [
        {
          id: "copy-basics", n: 1, title: "copy files", level: 1,
          gloss: "Copies files from the build context into the image.",
          examples: [
            { code: `FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/nginx.conf`, notes: [{ at: "COPY", text: "source from the build context" }] },
            { code: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt ./
COPY src/ ./src/`, notes: [{ at: "./src/", text: "trailing slash marks a directory" }] },
            { code: `FROM node:22-alpine
COPY package*.json ./
COPY . .`, notes: [{ at: "package*.json", text: "wildcard match" }] },
            { code: `FROM alpine:3.20
COPY <<EOF /etc/app.conf
listen = 8080
log = stdout
EOF`, notes: [{ at: "<<EOF", text: "inline file content" }] }
          ]
        },
        {
          id: "copy-chown", n: 2, title: "ownership and mode", level: 2,
          gloss: "Sets owner and permissions on copied files with --chown and --chmod.",
          examples: [
            { code: `FROM node:22-alpine
COPY --chown=node:node . /home/node/app`, notes: [{ at: "--chown=node:node", text: "user and group of the files" }] },
            { code: `FROM debian:bookworm-slim
COPY --chmod=755 entrypoint.sh /usr/local/bin/entrypoint.sh`, notes: [{ at: "--chmod=755", text: "executable without a separate step" }] },
            { code: `FROM python:3.12-slim
RUN useradd --create-home app
COPY --chown=app:app src/ /home/app/src/`, notes: [{ at: "app:app", text: "user must already exist" }] }
          ]
        },
        {
          id: "copy-from", n: 3, title: "copy from a stage", level: 2,
          gloss: "Copies build output from an earlier stage or another image with --from.",
          examples: [
            { code: `FROM golang:1.23 AS build
RUN go build -o /out/server .
FROM alpine:3.20
COPY --from=build /out/server /usr/local/bin/server`, notes: [{ at: "--from=build", text: "name of the earlier stage" }] },
            { code: `FROM nginx:1.27-alpine
COPY --from=node:22-alpine /usr/local/bin/node /usr/local/bin/node`, notes: [{ at: "--from=node:22-alpine", text: "an external image works too" }] },
            { code: `FROM python:3.12-slim
COPY --from=ghcr.io/astral-sh/uv:0.5 /uv /usr/local/bin/uv`, notes: [{ at: "/uv", text: "path inside the source image" }] }
          ]
        },
        {
          id: "add-sources", n: 4, title: "ADD sources", level: 2,
          gloss: "Unpacks local archives and fetches remote sources with ADD.",
          examples: [
            { code: `FROM alpine:3.20
ADD rootfs.tar.gz /`, notes: [{ at: "rootfs.tar.gz", text: "local archives are unpacked" }] },
            { code: `FROM debian:bookworm-slim
ADD --chmod=644 https://example.com/ca.pem /etc/ssl/ca.crt`, notes: [{ at: "https://example.com/ca.pem", text: "fetched at build time" }] },
            { code: `FROM alpine:3.20
ADD https://github.com/example/tools.git#v1.2 /opt/tools`, notes: [{ at: "#v1.2", text: "git tag to check out" }] }
          ]
        }
      ]
    },
    {
      id: "workdir-env-arg",
      n: 4,
      title: "WORKDIR, ENV, ARG",
      concepts: [
        {
          id: "workdir", n: 1, title: "working directory", level: 1,
          gloss: "Sets the directory that later instructions run in and creates it when missing.",
          examples: [
            { code: `FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm ci`, notes: [{ at: "WORKDIR /app", text: "created if it does not exist" }] },
            { code: `FROM python:3.12-slim
WORKDIR /srv/api
COPY . .
CMD ["python", "main.py"]`, notes: [{ at: "WORKDIR /srv/api", text: "also where cmd starts" }] },
            { code: `FROM golang:1.23
WORKDIR /src
WORKDIR cmd
RUN pwd`, notes: [{ at: "WORKDIR cmd", text: "relative to the previous one" }] }
          ]
        },
        {
          id: "env", n: 2, title: "environment variables", level: 1,
          gloss: "Defines environment variables that persist into the running container.",
          examples: [
            { code: `FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1 \\
  PYTHONDONTWRITEBYTECODE=1`, notes: [{ at: "PYTHONUNBUFFERED=1", text: "one instruction, two variables" }] },
            { code: `FROM node:22-alpine
ENV NODE_ENV=production
ENV PORT=3000`, notes: [{ at: "NODE_ENV=production", text: "visible to the running process" }] },
            { code: `FROM debian:bookworm-slim
ENV APP_HOME=/opt/app
WORKDIR $APP_HOME`, notes: [{ at: "$APP_HOME", text: "expanded from the variable" }] }
          ]
        },
        {
          id: "arg", n: 3, title: "build arguments", level: 1,
          gloss: "Declares a build-time variable that is absent from the running container.",
          examples: [
            { code: `FROM node:22-alpine
ARG NODE_ENV=development
RUN echo "$NODE_ENV" > /build-env`, notes: [{ at: "ARG", text: "exists only during the build" }] },
            { code: `FROM python:3.12-slim
ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION`, notes: [{ at: "ENV APP_VERSION=$APP_VERSION", text: "copies it into the runtime" }] },
            { code: `FROM alpine:3.20
ARG USER_ID=1000
RUN adduser -D -u $USER_ID app`, notes: [{ at: "USER_ID=1000", text: "default if none is given" }] }
          ]
        },
        {
          id: "arg-before-from", n: 4, title: "ARG before FROM", level: 2,
          gloss: "Declares an ARG ahead of FROM so the base image tag can be chosen at build time.",
          examples: [
            { code: `ARG PYTHON_VERSION=3.12
FROM python:\${PYTHON_VERSION}-slim`, notes: [{ at: "${PYTHON_VERSION}", text: "used inside the from line" }] },
            { code: `ARG NODE_VERSION=22
FROM node:\${NODE_VERSION}-alpine
ARG NODE_VERSION`, notes: [{ at: "ARG NODE_VERSION", text: "redeclared to use inside the stage" }] },
            { code: `ARG BASE=alpine:3.20
FROM \${BASE}
RUN apk add --no-cache curl`, notes: [{ at: "FROM ${BASE}", text: "the whole image can vary" }] }
          ]
        }
      ]
    },
    {
      id: "cmd-vs-entrypoint",
      n: 5,
      title: "CMD vs ENTRYPOINT",
      concepts: [
        {
          id: "cmd-default", n: 1, title: "default command", level: 1,
          gloss: "Sets the default command that runs when the container starts without arguments.",
          examples: [
            { code: `FROM node:22-alpine
CMD ["node", "server.js"]`, notes: [{ at: "CMD", text: "replaced by any run arguments" }] },
            { code: `FROM python:3.12-slim
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]`, notes: [{ at: "0.0.0.0:8000", text: "listen on all interfaces" }] },
            { code: `FROM nginx:1.27-alpine
CMD ["nginx", "-g", "daemon off;"]`, notes: [{ at: "daemon off;", text: "keeps nginx in the foreground" }] }
          ]
        },
        {
          id: "entrypoint-fixed", n: 2, title: "fixed executable", level: 1,
          gloss: "Fixes the executable so arguments given at run time are appended to it.",
          examples: [
            { code: `FROM alpine:3.20
ENTRYPOINT ["ping"]`, notes: [{ at: "ENTRYPOINT", text: "run arguments are appended" }] },
            { code: `FROM python:3.12-slim
ENTRYPOINT ["python", "-m", "http.server"]`, notes: [{ at: "\"http.server\"", text: "arguments become the port" }] },
            { code: `FROM golang:1.23
WORKDIR /src
ENTRYPOINT ["go", "test"]`, notes: [{ at: "[\"go\", \"test\"]", text: "container acts like a command" }] }
          ]
        },
        {
          id: "entrypoint-cmd", n: 3, title: "ENTRYPOINT with CMD", level: 2,
          gloss: "Pairs ENTRYPOINT with CMD so CMD supplies the default arguments.",
          examples: [
            { code: `FROM alpine:3.20
ENTRYPOINT ["ping"]
CMD ["-c", "3", "localhost"]`, notes: [{ at: "CMD", text: "default arguments only" }] },
            { code: `FROM python:3.12-slim
ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]`, notes: [{ at: "runserver", text: "replaced by run arguments" }] },
            { code: `FROM node:22-alpine
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "server.js"]`, notes: [{ at: "/entrypoint.sh", text: "receives cmd as its arguments" }] }
          ]
        },
        {
          id: "entrypoint-init", n: 4, title: "init process", level: 2,
          gloss: "Wraps the main process in an init binary such as tini to forward signals.",
          examples: [
            { code: `FROM node:22-alpine
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]`, notes: [{ at: "\"--\"", text: "ends the tini options" }] },
            { code: `FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends tini
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["sleep", "infinity"]`, notes: [{ at: "/usr/bin/tini", text: "reaps zombie processes" }] },
            { code: `FROM alpine:3.20
ADD --chmod=755 https://example.com/tini /tini
ENTRYPOINT ["/tini", "--"]`, notes: [{ at: "--chmod=755", text: "makes the download executable" }] }
          ]
        }
      ]
    },
    {
      id: "expose-user",
      n: 6,
      title: "EXPOSE & USER",
      concepts: [
        {
          id: "expose-ports", n: 1, title: "exposed ports", level: 1,
          gloss: "Documents which port the container listens on.",
          examples: [
            { code: `FROM node:22-alpine
EXPOSE 3000`, notes: [{ at: "EXPOSE", text: "documents the port, does not publish it" }] },
            { code: `FROM postgres:16
EXPOSE 5432`, notes: [{ at: "5432", text: "default postgres port" }] },
            { code: `FROM nginx:1.27-alpine
EXPOSE 80 443`, notes: [{ at: "80 443", text: "several ports in one line" }] },
            { code: `FROM alpine:3.20
EXPOSE 53/udp`, notes: [{ at: "/udp", text: "protocol after the slash" }] }
          ]
        },
        {
          id: "user-nonroot", n: 2, title: "non-root user", level: 1,
          gloss: "Drops root by creating an account and switching to it with USER.",
          examples: [
            { code: `FROM debian:bookworm-slim
RUN useradd --create-home --shell /bin/bash app
USER app
WORKDIR /home/app`, notes: [{ at: "USER app", text: "later steps run as this user" }] },
            { code: `FROM alpine:3.20
RUN addgroup -S app && adduser -S app -G app
USER app`, notes: [{ at: "-S", text: "system account with no password" }] },
            { code: `FROM node:22-alpine
USER node
WORKDIR /home/node/app`, notes: [{ at: "USER node", text: "account already in the image" }] }
          ]
        },
        {
          id: "user-numeric", n: 3, title: "numeric ids", level: 2,
          gloss: "Pins a numeric uid and gid so ownership matches mounted volumes.",
          examples: [
            { code: `FROM alpine:3.20
RUN addgroup -g 10001 app && adduser -D -u 10001 -G app app
USER 10001:10001`, notes: [{ at: "10001:10001", text: "uid and gid" }] },
            { code: `FROM gcr.io/distroless/static-debian12
COPY server /server
USER 65532:65532
ENTRYPOINT ["/server"]`, notes: [{ at: "65532:65532", text: "the nonroot account in distroless" }] },
            { code: `FROM python:3.12-slim
RUN groupadd --gid 1000 app \\
  && useradd --uid 1000 --gid app app
USER 1000`, notes: [{ at: "USER 1000", text: "numeric ids need no passwd lookup" }] }
          ]
        },
        {
          id: "user-switch", n: 4, title: "switching users", level: 2,
          gloss: "Switches users during the build to run privileged steps before unprivileged ones.",
          examples: [
            { code: `FROM node:22-alpine
USER root
RUN apk add --no-cache tini
USER node`, notes: [{ at: "USER root", text: "back to root for the install" }] },
            { code: `FROM python:3.12-slim
RUN useradd --create-home app
RUN apt-get update && apt-get install -y --no-install-recommends libpq5
USER app`, notes: [{ at: "USER app", text: "last user wins at run time" }] },
            { code: `FROM alpine:3.20
RUN adduser -D app
USER app
RUN id -un > /home/app/whoami
USER root`, notes: [{ at: "RUN id -un", text: "runs as app" }] }
          ]
        }
      ]
    },
    {
      id: "multi-stage-builds",
      n: 7,
      title: "multi-stage builds",
      concepts: [
        {
          id: "two-stage", n: 1, title: "build and runtime", level: 1,
          gloss: "Builds in a full image and ships only the result in a small runtime image.",
          examples: [
            { code: `FROM golang:1.23 AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /out/api ./cmd/api

FROM alpine:3.20
COPY --from=build /out/api /usr/local/bin/api
ENTRYPOINT ["api"]`, notes: [{ at: "AS build", text: "compiler stays in this stage" }, { at: "COPY --from=build", text: "only the binary moves on" }] },
            { code: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html`, notes: [{ at: "/app/dist", text: "build output copied across" }] },
            { code: `FROM python:3.12 AS build
RUN pip wheel --wheel-dir /wheels gunicorn==23.0.0

FROM python:3.12-slim
COPY --from=build /wheels /wheels
RUN pip install --no-index --find-links=/wheels gunicorn`, notes: [{ at: "--no-index", text: "installs only from the wheels" }] }
          ]
        },
        {
          id: "stage-reuse", n: 2, title: "shared base stage", level: 2,
          gloss: "Branches several stages from one shared base stage.",
          examples: [
            { code: `FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
FROM base AS deps
RUN npm ci --omit=dev
FROM base AS dev
RUN npm ci`, notes: [{ at: "FROM base AS deps", text: "inherits workdir and files" }] },
            { code: `FROM python:3.12-slim AS base
ENV PYTHONUNBUFFERED=1
WORKDIR /app
FROM base AS api
CMD ["python", "api.py"]
FROM base AS worker
CMD ["python", "worker.py"]`, notes: [{ at: "ENV PYTHONUNBUFFERED=1", text: "shared by both stages" }] },
            { code: `FROM debian:bookworm-slim AS tools
RUN apt-get update && apt-get install -y --no-install-recommends curl jq
FROM tools AS fetch
RUN curl -fsS https://example.com/data.json | jq . > /data.json`, notes: [{ at: "FROM tools AS fetch", text: "builds on an earlier stage" }] }
          ]
        },
        {
          id: "test-stage", n: 3, title: "test stages", level: 2,
          gloss: "Runs the test suite in its own stage so a failure stops the build.",
          examples: [
            { code: `FROM golang:1.23 AS build
WORKDIR /src
COPY . .
RUN go build -o /out/api .
FROM build AS test
RUN go test ./...
FROM alpine:3.20
COPY --from=build /out/api /usr/local/bin/api`, notes: [{ at: "FROM build AS test", text: "extends the build stage" }, { at: "go test ./...", text: "fails the build on error" }] },
            { code: `FROM python:3.12-slim AS base
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
FROM base AS test
COPY . .
RUN pytest -q`, notes: [{ at: "AS test", text: "built only when targeted" }] },
            { code: `FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
FROM build AS lint
RUN npm run lint`, notes: [{ at: "npm run lint", text: "separate stage for checks" }] }
          ]
        },
        {
          id: "scratch-final", n: 4, title: "minimal final stage", level: 3,
          gloss: "Ends a build with scratch or distroless so the shipped image holds only the binary.",
          examples: [
            { code: `FROM rust:1.82 AS build
WORKDIR /src
COPY . .
RUN cargo build --release
FROM gcr.io/distroless/cc-debian12
COPY --from=build /src/target/release/api /api
CMD ["/api"]`, notes: [{ at: "distroless/cc-debian12", text: "libc but no shell" }] },
            { code: `FROM golang:1.23 AS build
COPY . /src
RUN cd /src && CGO_ENABLED=0 go build -o /api
FROM scratch
COPY --from=build /api /api
ENTRYPOINT ["/api"]`, notes: [{ at: "CGO_ENABLED=0", text: "static binary, no libc needed" }] },
            { code: `FROM node:22 AS build
WORKDIR /app
COPY . .
RUN npm ci --omit=dev
FROM gcr.io/distroless/nodejs22-debian12
COPY --from=build /app /app
CMD ["/app/server.js"]`, notes: [{ at: "nodejs22-debian12", text: "runtime only, no npm" }] }
          ]
        }
      ]
    },
    {
      id: "layer-caching-dockerignore",
      n: 8,
      title: "layer caching & .dockerignore",
      concepts: [
        {
          id: "manifest-first", n: 1, title: "manifest first", level: 1,
          gloss: "Copies dependency manifests before source so the install layer stays cached.",
          examples: [
            { code: `FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .`, notes: [{ at: "COPY package.json", text: "changes rarely" }, { at: "COPY . .", text: "changes on every edit" }] },
            { code: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .`, notes: [{ at: "requirements.txt", text: "install reused until this changes" }] },
            { code: `FROM golang:1.23
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .`, notes: [{ at: "go.mod go.sum", text: "modules cached separately" }] }
          ]
        },
        {
          id: "dockerignore-basics", n: 2, title: "ignore patterns", level: 1,
          gloss: "Excludes files from the build context with one pattern per line in .dockerignore.",
          examples: [
            { code: `node_modules
.git
*.log`, notes: [{ at: "node_modules", text: "never sent to the daemon" }, { at: "*.log", text: "wildcard pattern" }] },
            { code: `__pycache__
*.pyc
.venv
.env`, notes: [{ at: ".env", text: "keeps secrets out of the image" }] },
            { code: `dist
coverage
Dockerfile
.dockerignore`, notes: [{ at: "Dockerfile", text: "can be ignored without harm" }] }
          ]
        },
        {
          id: "dockerignore-negation", n: 3, title: "negated patterns", level: 2,
          gloss: "Restores a file with an exclamation prefix after a broad pattern excluded it.",
          examples: [
            { code: `*.md
!README.md`, notes: [{ at: "!README.md", text: "exception to the rule above" }] },
            { code: `notes-*
!notes-final.txt`, notes: [{ at: "!notes-final.txt", text: "one file kept from the group" }] },
            { code: `*.test.js
!critical.test.js`, notes: [{ at: "*.test.js", text: "pattern for test files" }] }
          ]
        },
        {
          id: "cache-order", n: 4, title: "instruction order", level: 2,
          gloss: "Orders instructions from least to most frequently changed to keep layers cached.",
          examples: [
            { code: `FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends curl
COPY config/ /etc/app/
COPY bin/ /opt/app/bin/`, notes: [{ at: "RUN apt-get", text: "slow and stable, so first" }, { at: "COPY bin/", text: "changes often, so last" }] },
            { code: `FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1
RUN pip install --no-cache-dir gunicorn==23.0.0
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY src/ src/`, notes: [{ at: "gunicorn==23.0.0", text: "pinned tool installed first" }] },
            { code: `FROM alpine:3.20
RUN apk add --no-cache build-base
ARG GIT_SHA
RUN echo "$GIT_SHA" > /revision`, notes: [{ at: "ARG GIT_SHA", text: "declared late to keep earlier layers" }] }
          ]
        }
      ]
    },
    {
      id: "healthcheck",
      n: 9,
      title: "HEALTHCHECK",
      concepts: [
        {
          id: "healthcheck-cmd", n: 1, title: "probe command", level: 1,
          gloss: "Marks the container unhealthy when a probe command exits with a failure.",
          examples: [
            { code: `FROM nginx:1.27-alpine
HEALTHCHECK CMD wget -q --spider http://localhost/ || exit 1`, notes: [{ at: "exit 1", text: "reports unhealthy" }] },
            { code: `FROM postgres:16
HEALTHCHECK CMD pg_isready -U postgres || exit 1`, notes: [{ at: "pg_isready", text: "ships with the postgres image" }] },
            { code: `FROM python:3.12-slim
HEALTHCHECK CMD python -c \\
  "import urllib.request as u; u.urlopen('http://localhost:8000')"`, notes: [{ at: "python -c", text: "no curl needed in slim images" }] }
          ]
        },
        {
          id: "healthcheck-options", n: 2, title: "probe timing", level: 2,
          gloss: "Tunes the probe with interval, timeout, start period and retries.",
          examples: [
            { code: `FROM node:22-alpine
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD wget -q --spider http://localhost:3000/ || exit 1`, notes: [{ at: "--interval=30s", text: "time between probes" }, { at: "--retries=3", text: "failures before unhealthy" }] },
            { code: `FROM alpine:3.20
HEALTHCHECK --start-period=40s --interval=10s \\
  CMD nc -z localhost 8000 || exit 1`, notes: [{ at: "--start-period=40s", text: "grace time while booting" }] },
            { code: `FROM nginx:1.27-alpine
HEALTHCHECK --timeout=2s \\
  CMD wget -q --spider http://localhost/ || exit 1`, notes: [{ at: "--timeout=2s", text: "a slow probe counts as failed" }] }
          ]
        },
        {
          id: "healthcheck-exec", n: 3, title: "exec form probes", level: 2,
          gloss: "Runs the probe directly from a JSON array and reads its exit code.",
          examples: [
            { code: `FROM alpine:3.20
HEALTHCHECK CMD ["/bin/healthcheck"]`, notes: [{ at: "[\"/bin/healthcheck\"]", text: "exit 0 means healthy" }] },
            { code: `FROM golang:1.23
HEALTHCHECK --timeout=2s CMD ["/app", "ping"]`, notes: [{ at: "\"ping\"", text: "a flag handled by the app itself" }] },
            { code: `FROM debian:bookworm-slim
HEALTHCHECK CMD test -f /tmp/ready || exit 1`, notes: [{ at: "test -f", text: "healthy once the file exists" }] }
          ]
        },
        {
          id: "healthcheck-none", n: 4, title: "disabling checks", level: 3,
          gloss: "Turns off a health check inherited from the base image with HEALTHCHECK NONE.",
          examples: [
            { code: `FROM nginx:1.27-alpine
HEALTHCHECK NONE`, notes: [{ at: "NONE", text: "drops the inherited check" }] },
            { code: `FROM postgres:16
HEALTHCHECK NONE
EXPOSE 5432`, notes: [{ at: "HEALTHCHECK NONE", text: "base image probe removed" }] },
            { code: `FROM python:3.12-slim
HEALTHCHECK NONE
CMD ["python", "worker.py"]`, notes: [{ at: "worker.py", text: "a process with no network port" }] }
          ]
        }
      ]
    },
    {
      id: "volume",
      n: 10,
      title: "VOLUME",
      concepts: [
        {
          id: "volume-declare", n: 1, title: "mount points", level: 1,
          gloss: "Declares a path that holds data outside the container layers.",
          examples: [
            { code: `FROM redis:7-alpine
VOLUME /data`, notes: [{ at: "VOLUME /data", text: "data survives container removal" }] },
            { code: `FROM nginx:1.27-alpine
VOLUME /var/cache/nginx`, notes: [{ at: "/var/cache/nginx", text: "cache kept outside the layers" }] },
            { code: `FROM python:3.12-slim
WORKDIR /app
VOLUME /app/uploads`, notes: [{ at: "/app/uploads", text: "user files stay out of the image" }] }
          ]
        },
        {
          id: "volume-lists", n: 2, title: "multiple paths", level: 2,
          gloss: "Declares several mount points with a space separated list or a JSON array.",
          examples: [
            { code: `FROM alpine:3.20
VOLUME ["/data", "/logs"]`, notes: [{ at: "[\"/data\", \"/logs\"]", text: "json array form" }] },
            { code: `FROM debian:bookworm-slim
VOLUME /var/lib/app /var/log/app`, notes: [{ at: "/var/lib/app /var/log/app", text: "space separated form" }] },
            { code: `FROM mysql:8.4
VOLUME ["/var/lib/mysql"]`, notes: [{ at: "/var/lib/mysql", text: "where mysql stores its data" }] }
          ]
        },
        {
          id: "volume-prepare", n: 3, title: "preparing the path", level: 2,
          gloss: "Creates and chowns the directory before VOLUME because later changes are discarded.",
          examples: [
            { code: `FROM alpine:3.20
RUN mkdir /data && chown 1000:1000 /data
VOLUME /data`, notes: [{ at: "chown 1000:1000", text: "done before the volume line" }] },
            { code: `FROM node:22-alpine
RUN mkdir -p /home/node/uploads && chown node:node /home/node/uploads
VOLUME /home/node/uploads`, notes: [{ at: "chown node:node", text: "volume keeps this owner" }] },
            { code: `FROM debian:bookworm-slim
RUN mkdir -p /srv/data
COPY seed.json /srv/data/seed.json
VOLUME /srv/data`, notes: [{ at: "COPY seed.json", text: "seeds a new volume" }] }
          ]
        },
        {
          id: "run-mounts", n: 4, title: "build mounts", level: 3,
          gloss: "Mounts secrets, sources or temporary space into one RUN step without keeping them.",
          examples: [
            { code: `FROM node:22-alpine
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \\
  npm ci`, notes: [{ at: "type=secret", text: "never written to a layer" }] },
            { code: `FROM golang:1.23
RUN --mount=type=bind,source=.,target=/src \\
  go build -o /out/api /src`, notes: [{ at: "type=bind", text: "context files visible for this step" }] },
            { code: `FROM python:3.12-slim
RUN --mount=type=tmpfs,target=/tmp \\
  pip wheel --wheel-dir /wheels gunicorn==23.0.0`, notes: [{ at: "type=tmpfs", text: "scratch space in memory" }] }
          ]
        }
      ]
    },
    {
      id: "labels-build-arguments",
      n: 11,
      title: "labels & build arguments",
      concepts: [
        {
          id: "label-pairs", n: 1, title: "label pairs", level: 1,
          gloss: "Attaches key and value metadata to an image with LABEL.",
          examples: [
            { code: `FROM alpine:3.20
LABEL maintainer="platform@example.com"`, notes: [{ at: "LABEL", text: "metadata stored in the image" }] },
            { code: `FROM python:3.12-slim
LABEL version="1.4.0" description="Orders API"`, notes: [{ at: "version=\"1.4.0\"", text: "several pairs in one line" }] },
            { code: `FROM node:22-alpine
LABEL com.example.team="payments"`, notes: [{ at: "com.example.team", text: "reverse domain keeps keys unique" }] }
          ]
        },
        {
          id: "label-oci", n: 2, title: "OCI annotations", level: 2,
          gloss: "Uses the org.opencontainers.image keys that registries and tools read.",
          examples: [
            { code: `FROM alpine:3.20
LABEL org.opencontainers.image.source="https://github.com/acme/orders"`, notes: [{ at: "image.source", text: "links the image to its repository" }] },
            { code: `FROM alpine:3.20
LABEL org.opencontainers.image.title="orders" \\
  org.opencontainers.image.licenses="MIT"`, notes: [{ at: "image.licenses", text: "spdx identifier" }] },
            { code: `FROM alpine:3.20
LABEL org.opencontainers.image.version="1.4.0" \\
  org.opencontainers.image.vendor="Acme"`, notes: [{ at: "image.version", text: "release of the software" }] }
          ]
        },
        {
          id: "label-from-arg", n: 3, title: "labels from arguments", level: 2,
          gloss: "Fills labels from ARG values so each build records its own version and commit.",
          examples: [
            { code: `FROM alpine:3.20
ARG VERSION=dev
LABEL org.opencontainers.image.version=$VERSION`, notes: [{ at: "$VERSION", text: "value from the build" }] },
            { code: `FROM alpine:3.20
ARG GIT_SHA
LABEL org.opencontainers.image.revision=$GIT_SHA`, notes: [{ at: "image.revision", text: "commit the image was built from" }] },
            { code: `FROM alpine:3.20
ARG BUILD_DATE
LABEL org.opencontainers.image.created=$BUILD_DATE`, notes: [{ at: "image.created", text: "rfc 3339 timestamp" }] }
          ]
        },
        {
          id: "build-arg-defaults", n: 4, title: "argument defaults", level: 2,
          gloss: "Gives an ARG a default that a --build-arg flag can override at build time.",
          examples: [
            { code: `FROM python:3.12-slim
ARG LOG_LEVEL=info
ENV LOG_LEVEL=$LOG_LEVEL`, notes: [{ at: "LOG_LEVEL=info", text: "used when no flag is given" }] },
            { code: `FROM node:22-alpine
ARG PORT=8080
EXPOSE $PORT`, notes: [{ at: "EXPOSE $PORT", text: "expanded from the argument" }] },
            { code: `ARG NODE_VERSION=22
FROM node:$NODE_VERSION-alpine
WORKDIR /app`, notes: [{ at: "NODE_VERSION=22", text: "global default for the base tag" }] }
          ]
        }
      ]
    },
    {
      id: "shell-vs-exec-form",
      n: 12,
      title: "shell vs exec form",
      concepts: [
        {
          id: "shell-form", n: 1, title: "shell form", level: 1,
          gloss: "Runs the command through sh -c so variables and pipes work.",
          examples: [
            { code: `FROM alpine:3.20
CMD echo "home is $HOME"`, notes: [{ at: "$HOME", text: "expanded by the shell" }] },
            { code: `FROM debian:bookworm-slim
RUN ls /etc | wc -l > /count`, notes: [{ at: "|", text: "pipes need a shell" }] },
            { code: `FROM python:3.12-slim
ENV PORT=8000
CMD python -m http.server $PORT`, notes: [{ at: "$PORT", text: "read when the container starts" }] }
          ]
        },
        {
          id: "exec-form", n: 2, title: "exec form", level: 1,
          gloss: "Runs the executable directly from a JSON array with no shell involved.",
          examples: [
            { code: `FROM node:22-alpine
CMD ["node", "server.js"]`, notes: [{ at: "[\"node\", \"server.js\"]", text: "json array, double quotes" }] },
            { code: `FROM python:3.12-slim
ENTRYPOINT ["python", "-m", "http.server", "8000"]`, notes: [{ at: "\"8000\"", text: "each argument is its own string" }] },
            { code: `FROM debian:bookworm-slim
RUN ["/bin/bash", "-c", "echo build > /stamp"]`, notes: [{ at: "/bin/bash", text: "a shell chosen explicitly" }] }
          ]
        },
        {
          id: "exec-signals", n: 3, title: "signal handling", level: 2,
          gloss: "Delivers stop signals straight to the process when it runs in exec form.",
          examples: [
            { code: `FROM node:22-alpine
CMD ["node", "server.js"]`, notes: [{ at: "CMD [", text: "node receives sigterm directly" }] },
            { code: `FROM node:22-alpine
CMD node server.js`, notes: [{ at: "CMD node", text: "sh is pid 1 and may drop signals" }] },
            { code: `FROM node:22-alpine
CMD exec node server.js`, notes: [{ at: "exec", text: "replaces the shell with node" }] }
          ]
        },
        {
          id: "shell-instruction", n: 4, title: "SHELL instruction", level: 2,
          gloss: "Changes the default shell used by the shell form of later instructions.",
          examples: [
            { code: `FROM ubuntu:24.04
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -fsSL https://example.com/x | tar -xz -C /opt`, notes: [{ at: "pipefail", text: "a failed curl fails the pipe" }] },
            { code: `FROM alpine:3.20
RUN apk add --no-cache bash
SHELL ["/bin/bash", "-c"]
RUN echo $BASH_VERSION`, notes: [{ at: "SHELL", text: "bash used from here on" }] },
            { code: `FROM debian:bookworm-slim
SHELL ["/bin/sh", "-eu", "-c"]
RUN echo "ready"`, notes: [{ at: "-eu", text: "exit on errors and unset variables" }] }
          ]
        },
        {
          id: "shell-in-exec", n: 5, title: "shell inside exec", level: 2,
          gloss: "Wraps an exec form command in sh -c when it needs variable expansion.",
          examples: [
            { code: `FROM alpine:3.20
ENV GREETING=hello
CMD ["sh", "-c", "echo $GREETING"]`, notes: [{ at: "\"sh\", \"-c\"", text: "expansion happens in sh" }] },
            { code: `FROM node:22-alpine
ENV PORT=3000
ENTRYPOINT ["sh", "-c", "exec node server.js --port $PORT"]`, notes: [{ at: "exec node", text: "node still becomes pid 1" }] },
            { code: `FROM alpine:3.20
ENV GREETING=hello
CMD ["echo", "$GREETING"]`, notes: [{ at: "\"$GREETING\"", text: "printed literally, not expanded" }] }
          ]
        }
      ]
    }
  ]
};
