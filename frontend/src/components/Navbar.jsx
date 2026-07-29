import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-border">
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

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-ink-soft hover:text-ink p-2 -mr-2 rounded-lg hover:bg-brand-tint transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-paper px-4 pb-4 pt-3 space-y-1">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive(path)
                  ? "bg-brand-tint text-brand"
                  : "text-ink-soft hover:text-ink hover:bg-surface"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border">
            <Link
              to="/widget"
              onClick={() => setMobileOpen(false)}
              className="btn btn-secondary w-full mt-2"
            >
              Widget Embed
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;