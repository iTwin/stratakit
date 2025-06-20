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
import { Text } from "@stratakit/bricks";
import {
	GhostAligner,
	IconButtonPresentation,
} from "@stratakit/bricks/secret-internals";
import {
	forwardRef,
	useControlledState,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";

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
	setOpen?: (open: boolean) => void;
}

/**
 * An item within an accordion. Disclosed content with a label.
 *
 * Bare minimum example:
 * ```tsx
 * <AccordionItem.Root>
 *   <AccordionItem.Header>
 *     <AccordionItem.Button>
 *       <AccordionItem.Label>Label</AccordionItem.Label>
 *     </AccordionItem.Button>
 *     <AccordionItem.Marker />
 *   </AccordionItem.Header>
 *   <AccordionItem.Content>Body</AccordionItem.Content>
 * </AccordionItem.Root>
 * ```
 *
 * If the accordion item discloses a significant section of the page, it may be
 * desirable to markup its label as a heading for accessibility purposes (e.g.
 * screen reader users often navigate by heading). For those cases, you can wrap
 * the `AccordionItem.Button` component with an `AccordionItem.Heading`
 * component and use its `render` prop for rendering an HTML heading element.
 * ```tsx
 * <AccordionItem.Root>
 *   <AccordionItem.Header>
 *     <AccordionItem.Heading render={<h2 />}>
 *       <AccordionItem.Button>
 *         <AccordionItem.Label>Label</AccordionItem.Label>
 *       </AccordionItem.Button>
 *     </AccordionItem.Heading>
 *     <AccordionItem.Marker />
 *   </AccordionItem.Header>
 *   <AccordionItem.Content>Body</AccordionItem.Content>
 * </AccordionItem.Root>
 * ```
 *
 * Example with a decoration:
 * ```tsx
 * <AccordionItem.Root>
 *   <AccordionItem.Header>
 *     <AccordionItem.Decoration render={<Icon href={placeholder} />} />
 *     <AccordionItem.Button>
 *       <AccordionItem.Label>Label</AccordionItem.Label>
 *     </AccordionItem.Button>
 *     <AccordionItem.Marker />
 *   </AccordionItem.Header>
 *   <AccordionItem.Content>Body</AccordionItem.Content>
 * </AccordionItem.Root>
 * ```
 */
const AccordionItemRoot = forwardRef<"div", AccordionItemProps>(
	(props, forwardedRef) => {
		const {
			defaultOpen,
			open: openProp,
			setOpen: setOpenProp,
			...rest
		} = props;

		const [open, setOpen] = useControlledState(
			defaultOpen ?? false,
			openProp,
			setOpenProp as React.Dispatch<React.SetStateAction<boolean>>,
		);

		return (
			<DisclosureProvider
				defaultOpen={defaultOpen}
				open={open}
				setOpen={setOpen}
			>
				<Role
					{...rest}
					className={cx("🥝-accordion-item", props.className)}
					data-kiwi-open={open}
					ref={forwardedRef}
				/>
			</DisclosureProvider>
		);
	},
);
DEV: AccordionItemRoot.displayName = "AccordionItem.Root";

/**
 * The always visible header of an accordion item.
 *
 * Must include an `AccordionItem.Button` and `AccordionItem.Marker` as a direct
 * descendants.
 *
 * Example:
 * ```tsx
 * <AccordionItem.Root>
 * 	 <AccordionItem.Header>
 *     <AccordionItem.Button>
 *       <AccordionItem.Label>Label</AccordionItem.Label>
 *     </AccordionItem.Button>
 *     <AccordionItem.Marker />
 *   </AccordionItem.Header>
 *   <AccordionItem.Content>Body</AccordionItem.Content>
 * </AccordionItem.Root>
 * ```
 */
const AccordionItemHeader = forwardRef<"div", BaseProps>(
	(props, forwardedRef) => (
		<GhostAligner align="block">
			<Role
				{...props}
				className={cx("🥝-accordion-item-header", props.className)}
				ref={forwardedRef}
			/>
		</GhostAligner>
	),
);
DEV: AccordionItemHeader.displayName = "AccordionItem.Header";

/**
 * The accordion item button.
 *
 * Must be a direct descendant of `AccordionItem.Header`.
 *
 * Example:
 * ```tsx
 * <AccordionItem.Header>
 *   <AccordionItem.Button>
 *     <AccordionItem.Label>Label</AccordionItem.Label>
 *   </AccordionItem.Button>
 *   <AccordionItem.Marker />
 * </AccordionItem.Header>
 * ```
 */
const AccordionItemButton = forwardRef<"button", BaseProps<"button">>(
	(props, forwardedRef) => (
		<Disclosure
			{...props}
			className={cx("🥝-accordion-item-button", props.className)}
			ref={forwardedRef}
		/>
	),
);
DEV: AccordionItemButton.displayName = "AccordionItem.Button";

/**
 * An accordion item’s label.
 *
 * Must be a descendant of `AccordionItem.Button`.
 *
 * Example:
 * ```tsx
 * <AccordionItem.Button>
 *   <AccordionItem.Label>Label</AccordionItem.Label>
 * </AccordionItem.Button>
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
 * The always-visible, optional decoration of an accordion item’s button.
 *
 * Use as a direct descendant of `AccordionItem.Header`. This will be visually
 * presented before the button’s label.
 *
 * Example:
 * ```tsx
 * <AccordionItem.Header>
 *   <AccordionItem.Decoration render={<Icon href={placeholder} />} />
 *   <AccordionItem.Button>
 *     <AccordionItem.Label>Label</AccordionItem.Label>
 *   </AccordionItem.Button>
 *   <AccordionItem.Marker />
 * </AccordionItem.Header>
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
 * The visual marker of an accordion item’s button.
 *
 * Example:
 * ```tsx
 * <AccordionItem.Header>
 *   <AccordionItem.Button>
 *     <AccordionItem.Label>Label</AccordionItem.Label>
 *   </AccordionItem.Button>
 *   <AccordionItem.Marker />
 * </AccordionItem.Header>
 * ```
 *
 * Pass an icon as a child to override the default chevron icon:
 * ```tsx
 * <AccordionItem.Header>
 *   <AccordionItem.Button>
 *     <AccordionItem.Label>Label</AccordionItem.Label>
 *   </AccordionItem.Button>
 *   <AccordionItem.Marker>
 *     <Icon href={placeholder} />
 *   </AccordionItem.Marker>
 * </AccordionItem.Header>
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
			{props.children ?? (
				<ChevronDown
					aria-hidden="true"
					className="🥝-accordion-item-marker-chevron"
				/>
			)}
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
 * 	 <AccordionItem.Header>
 *     <AccordionItem.Button>
 *       <AccordionItem.Label>Label</AccordionItem.Label>
 *     </AccordionItem.Button>
 *     <AccordionItem.Marker />
 *   </AccordionItem.Header>
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

interface AccordionItemHeadingProps extends BaseProps {
	render: NonNullable<BaseProps["render"]>;
}

/**
 * A heading for wrapping `AccordionItem.Button`.
 *
 * The `render` prop is required.
 *
 * Example:
 * ```tsx
 * <AccordionItem.Header>
 *   <AccordionItem.Heading render={<h2 />}>
 *     <AccordionItem.Button>
 *       <AccordionItem.Label>Label</AccordionItem.Label>
 *     </AccordionItem.Button>
 *   </AccordionItem.Heading>
 *   <AccordionItem.Marker />
 * </AccordionItem.Header>
 */
const AccordionItemHeading = forwardRef<"div", AccordionItemHeadingProps>(
	(props, forwardedRef) => (
		<Text
			{...props}
			variant="body-sm"
			className={cx("🥝-accordion-item-heading", props.className)}
			ref={forwardedRef}
		/>
	),
);
DEV: AccordionItemHeading.displayName = "AccordionItem.Heading";

export {
	AccordionItemRoot as Root,
	AccordionItemContent as Content,
	AccordionItemHeader as Header,
	AccordionItemButton as Button,
	AccordionItemLabel as Label,
	AccordionItemDecoration as Decoration,
	AccordionItemMarker as Marker,
	AccordionItemHeading as Heading,
};
