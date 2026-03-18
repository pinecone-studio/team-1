import type { Asset } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AssignAssetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assets: Asset[];
  selectedIds: Set<string>;
  employeeNameById: Map<string, string>;
  assignEmployeeId: string;
  onAssignEmployeeIdChange: (value: string) => void;
  submitting: boolean;
  onSubmit: () => Promise<void>;
};

export function AssignAssetDialog({
  open,
  onOpenChange,
  assets,
  selectedIds,
  employeeNameById,
  assignEmployeeId,
  onAssignEmployeeIdChange,
  submitting,
  onSubmit,
}: AssignAssetDialogProps) {
  const selectedAssetsList = assets.filter((a) => selectedIds.has(a.id));
  const primaryAsset = selectedAssetsList[0];
  const employeeName =
    assignEmployeeId && employeeNameById.get(assignEmployeeId || "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Хөрөнгө хуваарилах</DialogTitle>
          <DialogDescription>
            Сонгосон хөрөнгийг ажилтанд хуваарилах хүсэлт илгээнэ.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <p className="text-sm font-medium text-foreground">
              Сонгогдсон хөрөнгө
            </p>
            <div className="mt-2 flex flex-wrap gap-2 rounded-md border border-input bg-muted/30 p-2 min-h-13">
              {selectedAssetsList.length === 0 ? (
                <span className="text-sm text-muted-foreground py-1">
                  Хөрөнгө сонгоогүй байна. Хүснэгтээс сонгоно уу.
                </span>
              ) : (
                selectedAssetsList.map((asset) => (
                  <span
                    key={asset.id}
                    className="inline-flex items-center gap-1 rounded-md bg-background px-2 py-1 text-sm border border-border"
                  >
                    {asset.assetId}
                  </span>
                ))
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">
              Ажилтан сонгох
            </p>
            <Select
              value={assignEmployeeId || undefined}
              onValueChange={onAssignEmployeeIdChange}
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(employeeNameById.entries()).map(([id, name]) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {primaryAsset && (
            <div className="rounded-lg border bg-muted/40 p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Олголтын урьдчилсан мэдээлэл
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                <span className="text-muted-foreground">Ажилтан</span>
                <span className="font-medium">{employeeName || "—"}</span>
                <span className="text-muted-foreground">Хөрөнгө</span>
                <span className="font-medium">{primaryAsset.assetId}</span>
                <span className="text-muted-foreground">Сериал дугаар</span>
                <span className="font-medium">{primaryAsset.serialNumber}</span>
                <span className="text-muted-foreground">Үнэ</span>
                <span className="font-medium">
                  {(
                    primaryAsset.currentBookValue ||
                    primaryAsset.purchaseCost ||
                    0
                  ).toLocaleString()}
                  ₮
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Цуцлах
          </Button>
          <Button
            type="button"
            disabled={
              submitting ||
              !assignEmployeeId ||
              Array.from(selectedIds).length === 0
            }
            onClick={onSubmit}
          >
            Хүсэлт илгээх
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
