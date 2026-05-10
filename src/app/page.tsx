import Link from 'next/link';
import { HeroVisual } from '@/components/luxury/AmbientBackground';

const workflows = [
  {
    cmd: 'sir run checkout feature/payments',
    desc: 'Multi-repo branch checkout. frontend:main, backend:feature/payments.',
    tag: 'Git'
  },
  {
    cmd: 'sir run docker-clean',
    desc: 'Remove stopped containers, dangling images, unused volumes.',
    tag: 'Docker'
  },
  {
    cmd: 'sir run test-all',
    desc: 'Run tests across all microservices in parallel.',
    tag: 'Testing'
  },
  {
    cmd: 'sir run sync-env',
    desc: 'Pull .env from 1Password, symlink to all projects.',
    tag: 'DevOps'
  },
];

const features = [
  {
    icon: '📁',
    title: 'Layered Configuration',
    description: 'Discovers .sir/ directories from cwd to root. Nearest layer takes precedence with global ~/.sir fallback.',
  },
  {
    icon: '📦',
    title: 'Pack System',
    description: 'Install workflow packs from Git repositories with github:owner/repo shorthand.',
  },
  {
    icon: '⚙️',
    title: 'Workflow Engine',
    description: 'Define workflows in YAML with variables, templating, loops, conditionals. Dry-run support.',
  },
  {
    icon: '🔧',
    title: 'Built-in Tasks',
    description: 'Common operations: git clone, file operations, test running, and more out of the box.',
  },
  {
    icon: '🔌',
    title: 'Method System',
    description: 'Extensible method definitions from packs with shell or exec implementations.',
  },
  {
    icon: '🤖',
    title: 'AI Agent Interface',
    description: 'MCP-style tool surface for AI assistants to discover and execute workflows safely.',
  }
];

const specs = [
  { id: 'S001', name: 'Layer Resolution' },
  { id: 'S002', name: 'Config Loading' },
  { id: 'S003', name: 'Workflow Engine' },
  { id: 'S004', name: 'Template System' },
  { id: 'S005', name: 'Pack System' },
  { id: 'S006', name: 'Method System' },
  { id: 'S007', name: 'Built-in Tasks' },
  { id: 'S008', name: 'AI Interface' },
  { id: 'S009', name: 'CLI Commands' },
  { id: 'S010', name: 'Conditionals' },
  { id: 'S011', name: 'Loops' },
  { id: 'S012', name: 'Nested Props' },
  { id: 'S013', name: 'Pack Updates' },
  { id: 'S014', name: 'Remote Exec' },
  { id: 'S015', name: 'Scheduling' },
];

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroVisual variant="light" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel mb-12 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-caption text-gray-500">Local-first workflow runner</span>
            </div>

            <h1 className="text-display text-gray-900 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="block font-extralight tracking-tight">Automate the stuff</span>
              <span className="block font-light text-gray-500 tracking-tight">you do every day</span>
            </h1>

            <p className="text-xl text-gray-500 mb-12 max-w-xl leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Docker cleanup. Branch checkouts across 5 repos. Test suites. env syncing.
              The tasks you repeat 50 times a week — automate with one command.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a
                href="https://github.com/sir-sh/cli"
                target="_blank"
                rel="noopener"
                className="btn-primary"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
              <Link href="/docs" className="btn-secondary">
                Read Documentation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <span className="text-caption text-gray-400">Explore</span>
          <div className="w-6 h-10 rounded-full border border-gray-200 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Workflow Showcase - Luxury card style */}
      <section className="relative py-32 bg-[#faf9f7]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(201, 169, 98, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 98, 0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        <div className="relative max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-caption text-gold-500 mb-6 block">Workflow Gallery</span>
            <h2 className="text-headline text-gray-900 mb-6">Real workflows, real time savers</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              These are the kind of tasks you do every day. Sir makes them one command.
            </p>
          </div>

          {/* Elegant workflow cards - 2x2 grid */}
          <div className="grid grid-cols-2 gap-6">
            {workflows.map((wf, i) => (
              <div key={i} className="group p-8 bg-white border border-gray-100 rounded-sm hover:border-amber-200/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs font-medium text-gold-500 uppercase tracking-wider">{wf.tag}</span>
                  <code className="text-sm text-gray-400 font-mono group-hover:text-amber-600 transition-colors">{wf.cmd}</code>
                </div>
                <p className="text-gray-600 font-light leading-relaxed">{wf.desc}</p>
                <div className="mt-6 pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-1 h-1 rounded-full bg-gold-500" />
                    <span>Run this workflow</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 bg-warm-ivory">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <span className="text-caption text-gold-500 mb-6 block">Capabilities</span>
            <h2 className="text-headline text-gray-900 mb-6">Built for repetitive tasks</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              No deployment pipelines, no cloud — just YAML and your terminal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 bg-white border border-gray-100 rounded-sm hover:border-amber-200/50 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className="text-3xl mb-5">{feature.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/30 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section - Dark */}
      <section className="relative py-32 overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0 bg-gradient-radial opacity-60" />
        <HeroVisual variant="dark" />

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-caption text-gold-400/40 mb-6 block">Architecture</span>
              <h2 className="text-headline text-white mb-8">Simple yet powerful</h2>
              <p className="text-lg text-gray-400 mb-12 font-light leading-relaxed">
                LayerResolver finds config. Context resolves variables. WorkflowRunner executes steps.
                You write YAML, sir.sh does the rest.
              </p>

              <div className="space-y-8">
                {[
                  { name: 'LayerResolver', desc: 'Discovers .sir/ directories from cwd to root', num: '01' },
                  { name: 'Context', desc: 'Template resolution with {{variable}} and functions', num: '02' },
                  { name: 'WorkflowRunner', desc: 'Sequential step execution with saveAs support', num: '03' },
                  { name: 'PackManager', desc: 'Install and manage packs from Git', num: '04' },
                ].map((comp, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-sm text-gold-400/40 group-hover:bg-white/10 group-hover:border-gold-400/30 transition-all duration-300">
                      {comp.num}
                    </div>
                    <div>
                      <code className="text-lg text-white font-mono">{comp.name}</code>
                      <p className="text-sm text-gray-500 mt-1 font-light">{comp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats grid instead of terminal */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-5">
                {[
                  { stat: '3KB', label: 'Binary size', sub: 'PHAR, zero deps' },
                  { stat: '412', label: 'Tests', sub: 'All passing' },
                  { stat: '15', label: 'Specs', sub: 'Full coverage' },
                  { stat: '15ms', label: 'Cold start', sub: 'Laravel Zero' },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-2xl font-light text-gold-400 mb-2">{item.stat}</div>
                    <div className="text-sm text-white/80 font-medium mb-1">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="relative py-32 bg-warm-ivory">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-caption text-gold-500 mb-6 block">Specifications</span>
            <h2 className="text-headline text-gray-900 mb-6">15 Specifications</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Built on a foundation of clear specifications. Every feature has a spec, every spec has tests.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-12">
            {specs.map((spec) => (
              <div
                key={spec.id}
                className="group px-4 py-5 rounded-xl bg-white border border-gray-100 text-center hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/5 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="font-mono text-sm font-semibold text-gold-500 mb-1">{spec.id}</div>
                <div className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">{spec.name}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/specs"
              className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium transition-colors"
            >
              View all specifications
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black opacity-80" />
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <HeroVisual variant="dark" />

        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-headline text-white mb-6">Get started with sir.sh</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto font-light">
            Create a sir.yml, run `sir run`. Your future self will thank you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="btn-primary"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            <Link href="/docs" className="btn-secondary">
              Read Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}