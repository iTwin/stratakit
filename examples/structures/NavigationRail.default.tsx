/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";
import { svgBrandBentleySystemsLarge } from "@stratakit/icons/brand-bentley-systems";
import { svgDisconnectLarge } from "@stratakit/icons/disconnect";
import { svgInspectionLarge } from "@stratakit/icons/inspection";
import { svgReportLarge } from "@stratakit/icons/report";
import { svgSettingsLarge } from "@stratakit/icons/settings";
import { svgWindowPopout } from "@stratakit/icons/window-popout";
import { Icon } from "@stratakit/mui";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";

import styles from "./NavigationRail.comprehensive.module.css";

export default () => {
	return (
		<div className={styles.container}>
			<NavigationRail.Root>
				<NavigationRail.Header>
					<Icon
						alt="Acme app"
						href={svgBrandBentleySystemsLarge}
						size="large"
					/>
					<NavigationRail.ToggleButton />
				</NavigationRail.Header>

				<NavigationRail.Content>
					<NavigationRail.List>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={svgReportLarge}
								label="Reports"
								active
							/>
						</NavigationRail.ListItem>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={svgInspectionLarge}
								label="Logs"
							/>
						</NavigationRail.ListItem>
					</NavigationRail.List>
					<Divider role="presentation" margin />
					<NavigationRail.Anchor
						href="#"
						icon={svgDisconnectLarge}
						label="Integrations"
						suffix={<Icon href={svgWindowPopout} alt="(opens in new tab)" />}
					/>
					<NavigationRail.Footer>
						<Divider margin />
						<NavigationRail.Button icon={svgSettingsLarge} label="Settings" />
					</NavigationRail.Footer>
				</NavigationRail.Content>
			</NavigationRail.Root>
		</div>
	);
};
