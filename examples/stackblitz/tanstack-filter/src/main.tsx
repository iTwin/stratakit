/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Root } from "@stratakit/mui";
import { createRoot } from "react-dom/client";
import TanstackFilter from "./Tanstack.filter.tsx";

const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
const defaultColorScheme = prefersDark ? "dark" : "light";

const root = document.getElementById("root");
if (!root) throw new Error("#root element not found");

createRoot(root).render(
	<React.StrictMode>
		<Root colorScheme={defaultColorScheme}>
			<TanstackFilter />
		</Root>
	</React.StrictMode>,
);
