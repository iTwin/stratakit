/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type * as Ariakit from "@ariakit/react";

export const isBrowser = typeof document !== "undefined";

export const supportsPopover = isBrowser && "popover" in HTMLElement.prototype;

export type Props<
	T extends React.ElementType,
	AdditionalProps extends Record<string, unknown>,
	TKeysToOmit extends keyof React.ComponentProps<T> = never,
> = AdditionalProps &
	Omit<React.ComponentPropsWithRef<T>, keyof AdditionalProps | TKeysToOmit>;

export type OptionProps<
	T extends Ariakit.RoleOptions = Ariakit.RoleProps,
	AdditionalTKeys extends keyof T = never,
> = Pick<T, "render" | AdditionalTKeys>;
export type FocusableProps<
	T extends Ariakit.FocusableOptions = Ariakit.FocusableProps,
	AdditionalTKeys extends keyof T = never,
> = OptionProps<T, "disabled" | "accessibleWhenDisabled" | AdditionalTKeys>;
