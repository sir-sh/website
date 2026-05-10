import Link from "next/link";
import { getAllSpecs } from "@/lib/specs";

export const dynamic = 'force-dynamic';

export default async function SpecsPage() {
  const specs = await getAllSpecs();

  const statusColors: Record<string, string> = {
    'Implemented': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    'Partial': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    'Future': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    'Draft': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  };

  return (
    <div className="flex-1 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Specifications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            15 specifications covering all aspects of sir.sh
          </p>
        </div>

        <div className="grid gap-4">
          {specs.map((spec, i) => (
            <Link
              key={spec.id}
              href={`/specs/${spec.slug}`}
              className="block p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-mono text-lg text-gray-600 dark:text-gray-400">
                    {spec.id}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">
                      {spec.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Spec {i + 1} of {specs.length}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[spec.status] || statusColors['Draft']}`}>
                  {spec.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold mb-2">About Spec-Kit</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            These specifications follow the Spec-Kit methodology with functional requirements, acceptance scenarios, edge cases, and success criteria.
          </p>
          <a
            href="https://github.com/sir-sh/specs"
            target="_blank"
            rel="noopener"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            View specs on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}