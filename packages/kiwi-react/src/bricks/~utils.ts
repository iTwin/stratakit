/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type * as Ariakit from "@ariakit/react";

export const isBrowser = typeof document !== "undefined";

export const supportsPopover = isBrowser && "popover" in HTMLElement.prototype;

/** Element type props merged with custom props. */
type MergeProps<
	ElementType extends React.ElementType,
	CustomProps extends Record<string, unknown>,
> = CustomProps &
	Omit<React.ComponentPropsWithRef<ElementType>, keyof CustomProps>;

/** Base component props with custom props. */
export type BaseProps<
	ElementType extends React.ElementType = "div",
	CustomProps extends
		Ariakit.RoleOptions<ElementType> = Ariakit.RoleProps<ElementType>,
	CustomPropKeys extends keyof CustomProps = never,
> = MergeProps<ElementType, Pick<CustomProps, "render" | CustomPropKeys>>;

/** Focusable component props with custom props. */
export type FocusableProps<
	ElementType extends React.ElementType = "div",
	CustomProps extends
		Ariakit.FocusableOptions<ElementType> = Ariakit.FocusableProps<ElementType>,
	CustomPropKeys extends keyof CustomProps = never,
> = BaseProps<
	ElementType,
	CustomProps,
	"disabled" | "accessibleWhenDisabled" | CustomPropKeys
>;
