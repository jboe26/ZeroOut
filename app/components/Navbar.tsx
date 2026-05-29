"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/login" || pathname === "/signup")
    return null;

  return (
    <div>
      <header className="bg-slate-900 p-6 text-lg text-white/70">
        ZeroOut : Personal Finance Dashboard
      </header>
      <nav className="bg-slate-900 p-6 flex flex-wrap gap-6 text-md text-white/70 uppercase tracking-wider">
        <Link
          href="/dashboard"
          className="hover:text-white transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/income"
          className="hover:text-white transition-colors duration-200"
        >
          Income
        </Link>
        <Link
          href="/expenses"
          className="hover:text-white transition-colors duration-200"
        >
          Expenses
        </Link>
        <Link
          href="/debt"
          className="hover:text-white transition-colors duration-200"
        >
          Debt
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="hover:text-white transition-colors duration-200"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
