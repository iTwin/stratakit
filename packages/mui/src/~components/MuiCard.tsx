/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Role } from "@ariakit/react/role";
import {
	forwardRef,
	useEventHandlers,
	useMergedRefs,
} from "@stratakit/foundations/secret-internals";
import { MuiButtonBase } from "./MuiButtonBase.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiCardContext = React.createContext<
	| {
			actionAreaElement?: HTMLElement | null;
			setActionAreaElement: (element?: HTMLElement | null) => void;

			titleElement?: HTMLElement | null;
			setTitleElement: (element?: HTMLElement | null) => void;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

const MuiCard = forwardRef<"article", BaseProps<"article">>(
	(props, forwardedRef) => {
		const [actionAreaElement, setActionAreaElement] = React.useState<
			HTMLElement | undefined | null
		>(undefined);
		const [titleElement, setTitleElement] = React.useState<
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
				value={{
					actionAreaElement,
					setActionAreaElement,
					titleElement,
					setTitleElement,
				}}
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
		const { registerActionAreaTitle } =
			React.useContext(MuiCardActionAreaContext) ?? {};
		const isInsideActionArea = Boolean(registerActionAreaTitle);

		const { children, ...rest } = props;

		React.useInsertionEffect(() => {
			return registerActionAreaTitle?.();
		}, [registerActionAreaTitle]);

		return (
			<Role.h2
				{...rest}
				ref={useMergedRefs(cardContext?.setTitleElement, forwardedRef)}
			>
				{(() => {
					// If CardActionArea is an ancestor of the title, then we portal the title text into the CardActionArea's button element.
					if (isInsideActionArea && cardContext?.actionAreaElement) {
						return ReactDOM.createPortal(
							children,
							cardContext.actionAreaElement,
						);
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
	{ registerActionAreaTitle: () => () => void } | undefined
>(undefined);

const MuiCardActionArea = forwardRef<"button", BaseProps<"button">>(
	(props, forwardedRef) => {
		const cardContext = React.useContext(MuiCardContext);

		const { children, ...rest } = props;

		const [containsTitle, setContainsTitle] = React.useState<
			boolean | undefined
		>(undefined);

		React.useInsertionEffect(() => {
			// Set it to false if it isn't already set (by CardHeaderTitle)
			setContainsTitle((containsTitle) => containsTitle ?? false);
		}, []);

		const registerActionAreaTitle = React.useCallback(() => {
			setContainsTitle(true);
			return () => setContainsTitle(false);
		}, []);

		return (
			<MuiCardActionAreaContext.Provider value={{ registerActionAreaTitle }}>
				{(() => {
					if (containsTitle === undefined) {
						return children;
					}

					// If the CardActionArea is rendered as an ancestor of the title, then we portal the button element into the title element.
					// This helps avoids potential accessibility issues (e.g. nested buttons, such as when using CardHeader's `action` prop).
					if (containsTitle) {
						return (
							<>
								{children}
								{cardContext?.titleElement &&
									ReactDOM.createPortal(
										<MuiCardActionAreaButton {...rest} ref={forwardedRef} />,
										cardContext.titleElement,
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

export { MuiCard, MuiCardActionArea, MuiCardHeaderTitle, MuiCardMedia };
