/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Icon } from "@stratakit/mui";

import svgError from "@stratakit/icons/error.svg";
import styles from "./Icon.color.module.css";

export default () => {
	return <Icon className={styles.icon} href={svgError} />;
};
