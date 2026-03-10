"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Monitor, Headphones, ChevronRight, Filter, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Status = "Assigned" | "Available" | "In Repair" | "Pending Disposal"

interface Asset {
  id: string
  code: string
  name: string
  category: string
  status: Status
  location: string
  assignedTo?: {
    name: string
    department: string
  }
  icon: "monitor" | "peripheral"
}

const assets: Asset[] = [
  {
    id: "1",
    code: "MAC-2024-001",
    name: 'MacBook Pro 16"',
    category: "Төхөөрөмж",
    status: "Assigned",
    location: "Tokyo",
    assignedTo: { name: "John Smith", department: "Engineering" },
    icon: "monitor",
  },
  {
    id: "2",
    code: "MAC-2024-002",
    name: "MacBook Air M3",
    category: "Төхөөрөмж",
    status: "Available",
    location: "Ulaanbaatar",
    icon: "monitor",
  },
  {
    id: "3",
    code: "MON-2024-002",
    name: 'LG 32" 4K Monitor',
    category: "Дэлгэц",
    status: "In Repair",
    location: "Ulaanbaatar",
    icon: "monitor",
  },
  {
    id: "4",
    code: "MAC-2023-015",
    name: 'iMac 24"',
    category: "Төхөөрөмж",
    status: "Pending Disposal",
    location: "Tokyo",
    icon: "monitor",
  },
  {
    id: "5",
    code: "PER-2024-002",
    name: "Logitech MX Master 3",
    category: "Дагалдах",
    status: "Assigned",
    location: "Tokyo",
    assignedTo: { name: "Sarah Johnson", department: "Human Resources" },
    icon: "peripheral",
  },
  {
    id: "6",
    code: "MON-2024-003",
    name: 'Samsung 34" Curved',
    category: "Дэлгэц",
    status: "Available",
    location: "Ulaanbaatar",
    icon: "monitor",
  },
]

const statusStyles: Record<Status, string> = {
  Assigned: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "In Repair": "bg-amber-50 text-amber-700 border-amber-200",
  "Pending Disposal": "bg-red-50 text-red-700 border-red-200",
}

const statusDot: Record<Status, string> = {
  Assigned: "bg-emerald-500",
  Available: "bg-emerald-500",
  "In Repair": "bg-amber-500",
  "Pending Disposal": "bg-red-500",
}

const statusLabel: Record<Status, string> = {
  Assigned: "Хуваарилсан",
  Available: "Бэлэн",
  "In Repair": "Засварт",
  "Pending Disposal": "Устгал хүлээж буй",
}

export function AssetsTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="assets" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="assets">Эд хөрөнгө</TabsTrigger>
              <TabsTrigger value="audit-trail">Аудитын мөр</TabsTrigger>
              <TabsTrigger value="qr-scanner">QR уншигч</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Шүүх
            </Button>
          </div>

          <TabsContent value="assets" className="mt-4">
            <div className="rounded-lg border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Эд хөрөнгө</TableHead>
                    <TableHead>Ангилал</TableHead>
                    <TableHead>Төлөв</TableHead>
                    <TableHead>Байршил</TableHead>
                    <TableHead>Хариуцагч</TableHead>
                    <TableHead className="w-12">Үйлдэл</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <button className="text-muted-foreground hover:text-foreground">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                            {asset.icon === "monitor" ? (
                              <Monitor className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Headphones className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{asset.code}</p>
                            <p className="text-sm text-muted-foreground">{asset.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{asset.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`gap-1.5 ${statusStyles[asset.status]}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[asset.status]}`} />
                          {statusLabel[asset.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          {asset.location}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {asset.assignedTo ? (
                          <div>
                            <p className="font-medium text-foreground">{asset.assignedTo.name}</p>
                            <p className="text-sm text-muted-foreground">{asset.assignedTo.department}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Дэлгэрэнгүй</DropdownMenuItem>
                            <DropdownMenuItem>Засах</DropdownMenuItem>
                            <DropdownMenuItem>Хуваарилах</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
