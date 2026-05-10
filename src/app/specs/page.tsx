import Link from "next/link";
import { getAllSpecs } from "@/lib/content";
import { HeroVisual } from "@/components/luxury/AmbientBackground";

export default async function SpecsPage() {
  const specs = await getAllSpecs();

  const statusColors: Record<string, string> = {
    'Implemented': 'status-implemented',
    'Partial': 'status-partial',
    'Future': 'status-future',
    'Draft': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  };

  return (
    <div className="relative">
      <HeroVisual variant="light" />
      
      <div className="relative py-32 max-w-6xl mx-auto px-8">
        <div className="mb-16 animate-fade-in">
          <span className="text-caption text-amber-600 mb-4 block">Specifications</span>
          <h1 className="text-headline text-gray-900 mb-4">Specs</h1>
          <p className="text-xl text-gray-500 font-light">
            15 specifications covering all aspects of sir.sh
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {specs.map((spec, i) => (
            <Link
              key={spec.id}
              href={`/specs/${spec.slug}`}
              className="luxury-card p-8 group animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start gap-5 mb-4">
                <div className="spec-badge group-hover:bg-amber-100 group-hover:border-amber-300 group-hover:text-amber-700 transition-all">
                  {spec.id}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 group-hover:text-amber-700 transition-colors truncate">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {parseInt(spec.id.replace('S', ''))} of {specs.length}
                  </p>
                </div>
              </div>
              <span className={statusColors[spec.status] || 'status-future'}>
                {spec.status}
              </span>
            </Link>
          ))}
        </div>

        <div className="luxury-card p-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 flex items-center justify-center text-xl flex-shrink-0">
              📐
            </div>
            <div>
              <h3 className="text-lg font-light text-gray-900 mb-2">About Spec-Kit</h3>
              <p className="text-gray-500 font-light mb-4">
                These specifications follow the Spec-Kit methodology with functional requirements, acceptance scenarios, and edge cases.
              </p>
              <a
                href="https://github.com/sir-sh/specs"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
              >
                View specs on GitHub
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}