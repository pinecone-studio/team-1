"use client";

import { useState } from "react";

export default function AdminActionPanel() {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const sendGlobalAlert = async () => {
        const title = prompt("Alert Title:");
        const message = prompt("Message:");
        if (!title || !message) return;

        setLoading(true);
        try {
            const res = await fetch("/api/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
            mutation SendAlert($input: NotificationInput!) {
              sendNotification(input: $input) { id }
            }
          `,
                    variables: {
                        input: { title, message, type: "URGENT", role: "SUPER_ADMIN" }
                    }
                })
            });
            const result = (await res.json()) as any;
            if (result.errors) throw new Error(result.errors[0].message);

            setMsg("✅ Alert broadcasted successfully.");
        } catch (err: any) {
            setMsg(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
                    <span className="text-2xl">⚡</span> Quick Administrative Actions
                </h3>
                {msg && <span className="text-sm font-medium text-purple-600 animate-pulse">{msg}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <ActionButton
                    label="Broadcast Alert"
                    onClick={sendGlobalAlert}
                    icon="📢"
                    description="Send system-wide notification"
                    disabled={loading}
                />
                <ActionButton
                    label="Manage Vendors"
                    onClick={() => alert("Vendor management modal coming soon")}
                    icon="🏢"
                    description="Add or update system vendors"
                    disabled={loading}
                />
                <ActionButton
                    label="Workflow Overrides"
                    onClick={() => alert("Override console coming soon")}
                    icon="🎛️"
                    description="Manually transition states"
                    disabled={loading}
                />
                <ActionButton
                    label="Export Audit Logs"
                    onClick={() => alert("Export starting...")}
                    icon="📥"
                    description="Download CSV of system logs"
                    disabled={loading}
                />
            </div>
        </div>
    );
}

function ActionButton({ label, onClick, icon, description, disabled }: any) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex flex-col items-start p-5 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700/50 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 text-left group disabled:opacity-50"
        >
            <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
            <div className="font-bold text-sm mb-1">{label}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</div>
        </button>
    );
}
