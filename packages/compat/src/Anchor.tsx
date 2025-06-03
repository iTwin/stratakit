/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Anchor as SkAnchor } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Anchor as IuiAnchor } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiAnchorProps = React.ComponentProps<typeof IuiAnchor>;

interface AnchorProps extends Pick<IuiAnchorProps, "isExternal" | "underline"> {
	isExternal?: IuiAnchorProps["isExternal"];
	/** NOT IMPLEMENTED. */
	underline?: IuiAnchorProps["underline"];
}

/** @see https://itwinui.bentley.com/docs/anchor */
export const Anchor = React.forwardRef((props, forwardedRef) => {
	const {
		underline, // NOT IMPLEMENTED
		isExternal,
		...rest
	} = useCompatProps(props);
	return <SkAnchor {...rest} isExternal={isExternal} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"a", AnchorProps>;
DEV: Anchor.displayName = "Anchor";
