/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";

import styles from "./Button.color-picker.module.css";

export default () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [color, setColor] = React.useState("#188166");

	return (
		<div className={styles.wrapper}>
			<Button
				onClick={() => inputRef.current?.click()}
				startIcon={
					<span
						aria-hidden="true"
						className={styles.swatch}
						style={{ "--swatch-color": color } as React.CSSProperties}
					/>
				}
			>
				<code className={styles.value}>{color}</code>
			</Button>

			<input
				ref={inputRef}
				type="color"
				value={color}
				onChange={(event) => setColor(event.target.value)}
				tabIndex={-1}
				aria-hidden="false"
				className={styles.input}
			/>
		</div>
	);
};
