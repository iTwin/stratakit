/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button } from "@stratakit/bricks";
import { Tooltip } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Tooltip" };
// changed file test
export default definePage(function Page() {
	return (
		<Tooltip content="Here's your tooltip. Was it worth it?">
			<Button>Please, hover/focus me!</Button>
		</Tooltip>
	);
});
