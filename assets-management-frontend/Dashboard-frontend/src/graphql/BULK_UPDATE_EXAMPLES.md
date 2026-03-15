# Bulk Update Assets - Examples & Usage Guide

## Overview

The `BulkUpdateAssets` mutation allows updating multiple assets with the same location, category, status, or other fields in a single API call. This is perfect for operations like:

- Moving entire office rooms' assets (301 → 401)
- Batch category updates
- Bulk status changes

## GraphQL Mutation

```graphql
mutation BulkUpdateAssets($assetIds: [ID!]!, $input: AssetUpdateInput!) {
  bulkUpdateAssets(assetIds: $assetIds, input: $input) {
    id
    assetTag
    location
    category
    status
  }
}
```

## Example 1: Move All Assets from Room 301 to Room 401

### Query

```graphql
mutation {
  bulkUpdateAssets(
    assetIds: ["ASSET-001", "ASSET-002", "ASSET-003", "ASSET-004"]
    input: { location: "Гурван гол / Оффис / Өрөө 401" }
  ) {
    id
    assetTag
    location
    status
  }
}
```

### React Hook

```typescript
const [bulkUpdateAssets] = useMutation(BulkUpdateAssetsMutation);

// Get all assets in room 301
const room301Assets = assets.filter((a) => a.location?.includes("301"));
const assetIds = room301Assets.map((a) => a.id);

// Move them all to room 401
await bulkUpdateAssets({
  variables: {
    assetIds,
    input: {
      location: "Гурван гол / Оффис / Өрөө 401",
    },
  },
  refetchQueries: [{ query: GetAssetsDocument }],
});
```

## Example 2: Bulk Category Update

```typescript
// Update all laptops from "Computer" to "Technology"
const laptopAssets = assets.filter((a) => a.category === "COMPUTER");

await bulkUpdateAssets({
  variables: {
    assetIds: laptopAssets.map((a) => a.id),
    input: {
      category: "TECHNOLOGY",
    },
  },
});
```

## Example 3: Batch Status Change

```typescript
// Mark all items in repair as "IN_REPAIR"
const itemsToRepair = ["ASSET-045", "ASSET-046", "ASSET-047"];

await bulkUpdateAssets({
  variables: {
    assetIds: itemsToRepair,
    input: {
      status: "IN_REPAIR",
    },
  },
});
```

## Example 4: Combined Update (Location + Status)

```typescript
// Move and update status in one call
await bulkUpdateAssets({
  variables: {
    assetIds: ["ASSET-001", "ASSET-002"],
    input: {
      location: "Гурван гол / Оффис / Өрөө 301",
      status: "AVAILABLE",
    },
  },
});
```

## Using in Components

### Simple Hook

```typescript
function useUpdateAssetsLocation() {
  const [bulkUpdate, { loading, error }] = useMutation(
    BulkUpdateAssetsMutation,
  );

  return async (assetIds: string[], newLocation: string) => {
    return bulkUpdate({
      variables: {
        assetIds,
        input: { location: newLocation },
      },
    });
  };
}
```

### With Progress Tracking

```typescript
async function bulkUpdateWithProgress(assetIds: string[], newLocation: string) {
  const batchSize = 10;
  let processed = 0;

  for (let i = 0; i < assetIds.length; i += batchSize) {
    const batch = assetIds.slice(i, i + batchSize);

    await bulkUpdateAssets({
      variables: {
        assetIds: batch,
        input: { location: newLocation },
      },
    });

    processed += batch.length;
    console.log(`Updated ${processed}/${assetIds.length} assets`);
  }
}
```

## Field Update Options

The `AssetUpdateInput` supports:

- `location` - Update asset location (e.g., "Өрөө 401")
- `category` - Change asset category
- `status` - Update status (AVAILABLE, ASSIGNED, IN_REPAIR, PENDING_DISPOSAL, DISPOSED)
- `assignedTo` - Set assigned employee
- `purchaseCost` - Update cost value
- `currentBookValue` - Update book value

## Best Practices

1. **Batch Size**: Process in batches of 10-50 items for optimal performance
2. **Confirmation**: Always show a summary before executing bulk updates
3. **Error Handling**: Wrap in try-catch and show user feedback
4. **Validation**: Verify asset IDs exist before updating
5. **Refetch**: Include `refetchQueries` to update UI automatically

## Example Component

See `bulk-update-example.tsx` for a production-ready component showing:

- Asset selection from room 301
- Bulk update with progress UI
- Success/error states
- Refetch and cache updates
