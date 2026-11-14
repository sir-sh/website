'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/app/home.module.css';

const links = [
  { href: 'https://github.com/sir-sh/workflows', label: 'Workflows' },
  { href: '/docs', label: 'Docs' },
  { href: '/specs', label: 'Specs' },
  { href: '/blog', label: 'Blog' },
  { href: '/search', label: 'Search' },
  { href: 'https://github.com/sir-sh/cli', label: 'GitHub' },
];

function NavigationLinks({ pathname }: { pathname: string }) {
  return links.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      aria-current={pathname === href ? 'page' : pathname.startsWith(href + '/') ? 'location' : undefined}
    >
      {label}
    </Link>
  ));
}

export function SiteNavigation({ footer = false }: { footer?: boolean }) {
  const pathname = usePathname();

  if (footer) {
    return <nav aria-label="Footer navigation"><NavigationLinks pathname={pathname} /></nav>;
  }

  return (
    <>
      <nav className={styles.desktopNav} aria-label="Main navigation"><NavigationLinks pathname={pathname} /></nav>
      <details className={styles.mobileNav} key={pathname}>
        <summary>
          Menu
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m3 6 5 5 5-5" />
          </svg>
        </summary>
        <nav aria-label="Mobile navigation"><NavigationLinks pathname={pathname} /></nav>
      </details>
    </>
  );
}
