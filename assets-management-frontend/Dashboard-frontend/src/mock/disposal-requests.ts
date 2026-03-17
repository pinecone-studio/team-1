export type DisposalRequestRow = {
  id: string;
  assetName: string;
  assetId: string;
  owner: string;
  transferType: string;
};

export const MOCK_DISPOSAL_REQUESTS: DisposalRequestRow[] = [
  {
    id: "demo-1",
    assetName: "MacBook Pro",
    assetId: "MAC-2026-001",
    owner: "Батaa",
    transferType: "Хөрөнгө устгах",
  },
  {
    id: "demo-2",
    assetName: "Монитор",
    assetId: "MON-2025-045",
    owner: "Батaa",
    transferType: "Хөрөнгө засварлах",
  },
];

export const MOCK_APPROVED_DISPOSALS: DisposalRequestRow[] = [
  {
    id: "approved-1",
    assetName: "MacBook Pro",
    assetId: "MAC-2026-001",
    owner: "Батaa",
    transferType: "Хөрөнгө устгах",
  },
  {
    id: "approved-2",
    assetName: "Монитор",
    assetId: "MON-2025-045",
    owner: "Батaa",
    transferType: "Хөрөнгө засварлах",
  },
];
