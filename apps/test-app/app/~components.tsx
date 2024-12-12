/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import styles from "./~components.module.css";

export function Table(props: React.ComponentProps<"table">) {
	const className = [styles.table, props.className]
		.filter((name) => name !== undefined)
		.join(" ");
	return <table {...props} className={className} />;
}
