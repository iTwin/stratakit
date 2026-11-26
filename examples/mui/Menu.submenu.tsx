/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as AriakitMenu from "@ariakit/react/menu";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { menuClasses } from "@mui/material/Menu";
import { type MenuItemProps, menuItemClasses } from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { PortalContext } from "@stratakit/foundations";
import { svgChevronDown } from "@stratakit/icons/chevron-down";
import { svgChevronRight } from "@stratakit/icons/chevron-right";
import { svgChevronUp } from "@stratakit/icons/chevron-up";
import { Icon } from "@stratakit/mui";
import cx from "classnames";

import styles from "./Menu.submenu.module.css";

export default () => {
	const [open, setOpen] = React.useState(false);

	return (
		<AriakitMenu.MenuProvider open={open} setOpen={setOpen}>
			<Button
				endIcon={<Icon href={open ? svgChevronUp : svgChevronDown} />}
				render={<AriakitMenu.MenuButton />}
			>
				File actions
			</Button>
			<Menu>
				<MenuItem>Rename</MenuItem>
				<AriakitMenu.MenuProvider>
					<AriakitMenu.MenuButton render={<MenuItem />}>
						<ListItemText>Share</ListItemText>
						<Icon href={svgChevronRight} />
					</AriakitMenu.MenuButton>
					<Menu gutter={2} shift={-4}>
						<MenuItem>Copy link</MenuItem>
						<MenuItem>Send by email</MenuItem>
						<MenuItem disabled>Invite by snail mail</MenuItem>
					</Menu>
				</AriakitMenu.MenuProvider>
				<MenuItem>Delete</MenuItem>
			</Menu>
		</AriakitMenu.MenuProvider>
	);
};

function Menu(
	props: Pick<AriakitMenu.MenuProps, "gutter" | "shift"> &
		React.ComponentProps<"div">,
) {
	return (
		<AriakitMenu.Menu
			render={<Paper elevation={8} />}
			portal
			portalElement={React.use(PortalContext)?.container}
			{...props}
			className={cx(
				menuClasses.root,
				menuClasses.paper,
				menuClasses.list,
				styles.menu,
				props.className,
			)}
		/>
	);
}

function MenuItem(props: MenuItemProps) {
	const { disabled, ...rest } = props;

	return (
		<AriakitMenu.MenuItem
			disabled={disabled}
			render={
				<ListItem
					disablePadding
					{...rest}
					render={
						<ButtonBase
							nativeButton={true}
							disabled={disabled}
							render={props.render}
						/>
					}
					className={cx(
						menuItemClasses.root,
						{ [menuItemClasses.disabled]: disabled },
						styles.menuItem,
						props.className,
					)}
				/>
			}
		/>
	);
}
