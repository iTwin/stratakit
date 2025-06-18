/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Chip } from "@stratakit/structures";
import {
	DismissButton as ChipDismiss,
	Label as ChipLabel,
	Root as ChipRoot,
} from "@stratakit/structures/Chip";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Chip" };

export default definePage(
	function Page() {
		return (
			<>
				<Chip label="Value" />
			</>
		);
	},
	{ visual: VisualTest, dismiss: DismissTest, composition: CompositionTest },
);

function VisualTest() {
	// Permutations for visual testing without dismiss functionality
	const permutations = ["solid", "outline"] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{permutations.map((variant) => {
				return (
					<div key={variant}>
						<Chip variant={variant} label={variant} />
					</div>
				);
			})}
		</div>
	);
}

function DismissTest() {
	// Permutations for visual testing with dismiss functionality
	const permutations = ["solid", "outline"] as const;

	const [isDismissed, setIsDismissed] = React.useState(false);

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{permutations.map((variant) => {
				return (
					<div key={variant}>
						<Chip
							key={variant}
							variant={variant}
							label={variant}
							onDismiss={() => {
								setIsDismissed(true);
							}}
							data-dismissed={isDismissed}
						/>
					</div>
				);
			})}
		</div>
	);
}

function CompositionTest() {
	return (
		<ChipRoot>
			<ChipLabel id="my-label">Label</ChipLabel>
			<ChipDismiss />
		</ChipRoot>
	);
}
