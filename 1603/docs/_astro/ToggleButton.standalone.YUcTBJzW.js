var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@stratakit/mui";

import svgEdit from "@stratakit/icons/edit.svg";

export default () => {
	const [selected, setSelected] = React.useState(false);
	return (
		<ToggleButton
			value="edit"
			label="Edit"
			selected={selected}
			onChange={() => {
				setSelected((prev) => !prev);
			}}
		>
			<Icon href={svgEdit} />
		</ToggleButton>
	);
};
`;export{e as default};