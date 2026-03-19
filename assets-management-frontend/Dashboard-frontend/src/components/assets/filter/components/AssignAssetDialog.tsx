"use client";

import type { Asset } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [popoverOpen, setPopoverOpen] = useState(false);

  const selectedAssetsList = assets.filter((a) => selectedIds.has(a.id));

  // Map-аас ажилтны нэрийг авах
  const employeeName = assignEmployeeId
    ? employeeNameById.get(assignEmployeeId)
    : "";

  // Жагсаалтыг массив болгох
  const employees = Array.from(employeeNameById.entries()).map(
    ([id, name]) => ({
      value: id,
      label: name,
    }),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,640px)] rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Хөрөнгө олгох
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <p className="text-sm font-medium text-foreground">
              Сонгогдсон хөрөнгө ({selectedAssetsList.length})
            </p>
            <div className="pt-2 flex flex-wrap gap-1">
              {selectedAssetsList.length === 0 ? (
                <span className="text-sm text-muted-foreground py-1">
                  Хөрөнгө сонгоогүй байна.
                </span>
              ) : (
                selectedAssetsList.map((asset) => (
                  <span
                    key={asset.id}
                    className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs border border-border font-medium"
                  >
                    {asset.assetId}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-foreground">
              Ажилтан сонгох
            </p>

            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={popoverOpen}
                  className="h-11 w-full justify-between overflow-hidden rounded-md border-gray-200 font-normal"
                >
                  <span className="truncate">
                    {assignEmployeeId
                      ? employeeNameById.get(assignEmployeeId)
                      : "Ажилтан хайх..."}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[--radix-popover-trigger-width] p-0"
                align="start"
              >
                <Command>
                  <CommandInput placeholder="Нэрээр хайх..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>Ажилтан олдсонгүй.</CommandEmpty>
                    <CommandGroup>
                      {employees.map((employee) => (
                        <CommandItem
                          key={employee.value}
                          value={employee.label}
                          onSelect={() => {
                            onAssignEmployeeIdChange(employee.value);
                            setPopoverOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              assignEmployeeId === employee.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {employee.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {selectedAssetsList.length > 0 && (
            <div className="rounded-lg border bg-muted/40 p-4 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Олголтын урьдчилсан мэдээлэл
              </p>
              <div className="rounded-md bg-white/70 px-3 py-2 text-sm">
                <span className="text-muted-foreground">Ажилтан: </span>
                <span className="font-medium">{employeeName || "—"}</span>
              </div>
              <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                {selectedAssetsList.map((asset) => (
                  <div
                    key={asset.id}
                    className="grid grid-cols-2 gap-x-6 gap-y-1 rounded-md bg-white px-3 py-3 text-sm"
                  >
                    <span className="text-muted-foreground">Хөрөнгө</span>
                    <span className="font-medium">{asset.assetId}</span>
                    <span className="text-muted-foreground">Сериал дугаар</span>
                    <span className="font-medium">
                      {asset.serialNumber || "—"}
                    </span>
                    <span className="text-muted-foreground">Үнэ</span>
                    <span className="font-medium">
                      {(
                        asset.currentBookValue ||
                        asset.purchaseCost ||
                        0
                      ).toLocaleString()}
                      ₮
                    </span>
                  </div>
                ))}
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
            disabled={submitting || !assignEmployeeId || selectedIds.size === 0}
            onClick={onSubmit}
            className="bg-sky-900 text-white hover:bg-sky-950"
          >
            {submitting ? "Илгээж байна..." : "Хүсэлт илгээх"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
