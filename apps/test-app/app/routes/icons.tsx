/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Icon, VisuallyHidden } from "@itwin/kiwi-react/bricks";
import type { MetaFunction } from "@remix-run/react";
import iconsListJson from "@itwin/kiwi-icons/icons-list.json";

const title = "Kiwi icons";
export const meta: MetaFunction = () => {
	return [{ title }, { name: "color-scheme", content: "dark" }];
};

function getIconHref(icon: string) {
	return new URL(
		`../../node_modules/@itwin/kiwi-icons/icons/${icon}`,
		import.meta.url,
	).href;
}

const iconsList = iconsListJson as string[];

export default function Page() {
	return (
		<>
			<VisuallyHidden render={(props) => <h1 {...props} />}>
				{title}
			</VisuallyHidden>
			<table style={{ textAlign: "left", minInlineSize: 600, padding: "1rem" }}>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Default</th>
						<th scope="col">Large</th>
					</tr>
				</thead>
				<tbody>
					{iconsList.map((icon) => {
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
			</table>
		</>
	);
}
