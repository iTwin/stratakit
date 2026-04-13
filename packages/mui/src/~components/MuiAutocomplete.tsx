/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface MuiAutocompleteProps extends BaseProps<"div"> {
	multiple?: boolean;
}

const MuiAutocomplete = forwardRef<"div", MuiAutocompleteProps>(
	(props, forwardedRef) => {
		const { multiple, ...rest } = props;
		return (
			<Role.div
				role={multiple ? "group" : undefined}
				{...rest}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: MuiAutocomplete.displayName = "MuiAutocomplete";

// ----------------------------------------------------------------------------

export { MuiAutocomplete };
