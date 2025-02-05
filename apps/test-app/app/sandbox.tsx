/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as ReactDOM from "react-dom";
import styles from "./sandbox.module.css";
import {
	Button,
	DropdownMenu,
	Icon,
	IconButton,
	Select,
	Tabs,
	Text,
	TextBox,
	VisuallyHidden,
} from "@itwin/itwinui-react/bricks";
import * as Tree from "@itwin/itwinui-react-internal/src/bricks/Tree.tsx";
import { useSearchParams, type MetaFunction } from "react-router";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import searchIcon from "@itwin/itwinui-icons/search.svg";
import panelLeftIcon from "@itwin/itwinui-icons/panel-left.svg";
import filterIcon from "@itwin/itwinui-icons/filter.svg";
import dismissIcon from "@itwin/itwinui-icons/dismiss.svg";
import lockIcon from "@itwin/itwinui-icons/lock.svg";
import showIcon from "@itwin/itwinui-icons/visibility-show.svg";
import moreIcon from "@itwin/itwinui-icons/more-horizontal.svg";
import hideIcon from "@itwin/itwinui-icons/visibility-hide.svg";
import dotIcon from "@itwin/itwinui-icons/state-inherited-dot.svg";

const title = "Kiwi sandbox";
export const meta: MetaFunction = () => {
	return [{ title }];
};

export default function Page() {
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedModel =
		searchParams.get("tree") === "empty" ? "epoch-2" : "epoch-1";

	const setSelectedModel = React.useCallback(
		(model: keyof typeof models) => {
			setSearchParams((prev) => {
				if (model === "epoch-2") {
					prev.set("tree", "empty");
				} else {
					prev.delete("tree");
				}

				return prev;
			});
		},
		[setSearchParams],
	);

	const models = React.useMemo(
		() => ({
			"epoch-1": "Epoch System iModel 1", // Non-empty model
			"epoch-2": "Epoch System iModel 2", // Empty model
		}),
		[],
	);

	const selectModelId = React.useId();

	return (
		<Layout
			panelContent={
				<>
					<div className={styles.panelHeader}>
						<div>
							<VisuallyHidden
								// biome-ignore lint/a11y/noLabelWithoutControl: Accessible name comes from VisuallyHidden's children
								render={(props) => <label {...props} htmlFor={selectModelId} />}
							>
								Choose Model
							</VisuallyHidden>

							<Select.Root className={styles.panelTitleWrapper}>
								<Select.HtmlSelect
									id={selectModelId}
									variant="ghost"
									defaultValue={selectedModel}
									onChange={(e) =>
										setSelectedModel(e.target.value as keyof typeof models)
									}
								>
									{Object.entries(models).map(([id, modelName]) => (
										<option key={id} value={id}>
											{modelName}
										</option>
									))}
								</Select.HtmlSelect>
							</Select.Root>

							{/* biome-ignore lint/a11y: hgroup needs an explicit role for better support */}
							<hgroup role="group">
								<VisuallyHidden render={(props) => <h2 {...props} />}>
									{models[selectedModel]}
								</VisuallyHidden>

								<p className={styles.panelCaption}>2024 Refresh</p>
							</hgroup>
						</div>
						<div className={styles.actions}>
							<IconButton
								className={styles.shiftIconRight}
								icon={panelLeftIcon}
								label="Dock panel"
								variant="ghost"
								disabled
							/>
						</div>
					</div>
					<TreeFilteringProvider>
						<SandboxTabs>
							<Subheader />
							<Tabs.TabPanel
								tabId="simple"
								className={styles.tabPanel}
								focusable={false}
							>
								<SandboxTree
									tree={selectedModel === "epoch-2" ? "empty" : "simple"}
								/>
							</Tabs.TabPanel>
							<Tabs.TabPanel
								tabId="complex"
								className={styles.tabPanel}
								focusable={false}
							>
								<SandboxTree
									tree={selectedModel === "epoch-2" ? "empty" : "complex"}
								/>
							</Tabs.TabPanel>
						</SandboxTabs>
					</TreeFilteringProvider>
				</>
			}
		>
			<header className={styles.header}>
				<div className={styles.logo}>
					<Icon href={placeholderIcon} size="large" />
				</div>
				<Text render={(props) => <h1 {...props} />} variant="body-md">
					{title}
				</Text>
			</header>
			<div className={styles.platformBar}>
				<div className={styles.tools}>
					<Icon href={placeholderIcon} size="large" />
					<Icon href={placeholderIcon} size="large" />
					<Icon href={placeholderIcon} size="large" />
				</div>
			</div>
			<div className={styles.canvasWrapper}>
				<div className={styles.canvas} />
			</div>
		</Layout>
	);
}

function Layout(
	props: React.PropsWithChildren<{
		panelContent: React.ReactNode;
	}>,
) {
	const { sliderProps, panelProps, panelMinSize, panelMaxSize, resizing } =
		useSplitter<HTMLDivElement>({
			minSize: { px: 256, pct: 20 },
			maxSize: { pct: 30 },
		});

	const resizerId = React.useId();

	return (
		<div
			className={styles.appLayout}
			style={
				{
					"--_panel-min-size": panelMinSize,
					"--_panel-max-size": panelMaxSize,
				} as React.CSSProperties
			}
		>
			<div
				{...panelProps}
				className={styles.leftPanel}
				style={{ position: "relative", ...panelProps.style }}
			>
				{props.panelContent}
			</div>
			<div
				className={styles.splitter}
				data-resizing={resizing ? "true" : undefined}
			>
				<VisuallyHidden
					render={(props) => (
						<label {...props} htmlFor={resizerId}>
							Resize layers panel
						</label>
					)}
				>
					Resize layers panel
				</VisuallyHidden>

				<input
					id={resizerId}
					type="range"
					className={styles.slider}
					{...sliderProps}
				/>
			</div>
			{props.children}
		</div>
	);
}

function EmptyState() {
	return (
		<div className={styles.emptyState}>
			<Text>No layers</Text>
			<Button>Create a layer</Button>
		</div>
	);
}

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

interface UseSplitterArgs {
	onCollapse?: () => void;
	minSize?: { px: number; pct: number }; // same as `min(px, pct)`
	maxSize?: { pct: number };
}

// https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
function useSplitter<TPanel extends Element>(args?: UseSplitterArgs) {
	const { minSize: minSizeSpec, maxSize: maxSizeSpec, onCollapse } = args ?? {};
	const id = React.useId();
	const panelRef = React.useRef<TPanel>(null);
	const [panelSize, setPanelSize] = React.useState<number | undefined>(
		undefined,
	);
	const [containerSize, setContainerSize] = React.useState<number | undefined>(
		undefined,
	);
	const [mode, setMode] = React.useState<"smallest" | "largest" | undefined>(
		undefined,
	);

	const [resizing, setResizing] = React.useState(false);
	const [preferredSize, setPreferredSize] = React.useState<number | undefined>(
		undefined,
	);

	const minSize = React.useMemo(() => {
		if (!minSizeSpec) return undefined;
		if (!containerSize) return undefined;
		return Math.min(minSizeSpec.px, (minSizeSpec.pct / 100) * containerSize);
	}, [minSizeSpec, containerSize]);
	const maxSize = React.useMemo(() => {
		if (!minSize) return undefined;
		if (!maxSizeSpec) return undefined;
		if (!containerSize) return undefined;
		return Math.max(minSize, (maxSizeSpec.pct / 100) * containerSize);
	}, [maxSizeSpec, containerSize, minSize]);
	const size = React.useMemo(() => {
		if (mode === "smallest") return minSize ?? 0;
		if (mode === "largest") return maxSize ?? 0;
		if (!panelSize) return undefined;
		if (!minSize) return undefined;
		if (!maxSize) return undefined;
		return clamp(panelSize, minSize, maxSize);
	}, [panelSize, minSize, maxSize, mode]);

	React.useEffect(() => {
		const panel = panelRef.current;
		if (!panel) return;
		const container = panel.parentElement;
		if (!container) return;

		const ro = new ResizeObserver(() => {
			const containerRect = container.getBoundingClientRect();
			const panelRect = panel.getBoundingClientRect();

			setContainerSize(containerRect.width);
			setPanelSize(panelRect.width);
		});
		ro.observe(container);
		ro.observe(panel);
		return () => {
			ro.disconnect();
		};
	}, []);
	const onMove = React.useCallback((moveBy: number) => {
		const panel = panelRef.current;
		if (!panel) return;

		const panelRect = panel.getBoundingClientRect();
		setPreferredSize(panelRect.width + moveBy);
		setMode(undefined);
		setResizing(true);
	}, []);
	const onKeyMove = React.useCallback((direction: 1 | -1) => {
		const panel = panelRef.current;
		if (!panel) return;
		const container = panel.parentElement;
		if (!container) return;

		const containerRect = container.getBoundingClientRect();
		const moveBy = direction * (containerRect.width * 0.005);

		const panelRect = panel.getBoundingClientRect();
		setPreferredSize(panelRect.width + moveBy);
		setMode(undefined);
	}, []);
	const onMoveEnd = React.useCallback(() => {
		const panel = panelRef.current;
		if (!panel) return;

		setPreferredSize(undefined);
		setResizing(false);
	}, []);
	const { moveableProps } = useMoveable<HTMLInputElement>({
		onMove,
		onMoveEnd,
		onKeyMove,
	});
	const sliderProps = React.useMemo<
		Partial<React.InputHTMLAttributes<HTMLInputElement>>
	>(() => {
		return {
			...moveableProps,
			onKeyDown: (e) => {
				moveableProps.onKeyDown?.(e);
				if (e.defaultPrevented) return;
				switch (e.key) {
					case "Enter":
						e.preventDefault();
						onCollapse?.();
						break;
					case "Home":
						e.preventDefault();
						setMode("smallest");
						break;
					case "End":
						e.preventDefault();
						setMode("largest");
						break;
					// case "F6": // TODO: cycle through window panes
				}
			},
			onChange: (e) => {
				if (resizing) return;
				const newValue = Number(e.target.value);
				setPreferredSize(newValue);
			},
			value: size === undefined ? 0 : Math.floor(size),
			min: minSize === undefined ? undefined : Math.floor(minSize),
			max: maxSize === undefined ? undefined : Math.floor(maxSize),
		};
	}, [moveableProps, size, minSize, maxSize, onCollapse, resizing]);
	const panelProps = React.useMemo<
		Partial<React.HTMLAttributes<TPanel>>
	>(() => {
		return {
			style: {
				WebkitUserSelect: preferredSize === undefined ? undefined : "none",
			},
			id,
			ref: panelRef,
		};
	}, [id, preferredSize]);

	const panelMinSize =
		minSize === undefined ? undefined : `${Math.floor(minSize)}px`;
	const panelMaxSize = React.useMemo(() => {
		if (
			preferredSize !== undefined &&
			maxSizeSpec !== undefined &&
			mode === undefined
		) {
			return `min(${Math.floor(preferredSize)}px, ${maxSizeSpec.pct}%)`;
		}

		if (size === undefined) return undefined;
		return `${Math.floor(size)}px`;
	}, [maxSizeSpec, preferredSize, size, mode]);

	return { sliderProps, panelProps, panelMinSize, panelMaxSize, resizing };
}

interface UseMoveableArgs {
	onMove?: (moveBy: number) => void;
	onMoveEnd?: () => void;
	onKeyMove?: (direction: 1 | -1) => void;
}

function useMoveable<T extends HTMLElement>(args?: UseMoveableArgs) {
	const { onMove, onMoveEnd, onKeyMove } = args ?? {};
	const ref = React.useRef<T | null>(null);
	const removeTouchStart = React.useRef<(() => void) | undefined>(undefined);
	const relativePositionRef = React.useRef<number | undefined>(undefined);
	const handleMoveEnd = React.useCallback(() => {
		if (relativePositionRef.current === undefined) return;
		relativePositionRef.current = undefined;
		onMoveEnd?.();
	}, [onMoveEnd]);
	const moveableProps = React.useMemo<Partial<React.HTMLAttributes<T>>>(() => {
		return {
			onPointerDown: (e) => {
				if (e.button !== 0) return; // left button only
				if (e.ctrlKey) return; // ignore ctrl+click
				const el = ref.current;
				if (!el) return;
				const rect = el.getBoundingClientRect();
				const relativeX = e.clientX - rect.left;
				relativePositionRef.current = relativeX;

				e.preventDefault();
				el.setPointerCapture(e.pointerId);
			},
			onPointerMove: (e) => {
				const relativePosition = relativePositionRef.current;
				if (relativePosition === undefined) return;
				const el = ref.current;
				if (!el) return;
				const rect = el.getBoundingClientRect();
				const moveBy = e.clientX - relativePosition - rect.left;

				e.preventDefault();
				onMove?.(moveBy);
			},
			onPointerUp: handleMoveEnd,
			onPointerCancel: handleMoveEnd,
			onKeyDown: (e) => {
				if (e.defaultPrevented) return;
				switch (e.key) {
					case "ArrowLeft":
						e.preventDefault();
						onKeyMove?.(-1);
						break;
					case "ArrowRight":
						e.preventDefault();
						onKeyMove?.(1);
						break;
				}
			},
			ref: (el: T | null) => {
				ref.current = el;
				removeTouchStart.current?.();
				removeTouchStart.current = undefined;
				if (!el) return;

				const onTouchStart = (e: TouchEvent) => {
					// onTouchStart prop doesn't prevent scrolling.
					e.preventDefault();
				};
				el.addEventListener("touchstart", onTouchStart);
				removeTouchStart.current = () => {
					el.removeEventListener("touchstart", onTouchStart);
				};
			},
		};
	}, [onKeyMove, onMove, handleMoveEnd]);
	return { moveableProps };
}

const SandboxTreeContext = React.createContext<{
	selected: string | undefined;
	hidden: string[];
	setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
	toggleHidden: (id: string) => void;
}>({
	selected: undefined,
	hidden: [],
	setSelected: () => {},
	toggleHidden: () => {},
});

interface SandboxTreeProps {
	tree: "simple" | "complex" | "empty";
}

function SandboxTree({ tree }: SandboxTreeProps) {
	const [selected, setSelected] = React.useState<string | undefined>();
	const [hidden, setHidden] = React.useState<string[]>([]);
	const toggleHidden = React.useCallback((id: string) => {
		setHidden((prev) => {
			if (prev.includes(id)) {
				return prev.filter((i) => i !== id);
			}
			return [...prev, id];
		});
	}, []);

	const sandboxTreeContext = React.useMemo(
		() => ({ selected, setSelected, hidden, toggleHidden }),
		[hidden, selected, toggleHidden],
	);

	if (tree === "empty") {
		return <EmptyState />;
	}

	return (
		<SandboxTreeContext.Provider value={sandboxTreeContext}>
			{tree === "simple" ? (
				<SimpleTree />
			) : tree === "complex" ? (
				<ComplexTree />
			) : undefined}
		</SandboxTreeContext.Provider>
	);
}

interface TreeItem {
	label: string;
	type?: string;
	items?: TreeItem[];
}

interface TreeStore {
	filters: string[];
	items?: TreeItem[];
}

const simpleTree = {
	filters: [
		"Guides",
		"Other",
		"Road",
		"Parking lot",
		"Building",
		"Sewer",
		"Project boundary",
		"Map",
	],
	items: [
		{
			label: "Guides",
			type: "Guides",
			items: [
				{
					label: "Tree",
					items: [
						{ label: "Guide 4" },
						{ label: "Guide 3" },
						{ label: "Guide 2" },
						{ label: "Guide 1" },
					],
				},
			],
		},
		{
			label: "Other",
			type: "Other",
			items: [
				{
					label: "Object 2",
					items: [{ label: "Path 3" }],
				},
				{ label: "Object 1" },
			],
		},
		{
			label: "Road",
			type: "Road",
			items: [{ label: "Parking lot access" }, { label: "Site access" }],
		},
		{
			label: "Parking lot",
			type: "Parking lot",
			items: [
				{
					label: "Parking area",
					items: [
						{ label: "Bay point 2" },
						{ label: "Bay point 1" },
						{ label: "Space point 1" },
						{ label: "Path 6" },
					],
				},
			],
		},
		{
			label: "Building",
			type: "Building",
			items: [
				{
					label: "Building area",
					items: [{ label: "Path 5" }],
				},
			],
		},
		{
			label: "Sewer",
			type: "Sewer",
			items: [
				{
					label: "Run off pipe",
					items: [{ label: "Path 4" }],
				},
			],
		},
		{
			label: "Project boundary",
			type: "Project boundary",
			items: [
				{
					label: "Property area",
					items: [{ label: "Path 1" }],
				},
			],
		},
		{
			label: "Map",
			type: "Map",
			items: [
				{
					label: "Location",
					items: [{ label: "Terrain" }],
				},
			],
		},
	],
} satisfies TreeStore;

function useFilteredTree({
	tree,
	filters,
	search,
}: {
	tree?: TreeStore;
	filters: string[];
	search: string;
}) {
	const items = React.useMemo(() => tree?.items ?? [], [tree]);
	const filteredItems = React.useMemo(() => {
		if (filters.length === 0) return items;
		return items.reduce<TreeItem[]>((acc, item) => {
			// Filters first level only, usually you'd want to traverse the tree.
			if (!item.type || !filters.includes(item.type)) {
				return acc;
			}

			acc.push(item);
			return acc;
		}, []);
	}, [items, filters]);

	const foundItems = React.useMemo(() => {
		// Filter items based on search string.
		function matchSearch(items: TreeItem[]): TreeItem[] {
			return items.reduce<TreeItem[]>((acc, item) => {
				const matchingItems = matchSearch(item.items ?? []);

				// If the item matches the search or any of the children match the search include it.
				if (
					item.label.toLowerCase().includes(search.toLowerCase()) ||
					matchingItems.length > 0
				) {
					acc.push({
						...item,
						items: matchingItems,
					});
				}
				return acc;
			}, []);
		}

		if (search === "") return filteredItems;
		return matchSearch(filteredItems);
	}, [filteredItems, search]);

	const itemCount = React.useMemo(() => {
		if (!tree) return undefined;
		if (filters.length === 0 && search === "") return undefined;

		function countItems(items: TreeItem[]): number {
			return items.reduce((acc, item) => {
				const childItemCount = item.items ? countItems(item.items) : 0;
				return acc + 1 + childItemCount;
			}, 0);
		}
		return countItems(foundItems);
	}, [foundItems, tree, filters, search]);
	return { filteredTree: foundItems, itemCount };
}

function TreeItemRenderer({ item: treeItem }: { item: TreeItem }) {
	return (
		<TreeItem label={treeItem.label}>
			{treeItem.items?.map((item) => (
				<TreeItemRenderer key={item.label} item={item} />
			))}
		</TreeItem>
	);
}

function SimpleTree() {
	const { tree } = React.useContext(TreeFilteringContext);
	if (tree.length === 0) return <EmptyState />;
	return (
		<Tree.Root>
			{tree.map((item) => {
				return <TreeItemRenderer key={item.label} item={item} />;
			})}
		</Tree.Root>
	);
}

function ComplexTree() {
	return (
		<Tree.Root className={styles.tree}>
			<TreeItem label="ITC_Master">
				<TreeItem label="002_Substation" defaultCollapsed>
					<TreeItem label="002_Substation_A" />
				</TreeItem>
				<TreeItem label="005-BENROAD-00-XX-M3-D-00003.dgn" defaultCollapsed>
					<TreeItem label="005-BENROAD-00-XX-M3-D-00003-A" />
				</TreeItem>
				<TreeItem label="005-BENROAD-00-XX-M3-D-00005.dgn" defaultCollapsed>
					<TreeItem label="005-BENROAD-00-XX-M3-D-00005-A" />
				</TreeItem>
				<TreeItem label="005-BENROAD-00-XX-M3-G-00002.dgn" defaultCollapsed>
					<TreeItem label="005-BENROAD-00-XX-M3-G-00002-A" />
				</TreeItem>
				<TreeItem label="005-BENROAD-00-XX-M3-G-00003.dgn" defaultCollapsed>
					<TreeItem label="005-BENROAD-00-XX-M3-G-00003-A" />
				</TreeItem>
				<TreeItem label="007-aa_master.dgn">
					<TreeItem label="A-CLNG-LITE" defaultCollapsed>
						<TreeItem label="A-CLNG-LITE-A" />
					</TreeItem>
					<TreeItem label="A-CLNG-TILE">
						<TreeItem label="A-DOOR-2D-PLAN">
							<TreeItem label="P00003 [2-KA62]">
								<TreeItem label="Cell [2-KA63]">
									<TreeItem label="Cell [2-KA64]">
										<TreeItem label="Complex Chain [2-KA6A]" />
										<TreeItem label="Complex Chain [2-KA6B]" />
										<TreeItem label="Complex Chain [2-KA6C]" />
										<TreeItem label="Complex Chain [2-KA6D]" />
										<TreeItem label="Complex Chain [2-KA6E]" />
										<TreeItem label="Complex Chain [2-KA6F]" />
										<TreeItem label="Complex Chain [2-KA6G]" />
										<TreeItem label="Complex Chain [2-KA6H]" />
										<TreeItem label="Complex Chain [2-KA61]" />
										<TreeItem label="Complex Chain [2-KA65]" />
										<TreeItem label="Complex Chain [2-KA66]" />
										<TreeItem label="Complex Chain [2-KA67]" />
										<TreeItem label="Complex Chain [2-KA68]" />
										<TreeItem label="Complex Chain [2-KA69]" />
									</TreeItem>
								</TreeItem>
							</TreeItem>
							<TreeItem label="P00003 [2-KA74]" defaultCollapsed>
								<TreeItem label="P00003 [2-KA74-A]" />
							</TreeItem>
							<TreeItem label="P00003 [2-KA86]" defaultCollapsed>
								<TreeItem label="P00003 [2-KA74-A]" />
							</TreeItem>
							<TreeItem label="P00003 [2-KA98]" defaultCollapsed>
								<TreeItem label="P00003 [2-KA98-A]" />
							</TreeItem>
							<TreeItem label="P00003 [2-KAAA]" defaultCollapsed>
								<TreeItem label="P00003 [2-KAAA-A]" />
							</TreeItem>
						</TreeItem>
					</TreeItem>
				</TreeItem>
			</TreeItem>
			<TreeItem label="ITC_Main" />
		</Tree.Root>
	);
}

const SandboxParentItemContext = React.createContext<{
	selected: boolean;
	hidden: boolean;
}>({ selected: false, hidden: false });

type TreeItemProps = React.PropsWithChildren<{
	label?: string;
	defaultCollapsed?: boolean;
}>;

function TreeItem(props: TreeItemProps) {
	const treeContext = React.useContext(SandboxTreeContext);
	const parentContext = React.useContext(SandboxParentItemContext);
	const id = React.useId();
	const [expanded, setExpanded] = React.useState(
		props.defaultCollapsed === undefined ? true : !props.defaultCollapsed,
	);
	const isParentNode = React.Children.count(props.children) > 0;
	const hidden = React.useMemo(() => {
		if (parentContext.hidden) return true;
		return treeContext.hidden.includes(id);
	}, [id, treeContext.hidden, parentContext.hidden]);
	const selected = parentContext.selected || id === treeContext.selected;
	const setSelected = React.useCallback(
		(selected: boolean) => {
			treeContext.setSelected(selected ? id : undefined);
		},
		[id, treeContext],
	);
	return (
		<SandboxParentItemContext.Provider
			value={React.useMemo(() => ({ selected, hidden }), [hidden, selected])}
		>
			<Tree.Item
				expanded={isParentNode ? expanded : undefined}
				onExpandedChange={setExpanded}
				selected={selected}
				onSelectedChange={setSelected}
				icon={<Icon href={placeholderIcon} style={{ display: "inline" }} />}
				label={props.label}
				actions={
					<>
						<IconButton
							className={styles.action}
							icon={lockIcon}
							label="Lock"
							variant="ghost"
							aria-hidden={hidden}
						/>
						{parentContext.hidden ? (
							<span className={styles.actionIcon}>
								<Icon href={dotIcon} />
							</span>
						) : (
							<IconButton
								className={styles.action}
								icon={hidden ? hideIcon : showIcon}
								label={hidden ? "Show" : "Hide"}
								variant="ghost"
								onClick={() => {
									treeContext.toggleHidden(id);
								}}
							/>
						)}
						<TreeMoreActions hidden={hidden} />
					</>
				}
			>
				{expanded ? props.children : undefined}
			</Tree.Item>
		</SandboxParentItemContext.Provider>
	);
}

function TreeMoreActions({ hidden }: { hidden?: boolean }) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Button
				className={styles.action}
				aria-hidden={hidden}
				render={<IconButton icon={moreIcon} label="More" variant="ghost" />}
			/>
			<DropdownMenu.Content style={{ minInlineSize: 164 }}>
				<DropdownMenu.Item shortcuts="⌘+C">Copy</DropdownMenu.Item>
				<DropdownMenu.Item shortcuts="⌘+P">Paste</DropdownMenu.Item>
				<DropdownMenu.Item shortcuts="⌘+V">Copy/Paste as</DropdownMenu.Item>
				<DropdownMenu.Item shortcuts="⌘+M">Move to</DropdownMenu.Item>
				<DropdownMenu.Item shortcuts="]">Bring to front</DropdownMenu.Item>
				<DropdownMenu.Item shortcuts="[">Send to back</DropdownMenu.Item>
				<DropdownMenu.Item shortcuts="⌘+G">Group selection</DropdownMenu.Item>
				<DropdownMenu.Item shortcuts="⌘+U">Ungroup</DropdownMenu.Item>
				<DropdownMenu.Item shortcuts="⌘+R">Rename</DropdownMenu.Item>
				<DropdownMenu.Item shortcuts="⇧+⌘+V">Show/hide</DropdownMenu.Item>
				<DropdownMenu.Item shortcuts="⇧+⌘+L">Lock/unlock</DropdownMenu.Item>
				<DropdownMenu.Item shortcuts="I">Isolate object</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

function Subheader() {
	const { selectedId: tree } = React.useContext(TabsContext);
	const { itemCount, filtered, clearFilters, search, setSearch } =
		React.useContext(TreeFilteringContext);
	const [isSearching, setIsSearching] = React.useState(false);
	const searchInputRef = React.useRef<HTMLInputElement>(null);
	const tabsRef = React.useRef<HTMLHeadingElement>(null);

	const actions = isSearching ? (
		<>
			<FiltersMenu filters={tree === "simple" ? simpleTree.filters : []} />
			<IconButton
				className={styles.shiftIconRight}
				icon={dismissIcon}
				label="Close"
				variant="ghost"
				onClick={() => {
					setSearch("");
					clearFilters();
					ReactDOM.flushSync(() => setIsSearching(false));
					tabsRef.current?.focus();
				}}
			/>
		</>
	) : (
		<IconButton
			className={styles.shiftIconRight}
			icon={searchIcon}
			label="Search"
			variant="ghost"
			onClick={() => {
				ReactDOM.flushSync(() => setIsSearching(true));
				searchInputRef.current?.focus();
			}}
			disabled={tree !== "simple"}
		/>
	);

	const filteredNotification = React.useMemo(() => {
		if (!filtered) return undefined;
		if (itemCount === undefined) return "Showing all tree items";
		return `Showing ${itemCount} tree items`;
	}, [filtered, itemCount]);
	return (
		<div className={styles.subheader}>
			<VisuallyHidden aria-live="polite" aria-atomic={true}>
				{filteredNotification}
			</VisuallyHidden>
			{isSearching ? undefined : (
				<Tabs.TabList className={styles.tabList} tone="accent" ref={tabsRef}>
					<Tabs.Tab id="simple">Simple</Tabs.Tab>
					<Tabs.Tab id="complex">Complex</Tabs.Tab>
				</Tabs.TabList>
			)}

			{isSearching ? (
				<TextBox.Root className={styles.searchInput}>
					<TextBox.Icon href={searchIcon} />
					<TextBox.Input
						placeholder="Search"
						ref={searchInputRef}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						value={search}
					/>
				</TextBox.Root>
			) : null}

			<div className={styles.subheaderActions}>{actions}</div>
		</div>
	);
}

function FiltersMenu({
	filters,
}: {
	filters: string[];
}) {
	const context = React.useContext(TreeFilteringContext);
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Button
				render={
					<IconButton
						icon={filterIcon}
						label="Filter"
						variant="ghost"
						disabled={filters.length === 0}
						isActive={context.filters.length > 0}
					/>
				}
			/>
			<DropdownMenu.Content>
				{filters.map((filter) => {
					const checked = context.filters.includes(filter);
					return (
						<DropdownMenu.CheckboxItem
							key={filter}
							name={filter}
							checked={checked}
							onChange={() => {
								context.toggleFilter(filter);
							}}
						>
							{filter}
						</DropdownMenu.CheckboxItem>
					);
				})}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

function TreeFilteringProvider(props: React.PropsWithChildren) {
	const [filtered, setFiltered] = React.useState(false);
	const [filters, setFilters] = React.useState<string[]>([]);
	const [search, setSearchState] = React.useState("");
	const toggleFilter = React.useCallback((filter: string) => {
		setFilters((prev) => {
			if (prev.includes(filter)) {
				return prev.filter((f) => f !== filter);
			}
			return [...prev, filter];
		});
		setFiltered(true);
	}, []);
	const clearFilters = React.useCallback(() => {
		setFilters([]);
		setFiltered(true);
	}, []);

	const { filteredTree, itemCount } = useFilteredTree({
		tree: simpleTree,
		filters,
		search,
	});
	const deferredTree = React.useDeferredValue(filteredTree);

	const setSearch = React.useCallback((s: string) => {
		setSearchState(s);
		setFiltered(true);
	}, []);
	return (
		<React.Suspense fallback="Loading...">
			<TreeFilteringContext.Provider
				value={React.useMemo(
					() => ({
						filters,
						filtered,
						toggleFilter,
						clearFilters,
						search,
						setSearch,
						itemCount,
						tree: deferredTree,
					}),
					[
						filters,
						filtered,
						toggleFilter,
						clearFilters,
						search,
						itemCount,
						deferredTree,
						setSearch,
					],
				)}
			>
				{props.children}
			</TreeFilteringContext.Provider>
		</React.Suspense>
	);
}

function SandboxTabs(props: React.PropsWithChildren) {
	const [selectedId, setSelectedId] = React.useState<string | null | undefined>(
		undefined,
	);
	return (
		<TabsContext.Provider
			value={React.useMemo(
				() => ({
					selectedId: selectedId ?? "",
				}),
				[selectedId],
			)}
		>
			<Tabs.Root setSelectedId={setSelectedId} selectedId={selectedId}>
				{props.children}
			</Tabs.Root>
		</TabsContext.Provider>
	);
}

const TreeFilteringContext = React.createContext<{
	filters: string[];
	filtered: boolean;
	toggleFilter: (filter: string) => void;
	clearFilters: () => void;
	search: string;
	setSearch: (search: string) => void;
	itemCount: number | undefined;
	tree: TreeItem[];
}>({
	filters: [],
	filtered: false,
	toggleFilter: () => {},
	clearFilters: () => {},
	search: "",
	setSearch: () => {},
	tree: [],
	itemCount: undefined,
});

const TabsContext = React.createContext<{
	selectedId: string;
}>({
	selectedId: "",
});
