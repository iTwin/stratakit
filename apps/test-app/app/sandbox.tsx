/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as ReactDOM from "react-dom";
import { produce } from "immer";
import styles from "./sandbox.module.css";
import {
	Button,
	DropdownMenu,
	Icon,
	IconButton,
	Tabs,
	Text,
	TextBox,
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
	return (
		<Layout
			panelContent={
				<>
					<div className={styles.panelHeader}>
						{/* biome-ignore lint/a11y: hgroup needs an explicit role for better support */}
						<hgroup role="group">
							<h2 className={styles.panelTitle}>Epoch System iModel</h2>
							<p className={styles.panelCaption}>2024 Refresh</p>
						</hgroup>
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
					<Tabs.Root>
						<Subheader />
						<Tabs.TabPanel
							tabId="simple"
							className={styles.tabPanel}
							focusable={false}
						>
							<SandboxTree tree="simple" />
						</Tabs.TabPanel>
						<Tabs.TabPanel
							tabId="complex"
							className={styles.tabPanel}
							focusable={false}
						>
							<SandboxTree tree="complex" />
						</Tabs.TabPanel>
					</Tabs.Root>
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

function Layout(props: {
	panelContent: React.ReactNode;
	children: React.ReactNode;
}) {
	const { sliderProps, panelProps, panelMinSize, panelMaxSize, resizing } =
		useSplitter<HTMLDivElement>({
			minSize: { px: 256, pct: 20 },
			maxSize: { pct: 30 },
		});
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
				<input
					type="range"
					aria-label="Resize layers panel"
					className={styles.slider}
					{...sliderProps}
				/>
			</div>
			{props.children}
		</div>
	);
}

/**
 * Wrapper for empty state content, displayed as a centered vertical flex box.
 * Accepts any arbitrary content passed as `children`.
 */
function EmptyState({ children }: { children: React.ReactNode }) {
	return <div className={styles.emptyState}>{children}</div>;
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
	tree: "simple" | "complex";
}

function SandboxTree({ tree }: SandboxTreeProps) {
	const [searchParams] = useSearchParams();
	const treeParam = searchParams.get("tree"); // for handling ?tree=empty
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

	if (treeParam === "empty") {
		return (
			<EmptyState>
				<Text>No layers</Text>
				<Button>Create a layer</Button>
			</EmptyState>
		);
	}

	return (
		<SandboxTreeContext.Provider
			value={React.useMemo(
				() => ({ selected, setSelected, hidden, toggleHidden }),
				[hidden, selected, toggleHidden],
			)}
		>
			<Tree.Root className={styles.tree}>
				{tree === "complex" ? <ComplexTreeItems /> : <SimpleTreeItems />}
			</Tree.Root>
		</SandboxTreeContext.Provider>
	);
}

interface TreeItem {
	id: string;
	label: string;
	items: TreeItem[];
	expanded: boolean;
}

interface FlatTreeItem extends TreeItem {
	level: number;
	selected: boolean;
	hidden: boolean;
	parentHidden: boolean;
	parentItem?: TreeItem;
	position: number;
	size: number;
}

interface TreeStore {
	items: TreeItem[];
}

const nextTreeId = (() => {
	let id = 0;
	return () => `${id++}`;
})();

function createTreeItem(overrides?: Partial<TreeItem>): TreeItem {
	const id = nextTreeId();
	return {
		id,
		label: `Tree Item ${id}`,
		items: [],
		expanded: true,
		...overrides,
	};
}

const simpleTree = {
	items: [
		createTreeItem({
			label: "Guides",
			items: [
				createTreeItem({
					label: "Tree",
					items: [
						createTreeItem({ label: "Guide 4" }),
						createTreeItem({ label: "Guide 3" }),
						createTreeItem({ label: "Guide 2" }),
						createTreeItem({ label: "Guide 1" }),
					],
				}),
			],
		}),
		createTreeItem({
			label: "Other",
			items: [
				createTreeItem({
					label: "Object 2",
					items: [createTreeItem({ label: "Path 3" })],
				}),
				createTreeItem({ label: "Object 1" }),
			],
		}),
		createTreeItem({
			label: "Road",
			items: [
				createTreeItem({ label: "Parking lot access" }),
				createTreeItem({ label: "Site access" }),
			],
		}),
		createTreeItem({
			label: "Parking lot",
			items: [
				createTreeItem({
					label: "Parking area",
					items: [
						createTreeItem({ label: "Bay point 2" }),
						createTreeItem({ label: "Bay point 1" }),
						createTreeItem({ label: "Space point 1" }),
						createTreeItem({ label: "Path 6" }),
					],
				}),
			],
		}),
		createTreeItem({
			label: "Building",
			items: [
				createTreeItem({
					label: "Building area",
					items: [createTreeItem({ label: "Path 5" })],
				}),
			],
		}),
		createTreeItem({
			label: "Sewer",
			items: [
				createTreeItem({
					label: "Run off pipe",
					items: [createTreeItem({ label: "Path 4" })],
				}),
			],
		}),
		createTreeItem({
			label: "Project boundary",
			items: [
				createTreeItem({
					label: "Property area",
					items: [createTreeItem({ label: "Path 1" })],
				}),
			],
		}),
		createTreeItem({
			label: "Map",
			items: [
				createTreeItem({
					label: "Location",
					items: [createTreeItem({ label: "Terrain" })],
				}),
			],
		}),
	],
} satisfies TreeStore;

function useFlatTreeItems(items: TreeItem[]): FlatTreeItem[] {
	const treeContext = React.useContext(SandboxTreeContext);
	return React.useMemo(() => {
		function flattenItems(
			items: TreeItem[],
			parentItem: TreeItem | undefined,
			level: number,
			parentSelected: boolean,
			parentHidden: boolean,
		): FlatTreeItem[] {
			const flatItems: FlatTreeItem[] = [];
			let position = 1;
			for (const item of items) {
				const selected = item.id === treeContext.selected || parentSelected;
				const hidden = treeContext.hidden.includes(item.id) || parentHidden;
				flatItems.push({
					...item,
					level,
					parentItem,
					selected,
					hidden,
					parentHidden,
					position,
					size: items.length,
				});
				position++;
				if (!item.expanded) continue;
				flatItems.push(
					...flattenItems(item.items, item, level + 1, selected, hidden),
				);
			}
			return flatItems;
		}
		return flattenItems(items, undefined, 1, false, false);
	}, [items, treeContext.selected, treeContext.hidden]);
}

function findTreeItem<T extends Pick<TreeItem, "id"> & { items: T[] }>(
	items: T[],
	id: string,
): T | undefined {
	for (const item of items) {
		if (item.id === id) return item;

		const found = findTreeItem(item.items, id);
		if (found) return found;
	}
}

function SimpleTreeItems() {
	const [items, setItems] = React.useState(simpleTree.items);
	const flatItems = useFlatTreeItems(items);
	return flatItems.map((item) => {
		return (
			<SandboxTreeItem
				key={item.id}
				id={item.id}
				label={item.label}
				aria-level={item.level}
				aria-posinset={item.position}
				aria-setsize={item.size}
				expanded={item.items.length === 0 ? undefined : item.expanded}
				onExpandedChange={(expanded) => {
					setItems((prev) => {
						return produce(prev, (draft) => {
							const treeItem = findTreeItem(draft, item.id);
							if (!treeItem) return;
							treeItem.expanded = expanded;
						});
					});
				}}
				selected={item.selected}
				hidden={item.hidden}
				parentHidden={item.parentHidden}
			/>
		);
	});
}

function ComplexTreeItems() {
	return <>WIP</>;
}

type TreeItemProps = React.ComponentProps<typeof Tree.Item>;

interface SandboxTreeItemProps
	extends Pick<
		TreeItemProps,
		| "aria-level"
		| "aria-posinset"
		| "aria-setsize"
		| "label"
		| "expanded"
		| "onExpandedChange"
		| "selected"
	> {
	id: string;
	hidden: boolean;
	parentHidden: boolean;
}

function SandboxTreeItem(props: SandboxTreeItemProps) {
	const { id, hidden, parentHidden, ...rest } = props;
	const { setSelected, selected, toggleHidden } =
		React.useContext(SandboxTreeContext);
	const handleSelectedChange = React.useCallback(() => {
		if (selected === id) {
			setSelected(undefined);
			return;
		}
		setSelected(id);
	}, [id, selected, setSelected]);
	return (
		<Tree.Item
			{...rest}
			onSelectedChange={handleSelectedChange}
			icon={<Icon href={placeholderIcon} style={{ display: "inline" }} />}
			actions={
				<>
					<IconButton
						className={styles.action}
						icon={lockIcon}
						label="Lock"
						variant="ghost"
						aria-hidden={hidden}
					/>
					{parentHidden ? (
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
								toggleHidden(id);
							}}
						/>
					)}
					<TreeMoreActions hidden={hidden} />
				</>
			}
		/>
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
	const [isSearching, setIsSearching] = React.useState(false);
	const searchInputRef = React.useRef<HTMLInputElement>(null);
	const tabsRef = React.useRef<HTMLHeadingElement>(null);

	const actions = isSearching ? (
		<>
			<SortingModes />
			<IconButton
				className={styles.shiftIconRight}
				icon={dismissIcon}
				label="Close"
				variant="ghost"
				onClick={() => {
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
		/>
	);

	return (
		<div className={styles.subheader}>
			{isSearching ? undefined : (
				<Tabs.TabList className={styles.tabList} tone="accent" ref={tabsRef}>
					<Tabs.Tab id="simple">Simple</Tabs.Tab>
					<Tabs.Tab id="complex">Complex</Tabs.Tab>
				</Tabs.TabList>
			)}

			{isSearching ? (
				<TextBox.Root className={styles.searchInput}>
					<TextBox.Icon href={searchIcon} />
					<TextBox.Input placeholder="Search" ref={searchInputRef} />
				</TextBox.Root>
			) : null}

			<div className={styles.subheaderActions}>{actions}</div>
		</div>
	);
}

function SortingModes() {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Button
				render={<IconButton icon={filterIcon} label="Filter" variant="ghost" />}
			/>
			<DropdownMenu.Content style={{ minInlineSize: 164 }}>
				<DropdownMenu.Item>Show all</DropdownMenu.Item>
				<DropdownMenu.Item>Guides</DropdownMenu.Item>
				<DropdownMenu.Item>Other</DropdownMenu.Item>
				<DropdownMenu.Item>Roadway</DropdownMenu.Item>
				<DropdownMenu.Item>Parking</DropdownMenu.Item>
				<DropdownMenu.Item>Building</DropdownMenu.Item>
				<DropdownMenu.Item>Dry utility</DropdownMenu.Item>
				<DropdownMenu.Item>Stormwater</DropdownMenu.Item>
				<DropdownMenu.Item>Sewer</DropdownMenu.Item>
				<DropdownMenu.Item>Boundary</DropdownMenu.Item>
				<DropdownMenu.Item>Map</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
