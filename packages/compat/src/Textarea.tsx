/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { TextBox } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Textarea as IuiTextarea } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiTextareaProps = React.ComponentProps<typeof IuiTextarea>;

interface TextareaProps extends Pick<IuiTextareaProps, "status"> {
	/** NOT IMPLEMENTED. */
	status?: IuiTextareaProps["status"];
}

/** @see https://itwinui.bentley.com/docs/textarea */
export const Textarea = React.forwardRef((props, forwardedRef) => {
	const {
		// biome-ignore lint/correctness/noUnusedVariables: NOT IMPLEMENTED.
		status,
		...rest
	} = useCompatProps(props);

	return <TextBox.Textarea {...rest} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"textarea", TextareaProps>;
DEV: Textarea.displayName = "Textarea";
