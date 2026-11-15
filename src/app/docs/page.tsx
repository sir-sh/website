import Link from "next/link";
import { getAllDocs } from "@/lib/content";

export default async function DocsPage() {
  const docs = await getAllDocs();
  const quickStart = docs.find((doc) => doc.slug === 'QUICKSTART');

  return (
    <div className="content-page reference-page">
      <header className="reference-heading">
        <h1>Documentation</h1>
        <p className="content-muted">Install Sir, write local workflows, and learn how the task runner works.</p>
      </header>

      {quickStart && (
        <section className="reference-start content-callout">
          <h2>{quickStart.title}</h2>
          <p className="content-muted">{quickStart.excerpt}</p>
          <Link href={`/docs/${quickStart.slug}`} className="content-link">Open Quick Start →</Link>
        </section>
      )}

      <section aria-labelledby="guide-heading">
        <h2 id="guide-heading" className="reference-section-title">Guides</h2>
        <ul className="reference-list">
          {docs.filter((doc) => doc !== quickStart).map((doc) => (
            <li key={doc.slug}>
              <Link href={`/docs/${doc.slug}`} className="content-card">
                <h3>{doc.title}</h3>
                <p className="content-muted">{doc.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <div className="reference-pager">
        <a href="https://github.com/sir-sh/docs" className="content-link">View documentation on GitHub</a>
      </div>
    </div>
  );
}
