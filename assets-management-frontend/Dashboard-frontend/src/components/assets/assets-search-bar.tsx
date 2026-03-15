"use client";

import { Search, Filter, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_LABELS } from "./constants";

interface AssetsSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
}

export function AssetsSearchBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
}: AssetsSearchBarProps) {
  const categoryEntries = Object.entries(CATEGORY_LABELS) as Array<
    [string, string]
  >;

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Эд хөрөнгийн ID, серийн дугаар эсвэл ажилтнаар хайх..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-secondary border-0"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={onStatusChange}>
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
            <Select value={categoryFilter} onValueChange={onCategoryChange}>
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
  );
}
