/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

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

export { getOwnerDocument, getWindow, isBrowser, isDocument };
