"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const assets = [
  {
    id: "MAC-2026-001",
    serial: "C02XG0FDJGH5",
    type: "LAPTOP",
    owner: "John Smith",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "301",
  },
  {
    id: "PHN-2026-045",
    serial: "IP15PM256BLK",
    type: "PHONE",
    owner: "Emily Johnson",
    location: "Сиэтл оффис",
    locationType: "Оффис",
    roomNumber: "302",
  },
  {
    id: "MON-2026-017",
    serial: "DELL27UHD",
    type: "MONITOR",
    owner: "Alice Cooper",
    location: "Гэгээ нарны зам",
    locationType: "Агуулах",
    roomNumber: "303",
  },
  {
    id: "MAC-2026-014",
    serial: "C02QK9FDJ1H3",
    type: "LAPTOP",
    owner: "Diana Evans",
    location: "Гэгээ яармаг",
    locationType: "Анги",
    roomNumber: "304",
  },
  {
    id: "PHN-2026-062",
    serial: "S24U512GRY",
    type: "PHONE",
    owner: "Bob Wilson",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "301",
  },
  {
    id: "MON-2026-021",
    serial: "LG34UWQHD",
    type: "MONITOR",
    owner: "Emily Johnson",
    location: "Сиэтл оффис",
    locationType: "Агуулах",
    roomNumber: "302",
  },
  {
    id: "TAB-2026-009",
    serial: "IPAD11M2SLV",
    type: "TABLET",
    owner: "Alice Cooper",
    location: "Гэгээ нарны зам",
    locationType: "Оффис",
    roomNumber: "303",
  },
  {
    id: "DOC-2026-003",
    serial: "DOCUSB-C09",
    type: "DOCK",
    owner: "John Smith",
    location: "Гэгээ яармаг",
    locationType: "Агуулах",
    roomNumber: "304",
  },
  {
    id: "HDP-2026-005",
    serial: "WH1000XM5",
    type: "HEADSET",
    owner: "Diana Evans",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "303",
  },
  {
    id: "KBD-2026-011",
    serial: "MXKEYSMINI",
    type: "KEYBOARD",
    owner: "Bob Wilson",
    location: "Сиэтл оффис",
    locationType: "Оффис",
    roomNumber: "304",
  },
  {
    id: "MSC-2026-018",
    serial: "MXMASTER3S",
    type: "MOUSE",
    owner: "Emily Johnson",
    location: "Гэгээ нарны зам",
    locationType: "Анги",
    roomNumber: "301",
  },
  {
    id: "PRN-2026-002",
    serial: "HPLJ402DNE",
    type: "PRINTER",
    owner: "Finance Team",
    location: "Гэгээ яармаг",
    locationType: "Оффис",
    roomNumber: "302",
  },
  {
    id: "CMP-2026-007",
    serial: "LOGIC920S",
    type: "CAMERA",
    owner: "Product Team",
    location: "Гурван гол",
    locationType: "Агуулах",
    roomNumber: "304",
  },
  {
    id: "MAC-2026-022",
    serial: "C02ZQ0FDJ8X1",
    type: "LAPTOP",
    owner: "Sarah Lee",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Ариун цэврийн өрөө",
  },
  {
    id: "MON-2026-028",
    serial: "DELL24FHD",
    type: "MONITOR",
    owner: "Michael Chen",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "3 давхрын заал",
  },
  {
    id: "PHN-2026-071",
    serial: "IP16PM512BLK",
    type: "PHONE",
    owner: "Naraa Bold",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "4 давхрын заал",
  },
  {
    id: "TAB-2026-015",
    serial: "IPAD13M4GRY",
    type: "TABLET",
    owner: "Ochirdene Bat",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Гал тогоо",
  },
  {
    id: "DOC-2026-010",
    serial: "DOCUSB-C12",
    type: "DOCK",
    owner: "Boldoo Enkh",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Хурлын өрөө",
  },
  {
    id: "PRN-2026-006",
    serial: "HPLJ1020",
    type: "PRINTER",
    owner: "Admin Team",
    location: "Гурван гол",
    locationType: "Агуулах",
    roomNumber: "3-н давхар",
  },
  {
    id: "MSC-2026-024",
    serial: "LOGIMX3S-WHT",
    type: "MOUSE",
    owner: "Erdene Jargal",
    location: "Гурван гол",
    locationType: "Агуулах",
    roomNumber: "4-н давхар",
  },
  {
    id: "KBD-2026-019",
    serial: "KEYCHRONAIR",
    type: "KEYBOARD",
    owner: "Temuulen B.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "301",
  },
  {
    id: "LAP-2026-033",
    serial: "HPENVY16",
    type: "LAPTOP",
    owner: "Ariunaa T.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "302",
  },
  {
    id: "MON-2026-035",
    serial: "LG29WQ",
    type: "MONITOR",
    owner: "Bataa N.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "303",
  },
  {
    id: "HDP-2026-011",
    serial: "JBLQ910",
    type: "HEADSET",
    owner: "Saruul S.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "304",
  },
  {
    id: "TAB-2026-019",
    serial: "GALAXYTAB9",
    type: "TABLET",
    owner: "Anu D.",
    location: "Сиэтл оффис",
    locationType: "Оффис",
    roomNumber: "Хурлын өрөө",
  },
  {
    id: "DOC-2026-014",
    serial: "DOCKPRO13",
    type: "DOCK",
    owner: "Ganbaa L.",
    location: "Сиэтл оффис",
    locationType: "Агуулах",
    roomNumber: "3-н давхар",
  },
  {
    id: "PRN-2026-009",
    serial: "CANONMF641",
    type: "PRINTER",
    owner: "Ops Team",
    location: "Сиэтл оффис",
    locationType: "Анги",
    roomNumber: "301",
  },
  {
    id: "LAP-2026-041",
    serial: "C02GGOFFA1",
    type: "LAPTOP",
    owner: "Tungalag P.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Ариун цэврийн өрөө",
  },
  {
    id: "MON-2026-090",
    serial: "GG-REST-DLL01",
    type: "MONITOR",
    owner: "IT Support",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Ариун цэврийн өрөө",
    roomItem: "Dell-ийн дэлгэц",
  },
  {
    id: "MSC-2026-091",
    serial: "GG-REST-MSE01",
    type: "MOUSE",
    owner: "IT Support",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Ариун цэврийн өрөө",
    roomItem: "Mouse",
  },
  {
    id: "KBD-2026-092",
    serial: "GG-REST-KBD01",
    type: "KEYBOARD",
    owner: "IT Support",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Ариун цэврийн өрөө",
    roomItem: "Keyboard",
  },
  {
    id: "MAC-2026-093",
    serial: "GG-REST-MACMINI",
    type: "DESKTOP",
    owner: "IT Support",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Ариун цэврийн өрөө",
    roomItem: "Mac mini",
  },
  {
    id: "CHR-2026-094",
    serial: "GG-REST-CHR01",
    type: "OTHER",
    owner: "Facilities",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Ариун цэврийн өрөө",
    roomItem: "Сандал",
  },
  {
    id: "DSK-2026-095",
    serial: "GG-REST-DSK01",
    type: "OTHER",
    owner: "Facilities",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Ариун цэврийн өрөө",
    roomItem: "Ширээ",
  },
  {
    id: "MON-2026-042",
    serial: "GG-OFF-WS01",
    type: "MONITOR",
    owner: "Enkhjin M.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Ариун цэврийн өрөө",
  },
  {
    id: "PHN-2026-043",
    serial: "GG-OFF-WS02",
    type: "PHONE",
    owner: "Bilegt S.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Ариун цэврийн өрөө",
  },
  {
    id: "TAB-2026-044",
    serial: "GG-OFF-WS03",
    type: "TABLET",
    owner: "Ankhaa R.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Ариун цэврийн өрөө",
  },
  {
    id: "LAP-2026-045",
    serial: "GG-OFF-3F01",
    type: "LAPTOP",
    owner: "Bat-Erdene A.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "3 давхрын заал",
  },
  {
    id: "MON-2026-046",
    serial: "GG-OFF-3F02",
    type: "MONITOR",
    owner: "Nomin D.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "3 давхрын заал",
  },
  {
    id: "KBD-2026-047",
    serial: "GG-OFF-3F03",
    type: "KEYBOARD",
    owner: "Oyun-Erdene K.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "3 давхрын заал",
  },
  {
    id: "MSC-2026-048",
    serial: "GG-OFF-3F04",
    type: "MOUSE",
    owner: "Delger M.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "3 давхрын заал",
  },
  {
    id: "LAP-2026-049",
    serial: "GG-OFF-4F01",
    type: "LAPTOP",
    owner: "Sodoo L.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "4 давхрын заал",
  },
  {
    id: "MON-2026-050",
    serial: "GG-OFF-4F02",
    type: "MONITOR",
    owner: "Temka J.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "4 давхрын заал",
  },
  {
    id: "PHN-2026-051",
    serial: "GG-OFF-4F03",
    type: "PHONE",
    owner: "Munkh T.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "4 давхрын заал",
  },
  {
    id: "TAB-2026-052",
    serial: "GG-OFF-4F04",
    type: "TABLET",
    owner: "Enkhsaikhan B.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "4 давхрын заал",
  },
  {
    id: "LAP-2026-053",
    serial: "GG-OFF-KIT01",
    type: "LAPTOP",
    owner: "Khandaa P.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Гал тогоо",
  },
  {
    id: "MON-2026-054",
    serial: "GG-OFF-KIT02",
    type: "MONITOR",
    owner: "Erkhembayar G.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Гал тогоо",
  },
  {
    id: "KBD-2026-055",
    serial: "GG-OFF-KIT03",
    type: "KEYBOARD",
    owner: "Dulguun N.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Гал тогоо",
  },
  {
    id: "MSC-2026-056",
    serial: "GG-OFF-KIT04",
    type: "MOUSE",
    owner: "Saruul P.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Гал тогоо",
  },
  {
    id: "LAP-2026-057",
    serial: "GG-OFF-MEET01",
    type: "LAPTOP",
    owner: "Tuvshin O.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Хурлын өрөө",
  },
  {
    id: "MON-2026-058",
    serial: "GG-OFF-MEET02",
    type: "MONITOR",
    owner: "Anu B.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Хурлын өрөө",
  },
  {
    id: "PHN-2026-059",
    serial: "GG-OFF-MEET03",
    type: "PHONE",
    owner: "Gerel Z.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Хурлын өрөө",
  },
  {
    id: "TAB-2026-060",
    serial: "GG-OFF-MEET04",
    type: "TABLET",
    owner: "Unur N.",
    location: "Гурван гол",
    locationType: "Оффис",
    roomNumber: "Хурлын өрөө",
  },
  {
    id: "DOC-2026-061",
    serial: "GG-AGUU-3F01",
    type: "DOCK",
    owner: "Logistics Team",
    location: "Гурван гол",
    locationType: "Агуулах",
    roomNumber: "3-н давхар",
  },
  {
    id: "PRN-2026-062",
    serial: "GG-AGUU-3F02",
    type: "PRINTER",
    owner: "Warehouse Team",
    location: "Гурван гол",
    locationType: "Агуулах",
    roomNumber: "3-н давхар",
  },
  {
    id: "CAM-2026-063",
    serial: "GG-AGUU-3F03",
    type: "CAMERA",
    owner: "Security Team",
    location: "Гурван гол",
    locationType: "Агуулах",
    roomNumber: "3-н давхар",
  },
  {
    id: "HDP-2026-064",
    serial: "GG-AGUU-3F04",
    type: "HEADSET",
    owner: "Support Team",
    location: "Гурван гол",
    locationType: "Агуулах",
    roomNumber: "3-н давхар",
  },
  {
    id: "DOC-2026-065",
    serial: "GG-AGUU-4F01",
    type: "DOCK",
    owner: "Ops Team",
    location: "Гурван гол",
    locationType: "Агуулах",
    roomNumber: "4-н давхар",
  },
  {
    id: "PRN-2026-066",
    serial: "GG-AGUU-4F02",
    type: "PRINTER",
    owner: "Ops Team",
    location: "Гурван гол",
    locationType: "Агуулах",
    roomNumber: "4-н давхар",
  },
  {
    id: "CAM-2026-067",
    serial: "GG-AGUU-4F03",
    type: "CAMERA",
    owner: "Security Team",
    location: "Гурван гол",
    locationType: "Агуулах",
    roomNumber: "4-н давхар",
  },
  {
    id: "HDP-2026-068",
    serial: "GG-AGUU-4F04",
    type: "HEADSET",
    owner: "Support Team",
    location: "Гурван гол",
    locationType: "Агуулах",
    roomNumber: "4-н давхар",
  },
  {
    id: "LAP-2026-069",
    serial: "GG-ANGI-301A",
    type: "LAPTOP",
    owner: "Tsetsgee L.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "301",
  },
  {
    id: "MON-2026-070",
    serial: "GG-ANGI-301B",
    type: "MONITOR",
    owner: "Bilegt J.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "301",
  },
  {
    id: "MSC-2026-072",
    serial: "GG-ANGI-301C",
    type: "MOUSE",
    owner: "Namuun A.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "301",
  },
  {
    id: "TAB-2026-073",
    serial: "GG-ANGI-301D",
    type: "TABLET",
    owner: "Tergel S.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "301",
  },
  {
    id: "LAP-2026-074",
    serial: "GG-ANGI-302A",
    type: "LAPTOP",
    owner: "Munkh-Orgil P.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "302",
  },
  {
    id: "MON-2026-075",
    serial: "GG-ANGI-302B",
    type: "MONITOR",
    owner: "Khuslen E.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "302",
  },
  {
    id: "MSC-2026-076",
    serial: "GG-ANGI-302C",
    type: "MOUSE",
    owner: "Solongo T.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "302",
  },
  {
    id: "TAB-2026-077",
    serial: "GG-ANGI-302D",
    type: "TABLET",
    owner: "Doljinsuren R.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "302",
  },
  {
    id: "LAP-2026-078",
    serial: "GG-ANGI-303A",
    type: "LAPTOP",
    owner: "Otgondorj N.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "303",
  },
  {
    id: "MSC-2026-079",
    serial: "GG-ANGI-303B",
    type: "MOUSE",
    owner: "Suren B.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "303",
  },
  {
    id: "TAB-2026-080",
    serial: "GG-ANGI-303C",
    type: "TABLET",
    owner: "Bolor S.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "303",
  },
  {
    id: "LAP-2026-081",
    serial: "GG-ANGI-304A",
    type: "LAPTOP",
    owner: "Narantuya B.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "304",
  },
  {
    id: "MON-2026-082",
    serial: "GG-ANGI-304B",
    type: "MONITOR",
    owner: "Zolboo A.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "304",
  },
  {
    id: "MSC-2026-083",
    serial: "GG-ANGI-304C",
    type: "MOUSE",
    owner: "Khalzaa M.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "304",
  },
  {
    id: "TAB-2026-084",
    serial: "GG-ANGI-304D",
    type: "TABLET",
    owner: "Munkhbayar O.",
    location: "Гурван гол",
    locationType: "Анги",
    roomNumber: "304",
  },
];

const employees = [
  { id: "emp-01", name: "John Smith", title: "IT Engineer" },
  { id: "emp-02", name: "Emily Johnson", title: "HR Manager" },
  { id: "emp-03", name: "Bob Wilson", title: "Finance Lead" },
  { id: "emp-04", name: "Diana Evans", title: "Product Designer" },
];

const initialTransfers = [
  {
    id: "TRF-1001",
    asset: "MAC-2025-089",
    assetName: 'MacBook Pro 14"',
    from: "Alice Cooper",
    to: "Bob Wilson",
    date: "3/10/2024",
    reason: "Department reassignment",
    status: "Шилжүүлсэн",
    statusTone: "success" as const,
  },
  {
    id: "TRF-1002",
    asset: "MON-2025-045",
    assetName: 'Dell 27" Monitor',
    from: "Charlie Davis",
    to: "Diana Evans",
    date: "3/8/2024",
    reason: "Equipment upgrade swap",
    status: "Шилжүүлсэн",
    statusTone: "success" as const,
  },
  {
    id: "TRF-1003",
    asset: "PHN-2025-012",
    assetName: "iPhone 15 Pro",
    from: "Eva Foster",
    to: "Frank Garcia",
    date: "3/5/2024",
    reason: "Role change",
    status: "Хүлээгдэж буй",
    statusTone: "pending" as const,
  },
];

const transferAssetOptions = ["mac", "mouse", "keybourd", "macmini"];
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

export function AssetTransferContent() {
  const [assetSearch, setAssetSearch] = useState("");
  const [assetLocation, setAssetLocation] = useState<string>("all");
  const [assetLocationType, setAssetLocationType] = useState<string>("all");
  const [assetRoomNumber, setAssetRoomNumber] = useState<string>("all");
  const [assetRoomItem, setAssetRoomItem] = useState<string>("all");
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [showAllAssets, setShowAllAssets] = useState(false);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );
  const [selectedTransferAsset, setSelectedTransferAsset] = useState("");
  const [reason, setReason] = useState("");
  const [transfers, setTransfers] = useState(initialTransfers);

  const filteredAssets = useMemo(() => {
    const query = assetSearch.trim().toLowerCase();
    const locationFiltered =
      assetLocation === "all"
        ? assets
        : assets.filter((asset) => asset.location === assetLocation);

    const typeFiltered =
      assetLocationType === "all"
        ? locationFiltered
        : locationFiltered.filter(
            (asset) => asset.locationType === assetLocationType,
          );

    const roomFiltered =
      assetRoomNumber === "all"
        ? typeFiltered
        : typeFiltered.filter((asset) => asset.roomNumber === assetRoomNumber);
    const itemFiltered =
      assetRoomItem === "all"
        ? roomFiltered
        : roomFiltered.filter((asset) => asset.roomItem === assetRoomItem);

    if (!query) return itemFiltered;
    return itemFiltered.filter((asset) =>
      [
        asset.id,
        asset.serial,
        asset.owner,
        asset.type,
        asset.location,
        asset.locationType,
        asset.roomNumber,
        asset.roomItem,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [
    assetSearch,
    assetLocation,
    assetLocationType,
    assetRoomNumber,
    assetRoomItem,
  ]);
  const filteredSelectedAssets = filteredAssets.filter((asset) =>
    selectedAssetIds.includes(asset.id),
  );
  const displayAssets = showSelectedOnly
    ? filteredSelectedAssets
    : filteredAssets;
  const visibleAssets = showAllAssets
    ? displayAssets
    : displayAssets.slice(0, 5);
  const allFilteredSelected =
    filteredAssets.length > 0 &&
    filteredAssets.every((asset) => selectedAssetIds.includes(asset.id));

  const filteredEmployees = useMemo(() => {
    const query = employeeSearch.trim().toLowerCase();
    if (!query) return employees;
    return employees.filter((employee) =>
      [employee.name, employee.title].join(" ").toLowerCase().includes(query),
    );
  }, [employeeSearch]);

  const selectedAssets = assets.filter((asset) =>
    selectedAssetIds.includes(asset.id),
  );
  const selectedEmployee = employees.find(
    (employee) => employee.id === selectedEmployeeId,
  );

  const handleSubmit = () => {
    if (!selectedAssets.length || !selectedEmployee) return;
    const newTransfers = selectedAssets.map((asset) => ({
      id: `TRF-${Math.floor(Math.random() * 9000 + 1000)}`,
      asset: asset.id,
      assetName: selectedTransferAsset || asset.type,
      from: asset.owner,
      to: selectedEmployee.name,
      date: new Date().toLocaleDateString(),
      reason: reason.trim() || "Asset transfer",
      status: "Хүлээгдэж буй",
      statusTone: "pending" as const,
    }));
    setTransfers((prev) => [...newTransfers, ...prev]);
    setReason("");
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Хөрөнгө шилжүүлэх
        </h1>
        <p className="text-sm text-muted-foreground">
          Хөрөнгө сонгож, шинэ эзэмшигчид шилжүүлэх хүсэлт илгээнэ.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="grid items-stretch gap-3 lg:mx-auto lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-4">
          <Card className="h-full rounded-2xl border-border bg-card p-5 lg:min-h-[620px]">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                1
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Хөрөнгөө сонгоно уу
                </p>
                <p className="text-xs text-muted-foreground">
                  Шилжүүлэх хөрөнгөө сонгоно уу
                </p>
              </div>
            </div>

            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Хөрөнгийн ID, сериaл дугаар, ажилт..."
                value={assetSearch}
                onChange={(event) => setAssetSearch(event.target.value)}
              />
            </div>

            <div className="mt-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Байршлаар шүүх
              </p>
              <div
                className="relative rounded-xl border border-border bg-muted/20 p-2"
                onMouseLeave={() => {
                  setHoveredLocation(null);
                  setHoveredType(null);
                  setHoveredRoom(null);
                }}
              >
                <div className="mb-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAssetLocation("all");
                      setAssetLocationType("all");
                      setAssetRoomNumber("all");
                      setAssetRoomItem("all");
                    }}
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
                      {assetLocationType !== "all"
                        ? ` · ${assetLocationType}`
                        : ""}
                      {assetRoomNumber !== "all" ? ` · ${assetRoomNumber}` : ""}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="w-full space-y-1 rounded-lg bg-white p-2">
                    {[
                      "Гурван гол",
                      "Сиэтл оффис",
                      "Гэгээ нарны зам",
                      "Гэгээ яармаг",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onMouseEnter={() => {
                          setHoveredLocation(item);
                          setHoveredType(null);
                          setHoveredRoom(null);
                        }}
                        onClick={() => {
                          setAssetLocation(item);
                          setAssetLocationType("all");
                          setAssetRoomNumber("all");
                          setAssetRoomItem("all");
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition hover:bg-muted/50",
                          assetLocation === item
                            ? "bg-muted/40 font-semibold text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {item}
                        <span className="text-[10px] text-muted-foreground">
                          →
                        </span>
                      </button>
                    ))}
                  </div>

                  {hoveredLocation && (
                    <div className="w-full space-y-1 rounded-lg bg-white p-2">
                      {["Оффис", "Агуулах", "Анги"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onMouseEnter={() => setHoveredType(type)}
                          onClick={() => {
                            setAssetLocation(hoveredLocation);
                            setAssetLocationType(type);
                            setAssetRoomNumber("all");
                            setAssetRoomItem("all");
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
                            <span className="text-[10px] text-muted-foreground">
                              →
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {hoveredLocation &&
                    hoveredType &&
                    LOCATION_ROOM_OPTIONS[hoveredType] && (
                      <div className="w-full space-y-1 rounded-lg bg-white p-2">
                        {LOCATION_ROOM_OPTIONS[hoveredType].map((room) => (
                          <button
                            key={room}
                            type="button"
                            onMouseEnter={() => setHoveredRoom(room)}
                            onClick={() => {
                              setAssetLocation(hoveredLocation);
                              setAssetLocationType(hoveredType);
                              setAssetRoomNumber(room);
                              setAssetRoomItem("all");
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

                  {hoveredLocation === "Гурван гол" &&
                    hoveredType === "Оффис" &&
                    hoveredRoom === "Ариун цэврийн өрөө" && (
                      <div className="w-full space-y-1 rounded-lg bg-white p-2">
                        {[
                          "Dell-ийн дэлгэц",
                          "Mouse",
                          "Keyboard",
                          "Mac mini",
                          "Сандал",
                          "Ширээ",
                        ].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setAssetLocation("Гурван гол");
                              setAssetLocationType("Оффис");
                              setAssetRoomNumber("Ариун цэврийн өрөө");
                              setAssetRoomItem(item);
                            }}
                            className={cn(
                              "flex w-full items-center rounded-md px-3 py-2 text-left text-xs transition hover:bg-muted/50",
                              assetRoomItem === item
                                ? "bg-muted/40 font-semibold text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (allFilteredSelected) {
                        setSelectedAssetIds((prev) =>
                          prev.filter(
                            (id) => !filteredAssets.some((a) => a.id === id),
                          ),
                        );
                      } else {
                        const filteredIds = filteredAssets.map((a) => a.id);
                        setSelectedAssetIds((prev) => {
                          const next = new Set(prev);
                          filteredIds.forEach((id) => next.add(id));
                          return Array.from(next);
                        });
                      }
                    }}
                    disabled={filteredAssets.length === 0}
                  >
                    {allFilteredSelected ? "Бүгдийг цуцлах" : "Select all"}
                  </Button>
                  <Button
                    type="button"
                    variant={showSelectedOnly ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setShowSelectedOnly((prev) => !prev)}
                    disabled={selectedAssetIds.length === 0}
                  >
                    {showSelectedOnly ? "Back" : "Checked"}
                  </Button>
                </div>
                {filteredAssets.length > 5 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllAssets((prev) => !prev)}
                  >
                    {showAllAssets ? "Багаар харах" : "Бүгдийг харах"}
                  </Button>
                )}
              </div>

              {visibleAssets.map((asset) => {
                const isSelected = selectedAssetIds.includes(asset.id);
                return (
                  <label
                    key={asset.id}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-background p-4 text-left shadow-sm transition hover:border-foreground/20",
                      isSelected ? "border-foreground/40 bg-muted/50" : "",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-border text-foreground"
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setSelectedAssetIds((prev) => [...prev, asset.id]);
                          } else {
                            setSelectedAssetIds((prev) =>
                              prev.filter((id) => id !== asset.id),
                            );
                          }
                        }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {asset.id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {asset.serial}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {asset.owner}
                        </p>
                        <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                          Байршил: {asset.location} · {asset.locationType}
                          {asset.locationType === "Анги" && asset.roomNumber
                            ? ` · ${asset.roomNumber}`
                            : ""}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground">
                      {asset.type}
                    </span>
                  </label>
                );
              })}
              {!showAllAssets && filteredAssets.length > 5 && (
                <p className="text-xs text-muted-foreground">
                  Нийт {filteredAssets.length} хөрөнгө байна. (Бүгдийг харах)
                  дээр дарж бүгдийг үзнэ үү.
                </p>
              )}
            </div>
          </Card>

          <Card className="h-full rounded-2xl border-border bg-card p-5 lg:min-h-[620px]">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                3
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Хүсэлт илгээнэ үү
                </p>
                <p className="text-xs text-muted-foreground">
                  Шилжүүлгийн мэдээллийг шалгана уу
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <p className="text-xs text-muted-foreground">Хөрөнгө</p>
                {selectedAssets.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedAssets.map((asset) => (
                      <span
                        key={asset.id}
                        className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {asset.id}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Сонгогдсон хөрөнгө алга
                  </p>
                )}
              </div>
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <p className="text-xs text-muted-foreground">Шинэ эзэмшигч</p>
                <div className="mt-2">
                  <Select
                    value={selectedEmployeeId ?? ""}
                    onValueChange={(value) =>
                      setSelectedEmployeeId(value || null)
                    }
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Сонгох" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emp-battsooj">Battsooj</SelectItem>
                      <SelectItem value="emp-ochirdene">Oochko</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Шалтгаан
                </p>
                <Input
                  className="mt-2"
                  placeholder="Шалтгаан бичнэ үү"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                />
              </div>
            </div>

            <Button
              className="mt-6 w-full"
              onClick={handleSubmit}
              disabled={!selectedAssets.length || !selectedEmployee}
            >
              Хүсэлт илгээх
            </Button>
          </Card>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          <Card className="rounded-2xl border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                2
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Ажилтан сонгоно уу
                </p>
                <p className="text-xs text-muted-foreground">
                  Шинэ эзэмшигчийг сонгоно уу
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Хөрөнгөө сонгоно уу
              </p>
              <Select
                value={selectedTransferAsset}
                onValueChange={setSelectedTransferAsset}
              >
                <SelectTrigger className="w-full bg-muted/40">
                  <SelectValue placeholder="Сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {transferAssetOptions.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex items-center justify-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground">
                Шинэ эзэмшигч
              </p>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Ажилтан хайх..."
                  value={employeeSearch}
                  onChange={(event) => setEmployeeSearch(event.target.value)}
                />
              </div>
              <div className="mt-3 space-y-2">
                {filteredEmployees.map((employee) => (
                  <button
                    key={employee.id}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left text-sm transition hover:border-foreground/20",
                      selectedEmployeeId === employee.id
                        ? "border-foreground/40 bg-muted/50"
                        : "",
                    )}
                    onClick={() => setSelectedEmployeeId(employee.id)}
                    type="button"
                  >
                    <span>
                      <span className="font-medium text-foreground">
                        {employee.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {employee.title}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
