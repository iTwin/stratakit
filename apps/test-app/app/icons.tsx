/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Container from "@mui/material/Container";
import { Divider, Text } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { Table } from "@stratakit/structures";
import { SkipLinkContext } from "./~navigation.tsx";

import type { MetaFunction } from "react-router";

import iconsListJson from "@stratakit/icons/icons-list.json";
import styles from "./icons.module.css";

const allIcons = import.meta.glob(
	"../node_modules/@stratakit/icons/icons/*.svg",
	{ eager: true },
);

function getIconHref(icon: string) {
	const module = allIcons[`../node_modules/@stratakit/icons/icons/${icon}`];
	return (module as { default: string })?.default;
}

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit icons" }];
};

export default function Page() {
	return (
		<Container
			maxWidth="md"
			component="main"
			className={styles.main}
			tabIndex={-1}
			id={React.use(SkipLinkContext)?.id}
		>
			<Text variant="headline-md" render={<h1 />} className={styles.h1}>
				Icons
			</Text>
			<Divider />
			<Table.HtmlTable>
				<Table.Header>
					<Table.Row>
						<Table.Cell>Name</Table.Cell>
						<Table.Cell>Default</Table.Cell>
						<Table.Cell>Large</Table.Cell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{iconsListJson.map((icon) => {
						const iconHref = getIconHref(icon);
						return (
							<Table.Row key={icon}>
								<Table.Cell>{icon}</Table.Cell>
								<Table.Cell>
									<Icon href={`${iconHref}#icon`} />
								</Table.Cell>
								<Table.Cell>
									<Icon size="large" href={`${iconHref}#icon-large`} />
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.HtmlTable>
		</Container>
	);
}
