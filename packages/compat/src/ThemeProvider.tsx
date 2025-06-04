/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ThemeProvider as IuiThemeProvider } from "@itwin/itwinui-react";
import * as React from "react";

import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiThemeProviderProps = React.ComponentProps<typeof IuiThemeProvider>;

interface ThemeProviderProps
	extends Pick<
		IuiThemeProviderProps,
		| "theme"
		| "future"
		| "themeOptions"
		| "children"
		| "portalContainer"
		| "includeCss"
	> {
	/**
	 * NOT IMPLEMENTED.
	 *
	 * Theme is controlled via the `Root` component from the `@stratakit/foundations` package when the `themeBridge` is enabled.
	 */
	theme?: IuiThemeProviderProps["theme"];
}

/** @see https://itwinui.bentley.com/docs/themeprovider */
export const ThemeProvider = React.forwardRef((props, forwardedRef) => {
	const { future: futureProp, ...rest } = props;
	const future = React.useMemo(
		() => ({
			themeBridge: true,
			...futureProp,
		}),
		[futureProp],
	);
	return <IuiThemeProvider {...rest} future={future} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"div", ThemeProviderProps>;
DEV: ThemeProvider.displayName = "ThemeProvider";
