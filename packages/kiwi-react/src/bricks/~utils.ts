/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type * as Ariakit from "@ariakit/react";

export const isBrowser = typeof document !== "undefined";

export const supportsPopover = isBrowser && "popover" in HTMLElement.prototype;

type MergeProps<
	T extends React.ElementType,
	AdditionalProps extends Record<string, unknown>,
> = AdditionalProps &
	Omit<React.ComponentPropsWithRef<T>, keyof AdditionalProps>;

export type OptionProps<
	T extends React.ElementType = "div",
	TProps extends Ariakit.RoleOptions<T> = Ariakit.RoleProps<T>,
	KProps extends keyof TProps = never,
> = MergeProps<T, Pick<TProps, "render" | KProps>>;
export type FocusableProps<
	T extends React.ElementType = "div",
	TProps extends Ariakit.FocusableOptions<T> = Ariakit.FocusableProps<T>,
	KProps extends keyof TProps = never,
> = OptionProps<T, TProps, "disabled" | "accessibleWhenDisabled" | KProps>;
