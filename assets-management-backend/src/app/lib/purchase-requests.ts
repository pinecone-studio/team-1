import {
  decidePurchaseRequestsByToken,
  getPurchaseRequestsByToken,
} from "@/db/purchaseRequests";
import { ensureCategoryId, createAsset } from "@/db/assets/mutations";

export async function approvePurchaseRequestByToken(
  token: string,
  approverEmail: string,
) {
  const requests = await getPurchaseRequestsByToken(token);
  if (!requests.length) throw new Error("Request not found");

  for (const request of requests) {
    if (request.status !== "PENDING") continue;
    const subCategoryId = await ensureCategoryId(request.category);
    await createAsset({
      assetTag: request.assetTag,
      serialNumber: request.serialNumber,
      purchaseCost: request.purchaseCost ?? undefined,
      purchaseDate: request.purchaseDate ?? undefined,
      currentBookValue: request.purchaseCost ?? undefined,
      subCategoryId,
      status: "AVAILABLE",
    });
  }

  const updated = await decidePurchaseRequestsByToken(
    token,
    "APPROVED",
    approverEmail,
  );
  return updated[0];
}

export async function declinePurchaseRequestByToken(
  token: string,
  approverEmail: string,
) {
  const requests = await getPurchaseRequestsByToken(token);
  if (!requests.length) throw new Error("Request not found");
  const updated = await decidePurchaseRequestsByToken(
    token,
    "DECLINED",
    approverEmail,
  );
  return updated[0];
}
