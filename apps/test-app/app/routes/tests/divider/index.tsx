/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Divider } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export default function Page() {
	const orientation = useSearchParams()[0].get("orientation") || "horizontal";

	return (
		<>
			<h1>Divider</h1>

			<Divider orientation={orientation as "horizontal" | "vertical"} />
		</>
	);
}
