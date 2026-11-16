import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../home.module.css';

export const metadata: Metadata = {
  title: 'Sir Remote & Plans | sir.sh',
  description: 'Check your Sir devices and workflows from anywhere. Compare free local Sir with the hosted Personal plan.',
};

const dashboard = 'https://service.sir.sh/login';

export default function RemotePage() {
  return (
    <div className="content-page max-w-5xl mx-auto px-4 sm:px-6">
      <header className="border-b content-rule pb-7">
        <h1>Sir Remote</h1>
        <p className="mt-3 text-xl">
          Check on your workflows from anywhere.
        </p>
        <p className="content-muted mt-3 max-w-2xl">
          Pair your computer with Sir Remote to see whether it&apos;s online, which workflows it shares, and how recent runs ended. Workflows run on your paired computer.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <a className={styles.gold} href={dashboard}>Sign in to Sir Remote</a>
          <a className="content-link" href="#plans">Compare plans</a>
        </div>
        <p className="content-muted mt-3 text-sm">Sir Remote is currently an invite-only, read-only pilot.</p>
      </header>

      <section className="py-7 border-b content-rule" aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="text-2xl font-bold">How Remote works</h2>
        <ol className="mt-4 grid gap-5 sm:grid-cols-3">
          <li className="min-w-0">
            <h3 className="font-bold">1. Pair your computer</h3>
            <p className="content-muted mt-1">Generate a one-time code in the dashboard and enter it in the Sir CLI.</p>
          </li>
          <li className="min-w-0">
            <h3 className="font-bold">2. Share a workflow</h3>
            <p className="content-muted mt-1">Choose which installed workflows show up in the dashboard and start syncing from your computer.</p>
          </li>
          <li className="min-w-0">
            <h3 className="font-bold">3. Check in from anywhere</h3>
            <p className="content-muted mt-1">Open the dashboard on your phone or computer to see device status and recent outcomes.</p>
          </li>
        </ol>
      </section>

      <section className="py-7" aria-labelledby="plans">
        <h2 id="plans" className="text-2xl font-bold">Plans</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <article className="content-card flex flex-col rounded-xl border p-5 sm:p-6">
            <h3 className="text-xl font-bold">Local</h3>
            <p className="mt-2 text-3xl font-bold">Free</p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Run and review workflows on your computer</li>
              <li>Install workflows from the public registry</li>
              <li>Use the CLI without a hosted account</li>
              <li>At launch, a free hosted account will let you sign in and upgrade. The free plan includes zero device pairing slots.</li>
            </ul>
            <div className="mt-auto pt-5">
              <Link href="/docs/QUICKSTART" className={styles.ink}>Get started with Sir</Link>
            </div>
          </article>

          <article className="content-card flex flex-col rounded-xl border p-5 sm:p-6">
            <h3 className="text-xl font-bold">Personal</h3>
            <p className="mt-2"><strong className="text-3xl">€4.99</strong> / month</p>
            <p className="content-muted mt-1">or €49 billed yearly</p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>One account and up to three paired machines</li>
              <li>When paid access ends, your devices stay paired. Renewing restores access to connections, syncing, and remote runs without re-pairing.</li>
              <li>Hosted dashboard with device status and recent run outcomes</li>
              <li>Request a run for an enabled workflow that takes no inputs. Approve it in the Sir CLI on the paired computer.</li>
            </ul>
            <p className="content-muted mt-auto pt-5 text-sm">Paid subscriptions and remote run requests are planned after the pilot.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
