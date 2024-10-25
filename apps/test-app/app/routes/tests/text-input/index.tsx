/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { TextInput, Label, Icon } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import { useId } from "react";

export const handle = { title: "TextInput" };

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
	const disabled = useSearchParams()[0].get("disabled") === "true";
	const visual = useSearchParams()[0].get("visual") === "true";
	const id = useId();

	if (visual) {
		return <VisualTest />;
	}

	return (
		<>
			<Label htmlFor={id}>Fruit</Label>
			<TextInput id={id} disabled={disabled} />
		</>
	);
}

function VisualTest() {
	return (
		<div style={{ display: "grid", gap: 8 }}>
			<TextInput defaultValue="Value" />
			<TextInput.Root>
				<TextInput.Input defaultValue="Value" />
			</TextInput.Root>
			<TextInput.Root>
				<Icon href={placeholderIcon} />
				<TextInput.Input defaultValue="Value" />
			</TextInput.Root>
			<TextInput.Root>
				<TextInput.Input defaultValue="Value" />
				<Icon href={placeholderIcon} />
			</TextInput.Root>
			<TextInput.Root>
				<Icon href={placeholderIcon} />
				<TextInput.Input defaultValue="Value" />
				<Icon href={placeholderIcon} />
			</TextInput.Root>
			<TextInput.Root>
				<Icon href={placeholderIcon} />
				<TextAffix>%</TextAffix>
				<TextInput.Input defaultValue="Value" />
				<TextAffix>%</TextAffix>
				<Icon href={placeholderIcon} />
			</TextInput.Root>
		</div>
	);
}
