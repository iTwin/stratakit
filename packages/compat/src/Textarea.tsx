/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field, TextBox } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.js";

import type { Textarea as IuiTextarea } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

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
		id,
		...rest
	} = useCompatProps(props);

	return (
		<Field.Control
			render={<TextBox.Textarea {...rest} />}
			ref={forwardedRef}
			id={id}
		/>
	);
}) as PolymorphicForwardRefComponent<"textarea", TextareaProps>;
DEV: Textarea.displayName = "Textarea";
