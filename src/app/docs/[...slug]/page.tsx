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
    <div className="content-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm content-muted">
          <Link href="/docs" className="content-link">Docs</Link>
          <span>/</span>
          <span>{doc.title}</span>
        </nav>

        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="mt-12 pt-8 border-t content-rule flex justify-between gap-4">
          {currentIndex > 0 ? (
            <Link
              href={`/docs/${docs[currentIndex - 1].slug}`}
              className="content-link"
            >
              ← {docs[currentIndex - 1].title}
            </Link>
          ) : <div />}
          {currentIndex < docs.length - 1 ? (
            <Link
              href={`/docs/${docs[currentIndex + 1].slug}`}
              className="content-link"
            >
              {docs[currentIndex + 1].title} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}