import { employeeQueries } from "./employeeQueries";
import { assetQueries } from "./assetQueries";
import { assignmentQueries } from "./assignmentQueries";
import { purchaseRequestQueries } from "./purchaseRequestQueries";
import { categoryQueries } from "./categoryQueries";
import { disposalQueries } from "./disposalQueries";
import { offboardingQueries } from "./offboardingQueries";
import { dashboardQueries } from "./dashboardQueries";
import { catalogQueries } from "./catalogQueries";
import { miscQueries } from "./miscQueries";

export const Query = {
  ...employeeQueries,
  ...assetQueries,
  ...assignmentQueries,
  ...purchaseRequestQueries,
  ...categoryQueries,
  ...disposalQueries,
  ...offboardingQueries,
  ...dashboardQueries,
  ...catalogQueries,
  ...miscQueries,
};
