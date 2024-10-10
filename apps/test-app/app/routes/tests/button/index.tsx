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
	const variants = ["solid", "ghost"] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{variants.map((variant) => (
				<div key={variant} style={{ display: "flex", gap: 4 }}>
					<Button variant={variant}>Click me</Button>

					<Button variant={variant}>
						<Icon href={placeholderIconHref} />
						Click me
					</Button>

					<Button variant={variant}>
						Click me
						<Icon href={placeholderIconHref} />
					</Button>

					<Button variant={variant}>
						<Icon href={placeholderIconHref} />
						Click me
						<Icon href={placeholderIconHref} />
					</Button>

					<Button variant={variant} disabled>
						<Icon href={placeholderIconHref} />
						Click me
						<Icon href={placeholderIconHref} />
					</Button>
				</div>
			))}
		</div>
	);
}
