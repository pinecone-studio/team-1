"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

const requests = [
  {
    id: 1,
    name: "MacBook Pro",
    assetId: "MAC-2026-001",
    oldUser: "Батaa",
    newUser: "Админ хэрэглэгч",
    type: "Хөрөнгө буцаах",
  },
  {
    id: 2,
    name: "Монитор",
    assetId: "MON-2025-045",
    oldUser: "Батaa",
    newUser: "Зулаа",
    type: "Хөрөнгө шилжүүлэх",
  },
]

export function AssetRequestsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Хөрөнгийн хүсэлтүүд</CardTitle>
        <Button variant="ghost">Бүгдийг үзэх →</Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground border-b">
              <tr>
                <th className="p-2">№</th>
                <th className="p-2">Хөрөнгийн нэр</th>
                <th className="p-2">Хөрөнгийн ID</th>
                <th className="p-2">Өмнөх хэрэглэгч</th>
                <th className="p-2">Шинэ хэрэглэгч</th>
                <th className="p-2">Шилжүүлгийн төрөл</th>
                <th className="p-2 text-center">Төлөв</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req, index) => (
                <tr key={req.id} className="border-b hover:bg-muted/50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 font-medium">{req.name}</td>
                  <td className="p-2">{req.assetId}</td>
                  <td className="p-2">{req.oldUser}</td>
                  <td className="p-2">{req.newUser}</td>
                  <td className="p-2">{req.type}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <Button size="icon" variant="outline" className="rounded-full">
                      <Check className="w-4 h-4 text-green-600 rounded-full" />
                    </Button>
                    <Button size="icon" variant="outline" className="rounded-full">
                      <X className="w-4 h-4 text-red-600 rounded-full" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
