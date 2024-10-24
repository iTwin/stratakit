/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";

interface FieldProps extends Ariakit.RoleProps {
	/**
	 * Allows overriding the default block layout for text controls.
	 */
	layout?: "inline";
}

const FieldIdContext = React.createContext<string | undefined>(undefined);

export function useFieldId() {
	return React.useContext(FieldIdContext);
}

export const Field = React.forwardRef<React.ElementRef<"div">, FieldProps>(
	(props, forwardedRef) => {
		const fieldId = React.useId();
		const { className, layout } = props;

		return (
			<FieldIdContext.Provider value={fieldId}>
				<Ariakit.Role
					{...props}
					className={cx("🥝-field", className)}
					data-kiwi-layout={layout}
					ref={forwardedRef}
				/>
			</FieldIdContext.Provider>
		);
	},
);
