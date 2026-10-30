/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Link from "@mui/material/Link";
import {
	unstable_ErrorRegion as ErrorRegion,
	Tree,
} from "@stratakit/structures";

import svgRetry from "@stratakit/icons/retry.svg";
import styles from "./ErrorRegion.tree.module.css";

export default () => {
	const [errors, setErrors] = React.useState<TreeError[]>([]);
	return (
		<>
			<ErrorRegion.Root
				aria-label="Repository issues"
				label={`${errors.length} issues found`}
				items={errors.map((error) => (
					<ErrorRegion.Item
						key={error.itemId}
						// Link to the `error` prop of the `Tree.Item`.
						messageId={`${error.itemId}-message`}
						message={
							<>
								<span>Failed to load </span>
								{/* Anchor via the `id` prop of the `Tree.Item`. */}
								<Link href={`#${error.itemId}`}>{error.itemLabel}</Link>
							</>
						}
						actions={
							<Link
								render={<button />}
								onClick={() => {
									setErrors((prevErrors) =>
										prevErrors.filter((e) => e.itemId !== error.itemId),
									);
								}}
							>
								Retry
							</Link>
						}
					/>
				))}
			/>
			<RepositoryTree
				errors={errors}
				onError={(error) => {
					setErrors((prevErrors) => [...prevErrors, error]);
				}}
				onRetry={(itemId) => {
					setErrors((prevErrors) =>
						prevErrors.filter((e) => e.itemId !== itemId),
					);
				}}
			/>
		</>
	);
};

interface TreeError {
	itemId: string;
	itemLabel: string;
}

interface RepositoryTreeProps {
	errors: TreeError[];
	onError: (error: TreeError) => void;
	onRetry: (itemId: string) => void;
}

function RepositoryTree(props: RepositoryTreeProps) {
	const { errors, onError, onRetry } = props;
	const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
	return (
		<Tree.Root className={styles.tree}>
			{flatRepositoryData.map((item) => {
				const ancestorCollapsed = item.parentIds.some(
					(parentId) => !expandedItems.includes(parentId),
				);
				if (ancestorCollapsed) return null;

				const error = errors.find((e) => e.itemId === item.id);
				return (
					<Tree.Item
						key={item.id}
						// Ids should be unique across the entire page.
						id={item.id}
						label={item.label}
						aria-level={item.level}
						aria-posinset={item.posInset}
						aria-setsize={item.setSize}
						// Expanded defaults to false to simulate a deeper hierarchy
						expanded={item.children ? expandedItems.includes(item.id) : !!error}
						onExpandedChange={(expanded) => {
							if (error) return;

							// Simulate an error
							if (!item.children) {
								onError({ itemId: item.id, itemLabel: item.label });
								return;
							}

							setExpandedItems((prev) => {
								if (expanded) {
									return [...prev, item.id];
								} else {
									return prev.filter((id) => id !== item.id);
								}
							});
						}}
						// Link to the `messageId` prop of the `ErrorRegion.Item`.
						error={error ? `${error.itemId}-message` : undefined}
						inlineActions={
							error
								? [
										<Tree.ItemAction
											key="retry"
											icon={svgRetry}
											label="Retry"
											onClick={() => {
												onRetry(item.id);
											}}
										/>,
									]
								: undefined
						}
					/>
				);
			})}
		</Tree.Root>
	);
}

const repositoryData = [
	{
		id: "imodels",
		label: "iModels",
		children: [
			{
				id: "airport",
				label: "Airport",
			},
			{
				id: "bridge",
				label: "Bridge",
			},
			{
				id: "building",
				label: "Building",
			},
			{
				id: "harbor",
				label: "Harbor",
			},

			{
				id: "railway",
				label: "Railway",
			},
			{
				id: "road",
				label: "Road",
			},
			{
				id: "solar-farm",
				label: "Solar farm",
			},
			{
				id: "tunnel",
				label: "Tunnel",
			},
			{
				id: "water-treatment",
				label: "Water treatment",
			},
		],
	},
	{
		id: "reality-data",
		label: "Reality data",
	},
	{
		id: "features",
		label: "Features",
		children: [
			{
				id: "point-clouds",
				label: "Point clouds",
			},
			{
				id: "terrain",
				label: "Terrain",
			},
			{
				id: "water",
				label: "Water",
			},
			{
				id: "points-of-interest",
				label: "Points of interest",
			},
			{
				id: "road-signs",
				label: "Road signs",
			},
			{
				id: "traffic-lights",
				label: "Traffic lights",
			},
		],
	},
] as const satisfies TreeItem[];

const flatRepositoryData = flattenTree(repositoryData);

interface TreeItem {
	id: string;
	label: string;
	expanded?: boolean;
	children?: TreeItem[];
}

interface FlatTreeItem extends TreeItem {
	level: number;
	posInset: number;
	setSize: number;
	parentIds: string[];
}

function flattenTree(
	items: TreeItem[],
	level = 1,
	parentIds: string[] = [],
): FlatTreeItem[] {
	return items.flatMap<FlatTreeItem>((item, index) => {
		const children = "children" in item ? (item.children ?? []) : [];
		return [
			{
				...item,
				level,
				posInset: index + 1,
				setSize: items.length,
				parentIds,
			},
			...flattenTree(children, level + 1, [...parentIds, item.id]),
		];
	});
}
