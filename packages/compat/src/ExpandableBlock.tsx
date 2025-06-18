/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Icon } from "@stratakit/foundations";
import { unstable_AccordionItem as SkAccordionItem } from "@stratakit/structures";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { ExpandableBlock as IuiExpandableBlock } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

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
				<SkAccordionItem.Button>
					<SkAccordionItem.Label>{title}</SkAccordionItem.Label>
				</SkAccordionItem.Button>
				<SkAccordionItem.Marker>
					{endIcon ? <Icon render={endIcon as React.JSX.Element} /> : null}
				</SkAccordionItem.Marker>
			</SkAccordionItem.Header>
			<SkAccordionItem.Content>{children}</SkAccordionItem.Content>
		</SkAccordionItem.Root>
	);
}) as PolymorphicForwardRefComponent<"div", AccordionProps>;
DEV: ExpandableBlock.displayName = "ExpandableBlock";
