/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as AkPopover from "@ariakit/react/popover";
import { PortalContext } from "@ariakit/react/portal";
import { useStoreState } from "@ariakit/react/store";
import {
	forwardRef,
	usePopoverApi,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

interface PopoverProps
	extends Omit<BaseProps, "content">,
		Pick<AkPopover.PopoverProviderProps, "open" | "setOpen"> {
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
	const { children, content, open: openProp, setOpen, ...rest } = props;

	const store = AkPopover.usePopoverStore();
	const open = useStoreState(store, "open");
	const popoverElement = useStoreState(store, "popoverElement");
	const contentElement = useStoreState(store, "contentElement");
	const popoverProps = usePopoverApi({
		element: popoverElement,
		open,
	});
	return (
		<AkPopover.PopoverProvider
			placement="bottom-start"
			open={openProp}
			setOpen={setOpen}
			store={store}
		>
			<AkPopover.PopoverDisclosure render={children} />
			<AkPopover.Popover
				portal
				{...rest}
				gutter={7}
				style={{ ...popoverProps.style, ...props.style }}
				wrapperProps={{ popover: popoverProps.popover }}
				className={cx("🥝Popover", props.className)}
				ref={forwardedRef}
			>
				<PortalContext.Provider value={contentElement}>
					{content}
				</PortalContext.Provider>
			</AkPopover.Popover>
		</AkPopover.PopoverProvider>
	);
});
DEV: Popover.displayName = "Popover";

// ----------------------------------------------------------------------------

export default Popover;
