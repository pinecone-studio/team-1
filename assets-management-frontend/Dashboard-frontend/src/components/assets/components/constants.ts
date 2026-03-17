export const MAIN_CATEGORY_OPTIONS = [
  { value: "shiree", label: "IT тоног төхөөрөмж" },
  { value: "sandal", label: "Тавилга" },
  { value: "shkaw", label: "Дагалдах хэрэгсэл" },
  { value: "tsonh", label: "Цахилгаан хэрэгсэл" },
  { value: "haalga", label: "Гэр ахуй" },
];

export const LOCATION_OPTIONS = ["Гурван гол", "Gallery", "Tokyo", "Sednay"];

export const ROOM_TYPE_OPTIONS = [
  { value: "office", label: "Оффис" },
  { value: "aguu", label: "Агуулах" },
  { value: "angi", label: "Анги" },
];

export const ROOM_OPTIONS_BY_TYPE: Record<string, string[]> = {
  office: [
    "Ариун цэврийн өрөө",
    "3 давхрын заал",
    "4 давхрын заал",
    "Гал тогоо",
    "Хурлын өрөө",
  ],
  aguu: ["3-н давхар", "4-н давхар"],
  angi: ["301", "302", "303", "304"],
};

export const getRoomTypeLabel = (value: string) =>
  ROOM_TYPE_OPTIONS.find((item) => item.value === value)?.label ?? "";
