/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { Anchor as IuiAnchor } from "@itwin/itwinui-react";
import { Anchor as SkAnchor } from "@stratakit/bricks";
import * as React from "react";

type IuiAnchorProps = React.ComponentProps<typeof IuiAnchor>;

interface AnchorProps extends Omit<IuiAnchorProps, "underline" | "isExternal"> {
	/** This prop is ignored. */
	underline?: IuiAnchorProps["underline"];
	/** This prop is ignored. */
	isExternal?: IuiAnchorProps["isExternal"];
}

export const Anchor = React.forwardRef<"a", AnchorProps>(
	(props, forwardedRef) => {
		const { underline, isExternal, as, ...rest } = props;
		const render = as ? React.createElement(as) : undefined;

		return (
			<SkAnchor
				{...rest}
				render={render}
				ref={forwardedRef as IuiAnchorProps["ref"]}
			/>
		);
	},
) as typeof IuiAnchor;
DEV: Anchor.displayName = "CompatAnchor";
