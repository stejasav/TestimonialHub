function QuoteSeal({ size = 36 }) {
  return (
    <div
      className="rounded-full bg-brand flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <span
        className="font-display text-gold leading-none select-none"
        style={{ fontSize: size * 0.52, marginTop: -size * 0.06 }}
      >
        “
      </span>
    </div>
  );
}

export default QuoteSeal;
