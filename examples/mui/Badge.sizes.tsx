/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { Icon } from "@stratakit/mui";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<Stack
			spacing={2}
			direction="row"
			useFlexGap
			sx={{ alignItems: "center", flexWrap: "wrap" }}
		>
			<Badge
				badgeContent={
					<>
						<Icon href={svgPlaceholder} />
						Small
					</>
				}
				size="small"
				inline
			/>
			<Badge
				badgeContent={
					<>
						<Icon href={svgPlaceholder} />
						Medium
					</>
				}
				size="medium"
				inline
			/>
		</Stack>
	);
};
