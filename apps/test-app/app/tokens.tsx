/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Container from "@mui/material/Container";
import { Text } from "@stratakit/bricks";
import {
	unstable_AccordionItem as AccordionItem,
	Table,
} from "@stratakit/structures";
import { parseTokens } from "internal/lightningcss-visitors.js";
import { useColorScheme } from "~/~utils.tsx";
import { SkipLinkContext } from "./~navigation.tsx";

import type { MetaFunction } from "react-router";

import rawDarkTokens from "internal/theme-dark.json";
import rawLightTokens from "internal/theme-light.json";
import rawTypographyTokens from "internal/typography.json";
import styles from "./tokens.module.css";

// ----------------------------------------------------------------------------

const lightColorTokens = parseTokens(rawLightTokens.color);
const lightShadowTokens = parseTokens(rawLightTokens.shadow);

const darkColorTokens = parseTokens(rawDarkTokens.color);
const darkShadowTokens = parseTokens(rawDarkTokens.shadow);

const typographyTokens = parseTokens(rawTypographyTokens.typography);

const typographyVariants = [...typographyTokens.keys()] as const;

const categories = {
	bg: "Background",
	border: "Border",
	text: "Text",
	icon: "Icon",
	misc: "Miscellaneous",
} as const;

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit tokens" }];
};

// ----------------------------------------------------------------------------

export default function Page() {
	const colorScheme = useColorScheme();

	const colorTokens =
		colorScheme === "dark" ? darkColorTokens : lightColorTokens;
	const shadowTokens =
		colorScheme === "dark" ? darkShadowTokens : lightShadowTokens;

	return (
		<Container
			maxWidth="md"
			component="main"
			className={styles.main}
			tabIndex={-1}
			id={React.use(SkipLinkContext)?.id}
		>
			<Text variant="headline-md" render={<h1 />} className={styles.h1}>
				Tokens
			</Text>

			<Text variant="body-lg" render={<h2 />} className={styles.h2}>
				Colors
			</Text>

			{Object.entries(categories).map(([key, value]) => {
				const relevantTokens = [...colorTokens.keys()].filter((token) => {
					const shouldExclude = token.includes("🫥") || token.includes("%");
					if (shouldExclude) return false;

					const [prefix] = token.split("-");
					const isMiscToken = !Object.keys(categories).includes(prefix);

					return prefix === key || (key === "misc" && isMiscToken);
				});

				return (
					<AccordionItem.Root key={key} defaultOpen>
						<AccordionItem.Header>
							<AccordionItem.Marker />
							<AccordionItem.Button>
								<AccordionItem.Label>{value}</AccordionItem.Label>
							</AccordionItem.Button>
						</AccordionItem.Header>

						<AccordionItem.Content className={styles.accordionItemContent}>
							<Tokens tokens={relevantTokens} kind="color" />
						</AccordionItem.Content>
					</AccordionItem.Root>
				);
			})}

			<Text variant="body-lg" render={<h2 />} className={styles.h2}>
				Shadows
			</Text>

			<AccordionItem.Root defaultOpen>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Button>
						<AccordionItem.Label>All shadows</AccordionItem.Label>
					</AccordionItem.Button>
				</AccordionItem.Header>

				<AccordionItem.Content className={styles.accordionItemContent}>
					<Tokens tokens={[...shadowTokens.keys()]} kind="shadow" />
				</AccordionItem.Content>
			</AccordionItem.Root>

			<Text variant="body-lg" render={<h2 />} className={styles.h2}>
				Typography
			</Text>

			<AccordionItem.Root defaultOpen>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Button>
						<AccordionItem.Label>All typography variants</AccordionItem.Label>
					</AccordionItem.Button>
				</AccordionItem.Header>

				<AccordionItem.Content className={styles.accordionItemContent}>
					<TypographyVariants variants={typographyVariants} />
				</AccordionItem.Content>
			</AccordionItem.Root>
		</Container>
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
		<Table.HtmlTable>
			<Table.Header>
				<Table.Row>
					<Table.Cell>Variable</Table.Cell>
					<Table.Cell>Preview</Table.Cell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{tokens.map((token) => {
					const variableName = `--stratakit-${kind}-${token}`;
					return (
						<Table.Row key={token}>
							<Table.Cell>
								<code>{variableName}</code>
							</Table.Cell>
							<Table.Cell>
								<Swatch variable={variableName} kind={kind} />
							</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table.HtmlTable>
	);
}

function TypographyVariants({ variants }: { variants: readonly string[] }) {
	return (
		<Table.HtmlTable>
			<Table.Header>
				<Table.Row>
					<Table.Cell>Variant</Table.Cell>
					<Table.Cell>Preview</Table.Cell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{variants.map((variant) => {
					return (
						<Table.Row key={variant}>
							<Table.Cell>
								<code>{variant}</code>
							</Table.Cell>
							<Table.Cell>
								<Text variant={variant as (typeof typographyVariants)[number]}>
									The quick brown fox jumped over the lazy dog
								</Text>
							</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table.HtmlTable>
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
