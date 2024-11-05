/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { TextBox, Label, Icon } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import { useId } from "react";

export const handle = { title: "TextBox" };

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

function useInputParams() {
	const [searchParams] = useSearchParams();
	const disabled = searchParams.has("disabled");
	return { disabled };
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
			<TextBox.Input id={id} {...inputParams} />
		</>
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
				<Icon href={placeholderIcon} />
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
				<Icon href={placeholderIcon} />
				<TextBox.Input defaultValue="Value" />
			</TextBox.Root>
			<TextBox.Root>
				<TextBox.Input defaultValue="Value" />
				<Icon href={placeholderIcon} />
			</TextBox.Root>
			<TextBox.Root>
				<Icon href={placeholderIcon} />
				<TextBox.Input defaultValue="Value" />
				<Icon href={placeholderIcon} />
			</TextBox.Root>
			<TextBox.Root>
				<Icon href={placeholderIcon} />
				<TextAffix>%</TextAffix>
				<TextBox.Input defaultValue="Value" />
				<TextAffix>%</TextAffix>
				<Icon href={placeholderIcon} />
			</TextBox.Root>
		</div>
	);
}
