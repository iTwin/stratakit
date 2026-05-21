/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Role } from "@ariakit/react/role";
import { ThemeProvider } from "@mui/material/styles";
import {
	forwardRef,
	useEventHandlers,
	useMergedRefs,
} from "@stratakit/foundations/secret-internals";
import { MuiChip, MuiChipDeleteIcon } from "./MuiChip.js";
import { MuiInputLabelContext } from "./MuiInputLabel.js";

import type Autocomplete from "@mui/material/Autocomplete";
import type { Theme } from "@mui/material/styles";
import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

type AutocompleteProps = React.ComponentProps<typeof Autocomplete>;
type OnKeyDownEvent = Parameters<
	NonNullable<AutocompleteProps["onKeyDown"]>
>[0];

const MuiAutocomplete = forwardRef<"div", BaseProps>((props, forwardedRef) => {
	const [labelId, setLabelId] = React.useState<string | undefined>(undefined);

	return (
		<ThemeProvider
			theme={(outerTheme: Theme) => ({
				...outerTheme,
				components: {
					...outerTheme.components,
					MuiTextField: {
						defaultProps: {
							slotProps: {
								input: {
									component: MuiAutocompleteTextFieldInput,
								},
								htmlInput: {
									slot: "input", // Assign input element to the slot named "input"
								},
							},
						},
					},
				},
			})}
		>
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
		</ThemeProvider>
	);
});
DEV: MuiAutocomplete.displayName = "MuiAutocomplete";

// ----------------------------------------------------------------------------

const MuiAutocompleteClearIndicator = forwardRef<"button", BaseProps<"button">>(
	(props, forwardedRef) => {
		return (
			<Role.button
				{...props}
				onKeyDown={useEventHandlers(props.onKeyDown, (e) => {
					// Stop Autocomplete from opening the listbox
					e.stopPropagation();
				})}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: MuiAutocompleteClearIndicator.displayName =
	"MuiAutocompleteClearIndicator";

// ----------------------------------------------------------------------------

const MuiAutocompleteChip = forwardRef<"div", BaseProps>(
	(props, forwardedRef) => {
		return (
			<MuiChip slot="chips" {...props} role="listitem" ref={forwardedRef} />
		);
	},
);
DEV: MuiAutocompleteChip.displayName = "MuiAutocompleteChip";

// ----------------------------------------------------------------------------

const MuiAutocompleteChipDeleteIcon = forwardRef<
	"button",
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

const MuiAutocompleteTextFieldInput = forwardRef<"div", BaseProps>(
	(props, forwardedRef) => {
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
				<Role {...props} ref={useMergedRefs(setHost, forwardedRef)} />
				{shadow &&
					ReactDOM.createPortal(
						<>
							<slot name="input" />
							<slot role="list" name="chips" />
							<slot /> {/* Default slot used for adornments */}
						</>,
						shadow,
					)}
			</>
		);
	},
);
DEV: MuiAutocompleteTextFieldInput.displayName =
	"MuiAutocompleteTextFieldInput";

// ----------------------------------------------------------------------------

export {
	MuiAutocomplete,
	MuiAutocompleteChip,
	MuiAutocompleteChipDeleteIcon,
	MuiAutocompleteClearIndicator,
};
