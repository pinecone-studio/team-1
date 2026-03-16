"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { GetAssetsDocument, AssetFieldsFragmentDoc } from "@/gql/graphql";
import { useFragment } from "@/gql/fragment-masking";
import gql from "graphql-tag";

const BulkUpdateAssetsMutation = gql`
  mutation BulkUpdateAssets($assetIds: [ID!]!, $input: AssetUpdateInput!) {
    bulkUpdateAssets(assetIds: $assetIds, input: $input) {
      id
      assetTag
      location
      category
      status
    }
  }
`;

export function BulkUpdateAssetsExample() {
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState("Өрөө 401");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const { data } = useQuery(GetAssetsDocument, {
    variables: {
      office: "Гурван гол",
      categoryIds: [],
      subCategoryIds: [],
    },
  });

  const [bulkUpdateAssets, { loading }] = useMutation(BulkUpdateAssetsMutation);

  // Unwrap fragment types and find assets in room 301
  const room301Assets =
    (data?.assets || [])
      .map((asset) => useFragment(AssetFieldsFragmentDoc, asset))
      .filter((asset) => asset.serialNumber?.toUpperCase().includes("301")) ||
    [];

  const handleSelectAll301Assets = () => {
    setSelectedAssetIds(room301Assets.map((a) => a.id));
  };

  const handleBulkUpdate = async () => {
    if (selectedAssetIds.length === 0) {
      setStatus("error");
      setMessage("Ямар ч хөрөнгө сонгоогүй байна");
      return;
    }

    try {
      setStatus("loading");
      await bulkUpdateAssets({
        variables: {
          assetIds: selectedAssetIds,
          input: {
            location: newLocation,
          },
        },
        refetchQueries: [GetAssetsDocument],
      });
      setStatus("success");
      setMessage(`${selectedAssetIds.length} хөрөнгө амжилттай шилжүүлэгдлээ`);
      setSelectedAssetIds([]);
    } catch (error) {
      setStatus("error");
      setMessage("Шилжүүлэлт амжилтгүй. Дахин оролдоно уу.");
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Олон хөрөнгөг шилжүүлэх (301 → 401)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Room 301 Assets List */}
        <div>
          <h3 className="text-sm font-semibold mb-3">
            Өрөө 301 (олдсон: {room301Assets.length})
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3 bg-muted/30">
            {room301Assets.length > 0 ? (
              room301Assets.map((asset) => (
                <label
                  key={asset.id}
                  className="flex items-center gap-3 p-2 hover:bg-muted rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedAssetIds.includes(asset.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAssetIds((prev) => [...prev, asset.id]);
                      } else {
                        setSelectedAssetIds((prev) =>
                          prev.filter((id) => id !== asset.id),
                        );
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {asset.assetTag}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {asset.serialNumber ?? "—"}
                    </p>
                  </div>
                </label>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">
                Өрөө 301-д хөрөнгө олдсонгүй
              </p>
            )}
          </div>
        </div>

        {/* Selection Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">{selectedAssetIds.length}</span>{" "}
            хөрөнгө сонгогдсон → шилжүүлэх байршил:{" "}
            <span className="font-semibold">{newLocation}</span>
          </p>
        </div>

        {/* Status Message */}
        {status === "success" && (
          <div className="flex gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
            <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
            <p className="text-sm text-green-800">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-800">{message}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll301Assets}
            disabled={loading}
          >
            Бүхнийг сонгох ({room301Assets.length})
          </Button>

          <Button
            size="sm"
            onClick={() => setSelectedAssetIds([])}
            variant="ghost"
            disabled={loading}
          >
            Цэвэрлэх
          </Button>

          <Button
            size="sm"
            onClick={handleBulkUpdate}
            disabled={loading || selectedAssetIds.length === 0}
            className="ml-auto"
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {loading ? "Шилжүүлж байна..." : "Шилжүүлэх"}
          </Button>
        </div>

        {/* Code Example */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            Ашиглалтын жишээ:
          </p>
          <pre className="text-xs overflow-x-auto text-slate-600">
            {`const [bulkUpdate] = useMutation(BulkUpdateAssetsMutation);

await bulkUpdate({
  variables: {
    assetIds: ["ASSET-001", "ASSET-002", "ASSET-003"],
    input: {
      location: "Өрөө 401"
    }
  }
});`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
