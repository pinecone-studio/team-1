import { ensureCategoryId, createAsset } from "@/db/assets/mutations";
import {
  createPurchaseRequest,
  createPurchaseRequestsBatch,
  decidePurchaseRequestsByToken,
  getPurchaseRequestsByToken,
} from "@/db/purchaseRequests";
import {
  sendEmail,
  buildPurchaseRequestEmail,
  buildPurchaseRequestSummaryEmail,
} from "@/app/lib/email";
import type { GraphQLContext } from "@/graphql-gql/context";
import { bumpCacheVersion } from "@/graphql-gql/cache/queryCache";
import { bumpAssetsCacheVersion } from "@/graphql-gql/cache/assetsListCache";

export const purchaseRequestMutations = {
  createPurchaseRequest: async (
    _: unknown,
    args: {
      assetTag: string;
      category: string;
      serialNumber: string;
      purchaseCost?: number | null;
      purchaseDate?: number | null;
      requesterEmployeeId: string;
      requesterEmail: string;
    },
    ctx: GraphQLContext,
  ) => {
    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const request = await createPurchaseRequest({
      assetTag: args.assetTag,
      category: args.category,
      serialNumber: args.serialNumber,
      purchaseCost: args.purchaseCost ?? undefined,
      purchaseDate: args.purchaseDate ?? undefined,
      requesterEmployeeId: args.requesterEmployeeId,
      requesterEmail: args.requesterEmail,
      token,
      expiresAt,
    });

    const baseUrl = process.env.APP_BASE_URL ?? "";
    const approveUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=approve`;
    const declineUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=decline`;

    const approverEmail = process.env.APPROVER_EMAIL;
    if (!approverEmail) {
      throw new Error("Missing APPROVER_EMAIL");
    }

    const html = buildPurchaseRequestEmail({
      assetTag: args.assetTag,
      category: args.category,
      serialNumber: args.serialNumber,
      purchaseCost: args.purchaseCost ?? undefined,
      purchaseDate: args.purchaseDate ?? undefined,
      requesterEmail: args.requesterEmail,
      approveUrl,
      declineUrl,
    });

    await sendEmail({
      to: approverEmail,
      subject: "Asset purchase approval request",
      html,
    });

    await bumpCacheVersion(ctx, "purchase:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return request!;
  },
  createPurchaseRequestBatch: async (
    _: unknown,
    args: {
      items: Array<{
        assetTag: string;
        category: string;
        serialNumber: string;
        purchaseCost?: number | null;
        purchaseDate?: number | null;
      }>;
      requesterEmployeeId: string;
      requesterEmail: string;
    },
    ctx: GraphQLContext,
  ) => {
    if (!args.items.length) {
      throw new Error("Items are required");
    }

    const baseUrl = process.env.APP_BASE_URL ?? "";
    const approverEmail = process.env.APPROVER_EMAIL;
    if (!approverEmail) {
      throw new Error("Missing APPROVER_EMAIL");
    }

    if (args.items.length <= 5) {
      const results = [];
      for (const item of args.items) {
        const token = crypto.randomUUID();
        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
        const request = await createPurchaseRequest({
          assetTag: item.assetTag,
          category: item.category,
          serialNumber: item.serialNumber,
          purchaseCost: item.purchaseCost ?? undefined,
          purchaseDate: item.purchaseDate ?? undefined,
          requesterEmployeeId: args.requesterEmployeeId,
          requesterEmail: args.requesterEmail,
          token,
          expiresAt,
        });

        const approveUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=approve`;
        const declineUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=decline`;

        const html = buildPurchaseRequestEmail({
          assetTag: item.assetTag,
          category: item.category,
          serialNumber: item.serialNumber,
          purchaseCost: item.purchaseCost ?? undefined,
          purchaseDate: item.purchaseDate ?? undefined,
          requesterEmail: args.requesterEmail,
          approveUrl,
          declineUrl,
        });

        await sendEmail({
          to: approverEmail,
          subject: "Asset purchase approval request",
          html,
        });

        if (request) results.push(request);
      }
      await bumpCacheVersion(ctx, "purchase:cache_version");
      await bumpCacheVersion(ctx, "dashboard:cache_version");
      return results;
    }

    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const batch = args.items.map((item) => ({
      assetTag: item.assetTag,
      category: item.category,
      serialNumber: item.serialNumber,
      purchaseCost: item.purchaseCost ?? undefined,
      purchaseDate: item.purchaseDate ?? undefined,
      requesterEmployeeId: args.requesterEmployeeId,
      requesterEmail: args.requesterEmail,
      token,
      expiresAt,
    }));

    const requests = await createPurchaseRequestsBatch(batch);

    const approveUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=approve`;
    const declineUrl = `${baseUrl}/api/purchase-requests/decision?token=${token}&action=decline`;

    const html = buildPurchaseRequestSummaryEmail({
      requesterEmail: args.requesterEmail,
      totalCount: args.items.length,
      sampleAssetTags: args.items.slice(0, 5).map((item) => item.assetTag),
      approveUrl,
      declineUrl,
    });

    await sendEmail({
      to: approverEmail,
      subject: "Asset purchase approval request (Batch)",
      html,
    });

    await bumpCacheVersion(ctx, "purchase:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return requests;
  },
  approvePurchaseRequest: async (
    _: unknown,
    args: { token: string; approverEmail: string },
    ctx: GraphQLContext,
  ) => {
    const requests = await getPurchaseRequestsByToken(args.token);
    if (!requests.length) throw new Error("Request not found");

    for (const request of requests) {
      if (request.status !== "PENDING") continue;
      const categoryId = await ensureCategoryId(request.categoryId, undefined);
      await createAsset({
        assetTag: request.assetTag,
        serialNumber: request.serialNumber,
        purchaseCost: request.purchaseCost ?? undefined,
        purchaseDate: request.purchaseDate ?? undefined,
        categoryId,
        status: "AVAILABLE",
      });
    }

    const updated = await decidePurchaseRequestsByToken(
      args.token,
      "APPROVED",
      args.approverEmail,
    );

    await bumpCacheVersion(ctx, "purchase:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    await bumpAssetsCacheVersion(ctx);
    return updated[0];
  },
  declinePurchaseRequest: async (
    _: unknown,
    args: { token: string; approverEmail: string },
    ctx: GraphQLContext,
  ) => {
    const requests = await getPurchaseRequestsByToken(args.token);
    if (!requests.length) throw new Error("Request not found");

    const updated = await decidePurchaseRequestsByToken(
      args.token,
      "DECLINED",
      args.approverEmail,
    );

    await bumpCacheVersion(ctx, "purchase:cache_version");
    await bumpCacheVersion(ctx, "dashboard:cache_version");
    return updated[0];
  },
};
