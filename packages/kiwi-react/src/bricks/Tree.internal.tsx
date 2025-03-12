/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

// ----------------------------------------------------------------------------

export const TreeContext = React.createContext<
	| {
			setErrorId: (args: {
				itemId: string;
				errorId: string | undefined;
			}) => void;
			itemIdToErrorId: Map<string, string>;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------
