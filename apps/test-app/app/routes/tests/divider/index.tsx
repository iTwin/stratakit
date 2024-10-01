/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Divider } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export const handle = { title: "Divider" };

export default function Page() {
	const visual = useSearchParams()[0].get("visual") === "true";
	const orientation = useSearchParams()[0].get("orientation") as
		| "horizontal"
		| "vertical"
		| undefined;

	if (visual) {
		return <VisualTest />;
	}

	return (
		<>
			<Divider orientation={orientation} />
		</>
	);
}

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
