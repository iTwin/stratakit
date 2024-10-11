/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";

interface FieldProps extends Ariakit.RoleProps {}

const FieldIdContext = React.createContext<string | undefined>(undefined);

export function useFieldId() {
	return React.useContext(FieldIdContext);
}

export const Field = React.forwardRef<React.ElementRef<"div">, FieldProps>(
	(props, forwardedRef) => {
		const fieldId = React.useId();

		return (
			<FieldIdContext.Provider value={fieldId}>
				<Ariakit.Role
					{...props}
					className={cx("🥝-field", props.className)}
					ref={forwardedRef}
				/>
			</FieldIdContext.Provider>
		);
	},
);
