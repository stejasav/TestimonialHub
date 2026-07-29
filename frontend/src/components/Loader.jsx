function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-ink-soft">
      <div className="w-8 h-8 border-[3px] border-border border-t-brand rounded-full animate-spin"></div>
      <p className="text-xs font-semibold tracking-wide text-ink-soft">{text}</p>
    </div>
  );
}

export default Loader;