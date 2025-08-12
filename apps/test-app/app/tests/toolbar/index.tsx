/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { IconButton } from "@stratakit/bricks";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export default definePage(
	function Page() {
		return <TestToolbar orientation="horizontal" />;
	},
	{
		visual: VisualTest,
		vertical: () => <TestToolbar orientation="vertical" />,
	},
);

interface TestToolbarProps {
	orientation: "horizontal" | "vertical";
}

function TestToolbar({ orientation }: TestToolbarProps) {
	return (
		<Toolbar.Group variant="solid" orientation={orientation}>
			<Toolbar.Item
				render={
					<IconButton
						icon={`${placeholderIcon}#icon-large`}
						label="Click me"
						variant="ghost"
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						icon={`${placeholderIcon}#icon-large`}
						label="Click me"
						variant="ghost"
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						icon={`${placeholderIcon}#icon-large`}
						label="Click me"
						variant="ghost"
					/>
				}
			/>
		</Toolbar.Group>
	);
}

function VisualTest() {
	return (
		<div
			style={{
				display: "flex",
				gap: "var(--stratakit-space-x2)",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<TestToolbar orientation="horizontal" />
			<TestToolbar orientation="vertical" />
		</div>
	);
}
