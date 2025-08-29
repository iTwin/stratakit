/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Avatar, Divider } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

import bentleyIcon from "@stratakit/icons/bentley-systems.svg";
import helpIcon from "@stratakit/icons/help.svg";
import notificationsIcon from "@stratakit/icons/notifications.svg";
import placeholderIcon from "@stratakit/icons/placeholder.svg";
import pluginsIcon from "@stratakit/icons/plugins.svg";
import settingsIcon from "@stratakit/icons/settings.svg";
import userIcon from "@stratakit/icons/user.svg";

export const handle = { title: "NavigationRail" };

// ----------------------------------------------------------------------------

const exampleNavItems = {
	database: {
		label: "Database",
		icon: new URL("@stratakit/icons/database.svg", import.meta.url).href,
	},
	administration: {
		label: "Administration",
		icon: new URL("@stratakit/icons/key.svg", import.meta.url).href,
	},
	storage: {
		label: "Storage",
		icon: new URL("@stratakit/icons/process.svg", import.meta.url).href,
	},
	functions: {
		label: "Functions",
		icon: new URL("@stratakit/icons/script.svg", import.meta.url).href,
	},
	realtime: {
		label: "Realtime",
		icon: new URL("@stratakit/icons/hourglass.svg", import.meta.url).href,
	},
} as const;

// ----------------------------------------------------------------------------

export default definePage(
	function Page() {
		const [active, setActive] = React.useState("administration");

		return (
			<NavigationRail.Root>
				<NavigationRail.Header>
					<Icon
						alt="Acme app"
						href={`${bentleyIcon}#icon-large`}
						size="large"
					/>
					<NavigationRail.ToggleButton />
				</NavigationRail.Header>

				<NavigationRail.Content>
					<NavigationRail.List>
						{Object.entries(exampleNavItems).map(([key, item]) => (
							<NavigationRail.ListItem key={key}>
								<NavigationRail.Anchor
									icon={`${item.icon}#icon-large`}
									label={item.label}
									href="#" // placeholder
									active={active === key}
									onClick={() => setActive(key)}
								/>
							</NavigationRail.ListItem>
						))}
					</NavigationRail.List>

					<Divider />

					<NavigationRail.Anchor
						href="#"
						label="Marketplace"
						icon={pluginsIcon}
					/>

					<NavigationRail.Footer>
						<NavigationRail.List>
							<NavigationRail.ListItem>
								<NavigationRail.Button
									icon={`${helpIcon}#icon-large`}
									label="Support"
								/>
							</NavigationRail.ListItem>
							<Divider presentational />
							<NavigationRail.ListItem>
								<NavigationRail.Button
									icon={`${notificationsIcon}#icon-large`}
									label="Notifications"
								/>
							</NavigationRail.ListItem>
							<NavigationRail.ListItem>
								<NavigationRail.Button
									icon={`${settingsIcon}#icon-large`}
									label="Settings"
								/>
							</NavigationRail.ListItem>
							<NavigationRail.ListItem>
								<NavigationRail.Button
									icon={<Avatar image={<Icon href={userIcon} />} />}
									label="Account"
								/>
							</NavigationRail.ListItem>
						</NavigationRail.List>
					</NavigationRail.Footer>
				</NavigationRail.Content>
			</NavigationRail.Root>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	return (
		<NavigationRail.Root>
			<NavigationRail.Header>
				<Icon alt="Acme app" href={`${bentleyIcon}#icon-large`} size="large" />
				<NavigationRail.ToggleButton />
			</NavigationRail.Header>

			<NavigationRail.Content>
				<NavigationRail.List>
					<NavigationRail.ListItem>
						<NavigationRail.Anchor
							href="#"
							icon={placeholderIcon}
							label="Item #1"
							active
						/>
					</NavigationRail.ListItem>
					<NavigationRail.ListItem>
						<NavigationRail.Anchor
							href="#"
							icon={placeholderIcon}
							label="Item #2"
						/>
					</NavigationRail.ListItem>
					<NavigationRail.ListItem>
						<NavigationRail.Anchor
							href="#"
							icon={placeholderIcon}
							label="Item #3"
						/>
					</NavigationRail.ListItem>
				</NavigationRail.List>

				<NavigationRail.Footer>
					<NavigationRail.List>
						<NavigationRail.ListItem>
							<NavigationRail.Button icon={placeholderIcon} label="Item #4" />
						</NavigationRail.ListItem>
						<Divider presentational />
						<NavigationRail.ListItem>
							<NavigationRail.Button icon={placeholderIcon} label="Item #5" />
						</NavigationRail.ListItem>
					</NavigationRail.List>
				</NavigationRail.Footer>
			</NavigationRail.Content>
		</NavigationRail.Root>
	);
}
