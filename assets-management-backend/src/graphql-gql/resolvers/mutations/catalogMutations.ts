import { createVendor, updateVendor, deleteVendor } from "@/db/vendors";
import { createLocation, updateLocation, deleteLocation } from "@/db/locations";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/db/categories";

export const catalogMutations = {
  createVendor: (_: unknown, args: { input: any }) =>
    createVendor(args.input),
  updateVendor: (_: unknown, args: { id: string; input: any }) =>
    updateVendor(args.id, args.input),
  deleteVendor: (_: unknown, args: { id: string }) =>
    deleteVendor(args.id),

  createLocation: (_: unknown, args: { input: any }) =>
    createLocation(args.input),
  updateLocation: (_: unknown, args: { id: string; input: any }) =>
    updateLocation(args.id, args.input),
  deleteLocation: (_: unknown, args: { id: string }) =>
    deleteLocation(args.id),

  createCategory: (
    _: unknown,
    args: { name: string; parentId?: string },
  ) => createCategory(args.name, args.parentId),
  updateCategory: (
    _: unknown,
    args: { id: string; name?: string; parentId?: string },
  ) => updateCategory(args.id, args.name, args.parentId),
  deleteCategory: (_: unknown, args: { id: string }) =>
    deleteCategory(args.id),
};
