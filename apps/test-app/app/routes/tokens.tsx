/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import type * as React from "react";
import type { MetaFunction } from "@remix-run/react";
import { Button, Divider, Icon } from "@itwin/kiwi-react/bricks";
import { parseTokens } from "internal/visitors.js";
import rawTokens from "internal/theme-dark.json";
import styles from "./tokens.module.css";

const tokens = parseTokens(rawTokens);

const categories = {
	bg: "Background",
	border: "Border",
	text: "Text",
	icon: "Icon",
	misc: "Miscellaneous",
} as const;

export const meta: MetaFunction = () => {
	return [{ title: "Kiwi tokens" }, { name: "color-scheme", content: "dark" }];
};

export default function Page() {
	return (
		<>
			<h1>Tokens</h1>

			<Divider />

			<h2>Colors</h2>

			{Object.entries(categories).map(([key, value]) => {
				const relevantTokens = [...tokens.keys()].filter((token) => {
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
								<table className={styles.table}>
									<thead>
										<tr>
											<th>Variable</th>
											<th>Preview</th>
										</tr>
									</thead>

									<tbody>
										{relevantTokens.map((token) => {
											const variableName = `--kiwi-color-${token}`;
											return (
												<tr key={token}>
													<td>
														<code>{variableName}</code>
													</td>
													<td>
														<ColorSwatch variable={variableName} />
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</Ariakit.DisclosureContent>
						</div>
					</Ariakit.DisclosureProvider>
				);
			})}
		</>
	);
}

function ColorSwatch({ variable }: { variable: string }) {
	return (
		<div
			className={styles.swatch}
			style={{ "--_swatch-color": `var(${variable})` } as React.CSSProperties}
		/>
	);
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
