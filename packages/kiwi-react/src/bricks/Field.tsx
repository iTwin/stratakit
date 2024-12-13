/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";

// ----------------------------------------------------------------------------

interface FieldProps extends BaseProps {
	/**
	 * Allows overriding the default block layout for text controls.
	 */
	layout?: "inline";
}

export const Field = forwardRef<"div", FieldProps>((props, forwardedRef) => {
	const fieldId = React.useId();
	const { className, layout, ...rest } = props;

	return (
		<FieldIdContext.Provider value={fieldId}>
			<Ariakit.Role
				{...rest}
				className={cx("🥝-field", className)}
				data-kiwi-layout={layout}
				ref={forwardedRef}
			/>
		</FieldIdContext.Provider>
	);
});
DEV: Field.displayName = "Field";

// ----------------------------------------------------------------------------

const FieldIdContext = React.createContext<string | undefined>(undefined);

export function useFieldId() {
	return React.useContext(FieldIdContext);
}
