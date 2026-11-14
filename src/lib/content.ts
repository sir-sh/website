import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';

const docsDir = path.join(process.cwd(), 'src/content/docs');
const specsDir = path.join(process.cwd(), 'src/content/specs');

export interface DocSection {
  title: string;
  slug: string;
  content: string;
}

export interface SpecSummary {
  id: string;
  name: string;
  slug: string;
  status: string;
}

export async function getAllDocs(): Promise<{ title: string; slug: string; excerpt: string }[]> {
  const docs = [
    { title: 'README', slug: 'README', excerpt: 'Welcome to sir.sh documentation! Get started with installation and quick start guides.' },
    { title: 'Quick Start', slug: 'QUICKSTART', excerpt: 'Install Sir and discover, preview, and run a local YAML workflow.' },
    { title: 'Architecture', slug: 'architecture', excerpt: 'LayerResolver discovers .sir/ directories. ConfigLoader merges YAML/JSON config. Context manages variables with template resolution.' },
    { title: 'Development', slug: 'development', excerpt: 'PHP 8.3 required. Clone repo, composer install. Run tests with pest. Create custom tasks implementing TaskInterface.' },
    { title: 'Testing', slug: 'testing', excerpt: 'Unit tests in tests/Unit/, integration in tests/Feature/. Run with ./vendor/bin/pest' },
  ];
  return docs;
}

export async function getDocFile(slug: string[]): Promise<DocSection | null> {
  const fileName = slug.join('/') + '.md';
  const filePath = path.join(docsDir, fileName);

  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf-8')
    .replace(/\]\(QUICKSTART\.md(?:#setup)?\)/g, '](/docs/QUICKSTART)');
  const title = fileName.replace('.md', '').replace(/-/g, ' ').replace(/\//g, ' / ');

  return {
    title: title.charAt(0).toUpperCase() + title.slice(1),
    slug: slug.join('/'),
    content,
  };
}

export async function getAllSpecs(): Promise<SpecSummary[]> {
  const indexPath = path.join(specsDir, '_index.json');
  if (!fs.existsSync(indexPath)) return [];
  const data = fs.readFileSync(indexPath, 'utf-8');
  return JSON.parse(data);
}

export async function getSpec(slug: string): Promise<{
  id: string;
  name: string;
  status: string;
  overview: string;
  functionalRequirements: string[];
  acceptanceScenarios: string[];
  edgeCases: string[];
  indexContent: string;
} | null> {
  const specDir = path.join(specsDir, slug);
  if (!fs.existsSync(specDir)) return null;

  const indexContent = fs.readFileSync(path.join(specDir, 'index.md'), 'utf-8');
  const frContent = fs.existsSync(path.join(specDir, 'functional-requirements.md'))
    ? fs.readFileSync(path.join(specDir, 'functional-requirements.md'), 'utf-8')
    : '';
  const asContent = fs.existsSync(path.join(specDir, 'acceptance-scenarios.md'))
    ? fs.readFileSync(path.join(specDir, 'acceptance-scenarios.md'), 'utf-8')
    : '';
  const ecContent = fs.existsSync(path.join(specDir, 'edge-cases.md'))
    ? fs.readFileSync(path.join(specDir, 'edge-cases.md'), 'utf-8')
    : '';

  const idMatch = slug.match(/(\d+)-/);
  const id = idMatch ? `S${idMatch[1].padStart(3, '0')}` : 'S000';
  const nameMatch = indexContent.match(/\| Feature \|\s*(.+)/);
  const name = nameMatch ? nameMatch[1].trim() : slug;
  const statusMatch = indexContent.match(/\| Status \|\s*(.+?)(?:\|)/);
  const status = statusMatch ? statusMatch[1].trim() : 'Unknown';

  return {
    id,
    name,
    status,
    overview: extractOverview(indexContent),
    functionalRequirements: extractList(frContent, 'FR'),
    acceptanceScenarios: extractList(asContent, 'AS'),
    edgeCases: extractList(ecContent, 'EC'),
    indexContent,
  };
}

function extractOverview(content: string): string {
  const lines = content.split('\n');
  let inOverview = false;
  const overview: string[] = [];

  for (const line of lines) {
    if (line.startsWith('## Overview')) { inOverview = true; continue; }
    if (inOverview && line.startsWith('##')) break;
    if (inOverview && line.trim()) overview.push(line.trim());
  }

  return overview.join(' ').slice(0, 300);
}

function extractList(content: string, prefix: string): string[] {
  if (!content) return [];
  const regex = new RegExp(`###\\s+(S\\d+-${prefix}-\\d+)\\s+\\[P\\d+\\]\\s+(.+)`, 'g');
  const matches = content.matchAll(regex);
  return Array.from(matches, (m) => `${m[1]}: ${m[2]}`);
}

const markdown = new MarkdownIt();
markdown.renderer.rules.table_open = () => '<div class="table-scroll"><table>';
markdown.renderer.rules.table_close = () => '</table></div>';

export function parseMarkdown(content: string): string {
  return markdown.render(content);
}
