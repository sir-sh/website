import type { Metadata } from 'next';
import Link from 'next/link';
import registry from '@/content/workflows.json';

export const metadata: Metadata = {
  title: 'Workflow Registry | sir.sh',
  description: 'Browse reusable Sir workflows and review their YAML before running them locally.',
};

export default function WorkflowsPage() {
  return (
    <div className="content-page max-w-6xl mx-auto px-4 sm:px-6">
      <header className="mb-8 pb-6 border-b content-rule">
        <h1>Workflow Registry</h1>
        <p className="content-muted mt-3">
          Browse reusable workflows for Sir. Review the YAML before installing a workflow and running it locally.
        </p>
        <nav aria-label="Registry resources" className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/docs/QUICKSTART" className="content-link">Quick start</Link>
          <a href={`${registry.source}/blob/${registry.revision}/README.md#install-a-pinned-workflow`} className="content-link">
            Installation instructions
          </a>
          <Link href="/api/workflows" className="content-link">JSON API</Link>
          <a href={`${registry.source}/tree/${registry.revision}`} className="content-link">
            GitHub revision {registry.revision.slice(0, 7)}
          </a>
        </nav>
      </header>

      <ul className="grid gap-4 md:grid-cols-2">
        {registry.workflows.map((workflow) => (
          <li key={workflow.path} className="content-card rounded-xl border p-5 min-w-0">
            <h2 className="text-xl font-bold">{workflow.title}</h2>
            <code className="text-sm content-muted break-all">{workflow.name}</code>
            {workflow.description && <p className="my-3">{workflow.description}</p>}
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {workflow.guideUrl && <a href={workflow.guideUrl} className="content-link">Workflow guide</a>}
              <a href={workflow.sourceUrl} className="content-link">View on GitHub</a>
              <a href={workflow.downloadUrl} className="content-link">Raw YAML</a>
            </div>
            <details className="mt-4 border-t content-rule pt-3">
              <summary className="cursor-pointer w-fit">Preview YAML</summary>
              <pre className="prose mt-2 overflow-x-auto rounded p-3 text-sm"><code>{workflow.yaml}</code></pre>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
