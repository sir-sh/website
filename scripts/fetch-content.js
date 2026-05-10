#!/usr/bin/env node

const DOCS_REPO = 'sir-sh/docs';
const SPECS_REPO = 'sir-sh/specs';
const BRANCH = 'main';
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../src/content/docs');
const specsDir = path.join(__dirname, '../src/content/specs');

async function fetchRaw(repo, filePath) {
  const url = `https://raw.githubusercontent.com/${repo}/${BRANCH}/${filePath}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.text();
}

async function fetchDocList() {
  const url = `https://api.github.com/repos/${DOCS_REPO}/contents`;
  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  });
  if (!res.ok) return [];
  return res.json();
}

async function fetchSpecList() {
  const url = `https://api.github.com/repos/${SPECS_REPO}/contents`;
  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  });
  if (!res.ok) return [];
  return res.json();
}

async function main() {
  console.log('Fetching docs and specs at build time...\n');

  // Create directories
  fs.mkdirSync(docsDir, { recursive: true });
  fs.mkdirSync(specsDir, { recursive: true });

  // Fetch all docs
  console.log('📄 Fetching docs...');
  const docFiles = [
    'README.md',
    'architecture.md',
    'development.md',
    'testing.md',
  ];

  for (const file of docFiles) {
    const content = await fetchRaw(DOCS_REPO, file);
    if (content) {
      fs.writeFileSync(path.join(docsDir, file), content);
      console.log(`  ✓ ${file}`);
    } else {
      console.log(`  ✗ ${file} - not found`);
    }
  }

  // Fetch all specs
  console.log('\n📋 Fetching specs...');
  const specDirs = [
    '001-layer-resolution',
    '002-configuration-loading',
    '003-workflow-engine',
    '004-template-system',
    '005-pack-system',
    '006-method-system',
    '007-built-in-tasks',
    '008-ai-agent-interface',
    '009-cli-commands',
    '010-conditional-logic',
    '011-loop-constructs',
    '012-nested-properties',
    '013-pack-updates',
    '014-remote-execution',
    '015-workflow-scheduling',
  ];

  const specsIndex = [];

  for (const specDir of specDirs) {
    const specContent = await fetchRaw(SPECS_REPO, `${specDir}/index.md`);
    const frContent = await fetchRaw(SPECS_REPO, `${specDir}/functional-requirements.md`);
    const asContent = await fetchRaw(SPECS_REPO, `${specDir}/acceptance-scenarios.md`);
    const ecContent = await fetchRaw(SPECS_REPO, `${specDir}/edge-cases.md`);

    const specSlug = specDir;
    const specDirPath = path.join(specsDir, specSlug);
    fs.mkdirSync(specDirPath, { recursive: true });

    if (specContent) {
      fs.writeFileSync(path.join(specDirPath, 'index.md'), specContent);
    }
    if (frContent) {
      fs.writeFileSync(path.join(specDirPath, 'functional-requirements.md'), frContent);
    }
    if (asContent) {
      fs.writeFileSync(path.join(specDirPath, 'acceptance-scenarios.md'), asContent);
    }
    if (ecContent) {
      fs.writeFileSync(path.join(specDirPath, 'edge-cases.md'), ecContent);
    }

    // Extract spec ID and name
    const idMatch = specDir.match(/(\d+)-/);
    const id = idMatch ? `S${idMatch[1].padStart(3, '0')}` : 'S000';
    const nameMatch = specContent?.match(/\| Feature \|\s*(.+)/);
    const name = nameMatch ? nameMatch[1].trim() : specDir;
    const statusMatch = specContent?.match(/\| Status \|\s*(.+?)(?:\|)/);
    const status = statusMatch ? statusMatch[1].trim() : 'Unknown';

    specsIndex.push({ id, name, slug: specSlug, status });

    console.log(`  ✓ ${id} ${name} (${status})`);
  }

  // Save specs index
  fs.writeFileSync(
    path.join(specsDir, '_index.json'),
    JSON.stringify(specsIndex, null, 2)
  );

  console.log('\n✅ Done! Content saved to src/content/');
  console.log(`   Docs: ${docFiles.length} files`);
  console.log(`   Specs: ${specDirs.length} directories`);
}

main().catch(console.error);