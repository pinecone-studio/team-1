import { cn } from "@/lib/utils";
import { STATUS_LABELS } from "./constant";

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
    <div className="group relative inline-flex max-w-full align-middle">
      <span
        title={config.label}
        className={cn(
          "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium",
          "max-w-full min-w-0 overflow-hidden",
          config.className,
        )}
      >
        <span className="truncate">{config.label}</span>
      </span>
      {config.label ? (
        <div className="pointer-events-none absolute left-0 top-full z-50 mt-1 hidden max-w-72 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-lg group-hover:block">
          {config.label}
        </div>
      ) : null}
    </div>
  );
}
