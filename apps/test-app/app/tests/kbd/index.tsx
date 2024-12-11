/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Kbd } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Kbd" };

export default definePage(
	function Page() {
		return <Kbd variant={"muted"}>Ctrl</Kbd>;
	},
	{ visual: VisualTest },
);

function VisualTest() {
	const variants = ["solid", "muted", "ghost"] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{variants.map((variant) => (
				<div key={variant} style={{ display: "flex", gap: 4 }}>
					<Kbd variant={variant}>Ctrl</Kbd>
				</div>
			))}
		</div>
	);
}
