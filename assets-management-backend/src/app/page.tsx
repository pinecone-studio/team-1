"use client";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelToOdoo() {
  const [file, setFile] = useState<File | null>(null);
  const [allData, setAllData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(allData.length / ITEMS_PER_PAGE);
  const currentItems = allData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const readExcel = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const data = new Uint8Array(evt.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          resolve(jsonData);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    try {
      const data = await readExcel(selectedFile);
      setAllData(data);
      setCurrentPage(1);
      setMessage(`Нийт ${data.length} мөр уншсан.`);
    } catch {
      setMessage("❌ Excel уншихад алдаа гарлаа.");
    }
  };

  const handleUpload = async () => {
    if (allData.length === 0) return;
    setLoading(true);
    const BATCH_SIZE = 50;
    let successCount = 0;

    try {
      for (let i = 0; i < allData.length; i += BATCH_SIZE) {
        const batch = allData.slice(i, i + BATCH_SIZE);
        const res = await fetch("/api/import-assets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(batch),
        });
        if (!res.ok) throw new Error("Серверийн алдаа");
        successCount += batch.length;
        setMessage(`⏳ Илгээж байна: ${successCount} / ${allData.length}`);
      }
      setMessage(`✅ Амжилттай: ${successCount} мөр хадгалагдлаа!`);
      setAllData([]);
    } catch (err: any) {
      setMessage(`❌ Алдаа: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-2xl space-y-6">
      <h2 className="text-2xl font-bold text-purple-800">
        📊 Excel to Odoo Import
      </h2>

      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="border p-2 w-full"
      />

      {message && (
        <div className="p-3 bg-blue-50 text-blue-800 rounded">{message}</div>
      )}

      {allData.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(allData[0]).map((key) => (
                    <th key={key} className="border p-2 text-left">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row, i) => (
                  <tr key={i} className="border-b">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="p-2">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-4 items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Өмнөх
            </button>
            <span>
              Хуудас {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Дараах
            </button>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white rounded"
          >
            {loading ? "Түр хүлээнэ үү..." : "Бүгдийг сервер рүү илгээх"}
          </button>
        </>
      )}
    </div>
  );
}
