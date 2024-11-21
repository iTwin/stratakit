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
} from "@itwin/kiwi-react/bricks";
import * as ListItem from "@itwin/kiwi-react-internal/src/bricks/ListItem.js";
import type { MetaFunction } from "@remix-run/react";

const title = "Kiwi sandbox";
export const meta: MetaFunction = () => {
	return [{ title }, { name: "color-scheme", content: "dark" }];
};

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;
const searchIcon = new URL("@itwin/kiwi-icons/search.svg", import.meta.url)
	.href;
const panelLeftIcon = new URL(
	"@itwin/kiwi-icons/panel-left.svg",
	import.meta.url,
).href;
const filterIcon = new URL("@itwin/kiwi-icons/filter.svg", import.meta.url)
	.href;
const dismissIcon = new URL("@itwin/kiwi-icons/dismiss.svg", import.meta.url)
	.href;

const leftPanelLabelId = "left-panel";

export default function Page() {
	const { splitterProps, panelProps, panelMinSize, panelMaxSize } = useSplitter<
		HTMLDivElement,
		HTMLDivElement
	>({
		minSize: { px: 256, pct: 20 },
		maxSize: { pct: 30 },
		labelledby: leftPanelLabelId,
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
					<Tree />
					<Divider
						className={styles.splitter}
						render={<Ariakit.Focusable />}
						{...splitterProps}
					/>
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
	labelledby?: string;
}

// https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
function useSplitter<TSplitter extends HTMLElement, TPanel extends Element>(
	args?: UseSplitterArgs,
) {
	const { minSize, maxSize, labelledby, onCollapse } = args ?? {};
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

	const [preferredSize, setPreferredSize] = React.useState<number | undefined>(
		undefined,
	);

	const minSizePx = React.useMemo(() => {
		if (!minSize) return undefined;
		if (!containerSize) return undefined;
		return Math.min(minSize.px, (minSize.pct / 100) * containerSize);
	}, [minSize, containerSize]);
	const minValue = React.useMemo(() => {
		if (minSizePx === undefined) return undefined;
		if (!containerSize) return undefined;
		return clamp((minSizePx / containerSize) * 100, 0, 100);
	}, [minSizePx, containerSize]);
	const maxValue = React.useMemo(() => {
		if (!maxSize) return undefined;
		if (!containerSize) return undefined;
		return clamp(maxSize.pct, 0, 100);
	}, [maxSize, containerSize]);
	const value = React.useMemo(() => {
		if (mode === "smallest") return minValue ?? 0;
		if (mode === "largest") return maxValue ?? 0;
		if (!panelSize) return undefined;
		if (!containerSize) return undefined;
		return clamp(
			(panelSize / containerSize) * 100,
			minValue ?? 0,
			maxValue ?? 0,
		);
	}, [panelSize, containerSize, minValue, maxValue, mode]);

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
	}, []);
	const onKeyMove = React.useCallback(
		(direction: 1 | -1) => {
			const panel = panelRef.current;
			if (!panel) return;
			const container = panel.parentElement;
			if (!container) return;

			const containerRect = container.getBoundingClientRect();
			const moveBy = direction * (containerRect.width * 0.005);
			onMove(moveBy);
		},
		[onMove],
	);
	const onMoveEnd = React.useCallback(() => {
		const panel = panelRef.current;
		if (!panel) return;

		setPreferredSize(undefined);
	}, []);
	const { moveableProps } = useMoveable<TSplitter>({
		onMove,
		onMoveEnd,
		onKeyMove,
	});
	const splitterProps = React.useMemo<
		Partial<React.HTMLAttributes<TSplitter>>
	>(() => {
		return {
			...moveableProps,
			onKeyDown: (e) => {
				moveableProps.onKeyDown?.(e);
				switch (e.key) {
					case "Enter":
						onCollapse?.();
						break;
					case "Home":
						setMode("smallest");
						break;
					case "End":
						setMode("largest");
						break;
					// case "F6": // TODO: cycle through window panes
				}
			},
			"aria-orientation": "vertical",
			"aria-valuenow": value,
			"aria-valuemin": minValue,
			"aria-valuemax": maxValue,
			"aria-controls": id,
			"aria-labelledby": labelledby,
			"aria-label": labelledby === undefined ? "Resize panel" : undefined,
			"data-resizing": preferredSize === undefined ? undefined : "true",
		};
	}, [
		moveableProps,
		value,
		minValue,
		maxValue,
		id,
		labelledby,
		onCollapse,
		preferredSize,
	]);
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

	const panelMinSize = minSize === undefined ? undefined : `${minSizePx}px`;
	const panelMaxSize = React.useMemo(() => {
		if (preferredSize !== undefined && maxSize !== undefined) {
			return `min(${preferredSize}px, ${maxSize.pct}%)`;
		}

		return value === undefined ? undefined : `${value}%`;
	}, [maxSize, preferredSize, value]);

	return { splitterProps, panelProps, panelMinSize, panelMaxSize };
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

				el.setPointerCapture(e.pointerId);
			},
			onPointerMove: (e) => {
				const relativePosition = relativePositionRef.current;
				if (relativePosition === undefined) return;
				const el = ref.current;
				if (!el) return;

				const rect = el.getBoundingClientRect();
				const moveBy = e.clientX - relativePosition - rect.left;
				onMove?.(moveBy);
			},
			onPointerUp: handleMoveEnd,
			onPointerCancel: handleMoveEnd,
			onKeyDown: (e) => {
				switch (e.key) {
					case "ArrowLeft":
						onKeyMove?.(-1);
						break;
					case "ArrowRight":
						onKeyMove?.(1);
						break;
				}
			},
			onKeyUp: (e) => {
				switch (e.key) {
					case "ArrowLeft":
					case "ArrowRight":
						onMoveEnd?.();
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
	}, [onKeyMove, onMoveEnd, onMove, handleMoveEnd]);
	return { moveableProps };
}

function Tree() {
	return (
		// biome-ignore lint/a11y/useSemanticElements: `div` is used as underlying element for `ListItem`
		<div role="list" className={styles.tree}>
			<TreeRow level={0}>Guides</TreeRow>
			<TreeRow level={1}>Tree</TreeRow>
			<TreeRow level={2}>Guide 4</TreeRow>
			<TreeRow level={2}>Guide 3</TreeRow>
			<TreeRow level={2}>Guide 2</TreeRow>
			<TreeRow level={2}>Guide 1</TreeRow>
			<TreeRow level={0}>Other</TreeRow>
			<TreeRow level={1}>Object 2</TreeRow>
			<TreeRow level={2}>Path 3</TreeRow>
			<TreeRow level={1}>Object 1</TreeRow>
			<TreeRow level={0}>Road</TreeRow>
			<TreeRow level={1}>Parking lot access</TreeRow>
			<TreeRow level={1}>Site access</TreeRow>
			<TreeRow level={0}>Parking lot</TreeRow>
			<TreeRow level={1}>Parking area</TreeRow>
			<TreeRow level={2}>Bay point 2</TreeRow>
			<TreeRow level={2}>Bay point 1</TreeRow>
			<TreeRow level={2}>Space point 1</TreeRow>
			<TreeRow level={2}>Path 6</TreeRow>
			<TreeRow level={0}>Building</TreeRow>
			<TreeRow level={1}>Building area</TreeRow>
			<TreeRow level={2}>Path 5</TreeRow>
			<TreeRow level={0}>Sewer</TreeRow>
			<TreeRow level={1}>Run off pipe</TreeRow>
			<TreeRow level={2}>Path 4</TreeRow>
			<TreeRow level={0}>Project boundary</TreeRow>
			<TreeRow level={1}>Property area</TreeRow>
			<TreeRow level={2}>Path 1</TreeRow>
			<TreeRow level={0}>Map</TreeRow>
			<TreeRow level={1}>Location</TreeRow>
			<TreeRow level={2}>Terrain</TreeRow>
		</div>
	);
}

type TreeRowProps = React.PropsWithChildren<{
	level: number;
}>;

function TreeRow({ level = 0, children }: TreeRowProps) {
	return (
		<ListItem.Root
			style={{ ...(level > 0 ? { paddingLeft: level * 20 } : {}) }}
		>
			<Icon href={placeholderIcon} style={{ display: "inline" }} />
			<ListItem.Content>{children}</ListItem.Content>
		</ListItem.Root>
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
				id={leftPanelLabelId}
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
