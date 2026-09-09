/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

export function useColorScheme(): "light" | "dark" {
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
			try {
				const localSetting = JSON.parse(
					localStorage.getItem("🥝:settings") ?? "{}",
				)?.state?.colorScheme;
				if (localSetting === "light" || localSetting === "dark") {
					return localSetting;
				}
			} catch {}
			return prefersDarkQuery.matches ? "dark" : "light";
		},
		() => "dark",
	);
}
