/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { AlertTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import { ScreenShotWrapper } from "~/ScreenShotWrapper.tsx";
import { VaryPropsStack } from "~/VaryProps.tsx";

export function Visual() {
	const content =
		"An organization administrator must connect a billing account if you want to continue using this feature.";
	return (
		<ScreenShotWrapper>
			<Alert onClose={() => {}} sx={{ mb: 1 }}>
				<AlertTitle>Default Alert with Title</AlertTitle>
				{content}
			</Alert>
			<VaryPropsStack
				direction="column"
				component={Alert}
				staticProps={{ children: content }}
				variations={{
					variant: ["outlined", "filled"],
					severity: ["none", "info", "success", "warning", "error"],
				}}
			/>
		</ScreenShotWrapper>
	);
}
