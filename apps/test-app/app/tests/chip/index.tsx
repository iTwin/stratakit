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

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{permutations.map(([variant]) => {
				const props = { variant } as React.ComponentProps<typeof Chip>;

				return (
					<div key={variant} style={{ display: "flex", gap: 4 }}>
						<Chip {...props}>{variant}</Chip>
					</div>
				);
			})}
		</div>
	);
}
