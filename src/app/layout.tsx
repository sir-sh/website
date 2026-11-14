import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { SiteNavigation } from "@/components/SiteNavigation";
import styles from "./home.module.css";

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
    <html lang="en">
      <body className={styles.paper}>
        <div className={styles.frame}>
          <header className={styles.header}>
            <div className={styles.masthead}>
              <Link href="/" className={styles.wordmark}>sir.sh</Link>
            </div>
            <SiteNavigation />
          </header>
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            <Link href="/" className={styles.wordmark}>sir.sh</Link>
            <SiteNavigation footer />
          </footer>
        </div>
      </body>
    </html>
  );
}
