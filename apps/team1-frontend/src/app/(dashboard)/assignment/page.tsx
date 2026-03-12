"use client"

import { useState } from "react"
import { assets } from "@/lib/mock-data"
import { NewAssignmentModal } from "./components/new-assignment-modal"

export default function AssignmentPage() {
  const [tab, setTab] = useState<"all" | "pending" | "confirmed">("all")

  const filteredAssets = assets.filter((asset) => {
    if (tab === "all") return asset.status === "ASSIGNED"
    if (tab === "confirmed") return asset.status === "ASSIGNED"
    if (tab === "pending") return false
    return true
  })

  return (
    <div className="space-y-6 p-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Хөрөнгө хуваарилалт</h1>
        <NewAssignmentModal />
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-gray-200 rounded-full p-1">
        {["all", "pending", "confirmed"].map((value) => (
          <button
            key={value}
            className={`rounded-full px-4 py-1 font-medium ${
              tab === value ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setTab(value as "all" | "pending" | "confirmed")}
          >
            {value === "all"
              ? "Бүх хуваарилалт"
              : value === "pending"
              ? "Хүлээгдэж буй"
              : "Баталгаажсан"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border rounded-lg shadow">
        {/* Header */}
        <div className="border-b p-4">
          <h2 className="text-lg font-bold">Хөрөнгийн хуваарилалтын жагсаалт</h2>
        </div>

        {/* Table content */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-500">
              <tr className="text-left">
                <th className="py-3">Хөрөнгийн ID</th>
                <th className="py-3">Ажилтан</th>
                <th className="py-3">Илгээсэн огноо</th>
                <th className="py-3">Төлөв</th>
                <th className="py-3">Баталгаажсан огноо</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => {
                const isSigned = asset.status === "ASSIGNED"

                return (
                  <tr key={asset.id} className="border-b hover:bg-gray-100">
                    <td className="py-4 font-medium">{asset.assetId}</td>
                    <td>{asset.assignedEmployeeName ?? "Хариуцагчгүй"}</td>
                    <td>{asset.purchaseDate ?? "-"}</td>
                    <td>
                      {isSigned ? (
                        <span className="px-2 py-1 rounded bg-green-100 text-green-700">
                          Гарын үсэг зурсан
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                          Гарын үсэг хүлээгдэж буй
                        </span>
                      )}
                    </td>
                    <td>{isSigned ? asset.purchaseDate : "-"}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
