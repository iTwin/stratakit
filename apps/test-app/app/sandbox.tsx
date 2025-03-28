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
	Field,
	Icon,
	IconButton,
	Select,
	Skeleton,
	Tabs,
	Text,
	TextBox,
	Tree,
	VisuallyHidden,
	unstable_Toolbar as Toolbar,
} from "@itwin/itwinui-react/bricks";
import { useSearchParams, type MetaFunction } from "react-router";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { toUpperCamelCase } from "./~utils.tsx";
import cx from "classnames";

import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import searchIcon from "@itwin/itwinui-icons/search.svg";
import panelLeftIcon from "@itwin/itwinui-icons/panel-left.svg";
import filterIcon from "@itwin/itwinui-icons/filter.svg";
import dismissIcon from "@itwin/itwinui-icons/dismiss.svg";
import lockIcon from "@itwin/itwinui-icons/lock.svg";
import showIcon from "@itwin/itwinui-icons/visibility-show.svg";
import hideIcon from "@itwin/itwinui-icons/visibility-hide.svg";
import cursorIcon from "@itwin/itwinui-icons/cursor.svg";
import cursorSelectIcon from "@itwin/itwinui-icons/cursor-select.svg";
import drawIcon from "@itwin/itwinui-icons/draw.svg";
import measureIcon from "@itwin/itwinui-icons/measure.svg";

import model1Url from "./sandbox.model1.json?url";
import model2Url from "./sandbox.model2.json?url";
import model3Url from "./sandbox.model3.json?url";

// ----------------------------------------------------------------------------

const models = {
	model1: { name: "Epoch System iModel 1", url: model1Url },
	model2: { name: "Epoch System iModel 2", url: model2Url },
	model3: { name: "Epoch System iModel 3", url: model3Url },
} as const;

async function fetchModelsData(
	model: keyof typeof models,
): Promise<typeof import("./sandbox.model3.json")> {
	if (model in models) {
		const data = await fetch(models[model].url).then((res) => res.json());
		// Simulate network delay for models marked as "slow"
		if (data.slow) {
			await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
		}
		return data;
	}

	return {
		name: "Unknown",
		version: "Unknown",
		data: { default: [] },
	};
}

// ----------------------------------------------------------------------------

const title = "Kiwi sandbox";
export const meta: MetaFunction = () => {
	return [{ title }];
};

export default function Page() {
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedModel =
		(searchParams.get("model") as keyof typeof models) || "model1";

	const query = useQuery({
		queryKey: ["sandbox-data", selectedModel],
		queryFn: () => fetchModelsData(selectedModel),
	});

	return (
		<Layout
			panelContent={
				<>
					<div className={styles.panelHeader}>
						<div>
							<Field.Root>
								<VisuallyHidden render={<Field.Label />}>
									Choose Model
								</VisuallyHidden>

								<Field.Control
									render={(controlProps) => (
										<Select.Root className={styles.panelTitleWrapper}>
											<Select.HtmlSelect
												{...controlProps}
												variant="ghost"
												defaultValue={selectedModel}
												onChange={(e) =>
													setSearchParams({ model: e.currentTarget.value })
												}
											>
												{Object.entries(models).map(([id, { name }]) => (
													<option key={id} value={id}>
														{name}
													</option>
												))}
											</Select.HtmlSelect>
										</Select.Root>
									)}
								/>
							</Field.Root>

							<hgroup role="group">
								<VisuallyHidden render={<h2 />}>
									{models[selectedModel]?.name}
								</VisuallyHidden>

								<React.Suspense
									key={selectedModel}
									fallback={<Skeleton variant="text" />}
								>
									<VersionContent query={query} />
								</React.Suspense>
							</hgroup>
						</div>

						<div>
							<IconButton
								className={styles.shiftIconRight}
								icon={panelLeftIcon}
								label="Dock panel"
								variant="ghost"
								disabled
							/>
						</div>
					</div>

					<React.Suspense key={selectedModel} fallback={<PanelLoading />}>
						<PanelContent query={query} />
					</React.Suspense>
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
				<div className={styles.canvas}>
					<Toolbar.Root variant="solid">
						<Toolbar.Item
							render={
								<IconButton label="Select" icon={cursorIcon} variant="ghost" />
							}
						/>
						<Toolbar.Item
							render={
								<IconButton
									label="Move"
									icon={cursorSelectIcon}
									variant="ghost"
								/>
							}
						/>
						<Toolbar.Item
							render={
								<IconButton label="Draw" icon={drawIcon} variant="ghost" />
							}
						/>
						<Toolbar.Item
							render={
								<IconButton
									label="Measure"
									icon={measureIcon}
									variant="ghost"
								/>
							}
						/>
					</Toolbar.Root>
				</div>
			</div>
		</Layout>
	);
}

// ----------------------------------------------------------------------------

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

function PanelLoading() {
	const levels = [1, 1, 2, 2, 3, 2, 3, 2, 1, 1, 2, 3, 4, 5, 2, 3, 4, 5];

	return (
		<>
			<div className={styles.subheader}>
				<Skeleton variant="text" />
			</div>

			<div className={styles.skeletonTree}>
				{levels.map((level, i) => {
					return (
						<SkeletonTreeItem
							key={`${i}-${level}`}
							style={{ "--level": level } as React.CSSProperties}
						/>
					);
				})}

				<VisuallyHidden>Loading…</VisuallyHidden>
			</div>
		</>
	);
}

function SkeletonTreeItem(props: React.ComponentProps<"div">) {
	return (
		<div {...props} className={cx(styles.skeletonTreeItem, props.className)}>
			<Skeleton variant="object" size="small" />
			<Skeleton variant="text" />
		</div>
	);
}

function VersionContent(props: {
	query: UseQueryResult<Awaited<ReturnType<typeof fetchModelsData>>>;
}) {
	const { version = "" } = React.use(props.query.promise);

	return (
		<Text className={styles.panelCaption} variant="body-sm" render={<p />}>
			{version}
		</Text>
	);
}

function PanelContent(props: {
	query: UseQueryResult<Awaited<ReturnType<typeof fetchModelsData>>>;
}) {
	const { data } = React.use(props.query.promise);

	const trees = React.useMemo(
		() =>
			Object.entries(data).map(([treeName, treeData]) => {
				const filters =
					treeData.length <= 1 ? [] : treeData.map(({ label }) => label); // top-level items are used as filters

				return {
					name: treeName,
					filters,
					content:
						treeData.length > 0 ? (
							<SandboxTree data={treeData} />
						) : (
							<EmptyState>
								<Text variant="body-sm">No layers</Text>
								<Button>Create a layer</Button>
							</EmptyState>
						),
				} as const;
			}),
		[data],
	);

	const [selectedTreeId, setSelectedTreeId] = React.useState<
		string | undefined | null
	>(trees[0]?.name);

	const allFilters = React.useMemo(() => {
		if (!selectedTreeId) return trees[0].filters;
		return trees.find((tree) => tree.name === selectedTreeId)?.filters || [];
	}, [trees, selectedTreeId]);

	if (trees.length === 1)
		return (
			<TreeFilteringProvider allFilters={allFilters}>
				<Subheader />
				{trees[0].content}
			</TreeFilteringProvider>
		);

	return (
		<TreeFilteringProvider allFilters={allFilters}>
			<Tabs.Root selectOnMove={false} setSelectedId={setSelectedTreeId}>
				<Subheader
					tabs={trees.map((tree) => (
						<Tabs.Tab key={tree.name} id={tree.name}>
							{toUpperCamelCase(tree.name)}
						</Tabs.Tab>
					))}
				/>
				{trees.map((tree) => {
					return (
						<Tabs.TabPanel
							key={tree.name}
							tabId={tree.name}
							className={styles.tabPanel}
							focusable={false}
							unmountOnHide
						>
							{tree.content}
						</Tabs.TabPanel>
					);
				})}
			</Tabs.Root>
		</TreeFilteringProvider>
	);
}

// ----------------------------------------------------------------------------

function EmptyState({ children }: React.PropsWithChildren) {
	return <div className={styles.emptyState}>{children}</div>;
}

function NoResultsState() {
	return (
		<div style={{ textAlign: "center" }}>
			<Text variant="body-sm">No results found</Text>
		</div>
	);
}

// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------

type ExampleColor =
	| "red"
	| "purple"
	| "blue"
	| "green"
	| "yellow"
	| "gray"
	| "teal";

interface TreeItemData {
	label: string;
	description?: string;
	items?: TreeItemData[];
	[key: string]: unknown;
}

interface TreeItem {
	id: string;
	label: string;
	description?: string;
	type?: string; // Used for filtering
	items: TreeItem[];
	expanded: boolean;
	color?: ExampleColor;
}

const createTreeItem = (() => {
	let id = 0;
	return (raw?: TreeItemData): TreeItem => {
		return {
			id: `${id++}`,
			label: `Tree Item ${id}`,
			expanded: true,
			...raw,
			items: (raw?.items ?? []).map(createTreeItem),
		};
	};
})();

function useFilteredTree({
	items,
	filters,
	search,
}: {
	items: TreeItem[];
	filters: string[];
	search: string;
}) {
	const filteredItems = React.useMemo(() => {
		if (filters.length === 0) return items;
		return items.reduce<TreeItem[]>((acc, item) => {
			// Filters first level only, usually you'd want to traverse the tree.
			if (!filters.includes(item.label)) {
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
		if (filters.length === 0 && search === "") return undefined;

		function countItems(items: TreeItem[]): number {
			return items.reduce((acc, item) => {
				const childItemCount = item.items ? countItems(item.items) : 0;
				return acc + 1 + childItemCount;
			}, 0);
		}
		return countItems(foundItems);
	}, [foundItems, filters, search]);
	return { filteredTree: foundItems, itemCount };
}

interface FlatTreeItem extends TreeItem {
	level: number;
	selected: boolean;
	hidden: boolean;
	parentHidden: boolean;
	parentItem?: TreeItem;
	position: number;
	size: number;
	color?: ExampleColor;
}

function useFlatTreeItems(
	items: TreeItem[],
	selectedItem: string | undefined,
	hiddenItems: string[],
): FlatTreeItem[] {
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
				const selected = item.id === selectedItem || parentSelected;
				const hidden = hiddenItems.includes(item.id) || parentHidden;
				flatItems.push({
					...item,
					level,
					parentItem,
					selected,
					hidden,
					parentHidden,
					position: position++,
					size: items.length,
				});
				if (!item.expanded) continue;
				flatItems.push(
					...flattenItems(item.items, item, level + 1, selected, hidden),
				);
			}
			return flatItems;
		}
		return flattenItems(items, undefined, 1, false, false);
	}, [items, selectedItem, hiddenItems]);
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

function SandboxTree({
	data: treeData,
}: {
	data: TreeItemData[];
}) {
	const {
		appliedFilters: filters,
		search,
		setItemCount,
	} = React.useContext(TreeFilteringContext);
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

	const [items, setItems] = React.useState(() =>
		treeData.map((item) => createTreeItem(item)),
	);

	const { filteredTree, itemCount } = useFilteredTree({
		items,
		filters,
		search,
	});
	const flatItems = useFlatTreeItems(filteredTree, selected, hidden);

	React.useEffect(() => {
		setItemCount(itemCount);
	}, [setItemCount, itemCount]);

	const deferredItems = React.useDeferredValue(flatItems);
	if (deferredItems.length === 0) return <NoResultsState />;

	return (
		<React.Suspense fallback="Loading...">
			<Tree.Root className={styles.tree}>
				{deferredItems.map((item) => {
					return (
						<Tree.Item
							key={item.id}
							label={item.label}
							description={item.description}
							aria-level={item.level}
							aria-posinset={item.position}
							aria-setsize={item.size}
							selected={item.selected}
							onSelectedChange={() => {
								if (selected === item.id) {
									setSelected(undefined);
									return;
								}
								setSelected(item.id);
							}}
							expanded={item.items.length === 0 ? undefined : item.expanded}
							onExpandedChange={(expanded) => {
								setItems((prev) => {
									const treeItem = findTreeItem(prev, item.id);
									if (!treeItem) return prev;
									const newData = [...prev];
									treeItem.expanded = expanded; // TODO: should be immutable https://github.com/iTwin/kiwi/pull/300#discussion_r1941452941
									return newData;
								});
							}}
							unstable_decorations={
								<>
									{item.color ? (
										<ColorSwatch color={item.color} alt={item.color} />
									) : null}
									<Icon href={placeholderIcon} />
								</>
							}
							actions={[
								<Tree.ItemAction key="lock" icon={lockIcon} label="Lock" />,
								<Tree.ItemAction
									key="visibility"
									icon={item.hidden ? hideIcon : showIcon}
									label={item.hidden ? "Show" : "Hide"}
									visible={item.hidden ? true : undefined}
									onClick={() => {
										toggleHidden(item.id);
									}}
									dot={item.hidden ? "Hidden" : undefined}
								/>,
								<Tree.ItemAction key="copy" label="Copy" />,
								<Tree.ItemAction key="paste" label="Paste" />,
								<Tree.ItemAction key="copy-paste" label="Copy/Paste as" />,
								<Tree.ItemAction key="move" label="Move to" />,
								<Tree.ItemAction key="bring-to-front" label="Bring to front" />,
								<Tree.ItemAction key="send-to-back" label="Send to back" />,
								<Tree.ItemAction key="group" label="Group selection" />,
								<Tree.ItemAction key="ungroup" label="Ungroup" />,
								<Tree.ItemAction key="rename" label="Rename" />,
								<Tree.ItemAction key="show-hide" label="Show/hide" />,
								<Tree.ItemAction key="lock-unlock" label="Lock/unlock" />,
								<Tree.ItemAction key="isolate" label="Isolate object" />,
							]}
						/>
					);
				})}
			</Tree.Root>
		</React.Suspense>
	);
}

function Subheader({ tabs }: { tabs?: React.ReactNode }) {
	const { itemCount, isFiltered, search, setSearch } =
		React.useContext(TreeFilteringContext);

	const searchInputRef = React.useRef<HTMLInputElement>(null);
	const tabsRef = React.useRef<HTMLHeadingElement>(null);

	const [isSearchboxVisible, setIsSearchboxVisible] = React.useState(!tabs);
	const filterOrSearchActive = isFiltered || !!search;

	const actions = isSearchboxVisible ? (
		<>
			<FiltersMenu />
			{tabs ? (
				<IconButton
					className={styles.shiftIconRight}
					icon={dismissIcon}
					label="Close"
					variant="ghost"
					onClick={() => {
						ReactDOM.flushSync(() => setIsSearchboxVisible(false));
						tabsRef.current?.focus();
					}}
				/>
			) : null}
		</>
	) : (
		<IconButton
			className={styles.shiftIconRight}
			icon={searchIcon}
			label="Search"
			dot={filterOrSearchActive ? "Some filters or search applied" : undefined}
			variant="ghost"
			onClick={() => {
				ReactDOM.flushSync(() => setIsSearchboxVisible(true));
				searchInputRef.current?.focus();
			}}
		/>
	);

	const filteredNotification = React.useMemo(() => {
		if (!isFiltered) return undefined;
		if (itemCount === undefined) return "Showing all tree items";
		return `Showing ${itemCount} tree items`;
	}, [isFiltered, itemCount]);

	return (
		<div className={styles.subheader}>
			<VisuallyHidden aria-live="polite" aria-atomic={true}>
				{filteredNotification}
			</VisuallyHidden>

			{tabs && !isSearchboxVisible ? (
				<Tabs.TabList className={styles.tabList} tone="accent" ref={tabsRef}>
					{tabs}
				</Tabs.TabList>
			) : null}

			{isSearchboxVisible ? (
				<TextBox.Root className={styles.searchInput}>
					<TextBox.Icon href={searchIcon} />
					<TextBox.Input
						placeholder="Search"
						ref={searchInputRef}
						onChange={(e) => setSearch(e.currentTarget.value)}
					/>
				</TextBox.Root>
			) : null}

			<div className={styles.subheaderActions}>{actions}</div>
		</div>
	);
}

function FiltersMenu() {
	const context = React.useContext(TreeFilteringContext);

	const filtersApplied = context.appliedFilters.length > 0;

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Button
				render={
					<IconButton
						icon={filterIcon}
						label="Filter"
						dot={filtersApplied ? "Some filters applied" : undefined}
						variant="ghost"
						disabled={context.allFilters.length === 0}
					/>
				}
			/>
			<DropdownMenu.Content>
				{context.allFilters.map((filter) => {
					const checked = context.appliedFilters.includes(filter);
					return (
						<DropdownMenu.CheckboxItem
							key={filter}
							name={filter}
							label={filter}
							checked={checked}
							onChange={() => {
								context.toggleFilter(filter);
							}}
						/>
					);
				})}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

function TreeFilteringProvider(
	props: React.PropsWithChildren<{ allFilters: string[] }>,
) {
	const [isFiltered, setIsFiltered] = React.useState(false);
	const [appliedFilters, setAppliedFilters] = React.useState<string[]>([]);
	const [search, setSearchState] = React.useState("");
	const [itemCount, setItemCount] = React.useState<number | undefined>(
		undefined,
	);
	const toggleFilter = React.useCallback(
		(filter: string) => {
			const newFilters = appliedFilters.includes(filter)
				? appliedFilters.filter((f) => f !== filter)
				: [...appliedFilters, filter];

			setAppliedFilters(newFilters);
			setIsFiltered(newFilters.length > 0);
		},
		[appliedFilters],
	);
	const clearFilters = React.useCallback(() => {
		setAppliedFilters([]);
		setIsFiltered(false);
	}, []);
	const setSearch = React.useCallback((s: string) => {
		setSearchState(s);
		setIsFiltered(!!s);
	}, []);

	return (
		<TreeFilteringContext.Provider
			value={React.useMemo(
				() => ({
					allFilters: props.allFilters,
					appliedFilters,
					isFiltered,
					toggleFilter,
					clearFilters,
					search,
					setSearch,
					itemCount,
					setItemCount,
				}),
				[
					props.allFilters,
					appliedFilters,
					isFiltered,
					toggleFilter,
					clearFilters,
					search,
					setSearch,
					itemCount,
				],
			)}
		>
			{props.children}
		</TreeFilteringContext.Provider>
	);
}

const TreeFilteringContext = React.createContext<{
	allFilters: string[];
	appliedFilters: string[];
	isFiltered: boolean;
	toggleFilter: (filter: string) => void;
	clearFilters: () => void;
	search: string;
	setSearch: (search: string) => void;
	itemCount: number | undefined;
	setItemCount: (count: number | undefined) => void;
}>({
	allFilters: [],
	appliedFilters: [],
	isFiltered: false,
	toggleFilter: () => {},
	clearFilters: () => {},
	search: "",
	setSearch: () => {},
	itemCount: undefined,
	setItemCount: () => {},
});

function ColorSwatch(props: { color: string; alt?: string }) {
	return (
		<div
			className={styles.colorSwatch}
			style={
				{
					"--_color": `var(--_color--${props.color})`,
				} as React.CSSProperties
			}
		>
			{props.alt ? <VisuallyHidden>{props.alt}</VisuallyHidden> : null}
		</div>
	);
}
