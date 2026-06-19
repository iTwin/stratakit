/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { isBrowser } from "./utils.js";

// ----------------------------------------------------------------------------

export const supportsPopover = isBrowser && "popover" in HTMLElement.prototype;

// ----------------------------------------------------------------------------

export type ForwardRefHelper = <
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
export type MergeProps<
	ElementType extends React.ElementType,
	CustomProps extends Record<string, unknown>,
> = CustomProps &
	Omit<React.ComponentPropsWithoutRef<ElementType>, keyof CustomProps>;

// ----------------------------------------------------------------------------

// biome-ignore lint/suspicious/noExplicitAny: allow any type of function
export type AnyFunction = (...args: any) => any;

// ----------------------------------------------------------------------------
