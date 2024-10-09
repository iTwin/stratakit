/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button, Icon } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

const placeholderIconHref = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;

export const handle = { title: "Button" };

export default function Page() {
	const visual = useSearchParams()[0].get("visual") === "true";
	const disabled = useSearchParams()[0].get("disabled") === "true";

	if (visual) {
		return <VisualTest />;
	}

	return (
		<>
			<Button
				disabled={disabled}
				onClick={(e) => {
					e.currentTarget.textContent = "Clicked";
				}}
			>
				Hello
			</Button>
		</>
	);
}

function VisualTest() {
	return (
		<div style={{ display: "flex", gap: 4 }}>
			<Button>
				<Icon href={placeholderIconHref} />
				Solid
				<Icon href={placeholderIconHref} />
			</Button>
			<Button variant="ghost">
				<Icon href={placeholderIconHref} />
				Ghost
				<Icon href={placeholderIconHref} />
			</Button>
		</div>
	);
}
