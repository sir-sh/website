import Link from "next/link";
import { getAllSpecs } from "@/lib/content";

export default async function SpecsPage() {
  const specs = await getAllSpecs();

  const statusColors: Record<string, string> = {
    'Implemented': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    'Partial': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    'Future': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    'Draft': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  };

  return (
    <div className="flex-1 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Specifications</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            15 specifications covering all aspects of sir.sh
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {specs.map((spec) => (
            <Link
              key={spec.id}
              href={`/specs/${spec.slug}`}
              className="block p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 transition group"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-mono text-sm text-gray-600 dark:text-gray-400">
                  {spec.id}
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Spec {parseInt(spec.id.replace('S', ''))} of {specs.length}
                  </p>
                </div>
              </div>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[spec.status] || statusColors['Draft']}`}>
                {spec.status}
              </span>
            </Link>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-2">About Spec-Kit</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            These specifications follow the Spec-Kit methodology with functional requirements, acceptance scenarios, and edge cases.
          </p>
          <a
            href="https://github.com/sir-sh/specs"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium"
          >
            View specs on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}