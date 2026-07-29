import QuoteSeal from "./QuoteSeal";

function EmptyState({ title = "No Testimonials Found", message = "Start collecting customer reviews!" }) {
  return (
    <div className="bg-surface/60 rounded-3xl border border-dashed border-border-strong p-12 text-center my-6 flex flex-col items-center justify-center">
      <div className="mb-4 opacity-80">
        <QuoteSeal size={48} />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="text-xs text-ink-soft max-w-sm mt-1.5 leading-relaxed">{message}</p>
    </div>
  );
}

export default EmptyState;