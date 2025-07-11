/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon } from "@stratakit/foundations";
import { ExpandableBlock } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "ExpandableBlock" };

export default definePage(function Page() {
	const [isExpanded, setIsExpanded] = React.useState(false);

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{/* Basic */}
			<ExpandableBlock title="Basic Block">Content in block!</ExpandableBlock>

			{/* Custom endIcon */}
			<ExpandableBlock
				title="Custom endIcon"
				// Using Icon component
				endIcon={<Icon href={placeholderIcon} />}
			>
				Content in block!
			</ExpandableBlock>

			{/* All props (including not-implemented) */}
			<ExpandableBlock
				status="negative" // NOT IMPLEMENTED
				isExpanded={isExpanded}
				onToggle={() => setIsExpanded((prev) => !prev)}
				size="small" // NOT IMPLEMENTED
				styleType="borderless" // NOT IMPLEMENTED
				disabled={true} // NOT IMPLEMENTED
				title="Non-implemented props"
				caption="This is a caption." // NOT IMPLEMENTED
				// Using SVG sprite directly
				endIcon={
					<svg aria-hidden={true}>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				}
			>
				Content in block with non-implemented props!
			</ExpandableBlock>
		</div>
	);
});
