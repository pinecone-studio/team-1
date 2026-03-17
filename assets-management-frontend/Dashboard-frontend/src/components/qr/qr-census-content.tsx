"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, Check, Clock, X } from "lucide-react";

export function QRCensusContent() {
  return (
    <div className="flex min-h-0 flex-1 flex-col p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">
          Хөрөнгийн тооллого
        </h1>
        <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          <span className="text-lg leading-none">+</span>
          Тооллого эхлүүлэх
        </Button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-white">
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Нийт хөрөнгө</span>
              <span className="rounded-md bg-slate-700 px-2.5 py-1.5 text-xs text-white">
                <Box className="h-4 w-4" />
              </span>
            </div>
            <p className="text-2xl font-semibold text-foreground">1,247</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-white">
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Баталгаажсан</span>
              <span className="rounded-md bg-emerald-100 px-2.5 py-1.5 text-xs text-emerald-700">
                <Check className="h-4 w-4" />
              </span>
            </div>
            <p className="text-2xl font-semibold text-foreground">972</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-white">
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Хүлээгдэж буй</span>
              <span className="rounded-md bg-amber-100 px-2.5 py-1.5 text-xs text-amber-700">
                <Clock className="h-4 w-4" />
              </span>
            </div>
            <p className="text-2xl font-semibold text-foreground">260</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-white">
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Баталгаажаагүй</span>
              <span className="rounded-md bg-rose-100 px-2.5 py-1.5 text-xs text-rose-700">
                <X className="h-4 w-4" />
              </span>
            </div>
            <p className="text-2xl font-semibold text-foreground">15</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4 border-border bg-white">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Тооллогын явц
              </p>
              <p className="text-xs text-muted-foreground">
                Эхэлсэн огноо: 3/1/2024 · Company-wide census
              </p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Идэвхтэй
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Verification Progress</span>
              <span>78%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className="h-2 w-[78%] rounded-full bg-slate-700" />
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Баталгаажсан: 972
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Хүлээгдэж буй: 260
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Баталгаажаагүй: 15
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 border-border bg-white">
        <CardContent className="space-y-4 p-5">
          <p className="text-sm font-semibold text-foreground">
            Сүүлийн баталгаажуулалт
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-2 font-medium">Ажилтан</th>
                  <th className="py-2 font-medium">Хөрөнгийн ID</th>
                  <th className="py-2 font-medium">Арга</th>
                  <th className="py-2 font-medium">Хөрөнгийн төлөв</th>
                  <th className="py-2 font-medium">Төлөв</th>
                  <th className="py-2 font-medium">Баталгаажуулсан</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground">Батaa</td>
                  <td className="py-2">ASDFGH</td>
                  <td className="py-2">QR Scan</td>
                  <td className="py-2">
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      Хэвийн
                    </span>
                  </td>
                  <td className="py-2">
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      Баталгаажсан
                    </span>
                  </td>
                  <td className="py-2">3/5/2024, 10:30:00</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground">Амар</td>
                  <td className="py-2">ASDFGHJ</td>
                  <td className="py-2">-</td>
                  <td className="py-2">-</td>
                  <td className="py-2">
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                      Хүлээгдэж буй
                    </span>
                  </td>
                  <td className="py-2">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
