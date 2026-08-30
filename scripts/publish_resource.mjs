#!/usr/bin/env node
/**
 * theBOAT — Publish a content/blogs/*.md draft as a Sanity "resource" document.
 *
 * Usage:
 *   node scripts/publish_resource.mjs content/blogs/<file>.md
 *   node scripts/publish_resource.mjs   (uses the only .md file in content/blogs if there's just one)
 *
 * Requires a Sanity API token with write access:
 *   SANITY_API_TOKEN=sk... node scripts/publish_resource.mjs ...
 * or set SANITY_API_TOKEN in .env.local
 */

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { createClient } from "next-sanity";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnv();

const BLOG_DIR = path.resolve(process.cwd(), "content", "blogs");

function resolveInputFile() {
  const arg = process.argv[2];
  if (arg) return path.resolve(process.cwd(), arg);

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  if (files.length === 0) throw new Error(`No .md files found in ${BLOG_DIR}`);
  if (files.length > 1) {
    throw new Error(
      `Multiple .md files found in ${BLOG_DIR}. Pass the one to publish explicitly:\n` +
        files.map((f) => `  node scripts/publish_resource.mjs content/blogs/${f}`).join("\n")
    );
  }
  return path.join(BLOG_DIR, files[0]);
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error("No frontmatter block found in markdown file.");
  const frontmatter = yaml.load(match[1]);
  const body = match[2];
  return { frontmatter, body };
}

// ── Minimal inline markdown -> Portable Text spans ──
function parseInline(text, markDefs) {
  const spans = [];
  // Tokenize on links, bold, italic, inline code.
  const tokenRe = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`/g;
  let lastIndex = 0;
  let m;
  while ((m = tokenRe.exec(text)) !== null) {
    if (m.index > lastIndex) {
      spans.push({ _type: "span", text: text.slice(lastIndex, m.index), marks: [] });
    }
    if (m[1] !== undefined) {
      const key = `link${markDefs.length}${Math.random().toString(36).slice(2, 7)}`;
      markDefs.push({ _key: key, _type: "link", href: m[2] });
      spans.push({ _type: "span", text: m[1], marks: [key] });
    } else if (m[3] !== undefined) {
      spans.push({ _type: "span", text: m[3], marks: ["strong"] });
    } else if (m[4] !== undefined) {
      spans.push({ _type: "span", text: m[4], marks: ["em"] });
    } else if (m[5] !== undefined) {
      spans.push({ _type: "span", text: m[5], marks: ["code"] });
    }
    lastIndex = tokenRe.lastIndex;
  }
  if (lastIndex < text.length) {
    spans.push({ _type: "span", text: text.slice(lastIndex), marks: [] });
  }
  return spans.length ? spans : [{ _type: "span", text, marks: [] }];
}

function block(style, text, opts = {}) {
  const markDefs = [];
  const children = parseInline(text, markDefs);
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2, 10),
    style,
    markDefs,
    children,
    ...opts,
  };
}

function listItemBlock(text, listItem, level = 1) {
  return block("normal", text, { listItem, level });
}

// ── Markdown body -> Portable Text blocks ──
function markdownToBlocks(md) {
  const lines = md.split("\n");
  const blocks = [];
  let paragraphBuf = [];
  let tableBuf = [];
  let quoteBuf = [];

  const flushParagraph = () => {
    if (paragraphBuf.length) {
      const text = paragraphBuf.join(" ").trim();
      if (text) blocks.push(block("normal", text));
      paragraphBuf = [];
    }
  };

  const flushQuote = () => {
    if (quoteBuf.length) {
      const text = quoteBuf.join(" ").trim().replace(/^\[!\w+\]\s*/i, "");
      if (text) blocks.push(block("blockquote", text));
      quoteBuf = [];
    }
  };

  const flushTable = () => {
    if (!tableBuf.length) return;
    // Drop the header-separator row (e.g. "| :--- | :--- |").
    const rows = tableBuf.filter((r) => !/^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(r));
    rows.forEach((row, idx) => {
      const cells = row
        .split("|")
        .map((c) => c.trim())
        .filter((c) => c.length > 0);
      if (!cells.length) return;
      const text = idx === 0 ? cells.join(" — ") : cells.join(" — ");
      blocks.push(listItemBlock(idx === 0 ? `**${cells.join(" | ")}**` : text, "bullet"));
    });
    tableBuf = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith("|")) {
      flushParagraph();
      flushQuote();
      tableBuf.push(trimmed);
      continue;
    }
    if (tableBuf.length) flushTable();

    if (trimmed.startsWith(">")) {
      flushParagraph();
      quoteBuf.push(trimmed.replace(/^>\s?/, ""));
      continue;
    }
    if (quoteBuf.length) flushQuote();

    if (!trimmed) {
      flushParagraph();
      continue;
    }
    if (trimmed === "---" || trimmed === "***") {
      flushParagraph();
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      const level = headingMatch[1].length;
      blocks.push(block(`h${Math.min(level + 1, 4)}`, headingMatch[2]));
      continue;
    }

    const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      flushParagraph();
      blocks.push(listItemBlock(bulletMatch[1], "bullet"));
      continue;
    }

    const numberMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (numberMatch) {
      flushParagraph();
      blocks.push(listItemBlock(numberMatch[1], "number"));
      continue;
    }

    paragraphBuf.push(trimmed);
  }
  flushParagraph();
  flushQuote();
  flushTable();

  return blocks;
}

function buildFaqBlocks(faqs) {
  if (!faqs?.length) return [];
  const blocks = [block("h3", "Frequently Asked Questions")];
  for (const faq of faqs) {
    blocks.push(block("normal", faq.question, { children: [{ _type: "span", text: faq.question, marks: ["strong"] }] }));
    blocks.push(block("normal", faq.answer));
  }
  return blocks;
}

async function main() {
  const filePath = resolveInputFile();
  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, body } = parseFrontmatter(raw);

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId || !dataset) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET in .env.local");
  }
  if (!token) {
    throw new Error(
      "Missing SANITY_API_TOKEN. Create a write token at https://www.sanity.io/manage " +
        "(select the project → API → Tokens → Add API token, permission: Editor) " +
        "and set SANITY_API_TOKEN in .env.local or as an env var."
    );
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  const slug = frontmatter.slug || path.basename(filePath, ".md");
  const bodyBlocks = [...markdownToBlocks(body), ...buildFaqBlocks(frontmatter.faqs)];

  const doc = {
    _id: `resource-${slug}`,
    _type: "resource",
    title: frontmatter.title,
    slug: { _type: "slug", current: slug },
    metaTitle: frontmatter.metaTitle,
    metaDescription: frontmatter.metaDescription,
    category: frontmatter.category,
    publishedAt: frontmatter.createdAt || new Date().toISOString(),
    body: bodyBlocks,
  };

  console.log(`Publishing resource "${doc.title}" (slug: ${slug}) to dataset "${dataset}"...`);
  const result = await client.createOrReplace(doc);
  console.log(`Done. Document ID: ${result._id}`);
  console.log(`Live at: https://theboatgrp.com/resources/${slug}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
