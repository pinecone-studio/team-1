export function formatAssetId(id: string) {
    if (!id) return "";
  
    const parts = id.split("-");
    const firstThree = parts.slice(0, 3);
  
    if (firstThree.length > 0) {
      firstThree[0] = firstThree[0].slice(0, 3);
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