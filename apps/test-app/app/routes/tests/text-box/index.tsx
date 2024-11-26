/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { TextBox, Label, Field } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "react-router";
import { useId } from "react";

export const handle = { title: "TextBox" };

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;

function TextAffix({ children }: React.PropsWithChildren) {
	return (
		<TextBox.Text style={{ color: "var(--kiwi-color-text-neutral-tertiary)" }}>
			{children}
		</TextBox.Text>
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
	const inputParams = useInputParams();

	if (visual) {
		return <VisualTest />;
	}

	if (composition) {
		return <CompositionTest />;
	}

	return (
		<Field>
			<Label>Fruit</Label>
			<TextBox.Input {...inputParams} />
		</Field>
	);
}

function CompositionTest() {
	const inputParams = useInputParams();
	const id = useId();

	return (
		<div style={{ display: "flex", gap: 4, alignItems: "center" }}>
			<Label htmlFor={id}>Fruit</Label>
			<TextBox.Root>
				<TextBox.Input id={id} {...inputParams} />
				<TextBox.Icon href={placeholderIcon} />
			</TextBox.Root>
		</div>
	);
}

function VisualTest() {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<TextBox.Input defaultValue="Value" />
			<TextBox.Root>
				<TextBox.Input defaultValue="Value" />
			</TextBox.Root>
			<TextBox.Root>
				<TextBox.Icon href={placeholderIcon} />
				<TextBox.Input defaultValue="Value" />
			</TextBox.Root>
			<TextBox.Root>
				<TextBox.Input defaultValue="Value" />
				<TextBox.Icon href={placeholderIcon} />
			</TextBox.Root>
			<TextBox.Root>
				<TextBox.Icon href={placeholderIcon} />
				<TextBox.Input defaultValue="Value" />
				<TextBox.Icon href={placeholderIcon} />
			</TextBox.Root>
			<TextBox.Root>
				<TextBox.Icon href={placeholderIcon} />
				<TextAffix>%</TextAffix>
				<TextBox.Input defaultValue="Value" />
				<TextAffix>%</TextAffix>
				<TextBox.Icon href={placeholderIcon} />
			</TextBox.Root>
		</div>
	);
}
