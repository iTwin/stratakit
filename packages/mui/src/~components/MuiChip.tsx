/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { VisuallyHidden } from "@ariakit/react/visually-hidden";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { DismissIcon } from "../Icon.js";

import type Chip from "@mui/material/Chip";

// ----------------------------------------------------------------------------

const MuiChipContext = React.createContext<
	| {
			labelId?: string;
			setLabelId: (id: string | undefined) => void;
			clearId?: string;
			isClickable: boolean;
			deleteLabel?: string;
	  }
	| undefined
>(undefined);

type ChipProps = React.ComponentProps<typeof Chip>;

interface MuiChipProps
	extends React.ComponentProps<"div">,
		Pick<ChipProps, "deleteLabel"> {}

const MuiChip = React.forwardRef<HTMLDivElement, MuiChipProps>(
	(props, forwardedRef) => {
		const { role, deleteLabel, ...rest } = props;

		const clearId = React.useId();
		const [labelId, setLabelId] = React.useState<string | undefined>(undefined);

		const isClickable = props.className?.includes("MuiChip-clickable") ?? false;
		return (
			<MuiChipContext.Provider
				value={{ labelId, setLabelId, clearId, isClickable, deleteLabel }}
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
DEV: MuiChip.displayName = "MuiChip";

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
DEV: MuiChipLabel.displayName = "MuiChipLabel";

// ----------------------------------------------------------------------------

const MuiChipDeleteIcon = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof IconButton>
>((props, forwardedRef) => {
	const theme = useTheme();
	const defaultLabel =
		theme.components?.MuiAutocomplete?.defaultProps?.clearText ?? "Clear";

	const {
		clearId,
		labelId,
		deleteLabel = defaultLabel,
	} = React.useContext(MuiChipContext) ?? {};

	return (
		<IconButton
			aria-labelledby={`${clearId} ${labelId}`}
			size="small"
			{...props}
			ref={forwardedRef}
		>
			<VisuallyHidden id={clearId}>{deleteLabel}</VisuallyHidden>
			<DismissIcon />
		</IconButton>
	);
});
DEV: MuiChipDeleteIcon.displayName = "MuiChipDeleteIcon";

// ----------------------------------------------------------------------------

export { MuiChip, MuiChipLabel, MuiChipDeleteIcon };
