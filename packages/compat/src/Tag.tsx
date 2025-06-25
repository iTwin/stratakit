/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useEventHandlers } from "@stratakit/foundations/secret-internals";
import * as Chip from "@stratakit/structures/Chip";
import { useCompatProps } from "./~utils.js";

import type { Tag as IuiTag } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

type IuiTagProps = React.ComponentProps<typeof IuiTag>;

interface TagProps
	extends Pick<
		IuiTagProps,
		| "children"
		| "onClick"
		| "onRemove"
		| "removeButtonProps"
		| "variant"
		| "labelProps"
	> {
	/** NOT IMPLEMENTED. */
	variant?: IuiTagProps["variant"];
}

/** @see https://itwinui.bentley.com/docs/tag */
export const Tag = React.forwardRef((props, forwardedRef) => {
	const {
		onClick,
		children,
		onRemove,
		removeButtonProps,
		// biome-ignore lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		variant,
		labelProps,
		...rest
	} = useCompatProps(props);

	const onDismissClick = useEventHandlers(removeButtonProps?.onClick, onRemove);
	const onLabelClick = useEventHandlers(labelProps?.onClick, onClick);

	if (onRemove) {
		return (
			<Chip.Root render={<span />} {...rest} ref={forwardedRef}>
				<Chip.Label
					render={onClick ? <button /> : undefined}
					{...labelProps}
					onClick={onLabelClick}
				>
					{children}
				</Chip.Label>
				<Chip.DismissButton {...removeButtonProps} onClick={onDismissClick} />
			</Chip.Root>
		);
	}

	return (
		<Chip.Root
			render={onClick ? <button /> : <span />}
			{...rest}
			onClick={onClick}
			ref={forwardedRef}
		>
			<Chip.Label {...labelProps}>{children}</Chip.Label>
		</Chip.Root>
	);
}) as PolymorphicForwardRefComponent<"span", TagProps>;
DEV: Tag.displayName = "Tag";
