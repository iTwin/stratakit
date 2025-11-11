/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as AkPopover from "@ariakit/react/popover";
import { PortalContext } from "@ariakit/react/portal";
import { useStoreState } from "@ariakit/react/store";
import { Button } from "@stratakit/bricks";
import {
	forwardRef,
	usePopoverApi,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";

import type {
	BaseProps,
	FocusableProps,
} from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface PopoverProviderProps
	extends Pick<
		AkPopover.PopoverProviderProps,
		"children" | "open" | "setOpen" | "placement"
	> {}

function PopoverProvider(props: PopoverProviderProps) {
	const { children, open, setOpen, placement = "bottom-start" } = props;

	return (
		<AkPopover.PopoverProvider
			open={open}
			setOpen={setOpen}
			placement={placement}
		>
			{children}
		</AkPopover.PopoverProvider>
	);
}
DEV: PopoverProvider.displayName = "Popover.Provider";

// ----------------------------------------------------------------------------

interface PopoverDisclosureProps extends FocusableProps<"button"> {}

const PopoverDisclosure = forwardRef<"button", PopoverDisclosureProps>(
	(props, forwardedRef) => {
		const store = AkPopover.usePopoverContext();
		const open = useStoreState(store, "open");
		const defaultId = React.useId(); // Used to label the popover.
		return (
			<AkPopover.PopoverDisclosure
				id={defaultId}
				render={<Button />}
				{...props}
				data-has-popover-open={open || undefined}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: PopoverDisclosure.displayName = "Popover.Disclosure";

// ----------------------------------------------------------------------------

interface PopoverRootProps
	extends BaseProps,
		Pick<AkPopover.PopoverProps, "unmountOnHide"> {}

const PopoverRoot = forwardRef<"div", PopoverRootProps>(
	(props, forwardedRef) => {
		const { children, unmountOnHide, ...rest } = props;
		const store = AkPopover.usePopoverContext();
		const popoverElement = useStoreState(store, "popoverElement");
		const open = useStoreState(store, "open");
		const popoverProps = usePopoverApi({
			element: popoverElement,
			open,
		});

		const contentElement = useStoreState(store, "contentElement");
		const triggerId = useStoreState(
			store,
			(state) => state?.disclosureElement?.id,
		);
		const labelledBy = props["aria-label"] ? undefined : triggerId;
		return (
			<AkPopover.Popover
				aria-labelledby={labelledBy}
				portal
				unmountOnHide={unmountOnHide}
				{...rest}
				gutter={8}
				style={{ ...popoverProps.style, ...props.style }}
				wrapperProps={{ popover: popoverProps.popover }}
				className={cx("🥝Popover", props.className)}
				ref={forwardedRef}
			>
				<PortalContext.Provider value={contentElement ?? null}>
					{children}
				</PortalContext.Provider>
			</AkPopover.Popover>
		);
	},
);
DEV: PopoverRoot.displayName = "Popover.Root";

// ----------------------------------------------------------------------------

interface PopoverProps
	extends Omit<BaseProps, "content">,
		Pick<PopoverProviderProps, "open" | "setOpen" | "placement">,
		Pick<PopoverRootProps, "unmountOnHide"> {
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
	 * The content to be displayed inside the popover when the trigger element is hovered or focused.
	 */
	content: React.ReactNode;
}

/**
 * A component used to display content in a non-modal window overlay that is placed relative to a trigger element.
 *
 * Example:
 * ```tsx
 * <Popover
 *   content={<>Content</>}
 * >
 *   <Button>Open</Button>
 * </Popover>
 * ```
 */
const Popover = forwardRef<"div", PopoverProps>((props, forwardedRef) => {
	const { children, content, open, setOpen, placement, ...rest } = props;

	return (
		<PopoverProvider open={open} setOpen={setOpen} placement={placement}>
			<PopoverDisclosure render={children} />
			<PopoverRoot {...rest} ref={forwardedRef}>
				{content}
			</PopoverRoot>
		</PopoverProvider>
	);
});
DEV: Popover.displayName = "Popover";

// ----------------------------------------------------------------------------

export default Popover;
