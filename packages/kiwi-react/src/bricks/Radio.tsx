/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";

interface RadioProps extends Ariakit.RadioProps {}

export const Radio = React.forwardRef<
	React.ElementRef<typeof Ariakit.Radio>,
	RadioProps
>((props, forwardedRef) => {
	return <Ariakit.Radio accessibleWhenDisabled {...props} ref={forwardedRef} />;
});
