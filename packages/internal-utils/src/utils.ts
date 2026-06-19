/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";

import type { FocusableProps as AkFocusableProps } from "@ariakit/react/focusable";
import type { RoleProps } from "@ariakit/react/role";
import type { ForwardRefHelper, MergeProps } from "./utils.internal.js";

// ----------------------------------------------------------------------------

const isBrowser = typeof document !== "undefined";

// ----------------------------------------------------------------------------

function isDocument(node?: Node): node is Document {
	return node?.nodeType === Node.DOCUMENT_NODE;
}

// ----------------------------------------------------------------------------

function getOwnerDocument(node?: Node | null) {
	if (!node) return null;
	return (isDocument(node) ? node : node.ownerDocument) || null;
}

// ----------------------------------------------------------------------------

function getWindow(node: Node) {
	const ownerDocument = getOwnerDocument(node);
	return ownerDocument?.defaultView || null;
}

// ----------------------------------------------------------------------------

/** "Parses" a string of HTML into a DocumentFragment. */
function parseDOM(
	htmlString: string,
	{ ownerDocument }: { ownerDocument: Document },
) {
	const template = ownerDocument.createElement("template");
	template.innerHTML = htmlString;
	return template.content;
}

// ----------------------------------------------------------------------------

/**
 * Wrapper over `React.forwardRef` which allows refs to be loosely typed as `HTMLElement`.
 *
 * Usage:
 *
 * ```tsx
 * const Button = forwardRef<"button", ButtonProps>((props, forwardedRef) => {});
 *
 * const ref = React.useRef<HTMLElement>(null); // or React.useRef<HTMLButtonElement>(null)
 * <Button ref={ref} />
 * ```
 *
 * **Note**: The first type parameter is the default element type, which is slightly different
 * from what `React.forwardRef` expects. e.g. This utility expects `"div"` instead of `ComponentRef<"div">`.
 */
const forwardRef = React.forwardRef as ForwardRefHelper;

// ----------------------------------------------------------------------------

/** Base component props with custom props. */
type BaseProps<ElementType extends React.ElementType = "div"> = MergeProps<
	ElementType,
	Pick<RoleProps, "render">
>;

// ----------------------------------------------------------------------------

/** Focusable component props with custom props. */
type FocusableProps<ElementType extends React.ElementType = "div"> =
	BaseProps<ElementType> &
		Pick<AkFocusableProps, "disabled" | "accessibleWhenDisabled" | "autoFocus">;

// ----------------------------------------------------------------------------

/** See https://github.com/Microsoft/TypeScript/issues/29729 */
type AnyString = string & {};

// ----------------------------------------------------------------------------

/** Returns the value unchanged. */
const identity = <T>(value: T) => value;

// ----------------------------------------------------------------------------

export type { AnyString, BaseProps, FocusableProps };

export {
	forwardRef,
	getOwnerDocument,
	getWindow,
	identity,
	isBrowser,
	isDocument,
	parseDOM,
};
