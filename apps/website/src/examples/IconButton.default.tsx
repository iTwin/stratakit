/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@stratakit/bricks";
import downloadIcon from "@stratakit/icons/download.svg";

export default () => {
	return <IconButton label="Download" icon={downloadIcon} />;
};
