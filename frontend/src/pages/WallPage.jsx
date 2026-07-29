import Navbar from "../components/Navbar";
import TestimonialCard from "../components/TestimonialCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import RatingStars from "../components/RatingStars";
import { useTestimonials } from "../hooks/useTestimonials";

function WallPage() {
  const { testimonials: reviews, loading } = useTestimonials(true);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div className="min-h-screen bg-grid-pattern flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10">
        {/* Hero Banner */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-gold-tint border border-gold/20 text-gold-soft text-[11px] font-semibold uppercase tracking-wide px-3.5 py-1.5 rounded-full mb-5">
            Loved by thousands of teams
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink tracking-tight leading-[1.1]">
            Wall of Love
          </h1>
          <p className="text-ink-soft text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Real feedback and authentic success stories from customers around the world.
          </p>

          {!loading && reviews.length > 0 && (
            <div className="inline-flex items-center gap-3 mt-7 bg-surface py-2.5 px-6 rounded-full border border-border">
              <RatingStars rating={5} />
              <div className="h-4 w-px bg-border"></div>
              <span className="font-display font-semibold text-ink text-sm">{avgRating} / 5</span>
              <span className="text-ink-faint text-xs">· {reviews.length} verified reviews</span>
            </div>
          )}
        </div>

        {/* Testimonials Masonry Wall */}
        {loading ? (
          <Loader text="Loading customer stories..." />
        ) : reviews.length === 0 ? (
          <EmptyState
            title="No Approved Testimonials Yet"
            message="Check back soon! Testimonials will appear on this wall once approved by our moderation team."
          />
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {reviews.map((review) => (
              <TestimonialCard key={review._id} item={review} showStatus={false} className="mb-6" />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default WallPage;