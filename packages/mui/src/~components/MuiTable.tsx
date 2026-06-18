/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { ThemeProvider } from "@mui/material/styles";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import { SortAscendingIcon, SortDescendingIcon } from "../Icon.js";

import type { Theme } from "@mui/material/styles";
import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiTableHeadContext = React.createContext(false);

// ----------------------------------------------------------------------------

const MuiTableHead = forwardRef<"thead", BaseProps<"thead">>(
	(props, forwardedRef) => {
		return (
			<MuiTableHeadContext.Provider value={true}>
				<Role render={<thead />} {...props} ref={forwardedRef} />
			</MuiTableHeadContext.Provider>
		);
	},
);
DEV: MuiTableHead.displayName = "MuiTableHead";

// ----------------------------------------------------------------------------

const MuiTableBody = forwardRef<"tbody", BaseProps<"tbody">>(
	(props, forwardedRef) => {
		return (
			<ThemeProvider
				theme={(outerTheme: Theme) => ({
					...outerTheme,
					components: {
						...outerTheme.components,
						MuiTableRow: {
							defaultProps: {
								...outerTheme.components?.MuiTableRow?.defaultProps,
								hover: true, // Only enable `hover` for rows inside TableBody.
							},
						},
					},
				})}
			>
				<Role render={<tbody />} {...props} ref={forwardedRef} />
			</ThemeProvider>
		);
	},
);
DEV: MuiTableBody.displayName = "MuiTableBody";

// ----------------------------------------------------------------------------

const MuiTableCell = forwardRef<"td", BaseProps<"td">>(
	(props, forwardedRef) => {
		const inHeader = React.useContext(MuiTableHeadContext);
		const Component = inHeader ? "th" : "td";

		return <Role render={<Component />} {...props} ref={forwardedRef} />;
	},
);
DEV: MuiTableCell.displayName = "MuiTableCell";

// ----------------------------------------------------------------------------

const MuiTableSortLabelIcon = forwardRef<
	"svg",
	BaseProps<"svg"> & { direction: "asc" | "desc" }
>(({ direction, ...props }, forwardRef) => {
	return direction === "asc" ? (
		<SortAscendingIcon {...props} ref={forwardRef} />
	) : (
		<SortDescendingIcon {...props} ref={forwardRef} />
	);
});
DEV: MuiTableSortLabelIcon.displayName = "MuiTableSortLabelIcon";

// ----------------------------------------------------------------------------

export { MuiTableBody, MuiTableCell, MuiTableHead, MuiTableSortLabelIcon };
