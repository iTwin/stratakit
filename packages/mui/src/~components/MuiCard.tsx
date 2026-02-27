/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import {
	type BaseProps,
	forwardRef,
	useEventHandlers,
	useMergedRefs,
} from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiCardContext = React.createContext<
	| {
			actionAreaElement?: HTMLElement | null;
			setActionAreaElement: (element?: HTMLElement | null) => void;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

const MuiCard = forwardRef<"article", BaseProps<"article">>(
	(props, forwardedRef) => {
		const { role, ...rest } = props;
		const [actionAreaElement, setActionAreaElement] = React.useState<
			HTMLElement | undefined | null
		>(undefined);

		/** Captures clicks on the card and forwards them to MuiCardActionArea. */
		const handleActionAreaClick = (event: React.MouseEvent) => {
			if (!actionAreaElement) return;
			if (!(event.target instanceof Element)) return;

			// Ignore clicks on interactive elements inside the action area.
			if (event.target.closest("a, button, [role=button]")) return;

			// Ignore click if text selection is being made.
			const selection = window.getSelection();
			if (selection && !selection.isCollapsed) return;

			actionAreaElement.click();
		};

		return (
			<MuiCardContext.Provider
				value={{ actionAreaElement, setActionAreaElement }}
			>
				<Role
					render={<article />}
					{...rest}
					data-_sk-actionable={actionAreaElement ? "" : undefined}
					onClick={useEventHandlers(props.onClick, handleActionAreaClick)}
					ref={forwardedRef as React.Ref<HTMLDivElement>}
				/>
			</MuiCardContext.Provider>
		);
	},
);
DEV: MuiCard.displayName = "MuiCard";

// ----------------------------------------------------------------------------

const MuiCardActionArea = forwardRef<"button", BaseProps<"button">>(
	(props, forwardedRef) => {
		const { role, ...rest } = props;

		const context = React.useContext(MuiCardContext);

		return (
			<Role.button
				{...rest}
				ref={useMergedRefs(context?.setActionAreaElement, forwardedRef)}
			/>
		);
	},
);
DEV: MuiCardActionArea.displayName = "MuiCardActionArea";

// ----------------------------------------------------------------------------

export { MuiCard, MuiCardActionArea };
