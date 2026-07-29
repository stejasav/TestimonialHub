import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import RatingStars from "../components/RatingStars";
import Loader from "../components/Loader";
import QuoteSeal from "../components/QuoteSeal";
import Navbar from "../components/Navbar";

function WidgetPage() {
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState("carousel"); // "carousel" | "list"
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [copied, setCopied] = useState(false);

  // Extract accent color from query param (default: #1F3A3D)
  const rawColor = searchParams.get("color") || "1F3A3D";
  const accentColor = rawColor.startsWith("#") ? rawColor : `#${rawColor}`;

  // Detect if loaded directly (not embedded in an iframe)
  const isDirectView = window.self === window.top;

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await api.get("/testimonials/approved");
        setReviews(res.data.data || []);
      } catch (error) {
        console.error("Widget load error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApproved();
  }, []);

  // Auto-play timer for carousel
  useEffect(() => {
    if (!isAutoplay || reviews.length <= 1 || viewMode !== "carousel") return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length, isAutoplay, viewMode]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
      : "5.0";

  const activeReview = reviews[activeIndex];

  const handleCopyCode = () => {
    const code = `<iframe src="${window.location.origin}/widget?color=${encodeURIComponent(
      accentColor
    )}" width="100%" height="480" frameborder="0" style="border-radius: 16px; overflow: hidden;"></iframe>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-grid-pattern flex flex-col">
      {isDirectView && <Navbar />}

      <div
        className="flex-1 p-5 md:p-8 flex flex-col justify-between max-w-5xl mx-auto w-full"
        style={{
          fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
          color: "#14161F",
        }}
      >
      <div>
        {/* Top Header Bar */}
        <div
          className="pb-3.5 mb-4 flex items-center justify-between border-b"
          style={{ borderColor: `${accentColor}25` }}
        >
          <div className="flex items-center gap-2.5">
            <QuoteSeal size={28} />
            <div>
              <h2
                className="font-semibold text-sm leading-tight"
                style={{ fontFamily: "'Fraunces', serif", color: accentColor }}
              >
                Customer Reviews
              </h2>
              <span className="text-[10px] text-ink-faint font-medium">
                {reviews.length} Verified Submissions
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle Buttons */}
            <div className="flex bg-paper border border-border p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setViewMode("carousel")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  viewMode === "carousel"
                    ? "bg-surface text-ink shadow-xs"
                    : "text-ink-faint hover:text-ink"
                }`}
                title="Carousel View"
              >
                Slideshow
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-surface text-ink shadow-xs"
                    : "text-ink-faint hover:text-ink"
                }`}
                title="List View"
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Rating Summary Pill */}
        {!loading && reviews.length > 0 && (
          <div className="flex items-center justify-between bg-surface border border-border rounded-xl px-3.5 py-2 mb-4">
            <div className="flex items-center gap-2">
              <RatingStars rating={Math.round(Number(avgRating))} />
              <span className="text-xs font-semibold text-ink">
                {avgRating} / 5.0
              </span>
            </div>
            <span className="text-[11px] text-ink-faint font-medium">
              Powered by TestimonialHub
            </span>
          </div>
        )}

        {/* Content Loader / Empty / Views */}
        {loading ? (
          <Loader text="Loading Widget Reviews..." />
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-surface rounded-2xl border border-dashed border-border p-6">
            <QuoteSeal size={40} />
            <p className="text-xs font-semibold text-ink mt-3">No Approved Reviews Yet</p>
            <p className="text-[11px] text-ink-faint mt-1">
              Testimonials approved in the Moderation Dashboard will appear here.
            </p>
          </div>
        ) : viewMode === "carousel" && activeReview ? (
          /* Carousel Spotlight View */
          <div className="card shadow-elevated p-6 flex flex-col justify-between relative min-h-[300px] border-l-4" style={{ borderLeftColor: accentColor }}>
            {/* Top Quote Icon & Slide Counter */}
            <div className="flex justify-between items-start mb-3">
              <span
                className="font-display text-gold/30 text-4xl leading-none select-none"
                aria-hidden="true"
              >
                “
              </span>
              <span className="text-[11px] font-medium text-ink-faint">
                {activeIndex + 1} of {reviews.length}
              </span>
            </div>

            {/* Testimonial Body */}
            <p className="text-ink text-sm md:text-base leading-relaxed font-normal my-2 italic">
              "{activeReview.testimonial}"
            </p>

            {/* Author & Footer Controls */}
            <div className="pt-4 border-t border-border mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                {activeReview.photo ? (
                  <img
                    src={activeReview.photo}
                    alt={activeReview.name}
                    className="w-10 h-10 rounded-full object-cover border border-border shrink-0"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="w-10 h-10 rounded-full font-display font-semibold items-center justify-center text-sm shrink-0"
                  style={{
                    display: activeReview.photo ? "none" : "flex",
                    backgroundColor: accentColor,
                    color: "#F5EAD9",
                  }}
                >
                  {activeReview.name ? activeReview.name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <h4 className="font-semibold text-ink text-xs sm:text-sm">
                    {activeReview.name}
                  </h4>
                  <p className="text-[11px] text-ink-soft">
                    {activeReview.company}
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={prevSlide}
                  className="p-1.5 rounded-lg border border-border bg-paper hover:bg-surface text-ink-soft hover:text-ink transition-colors cursor-pointer"
                  title="Previous Review"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>

                <button
                  onClick={() => setIsAutoplay(!isAutoplay)}
                  className="p-1.5 rounded-lg border border-border bg-paper hover:bg-surface text-ink-soft hover:text-ink text-[11px] font-semibold px-2 transition-colors cursor-pointer"
                  title={isAutoplay ? "Pause Autoplay" : "Play Autoplay"}
                >
                  {isAutoplay ? "Pause" : "Play"}
                </button>

                <button
                  onClick={nextSlide}
                  className="p-1.5 rounded-lg border border-border bg-paper hover:bg-surface text-ink-soft hover:text-ink transition-colors cursor-pointer"
                  title="Next Review"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: activeIndex === idx ? "18px" : "6px",
                    height: "6px",
                    backgroundColor: activeIndex === idx ? "#B8863D" : "#E6E4DD",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Scrollable List View */
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {reviews.map((rev, idx) => (
              <div
                key={rev._id}
                onClick={() => setActiveIndex(idx)}
                className="card p-4 transition-all duration-200 cursor-pointer hover:border-border-strong"
                style={{
                  borderLeft: `3px solid ${idx === activeIndex ? accentColor : "#E6E4DD"}`,
                  backgroundColor: idx === activeIndex ? "#FFFFFF" : "#F4F3EF",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2.5">
                    {rev.photo ? (
                      <img
                        src={rev.photo}
                        alt={rev.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-border"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="w-8 h-8 rounded-full font-display font-semibold items-center justify-center text-xs shrink-0"
                      style={{
                        display: rev.photo ? "none" : "flex",
                        backgroundColor: accentColor,
                        color: "#F5EAD9",
                      }}
                    >
                      {rev.name ? rev.name[0].toUpperCase() : "U"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-ink leading-tight">
                        {rev.name}
                      </h4>
                      <p className="text-[10px] text-ink-faint">{rev.company}</p>
                    </div>
                  </div>
                  <RatingStars rating={rev.rating} />
                </div>
                <p className="text-xs text-ink-soft leading-relaxed italic">
                  "{rev.testimonial}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Embed Generator Section (shown when opened directly in browser) */}
      {isDirectView && (
        <div className="mt-6 pt-5 border-t border-border">
          <div className="bg-surface border border-border rounded-2xl p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="font-display font-semibold text-sm text-ink">
                  Embed This Widget on Your Site
                </h3>
                <p className="text-xs text-ink-soft">
                  Copy and paste the iframe snippet into your website's HTML.
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className="btn btn-primary text-xs py-2 px-4 shrink-0"
              >
                {copied ? "✓ Copied to Clipboard!" : "Copy iFrame Code"}
              </button>
            </div>
            <pre className="bg-paper p-3 rounded-xl border border-border text-[11px] text-ink-soft font-mono overflow-x-auto whitespace-pre-wrap select-all">
              {`<iframe src="${window.location.origin}/widget?color=${encodeURIComponent(
                accentColor
              )}" width="100%" height="480" frameborder="0" style="border-radius: 16px; overflow: hidden;"></iframe>`}
            </pre>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default WidgetPage;