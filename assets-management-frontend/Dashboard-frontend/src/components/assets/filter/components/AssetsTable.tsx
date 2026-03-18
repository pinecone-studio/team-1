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
  const handleHeaderClick = (key: string) => {
    setOpenFilter((prev) => {
      if (prev && prev !== key) return null;
      return prev === key ? null : key;
    });
  };

  const filterRef = useRef<HTMLDivElement>(null);

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

      const employeeMatch = (a.assignedEmployeeName ?? "")
        .toLowerCase()
        .includes(employeeSearch.toLowerCase());
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

      if (priceFilter === "0-1") priceMatch = price <= 1_000_000;
      if (priceFilter === "1-2") priceMatch = price <= 2_000_000;
      if (priceFilter === "2-5") priceMatch = price <= 5_000_000;
      if (priceFilter === "5-10") priceMatch = price <= 10_000_000;
      if (priceFilter === "10+") priceMatch = price > 10_000_000;

      const dateMatch =
        !dateFilter ||
        new Date(a.createdAt).toDateString() ===
          new Date(dateFilter).toDateString();

      return (
        nameMatch &&
        employeeMatch &&
        categoryMatch &&
        subCategoryMatch &&
        statusMatch &&
        locationMatch &&
        priceMatch &&
        dateMatch
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
      className="rounded-md font-inter h-full overflow-auto"
      onClick={() => setOpenFilter(null)}
    >
      <Table className="table-fixed w-full border-separate border-spacing-y-2">
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

            <TableHead className="text-white relative max-w-35">
              <div
                className="flex items-center gap-1 min-w-0 cursor-pointer select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeaderClick("name");
                }}
              >
                <span className="truncate flex-1">Хөрөнгийн нэр</span>

                <Search className="w-3 h-3 shrink-0" />
              </div>

              {openFilter === "name" && (
                <div
                  ref={filterRef}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-full z-9999 mt-1 bg-white p-2 rounded shadow w-44"
                >
                  <input
                    autoFocus
                    placeholder="Хайх..."
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                    className="w-full text-black text-xs border px-2 py-1 rounded"
                  />
                </div>
              )}
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
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
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
                            ? "bg-gray-900 text-white"
                            : "hover:bg-gray-100"
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
                      className={`text-left px-2 py-1 rounded ${
                        subCategoryFilter === ""
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
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
                        className={`text-left px-2 py-1 rounded ${
                          subCategoryFilter === c
                            ? "bg-gray-900 text-white"
                            : "hover:bg-gray-100"
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
                  className="absolute left-0 top-full z-9999 mt-1 bg-white p-2 rounded shadow w-44"
                >
                  <div className="flex flex-col gap-1 text-xs text-black">
                    <button
                      type="button"
                      className={`text-left px-2 py-1 rounded ${
                        statusFilter === ""
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
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
                            ? "bg-gray-900 text-white"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setStatusFilter(s);
                          setOpenFilter(null);
                        }}
                      >
                        {s}
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
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
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
            <TableHead className="text-white relative text-center">
              <div
                className="flex items-center justify-center gap-1 cursor-pointer select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeaderClick("employee");
                }}
              >
                <span className="truncate">Эзэмшигч</span>

                <Search className="w-3 h-3" />
              </div>

              {openFilter === "employee" && (
                <div
                  ref={filterRef}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-full z-9999 mt-1 bg-white p-2 rounded shadow w-44"
                >
                  <input
                    autoFocus
                    placeholder="Хайх..."
                    value={employeeSearch}
                    onChange={(e) => setEmployeeSearch(e.target.value)}
                    className="w-full text-black text-xs border px-2 py-1 rounded"
                  />
                </div>
              )}
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
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
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
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
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
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
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
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
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
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
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
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
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
                  className="absolute z-50 mt-1 bg-white p-2 rounded shadow w-40"
                >
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setOpenFilter(null);
                    }}
                    className="w-full text-black text-xs"
                  />
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