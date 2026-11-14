import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, resolve } from "node:path";

const dir = resolve(process.env.NEXT_DIR || ".");
const work = join(dir, ".platen_check");
rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });

const prelude = [
  'import Link from "next/link";',
  'import Image from "next/image";',
  'import { notFound, redirect, permanentRedirect, useRouter, usePathname, useSearchParams, useParams } from "next/navigation";',
  'import { NextRequest, NextResponse, connection, after } from "next/server";',
  'import { revalidatePath, revalidateTag, updateTag, cacheLife, cacheTag } from "next/cache";',
  'import { cookies, headers, draftMode } from "next/headers";',
  'import type { Metadata, Viewport, NextConfig } from "next";',
  'import { Suspense, useState, useEffect, useActionState, useTransition } from "react";',
  'import type { ReactNode } from "react";',
  'import { useFormStatus } from "react-dom";',
  'import { Inter } from "next/font/google";',
  'import localFont from "next/font/local";',
  ""
].join("\n");

const d = (await import("../data/languages/nextjs.js")).default;
const ids = [];
for (const t of d.topics) for (const c of t.concepts) c.examples.forEach((e, i) => {
  const k = ids.length;
  ids.push(`${t.id}/${c.id}/${i}`);
  writeFileSync(join(work, `s${k}.tsx`), prelude + e.code + "\n");
});
writeFileSync(join(work, "tsconfig.json"), JSON.stringify({
  compilerOptions: {
    target: "ES2022", lib: ["dom", "dom.iterable", "esnext"], module: "esnext",
    moduleResolution: "bundler", jsx: "react-jsx", strict: true, noEmit: true,
    skipLibCheck: true, esModuleInterop: true, types: ["node"], isolatedModules: true
  },
  include: ["./*.tsx"]
}));
const r = spawnSync(join(dir, "node_modules/.bin/tsc"), ["-p", join(work, "tsconfig.json"), "--pretty", "false"], { encoding: "utf8" });
const bad = new Map();
for (const line of (r.stdout + r.stderr).split("\n")) {
  const m = /^.*s(\d+)\.tsx\((\d+),\d+\): error (TS\d+): (.*)$/.exec(line);
  if (m && !bad.has(+m[1])) bad.set(+m[1], `${m[3]} ${m[4]}`.slice(0, 150));
}
for (const [k, msg] of bad) console.log(ids[k], "|", msg);
console.log(`nextjs: ${ids.length} snippets, ${bad.size} failed`);
rmSync(work, { recursive: true, force: true });
