import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocFile, getAllDocs, renderDoc } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return (await getAllDocs()).map((doc) => ({ slug: doc.slug.split('/') }));
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getDocFile(slug);
  if (!doc) notFound();

  const { html, headings } = renderDoc(doc);
  const docs = await getAllDocs();
  const currentIndex = docs.findIndex((entry) => entry.slug === doc.slug);
  const previous = docs[currentIndex - 1];
  const next = currentIndex >= 0 ? docs[currentIndex + 1] : undefined;

  return (
    <div className="content-page reference-page">
      <nav aria-label="Breadcrumb" className="reference-crumb">
        <Link href="/docs" className="content-link">Documentation</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{doc.title}</span>
      </nav>
      <div className="reference-layout">
        <nav aria-label="Documentation navigation" className="reference-contents">
          <h2>Guides</h2>
          <ul>
            {docs.map((guide) => (
              <li key={guide.slug}>
                <Link className="content-link" href={`/docs/${guide.slug}`} aria-current={guide.slug === doc.slug ? 'page' : undefined}>
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
          {headings.length > 0 && (
            <>
              <h2>On this page</h2>
              <ul>
                {headings.map(({ id, title }) => <li key={id}><a className="content-link" href={`#${id}`}>{title}</a></li>)}
              </ul>
            </>
          )}
        </nav>
        <article className="prose reference-body" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <nav aria-label="Adjacent guides" className="reference-pager">
        {previous && <Link className="content-link" href={`/docs/${previous.slug}`}>← {previous.title}</Link>}
        {next && <Link className="content-link" href={`/docs/${next.slug}`}>{next.title} →</Link>}
      </nav>
    </div>
  );
}
