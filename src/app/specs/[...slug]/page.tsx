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
    'Implemented': 'status-implemented',
    'Partial': 'status-partial',
    'Future': 'content-label',
  };

  return (
    <div className="content-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm content-muted">
          <Link href="/specs" className="content-link">Specs</Link>
          <span>/</span>
          <span>{spec.id}</span>
        </nav>

        <div className="mb-8 pb-8 border-b content-rule">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl content-label flex items-center justify-center font-mono text-xl content-muted">
              {spec.id}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{spec.name}</h1>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[spec.status] || 'content-label'}`}>
                  {spec.status}
                </span>
                <span className="text-sm content-muted">{spec.id}</span>
              </div>
            </div>
          </div>

          {spec.overview && (
            <p className="content-muted mt-4">{spec.overview}</p>
          )}
        </div>

        <div className="space-y-12">
          {spec.functionalRequirements.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b content-rule">
                Functional Requirements
              </h2>
              <div className="space-y-3">
                {spec.functionalRequirements.map((fr, i) => (
                  <div key={i} className="p-4 rounded-lg content-note">
                    <p className="text-sm">{fr}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {spec.acceptanceScenarios.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b content-rule">
                Acceptance Scenarios
              </h2>
              <div className="space-y-3">
                {spec.acceptanceScenarios.map((as, i) => (
                  <div key={i} className="p-4 rounded-lg content-note content-note-acceptance">
                    <p className="text-sm">{as}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {spec.edgeCases.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b content-rule">
                Edge Cases
              </h2>
              <div className="space-y-3">
                {spec.edgeCases.map((ec, i) => (
                  <div key={i} className="p-4 rounded-lg content-note content-note-edge">
                    <p className="text-sm">{ec}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-12 pt-8 border-t content-rule flex justify-between gap-4">
          {currentIndex > 0 ? (
            <Link
              href={`/specs/${allSpecs[currentIndex - 1].slug}`}
              className="content-link"
            >
              ← {allSpecs[currentIndex - 1].id}: {allSpecs[currentIndex - 1].name}
            </Link>
          ) : <div />}
          {currentIndex < allSpecs.length - 1 ? (
            <Link
              href={`/specs/${allSpecs[currentIndex + 1].slug}`}
              className="content-link text-right"
            >
              {allSpecs[currentIndex + 1].id}: {allSpecs[currentIndex + 1].name} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}