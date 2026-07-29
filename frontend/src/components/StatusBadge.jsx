function StatusBadge({ status = "pending" }) {
  const styles = {
    pending: {
      badge: "bg-warning-tint text-warning border-warning/20",
      dot: "bg-warning",
      label: "Pending",
    },
    approved: {
      badge: "bg-success-tint text-success border-success/20",
      dot: "bg-success",
      label: "Approved",
    },
    rejected: {
      badge: "bg-error-tint text-error border-error/20",
      dot: "bg-error",
      label: "Rejected",
    },
  };

  const current = styles[status] || styles.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${current.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`}></span>
      {current.label}
    </span>
  );
}

export default StatusBadge;