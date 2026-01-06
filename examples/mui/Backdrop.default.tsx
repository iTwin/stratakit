/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useState } from "react";
import { Backdrop, Button } from "@mui/material";

export default () => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<Button onClick={() => setOpen(true)}>Show backdrop</Button>
			<Backdrop
				open={open}
				onClick={() => setOpen(false)}
				style={{ zIndex: "var(--stratakit-mui-zIndex-modal)" }}
			/>
		</div>
	);
};
