import { getRootCategories } from "@/db/categories";

export const categoryQueries = {
  categories: () => getRootCategories(),
};
