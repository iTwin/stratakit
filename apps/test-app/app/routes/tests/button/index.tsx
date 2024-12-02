/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Button, Icon } from "@itwin/kiwi-react/bricks";
import placeholderIconHref from "@itwin/kiwi-icons/placeholder.svg";

export const handle = { title: "Button" };

export default definePage(
	function Page({ disabled }) {
		return (
			<>
				<Button
					disabled={!!disabled}
					onClick={(e) => {
						e.currentTarget.textContent = "Clicked";
					}}
				>
					Hello
				</Button>
			</>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	const variants = ["solid", "outline", "ghost"] as const;

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
