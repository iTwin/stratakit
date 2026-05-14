/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import {
	forwardRef,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiAlertContext = React.createContext<
	{ setLabelId: (id: string | undefined) => void } | undefined
>(undefined);

// ----------------------------------------------------------------------------

const MuiAlert = forwardRef<"div", BaseProps<"div">>((props, forwardedRef) => {
	const [labelId, setLabelId] = React.useState<string | undefined>(undefined);

	return (
		<MuiAlertContext.Provider value={{ setLabelId }}>
			<Role.div
				// role="group" // (this gets set by `slotProps.root.role`)
				aria-labelledby={labelId}
				{...props}
				ref={forwardedRef}
			/>
		</MuiAlertContext.Provider>
	);
});
DEV: MuiAlert.displayName = "MuiAlert";

// ----------------------------------------------------------------------------

const MuiAlertTitle = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const generatedId = React.useId();
		const id = props.id ?? generatedId;

		const { setLabelId } = useSafeContext(MuiAlertContext);

		React.useEffect(() => {
			setLabelId(id);
			return () => setLabelId(undefined);
		}, [id, setLabelId]);

		return <Role.div {...props} id={id} ref={forwardedRef} />;
	},
);
DEV: MuiAlertTitle.displayName = "MuiAlertTitle";

// ----------------------------------------------------------------------------

export { MuiAlert, MuiAlertTitle };
