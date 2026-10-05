"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";

import { LocalTime } from "./LocalTime";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5",
          scrolled
            ? "border border-line bg-ink-2/75 shadow-2xl shadow-black/40 backdrop-blur-md"
            : "border border-transparent",
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-rose to-camel font-hand text-2xl font-bold text-ink shadow-[2px_3px_0_0] shadow-wine transition-transform duration-500 group-hover:-rotate-12">
            {siteConfig.initials.toLowerCase()}
          </span>
          <span className="relative hidden sm:block">
            <span className="block font-hand text-3xl leading-none font-bold text-cream transition-colors group-hover:text-camel">
              {siteConfig.name}
            </span>
            <svg
              aria-hidden
              viewBox="0 0 160 10"
              className="mt-0.5 h-2 w-full text-rose"
              fill="none"
            >
              <path
                d="M2 7 C 40 2, 90 9, 158 4"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </svg>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.slice(1).map((item, index) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex items-baseline gap-1.5 rounded-lg px-3.5 py-2 text-sm transition-colors",
                    active ? "text-cream" : "text-muted hover:text-cream",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg border border-rose/40 bg-rose/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="font-mono text-[9px] text-camel">0{index + 1}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <LocalTime />

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-line md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-3 md:hidden"
          >
            <ul className="flex flex-col">
              {siteConfig.nav.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-2xl px-4 py-3 font-display text-2xl",
                      isActive(pathname, item.href) ? "bg-cream/10" : "text-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
