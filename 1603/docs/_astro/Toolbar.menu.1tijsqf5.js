var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Icon } from "@stratakit/mui";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";

import svgChevronDown from "@stratakit/icons/chevron-down.svg";
import svgClipboard from "@stratakit/icons/clipboard.svg";
import svgCopy from "@stratakit/icons/copy.svg";

export default () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const closeMenu = () => setAnchorEl(null);

	const [fontFamily, setFontFamily] = React.useState("Sans-serif");

	const fontFamilyLabelId = React.useId();

	return (
		<Toolbar.Group variant="solid">
			<Toolbar.Item
				render={
					<IconButton label="Copy">
						<Icon href={\`\${svgCopy}#icon-large\`} size="large" />
					</IconButton>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton label="Paste">
						<Icon href={\`\${svgClipboard}#icon-large\`} size="large" />
					</IconButton>
				}
			/>
			<Toolbar.Item
				render={
					<Button
						aria-haspopup="true"
						aria-expanded={open ? "true" : "false"}
						onClick={(event) => setAnchorEl(event.currentTarget)}
						endIcon={<Icon href={svgChevronDown} />}
						size="small"
					>
						<span id={fontFamilyLabelId} style={visuallyHidden}>
							Font family:
						</span>
						{fontFamily}
					</Button>
				}
			/>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={closeMenu}
				slotProps={{
					list: {
						"aria-labelledby": fontFamilyLabelId,
						dense: true,
					},
				}}
			>
				<MenuItem
					role="menuitemradio"
					selected={fontFamily === "Sans-serif"}
					aria-checked={fontFamily === "Sans-serif" ? "true" : "false"}
					onClick={() => {
						setFontFamily("Sans-serif");
						closeMenu();
					}}
				>
					<ListItemText>Sans-serif</ListItemText>
				</MenuItem>
				<MenuItem
					role="menuitemradio"
					selected={fontFamily === "Serif"}
					aria-checked={fontFamily === "Serif" ? "true" : "false"}
					onClick={() => {
						setFontFamily("Serif");
						closeMenu();
					}}
				>
					<ListItemText>Serif</ListItemText>
				</MenuItem>
				<MenuItem
					role="menuitemradio"
					selected={fontFamily === "Monospace"}
					aria-checked={fontFamily === "Monospace" ? "true" : "false"}
					onClick={() => {
						setFontFamily("Monospace");
						closeMenu();
					}}
				>
					<ListItemText>Monospace</ListItemText>
				</MenuItem>
			</Menu>
		</Toolbar.Group>
	);
};
`;export{e as default};