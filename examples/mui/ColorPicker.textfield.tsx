/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import styles from "./ColorPicker.textfield.module.css";

export default () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [color, setColor] = React.useState("#188166");
	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setColor(event.target.value);
	};

	return (
		<TextField
			label="Color"
			value={color}
			onChange={handleColorChange}
			slotProps={{
				htmlInput: {
					className: styles.value,
				},
				input: {
					startAdornment: (
						<InputAdornment position="start">
							<div className={styles.wrapper}>
								<IconButton
									classes={{ disabled: styles.disabledColorPicker }}
									label={color}
									onClick={() => inputRef.current?.click()}
								>
									<span
										aria-hidden="true"
										className={styles.swatch}
										style={{ "--swatch-color": color } as React.CSSProperties}
									/>
								</IconButton>

								<input
									ref={inputRef}
									type="color"
									value={color}
									onChange={handleColorChange}
									tabIndex={-1}
									aria-hidden="false"
									className={styles.input}
								/>
							</div>
						</InputAdornment>
					),
				},
			}}
		/>
	);
};
