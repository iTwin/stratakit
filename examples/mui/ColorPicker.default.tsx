/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import { visuallyHidden } from "@mui/utils";

import styles from "./ColorPicker.default.module.css";

export default () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [color, setColor] = React.useState("#188166");

	return (
		<div className={styles.wrapper}>
			<Button
				classes={{ disabled: styles.disabledColorPicker }}
				onClick={() => inputRef.current?.click()}
				startIcon={
					<span
						aria-hidden="true"
						className={styles.swatch}
						style={{ "--swatch-color": color } as React.CSSProperties}
					/>
				}
			>
				<span style={visuallyHidden}>HEX color: </span>
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
