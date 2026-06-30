/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Icon } from "@stratakit/foundations";

import cheveronLeft from "@stratakit/icons/chevron-left.svg";
import cheveronLeftDouble from "@stratakit/icons/chevron-left-double.svg";
import cheveronRight from "@stratakit/icons/chevron-right.svg";
import cheveronRightDouble from "@stratakit/icons/chevron-right-double.svg";

function not(a: readonly number[], b: readonly number[]) {
	return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly number[], b: readonly number[]) {
	return a.filter((value) => b.includes(value));
}

export default function TransferList() {
	const [checked, setChecked] = React.useState<readonly number[]>([]);
	const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
	const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value: number) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
	};

	const customList = (items: readonly number[]) => (
		<Paper sx={{ width: 200, height: 230, overflow: "auto" }} elevation={4}>
			<List dense render={<div />} role="list">
				{items.map((value: number) => {
					const labelId = `transfer-list-item-${value}-label`;

					return (
						<ListItemButton
							key={value}
							role="listitem"
							onClick={handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checked.includes(value)}
									tabIndex={-1}
									disableRipple
									slotProps={{
										input: { "aria-labelledby": labelId },
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={`List item ${value + 1}`} />
						</ListItemButton>
					);
				})}
			</List>
		</Paper>
	);

	return (
		<Grid
			container
			spacing={2}
			sx={{ justifyContent: "center", alignItems: "center" }}
		>
			<Grid>{customList(left)}</Grid>
			<Stack spacing={1}>
				<Button
					variant="outlined"
					size="small"
					onClick={handleAllRight}
					disabled={left.length === 0}
					aria-label="move all right"
				>
					<Icon href={cheveronRightDouble} />
				</Button>
				<Button
					variant="outlined"
					size="small"
					onClick={handleCheckedRight}
					disabled={leftChecked.length === 0}
					aria-label="move selected right"
				>
					<Icon href={cheveronRight} />
				</Button>
				<Button
					variant="outlined"
					size="small"
					onClick={handleCheckedLeft}
					disabled={rightChecked.length === 0}
					aria-label="move selected left"
				>
					<Icon href={cheveronLeft} />
				</Button>
				<Button
					variant="outlined"
					size="small"
					onClick={handleAllLeft}
					disabled={right.length === 0}
					aria-label="move all left"
				>
					<Icon href={cheveronLeftDouble} />
				</Button>
			</Stack>
			<Grid>{customList(right)}</Grid>
		</Grid>
	);
}
