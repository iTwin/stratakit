/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { FocusableProps as AkFocusableProps } from "@ariakit/react/focusable";
import type { RoleProps } from "@ariakit/react/role";

// ----------------------------------------------------------------------------

/** Element type props merged with custom props. */
type MergeProps<
	ElementType extends React.ElementType,
	CustomProps extends Record<string, unknown>,
> = CustomProps &
	Omit<React.ComponentPropsWithoutRef<ElementType>, keyof CustomProps>;

/** Base component props with custom props. */
type BaseProps<ElementType extends React.ElementType = "div"> = MergeProps<
	ElementType,
	Pick<RoleProps, "render">
>;

// ----------------------------------------------------------------------------

/** Focusable component props with custom props. */
type FocusableProps<ElementType extends React.ElementType = "div"> =
	BaseProps<ElementType> &
		Pick<AkFocusableProps, "disabled" | "accessibleWhenDisabled" | "autoFocus">;

// ----------------------------------------------------------------------------

export type { BaseProps, FocusableProps };
