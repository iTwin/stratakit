/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Portal } from "@ariakit/react/portal";
import { ColorScheme, useColorScheme } from "@stratakit/foundations";
import { forwardRef } from "@stratakit/internal-utils/react";

import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

const MuiSnackbar = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const { children, ...rest } = props;
		const { scheme: currentScheme } = useColorScheme();
		const invertedScheme = currentScheme === "light" ? "dark" : "light";
		return (
			<Portal {...rest} ref={forwardedRef}>
				<ColorScheme scheme={invertedScheme} data-color-scheme={invertedScheme}>
					{children}
				</ColorScheme>
			</Portal>
		);
	},
);
DEV: MuiSnackbar.displayName = "MuiSnackbar";

// ----------------------------------------------------------------------------

export { MuiSnackbar };
