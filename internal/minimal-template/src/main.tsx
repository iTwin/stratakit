import * as React from "react";
import { Root } from "@stratakit/mui";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
const defaultColorScheme = prefersDark ? "dark" : "light";

const root = document.getElementById("root");
if (!root) throw new Error("#root element not found");

createRoot(root).render(
	<React.StrictMode>
		<Root colorScheme={defaultColorScheme}>
			<App />
		</Root>
	</React.StrictMode>,
);
