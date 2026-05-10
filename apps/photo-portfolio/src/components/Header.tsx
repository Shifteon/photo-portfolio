import Link from "next/link";

export function Header() {
  return (
    <header className="flex w-full flex-col py-6 md:py-12 px-6 items-center border-b border-outline-variant bg-surface text-on-surface">
      <div className="w-full max-w-7xl flex flex-col items-center gap-4">
        <Link href="/" className="text-3xl md:text-4xl font-light tracking-widest uppercase hover:opacity-80 transition-opacity">
          Benjamin Wyatt
        </Link>
        <nav className="flex gap-6 mt-2">
          {/* Add navigation items here in the future if needed */}
        </nav>
      </div>
    </header>
  );
}
