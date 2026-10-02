var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Link from "@mui/material/Link";
import visuallyHidden from "@mui/utils/visuallyHidden";

import styles from "./Link.external.module.css";

export default () => {
	return (
		<Link href="https://itwinui.bentley.com">
			iTwinUI
			<span className={styles.externalArrow} aria-hidden="true">
				&nbsp;↗
			</span>
			<span style={visuallyHidden}> (external site)</span>
		</Link>
	);
};
`;export{e as default};