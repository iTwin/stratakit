/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

/**
 * A component used to display content in a non-modal window overlay that is placed relative to a trigger element.
 */
const Popover = forwardRef<"div", BaseProps>((_props, _forwardedRef) => {
	return <>Popover</>;
});
DEV: Popover.displayName = "Popover";

// ----------------------------------------------------------------------------

export default Popover;
