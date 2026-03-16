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

  const [branchId, setBranchId] = useState<string>("");
  const [roomTypeId, setRoomTypeId] = useState<string>("");
  const [sectionId, setSectionId] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  const roomTypes = useMemo(() => {
    if (!branchId) return [] as LocationNode[];
    return (byParent.get(branchId) ?? []).filter((l) => l.type === "roomType");
  }, [branchId, byParent]);

  const sections = useMemo(() => {
    if (!roomTypeId) return [] as LocationNode[];
    return (byParent.get(roomTypeId) ?? []).filter((l) => l.type === "section");
  }, [roomTypeId, byParent]);

  const rooms = useMemo(() => {
    const parent = sectionId || roomTypeId || branchId || null;
    if (!parent) return [] as LocationNode[];
    return (byParent.get(parent) ?? []).filter((l) => l.type === "room");
  }, [branchId, roomTypeId, sectionId, byParent]);

  const handleChange = (
    nextBranchId: string,
    nextRoomTypeId: string,
    nextSectionId: string,
    nextRoomId: string,
  ) => {
    const branchName =
      branches.find((b) => b.id === nextBranchId)?.name ?? undefined;
    const roomTypeName =
      (byParent.get(nextBranchId) ?? []).find(
        (l) => l.id === nextRoomTypeId,
      )?.name ?? undefined;
    const sectionName =
      (byParent.get(nextRoomTypeId) ?? []).find(
        (l) => l.id === nextSectionId,
      )?.name ?? undefined;
    const roomName =
      (byParent.get(nextSectionId || nextRoomTypeId || nextBranchId || null) ??
        []
      ).find((l) => l.id === nextRoomId)?.name ?? undefined;

    const parts = [branchName, roomTypeName, sectionName, roomName]
      .filter((p) => !!p && String(p).trim().length > 0)
      .map((p) => String(p).trim());

    const fullPath = parts.length > 0 ? parts.join(" / ") : undefined;
    onChange(fullPath);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
        <Select
          value={branchId || undefined}
          onValueChange={(val) => {
            setBranchId(val);
            setRoomTypeId("");
            setSectionId("");
            setRoomId("");
            handleChange(val, "", "", "");
          }}
        >
          <SelectTrigger>
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
            setSectionId("");
            setRoomId("");
            handleChange(branchId, val, "", "");
          }}
          disabled={!branchId || roomTypes.length === 0}
        >
          <SelectTrigger>
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
          value={sectionId || undefined}
          onValueChange={(val) => {
            setSectionId(val);
            setRoomId("");
            handleChange(branchId, roomTypeId, val, "");
          }}
          disabled={!roomTypeId || sections.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Хэсэг / Заал" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((sec) => (
              <SelectItem key={sec.id} value={sec.id}>
                {sec.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={roomId || undefined}
          onValueChange={(val) => {
            setRoomId(val);
            handleChange(branchId, roomTypeId, sectionId, val);
          }}
          disabled={!branchId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Өрөө / дугаар" />
          </SelectTrigger>
          <SelectContent>
            {rooms.map((room) => (
              <SelectItem key={room.id} value={room.id}>
                {room.name}
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

