/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Badge } from "@stratakit/bricks";
import { svgStatusWarning } from "@stratakit/icons/status-warning";

export default () => {
	return <Badge label="Unstable" tone="critical" icon={svgStatusWarning} />;
};
