'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/') return children;

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-2xl">⚡</span>
              <span>sir.sh</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Features</Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Docs</Link>
              <Link href="/specs" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Specs</Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Blog</Link>
              <a href="https://github.com/sir-sh/cli" target="_blank" rel="noopener" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">GitHub</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="https://github.com/sir-sh/cli"
              target="_blank"
              rel="noopener"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-lg">⚡</span>
              <span>sir.sh</span>
              <span>·</span>
              <a href="https://github.com/sir-sh/cli" className="hover:text-gray-700">GitHub</a>
              <span>·</span>
              <Link href="/docs" className="hover:text-gray-700">Docs</Link>
              <span>·</span>
              <Link href="/specs" className="hover:text-gray-700">Specs</Link>
              <span>·</span>
              <Link href="/blog" className="hover:text-gray-700">Blog</Link>
            </div>
            <div className="text-sm text-gray-400">
              MIT License
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}