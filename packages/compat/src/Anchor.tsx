/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { Anchor as IuiAnchor } from "@itwin/itwinui-react";
import { Anchor as SkAnchor } from "@stratakit/bricks";
import * as React from "react";
import {
	type PolymorphicForwardRefComponent,
	useCompatProps,
} from "./~utils.tsx";

type IuiAnchorProps = React.ComponentProps<typeof IuiAnchor>;

interface AnchorProps {
	/**
	 * This prop is ignored.
	 *
	 * Whether the anchor links to an external site.
	 *
	 * When true, there will be an icon added at the end of the anchor text. This is useful
	 * to indicate that the link will open in a new tab.
	 *
	 * Not all external links should open in a new tab, so this prop should be used with caution.
	 */
	isExternal?: IuiAnchorProps["isExternal"];
	/**
	 * This prop is ignored.
	 *
	 * Whether the anchor should be underlined in its idle state.
	 *
	 * By default, the anchor is underlined only on hover, or when using a high-contrast theme.
	 */
	underline?: IuiAnchorProps["underline"];
}

export const Anchor = React.forwardRef((props, forwardedRef) => {
	const { underline, isExternal, ...rest } = useCompatProps(props);
	return <SkAnchor {...rest} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"a", AnchorProps>;
DEV: Anchor.displayName = "Anchor";
