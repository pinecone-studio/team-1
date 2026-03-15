"use client";

import { cn } from "@/lib/utils";

const LOCATION_ROOM_OPTIONS: Record<string, string[]> = {
  Анги: ["301", "302", "303", "304"],
  Оффис: [
    "Ариун цэврийн өрөө",
    "3 давхрын заал",
    "4 давхрын заал",
    "Гал тогоо",
    "Хурлын өрөө",
  ],
  Агуулах: ["3-н давхар", "4-н давхар"],
};

interface LocationFilterProps {
  assetLocation: string;
  assetLocationType: string;
  assetRoomNumber: string;
  hoveredLocation: string | null;
  hoveredType: string | null;
  hoveredRoom: string | null;
  onLocationChange: (location: string) => void;
  onTypeChange: (type: string) => void;
  onRoomChange: (room: string) => void;
  onHoverLocation: (location: string | null) => void;
  onHoverType: (type: string | null) => void;
  onHoverRoom: (room: string | null) => void;
  onReset: () => void;
}

const LOCATIONS = [
  "Гурван гол",
  "Сиэтл оффис",
  "Гэгээ нарны зам",
  "Гэгээ яармаг",
];
const TYPES = ["Оффис", "Агуулах", "Анги"];

export function LocationFilter({
  assetLocation,
  assetLocationType,
  assetRoomNumber,
  hoveredLocation,
  hoveredType,
  hoveredRoom,
  onLocationChange,
  onTypeChange,
  onRoomChange,
  onHoverLocation,
  onHoverType,
  onHoverRoom,
  onReset,
}: LocationFilterProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">
        Байршлаар шүүх
      </p>
      <div
        className="relative rounded-xl border border-border bg-muted/20 p-2"
        onMouseLeave={() => {
          onHoverLocation(null);
          onHoverType(null);
          onHoverRoom(null);
        }}
      >
        {/* Selected Filter Tags */}
        <div className="mb-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onReset}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium",
              assetLocation === "all"
                ? "border-foreground bg-white text-foreground"
                : "border-border bg-white text-muted-foreground",
            )}
          >
            Бүгд
          </button>
          {assetLocation !== "all" && (
            <span className="rounded-full border border-border bg-white px-3 py-1 text-xs text-foreground">
              {assetLocation}
              {assetLocationType !== "all" ? ` · ${assetLocationType}` : ""}
              {assetRoomNumber !== "all" ? ` · ${assetRoomNumber}` : ""}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {/* Locations */}
          <div className="w-full space-y-1 rounded-lg bg-white p-2">
            {LOCATIONS.map((location) => (
              <button
                key={location}
                type="button"
                onMouseEnter={() => {
                  onHoverLocation(location);
                  onHoverType(null);
                  onHoverRoom(null);
                }}
                onClick={() => {
                  onLocationChange(location);
                  onTypeChange("all");
                  onRoomChange("all");
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition hover:bg-muted/50",
                  assetLocation === location
                    ? "bg-muted/40 font-semibold text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {location}
                <span className="text-[10px] text-muted-foreground">→</span>
              </button>
            ))}
          </div>

          {/* Types */}
          {hoveredLocation && (
            <div className="w-full space-y-1 rounded-lg bg-white p-2">
              {TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onMouseEnter={() => onHoverType(type)}
                  onClick={() => {
                    onLocationChange(hoveredLocation);
                    onTypeChange(type);
                    onRoomChange("all");
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition hover:bg-muted/50",
                    assetLocationType === type &&
                      assetLocation === hoveredLocation
                      ? "bg-muted/40 font-semibold text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {type}
                  {LOCATION_ROOM_OPTIONS[type] && (
                    <span className="text-[10px] text-muted-foreground">→</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Rooms */}
          {hoveredLocation &&
            hoveredType &&
            LOCATION_ROOM_OPTIONS[hoveredType] && (
              <div className="w-full space-y-1 rounded-lg bg-white p-2">
                {LOCATION_ROOM_OPTIONS[hoveredType].map((room) => (
                  <button
                    key={room}
                    type="button"
                    onMouseEnter={() => onHoverRoom(room)}
                    onClick={() => {
                      onLocationChange(hoveredLocation);
                      onTypeChange(hoveredType);
                      onRoomChange(room);
                    }}
                    className={cn(
                      "flex w-full items-center rounded-md px-3 py-2 text-left text-xs transition hover:bg-muted/50",
                      assetRoomNumber === room &&
                        assetLocationType === "Анги" &&
                        assetLocation === hoveredLocation
                        ? "bg-muted/40 font-semibold text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {room}
                  </button>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
