"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Attack Taxonomy", href: "/taxonomy" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Demo", href: "/demo" },
  { label: "Compliance", href: "/compliance" },
  { label: "Contribute", href: "/contribute" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="header">
      <div className="header-inner">
        {/* ── Logo ── */}
        <Link href="/" className="logo" aria-label="ClinAgent Arena home">
          <span className="logo-dot" aria-hidden="true" />
          <span className="logo-text">ClinAgent Arena</span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link ${isActive ? "nav-link--active" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── CTA Button (desktop) ── */}
        <Link href="/demo" className="cta-button desktop-only">
          Run a Demo
        </Link>

        {/* ── Hamburger Toggle ── */}
        <button
          className="hamburger"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span className={`hamburger-bar ${mobileOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${mobileOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${mobileOpen ? "open" : ""}`} />
        </button>
      </div>

      {/* ── Mobile Nav Panel ── */}
      <div
        id="mobile-nav-panel"
        className={`mobile-panel ${mobileOpen ? "mobile-panel--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`mobile-link ${isActive ? "mobile-link--active" : ""}`}
              >
                {label}
              </Link>
            );
          })}
          <Link href="/demo" className="cta-button mobile-cta">
            Run a Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
