/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Stack, type StackProps } from "@mui/material";

import type React from "react";

function cross<A extends object, B extends object>(
	a: ReadonlyArray<A>,
	b: ReadonlyArray<B>,
): Array<A & B> {
	return a.flatMap((aItem) =>
		b.map(
			(bItem) =>
				({
					...aItem,
					...bItem,
				}) as A & B,
		),
	);
}

export function varyProp<Name extends string, Values, Base extends object>({
	withExisting,
	prop,
	values,
	order = "existing-new",
}: {
	withExisting: ReadonlyArray<Base>;
	prop: Name;
	values: ReadonlyArray<Values>;
	order?: "new-existing" | "existing-new";
}): Array<Base & Record<Name, Values>> {
	const propValues = values.map(
		(value) => ({ [prop]: value }) as Record<Name, Values>,
	);
	return order === "new-existing"
		? cross(propValues, withExisting)
		: cross(withExisting, propValues);
}

type CombinationInput = Record<PropertyKey, readonly unknown[]>;
type CombinationResult<T extends CombinationInput> = {
	[K in keyof T]: T[K][number];
};

export function propCombinations<T extends CombinationInput>(options: T) {
	return Object.entries(options).reduce(
		(combinations, [prop, values]) =>
			varyProp({ prop, values, withExisting: combinations }),
		[{}],
	) as CombinationResult<T>[];
}

type PropCombinationInput<P> = { [K in keyof P]?: ReadonlyArray<P[K]> };
type VaryPropsProps<P extends object> = {
	component: React.ComponentType<P>;
	/** Props values that are applied to every component instance before any of the prop variations */
	staticProps?: Partial<P>;
	/**
	 * The array of prop variations or an object map that defines how to generate all the variations
	 *
	 * @example ```tsx
	 * [{color:"primary", value:1}, {color:"primary", value:2}, {color:"secondary", value:1}]
	 * ```
	 *
	 * @example ```tsx
	 * {color:["primary", "secondary"], value:[1,2]}
	 * ```
	 */
	variations:
		| PropCombinationInput<NoInfer<P>>
		| ReadonlyArray<Partial<NoInfer<P>>>;
};

/**
 * Creates an array of components by varying prop values.
 */
export function VaryProps<P extends object>({
	component: Component,
	staticProps,
	variations,
}: VaryPropsProps<P>) {
	const combinations = Array.isArray(variations)
		? variations
		: propCombinations(variations as CombinationInput);
	const children = combinations.map((propValues, index) => (
		<Component key={index} {...staticProps} {...propValues} />
	));

	return children;
}

/**
 * Creates an horizontal stack of components by varying prop values.
 */
export function VaryPropsStack<P extends object>({
	spacing = 1,
	...rest
}: VaryPropsProps<P> & Pick<StackProps, "spacing">) {
	return (
		<Stack
			direction="row"
			sx={{ flexWrap: "wrap" }}
			spacing={spacing}
			useFlexGap
		>
			<VaryProps {...rest} />
		</Stack>
	);
}
