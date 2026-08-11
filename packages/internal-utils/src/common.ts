/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// ----------------------------------------------------------------------------

/** See https://github.com/Microsoft/TypeScript/issues/29729 */
type AnyString = string & {};

// ----------------------------------------------------------------------------

/** Returns the value unchanged. */
const identity = <T>(value: T) => value;

// ----------------------------------------------------------------------------

export type { AnyString };

export { identity };
