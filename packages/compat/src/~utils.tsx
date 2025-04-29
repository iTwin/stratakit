/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { Anchor } from "@stratakit/bricks";
import * as React from "react";

// ----------------------------------------------------------------------------

/**
 * As defined in `@itwin/itwinui-react`.
 *
 * Makes `as` prop available and merges original OwnProps and the inferred props from `as` element.
 * Extends ForwardRefExoticComponent so ref gets the correct type.
 *
 * `DefaultAs` should be the default element that is used for the `as`  prop.
 *
 * @example
 * const Button = React.forwardRef((props, forwardedRef) => {
 *   // ...
 * }) as PolymorphicForwardRefComponent<'button', ButtonOwnProps>;
 *
 * @private
 */
// biome-ignore lint/complexity/noBannedTypes: as defined in `@itwin/itwinui-react`
export interface PolymorphicForwardRefComponent<DefaultAs, OwnProps = {}>
	extends React.ForwardRefExoticComponent<
		Merge<
			// biome-ignore lint/suspicious/noExplicitAny: as defined in `@itwin/itwinui-react`
			DefaultAs extends React.ElementType<any>
				? React.ComponentPropsWithRef<DefaultAs>
				: never,
			OwnProps & {
				as?: DefaultAs;
			}
		>
	> {
	<As = DefaultAs>(
		props: As extends keyof React.JSX.IntrinsicElements
			? Merge<
					React.JSX.IntrinsicElements[As],
					OwnProps & {
						as: As;
					}
				>
			: As extends React.ComponentType<infer P>
				? Merge<
						P,
						OwnProps & {
							as: As;
						}
					>
				: never,
		// biome-ignore lint/suspicious/noExplicitAny: as defined in `@itwin/itwinui-react`
	): React.ReactElement<any> | null;
}
type Merge<P1, P2> = Omit<P1, keyof P2> & P2;

// ----------------------------------------------------------------------------

type AnchorProps = React.ComponentProps<typeof Anchor>;
type RenderProp = AnchorProps["render"];

export function createCompatComponent<T, P extends { as?: React.ElementType }>(
	renderFn: React.ForwardRefRenderFunction<
		T,
		React.PropsWithoutRef<Omit<P, "as"> & { render?: RenderProp }>
	>,
) {
	return React.forwardRef<T, P>((props, forwardedRef) => {
		const { as, ...rest } = props;
		const render = as ? React.createElement(as) : undefined;
		return renderFn({ ...rest, render }, forwardedRef);
	});
}

// ----------------------------------------------------------------------------
