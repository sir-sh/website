const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../src/content/docs');
const specsDir = path.join(__dirname, '../src/content/specs');

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

  const content = fs.readFileSync(filePath, 'utf-8');
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

export function parseMarkdown(content: string): string {
  return content
    .replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
    .replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-semibold mb-3 mt-6">$1</h2>')
    .replace(/^###\s+(S\d+-FR-\d+)\s+\[P\d+\]\s+(.+)$/gm, '<h3 id="$1" class="text-lg font-medium mb-2 mt-4 text-blue-600">$1: $2</h3>')
    .replace(/^###\s+(S\d+-AS-\d+)\s+\[P\d+\]\s+(.+)$/gm, '<h3 id="$1" class="text-lg font-medium mb-2 mt-4 text-green-600">$1: $2</h3>')
    .replace(/^###\s+(S\d+-EC-\d+)\s+\[P\d+\]\s+(.+)$/gm, '<h3 id="$1" class="text-lg font-medium mb-2 mt-4 text-orange-600">$1: $2</h3>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
    .replace(/\| Status \|/g, '| Status |')
    .replace(/\n\n/g, '</p><p class="mb-4">');
}