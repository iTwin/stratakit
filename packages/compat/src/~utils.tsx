/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";

// ----------------------------------------------------------------------------

/**
 * As defined in {@link https://github.com/iTwin/iTwinUI/blob/b73924dc9db9e460772798162369789384f65133/packages/itwinui-react/src/utils/props.ts#L25 iTwinUI}.
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

/**
 * Converts the `as` prop used in `@itwin/itwinui-react` components to `render` prop used in Strata components.
 *
 * @private
 */
export function useCompatProps<P extends { as?: React.ElementType }>(props: P) {
	const { as: Element, ...rest } = props;
	const render = React.useMemo(() => {
		return Element ? <Element /> : undefined;
	}, [Element]);
	return {
		...rest,
		render,
	};
}

// ----------------------------------------------------------------------------

export { getUserColor } from "@itwin/itwinui-react";
