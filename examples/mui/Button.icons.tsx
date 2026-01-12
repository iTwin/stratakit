/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import { Icon } from "@stratakit/mui";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<>
			<Button startIcon={<Icon href={placeholderIcon} />}>Start icon</Button>
			<Button endIcon={<Icon href={placeholderIcon} />}>End icon</Button>
			<Button
				startIcon={<Icon href={placeholderIcon} />}
				endIcon={<Icon href={placeholderIcon} />}
			>
				Both icons
			</Button>
		</>
	);
};
