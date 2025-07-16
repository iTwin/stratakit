/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon } from "@stratakit/foundations";
import { unstable_AccordionItem as SkAccordionItem } from "@stratakit/structures";
import { useCompatProps } from "./~utils.js";

import type { ExpandableBlock as IuiExpandableBlock } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

type IuiExpandableBlockProps = React.ComponentProps<typeof IuiExpandableBlock>;

interface AccordionProps
	extends Pick<
		IuiExpandableBlockProps,
		// ExpandableBlockOwnProps
		| "status"
		| "isExpanded"
		| "onToggle"
		| "children"
		| "size"
		| "styleType"
		| "disabled"

		// ExpandableBlockLegacyProps
		| "title"
		| "caption"
		| "endIcon"
	> {
	/** NOT IMPLEMENTED. */
	status?: IuiExpandableBlockProps["status"];
	/** NOT IMPLEMENTED. */
	size?: IuiExpandableBlockProps["size"];
	/** NOT IMPLEMENTED. */
	styleType?: IuiExpandableBlockProps["styleType"];
	/** NOT IMPLEMENTED. */
	disabled?: IuiExpandableBlockProps["disabled"];
	/** NOT IMPLEMENTED. */
	caption?: IuiExpandableBlockProps["caption"];
	/** PARTIALLY IMPLEMENTED: Now accepts `React.JSX.Element` instead of `React.ReactNode` */
	endIcon?: React.JSX.Element;
}

/** @see https://itwinui.bentley.com/docs/expandableblock */
export const ExpandableBlock = React.forwardRef((props, forwardedRef) => {
	const {
		isExpanded,
		onToggle,
		children,
		title,
		endIcon,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		status,
		size,
		styleType,
		disabled,
		caption,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);

	return (
		<SkAccordionItem.Root
			{...rest}
			ref={forwardedRef}
			open={isExpanded}
			setOpen={onToggle}
		>
			<SkAccordionItem.Header>
				<SkAccordionItem.Marker>
					{endIcon ? <Icon render={endIcon} /> : null}
				</SkAccordionItem.Marker>
				<SkAccordionItem.Button>
					<SkAccordionItem.Label>{title}</SkAccordionItem.Label>
				</SkAccordionItem.Button>
			</SkAccordionItem.Header>
			<SkAccordionItem.Content>{children}</SkAccordionItem.Content>
		</SkAccordionItem.Root>
	);
}) as PolymorphicForwardRefComponent<"div", AccordionProps>;
DEV: ExpandableBlock.displayName = "ExpandableBlock";
