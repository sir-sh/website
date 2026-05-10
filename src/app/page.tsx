import Link from 'next/link';

const workflows = [
  { cmd: 'sir run checkout feature/payments', desc: 'Multi-repo branch checkout' },
  { cmd: 'sir run docker-clean', desc: 'Clean containers & images' },
  { cmd: 'sir run test-all', desc: 'Parallel test runner' },
  { cmd: 'sir run sync-env', desc: 'Sync env from 1Password' },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* Apple-style ambient: subtle gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-gradient-radial from-[#1a1a1a]/40 to-transparent" />
        <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] bg-gradient-radial from-[#2a2a2a]/20 to-transparent" />
        <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] bg-gradient-radial from-[#1f1f1f]/30 to-transparent" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-xl font-semibold tracking-tight">sir.sh</div>
        <div className="flex items-center gap-8">
          <Link href="/docs" className="text-sm text-white/60 hover:text-white transition-colors">Docs</Link>
          <Link href="/specs" className="text-sm text-white/60 hover:text-white transition-colors">Specs</Link>
          <a href="https://github.com/sir-sh/cli" className="text-sm text-white/60 hover:text-white transition-colors">GitHub</a>
        </div>
      </nav>

      {/* Hero - Apple keynote style: big, bold, minimal */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-8">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Floating status */}
          <div className="inline-flex items-center gap-2 mb-20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-white/40 uppercase tracking-widest">Local-first workflow runner</span>
          </div>
          
          {/* Hero headline - Apple style: large, bold, impactful */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-10 leading-[1.05]">
            <span className="block">AI-Powered</span>
            <span className="block text-white/80">Task Automation</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 mb-20 max-w-2xl mx-auto font-light leading-relaxed">
            Decompose high-level instructions into executable workflows.
            Define once, run anywhere.
          </p>
          
          {/* Clean button pair - Apple style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="group px-8 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all"
            >
              View on GitHub
            </a>
            <Link
              href="/docs"
              className="group px-8 py-4 border border-white/20 text-sm font-medium rounded-full text-white/80 hover:text-white hover:border-white/40 transition-all"
            >
              Read Documentation
              <span className="ml-2 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Workflow showcase - minimal Apple style */}
      <section className="relative py-20 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex items-center justify-center gap-12">
            {workflows.map((wf, i) => (
              <div key={i} className="group flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <span className="text-xl">⚡</span>
                </div>
                <code className="text-xs font-mono text-white/40 mb-2 group-hover:text-white/60 transition-colors">{wf.cmd}</code>
                <span className="text-xs text-white/30">{wf.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Apple card style: glass, subtle border */}
      <section id="features" className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">Everything you need to automate</h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              From simple scripts to complex multi-step workflows, sir.sh handles it all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="group p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className="text-3xl mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture - Apple style dark panel */}
      <section className="relative py-32 px-8 bg-white/3">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Architecture</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8 tracking-tight">Simple yet powerful</h2>
              <p className="text-lg text-white/50 mb-12 leading-relaxed">
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
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/40 text-sm font-medium">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <code className="text-lg text-white font-medium">{comp.name}</code>
                      <p className="text-sm text-white/40 mt-1">{comp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Apple-style terminal */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl blur-2xl" />
              <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <pre className="font-mono text-sm text-white/70">
                  <span className="text-emerald-400">$</span> <span className="text-white">sir run deploy</span>
                  <span className="block mt-4 text-white/30">⚡ sir.sh v0.9.x</span>
                  <span className="block mt-3 text-white/20">📁 Resolved layers:</span>
                  <span className="block ml-4 text-white/30">1. /project/.sir</span>
                  <span className="block text-white/30">2. ~/.sir</span>
                  <span className="block mt-4 text-white/50">▶ Running workflow: deploy</span>
                  <span className="block ml-4 mt-4 text-white/30">[1/3] Shell: echo "Building..."</span>
                  <span className="block ml-8 text-emerald-400/80">✓ Done in 0.2s</span>
                  <span className="block ml-4 mt-2 text-white/30">[2/3] Task: git.clone</span>
                  <span className="block ml-8 text-emerald-400/80">✓ Cloned repo in 1.1s</span>
                  <span className="block ml-4 mt-2 text-white/30">[3/3] Task: tests.auto</span>
                  <span className="block ml-8 text-emerald-400/80">✓ 42 tests passed</span>
                  <span className="block mt-6">
                    <span className="text-emerald-400/80">✓</span> <span className="text-white">Workflow complete in 4.2s</span>
                  </span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs - Apple grid */}
      <section className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Specifications</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">15 Specifications</h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              Built on a foundation of clear specifications. Every feature has a spec, every spec has tests.
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-12">
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
                className="group px-4 py-6 bg-white/5 border border-white/10 rounded-xl text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="font-mono text-sm font-medium text-white/30 mb-2">{spec.id}</div>
                <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors">{spec.name}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/specs"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              View all specifications
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA - Apple final section */}
      <section className="relative py-32 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">Get started with sir.sh</h2>
          <p className="text-lg text-white/40 mb-12 max-w-xl mx-auto">
            Clone the repo, run your first workflow. It&apos;s that simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="px-8 py-4 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all"
            >
              View on GitHub
            </a>
            <Link href="/docs" className="px-8 py-4 border border-white/20 text-sm font-medium rounded-full text-white/80 hover:text-white hover:border-white/40 transition-all">
              Read Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}