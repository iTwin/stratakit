/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Icon } from "@stratakit/mui";

import svgMeasureHeight from "@stratakit/icons/measure-height.svg";
import styles from "./Icon.sizes.module.css";

export default () => {
	return (
		<ul className={styles.list}>
			<li className={styles.listItem}>
				<Icon href={svgMeasureHeight} size="regular" />
				Regular
			</li>
			<li className={styles.listItem}>
				<Icon href={`${svgMeasureHeight}#icon-large`} size="large" />
				Large
			</li>
		</ul>
	);
};
