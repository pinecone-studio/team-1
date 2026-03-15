import {
  adminOverrideDisposal,
  adminOverridePurchase,
  adminOverrideOffboarding,
} from "@/db/admin";

export const adminMutations = {
  adminOverrideDisposal: (
    _: unknown,
    args: { id: string; status: string },
  ) => adminOverrideDisposal(args.id, args.status, "SUPER_ADMIN"),
  adminOverridePurchase: (
    _: unknown,
    args: { token: string; status: string },
  ) => adminOverridePurchase(args.token, args.status, "SUPER_ADMIN"),
  adminOverrideOffboarding: (
    _: unknown,
    args: { id: string; status: string },
  ) => adminOverrideOffboarding(args.id, args.status, "SUPER_ADMIN"),
};
