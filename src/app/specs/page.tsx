import Link from "next/link";
import { getAllSpecs, specStatusStyles } from "@/lib/content";

export default async function SpecsPage() {
  const specs = await getAllSpecs();

  return (
    <div className="content-page reference-page">
      <header className="reference-heading">
        <h1>Specifications</h1>
        <p className="content-muted">Requirements, acceptance scenarios, and edge cases for Sir’s workflow engine and CLI.</p>
      </header>
      <ul className="reference-catalog">
        {specs.map((spec) => (
          <li key={spec.id}>
            <Link href={`/specs/${spec.slug}`} className="content-card">
              <span className="font-mono content-muted">{spec.id}</span>
              <h2>{spec.name}</h2>
              <span className={`reference-badge ${specStatusStyles[spec.status] || 'content-label'}`}>{spec.status}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="reference-pager">
        <a href="https://github.com/sir-sh/specs" className="content-link">View specifications on GitHub</a>
      </div>
    </div>
  );
}
