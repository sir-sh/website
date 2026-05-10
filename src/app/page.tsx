import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Stripe-style gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-radial from-[#635bff]/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-[#635bff]/3 via-transparent to-transparent" />
      </div>

      {/* Nav - Stripe clean */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#635bff] to-[#0054ff] flex items-center justify-center">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">sir.sh</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/docs" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Docs</Link>
          <Link href="/specs" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Specs</Link>
          <a href="https://github.com/sir-sh/cli" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">GitHub</a>
        </div>
      </nav>

      {/* Hero - Stripe style: bold gradient headline, clean layout */}
      <section className="relative min-h-[85vh] flex items-center px-8">
        <div className="relative z-10 max-w-5xl mx-auto py-32">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 mb-16">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-gray-500">Local-first workflow runner</span>
          </div>
          
          {/* Hero headline - Stripe style: gradient text */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-10 leading-[1.05]">
            <span className="block">AI-Powered</span>
            <span className="block bg-gradient-to-r from-[#635bff] via-[#0054ff] to-[#635bff] bg-clip-text text-transparent">
              Task Automation
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 mb-16 max-w-2xl leading-relaxed">
            Decompose high-level instructions into executable workflows.
            <br />Define once, run anywhere. Built on Laravel Zero.
          </p>
          
          {/* Stripe-style buttons: sharp, bold */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#635bff] text-white text-sm font-medium hover:bg-[#5252ce] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 px-8 py-4 border border-gray-200 text-gray-700 text-sm font-medium hover:border-gray-900 hover:text-gray-900 transition-all"
            >
              Read Documentation
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features - Stripe grid style */}
      <section id="features" className="relative py-32 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-[#635bff] uppercase tracking-widest mb-6">Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">Everything you need to automate</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              From simple scripts to complex multi-step workflows, sir.sh handles it all with precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 bg-white border border-gray-100 hover:border-[#635bff]/20 hover:shadow-lg hover:shadow-[#635bff]/5 transition-all duration-300"
              >
                <div className="text-3xl mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#635bff] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture - Stripe dark section */}
      <section className="relative py-32 px-8 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-sm font-medium text-[#635bff] uppercase tracking-widest mb-6">Architecture</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8 tracking-tight">Simple yet powerful</h2>
              <p className="text-lg text-gray-400 mb-12 leading-relaxed">
                Built on a clean architecture with LayerResolver, Context, and WorkflowRunner working together to execute your workflows with precision.
              </p>
              
              <div className="space-y-6">
                {[
                  { name: 'LayerResolver', desc: 'Discovers .sir/ directories from cwd to root' },
                  { name: 'Context', desc: 'Template resolution with {{variable}} and functions' },
                  { name: 'WorkflowRunner', desc: 'Sequential step execution with saveAs support' },
                  { name: 'PackManager', desc: 'Install and manage packs from Git' },
                ].map((comp, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="w-10 h-10 bg-[#222222] border border-[#333333] flex items-center justify-center text-[#635bff] text-sm font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <code className="text-lg text-white font-mono">{comp.name}</code>
                      <p className="text-sm text-gray-500 mt-1">{comp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Stripe-style terminal */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#635bff]/10 via-transparent to-transparent" />
              <div className="relative bg-[#1a1a1a] border border-[#333333] p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-3 text-sm text-gray-500 font-mono">terminal</span>
                </div>
                <pre className="font-mono text-sm">
                  <span className="text-[#635bff]">$</span> <span className="text-white">sir run deploy</span>
                  <span className="block mt-4 text-gray-500">⚡ sir.sh v0.9.x</span>
                  <span className="block mt-3 text-gray-600">📁 Resolved layers:</span>
                  <span className="block ml-4 text-gray-500">1. /project/.sir</span>
                  <span className="block text-gray-500">2. ~/.sir</span>
                  <span className="block mt-4 text-gray-400">▶ Running workflow: deploy</span>
                  <span className="block ml-4 mt-4 text-gray-600">[1/3] Shell: echo "Building..."</span>
                  <span className="block ml-8 text-emerald-400">✓ Done in 0.2s</span>
                  <span className="block ml-4 mt-2 text-gray-600">[2/3] Task: git.clone</span>
                  <span className="block ml-8 text-emerald-400">✓ Cloned repo in 1.1s</span>
                  <span className="block ml-4 mt-2 text-gray-600">[3/3] Task: tests.auto</span>
                  <span className="block ml-8 text-emerald-400">✓ 42 tests passed</span>
                  <span className="block mt-6">
                    <span className="text-emerald-400">✓</span> <span className="text-white">Workflow complete in 4.2s</span>
                  </span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs - Stripe grid */}
      <section className="relative py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[#635bff] uppercase tracking-widest mb-6">Specifications</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">15 Specifications</h2>
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
                className="group px-4 py-6 border border-gray-100 text-center hover:border-[#635bff]/30 hover:bg-[#635bff]/5 transition-all duration-200"
              >
                <div className="font-mono text-sm font-medium text-[#635bff]/60 mb-2">{spec.id}</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{spec.name}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/specs"
              className="inline-flex items-center gap-2 text-[#635bff] hover:text-[#5252ce] font-medium transition-colors"
            >
              View all specifications
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA - Stripe gradient */}
      <section className="relative py-32 px-8 bg-gradient-to-br from-[#635bff] to-[#0054ff]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">Get started with sir.sh</h2>
          <p className="text-lg text-white/80 mb-12 max-w-xl mx-auto">
            Clone the repo, run your first workflow. It&apos;s that simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="px-8 py-4 bg-white text-[#635bff] text-sm font-medium hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            <Link href="/docs" className="px-8 py-4 border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-all">
              Read Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}