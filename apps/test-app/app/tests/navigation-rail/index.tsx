/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Avatar, Button, Divider, Text } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";
import { definePage, type VariantProps } from "~/~utils.tsx";

import svgBentley from "@stratakit/icons/bentley-systems.svg";
import svgHelp from "@stratakit/icons/help.svg";
import svgNotifications from "@stratakit/icons/notifications.svg";
import svgPlaceholder from "@stratakit/icons/placeholder.svg";
import svgPlugins from "@stratakit/icons/plugins.svg";
import svgSettings from "@stratakit/icons/settings.svg";
import svgUser from "@stratakit/icons/user.svg";

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
	function Page({ defaultExpanded }: VariantProps) {
		const [active, setActive] = React.useState("administration");

		return (
			<NavigationRail.Root defaultExpanded={!!defaultExpanded}>
				<NavigationRail.Header>
					<Icon alt="Acme app" href={`${svgBentley}#icon-large`} size="large" />
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
						icon={svgPlugins}
					/>

					<NavigationRail.Footer>
						<NavigationRail.List>
							<NavigationRail.ListItem>
								<NavigationRail.Button
									icon={`${svgHelp}#icon-large`}
									label="Support"
								/>
							</NavigationRail.ListItem>
							<Divider presentational />
							<NavigationRail.ListItem>
								<NavigationRail.Button
									icon={`${svgNotifications}#icon-large`}
									label="Notifications"
								/>
							</NavigationRail.ListItem>
							<NavigationRail.ListItem>
								<NavigationRail.Button
									icon={`${svgSettings}#icon-large`}
									label="Settings"
								/>
							</NavigationRail.ListItem>
							<NavigationRail.ListItem>
								<NavigationRail.Button
									icon={<Avatar image={<Icon href={svgUser} />} />}
									label="Account"
								/>
							</NavigationRail.ListItem>
						</NavigationRail.List>
					</NavigationRail.Footer>
				</NavigationRail.Content>
			</NavigationRail.Root>
		);
	},
	{ visual: VisualTest, _controlled: ControlledState },
);

function VisualTest() {
	return (
		<NavigationRail.Root>
			<NavigationRail.Header>
				<Icon alt="Acme app" href={`${svgBentley}#icon-large`} size="large" />
				<NavigationRail.ToggleButton />
			</NavigationRail.Header>

			<NavigationRail.Content>
				<NavigationRail.List>
					<NavigationRail.ListItem>
						<NavigationRail.Anchor
							href="#"
							icon={svgPlaceholder}
							label="Item #1"
							active
						/>
					</NavigationRail.ListItem>
					<NavigationRail.ListItem>
						<NavigationRail.Anchor
							href="#"
							icon={svgPlaceholder}
							label="Item #2"
						/>
					</NavigationRail.ListItem>
					<NavigationRail.ListItem>
						<NavigationRail.Anchor
							href="#"
							icon={svgPlaceholder}
							label="Item #3"
						/>
					</NavigationRail.ListItem>
				</NavigationRail.List>

				<NavigationRail.Footer>
					<NavigationRail.List>
						<NavigationRail.ListItem>
							<NavigationRail.Button icon={svgPlaceholder} label="Item #4" />
						</NavigationRail.ListItem>
						<Divider presentational />
						<NavigationRail.ListItem>
							<NavigationRail.Button icon={svgPlaceholder} label="Item #5" />
						</NavigationRail.ListItem>
					</NavigationRail.List>
				</NavigationRail.Footer>
			</NavigationRail.Content>
		</NavigationRail.Root>
	);
}

function ControlledState({ defaultExpanded }: VariantProps) {
	const [expanded, setExpanded] = React.useState(!!defaultExpanded);

	return (
		<div
			style={{
				display: "flex",
				gap: 16,
				alignItems: "stretch",
				blockSize: "100%",
			}}
		>
			<NavigationRail.Root
				expanded={expanded}
				setExpanded={(expanded) => {
					setExpanded(expanded);
					console.log(`setExpanded: ${expanded}`);
				}}
			>
				<NavigationRail.Header>
					<Icon alt="Acme app" href={`${svgBentley}#icon-large`} size="large" />
					<NavigationRail.ToggleButton />
				</NavigationRail.Header>
				<NavigationRail.Content>
					<NavigationRail.List>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={svgPlaceholder}
								label="Item #1"
								active
							/>
						</NavigationRail.ListItem>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={svgPlaceholder}
								label="Item #2"
							/>
						</NavigationRail.ListItem>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={svgPlaceholder}
								label="Item #3"
							/>
						</NavigationRail.ListItem>
					</NavigationRail.List>
				</NavigationRail.Content>
			</NavigationRail.Root>

			<article style={{ padding: 16 }}>
				<Text variant="headline-sm" render={<h2 />}>
					Control panel
				</Text>

				<div style={{ display: "grid", gap: 8, marginBlockStart: 8 }}>
					<Button onClick={() => setExpanded(true)}>Controlled expand</Button>
					<Button onClick={() => setExpanded(false)}>
						Controlled collapse
					</Button>
				</div>
			</article>
		</div>
	);
}
