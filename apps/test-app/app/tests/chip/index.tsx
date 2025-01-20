/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Chip } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Chip" };

export default definePage(
	function Page() {
		return (
			<>
				<Chip>Value</Chip>
			</>
		);
	},
	{ visual: VisualTest, dismiss: DismissTest },
);

function VisualTest() {
	// Permutations for visual testing without dismiss functionality
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

function DismissTest() {
	// Permutations for visual testing with dismiss functionality
	const permutations = [["solid"], ["outline"]] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{permutations.map(([variant]) => {
				const props = { variant, dismiss: true } as React.ComponentProps<
					typeof Chip
				>;

				return (
					<div key={variant} style={{ display: "flex", gap: 4 }}>
						<Chip {...props}>{`${variant} (dismiss)`}</Chip>
					</div>
				);
			})}
		</div>
	);
}
