/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Badge } from "@stratakit/bricks";
import warningIcon from "@stratakit/icons/status-warning.svg";

export default () => {
	return <Badge label="Unstable" tone="critical" icon={warningIcon} />;
};
