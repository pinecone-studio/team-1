import { employeeMutations } from "./employeeMutations";
import { assetMutations } from "./assetMutations";
import { assignmentMutations } from "./assignmentMutations";
import { purchaseRequestMutations } from "./purchaseRequestMutations";
import { disposalMutations } from "./disposalMutations";
import { offboardingMutations } from "./offboardingMutations";
import { maintenanceMutations } from "./maintenanceMutations";
import { catalogMutations } from "./catalogMutations";
import { notificationMutations } from "./notificationMutations";
import { adminMutations } from "./adminMutations";
import { censusMutations } from "./censusMutations";

export const Mutation = {
  ...employeeMutations,
  ...assetMutations,
  ...assignmentMutations,
  ...purchaseRequestMutations,
  ...disposalMutations,
  ...offboardingMutations,
  ...maintenanceMutations,
  ...catalogMutations,
  ...notificationMutations,
  ...adminMutations,
  ...censusMutations,
};
