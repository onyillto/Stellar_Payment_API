"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const network =
    (process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? "testnet").toLowerCase();
  const isMainnet = network === "public" || network === "mainnet";
  const networkLabel = isMainnet ? "MAINNET" : "TESTNET";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard/create", label: "Create Payment" },
    { href: "/settings", label: "Settings" },
    { href: "/register", label: "Register" },
  ];

  return (
    <nav className="border-b border-white/10 bg-black/50 backdrop-blur dark:border-white/10 dark:bg-black/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-mint">
              Stellar Pay
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Network Badge */}
            <span
              aria-label={`Network: ${networkLabel}`}
              className={`rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.2em] ${
                isMainnet
                  ? "border-green-500/40 bg-green-500/15 text-green-300"
                  : "border-yellow-500/50 bg-yellow-500/15 text-yellow-300"
              }`}
            >
              {networkLabel}
            </span>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="flex flex-col gap-1.5 md:hidden"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-6 bg-white transition-all ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-white transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-white transition-all ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-white/10 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
