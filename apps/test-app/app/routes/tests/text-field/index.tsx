/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button, Icon, Input, TextField } from "@itwin/kiwi-react/bricks";

export const handle = { title: "DropdownMenu" };

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;

export default function Page() {
	return (
		<div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
			<TextField>
				<Icon href={placeholderIcon} />
				<Input />
			</TextField>
			<TextField>
				<Input />
				<Icon href={placeholderIcon} />
			</TextField>
			<TextField>
				<Icon href={placeholderIcon} />
				<Input />
				<Icon href={placeholderIcon} />
			</TextField>
		</div>
	);
}
