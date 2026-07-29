import RatingStars from "./RatingStars";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../utils/formatDate";

function TestimonialCard({
  item,
  showActions = false,
  showStatus = true,
  onApprove,
  onReject,
  className = "",
}) {
  const getSentimentBadge = (sentiment) => {
    if (!sentiment) return null;
    const lower = sentiment.toLowerCase();
    if (lower.includes("positive")) {
      return (
        <span className="bg-success-tint text-success border border-success/20 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
          Positive
        </span>
      );
    }
    if (lower.includes("negative")) {
      return (
        <span className="bg-error-tint text-error border border-error/20 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
          Negative
        </span>
      );
    }
    return (
      <span className="bg-brand-tint text-brand border border-brand/10 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
        Neutral
      </span>
    );
  };

  return (
    <div
      className={`card shadow-card hover:shadow-elevated hover:border-border-strong transition-all duration-300 p-6 flex flex-col justify-between break-inside-avoid h-full group ${className}`}
    >
      <div>
        {/* Top User Info & Badges */}
        <div className="flex justify-between items-start mb-4 gap-3">
          <div className="flex items-center gap-3">
            {item.photo ? (
              <img
                src={item.photo}
                alt={item.name}
                className="w-11 h-11 rounded-full object-cover border border-border shrink-0"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-11 h-11 rounded-full bg-brand text-gold font-display font-semibold items-center justify-center text-base shrink-0"
              style={{ display: item.photo ? "none" : "flex" }}
            >
              {item.name ? item.name[0].toUpperCase() : "U"}
            </div>
            <div>
              <h3 className="font-semibold text-ink text-[15px] leading-snug">
                {item.name}
              </h3>
              <p className="text-xs font-medium text-ink-soft">{item.company}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {showStatus && <StatusBadge status={item.status} />}
            {getSentimentBadge(item.sentiment)}
          </div>
        </div>

        {/* Rating & Submission Date */}
        <div className="mb-3.5 flex justify-between items-center">
          <RatingStars rating={item.rating} />
          {item.createdAt && (
            <span className="text-[11px] text-ink-faint font-medium">
              {formatDate(item.createdAt)}
            </span>
          )}
        </div>

        {/* Testimonial Quote */}
        <div className="relative mb-4">
          <span
            className="font-display text-gold/25 absolute -top-3 -left-1 select-none pointer-events-none"
            style={{ fontSize: "3rem", lineHeight: 1 }}
            aria-hidden="true"
          >
            “
          </span>
          <p className="relative text-ink text-sm leading-relaxed font-normal pl-3">
            {item.testimonial}
          </p>
        </div>

        {/* AI Insights Card */}
        {(item.summary || (item.keywords && item.keywords.length > 0) || item.category) && (
          <div className="bg-paper border border-border rounded-xl p-3.5 my-3 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-ink-soft flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                  <path d="M12 3l1.4 3.9L17.4 8l-4 1.4L12 13.3l-1.4-3.9L6.6 8l4-1.1L12 3z" />
                  <path d="M18.5 12.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
                </svg>
                AI Analysis
              </div>
              {item.category && (
                <span className="bg-brand-tint text-brand font-semibold px-2 py-0.5 rounded-md text-[10px]">
                  {item.category}
                </span>
              )}
            </div>

            {item.summary && (
              <p className="text-ink-soft text-[11px] leading-relaxed">
                <span className="font-semibold text-ink">Summary:</span> {item.summary}
              </p>
            )}

            {item.moderationSuggestion && (
              <div className="text-[11px] text-ink-soft font-medium">
                <span>AI Rec: </span>
                <span className={`font-bold ${
                  item.moderationSuggestion === "Approve" ? "text-success" : "text-error"
                }`}>
                  {item.moderationSuggestion}
                </span>
              </div>
            )}

            {item.keywords && item.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {item.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="bg-surface border border-border text-ink-soft px-2 py-0.5 rounded-md text-[10px] font-medium"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="flex gap-2.5 pt-4 border-t border-border mt-4">
          {item.status !== "approved" && (
            <button
              onClick={() => onApprove && onApprove(item._id)}
              className="btn flex-1 bg-success text-paper hover:bg-success/90 py-2.5"
            >
              Approve
            </button>
          )}

          {item.status !== "rejected" && (
            <button
              onClick={() => onReject && onReject(item._id)}
              className="btn flex-1 bg-error-tint text-error border border-error/20 hover:bg-error/10 py-2.5"
            >
              Reject
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TestimonialCard;