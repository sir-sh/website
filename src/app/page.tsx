import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#08080c] text-white overflow-hidden">
      {/* Batman-inspired ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Radial glow from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-[#1a1a2e]/60 via-transparent to-transparent" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
        
        {/* Corner shadows for depth */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#0d0d15]/80 to-transparent" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-[#0d0d15]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-gradient-to-t from-[#0a0a10]/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-gradient-to-t from-[#0a0a10]/50 to-transparent" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 py-24">
        {/* Decorative bat-inspired geometric */}
        <div className="absolute top-20 right-20 opacity-[0.04]">
          <svg width="400" height="400" viewBox="0 0 200 200" fill="none">
            <path
              d="M100,10 C60,10 30,40 30,80 C30,110 50,130 80,135 L100,138 L120,135 C150,130 170,110 170,80 C170,40 140,10 100,10 M100,50 C130,50 150,70 150,95 C150,120 130,135 100,138 C70,135 50,120 50,95 C50,70 70,50 100,50"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-amber-400"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Status indicator */}
          <div className="inline-flex items-center gap-3 mb-16 px-6 py-2.5 rounded-full border border-[#2a2a3a] bg-[#0f0f15]/60 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-[#8888a0] font-light tracking-wide uppercase">Local-first workflow runner</span>
          </div>
          
          {/* Main heading - Batman vibes: sharp, clean, powerful */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">
            <span className="block text-white">AI-Powered</span>
            <span className="block bg-gradient-to-r from-[#c9a962] via-[#e8d5a3] to-[#c9a962] bg-clip-text text-transparent">
              Task Automation
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#8888a0] mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Decompose high-level instructions into executable workflows.
            <br className="hidden md:block" />
            Define once, run anywhere. Built on Laravel Zero.
          </p>
          
          {/* CTA buttons - luxurious dark theme */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="group relative px-8 py-4 bg-gradient-to-r from-[#c9a962] to-[#b8954f] text-[#0a0a0f] font-semibold rounded-sm overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </span>
            </a>
            <Link
              href="/docs"
              className="group px-8 py-4 border border-[#3a3a4a] text-white font-medium rounded-sm hover:border-[#c9a962]/50 hover:bg-[#1a1a24]/50 transition-all duration-300 flex items-center justify-center gap-3"
            >
              Read Documentation
              <svg className="w-4 h-4 text-[#c9a962] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-xs text-[#555566] uppercase tracking-widest">Explore</span>
          <div className="w-6 h-10 rounded-full border border-[#2a2a3a] flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-[#c9a962]/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section - Dark with gold accents */}
      <section id="features" className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-sm text-[#c9a962] mb-6 block tracking-widest uppercase">Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Everything you need to automate</h2>
            <p className="text-lg text-[#8888a0] max-w-xl mx-auto">
              From simple scripts to complex multi-step workflows, sir.sh handles it all with precision and elegance.
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
                className="group relative p-8 bg-[#0f0f15]/60 border border-[#1e1e2a] rounded-sm hover:border-[#c9a962]/30 transition-all duration-500"
              >
                <div className="text-3xl mb-5">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#c9a962] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6666770] leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a962]/0 to-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#c9a962]/50 group-hover:to-transparent transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section - Slightly different shade */}
      <section className="relative py-32 px-8 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-sm text-[#c9a962]/50 mb-6 block tracking-widest uppercase">Architecture</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Simple yet powerful</h2>
              <p className="text-lg text-[#8888a0] mb-12 leading-relaxed">
                Built on a clean architecture with LayerResolver, Context, and WorkflowRunner working together to execute your workflows with precision.
              </p>
              
              <div className="space-y-6">
                {[
                  { name: 'LayerResolver', desc: 'Discovers .sir/ directories from cwd to root' },
                  { name: 'Context', desc: 'Template resolution with {{variable}} and functions' },
                  { name: 'WorkflowRunner', desc: 'Sequential step execution with saveAs support' },
                  { name: 'PackManager', desc: 'Install and manage packs from Git' },
                ].map((comp, i) => (
                  <div key={i} className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-sm bg-[#1a1a24] border border-[#2a2a3a] flex items-center justify-center text-[#c9a962]/60 group-hover:border-[#c9a962]/40 group-hover:bg-[#1e1e28] transition-all">
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
            
            {/* Stats block instead of terminal */}
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

      {/* Specs Section */}
      <section className="relative py-32 px-8 bg-[#08080c]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm text-[#c9a962] mb-6 block tracking-widest uppercase">Specifications</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">15 Specifications</h2>
            <p className="text-lg text-[#8888a0] max-w-xl mx-auto">
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
                className="group px-4 py-5 bg-[#0f0f15]/40 border border-[#1e1e2a] rounded-sm text-center cursor-default hover:border-[#c9a962]/30 hover:bg-[#12121a] transition-all duration-200"
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

      {/* CTA Section */}
      <section className="relative py-32 px-8 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Get started with sir.sh</h2>
          <p className="text-lg text-[#8888a0] mb-10 max-w-xl mx-auto">
            Clone the repo, run your first workflow. It&apos;s that simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="px-8 py-4 bg-gradient-to-r from-[#c9a962] to-[#b8954f] text-[#0a0a0f] font-semibold rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
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