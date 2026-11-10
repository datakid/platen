export default {
  ignoreCase: true,
  keywords: [
    "FROM", "RUN", "CMD", "LABEL", "MAINTAINER", "EXPOSE", "ENV", "ADD", "COPY", "ENTRYPOINT",
    "VOLUME", "USER", "WORKDIR", "ARG", "ONBUILD", "STOPSIGNAL", "HEALTHCHECK", "SHELL",
    "AS", "NONE", "EOF", "EOT"
  ],
  lineComment: "#",
  blockComment: null,
  commentBoundary: true,
  strings: { quotes: ['"', "'"], prefix: /^$/ },
  numberRe: /\d+(?:\.\d+)*(?:[a-zA-Z]+)?/y,
  clusters: ["&&", "||", ">>", "<<", "${", "$(", "--"]
};
