import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-36 bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
              <span className="text-lg">⚡</span>
              Local-first workflow runner
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              <span className="text-gray-900 dark:text-white">AI-Powered</span>
              <br />
              <span className="gradient-text">Task Automation</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
              sir.sh decomposes high-level instructions into executable workflows using AI. 
              Define once, run anywhere. Built on Laravel Zero.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/sir-sh/cli"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                Read Documentation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything you need to automate</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              From simple scripts to complex multi-step workflows, sir.sh handles it all with a powerful yet simple interface.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "📁",
                title: "Layered Configuration",
                description: "Discovers .sir/ directories from cwd to root. Nearest layer takes precedence with global ~/.sir fallback."
              },
              {
                icon: "📦",
                title: "Pack System",
                description: "Install workflow packs from Git repositories with github:owner/repo shorthand. Share automation without Composer."
              },
              {
                icon: "⚙️",
                title: "Workflow Engine",
                description: "Define workflows in YAML with variables, templating, loops, conditionals. Dry-run support for safe previewing."
              },
              {
                icon: "🔧",
                title: "Built-in Tasks",
                description: "Common operations: git clone, file operations, test running, and more out of the box."
              },
              {
                icon: "🔌",
                title: "Method System",
                description: "Extensible method definitions from packs. Shell or exec implementations with JSON schema validation."
              },
              {
                icon: "🤖",
                title: "AI Agent Interface",
                description: "MCP-style tool surface for AI assistants. Discover and execute workflows safely with full context."
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="feature-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50"
              >
                <div className="text-4xl mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Simple yet powerful</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                Built on a clean architecture with LayerResolver, Context, and WorkflowRunner working together to execute your workflows.
              </p>
              <div className="space-y-5">
                {[
                  { name: "LayerResolver", desc: "Discovers .sir/ directories from cwd to root" },
                  { name: "Context", desc: "Template resolution with {{variable}} and functions" },
                  { name: "WorkflowRunner", desc: "Sequential step execution with saveAs support" },
                  { name: "PackManager", desc: "Install and manage packs from Git" },
                ].map((comp, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <code className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold">{comp.name}</code>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{comp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 dark:bg-black rounded-2xl p-8 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-3 text-gray-500 text-xs">sir.sh terminal</span>
              </div>
              <pre className="text-green-400 overflow-x-auto leading-relaxed">{`$ sir run deploy

⚡ sir.sh v0.9.x

📁 Resolved layers:
   1. /project/.sir
   2. ~/.sir

▶ Running workflow: deploy

[1/3] Shell: echo "Building..."
   ✓ Done in 0.2s

[2/3] Task: git.clone
   ✓ Cloned repo in 1.1s

[3/3] Task: tests.auto
   ✓ 42 tests passed

✅ Workflow complete in 4.2s`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Preview */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">15 Specifications</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Built on a foundation of clear specifications. Every feature has a spec, every spec has tests.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[
              "Layer Resolution", "Config Loading", "Workflow Engine", "Template System", "Pack System",
              "Method System", "Built-in Tasks", "AI Interface", "CLI Commands", "Conditionals",
              "Loops", "Nested Props", "Pack Updates", "Remote Exec", "Scheduling"
            ].map((spec, i) => (
              <div
                key={i}
                className="group px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors cursor-default"
              >
                <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">S{(i + 1).toString().padStart(3, '0')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{spec}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/specs"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
            >
              View all specifications
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Get started with sir.sh</h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
            Clone the repo, run your first workflow. It's that simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition"
            >
              Read Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}