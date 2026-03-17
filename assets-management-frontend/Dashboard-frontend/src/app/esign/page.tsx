"use client";

import { useState } from "react";
import SignaturePad from "./_components/SignaturePad";
import DocumentPreview from "./_components/DocumentPreview";

export default function ESignPage() {
  const [signatureData, setSignatureData] = useState<string | null>(null);

  const handleSaveSignature = (dataUrl: string) => {
    setSignatureData(dataUrl);
  };

  const handleClearSignature = () => {
    setSignatureData(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            E-Signature Portal
          </h1>
          <p className="text-gray-500 mt-2">
            Sign the pad below to apply your signature to the document.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          {/* Left Column: Actions */}
          <div className="w-full lg:w-auto flex flex-col gap-6 items-center lg:items-start">
            <SignaturePad
              onSave={handleSaveSignature}
              onClear={handleClearSignature}
            />
          </div>

          {/* Right Column: Document Preview */}
          <div className="w-full lg:w-auto flex justify-center">
            <DocumentPreview signatureData={signatureData} />
          </div>
        </div>
      </div>
    </main>
  );
}
