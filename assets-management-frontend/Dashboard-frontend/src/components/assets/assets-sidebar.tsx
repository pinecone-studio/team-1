"use client";

import { useQuery } from "@apollo/client";
import { CategoriesDocument } from "@/gql/graphql";

const FILTERS = {
  location: ["Гурван гол", "Gallery", "Tokyo", "Sednay"],
  roomType: ["Анги", "Оффис", "Агуулах"],
  room: ["301", "302", "303", "304"],
};

interface AssetsSidebarProps {
  filterState: Record<string, Set<string>>;
  onToggleFilter: (
    group: keyof typeof FILTERS | "category" | "subCategory",
    value: string,
  ) => void;
}

export function AssetsSidebar({
  filterState,
  onToggleFilter,
}: AssetsSidebarProps) {
  const { data: categoriesData } = useQuery(CategoriesDocument);

  return (
    <aside className="hidden w-64 shrink-0 rounded-3xl border border-border bg-card p-5 shadow-sm lg:block">
      <h2 className="text-lg font-semibold text-foreground">Шүүлтүүр</h2>
      <div className="mt-4 space-y-6">
        <div>
          <p className="text-sm font-semibold text-foreground">Байршил</p>
          <div className="mt-2 space-y-2">
            {FILTERS.location.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <input
                  type="checkbox"
                  checked={filterState.location.has(item)}
                  onChange={() => onToggleFilter("location", item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Өрөөний төрөл</p>
          <div className="mt-2 space-y-2">
            {FILTERS.roomType.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <input
                  type="checkbox"
                  checked={filterState.roomType.has(item)}
                  onChange={() => onToggleFilter("roomType", item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Өрөө</p>
          <div className="mt-2 space-y-2">
            {FILTERS.room.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <input
                  type="checkbox"
                  checked={filterState.room.has(item)}
                  onChange={() => onToggleFilter("room", item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Ангилал</p>
          <div className="mt-2 space-y-4">
            {(categoriesData?.categories ?? []).map((category) => (
              <div key={category.id}>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <input
                    type="checkbox"
                    checked={filterState.category.has(category.id)}
                    onChange={() => onToggleFilter("category", category.id)}
                  />
                  {category.name}
                </label>
                {category.subcategories?.length ? (
                  <div className="mt-2 space-y-2 pl-6">
                    {category.subcategories.map((sub) => (
                      <label
                        key={sub.id}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <input
                          type="checkbox"
                          checked={filterState.subCategory.has(sub.id)}
                          onChange={() => onToggleFilter("subCategory", sub.id)}
                        />
                        {sub.name}
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
