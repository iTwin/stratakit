/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";

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

const MuiTableCell = forwardRef<"td", BaseProps<"td">>(
	(props, forwardedRef) => {
		const inHeader = React.useContext(MuiTableHeadContext);
		const Component = inHeader ? "th" : "td";

		return <Role render={<Component />} {...props} ref={forwardedRef} />;
	},
);
DEV: MuiTableCell.displayName = "MuiTableCell";

// ----------------------------------------------------------------------------

export { MuiTableHead, MuiTableCell };
