/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Divider, IconButton } from "@stratakit/bricks";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export default definePage(
	function Page() {
		const [active, setActive_] = React.useState("");
		const setActive = (id: string) => {
			setActive_((prev) => (prev === id ? "" : id));
		};
		return (
			<Toolbar.Group variant="solid">
				<Toolbar.Item
					render={
						<IconButton
							icon={`${placeholderIcon}#icon-large`}
							label="Click me"
							variant="ghost"
							isActive={active === "1"}
							onClick={() => setActive("1")}
						/>
					}
				/>
				<Toolbar.Item
					render={
						<IconButton
							icon={`${placeholderIcon}#icon-large`}
							label="Click me"
							variant="ghost"
							isActive={active === "2"}
							onClick={() => setActive("2")}
						/>
					}
				/>
				<Toolbar.Item
					render={
						<IconButton
							icon={`${placeholderIcon}#icon-large`}
							label="Click me"
							variant="ghost"
							isActive={active === "3"}
							onClick={() => setActive("3")}
						/>
					}
				/>
			</Toolbar.Group>
		);
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
			<Divider
				orientation={orientation === "horizontal" ? "vertical" : "horizontal"}
			/>
			<Toolbar.Item
				render={
					<IconButton
						icon={`${placeholderIcon}#icon-large`}
						label="Click me"
						variant="ghost"
						isActive
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
