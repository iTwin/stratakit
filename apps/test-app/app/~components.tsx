/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import styles from "./~components.module.css";
import cx from "classnames";

export function Table(props: React.ComponentProps<"table">) {
	return <table {...props} className={cx(styles.table, props.className)} />;
}
