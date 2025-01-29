/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Chip } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Chip" };

export default definePage(
	function Page({ orientation, presentational }) {
		return (
			<>
				<Chip>Value</Chip>
			</>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	const permutations = [["solid"], ["outline"]] as const;

	const states = ["default", "hover", "focus", "disabled"] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{permutations.map(([variant]) => {
				return (
					<div key={variant} style={{ display: "flex", gap: 4 }}>
						{states.map((state) => {
							const props = {
								variant,
								disabled: state === "disabled",
							} as React.ComponentProps<typeof Chip>;

							return (
								<Chip key={`${variant}-${state}`} {...props}>
									{variant} - {state}
								</Chip>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
