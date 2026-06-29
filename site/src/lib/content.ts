import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

// Repo root is three levels up from this file: site/src/lib -> repo root.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const INVESTORS_DIR = path.join(ROOT, 'investors');
const PORTRAITS_DIR = path.join(ROOT, 'site', 'public', 'portraits');

marked.setOptions({ gfm: true, breaks: false });

// The standard document set. Order = tab order on the investor page.
export const DOCS = [
  { file: 'profile.md', label: 'Profile' },
  { file: 'investment-philosophy.md', label: 'Philosophy' },
  { file: 'greatest-trades.md', label: 'Greatest Trades' },
  { file: 'mistakes-and-losses.md', label: 'Mistakes & Losses' },
  { file: 'in-their-own-words.md', label: 'In Their Own Words' },
  { file: 'key-writings.md', label: 'Key Writings' },
  { file: 'mental-models.md', label: 'Mental Models' },
  { file: 'synthesis.md', label: 'Synthesis' },
  { file: 'sources.md', label: 'Sources' },
] as const;

export interface Investor {
  num: string;        // "001"
  slug: string;       // "001-warren-buffett"
  name: string;       // "Warren Buffett"
  styleTags: string[];
  edge: string;       // one-line edge from INDEX.md
  years?: string;     // parsed from profile.md when available
  hasPortrait: boolean;
  docs: string[];     // filenames present in the folder
}

export interface InvestorDoc {
  file: string;
  label: string;
  html: string;
}

// ---- INDEX.md parsing -------------------------------------------------------

interface IndexRow { name: string; styleTags: string[]; edge: string; slug: string; }

function parseIndex(): Map<string, IndexRow> {
  const map = new Map<string, IndexRow>();
  const indexPath = path.join(ROOT, 'INDEX.md');
  if (!fs.existsSync(indexPath)) return map;
  const lines = fs.readFileSync(indexPath, 'utf-8').split('\n');
  for (const line of lines) {
    // Table rows look like: | 001 | Name | tags; here | edge | [investors/001-slug/](...) |
    const cells = line.split('|').map((c) => c.trim());
    // cells[0] is empty (leading pipe). Expect: num, name, style, edge, folder.
    if (cells.length < 6) continue;
    const num = cells[1];
    if (!/^\d{3}$/.test(num)) continue; // skip header / separator rows
    const slugMatch = cells[5].match(/investors\/([^/\)]+)/);
    const slug = slugMatch ? slugMatch[1] : `${num}-unknown`;
    map.set(num, {
      name: cells[2],
      styleTags: cells[3].split(';').map((t) => t.trim()).filter(Boolean),
      edge: cells[4],
      slug,
    });
  }
  return map;
}

// ---- helpers ----------------------------------------------------------------

function titleFromSlug(slug: string): string {
  return slug
    .replace(/^\d{3}-/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function parseYears(folder: string): string | undefined {
  const profile = path.join(folder, 'profile.md');
  if (!fs.existsSync(profile)) return undefined;
  const text = fs.readFileSync(profile, 'utf-8');
  const m = text.match(/\|\s*Years active\s*\|\s*([^|]+?)\s*\|/i);
  if (!m) return undefined;
  // Keep it short: first sentence / clause only.
  return m[1].split(/[.;(]/)[0].trim();
}

function hasPortrait(num: string): boolean {
  if (!fs.existsSync(PORTRAITS_DIR)) return false;
  return fs.readdirSync(PORTRAITS_DIR).some((f) => f.startsWith(num + '.'));
}

// ---- public API -------------------------------------------------------------

export function getInvestors(): Investor[] {
  const index = parseIndex();
  if (!fs.existsSync(INVESTORS_DIR)) return [];

  const folders = fs
    .readdirSync(INVESTORS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{3}-/.test(d.name))
    .map((d) => d.name)
    .sort();

  return folders.map((slug) => {
    const num = slug.slice(0, 3);
    const folder = path.join(INVESTORS_DIR, slug);
    const meta = index.get(num);
    const docs = fs.readdirSync(folder).filter((f) => f.endsWith('.md'));
    return {
      num,
      slug,
      name: meta?.name ?? titleFromSlug(slug),
      styleTags: meta?.styleTags ?? [],
      edge: meta?.edge ?? '',
      years: parseYears(folder),
      hasPortrait: hasPortrait(num),
      docs,
    };
  });
}

export function getInvestor(slug: string): { investor: Investor; documents: InvestorDoc[] } | null {
  const investor = getInvestors().find((i) => i.slug === slug);
  if (!investor) return null;
  const folder = path.join(INVESTORS_DIR, slug);
  const documents: InvestorDoc[] = [];
  for (const { file, label } of DOCS) {
    const full = path.join(folder, file);
    if (!fs.existsSync(full)) continue;
    let raw = fs.readFileSync(full, 'utf-8');
    // Drop the leading H1 (the page header already shows the name + doc label).
    raw = raw.replace(/^#\s+.*\n/, '');
    documents.push({ file, label, html: marked.parse(raw) as string });
  }
  return { investor, documents };
}
