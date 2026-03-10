"use client"

import Link from "next/link"



import { ArrowRight } from "lucide-react"
import type { Asset, AssetCategory, AssetStatus } from "@/lib/types"
import { assets } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"




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

const categoryLabels: Record<AssetCategory, string> = {
  LAPTOP: "Зөөврийн компьютер",
  DESKTOP: "Суурин компьютер",
  MONITOR: "Дэлгэц",
  PHONE: "Утас",
  TABLET: "Таблет",
  PRINTER: "Принтер",
  NETWORK: "Сүлжээ",
  OTHER: "Бусад",
}

export function RecentAssets() {
  const recentAssets = assets.slice(0, 5)

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-card-foreground">Сүүлд нэмэгдсэн эд хөрөнгө</CardTitle>
        <Link href="/assets">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Бүгдийг харах
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAssets.map((asset: Asset) => (
            <Link
              key={asset.id}
              href={`/assets/${asset.id}`}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium text-card-foreground">{asset.assetId}</p>
                <p className="text-sm text-muted-foreground">
                  {categoryLabels[asset.category]} • {asset.serialNumber}
                </p>
              </div>
              <Badge variant="outline" className={statusColors[asset.status]}>
                {statusLabels[asset.status]}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
