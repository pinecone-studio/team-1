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
  GetLocationsDocument,
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

/** UUID эсэхийг шалгана — legend-д ID хэзээ ч гаргахгүй */
function looksLikeUuid(s: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    s.trim(),
  );
}

type Mode = "location" | "category" | "subcategory";

/** Байршлын ID → нэр (ижил нэртэй олон байршил нэг slice болно) */
type LocationIdToNameMap = Map<string, string>;

/** Category ID → эцэг категорийн нэр (category mode-д) */
type CategoryParentMap = Map<string, string>;

export function AssetDistributionChart() {
  const { data: assetsData, loading } = useQuery(GetAssetsDocument);
  const { data: categoriesData } = useQuery(CategoriesDocument);
  const { data: locationsData } = useQuery(GetLocationsDocument);

  const [mode, setMode] = useState<Mode>("subcategory");

  /* locationId → name (ID шиг нэртэйг харуулахгүй) */
  const locationIdToName: LocationIdToNameMap = useMemo(() => {
    const map = new Map<string, string>();
    const list = locationsData?.locations ?? [];
    list.forEach((loc) => {
      const l = loc as { id: string; name: string };
      if (l.name && !looksLikeUuid(l.name)) map.set(l.id, l.name);
    });
    return map;
  }, [locationsData?.locations]);

  /* subcategory id → parent category name (category mode-д нэрээр бүлэглэнэ) */
  const parentMap: CategoryParentMap = useMemo(() => {
    const result = new Map<string, string>();
    const raw = categoriesData?.categories ?? [];

    const allCats: {
      id: string;
      name: string;
      parentId?: string | null;
      subcategories?: Array<{
        id: string;
        name: string;
        parentId?: string | null;
      }>;
    }[] = Array.isArray(raw) ? raw : [];

    const idToName = new Map<string, string>();
    const withParent = new Map<string, string>();

    allCats.forEach((c) => {
      idToName.set(c.id, c.name);
      if (c.parentId) withParent.set(c.id, c.parentId);
      (c.subcategories ?? []).forEach(
        (s: { id: string; name: string; parentId?: string | null }) => {
          idToName.set(s.id, s.name);
          if (s.parentId) withParent.set(s.id, s.parentId);
        },
      );
    });

    withParent.forEach((parentId, id) => {
      result.set(id, idToName.get(parentId) ?? "Бусад");
    });
    return result;
  }, [categoriesData]);

  const chartData = useMemo(() => {
    const assets = assetsData?.assets ?? [];
    const counts = new Map<string, number>();

    assets.forEach((a) => {
      const asset = useFragment(AssetFieldsFragmentDoc, a);

      let key = "Бусад";

      if (mode === "location") {
        const locId = asset.locationId;
        const resolved = locId ? locationIdToName.get(locId) : null;
        const path =
          typeof (asset as { locationPath?: string | null }).locationPath ===
          "string"
            ? (asset as { locationPath: string }).locationPath
            : null;
        if (locId && resolved) {
          key = resolved;
        } else if (path && !looksLikeUuid(path)) {
          key = path;
        } else {
          key = "Тодорхойгүй";
        }
      }

      if (mode === "subcategory") {
        key = asset.category ?? "Бусад";
      }

      if (mode === "category") {
        key = parentMap.get(asset.category ?? "") ?? "Бусад";
      }

      counts.set(key, (counts.get(key) ?? 0) + 1);
    });

    let entries = Array.from(counts.entries()).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    }));

    /* ID эсвэл Тодорхойгүй байвал chart/legend-д харуулахгүй */
    entries = entries.filter(
      (e) => e.name !== "Тодорхойгүй" && !looksLikeUuid(e.name),
    );

    return entries;
  }, [assetsData?.assets, locationIdToName, parentMap, mode]);

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
          ) : mode === "location" &&
            (!locationsData?.locations ||
              locationsData.locations.length === 0) ? (
            <div className="w-full text-center text-sm text-muted-foreground">
              Байршлын өгөгдөл ачааллагаж байна...
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
