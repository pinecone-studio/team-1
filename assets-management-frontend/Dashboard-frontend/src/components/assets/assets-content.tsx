"use client";

import {
	DollarSign,
	Package,
	Plus,
	UserCheck,
	X,
} from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FilterKey = "location" | "ownerType" | "room" | "category";

type FilterOption = {
	id: string;
	label: string;
};

type Asset = {
	id: string;
	name: string;
	subtitle: string;
	location: string;
	ownerType: string;
	room: string;
	category: string;
	count: number;
	value: number;
	hasOwner: boolean;
	sellable: boolean;
};

const filterOptions: Record<FilterKey, { title: string; options: FilterOption[] }> = {
	location: {
		title: "Байршил",
		options: [
			{ id: "loc-gg", label: "Гураван гол оффис" },
			{ id: "loc-city", label: "Сити оффис" },
			{ id: "loc-sun", label: "Гэгээн нарны зам" },
		],
	},
	ownerType: {
		title: "Эзэмшигч төрөл",
		options: [
			{ id: "owner-ann", label: "Анн" },
			{ id: "owner-office", label: "Оффис" },
			{ id: "owner-warehouse", label: "Агуулах" },
		],
	},
	room: {
		title: "Анги",
		options: [
			{ id: "room-301", label: "301" },
			{ id: "room-302", label: "302" },
			{ id: "room-303", label: "303" },
			{ id: "room-304", label: "304" },
		],
	},
	category: {
		title: "Ангилал",
		options: [
			{ id: "cat-it", label: "IT тоног төхөөрөмж" },
			{ id: "cat-furniture", label: "Тавилга" },
			{ id: "cat-outdoor", label: "Гадаад хэрэгсэл" },
			{ id: "cat-electric", label: "Цахилгаан хэрэгсэл" },
			{ id: "cat-home", label: "Гэр ахуй" },
			{ id: "cat-security", label: "Хяналт" },
			{ id: "cat-network", label: "Сүлжээ" },
			{ id: "cat-other", label: "Бусад" },
		],
	},
};

const assets: Asset[] = [
	{
		id: "imac",
		name: "IMAC",
		subtitle: "1 төрөл | 24ш",
		location: "Гураван гол оффис",
		ownerType: "Анн",
		room: "301",
		category: "IT тоног төхөөрөмж",
		count: 24,
		value: 1847888999,
		hasOwner: true,
		sellable: false,
	},
	{
		id: "dell",
		name: "DELL Latitude",
		subtitle: "1 төрөл | 10ш",
		location: "Сити оффис",
		ownerType: "Оффис",
		room: "302",
		category: "IT тоног төхөөрөмж",
		count: 10,
		value: 7888999,
		hasOwner: false,
		sellable: true,
	},
	{
		id: "chair",
		name: "Оффис сандал",
		subtitle: "1 төрөл | 56ш",
		location: "Гураван гол оффис",
		ownerType: "Оффис",
		room: "303",
		category: "Тавилга",
		count: 56,
		value: 47888999,
		hasOwner: true,
		sellable: true,
	},
];

function toggleInSet(current: Set<string>, value: string) {
	const next = new Set(current);
	if (next.has(value)) next.delete(value);
	else next.add(value);
	return next;
}

function FilterItem({
	id,
	label,
	checked,
	onToggle,
}: {
	id: string;
	label: string;
	checked: boolean;
	onToggle: () => void;
}) {
	return (
		<div
			role="button"
			tabIndex={0}
			onClick={onToggle}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") onToggle();
			}}
			className={cn(
				"flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors",
				checked ? "bg-muted/70" : "hover:bg-muted/50"
			)}
		>
			<div onClick={(e) => e.stopPropagation()}>
				<Checkbox id={id} checked={checked} onCheckedChange={onToggle} />
			</div>
			<Label htmlFor={id} className="cursor-pointer text-sm font-normal text-foreground/80">
				{label}
			</Label>
		</div>
	);
}

function SummaryCard({
	title,
	value,
	subtitle,
	icon,
	iconClassName,
}: {
	title: string;
	value: string;
	subtitle: string;
	icon: React.ComponentType<{ className?: string }>;
	iconClassName?: string;
}) {
	const Icon = icon;
	return (
		<Card className="bg-white py-0">
			<CardContent className="px-5 py-4">
				<div className="flex items-start justify-between gap-4">
					<div className="min-w-0">
						<div className="text-xs font-medium text-muted-foreground">{title}</div>
						<div className="mt-2 text-lg font-semibold tracking-tight">{value}</div>
						<div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
					</div>
					<div className={cn("grid size-8 place-items-center rounded-lg bg-muted/60", iconClassName)}>
						<Icon className="size-4 text-foreground" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function Chip({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center">
			{children}
		</span>
	);
}

export function AssetsContent() {
	const [selected, setSelected] = React.useState<Record<FilterKey, Set<string>>>(() => ({
		location: new Set(["Гураван гол оффис"]),
		ownerType: new Set(["Анн"]),
		room: new Set(["301"]),
		category: new Set(["IT тоног төхөөрөмж"]),
	}));

	const filteredAssets = React.useMemo(() => {
		const matchGroup = (key: FilterKey, value: string) => {
			const set = selected[key];
			if (!set || set.size === 0) return true;
			return set.has(value);
		};

		return assets.filter((a) => {
			return (
				matchGroup("location", a.location) &&
				matchGroup("ownerType", a.ownerType) &&
				matchGroup("room", a.room) &&
				matchGroup("category", a.category)
			);
		});
	}, [selected]);

	const totals = React.useMemo(() => {
		const sum = filteredAssets.reduce(
			(acc, a) => {
				acc.value += a.value;
				acc.count += a.count;
				if (a.hasOwner) acc.withOwnerValue += a.value;
				else acc.withoutOwnerValue += a.value;
				if (a.sellable) acc.sellableValue += a.value;
				if (a.hasOwner) acc.withOwnerCount += a.count;
				else acc.withoutOwnerCount += a.count;
				if (a.sellable) acc.sellableCount += a.count;
				return acc;
			},
			{
				value: 0,
				count: 0,
				withOwnerValue: 0,
				withoutOwnerValue: 0,
				sellableValue: 0,
				withOwnerCount: 0,
				withoutOwnerCount: 0,
				sellableCount: 0,
			}
		);
		return sum;
	}, [filteredAssets]);

	const activeCategoryTitle = React.useMemo(() => {
		const cats = selected.category;
		if (!cats || cats.size !== 1) return "Бүх хөрөнгө";
		return Array.from(cats)[0] ?? "Бүх хөрөнгө";
	}, [selected.category]);

	const chips = React.useMemo(() => {
		const ordered: Array<{ key: FilterKey; label: string }> = [];
		(["location", "ownerType", "room", "category"] as FilterKey[]).forEach((key) => {
			Array.from(selected[key]).forEach((label) => ordered.push({ key, label }));
		});
		return ordered;
	}, [selected]);

	const setToggle = (key: FilterKey, label: string) => {
		setSelected((prev) => ({ ...prev, [key]: toggleInSet(prev[key], label) }));
	};

	return (
		<div className="flex min-h-0 flex-1 gap-6 overflow-hidden p-6">
			<div className="w-72 shrink-0 overflow-auto rounded-xl bg-white p-4">
				<div className="space-y-6">
					{(Object.keys(filterOptions) as FilterKey[]).map((key) => (
						<div key={key}>
							<div className="mb-2 text-sm font-semibold">{filterOptions[key].title}</div>
							<div className="space-y-1">
								{filterOptions[key].options.map((o) => (
									<FilterItem
										key={o.id}
										id={o.id}
										label={o.label}
										checked={selected[key].has(o.label)}
										onToggle={() => setToggle(key, o.label)}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto">
				<div className="flex items-center justify-end">
					<Button className="h-9 gap-2 rounded-lg">
						<Plus className="size-4" />
						Хөрөнгө нэмэх
					</Button>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<SummaryCard
						title="Нийт хөрөнгө"
						value={`${totals.value.toLocaleString()}₮`}
						subtitle={`${totals.count}ш`}
						icon={Package}
					/>
					<SummaryCard
						title="Эзэмшигчтэй"
						value={`${totals.withOwnerValue.toLocaleString()}₮`}
						subtitle={`${totals.withOwnerCount}ш`}
						icon={UserCheck}
						iconClassName="bg-cyan-50"
					/>
					<SummaryCard
						title="Эзэмшигчгүй"
						value={`${totals.withoutOwnerValue.toLocaleString()}₮`}
						subtitle={`${totals.withoutOwnerCount}ш`}
						icon={Package}
						iconClassName="bg-emerald-50"
					/>
					<SummaryCard
						title="Зарж болох"
						value={`${totals.sellableValue.toLocaleString()}₮`}
						subtitle={`${totals.sellableCount}ш`}
						icon={DollarSign}
						iconClassName="bg-amber-50"
					/>
				</div>

				<Card className="bg-white py-0">
					<CardHeader className="px-5 pt-5 pb-0">
						<div className="flex items-center gap-2">
							<CardTitle className="text-sm font-semibold">{activeCategoryTitle}</CardTitle>
							<span className="text-xs text-muted-foreground">|</span>
							<span className="text-xs text-muted-foreground">{filteredAssets.length} хөрөнгө</span>
						</div>
					</CardHeader>
					<CardContent className="px-5 pb-5 pt-3">
						<div className="flex flex-wrap gap-2">
							{chips.map((c) => (
								<Badge
									key={`${c.key}:${c.label}`}
									variant="secondary"
									className="h-6 gap-1.5 rounded-md bg-muted/60 px-2 text-[11px] text-foreground/80"
								>
									<Chip>{c.label}</Chip>
									<button
										type="button"
										onClick={() => setToggle(c.key, c.label)}
										className="grid size-4 place-items-center rounded hover:bg-muted"
										aria-label={`${c.label} устгах`}
									>
										<X className="size-3 text-muted-foreground" />
									</button>
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filteredAssets.map((a) => (
						<Card key={a.id} className="w-full max-w-[220px] bg-white py-0">
							<div className="grid h-36 place-items-center bg-muted/40">
								<div className="grid size-14 place-items-center rounded-xl bg-white/70 ring-1 ring-foreground/10">
									<Package className="size-6 text-muted-foreground" />
								</div>
							</div>
							<CardContent className="px-4 py-4">
								<div className="text-sm font-semibold">{a.name}</div>
								<div className="mt-1 text-xs text-muted-foreground">{a.subtitle}</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
