/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Divider, IconButton } from "@stratakit/bricks";
import {
	DropdownMenu,
	unstable_Toolbar as Toolbar,
} from "@stratakit/structures";
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
							active={active === "1"}
							onClick={() => setActive("1")}
						/>
					}
				/>
				<Toolbar.Item
					render={(itemProps) => (
						<DropdownMenu.Provider>
							<DropdownMenu.Button
								render={
									<IconButton
										icon={`${placeholderIcon}#icon-large`}
										label="Click me"
										variant="ghost"
										{...itemProps}
									/>
								}
							/>
							<DropdownMenu.Content>
								<DropdownMenu.Item label="Action 1" />
								<DropdownMenu.Item label="Action 2" />
								<DropdownMenu.Item label="Action 3" />
							</DropdownMenu.Content>
						</DropdownMenu.Provider>
					)}
				/>
				<Toolbar.Item
					render={
						<IconButton
							icon={`${placeholderIcon}#icon-large`}
							label="Click me"
							variant="ghost"
							active={active === "3"}
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
	hasPopup?: boolean;
}

function TestToolbar({ orientation, hasPopup }: TestToolbarProps) {
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
						active
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						icon={`${placeholderIcon}#icon-large`}
						label="Click me"
						variant="ghost"
						aria-haspopup={hasPopup ? "true" : undefined} // Just for visual test. Do not do this in real code.
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
			<TestToolbar orientation="horizontal" hasPopup />
			<TestToolbar orientation="vertical" />
		</div>
	);
}
