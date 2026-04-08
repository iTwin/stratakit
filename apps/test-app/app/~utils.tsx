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
type ColorSchemeSetting = RootProps["colorScheme"] | "auto";
type AccentColor = "aurora" | "cobalt";

interface Settings {
	colorScheme: ColorSchemeSetting;
	accentColor: AccentColor;
}

const defaultSettings: Settings = {
	colorScheme: "auto",
	accentColor: "aurora",
};

const SettingsContext = React.createContext<{
	settings: Settings;
	setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}>({
	settings: defaultSettings,
	setSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
	const [settings, setSettings] = useLocalStorageState(
		"🥝:settings",
		defaultSettings,
	);
	return (
		<SettingsContext.Provider
			value={React.useMemo(
				() => ({
					settings,
					setSettings,
				}),
				[settings, setSettings],
			)}
		>
			{children}
		</SettingsContext.Provider>
	);
}

// ----------------------------------------------------------------------------

/** Returns the color-scheme setting as configured by the user. */
export function useColorSchemeSetting(): ColorSchemeSetting {
	const { settings } = React.use(SettingsContext);
	return settings.colorScheme;
}

/** Returns the current color-scheme. */
export function useColorScheme(): ColorScheme {
	const setting = useColorSchemeSetting();
	const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

	if (setting === "auto") {
		return prefersDark ? "dark" : "light";
	}

	return setting;
}

export function useSetColorScheme() {
	const { setSettings } = React.use(SettingsContext);
	return React.useCallback(
		(colorScheme: ColorSchemeSetting) => {
			setSettings((prev) => {
				if (prev.colorScheme === colorScheme) return prev;
				return { ...prev, colorScheme };
			});
		},
		[setSettings],
	);
}

// ----------------------------------------------------------------------------

/** Returns the current accent color. */
export function useAccentColor(): AccentColor {
	const { settings } = React.use(SettingsContext);
	return settings.accentColor;
}

export function useSetAccentColor() {
	const { setSettings } = React.use(SettingsContext);
	return React.useCallback(
		(accentColor: AccentColor) => {
			setSettings((prev) => {
				if (prev.accentColor === accentColor) return prev;
				return { ...prev, accentColor };
			});
		},
		[setSettings],
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

export function useLocalStorageState<T>(key: string, initialState: T) {
	const [value, setValue_] = React.useState<T>(initialState);

	const setValue = React.useCallback(
		(action: React.SetStateAction<T>) => {
			setValue_((prev) => {
				const newValue = action instanceof Function ? action(prev) : action;
				localStorage.setItem(key, JSON.stringify(newValue));
				return newValue;
			});
		},
		[key],
	);
	React.useEffect(() => {
		const item = localStorage.getItem(key);
		if (!item) return;
		setValue_(JSON.parse(item));
	}, [key]);

	return [value, setValue] as const;
}

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
