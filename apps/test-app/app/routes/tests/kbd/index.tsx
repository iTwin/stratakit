/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Kbd, KbdKeys } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export const handle = { title: "Kbd" };

export default function Page() {
	const visual = useSearchParams()[0].get("visual") === "true";

	if (visual) {
		return <VisualTest />;
	}

	return (
		<>
			<Kbd data-testid="kbd" variant={"muted"}>
				Ctrl
			</Kbd>
		</>
	);
}

function VisualTest() {
	const variants = ["solid", "muted", "ghost"] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{variants.map((variant) => (
				<div key={variant} style={{ display: "flex", gap: 4 }}>
					<Kbd variant={variant}>{`${KbdKeys.Command} - The Command Key`}</Kbd>
				</div>
			))}
		</div>
	);
}
