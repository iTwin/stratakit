/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { VisuallyHidden } from "@ariakit/react/visually-hidden";
import MuiIconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { DismissIcon } from "../Icon.js";

// ----------------------------------------------------------------------------

const MuiChipContext = React.createContext<
	| {
			labelId?: string;
			setLabelId: (id: string | undefined) => void;
			clearId?: string;
			isClickable: boolean;
	  }
	| undefined
>(undefined);

const MuiChip = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
	(props, forwardedRef) => {
		const { role, ...rest } = props;

		const clearId = React.useId();
		const [labelId, setLabelId] = React.useState<string | undefined>(undefined);

		const isClickable = props.className?.includes("MuiChip-clickable") ?? false;
		return (
			<MuiChipContext.Provider
				value={{ labelId, setLabelId, clearId, isClickable }}
			>
				<Role.div
					{...rest}
					role={role === "button" ? undefined : role} // Chip is not interactive
					tabIndex={undefined} // Chip is not interactive
					ref={forwardedRef}
				/>
			</MuiChipContext.Provider>
		);
	},
);

// ----------------------------------------------------------------------------

const MuiChipLabel = React.forwardRef<
	HTMLSpanElement,
	React.ComponentProps<"span">
>((props, forwardedRef) => {
	const defaultId = React.useId();
	const { id = defaultId, ...rest } = props;

	const { setLabelId, isClickable } = React.useContext(MuiChipContext) ?? {};

	React.useEffect(() => {
		if (!setLabelId) return;
		setLabelId(id);
		return () => {
			setLabelId(undefined);
		};
	}, [id, setLabelId]);

	const Component = isClickable ? Role.button : Role.span;
	return (
		<Component
			id={id}
			{...rest}
			ref={forwardedRef as React.Ref<HTMLButtonElement>}
		/>
	);
});

// ----------------------------------------------------------------------------

const MuiChipDeleteIcon = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof MuiIconButton>
>((props, forwardedRef) => {
	const { clearId, labelId } = React.useContext(MuiChipContext) ?? {};

	const theme = useTheme();
	const label =
		theme.components?.MuiAutocomplete?.defaultProps?.clearText ?? "Clear";
	return (
		<MuiIconButton
			aria-labelledby={`${clearId} ${labelId}`}
			{...props}
			ref={forwardedRef}
		>
			<VisuallyHidden id={clearId}>{label}</VisuallyHidden>
			<DismissIcon />
		</MuiIconButton>
	);
});

// ----------------------------------------------------------------------------

export { MuiChip, MuiChipLabel, MuiChipDeleteIcon };
