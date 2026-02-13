/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Root } from "@stratakit/mui";
import { createRoot } from "react-dom/client";
import { useColorScheme } from "./~utils.ts";

// ----------------------------------------------------------------------------

let root: ReturnType<typeof createRoot> | undefined;

const elements = new Map<
	number,
	{ element: React.ReactNode; target: HTMLElement }
>();

const nextId = (() => {
	let id = 0;
	return () => id++;
})();

/** Render or re-render the ReactTree with the latest `elements` snapshot. */
function renderRoot() {
	React.startTransition(() => {
		if (!root) return;
		root.render(<ReactTree elements={[...elements.entries()]} />);
	});
}

// ----------------------------------------------------------------------------

/**
 * Renders a React element at the specified target node, while maintaining a single React tree.
 *
 * This is useful for rendering React examples under a single StrataKit `Root` (sharing theme and Context).
 * This is different from typical Astro islands that create a new React tree for each island.
 */
export function mountPortal({
	element,
	target,
}: {
	element: React.ReactNode;
	target: HTMLElement;
}) {
	if (!document.body.contains(target)) {
		console.error(
			"Target element is not in the document. The element will not be mounted.",
		);
		return;
	}

	const id = nextId();
	elements.set(id, { element, target });
	renderRoot(); // initial or re-render

	return function unmount() {
		if (elements.delete(id)) {
			renderRoot();
		}
	};
}

// ----------------------------------------------------------------------------

/* Injects a `<react-root>` element that does the initial render of the React tree. */
export function initializeStrataKitRoot() {
	if (root) return;

	const container = (() => {
		let el = document.querySelector("react-root");
		if (el) return el;
		el = document.createElement("react-root");
		document.body.appendChild(el);
		return el;
	})();

	root = createRoot(container);
	renderRoot();
}

// ----------------------------------------------------------------------------

/** Renders `elements` as portaled children under a single StrataKit `Root`.  */
function ReactTree({
	elements,
}: {
	elements: Array<[number, { element: React.ReactNode; target: HTMLElement }]>;
}) {
	return (
		<Root colorScheme={useColorScheme()}>
			{elements.map(([id, { element, target }]) =>
				ReactDOM.createPortal(
					<React.Fragment key={id}>{element}</React.Fragment>,
					target,
				),
			)}
		</Root>
	);
}
