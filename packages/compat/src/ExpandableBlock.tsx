/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { unstable_AccordionItem as SkAccordionItem } from "@stratakit/structures";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { ExpandableBlock as IuiAccordion } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiAccordionProps = React.ComponentProps<typeof IuiAccordion>;

interface AccordionProps
	extends Pick<
		IuiAccordionProps,
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
	status?: IuiAccordionProps["status"];
	/** NOT IMPLEMENTED. */
	size?: IuiAccordionProps["size"];
	/** NOT IMPLEMENTED. */
	styleType?: IuiAccordionProps["styleType"];
	/** NOT IMPLEMENTED. */
	disabled?: IuiAccordionProps["disabled"];
	/** NOT IMPLEMENTED. */
	caption?: IuiAccordionProps["caption"];
}

/** @see https://itwinui.bentley.com/docs/expandableblock */
export const ExpandableBlock = React.forwardRef((props, forwardedRef) => {
	const {
		isExpanded,
		onToggle,
		children,
		title,
		endIcon,
		status, // NOT IMPLEMENTED
		size, // NOT IMPLEMENTED
		styleType, // NOT IMPLEMENTED
		disabled, // NOT IMPLEMENTED
		caption, // NOT IMPLEMENTED
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
				<SkAccordionItem.Marker>{endIcon}</SkAccordionItem.Marker>
			</SkAccordionItem.Header>
			<SkAccordionItem.Content>{children}</SkAccordionItem.Content>
		</SkAccordionItem.Root>
	);
}) as PolymorphicForwardRefComponent<"div", AccordionProps>;
DEV: ExpandableBlock.displayName = "ExpandableBlock";
