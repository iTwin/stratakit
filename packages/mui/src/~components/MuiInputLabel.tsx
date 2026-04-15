/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiInputLabelContext = React.createContext<
	| {
			setLabelId: (id: string | undefined) => void;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

const MuiInputLabel = forwardRef<"label", BaseProps<"label">>(
	(props, forwardedRef) => {
		const { setLabelId } = React.useContext(MuiInputLabelContext) ?? {};

		React.useEffect(() => {
			if (!setLabelId) return;
			setLabelId(props.id);
			return () => setLabelId(undefined);
		}, [props.id, setLabelId]);

		return <Role.label {...props} ref={forwardedRef} />;
	},
);
DEV: MuiInputLabel.displayName = "MuiInputLabel";

// ----------------------------------------------------------------------------

export { MuiInputLabel, MuiInputLabelContext };
