/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import MuiIconButton from "@mui/material/IconButton";
import MuiOutlinedInput from "@mui/material/OutlinedInput";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { useSafeContext } from "@stratakit/foundations/secret-internals";
import { DismissIcon } from "./Icon.js";

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
	React.ComponentProps<"div">
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

const ChipContext = React.createContext<
	| {
			labelId?: string;
			setLabelId: (id: string | undefined) => void;
			dismissId?: string;
			dataTagIndex?: number;
	  }
	| undefined
>(undefined);

const Chip = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div"> & {
		"data-tag-index"?: number;
	}
>((props, forwardedRef) => {
	const dismissId = React.useId();
	const [labelId, setLabelId] = React.useState<string | undefined>(undefined);
	const { tabIndex, "data-tag-index": dataTagIndex, ...rest } = props;
	return (
		<ChipContext.Provider
			value={{ labelId, setLabelId, dismissId, dataTagIndex }}
		>
			<div {...rest} ref={forwardedRef} />
		</ChipContext.Provider>
	);
});

// ----------------------------------------------------------------------------

const ChipLabel = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"span">
>((props, forwardedRef) => {
	const defaultId = React.useId();
	const { id = defaultId, ...rest } = props;
	const { setLabelId } = useSafeContext(ChipContext);
	React.useEffect(() => {
		setLabelId(id);
		return () => {
			setLabelId(undefined);
		};
	}, [id, setLabelId]);
	return <span id={id} {...rest} ref={forwardedRef} />;
});

// ----------------------------------------------------------------------------

const ChipDeleteIcon = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof MuiIconButton>
>((props, forwardedRef) => {
	const { dismissId, labelId, dataTagIndex } = useSafeContext(ChipContext);
	return (
		<MuiIconButton
			aria-labelledby={`${dismissId} ${labelId}`}
			// Let Autocomplete focus the dismiss button, instead of the tag
			data-tag-index={dataTagIndex}
			onKeyDown={(e) => {
				switch (e.key) {
					case "Enter": {
						// Stop Autocomplete from focusing the input, preventing the click
						e.stopPropagation();
					}
				}
			}}
			{...props}
			ref={forwardedRef}
		>
			<span id={dismissId} style={visuallyHidden}>
				Dismiss
			</span>
			<DismissIcon />
		</MuiIconButton>
	);
});

// ----------------------------------------------------------------------------

export {
	FormControl,
	FormLabel,
	TextFieldInput,
	Chip,
	ChipLabel,
	ChipDeleteIcon,
};
