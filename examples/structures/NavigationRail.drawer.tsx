/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { svgBrandBentleySystemsFilledLarge } from "@stratakit/icons/brand-bentley-systems";
import { svgHomeLarge } from "@stratakit/icons/home";
import { svgMenuLarge } from "@stratakit/icons/menu";
import { svgReportLarge } from "@stratakit/icons/report";
import { svgSettingsLarge } from "@stratakit/icons/settings";
import { Icon } from "@stratakit/mui";
import * as NavigationRail from "@stratakit/structures/unstable_NavigationRail";

import styles from "./NavigationRail.drawer.module.css";

export default () => {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<header className={styles.header}>
				<IconButton
					aria-label="Open navigation"
					onClick={() => setOpen(true)}
					size="large"
				>
					<Icon href={svgMenuLarge} size="large" />
				</IconButton>
			</header>

			<Drawer open={open} onClose={() => setOpen(false)}>
				<NavigationRail.Root
					defaultExpanded // stay expanded inside the Drawer
					className={styles.navigationRail}
				>
					<NavigationRail.Header>
						<Icon
							alt="Acme app"
							href={svgBrandBentleySystemsFilledLarge}
							size="large"
						/>
						<NavigationRail.ToggleButton
							onClick={(e) => {
								// close the Drawer, not the NavigationRail
								e.preventDefault();
								setOpen(false);
							}}
						/>
					</NavigationRail.Header>

					<NavigationRail.Content>
						<NavigationRail.List>
							<NavigationRail.ListItem>
								<NavigationRail.Link
									href="#"
									icon={svgHomeLarge}
									label="Home"
									active
								/>
							</NavigationRail.ListItem>
							<NavigationRail.ListItem>
								<NavigationRail.Link
									href="#"
									icon={svgReportLarge}
									label="Reports"
								/>
							</NavigationRail.ListItem>
						</NavigationRail.List>
					</NavigationRail.Content>

					<NavigationRail.Footer>
						<Divider role="presentation" margin />
						<NavigationRail.Button icon={svgSettingsLarge} label="Settings" />
					</NavigationRail.Footer>
				</NavigationRail.Root>
			</Drawer>
		</>
	);
};
