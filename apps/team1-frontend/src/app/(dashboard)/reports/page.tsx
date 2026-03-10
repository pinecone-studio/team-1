"use client"

import { useState } from "react"

import {
  FileText,
  Download,
  FileSpreadsheet,
  Calendar,
  Package,
  DollarSign,
  Users,
  ClipboardCheck,
  Wrench,
  TrendingDown,
  BarChart3,
  UserMinus,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const reportTypes = [
  {
    id: "inventory",
    name: "Эд хөрөнгийн нэгдсэн хураангуй",
    description: "Бүх эд хөрөнгийн төлөв, үнэ бүхий нийт тойм",
    icon: Package,
    category: "Эд хөрөнгө",
  },
  {
    id: "depreciation",
    name: "Элэгдлийн хуваарь",
    description: "Бүх эд хөрөнгийн сарын элэгдлийн тооцоо",
    icon: TrendingDown,
    category: "Санхүү",
  },
  {
    id: "cost-per-employee",
    name: "Ажилтан тутмын зардал",
    description: "Ажилтан, хэлтсээр хуваарилсан эд хөрөнгийн зардал",
    icon: Users,
    category: "Санхүү",
  },
  {
    id: "census-audit",
    name: "Тооллогын аудитын тайлан",
    description: "Эд хөрөнгийн баталгаажуулалтын үр дүн",
    icon: ClipboardCheck,
    category: "Аудит",
  },
  {
    id: "maintenance",
    name: "Засвар үйлчилгээний зардлын тайлан",
    description: "Эд хөрөнгийн ангиллаар засвар, үйлчилгээний зардал",
    icon: Wrench,
    category: "Засвар үйлчилгээ",
  },
  {
    id: "lifecycle",
    name: "Эд хөрөнгийн амьдралын мөчлөгийн тайлан",
    description: "Эд хөрөнгийн төлөвийн өөрчлөлт ба түүх",
    icon: BarChart3,
    category: "Эд хөрөнгө",
  },
  {
    id: "budget",
    name: "Төсөв ашиглалт",
    description: "Төсөвтэй харьцуулсан худалдан авалт",
    icon: DollarSign,
    category: "Санхүү",
  },
  {
    id: "offboarding",
    name: "Гаралтын хаалтын төлөв",
    description: "Ажилтны гаралт дахь эд хөрөнгийн буцаалтын төлөв",
    icon: UserMinus,
    category: "ХН",
  },
]

const recentReports = [
  {
    id: "1",
    name: "Эд хөрөнгийн нэгдсэн хураангуй",
    generatedAt: "2024-03-10T14:30:00Z",
    generatedBy: "Sarah Chen",
    format: "PDF",
  },
  {
    id: "2",
    name: "Элэгдлийн хуваарь",
    generatedAt: "2024-03-08T09:15:00Z",
    generatedBy: "David Lee",
    format: "CSV",
  },
  {
    id: "3",
    name: "Тооллогын аудитын тайлан",
    generatedAt: "2024-03-05T16:45:00Z",
    generatedBy: "Sarah Chen",
    format: "PDF",
  },
]

export default function ReportsPage() {
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [exportFormat, setExportFormat] = useState<"pdf" | "csv">("pdf")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  const handleGenerateReport = (reportId: string) => {
    setSelectedReport(reportId)
    setShowGenerateDialog(true)
  }

  const selectedReportData = reportTypes.find((r) => r.id === selectedReport)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Тайлан</h1>
        <p className="text-muted-foreground">
          Эд хөрөнгийн тайлан үүсгэж, экспортлох
        </p>
      </div>

      {/* Report categories */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reportTypes.map((report) => {
          const Icon = report.icon
          return (
            <Card
              key={report.id}
              className="bg-card border-border cursor-pointer hover:bg-secondary/50 transition-colors"
              onClick={() => handleGenerateReport(report.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {report.category}
                      </Badge>
                    </div>
                    <p className="font-medium text-foreground text-sm">
                      {report.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {report.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent reports */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Сүүлийн тайлангууд
          </CardTitle>
          <CardDescription>
            Өмнө үүсгэсэн тайлангуудыг татаж авах боломжтой
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentReports.length > 0 ? (
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      {report.format === "PDF" ? (
                        <FileText className="h-5 w-5 text-primary" />
                      ) : (
                        <FileSpreadsheet className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(report.generatedAt).toLocaleDateString()}
                        </span>
                        <span>үүсгэсэн: {report.generatedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{report.format}</Badge>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Татах
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No recent reports</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generate Report Dialog */}
      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent>
          <DialogHeader>
          
            <DialogTitle className="flex items-center gap-2">
              {selectedReportData && (
                <>
                  <selectedReportData.icon className="h-5 w-5 text-primary" />
                  {selectedReportData.name}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedReportData?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
              <Label>Эхлэх огноо</Label>
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="bg-secondary border-0"
                />
              </div>
              <div className="space-y-2">
              <Label>Дуусах огноо</Label>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  className="bg-secondary border-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Экспорт формат</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={exportFormat === "pdf" ? "default" : "outline"}
                  onClick={() => setExportFormat("pdf")}
                  className="flex-1 gap-2"
                >
                  <FileText className="h-4 w-4" />
                  PDF
                </Button>
                <Button
                  type="button"
                  variant={exportFormat === "csv" ? "default" : "outline"}
                  onClick={() => setExportFormat("csv")}
                  className="flex-1 gap-2"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  CSV
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Estimated data:</strong>
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• 1,247 total assets</li>
                <li>• Data from selected date range</li>
                <li>• Includes all asset categories</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGenerateDialog(false)}>
              Цуцлах
            </Button>
            <Button className="gap-2" onClick={() => setShowGenerateDialog(false)}>
              <Download className="h-4 w-4" />
              Тайлан үүсгэх
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
