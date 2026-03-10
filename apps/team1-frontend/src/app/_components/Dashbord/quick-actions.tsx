"use client"

import Link from "next/link"


import { PlusCircle, UserCheck, QrCode, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"



const actions = [
  {
    label: "Эд хөрөнгө бүртгэх",
    href: "/assets/register",
    icon: PlusCircle,
    description: "Шинэ эд хөрөнгө бүртгэнэ",
  },
  {
    label: "Эд хөрөнгө хуваарилах",
    href: "/assignment",
    icon: UserCheck,
    description: "Ажилтанд эд хөрөнгө оноох",
  },
  {
    label: "Тооллого эхлүүлэх",
    href: "/census",
    icon: QrCode,
    description: "Эд хөрөнгийн баталгаажуулалт эхлүүлэх",
  },
  {
    label: "Тайлан гаргах",
    href: "/reports",
    icon: FileText,
    description: "Захиалгат тайлан үүсгэх",
  },
]

export function QuickActions() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Шуурхай үйлдлүүд</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action) => (
          <Link key={action.label} href={action.href}>
            <Button
              variant="secondary"
              className="w-full justify-start gap-3 h-auto py-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <action.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
