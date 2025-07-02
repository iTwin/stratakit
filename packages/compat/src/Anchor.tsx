/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as SkAnchor from "@stratakit/bricks/Anchor";
import { useCompatProps } from "./~utils.js";

import type { Anchor as IuiAnchor } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

type IuiAnchorProps = React.ComponentProps<typeof IuiAnchor>;

interface AnchorProps extends Pick<IuiAnchorProps, "isExternal" | "underline"> {
	isExternal?: IuiAnchorProps["isExternal"];
	/** NOT IMPLEMENTED. */
	underline?: IuiAnchorProps["underline"];
}

/** @see https://itwinui.bentley.com/docs/anchor */
export const Anchor = React.forwardRef((props, forwardedRef) => {
	const {
		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		underline,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		children,
		isExternal,

		...rest
	} = useCompatProps(props);
	return (
		<SkAnchor.Root {...rest} ref={forwardedRef}>
			<SkAnchor.Text>{children}</SkAnchor.Text>
			{isExternal && <SkAnchor.ExternalMarker />}
		</SkAnchor.Root>
	);
}) as PolymorphicForwardRefComponent<"a", AnchorProps>;
DEV: Anchor.displayName = "Anchor";
