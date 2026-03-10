'use client';
import { useState } from 'react';
import { usePDF } from 'react-to-pdf';

export default function ContractPreview() {
  const { toPDF, targetRef } = usePDF({ filename: 'Geree.pdf' });
  const [data, setData] = useState({ name: 'Хэрэглэгч', role: 'Албан тушаал' });

  return (
    <div className="max-w-xl mx-auto p-8">
      {/* 1. Загвараа харах хэсэг (Preview) */}
      <div
        ref={targetRef}
        className="p-10 bg-white border shadow-md min-h-[400px]"
      >
        <h1 className="text-xl font-bold text-center">ХӨДӨЛМӨРИЙН ГЭРЭЭ</h1>
        <p className="mt-10">
          Ажилтны нэр: <strong>{data.name}</strong>
        </p>
        <p>
          Албан тушаал: <strong>{data.role}</strong>
        </p>
        <div className="mt-20 text-right">Гарын үсэг: ___________</div>
      </div>

      {/* 2. PDF татах товч */}
      <button
        onClick={() => toPDF()}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
      >
        PDF болгож татах
      </button>
    </div>
  );
}
