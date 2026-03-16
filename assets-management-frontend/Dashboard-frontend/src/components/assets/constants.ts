import type { AssetCategory } from "@/lib/types";

export const CATEGORY_LABELS: Record<AssetCategory, string> = {
  LAPTOP: "Зөөврийн компьютер",
  DESKTOP: "Суурин компьютер",
  MONITOR: "Дэлгэц",
  PHONE: "Утас",
  TABLET: "Таблет",
  PRINTER: "Принтер",
  NETWORK: "Сүлжээ",
  ACCESSORIES: "Дагалдах хэрэгсэл",
  OTHER: "Бусад",
  CHAIR: "Сандал",
  DESK: "Ширээ",
  CABINET: "Тавиур",
  SOFA: "Буйдан",
  AIR_CONDITIONER: "Агааржуулалт",
  WATER_DISPENSER: "Усны диспенсер",
  TELEVISION: "Телевизор",
  FRIDGE: "Хөргөгч",
  MICROWAVE: "Микровейв",
  FIRE_EXTINGUISHER: "Гал унтраагч",
  CCTV: "Хяналтын камер",
  ACCESS_CONTROL: "Нэвтрэх хяналт",
  STATIONERY_SET: "Бичиг хэргийн багц",
  PAPER: "Цаас",
  KITCHENWARE: "Гал тогооны хэрэгсэл",
  CONSUMABLES: "Хэрэглээний материал",
  CLEANING_TOOLS: "Цэвэрлэгээний багаж",
  DETERGENTS: "Угаалгын нунтаг/шингэн",
};

export const MAIN_CATEGORY_OPTIONS = [
  { value: "it", label: "IT тоног төхөөрөмж" },
  { value: "furniture", label: "Тавилга" },
  { value: "electric", label: "Цахилгаан хэрэгсэл" },
  { value: "security", label: "Аюулгүй байдал" },
  { value: "stationery", label: "Бичиг хэргийн материал" },
  { value: "kitchen", label: "Гал тогооны хангамж" },
  { value: "office_supply", label: "Аж ахуйн хангамж" },
];

/** Үндсэн ангилал бүрт харьяалагдах дэд ангиллууд */
export const SUB_CATEGORIES_BY_MAIN: Record<string, AssetCategory[]> = {
  "IT тоног төхөөрөмж": [
    "LAPTOP",
    "DESKTOP",
    "MONITOR",
    "PHONE",
    "TABLET",
    "PRINTER",
    "NETWORK",
    "ACCESSORIES",
    "OTHER",
  ],
  Тавилга: ["CHAIR", "DESK", "CABINET", "SOFA", "OTHER"],
  "Цахилгаан хэрэгсэл": [
    "AIR_CONDITIONER",
    "WATER_DISPENSER",
    "TELEVISION",
    "FRIDGE",
    "MICROWAVE",
    "OTHER",
  ],
  "Аюулгүй байдал": ["FIRE_EXTINGUISHER", "CCTV", "ACCESS_CONTROL", "OTHER"],
  "Бичиг хэргийн материал": ["STATIONERY_SET", "PAPER", "OTHER"],
  "Гал тогооны хангамж": ["KITCHENWARE", "CONSUMABLES", "OTHER"],
  "Аж ахуйн хангамж": ["CLEANING_TOOLS", "DETERGENTS", "OTHER"],
};

export const LOCATION_OPTIONS = ["Гурван гол", "Gallery", "Seattle"];

export const ROOM_TYPE_OPTIONS = [
  { value: "Оффис", label: "Оффис" },
  { value: "Гадаа агуулах", label: "Гадаа агуулах" },
];

export const SUB_ROOM_TYPES: Record<string, string[]> = {
  Оффис: [
    "Заал",
    "Гал тогоо",
    "Хурлын өрөө",
    "Багш нарын өрөө",
    "Ариун цэврийн өрөө",
    "Агуулах",
    "Анги",
  ],
  "Гадаа агуулах": ["Контейнер 1", "Контейнер 2", "Магадлах хэсэг"],
};

export const FINAL_ROOM_OPTIONS: Record<string, string[]> = {
  Агуулах: ["3 давхар агуулах", "4 давхар агуулах"],
  Анги: ["301", "302", "303", "304", "305", "306", "401", "402", "403"],
  Заал: ["3 давхар заал", "4 давхар заал"],
  "Ариун цэврийн өрөө": [
    "3 давхар ариун цэврийн өрөө",
    "4 давхар ариун цэврийн өрөө",
  ],
};

// import type { AssetCategory } from "@/lib/types";

// export const CATEGORY_LABELS: Record<AssetCategory, string> = {
//   LAPTOP: "Зөөврийн компьютер",
//   DESKTOP: "Суурин компьютер",
//   MONITOR: "Дэлгэц",
//   PHONE: "Утас",
//   TABLET: "Таблет",
//   PRINTER: "Принтер",
//   NETWORK: "Сүлжээ",
//   OTHER: "Бусад",
// };

// export const MAIN_CATEGORY_OPTIONS = [
//   { value: "shiree", label: "IT тоног төхөөрөмж" },
//   { value: "sandal", label: "Тавилга" },
//   { value: "shkaw", label: "Дагалдах хэрэгсэл" },
//   { value: "tsonh", label: "Цахилгаан хэрэгсэл" },
//   { value: "haalga", label: "Гэр ахуй" },
// ];

// export const LOCATION_OPTIONS = ["Гурван гол", "Gallery", "Tokyo", "Sednay"];

// export const ROOM_TYPE_OPTIONS = [
//   { value: "office", label: "Office" },
//   { value: "aguu", label: "Агуулах" },
//   { value: "angi", label: "Анги" },
// ];

// export const ROOM_OPTIONS_BY_TYPE: Record<string, string[]> = {
//   office: [
//     "Ариун цэврийн өрөө",
//     "3 давхрын заал",
//     "4 давхрын заал",
//     "Гал тогоо",
//     "Хурлын өрөө",
//   ],
//   aguu: ["3-н давхар", "4-н давхар"],
//   angi: ["301", "302", "303", "304", "305", "306"],
// };

// export const getRoomTypeLabel = (value: string) =>
//   ROOM_TYPE_OPTIONS.find((item) => item.value === value)?.label ?? "";
