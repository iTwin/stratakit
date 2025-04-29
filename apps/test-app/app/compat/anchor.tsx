/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Anchor } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Anchor" };

export default definePage(function Page() {
	return (
		<>
			<Anchor href="#main">Hello</Anchor>
		</>
	);
});
