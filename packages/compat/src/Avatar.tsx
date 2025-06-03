/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Avatar as SkAvatar } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Avatar as IuiAvatar } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiAvatarProps = React.ComponentProps<typeof IuiAvatar>;
type SkAvatarProps = React.ComponentProps<typeof SkAvatar>;

interface AvatarProps
	extends Pick<
		IuiAvatarProps,
		| "size"
		| "status"
		| "abbreviation"
		| "image"
		| "backgroundColor"
		| "translatedStatusTitles"
	> {
	/** NOT IMPLEMENTED. */
	status?: IuiAvatarProps["status"];
	/** NOT IMPLEMENTED. */
	backgroundColor?: IuiAvatarProps["backgroundColor"];
	/** NOT IMPLEMENTED. */
	translatedStatusTitles?: IuiAvatarProps["translatedStatusTitles"];
}

/** @see https://itwinui.bentley.com/docs/avatar */
export const Avatar = React.forwardRef((props, forwardedRef) => {
	const {
		size: sizeProp = "small",
		abbreviation,
		title,
		image,
		status, // NOT IMPLEMENTED
		backgroundColor, // NOT IMPLEMENTED
		translatedStatusTitles, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	const size = sizeProp === "x-large" ? "xlarge" : sizeProp;

	return (
		<SkAvatar
			{...rest}
			ref={forwardedRef}
			initials={abbreviation}
			alt={title}
			size={size}
			image={image}
		/>
	);
}) as PolymorphicForwardRefComponent<"span", AvatarProps>;
DEV: Avatar.displayName = "Avatar";
