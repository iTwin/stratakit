/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Icon, VisuallyHidden } from "@itwin/kiwi-react/bricks";
import type { MetaFunction } from "react-router";
import iconsListJson from "@itwin/kiwi-icons/icons-list.json";

const allIcons = import.meta.glob(
	"../node_modules/@itwin/kiwi-icons/icons/*.svg",
	{ eager: true },
);

const title = "Kiwi icons";
export const meta: MetaFunction = () => {
	return [{ title }];
};

function getIconHref(icon: string) {
	const module = allIcons[`../node_modules/@itwin/kiwi-icons/icons/${icon}`];
	return (module as { default: string })?.default;
}

export default function Page() {
	return (
		<>
			<VisuallyHidden render={(props) => <h1 {...props} />}>
				{title}
			</VisuallyHidden>
			<table style={{ textAlign: "left", padding: "1rem" }}>
				<thead>
					<tr>
						<th scope="col" style={{ inlineSize: 300 }}>
							Name
						</th>
						<th scope="col" style={{ inlineSize: 100 }}>
							Default
						</th>
						<th scope="col" style={{ inlineSize: 100 }}>
							Large
						</th>
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
			</table>
		</>
	);
}
