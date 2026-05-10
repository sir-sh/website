const DOCS_REPO = 'sir-sh/docs';
const DOCS_BRANCH = 'main';
const DOCS_BASE_URL = `https://api.github.com/repos/${DOCS_REPO}/contents`;

export interface DocFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  sha: string;
  size?: number;
  content?: string;
}

export interface DocSection {
  title: string;
  slug: string;
  content: string;
}

async function fetchContent(path: string): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/${DOCS_REPO}/${DOCS_BRANCH}/${path}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.text();
}

export async function getDocFile(slug: string[]): Promise<DocSection | null> {
  const path = slug.join('/');
  const content = await fetchContent(path);
  if (!content) return null;

  const title = path.split('/').pop()?.replace(/-/g, ' ').replace(/\.md$/, '') || path;

  return {
    title,
    slug: path,
    content,
  };
}

export async function getAllDocs(): Promise<{ title: string; slug: string }[]> {
  const docs = [
    { title: 'README', slug: 'README.md' },
    { title: 'Architecture', slug: 'architecture.md' },
    { title: 'Development', slug: 'development.md' },
    { title: 'Testing', slug: 'testing.md' },
  ];

  return docs;
}

export function parseMarkdown(content: string): string {
  return content
    .replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
    .replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-semibold mb-3 mt-6">$1</h2>')
    .replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-medium mb-2 mt-4">$1</h3>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
    .replace(/^\*\*([^*]+)\*\*$/gm, '<strong class="font-semibold">$1</strong>')
    .replace(/^\*\s+(.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(?!<[hpbl]|$)/gm, (line) => line.trim() ? line : '');
}