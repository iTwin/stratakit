/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Root } from "@stratakit/mui";

// ----------------------------------------------------------------------------

// Pre-calculate all example modules so Vite can statically analyze them for bundling.
// This requires that the path to examples dir is hardcoded (i.e. no dynamic expressions).
const exampleModules = {
	bricks: import.meta.glob("../../../../examples/bricks/*.tsx"),
	structures: import.meta.glob("../../../../examples/structures/*.tsx"),
	mui: import.meta.glob("../../../../examples/mui/*.tsx"),
} as const;

// ----------------------------------------------------------------------------

export default function ExamplePreview({
	exampleName,
	packageName,
}: {
	exampleName: string;
	packageName: string;
}) {
	const ExampleComponent = React.useMemo(() => {
		const modules = exampleModules[packageName as keyof typeof exampleModules];
		const modulePath = `../../../../examples/${packageName}/${exampleName}.tsx`;
		const lazyImport = modules[modulePath] as () => Promise<{
			default: React.ComponentType;
		}>;
		return React.lazy(lazyImport);
	}, [exampleName, packageName]);

	const colorScheme = useColorScheme();

	return (
		<Root colorScheme={colorScheme}>
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
