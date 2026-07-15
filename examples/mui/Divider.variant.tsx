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
				A center-aligned divider that occupies 50% of the available width
				provides a more subtle visual break. By leaving equal whitespace on both
				sides, it draws less attention than a full-width divider and can be used
				to separate related content while preserving a lighter, more balanced
				appearance.
			</Typography>
			<Divider variant="middle" margin />
			<Typography gutterBottom>
				An inset divider is offset from the leading edge of its container so it
				aligns with the content rather than spanning the full width. In Material
				UI, this variant is commonly used in lists to align the divider with
				list text while leaving space for icons, avatars, or other leading
				elements.
			</Typography>
			<Divider variant="inset" margin />
		</div>
	);
};
