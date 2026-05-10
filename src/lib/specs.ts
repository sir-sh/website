const SPECS_REPO = 'sir-sh/specs';
const SPECS_BRANCH = 'main';

export interface SpecFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
}

export interface Spec {
  id: string;
  name: string;
  status: string;
  overview: string;
  functionalRequirements: string[];
  acceptanceScenarios: string[];
  edgeCases: string[];
}

export interface SpecDetail extends Spec {
  indexContent: string;
  requirements: Record<string, string>;
}

async function fetchRawContent(path: string): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/${SPECS_REPO}/${SPECS_BRANCH}/${path}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.text();
}

export async function getAllSpecs(): Promise<{ id: string; name: string; slug: string; status: string }[]> {
  const specsContent = await fetchRawContent('001-layer-resolution/index.md');
  if (!specsContent) return [];

  const specs = [
    { id: 'S001', name: 'Layer Resolution', slug: '001-layer-resolution' },
    { id: 'S002', name: 'Configuration Loading', slug: '002-configuration-loading' },
    { id: 'S003', name: 'Workflow Engine', slug: '003-workflow-engine' },
    { id: 'S004', name: 'Template System', slug: '004-template-system' },
    { id: 'S005', name: 'Pack System', slug: '005-pack-system' },
    { id: 'S006', name: 'Method System', slug: '006-method-system' },
    { id: 'S007', name: 'Built-in Tasks', slug: '007-built-in-tasks' },
    { id: 'S008', name: 'AI Agent Interface', slug: '008-ai-agent-interface' },
    { id: 'S009', name: 'CLI Commands', slug: '009-cli-commands' },
    { id: 'S010', name: 'Conditional Logic', slug: '010-conditional-logic' },
    { id: 'S011', name: 'Loop Constructs', slug: '011-loop-constructs' },
    { id: 'S012', name: 'Nested Properties', slug: '012-nested-properties' },
    { id: 'S013', name: 'Pack Updates', slug: '013-pack-updates' },
    { id: 'S014', name: 'Remote Execution', slug: '014-remote-execution' },
    { id: 'S015', name: 'Workflow Scheduling', slug: '015-workflow-scheduling' },
  ];

  const results = await Promise.all(
    specs.map(async (spec) => {
      const content = await fetchRawContent(`${spec.slug}/index.md`);
      const statusMatch = content?.match(/\| Status \|\s*(\w+)/);
      return {
        id: spec.id,
        name: spec.name,
        slug: spec.slug,
        status: statusMatch ? statusMatch[1] : 'Unknown',
      };
    })
  );

  return results;
}

export async function getSpec(slug: string): Promise<SpecDetail | null> {
  const indexContent = await fetchRawContent(`${slug}/index.md`);
  if (!indexContent) return null;

  const frContent = await fetchRawContent(`${slug}/functional-requirements.md`);
  const asContent = await fetchRawContent(`${slug}/acceptance-scenarios.md`);
  const ecContent = await fetchRawContent(`${slug}/edge-cases.md`);

  const nameMatch = indexContent.match(/\| Feature \|\s*(.+)/);
  const statusMatch = indexContent.match(/\| Status \|\s*(.+)/);

  const idMatch = slug.match(/(\d+)-/);
  const id = idMatch ? `S${idMatch[1].padStart(3, '0')}` : 'S000';

  return {
    id,
    name: nameMatch ? nameMatch[1].trim() : slug,
    status: statusMatch ? statusMatch[1].trim() : 'Unknown',
    overview: extractOverview(indexContent),
    functionalRequirements: frContent ? extractFRList(frContent) : [],
    acceptanceScenarios: asContent ? extractASList(asContent) : [],
    edgeCases: ecContent ? extractECList(ecContent) : [],
    indexContent,
    requirements: {
      'functional-requirements': frContent || '',
      'acceptance-scenarios': asContent || '',
      'edge-cases': ecContent || '',
    },
  };
}

function extractOverview(content: string): string {
  const lines = content.split('\n');
  let inOverview = false;
  const overview: string[] = [];

  for (const line of lines) {
    if (line.startsWith('## Overview')) {
      inOverview = true;
      continue;
    }
    if (inOverview && line.startsWith('##')) break;
    if (inOverview && line.trim()) {
      overview.push(line.replace(/^\s*/, ''));
    }
  }

  return overview.join(' ').slice(0, 300);
}

function extractFRList(content: string): string[] {
  const matches = content.matchAll(/### (S\d+-FR-\d+)\s+\[P\d+\]\s+(.+)/g);
  return Array.from(matches, (m) => `${m[1]}: ${m[2]}`);
}

function extractASList(content: string): string[] {
  const matches = content.matchAll(/### (S\d+-AS-\d+)\s+\[P\d+\]\s+(.+)/g);
  return Array.from(matches, (m) => `${m[1]}: ${m[2]}`);
}

function extractECList(content: string): string[] {
  const matches = content.matchAll(/### (S\d+-EC-\d+)\s+\[P\d+\]\s+(.+)/g);
  return Array.from(matches, (m) => `${m[1]}: ${m[2]}`);
}

export function parseSpecMarkdown(content: string): string {
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