/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Icon } from "@stratakit/foundations";

import cheveronLeft from "@stratakit/icons/chevron-left.svg";
import cheveronLeftDouble from "@stratakit/icons/chevron-left-double.svg";
import cheveronRight from "@stratakit/icons/chevron-right.svg";
import cheveronRightDouble from "@stratakit/icons/chevron-right-double.svg";
import style from "./TransferList.default.module.css";

function not(a: readonly number[], b: readonly number[]) {
	return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly number[], b: readonly number[]) {
	return a.filter((value) => b.includes(value));
}

type CustomListProps = {
	"aria-label": string;
	items: readonly number[];
	selected: readonly number[];
	handleToggle: (value: number) => () => void;
};

const CustomList = React.forwardRef(function CustomList(
	props: CustomListProps,
	ref: React.Ref<HTMLElement & { focus: () => void }>,
) {
	const { "aria-label": ariaLabel, items, selected, handleToggle } = props;

	return (
		<Paper className={style.paper} elevation={2}>
			<MenuList
				aria-label={ariaLabel}
				aria-multiselectable="true"
				role="listbox"
				dense
				className={style.list}
				render={<div />}
				ref={
					ref as React.Ref<HTMLUListElement> /* MenuList expects an UL ref */
				}
			>
				{items.map((value: number) => {
					const labelId = `transfer-list-item-${value}-label`;
					const isSelected = selected.includes(value);

					return (
						<MenuItem
							render={<div />}
							key={value}
							role="option"
							aria-selected={isSelected}
							aria-labelledby={labelId}
							onClick={handleToggle(value)}
						>
							<ListItemText id={labelId} primary={`List item ${value + 1}`} />
						</MenuItem>
					);
				})}
			</MenuList>
		</Paper>
	);
});

export default function TransferList() {
	const [selected, setSelected] = React.useState<readonly number[]>([]);
	const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
	const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

	const leftSelected = intersection(selected, left);
	const rightSelected = intersection(selected, right);

	const leftListRef = React.useRef<HTMLDivElement & { focus: () => void }>(
		null,
	);
	const rightListRef = React.useRef<HTMLDivElement & { focus: () => void }>(
		null,
	);

	const handleToggle = (value: number) => () => {
		const currentIndex = selected.indexOf(value);
		const newSelected = [...selected];

		if (currentIndex === -1) {
			newSelected.push(value);
		} else {
			newSelected.splice(currentIndex, 1);
		}

		setSelected(newSelected);
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
		setSelected(not(selected, left));
		rightListRef.current?.focus();
	};

	const handleSelectedRight = () => {
		setRight(right.concat(leftSelected));
		setLeft(not(left, leftSelected));
		setSelected(not(selected, leftSelected));
		rightListRef.current?.focus();
	};

	const handleSelectedLeft = () => {
		setLeft(left.concat(rightSelected));
		setRight(not(right, rightSelected));
		setSelected(not(selected, rightSelected));
		leftListRef.current?.focus();
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
		setSelected(not(selected, right));
		leftListRef.current?.focus();
	};

	return (
		<Grid container spacing={2} className={style.grid}>
			<CustomList
				aria-label="choices"
				ref={leftListRef}
				items={left}
				selected={selected}
				handleToggle={handleToggle}
			/>
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
					onClick={handleSelectedRight}
					disabled={leftSelected.length === 0}
					aria-label="move selected right"
				>
					<Icon href={cheveronRight} />
				</Button>
				<Button
					variant="outlined"
					size="small"
					onClick={handleSelectedLeft}
					disabled={rightSelected.length === 0}
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
			<CustomList
				aria-label="chosen"
				ref={rightListRef}
				items={right}
				selected={selected}
				handleToggle={handleToggle}
			/>
		</Grid>
	);
}
