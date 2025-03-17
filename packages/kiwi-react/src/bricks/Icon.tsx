/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import {
	forwardRef,
	getOwnerDocument,
	hash,
	type BaseProps,
} from "./~utils.js";
import {
	HtmlSanitizerContext,
	spriteSheetId,
	useRootNode,
} from "./Root.internal.js";
import { useLatestRef, useSafeContext } from "./~hooks.js";

interface IconProps extends Omit<BaseProps<"svg">, "children"> {
	/**
	 * URL of the symbol sprite.
	 *
	 * Should be a URL to an `.svg` file from `@itwin/itwinui-icons`.
	 *
	 * Note: The `.svg` must be an external HTTP resource for it to be processed by
	 * the `<use>` element. As a fallback, JS will be used to `fetch` the SVG from
	 * non-supported URLs; the fetched SVG content will be sanitized using the
	 * `unstable_htmlSanitizer` function passed to `<Root>`.
	 */
	href?: string;
	/**
	 * Size of the icon. This affects the icon's physical dimensions, as well as the
	 * actual SVG contents (different sizes might have different fidelity).
	 *
	 * Defaults to `"regular"` (16px) and can be optionally set to `"large"` (24px).
	 */
	size?: "regular" | "large";
	/**
	 * Alternative text describing the icon.
	 *
	 * When this prop is passed, the SVG gets rendered as `role="img"` and labelled
	 * using the provided text.
	 *
	 * This prop is not required if the icon is purely decorative. By default, the icon
	 * will be hidden from the accessibility tree.
	 */
	alt?: string;
}

/**
 * Icon component that provides fill and sizing to the SVGs from `@itwin/itwinui-icons`.
 * It renders the correct symbol sprite based on the specified `size`.
 *
 * ```tsx
 * const arrowIcon = new URL("@itwin/itwinui-icons/arrow.svg", import.meta.url).href;
 * <Icon href={arrowIcon} />
 * ```
 *
 * It also accepts a custom SVG, via the `render `prop:
 *
 * ```tsx
 * <Icon render={<svg><path d="…" fill="currentColor" /></svg>} />
 * ```
 *
 * By default, this component assumes that the icon is decorative, so it adds `aria-hidden` by default.
 *
 * If the icon is semantically meaningful, the `alt` prop can be used to provide alternative text.
 *
 * ```tsx
 * <Icon href={…} alt="Help" />
 * ```
 */
export const Icon = React.memo(
	forwardRef<"svg", IconProps>((props, forwardedRef) => {
		const { href: hrefProp, size, alt, ...rest } = props;

		const isDecorative = !alt;
		const hrefBase = useNormalizedHrefBase(hrefProp);

		return (
			<Role.svg
				aria-hidden={isDecorative ? "true" : undefined}
				role={isDecorative ? undefined : "img"}
				aria-label={isDecorative ? undefined : alt}
				{...rest}
				data-kiwi-size={size}
				className={cx("🥝-icon", props.className)}
				ref={forwardedRef}
			>
				{hrefBase ? <use href={toIconHref(hrefBase, size)} /> : null}
			</Role.svg>
		);
	}),
);
DEV: Icon.displayName = "Icon";

// ----------------------------------------------------------------------------

function toIconHref(hrefBase: string, size: IconProps["size"]) {
	const separator = hrefBase.includes("#") ? "--" : "#";
	const suffix = toIconId(size);
	return `${hrefBase}${separator}${suffix}`;
}

function toIconId(size: IconProps["size"]) {
	if (size === "large") return "icon-large";
	return "icon";
}

// ----------------------------------------------------------------------------

/**
 * Handles runtime fallback of URLs that are not natively supported in `<use href="…">`.
 *
 * When the URL protocol is not HTTP/HTTPS, the SVG content is fetched from the URL,
 * and the symbols are stored as same-document fragments. This makes it possible to refer
 * to the symbols using `<use href="#…">`.
 */
function useNormalizedHrefBase(rawHref: string | undefined) {
	const sanitizeHtml = useLatestRef(useSafeContext(HtmlSanitizerContext));
	const rootNode = useRootNode();
	const inlineHref = React.useRef<string | undefined>(undefined);

	const getClientSnapshot = () => {
		const ownerDocument = getOwnerDocument(rootNode);
		if (!rawHref || !ownerDocument) return undefined;

		// Browser will handle this.
		if (isHttpProtocol(rawHref, ownerDocument)) return rawHref;

		return inlineHref.current;
	};

	const subscribe = React.useCallback(
		(notify: () => void) => {
			const ownerDocument = getOwnerDocument(rootNode);
			if (!rawHref || !ownerDocument) return () => {};

			// Browser will handle this.
			if (isHttpProtocol(rawHref, ownerDocument)) return () => {};

			// Prefix for the inlined sprite ids. The rest is handled in `toIconHref`.
			const id = `🥝${hash(rawHref)}`;
			const href = `#${id}`;

			// Short-circuit if the inline sprite is already present in the document.
			if (ownerDocument.querySelector(`symbol[data-kiwi-symbol="${id}"]`)) {
				inlineHref.current = href;
				notify();
				return () => {};
			}

			const abortController = new AbortController();
			const { signal } = abortController;

			fetch(rawHref, { signal }).then(async (response) => {
				if (!response.ok) throw new Error(`Failed to fetch ${rawHref}`);

				const svgString = sanitizeHtml.current(await response.text());
				const template = Object.assign(
					ownerDocument.createElement("template"),
					{ innerHTML: svgString },
				);
				const symbols = template.content.querySelectorAll("symbol");

				for (const symbol of symbols) {
					symbol.id = `${id}--${symbol.id}`;
					symbol.dataset.kiwiSymbol = id;

					// Skip if already present.
					if (ownerDocument.getElementById(symbol.id)) continue;

					// Store symbols in the spritesheet rendered by the <Root>.
					ownerDocument
						.getElementById(spriteSheetId)
						?.appendChild(symbol.cloneNode(true));
				}

				inlineHref.current = href;
				notify();
			});

			return () => abortController.abort(); // Cancel ongoing fetch.
		},
		[rawHref, rootNode, sanitizeHtml],
	);

	return React.useSyncExternalStore(
		subscribe,
		getClientSnapshot,
		() => rawHref,
	);
}

/** Returns true if the url's protocol is http: or https: */
function isHttpProtocol(url: string, ownerDocument: Document) {
	const { protocol } = new URL(url, ownerDocument.baseURI);
	return ["http:", "https:"].includes(protocol);
}

// ----------------------------------------------------------------------------

interface DisclosureArrowProps extends Omit<BaseProps<"svg">, "children"> {
	/**
	 * Which direction should the arrow point towards?
	 * @default "down"
	 */
	direction?: "down" | "right";
}

export const DisclosureArrow = forwardRef<"svg", DisclosureArrowProps>(
	(props, forwardedRef) => {
		const { direction = "down", ...rest } = props;

		const path = React.useMemo(() => {
			switch (direction) {
				case "down":
					return <path d="M8 10 5 7h6l-3 3Z" />;
				case "right":
					return <path d="M7 11V5l3 3-3 3Z" />;
			}
		}, [direction]);

		return (
			<Icon
				{...rest}
				render={
					<Role.svg
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
						render={props.render}
					>
						{path}
					</Role.svg>
				}
				className={cx("🥝-disclosure-arrow", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DisclosureArrow.displayName = "DisclosureArrow";

// ----------------------------------------------------------------------------

interface CheckmarkProps extends Omit<BaseProps<"svg">, "children"> {}

export const Checkmark = forwardRef<"svg", CheckmarkProps>(
	(props, forwardedRef) => {
		return (
			<Icon
				{...props}
				render={
					<Role.svg
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
						render={props.render}
					>
						<path
							fillRule="evenodd"
							d="M13.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0Z"
							clipRule="evenodd"
						/>
					</Role.svg>
				}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: Checkmark.displayName = "Checkmark";

// ----------------------------------------------------------------------------

interface DismissProps extends Omit<BaseProps<"svg">, "children"> {}

export const Dismiss = forwardRef<"svg", DismissProps>(
	(props, forwardedRef) => {
		return (
			<Icon
				{...props}
				render={
					<Role.svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="currentColor"
						render={props.render}
					>
						<path d="M4.853 4.146a.5.5 0 1 0-.707.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .707.708L8 8.707l3.146 3.147a.5.5 0 0 0 .707-.708L8.707 8l3.146-3.146a.5.5 0 1 0-.707-.708L8 7.293 4.853 4.146Z" />
					</Role.svg>
				}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: Dismiss.displayName = "Dismiss";
