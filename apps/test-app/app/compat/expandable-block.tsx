/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { ExpandableBlock } from "@stratakit/react";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Anchor" };

export default definePage(function Page() {
	const [isExpanded, setIsExpanded] = React.useState(false);

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{/* Basic */}
			<ExpandableBlock title="Basic Block">Content in block!</ExpandableBlock>

			{/* Custom endIcon */}
			<ExpandableBlock title="Custom endIcon" endIcon={<SvgPlaceholder />}>
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
				endIcon={<SvgPlaceholder />}
			>
				Content in block with non-implemented props!
			</ExpandableBlock>
		</div>
	);
});
