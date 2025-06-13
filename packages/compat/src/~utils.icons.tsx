/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { createIconFromPath } from "@stratakit/foundations/secret-internals";

export const WindowPopout = createIconFromPath(
	"M2.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V8h1v5.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-11A1.5 1.5 0 0 1 2.5 1H8v1H2.5Zm11.5.707-6.029 6.03a.5.5 0 1 1-.707-.708L13.294 2H10.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V2.707Z",
);
DEV: WindowPopout.displayName = "WindowPopout";
