"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type DemoEmployeePendingTransferCardProps = {
  toName: string;
  assetTag: string;
  onDismiss: () => void;
};

export function DemoEmployeePendingTransferCard({
  toName,
  assetTag,
  onDismiss,
}: DemoEmployeePendingTransferCardProps) {
  return (
    <Card className="mt-6 border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-blue-800">
            Хүлээгдэж буй шилжүүлэлт
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 h-8"
            onClick={onDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-blue-700">
          <span className="font-medium">{assetTag}</span> хөрөнгийг{" "}
          <span className="font-medium">{toName}</span> руу шилжүүлэх хүсэлт
          илгээгдсэн. Тэр хүн &quot;Шинэ хүсэлт&quot; дээрээ хүлээн авах хүртэл
          хүлээгдэнэ.
        </p>
      </CardHeader>
    </Card>
  );
}
