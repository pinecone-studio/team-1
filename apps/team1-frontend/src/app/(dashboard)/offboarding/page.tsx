"use client"

import { useState } from "react"

import {
  UserMinus,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  Camera,
  HardDrive,
  DollarSign,
  Calendar,
  Upload,
} from "lucide-react"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AssetCondition } from "@/lib/types"
import { offboardingTasks } from "@/lib/mock-data"



export default function OffboardingPage() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [showInspectionDialog, setShowInspectionDialog] = useState(false)
  const [inspectionCondition, setInspectionCondition] = useState<AssetCondition>("Good")

  const activeTask = offboardingTasks.find((t) => t.id === selectedTask) || offboardingTasks[0]

  const returnedCount = activeTask?.assets.filter((a) => a.returnStatus === "returned").length || 0
  const totalAssets = activeTask?.assets.length || 0
  const returnProgress = totalAssets > 0 ? Math.round((returnedCount / totalAssets) * 100) : 0

  const handleInspection = (assetId: string) => {
    setShowInspectionDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ажилтны гаралтын явц</h1>
        <p className="text-muted-foreground">
          Ажилтны гаралтын үеийн эд хөрөнгө буцаалтыг удирдах
        </p>
      </div>

      {offboardingTasks.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Task list */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Идэвхтэй гаралтын ажлууд
            </h2>
            {offboardingTasks.map((task) => (
              <Card
                key={task.id}
                className={`bg-card border-border cursor-pointer transition-colors ${
                  selectedTask === task.id || (!selectedTask && task.id === offboardingTasks[0].id)
                    ? "ring-2 ring-primary"
                    : "hover:bg-secondary/50"
                }`}
                onClick={() => setSelectedTask(task.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-foreground">{task.employeeName}</p>
                      <p className="text-sm text-muted-foreground">
                        Ажил дуусах огноо: {new Date(task.terminationDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        task.status === "completed"
                          ? "bg-success/10 text-success border-success/20"
                          : task.status === "in_progress"
                          ? "bg-warning/10 text-warning border-warning/20"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {task.status === "in_progress"
                        ? "Явагдаж буй"
                        : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Package className="h-4 w-4" />
                      {task.assets.length} эд хөрөнгө
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CheckCircle className="h-4 w-4" />
                      {task.assets.filter((a) => a.returnStatus === "returned").length} буцаасан
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Task details */}
          <div className="lg:col-span-2 space-y-6">
            {activeTask && (
              <>
                {/* Overview */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-card-foreground flex items-center gap-2">
                          <UserMinus className="h-5 w-5 text-primary" />
                          {activeTask.employeeName}
                        </CardTitle>
                        <CardDescription>
                          Ажилтны гаралтын процесс явагдаж байна
                        </CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          activeTask.payrollCleared
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        <DollarSign className="h-3 w-3 mr-1" />
                        {activeTask.payrollCleared ? "Цалин хаагдсан" : "Цалин түдгэлзсэн"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Ажил дуусах огноо
                          </p>
                          <p className="font-medium text-foreground">
                            {new Date(activeTask.terminationDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Хуваарилсан эд хөрөнгө
                          </p>
                          <p className="font-medium text-foreground">
                            {activeTask.assets.length} ширхэг
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Буцаалтын явц</span>
                        <span className="font-medium text-foreground">
                          {returnedCount}/{totalAssets} буцаасан
                        </span>
                      </div>
                      <Progress value={returnProgress} className="h-2" />
                    </div>

                    {!activeTask.payrollCleared && (
                      <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Цалин хаалт түдгэлзсэн</p>
                          <p className="text-sm text-muted-foreground">
                            Бүх эд хөрөнгө буцаагдаж, мэдээлэл устгал дуусах хүртэл цалин хаагдахгүй
                            inspected.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Asset list */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-card-foreground">
                      Буцаах эд хөрөнгө
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeTask.assets.map((asset) => (
                      <div
                        key={asset.assetId}
                        className="p-4 rounded-lg bg-secondary/50"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-medium text-foreground">
                              {asset.assetName}
                            </p>
                            <p className="text-sm text-muted-foreground font-mono">
                              {asset.assetId}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              asset.returnStatus === "returned"
                                ? "bg-success/10 text-success border-success/20"
                                : asset.returnStatus === "overdue"
                                ? "bg-destructive/10 text-destructive border-destructive/20"
                                : "bg-warning/10 text-warning border-warning/20"
                            }
                          >
                            {asset.returnStatus === "returned"
                              ? "Буцаасан"
                              : asset.returnStatus === "overdue"
                              ? "Хугацаа хэтэрсэн"
                              : "Хүлээгдэж буй"}
                          </Badge>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            Буцаах хугацаа: {new Date(asset.returnDeadline).toLocaleDateString()}
                          </div>
                          {asset.condition && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <CheckCircle className="h-4 w-4" />
                              Нөхцөл: {asset.condition}
                            </div>
                          )}
                        </div>

                        <Separator className="my-3" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {asset.dataWipeRequired && (
                              <div
                                className={`flex items-center gap-2 text-sm ${
                                  asset.dataWipeCompleted
                                    ? "text-success"
                                    : "text-muted-foreground"
                                }`}
                              >
                                <HardDrive className="h-4 w-4" />
                                {asset.dataWipeCompleted
                                  ? "Мэдээлэл устсан"
                                  : "Мэдээлэл устгал шаардлагатай"}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {asset.returnStatus === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleInspection(asset.assetId)}
                                className="gap-2"
                              >
                                <Camera className="h-4 w-4" />
                                Mark Буцаасан
                              </Button>
                            )}
                            {asset.returnStatus === "returned" &&
                              asset.dataWipeRequired &&
                              !asset.dataWipeCompleted && (
                                <Button variant="outline" size="sm" className="gap-2">
                                  <HardDrive className="h-4 w-4" />
                                  Мэдээлэл устгал дуусгах
                                </Button>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <UserMinus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No Идэвхтэй гаралтын ажлууд
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              Ажилтны гаралт эхлэхэд процесс автоматаар үүснэ
              ажилтан гарсан үед систем автоматаар үүсгэнэ.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Inspection Dialog */}
      <Dialog open={showInspectionDialog} onOpenChange={setShowInspectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Эд хөрөнгө буцаалтын шалгалт</DialogTitle>
            <DialogDescription>
              Буцаасан эд хөрөнгийг шалгаж, нөхцөлийг тэмдэглэ
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Эд хөрөнгийн нөхцөл
              </label>
              <Select
                value={inspectionCondition}
                onValueChange={(v) => setInspectionCondition(v as AssetCondition)}
              >
                <SelectTrigger className="bg-secondary border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Good">Сайн - бүрэн ажиллагаатай</SelectItem>
                  <SelectItem value="Fair">Дунд - бага зэрэг элэгдэлтэй</SelectItem>
                  <SelectItem value="Damaged">Гэмтсэн - засвар шаардлагатай</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Шалгалтын зураг
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6">
                <div className="flex flex-col items-center text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Буцаасан эд хөрөнгийн зураг оруулна уу
                  </p>
                  <Button variant="outline" size="sm">
                    Зураг оруулах
                  </Button>
                </div>
              </div>
            </div>

            {inspectionCondition === "Damaged" && (
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Гэмтэл илэрлээ</p>
                  <p className="text-sm text-muted-foreground">
                    Энэ эд хөрөнгийг засвар/устгалын үнэлгээнд шилжүүлнэ.
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInspectionDialog(false)}>
              Цуцлах
            </Button>
            <Button onClick={() => setShowInspectionDialog(false)}>
              Шалгалт дуусгах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
