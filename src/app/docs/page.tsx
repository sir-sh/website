import Link from "next/link";
import { getAllDocs } from "@/lib/content";
import { HeroVisual } from "@/components/luxury/AmbientBackground";

export default async function DocsPage() {
  const docs = await getAllDocs();

  return (
    <div className="relative">
      <HeroVisual variant="light" />
      
      <div className="relative py-32 max-w-5xl mx-auto px-8">
        <div className="mb-16 animate-fade-in">
          <span className="text-caption text-amber-600 mb-4 block">Documentation</span>
          <h1 className="text-headline text-gray-900 mb-4">Docs</h1>
          <p className="text-xl text-gray-500 font-light">
            Everything you need to know about sir.sh
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {docs.map((doc, i) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="luxury-card p-8 group animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-400/20 flex items-center justify-center text-xl">
                  📄
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                {doc.title}
              </h3>
              <p className="text-sm text-gray-500 font-light line-clamp-2">{doc.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="luxury-card p-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 flex items-center justify-center text-xl flex-shrink-0">
              ✨
            </div>
            <div>
              <h3 className="text-lg font-light text-gray-900 mb-2">Want to contribute?</h3>
              <p className="text-gray-500 font-light mb-4">
                Help improve the documentation by editing files on GitHub.
              </p>
              <a
                href="https://github.com/sir-sh/docs"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
              >
                Edit docs on GitHub
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