/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type * as Ariakit from "@ariakit/react";

export const isBrowser = typeof document !== "undefined";

export const supportsPopover = isBrowser && "popover" in HTMLElement.prototype;

// ----------------------------------------------------------------------------

/**
 * Wrapper over `React.forwardRef` which allows refs to be loosely typed as `HTMLElement`.
 *
 * Usage:
 *
 * ```tsx
 * const Button = forwardRef<"button", ButtonProps>((props, forwardedRef) => {});
 * ```
 *
 * **Note**: The first type parameter is the default element type, which is slightly different
 * from what `React.forwardRef` expects. e.g. This utility expects `"div"` instead of `ComponentRef<"div">`.
 *
 * @private
 */
export const forwardRef: ForwardRefHelper = React.forwardRef;

type ForwardRefHelper = <
	DefaultElement extends React.ElementType,
	Props extends {},
>(
	render: React.ForwardRefRenderFunction<
		React.ComponentRef<DefaultElement>,
		React.PropsWithoutRef<Props>
	>,
) => React.ForwardRefExoticComponent<
	React.PropsWithoutRef<Props> &
		React.RefAttributes<React.ComponentRef<DefaultElement> | HTMLElement>
>;

// ----------------------------------------------------------------------------

/** Element type props merged with custom props. */
type MergeProps<
	ElementType extends React.ElementType,
	CustomProps extends Record<string, unknown>,
> = CustomProps &
	Omit<React.ComponentPropsWithoutRef<ElementType>, keyof CustomProps>;

/** Base component props with custom props. */
export type BaseProps<ElementType extends React.ElementType = "div"> =
	MergeProps<ElementType, Pick<Ariakit.RoleProps, "render">>;

/** Focusable component props with custom props. */
export type FocusableProps<ElementType extends React.ElementType = "div"> =
	BaseProps<ElementType> &
		Pick<
			Ariakit.FocusableProps,
			"disabled" | "accessibleWhenDisabled" | "autoFocus"
		>;
