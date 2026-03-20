export function formatAssetId(id: string) {
  if (!id) return "";

  const firstThree = id.split("-").slice(0, 3);

  if (firstThree[0]) {
    firstThree[0] = firstThree[0].slice(0, 3);
  }

  if (firstThree[2]) {
    firstThree[2] = firstThree[2].slice(0, 3);
  }

  return firstThree.join("-");
}

export function formatName(name?: string) {
  if (!name) return "—";

  const parts = name.trim().split(" ");

  if (parts.length === 1) return parts[0];

  const firstInitial = parts[0][0].toUpperCase();
  const lastName = parts[1];

  return `${firstInitial}.${lastName}`;
}

export function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
