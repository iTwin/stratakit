/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Icon } from "@stratakit/mui";

import localSvg from "./Icon.localSvg.svg";

export default () => {
	return <Icon href={localSvg} alt="Filled Circle" />;
};
