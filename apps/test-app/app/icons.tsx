/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Divider, Table } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import globalStyles from "./icons.css?url";

import iconsListJson from "@stratakit/icons/icons-list.json";

import type { LinksFunction, MetaFunction } from "react-router";

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

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: globalStyles },
];

export default function Page() {
	return (
		<>
			<h1>Icons</h1>
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
									<Icon href={iconHref} />
								</Table.Cell>
								<Table.Cell>
									<Icon size="large" href={iconHref} />
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.HtmlTable>
		</>
	);
}
