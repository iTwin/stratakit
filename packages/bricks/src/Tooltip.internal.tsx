/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";

import type * as AkTooltip from "@ariakit/react/tooltip";

// ----------------------------------------------------------------------------

export const TooltipContext = React.createContext<{
	placement: AkTooltip.TooltipProviderProps["placement"] | undefined;
}>({ placement: undefined });
