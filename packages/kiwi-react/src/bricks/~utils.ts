/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
export const isBrowser = typeof document !== "undefined";

export const supportsPopover = isBrowser && "popover" in HTMLElement.prototype;
