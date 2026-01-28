/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useSearchParams } from "react-router";
import {
	Anchor,
	Button,
	Field,
	IconButton,
	Select,
	Skeleton,
	Text,
	TextBox,
	VisuallyHidden,
} from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import {
	DropdownMenu,
	unstable_ErrorRegion as ErrorRegion,
	Tabs,
	unstable_Toolbar as Toolbar,
	Tree,
} from "@stratakit/structures";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import { produce } from "immer";
import {
	getResizeHandleElement,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from "react-resizable-panels";
import { toUpperCamelCase } from "~/~utils.tsx";

import type { UseQueryResult } from "@tanstack/react-query";
import type { MetaFunction } from "react-router";

import cursorIcon from "@stratakit/icons/cursor.svg";
import cursorSelectIcon from "@stratakit/icons/cursor-select.svg";
import dismissIcon from "@stratakit/icons/dismiss.svg";
import drawIcon from "@stratakit/icons/draw.svg";
import filterIcon from "@stratakit/icons/filter.svg";
import lockIcon from "@stratakit/icons/lock.svg";
import measureIcon from "@stratakit/icons/measure.svg";
import panelCollapseLeftIcon from "@stratakit/icons/panel-collapse-left.svg";
import placeholderIcon from "@stratakit/icons/placeholder.svg";
import retryIcon from "@stratakit/icons/retry.svg";
import searchIcon from "@stratakit/icons/search.svg";
import hideIcon from "@stratakit/icons/visibility-hide.svg";
import showIcon from "@stratakit/icons/visibility-show.svg";
import model1Url from "./_data/sandbox.model1.json?url";
import model2Url from "./_data/sandbox.model2.json?url";
import model3Url from "./_data/sandbox.model3.json?url";
import styles from "./index.module.css";

// ----------------------------------------------------------------------------

const models = {
	model1: { name: "Epoch System iModel 1", url: model1Url },
	model2: { name: "Epoch System iModel 2", url: model2Url },
	model3: { name: "Epoch System iModel 3", url: model3Url },
} as const;

async function fetchModelsData(
	model: keyof typeof models,
): Promise<typeof import("./_data/sandbox.model3.json")> {
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

const title = "StrataKit sandbox";

export const meta: MetaFunction = () => {
	return [{ title }];
};

export default function Page() {
	return (
		<div className={styles.appLayout}>
			<Header />
			<PanelGroup
				direction="horizontal"
				className={styles.content}
				keyboardResizeBy={2.5}
			>
				<nav aria-label="Left panel" style={{ display: "contents" }}>
					<Panel
						defaultSize={20}
						minSize={15}
						maxSize={35}
						className={styles.leftPanel}
					>
						<LeftPanel />
					</Panel>
					<PanelSplitter />
				</nav>
				<Panel className={styles.canvasWrapper} tagName="main">
					<Canvas />
				</Panel>
			</PanelGroup>
		</div>
	);
}

// ----------------------------------------------------------------------------

function Header() {
	return (
		<header className={styles.header}>
			<Text render={<h1 />} variant="body-md">
				{title}
			</Text>
		</header>
	);
}

function Canvas() {
	return (
		<div className={styles.canvas}>
			<Toolbar.Group variant="solid">
				<Toolbar.Item
					render={
						<IconButton
							label="Select"
							icon={`${cursorIcon}#icon-large`}
							variant="ghost"
						/>
					}
				/>
				<Toolbar.Item
					render={
						<IconButton
							label="Move"
							icon={`${cursorSelectIcon}#icon-large`}
							variant="ghost"
						/>
					}
				/>
				<Toolbar.Item
					render={
						<IconButton
							label="Draw"
							icon={`${drawIcon}#icon-large`}
							variant="ghost"
						/>
					}
				/>
				<Toolbar.Item
					render={
						<IconButton
							label="Measure"
							icon={`${measureIcon}#icon-large`}
							variant="ghost"
						/>
					}
				/>
			</Toolbar.Group>
		</div>
	);
}

function LeftPanel() {
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedModel =
		(searchParams.get("model") as keyof typeof models) || "model1";

	const query = useQuery({
		queryKey: ["sandbox-data", selectedModel],
		queryFn: () => fetchModelsData(selectedModel),
		staleTime: Number.POSITIVE_INFINITY,
	});

	return (
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
						icon={panelCollapseLeftIcon}
						label="Dock panel"
						variant="ghost"
						disabled
					/>
				</div>
			</div>

			<React.Suspense key={selectedModel} fallback={<PanelLoading />}>
				<PanelContentContainer query={query} />
			</React.Suspense>
		</>
	);
}

function PanelContentContainer(props: {
	query: UseQueryResult<Awaited<ReturnType<typeof fetchModelsData>>>;
}) {
	const { data } = React.use(props.query.promise);

	return (
		<SearchboxProvider defaultVisible={Object.keys(data).length !== 1}>
			<PanelContent data={data} />
		</SearchboxProvider>
	);
}

function PanelSplitter() {
	const resizerId = React.useId();

	React.useEffect(() => {
		const resizer = getResizeHandleElement(resizerId);

		// We override the `role` from "separator" to "slider" for better support in NVDA
		// (and perhaps other desktop screen-readers).
		// This still doesn't work in TalkBack (and perhaps other mobile screen-readers),
		// for which we will likely need a hidden range input. (TODO)
		resizer?.setAttribute("role", "slider");
	}, [resizerId]);

	return (
		<PanelResizeHandle
			id={resizerId}
			hitAreaMargins={{ fine: 2, coarse: 12 }}
			className={styles.splitter}
			aria-label="Resize left panel"
		/>
	);
}

// ----------------------------------------------------------------------------

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

function PanelContent(props: { data: { [key: string]: TreeItemData[] } }) {
	const { isSearchboxVisible } = React.useContext(SearchboxContext);

	const trees = React.useMemo(
		() =>
			Object.entries(props.data).map(([treeName, treeData]) => {
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
		[props.data],
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
			<Tabs.Provider selectOnMove={false} setSelectedId={setSelectedTreeId}>
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
							role={isSearchboxVisible ? "group" : "tabpanel"}
							aria-label={isSearchboxVisible ? tree.name : undefined}
							tabId={tree.name}
							className={styles.tabPanel}
							focusable={false}
							unmountOnHide
						>
							{tree.content}
						</Tabs.TabPanel>
					);
				})}
			</Tabs.Provider>
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

type ExampleColor =
	| "red"
	| "purple"
	| "blue"
	| "green"
	| "yellow"
	| "gray"
	| "teal";

interface TreeItemData {
	id?: string;
	label: string;
	description?: string;
	expanded?: boolean;
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
	errorIds,
}: {
	items: TreeItem[];
	filters: string[];
	search: string;
	errorIds: string[];
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
				const excludeItems = errorIds.includes(item.id);
				const matchingItems = excludeItems ? [] : matchSearch(item.items ?? []);

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

		if (search === "" && errorIds.length === 0) return filteredItems;
		return matchSearch(filteredItems);
	}, [filteredItems, search, errorIds]);

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

function useTreeItems(items: TreeItem[], itemIds: string[]) {
	return React.useMemo(() => {
		function findItems(items: TreeItem[]): TreeItem[] {
			return items.reduce<TreeItem[]>((acc, item) => {
				if (itemIds.includes(item.id)) {
					acc.push(item);
				}
				if (item.items) {
					acc.push(...findItems(item.items));
				}
				return acc;
			}, []);
		}
		return findItems(items);
	}, [items, itemIds]);
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

function SandboxTree({ data: treeData }: { data: TreeItemData[] }) {
	const {
		appliedFilters: filters,
		search,
		setItemCount,
	} = React.useContext(TreeFilteringContext);
	const treeId = React.useId();
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

	const [failingIds, setFailingIds] = React.useState(["benstr", "benroad"]);
	const failingItems = useTreeItems(items, failingIds);
	const errorItems = React.useMemo(() => {
		return failingItems.filter((item) => item.expanded);
	}, [failingItems]);
	const errorIds = React.useMemo(
		() => errorItems.map((item) => item.id),
		[errorItems],
	);

	const { filteredTree, itemCount } = useFilteredTree({
		items,
		filters,
		search,
		errorIds,
	});

	const flatItems = useFlatTreeItems(filteredTree, selected, hidden);

	React.useEffect(() => {
		setItemCount(itemCount);
	}, [setItemCount, itemCount]);

	const errorLength = errorItems.length;
	const errorMessage = React.useMemo(() => {
		if (errorLength === 0) return undefined;
		if (errorLength === 1) return "1 issue found";
		return `${errorLength} issues found`;
	}, [errorLength]);

	const deferredItems = React.useDeferredValue(flatItems);
	if (deferredItems.length === 0) return <NoResultsState />;

	return (
		<React.Suspense fallback="Loading...">
			<ErrorRegion.Root
				aria-label="Tree errors"
				label={errorMessage}
				items={errorItems.map((item) => {
					const treeItemId = `${treeId}-${item.id}`;
					return (
						<ErrorRegion.Item
							key={item.id}
							message={
								<>
									<span>Failed to create hierarchy for </span>
									<Anchor href={`#${treeItemId}`}>{item.label}</Anchor>
								</>
							}
							messageId={`${treeItemId}-message`}
							actions={
								<Anchor
									render={<button />}
									key="retry"
									onClick={() => {
										setFailingIds((prev) => {
											return prev.filter((id) => id !== item.id);
										});
									}}
								>
									Retry
								</Anchor>
							}
						/>
					);
				})}
			/>
			<Tree.Root className={styles.tree}>
				{deferredItems.map((item) => {
					const hasError = errorItems.find(
						(errorItem) => errorItem.id === item.id,
					);
					const id = hasError ? `${treeId}-${item.id}` : undefined;
					return (
						<Tree.Item
							key={item.id}
							id={id}
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
							expanded={
								item.items.length === 0 && !hasError ? undefined : item.expanded
							}
							onExpandedChange={(expanded) => {
								setItems(
									produce((prev) => {
										const treeItem = findTreeItem(prev, item.id);
										if (!treeItem) return;
										treeItem.expanded = expanded;
									}),
								);
							}}
							unstable_decorations={
								<>
									{item.color ? (
										<ColorSwatch color={item.color} alt={item.color} />
									) : null}
									<Icon href={placeholderIcon} />
								</>
							}
							inlineActions={
								hasError
									? [
											<Tree.ItemAction
												key="retry"
												icon={retryIcon}
												label="Retry"
												onClick={() => {
													setFailingIds((prev) => {
														return prev.filter((id) => id !== item.id);
													});
												}}
											/>,
										]
									: [
											<Tree.ItemAction
												key="lock"
												icon={lockIcon}
												label="Lock"
											/>,
											<VisibilityAction
												key="visibility"
												item={item}
												onClick={toggleHidden}
											/>,
										]
							}
							actions={[
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
							error={hasError ? `${id}-message` : undefined}
						/>
					);
				})}
			</Tree.Root>
		</React.Suspense>
	);
}

interface VisibilityActionProps {
	item: FlatTreeItem;
	onClick: (id: string) => void;
}

function VisibilityAction({ item, onClick }: VisibilityActionProps) {
	return (
		<Tree.ItemAction
			key="visibility"
			icon={item.hidden ? hideIcon : showIcon}
			label={item.hidden ? "Show" : "Hide"}
			visible={item.hidden ? true : undefined}
			onClick={React.useCallback(() => {
				onClick(item.id);
			}, [onClick, item.id])}
			dot={item.hidden ? "Hidden" : undefined}
		/>
	);
}

function Subheader({ tabs }: { tabs?: React.ReactNode }) {
	const { itemCount, isFiltered, search, setSearch } =
		React.useContext(TreeFilteringContext);

	const { isSearchboxVisible, setIsSearchboxVisible } =
		React.useContext(SearchboxContext);

	const searchInputRef = React.useRef<HTMLInputElement>(null);
	const tabsRef = React.useRef<HTMLHeadingElement>(null);

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
		<DropdownMenu.Provider>
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
		</DropdownMenu.Provider>
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

function SearchboxProvider(
	props: React.PropsWithChildren<{ defaultVisible: boolean }>,
) {
	const [isSearchboxVisible, setIsSearchboxVisible] = React.useState(
		!props.defaultVisible,
	);

	return (
		<SearchboxContext.Provider
			value={React.useMemo(
				() => ({
					isSearchboxVisible,
					setIsSearchboxVisible,
				}),
				[isSearchboxVisible],
			)}
		>
			{props.children}
		</SearchboxContext.Provider>
	);
}

const SearchboxContext = React.createContext<{
	isSearchboxVisible: boolean;
	setIsSearchboxVisible: (visible: boolean) => void;
}>({
	isSearchboxVisible: false,
	setIsSearchboxVisible: () => {},
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
