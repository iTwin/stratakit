/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import cx from "classnames";
import { useLatestRef, useSafeContext } from "./~hooks.js";
import { forwardRef, getOwnerDocument, parseDOM } from "./~utils.js";
import {
	HtmlSanitizerContext,
	spriteSheetId,
	useRootNode,
} from "./Root.internal.js";

import type { BaseProps } from "./~utils.js";

// ----------------------------------------------------------------------------

const DEFAULT_ICON_HASH = "#icon";

// ----------------------------------------------------------------------------

interface IconProps extends Omit<BaseProps<"svg">, "children"> {
	/**
	 * URL of the `.svg` file (e.g. from `@stratakit/icons`).
	 *
	 * The URL can contain a hash pointing to a specific symbol within the SVG (e.g. `#icon`, `#icon-large`).
	 * By default, the `#icon` symbol is used if no hash is provided.
	 *
	 * Note: The `.svg` must be an external HTTP resource for it to be processed by
	 * the `<use>` element. As a fallback, JS will be used to `fetch` the SVG from
	 * non-supported URLs; the fetched SVG content will be sanitized using the
	 * `unstable_htmlSanitizer` function passed to `<Root>`.
	 */
	href?: string;
	/**
	 * Size of the icon. This only affects the icon's physical dimensions (not the SVG contents).
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

// ----------------------------------------------------------------------------

/**
 * Icon component that provides fill and sizing to the SVGs from `@stratakit/icons`.
 *
 * ```tsx
 * const arrowIcon = new URL("@stratakit/icons/arrow.svg", import.meta.url).href;
 * <Icon href={arrowIcon} />
 * ```
 *
 * The `href` can point to a specific symbol (e.g. `#icon`, `#icon-large`) within the SVG file:
 *
 * ```tsx
 * <Icon href={`${arrowIcon}#icon-large`} />
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
export const Icon = forwardRef<"svg", IconProps>((props, forwardedRef) => {
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
			className={cx("🥝Icon", props.className)}
			ref={forwardedRef}
		>
			{hrefBase ? <use href={toIconHref(hrefBase)} /> : null}
		</Role.svg>
	);
});
DEV: Icon.displayName = "Icon";

// ----------------------------------------------------------------------------

/**
 * Constructs a final URL from the base.
 * Adds default hash (`#icon`) if the URL does not already contain a hash.
 */
function toIconHref(hrefBase: string) {
	if (!hrefBase.includes("#")) return `${hrefBase}${DEFAULT_ICON_HASH}`;
	return hrefBase;
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
	const generatedId = React.useId();
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
			const spriteSheet = ownerDocument?.getElementById(spriteSheetId);
			if (!rawHref || !ownerDocument || !spriteSheet) return () => {};

			// Browser will handle this.
			if (isHttpProtocol(rawHref, ownerDocument)) return () => {};

			// @ts-expect-error -- This is initialized in `<InlineSpriteSheet>`.
			const cache = spriteSheet[Symbol.for("🥝")]?.icons as Map<string, string>;
			if (!cache) return () => {};

			// Prefix for the inlined sprite ids. The rest is handled in `toIconHref`.
			const prefix = `🥝${generatedId}`;

			// Short-circuit if the symbol is already cached.
			if (cache.has(rawHref)) {
				inlineHref.current = cache.get(rawHref);
				notify();
				return () => {};
			}

			const abortController = new AbortController();
			const { signal } = abortController;

			// Make a network request
			(async () => {
				try {
					const response = await fetch(rawHref, { signal });
					if (!response.ok) throw new Error(`Failed to fetch ${rawHref}`);

					const hash = new URL(rawHref).hash || DEFAULT_ICON_HASH;

					// Find all `<symbol>` elements from the response.
					const fetchedSvgString = sanitizeHtml.current(await response.text());
					const parsedSvgContent = parseDOM(fetchedSvgString, {
						ownerDocument,
					});
					const symbols = parsedSvgContent.querySelectorAll("symbol");

					for (const symbol of symbols) {
						symbol.id = `${prefix}--${symbol.id}`; // unique ID, using `--` instead as the delimiter for icon-specific symbols.
						if (ownerDocument.getElementById(symbol.id)) continue; // Skip if already present.
						spriteSheet.appendChild(symbol.cloneNode(true)); // Store symbols in the spritesheet rendered by `<Root>`.
					}

					inlineHref.current = `#${prefix}--${hash.slice(1)}`; // Replacing `#` with `--`, per convention above.
					cache.set(rawHref, inlineHref.current); // Cache for future use.
					if (!signal.aborted) notify();
				} catch (error) {
					if (signal.aborted) return; // Ignore if aborted.
					console.error(error);
				}
			})();

			return () => abortController.abort(); // Cancel ongoing fetch.
		},
		[rawHref, rootNode, sanitizeHtml, generatedId],
	);

	return React.useSyncExternalStore(
		subscribe,
		getClientSnapshot,
		() => rawHref,
	);
}

// ----------------------------------------------------------------------------

/** Returns true if the url's protocol is http: or https: */
function isHttpProtocol(url: string, ownerDocument: Document) {
	const { protocol } = new URL(url, ownerDocument.baseURI);
	return ["http:", "https:"].includes(protocol);
}
