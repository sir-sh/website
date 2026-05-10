import { notFound } from "next/navigation";
import Link from "next/link";
import { getSpec, getAllSpecs } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const specs = await getAllSpecs();
  return specs.map((spec) => ({
    slug: [spec.slug],
  }));
}

export default async function SpecDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const spec = await getSpec(slug.join('/'));

  if (!spec) {
    notFound();
  }

  const allSpecs = await getAllSpecs();
  const currentIndex = allSpecs.findIndex(s => s.slug === slug.join('/'));

  const statusColors: Record<string, string> = {
    'Implemented': 'bg-green-100 text-green-700',
    'Partial': 'bg-yellow-100 text-yellow-700',
    'Future': 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/specs" className="hover:text-gray-700">Specs</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-300">{spec.id}</span>
        </nav>

        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-mono text-xl text-gray-600 dark:text-gray-400">
              {spec.id}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{spec.name}</h1>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[spec.status] || 'bg-gray-100 text-gray-600'}`}>
                  {spec.status}
                </span>
                <span className="text-sm text-gray-500">{spec.id}</span>
              </div>
            </div>
          </div>

          {spec.overview && (
            <p className="text-gray-600 dark:text-gray-400 mt-4">{spec.overview}</p>
          )}
        </div>

        <div className="space-y-12">
          {spec.functionalRequirements.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                Functional Requirements
              </h2>
              <div className="space-y-3">
                {spec.functionalRequirements.map((fr, i) => (
                  <div key={i} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                    <p className="text-sm">{fr}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {spec.acceptanceScenarios.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                Acceptance Scenarios
              </h2>
              <div className="space-y-3">
                {spec.acceptanceScenarios.map((as, i) => (
                  <div key={i} className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900">
                    <p className="text-sm">{as}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {spec.edgeCases.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                Edge Cases
              </h2>
              <div className="space-y-3">
                {spec.edgeCases.map((ec, i) => (
                  <div key={i} className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900">
                    <p className="text-sm">{ec}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between">
          {currentIndex > 0 ? (
            <Link
              href={`/specs/${allSpecs[currentIndex - 1].slug}`}
              className="text-blue-600 hover:underline"
            >
              ← {allSpecs[currentIndex - 1].id}: {allSpecs[currentIndex - 1].name}
            </Link>
          ) : <div />}
          {currentIndex < allSpecs.length - 1 ? (
            <Link
              href={`/specs/${allSpecs[currentIndex + 1].slug}`}
              className="text-blue-600 hover:underline text-right"
            >
              {allSpecs[currentIndex + 1].id}: {allSpecs[currentIndex + 1].name} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}