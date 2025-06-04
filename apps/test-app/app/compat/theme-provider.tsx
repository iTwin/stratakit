/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ThemeProvider } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "ThemeProvider" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<ThemeProvider
				style={{
					border: "2px solid var(--iui-color-border)",
					background: "var(--iui-color-background)",
				}}
				includeCss
			>
				Content
			</ThemeProvider>
		</div>
	);
});
