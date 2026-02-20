/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import {
	useEventHandlers,
	useMergedRefs,
} from "@stratakit/foundations/secret-internals";
import { MuiChip, MuiChipDeleteIcon } from "./MuiChip.js";

// ----------------------------------------------------------------------------

const MuiAutocompleteClearIndicator = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Role.button>
>((props, forwardedRef) => {
	const [element, setElement] = React.useState<HTMLButtonElement | null>(null);
	React.useEffect(() => {
		const parentElement = element?.parentElement;
		if (!parentElement || parentElement.slot) return;
		parentElement.slot = "end";
		return () => {
			parentElement.slot = "";
		};
	}, [element]);
	return (
		<Role.button
			{...props}
			tabIndex={undefined} // Make clear indicator focusable
			onKeyDown={useEventHandlers(props.onKeyDown, (e) => {
				// Stop Autocomplete from opening the listbox
				e.stopPropagation();
			})}
			ref={useMergedRefs(setElement, forwardedRef)}
		/>
	);
});
DEV: MuiAutocompleteClearIndicator.displayName =
	"MuiAutocompleteClearIndicator";

// ----------------------------------------------------------------------------

interface MuiAutocompleteChipProps
	extends React.ComponentProps<typeof MuiChip> {}

const MuiAutocompleteChip = React.forwardRef<
	HTMLDivElement,
	MuiAutocompleteChipProps
>((props, forwardedRef) => {
	return <MuiChip role="listitem" {...props} ref={forwardedRef} />;
});
DEV: MuiAutocompleteChip.displayName = "MuiAutocompleteChip";

// ----------------------------------------------------------------------------

const MuiAutocompleteChipDeleteIcon = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof MuiChipDeleteIcon>
>((props, forwardedRef) => {
	return (
		<MuiChipDeleteIcon
			{...props}
			onKeyDown={useEventHandlers(props.onKeyDown, (e) => {
				// Stop Autocomplete from opening the listbox
				e.stopPropagation();
			})}
			ref={forwardedRef}
		/>
	);
});
DEV: MuiAutocompleteChipDeleteIcon.displayName =
	"MuiAutocompleteChipDeleteIcon";

// ----------------------------------------------------------------------------

export {
	MuiAutocompleteClearIndicator,
	MuiAutocompleteChip,
	MuiAutocompleteChipDeleteIcon,
};
