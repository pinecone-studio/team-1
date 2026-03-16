"use client";

import { useState } from "react";

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

import { Upload, AlertTriangle } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InspectionDialog({ open, onClose }: Props) {
  const [condition, setCondition] = useState("Good");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asset Return Inspection</DialogTitle>

          <DialogDescription>
            Inspect the returned asset and record its condition
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Condition select */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Asset Condition</label>

            <Select value={condition} onValueChange={(v) => setCondition(v)}>
              <SelectTrigger className="bg-secondary border-0">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Good">Good - Fully functional</SelectItem>

                <SelectItem value="Fair">Fair - Minor wear</SelectItem>

                <SelectItem value="Damaged">Damaged - Needs repair</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Photo upload */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Inspection Photo</label>

            <div className="border-2 border-dashed rounded-lg p-6">
              <div className="flex flex-col items-center text-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />

                <p className="text-sm text-muted-foreground mb-2">
                  Upload a photo of the returned asset
                </p>

                <Button variant="outline" size="sm">
                  Upload Photo
                </Button>
              </div>
            </div>
          </div>

          {/* Damage warning */}

          {condition === "Damaged" && (
            <div className="p-4 rounded-lg bg-yellow-100 border flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />

              <div>
                <p className="font-medium">Damage Detected</p>

                <p className="text-sm text-muted-foreground">
                  This asset will be flagged for repair or disposal.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={onClose}>Complete Inspection</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
