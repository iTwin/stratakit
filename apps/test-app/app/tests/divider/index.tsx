/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Divider } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Divider" };

export default definePage(
	function Page({ orientation, presentational }) {
		return (
			<>
				<Divider
					orientation={orientation as "horizontal" | "vertical" | undefined}
					presentational={presentational ? true : undefined}
					data-testid="divider"
				/>
			</>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	return (
		<>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(2, 50%)",
					gap: "1rem",
					blockSize: "10rem",
				}}
			>
				<Divider orientation="horizontal" />
				<Divider orientation="vertical" />
			</div>
		</>
	);
}
