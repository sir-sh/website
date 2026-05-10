import Link from 'next/link';

const workflows = [
  {
    cmd: 'sir run checkout feature/payments',
    desc: 'Checks out different branches across multiple projects. frontend:main, backend:feature/payments, api:feature/payments.',
  },
  {
    cmd: 'sir run docker-clean',
    desc: 'Removes stopped containers, dangling images, unused volumes. Keeps your machine lean.',
  },
  {
    cmd: 'sir run test-all',
    desc: 'Runs tests across all your microservices in parallel. Reports failures at the end.',
  },
  {
    cmd: 'sir run sync-env',
    desc: 'Pulls .env from 1Password, symlinks it to all your projects. No more env drift.',
  },
];

const features = [
  {
    icon: '🔗',
    title: 'Chain anything',
    description: 'Git operations, shell scripts, Docker, npm — if you can run it in terminal, sir.sh orchestrates it.',
  },
  {
    icon: '📁',
    title: 'Layered config',
    description: '.sir/ in project, ~/.sir/ globally. Nearest wins. Share workflows via git packs.',
  },
  {
    icon: '🔄',
    title: 'Variables & loops',
    description: '{{branch}}, {{project}}, loops over arrays, conditionals. Write once, run everywhere.',
  },
  {
    icon: '🤖',
    title: 'AI-ready',
    description: 'MCP-style interface. Tell an AI agent "run our test workflow" — it finds and executes safely.',
  },
  {
    icon: '⚡',
    title: 'Dry-run first',
    description: 'Preview every step before execution. Catch mistakes before they cost you time.',
  },
  {
    icon: '🧩',
    title: 'Share via packs',
    description: 'Install workflows from github:owner/repo. Your team shares, versions, updates together.',
  },
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
            <span className="block text-white">Automate the stuff</span>
            <span className="block bg-gradient-to-r from-[#ff6b35] via-[#f25c54] to-[#c44569] bg-clip-text text-transparent">
              you do every day
            </span>
          </h1>

          <p className="text-xl text-white/60 mb-14 max-w-2xl mx-auto leading-relaxed">
            Docker cleanup. Branch checkouts across 5 repos. Test suites. env syncing.
            The tasks you repeat 50 times a week — automate with one command.
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

      {/* Workflow examples */}
      <section className="relative py-32 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-[#ff6b35] uppercase tracking-widest mb-8">What it looks like</p>

          <div className="space-y-4">
            {workflows.map((wf, i) => (
              <div key={i} className="group flex items-start gap-6 p-6 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl hover:border-[#ff6b35]/30 hover:bg-white/[0.06] transition-all">
                <code className="text-sm text-emerald-400/80 font-mono whitespace-nowrap group-hover:text-emerald-400 transition-colors">{wf.cmd}</code>
                <span className="text-sm text-white/50">{wf.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-32 px-8 bg-[#15101d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Built for repetitive tasks
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              No deployment pipelines, no cloud — just YAML and your terminal. The stuff you do every day, automated.
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

      {/* Architecture */}
      <section className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-sm font-semibold text-[#c44569] uppercase tracking-widest mb-4">Under the hood</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                Simple, composable
              </h2>
              <p className="text-lg text-white/50 mb-12 leading-relaxed">
                LayerResolver finds config. Context resolves variables. WorkflowRunner executes steps.
                You write YAML, sir.sh does the rest.
              </p>

              <div className="space-y-5">
                {[
                  { name: 'LayerResolver', desc: 'Finds .sir/ from cwd to ~/.sir, nearest wins' },
                  { name: 'Context', desc: 'Variable resolution with functions and loops' },
                  { name: 'WorkflowRunner', desc: 'Sequential step execution with saveAs' },
                  { name: 'PackManager', desc: 'Install workflows from git repos' },
                ].map((comp, i) => (
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

            {/* Stats */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-5">
                {[
                  { stat: '3KB', label: 'Binary size', sub: 'PHAR, zero deps' },
                  { stat: '412', label: 'Tests', sub: 'All passing' },
                  { stat: '15', label: 'Specs', sub: 'Full coverage' },
                  { stat: '15ms', label: 'Cold start', sub: 'Laravel Zero' },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-xl">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6b35] to-[#f25c54] bg-clip-text text-transparent mb-1">{item.stat}</div>
                    <div className="text-sm text-white/80 font-medium mb-0.5">{item.label}</div>
                    <div className="text-xs text-white/40">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="relative py-32 px-8 bg-[#15101d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-[#6c5ce7] uppercase tracking-widest mb-4">Specs</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              15 specs, fully tested
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              Every feature documented. Every spec has tests. Review the specs, trust the implementation.
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

      {/* CTA */}
      <section className="relative py-32 px-8 bg-gradient-to-r from-[#ff6b35]/20 via-[#f25c54]/10 to-[#c44569]/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to automate?
          </h2>
          <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto">
            Create a sir.yml, run `sir run`. Your future self will thank you.
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