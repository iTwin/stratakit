/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import styles from "./sandbox.module.css";
import {
	Divider,
	DropdownMenu,
	Icon,
	Input,
	VisuallyHidden,
} from "@itwin/kiwi-react/bricks";
import { ListItem } from "@itwin/kiwi-react-internal/src/bricks/ListItem.js";
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

export default function Page() {
	const { splitterProps, panelProps, panelSize } = useSplitter<
		HTMLDivElement,
		HTMLDivElement
	>();
	const maxSize =
		panelSize === undefined ? undefined : `min(${panelSize}px, 30%)`;
	return (
		<>
			<VisuallyHidden render={(props) => <h1 {...props} />}>
				{title}
			</VisuallyHidden>
			<div
				className={styles.appLayout}
				style={
					{
						"--_left-panel-max-size": maxSize,
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
					style={{ position: "relative" }}
				>
					<div className={styles.header}>
						<h2>Layers</h2>
						<div className={styles.actions}>
							<Icon
								style={{ color: "var(--kiwi-color-text-accent-strong)" }}
								href={searchIcon}
							/>
							<Icon href={panelLeftIcon} />
						</div>
					</div>
					<div className={styles.searchWrapper}>
						<Input placeholder="Search" />
						<div className={styles.actions}>
							<Icon href={placeholderIcon} />
							<SortingModes />
						</div>
					</div>
					<Tree />
					<Divider className={styles.splitter} {...splitterProps} />
				</div>
				<div className={styles.canvasWrapper}>
					<div className={styles.canvas} />
				</div>
			</div>
		</>
	);
}

function useSplitter<TSplitter extends Element, TPanel extends Element>() {
	const panelRef = React.useRef<TPanel>(null);
	const [value, setValue] = React.useState<number | undefined>(undefined);
	const [panelSize, setPanelSize] = React.useState<number | undefined>(
		undefined,
	);
	React.useEffect(() => {
		const panel = panelRef.current;
		if (!panel) return;
		const parent = panel.parentElement;
		if (!parent) return;

		const parentSize = parent.getBoundingClientRect().width;
		const size = panel.getBoundingClientRect().width;
		setValue((size / parentSize) * 100);
	}, []);
	const onMove = React.useCallback((moveBy: number) => {
		const panel = panelRef.current;
		if (!panel) return;

		const panelRect = panel.getBoundingClientRect();
		const newPanelSize = panelRect.width + moveBy;
		setPanelSize(newPanelSize);
	}, []);
	const { moveableProps } = useMoveable<TSplitter>({ onMove });
	const splitterProps = React.useMemo<
		Partial<React.HTMLAttributes<TSplitter>>
	>(() => {
		return {
			...moveableProps,
			"aria-orientation": "vertical",
			"aria-valuenow": value,
		};
	}, [moveableProps, value]);
	const panelProps = React.useMemo<
		Partial<React.HTMLAttributes<TPanel>>
	>(() => {
		return {
			style: undefined,
			ref: panelRef,
		};
	}, []);
	return { splitterProps, panelProps, panelSize };
}

interface UseMoveableArgs {
	onMove?: (moveBy: number) => void;
}

function useMoveable<T extends Element>({ onMove }: UseMoveableArgs) {
	const ref = React.useRef<T>(null);
	const relativePosition = React.useRef<number | undefined>(undefined);
	React.useEffect(() => {
		const onPointerUp = () => {
			if (!relativePosition.current) return;
			relativePosition.current = undefined;
		};
		document.addEventListener("pointerup", onPointerUp);
		return () => {
			document.removeEventListener("pointerup", onPointerUp);
		};
	}, []);
	React.useEffect(() => {
		const onPointerMove = (e: PointerEvent) => {
			if (!relativePosition.current) return;
			const el = ref.current;
			if (!el) return;

			const rect = el.getBoundingClientRect();
			const moveBy = e.clientX - rect.left;
			onMove?.(moveBy);
		};
		document.addEventListener("pointermove", onPointerMove);
		return () => {
			document.removeEventListener("pointermove", onPointerMove);
		};
	}, [onMove]);
	const moveableProps = React.useMemo<Partial<React.HTMLAttributes<T>>>(() => {
		return {
			onPointerDown: (e) => {
				const el = ref.current;
				if (!el) return;

				const rect = el.getBoundingClientRect();
				const relativeX = e.clientX - rect.left;
				relativePosition.current = relativeX;
			},
			ref,
		};
	}, []);
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
		<ListItem style={{ ...(level > 0 ? { paddingLeft: level * 20 } : {}) }}>
			<Icon href={placeholderIcon} style={{ display: "inline" }} />
			{children}
		</ListItem>
	);
}

function SortingModes() {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Button render={<Icon href={filterIcon} />} />
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
