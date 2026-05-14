/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Role } from "@ariakit/react/role";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
	forwardRef,
	useEventHandlers,
	useMergedRefs,
} from "@stratakit/foundations/secret-internals";
import { MuiChip, MuiChipDeleteIcon } from "./MuiChip.js";
import { MuiInputLabelContext } from "./MuiInputLabel.js";

import type { Autocomplete } from "@mui/material";
import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiAutocompleteContext = React.createContext(false);

// ----------------------------------------------------------------------------

type AutocompleteProps = React.ComponentProps<typeof Autocomplete>;
type OnKeyDownEvent = Parameters<
	NonNullable<AutocompleteProps["onKeyDown"]>
>[0];

const MuiAutocomplete = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const [labelId, setLabelId] = React.useState<string | undefined>(undefined);
		return (
			<MuiAutocompleteContext.Provider value={true}>
				<MuiInputLabelContext.Provider value={{ setLabelId }}>
					<Role.div
						role="group"
						aria-labelledby={labelId}
						{...props}
						onKeyDown={useEventHandlers<OnKeyDownEvent>((e) => {
							if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
								e.defaultMuiPrevented = true; // Prevent MUI from closing the listbox while trying to focus the tags
							}
						}, props.onKeyDown)}
						ref={forwardedRef}
					/>
				</MuiInputLabelContext.Provider>
			</MuiAutocompleteContext.Provider>
		);
	},
);
DEV: MuiAutocomplete.displayName = "MuiAutocomplete";

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
	return (
		<>
			<OutlinedInput {...props} ref={useMergedRefs(setHost, forwardedRef)} />
			{shadow &&
				ReactDOM.createPortal(
					<>
						<slot /> {/* Default slot is used for the input */}
						<slot role="list" name="chips" />
						<slot name="end" />
					</>,
					shadow,
				)}
		</>
	);
});
DEV: MuiAutocompleteTextFieldInput.displayName =
	"MuiAutocompleteTextFieldInput";

// ----------------------------------------------------------------------------

export {
	MuiAutocomplete,
	MuiAutocompleteChip,
	MuiAutocompleteChipDeleteIcon,
	MuiAutocompleteClearIndicator,
	MuiAutocompleteContext,
	MuiAutocompleteTextFieldInput,
};
