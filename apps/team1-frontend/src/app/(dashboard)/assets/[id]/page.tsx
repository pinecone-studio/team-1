import Link from "next/link"
import {
  ArrowLeft,
  Edit,
  QrCode,
  Printer,
  UserCheck,
  Wrench,
  Trash2,
  Package,
  Calendar,
  DollarSign,
  Building,
  User,
  History,
} from "lucide-react"
import { AssetStatus } from "@/lib/types"
import { assets, auditLogs } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle,  } from "@/components/ui/card"



const statusColors: Record<AssetStatus, string> = {
  AVAILABLE: "bg-success/10 text-success border-success/20",
  ASSIGNED: "bg-primary/10 text-primary border-primary/20",
  IN_REPAIR: "bg-warning/10 text-warning border-warning/20",
  PENDING_DISPOSAL: "bg-destructive/10 text-destructive border-destructive/20",
  DISPOSED: "bg-muted text-muted-foreground border-border",
}

const statusLabels: Record<AssetStatus, string> = {
  AVAILABLE: "Бэлэн",
  ASSIGNED: "Хуваарилсан",
  IN_REPAIR: "Засварт",
  PENDING_DISPOSAL: "Устгал хүлээж буй",
  DISPOSED: "Устсан",
}

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const asset = assets.find((a) => a.id === id)

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Эд хөрөнгө олдсонгүй</p>
        <Link href="/assets" className="mt-4">
          <Button variant="outline">Эд хөрөнгө рүү буцах</Button>
        </Link>
      </div>
    )
  }

  const assetLogs = auditLogs.filter(
    (log) => log.recordId === asset.assetId || log.recordId === asset.id
  )

  const depreciationPerYear =
    (asset.purchaseCost - asset.residualValue) / asset.usefulLife
  const yearsOwned =
    (new Date().getTime() - new Date(asset.purchaseDate).getTime()) /
    (365 * 24 * 60 * 60 * 1000)
  const accumulatedDepreciation = Math.min(
    depreciationPerYear * yearsOwned,
    asset.purchaseCost - asset.residualValue
  )

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/assets">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{asset.assetId}</h1>
              <Badge variant="outline" className={statusColors[asset.status]}>
                {statusLabels[asset.status]}
              </Badge>
            </div>
            <p className="text-muted-foreground">{asset.serialNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <QrCode className="h-4 w-4" />
            QR харах
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Printer className="h-4 w-4" />
            Шошго хэвлэх
          </Button>
          <Button size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Засах
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Asset photo and QR */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex items-center justify-center bg-secondary rounded-lg p-8 min-h-[200px]">
                  <Package className="h-24 w-24 text-muted-foreground/50" />
                </div>
                <div className="w-[150px] flex flex-col items-center gap-2">
                  <div className="w-full aspect-square bg-foreground rounded-lg flex items-center justify-center">
                    <QrCode className="h-20 w-20 text-background" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Баталгаажуулахын тулд уншуулна
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardHeader className="text-card-foreground">Худалдан авалтын мэдээлэл</CardHeader>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Худалдан авалтын үнэ</p>
                    <p className="font-medium text-foreground">
                      ${asset.purchaseCost.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Худалдан авсан огноо</p>
                    <p className="font-medium text-foreground">
                      {new Date(asset.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Үлдэгдэл үнэ</p>
                    <p className="font-medium text-foreground">
                      ${asset.residualValue.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <History className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ашиглалтын хугацаа</p>
                    <p className="font-medium text-foreground">
                      {asset.usefulLife} жил
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">
                  Элэгдлийн төлөв
                </h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Одоогийн дансны үнэ</p>
                    <p className="text-xl font-bold text-foreground">
                      ${asset.currentBookValue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Хуримтлагдсан элэгдэл
                    </p>
                    <p className="text-xl font-bold text-destructive">
                      -${Math.round(accumulatedDepreciation).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Жилийн элэгдэл</p>
                    <p className="text-xl font-bold text-foreground">
                      ${Math.round(depreciationPerYear).toLocaleString()}/жил
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit log */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Амьдралын мөчлөгийн түүх</CardTitle>
            </CardHeader>
            <CardContent>
              {assetLogs.length > 0 ? (
                <div className="space-y-4">
                  {assetLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex gap-4 p-4 rounded-lg bg-secondary/50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <History className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">
                            {log.actionType} - {log.tableName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Гүйцэтгэсэн: {log.actor}
                        </p>
                        {log.newValue && (
                          <p className="text-sm text-muted-foreground mt-1 font-mono">
                            {JSON.stringify(log.newValue)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Түүхийн бичлэг олдсонгүй
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignment info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Хуваарилалт</CardTitle>
            </CardHeader>
            <CardContent>
              {asset.assignedEmployeeName ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {asset.assignedEmployeeName}
                      </p>
                      <p className="text-sm text-muted-foreground">Хариуцагч ажилтан</p>
                    </div>
                  </div>
                  {asset.departmentName && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {asset.departmentName}
                        </p>
                        <p className="text-sm text-muted-foreground">Хэлтэс</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">Хариуцагчгүй</p>
                  <Link href="/assignment">
                    <Button className="gap-2">
                      <UserCheck className="h-4 w-4" />
                      Эд хөрөнгө оноох
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Шуурхай үйлдлүүд</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <UserCheck className="h-4 w-4" />
                Дахин хуваарилах
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Wrench className="h-4 w-4" />
                Засварт тэмдэглэх
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Устгал хүсэх
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
