'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js router
import { Scanner } from '@yudiel/react-qr-scanner';

export default function AssetScannerSystem() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Бараа шалгах</h1>
      <button onClick={() => setIsScanning(!isScanning)}>
        {isScanning ? 'Зогсоох' : 'QR унших'}
      </button>

      {isScanning && (
        <Scanner
          onScan={(result: any) => {
            if (result) {
              const rawText = Array.isArray(result)
                ? result[0].rawValue
                : result.rawValue || result.text || result;
              // Эндээс сериал дугаараа гаргаж авна
              const serial = rawText.includes('fbpkdmfbk')
                ? 'fbpkdmfbk'
                : rawText;

              // Шилжилт хийх: /assets/fbpkdmfbk
              router.push(`/assets/${serial}`);
            }
          }}
          constraints={{ facingMode: 'environment' }}
        />
      )}
    </div>
  );
}
