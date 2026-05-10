import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sir.sh - AI-Powered Task Runner",
  description: "A local-first workflow/task runner built on Laravel Zero. Define, share, and execute complex development workflows with AI assistance.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2 font-bold text-xl">
                <span className="text-2xl">⚡</span>
                <span>sir.sh</span>
              </a>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="/#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Features</a>
                <a href="/docs" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Docs</a>
                <a href="/specs" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Specs</a>
                <a href="https://github.com/sir-sh/cli" target="_blank" rel="noopener" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">GitHub</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
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
                <a href="/docs" className="hover:text-gray-700">Docs</a>
                <span>·</span>
                <a href="/specs" className="hover:text-gray-700">Specs</a>
              </div>
              <div className="text-sm text-gray-400">
                MIT License
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}