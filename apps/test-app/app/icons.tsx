/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import globalStyles from "./icons.css?url";
import styles from "./icons.module.css";
import { Divider, Icon } from "@itwin/itwinui-react/bricks";
import type { LinksFunction, MetaFunction } from "react-router";
import iconsListJson from "@itwin/itwinui-icons/icons-list.json";
import { Table } from "./~utils.tsx";

const allIcons = import.meta.glob(
	"../node_modules/@itwin/itwinui-icons/icons/*.svg",
	{ eager: true },
);

function getIconHref(icon: string) {
	const module = allIcons[`../node_modules/@itwin/itwinui-icons/icons/${icon}`];
	return (module as { default: string })?.default;
}

export const meta: MetaFunction = () => {
	return [{ title: "Kiwi icons" }];
};

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: globalStyles },
];

export default function Page() {
	return (
		<>
			<h1>Icons</h1>
			<Divider />
			<Table className={styles.table} style={{ marginBlockStart: "1rem" }}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Default</th>
						<th>Large</th>
					</tr>
				</thead>
				<tbody>
					{iconsListJson.map((icon) => {
						const iconHref = getIconHref(icon);
						return (
							<tr key={icon}>
								<td>{icon}</td>
								<td>
									<Icon href={iconHref} />
								</td>
								<td>
									<Icon size="large" href={iconHref} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
}
