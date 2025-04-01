/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Button, Icon } from "@itwin/itwinui-react/bricks";
import placeholderIconHref from "@itwin/itwinui-icons/placeholder.svg";

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
	{ visual: VisualTest, anchor: AnchorTest },
);

const permutations = [
	["solid", "neutral"],
	["solid", "accent"],
	["outline"],
	["ghost"],
] as const;

function VisualTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			{permutations.map(([variant, tone]) => {
				const props = { variant, tone } as React.ComponentProps<typeof Button>;

				return (
					<div key={variant} style={{ display: "flex", gap: 4 }}>
						<Button {...props}>Click me</Button>

						<Button {...props}>
							<Icon href={placeholderIconHref} />
							Click me
						</Button>

						<Button {...props}>
							Click me
							<Icon href={placeholderIconHref} />
						</Button>

						<Button {...props}>
							<Icon href={placeholderIconHref} />
							Click me
							<Icon href={placeholderIconHref} />
						</Button>

						<Button {...props} disabled>
							<Icon href={placeholderIconHref} />
							Click me
							<Icon href={placeholderIconHref} />
						</Button>
					</div>
				);
			})}
		</div>
	);
}

function AnchorTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			{permutations.map(([variant, tone]) => {
				const props = { variant, tone } as React.ComponentProps<typeof Button>;

				return (
					<div key={variant} style={{ display: "flex", gap: 4 }}>
						<Button {...props} render={<a href="#" />}>
							Click me
						</Button>

						<Button {...props} render={<a href="#" />}>
							<Icon href={placeholderIconHref} />
							Click me
						</Button>

						<Button {...props} render={<a href="#" />}>
							Click me
							<Icon href={placeholderIconHref} />
						</Button>

						<Button {...props} render={<a href="#" />}>
							<Icon href={placeholderIconHref} />
							Click me
							<Icon href={placeholderIconHref} />
						</Button>

						<Button {...props} render={<a href="#" />} disabled>
							<Icon href={placeholderIconHref} />
							Click me
							<Icon href={placeholderIconHref} />
						</Button>
					</div>
				);
			})}
		</div>
	);
}
