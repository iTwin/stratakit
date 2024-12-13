/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Ariakit from "@ariakit/react";
import styles from "./sandbox.module.css";
import {
	Divider,
	DropdownMenu,
	Icon,
	IconButton,
	TextBox,
	VisuallyHidden,
} from "@itwin/itwinui-react/bricks";
import * as Tree from "@itwin/itwinui-react-internal/src/bricks/Tree.js";
import type { MetaFunction } from "react-router";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import searchIcon from "@itwin/itwinui-icons/search.svg";
import panelLeftIcon from "@itwin/itwinui-icons/panel-left.svg";
import filterIcon from "@itwin/itwinui-icons/filter.svg";
import dismissIcon from "@itwin/itwinui-icons/dismiss.svg";
import lockIcon from "@itwin/itwinui-icons/lock.svg";
import showIcon from "@itwin/itwinui-icons/visibility-show.svg";

const title = "Kiwi sandbox";
export const meta: MetaFunction = () => {
	return [{ title }];
};

export default function Page() {
	const { sliderProps, panelProps, panelMinSize, panelMaxSize, resizing } =
		useSplitter<HTMLDivElement>({
			minSize: { px: 256, pct: 20 },
			maxSize: { pct: 30 },
		});
	return (
		<>
			<VisuallyHidden render={(props) => <h1 {...props} />}>
				{title}
			</VisuallyHidden>
			<div
				className={styles.appLayout}
				style={
					{
						"--_panel-min-size": panelMinSize,
						"--_panel-max-size": panelMaxSize,
					} as React.CSSProperties
				}
			>
				<div className={styles.platformBar}>
					<div className={styles.logo}>
						<Icon href={placeholderIcon} size="large" />
					</div>
					<div className={styles.tools}>
						<Icon href={placeholderIcon} size="large" />
						<Icon href={placeholderIcon} size="large" />
						<Icon href={placeholderIcon} size="large" />
					</div>
				</div>
				<div
					{...panelProps}
					className={styles.leftPanel}
					style={{ position: "relative", ...panelProps.style }}
				>
					<div className={styles.header}>
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
					<Subheader />
					<SandboxTree />
					<Divider
						presentational
						className={styles.splitter}
						data-resizing={resizing ? "true" : undefined}
					>
						<input
							type="range"
							aria-label="Resize layers panel"
							className={styles.slider}
							{...sliderProps}
						/>
					</Divider>
				</div>
				<div className={styles.canvasWrapper}>
					<div className={styles.canvas} />
				</div>
			</div>
		</>
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

	const panelMinSize = minSize === undefined ? undefined : `${minSize}px`;
	const panelMaxSize = React.useMemo(() => {
		if (
			preferredSize !== undefined &&
			maxSizeSpec !== undefined &&
			mode === undefined
		) {
			return `min(${preferredSize}px, ${maxSizeSpec.pct}%)`;
		}

		if (size === undefined) return undefined;
		return `${size}px`;
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
	setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
	selected: undefined,
	setSelected: () => {},
});

function SandboxTree() {
	const [selected, setSelected] = React.useState<string | undefined>();
	return (
		<SandboxTreeContext.Provider value={{ selected, setSelected }}>
			<Tree.Root className={styles.tree}>
				<TreeItem label="Guides">
					<TreeItem label="Tree">
						<TreeItem label="Guide 4" />
						<TreeItem label="Guide 3" />
						<TreeItem label="Guide 2" />
						<TreeItem label="Guide 1" lockAction />
					</TreeItem>
				</TreeItem>
				<TreeItem label="Other">
					<TreeItem label="Object 2">
						<TreeItem label="Path 3" />
					</TreeItem>
					<TreeItem label="Object 1" visibilityAction />
				</TreeItem>
				<TreeItem label="Road">
					<TreeItem label="Parking lot access" />
					<TreeItem label="Site access" lockAction visibilityAction />
				</TreeItem>
				<TreeItem label="Parking lot">
					<TreeItem label="Parking area">
						<TreeItem label="Bay point 2" />
						<TreeItem label="Bay point 1" />
						<TreeItem label="Space point 1" />
						<TreeItem label="Path 6" />
					</TreeItem>
				</TreeItem>
				<TreeItem label="Building">
					<TreeItem label="Building area">
						<TreeItem label="Path 5" />
					</TreeItem>
				</TreeItem>
				<TreeItem label="Sewer">
					<TreeItem label="Run off pipe">
						<TreeItem label="Path 4" />
					</TreeItem>
				</TreeItem>
				<TreeItem label="Project boundary">
					<TreeItem label="Property area">
						<TreeItem label="Path 1" />
					</TreeItem>
				</TreeItem>
				<TreeItem label="Map">
					<TreeItem label="Location">
						<TreeItem label="Terrain" />
					</TreeItem>
				</TreeItem>
			</Tree.Root>
		</SandboxTreeContext.Provider>
	);
}

const SandboxParentItemContext = React.createContext<{
	selected: boolean;
}>({ selected: false });

type TreeItemProps = React.PropsWithChildren<{
	label?: string;
	visibilityAction?: boolean;
	lockAction?: boolean;
}>;

function TreeItem(props: TreeItemProps) {
	const id = React.useId();
	const isParentNode = React.Children.count(props.children) > 0;
	const [expanded, setExpanded] = React.useState(true);
	const treeContext = React.useContext(SandboxTreeContext);
	const parentContext = React.useContext(SandboxParentItemContext);
	const selected = parentContext.selected || id === treeContext.selected;
	return (
		<SandboxParentItemContext.Provider
			value={{
				selected,
			}}
		>
			<Tree.Item
				content={
					<>
						<Tree.Expander
							onClick={(e) => {
								setExpanded((prev) => !prev);
								e.stopPropagation(); // Prevent tree item selection.
							}}
						/>
						<Icon href={placeholderIcon} style={{ display: "inline" }} />
						<Tree.Content>{props.label}</Tree.Content>
						<div style={{ display: "flex", gap: 4, marginInlineStart: "auto" }}>
							<IconButton
								className={styles.action}
								icon={lockIcon}
								label="Lock"
								variant="ghost"
								aria-hidden={!props.lockAction}
							/>
							<IconButton
								className={styles.action}
								icon={showIcon}
								label="Show"
								variant="ghost"
								aria-hidden={!props.visibilityAction}
							/>
						</div>
					</>
				}
				expanded={isParentNode ? expanded : undefined}
				selected={selected}
				onClick={() => {
					treeContext.setSelected((prev) => {
						if (prev === id) return undefined;
						return id;
					});
				}}
			>
				{expanded ? props.children : undefined}
			</Tree.Item>
		</SandboxParentItemContext.Provider>
	);
}

function Subheader() {
	const [isSearching, setIsSearching] = React.useState(false);
	const searchInputRef = React.useRef<HTMLInputElement>(null);
	const subheaderRef = React.useRef<HTMLHeadingElement>(null);

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
					subheaderRef.current?.focus();
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
			<Ariakit.Role.h3
				className={styles.subheaderTitle}
				tabIndex={-1}
				ref={subheaderRef}
				// When searching, we don't want to show the heading content visually, but we still want it
				// in the DOM for screen readers. The heading structure of the page should remain the same.
				// biome-ignore lint/a11y/useHeadingContent: This is fine. The heading content is set by children.
				render={isSearching ? <VisuallyHidden render={<h3 />} /> : undefined}
			>
				Layers
			</Ariakit.Role.h3>

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
