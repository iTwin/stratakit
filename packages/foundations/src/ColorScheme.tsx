/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useSafeContext } from "@stratakit/internal-utils/hooks";
import classNames from "classnames";

import type { BaseProps } from "@stratakit/internal-utils/props";

interface ColorSchemeValue {
	scheme: "light" | "dark";
	unstable_accentColor: "aurora" | "cobalt";
}
const colorSchemeContext = React.createContext<ColorSchemeValue | undefined>(
	undefined,
);
colorSchemeContext.displayName = "ColorScheme";
const ColorSchemeContextProvider = colorSchemeContext.Provider;

/**
 * Returns the current value of the color scheme.  Can only be used inside a `<Root>` or `<ColorScheme>`.
 * @returns "light"|"dark"
 */
export function useColorScheme() {
	return useSafeContext(colorSchemeContext);
}

interface ColorSchemeProps extends BaseProps<"div"> {
	scheme: ColorSchemeValue["scheme"];
	unstable_accentColor?: ColorSchemeValue["unstable_accentColor"];
}

function formatBadValue(value: unknown) {
	return JSON.stringify(value, (_key, value) =>
		undefined === value ? "undefined" : value,
	);
}

/**
 * Sets the color scheme for all children of this element.
 *
 * Use {@link useColorScheme} to get the color scheme for the current element.
 */
export function ColorScheme(props: ColorSchemeProps) {
	const {
		children,
		scheme,
		unstable_accentColor: accentFromProps,
		className,
		...rest
	} = props;
	const context = React.useContext(colorSchemeContext);

	if (scheme !== "light" && scheme !== "dark") {
		throw new Error(
			`Invalid ColorScheme prop scheme: ${formatBadValue(scheme)}`,
		);
	}
	if (
		accentFromProps !== undefined &&
		accentFromProps !== "aurora" &&
		accentFromProps !== "cobalt"
	) {
		throw new Error(
			`Invalid ColorScheme prop unstable_accentColor:  ${formatBadValue(accentFromProps)}`,
		);
	}

	const unstable_accentColor =
		accentFromProps ?? context?.unstable_accentColor ?? "aurora";

	return (
		<div
			{...rest}
			className={classNames("🥝ColorScheme", className)}
			data-_sk-color-scheme={scheme}
			data-_sk-accent-color={unstable_accentColor}
		>
			<ColorSchemeContextProvider value={{ scheme, unstable_accentColor }}>
				{children}
			</ColorSchemeContextProvider>
		</div>
	);
}
