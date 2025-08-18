/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { LabeledInput } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "LabeledInput" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			<LabeledInput label="Label" id="custom-id" displayStyle="inline" />
			<LabeledInput label="Label" message="Description" />
			<LabeledInput required label="Label" message="Description" />
			<LabeledInput disabled label="Label" message="Description" />
			<LabeledInput label="Label" message="Description">
				<span>no-op</span>
			</LabeledInput>
			{/* no-op */}
			<LabeledInput label="Label" message="Description" size="large" />
			{/* no-op */}
			<LabeledInput label="Label" message="Description" status="warning" />
			<LabeledInput
				label="Label"
				message="Description"
				svgIcon={
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				}
			/>
			<LabeledInput
				svgIcon={
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				}
				iconProps={{ style: { outline: "1px solid DeepPink" } }}
			/>
			<LabeledInput
				label="Label"
				labelProps={{ style: { outline: "1px solid DeepPink" } }}
			/>
			<LabeledInput
				label="Label"
				message="Description"
				messageContentProps={{ style: { outline: "1px solid DeepPink" } }}
			/>
			<LabeledInput
				wrapperProps={{ style: { outline: "1px solid DeepPink" } }}
			/>
			<LabeledInput
				inputWrapperProps={{ style: { outline: "1px solid DeepPink" } }}
			/>
		</div>
	);
});
