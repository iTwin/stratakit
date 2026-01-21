/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Root } from "@stratakit/foundations";

export default function ExamplePreview({ exampleId }: { exampleId: string }) {
	const ExampleComponent = React.useMemo(
		() => React.lazy(() => import(`../examples/${exampleId}.tsx`)),
		[exampleId],
	);

	const colorScheme = useColorScheme();

	return (
		<Root colorScheme={colorScheme} density="dense" synchronizeColorScheme>
			<React.Suspense>
				<ExampleComponent />
			</React.Suspense>
		</Root>
	);
}

function useColorScheme(): "light" | "dark" {
	const prefersDarkQuery = React.useMemo(
		() => window.matchMedia("(prefers-color-scheme: dark)"),
		[],
	);

	return React.useSyncExternalStore(
		React.useCallback(
			(notify) => {
				prefersDarkQuery?.addEventListener("change", notify);
				window.addEventListener("color-scheme:change", notify);

				return () => {
					prefersDarkQuery?.removeEventListener("change", notify);
					window.removeEventListener("color-scheme:change", notify);
				};
			},
			[prefersDarkQuery],
		),
		() => {
			const localSetting = localStorage.getItem("color-scheme");
			if (localSetting === "light" || localSetting === "dark") {
				return localSetting;
			}
			return prefersDarkQuery.matches ? "dark" : "light";
		},
		() => "dark",
	);
}
