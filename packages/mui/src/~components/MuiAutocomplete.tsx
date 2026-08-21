/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Role } from "@ariakit/react/role";
import { ThemeProvider } from "@mui/material/styles";
import {
	useEventHandlers,
	useMergedRefs,
} from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";
import { MuiChip, MuiChipDeleteIcon } from "./MuiChip.js";
import { MuiInputLabelContext } from "./MuiInputLabel.js";

import type Autocomplete from "@mui/material/Autocomplete";
import type { Theme } from "@mui/material/styles";
import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

const MuiAutocompleteContext = React.createContext<
	| {
			inputRootRef: HTMLElement | null;
			setInputRootRef: (ref: HTMLElement | null) => void;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

type AutocompleteProps = React.ComponentProps<typeof Autocomplete>;
type OnKeyDownEvent = Parameters<
	NonNullable<AutocompleteProps["onKeyDown"]>
>[0];

const MuiAutocomplete = forwardRef<"div", BaseProps>((props, forwardedRef) => {
	const [labelId, setLabelId] = React.useState<string | undefined>(undefined);
	const [inputRootRef, setInputRootRef] = React.useState<HTMLElement | null>(
		null,
	);

	return (
		<ThemeProvider
			theme={(outerTheme: Theme) => ({
				...outerTheme,
				components: {
					...outerTheme.components,
					MuiTextField: {
						...outerTheme.components?.MuiTextField,
						defaultProps: {
							...outerTheme.components?.MuiTextField?.defaultProps,
							slotProps: {
								...outerTheme.components?.MuiTextField?.defaultProps?.slotProps,
								input: {
									...outerTheme.components?.MuiTextField?.defaultProps
										?.slotProps?.input,
									component: MuiAutocompleteTextFieldInput,
								},
								htmlInput: {
									...outerTheme.components?.MuiTextField?.defaultProps
										?.slotProps?.htmlInput,
									slot: "input", // Assign input element to the slot named "input"
								},
							},
						},
					},
				},
			})}
		>
			<MuiAutocompleteContext.Provider
				value={{ inputRootRef, setInputRootRef }}
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
			</MuiAutocompleteContext.Provider>
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
	const { inputRootRef } = React.useContext(MuiAutocompleteContext) ?? {};

	return (
		<MuiChipDeleteIcon
			{...props}
			onKeyDown={useEventHandlers(props.onKeyDown, (e) => {
				// Stop Autocomplete from opening the listbox
				e.stopPropagation();
			})}
			onClick={useEventHandlers(props.onClick, () => {
				if (!inputRootRef) return;

				const htmlInput = inputRootRef.getElementsByClassName(
					"MuiAutocomplete-input",
				)[0] as HTMLInputElement | undefined;
				if (!htmlInput) return;

				// Focus the HTML input after the chip is deleted.
				htmlInput.focus();
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
		const { setInputRootRef } = React.useContext(MuiAutocompleteContext) ?? {};

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
				<Role
					{...props}
					ref={useMergedRefs(setHost, setInputRootRef, forwardedRef)}
				/>
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
