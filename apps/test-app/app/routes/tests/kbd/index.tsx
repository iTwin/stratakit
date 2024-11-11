/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Kbd } from "@itwin/kiwi-react/bricks";

export const handle = { title: "Kbd" };

export default function Page() {
	return (
		<>
			<Kbd data-testid="kbd">Ctrl</Kbd>
		</>
	);
}
