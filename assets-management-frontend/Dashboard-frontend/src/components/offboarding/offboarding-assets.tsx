import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OffboardingAssets({ assets, onInspect }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets to Return</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {assets.map((asset: any) => (
          <div key={asset.assetId} className="flex justify-between">
            <div>
              <p className="font-medium">{asset.assetName}</p>

              <p className="text-sm text-muted-foreground">{asset.assetId}</p>
            </div>

            {asset.returnStatus === "pending" && (
              <Button size="sm" onClick={onInspect}>
                Mark Returned
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
