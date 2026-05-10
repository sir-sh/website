'use client';

import { useState } from 'react';
import Link from 'next/link';

const allContent = [
  // Docs
  { type: 'doc', title: 'README', slug: 'README', content: 'Welcome to sir.sh documentation! Get started with installation and quick start guides.' },
  { type: 'doc', title: 'Architecture', slug: 'architecture', content: 'LayerResolver discovers .sir/ directories. ConfigLoader merges YAML/JSON config. Context manages variables with template resolution.' },
  { type: 'doc', title: 'Development', slug: 'development', content: 'PHP 8.3 required. Clone repo, composer install. Run tests with pest. Create custom tasks implementing TaskInterface.' },
  { type: 'doc', title: 'Testing', slug: 'testing', content: 'Unit tests in tests/Unit/, integration in tests/Feature/. Run with ./vendor/bin/pest' },
  // Specs
  { type: 'spec', title: 'S001: Layer Resolution', slug: '001-layer-resolution', content: 'Discovers .sir/ directories from cwd to root. Global ~/.sir appended last. Nearest layer takes precedence.' },
  { type: 'spec', title: 'S002: Configuration Loading', slug: '002-configuration-loading', content: 'Loads and merges YAML/JSON config from all layers. Nearest layer wins merge strategy.' },
  { type: 'spec', title: 'S003: Workflow Engine', slug: '003-workflow-engine', content: 'Discovers, loads, validates, executes YAML workflows. Step types: method, task, shell. Supports dry-run.' },
  { type: 'spec', title: 'S004: Template System', slug: '004-template-system', content: '{{variable}} substitution, shellQuote() for escaping, default() for fallback. Nested property access supported.' },
  { type: 'spec', title: 'S005: Pack System', slug: '005-pack-system', content: 'Install packs from Git repositories. github:owner/repo, git:https://..., owner/repo shorthand.' },
  { type: 'spec', title: 'S006: Method System', slug: '006-method-system', content: 'Discovers and executes methods from packs. Shell or exec implementations. JSON schema validation.' },
  { type: 'spec', title: 'S007: Built-in Tasks', slug: '007-built-in-tasks', content: 'workspace.temp, files.write, files.writeMd, git.clone, tests.auto, coderabbit.review' },
  { type: 'spec', title: 'S008: AI Agent Interface', slug: '008-ai-agent-interface', content: 'MCP-style tool surface for AI assistants. Workflow discovery and safe execution.' },
  { type: 'spec', title: 'S009: CLI Commands', slug: '009-cli-commands', content: 'sir run, sir plan, sir list, sir where, sir workflows:list, sir workflows:show' },
  { type: 'spec', title: 'S010: Conditional Logic', slug: '010-conditional-logic', content: 'continueOnError and timeout support. ConditionEvaluator for breakOn/continueOn expressions.' },
  { type: 'spec', title: 'S011: Loop Constructs', slug: '011-loop-constructs', content: 'forEach iterates over arrays. {{item}} and {{index}} implicit variables. breakOn, continueOn, saveAs.' },
  { type: 'spec', title: 'S012: Nested Properties', slug: '012-nested-properties', content: '{{object.property}} dot-notation access. Array index support. Empty string for missing paths.' },
  { type: 'spec', title: 'S013: Pack Updates', slug: '013-pack-updates', content: 'Pack update functionality for installed packs.' },
  { type: 'spec', title: 'S014: Remote Execution', slug: '014-remote-execution', content: 'RemoteExecutor interface. SSH, Docker, Kubernetes executors. Future feature.' },
  { type: 'spec', title: 'S015: Workflow Scheduling', slug: '015-workflow-scheduling', content: 'schedules.yml, cron evaluation, daemon, retry logic. Future feature.' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof allContent>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    const lower = value.toLowerCase();
    const filtered = allContent.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.content.toLowerCase().includes(lower) ||
        item.slug.toLowerCase().includes(lower)
    );
    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Search</h1>

        <div className="mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search docs and specs..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>

        {searched && (
          <div className="mb-4 text-sm text-gray-500">
            {results.length === 0
              ? 'No results found'
              : `${results.length} result${results.length !== 1 ? 's' : ''} found`}
          </div>
        )}

        <div className="space-y-4">
          {results.map((item, i) => (
            <Link
              key={i}
              href={item.type === 'doc' ? `/docs/${item.slug}` : `/specs/${item.slug}`}
              className="block p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  item.type === 'doc'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                }`}>
                  {item.type === 'doc' ? 'Doc' : 'Spec'}
                </span>
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.content}</p>
            </Link>
          ))}
        </div>

        {!searched && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Search the documentation and specifications</p>
            <p className="text-sm">Type at least 2 characters to search</p>
          </div>
        )}
      </div>
    </div>
  );
}