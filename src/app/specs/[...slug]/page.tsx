import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpec, getAllSpecs, parseMarkdown, specStatusStyles } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return (await getAllSpecs()).map((spec) => ({ slug: spec.slug.split('/') }));
}

export default async function SpecDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const spec = await getSpec(slug.join('/'));
  if (!spec) notFound();

  const specs = await getAllSpecs();
  const currentIndex = specs.findIndex((entry) => entry.slug === spec.slug);
  const previous = specs[currentIndex - 1];
  const next = specs[currentIndex + 1];

  return (
    <div className="content-page reference-page">
      <nav aria-label="Breadcrumb" className="reference-crumb">
        <Link href="/specs" className="content-link">Specifications</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{spec.id}</span>
      </nav>
      <header className="reference-heading">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-mono">{spec.id}</span>
          <span className={`reference-badge ${specStatusStyles[spec.status] || 'content-label'}`}>{spec.status}</span>
        </div>
        <h1>{spec.name}</h1>
      </header>
      <div className="reference-layout">
        <nav aria-label="On this page" className="reference-contents">
          <h2>On this page</h2>
          <ul>
            {spec.sections.map(({ id, title }) => (
              <li key={id}><a className="content-link" href={`#${id}`}>{title}</a></li>
            ))}
          </ul>
          <a className="content-link text-sm" href={`https://github.com/sir-sh/specs/tree/main/${spec.slug}`}>View source on GitHub</a>
        </nav>
        <article className="reference-body">
          {spec.sections.map(({ id, title, content }) => (
            <section key={id} id={id}>
              <h2 className="reference-section-title">{title}</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: parseMarkdown(content, { breaks: true }) }} />
            </section>
          ))}
        </article>
      </div>
      <nav aria-label="Adjacent specifications" className="reference-pager">
        {previous && <Link className="content-link" href={`/specs/${previous.slug}`}>← {previous.name}</Link>}
        {next && <Link className="content-link" href={`/specs/${next.slug}`}>{next.name} →</Link>}
      </nav>
    </div>
  );
}
