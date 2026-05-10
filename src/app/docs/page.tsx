import Link from "next/link";
import { getAllDocs } from "@/lib/docs";

export const dynamic = 'force-dynamic';

export default async function DocsPage() {
  const docs = await getAllDocs();

  const docCategories = [
    {
      title: "Getting Started",
      items: docs.filter(d => ['README.md'].includes(d.slug)),
    },
    {
      title: "Core Guides",
      items: docs.filter(d => ['architecture.md', 'development.md', 'testing.md'].includes(d.slug)),
    },
  ];

  return (
    <div className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Documentation</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to know about sir.sh
          </p>
        </div>

        {docCategories.map((category) => (
          <div key={category.title} className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-500 uppercase tracking-wide">{category.title}</h2>
            <div className="space-y-2">
              {category.items.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium group-hover:text-blue-600 transition">
                        {doc.title}
                      </h3>
                    </div>
                    <span className="text-gray-400 group-hover:text-blue-500">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold mb-2">Want to contribute?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Help improve the documentation by editing files on GitHub.
          </p>
          <a
            href="https://github.com/sir-sh/docs"
            target="_blank"
            rel="noopener"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Edit docs on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}