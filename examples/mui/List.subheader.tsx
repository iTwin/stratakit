/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

import styles from "./List.subheader.module.css";

export default () => {
	return (
		<List className={styles.list}>
			<SectionItem label="Section 0" />
			<SectionItem label="Section 1" />
			<SectionItem label="Section 2" />
			<SectionItem label="Section 3" />
		</List>
	);
};

function SectionItem(props: { label: string }) {
	return (
		<li>
			<ul>
				<ListSubheader>{props.label}</ListSubheader>
				<ListItem>
					<ListItemText primary="Item 0" />
				</ListItem>
				<ListItem>
					<ListItemText primary="Item 1" />
				</ListItem>
				<ListItem>
					<ListItemText primary="Item 2" />
				</ListItem>
				<ListItem>
					<ListItemText primary="Item 3" />
				</ListItem>
			</ul>
		</li>
	);
}
