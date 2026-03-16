"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  UpdateAssetDocument,
  EmployeesDocument,
  AssignAssetDocument,
} from "@/gql/graphql";
import { User, MapPin, X } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LocationPicker } from "./location-picker";

export type SelectedAsset = { id: string; assetTag: string };

type TabMode = "owner" | "location";

interface AssetTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAssets: SelectedAsset[];
  onRemoveAsset?: (id: string) => void;
  onSuccess?: () => void;
}

function buildLocationPath(
  loc: { id: string; name: string; parentId?: string | null },
  byId: Map<string, { id: string; name: string; parentId?: string | null }>,
): string {
  const parts: string[] = [loc.name];
  let pid = loc.parentId;
  while (pid) {
    const p = byId.get(pid);
    if (!p) break;
    parts.unshift(p.name);
    pid = p.parentId;
  }
  return parts.join(" / ");
}

export function AssetTransferDialog({
  open,
  onOpenChange,
  selectedAssets,
  onRemoveAsset,
  onSuccess,
}: AssetTransferDialogProps) {
  const [tab, setTab] = useState<TabMode>("location");
  const [locationFullPath, setLocationFullPath] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const { data: employeesData } = useQuery(EmployeesDocument);
  const [updateAssetMutation] = useMutation(UpdateAssetDocument);
  const [assignAssetMutation] = useMutation(AssignAssetDocument);

  const employees = useMemo(() => {
    const list = (employeesData?.employees ?? []) as Array<{
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
    }>;
    return list.map((e) => ({
      id: e.id,
      name: [e.firstName, e.lastName].filter(Boolean).join(" ") || e.email || e.id,
    }));
  }, [employeesData?.employees]);

  const handleTransferToLocation = async () => {
    if (!locationFullPath || selectedAssets.length === 0) {
      toast.error("Байршил болон хөрөнгийг сонгоно уу.");
      return;
    }
    setSubmitting(true);
    const toastId = toast.loading("Байршил руу шилжүүлж байна...");
    try {
      for (const asset of selectedAssets) {
        await updateAssetMutation({
          variables: {
            id: asset.id,
            input: { locationId: locationFullPath },
          },
        });
      }
      toast.success(`${selectedAssets.length} хөрөнгө амжилттай шилжүүлэгдлээ.`, {
        id: toastId,
      });
      setLocationFullPath("");
      onSuccess?.();
      onOpenChange(false);
    } catch (e) {
      toast.error("Шилжүүлэхэд алдаа гарлаа.", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTransferToOwner = async () => {
    if (!employeeId || selectedAssets.length === 0) {
      toast.error("Эзэмшигч болон хөрөнгийг сонгоно уу.");
      return;
    }
    setSubmitting(true);
    const toastId = toast.loading("Эзэмшигч рүү шилжүүлж байна...");
    try {
      for (const asset of selectedAssets) {
        await assignAssetMutation({
          variables: {
            assetId: asset.id,
            employeeId,
          },
        });
      }
      toast.success(`${selectedAssets.length} хөрөнгө амжилттай хуваарилагдлаа.`, {
        id: toastId,
      });
      setEmployeeId("");
      onSuccess?.();
      onOpenChange(false);
    } catch (e) {
      toast.error("Хуваарилах үед алдаа гарлаа.", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (tab === "location") handleTransferToLocation();
    else handleTransferToOwner();
  };

  const canSubmit =
    selectedAssets.length > 0 &&
    (tab === "location" ? !!locationFullPath : !!employeeId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" showCloseButton>
        <DialogHeader>
          <DialogTitle className="sr-only">Хөрөнгө шилжүүлэх</DialogTitle>
          <div className="flex items-center gap-6 border-b pb-3">
            <button
              type="button"
              onClick={() => setTab("owner")}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                tab === "owner"
                  ? "text-foreground border-b-2 border-primary pb-0.5"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <User className="h-4 w-4" />
              Эзэмшигчрүү шилжүүлэх
            </button>
            <button
              type="button"
              onClick={() => setTab("location")}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                tab === "location"
                  ? "text-foreground border-b-2 border-primary pb-0.5"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <MapPin className="h-4 w-4" />
              Байршилруу шилжүүлэх
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium text-foreground">
              Сонгогдсон хөрөнгө
            </label>
            <div className="mt-2 flex flex-wrap gap-2 rounded-md border border-input bg-muted/30 p-2 min-h-[52px]">
              {selectedAssets.length === 0 ? (
                <span className="text-sm text-muted-foreground py-1">
                  Хөрөнгө сонгоогүй байна. Хүснэгтээс сонгоно уу.
                </span>
              ) : (
                selectedAssets.map((asset) => (
                  <span
                    key={asset.id}
                    className="inline-flex items-center gap-1 rounded-md bg-background px-2 py-1 text-sm border border-border"
                  >
                    {asset.assetTag}
                    {onRemoveAsset && (
                      <button
                        type="button"
                        onClick={() => onRemoveAsset(asset.id)}
                        className="rounded p-0.5 hover:bg-muted"
                        aria-label={`${asset.assetTag}-г хасах`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </span>
                ))
              )}
            </div>
          </div>

          {tab === "location" && (
            <LocationPicker
              value={locationFullPath}
              onChange={(path) => setLocationFullPath(path ?? "")}
              label="Байршил сонгох"
            />
          )}

          {tab === "owner" && (
            <div>
              <label className="text-sm font-medium text-foreground">
                Эзэмшигч сонгох
              </label>
              <Select
                value={employeeId || undefined}
                onValueChange={setEmployeeId}
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Сонгоно уу" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter className="border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Цуцлах
          </Button>
          <Button
            type="button"
            disabled={!canSubmit || submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Түр хүлээнэ үү..." : "Шилжүүлэх"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
