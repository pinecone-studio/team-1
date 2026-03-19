"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  Package,
  Wrench,
  UserCheck,
  ChevronRight,
  PackageX,
  PackageCheck,
} from "lucide-react";
import Link from "next/link";
import { GetAssetKpisDocument, GetAssetsDocument } from "@/gql/graphql";

const formatMoney = (value: number) =>
  `${new Intl.NumberFormat("mn-MN").format(value)}₮`;

const STATUS_LABELS: Record<string, string> = {
  ASSIGNED: "Баталгаажсан",
  AVAILABLE: "Эзэмшигчгүй",
  FOR_SALE: "Зарж болох",
  DAMAGED: "Эвдрэлтэй",
  IN_REPAIR: "Засаж байгаа",
};

function formatDate(ts: number | null | undefined) {
  if (ts == null || Number.isNaN(ts)) return "—";
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

const KPI_CONFIG = [
  {
    key: "total" as const,
    title: "Нийт хөрөнгө",
    icon: Package,
    iconBg: "bg-sky-50 border-sky-300",
    iconColor: "text-sky-600",
    barColor: "bg-sky-500",
  },
  {
    key: "assigned" as const,
    title: "Баталгаажсан",
    icon: PackageCheck as unknown as typeof Package,
    iconBg: "bg-emerald-50 border-emerald-300",
    iconColor: "text-emerald-600",
    barColor: "bg-emerald-500",
  },
  {
    key: "unassigned" as const,
    title: "Хүлээгдэгдэж буй",
    icon: Clock,
    iconBg: "bg-amber-50 border-amber-300",
    iconColor: "text-amber-600",
    barColor: "bg-amber-500",
  },
  {
    key: "forSale" as const,
    title: "Эвдрэлтэй",
    icon: Wrench,
    iconBg: "bg-yellow-50 border-yellow-300",
    iconColor: "text-yellow-600",
    barColor: "bg-yellow-500",
  },
  {
    key: "broken" as const,
    title: "Баталгаажаагүй",
    icon: PackageX,
    iconBg: "bg-orange-50 border-orange-300",
    iconColor: "text-orange-600",
    barColor: "bg-orange-500",
  },
];

export function QRCensusContent() {
  const [censusStarted, setCensusStarted] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [censusName, setCensusName] = useState("");
  const [scope, setScope] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");

  const { data: kpiData, loading: kpiLoading } = useQuery(
    GetAssetKpisDocument,
    { fetchPolicy: "cache-and-network" },
  );
  const { data: assetsData, loading: assetsLoading } = useQuery(
    GetAssetsDocument,
    { fetchPolicy: "cache-and-network" },
  );

  const kpis = kpiData?.assetKpis;
  const totalCount = kpis?.totalCount ?? 0;
  const totalValue = kpis?.totalValue ?? 0;

  const kpiCards = [
    {
      ...KPI_CONFIG[0],
      value: totalValue,
      count: totalCount,
    },
    {
      ...KPI_CONFIG[1],
      value: kpis?.assignedValue ?? 0,
      count: kpis?.assignedCount ?? 0,
    },
    {
      ...KPI_CONFIG[2],
      value: kpis?.unassignedValue ?? 0,
      count: kpis?.unassignedCount ?? 0,
    },
    {
      ...KPI_CONFIG[3],
      value: kpis?.forSaleValue ?? 0,
      count: kpis?.forSaleCount ?? 0,
    },
    {
      ...KPI_CONFIG[4],
      value: kpis?.brokenValue ?? 0,
      count: kpis?.brokenCount ?? 0,
    },
  ];

  const verifiedCount =
    (kpis?.assignedCount ?? 0) +
    (kpis?.unassignedCount ?? 0) +
    (kpis?.forSaleCount ?? 0) +
    (kpis?.brokenCount ?? 0);
  const confirmedCount = kpis?.assignedCount ?? 0;
  const pendingCount = (kpis?.unassignedCount ?? 0) + (kpis?.forSaleCount ?? 0);
  const unverifiedCount = kpis?.brokenCount ?? 0;
  const progressPercent =
    totalCount > 0 ? Math.round((verifiedCount / totalCount) * 100) : 0;

  const assets = (assetsData?.assets ?? []) as Array<{
    id: string;
    assetTag: string;
    category?: string | null;
    status?: string | null;
    updatedAt?: number | null;
  }>;
  const recentAssets = assets.slice(0, 10);

  const loading = kpiLoading || assetsLoading;

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-[#f5f7fb] p-5 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[36px] font-semibold leading-none text-slate-900">
            Эд хөрөнгийн тооллого
          </h1>
          <p className="mt-5 text-2xl font-semibold text-slate-900">
            {censusName || "1-р улирлын тооллого"}
          </p>
          <p className="mt-1 text-base text-slate-600">
            Байршил: Гурван гол оффис
          </p>
        </div>
        <div className="flex flex-col items-end gap-3 pt-0.5">
          {censusStarted ? (
            <>
              <Button className="h-10 gap-2 rounded-lg bg-[#0b5f8a] px-5 text-[15px] font-medium text-white hover:bg-[#0a5278]">
                Тооллого дуусгах
              </Button>
              <p className="text-sm text-slate-500">
                Эхэлсэн огноо:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            </>
          ) : (
            <Button
              className="h-10 gap-2 rounded-lg bg-[#0b5f8a] px-5 text-[15px] font-medium text-white hover:bg-[#0a5278]"
              onClick={() => setIsStartOpen(true)}
            >
              <span className="text-lg leading-none">+</span>
              Тооллого эхлүүлэх
            </Button>
          )}
        </div>
      </div>

      {/* KPI cards */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          const progress =
            kpi.key === "total"
              ? 100
              : totalCount > 0
                ? Math.min(100, Math.round((kpi.count / totalCount) * 100))
                : 0;
          return (
            <Card
              key={kpi.title}
              className="rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
            >
              <CardContent className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {kpi.title}
                    </p>
                    <p className="mt-2 text-[18px] font-semibold leading-none text-slate-900">
                      {loading ? "—" : formatMoney(kpi.value)}
                    </p>
                  </div>
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${kpi.iconColor} ${kpi.iconBg}`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${kpi.iconColor}`} />
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm text-slate-500">
                    {loading ? "—" : `${kpi.count}ш`}
                  </p>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-[#168ac2]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Тооллогын явц */}
      <Card className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
        <CardContent className="space-y-5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-slate-900">
              Тооллогын явц
            </p>
            <span className="rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              Идэвхтэй
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-end text-sm text-slate-600">
              <span>{loading ? "—" : `${progressPercent}%`}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#168ac2] transition-[width]"
                style={{
                  width: loading ? "0%" : `${progressPercent}%`,
                }}
              />
            </div>
            <div className="flex flex-wrap gap-5 pt-1 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Баталгаажсан: {loading ? "—" : confirmedCount}
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Хүлээгдэж буй: {loading ? "—" : pendingCount}
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                Баталгаажаагүй: {loading ? "—" : unverifiedCount}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Сүүлд шинэчлэгдсэн хөрөнгүүд */}
      <Card className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xl font-semibold text-slate-900">
              Сүүлд баталгаажсан хөрөнгүүд
            </p>
            <Link
              href="/qr"
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-800"
            >
              Бүгдийг үзэх
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="rounded-xl bg-slate-50 text-slate-600">
                <tr>
                  <th className="rounded-l-lg px-3 py-2 font-medium">№</th>
                  <th className="px-3 py-2 font-medium">Ангилал</th>
                  <th className="px-3 py-2 font-medium">Хөрөнгийн ID</th>
                  <th className="px-3 py-2 font-medium">Төлөв</th>
                  <th className="rounded-r-lg px-3 py-2 font-medium">
                    Баталгаажсан огноо
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-900">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500">
                      Уншиж байна...
                    </td>
                  </tr>
                ) : recentAssets.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500">
                      Хөрөнгө олдсонгүй
                    </td>
                  </tr>
                ) : (
                  recentAssets.map((asset, idx) => (
                    <tr
                      key={asset.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-3 py-3">{idx + 1}</td>
                      <td className="px-3 py-3 font-medium">
                        {asset.category ?? "—"}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {asset.assetTag}
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          {STATUS_LABELS[asset.status ?? ""] ??
                            asset.status ??
                            "—"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {formatDate(asset.updatedAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isStartOpen} onOpenChange={setIsStartOpen}>
        <DialogContent className="max-w-xl rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-foreground">
              Тооллого эхлүүлэх
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Тооллогын нэрийг оруулна уу
              </label>
              <input
                placeholder="1-р улирлын тооллого"
                value={censusName}
                onChange={(e) => setCensusName(e.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-slate-50 px-4 text-base outline-none focus:border-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Цар хүрээ сонгох
              </label>
              <select
                value={scope}
                onChange={(e) => {
                  setScope(e.target.value);
                  setDepartment("");
                  setCategory("");
                }}
                className="h-12 w-full appearance-none rounded-xl border border-border bg-slate-50 px-4 text-base outline-none focus:border-slate-400"
              >
                <option value="">Сонгоно уу</option>
                <option value="org">Байгууллага бүхэлдээ</option>
                <option value="department">Алба хэлтэсээр</option>
                <option value="category">Ангиллаар</option>
              </select>
            </div>

            {scope === "department" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Алба хэлтэс сонгох
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-border bg-slate-50 px-4 text-base outline-none focus:border-slate-400"
                >
                  <option value="">Сонгоно уу</option>
                  <option value="marketing">Маркетингийн алба</option>
                  <option value="finance">Санхүүгийн алба</option>
                  <option value="training">Сургалтын алба</option>
                </select>
              </div>
            )}

            {scope === "category" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Ангилал сонгох
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-border bg-slate-50 px-4 text-base outline-none focus:border-slate-400"
                >
                  <option value="">Сонгоно уу</option>
                  <option value="it-equipment">IT тоног төхөөрөмж</option>
                  <option value="furniture">Тавилга</option>
                  <option value="appliances">Цахилгаан хэрэгсэл</option>
                </select>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                className="h-11 px-6"
                onClick={() => setIsStartOpen(false)}
              >
                Цуцлах
              </Button>
              <Button
                className="h-11 rounded-lg bg-blue-600 px-6 font-medium text-white hover:bg-blue-700"
                onClick={() => {
                  setCensusStarted(true);
                  setIsStartOpen(false);
                }}
              >
                Тооллого эхлүүлэх
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
