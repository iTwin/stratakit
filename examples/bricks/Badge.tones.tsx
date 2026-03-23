/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Badge } from "@stratakit/bricks";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<div className="flex">
			<Badge tone="neutral" label="Neutral" icon={svgPlaceholder} />
			<Badge tone="info" label="Info" icon={svgPlaceholder} />
			<Badge tone="positive" label="Positive" icon={svgPlaceholder} />
			<Badge tone="attention" label="Attention" icon={svgPlaceholder} />
			<Badge tone="critical" label="Critical" icon={svgPlaceholder} />
			<Badge tone="accent" label="Accent" icon={svgPlaceholder} />
		</div>
	);
};
