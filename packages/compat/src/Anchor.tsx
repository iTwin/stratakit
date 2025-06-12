/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as SkAnchor from "@stratakit/bricks/Anchor";
import windowPopoutIcon from "@stratakit/icons/window-popout.svg";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Anchor as IuiAnchor } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiAnchorProps = React.ComponentProps<typeof IuiAnchor>;

interface AnchorProps extends Pick<IuiAnchorProps, "isExternal" | "underline"> {
	/** NOT IMPLEMENTED. */
	underline?: IuiAnchorProps["underline"];
}

/** @see https://itwinui.bentley.com/docs/anchor */
export const Anchor = React.forwardRef((props, forwardedRef) => {
	const {
		isExternal,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		underline,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);
	return (
		<SkAnchor.Root {...rest} ref={forwardedRef}>
			{props.children}
			{isExternal ? (
				<SkAnchor.Icon alt="External link" href={windowPopoutIcon} />
			) : null}
		</SkAnchor.Root>
	);
}) as PolymorphicForwardRefComponent<"a", AnchorProps>;
DEV: Anchor.displayName = "Anchor";
