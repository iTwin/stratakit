/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Button as AriaButton } from "@ariakit/react/button";
import * as AriaDisclosure from "@ariakit/react/disclosure";
import { Focusable } from "@ariakit/react/focusable";
import { Role } from "@ariakit/react/role";
import { Text } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { ChevronDown } from "./~utils.icons.js";

import type {
	BaseProps,
	FocusableProps,
} from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface NavigationListRootProps extends Omit<BaseProps<"div">, "children"> {
	/**
	 * The navigation items to render within the list.
	 * Should be an array of `NavigationList.Anchor` elements.
	 */
	items: React.JSX.Element[];
}

/**
 * A navigation list displays a collection of navigation links, one of which can be "active".
 *
 * Basic example:
 * ```tsx
 * <NavigationList.Root
 *   items={[
 *     <NavigationList.Anchor key={1} href="/page1" label="Item 1" />,
 *     <NavigationList.Anchor key={2} href="/page2" label="Item 2" active />,
 *   ]}
 * />
 * ```
 *
 * Example with subgroups:
 * ```tsx
 * <NavigationList.Root
 *   items={[
 *     <NavigationList.Anchor key={1} href="/page1" label="Item 1" />,
 *     <NavigationList.Anchor key={2} href="/page2" label="Item 2" />,
 *     <NavigationList.Subgroup
 *       key={3}
 *       label="Subgroup"
 *       items={[
 *         <NavigationList.Anchor key={1} href="/page3-1" label="Item 3.1" />,
 *         <NavigationList.Anchor key={2} href="/page3-2" label="Item 3.2" />,
 *       ]}
 *     />,
 *   ]}
 * />
 * ```
 */
const NavigationListRoot = forwardRef<"div", NavigationListRootProps>(
	(props, forwardedRef) => {
		const { items, role = "list", ...rest } = props;

		const itemRole = role === "list" ? "listitem" : undefined;

		const { indented } = React.useContext(NavigationListRootContext);

		return (
			<Role
				{...rest}
				role={role}
				className={cx("🥝NavigationListRoot", props.className)}
				data-_sk-indented={indented ? "true" : undefined}
				ref={forwardedRef}
			>
				{React.Children.map(items, (item) => (
					<Role
						role={itemRole}
						className="🥝NavigationListItem"
						data-_sk-indented={indented ? "true" : undefined}
					>
						{item}
					</Role>
				))}
			</Role>
		);
	},
);
DEV: NavigationListRoot.displayName = "NavigationList.Root";

const NavigationListRootContext = React.createContext<{ indented: boolean }>({
	indented: false,
});

// ----------------------------------------------------------------------------

interface NavigationListItemActionProps extends FocusableProps {}

/**
 * This is the base for `NavigationList.Anchor` and `NavigationList.Subgroup` (disclosure).
 * @private
 */
const NavigationListItemAction = forwardRef<
	"div",
	NavigationListItemActionProps
>((props, forwardedRef) => {
	return (
		<Focusable
			accessibleWhenDisabled
			{...props}
			className={cx("🥝NavigationListItemAction", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: NavigationListItemAction.displayName = "NavigationListItemAction";

// ----------------------------------------------------------------------------

interface NavigationListAnchorProps
	extends Omit<FocusableProps<"a">, "children"> {
	/**
	 * The label of the navigation anchor.
	 */
	label: string;

	/**
	 * The icon shown before the label of the navigation anchor.
	 *
	 * Can be a URL of an SVG from the `@stratakit/icons` package,
	 * or a custom JSX icon.
	 */
	icon?: string | React.JSX.Element;

	/**
	 * Whether the anchor is active.
	 *
	 * This will automatically set `aria-current="true"` on the anchor.
	 */
	active?: boolean;
}

/**
 * An individual anchor within the navigation list. This should perform a navigation
 * to a different view, page or section. (Make sure to use proper routing/navigation)
 *
 * Should be used as an element within the `items` array of `NavigationList.Root`.
 *
 * Example:
 * ```tsx
 * <NavigationList.Anchor href="/profile"> label="Profile" />
 * ```
 */
const NavigationListAnchor = forwardRef<"a", NavigationListAnchorProps>(
	(props, forwardedRef) => {
		const { active, label, icon, ...rest } = props;

		return (
			<NavigationListItemAction
				{...(rest as React.ComponentProps<"div">)}
				render={
					<Role.a
						aria-current={active ? "true" : undefined}
						render={props.render}
					/>
				}
				ref={forwardedRef}
			>
				{typeof icon === "string" ? <Icon href={icon} /> : icon}
				<Text variant="body-sm" render={<span />}>
					{label}
				</Text>
			</NavigationListItemAction>
		);
	},
);
DEV: NavigationListAnchor.displayName = "NavigationList.Anchor";

// ----------------------------------------------------------------------------

interface NavigationListSubgroupProps
	extends Omit<BaseProps, "children">,
		Pick<NavigationListSubgroupButtonProps, "label" | "icon"> {
	/**
	 * The navigation items within the subgroup.
	 * Should be an array of `NavigationList.Anchor` elements.
	 */
	items: React.JSX.Element[];

	/**
	 * Whether the subgroup is expanded by default.
	 */
	defaultOpen?: boolean;
}

/**
 * A subgroup within the navigation list, used to group related navigation items.
 *
 * Should be used as an element within the `items` array of `NavigationList.Root`.
 *
 * Example:
 * ```tsx
 * <NavigationList.Subgroup label="Management" items={[ … ]} />
 * ```
 */
const NavigationListSubgroup = forwardRef<"div", NavigationListSubgroupProps>(
	(props, forwardedRef) => {
		const { label, icon, items, defaultOpen, ...rest } = props;

		return (
			<Role
				{...rest}
				className={cx("🥝NavigationListSubgroup", props.className)}
				ref={forwardedRef}
			>
				<AriaDisclosure.DisclosureProvider defaultOpen={defaultOpen}>
					<AriaDisclosure.Disclosure
						render={<NavigationListSubgroupButton label={label} icon={icon} />}
					/>
					<NavigationListRootContext.Provider value={{ indented: true }}>
						<AriaDisclosure.DisclosureContent
							render={<NavigationListRoot items={items} />}
						/>
					</NavigationListRootContext.Provider>
				</AriaDisclosure.DisclosureProvider>
			</Role>
		);
	},
);
DEV: NavigationListSubgroup.displayName = "NavigationList.Subgroup";

// ----------------------------------------------------------------------------

interface NavigationListSubgroupButtonProps
	extends Omit<NavigationListItemActionProps, "children"> {
	/**
	 * The label for the subgroup.
	 */
	label: string;

	/**
	 * The icon shown before the label of the subgroup.
	 *
	 * Can be a URL of an SVG from the `@stratakit/icons` package,
	 * or a custom JSX icon.
	 */
	icon?: string | React.JSX.Element;
}

/** @private */
const NavigationListSubgroupButton = forwardRef<
	"button",
	NavigationListSubgroupButtonProps
>((props, forwardedRef) => {
	const { label, icon, ...rest } = props;

	return (
		<NavigationListItemAction
			render={<AriaButton />}
			{...rest}
			className={cx("🥝NavigationListSubgroupButton", props.className)}
			ref={forwardedRef}
		>
			{typeof icon === "string" ? <Icon href={icon} /> : icon}
			<Text variant="body-sm" render={<span />}>
				{label}
			</Text>
			<ChevronDown className="🥝NavigationListSubgroupChevron" />
		</NavigationListItemAction>
	);
});
DEV: NavigationListSubgroupButton.displayName = "NavigationListSubgroupButton";

// ----------------------------------------------------------------------------

export {
	NavigationListRoot as Root,
	NavigationListAnchor as Anchor,
	NavigationListSubgroup as Subgroup,
};
