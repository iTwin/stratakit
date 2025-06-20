/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as Chip from "@stratakit/structures/Chip";
import { useCompatProps } from "./~utils.tsx";

import type { Tag as IuiTag } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

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

	if (onRemove) {
		return (
			<Chip.Root render={<span />} {...rest} ref={forwardedRef}>
				<Chip.Label
					render={onClick ? <button /> : undefined}
					onClick={onClick}
					{...labelProps}
				>
					{children}
				</Chip.Label>
				<Chip.DismissButton onClick={onRemove} {...removeButtonProps} />
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
