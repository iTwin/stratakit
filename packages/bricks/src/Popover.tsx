/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as AkPopover from "@ariakit/react/popover";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

interface PopoverProps extends Omit<BaseProps, "content"> {
	/**
	 * The element that will trigger the popover when clicked.
	 * Common examples include buttons, links, or form controls.
	 *
	 * **Note**: The trigger must be a single interactive element. Do not add a
	 * popover to a non-interactive static element (such as a `<div>` or `<svg>`). Also,
	 * the trigger element must forward its ref and spread its props.
	 */
	children: React.ReactElement;
	/**
	 * The content to be displayed inside the tooltip when the trigger element is hovered or focused.
	 */
	content: React.ReactNode;
}

/**
 * A component used to display content in a non-modal window overlay that is placed relative to a trigger element.
 */
const Popover = forwardRef<"div", PopoverProps>((props, forwardedRef) => {
	const { children, content, ...rest } = props;
	return (
		<AkPopover.PopoverProvider placement="bottom-start">
			<AkPopover.PopoverDisclosure render={children} />
			<AkPopover.Popover
				gutter={7}
				{...rest}
				className={cx("🥝Popover", props.className)}
				ref={forwardedRef}
			>
				{content}
			</AkPopover.Popover>
		</AkPopover.PopoverProvider>
	);
});
DEV: Popover.displayName = "Popover";

// ----------------------------------------------------------------------------

export default Popover;
