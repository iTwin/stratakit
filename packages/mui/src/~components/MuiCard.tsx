/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Role } from "@ariakit/react/role";
import {
	useEventHandlers,
	useMergedRefs,
} from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";
import { MuiButtonBase } from "./MuiButtonBase.js";

import type { BaseProps } from "@stratakit/internal-utils/props";

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
					{...props}
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

const MuiCardHeaderTitle = forwardRef<"h2", BaseProps<"h2">>(
	(props, forwardedRef) => {
		const cardContext = React.useContext(MuiCardContext);
		const cardActionAreaContext = React.useContext(MuiCardActionAreaContext);

		const { children, ...rest } = props;

		return (
			<Role.h2
				{...rest}
				ref={useMergedRefs(
					cardActionAreaContext?.setTitleElement,
					forwardedRef,
				)}
			>
				{(() => {
					// If CardActionArea is an ancestor of the title, then we portal the title content into the CardActionArea's button element.
					if (cardActionAreaContext) {
						return cardContext?.actionAreaElement
							? ReactDOM.createPortal(children, cardContext.actionAreaElement)
							: null;
					}
					return children;
				})()}
			</Role.h2>
		);
	},
);
DEV: MuiCardHeaderTitle.displayName = "MuiCardHeaderTitle";

// ----------------------------------------------------------------------------

const MuiCardActionAreaContext = React.createContext<
	{ setTitleElement: (element?: HTMLElement | null) => void } | undefined
>(undefined);

const MuiCardActionArea = forwardRef<"button", BaseProps<"button">>(
	(props, forwardedRef) => {
		const { children, ...rest } = props;

		// This gets populated by a descendant CardHeaderTitle
		const [titleElement, setTitleElement] = React.useState<
			HTMLElement | undefined | null
		>(undefined);

		return (
			<MuiCardActionAreaContext.Provider value={{ setTitleElement }}>
				{(() => {
					// If the CardActionArea is rendered as an ancestor of the title, then we portal the button element into the title element.
					// This helps avoids potential accessibility issues (e.g. nested buttons, such as when using CardHeader's `action` prop).
					if (titleElement) {
						return (
							<>
								{children}
								{ReactDOM.createPortal(
									<MuiCardActionAreaButton {...rest} ref={forwardedRef} />,
									titleElement,
								)}
							</>
						);
					}

					return (
						<MuiCardActionAreaButton {...rest} ref={forwardedRef}>
							{children}
						</MuiCardActionAreaButton>
					);
				})()}
			</MuiCardActionAreaContext.Provider>
		);
	},
);
DEV: MuiCardActionArea.displayName = "MuiCardActionArea";

const MuiCardActionAreaButton = forwardRef<"button", BaseProps<"button">>(
	(props, forwardedRef) => {
		const cardContext = React.useContext(MuiCardContext);

		return (
			<MuiButtonBase
				{...props}
				ref={useMergedRefs(cardContext?.setActionAreaElement, forwardedRef)}
			/>
		);
	},
);
DEV: MuiCardActionAreaButton.displayName = "MuiCardActionAreaButton";

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
			const { backgroundImage: _, ...restStyle } = props.style ?? {};
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

export { MuiCard, MuiCardActionArea, MuiCardHeaderTitle, MuiCardMedia };
