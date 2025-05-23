/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Chip } from "@stratakit/structures";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Tag as IuiTag } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiTagProps = React.ComponentProps<typeof IuiTag>;
type IuiTagVariant<T extends IuiTagProps["variant"]> = T;

type TagProps = {
	/**
	 * PARTIALLY IMPLEMENTED.
	 *
	 * Only a string value will be rendered as a tag label.
	 */
	children: IuiTagProps["children"];
	/**
	 * PARTIALLY IMPLEMENTED.
	 *
	 * Tag is not rendered as a `button`, since it is not an interactive component.
	 */
	onClick?: IuiTagProps["onClick"];
	/**
	 * PARTIALLY IMPLEMENTED.
	 *
	 * Tag label is not rendered as a `button`.
	 */
	onRemove?: IuiTagProps["onRemove"];
	/** NOT IMPLEMENTED. */
	removeButtonProps?: IuiTagProps["removeButtonProps"];
} & (
	| {
			/** NOT IMPLEMENTED. */
			variant?: IuiTagVariant<"default">;
			/** NOT IMPLEMENTED. */
			labelProps?: IuiTagProps["labelProps"];
	  }
	| {
			/** NOT IMPLEMENTED. */
			variant?: IuiTagVariant<"basic">;
			/** NOT IMPLEMENTED. */
			labelProps?: never;
	  }
);

/** @see https://itwinui.bentley.com/docs/tag */
export const Tag = React.forwardRef((props, forwardedRef) => {
	const {
		render = <span />,
		children,
		onRemove,
		removeButtonProps, // NOT IMPLEMENTED
		variant, // NOT IMPLEMENTED
		labelProps, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	const label = React.useMemo(() => {
		if (typeof children === "string") {
			return children;
		}

		DEV: {
			console.warn("Expected a string in `children` prop of a `Tag` component");
		}
		return "";
	}, [children]);

	const onDismiss = React.useMemo(() => {
		if (!onRemove) return undefined;
		// Workaround that relies on the internal implementation of the `Chip` component, until composition API is implemented.
		return (event?: React.MouseEvent) => {
			if (!event) return;
			onRemove(event);
		};
	}, [onRemove]);
	return (
		<Chip
			{...rest}
			label={label}
			onDismiss={onDismiss}
			render={render}
			ref={forwardedRef}
		/>
	);
}) as PolymorphicForwardRefComponent<"span", TagProps>;
DEV: Tag.displayName = "Tag";
