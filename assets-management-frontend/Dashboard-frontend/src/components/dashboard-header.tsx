"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BellDot, MapPin, Package, Search, UserIcon } from "lucide-react";
import { useQuery } from "@apollo/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AssetFieldsFragmentDoc,
  EmployeesDocument,
  GetAssetsDocument,
} from "@/gql/graphql";
import { useFragment } from "@/gql";

const RESULT_LIMIT = 6;

function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function DashboardHeader() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data: assetsData } = useQuery(GetAssetsDocument);
  const { data: employeesData } = useQuery(EmployeesDocument);

  const assets = useMemo(() => {
    return (assetsData?.assets ?? [])
      .map((asset) => useFragment(AssetFieldsFragmentDoc, asset))
      .filter(Boolean);
  }, [assetsData]);

  const employees = employeesData?.employees ?? [];

  const trimmedQuery = query.trim().toLowerCase();

  const matchedAssets = useMemo(() => {
    if (!trimmedQuery) return [];
    return assets
      .filter((asset) => {
        const haystack = [
          asset.id,
          asset.assetTag,
          asset.serialNumber,
          asset.category,
          asset.locationPath,
          asset.status,
          asset.assignedTo,
          asset.notes,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(trimmedQuery);
      })
      .slice(0, RESULT_LIMIT);
  }, [assets, trimmedQuery]);

  const matchedEmployees = useMemo(() => {
    if (!trimmedQuery) return [];
    return employees
      .filter((employee) => {
        const haystack = [
          employee.firstName,
          employee.lastName,
          employee.email,
          employee.department,
          employee.branch,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(trimmedQuery);
      })
      .slice(0, RESULT_LIMIT);
  }, [employees, trimmedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-6">
      <div className="flex min-w-0 items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
            <Package className="h-4 w-4 text-gray-900" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            AssetHub
          </span>
        </div>

        <div className="hidden px-2 md:block pl-32.25">
          <div className="relative" ref={containerRef}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Хөрөнгө, ажилтан хайх.."
              className="h-9 w-[420px] bg-muted/50 pl-9 text-sm lg:w-[520px]"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (!isOpen) setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setIsOpen(false);
                }
              }}
            />

            {isOpen && trimmedQuery.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[420px] overflow-auto rounded-2xl border border-border/70 bg-white p-3 shadow-lg">
                {matchedAssets.length === 0 && matchedEmployees.length === 0 ? (
                  <p className="px-2 py-4 text-sm text-muted-foreground">
                    Тохирох үр дүн олдсонгүй.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {matchedAssets.length > 0 && (
                      <div>
                        <p className="px-2 text-xs font-semibold text-muted-foreground">
                          Хөрөнгө
                        </p>
                        <div className="mt-2 grid gap-3">
                          {matchedAssets.map((asset) => (
                            <div
                              key={asset.id}
                              className="flex items-center gap-4 rounded-2xl border border-border/70 bg-white px-4 py-3 shadow-sm transition hover:border-foreground/30 hover:bg-muted/10"
                            >
                              <div className="h-12 w-14 overflow-hidden rounded-lg border border-border bg-white">
                                <img
                                  src={
                                    asset.imageUrl ||
                                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='48' viewBox='0 0 64 48'><rect width='64' height='48' fill='%23e2e8f0'/><path d='M14 32h36v4H14zM18 14h28v14H18z' fill='%2394a3b8'/></svg>"
                                  }
                                  alt={asset.assetTag || "Asset"}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="truncate text-sm font-semibold text-foreground">
                                    {asset.assetTag}
                                  </p>
                                  {asset.category && (
                                    <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                                      {asset.category}
                                    </span>
                                  )}
                                </div>
                                <p className="truncate text-xs text-muted-foreground">
                                  {asset.serialNumber || "Serial байхгүй"}
                                </p>
                                <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">
                                    {asset.locationPath || asset.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {matchedEmployees.length > 0 && (
                      <div>
                        <p className="px-2 text-xs font-semibold text-muted-foreground">
                          Ажилтан
                        </p>
                        <div className="mt-2 grid gap-3">
                          {matchedEmployees.map((employee) => {
                            const fullName =
                              `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();
                            return (
                              <div
                                key={employee.id}
                                className="flex items-center gap-4 rounded-2xl border border-border/70 bg-white px-4 py-3 shadow-sm transition hover:border-foreground/30 hover:bg-muted/10"
                              >
                                <Avatar className="h-12 w-12 border border-border">
                                  <AvatarImage
                                    src={employee.imageUrl || undefined}
                                    alt={fullName || "Employee"}
                                  />
                                  <AvatarFallback>
                                    {getInitials(
                                      fullName || employee.email || "?",
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-semibold text-foreground">
                                    {fullName || employee.email}
                                  </p>
                                  <p className="truncate text-xs text-muted-foreground">
                                    {employee.email}
                                  </p>
                                  <p className="truncate text-[11px] text-muted-foreground">
                                    {employee.department || "Алба тодорхойгүй"}
                                  </p>
                                </div>
                                {employee.branch && (
                                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                                    {employee.branch}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <BellDot />
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <UserIcon />
        </Button>
        <img src={"2SVG.svg"} alt="" />
      </div>
    </header>
  );
}
