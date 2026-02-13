/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { VisuallyHidden } from "@ariakit/react/visually-hidden";
import MuiIconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { DismissIcon } from "./Icon.js";

// ----------------------------------------------------------------------------

const ChipContext = React.createContext<
	| {
			labelId?: string;
			setLabelId: (id: string | undefined) => void;
			clearId?: string;
			dataTagIndex?: number;
	  }
	| undefined
>(undefined);

interface ChipProps extends React.ComponentProps<"div"> {
	// Used by `Autocomplete`.
	"data-tag-index"?: number;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
	(props, forwardedRef) => {
		const clearId = React.useId();
		const [labelId, setLabelId] = React.useState<string | undefined>(undefined);
		const {
			tabIndex: tabIndexProp,
			role: roleProp,
			"data-tag-index": dataTagIndex,
			...rest
		} = props;
		const isClickable = props.className?.includes("MuiChip-clickable");
		return (
			<ChipContext.Provider
				value={{ labelId, setLabelId, clearId, dataTagIndex }}
			>
				<Role.div
					tabIndex={isClickable ? tabIndexProp : undefined}
					role={roleProp === "button" && !isClickable ? undefined : roleProp}
					{...rest}
					ref={forwardedRef}
					slot="chips"
				/>
			</ChipContext.Provider>
		);
	},
);

// ----------------------------------------------------------------------------

const ChipLabel = React.forwardRef<
	HTMLSpanElement,
	React.ComponentProps<"span">
>((props, forwardedRef) => {
	const defaultId = React.useId();
	const { id = defaultId, ...rest } = props;
	const { setLabelId } = React.useContext(ChipContext) ?? {};
	React.useEffect(() => {
		if (!setLabelId) return;
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
	const { clearId, labelId, dataTagIndex } =
		React.useContext(ChipContext) ?? {};
	const theme = useTheme();
	const label =
		theme.components?.MuiAutocomplete?.defaultProps?.clearText ?? "Clear";
	return (
		<MuiIconButton
			aria-labelledby={`${clearId} ${labelId}`}
			// Let Autocomplete focus the dismiss button, instead of the tag
			data-tag-index={dataTagIndex}
			onKeyDown={(e) => {
				// Stop Autocomplete from handling the event: focusing the input prevents the click
				e.stopPropagation();
			}}
			{...props}
			ref={forwardedRef}
		>
			<VisuallyHidden id={clearId}>{label}</VisuallyHidden>
			<DismissIcon />
		</MuiIconButton>
	);
});

// ----------------------------------------------------------------------------

export { Chip, ChipLabel, ChipDeleteIcon };
