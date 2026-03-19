export const QR_TILES_PER_A4_PAGE = 28;

export const STATUS_LABELS = {
  AVAILABLE: {
    label: "Эзэмшигчгүй",
    className: "border-green-700/30 bg-green-100 text-green-800",
  },

  ASSIGNED: {
    label: "Эзэмшигчтэй",
    className: "border-blue-700/30 bg-blue-100 text-blue-800",
  },

  ASSIGN_REQUESTED: {
    label: "Хуваарилалт хүссэн",
    className: "border-amber-700/30 bg-amber-100 text-amber-800",
  },

  RETURNING: {
    label: "Буцааж байна",
    className: "border-purple-700/30 bg-purple-100 text-purple-800",
  },

  RETURNED: {
    label: "Буцаасан",
    className: "border-gray-600/30 bg-gray-100 text-gray-600",
  },

  IN_REPAIR: {
    label: "Засварт",
    className: "border-orange-700/30 bg-orange-100 text-orange-800",
  },

  DAMAGED: {
    label: "Эвдрэлтэй",
    className: "border-red-700/30 bg-red-100 text-red-800",
  },

  DISPOSAL_REQUESTED: {
    label: "Устгах хүсэлт",
    className: "border-red-700/30 bg-red-100 text-red-800",
  },

  PENDING_DISPOSAL: {
    label: "Устгах хүлээгдэж буй",
    className: "border-gray-700/30 bg-gray-200 text-gray-800",
  },

  DISPOSED: {
    label: "Устгасан",
    className: "border-gray-700/30 bg-gray-300 text-gray-700",
  },

  FOR_SALE: {
    label: "Зарж болох",
    className: "border-yellow-700/30 bg-yellow-100 text-yellow-800",
  },

  REPAIR_REQUESTED: {
    label: "Засвралахын хүсэж байна",
    className: "border-yellow-700/30 bg-yellow-100 text-yellow-800",
  },
};
