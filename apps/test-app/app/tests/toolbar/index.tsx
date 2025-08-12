/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Divider, IconButton } from "@stratakit/bricks";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export default definePage(
	function Page() {
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
			<Divider orientation="vertical" />
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
