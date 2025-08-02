/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon } from "@stratakit/foundations";
import { Select } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "Select" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			{/* All implemented props */}
			<Select
				id="my-select"
				native
				options={[
					{ value: "1", label: "Item #1" },
					{ value: "2", label: "Item #2", disabled: true },
					{ value: "3", label: "Item #3" },
					{ value: "4", label: "Item #4" },
				]}
				value={"4"}
				onChange={(value) => {
					console.log("Selected value:", value);
				}}
				data-dummy-attribute="dummy-value"
			/>
			<Select
				native
				options={[
					{ value: "1", label: "Item #1" },
					{ value: "2", label: "Item #2", disabled: true },
					{ value: "3", label: "Item #3" },
					{ value: "4", label: "Item #4" },
				]}
				defaultValue={"4"}
				onChange={(value) => {
					console.log("Selected value:", value);
				}}
				triggerProps={{ className: "trigger-class" }}
			/>

			<br
				style={{
					margin: "16px 0",
				}}
			/>

			{/* iTwinUI Stories */}
			<Basic />
			<WithIcons />
			<Disabled />
			<DisabledWithSelectedValue />
			<Sublabels />
			<Multi />
			<Native />
			<Borderless />
		</div>
	);
});

export const Basic = () => {
	const options = [
		{ value: "1", label: "Item #1" },
		{ value: "2", label: "Item #2", disabled: true },
		{ value: "3", label: "Item #3" },
	];
	return <Select options={options} placeholder="Placeholder text" />;
};

export const WithIcons = () => {
	const options = [
		{
			value: "happy",
			label: "Happy",
			startIcon: <Icon href={placeholderIcon} />,
		},
		{
			value: "neutral",
			label: "Neutral",
			startIcon: <Icon href={placeholderIcon} />,
		},
		{
			value: "sad",
			label: "Sad",
			startIcon: <Icon href={placeholderIcon} />,
		},
	];
	const [value, setValue] = React.useState<string | undefined>(undefined);
	return (
		<Select
			options={options}
			value={value}
			onChange={setValue}
			placeholder="How are you today?"
		/>
	);
};

export const WithSelectedValue = () => {
	const options = [
		{ value: "1", label: "Item #1" },
		{ value: "2", label: "Item #2" },
		{ value: "3", label: "Item #3" },
	];
	const [value, setValue] = React.useState("2");
	return (
		<Select
			options={options}
			value={value}
			onChange={setValue}
			placeholder="Placeholder text"
		/>
	);
};

export const Disabled = () => {
	const options = [
		{ value: "1", label: "Item #1" },
		{ value: "2", label: "Item #2" },
		{ value: "3", label: "Item #3" },
	];
	const [value, setValue] = React.useState<string | undefined>(undefined);
	return (
		<Select
			disabled
			options={options}
			value={value}
			onChange={setValue}
			placeholder="Placeholder text"
		/>
	);
};

export const Sublabels = () => {
	const options = [
		{ value: "1", label: "Item #1", sublabel: "Sublabel #1" },
		{ value: "2", label: "Item #2", sublabel: "Sublabel #2" },
		{ value: "3", label: "Item #3", sublabel: "Sublabel #3" },
	];
	const [value, setValue] = React.useState<string | undefined>(undefined);
	return (
		<Select
			options={options}
			value={value}
			onChange={setValue}
			placeholder="Placeholder text"
			size="large"
		/>
	);
};

export const Multi = () => {
	const [value, setValue] = React.useState("0");
	return (
		<Select
			options={[...Array(20).fill(null)].map((_, index) => ({
				label: `Item #${index}`,
				value: `${index}`,
			}))}
			value={value}
			onChange={setValue}
			placeholder="Placeholder text"
		/>
	);
};

export const Native = () => {
	const options = [
		{ value: "1", label: "Item #1" },
		{ value: "2", label: "Item #2", disabled: true },
		{ value: "3", label: "Item #3" },
		{ value: "4", label: "Item #4" },
	];
	return <Select native options={options} placeholder="Choose an option" />;
};

export const Borderless = () => {
	const options = [
		{ value: "1", label: "Item #1" },
		{ value: "2", label: "Item #2", disabled: true },
		{ value: "3", label: "Item #3" },
	];
	return (
		<Select native styleType="borderless" defaultValue="1" options={options} />
	);
};
