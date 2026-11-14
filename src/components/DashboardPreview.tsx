'use client';

import { useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import styles from '@/app/home.module.css';

const tabs = ['Approvals', 'Ask Sir'] as const;
const sections = [['▱', 'Workflows'], ['◇', 'Approvals'], ['▷', 'Runs'], ['≡', 'Configurations'], ['⌁', 'Connections']];

function PreviewIcon({ chat = false, className }: { chat?: boolean; className: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {chat
        ? <path d="M5 4h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-8l-5 4v-4H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Zm2 6h.01m5 0h.01m5 0h.01" />
        : <path d="M12 2 3 5v6c0 5 4 9 9 11 5-2 9-6 9-11V5l-9-3Zm-4 10 3 3 5-6" />}
    </svg>
  );
}

function ChatCard() {
  return (
    <div className={styles.card}>
      <h3><PreviewIcon chat className={styles.inlineIcon} /> Ask Sir</h3>
      <p className={styles.chatRequest}>Run release checks.</p>
      <p className={styles.chatReply}>Ready for your approval.</p>
      <div className={styles.composer}>Ask Sir… <span role="img" aria-label="Voice input"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="2" width="6" height="13" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-3 0h6" /></svg></span></div>
    </div>
  );
}

const mobileQuery = '(max-width: 760px)';

function subscribeToViewport(onChange: () => void) {
  const viewport = window.matchMedia(mobileQuery);
  viewport.addEventListener('change', onChange);
  return () => viewport.removeEventListener('change', onChange);
}

export function DashboardPreview() {
  const mobile = useSyncExternalStore(
    subscribeToViewport,
    () => window.matchMedia(mobileQuery).matches,
    () => false,
  );
  const [active, setActive] = useState<(typeof tabs)[number]>('Approvals');

  function moveTab(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs[1]
      : active === tabs[0] ? tabs[1] : tabs[0];
    setActive(next);
    event.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`[id="sir-tab-${tabs.indexOf(next)}"]`)?.focus();
  }

  return (
    <section className={styles.dashboard} aria-labelledby="sir-preview-title">
      <header className={styles.dashboardHeader}>
        <h2 id="sir-preview-title"><span aria-hidden="true">⋈</span> Sir AgenticOS</h2>
        <span className={styles.badge}>Planned</span>
      </header>
      <div className={styles.tabs} role="tablist" aria-label="Dashboard preview">
        {tabs.map((tab, index) => (
          <button key={tab} type="button" role="tab" id={`sir-tab-${index}`}
            aria-controls={`sir-panel-${index}`} aria-selected={active === tab}
            tabIndex={active === tab ? 0 : -1} onClick={() => setActive(tab)} onKeyDown={moveTab}>
            <PreviewIcon chat={index === 1} className={styles.tabIcon} /> {tab}
          </button>
        ))}
      </div>
      <div className={styles.dashboardBody}>
        <ul className={styles.sidebar} aria-label="Planned dashboard sections">
          {sections.map(([icon, label]) => <li key={label}><span aria-hidden="true">{icon}</span> {label}</li>)}
        </ul>
        <div className={styles.panels}>
          <div className={styles.panel} id="sir-panel-0" role={mobile ? "tabpanel" : undefined} aria-labelledby={mobile ? "sir-tab-0" : undefined} tabIndex={mobile ? 0 : undefined} data-active={active === 'Approvals'}>
            <div className={styles.card}>
              <h3><PreviewIcon className={styles.approvalIcon} /> Workflow Awaiting Approval</h3>
              <div className={styles.approvalBody}>
                <div><code>release-checks</code><p>Run release checks for the current project.</p></div>
                <div className={styles.actions}>
                  <button type="button" className={styles.gold} disabled>✓ Approve</button>
                  <button type="button" disabled>× Decline</button>
                </div>
              </div>
            </div>
            <div className={styles.mobileConversation}><ChatCard /></div>
            <div className={`${styles.card} ${styles.desktopCard}`}>
              <h3>Pending Workflow <small className={styles.badge}>Pending</small></h3>
              <code>sync-docs</code>
              <p>Sync documentation with the latest changes.</p>
            </div>
            <div className={`${styles.card} ${styles.desktopCard}`}>
              <h3>Completed Run <small className={styles.completed}>✓ Completed</small></h3>
              <code>build-project</code>
              <pre>{'10:24:11  Preparing build…\n10:24:14  Compiling sources… ✓\n10:24:20  Running tests… ✓\n10:24:28  Tests passed (42/42) ✓\n10:24:33  Packaging artifacts…\n10:24:37  Build complete ✓'}</pre>
            </div>
          </div>
          <div className={styles.panel} id="sir-panel-1" role={mobile ? "tabpanel" : undefined} aria-labelledby={mobile ? "sir-tab-1" : undefined} tabIndex={mobile ? 0 : undefined} data-active={active === 'Ask Sir'}>
            <ChatCard />
            <div className={styles.card}>
              <h3>Run History</h3>
              <ul className={styles.history}>
                <li><span>✓ build-project</span><span>3 min ago</span></li>
                <li><span>✓ backup-notes</span><span>28 min ago</span></li>
                <li><span>○ release-checks</span><span>Pending</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
