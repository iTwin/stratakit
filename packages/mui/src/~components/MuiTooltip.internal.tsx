/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";

import type Tooltip from "@mui/material/Tooltip";

// ----------------------------------------------------------------------------

type TooltipProps = React.ComponentProps<typeof Tooltip>;

export const TooltipContext = React.createContext<{
	placement: TooltipProps["placement"] | undefined;
}>({ placement: undefined });
