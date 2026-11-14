import Link from "next/link";
import { getAllDocs } from "@/lib/content";

export default async function DocsPage() {
  const docs = await getAllDocs();

  return (
    <div className="content-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Documentation</h1>
          <p className="content-muted text-lg">
            Everything you need to know about sir.sh
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="block p-6 rounded-xl border content-card"
            >
              <h3 className="text-lg font-semibold mb-2">
                {doc.title}
              </h3>
              <p className="text-sm content-muted line-clamp-2">{doc.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="p-8 rounded-2xl content-callout">
          <h3 className="font-semibold mb-2">Want to contribute?</h3>
          <p className="text-sm content-muted mb-4">
            Help improve the documentation by editing files on GitHub.
          </p>
          <a
            href="https://github.com/sir-sh/docs"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 content-link text-sm font-medium"
          >
            Edit docs on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}