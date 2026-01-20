/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Label, TextBox } from "@stratakit/bricks";
import * as React from "react";

export default () => {
	const inputId = React.useId();
	return (
		<>
			<Label htmlFor={inputId}>Name </Label>
			<TextBox.Input id={inputId} />
		</>
	);
};
