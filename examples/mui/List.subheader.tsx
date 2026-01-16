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
			{Array.from({ length: 4 }).map((_, sectionIndex) => (
				<li key={sectionIndex}>
					<ul>
						<ListSubheader>Section {sectionIndex}</ListSubheader>
						{Array.from({ length: 4 }).map((_, itemIndex) => (
							<ListItem key={itemIndex}>
								<ListItemText primary={`Item ${itemIndex}`} />
							</ListItem>
						))}
					</ul>
				</li>
			))}
		</List>
	);
};
