var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Icon } from "@stratakit/mui";
import { unstable_NavigationRail as NavigationRail } from "@stratakit/structures";

import svgBentley from "@stratakit/icons/brand-bentley-systems.svg";
import svgDisconnect from "@stratakit/icons/disconnect.svg";
import svgInspection from "@stratakit/icons/inspection.svg";
import svgNotifications from "@stratakit/icons/notifications.svg";
import svgReport from "@stratakit/icons/report.svg";
import svgSettings from "@stratakit/icons/settings.svg";
import svgUser from "@stratakit/icons/user.svg";
import svgWindowPopout from "@stratakit/icons/window-popout.svg";
import styles from "./NavigationRail.comprehensive.module.css";

export default () => {
	const [expanded, setExpanded] = React.useState(false);
	return (
		<div className={styles.container}>
			<NavigationRail.Root expanded={expanded} setExpanded={setExpanded}>
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
						<NavigationRail.List>
							<NavigationRail.ListItem>
								<NotificationsButton expanded={expanded} />
							</NavigationRail.ListItem>
							<NavigationRail.ListItem>
								<NavigationRail.Button
									icon={\`\${svgSettings}#icon-large\`}
									label="Settings"
								/>
							</NavigationRail.ListItem>
						</NavigationRail.List>
						<Divider role="presentation" margin />
						<AccountButton />
					</NavigationRail.Footer>
				</NavigationRail.Content>
			</NavigationRail.Root>
		</div>
	);
};

interface NotificationsButtonProps {
	expanded: boolean;
}

function NotificationsButton({ expanded }: NotificationsButtonProps) {
	const notificationCount = 3;
	return (
		<NavigationRail.Button
			icon={
				// The dot badge is shown when the rail is collapsed
				<Badge variant="dot" color="error" invisible={expanded}>
					<Icon href={\`\${svgNotifications}#icon-large\`} size="large" />
				</Badge>
			}
			label="Notifications"
			suffix={
				<>
					{expanded && (
						<Badge // Inline badge is displayed when the rail is expanded
							badgeContent={notificationCount}
							variant="inline"
							color="error"
							aria-hidden="true" // The badge is hidden from assistive technologies
						/>
					)}
					{/* Displays "(3)" in the tooltip when the rail is collapsed and adds "(3 unread)" to the accessible name */}
					<span style={expanded ? visuallyHidden : undefined}>
						({notificationCount}
						<span style={visuallyHidden}> unread</span>)
					</span>
				</>
			}
		/>
	);
}

function AccountButton() {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<NavigationRail.Button
				icon={\`\${svgUser}#icon-large\`}
				label="Account"
				onClick={(event) => setAnchorEl(event.currentTarget)}
			/>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<MenuItem onClick={handleClose}>View profile</MenuItem>
				<MenuItem onClick={handleClose}>Sign out</MenuItem>
			</Menu>
		</>
	);
}
`;export{e as default};