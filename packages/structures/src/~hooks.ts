/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";

// Minimal list to detect most common interactive elements.
const INTERACTIVE_CONTENT_SELECTOR = [
	"button",
	":any-link",
	"[tabindex='0']",
].join(",");

/**
 * Hook that logs a warning if any interactive content is found within the given element.
 * Should only be used in development.
 *
 * @private
 */
export function useWarnOnInteractiveDescendants(
	ref: React.RefObject<HTMLElement | undefined>,
	message: string,
) {
	const hasWarnedRef = React.useRef(false);
	React.useEffect(() => {
		const container = ref.current;

		if (hasWarnedRef.current) return;
		if (!container) return;

		const interactiveDescendant = container.querySelector(
			INTERACTIVE_CONTENT_SELECTOR,
		);
		if (!interactiveDescendant) return;

		hasWarnedRef.current = true;
		console.warn(message, {
			container,
			interactiveDescendant,
		});
	}, [message, ref.current]);
}
