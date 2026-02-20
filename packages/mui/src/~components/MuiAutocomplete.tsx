/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Role } from "@ariakit/react/role";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
	loadStyles,
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
	return <MuiChip slot="chips" {...props} role="listitem" ref={forwardedRef} />;
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

const css = `.🥝MuiAutocompleteChipsList { display: contents; }`;

const MuiAutocompleteTextFieldInput = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<typeof OutlinedInput>
>((props, forwardedRef) => {
	const [host, setHost] = React.useState<HTMLElement | null>(null);
	const [shadow, setShadow] = React.useState<ShadowRoot | null>(null);
	React.useEffect(() => {
		if (!host) return;
		if (!host.shadowRoot) {
			host.attachShadow({ mode: "open" });
		}
		setShadow(host.shadowRoot);
	}, [host]);
	React.useInsertionEffect(() => {
		if (!shadow) return;
		const { cleanup } = loadStyles(shadow, { css });
		return cleanup;
	}, [shadow]);
	return (
		<>
			<OutlinedInput {...props} ref={useMergedRefs(setHost, forwardedRef)} />
			{shadow &&
				ReactDOM.createPortal(
					<>
						<slot /> {/* Default slot is used for the input */}
						<div className="🥝MuiAutocompleteChipsList" role="list">
							<slot name="chips" />
						</div>
						<slot name="end" />
					</>,
					shadow,
				)}
		</>
	);
});

// ----------------------------------------------------------------------------

export {
	MuiAutocompleteClearIndicator,
	MuiAutocompleteChip,
	MuiAutocompleteChipDeleteIcon,
	MuiAutocompleteTextFieldInput,
};
