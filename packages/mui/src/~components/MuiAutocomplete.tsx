/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiAutocompleteContext = React.createContext<
	| {
			setLabelId: (id: string | undefined) => void;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

const MuiAutocomplete = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const [labelId, setLabelId] = React.useState<string | undefined>(undefined);
		return (
			<MuiAutocompleteContext.Provider value={{ setLabelId }}>
				<Role.div
					role="group"
					aria-labelledby={labelId}
					{...props}
					ref={forwardedRef}
				/>
			</MuiAutocompleteContext.Provider>
		);
	},
);
DEV: MuiAutocomplete.displayName = "MuiAutocomplete";

// ----------------------------------------------------------------------------

export { MuiAutocomplete, MuiAutocompleteContext };
