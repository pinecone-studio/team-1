"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SignaturePad from "@/app/esign/_components/SignaturePad";
import DocumentPreview from "@/app/esign/_components/DocumentPreview";
import type { AssignmentItem } from "./demo-employee-utils";

type EmployeeOption = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
};

export type DemoEmployeeSignModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  signAssignment: AssignmentItem | null;
  setSignAssignment: (a: AssignmentItem | null) => void;
  signatureData: string | null;
  setSignatureData: (v: string | null) => void;
  signatureFileUrl: string | null;
  setSignatureFileUrl: (v: string | null) => void;
  showSignaturePad: boolean;
  setShowSignaturePad: (v: boolean) => void;
  savedSignatureUrl: string | null;
  loadSignatureFromUrl: (url: string) => Promise<void>;
  handleSaveSignature: (dataUrl: string) => void;
  handleClearSignature: () => void;
  signatureUploading: boolean;
  signatureProfileSaving: boolean;
  saveSignatureToProfile: () => void;
  handleVerify: () => void;
  employeesData: { employees?: EmployeeOption[] } | undefined;
  currentEmployeeId: string | null;
  DEMO_EMPLOYEE_EMAIL: string;
  normalizeAssetTag: (value?: string | null) => string;
  PDF_FONT_NAME?: string;
};

export function DemoEmployeeSignModal({
  open,
  onOpenChange,
  signAssignment,
  setSignAssignment,
  signatureData,
  setSignatureData,
  signatureFileUrl,
  setSignatureFileUrl,
  showSignaturePad,
  setShowSignaturePad,
  savedSignatureUrl,
  loadSignatureFromUrl,
  handleSaveSignature,
  handleClearSignature,
  signatureUploading,
  signatureProfileSaving,
  saveSignatureToProfile,
  handleVerify,
  employeesData,
  currentEmployeeId,
  DEMO_EMPLOYEE_EMAIL,
  normalizeAssetTag,
}: DemoEmployeeSignModalProps) {
  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setSignAssignment(null);
      setSignatureData(null);
      setSignatureFileUrl(null);
    }
  };

  const employeeName = employeesData?.employees?.find(
    (e) => e.id === currentEmployeeId,
  )?.firstName
    ? `${employeesData?.employees?.find((e) => e.id === currentEmployeeId)?.firstName ?? ""} ${employeesData?.employees?.find((e) => e.id === currentEmployeeId)?.lastName ?? ""}`.trim()
    : DEMO_EMPLOYEE_EMAIL;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Хөрөнгийн нөхцөл шалгах ба гарын үсэг зурах
          </DialogTitle>
          <DialogDescription>
            {normalizeAssetTag(signAssignment?.asset?.assetTag) ??
              "Сонгосон хөрөнгө"}{" "}
            — мэдээллээ шалгаад гарын үсгээ зурна уу.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] ">
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="bg-white">
              <DocumentPreview
                signatureData={signatureData}
                title="Хөрөнгийн ашиглалтын гэрээ"
                bodyText="Доор гарын үсэг зурж баталгаажуулснаар та энэхүү хөрөнгийг хүлээн авч, гэрээнд заасан нөхцөлийг зөвшөөрч байгаагаа илэрхийлнэ. Цахим гарын үсэг нь гарын үсэгтэй адил хүчинтэй."
                waitingLabel="Гарын үсэг хүлээгдэж байна..."
                signedByLabel="Баталгаажуулан гарын үсэг зурсан"
                dateLabel="Огноо"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <section className="rounded-xl border border-muted bg-muted/30 p-4">
              <h4 className="text-base font-semibold mb-3">
                Хөрөнгийн дэлгэрэнгүй мэдээлэл
              </h4>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Хариуцагч</dt>
                  <dd className="font-medium">{employeeName}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Хэнээс</dt>
                  <dd className="font-medium">
                    {signAssignment?.requestedBy
                      ? [
                          signAssignment.requestedBy.firstName,
                          signAssignment.requestedBy.lastName,
                        ]
                          .filter(Boolean)
                          .join(" ") || "Admin"
                      : "Admin"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Юу</dt>
                  <dd className="font-medium">
                    {normalizeAssetTag(
                      signAssignment?.asset?.assetTag ??
                        signAssignment?.assetId,
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Сериал</dt>
                  <dd className="font-medium">
                    {signAssignment?.asset?.serialNumber ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Ангилал</dt>
                  <dd className="font-medium">
                    {signAssignment?.asset?.category ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Олгосон огноо</dt>
                  <dd className="font-medium">
                    {signAssignment?.assignedAt
                      ? new Date(
                          signAssignment.assignedAt,
                        ).toLocaleDateString("mn-MN")
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Гэрээний төрөл</dt>
                  <dd className="font-medium">Ашиглалтын гэрээ</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Гэрээ №</dt>
                  <dd className="font-medium">
                    {signAssignment?.id
                      ? `CN-${signAssignment.id.slice(0, 6)}`
                      : "—"}
                  </dd>
                </div>
              </dl>
            </section>

            <div className="space-y-4 min-h-[420px] flex flex-col">
              {savedSignatureUrl && !showSignaturePad && (
                <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-900">
                  <p className="font-medium mb-3">
                    Өмнө хадгалсан гарын үсэг байна. Ашиглах уу?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12"
                      onClick={async () => {
                        await loadSignatureFromUrl(savedSignatureUrl);
                        setShowSignaturePad(false);
                      }}
                    >
                      Өмнөх гарын үсэг ашиглах
                    </Button>
                    <Button
                      type="button"
                      className="h-12 bg-gray-900 hover:bg-gray-800 text-white"
                      onClick={() => {
                        setSignatureData(null);
                        setShowSignaturePad(true);
                      }}
                    >
                      Шинээр зурж эхлэх
                    </Button>
                  </div>
                </div>
              )}

              {showSignaturePad && (
                <div className="flex-1 flex flex-col">
                  <SignaturePad
                    onSave={handleSaveSignature}
                    onClear={handleClearSignature}
                    title="Гарын үсэг зурах"
                    clearLabel="Арилгах"
                    saveLabel={
                      signatureUploading
                        ? "PDF хадгалж байна..."
                        : "Гарын үсэг хадгалах"
                    }
                  />
                </div>
              )}

              {showSignaturePad && signatureData && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
                  <p className="font-medium mb-2">
                    Энэ гарын үсгийг өөр дээрээ хадгалах уу?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={saveSignatureToProfile}
                      disabled={signatureProfileSaving}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Тийм, хадгалъя
                    </Button>
                    <Button type="button" variant="ghost" size="sm">
                      Үгүй
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {signatureFileUrl && (
              <p className="text-xs text-emerald-700">
                Гэрээ PDF хадгалагдсан: {signatureFileUrl}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Болих
          </Button>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={handleVerify}
            disabled={!signatureData || signatureUploading}
          >
            Шалгасан
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
