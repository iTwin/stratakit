/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Badge } from "@stratakit/bricks";
import placeholderIcon from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<div className="flex">
			<Badge tone="neutral" label="Neutral" icon={placeholderIcon} />
			<Badge tone="info" label="Info" icon={placeholderIcon} />
			<Badge tone="positive" label="Positive" icon={placeholderIcon} />
			<Badge tone="attention" label="Attention" icon={placeholderIcon} />
			<Badge tone="critical" label="Critical" icon={placeholderIcon} />
			<Badge tone="accent" label="Accent" icon={placeholderIcon} />
		</div>
	);
};
