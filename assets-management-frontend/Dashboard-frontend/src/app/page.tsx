import { Suspense } from "react";

import { DashboardPageClient } from "@/components/DashboardPageClient";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="h-svh bg-muted/30" />}>
      <DashboardPageClient />
    </Suspense>
  );
}
