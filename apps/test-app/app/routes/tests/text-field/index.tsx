/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Icon, Input, TextField } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

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
	const visual = useSearchParams()[0].get("visual") === "true";

	if (visual) {
		return <VisualTest />;
	}

	return (
		<TextField>
			<Input />
		</TextField>
	);
}

function VisualTest() {
	return (
		<div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
			<TextField>
				<Input value="Value" />
			</TextField>
			<TextField>
				<Icon href={placeholderIcon} />
				<Input value="Value" />
			</TextField>
			<TextField>
				<Input value="Value" />
				<Icon href={placeholderIcon} />
			</TextField>
			<TextField>
				<Icon href={placeholderIcon} />
				<Input value="Value" />
				<Icon href={placeholderIcon} />
			</TextField>
			<TextField>
				<Icon href={placeholderIcon} />
				<TextAffix>%</TextAffix>
				<Input value="Value" />
				<TextAffix>%</TextAffix>
				<Icon href={placeholderIcon} />
			</TextField>
		</div>
	);
}
