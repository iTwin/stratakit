/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";

import type { FocusableProps as AkFocusableProps } from "@ariakit/react/focusable";
import type { RoleProps } from "@ariakit/react/role";

// ----------------------------------------------------------------------------

export const isBrowser = typeof document !== "undefined";

export const supportsPopover = isBrowser && "popover" in HTMLElement.prototype;

export function isDocument(node?: Node): node is Document {
	return node?.nodeType === Node.DOCUMENT_NODE;
}

export function getOwnerDocument(node?: Node | null) {
	if (!node) return null;
	return (isDocument(node) ? node : node.ownerDocument) || null;
}

/** "Parses" a string of HTML into a DocumentFragment. */
export function parseDOM(
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
 *
 * @private
 */
export const forwardRef = React.forwardRef as ForwardRefHelper;

type ForwardRefHelper = <
	DefaultElement extends React.ElementType,
	Props extends {},
>(
	render: React.ForwardRefRenderFunction<
		React.ComponentRef<DefaultElement>,
		React.PropsWithoutRef<Props>
	>,
) => React.ForwardRefExoticComponent<
	React.PropsWithoutRef<Props> &
		React.RefAttributes<React.ComponentRef<DefaultElement> | HTMLElement>
>;

// ----------------------------------------------------------------------------

/** Element type props merged with custom props. */
type MergeProps<
	ElementType extends React.ElementType,
	CustomProps extends Record<string, unknown>,
> = CustomProps &
	Omit<React.ComponentPropsWithoutRef<ElementType>, keyof CustomProps>;

/** Base component props with custom props. */
export type BaseProps<ElementType extends React.ElementType = "div"> =
	MergeProps<ElementType, Pick<RoleProps, "render">>;

/** Focusable component props with custom props. */
export type FocusableProps<ElementType extends React.ElementType = "div"> =
	BaseProps<ElementType> &
		Pick<AkFocusableProps, "disabled" | "accessibleWhenDisabled" | "autoFocus">;

// ----------------------------------------------------------------------------

/** See https://github.com/Microsoft/TypeScript/issues/29729 */
export type AnyString = string & {};

// ----------------------------------------------------------------------------

/** Returns the value unchanged. */
export const identity = <T,>(value: T) => value;
