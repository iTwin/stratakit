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

function TextAffix({ children }: React.PropsWithChildren) {
	return (
		<span style={{ color: "var(--kiwi-color-text-neutral-tertiary)" }}>
			{children}
		</span>
	);
}

export default function Page() {
	return (
		<div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
			<TextField>
				<Input />
			</TextField>
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
			<TextField>
				<Icon href={placeholderIcon} />
				<TextAffix>%</TextAffix>
				<Input />
				<TextAffix>%</TextAffix>
				<Icon href={placeholderIcon} />
			</TextField>
		</div>
	);
}
