/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Code } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Code" };

export default definePage(
	function Page() {
		return <Code>&lt;Code&gt;</Code>;
	},
	{ visual: VisualTest },
);

function VisualTest() {
	const variants = ["solid", "outline", "ghost"] as const;

	return (
		<div style={{ display: "grid", gap: 4, justifyContent: "start" }}>
			{variants.map((variant) => (
				<Code key={variant} variant={variant}>
					&lt;Code&gt;
				</Code>
			))}
		</div>
	);
}
