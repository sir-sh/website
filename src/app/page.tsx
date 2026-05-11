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
    <div className="relative min-h-screen bg-[#08080c] text-white overflow-hidden">
      {/* Batman-inspired ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-[#1a1a2e]/60 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#0d0d15]/80 to-transparent" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-[#0d0d15]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-gradient-to-t from-[#0a0a10]/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-gradient-to-t from-[#0a0a10]/50 to-transparent" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Nav */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-gradient-to-br from-[#c9a962] to-[#b8954f] flex items-center justify-center">
            <span className="text-lg font-bold text-[#0a0a0f]">S</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">sir.sh</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/docs" className="text-sm text-[#8888a0] hover:text-white transition-colors">Docs</Link>
          <Link href="/specs" className="text-sm text-[#8888a0] hover:text-white transition-colors">Specs</Link>
          <a href="https://github.com/sir-sh/cli" className="text-sm text-[#8888a0] hover:text-white transition-colors">GitHub</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center px-8">
        <div className="relative z-10 max-w-5xl mx-auto py-32">
          {/* Status */}
          <div className="inline-flex items-center gap-2 mb-12 px-5 py-2 rounded-full bg-[#0f0f15]/60 border border-[#2a2a3a]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-[#8888a0]">Local-first • Runs on your machine</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.0]">
            <span className="block text-white">Automate the stuff</span>
            <span className="block bg-gradient-to-r from-[#c9a962] via-[#e8d5a3] to-[#c9a962] bg-clip-text text-transparent">
              you do every day
            </span>
          </h1>

          <p className="text-xl text-[#8888a0] mb-14 max-w-2xl leading-relaxed">
            Docker cleanup. Branch checkouts across 5 repos. Test suites. env syncing.
            The tasks you repeat 50 times a week — automate with one command.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="group px-8 py-4 bg-gradient-to-r from-[#c9a962] to-[#b8954f] text-[#0a0a0f] font-semibold rounded-sm hover:opacity-90 transition-all"
            >
              View on GitHub
            </a>
            <Link
              href="/docs"
              className="group px-8 py-4 border border-[#3a3a4a] text-white font-medium rounded-sm hover:border-[#c9a962]/50 hover:bg-[#1a1a24]/50 transition-all flex items-center gap-2"
            >
              Read Documentation
              <svg className="w-4 h-4 text-[#c9a962] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Workflow ticker - horizontal scroll */}
      <section className="relative py-20 overflow-hidden bg-[#0a0a0f] border-y border-[#1e1e2a]">
        <div className="flex animate-[scroll_20s_linear_infinite]">
          {[...workflows, ...workflows, ...workflows].map((wf, i) => (
            <div key={i} className="flex items-center gap-4 px-8 whitespace-nowrap">
              <code className="text-sm font-mono text-[#c9a962]">{wf.cmd}</code>
              <span className="w-1 h-1 rounded-full bg-[#3a3a4a]" />
              <span className="text-sm text-[#666677]">{wf.desc}</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `}</style>
      </section>

      {/* Features */}
      <section id="features" className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Built for repetitive tasks
            </h2>
            <p className="text-lg text-[#8888a0] max-w-xl mx-auto">
              No deployment pipelines, no cloud — just YAML and your terminal. The stuff you do every day, automated.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-8 bg-[#0f0f15]/60 border border-[#1e1e2a] rounded-sm hover:border-[#c9a962]/30 transition-all duration-500"
              >
                <div className="text-3xl mb-5">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#c9a962] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#666677] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="relative py-32 px-8 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-sm text-[#c9a962]/50 mb-6 tracking-widest uppercase">Architecture</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Simple, composable</h2>
              <p className="text-lg text-[#8888a0] mb-12 leading-relaxed">
                LayerResolver finds config. Context resolves variables. WorkflowRunner executes steps.
                You write YAML, sir.sh does the rest.
              </p>

              <div className="space-y-6">
                {[
                  { name: 'LayerResolver', desc: 'Finds .sir/ from cwd to ~/.sir, nearest wins' },
                  { name: 'Context', desc: 'Variable resolution with functions and loops' },
                  { name: 'WorkflowRunner', desc: 'Sequential step execution with saveAs support' },
                  { name: 'PackManager', desc: 'Install workflows from git repos' },
                ].map((comp, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-sm bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-center text-[#c9a962]/60 text-sm font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <code className="text-lg text-white font-mono">{comp.name}</code>
                      <p className="text-sm text-[#666677] mt-1">{comp.desc}</p>
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
                  <div key={i} className="p-6 bg-[#0f0f15]/60 border border-[#1e1e2a] rounded-sm">
                    <div className="text-2xl font-bold text-[#c9a962] mb-1">{item.stat}</div>
                    <div className="text-sm text-white/80 font-medium mb-0.5">{item.label}</div>
                    <div className="text-xs text-[#666677]">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="relative py-32 px-8 bg-[#08080c]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-[#c9a962]/50 mb-6 tracking-widest uppercase">Specifications</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">15 specs, fully tested</h2>
            <p className="text-lg text-[#8888a0] max-w-xl mx-auto">
              Every feature documented. Every spec has tests. Review the specs, trust the implementation.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-12">
            {specs.map((spec) => (
              <div
                key={spec.id}
                className="group px-4 py-5 bg-[#0f0f15]/40 border border-[#1e1e2a] rounded-sm text-center hover:border-[#c9a962]/30 hover:bg-[#12121a] transition-all duration-200"
              >
                <div className="font-mono text-sm font-semibold text-[#c9a962]/60 mb-1">{spec.id}</div>
                <div className="text-xs text-[#666677] group-hover:text-[#888899] transition-colors">{spec.name}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/specs"
              className="inline-flex items-center gap-2 text-[#c9a962] hover:text-[#e8d5a3] font-medium transition-colors"
            >
              View all specifications
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-8 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Automate your workflow
          </h2>
          <p className="text-lg text-[#8888a0] mb-12 max-w-xl mx-auto">
            Create a sir.yml, run `sir run`. Your future self will thank you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="px-8 py-4 bg-gradient-to-r from-[#c9a962] to-[#b8954f] text-[#0a0a0f] font-semibold rounded-sm hover:opacity-90 transition-all"
            >
              View on GitHub
            </a>
            <Link href="/docs" className="px-8 py-4 border border-[#3a3a4a] text-white font-medium rounded-sm hover:border-[#c9a962]/50 hover:bg-[#1a1a24]/50 transition-all">
              Read Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}