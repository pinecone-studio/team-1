import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function OffboardingOverview({ task }: any) {
  const returned = task.assets.filter(
    (a: any) => a.returnStatus === "returned",
  ).length;
  const total = task.assets.length;
  const progress = Math.round((returned / total) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.employeeName}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          Termination: {task.terminationDate}
        </p>

        <div className="mt-4">
          <Progress value={progress} />

          <p className="text-sm mt-2">
            {returned}/{total} returned
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
