import { getVendors } from "@/db/vendors";
import { getLocations } from "@/db/locations";

export const catalogQueries = {
  vendors: () => getVendors(),
  locations: () => getLocations(),
};
