export default function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <span className="text-lg">⚡</span>
              Local-first workflow runner
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gray-900 dark:text-white">AI-Powered</span>
              <br />
              <span className="text-blue-600">Task Automation</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              sir.sh is a local-first workflow runner that uses AI to decompose high-level 
              instructions into executable workflows. Define once, run anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/sir-sh/cli"
                target="_blank"
                rel="noopener"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-center"
              >
                npm install -g sir-sh/cli
              </a>
              <a
                href="/docs"
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition text-center"
              >
                Read Documentation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to automate</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From simple scripts to complex multi-step workflows, sir.sh handles it all with a powerful yet simple interface.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📁",
                title: "Layered Configuration",
                description: "Supports .sir/ folders at project and global levels with automatic layer resolution. Nearest layer takes precedence."
              },
              {
                icon: "📦",
                title: "Pack System",
                description: "Install workflow packs from Git repositories. Share and discover automation without Composer."
              },
              {
                icon: "⚙️",
                title: "Workflow Engine",
                description: "Define workflows in YAML with variables, templating, and step dependencies. Dry-run support for safe previewing."
              },
              {
                icon: "🔧",
                title: "Built-in Tasks",
                description: "Common operations like git clone, file operations, test running, and more out of the box."
              },
              {
                icon: "🔌",
                title: "Method System",
                description: "Extensible method definitions from packs. Shell or exec-based implementations with JSON schema validation."
              },
              {
                icon: "🤖",
                title: "AI Agent Interface",
                description: "MCP-style tool surface for AI assistants to discover and execute workflows safely."
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Simple yet powerful</h2>
              <div className="space-y-4">
                {[
                  { name: "LayerResolver", desc: "Discovers .sir/ directories from cwd to root" },
                  { name: "Context", desc: "Template resolution with {{variable}} and functions" },
                  { name: "WorkflowRunner", desc: "Sequential step execution with saveAs support" },
                  { name: "PackManager", desc: "Install and manage packs from Git" },
                ].map((comp, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">{i + 1}</span>
                    <div>
                      <code className="text-blue-600 font-mono text-sm">{comp.name}</code>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{comp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 dark:bg-black rounded-xl p-6 font-mono text-sm">
              <pre className="text-green-400 overflow-x-auto">{`$ sir run deploy

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
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">15 Specifications</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built on a foundation of clear specifications. Every feature has a spec, every spec has tests.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[
              "Layer Resolution", "Config Loading", "Workflow Engine", "Template System", "Pack System",
              "Method System", "Built-in Tasks", "AI Interface", "CLI Commands", "Conditionals",
              "Loops", "Nested Props", "Pack Updates", "Remote Exec", "Scheduling"
            ].map((spec, i) => (
              <div key={i} className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                S{(i + 1).toString().padStart(3, '0')}
                <div className="text-xs text-gray-500 mt-1 truncate">{spec}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/specs" className="text-blue-600 hover:underline font-medium">
              View all specifications →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get started with sir.sh</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Clone the repo, run your first workflow. It's that simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              View on GitHub
            </a>
            <a
              href="/docs"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition"
            >
              Read Docs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}