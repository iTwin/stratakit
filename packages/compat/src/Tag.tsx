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
	> {}

/** @see https://itwinui.bentley.com/docs/tag */
export const Tag = React.forwardRef((props, forwardedRef) => {
	const {
		render: renderProp,
		onClick,
		children,
		onRemove,
		removeButtonProps,
		variant,
		labelProps,
		...rest
	} = useCompatProps(props);

	const labelButton = !!onClick && !!onRemove;
	const tagButton = !labelButton && !!onClick;
	const render = renderProp ?? (tagButton ? <button /> : <span />);
	return (
		<Chip.Root
			{...rest}
			onClick={tagButton ? onClick : undefined}
			variant={variant === "basic" ? "outline" : undefined}
			render={render}
			ref={forwardedRef}
		>
			<Chip.Label
				onClick={labelButton ? onClick : undefined}
				{...labelProps}
				render={labelButton ? <button /> : undefined}
			>
				{children}
			</Chip.Label>
			{onRemove && (
				<Chip.DismissButton onClick={onRemove} {...removeButtonProps} />
			)}
		</Chip.Root>
	);
}) as PolymorphicForwardRefComponent<"span", TagProps>;
DEV: Tag.displayName = "Tag";
