/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { svgChevronLeft } from "@stratakit/icons/chevron-left";
import { svgChevronLeftDouble } from "@stratakit/icons/chevron-left-double";
import { svgChevronRight } from "@stratakit/icons/chevron-right";
import { svgChevronRightDouble } from "@stratakit/icons/chevron-right-double";
import { Icon } from "@stratakit/mui";

import style from "./TransferList.default.module.css";

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
				label="Steel"
				ref={leftListRef}
				items={left}
				selected={selected}
				handleToggle={handleToggle}
			/>
			<Stack spacing={1}>
				<IconButton
					variant="outlined"
					size="small"
					onClick={handleAllRight}
					disabled={left.length === 0}
					label="Move all right"
				>
					<Icon href={svgChevronRightDouble} />
				</IconButton>
				<IconButton
					variant="outlined"
					size="small"
					onClick={handleSelectedRight}
					disabled={leftSelected.length === 0}
					label="Move selected right"
				>
					<Icon href={svgChevronRight} />
				</IconButton>
				<IconButton
					variant="outlined"
					size="small"
					onClick={handleSelectedLeft}
					disabled={rightSelected.length === 0}
					label="Move selected left"
				>
					<Icon href={svgChevronLeft} />
				</IconButton>
				<IconButton
					variant="outlined"
					size="small"
					onClick={handleAllLeft}
					disabled={right.length === 0}
					label="Move all left"
				>
					<Icon href={svgChevronLeftDouble} />
				</IconButton>
			</Stack>
			<CustomList
				label="Concrete"
				ref={rightListRef}
				items={right}
				selected={selected}
				handleToggle={handleToggle}
			/>
		</Grid>
	);
}

const itemNames = [
	"Roof trusses",
	"Mezzanine beams",
	"Perimeter columns",
	"Bracing",
	"Ground floor slab",
	"Core walls",
	"Retaining walls",
	"Transfer beams",
];
function not(a: readonly number[], b: readonly number[]) {
	return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly number[], b: readonly number[]) {
	return a.filter((value) => b.includes(value));
}

type CustomListProps = {
	label: string;
	items: readonly number[];
	selected: readonly number[];
	handleToggle: (value: number) => () => void;
};

const CustomList = React.forwardRef(function CustomList(
	props: CustomListProps,
	ref: React.Ref<HTMLDivElement & { focus: () => void }>,
) {
	const { label, items, selected, handleToggle } = props;
	const id = React.useId();

	return (
		<div>
			<Typography id={id}>{label}</Typography>
			<MenuList
				aria-labelledby={id}
				aria-multiselectable="true"
				role="listbox"
				dense
				className={style.list}
				render={<Paper ref={ref} variant="outlined" />}
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
							<ListItemText id={labelId} primary={itemNames[value]} />
						</MenuItem>
					);
				})}
			</MenuList>
		</div>
	);
});
