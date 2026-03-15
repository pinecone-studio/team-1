"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Mock data - minimal but complete
const MOCK_ASSET = {
  id: "MAC-2026-001",
  assetTag: "LAPTOP-001",
  serialNumber: "C02XG0FDJGH5",
  status: "Идэвхтэй",
  category: "Компьютер",
  purchaseCost: "2,500,000",
  assignments: [
    {
      id: "asgn-1",
      employee: { firstName: "John", lastName: "Smith" },
      assignedAt: "2025-01-15",
      returnedAt: null,
      conditionAtAssign: "Сайн",
      conditionAtReturn: null,
    },
  ],
  transfers: [
    {
      id: "trf-1",
      fromEmployee: { firstName: "Alice", lastName: "Cooper" },
      toEmployee: { firstName: "John", lastName: "Smith" },
      transferredAt: "2025-11-10",
      reason: "Нэг хэнээс нөгөө хэнд шилжүүлэх",
    },
  ],
  maintenanceTickets: [
    {
      id: "maint-1",
      reportedAt: "2026-03-10",
      description: "Батерей солих",
      status: "Дууссан",
      severity: "Нөхцөлтэй",
      reporter: { firstName: "Bob", lastName: "Wilson" },
    },
  ],
};

export default function AssetDetailPage() {
  const asset = MOCK_ASSET;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Asset Details */}
      <Card>
        <CardHeader>
          <CardTitle>Хөрөнгийн дэлгэрэнгүй: {asset.assetTag}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Сериал дугаар</p>
            <p className="font-medium">{asset.serialNumber}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Төлөв</p>
            <p className="font-medium">{asset.status}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ангилал</p>
            <p className="font-medium">{asset.category}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Худалдан авсан өртөг
            </p>
            <p className="font-medium">{asset.purchaseCost} MNT</p>
          </div>
        </CardContent>
      </Card>

      {/* Asset History */}
      <Card>
        <CardHeader>
          <CardTitle>Хөрөнгийн түүх</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Assignments */}
          <AssetAssignmentHistory assignments={asset.assignments} />

          {/* Transfers */}
          <AssetTransferHistory transfers={asset.transfers} />

          {/* Maintenance */}
          <AssetMaintenanceHistory
            maintenanceTickets={asset.maintenanceTickets}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function AssetAssignmentHistory({
  assignments,
}: {
  assignments: any[] | undefined;
}) {
  return (
    <div>
      <h3 className="font-medium">Олгосон түүх</h3>
      {assignments?.length ? (
        <ul className="list-disc pl-5 space-y-2">
          {assignments.map((a) => (
            <li key={a.id} className="text-sm">
              <span className="font-medium">
                {a.employee.firstName} {a.employee.lastName}
              </span>
              {" • "}
              <span className="text-muted-foreground">
                Assigned: {a.assignedAt}
              </span>
              {" • "}
              <span className="text-muted-foreground">
                Returned: {a.returnedAt || "---"}
              </span>
              {" • "}
              <span className="text-muted-foreground">
                Condition: {a.conditionAtAssign} →{" "}
                {a.conditionAtReturn || "---"}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">Түүх олдсонгүй</p>
      )}
    </div>
  );
}

function AssetTransferHistory({ transfers }: { transfers: any[] | undefined }) {
  return (
    <div>
      <h3 className="font-medium">Шилжүүлэлт</h3>
      {transfers?.length ? (
        <ul className="list-disc pl-5 space-y-2">
          {transfers.map((t) => (
            <li key={t.id} className="text-sm">
              <span className="font-medium">
                {t.fromEmployee.firstName} {t.fromEmployee.lastName}
              </span>
              {" → "}
              <span className="font-medium">
                {t.toEmployee.firstName} {t.toEmployee.lastName}
              </span>
              {" on "}
              <span className="text-muted-foreground">{t.transferredAt}</span>
              {" • "}
              <span className="text-muted-foreground">Reason: {t.reason}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">Шилжүүлэлт байхгүй</p>
      )}
    </div>
  );
}

function AssetMaintenanceHistory({
  maintenanceTickets,
}: {
  maintenanceTickets: any[] | undefined;
}) {
  return (
    <div>
      <h3 className="font-medium">Засвар / үйлчилгээ</h3>
      {maintenanceTickets?.length ? (
        <ul className="list-disc pl-5 space-y-2">
          {maintenanceTickets.map((m) => (
            <li key={m.id} className="text-sm">
              <span className="text-muted-foreground">{m.reportedAt}</span>
              {" • "}
              <span className="font-medium">{m.description}</span>
              {" • "}
              <span className="text-muted-foreground">
                Status: {m.status}, Severity: {m.severity}
              </span>
              {" • "}
              <span className="text-muted-foreground">
                Reported by: {m.reporter.firstName} {m.reporter.lastName}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">Засвар байхгүй</p>
      )}
    </div>
  );
}
