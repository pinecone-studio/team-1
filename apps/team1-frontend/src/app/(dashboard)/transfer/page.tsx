"use client"

import { useState } from "react"

import {
  Search,
  ArrowRight,
  ArrowLeftRight,
  Mail,
  Check,
  Package,
  UserCheck,
  AlertTriangle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { assets, employees } from "@/lib/mock-data"

interface TransferRecord {
  id: string
  assetId: string
  assetName: string
  fromEmployee: string
  toEmployee: string
  transferDate: string
  status: "pending" | "acknowledged" | "completed"
  reason: string
}

const recentTransfers: TransferRecord[] = [
  {
    id: "tr-1",
    assetId: "MAC-2025-089",
    assetName: "MacBook Pro 14\"",
    fromEmployee: "Alice Cooper",
    toEmployee: "Bob Wilson",
    transferDate: "2024-03-10",
    status: "completed",
    reason: "Department reassignment"
  },
  {
    id: "tr-2",
    assetId: "MON-2025-045",
    assetName: "Dell 27\" Monitor",
    fromEmployee: "Charlie Davis",
    toEmployee: "Diana Evans",
    transferDate: "2024-03-08",
    status: "acknowledged",
    reason: "Equipment upgrade swap"
  },
  {
    id: "tr-3",
    assetId: "PHN-2025-012",
    assetName: "iPhone 15 Pro",
    fromEmployee: "Eva Foster",
    toEmployee: "Frank Garcia",
    transferDate: "2024-03-05",
    status: "pending",
    reason: "Role change"
  }
]

export default function TransferPage() {
  const [selectedAsset, setSelectedAsset] = useState("")
  const [selectedFromEmployee, setSelectedFromEmployee] = useState("")
  const [selectedToEmployee, setSelectedToEmployee] = useState("")
  const [searchAsset, setSearchAsset] = useState("")
  const [searchToEmployee, setSearchToEmployee] = useState("")
  const [transferШалтгаан, setTransferШалтгаан] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showАмжилттайDialog, setShowАмжилттайDialog] = useState(false)

  // Get assigned assets (for transfer)
  const assignedAssets = assets.filter((a) => a.status === "ASSIGNED" && a.assignedEmployeeId)
  const activeEmployees = employees.filter((e) => e.status === "active")

  const filteredAssets = assignedAssets.filter(
    (a) =>
      a.assetId.toLowerCase().includes(searchAsset.toLowerCase()) ||
      a.serialNumber.toLowerCase().includes(searchAsset.toLowerCase()) ||
      a.category.toLowerCase().includes(searchAsset.toLowerCase()) ||
      (a.assignedEmployeeName?.toLowerCase().includes(searchAsset.toLowerCase()))
  )

  const filteredToEmployees = activeEmployees.filter(
    (e) =>
      e.id !== selectedFromEmployee &&
      (e.name.toLowerCase().includes(searchToEmployee.toLowerCase()) ||
        e.email.toLowerCase().includes(searchToEmployee.toLowerCase()) ||
        e.department.toLowerCase().includes(searchToEmployee.toLowerCase()))
  )

  const selectedAssetData = assignedAssets.find((a) => a.id === selectedAsset)
  const selectedFromEmployeeData = activeEmployees.find((e) => e.id === selectedFromEmployee)
  const selectedToEmployeeData = activeEmployees.find((e) => e.id === selectedToEmployee)

  // When selecting an asset, auto-select the current owner
  const handleAssetSelect = (assetId: string) => {
    setSelectedAsset(assetId)
    const asset = assignedAssets.find((a) => a.id === assetId)
    if (asset?.assignedEmployeeId) {
      setSelectedFromEmployee(asset.assignedEmployeeId)
    }
  }

  const handleTransfer = () => {
    setShowConfirmDialog(false)
    setShowАмжилттайDialog(true)
  }

  const handleReset = () => {
    setSelectedAsset("")
    setSelectedFromEmployee("")
    setSelectedToEmployee("")
    setTransferШалтгаан("")
    setShowАмжилттайDialog(false)
  }

  const getStatusBadge = (status: TransferRecord["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/10 text-success border-success/20">Дууссан</Badge>
      case "acknowledged":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Хүлээн авсан</Badge>
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Хүлээгдэж буй</Badge>
    }
  }

  const employeeAssetsCount = (employeeId: string) => {
    return assets.filter((a) => a.assignedEmployeeId === employeeId && a.status === "ASSIGNED").length
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Эд хөрөнгө шилжүүлэх</h1>
        <p className="text-muted-foreground">
          Эд хөрөнгийг ажилтнуудын хооронд хоёр талын баталгаажуулалтаар шилжүүлэх
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Хүлээгдэж буй шилжүүлэг</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <ArrowLeftRight className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Энэ сар</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Check className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Шилжүүлэх боломжтой эд хөрөнгө</p>
                <p className="text-2xl font-bold text-foreground">{assignedAssets.length}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transfer workflow */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Step 1: Эд хөрөнгө сонгох */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </span>
              Эд хөрөнгө сонгох
            </CardTitle>
            <CardDescription>
              Шилжүүлэх хуваарилсан эд хөрөнгө сонгох
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Эд хөрөнгийн ID, серийн дугаар, эсвэл эзэмшигчээр хайх....."
                value={searchAsset}
                onChange={(e) => setSearchAsset(e.target.value)}
                className="pl-9 bg-secondary border-0"
              />
            </div>

            <div className="max-h-[280px] overflow-y-auto space-y-2">
              {filteredAssets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => handleAssetSelect(asset.id)}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    selectedAsset === asset.id
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-secondary/50 hover:bg-secondary border-2 border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{asset.assetId}</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {asset.serialNumber}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-secondary">
                      {asset.category}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>{asset.assignedEmployeeName}</span>
                  </div>
                </button>
              ))}
              {filteredAssets.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Хуваарилсан эд хөрөнгө олдсонгүй
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Хэнээс/Хэн рүү Employees */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                2
              </span>
              Хэнээс / Хэн рүү
            </CardTitle>
            <CardDescription>
              Одоогийн эзэмшигчийг баталгаажуулж, шинэ хүлээн авагчийг сонгох
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Хэнээс Employee (auto-selected from asset) */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Одоогийн эзэмшигч</Label>
              {selectedFromEmployeeData ? (
                <div className="p-4 rounded-lg bg-secondary/50 border-2 border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{selectedFromEmployeeData.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedFromEmployeeData.email}</p>
                    </div>
                    <Badge variant="outline" className="bg-secondary">
                      {selectedFromEmployeeData.department}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {employeeAssetsCount(selectedFromEmployeeData.id)} эд хөрөнгө
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-secondary/30 border-2 border-dashed border-border text-center">
                  <p className="text-sm text-muted-foreground">Эхлээд эд хөрөнгө сонго</p>
                </div>
              )}
            </div>

            {/* Arrow indicator */}
            <div className="flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </div>

            {/* Хэн рүү Employee */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Хүлээн авагч</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Ажилтан хайх....."
                  value={searchToEmployee}
                  onChange={(e) => setSearchToEmployee(e.target.value)}
                  className="pl-9 bg-secondary border-0"
                  disabled={!selectedFromEmployee}
                />
              </div>

              <div className="max-h-[180px] overflow-y-auto space-y-2">
                {selectedFromEmployee ? (
                  filteredToEmployees.map((employee) => (
                    <button
                      key={employee.id}
                      onClick={() => setSelectedToEmployee(employee.id)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        selectedToEmployee === employee.id
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-secondary/50 hover:bg-secondary border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground text-sm">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.department}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {employeeAssetsCount(employee.id)} assets
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4 text-sm">
                    Эхлээд одоогийн эзэмшигчийг сонго
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Confirm & Submit */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                3
              </span>
              Шилжүүлгийг баталгаажуулах
            </CardTitle>
            <CardDescription>
              Дэлгэрэнгүйг нягтлаад шилжүүлгийг эхлүүлэх
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedAssetData && selectedFromEmployeeData && selectedToEmployeeData ? (
              <>
                <div className="p-4 rounded-lg bg-secondary/50 space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Эд хөрөнгө</p>
                    <p className="font-medium text-foreground">{selectedAssetData.assetId}</p>
                    <p className="text-sm text-muted-foreground">{selectedAssetData.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Хэнээс</p>
                      <p className="font-medium text-foreground text-sm">{selectedFromEmployeeData.name}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Хэн рүү</p>
                      <p className="font-medium text-foreground text-sm">{selectedToEmployeeData.name}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-sm">Шилжүүлэх шалтгаан</Label>
                  <Textarea
                    id="reason"
                    placeholder="жиш: хэлтэс солих, албан тушаал өөрчлөх, тоног төхөөрөмж шинэчлэх....."
                    value={transferШалтгаан}
                    onChange={(e) => setTransferШалтгаан(e.target.value)}
                    className="bg-secondary border-0 resize-none"
                    rows={3}
                  />
                </div>

                <div className="p-3 rounded-lg bg-primary/10 flex items-start gap-2">
                  <Mail className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Both employees will receive an email to acknowledge the transfer digitally.
                  </p>
                </div>

                <Button
                  onClick={() => setShowConfirmDialog(true)}
                  className="w-full gap-2"
                  disabled={!transferШалтгаан.trim()}
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  Шилжүүлгийг эхлүүлэх
                </Button>
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <ArrowLeftRight className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Complete steps 1 and 2 to initiate a transfer
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Сүүлийн шилжүүлгүүд */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Сүүлийн шилжүүлгүүд</CardTitle>
          <CardDescription>
            Ажилтнуудын хоорондын шилжүүлгийн түүх
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Эд хөрөнгө</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Хэнээс</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Хэн рүү</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Шалтгаан</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransfers.map((transfer) => (
                  <tr key={transfer.id} className="border-b border-border last:border-0">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground">{transfer.assetId}</p>
                        <p className="text-sm text-muted-foreground">{transfer.assetName}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">{transfer.fromEmployee}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{transfer.toEmployee}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {new Date(transfer.transferDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{transfer.reason}</td>
                    <td className="py-4 px-4">{getStatusBadge(transfer.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Эд хөрөнгө шилжүүлгийг баталгаажуулах</DialogTitle>
            <DialogDescription>
              This will send acknowledgment emails to both the current owner and new recipient.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">Эд хөрөнгө</p>
              <p className="font-medium text-foreground">
                {selectedAssetData?.assetId} - {selectedAssetData?.category}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground">Хэнээс</p>
                <p className="font-medium text-foreground">
                  {selectedFromEmployeeData?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedFromEmployeeData?.email}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1 p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground">Хэн рүү</p>
                <p className="font-medium text-foreground">
                  {selectedToEmployeeData?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedToEmployeeData?.email}
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">Шалтгаан</p>
              <p className="text-foreground">{transferШалтгаан}</p>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
              <span>
                Both parties must digitally acknowledge the transfer before it is completed.
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Цуцлах
            </Button>
            <Button onClick={handleTransfer} className="gap-2">
              <Mail className="h-4 w-4" />
              Шилжүүлгийн хүсэлт илгээх
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Амжилттай Dialog */}
      <Dialog open={showАмжилттайDialog} onOpenChange={setShowАмжилттайDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                <Check className="h-5 w-5 text-success" />
              </div>
              Шилжүүлгийн хүсэлт илгээгдлээ
            </DialogTitle>
            <DialogDescription>
              Both employees will receive an email to acknowledge the transfer.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground mb-2">Шилжүүлгийн явц</p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary font-medium shrink-0">
                    1
                  </span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{selectedFromEmployeeData?.name}</strong> эд хөрөнгийг шилжүүлснээ батална
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary font-medium shrink-0">
                    2
                  </span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{selectedToEmployeeData?.name}</strong> хүлээн авснаа батална
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary font-medium shrink-0">
                    3
                  </span>
                  <span className="text-muted-foreground">
                    Эд хөрөнгө record updated automatically
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleReset}>Өөр шилжүүлэг эхлүүлэх</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
