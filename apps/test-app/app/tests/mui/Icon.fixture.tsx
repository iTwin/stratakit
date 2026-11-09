/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { CheckmarkIcon } from "../../../../../packages/mui/src/Icon.tsx";

import type React from "react";

export default function Icon(
	props: React.ComponentProps<typeof CheckmarkIcon>,
) {
	return <CheckmarkIcon {...props} />;
}
