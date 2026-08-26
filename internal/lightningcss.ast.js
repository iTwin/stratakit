/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**
 * Recursively deletes keys whose value is `null`, in place.
 *
 * LightningCSS writes `null` for the absent optional fields of a node it hands
 * to a visitor, then fails to deserialize those same `null`s if the node is
 * handed back: "expected an object-like struct named Specifier, found ()".
 * Omitting a key means what `null` meant, so dropping them loses nothing.
 *
 * Only a visitor that stores a node and re-emits it later makes that round
 * trip.
 *
 * @template T
 * @param {T} node
 * @returns {T} the same node, mutated
 */
export function dropNullValues(node) {
	if (!node || typeof node !== "object") return node;

	if (Array.isArray(node)) {
		for (const item of node) dropNullValues(item);
		return node;
	}

	for (const [key, value] of Object.entries(node)) {
		if (value === null) {
			delete (/** @type {Record<string, unknown>} */ (node)[key]);
		} else {
			dropNullValues(value);
		}
	}

	return node;
}
