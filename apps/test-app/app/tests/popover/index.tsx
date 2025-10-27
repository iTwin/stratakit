/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button, Divider, Popover, TextBox } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { definePage } from "~/~utils.tsx";

import addIconHref from "@stratakit/icons/add.svg";
import searchIconHref from "@stratakit/icons/search.svg";

export const handle = { title: "Popover" };

export default definePage(function Page() {
	return (
		<Popover
			content={
				<>
					<TextBox.Root>
						<TextBox.Icon href={searchIconHref} />
						<TextBox.Input placeholder="Search" />
					</TextBox.Root>
					<ul
						style={{
							listStyleType: "none",
							display: "flex",
							flexDirection: "column",
							gap: 8,
						}}
					>
						<li>Scene 1</li>
						<li>Scene 2</li>
						<li>Scene 3</li>
						<li>Scene 4</li>
						<li>Scene 5</li>
					</ul>
					<Divider />
					<Button>
						<Icon href={addIconHref} />
						Add scene
					</Button>
				</>
			}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 8,
			}}
		>
			<Button>Manage scenes</Button>
		</Popover>
	);
});
