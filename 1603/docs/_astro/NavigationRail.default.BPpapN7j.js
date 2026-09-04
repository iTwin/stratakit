var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";
import { Icon } from "@stratakit/mui";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";

import svgBentley from "@stratakit/icons/brand-bentley-systems.svg";
import svgDisconnect from "@stratakit/icons/disconnect.svg";
import svgInspection from "@stratakit/icons/inspection.svg";
import svgReport from "@stratakit/icons/report.svg";
import svgSettings from "@stratakit/icons/settings.svg";
import svgWindowPopout from "@stratakit/icons/window-popout.svg";
import styles from "./NavigationRail.comprehensive.module.css";

export default () => {
	return (
		<div className={styles.container}>
			<NavigationRail.Root>
				<NavigationRail.Header>
					<Icon alt="Acme app" href={\`\${svgBentley}#icon-large\`} size="large" />
					<NavigationRail.ToggleButton />
				</NavigationRail.Header>

				<NavigationRail.Content>
					<NavigationRail.List>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={\`\${svgReport}#icon-large\`}
								label="Reports"
								active
							/>
						</NavigationRail.ListItem>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={\`\${svgInspection}#icon-large\`}
								label="Logs"
							/>
						</NavigationRail.ListItem>
					</NavigationRail.List>
					<Divider role="presentation" margin />
					<NavigationRail.Anchor
						href="#"
						icon={\`\${svgDisconnect}#icon-large\`}
						label="Integrations"
						suffix={<Icon href={svgWindowPopout} alt="(opens in new tab)" />}
					/>
					<NavigationRail.Footer>
						<Divider margin />
						<NavigationRail.Button
							icon={\`\${svgSettings}#icon-large\`}
							label="Settings"
						/>
					</NavigationRail.Footer>
				</NavigationRail.Content>
			</NavigationRail.Root>
		</div>
	);
};
`;export{e as default};