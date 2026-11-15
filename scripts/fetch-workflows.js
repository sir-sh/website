#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const { readFile, rename, writeFile } = require('node:fs/promises');
const path = require('node:path');
/* eslint-enable @typescript-eslint/no-require-imports */

const repository = 'sir-sh/workflows';
const api = `https://api.github.com/repos/${repository}`;
const source = `https://github.com/${repository}`;
const raw = `https://raw.githubusercontent.com/${repository}`;
const output = path.join(__dirname, '../src/content/workflows.json');

class RegistryRequestError extends Error {}

async function request(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) }).catch((cause) => {
    throw new RegistryRequestError(`Could not fetch ${url}`, { cause });
  });

  if (!response.ok) {
    throw new RegistryRequestError(`${response.status} fetching ${url}`);
  }

  return response;
}

async function main() {
  const { sha: revision, commit } = await (await request(`${api}/commits/main`)).json();
  const { tree, truncated } = await (await request(`${api}/git/trees/${commit.tree.sha}?recursive=1`)).json();

  if (truncated) {
    throw new Error('The GitHub tree response was truncated.');
  }

  const files = tree.filter(({ type }) => type === 'blob');
  const paths = new Set(files.map((file) => file.path));
  const definitions = files
    .map((file) => file.path)
    .filter((file) => file.startsWith('workflows/') && /\.ya?ml$/i.test(file))
    .sort();

  if (!definitions.length) {
    throw new Error('No YAML definitions were found under workflows/.');
  }

  const workflows = await Promise.all(definitions.map(async (file) => {
    const name = path.posix.basename(file).replace(/\.ya?ml$/i, '');
    const readme = `${path.posix.dirname(file)}/README.md`;
    const fileUrl = (filePath) => filePath.split('/').map(encodeURIComponent).join('/');
    const fetchFile = async (filePath) => (await request(`${raw}/${revision}/${fileUrl(filePath)}`)).text();
    const [yaml, guide] = await Promise.all([fetchFile(file), paths.has(readme) ? fetchFile(readme) : null]);
    const paragraphs = guide?.trim().split(/\r?\n[\t ]*\r?\n/) ?? [];
    const heading = guide?.match(/^#\s+(.+)$/m);
    const summary = paragraphs.find((paragraph) => !/^[#>*|\x60-]/.test(paragraph));
    const description = yaml.match(/^description:[\t ]*(.+)$/m)?.[1].trim().replace(/^(['"])(.*)\1$/, '$2');

    return {
      name,
      title: heading?.[1].trim() ?? name,
      description: summary?.replace(/\s+/g, ' ') ?? description ?? '',
      path: file,
      sourceUrl: `${source}/blob/${revision}/${fileUrl(file)}`,
      downloadUrl: `${raw}/${revision}/${fileUrl(file)}`,
      guideUrl: guide ? `${source}/blob/${revision}/${fileUrl(readme)}` : null,
      yaml,
    };
  }));

  await writeFile(`${output}.tmp`, JSON.stringify({ source, revision, workflows }, null, 2) + '\n');
  await rename(`${output}.tmp`, output);
  console.log(`Fetched ${workflows.length} workflows from ${repository}@${revision.slice(0, 7)}`);
}

main().catch(async (error) => {
  if (error instanceof RegistryRequestError && process.argv.includes('--allow-stale')) {
    const snapshot = await readFile(output, 'utf8').then(JSON.parse).catch(() => null);
    if (snapshot?.revision && snapshot.workflows?.length) {
      console.warn(`${error.message}. Using workflow registry snapshot ${snapshot.revision.slice(0, 7)}.`);
      return;
    }
  }

  console.error('Workflow registry sync failed:', error);
  process.exitCode = 1;
});
