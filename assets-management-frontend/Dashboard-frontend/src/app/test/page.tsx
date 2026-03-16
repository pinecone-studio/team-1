"use client";

import { useState } from "react";

export default function TestSign() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sendEnvelope = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error sending envelope");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-2xl font-bold">DocuSign Test</h1>

      <button
        onClick={sendEnvelope}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        {loading ? "Sending..." : "Send Sign Request"}
      </button>

      {result && (
        <pre className="bg-gray-100 p-4 rounded w-[600px] overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
