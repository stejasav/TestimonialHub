import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import QuoteSeal from "./QuoteSeal";

function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Submit Review" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/wall", label: "Wall of Love" },
  ];

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menu on pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <QuoteSeal size={34} />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-[17px] font-semibold text-ink tracking-tight">
                Testimonial<span className="text-gold">Hub</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-faint">
                Proof, collected
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative text-[13px] font-semibold py-2 transition-colors ${
                  isActive(path) ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-[1px] h-[2px] w-full rounded-full bg-gold transition-opacity ${
                    isActive(path) ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/widget" className="btn btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              Widget Embed
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-ink-soft hover:text-ink p-2 -mr-2 rounded-lg hover:bg-brand-tint transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Backdrop with Subtle Blur */}
      <div
        className={`fixed inset-0 z-50 bg-ink/30 backdrop-blur-[3px] transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-Over Drawer (Right Side, ~78% width) */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-[78%] max-w-[320px] h-full bg-paper border-l border-border shadow-elevated p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <QuoteSeal size={26} />
              <span className="font-display text-base font-semibold text-ink">
                Testimonial<span className="text-gold">Hub</span>
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-ink-soft hover:text-ink p-1.5 rounded-lg hover:bg-brand-tint transition-colors"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="space-y-1.5">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive(path)
                    ? "bg-brand-tint text-brand shadow-xs"
                    : "text-ink-soft hover:text-ink hover:bg-surface"
                }`}
              >
                <span>{label}</span>
                {isActive(path) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 border-t border-border space-y-4">
          <Link
            to="/widget"
            onClick={() => setMobileOpen(false)}
            className="btn btn-secondary w-full justify-center py-3"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            Widget Embed
          </Link>
          <div className="text-center text-[11px] text-ink-faint tracking-wider uppercase font-medium">
            Editorial Proof System
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;