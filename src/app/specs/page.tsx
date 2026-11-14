import Link from "next/link";
import { getAllSpecs } from "@/lib/content";

export default async function SpecsPage() {
  const specs = await getAllSpecs();

  const statusColors: Record<string, string> = {
    'Implemented': 'status-implemented',
    'Partial': 'status-partial',
    'Future': 'content-label',
    'Draft': 'content-label',
  };

  return (
    <div className="content-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Specifications</h1>
          <p className="content-muted text-lg">
            15 specifications covering all aspects of sir.sh
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {specs.map((spec) => (
            <Link
              key={spec.id}
              href={`/specs/${spec.slug}`}
              className="block p-6 rounded-xl border content-card"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg content-label flex items-center justify-center font-mono text-sm content-muted">
                  {spec.id}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {spec.name}
                  </h3>
                  <p className="text-xs content-muted mt-0.5">
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

        <div className="p-8 rounded-2xl content-callout">
          <h3 className="font-semibold mb-2">About Spec-Kit</h3>
          <p className="text-sm content-muted mb-4">
            These specifications follow the Spec-Kit methodology with functional requirements, acceptance scenarios, and edge cases.
          </p>
          <a
            href="https://github.com/sir-sh/specs"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 content-link text-sm font-medium"
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