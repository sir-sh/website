'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HeroVisual } from '@/components/luxury/AmbientBackground';

const allContent = [
  { type: 'doc', title: 'README', slug: 'README', content: 'Welcome to sir.sh documentation! Get started with installation and quick start guides.' },
  { type: 'doc', title: 'Architecture', slug: 'architecture', content: 'LayerResolver discovers .sir/ directories. ConfigLoader merges YAML/JSON config. Context manages variables with template resolution.' },
  { type: 'doc', title: 'Development', slug: 'development', content: 'PHP 8.3 required. Clone repo, composer install. Run tests with pest. Create custom tasks implementing TaskInterface.' },
  { type: 'doc', title: 'Testing', slug: 'testing', content: 'Unit tests in tests/Unit/, integration in tests/Feature/. Run with ./vendor/bin/pest' },
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
    <div className="relative">
      <HeroVisual variant="light" />
      
      <div className="relative py-32 max-w-4xl mx-auto px-8">
        <div className="mb-12 animate-fade-in">
          <span className="text-caption text-amber-600 mb-4 block">Search</span>
          <h1 className="text-headline text-gray-900 mb-4">Find anything</h1>
          <p className="text-xl text-gray-500 font-light">
            Search across documentation and specifications
          </p>
        </div>

        <div className="mb-10 animate-fade-in-up">
          <div className="relative">
            <svg 
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Type to search..."
              className="w-full pl-14 pr-5 py-5 rounded-2xl glass-surface text-lg font-light focus:outline-none transition-all duration-300"
              autoFocus
            />
          </div>
        </div>

        {searched && (
          <div className="mb-8 text-sm text-gray-500 animate-fade-in">
            {results.length === 0 ? 'No results found' : `${results.length} result${results.length !== 1 ? 's' : ''} found`}
          </div>
        )}

        <div className="space-y-4">
          {results.map((item, i) => (
            <Link
              key={i}
              href={item.type === 'doc' ? `/docs/${item.slug}` : `/specs/${item.slug}`}
              className="block luxury-card p-6 group animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.type === 'doc'
                    ? 'bg-blue-100/80 text-blue-700'
                    : 'bg-emerald-100/80 text-emerald-700'
                }`}>
                  {item.type === 'doc' ? 'Doc' : 'Spec'}
                </span>
                <h3 className="font-medium text-gray-900 group-hover:text-amber-700 transition-colors">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-500 font-light line-clamp-2">{item.content}</p>
            </Link>
          ))}
        </div>

        {!searched && (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100/50 to-orange-100/50 mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-light">Start typing to search across docs and specs</p>
          </div>
        )}
      </div>
    </div>
  );
}