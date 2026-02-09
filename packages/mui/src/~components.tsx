/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import MuiOutlinedInput from "@mui/material/OutlinedInput";
import { useSafeContext } from "@stratakit/foundations/secret-internals";

import type MuiFormControl from "@mui/material/FormControl";
import type { TextFieldOwnerState } from "@mui/material/TextField";

const FormControlContext = React.createContext<
	| {
			setLabelId: (id: string | undefined) => void;
			setIsAutocomplete: (isAutocomplete: boolean) => void;
	  }
	| undefined
>(undefined);

const FormControl = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<typeof MuiFormControl>
>((props, forwardedRef) => {
	const [labelId, setLabelId] = React.useState<string | undefined>(undefined);
	// Needed since Autocomplete doesn't support `component` prop
	const [isAutocomplete, setIsAutocomplete] = React.useState<boolean>(false);
	return (
		<FormControlContext.Provider value={{ setLabelId, setIsAutocomplete }}>
			<div
				// Add group role to FormControl used in Autocomplete
				role={isAutocomplete ? "group" : undefined}
				aria-labelledby={isAutocomplete ? labelId : undefined}
				{...props}
				ref={forwardedRef}
			/>
		</FormControlContext.Provider>
	);
});

// ----------------------------------------------------------------------------

const FormLabel = React.forwardRef<
	HTMLLabelElement,
	React.ComponentProps<"label">
>((props, forwardedRef) => {
	const { setLabelId } = useSafeContext(FormControlContext);
	React.useEffect(() => {
		setLabelId(props.id);
		return () => {
			setLabelId(undefined);
		};
	}, [props.id, setLabelId]);
	return <label {...props} ref={forwardedRef} />;
});

// ----------------------------------------------------------------------------

const TextFieldInput = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<typeof MuiOutlinedInput> & {
		ownerState?: TextFieldOwnerState;
	}
>((props, forwardedRef) => {
	const { setIsAutocomplete } = React.useContext(FormControlContext) ?? {};
	// Determine if the input is part of an Autocomplete
	const isAutocomplete =
		props.className?.includes("MuiAutocomplete-inputRoot") || false;
	React.useEffect(() => {
		if (!setIsAutocomplete) return;
		setIsAutocomplete(isAutocomplete);
		return () => {
			setIsAutocomplete(false);
		};
	}, [isAutocomplete, setIsAutocomplete]);
	return <MuiOutlinedInput {...props} ref={forwardedRef} />;
});

// ----------------------------------------------------------------------------

export { FormControl, FormLabel, TextFieldInput };
