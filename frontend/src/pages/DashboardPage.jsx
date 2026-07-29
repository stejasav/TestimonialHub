import { useState } from "react";
import Navbar from "../components/Navbar";
import TestimonialCard from "../components/TestimonialCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { useTestimonials } from "../hooks/useTestimonials";

function DashboardPage() {
  const { testimonials, stats, loading, approve, reject } = useTestimonials(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const totalCount = stats.total || testimonials.length;
  const pendingCount = stats.pending || testimonials.filter((t) => t.status === "pending").length;
  const approvedCount = stats.approved || testimonials.filter((t) => t.status === "approved").length;
  const rejectedCount = stats.rejected || testimonials.filter((t) => t.status === "rejected").length;

  const filteredTestimonials = testimonials.filter((item) => {
    const matchesFilter = filter === "all" ? true : item.status === filter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.company && item.company.toLowerCase().includes(term)) ||
      (item.email && item.email.toLowerCase().includes(term)) ||
      (item.testimonial && item.testimonial.toLowerCase().includes(term));
    return matchesFilter && matchesSearch;
  });

  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "rating_desc") return (b.rating || 5) - (a.rating || 5);
    if (sortBy === "rating_asc") return (a.rating || 5) - (b.rating || 5);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const stat = (label, value, color) => (
    <div className="flex-1 min-w-[130px] px-5 py-4 border-r border-border last:border-r-0">
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${color}`}></span>
        <p className="text-[11px] font-semibold text-ink-soft uppercase tracking-wide">{label}</p>
      </div>
      <p className="font-display text-2xl font-semibold text-ink">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-grid-pattern flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
              <span className="text-[11px] font-semibold text-ink-soft uppercase tracking-[0.12em]">
                Live Admin Portal
              </span>
            </div>
            <h1 className="font-display text-3xl font-semibold text-ink tracking-tight">
              Moderation Dashboard
            </h1>
            <p className="text-sm text-ink-soft mt-1.5">
              Review incoming reviews and moderate what appears on your Wall of Love.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              placeholder="Search by name, company, or text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="field-input pl-10"
            />
            <svg
              className="w-4 h-4 text-ink-faint absolute left-3.5 top-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Stats Row */}
        <div className="card shadow-card flex flex-wrap mb-8">
          {stat("Total Submissions", totalCount, "bg-ink-faint")}
          {stat("Pending Review", pendingCount, "bg-warning")}
          {stat("Approved", approvedCount, "bg-success")}
          {stat("Rejected", rejectedCount, "bg-error")}
        </div>

        {/* Filter Tabs & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border mb-8 pb-0">
          <div className="flex gap-6 overflow-x-auto w-full sm:w-auto">
            {[
              { id: "all", label: "All Reviews", count: totalCount },
              { id: "pending", label: "Pending", count: pendingCount },
              { id: "approved", label: "Approved", count: approvedCount },
              { id: "rejected", label: "Rejected", count: rejectedCount },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`relative pb-3 text-[13px] font-semibold transition-all cursor-pointer shrink-0 ${
                  filter === tab.id
                    ? "text-ink"
                    : "text-ink-faint hover:text-ink-soft"
                }`}
              >
                {tab.label} <span className="ml-1 opacity-60">({tab.count})</span>
                <span
                  className={`absolute left-0 -bottom-[1px] h-[2px] w-full rounded-full bg-gold transition-opacity ${
                    filter === tab.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-ink-soft font-medium shrink-0 pb-3">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-border text-ink text-xs rounded-lg px-3 py-1.5 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-tint cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating_desc">Highest Rating</option>
              <option value="rating_asc">Lowest Rating</option>
            </select>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <Loader text="Loading moderation queue..." />
        ) : sortedTestimonials.length === 0 ? (
          <EmptyState
            title="No Testimonials Match Your Criteria"
            message={
              searchTerm
                ? `No testimonials found matching "${searchTerm}".`
                : `There are no testimonials under "${filter}" status right now.`
            }
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTestimonials.map((item) => (
              <TestimonialCard
                key={item._id}
                item={item}
                showActions
                onApprove={approve}
                onReject={reject}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;