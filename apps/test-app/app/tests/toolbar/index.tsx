/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import {
	IconButton,
	unstable_Toolbar as Toolbar,
} from "@itwin/itwinui-react/bricks";
import { definePage } from "~/~utils.tsx";

export default definePage(
	function Page() {
		return (
			<Toolbar.Group variant="solid">
				<Toolbar.Item
					render={
						<IconButton
							icon={placeholderIcon}
							label="Click me"
							variant="ghost"
						/>
					}
				/>
				<Toolbar.Item
					render={
						<IconButton
							icon={placeholderIcon}
							label="Click me"
							variant="ghost"
						/>
					}
				/>
				<Toolbar.Item
					render={
						<IconButton
							icon={placeholderIcon}
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
					<IconButton icon={placeholderIcon} label="Click me" variant="ghost" />
				}
			/>
			<Toolbar.Item
				render={
					<IconButton icon={placeholderIcon} label="Click me" variant="ghost" />
				}
			/>
			<Toolbar.Item
				render={
					<IconButton icon={placeholderIcon} label="Click me" variant="ghost" />
				}
			/>
		</Toolbar.Group>
	);
}
