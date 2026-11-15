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
  return docs.filter(({ slug }) => fs.existsSync(path.join(docsDir, slug + '.md')));
}

const docs = [
    { title: 'README', slug: 'README', excerpt: 'Welcome to sir.sh documentation! Get started with installation and quick start guides.' },
    { title: 'Quick Start', slug: 'QUICKSTART', excerpt: 'Install Sir and discover, preview, and run a local YAML workflow.' },
    { title: 'Architecture', slug: 'architecture', excerpt: 'LayerResolver discovers .sir/ directories. ConfigLoader merges YAML/JSON config. Context manages variables with template resolution.' },
    { title: 'Development', slug: 'development', excerpt: 'PHP 8.3 required. Clone repo, composer install. Run tests with pest. Create custom tasks implementing TaskInterface.' },
    { title: 'Testing', slug: 'testing', excerpt: 'Unit tests in tests/Unit/, integration in tests/Feature/. Run with ./vendor/bin/pest' },
];

export async function getDocFile(slug: string[]): Promise<DocSection | null> {
  if (slug.some((part) => !/^[a-z0-9_-]+$/i.test(part))) return null;
  const route = slug.join('/');
  const filePath = path.join(docsDir, route + '.md');
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf-8');
  const title = docs.find((doc) => doc.slug === route)?.title ?? route.replace(/[-/]/g, ' ');

  return { title, slug: route, content };
}

export async function getAllSpecs(): Promise<SpecSummary[]> {
  const indexPath = path.join(specsDir, '_index.json');
  if (!fs.existsSync(indexPath)) return [];
  const data = fs.readFileSync(indexPath, 'utf-8');
  const specs: SpecSummary[] = JSON.parse(data);
  return specs
    .filter(({ slug }) => fs.existsSync(path.join(specsDir, slug, 'index.md')))
    .map((spec) => ({ ...spec, name: spec.name.replace(/\s*\|$/, '') }));
}

export const specStatusStyles: Record<string, string> = {
  Implemented: 'status-implemented',
  Partial: 'status-partial',
};

const specFiles = [
  { id: 'overview', title: 'Specification', file: 'index.md' },
  { id: 'functional-requirements', title: 'Functional requirements', file: 'functional-requirements.md' },
  { id: 'acceptance-scenarios', title: 'Acceptance scenarios', file: 'acceptance-scenarios.md' },
  { id: 'edge-cases', title: 'Edge cases', file: 'edge-cases.md' },
];

export async function getSpec(slug: string) {
  const spec = (await getAllSpecs()).find((entry) => entry.slug === slug);
  if (!spec) return null;

  const sections = specFiles.flatMap(({ id, title, file }) => {
    const filePath = path.join(specsDir, slug, file);
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8')
      .replace(/^# [^\n]*\r?\n/, '')
      .replace(/^\| Project \|[^\n]*\n/gm, (line) =>
        line.replace(/ `?\(`?(?:\/Users|\/home)\/[^)]*\)`?/, '')
      );
    return [{ id, title, content }];
  });

  return sections.length ? { ...spec, sections } : null;
}

const markdown = new MarkdownIt();
markdown.renderer.rules.table_open = () => '<div class="table-scroll"><table>';
markdown.renderer.rules.table_close = () => '</table></div>';

const specMarkdown = new MarkdownIt({ breaks: true });
specMarkdown.renderer.rules.table_open = markdown.renderer.rules.table_open;
specMarkdown.renderer.rules.table_close = markdown.renderer.rules.table_close;

export function parseMarkdown(content: string, options?: { breaks: boolean }): string {
  return (options?.breaks ? specMarkdown : markdown).render(content);
}

export function renderDoc(doc: DocSection) {
  const tokens = markdown.parse(doc.content, {});
  const headings: { id: string; title: string }[] = [];
  const usedIds = new Set<string>();

  tokens.forEach((token, index) => {
    if (token.type !== 'heading_open') return;
    const inline = tokens[index + 1];
    const title = inline.children?.map((child) => child.content).join('') ?? inline.content;
    const base = title.toLowerCase().replace(/[^\p{L}\p{N} _-]/gu, '').replace(/ /g, '-') || 'section';
    let id = base;

    for (let suffix = 1; usedIds.has(id); suffix++) id = base + '-' + suffix;
    usedIds.add(id);
    token.attrSet('id', id);
    if (token.tag === 'h2') headings.push({ id, title });
  });

  for (const token of tokens) {
    for (const child of token.children ?? []) {
      const href = child.type === 'link_open' && child.attrGet('href');
      if (!href || !/^[\w./-]+\.md(?:#.*)?$/i.test(href)) continue;
      const [file, hash] = href.split('#');
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(doc.slug), file));
      const anchor = target === 'testing.md' && hash === 'running-tests' ? 'running-specific-tests' : hash;
      const fragment = anchor ? '#' + anchor : '';
      const url = !target.startsWith('../') && fs.existsSync(path.join(docsDir, target))
        ? '/docs/' + target.slice(0, -3) + fragment
        : 'https://github.com/sir-sh/docs/blob/main/' + file.replace(/^\.\.\//, '') + fragment;
      child.attrSet('href', url);
    }
  }

  return { headings, html: markdown.renderer.render(tokens, markdown.options, {}) };
}
