/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { KbdKeys as IuiKbdKeys } from "@itwin/itwinui-react";
import { Kbd as SkKbd } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

export const Kbd = React.forwardRef((props, forwardedRef) => {
	const { ...rest } = useCompatProps(props);
	return <SkKbd {...rest} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"a">;
DEV: Kbd.displayName = "Kbd";

export { IuiKbdKeys as KbdKeys };
