/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { LabeledTextarea } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";
import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "Label" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			<LabeledTextarea
				label="Example labeled textarea"
				message="Message"
				placeholder="Placeholder"
			/>
			<LabeledTextarea label="Disabled" disabled />

			<LabeledTextarea
				label="With labelProps"
				labelProps={{ style: { outline: "1px solid DeepPink" } }}
			/>
			<LabeledTextarea
				label="With wrapperProps"
				wrapperProps={{ style: { outline: "1px solid DeepPink" } }}
			/>

			<LabeledTextarea
				label="With svgIcon"
				svgIcon={
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				}
			/>

			<LabeledTextarea label="Inline" message="Message" displayStyle="inline" />

			{/* Partially implemented props */}
			<LabeledTextarea
				label="Positive status with message"
				message="Message"
				status="positive"
			/>
			<LabeledTextarea
				label="Warning status with message"
				message="Message"
				status="warning"
			/>
			<LabeledTextarea
				label="Negative status with message"
				message="Message"
				status="negative"
			/>

			<LabeledTextarea
				label="With status and svgIcon"
				status="negative"
				svgIcon={
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				}
			/>
			<LabeledTextarea
				label="With status, message and svgIcon"
				message="Message"
				status="negative"
				svgIcon={
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				}
			/>

			<LabeledTextarea
				label="With iconProps"
				message="Message"
				status="negative"
				svgIcon={
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				}
				iconProps={{
					size: "large",
					fill: "positive",
					padded: true,
					style: { outline: "1px solid DeepPink" },
				}}
			/>

			{/* Not implemented props */}
			<LabeledTextarea
				label="Positive status without message"
				status="positive"
			/>
			<LabeledTextarea
				label="Warning status without message"
				status="warning"
			/>
			<LabeledTextarea
				label="Negative status without message"
				status="negative"
			/>

			<LabeledTextarea
				label="Status without icon and message"
				status="negative"
				svgIcon={null}
			/>

			<LabeledTextarea
				label="With messageContentProps"
				messageContentProps={{ style: { outline: "1px solid DeepPink" } }}
			/>
		</div>
	);
});
