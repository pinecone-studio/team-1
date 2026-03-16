"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface Asset {
  id: string;
}

interface Employee {
  id: string;
  name: string;
}

interface TransferRequestCardProps {
  selectedAssets: Asset[];
  selectedEmployeeId: string | null;
  reason: string;
  employees: Employee[];
  onEmployeeChange: (employeeId: string | null) => void;
  onReasonChange: (reason: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function TransferRequestCard({
  selectedAssets,
  selectedEmployeeId,
  reason,
  employees,
  onEmployeeChange,
  onReasonChange,
  onSubmit,
  isLoading,
}: TransferRequestCardProps) {
  const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId);
  const isSubmitDisabled =
    !selectedAssets.length || !selectedEmployee || isLoading;

  return (
    <Card className="h-full rounded-2xl border-border bg-card p-5 lg:min-h-[620px]">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
          3
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Хүсэлт илгээнэ үү
          </p>
          <p className="text-xs text-muted-foreground">
            Шилжүүлгийн мэдээллийг шалгана уу
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4 text-sm">
        {/* Selected Assets */}
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <p className="text-xs text-muted-foreground">Хөрөнгө</p>
          {selectedAssets.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedAssets.map((asset) => (
                <span
                  key={asset.id}
                  className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-foreground"
                >
                  {asset.id}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">
              Сонгогдсон хөрөнгө алга
            </p>
          )}
        </div>

        {/* Employee Selection */}
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <p className="text-xs text-muted-foreground">Шинэ эзэмшигч</p>
          <div className="mt-2">
            <Select
              value={selectedEmployeeId ?? ""}
              onValueChange={(value) => onEmployeeChange(value || null)}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Сонгох" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            Ажилчдыг өгөгдлийн сангаас ачаалж, шилжүүлэхэд assignment үүсгэнэ.
          </p>
        </div>

        {/* Reason */}
        <div>
          <p className="text-xs font-medium text-muted-foreground">Шалтгаан</p>
          <Input
            className="mt-2"
            placeholder="Шалтгаан бичнэ үү"
            value={reason}
            onChange={(event) => onReasonChange(event.target.value)}
          />
        </div>
      </div>

      <Button
        className="mt-6 w-full"
        onClick={onSubmit}
        disabled={isSubmitDisabled}
      >
        Хүсэлт илгээх
      </Button>
    </Card>
  );
}
