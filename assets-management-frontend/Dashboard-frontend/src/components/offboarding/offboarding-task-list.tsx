import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle } from "lucide-react";

export default function OffboardingTaskList({
  tasks,
  selectedTask,
  setSelectedTask,
}: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Ажлаас гарах даалгаварууд</h2>

      {tasks.map((task: any) => (
        <Card
          key={task.id}
          className="cursor-pointer"
          onClick={() => setSelectedTask(task.id)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{task.employeeName}</p>

                <p className="text-sm text-muted-foreground">
                  Дуусгавар болгох: {task.terminationDate}
                </p>
              </div>

              <Badge>{task.status}</Badge>
            </div>

            <div className="flex gap-4 mt-3 text-sm">
              <div className="flex gap-1">
                <Package size={14} />
                {task.assets.length}
              </div>

              <div className="flex gap-1">
                <CheckCircle size={14} />
                {
                  task.assets.filter((a: any) => a.returnStatus === "returned")
                    .length
                }
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
