/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link, useSearchParams } from "react-router";
import { Anchor, IconButton } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import cx from "classnames";
import * as ListItem from "../node_modules/@stratakit/structures/src/~utils.ListItem.tsx";

import moon from "@stratakit/icons/moon.svg";
import sun from "@stratakit/icons/sun.svg";
import styles from "./~utils.module.css";

// ----------------------------------------------------------------------------

const isProduction = process.env.NODE_ENV === "production";

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
						<Variant {...searchParams} />
						<VariantsList variants={variants} />
					</>
				);
			}
		}

		return (
			<>
				<DefaultVariant {...searchParams} />
				<VariantsList variants={variants} />
			</>
		);
	};
}

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

/** undefined == system preference */
type ColorScheme = "light" | "dark" | undefined;

const ColorSchemeContext = React.createContext<{
	colorScheme: ColorScheme;
	setColorScheme: React.Dispatch<React.SetStateAction<ColorScheme>>;
}>({ colorScheme: undefined, setColorScheme: () => {} });

/** Makes the color-scheme available to descendants (via `useColorScheme` and `useSetColorScheme`). */
export function ColorSchemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [colorScheme, setColorScheme] = React.useState<ColorScheme>(undefined);

	return (
		<ColorSchemeContext
			value={React.useMemo(
				() => ({ colorScheme, setColorScheme }),
				[colorScheme],
			)}
		>
			{children}
		</ColorSchemeContext>
	);
}

/** Returns the current color-scheme (provided by `ColorSchemeProvider`) or the system preference. */
export function useColorScheme() {
	const { colorScheme } = React.use(ColorSchemeContext);
	const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
	const preferredColorScheme = prefersDark === false ? "light" : "dark"; // dark by default (e.g. during SSR)

	return colorScheme || preferredColorScheme;
}

/** Allows changing the color-scheme returned by `useColorScheme`. */
export function useSetColorScheme() {
	return React.use(ColorSchemeContext).setColorScheme;
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

// ----------------------------------------------------------------------------

export function RightSidebar({
	header,
	children,
	...props
}: { header: React.ReactNode } & React.ComponentProps<"aside">) {
	return (
		<aside {...props} className={cx(styles.rightSidebar, props.className)}>
			<div className={styles.rightSidebarHeader}>{header}</div>
			<div className={styles.rightSidebarContent}>{children}</div>
		</aside>
	);
}

// ----------------------------------------------------------------------------

export const VariantsListContext = React.createContext<
	{ portalTarget: HTMLElement | null } | undefined
>(undefined);

export function VariantsList({
	variants,
	listItemProps,
}: {
	variants: Array<{
		name: string;
		url: string;
		isCurrent: boolean;
	}>;
	listItemProps?: React.ComponentProps<typeof ListItem.Root>;
}) {
	const { portalTarget } = React.useContext(VariantsListContext) ?? {};

	if (portalTarget == null) return null;

	return ReactDOM.createPortal(
		<div role="list" className={styles.list}>
			{variants.map((variant) => (
				<ListItem.Root
					key={variant.name}
					className={styles.listItem}
					{...listItemProps}
				>
					<ListItem.Content>
						<Anchor
							render={
								!variant.isCurrent ? (
									<Link to={variant.url} replace />
								) : undefined
							}
							aria-current={variant.isCurrent ? "page" : "false"}
							className={styles.listItemLink}
						>
							{variant.name}
						</Anchor>
					</ListItem.Content>
				</ListItem.Root>
			))}
		</div>,
		portalTarget,
	);
}

// ----------------------------------------------------------------------------

export function ThemeSwitcher(props: React.ComponentProps<"button">) {
	const colorScheme = useColorScheme();
	const setColorScheme = useSetColorScheme();

	return (
		<IconButton
			label="Toggle color scheme"
			icon={colorScheme === "dark" ? sun : moon}
			onClick={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
			variant="outline"
			{...props}
		/>
	);
}

// ----------------------------------------------------------------------------

export function GitHubLink(
	props: React.ComponentProps<"a"> & { path: string },
) {
	const { path, ...rest } = props;
	const url = `https://github.com/iTwin/design-system/blob/main/apps/test-app/app/${path ? `${path}.tsx` : ""}`;

	const githubIcon = (
		// from https://github.com/logos
		<svg viewBox="0 0 98 96">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
				fill="currentColor"
			/>
		</svg>
	);

	return (
		<IconButton
			label="View page source"
			icon={<Icon render={githubIcon} />}
			variant="outline"
			render={<a href={url} {...rest} />}
		/>
	);
}
