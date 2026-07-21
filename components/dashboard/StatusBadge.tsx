interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  let colorClass = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"; // Default
  let label = status;

  // Map database status enums/strings to standard badges
  if (status === "PUBLISHED" || status === "COMPLETED" || status === "PAID" || status === "ACTIVE") {
    colorClass = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    label = status === "PUBLISHED" ? "Published" : status.charAt(0) + status.slice(1).toLowerCase();
  } else if (status === "PROCESSING") {
    colorClass = "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    label = "Processing";
  } else if (status === "PENDING") {
    colorClass = "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    label = "Pending";
  } else if (status === "CANCELLED" || status === "INACTIVE" || status === "REVOKED") {
    colorClass = "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
    label = status.charAt(0) + status.slice(1).toLowerCase();
  } else if (status === "DRAFT") {
    label = "Draft";
  }

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${colorClass}`}>
      {label}
    </span>
  );
}
