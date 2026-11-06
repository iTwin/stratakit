/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import { svgAdd } from "@stratakit/icons/add";
import { Icon } from "@stratakit/mui";

export default () => {
	return <Button endIcon={<Icon href={svgAdd} />}>Create new</Button>;
};
