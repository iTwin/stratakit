/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

// ----------------------------------------------------------------------------

// Types redefined from https://github.com/ariakit/ariakit

/**
 * Render prop type.
 * @template P Props
 * @example
 * const children: RenderProp = (props) => <div {...props} />;
 */
type RenderProp<
	// biome-ignore lint/suspicious/noExplicitAny: any element
	P = React.HTMLAttributes<any> & {
		// biome-ignore lint/suspicious/noExplicitAny: any element
		ref?: React.Ref<any>;
	},
> = (props: P) => React.ReactNode;

type RoleOptions = {
	/**
	 * Allows the component to be rendered as a different HTML element or React
	 * component. The value can be a React element or a function that takes in the
	 * original component props and gives back a React element with the props
	 * merged.
	 */
	render?: RenderProp | React.ReactElement;
};

type FocusableOptions = {
	/**
	 * Determines if the element is disabled. This sets the `aria-disabled`
	 * attribute accordingly, enabling support for all elements, including those
	 * that don't support the native `disabled` attribute.
	 *
	 * This feature can be combined with the `accessibleWhenDisabled` prop to make
	 * disabled elements still accessible via keyboard.
	 *
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Automatically focuses the element upon mounting, similar to the native
	 * `autoFocus` prop. This addresses an issue where the element with the native
	 * `autoFocus` attribute might receive focus before React effects are
	 * executed.
	 *
	 * @default false
	 */
	autoFocus?: boolean;
	/**
	 * Indicates whether the element should be focusable even when it is
	 * `disabled`.
	 *
	 * This is important when discoverability is a concern. For example:
	 *
	 * > A toolbar in an editor contains a set of special smart paste functions
	 * that are disabled when the clipboard is empty or when the function is not
	 * applicable to the current content of the clipboard. It could be helpful to
	 * keep the disabled buttons focusable if the ability to discover their
	 * functionality is primarily via their presence on the toolbar.
	 *
	 * Learn more on [Focusability of disabled
	 * controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols).
	 */
	accessibleWhenDisabled?: boolean;
};

// ----------------------------------------------------------------------------

/** Element type props merged with custom props. */
type MergeProps<
	ElementType extends React.ElementType,
	CustomProps,
> = CustomProps &
	Omit<React.ComponentPropsWithoutRef<ElementType>, keyof CustomProps>;

/** Element type props with base props. */
type BaseProps<ElementType extends React.ElementType = "div"> = MergeProps<
	ElementType,
	RoleOptions
>;

// ----------------------------------------------------------------------------

/** Element type props with focusable props. */
type FocusableProps<ElementType extends React.ElementType = "div"> =
	BaseProps<ElementType> & FocusableOptions;

// ----------------------------------------------------------------------------

export type { BaseProps, FocusableProps };
