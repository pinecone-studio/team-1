"use client";

import { useState } from "react";

import OffboardingTaskList from "./offboarding-task-list";
import OffboardingOverview from "./offboarding-overview";
import OffboardingAssets from "./offboarding-assets";

import { offboardingTasks } from "@/lib/mock-data";
import InspectionDialog from "./offboarding-dialog";

export default function OffboardingContent() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showInspectionDialog, setShowInspectionDialog] = useState(false);

  const activeTask =
    offboardingTasks.find((t) => t.id === selectedTask) || offboardingTasks[0];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Offboarding Workflow</h1>
        <p className="text-muted-foreground">
          Manage asset returns during employee termination
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <OffboardingTaskList
          tasks={offboardingTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />

        <div className="lg:col-span-2 space-y-6">
          {activeTask && (
            <>
              <OffboardingOverview task={activeTask} />
              <OffboardingAssets
                assets={activeTask.assets}
                onInspect={() => setShowInspectionDialog(true)}
              />
            </>
          )}
        </div>
      </div>

      <InspectionDialog
        open={showInspectionDialog}
        onClose={() => setShowInspectionDialog(false)}
      />
    </div>
  );
}
