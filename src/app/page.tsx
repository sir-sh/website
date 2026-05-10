import Link from 'next/link';
import { HeroVisual } from '@/components/luxury/AmbientBackground';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroVisual variant="light" />
        
        {/* Large decorative "S" */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none select-none">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M100,20 C150,20 180,50 180,100 C180,140 150,160 100,160 C70,160 50,140 50,110 C50,80 70,60 100,60 C130,60 140,80 140,90 M100,160 C60,160 40,140 40,100 C40,60 70,40 100,40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gray-900"
            />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel mb-12 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-caption text-gray-500">Local-first workflow runner</span>
            </div>
            
            <h1 className="text-display text-gray-900 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="block font-extralight tracking-tight">AI-Powered</span>
              <span className="block font-light text-gray-500 tracking-tight">Task Automation</span>
            </h1>
            
            <p className="text-xl text-gray-500 mb-12 max-w-xl leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Decompose high-level instructions into executable workflows. 
              Define once, run anywhere. Built on Laravel Zero.
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
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <span className="text-caption text-gray-400">Explore</span>
          <div className="w-6 h-10 rounded-full border border-gray-200 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 bg-warm-ivory">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <span className="text-caption text-gold-500 mb-6 block">Capabilities</span>
            <h2 className="text-headline text-gray-900 mb-6">Everything you need to automate</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              From simple scripts to complex multi-step workflows, sir.sh handles it all with precision and elegance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '📁',
                title: 'Layered Configuration',
                description: 'Discovers .sir/ directories from cwd to root. Nearest layer takes precedence with global ~/.sir fallback.',
                gradient: 'from-amber-400/15 to-orange-400/15'
              },
              {
                icon: '📦',
                title: 'Pack System',
                description: 'Install workflow packs from Git repositories with github:owner/repo shorthand.',
                gradient: 'from-emerald-400/15 to-teal-400/15'
              },
              {
                icon: '⚙️',
                title: 'Workflow Engine',
                description: 'Define workflows in YAML with variables, templating, loops, conditionals. Dry-run support.',
                gradient: 'from-blue-400/15 to-indigo-400/15'
              },
              {
                icon: '🔧',
                title: 'Built-in Tasks',
                description: 'Common operations: git clone, file operations, test running, and more out of the box.',
                gradient: 'from-purple-400/15 to-pink-400/15'
              },
              {
                icon: '🔌',
                title: 'Method System',
                description: 'Extensible method definitions from packs with shell or exec implementations.',
                gradient: 'from-rose-400/15 to-orange-400/15'
              },
              {
                icon: '🤖',
                title: 'AI Agent Interface',
                description: 'MCP-style tool surface for AI assistants to discover and execute workflows safely.',
                gradient: 'from-cyan-400/15 to-blue-400/15'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="luxury-card p-8 group cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className={`feature-icon bg-gradient-to-br ${feature.gradient} mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  {feature.description}
                </p>
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
                Built on a clean architecture with LayerResolver, Context, and WorkflowRunner working together to execute your workflows with precision.
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
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5 rounded-3xl blur-xl" />
              <div className="terminal-window p-8 relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="terminal-dot bg-rose-500/80" />
                  <div className="terminal-dot bg-amber-500/80" />
                  <div className="terminal-dot bg-emerald-500/80" />
                  <span className="ml-3 text-sm text-gray-500 font-mono">sir.sh</span>
                </div>
                <pre className="terminal-code text-gray-300">
                  <span className="text-emerald-400">$</span> <span className="text-white">sir run deploy</span>
                  <span className="block mt-4 text-gray-500">⚡ sir.sh v0.9.x</span>
                  <span className="block mt-3 text-gray-600">
                    <span className="text-amber-400">📁</span> Resolved layers:
                  </span>
                  <span className="block ml-4 text-gray-500">1. /project/.sir</span>
                  <span className="block text-gray-500">2. ~/.sir</span>
                  <span className="block mt-4 text-gray-400">
                    <span className="text-blue-400">▶</span> Running workflow: deploy
                  </span>
                  <span className="block ml-4 mt-4 text-gray-500">
                    <span className="text-gray-600">[1/3]</span> Shell: echo "Building..."
                  </span>
                  <span className="block ml-8 text-emerald-400">✓ Done in 0.2s</span>
                  <span className="block ml-4 mt-2 text-gray-500">
                    <span className="text-gray-600">[2/3]</span> Task: git.clone
                  </span>
                  <span className="block ml-8 text-emerald-400">✓ Cloned repo in 1.1s</span>
                  <span className="block ml-4 mt-2 text-gray-500">
                    <span className="text-gray-600">[3/3]</span> Task: tests.auto
                  </span>
                  <span className="block ml-8 text-emerald-400">✓ 42 tests passed</span>
                  <span className="block mt-6">
                    <span className="text-emerald-400">✅</span> <span className="text-white">Workflow complete in 4.2s</span>
                  </span>
                </pre>
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
            {[
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
            ].map((spec) => (
              <div
                key={spec.id}
                className="group px-4 py-5 rounded-xl bg-white border border-gray-100 text-center cursor-default transition-all duration-200 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/5 hover:-translate-y-0.5"
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
            Clone the repo, run your first workflow. It's that simple.
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