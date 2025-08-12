/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { IconButton } from "@stratakit/bricks";
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
	{ visual: VisualTest },
);

function VisualTest() {
	return (
		<Toolbar.Group variant="solid">
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
