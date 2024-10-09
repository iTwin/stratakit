/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Icon, Input } from "@itwin/kiwi-react/bricks";
import styles from "./index.module.css";

export const handle = { title: "LeftPanel" };

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;

export default function Page() {
	return (
		<div className={styles.app}>
			<div className={styles.platformBar}>Platform bar</div>
			<div className={styles.leftPanel} style={{ minWidth: 256 }}>
				<div className={styles.header}>
					<h2>Layers</h2>
					<div className={styles.actions}>
						<Icon href={placeholderIcon} />
						<Icon href={placeholderIcon} />
					</div>
				</div>
				<div className={styles.searchWrapper}>
					<Input placeholder="Search" />
					<div className={styles.actions}>
						<Icon href={placeholderIcon} />
						<Icon href={placeholderIcon} />
					</div>
				</div>
				<div className={styles.tree}>
					<Row level={0}>Guides</Row>
					<Row level={1}>Tree</Row>
					<Row level={2}>Guide 4</Row>
					<Row level={2}>Guide 3</Row>
					<Row level={2}>Guide 2</Row>
					<Row level={1}>Run off pipe</Row>
					<Row level={2}>Guide 1</Row>
					<Row level={0}>Other</Row>
					<Row level={1}>Object 2</Row>
					<Row level={2}>Path 3</Row>
					<Row level={1}>Object 1</Row>
					<Row level={0}>Road</Row>
					<Row level={1}>Parking lot access</Row>
					<Row level={1}>Site access</Row>
					<Row level={0}>Parking lot</Row>
					<Row level={1}>Parking area</Row>
					<Row level={2}>Bay point 2</Row>
					<Row level={2}>Bay point 1</Row>
					<Row level={2}>Space point 1</Row>
					<Row level={2}>Path 6</Row>
					<Row level={0}>Building</Row>
					<Row level={1}>Building area</Row>
					<Row level={2}>Path 5</Row>
					<Row level={0}>Sewer</Row>
					<Row level={1}>Run off pipe</Row>
					<Row level={2}>Path 4</Row>
					<Row level={0}>Project boundary</Row>
					<Row level={1}>Property area</Row>
					<Row level={2}>Path 1</Row>
					<Row level={0}>Map</Row>
					<Row level={1}>Location</Row>
					<Row level={2}>Terrain</Row>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.contentSkeleton} />
			</div>
		</div>
	);
}

interface RowProps {
	level: number;
	children?: React.ReactNode;
}

function Row({ level = 0, children }: RowProps) {
	return (
		<div className={styles.row} style={{ paddingLeft: level * 20 }}>
			<Icon href={placeholderIcon} style={{ display: "inline" }} />
			{children}
		</div>
	);
}
