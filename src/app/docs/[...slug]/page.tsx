import { notFound } from "next/navigation";
import Link from "next/link";
import { getDocFile, getAllDocs, parseMarkdown } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    slug: [doc.slug],
  }));
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getDocFile(slug);

  if (!doc) {
    notFound();
  }

  const htmlContent = parseMarkdown(doc.content);
  const docs = await getAllDocs();
  const currentIndex = docs.findIndex(d => d.slug === slug.join('/'));

  return (
    <div className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/docs" className="hover:text-gray-700">Docs</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-300">{doc.title}</span>
        </nav>

        <article
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between">
          {currentIndex > 0 ? (
            <Link
              href={`/docs/${docs[currentIndex - 1].slug}`}
              className="text-blue-600 hover:underline"
            >
              ← {docs[currentIndex - 1].title}
            </Link>
          ) : <div />}
          {currentIndex < docs.length - 1 ? (
            <Link
              href={`/docs/${docs[currentIndex + 1].slug}`}
              className="text-blue-600 hover:underline"
            >
              {docs[currentIndex + 1].title} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}