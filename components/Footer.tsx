import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-5 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs text-muted">
        <p>© {new Date().getFullYear()} CODARAFROJ. Built with sweat and code.</p>
        <Link href="/admin" className="hover:text-fg transition-colors">
          Admin
        </Link>
      </div>
    </footer>
  );
}
