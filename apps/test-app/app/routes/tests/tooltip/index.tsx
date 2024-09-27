/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Tooltip, Button } from "@itwin/kiwi-react/bricks";
import { useId } from "react";

export const handle = { title: "Tooltip" };

export default function Page() {
	return (
		<>
			<Tooltip content="This is the tooltip">
				<Button>Hover focus me</Button>
			</Tooltip>
		</>
	);
}
