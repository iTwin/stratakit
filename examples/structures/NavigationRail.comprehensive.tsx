/*---------------------------------------------------------------------------------------------
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
	const accountId = React.useId();
	const [accountEl, setAccountEl] = React.useState<HTMLElement | null>(null);
	const [accountOpen, setAccountOpen] = React.useState(false);
	const [expanded, setExpanded] = React.useState(false);
	return (
		<div className={styles.container}>
			<NavigationRail.Root expanded={expanded} setExpanded={setExpanded}>
				<NavigationRail.Header>
					<Icon alt="Acme app" href={`${svgBentley}#icon-large`} size="large" />
					<NavigationRail.ToggleButton />
				</NavigationRail.Header>

				<NavigationRail.Content>
					<NavigationRail.List>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={`${svgReport}#icon-large`}
								label="Reports"
								active
							/>
						</NavigationRail.ListItem>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={`${svgInspection}#icon-large`}
								label="Logs"
							/>
						</NavigationRail.ListItem>
						<Divider
							className={styles.divider}
							render={<div />}
							role="presentation"
						/>
						<NavigationRail.ListItem>
							<NavigationRail.Anchor
								href="#"
								icon={`${svgDisconnect}#icon-large`}
								label="Integrations"
								suffix={
									<Icon href={svgWindowPopout} alt="(opens in new tab)" />
								}
							/>
						</NavigationRail.ListItem>
					</NavigationRail.List>

					<NavigationRail.Footer>
						<NavigationRail.List>
							<NavigationRail.ListItem>
								<NotificationsButton expanded={expanded} />
							</NavigationRail.ListItem>
							<NavigationRail.ListItem>
								<NavigationRail.Button
									icon={`${svgSettings}#icon-large`}
									label="Settings"
								/>
							</NavigationRail.ListItem>
							<Divider
								className={styles.divider}
								render={<div />}
								role="presentation"
							/>
							<NavigationRail.ListItem>
								<NavigationRail.Button
									id={accountId}
									ref={setAccountEl}
									icon={`${svgUser}#icon-large`}
									label="Account"
									onClick={() => setAccountOpen(true)}
								/>
								<AccountMenu
									anchorEl={accountEl}
									open={accountOpen}
									onClose={() => setAccountOpen(false)}
									triggerId={accountId}
								/>
							</NavigationRail.ListItem>
						</NavigationRail.List>
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
	return (
		<NavigationRail.Button
			icon={
				<Badge variant="dot" color="error" invisible={expanded}>
					<Icon href={`${svgNotifications}#icon-large`} size="large" />
				</Badge>
			}
			label="Notifications"
			suffix={
				<>
					{expanded && (
						<Badge
							badgeContent={3}
							inline
							color="error"
							slotProps={{
								badge: {
									"aria-hidden": true,
								},
							}}
						/>
					)}
					<span style={visuallyHidden}>(3 unread)</span>
				</>
			}
		/>
	);
}

interface AccountPopoverProps {
	anchorEl: HTMLElement | null;
	open: boolean;
	onClose: () => void;
	triggerId: string;
}

function AccountMenu(props: AccountPopoverProps) {
	const { anchorEl, open, onClose, triggerId } = props;

	return (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={onClose}
			slotProps={{
				list: {
					"aria-labelledby": triggerId,
				},
			}}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			transformOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
		>
			<MenuItem onClick={onClose}>View profile</MenuItem>
			<MenuItem onClick={onClose}>Sign out</MenuItem>
		</Menu>
	);
}
