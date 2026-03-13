import React, { useState } from "react";

const mockAssignments = [
  {
    id: "LAP-2024-001",
    employee: "Sarah Johnson",
    sentDate: "1/16/2024",
    status: "Гарын үсэг зурсан",
    statusType: "success",
    confirmedDate: "1/16/2024",
  },
  {
    id: "LAP-2024-002",
    employee: "Michael Chen",
    sentDate: "1/21/2024",
    status: "Гарын үсэг зурсан",
    statusType: "success",
    confirmedDate: "1/21/2024",
  },
  {
    id: "MON-2024-003",
    employee: "Sarah Johnson",
    sentDate: "2/2/2024",
    status: "Гарын үсэг хүлээгдэж буй",
    statusType: "pending",
    confirmedDate: "-",
  },
  {
    id: "KEY-2024-006",
    employee: "Emily Davis",
    sentDate: "3/2/2024",
    status: "Гарын үсэг зурсан",
    statusType: "success",
    confirmedDate: "3/2/2024",
  },
  {
    id: "TAB-2024-009",
    employee: "Lisa Anderson",
    sentDate: "1/26/2024",
    status: "Гарын үсэг зурсан",
    statusType: "success",
    confirmedDate: "1/26/2024",
  },
];

const statusBadge = (status: string, type: string) => {
  if (type === "success")
    return (
      <span className="bg-green-100 text-green-700 rounded px-2 py-1 text-xs font-medium">
        {status}
      </span>
    );
  if (type === "pending")
    return (
      <span className="bg-yellow-100 text-yellow-700 rounded px-2 py-1 text-xs font-medium">
        {status}
      </span>
    );
  return <span>{status}</span>;
};

export default function AssetAssignmentSection() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? mockAssignments
      : filter === "pending"
        ? mockAssignments.filter((a) => a.statusType === "pending")
        : mockAssignments.filter((a) => a.statusType === "success");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Хөрөнгө хуваарилалт</h2>
        <button className="bg-black text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
          + Шинэ хуваарилалт
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-1 rounded-full text-sm font-medium border ${
            filter === "all"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-gray-300"
          }`}
          onClick={() => setFilter("all")}
        >
          Бүх хуваарилалт
        </button>
        <button
          className={`px-4 py-1 rounded-full text-sm font-medium border ${
            filter === "pending"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-gray-300"
          }`}
          onClick={() => setFilter("pending")}
        >
          Хүлээгдэж буй
        </button>
        <button
          className={`px-4 py-1 rounded-full text-sm font-medium border ${
            filter === "success"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-gray-300"
          }`}
          onClick={() => setFilter("success")}
        >
          Баталгаажсан
        </button>
      </div>
      <div className="bg-white rounded-xl p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2">Хөрөнгийн ID</th>
              <th>Ажилтан</th>
              <th>Илгээсэн огноо</th>
              <th>Төлөв</th>
              <th>Баталгаажсан огноо</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-t last:border-b-0">
                <td className="py-2">{a.id}</td>
                <td>{a.employee}</td>
                <td>{a.sentDate}</td>
                <td>{statusBadge(a.status, a.statusType)}</td>
                <td>{a.confirmedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
