/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Divider as SkDivider } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Divider as IuiDivider } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiDividerProps = React.ComponentProps<typeof IuiDivider>;

interface DividerProps extends IuiDividerProps {}

export const Divider = React.forwardRef((props, forwardedRef) => {
	const { ...rest } = useCompatProps(props);
	return <SkDivider {...rest} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"hr", DividerProps>;
DEV: Divider.displayName = "Divider";
