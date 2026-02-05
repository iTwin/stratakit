/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import MuiIconButton from "@mui/material/IconButton";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { useSafeContext } from "@stratakit/foundations/secret-internals";
import { DismissIcon } from "./Icon.js";

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

export { Chip, ChipLabel, ChipDeleteIcon };
