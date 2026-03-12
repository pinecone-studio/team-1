import AssetCreateForm from "./components/AssetCreateForm";
import AssetsTableClient from "./components/AssetsTableClient";

export const dynamic = "force-dynamic";

function formatDate(value: number | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
}

export default function Home() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100">
			<div className="mx-auto w-full max-w-6xl px-6 py-10">
				<div className="flex flex-col gap-2">
					<p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
						Asset Inventory
					</p>
					<h1 className="text-3xl font-semibold">Assets</h1>
				</div>

				<AssetCreateForm />
				<AssetsTableClient />
			</div>
		</div>
	);
}
