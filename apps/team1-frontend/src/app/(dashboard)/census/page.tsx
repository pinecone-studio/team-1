"use client"

import { useState } from "react"

import {
  QrCode,
  Play,
  CheckCircle,
  AlertCircle,
  Clock,
  Building,
  Package,
  Users,
  Smartphone,
  Link as LinkIcon,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { censusTasks } from "@/lib/mock-data"

export default function CensusPage() {
  const [showStartDialog, setShowStartDialog] = useState(false)
  const [censusType, setCensusType] = useState<"company" | "department" | "category">("company")
  const [selectedTarget, setSelectedTarget] = useState("")

  const activeCensus = censusTasks.find((c) => c.status === "active")
  const verifiedPercent = activeCensus
    ? Math.round((activeCensus.verifiedCount / activeCensus.totalAssets) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">QR тооллого ба аудит</h1>
          <p className="text-muted-foreground">
            QR код ашиглан компанийн эд хөрөнгийг баталгаажуулж, аудит хийх
          </p>
        </div>
        <Button onClick={() => setShowStartDialog(true)} className="gap-2">
          <Play className="h-4 w-4" />
          Шинэ тооллого эхлүүлэх
        </Button>
      </div>

      {/* Census dashboard */}
      {activeCensus ? (
        <>
          {/* Progress overview */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Нийт эд хөрөнгө</p>
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {activeCensus.totalAssets.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Баталгаажсан</p>
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <p className="text-2xl font-bold text-success">
                  {activeCensus.verifiedCount.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Хүлээгдэж буй</p>
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <p className="text-2xl font-bold text-warning">
                  {(activeCensus.totalAssets - activeCensus.verifiedCount - activeCensus.discrepancyCount).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Зөрүү</p>
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
                <p className="text-2xl font-bold text-destructive">
                  {activeCensus.discrepancyCount}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Progress bar */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-card-foreground">
                  Тооллогын явц
                </CardTitle>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Идэвхтэй
                </Badge>
              </div>
              <CardDescription>
                Эхэлсэн: {new Date(activeCensus.startDate).toLocaleDateString()} •{" "}
                {activeCensus.type.charAt(0).toUpperCase() + activeCensus.type.slice(1)} хүрээнд
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Баталгаажуулалтын явц</span>
                  <span className="font-medium text-foreground">{verifiedPercent}%</span>
                </div>
                <Progress value={verifiedPercent} className="h-3" />
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-success" />
                    <span className="text-muted-foreground">
                      Баталгаажсан: {activeCensus.verifiedCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-warning" />
                    <span className="text-muted-foreground">
                      Хүлээгдэж буй: {activeCensus.totalAssets - activeCensus.verifiedCount - activeCensus.discrepancyCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive" />
                    <span className="text-muted-foreground">
                      Зөрүүтэй: {activeCensus.discrepancyCount}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification methods */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  QR код уншуулах
                </CardTitle>
                <CardDescription>
                  Гар утсаар эд хөрөнгийн QR код уншуулна
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center p-6 bg-secondary/50 rounded-lg">
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-foreground mb-4">
                    <QrCode className="h-16 w-16 text-background" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Утас дээрх уншигчаа нээгээд эд хөрөнгийг баталгаажуулна
                  </p>
                  <Button className="gap-2">
                    <QrCode className="h-4 w-4" />
                    Уншигч нээх
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  Өөрөө баталгаажуулах портал
                </CardTitle>
                <CardDescription>
                  Баталгаажуулах холбоосыг ажилтнуудад илгээх
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center p-6 bg-secondary/50 rounded-lg">
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ажилтнууд порталын холбоосоор эд хөрөнгөө баталгаажуулна
                  </p>
                  <Button variant="outline" className="gap-2">
                    <LinkIcon className="h-4 w-4" />
                    Баталгаажуулах холбоос илгээх
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Verification tasks */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Сүүлийн баталгаажуулалтын даалгаврууд
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Эд хөрөнгийн ID</TableHead>
                    <TableHead className="text-muted-foreground">Ажилтан</TableHead>
                    <TableHead className="text-muted-foreground">Арга</TableHead>
                    <TableHead className="text-muted-foreground">Нөхцөл</TableHead>
                    <TableHead className="text-muted-foreground">Төлөв</TableHead>
                    <TableHead className="text-muted-foreground">Баталгаажуулсан огноо</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeCensus.tasks.map((task) => (
                    <TableRow key={task.id} className="border-border">
                      <TableCell className="font-medium text-foreground">
                        {task.assetId}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {task.employeeId}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {task.verificationMethod === "qr_scan"
                          ? "QR уншилт"
                          : task.verificationMethod === "self_verification"
                          ? "Өөрөө баталгаажуулалт"
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {task.condition ? (
                          <Badge
                            variant="outline"
                            className={
                              task.condition === "Good"
                                ? "bg-success/10 text-success border-success/20"
                                : task.condition === "Fair"
                                ? "bg-warning/10 text-warning border-warning/20"
                                : "bg-destructive/10 text-destructive border-destructive/20"
                            }
                          >
                            {task.condition === "Good"
                              ? "Сайн"
                              : task.condition === "Fair"
                              ? "Дунд"
                              : "Гэмтсэн"}
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            task.status === "verified"
                              ? "bg-success/10 text-success border-success/20"
                              : task.status === "pending"
                              ? "bg-warning/10 text-warning border-warning/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          }
                        >
                          {task.status === "verified"
                            ? "Баталгаажсан"
                            : task.status === "pending"
                            ? "Хүлээгдэж буй"
                            : "Зөрүүтэй"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {task.verifiedAt
                          ? new Date(task.verifiedAt).toLocaleString()
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <QrCode className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Идэвхтэй тооллого алга
            </h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Шинэ тооллого эхлүүлж эд хөрөнгийг баталгаажуулна. Компанийн хэмжээнд,
              хэлтэсээр эсвэл ангиллаар тооллого хийж болно.
            </p>
            <Button onClick={() => setShowStartDialog(true)} className="gap-2">
              <Play className="h-4 w-4" />
              Шинэ тооллого эхлүүлэх
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Start Census Dialog */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Шинэ тооллого эхлүүлэх</DialogTitle>
            <DialogDescription>
              Эд хөрөнгийн баталгаажуулалтын тооллогыг тохируулж эхлүүлэх
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Тооллогын төрөл
              </label>
              <Select
                value={censusType}
                onValueChange={(v) => setCensusType(v as typeof censusType)}
              >
                <SelectTrigger className="bg-secondary border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Компанийн хүрээний тооллого
                    </div>
                  </SelectItem>
                  <SelectItem value="department">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Хэлтсийн тооллого
                    </div>
                  </SelectItem>
                  <SelectItem value="category">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Ангиллын тооллого
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {censusType === "department" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Хэлтэс сонгох
                </label>
                <Select value={selectedTarget} onValueChange={setSelectedTarget}>
                  <SelectTrigger className="bg-secondary border-0">
                    <SelectValue placeholder="Хэлтэс сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Инженер</SelectItem>
                    <SelectItem value="sales">Борлуулалт</SelectItem>
                    <SelectItem value="hr">ХН</SelectItem>
                    <SelectItem value="finance">Санхүү</SelectItem>
                    <SelectItem value="it">ИТ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {censusType === "category" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Ангилал сонгох
                </label>
                <Select value={selectedTarget} onValueChange={setSelectedTarget}>
                  <SelectTrigger className="bg-secondary border-0">
                    <SelectValue placeholder="Ангилал сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laptop">Зөөврийн компьютер</SelectItem>
                    <SelectItem value="desktop">Суурин компьютер</SelectItem>
                    <SelectItem value="monitor">Дэлгэц</SelectItem>
                    <SelectItem value="phone">Утас</SelectItem>
                    <SelectItem value="tablet">Таблет</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Дараагийн алхам:</strong>
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Хуваарилсан эд хөрөнгө бүр дээр баталгаажуулалтын даалгавар үүснэ</li>
                <li>• Ажилтнууд QR уншилт эсвэл порталын холбоосоор баталгаажуулна</li>
                <li>• Явцыг бодит хугацаанд хянаж харна</li>
                <li>• Зөрүүг шалгалтад тэмдэглэнэ</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStartDialog(false)}>
              Цуцлах
            </Button>
            <Button className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Тооллого эхлүүлэх
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
