"use client"

import { useState } from "react"


import {
  Search,
  Filter,
  Download,
  Eye,
  Plus,
  Edit,
  Trash2,
  Clock,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { auditLogs } from "@/lib/mock-data"

const actionIcons = {
  CREATE: Plus,
  UPDATE: Edit,
  DELETE: Trash2,
}

const actionColors = {
  CREATE: "bg-success/10 text-success border-success/20",
  UPDATE: "bg-primary/10 text-primary border-primary/20",
  DELETE: "bg-destructive/10 text-destructive border-destructive/20",
}

const actionLabels = {
  CREATE: "Үүсгэх",
  UPDATE: "Шинэчлэх",
  DELETE: "Устгах",
}

export default function AuditLogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tableFilter, setTableFilter] = useState<string>("all")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [selectedLog, setSelectedLog] = useState<typeof auditLogs[0] | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.recordId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tableName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTable = tableFilter === "all" || log.tableName === tableFilter
    const matchesAction = actionFilter === "all" || log.actionType === actionFilter

    return matchesSearch && matchesTable && matchesAction
  })

  const tables = [...new Set(auditLogs.map((log) => log.tableName))]

  const handleViewDetail = (log: typeof auditLogs[0]) => {
    setSelectedLog(log)
    setShowDetailDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Аудитын бүртгэл</h1>
          <p className="text-muted-foreground">
            Системийн бүх өөрчлөлтийн өөрчлөгдөшгүй бүртгэл
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Бүртгэл татах
        </Button>
      </div>

      {/* Info banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Нэмэлт хэлбэртэй аудитын мөр</p>
            <p className="text-sm text-muted-foreground">
              Энэ бүртгэлийн бүх мөр өөрчлөгдөхгүй бөгөөд засах, устгах боломжгүй.
              Ингэснээр системийн өөрчлөлтийн бүрэн, хөндөгдөхгүй түүх хадгалагдана.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Бүртгэлийн ID, гүйцэтгэгч эсвэл хүснэгтээр хайх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-0"
              />
            </div>
            <div className="flex gap-2">
              <Select value={tableFilter} onValueChange={setTableFilter}>
                <SelectTrigger className="w-[160px] bg-secondary border-0">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Хүснэгт" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүх хүснэгт</SelectItem>
                  {tables.map((table) => (
                    <SelectItem key={table} value={table}>
                      {table}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[140px] bg-secondary border-0">
                  <SelectValue placeholder="Үйлдэл" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүх үйлдэл</SelectItem>
                  <SelectItem value="CREATE">Үүсгэх</SelectItem>
                  <SelectItem value="UPDATE">Шинэчлэх</SelectItem>
                  <SelectItem value="DELETE">Устгах</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit log table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Аудитын бичлэг ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Огноо</TableHead>
                  <TableHead className="text-muted-foreground">Хүснэгт</TableHead>
                  <TableHead className="text-muted-foreground">Бичлэгийн ID</TableHead>
                  <TableHead className="text-muted-foreground">Үйлдэл</TableHead>
                  <TableHead className="text-muted-foreground">Гүйцэтгэгч</TableHead>
                  <TableHead className="text-muted-foreground w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => {
                  const ActionIcon = actionIcons[log.actionType]
                  return (
                    <TableRow key={log.id} className="border-border">
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {log.tableName}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-foreground">
                        {log.recordId}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`gap-1 ${actionColors[log.actionType]}`}
                        >
                          <ActionIcon className="h-3 w-3" />
                          {actionLabels[log.actionType]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {log.actor}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewDetail(log)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          {filteredLogs.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                Таны шүүлтүүрт тохирох аудитын бичлэг олдсонгүй.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Аудитын бичлэгийн дэлгэрэнгүй</DialogTitle>
            <DialogDescription>
              Системийн өөрчлөлтийн бүрэн бичлэг
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-6 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Огноо</p>
                  <p className="font-medium text-foreground">
                    {new Date(selectedLog.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Гүйцэтгэгч</p>
                  <p className="font-medium text-foreground">{selectedLog.actor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Хүснэгт</p>
                  <Badge variant="outline" className="font-mono">
                    {selectedLog.tableName}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Бичлэгийн ID</p>
                  <p className="font-mono text-foreground">{selectedLog.recordId}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Үйлдлийн төрөл</p>
                <Badge
                  variant="outline"
                  className={`gap-1 ${actionColors[selectedLog.actionType]}`}
                >
                  {actionIcons[selectedLog.actionType] && (
                    <span>
                      {(() => {
                        const Icon = actionIcons[selectedLog.actionType]
                        return <Icon className="h-3 w-3" />
                      })()}
                    </span>
                  )}
                  {actionLabels[selectedLog.actionType]}
                </Badge>
              </div>

              {selectedLog.oldValue && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Өмнөх утга</p>
                  <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {JSON.stringify(selectedLog.oldValue, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {selectedLog.newValue && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Шинэ утга</p>
                  <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {JSON.stringify(selectedLog.newValue, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
