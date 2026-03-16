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
          <DialogTitle>Хөрөнгийн буцаалтын шалгалт</DialogTitle>

          <DialogDescription>
            Буцаагдсан хөрөнгийг шалгаж, түүний нөхцөл байдлыг тэмдэглэнэ үү
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Condition select */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Хөрөнгийн нөхцөл байдал
            </label>

            <Select value={condition} onValueChange={(v) => setCondition(v)}>
              <SelectTrigger className="bg-secondary border-0">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Good">Сайн - Бүрэн ажиллагаатай</SelectItem>

                <SelectItem value="Fair">
                  Дунд - Бага зэргийн элэгдэл
                </SelectItem>

                <SelectItem value="Damaged">
                  Гэмтсэн - Засвар шаардлагатай
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Photo upload */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Шалгалтын зураг</label>

            <div className="border-2 border-dashed rounded-lg p-6">
              <div className="flex flex-col items-center text-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />

                <p className="text-sm text-muted-foreground mb-2">
                  Буцаасан хөрөнгийн зургийг байршуулна уу
                </p>

                <Button variant="outline" size="sm">
                  Зураг байршуулах
                </Button>
              </div>
            </div>
          </div>

          {/* Damage warning */}

          {condition === "Damaged" && (
            <div className="p-4 rounded-lg bg-yellow-100 border flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />

              <div>
                <p className="font-medium">Илэрсэн хохирол</p>

                <p className="text-sm text-muted-foreground">
                  Энэ хөрөнгийг засварлах эсвэл устгахаар тэмдэглэнэ.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Цуцлах
          </Button>

          <Button onClick={onClose}>Дууссан</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
