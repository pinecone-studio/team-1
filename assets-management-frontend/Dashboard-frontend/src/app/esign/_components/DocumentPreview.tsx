"use client";

import React from "react";

interface DocumentPreviewProps {
  signatureData: string | null;
  title?: string;
  bodyText?: string;
  waitingLabel?: string;
  signedByLabel?: string;
  dateLabel?: string;
}

export default function DocumentPreview({
  signatureData,
  title = "Service Agreement",
  bodyText = "By applying your signature below, the receiving party agrees to the terms and conditions outlined in this contract. This digital signature carries the same legal weight as a physical, handwritten signature under applicable laws.",
  waitingLabel = "Waiting for signature...",
  signedByLabel = "Agreed and Signed By",
  dateLabel = "Date",
}: DocumentPreviewProps) {
  const todayDate = new Date().toLocaleDateString();

  return (
    <div className="w-full max-w-lg bg-white p-8 md:p-12 h-full rounded-sm shadow-xl border border-gray-200 min-h-140 flex flex-col">
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900 text-center uppercase tracking-wide">
          {title}
        </h1>
      </div>

      <p className="text-gray-700 leading-relaxed mb-8 font-serif text-justify">
        {bodyText}
      </p>

      {/* Spacer to push signature to bottom */}
      <div className="flex-grow"></div>

      {/* Signature Section */}
      <div className="mt-12 w-64">
        <div className="relative border-b-2 border-gray-800 h-20 flex items-end justify-center">
          {signatureData ? (
            <img
              src={signatureData}
              alt="Digital Signature"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 max-h-[120px] w-auto z-10 drop-shadow-sm pointer-events-none"
            />
          ) : (
            <span className="text-gray-400 italic mb-2 select-none">
              {waitingLabel}
            </span>
          )}
        </div>
        <p className="font-bold text-gray-900 mt-2 text-sm uppercase">
          {signedByLabel}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          {dateLabel}: {todayDate}
        </p>
      </div>
    </div>
  );
}
