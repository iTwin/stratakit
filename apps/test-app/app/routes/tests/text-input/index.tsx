/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { TextInput, Label } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import { useId } from "react";

export const handle = { title: "TextInput" };

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;

function TextAffix({ children }: React.PropsWithChildren) {
	return (
		<TextInput.Text
			style={{ color: "var(--kiwi-color-text-neutral-tertiary)" }}
		>
			{children}
		</TextInput.Text>
	);
}

function useInputParams() {
	const [searchParams] = useSearchParams();
	const disabled = searchParams.has("disabled");
	const defaultValue = searchParams.get("defaultValue") ?? undefined;
	return { disabled, defaultValue };
}

export default function Page() {
	const [searchParams] = useSearchParams();
	const visual = searchParams.has("visual");
	const composition = searchParams.has("composition");
	const id = useId();
	const inputParams = useInputParams();

	if (visual) {
		return <VisualTest />;
	}

	if (composition) {
		return <CompositionTest />;
	}

	return (
		<>
			<Label htmlFor={id}>Fruit</Label>
			<TextInput.Input id={id} {...inputParams} />
		</>
	);
}

function CompositionTest() {
	const inputParams = useInputParams();
	const id = useId();

	return (
		<div style={{ display: "flex", gap: 4, alignItems: "center" }}>
			<Label htmlFor={id}>Fruit</Label>
			<TextInput.Root>
				<TextInput.Input id={id} {...inputParams} />
				<TextInput.Icon href={placeholderIcon} />
			</TextInput.Root>
		</div>
	);
}

function VisualTest() {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<TextInput.Input defaultValue="Value" />
			<TextInput.Root>
				<TextInput.Input defaultValue="Value" />
			</TextInput.Root>
			<TextInput.Root>
				<TextInput.Icon href={placeholderIcon} />
				<TextInput.Input defaultValue="Value" />
			</TextInput.Root>
			<TextInput.Root>
				<TextInput.Input defaultValue="Value" />
				<TextInput.Icon href={placeholderIcon} />
			</TextInput.Root>
			<TextInput.Root>
				<TextInput.Icon href={placeholderIcon} />
				<TextInput.Input defaultValue="Value" />
				<TextInput.Icon href={placeholderIcon} />
			</TextInput.Root>
			<TextInput.Root>
				<TextInput.Icon href={placeholderIcon} />
				<TextAffix>%</TextAffix>
				<TextInput.Input defaultValue="Value" />
				<TextAffix>%</TextAffix>
				<TextInput.Icon href={placeholderIcon} />
			</TextInput.Root>
		</div>
	);
}
