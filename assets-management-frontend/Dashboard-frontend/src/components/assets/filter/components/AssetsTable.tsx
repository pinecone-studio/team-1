"use client";

import Link from "next/link";
import type { Asset, AssetCategory } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatAssetId, formatName } from "../utils";
import { StatusBadge } from "../StatusBadge";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Search,
  X,
} from "lucide-react";

type AssetsTableProps = {
  assets: Asset[];
  allAssets?: Asset[];
  loading: boolean;
  selectedIds: Set<string>;
  selectAllRef: React.RefObject<HTMLInputElement | null>;
  allSelected: boolean;
  onSelectAll: () => void;
  onToggleSelect: (id: string) => void;
  onOpenQrForSingle: (asset: Asset) => void;
};

const statusMap: Record<string, string> = {
  AVAILABLE: "Эзэмшигчүй",
  ASSIGNED: "Эзэмшигчтэй",
  IN_REPAIR: "Засварт",
  PENDING_DISPOSAL: "Устгал хүлээгдэж буй",
  DISPOSED: "Устсан",
  FOR_SALE: "Зарж болох",
  ASIGN_REQUESTED: "Хуваарилалт хүссэн",
  RETURNING: "Буцааж байна",
  RETURNED: "Буцаасан",
  DAMAGED: "Эвдрэлтэй",
  DISPOSAL_REQUESTED: "Устгах хүсэлт",
  REPAIR_REQUESTED: "Засвралахыг хүсэж байна",
};

export function AssetsTable({
  assets,
  allAssets,
  loading,
  selectedIds,
  selectAllRef,
  allSelected,
  onSelectAll,
  onToggleSelect,
  onOpenQrForSingle,
}: AssetsTableProps) {
  const [nameSearch, setNameSearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState<
    AssetCategory | ""
  >("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [expandedLocations, setExpandedLocations] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("");
  const handleHeaderClick = (key: string) => {
    setOpenFilter((prev) => (prev === key ? null : key));
  };
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!filterRef.current) return;

      if (!filterRef.current.contains(e.target as Node)) {
        setOpenFilter(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenFilter(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAssets = useMemo(() => {
    return assets.filter((a) => {
      const nameMatch = (a.category ?? "")
        .toLowerCase()
        .includes(nameSearch.toLowerCase());

      const employeeMatch =
        (a.assignedEmployeeName ?? "")
          .toLowerCase()
          .includes(employeeSearch.toLowerCase()) ||
        (a.category ?? "").toLowerCase().includes(employeeSearch.toLowerCase());
      const categoryMatch =
        !categoryFilter || a.mainCategory === categoryFilter;

      const subCategoryMatch =
        !subCategoryFilter || a.category === subCategoryFilter;

      const statusMatch = !statusFilter || a.status === statusFilter;

      const locationMatch =
        !locationFilter ||
        (a.location ?? "") === locationFilter ||
        (a.location ?? "").startsWith(`${locationFilter} /`);

      const price = a.currentBookValue ?? 0;
      let priceMatch = true;

      const now = new Date();
      const created = new Date(a.createdAt);

      let rangeMatch = true;

      if (dateRange === "1d") {
        rangeMatch = now.getTime() - created.getTime() <= 1 * 86400000;
      } else if (dateRange === "3d") {
        rangeMatch = now.getTime() - created.getTime() <= 3 * 86400000;
      } else if (dateRange === "7d") {
        rangeMatch = now.getTime() - created.getTime() <= 7 * 86400000;
      }

      const dateMatch =
        !dateFilter ||
        new Date(a.createdAt).toDateString() ===
          new Date(dateFilter).toDateString();

      if (priceFilter === "0-1") priceMatch = price <= 1_000_000;
      if (priceFilter === "1-2")
        priceMatch = price > 1_000_000 && price <= 2_000_000;
      if (priceFilter === "2-5")
        priceMatch = price > 2_000_000 && price <= 5_000_000;
      if (priceFilter === "5-10")
        priceMatch = price > 5_000_000 && price <= 10_000_000;
      if (priceFilter === "10+") priceMatch = price > 10_000_000;

      return (
        nameMatch &&
        employeeMatch &&
        categoryMatch &&
        subCategoryMatch &&
        statusMatch &&
        locationMatch &&
        priceMatch &&
        dateMatch &&
        rangeMatch
      );
    });
  }, [
    assets,
    nameSearch,
    employeeSearch,
    categoryFilter,
    subCategoryFilter,
    statusFilter,
    locationFilter,
    priceFilter,
    dateFilter,
    dateRange,
  ]);

  const locationSource = allAssets ?? assets;

  type LocationNode = { name: string; children: Map<string, LocationNode> };

  const locationTree = useMemo(() => {
    const root = new Map<string, LocationNode>();
    locationSource
      .map((a) => a.location)
      .filter(Boolean)
      .forEach((loc) => {
        const parts = (loc as string)
          .split("/")
          .map((p) => p.trim())
          .filter(Boolean);
        if (parts.length === 0) return;
        let current = root;
        parts.forEach((part) => {
          if (!current.has(part)) {
            current.set(part, { name: part, children: new Map() });
          }
          current = current.get(part)!.children;
        });
      });
    return root;
  }, [locationSource]);

  const isLocationSelected = (path: string) =>
    locationFilter === path || locationFilter.startsWith(`${path} /`);

  const isExpanded = (path: string) => expandedLocations.includes(path);

  const toggleExpanded = (path: string) => {
    setExpandedLocations((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
    );
  };

  const renderLocationNode = (
    current: LocationNode,
    parentPath: string,
    depth: number,
  ) => {
    const path = parentPath ? `${parentPath} / ${current.name}` : current.name;
    const hasChildren = current.children.size > 0;
    const expanded = isExpanded(path);

    return (
      <div key={path} className="flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            className={`flex-1 text-left py-1 rounded ${
              isLocationSelected(path)
                ? "bg-gray-900 text-white"
                : "hover:bg-gray-100"
            }`}
            style={{ paddingLeft: 8 + depth * 12, paddingRight: 8 }}
            onClick={() => {
              setLocationFilter(path);
              setOpenFilter(null);
            }}
          >
            {current.name}
          </button>
          {hasChildren ? (
            <button
              type="button"
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => toggleExpanded(path)}
            >
              {expanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          ) : null}
        </div>

        {hasChildren && expanded ? (
          <div className="mt-1 flex flex-col gap-1">
            {Array.from(current.children.values()).map((child) =>
              renderLocationNode(child, path, depth + 1),
            )}
          </div>
        ) : null}
      </div>
    );
  };

  useEffect(() => {
    if (openFilter !== "location") {
      setExpandedLocations([]);
    }
  }, [openFilter]);
  return (
    <div
      className="rounded-md font-inter  h-full overflow-auto"
      onClick={() => setOpenFilter(null)}
    >
      <Table className="table-fixed w-full border-separate pb-20 border-spacing-y-2">
        <TableHeader>
          <TableRow className="bg-[#0f4c6e] text-white hover:bg-[#0f4c6e]!">
            <TableHead className="w-10 text-white">
              <input
                ref={selectAllRef}
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="h-4 w-4 rounded border-white"
              />
            </TableHead>
            <TableHead className="w-10 text-white">№</TableHead>
            <TableHead className="truncate text-white">Хөрөнгийн ID</TableHead>

            <TableHead className="text-white relative min-w-[150px]">
              <div
                className="flex items-center justify-between gap-2 cursor-pointer select-none group"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeaderClick("name");
                }}
              >
                {openFilter === "name" ? (
                  <div
                    className="relative w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      autoFocus
                      placeholder="Хайх.."
                      value={nameSearch}
                      onChange={(e) => setNameSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setOpenFilter(null);
                        }
                      }}
                      className="w-full bg-white text-black text-sm pl-2 pr-8 py-1 rounded border border-blue-500 outline-none shadow-sm"
                    />
                    <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`truncate ${nameSearch ? "text-white font-bold" : "text-white"}`}
                    >
                      {nameSearch || "Хөрөнгийн нэр"}
                    </span>

                    <div className="flex items-center gap-2">
                      {nameSearch ? (
                        // Хэрэв хайсан утга байвал 'X' товч харагдана
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setNameSearch("");
                          }}
                          className="p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      ) : (
                        // Хайсан утга байхгүй бол Search icon харагдана
                        <Search className="w-3 h-3 text-white/70 group-hover:text-white" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TableHead>
            <TableHead className="text-white relative">
              <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeaderClick("category");
                }}
              >
                <span className="truncate">Ангилал</span>

                <ChevronsUpDown className="w-3 h-3" />
              </div>

              {openFilter === "category" && (
                <div
                  ref={filterRef}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-full z-9999 mt-1 bg-white p-2 rounded shadow w-44"
                >
                  <div className="flex flex-col gap-1 text-xs text-black">
                    <button
                      type="button"
                      className={`text-left px-2 py-1 rounded ${
                        categoryFilter === ""
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setCategoryFilter("");
                        setOpenFilter(null);
                      }}
                    >
                      Бүгд
                    </button>
                    {[
                      ...new Set(
                        assets
                          .map((a) => a.mainCategory)
                          .filter((c): c is string => Boolean(c)),
                      ),
                    ].map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`text-left px-2 py-1 rounded ${
                          categoryFilter === c
                            ? "bg-gray-200 text-black"
                            : "hover:bg-gray-300"
                        }`}
                        onClick={() => {
                          setCategoryFilter(c);
                          setOpenFilter(null);
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </TableHead>
            <TableHead className="text-white relative">
              <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeaderClick("sub");
                }}
              >
                <span className="truncate">Дэд ангилал</span>

                <ChevronsUpDown className="w-3 h-3" />
              </div>

              {openFilter === "sub" && (
                <div
                  ref={filterRef}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-full z-9999 mt-1 bg-white p-2 rounded shadow w-44"
                >
                  <div className="flex flex-col gap-1 text-xs text-black">
                    <button
                      type="button"
                      className={`text-left text-xs px-2 py-1 rounded ${
                        subCategoryFilter === ""
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setSubCategoryFilter("");
                        setOpenFilter(null);
                      }}
                    >
                      Бүгд
                    </button>
                    {[
                      ...new Set(
                        assets
                          .map((a) => a.category)
                          .filter((c): c is AssetCategory => Boolean(c)),
                      ),
                    ].map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`text-left text-xs px-2 py-1 rounded ${
                          subCategoryFilter === c
                            ? "bg-gray-200 text-black"
                            : "hover:bg-gray-300"
                        }`}
                        onClick={() => {
                          setSubCategoryFilter(c);
                          setOpenFilter(null);
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </TableHead>
            <TableHead className="text-white relative">
              <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeaderClick("status");
                }}
              >
                <span>Төлөв</span>
                <ChevronsUpDown className="w-3 h-3" />
              </div>

              {openFilter === "status" && (
                <div
                  ref={filterRef}
                  onClick={(e) => e.stopPropagation()}
                  // Таны анхны стиль: bg-white p-2 rounded shadow w-44
                  className="absolute left-0 top-full z-[9999] mt-1 bg-white p-2 rounded shadow w-44"
                >
                  <div className="flex flex-col gap-1 text-xs text-black">
                    <button
                      type="button"
                      className={`text-left px-2 py-1 rounded ${
                        statusFilter === ""
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setStatusFilter("");
                        setOpenFilter(null);
                      }}
                    >
                      Бүгд
                    </button>

                    {[...new Set(assets.map((a) => a.status))].map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`text-left px-2 py-1 rounded ${
                          statusFilter === s
                            ? "bg-gray-200 text-black"
                            : "hover:bg-gray-300"
                        }`}
                        onClick={() => {
                          setStatusFilter(s);
                          setOpenFilter(null);
                        }}
                      >
                        {/* Энд statusMap-аар солин харуулж байна */}
                        {statusMap[s] || s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </TableHead>
            <TableHead className="text-white relative">
              <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeaderClick("location");
                }}
              >
                <span className="truncate">Байршил</span>
                <ChevronsUpDown className="w-3 h-3" />
              </div>

              {openFilter === "location" && (
                <div
                  ref={filterRef}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-full z-9999 mt-1 bg-white p-2 rounded shadow w-64"
                >
                  <div className="flex flex-col gap-1 text-xs text-black max-h-64 overflow-auto">
                    <button
                      type="button"
                      className={`text-left px-2 py-1 rounded ${
                        locationFilter === ""
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setLocationFilter("");
                        setOpenFilter(null);
                      }}
                    >
                      Бүгд
                    </button>
                    {Array.from(locationTree.values()).map((node) =>
                      renderLocationNode(node, "", 0),
                    )}
                  </div>
                </div>
              )}
            </TableHead>
            <TableHead className="text-white relative min-w-[150px]">
              <div
                className="flex items-center justify-between gap-2 cursor-pointer select-none group px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeaderClick("employee");
                }}
              >
                {openFilter === "employee" ? (
                  <div
                    className="relative w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      autoFocus
                      placeholder="Эзэмшигч хайх.."
                      value={employeeSearch}
                      onChange={(e) => setEmployeeSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setOpenFilter(null);
                        }
                      }}
                      className="w-full bg-white text-black text-sm pl-2 pr-8 py-1 rounded border border-blue-500 outline-none shadow-sm font-normal"
                    />
                    <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`truncate text-sm ${employeeSearch ? "text-white font-bold" : "text-white"}`}
                    >
                      {employeeSearch || "Эзэмшигч"}
                    </span>

                    <div className="flex items-center gap-2">
                      {employeeSearch ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEmployeeSearch("");
                          }}
                          className="p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      ) : (
                        <Search className="w-3 h-3 text-white/70  group-hover:text-white transition-opacity" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TableHead>
            <TableHead className="text-white relative text-center">
              <div
                className="flex items-center justify-center gap-1 cursor-pointer select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeaderClick("price");
                }}
              >
                <span className="truncate">Үнэ (₮)</span>
                <ChevronsUpDown className="w-3 h-3" />
              </div>

              {openFilter === "price" && (
                <div
                  ref={filterRef}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-full z-9999 mt-1 bg-white p-2 rounded shadow w-44"
                >
                  <div className="flex flex-col gap-1 text-xs text-black">
                    <button
                      type="button"
                      className={`text-left px-2 py-1 rounded ${
                        priceFilter === ""
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setPriceFilter("");
                        setOpenFilter(null);
                      }}
                    >
                      Бүгд
                    </button>
                    <button
                      type="button"
                      className={`text-left px-2 py-1 rounded ${
                        priceFilter === "0-1"
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setPriceFilter("0-1");
                        setOpenFilter(null);
                      }}
                    >
                      0 - 1,000,000
                    </button>
                    <button
                      type="button"
                      className={`text-left px-2 py-1 rounded ${
                        priceFilter === "1-2"
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setPriceFilter("1-2");
                        setOpenFilter(null);
                      }}
                    >
                      1,000,001 - 2,000,000
                    </button>
                    <button
                      type="button"
                      className={`text-left px-2 py-1 rounded ${
                        priceFilter === "2-5"
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setPriceFilter("2-5");
                        setOpenFilter(null);
                      }}
                    >
                      2,000,001 - 5,000,000
                    </button>
                    <button
                      type="button"
                      className={`text-left px-2 py-1 rounded ${
                        priceFilter === "5-10"
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setPriceFilter("5-10");
                        setOpenFilter(null);
                      }}
                    >
                      5,000,001 - 10,000,000
                    </button>
                    <button
                      type="button"
                      className={`text-left px-2 py-1 rounded ${
                        priceFilter === "10+"
                          ? "bg-gray-200 text-black"
                          : "hover:bg-gray-300"
                      }`}
                      onClick={() => {
                        setPriceFilter("10+");
                        setOpenFilter(null);
                      }}
                    >
                      10,000,000 +
                    </button>
                  </div>
                </div>
              )}
            </TableHead>
            <TableHead className="text-white relative text-center">
              <div
                className="flex items-center justify-center gap-1 cursor-pointer select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeaderClick("date");
                }}
              >
                Он сар
                <ChevronsUpDown className="w-3 h-3" />
              </div>

              {openFilter === "date" && (
                <div
                  ref={filterRef}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute z-50 mt-2 left-1/2 -translate-x-1/2 bg-white p-2 rounded-xl shadow-2xl border border-slate-200 w-52 flex flex-col gap-1.5 animate-in fade-in zoom-in duration-150"
                >
                  <div className="px-2 py-1">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Огноо сонгох
                    </p>
                  </div>

                  {/* Календарь - Input */}
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setDateRange(""); // Календарь сонгосон бол интервалыг цэвэрлэнэ
                      setOpenFilter(null);
                    }}
                    className="w-full text-black text-xs p-2 border border-slate-200 rounded-md mb-1 focus:border-gray-400 outline-none transition-all cursor-pointer"
                  />

                  <div className="h-[1px] bg-slate-100 my-1" />

                  {/* Хугацааны сонголтууд */}
                  <div className="flex flex-col gap-0.5">
                    {[
                      { label: "Бүгд ", value: "" },
                      { label: "1 өдрийн өмнө", value: "1d" },
                      { label: "3 өдрийн өмнө", value: "3d" },
                      { label: "7 хоногийн өмнө", value: "7d" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setDateRange(opt.value);
                          setDateFilter(""); // Интервал сонгосон бол календарийг цэвэрлэнэ
                          setOpenFilter(null);
                        }}
                        className={`text-left px-3 py-2 text-xs rounded-md transition-all ${
                          dateRange === opt.value && opt.value !== ""
                            ? "bg-gray-200 text-black font-medium" // Цэнхэр биш саарал болгосон
                            : "text-slate-600 hover:bg-gray-100 hover:text-black"
                        } ${
                          opt.value === ""
                            ? "border-b border-slate-50 mb-1 font-semibold" // Улаан өнгийг хассан
                            : ""
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </TableHead>
            <TableHead className="text-white text-center w-22">QR</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!loading && filteredAssets.length === 0 && (
            <TableRow className="bg-white">
              <TableCell
                colSpan={12}
                className="py-8 text-center text-sm text-muted-foreground"
              >
                Утга олдсонгүй.
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            filteredAssets.map((asset, index) => (
              <TableRow
                key={asset.id}
                className="bg-white shadow-sm hover:bg-gray-50"
              >
                <TableCell className="py-2 rounded-l-md">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(asset.id)}
                    onChange={() => onToggleSelect(asset.id)}
                    className="h-4 w-4"
                  />
                </TableCell>

                <TableCell className="py-2 font-medium">{index + 1}</TableCell>

                <TableCell className="py-2 w-27">
                  <Link
                    href={`/assets/${asset.id}`}
                    className="block truncate text-black hover:underline text-sm"
                    title={asset.assetId}
                  >
                    {formatAssetId(asset.assetId)}
                  </Link>
                </TableCell>

                <TableCell className="py-2 truncate max-w-40">
                  {asset.category}
                </TableCell>

                <TableCell className="py-2 truncate max-w-35">
                  {asset.mainCategory ?? "—"}
                </TableCell>

                <TableCell className="py-2 truncate max-w-35">
                  {asset.category}
                </TableCell>

                <TableCell className="py-2">
                  <StatusBadge status={asset.status} />
                </TableCell>

                <TableCell className="py-2 truncate max-w-40">
                  {asset.location ?? "—"}
                </TableCell>

                <TableCell className="py-2 text-left pl-6 truncate max-w-35">
                  {formatName(asset.assignedEmployeeName)}
                </TableCell>

                <TableCell className="py-2 text-center font-medium tabular-nums">
                  {asset.currentBookValue.toLocaleString()}
                </TableCell>

                <TableCell className="py-2 text-center text-[11px] truncate text-muted-foreground">
                  {new Date(asset.createdAt).toLocaleDateString("mn-MN")}
                </TableCell>

                <TableCell className="py-2 text-center rounded-r-md">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => onOpenQrForSingle(asset)}
                  >
                    QR харах
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
