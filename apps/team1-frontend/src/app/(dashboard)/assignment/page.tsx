import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { assets } from "@/lib/mock-data"

const assignedAssets = assets.filter((asset) => asset.status === "ASSIGNED")

export default function AssignmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Эд хөрөнгө хуваарилалт</h1>
          <p className="text-muted-foreground">Эд хөрөнгийг ажилтанд оноож, эзэмшлийг хянах.</p>
        </div>
        <Button>Шинэ хуваарилалт</Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Хуваарилсан эд хөрөнгө</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {assignedAssets.length === 0 && (
            <p className="text-sm text-muted-foreground">Хуваарилсан эд хөрөнгө олдсонгүй.</p>
          )}
          {assignedAssets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 p-4"
            >
              <div>
                <p className="font-medium text-foreground">{asset.assetId}</p>
                <p className="text-sm text-muted-foreground">{asset.serialNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{asset.assignedEmployeeName ?? "Хариуцагчгүй"}</p>
                <Badge variant="outline" className="mt-1">
                  {asset.departmentName ?? "Тодорхойгүй"}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
