import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DashboardPreview } from '@/components/DashboardPreview';
import styles from './home.module.css';

export const metadata: Metadata = {
  title: 'sir.sh · Your Command Butler for Local Workflows',
  description: 'Define, share, and run workflows on your computer with Sir, the local workflow runner.',
};

const github = 'https://github.com/sir-sh/cli';
const registry = '/workflows';

function Divider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <svg viewBox="0 0 42 28" width="42" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 9 11 4 16 5 21 1 26 5 31 4 40 9 21 27Z M2 9l19 18L11 4m5 1 5 22V1m5 4-5 22L31 4m9 5L21 27" />
      </svg>
    </div>
  );
}

function Artwork({ name, priority = false }: { name: string; priority?: boolean }) {
  return (
    <div className={styles.artwork}>
      <Image src={`/artwork/${name}.webp`} alt="" fill sizes="(max-width: 640px) 70vw, 480px"
        preload={priority} unoptimized />
    </div>
  );
}

const commands = [
  { command: 'sir run WORKFLOW', description: 'Run a workflow you have installed or defined.', planned: false },
  { command: 'sir start', description: 'Open the local dashboard.', planned: true },
  { command: 'sir please run WORKFLOW', description: 'Use the optional courtesy alias.', planned: true },
];

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <Artwork name="hero-v2" priority />
        <div>
          <h1>Your Command Butler <span>for Local Workflows.</span></h1>
          <p>Run and review workflows on your computer, with explicit approvals where required and a personal dashboard on the roadmap.</p>
          <code className={styles.command} aria-label="Example: sir run hello"><span>$</span> sir run hello</code>
          <Link href={github} className={styles.gold}>Get started <span aria-hidden="true">→</span></Link>
        </div>
      </section>
      <Divider />
      <DashboardPreview />
      <Divider />
      <section className={styles.feature} id="features">
        <Artwork name="registry" />
        <div>
          <h2>Discover <span className={styles.desktopCopy}>&amp; Install </span>Workflows</h2>
          <p>Find workflows in the registry and install them to run locally.</p>
          <Link href={registry} className={styles.ink}><span aria-hidden="true">⬡</span> Browse Registry <span aria-hidden="true">→</span></Link>
        </div>
      </section>
      <section className={styles.feature}>
        <div className={styles.terminalArt}><Artwork name="terminal" /><span aria-hidden="true">$ _</span></div>
        <div>
          <h2>Quickstart with Simple Commands</h2>
          <p><Link href="/docs/QUICKSTART">Install Sir and run your first workflow</Link>.</p>
          <ul className={styles.commands}>
            {commands.map(({ command, description, planned }) => (
              <li key={command} className={command.includes("please") ? styles.courtesy : undefined}><code className={styles.command}><span>$</span> {command}{planned && <small className={styles.badge}>Planned</small>}</code>
                <span className={styles.commandHelp}>{description}</span></li>
            ))}
          </ul>
        </div>
      </section>
      <section className={styles.feature}>
        <Artwork name="microphone" />
        <div>
          <h2>Ask Sir by Voice or Chat <small className={styles.badge}>Planned</small></h2>
          <p>Request workflows and check run status by chat. Connect your own speech provider key for optional real-time voice.</p>
          <ul className={styles.capabilities}><li><span aria-hidden="true">♩</span> Voice requests</li><li><span aria-hidden="true">☏</span> Chat &amp; run status</li></ul>
        </div>
      </section>
      <section className={styles.closing}>
        <Artwork name="closing" />
        <div>
          <h2>Get Started with sir.sh</h2>
          <p>Bring a command butler to your computer. Install Sir and run your first local workflow.</p>
          <Link href={github} className={styles.gold}>Get started <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  );
}
