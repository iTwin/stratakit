/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useSearchParams } from "react-router";

import type { Root } from "@stratakit/mui";

// ----------------------------------------------------------------------------

export const isProduction = process.env.NODE_ENV === "production";

// ----------------------------------------------------------------------------

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

		const variants = React.useMemo(() => {
			// Collect and normalize variant names
			const variantNames = [
				"",
				...Object.entries(otherVariants ?? {}).map(
					([variantName]) => variantName,
				),
			];

			return (
				variantNames
					// In production, exclude any variant names that start with "_". In dev, show all.
					.filter((varName) => !isProduction || !varName.startsWith("_"))
					.map((variantName) => {
						const safeVariableName = variantName || "default";

						return {
							name: toUpperCamelCase(safeVariableName),
							url: variantName ? `?${variantName}` : "",
							isCurrent:
								variantName === ""
									? Object.keys(searchParams).length === 0
									: variantName in searchParams,
						};
					})
			);
		}, [otherVariants, searchParams]);

		for (const [variantName, Variant] of Object.entries(otherVariants ?? {})) {
			if (variantName in searchParams) {
				return (
					<>
						<SyncVariants variants={variants} />
						<Variant {...searchParams} />
					</>
				);
			}
		}

		return (
			<>
				<SyncVariants variants={variants} />
				<DefaultVariant {...searchParams} />
			</>
		);
	};
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

// ----------------------------------------------------------------------------

export type Variant = {
	name: string;
	url: string;
	isCurrent: boolean;
};

export const VariantsListContext = React.createContext<{
	variants: Variant[];
	setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
}>({
	variants: [],
	setVariants: () => {},
});

export function VariantsListProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [variants, setVariants] = React.useState<Variant[]>([]);

	return (
		<VariantsListContext
			value={React.useMemo(() => ({ variants, setVariants }), [variants])}
		>
			{children}
		</VariantsListContext>
	);
}

/** Syncs variants to context so the secondary navigation can display them */
function SyncVariants({ variants }: { variants: Variant[] }) {
	const { setVariants } = React.useContext(VariantsListContext);

	React.useEffect(() => {
		setVariants(variants);
		return () => setVariants([]);
	}, [variants, setVariants]);

	return null;
}

// ----------------------------------------------------------------------------

type RootProps = React.ComponentProps<typeof Root>;
type ColorScheme = RootProps["colorScheme"];

const COLOR_SCHEME_STORAGE_KEY = "🥝:color-scheme";

const ColorSchemeSettingContext = React.createContext<{
	colorScheme: ColorScheme | undefined;
	setColorScheme: React.Dispatch<React.SetStateAction<ColorScheme | undefined>>;
}>({ colorScheme: undefined, setColorScheme: () => {} });

/** Makes the color-scheme setting available to descendants. */
export function ColorSchemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [colorScheme, setColorScheme] = React.useState<ColorScheme | undefined>(
		undefined,
	);

	return (
		<ColorSchemeSettingContext
			value={React.useMemo(
				() => ({ colorScheme, setColorScheme }),
				[colorScheme],
			)}
		>
			{children}
		</ColorSchemeSettingContext>
	);
}

/** Returns the color-scheme setting as configured by the user. */
export function useColorSchemeSetting(): ColorScheme | undefined {
	const { colorScheme } = React.use(ColorSchemeSettingContext);

	const storedValue = useLocalStorage(COLOR_SCHEME_STORAGE_KEY);
	const storedColorScheme =
		storedValue === "light" || storedValue === "dark" ? storedValue : undefined;

	return colorScheme ?? storedColorScheme;
}

/** Returns the current color-scheme. */
export function useColorScheme(): ColorScheme {
	const setting = useColorSchemeSetting();
	const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

	if (setting === undefined) {
		return prefersDark ? "dark" : "light";
	}

	return setting;
}

/** Allows changing the color-scheme returned by `useColorScheme`. Synchronizes with localStorage. */
export function useSetColorScheme() {
	const { setColorScheme } = React.use(ColorSchemeSettingContext);

	return React.useCallback(
		(value: React.SetStateAction<ColorScheme | undefined>) => {
			setColorScheme((prev) => {
				const newValue = typeof value === "function" ? value(prev) : value;

				if (typeof localStorage !== "undefined") {
					if (newValue === undefined) {
						localStorage.removeItem(COLOR_SCHEME_STORAGE_KEY);
					} else {
						localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, newValue);
					}
				}

				return newValue;
			});
		},
		[setColorScheme],
	);
}

// ----------------------------------------------------------------------------

type AccentColor = "aurora" | "cobalt";

const ACCENT_COLOR_STORAGE_KEY = "🥝:accent-color";

const AccentColorContext = React.createContext<{
	accentColor: AccentColor | undefined;
	setAccentColor: React.Dispatch<React.SetStateAction<AccentColor | undefined>>;
}>({ accentColor: undefined, setAccentColor: () => {} });

/** Makes the accent color available to descendants (via `useAccentColor` and `useSetAccentColor`). */
export function AccentColorProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [accentColor, setAccentColor] = React.useState<AccentColor | undefined>(
		undefined,
	);

	return (
		<AccentColorContext
			value={React.useMemo(
				() => ({ accentColor, setAccentColor }),
				[accentColor],
			)}
		>
			{children}
		</AccentColorContext>
	);
}

/** Returns the current accent color in the following order: React Context, localStorage. */
export function useAccentColor(): AccentColor {
	const { accentColor } = React.use(AccentColorContext);

	const storedValue = useLocalStorage(ACCENT_COLOR_STORAGE_KEY);
	const storedAccentColor =
		storedValue === "aurora" || storedValue === "cobalt"
			? storedValue
			: undefined;

	return accentColor ?? storedAccentColor ?? "aurora";
}

/** Allows changing the accent color returned by `useAccentColor`. Synchronizes with localStorage. */
export function useSetAccentColor() {
	const { setAccentColor } = React.use(AccentColorContext);

	return React.useCallback(
		(value: React.SetStateAction<AccentColor | undefined>) => {
			setAccentColor((prev) => {
				const newValue = typeof value === "function" ? value(prev) : value;

				if (typeof localStorage !== "undefined") {
					if (newValue === undefined) {
						localStorage.removeItem(ACCENT_COLOR_STORAGE_KEY);
					} else {
						localStorage.setItem(ACCENT_COLOR_STORAGE_KEY, newValue);
					}
				}

				return newValue;
			});
		},
		[setAccentColor],
	);
}

// ----------------------------------------------------------------------------

/**
 * Returns whether the specified media query matches, watching for any changes.
 * Returns `undefined` when `window` is unavailable (e.g. during SSR/prerendering + hydration).
 */
export function useMediaQuery(query: string) {
	const getClientSnapshot = React.useCallback(() => {
		return window.matchMedia?.(query).matches;
	}, [query]);

	const subscribe = React.useCallback(
		(onChange: () => void) => {
			const mediaQueryList = window.matchMedia?.(query);
			mediaQueryList?.addEventListener?.("change", onChange);
			return () => mediaQueryList?.removeEventListener?.("change", onChange);
		},
		[query],
	);

	return React.useSyncExternalStore(
		subscribe,
		getClientSnapshot,
		() => undefined, // undefined during SSR and also during hydration
	);
}

// ----------------------------------------------------------------------------

export function useIsWideScreen() {
	return useMediaQuery("(min-width: 800px)");
}

// ----------------------------------------------------------------------------

/** Returns the value from local storage associated with the passed key */
export const useLocalStorage = (key: string) => {
	const [value, setValue] = React.useState<string | null>(null);

	React.useEffect(() => {
		const localStorageValue = localStorage.getItem(key);
		setValue(localStorageValue);
	}, [key]);

	return value;
};

// ----------------------------------------------------------------------------

export function toKebabCase(str: string) {
	return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function toLowerCamelCase(str: string) {
	return str.replace(/-\w/g, clearAndUpper);
}

export function toUpperCamelCase(str: string) {
	return str.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(str: string) {
	return str.replace(/-/, "").toUpperCase();
}
