/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
	Disclosure,
	DisclosureContent,
	DisclosureProvider,
} from "@ariakit/react/disclosure";
import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { IconButtonPresentation } from "./IconButton.internal.js";
import { Text } from "./Text.js";
import { GhostAligner } from "./~utils.GhostAligner.js";
import { ChevronDown } from "./~utils.icons.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

interface AccordionItemProps extends BaseProps {
	/**
	 * The accordion item’s initial open state.
	 *
	 * @default false
	 */
	defaultOpen?: boolean;

	/**
	 * The accordion item’s controlled open state.
	 *
	 * @default false
	 */
	open?: boolean;

	/**
	 * Callback fired when the accordion item is opened.
	 *
	 * Should be used with the `open` prop.
	 */
	onOpenChange?: (open: boolean) => void;
}

/**
 * An item within an accordion.
 *
 * Bare minimum example:
 * ```tsx
 * <AccordionItem.Root>
 * 	 <AccordionItem.Trigger>
 *     <AccordionItem.Label>Label</AccordionItem.Label>
 *     <AccordionItem.Marker />
 *   </AccordionItem.Trigger>
 *   <AccordionItem.Content>Body</AccordionItem.Content>
 * </AccordionItem.Root>
 * ```
 *
 * Example with a description:
 * ```tsx
 * <AccordionItem.Root>
 * 	 <AccordionItem.Trigger>
 *     <AccordionItem.Label>Label</AccordionItem.Label>
 *     <AccordionItem.Marker />
 *   </AccordionItem.Trigger>
 *   <AccordionItem.Content>Body</AccordionItem.Content>
 * </AccordionItem.Root>
 * ```
 *
 * Example with a decoration:
 * ```tsx
 * <AccordionItem.Root>
 * 	 <AccordionItem.Trigger>
 *     <AccordionItem.Decoration render={<Icon href={placeholder} />} />
 *     <AccordionItem.Label>Label</AccordionItem.Label>
 *     <AccordionItem.Marker />
 *   </AccordionItem.Trigger>
 *   <AccordionItem.Content>Body</AccordionItem.Content>
 * </AccordionItem.Root>
 * ```
 */
const AccordionItemRoot = forwardRef<"div", AccordionItemProps>(
	(props, forwardedRef) => {
		const { defaultOpen, open, onOpenChange, ...rest } = props;

		return (
			<DisclosureProvider
				defaultOpen={defaultOpen}
				open={open}
				setOpen={onOpenChange}
			>
				<Role
					{...rest}
					className={cx("🥝-accordion-item", props.className)}
					ref={forwardedRef}
				/>
			</DisclosureProvider>
		);
	},
);
DEV: AccordionItemRoot.displayName = "AccordionItem.Root";

/**
 * The trigger for collapsing and expanding an accordion item’s content.
 *
 * Must include an `AccordionItem.Label` as a direct descendant.
 *
 * Example:
 * ```tsx
 * <AccordionItem.Root>
 * 	 <AccordionItem.Trigger>
 *     <AccordionItem.Label>Label</AccordionItem.Label>
 *     <AccordionItem.Marker />
 *   </AccordionItem.Trigger>
 *   <AccordionItem.Content>Body</AccordionItem.Content>
 * </AccordionItem.Root>
 * ```
 */
const AccordionItemTrigger = forwardRef<"button", BaseProps<"button">>(
	(props, forwardedRef) => (
		<GhostAligner align="block">
			<Disclosure
				{...props}
				className={cx("🥝-accordion-item-trigger", props.className)}
				ref={forwardedRef}
			/>
		</GhostAligner>
	),
);
DEV: AccordionItemTrigger.displayName = "AccordionItem.Trigger";

/**
 * The always-visible label of an accordion item’s trigger.
 *
 * Use as a direct descendant of `AccordionItem.Trigger`.
 *
 * Example:
 * ```tsx
 * <AccordionItem.Trigger>
 *   <AccordionItem.Label>Label</AccordionItem.Label>
 *   <AccordionItem.Marker />
 * </AccordionItem.Trigger>
 * ```
 */
const AccordionItemLabel = forwardRef<"div", BaseProps>(
	(props, forwardedRef) => (
		<Text
			{...props}
			variant="body-sm"
			className={cx("🥝-accordion-item-label", props.className)}
			ref={forwardedRef}
		/>
	),
);
DEV: AccordionItemLabel.displayName = "AccordionItem.Label";

/**
 * The always-visible, optional decoration of an accordion item’s trigger.
 *
 * Use as a direct descendant of `AccordionItem.Trigger`. This will be visually
 * presented before the trigger’s label.
 *
 * Example:
 * ```tsx
 * <AccordionItem.Trigger>
 *   <AccordionItem.Decoration render={<Icon href={placeholder} />} />
 *   <AccordionItem.Label>Label</AccordionItem.Label>
 *   <AccordionItem.Marker />
 * </AccordionItem.Trigger>
 * ```
 */
const AccordionItemDecoration = forwardRef<"div", BaseProps>(
	(props, forwardedRef) => (
		<Role
			{...props}
			className={cx("🥝-accordion-item-decoration", props.className)}
			ref={forwardedRef}
		/>
	),
);
DEV: AccordionItemDecoration.displayName = "AccordionItem.Decoration";

/**
 * The visual marker of an accordion item’s trigger.
 *
 * Example:
 * ```tsx
 * <AccordionItem.Trigger>
 *   <AccordionItem.Label>Label</AccordionItem.Label>
 *   <AccordionItem.Marker />
 * </AccordionItem.Trigger>
 * ```
 */
const AccordionItemMarker = forwardRef<"div", BaseProps>(
	(props, forwardedRef) => (
		<IconButtonPresentation
			{...props}
			variant="ghost"
			className={cx("🥝-accordion-item-marker", props.className)}
			ref={forwardedRef}
		>
			<ChevronDown aria-hidden="true" />
		</IconButtonPresentation>
	),
);
DEV: AccordionItemMarker.displayName = "AccordionItem.Marker";

/**
 * The disclosed content of the accordion item.
 *
 * Example:
 * ```tsx
 * <AccordionItem.Root>
 * 	 <AccordionItem.Trigger>
 *     <AccordionItem.Label>Label</AccordionItem.Label>
 *     <AccordionItem.Marker />
 *   </AccordionItem.Trigger>
 *   <AccordionItem.Content>Body</AccordionItem.Content>
 * </AccordionItem.Root>
 * ```
 */
const AccordionItemContent = forwardRef<"div", BaseProps>(
	(props, forwardedRef) => (
		<DisclosureContent
			{...props}
			className={cx("🥝-accordion-item-content", props.className)}
			ref={forwardedRef}
		/>
	),
);
DEV: AccordionItemContent.displayName = "AccordionItem.Content";

export {
	AccordionItemRoot as Root,
	AccordionItemContent as Content,
	AccordionItemTrigger as Trigger,
	AccordionItemLabel as Label,
	AccordionItemDecoration as Decoration,
	AccordionItemMarker as Marker,
};
