"use client"

import { useState } from "react"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { disposalRequests } from "@/lib/mock-data"
import {
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  HardDrive,
  FileCheck,

  User,
  Calendar,
} from "lucide-react"

type DisposalStatus = "pending_hr" | "pending_finance" | "pending_data_wipe" | "disposed" | "archived"

const statusSteps: { status: DisposalStatus; label: string; icon: typeof Clock }[] = [
  { status: "pending_hr", label: "ХН зөвшөөрөл", icon: User },
  { status: "pending_finance", label: "Санхүүгийн зөвшөөрөл", icon: FileCheck },
  { status: "pending_data_wipe", label: "Мэдээлэл устгал", icon: HardDrive },
  { status: "disposed", label: "Устгасан", icon: Trash2 },
]

export default function DisposalPage() {
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)


  const pendingRequests = disposalRequests.filter(
    (r) => r.status !== "disposed" && r.status !== "archived"
  )
  const completedRequests = disposalRequests.filter(
    (r) => r.status === "disposed" || r.status === "archived"
  )

  const handleApproval = (requestId: string) => {
    setSelectedRequest(requestId)
    setShowApprovalDialog(true)
  }

  const getStatusIndex = (status: DisposalStatus): number => {
    if (status === "archived") return 4
    return statusSteps.findIndex((s) => s.status === status)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Устгалын менежмент</h1>
        <p className="text-muted-foreground">
          Эд хөрөнгийн ашиглалт дуусах ба устгалын процессыг удирдах
        </p>
      </div>

      {/* Pending requests */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Устгал хүлээж буй хүсэлтүүд ({pendingRequests.length})
          </CardTitle>
          <CardDescription>
            Зөвшөөрөл эсвэл боловсруулалт хүлээж буй хүсэлтүүд
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingRequests.length > 0 ? (
            <div className="space-y-6">
              {pendingRequests.map((request) => {
                const currentStep = getStatusIndex(request.status)

                return (
                  <div
                    key={request.id}
                    className="p-6 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="font-medium text-foreground text-lg">
                          {request.assetName}
                        </p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {request.assetId}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          request.reason === "damaged"
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        }
                      >
                        {request.reason === "exceeded_useful_life"
                          ? "Ашиглалтын хугацаа дууссан"
                          : request.reason === "damaged"
                          ? "Гэмтсэн"
                          : "Хасалт"}
                      </Badge>
                    </div>

                    {/* Workflow progress */}
                    <div className="flex items-center mb-6">
                      {statusSteps.map((step, index) => {
                        const isCompleted = index < currentStep
                        const isCurrent = index === currentStep
                        const Icon = step.icon

                        return (
                          <div key={step.status} className="flex items-center flex-1">
                            <div className="flex flex-col items-center flex-1">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                  isCompleted
                                    ? "bg-success text-success-foreground"
                                    : isCurrent
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5" />
                                ) : (
                                  <Icon className="h-5 w-5" />
                                )}
                              </div>
                              <p
                                className={`text-xs mt-2 text-center ${
                                  isCompleted || isCurrent
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {step.label}
                              </p>
                            </div>
                            {index < statusSteps.length - 1 && (
                              <div
                                className={`h-0.5 w-full ${
                                  isCompleted ? "bg-success" : "bg-border"
                                }`}
                              />
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Request details */}
                    <div className="grid gap-4 sm:grid-cols-3 mb-4">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Хүсэлт гаргасан</p>
                          <p className="text-sm text-foreground">{request.requestedBy}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Хүсэлт гаргасан огноо</p>
                          <p className="text-sm text-foreground">
                            {new Date(request.requestedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Одоогийн төлөв</p>
                          <p className="text-sm text-foreground">
                            {request.status === "pending_hr"
                              ? "ХН хүлээж буй"
                              : request.status === "pending_finance"
                              ? "Санхүү хүлээж буй"
                              : request.status === "pending_data_wipe"
                              ? "Мэдээлэл устгал хүлээж буй"
                              : request.status}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Approval history */}
                    {(request.hrApproval || request.financeApproval) && (
                      <div className="flex flex-wrap gap-4 mb-4 pt-4 border-t border-border">
                        {request.hrApproval && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-muted-foreground">
                              ХН зөвшөөрсөн: {request.hrApproval.by}
                            </span>
                          </div>
                        )}
                        {request.financeApproval && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-muted-foreground">
                              Санхүү зөвшөөрсөн: {request.financeApproval.by}
                            </span>
                          </div>
                        )}
                        {request.dataWipeCertificate && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-success" />
                            <span className="text-muted-foreground">
                              Мэдээлэл устгал хийсэн: {request.dataWipeCertificate.by}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                      {request.status === "pending_hr" && (
                        <Button
                          onClick={() => handleApproval(request.id)}
                          className="gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          ХН зөвшөөрөл
                        </Button>
                      )}
                      {request.status === "pending_finance" && (
                        <Button
                          onClick={() => handleApproval(request.id)}
                          className="gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Санхүүгийн зөвшөөрөл
                        </Button>
                      )}
                      {request.status === "pending_data_wipe" && (
                        <Button
                          onClick={() => handleApproval(request.id)}
                          className="gap-2"
                        >
                          <HardDrive className="h-4 w-4" />
                          Мэдээлэл устгал дуусгах
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
                <Trash2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No pending disposal requests</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Disposed assets archive */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Устгасан эд хөрөнгийн архив
          </CardTitle>
          <CardDescription>
            Read-only archive of disposed assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          {completedRequests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Эд хөрөнгийн ID</TableHead>
                  <TableHead className="text-muted-foreground">Эд хөрөнгийн нэр</TableHead>
                  <TableHead className="text-muted-foreground">Шалтгаан</TableHead>
                  <TableHead className="text-muted-foreground">Устгасан огноо</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedRequests.map((request) => (
                  <TableRow key={request.id} className="border-border">
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {request.assetId}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {request.assetName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.reason === "exceeded_useful_life"
                        ? "Ашиглалтын хугацаа дууссан"
                        : request.reason === "damaged"
                        ? "Гэмтсэн"
                        : "Хасалт"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.dataWipeCertificate?.at
                        ? new Date(request.dataWipeCertificate.at).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-muted text-muted-foreground">
                        {request.status === "archived" ? "Архивласан" : "Устгасан"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Архивт устгасан эд хөрөнгө алга</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Зөвшөөрлийн шийдвэр</DialogTitle>
            <DialogDescription>
              Энэ устгалын хүсэлтийг хянаж батлах эсвэл татгалзах
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">Эд хөрөнгө</p>
              <p className="font-medium text-foreground">
                {disposalRequests.find((r) => r.id === selectedRequest)?.assetName}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                {disposalRequests.find((r) => r.id === selectedRequest)?.assetId}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Тайлбар (заавал биш)
              </label>
              <Textarea
                placeholder="Тэмдэглэл эсвэл тайлбар нэмэх..."
                className="bg-secondary border-0"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowApprovalDialog(false)}
              className="gap-2"
            >
              <XCircle className="h-4 w-4" />
              Татгалзах
            </Button>
            <Button
              onClick={() => setShowApprovalDialog(false)}
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Зөвшөөрөх
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
