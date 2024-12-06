/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type * as Ariakit from "@ariakit/react";

export const isBrowser = typeof document !== "undefined";

export const supportsPopover = isBrowser && "popover" in HTMLElement.prototype;

/** Element type props merged with custom props. */
type MergeProps<
	T extends React.ElementType,
	P extends Record<string, unknown>,
> = P & Omit<React.ComponentPropsWithRef<T>, keyof P>;

/** Base component props with custom props. */
export type OptionProps<
	T extends React.ElementType = "div",
	P extends Ariakit.RoleOptions<T> = Ariakit.RoleProps<T>,
	K extends keyof P = never,
> = MergeProps<T, Pick<P, "render" | K>>;

/** Focusable component props with custom props. */
export type FocusableProps<
	T extends React.ElementType = "div",
	P extends Ariakit.FocusableOptions<T> = Ariakit.FocusableProps<T>,
	K extends keyof P = never,
> = OptionProps<T, P, "disabled" | "accessibleWhenDisabled" | K>;
