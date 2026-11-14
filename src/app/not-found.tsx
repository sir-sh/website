import Link from "next/link";
import styles from "./home.module.css";

export default function NotFound() {
  return (
    <div className="content-page text-center">
      <h1 className="font-bold mb-3">Page not found</h1>
      <p className="content-muted mb-8">Check the address or find your way back below.</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className={styles.gold}>Go home</Link>
        <Link href="/docs" className={styles.ink}>View docs</Link>
      </div>
    </div>
  );
}
