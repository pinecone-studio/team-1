"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  GetAssetsDocument,
  CategoriesDocument,
  AssetFieldsFragmentDoc,
} from "@/gql/graphql";

import { useFragment } from "@/gql/fragment-masking";

import colors from "tailwindcss/colors";
import { Grid2X2, LayoutGrid, MapPin } from "lucide-react";

const shades = [800, 700, 600, 500, 400, 300] as const;
const palettes = ["sky", "green", "amber", "orange", "yellow", "red"] as const;

const BASE_COLORS = [
  ...palettes.flatMap((name) => shades.map((shade) => colors[name][shade])),
];

const COLORS = Array.from(
  { length: 50 },
  (_, i) => BASE_COLORS[i % BASE_COLORS.length],
);

type Mode = "location" | "category" | "subcategory";

export function AssetDistributionChart() {
  const { data: assetsData, loading } = useQuery(GetAssetsDocument);
  const { data: categoriesData } = useQuery(CategoriesDocument);

  const [mode, setMode] = useState<Mode>("subcategory");

  /* category → parent category map */
  const parentMap = useMemo(() => {
    const map = new Map<string, string>();

    const categories =
      categoriesData?.categories ||
      categoriesData?.category ||
      categoriesData?.allCategories ||
      [];

    categories.forEach((c: any) => {
      if (c.parentId) {
        map.set(c.id, c.parentId);
      }
    });

    return map;
  }, [categoriesData]);

  const chartData = useMemo(() => {
    const assets = assetsData?.assets ?? [];
    const counts = new Map<string, number>();

    assets.forEach((a) => {
      const asset = useFragment(AssetFieldsFragmentDoc, a);

      let key = "Бусад";

      if (mode === "location") {
        key = asset.locationId ?? "Тодорхойгүй";
      }

      if (mode === "subcategory") {
        key = asset.category ?? "Бусад";
      }

      if (mode === "category") {
        key = parentMap.get(asset.category ?? "") ?? "Бусад";
      }

      counts.set(key, (counts.get(key) ?? 0) + 1);
    });

    return Array.from(counts.entries()).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    }));
  }, [assetsData?.assets, parentMap, mode]);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3 text-sm font-medium">
        <span>Хөрөнгийг</span>

        <Select value={mode} onValueChange={(v) => setMode(v as Mode)}>
          <SelectTrigger className="h-8 w-44 text-sm">
            <SelectValue />
          </SelectTrigger>

          <SelectContent side="bottom">
            <SelectItem value="location">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Байршлаар
              </div>
            </SelectItem>

            <SelectItem value="category">
              <div className="flex items-center gap-2">
                <Grid2X2 className="w-4 h-4" />
                Ангиллаар
              </div>
            </SelectItem>

            <SelectItem value="subcategory">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                Дэд ангиллаар
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <div className="h-65 flex items-center">
          {loading ? (
            <div className="w-full text-center text-sm text-muted-foreground">
              Уншиж байна...
            </div>
          ) : (
            <>
              {/* DONUT */}
              <div className="w-1/2 h-full pr-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* LEGEND */}
              <div className="w-1/2 grid grid-cols-2 gap-x-8 gap-y-3 max-h-55 overflow-y-auto">
                {chartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
