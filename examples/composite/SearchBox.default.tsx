/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { svgDismiss } from "@stratakit/icons/dismiss";
import { svgSearch } from "@stratakit/icons/search";
import { Icon } from "@stratakit/mui";

export default () => {
	const [query, setQuery] = React.useState("");
	const inputRef = React.useRef<HTMLInputElement>(null);

	return (
		<FormControlLabel
			label={<span style={visuallyHidden}>Search</span>}
			labelPlacement="start"
			control={
				<Input
					type="search"
					placeholder="Search…"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					inputRef={inputRef}
					startAdornment={
						<InputAdornment position="start">
							<Icon href={svgSearch} />
						</InputAdornment>
					}
					endAdornment={
						query.length > 0 && (
							<InputAdornment position="end">
								<IconButton
									label="Clear search"
									size="small"
									onClick={() => {
										setQuery("");
										inputRef.current?.focus();
									}}
								>
									<Icon href={svgDismiss} />
								</IconButton>
							</InputAdornment>
						)
					}
				/>
			}
		/>
	);
};
