/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button } from "@stratakit/bricks";
import { VisuallyHidden } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "VisuallyHidden" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			{/* No props */}
			<div>
				<span aria-hidden="true">★★★☆☆</span>
				<VisuallyHidden>3 stars out of 5</VisuallyHidden>
			</div>

			{/* Not implemented props */}
			<div
				style={{ display: "flex", gap: 8, alignItems: "center", minHeight: 30 }}
			>
				<span>Focus to unhide!</span>
				<VisuallyHidden>
					<Button>Unhidden</Button>
				</VisuallyHidden>
			</div>

			<div
				style={{ display: "flex", gap: 8, alignItems: "center", minHeight: 30 }}
			>
				<span>Focus to remain hidden!</span>
				<VisuallyHidden unhideOnFocus={false}>
					<Button>Hidden</Button>
				</VisuallyHidden>
			</div>
		</div>
	);
});
