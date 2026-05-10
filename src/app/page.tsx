import Link from 'next/link';

const workflows = [
  {
    cmd: 'sir run checkout feature/payments',
    desc: 'Checks out different branches across multiple projects. frontend:main, backend:feature/payments, api:feature/payments.',
  },
  {
    cmd: 'sir run docker-clean',
    desc: 'Removes stopped containers, dangling images, and unused volumes. Keeps your machine lean.',
  },
  {
    cmd: 'sir run test-all',
    desc: 'Runs tests across all your microservices in parallel. Waits for results, reports failures.',
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
    description: 'Git operations, shell scripts, Docker, npm — if you can run it in terminal, sir.sh can orchestrate it.',
  },
  {
    icon: '📁',
    title: 'Layered config',
    description: '.sir/ in your project, ~/.sir/ globally. Nearest config wins. Share workflows via git packs.',
  },
  {
    icon: '🔄',
    title: 'Variables & loops',
    description: '{{branch}}, {{project}}, loops over arrays, conditionals. Write once, parametrize infinitely.',
  },
  {
    icon: '🤖',
    title: 'AI-ready',
    description: 'MCP-style interface. Tell an AI agent "run our test workflow" — it finds and executes it safely.',
  },
  {
    icon: '⚡',
    title: 'Dry-run first',
    description: 'Preview every step before execution. Catch mistakes before they cost you time.',
  },
  {
    icon: '🧩',
    title: 'Share via packs',
    description: 'Install workflows from github:owner/repo. Your team shares, version, and updates together.',
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
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* Subtle ambient gradients */}
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

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center px-8">
        <div className="relative z-10 max-w-5xl mx-auto py-32">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-white/40 uppercase tracking-widest">Local-first • Runs on your machine</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-8 leading-[1.05]">
            <span className="block">Automate the stuff</span>
            <span className="block text-white/80">you do every day</span>
          </h1>

          <p className="text-xl text-white/50 mb-14 max-w-2xl leading-relaxed">
            Docker cleanup. Branch checkouts across 5 repos. Test suites. env syncing. 
            The tasks you repeat 50 times a week — automate them with one command.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Workflow anatomy - show YAML structure */}
      <section className="relative py-32 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Under the hood</p>
            <h2 className="text-4xl font-bold text-white">Your workflow is just YAML</h2>
            <p className="text-lg text-white/50 mt-4">Clean, readable, version-controllable</p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#ff6b35]/10 via-transparent to-[#c44569]/5 rounded-2xl" />
            <div className="bg-[#0d0a12] border border-white/10 rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 bg-white/[0.03] border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ff6b35]/40" />
                <div className="w-3 h-3 rounded-full bg-[#f25c54]/40" />
                <div className="w-3 h-3 rounded-full bg-[#c44569]/40" />
                <span className="ml-3 text-sm text-white/40 font-mono">checkout-branch.sir.yml</span>
              </div>
              {/* YAML content */}
              <div className="p-8 font-mono text-sm leading-relaxed">
                <div className="text-white/30"># Your workflow definition</div>
                <div className="h-4" />
                <div><span className="text-[#6c5ce7]">workflows:</span></div>
                <div className="pl-4"><span className="text-emerald-400">{`checkout-feature:`}</span></div>
                <div className="pl-8"><span className="text-white/50">repos:</span></div>
                <div className="pl-12"><span className="text-[#ff6b35]">- name: frontend</span></div>
                <div className="pl-16"><span className="text-white/50">path: ~/projects/frontend</span></div>
                <div className="pl-16"><span className="text-white/50">branch:</span> <span className="text-emerald-400">{"\"{{target}}\""}</span></div>
                <div className="pl-12"><span className="text-[#ff6b35]">- name: backend</span></div>
                <div className="pl-16"><span className="text-white/50">path: ~/projects/backend</span></div>
                <div className="pl-16"><span className="text-white/50">branch:</span> <span className="text-emerald-400">{"\"{{target}}\""}</span> <span className="text-white/20"># falls back to main</span></div>
                <div className="h-4" />
                <div className="pl-8"><span className="text-[#f25c54]">steps:</span></div>
                <div className="pl-12"><span className="text-[#f25c54]">- shell: git fetch origin</span></div>
                <div className="pl-12"><span className="text-[#f25c54]">- shell: git checkout {"{{branch}}"}</span></div>
                <div className="h-4" />
                <div className="text-white/30"># Run it: sir run checkout-feature target=feature/payments</div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/[0.03] border border-white/[0.08] rounded-full">
              <span className="text-sm text-white/50">Result:</span>
              <code className="text-sm font-mono text-emerald-400">sir run checkout-feature target=feature/payments</code>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-32 px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
              Built for repetitive tasks
            </h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              The stuff you do every day, automated. No deployment pipelines, no cloud — just YAML and your terminal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
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

      {/* Architecture */}
      <section className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Architecture</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8 tracking-tight">Simple, composable</h2>
              <p className="text-lg text-white/50 mb-12 leading-relaxed">
                LayerResolver finds your config. Context resolves variables. WorkflowRunner executes steps in order.
                You write YAML, sir.sh does the rest.
              </p>

              <div className="space-y-6">
                {[
                  { name: 'LayerResolver', desc: 'Finds .sir/ from cwd to ~/.sir, nearest wins' },
                  { name: 'Context', desc: '{{variable}} resolution with functions and loops' },
                  { name: 'WorkflowRunner', desc: 'Sequential step execution with saveAs support' },
                  { name: 'PackManager', desc: 'Install workflows from git repos' },
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

            {/* Stats */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-5">
                {[
                  { stat: '3KB', label: 'Binary size', sub: 'PHAR, zero deps' },
                  { stat: '412', label: 'Tests', sub: 'All passing' },
                  { stat: '15', label: 'Specs', sub: 'Full coverage' },
                  { stat: '15ms', label: 'Cold start', sub: 'Laravel Zero' },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                    <div className="text-2xl font-semibold text-white mb-1">{item.stat}</div>
                    <div className="text-sm text-white/60 font-medium mb-0.5">{item.label}</div>
                    <div className="text-xs text-white/40">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="relative py-32 px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Specifications</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">15 specs, fully tested</h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              Every feature documented. Every spec has tests. Review the specs, trust the implementation.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-12">
            {specs.map((spec) => (
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

      {/* CTA */}
      <section className="relative py-32 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
            Automate your workflow
          </h2>
          <p className="text-lg text-white/40 mb-12 max-w-xl mx-auto">
            Create a sir.yml, run `sir run`. Your future self will thank you.
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