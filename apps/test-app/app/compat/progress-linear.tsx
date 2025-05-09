/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ProgressLinear } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Tooltip" };

export default definePage(function Page() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 8,
			}}
		>
			<ProgressLinear />
			<ProgressLinear value={50} />
			<ProgressLinear value={50} indeterminate={false} />

			<br />

			{/* value should be ignored since indeterminate=true */}
			<ProgressLinear value={50} indeterminate={true} />

			<br />

			{/* Not implemented props */}
			<ProgressLinear
				status="positive"
				labels={["Loading...", "50%"]}
				labelGroupProps={{
					style: {
						backgroundColor: "red",
					},
				}}
			/>
		</div>
	);
});

// export const Determinate = () => {
// 	return;
// };

// export const DeterminateAnimated = () => {
// 	return <ProgressLinear value={50} isAnimated />;
// };

// export const Indeterminate = () => {
// 	return <ProgressLinear indeterminate />;
// };

// export const LabeledCenter = () => {
// 	return <ProgressLinear value={50} labels={["Centered Label"]} />;
// };

// export const LabeledLeftRight = () => {
// 	return <ProgressLinear value={50} labels={["Loading...", "50%"]} />;
// };

// export const Positive = () => {
// 	return (
// 		<ProgressLinear
// 			value={100}
// 			labels={[
// 				"Upload done!",

// 				<Icon key="icon">
// 					<SvgStatusSuccess />
// 				</Icon>,
// 			]}
// 			status="positive"
// 		/>
// 	);
// };

// export const Negative = () => {
// 	return (
// 		<ProgressLinear
// 			value={45}
// 			labels={[
// 				"Upload failed",

// 				<Icon key="icon">
// 					<SvgStatusError />
// 				</Icon>,
// 			]}
// 			status="negative"
// 		/>
// 	);
// };

// export const Warning = () => {
// 	return (
// 		<ProgressLinear
// 			value={100}
// 			labels={[
// 				"Upload successful with warning",

// 				<Icon key="icon">
// 					<SvgStatusWarning />
// 				</Icon>,
// 			]}
// 			status="warning"
// 		/>
// 	);
// };
