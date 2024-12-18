/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import globalStyles from "./tokens.css?url";
import * as Ariakit from "@ariakit/react";
import type * as React from "react";
import type { MetaFunction, LinksFunction } from "react-router";
import { Button, Divider, Icon } from "@itwin/itwinui-react/bricks";
import { parseTokens } from "internal/visitors.js";
import rawLightTokens from "internal/theme-light.json";
import rawDarkTokens from "internal/theme-dark.json";
import styles from "./tokens.module.css";
import { useColorScheme } from "~/~utils.tsx";
import { Table } from "./~utils.tsx";

const lightColorTokens = parseTokens(rawLightTokens.color);
const lightShadowTokens = parseTokens(rawLightTokens.shadow);

const darkColorTokens = parseTokens(rawDarkTokens.color);
const darkShadowTokens = parseTokens(rawDarkTokens.shadow);

const categories = {
	bg: "Background",
	border: "Border",
	text: "Text",
	icon: "Icon",
	misc: "Miscellaneous",
} as const;

export const meta: MetaFunction = () => {
	return [{ title: "Kiwi tokens" }];
};

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: globalStyles },
];

export default function Page() {
	const colorScheme = useColorScheme();

	const colorTokens =
		colorScheme === "dark" ? darkColorTokens : lightColorTokens;
	const shadowTokens =
		colorScheme === "dark" ? darkShadowTokens : lightShadowTokens;

	return (
		<>
			<h1>Tokens</h1>

			<Divider />

			<h2>Colors</h2>

			{Object.entries(categories).map(([key, value]) => {
				const relevantTokens = [...colorTokens.keys()].filter((token) => {
					const shouldExclude = token.includes("🫥") || token.includes("%");
					if (shouldExclude) return false;

					const [prefix] = token.split("-");
					const isMiscToken = !Object.keys(categories).includes(prefix);

					return prefix === key || (key === "misc" && isMiscToken);
				});

				return (
					<Ariakit.DisclosureProvider key={key} defaultOpen={true}>
						<div className={styles.disclosureWrapper}>
							<Ariakit.Disclosure
								render={<Button variant="ghost" />}
								className={styles.disclosureButton}
							>
								<Icon
									render={<ArrowIcon />}
									className={styles.disclosureIcon}
								/>
								{value}
							</Ariakit.Disclosure>

							<Ariakit.DisclosureContent>
								<Tokens tokens={relevantTokens} kind="color" />
							</Ariakit.DisclosureContent>
						</div>
					</Ariakit.DisclosureProvider>
				);
			})}

			<Divider />

			<h2>Shadows</h2>

			<Ariakit.DisclosureProvider defaultOpen={true}>
				<div className={styles.disclosureWrapper}>
					<Ariakit.Disclosure
						render={<Button variant="ghost" />}
						className={styles.disclosureButton}
					>
						<Icon render={<ArrowIcon />} className={styles.disclosureIcon} />
						All shadows
					</Ariakit.Disclosure>

					<Ariakit.DisclosureContent>
						<Tokens tokens={[...shadowTokens.keys()]} kind="shadow" />
					</Ariakit.DisclosureContent>
				</div>
			</Ariakit.DisclosureProvider>
		</>
	);
}

function Tokens({
	tokens,
	kind,
}: {
	tokens: string[];
	kind: "color" | "shadow";
}) {
	return (
		<Table>
			<thead>
				<tr>
					<th>Variable</th>
					<th>Preview</th>
				</tr>
			</thead>

			<tbody>
				{tokens.map((token) => {
					const variableName = `--kiwi-${kind}-${token}`;
					return (
						<tr key={token}>
							<td>
								<code>{variableName}</code>
							</td>
							<td>
								<Swatch variable={variableName} kind={kind} />
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
}

function Swatch({
	variable,
	kind = "color",
}: {
	variable: string;
	kind: "color" | "shadow";
}) {
	const style = {
		...(kind === "color" && { "--_swatch-color": `var(${variable})` }),
		...(kind === "shadow" && { "--_swatch-shadow": `var(${variable})` }),
	};

	return <div className={styles.swatch} style={style as React.CSSProperties} />;
}

function ArrowIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M4.646 6.646a.5.5 0 0 1 .708 0L8 9.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
