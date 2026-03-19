"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GetLocationsDocument } from "@/gql/graphql";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LocationNode = {
  id: string;
  name: string;
  parentId?: string | null;
  type: string;
};

export interface LocationPickerProps {
  /**
   * Бүрэн зам:
   * жишээ нь: "Гурван гол / Оффис / Заал / 3 давхар заал"
   */
  value?: string;
  onChange: (fullPath: string | undefined) => void;
  label?: string;
}

export function LocationPicker({
  value,
  onChange,
  label = "Байршил сонгох",
}: LocationPickerProps) {
  const { data } = useQuery(GetLocationsDocument);

  const locations = (data?.locations ?? []) as LocationNode[];

  const branches = useMemo(
    () => locations.filter((l) => l.type === "branch"),
    [locations],
  );

  const byParent = useMemo(() => {
    const map = new Map<string | null, LocationNode[]>();
    locations.forEach((loc) => {
      const key = loc.parentId ?? null;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(loc);
    });
    return map;
  }, [locations]);

  const uniqueByName = (items: LocationNode[]) => {
    const seen = new Set<string>();
    return items.filter((item) => {
      const key = item.name.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const [branchId, setBranchId] = useState<string>("");
  const [roomTypeId, setRoomTypeId] = useState<string>("");
  const [detailId, setDetailId] = useState<string>("");

  const roomTypes = useMemo(() => {
    if (!branchId) return [] as LocationNode[];
    return uniqueByName(
      (byParent.get(branchId) ?? []).filter((l) => l.type === "roomType"),
    );
  }, [branchId, byParent]);

  const sections = useMemo(() => {
    if (!roomTypeId) return [] as LocationNode[];
    return uniqueByName(
      (byParent.get(roomTypeId) ?? []).filter((l) => l.type === "section"),
    );
  }, [roomTypeId, byParent]);

  const details = useMemo(() => {
    if (!roomTypeId) return [] as LocationNode[];

    if (sections.length > 0) {
      return sections;
    }

    return uniqueByName(
      (byParent.get(roomTypeId) ?? []).filter((l) => l.type === "room"),
    );
  }, [roomTypeId, sections, byParent]);

  const handleChange = (
    nextBranchId: string,
    nextRoomTypeId: string,
    nextDetailId: string,
  ) => {
    const branchName =
      branches.find((b) => b.id === nextBranchId)?.name ?? undefined;
    const roomTypeName =
      (byParent.get(nextBranchId) ?? []).find(
        (l) => l.id === nextRoomTypeId,
      )?.name ?? undefined;
    const sectionName =
      (byParent.get(nextRoomTypeId) ?? []).find(
        (l) => l.id === nextDetailId,
      )?.name ?? undefined;

    const parts = [branchName, roomTypeName, sectionName]
      .filter((p) => !!p && String(p).trim().length > 0)
      .map((p) => String(p).trim());

    const fullPath = parts.length > 0 ? parts.join(" / ") : undefined;
    onChange(fullPath);
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Select
          value={branchId || undefined}
          onValueChange={(val) => {
            setBranchId(val);
            setRoomTypeId("");
            setDetailId("");
            handleChange(val, "", "");
          }}
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Салбар" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={roomTypeId || undefined}
          onValueChange={(val) => {
            setRoomTypeId(val);
            setDetailId("");
            handleChange(branchId, val, "");
          }}
          disabled={!branchId || roomTypes.length === 0}
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Оффис / Анги" />
          </SelectTrigger>
          <SelectContent>
            {roomTypes.map((rt) => (
              <SelectItem key={rt.id} value={rt.id}>
                {rt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={detailId || undefined}
          onValueChange={(val) => {
            setDetailId(val);
            handleChange(branchId, roomTypeId, val);
          }}
          disabled={!roomTypeId || details.length === 0}
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Хэсэг / Заал" />
          </SelectTrigger>
          <SelectContent>
            {details.map((detail) => (
              <SelectItem key={detail.id} value={detail.id}>
                {detail.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {value && (
        <p className="text-xs text-muted-foreground">
          Сонгосон: <span className="font-medium">{value}</span>
        </p>
      )}
    </div>
  );
}
