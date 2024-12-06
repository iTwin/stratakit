/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useSearchParams } from "react-router";

export type VariantProps = Record<string, string>;

/**
 * Define a page that can have multiple variants based on the query params.
 *
 * The first argument is the default variant. The second argument defines other variants
 * as an object mapping query params to components. When a query param is present, the
 * corresponding component is rendered.
 *
 * Every variant is passed the query params as props.
 *
 * Usage:
 * ```tsx
 * export default definePage(
 *   function Page(searchParams) {…},
 *   {
 *     visual: function VisualTest(searchParams) {…}, // matches `?visual=true`
 *     // …
 *   },
 * );
 * ```
 */
export function definePage(
	DefaultVariant: React.FC<VariantProps>,
	otherVariants?: Record<string, React.FC<VariantProps>>,
) {
	return () => {
		const searchParams = useNormalizedSearchParams();

		for (const [variantName, Variant] of Object.entries(otherVariants ?? {})) {
			if (variantName in searchParams) {
				return <Variant {...searchParams} />;
			}
		}

		return <DefaultVariant {...searchParams} />;
	};
}

// ----------------------------------------------------------------------------

export function useColorScheme() {
	const query = "(prefers-color-scheme: dark)";

	const getSnapshot = React.useCallback(() => {
		if (typeof window === "undefined") return "dark";
		return window.matchMedia?.(query).matches ? "dark" : "light";
	}, []);

	const subscribe = React.useCallback((onChange: () => void) => {
		const mediaQueryList = window.matchMedia?.(query);
		mediaQueryList?.addEventListener?.("change", onChange);
		return () => mediaQueryList?.removeEventListener?.("change", onChange);
	}, []);

	return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

// ----------------------------------------------------------------------------

function useNormalizedSearchParams() {
	const [searchParams] = useSearchParams();

	return React.useMemo(
		() =>
			Object.fromEntries(
				Array.from(searchParams).map(([key, value]) => [
					key,
					// Normalize boolean-ish values for easy coercion. "" → "true", "false" → ""
					value === "" ? "true" : value === "false" ? "" : value,
				]),
			),
		[searchParams],
	);
}
