"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Filter, Download, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Asset, AssetCategory } from "@/lib/types";
import { AssetFormDialog } from "./asset-form-dialog";
import { CATEGORY_LABELS } from "./constants";

export function AssetsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [assetItems, setAssetItems] = useState<Asset[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const categoryEntries = Object.entries(CATEGORY_LABELS) as Array<
    [AssetCategory, string]
  >;

  const filteredAssets = assetItems.filter((asset) => {
    const matchesSearch =
      asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assignedEmployeeName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || asset.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || asset.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Эд хөрөнгийн бүртгэл
          </h1>
          <p className="text-muted-foreground">
            Компанийн бүх эд хөрөнгийг удирдаж, хянах
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4" />
          Шинэ хөрөнгө нэмэх
        </Button>
      </div>

      <AssetFormDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddAssets={(assets) => setAssetItems((prev) => [...assets, ...prev])}
      />

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
                  <SelectItem value="PENDING_DISPOSAL">
                    Устгал хүлээж буй
                  </SelectItem>
                  <SelectItem value="DISPOSED">Устсан</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] bg-secondary border-0">
                  <SelectValue placeholder="Ангилал" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүх ангилал</SelectItem>
                  {categoryEntries.map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  <TableHead className="text-muted-foreground">
                    Хөрөнгийн ID
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Ангилал
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Дэд ангилал
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Серийн дугаар
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Байршил
                  </TableHead>
                  <TableHead className="text-muted-foreground">Огноо</TableHead>
                  <TableHead className="text-right text-muted-foreground">
                    Үнэ
                  </TableHead>
                  <TableHead className="text-muted-foreground"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id} className="border-border">
                    <TableCell className="font-medium text-foreground">
                      {asset.assetId}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {asset.mainCategory || "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {CATEGORY_LABELS[asset.category]}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {asset.serialNumber}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {asset.location || "—"}
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
              <p className="text-muted-foreground">
                Шүүлтүүрт тохирох эд хөрөнгө олдсонгүй.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
