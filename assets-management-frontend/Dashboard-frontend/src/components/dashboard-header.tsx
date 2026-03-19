"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BellDot, MapPin, Package, Search, UserIcon } from "lucide-react";
import { useQuery } from "@apollo/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AssetFieldsFragmentDoc,
  EmployeesDocument,
  GetAssetsDocument,
} from "@/gql/graphql";
import { useFragment } from "@/gql";

const EMPLOYEE_RESULT_LIMIT = 6;
const ASSET_RESULT_PREVIEW_LIMIT = 6;

const MONGOLIAN_CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a",
  б: "b",
  в: "w",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "j",
  з: "z",
  и: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  ө: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ү: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sh",
  ъ: "",
  ы: "i",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split("")
    .map((char) => MONGOLIAN_CYRILLIC_TO_LATIN[char] ?? char)
    .join("")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function normalizeSearchChunk(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split("")
    .map((char) => MONGOLIAN_CYRILLIC_TO_LATIN[char] ?? char)
    .join("")
    .replace(/[^a-z0-9\s]/g, " ");
}

function getHighlightRanges(value: string, query: string) {
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);

  if (terms.length === 0) return [];

  let normalizedValue = "";
  const normalizedIndexMap: number[] = [];

  for (const [index, char] of Array.from(value).entries()) {
    const normalizedChunk = normalizeSearchChunk(char);

    for (const normalizedChar of normalizedChunk) {
      normalizedValue += normalizedChar;
      normalizedIndexMap.push(index);
    }
  }

  const ranges = terms.flatMap((term) => {
    const matches: Array<[number, number]> = [];
    let searchStart = 0;

    while (searchStart < normalizedValue.length) {
      const matchIndex = normalizedValue.indexOf(term, searchStart);

      if (matchIndex === -1) break;

      const matchEnd = matchIndex + term.length - 1;
      const originalStart = normalizedIndexMap[matchIndex];
      const originalEnd = normalizedIndexMap[matchEnd];

      if (originalStart !== undefined && originalEnd !== undefined) {
        matches.push([originalStart, originalEnd + 1]);
      }

      searchStart = matchIndex + term.length;
    }

    return matches;
  });

  if (ranges.length === 0) return [];

  const mergedRanges = ranges.sort((left, right) => left[0] - right[0]);

  return mergedRanges.reduce<Array<[number, number]>>((accumulator, range) => {
    const previousRange = accumulator[accumulator.length - 1];

    if (!previousRange || range[0] > previousRange[1]) {
      accumulator.push([...range] as [number, number]);
      return accumulator;
    }

    previousRange[1] = Math.max(previousRange[1], range[1]);
    return accumulator;
  }, []);
}

function renderHighlightedText(
  value: string | null | undefined,
  query: string,
  variant: "default" | "asset" = "default",
) {
  if (!value) return null;

  const ranges = getHighlightRanges(value, query);

  if (ranges.length === 0) return value;

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  ranges.forEach(([start, end], index) => {
    if (cursor < start) {
      parts.push(
        <span key={`text-${index}-${cursor}`}>
          {value.slice(cursor, start)}
        </span>,
      );
    }

    parts.push(
      <span
        key={`highlight-${index}-${start}`}
        className={
          variant === "asset"
            ? "font-extrabold text-black underline decoration-2 underline-offset-2 decoration-slate-400"
            : "font-semibold text-slate-950"
        }
      >
        {value.slice(start, end)}
      </span>,
    );
    cursor = end;
  });

  if (cursor < value.length) {
    parts.push(<span key={`text-tail-${cursor}`}>{value.slice(cursor)}</span>);
  }

  return parts;
}

export function DashboardHeader({ sidebarOpen }: { sidebarOpen: boolean }) {
  const { isSignedIn } = useAuth();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showAllAssetResults, setShowAllAssetResults] = useState(false);
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
  const normalizedQuery = normalizeSearchText(trimmedQuery);

  const matchedAssets = useMemo(() => {
    if (!trimmedQuery) return [];
    return assets.filter((asset) => {
      const rawHaystack = [
        asset.id,
        asset.assetTag,
        asset.serialNumber,
        asset.category,
        asset.locationId,
        asset.locationPath,
        asset.status,
        asset.assignedTo,
        asset.notes,
      ]
        .filter(Boolean)
        .join(" ");
      const normalizedHaystack = normalizeSearchText(rawHaystack);
      return (
        rawHaystack.toLowerCase().includes(trimmedQuery) ||
        normalizedHaystack.includes(normalizedQuery)
      );
    });
  }, [assets, normalizedQuery, trimmedQuery]);

  const matchedEmployees = useMemo(() => {
    if (!trimmedQuery) return [];
    return employees
      .filter((employee) => {
        const rawHaystack = [
          employee.firstName,
          employee.lastName,
          employee.email,
          employee.department,
          employee.branch,
        ]
          .filter(Boolean)
          .join(" ");
        const normalizedHaystack = normalizeSearchText(rawHaystack);
        return (
          rawHaystack.toLowerCase().includes(trimmedQuery) ||
          normalizedHaystack.includes(normalizedQuery)
        );
      })
      .slice(0, EMPLOYEE_RESULT_LIMIT);
  }, [employees, normalizedQuery, trimmedQuery]);

  const visibleMatchedAssets = useMemo(() => {
    if (showAllAssetResults) return matchedAssets;
    return matchedAssets.slice(0, ASSET_RESULT_PREVIEW_LIMIT);
  }, [matchedAssets, showAllAssetResults]);

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

  const dividerWidth = sidebarOpen ? "0.5px" : "1px";
  const dividerLeft = sidebarOpen ? "calc(240px - 0.5px)" : "calc(72px - 1px)";

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b bg-white">
      <span
        className="absolute top-0 hidden h-14 bg-sidebar-border/90 transition-[left,width] duration-300 ease-out md:block"
        style={{ left: dividerLeft, width: dividerWidth }}
      />

      <div className="flex min-w-0 items-center">
        <div
          className="hidden shrink-0 items-center transition-[width] duration-300 ease-out md:flex"
          style={{
            width: sidebarOpen ? "240px" : "72px",
          }}
        >
          <div className="flex h-14 items-center gap-3 px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
              <Package className="h-4 w-4 text-gray-900" />
            </div>
            <span
              className="overflow-hidden whitespace-nowrap text-sm font-semibold tracking-[0.02em] text-slate-800 transition-all duration-300 ease-out"
              style={{
                maxWidth: sidebarOpen ? "120px" : "0px",
                opacity: sidebarOpen ? 1 : 0,
              }}
            >
              AssetHub
            </span>
          </div>
        </div>

        <div className="hidden min-w-0 px-5 md:block">
          <div
            className="relative transition-all duration-300 ease-out"
            ref={containerRef}
            style={{
              width: sidebarOpen ? "min(58vw, 660px)" : "min(74vw, 760px)",
            }}
          >
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Хөрөнгө, ажилтан хайх.."
              className="h-11 w-full rounded-xl border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-300"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowAllAssetResults(false);
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
              <div
                className="absolute left-0 top-full z-50 mt-3 max-h-140 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-[0_20px_48px_rgba(15,23,42,0.16)] backdrop-blur transition-all duration-300 ease-out"
                style={{
                  width: sidebarOpen ? "min(74vw, 820px)" : "min(86vw, 920px)",
                }}
              >
                <span className="absolute -top-1.75 left-12 h-3.5 w-3.5 rotate-45 border-l border-t border-slate-200 bg-white" />
                {matchedAssets.length === 0 && matchedEmployees.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-slate-200 px-3 py-6 text-center text-sm text-slate-500">
                    Тохирох үр дүн олдсонгүй.
                  </p>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-linear-to-r from-slate-50 to-white px-3 py-2.5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Хайлтын үр дүн
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="max-w-55 truncate rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600">
                          “{query.trim()}”
                        </span>
                        <span className="rounded-full bg-slate-700 px-2 py-0.5 text-[11px] font-semibold text-white">
                          {matchedAssets.length + matchedEmployees.length}
                        </span>
                      </div>
                    </div>

                    {matchedAssets.length > 0 && (
                      <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5">
                        <div className="flex items-center justify-between px-1">
                          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                            <Package className="h-3.5 w-3.5" />
                            Хөрөнгө ({matchedAssets.length})
                          </p>
                          {matchedAssets.length >
                            ASSET_RESULT_PREVIEW_LIMIT && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 rounded-md px-2 text-xs text-slate-600 hover:bg-slate-200/70"
                              onClick={() =>
                                setShowAllAssetResults((prev) => !prev)
                              }
                            >
                              {showAllAssetResults ? "Буцаах" : "Бүгдийг харах"}
                            </Button>
                          )}
                        </div>
                        <div className="mt-2 grid gap-2">
                          {visibleMatchedAssets.map((asset) => (
                            <div
                              key={asset.id}
                              className="group flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                            >
                              <div className="h-14 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
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
                                  <p className="truncate text-[15px] font-semibold text-slate-900">
                                    {renderHighlightedText(
                                      asset.assetTag,
                                      query,
                                      "asset",
                                    )}
                                  </p>
                                  {asset.category && (
                                    <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                                      {renderHighlightedText(
                                        asset.category,
                                        query,
                                        "asset",
                                      )}
                                    </span>
                                  )}
                                </div>
                                <p className="truncate text-xs text-slate-500">
                                  {renderHighlightedText(
                                    asset.serialNumber || "Serial байхгүй",
                                    query,
                                    "asset",
                                  )}
                                </p>
                                <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span className="truncate">
                                    {renderHighlightedText(
                                      asset.locationPath || asset.status,
                                      query,
                                      "asset",
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {!showAllAssetResults &&
                          matchedAssets.length > ASSET_RESULT_PREVIEW_LIMIT && (
                            <p className="mt-2 px-1 text-xs text-slate-500">
                              Доорх &quot;Бүгдийг харах&quot; дээр дарж бүх
                              хөрөнгийг харна уу.
                            </p>
                          )}
                      </section>
                    )}

                    {matchedEmployees.length > 0 && (
                      <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5">
                        <p className="flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                          <UserIcon className="h-3.5 w-3.5" />
                          Ажилтан ({matchedEmployees.length})
                        </p>
                        <div className="mt-2 grid gap-2">
                          {matchedEmployees.map((employee) => {
                            const fullName =
                              `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim();
                            return (
                              <div
                                key={employee.id}
                                className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                              >
                                <Avatar className="h-11 w-11 border border-slate-200">
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
                                  <p className="truncate text-sm font-semibold text-slate-900">
                                    {renderHighlightedText(
                                      fullName || employee.email,
                                      query,
                                    )}
                                  </p>
                                  <p className="truncate text-xs text-slate-500">
                                    {renderHighlightedText(
                                      employee.email,
                                      query,
                                    )}
                                  </p>
                                  <p className="truncate text-[11px] text-slate-500">
                                    {renderHighlightedText(
                                      employee.department || "Алба тодорхойгүй",
                                      query,
                                    )}
                                  </p>
                                </div>
                                {employee.branch && (
                                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                                    {renderHighlightedText(
                                      employee.branch,
                                      query,
                                    )}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </section>
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
        {isSignedIn ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-8 w-8",
              },
            }}
          />
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <UserIcon className="h-4 w-4" />
                <span className="sr-only">Нэвтрэх / Бүртгүүлэх</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={10}
              className="w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
            >
              <div className="px-2 pb-2 pt-1">
                <p className="text-sm font-semibold text-slate-900">Account</p>
                <p className="text-xs text-slate-500">
                  Нэвтрэх эсвэл бүртгүүлэх
                </p>
              </div>
              <div className="grid gap-2 p-2 pt-0">
                <SignInButton mode="modal">
                  <Button className="w-full justify-center">Sign in</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="outline" className="w-full justify-center">
                    Бүртгүүлэх
                  </Button>
                </SignUpButton>
              </div>
            </PopoverContent>
          </Popover>
        )}
        <img src={"2SVG.svg"} alt="" className="h-8 w-8 object-contain" />
      </div>
    </header>
  );
}
