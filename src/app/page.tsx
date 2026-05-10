import Link from 'next/link';

const features = [
  {
    icon: '🔗',
    title: 'Chain Any Task',
    description: 'Git clones, shell commands, file operations — connect them in YAML and run with one command.',
  },
  {
    icon: '🧩',
    title: 'Extensible Packs',
    description: 'Share workflows as git repos. Install with shorthand like github:owner/pack-name.',
  },
  {
    icon: '⚡',
    title: 'Instant Execution',
    description: 'Layer-aware config resolution finds .sir/ dirs from your cwd to ~/.sir automatically.',
  },
  {
    icon: '🤖',
    title: 'AI-Ready',
    description: 'MCP-style interface lets AI agents safely discover and execute your workflows.',
  },
  {
    icon: '🔄',
    title: 'Dry Run First',
    description: 'Preview every step before execution. Catch errors before they cost you time.',
  },
  {
    icon: '📦',
    title: 'Variables & Templates',
    description: '{{variable}} interpolation, nested props, conditionals, and loops in plain YAML.',
  },
];

const components = [
  { name: 'LayerResolver', desc: 'Discovers .sir/ from cwd to root, nearest wins' },
  { name: 'Context', desc: '{{variable}} resolution with functions and nested access' },
  { name: 'WorkflowRunner', desc: 'Sequential step execution with saveAs support' },
  { name: 'PackManager', desc: 'Git-based pack installation and version management' },
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
    <div className="relative min-h-screen bg-gradient-to-b from-[#1a1520] via-[#1e1830] to-[#251d30] text-white overflow-hidden">
      {/* Firefox sunset gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-30%] right-[-10%] w-[900px] h-[900px] bg-gradient-radial from-[#ff6b35]/20 via-[#f25c54]/10 to-transparent" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-radial from-[#c44569]/15 via-transparent to-transparent" />
        <div className="absolute top-[20%] left-[30%] w-[600px] h-[600px] bg-gradient-radial from-[#6c5ce7]/10 via-transparent to-transparent" />
      </div>

      {/* Subtle grid */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Nav */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff6b35] via-[#f25c54] to-[#c44569] flex items-center justify-center">
            <span className="text-lg font-bold">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight">sir.sh</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/docs" className="text-sm text-white/60 hover:text-white transition-colors">Docs</Link>
          <Link href="/specs" className="text-sm text-white/60 hover:text-white transition-colors">Specs</Link>
          <a href="https://github.com/sir-sh/cli" className="text-sm text-white/60 hover:text-white transition-colors">GitHub</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center px-8">
        <div className="relative z-10 max-w-4xl mx-auto py-32 text-center">
          {/* Firefox-style pill badge */}
          <div className="inline-flex items-center gap-2 mb-12 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-white/60">Local-first • No cloud required</span>
          </div>

          {/* Bold headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.05]">
            <span className="block text-white">Stop writing</span>
            <span className="block bg-gradient-to-r from-[#ff6b35] via-[#f25c54] to-[#c44569] bg-clip-text text-transparent">
              repetitive scripts
            </span>
          </h1>

          <p className="text-xl text-white/60 mb-14 max-w-2xl mx-auto leading-relaxed">
            Sir transforms high-level commands into automated workflows. Define your deployment pipeline once,
            run it everywhere. No more bash spaghetti.
          </p>

          {/* Firefox-style buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f25c54] text-white font-semibold rounded-lg hover:opacity-90 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white/80 font-medium rounded-lg hover:border-white/40 hover:text-white hover:bg-white/5 transition-all"
            >
              Get Started
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features - Sunset gradient cards */}
      <section id="features" className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-semibold text-[#ff6b35] uppercase tracking-widest mb-4">What you get</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Automation that actually works
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              From git operations to complex deployments, sir.sh handles it with YAML you already know.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl hover:border-[#ff6b35]/30 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="text-3xl mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#ff6b35] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/0 to-transparent group-hover:via-[#ff6b35]/40 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture - Dark panel */}
      <section className="relative py-32 px-8 bg-[#15101d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-sm font-semibold text-[#c44569] uppercase tracking-widest mb-4">Under the hood</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                Built for developers
              </h2>
              <p className="text-lg text-white/50 mb-12 leading-relaxed">
                Clean architecture, zero dependencies at runtime. LayerResolver finds your config,
                Context resolves templates, WorkflowRunner executes steps. Simple.
              </p>

              <div className="space-y-5">
                {components.map((comp, i) => (
                  <div key={i} className="flex items-start gap-5 group">
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#ff6b35]/20 to-[#c44569]/20 border border-[#ff6b35]/20 flex items-center justify-center text-[#ff6b35] font-mono text-sm group-hover:border-[#ff6b35]/40 transition-all">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <code className="text-lg text-white font-mono">{comp.name}</code>
                      <p className="text-sm text-white/40 mt-1">{comp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#ff6b35]/10 via-transparent to-[#c44569]/5 rounded-xl blur-xl" />
              <div className="relative bg-[#0d0a12] border border-white/10 rounded-xl overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-3 px-5 py-4 bg-white/[0.03] border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-[#ff6b35]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#f25c54]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#c44569]/60" />
                  <span className="ml-3 text-sm text-white/40 font-mono">sir run deploy</span>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="text-white/30 mb-4">$ sir run deploy --dry-run</div>
                  <div className="space-y-2">
                    <div className="text-white/40">📁 Layer: ./sir (优先级 1)</div>
                    <div className="text-white/40">📁 Layer: ~/.sir (优先级 2)</div>
                    <div className="h-3" />
                    <div className="text-white/60">▶ 运行工作流: deploy</div>
                    <div className="pl-4 space-y-1">
                      <div className="text-white/30">[1/4] shell: git fetch origin</div>
                      <div className="text-emerald-400/80 ml-4">✓ 模拟执行</div>
                      <div className="text-white/30">[2/4] task: deploy.build</div>
                      <div className="text-emerald-400/80 ml-4">✓ 模拟执行</div>
                      <div className="text-white/30">[3/4] task: deploy.upload</div>
                      <div className="text-emerald-400/80 ml-4">✓ 模拟执行</div>
                      <div className="text-white/30">[4/4] shell: notify "Done"</div>
                      <div className="text-emerald-400/80 ml-4">✓ 模拟执行</div>
                    </div>
                    <div className="h-3" />
                    <div className="text-[#ff6b35]">⚠ Dry-run: 无实际更改</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs grid */}
      <section className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#6c5ce7] uppercase tracking-widest mb-4">Specs</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              15 specs, tested thoroughly
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              Every feature documented in Spec-Kit format. Review the specs, trust the implementation.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-12">
            {specs.map((spec) => (
              <div
                key={spec.id}
                className="group px-4 py-5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-center hover:border-[#6c5ce7]/30 hover:bg-white/[0.06] transition-all duration-200"
              >
                <div className="font-mono text-sm font-medium text-[#6c5ce7]/60 mb-2">{spec.id}</div>
                <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors">{spec.name}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/specs"
              className="inline-flex items-center gap-2 text-[#f25c54] hover:text-[#ff6b35] font-medium transition-colors"
            >
              Explore all specs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA - Gradient banner */}
      <section className="relative py-32 px-8 bg-gradient-to-r from-[#ff6b35]/20 via-[#f25c54]/10 to-[#c44569]/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to automate?
          </h2>
          <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto">
            Clone the repo, create a sir.yml, run `sir run`. Three steps to告别重复工作.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#f25c54] text-white font-semibold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Star on GitHub
            </a>
            <Link href="/docs" className="px-8 py-4 border border-white/20 text-white/80 font-medium rounded-lg hover:border-white/40 hover:text-white hover:bg-white/5 transition-all">
              Read the Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}