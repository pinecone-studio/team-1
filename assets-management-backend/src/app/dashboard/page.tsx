"use client";

import { useEffect, useState } from "react";
import DashboardRoleSwitcher from "../components/DashboardRoleSwitcher";
import AdminActionPanel from "../components/AdminActionPanel";


type Role = "SUPER_ADMIN" | "IT_ADMIN" | "EMPLOYEE" | "FINANCE";

export default function DashboardPage() {
    const [role, setRole] = useState<Role>("SUPER_ADMIN");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboard = async (selectedRole: Role) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/api/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
            query GetDashboard($role: UserRole!) {
              dashboard(role: $role) {
                itView {
                  recentAssets { id assetTag status serialNumber }
                  openTickets { id description severity status }
                  pendingTransfers { id assetId transferredAt }
                  notifications { id title message type createdAt }
                }
                employeeView {
                  myAssets { id assetTag serialNumber status }
                  myAssignments { id assetId assignedAt returnedAt }
                  notifications { id title message type createdAt }
                }
                financeView {
                  pendingPurchaseRequests { id assetTag requesterEmail purchaseCost }
                  recentOrders { id totalCost status createdAt }
                  pendingDisposals { id assetId method reason }
                  notifications { id title message type createdAt }
                }
              }
            }
          `,
                    variables: { role: selectedRole },
                }),
            });

            const result = (await response.json()) as any;
            if (result.errors) {
                throw new Error(result.errors[0].message);
            }
            setData(result.data.dashboard);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard(role);
    }, [role]);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Central Command Center
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
                        System visibility & administrative control
                    </p>
                </div>
                <DashboardRoleSwitcher currentRole={role} onRoleChange={setRole} />
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8 flex items-center gap-3">
                    <span className="text-xl">⚠️</span> {error}
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-white dark:bg-zinc-900 rounded-3xl animate-pulse shadow-sm border border-zinc-200 dark:border-zinc-800" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* IT ADMIN VIEW */}
                    {(role === "SUPER_ADMIN" || role === "IT_ADMIN") && data?.itView && (
                        <DashboardCard
                            title="IT Operations"
                            icon="🖥️"
                            color="indigo"
                            badge={data.itView.notifications.length}
                        >
                            <StatRow label="Recent Assets" value={data.itView.recentAssets.length} />
                            <StatRow label="Open Tickets" value={data.itView.openTickets.length} />
                            <StatRow label="Pending Transfers" value={data.itView.pendingTransfers.length} />
                            <div className="mt-6 space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Recent Alerts</h4>
                                {data.itView.notifications.slice(0, 3).map((n: any) => (
                                    <NotificationItem key={n.id} n={n} />
                                ))}
                            </div>
                        </DashboardCard>
                    )}

                    {/* FINANCE VIEW */}
                    {(role === "SUPER_ADMIN" || role === "FINANCE") && data?.financeView && (
                        <DashboardCard
                            title="Finance & Procurement"
                            icon="💰"
                            color="emerald"
                            badge={data.financeView.notifications.length}
                        >
                            <StatRow label="Purchase Requests" value={data.financeView.pendingPurchaseRequests.length} />
                            <StatRow label="Recent Orders" value={data.financeView.recentOrders.length} />
                            <StatRow label="Pending Disposals" value={data.financeView.pendingDisposals.length} />
                            <div className="mt-6 space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Financial Alerts</h4>
                                {data.financeView.notifications.slice(0, 3).map((n: any) => (
                                    <NotificationItem key={n.id} n={n} />
                                ))}
                            </div>
                        </DashboardCard>
                    )}

                    {/* EMPLOYEE VIEW (Simulated for self if in Super Admin/Employee) */}
                    {(role === "SUPER_ADMIN" || role === "EMPLOYEE") && data?.employeeView && (
                        <DashboardCard
                            title="My Workspace"
                            icon="👤"
                            color="amber"
                            badge={data.employeeView.notifications.length}
                        >
                            <StatRow label="Assigned Assets" value={data.employeeView.myAssets.length} />
                            <StatRow label="Total Assignments" value={data.employeeView.myAssignments.length} />
                            <div className="mt-6 space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">My Activity</h4>
                                {data.employeeView.notifications.slice(0, 3).map((n: any) => (
                                    <NotificationItem key={n.id} n={n} />
                                ))}
                            </div>
                        </DashboardCard>
                    )}
                </div>
            )}

            {/* Admin Quick Actions */}
            {role === "SUPER_ADMIN" && <AdminActionPanel />}

            {/* Footer / Quick Actions */}

            <div className="mt-12 flex gap-4">
                <button onClick={() => fetchDashboard(role)} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-6 py-2 rounded-xl text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                    🔄 Refresh Data
                </button>
            </div>
        </div>
    );
}

function DashboardCard({ title, icon, color, children, badge }: any) {
    const colorMap: any = {
        indigo: "bg-indigo-50/50 border-indigo-100 dark:bg-indigo-900/10 dark:border-indigo-900/30",
        emerald: "bg-emerald-50/50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/30",
        amber: "bg-amber-50/50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30",
    };

    return (
        <div className={`
      relative p-8 rounded-[2.5rem] border shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group
      ${colorMap[color] || "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"}
    `}>
            {badge > 0 && (
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform">
                    {badge}
                </div>
            )}
            <div className="flex items-center gap-4 mb-8">
                <div className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
                <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

function StatRow({ label, value }: any) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-zinc-200/50 dark:border-zinc-800/50 last:border-0">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">{label}</span>
            <span className="text-lg font-bold tabular-nums">{value}</span>
        </div>
    );
}

function NotificationItem({ n }: any) {
    return (
        <div className="p-3 bg-white/40 dark:bg-zinc-800/40 rounded-2xl border border-white/50 dark:border-zinc-700/50 shadow-sm">
            <p className="text-sm font-bold truncate">{n.title}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">{n.message}</p>
        </div>
    );
}
