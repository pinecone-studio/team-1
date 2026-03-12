"use client";

import { useEffect, useState } from "react";

type Asset = {
	id: string;
	assetTag: string;
	category: string;
	serialNumber: string;
	status: string;
	purchaseDate: number | null;
	purchaseCost: number | null;
	currentBookValue: number | null;
	locationId: string | null;
	assignedTo: string | null;
	createdAt: number;
	updatedAt: number;
	deletedAt: number | null;
	imageUrl: string | null;
};

const mockAssets: Asset[] = [
	{
		id: "mock-1",
		assetTag: "ASSET-001",
		category: "Laptop",
		serialNumber: "SN-ABC-001",
		status: "AVAILABLE",
		purchaseDate: Date.now() - 1000 * 60 * 60 * 24 * 120,
		purchaseCost: 1200000,
		currentBookValue: 900000,
		locationId: "HQ-1",
		assignedTo: "EMP-001",
		createdAt: Date.now() - 1000 * 60 * 60 * 24 * 200,
		updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
		deletedAt: null,
		imageUrl: null
	},
	{
		id: "mock-2",
		assetTag: "ASSET-002",
		category: "Phone",
		serialNumber: "SN-XYZ-002",
		status: "IN_USE",
		purchaseDate: Date.now() - 1000 * 60 * 60 * 24 * 30,
		purchaseCost: 800000,
		currentBookValue: 700000,
		locationId: "HQ-2",
		assignedTo: "EMP-010",
		createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
		updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
		deletedAt: null,
		imageUrl: null
	}
];

function formatDate(value: number | null) {
	if (!value) return "—";
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
}

export default function AssetsTableClient() {
	const [assets, setAssets] = useState<Asset[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadAssets = async () => {
		setLoading(true);
		setError(null);
		try {
			const isLocal =
				typeof window !== "undefined" &&
				(window.location.hostname === "localhost" ||
					window.location.hostname === "127.0.0.1");
			const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "1";

			if (isLocal && useMock) {
				setAssets(mockAssets);
				setError("Using mock data (local)");
				return;
			}

			const res = await fetch("/api/assets");
			const data = (await res.json()) as { data: Asset[] };
			if (!res.ok) throw new Error("Failed to load assets");
			setAssets(data.data ?? []);
		} catch (err) {
			const isLocal =
				typeof window !== "undefined" &&
				(window.location.hostname === "localhost" ||
					window.location.hostname === "127.0.0.1");
			if (isLocal) {
				setAssets(mockAssets);
				setError("Using mock data (local)");
			} else {
				setError(err instanceof Error ? err.message : "Failed to load assets");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		void loadAssets();
	}, []);

	return (
		<div className="mt-8">
			<div className="flex items-center justify-between">
				<p className="text-sm text-slate-300">Нийт: {assets.length}</p>
				<button
					type="button"
					onClick={loadAssets}
					className="rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-200 transition hover:border-cyan-500/60 hover:text-cyan-200"
				>
					Refresh
				</button>
			</div>

			{error && (
				<p className="mt-3 text-xs text-rose-300">{error}</p>
			)}

			<div className="mt-4 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-[0_20px_60px_-30px_rgba(14,116,144,0.7)]">
				<table className="min-w-[1100px] w-full text-left text-sm">
					<thead className="bg-slate-900">
						<tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
							<th className="px-4 py-3">Image</th>
							<th className="px-4 py-3">Tag</th>
							<th className="px-4 py-3">Category</th>
							<th className="px-4 py-3">Serial</th>
							<th className="px-4 py-3">Status</th>
							<th className="px-4 py-3">Location</th>
							<th className="px-4 py-3">Assigned To</th>
							<th className="px-4 py-3">Purchased</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td className="px-4 py-8 text-center text-slate-400" colSpan={8}>
									Loading...
								</td>
							</tr>
						) : assets.length === 0 ? (
							<tr>
								<td className="px-4 py-8 text-center text-slate-400" colSpan={8}>
									No assets found.
								</td>
							</tr>
						) : (
							assets.map((asset) => (
								<tr
									key={asset.id}
									className="border-b border-slate-800/70 last:border-b-0"
								>
									<td className="px-4 py-3">
										{asset.imageUrl ? (
											<img
												src={asset.imageUrl}
												alt={asset.assetTag}
												className="h-10 w-10 rounded-lg object-cover"
											/>
										) : (
											<div className="h-10 w-10 rounded-lg border border-slate-700 bg-slate-800/40" />
										)}
									</td>
									<td className="px-4 py-3 font-medium text-slate-100">
										{asset.assetTag}
									</td>
									<td className="px-4 py-3 text-slate-200">{asset.category}</td>
									<td className="px-4 py-3 text-slate-300">
										{asset.serialNumber}
									</td>
									<td className="px-4 py-3">
										<span className="inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-1 text-xs font-semibold text-cyan-200">
											{asset.status}
										</span>
									</td>
									<td className="px-4 py-3 text-slate-300">
										{asset.locationId ?? "—"}
									</td>
									<td className="px-4 py-3 text-slate-300">
										{asset.assignedTo ?? "—"}
									</td>
									<td className="px-4 py-3 text-slate-300">
										{formatDate(asset.purchaseDate ?? null)}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
