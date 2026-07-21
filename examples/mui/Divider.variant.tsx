/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default () => {
	return (
		<div>
			<Typography>
				A full-width divider spans the entire available width of its container,
				creating a strong visual separation between sections of content.
			</Typography>
			<Divider margin />
			<Typography gutterBottom>
				A middle divider provides a space between the edge of the container and
				the ends of the divider. This keeps the divider visually distinct from
				any container borders.
			</Typography>
			<Divider variant="middle" margin />
			<Typography gutterBottom>
				An inset divider is offset from the leading edge of its container so it
				aligns with the content rather than spanning the full width. In MUI,
				this variant is commonly used in lists to align the divider with list
				text while leaving space for icons, avatars, or other leading elements.
			</Typography>
			<Divider variant="inset" margin />
		</div>
	);
};
