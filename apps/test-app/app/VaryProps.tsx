/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Stack } from "@mui/material";

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
	staticProps?: Partial<P>;
	layout?: React.ReactElement<{ children?: React.ReactNode }>;
	variations:
		| PropCombinationInput<NoInfer<P>>
		| ReadonlyArray<Partial<NoInfer<P>>>;
};
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
