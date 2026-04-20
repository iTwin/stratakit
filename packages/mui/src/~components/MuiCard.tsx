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
import { MuiButtonBase } from "./MuiButtonBase.js";

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
			<MuiButtonBase
				{...rest}
				ref={useMergedRefs(context?.setActionAreaElement, forwardedRef)}
			/>
		);
	},
);
DEV: MuiCardActionArea.displayName = "MuiCardActionArea";

// ----------------------------------------------------------------------------

const MEDIA_COMPONENTS = ["audio", "iframe", "img", "picture", "video"];

/** Extracts the URL string inside `backgroundImage: url(…)`. */
function extractBackgroundImageUrl(style: React.CSSProperties | undefined) {
	const backgroundImage = style?.backgroundImage;
	if (!backgroundImage?.startsWith("url(")) return undefined;
	if (!['"', "'"].includes(backgroundImage[4])) return undefined;
	return backgroundImage.slice(5, -2);
}

const MuiCardMedia = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const [tagName, setTagName] = React.useState<string | undefined>(undefined);
		const determineTagName = React.useCallback(
			(element: HTMLElement | null) => {
				if (!element) return;
				setTagName(element.tagName.toLowerCase());
			},
			[],
		);

		const isMediaComponent = MEDIA_COMPONENTS.includes(tagName ?? "");

		// Inferring `src` from `background-image` (if `image` prop is passed).
		const src = isMediaComponent
			? extractBackgroundImageUrl(props.style)
			: undefined;

		// Removing `background-image` from media elements. These should use `src` instead.
		const style = (() => {
			if (!isMediaComponent) return props.style;
			const { backgroundImage, ...restStyle } = props.style ?? {};
			return restStyle;
		})();

		// Removing redundant role.
		const role = (() => {
			if (!isMediaComponent) return props.role;
			if (props.role === "img") return undefined;
			return props.role;
		})();

		return (
			<Role.div
				{...props}
				{...(src ? { src } : {})}
				role={role}
				style={style}
				ref={useMergedRefs(determineTagName, forwardedRef)}
			/>
		);
	},
);
DEV: MuiCardMedia.displayName = "MuiCardMedia";

// ----------------------------------------------------------------------------

export { MuiCard, MuiCardActionArea, MuiCardMedia };
