"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Plus, Filter, Download, Eye } from "lucide-react"
import { assets } from "@/lib/mock-data"
import type { AssetStatus, AssetCategory } from "@/lib/types"

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

export default function AssetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assignedEmployeeName?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || asset.status === statusFilter
    const matchesCategory = categoryFilter === "all" || asset.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Эд хөрөнгийн бүртгэл</h1>
          <p className="text-muted-foreground">
            Компанийн бүх эд хөрөнгийг удирдаж, хянах
          </p>
        </div>
        <Link href="/assets/register">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Эд хөрөнгө бүртгэх
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Эд хөрөнгийн ID, серийн дугаар эсвэл ажилтнаар хайх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-0"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px] bg-secondary border-0">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Төлөв" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүх төлөв</SelectItem>
                  <SelectItem value="AVAILABLE">Бэлэн</SelectItem>
                  <SelectItem value="ASSIGNED">Хуваарилсан</SelectItem>
                  <SelectItem value="IN_REPAIR">Засварт</SelectItem>
                  <SelectItem value="PENDING_DISPOSAL">Устгал хүлээж буй</SelectItem>
                  <SelectItem value="DISPOSED">Устсан</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] bg-secondary border-0">
                  <SelectValue placeholder="Ангилал" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүх ангилал</SelectItem>
                  <SelectItem value="LAPTOP">Зөөврийн компьютер</SelectItem>
                  <SelectItem value="DESKTOP">Суурин компьютер</SelectItem>
                  <SelectItem value="MONITOR">Дэлгэц</SelectItem>
                  <SelectItem value="PHONE">Утас</SelectItem>
                  <SelectItem value="TABLET">Таблет</SelectItem>
                  <SelectItem value="PRINTER">Принтер</SelectItem>
                  <SelectItem value="NETWORK">Сүлжээ</SelectItem>
                  <SelectItem value="OTHER">Бусад</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Эд хөрөнгө ({filteredAssets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Эд хөрөнгийн ID</TableHead>
                  <TableHead className="text-muted-foreground">Ангилал</TableHead>
                  <TableHead className="text-muted-foreground">Серийн дугаар</TableHead>
                  <TableHead className="text-muted-foreground">Хариуцагч</TableHead>
                  <TableHead className="text-muted-foreground">Төлөв</TableHead>
                  <TableHead className="text-muted-foreground">Худалдан авсан огноо</TableHead>
                  <TableHead className="text-muted-foreground text-right">Дансны үнэ</TableHead>
                  <TableHead className="text-muted-foreground w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id} className="border-border">
                    <TableCell className="font-medium text-foreground">
                      {asset.assetId}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {categoryLabels[asset.category]}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {asset.serialNumber}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {asset.assignedEmployeeName || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[asset.status]}>
                        {statusLabels[asset.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(asset.purchaseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right font-medium text-foreground">
                      ${asset.currentBookValue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Link href={`/assets/${asset.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredAssets.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Шүүлтүүрт тохирох эд хөрөнгө олдсонгүй.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
