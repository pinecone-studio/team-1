import { cn } from "@/lib/utils";
import { STATUS_LABELS } from "./constants";

type StatusKey = keyof typeof STATUS_LABELS;

export function StatusBadge({ status }: { status: string }) {
  const upper = (status ?? "").toUpperCase().replace(/-/g, "_");

  const isValid = upper in STATUS_LABELS;

  const config = isValid
    ? STATUS_LABELS[upper as StatusKey]
    : {
        label: status ?? "—",
        className: "bg-muted text-muted-foreground",
      };

  return (
    <span
      title={config.label}
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        "max-w-full min-w-0 overflow-hidden",
        config.className,
      )}
    >
      <span className="truncate">{config.label}</span>
    </span>
  );
}
