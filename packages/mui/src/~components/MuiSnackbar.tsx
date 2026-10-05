/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Portal } from "@ariakit/react/portal";
import { useColorScheme } from "@mui/material/styles";
import { forwardRef } from "@stratakit/internal-utils/react";
import classNames from "classnames";

import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

const MuiSnackbar = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const { children, ...rest } = props;
		const { mode } = useColorScheme();
		const scheme = mode === "light" ? "dark" : "light";
		return (
			<Portal
				{...rest}
				ref={forwardedRef}
				className={classNames("🥝Root", "🥝MuiRoot", props.className)}
				data-_sk-color-scheme={scheme}
			>
				{children}
			</Portal>
		);
	},
);
DEV: MuiSnackbar.displayName = "MuiSnackbar";

// ----------------------------------------------------------------------------

export { MuiSnackbar };
