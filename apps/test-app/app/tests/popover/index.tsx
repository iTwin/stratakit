/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Popover } from "@stratakit/bricks";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Popover" };

export default definePage(function Page() {
	return <Popover />;
});
