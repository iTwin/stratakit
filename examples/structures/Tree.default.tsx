/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Tree } from "@stratakit/structures";

import styles from "./Tree.default.module.css";

export default () => {
	const [expandedItems, setExpandedItems] = React.useState<
		Record<string, boolean>
	>({
		item1: false,
		item2: false,
		item3: false,
	});

	const toggleExpanded = (itemKey: string) => {
		setExpandedItems((prev) => ({
			...prev,
			[itemKey]: !prev[itemKey],
		}));
	};

	return (
		<Tree.Root className={styles.tree} aria-label="Engineering Departments">
			<Tree.Item
				label="Software Engineering"
				aria-level={1}
				aria-posinset={1}
				aria-setsize={3}
				expanded={expandedItems.item1}
				onExpandedChange={() => toggleExpanded("item1")}
			/>
			{expandedItems.item1 && (
				<>
					<Tree.Item
						label="Frontend"
						aria-level={2}
						aria-posinset={1}
						aria-setsize={2}
					/>
					<Tree.Item
						label="Backend"
						aria-level={2}
						aria-posinset={2}
						aria-setsize={2}
					/>
				</>
			)}
			<Tree.Item
				label="Mechanical Engineering"
				aria-level={1}
				aria-posinset={2}
				aria-setsize={3}
				expanded={expandedItems.item2}
				onExpandedChange={() => toggleExpanded("item2")}
			/>
			{expandedItems.item2 && (
				<>
					<Tree.Item
						label="Design"
						aria-level={2}
						aria-posinset={1}
						aria-setsize={2}
					/>
					<Tree.Item
						label="Manufacturing"
						aria-level={2}
						aria-posinset={2}
						aria-setsize={2}
					/>
				</>
			)}
			<Tree.Item
				label="Civil Engineering"
				aria-level={1}
				aria-posinset={3}
				aria-setsize={3}
				expanded={expandedItems.item3}
				onExpandedChange={() => toggleExpanded("item3")}
			/>
			{expandedItems.item3 && (
				<>
					<Tree.Item
						label="Structural"
						aria-level={2}
						aria-posinset={1}
						aria-setsize={2}
					/>
					<Tree.Item
						label="Transportation"
						aria-level={2}
						aria-posinset={2}
						aria-setsize={2}
					/>
				</>
			)}
		</Tree.Root>
	);
};
