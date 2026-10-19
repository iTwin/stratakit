/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { svgDismiss } from "@stratakit/icons/dismiss";
import { Icon } from "@stratakit/mui";

export default () => {
	const [query, setQuery] = React.useState("");
	const inputRef = React.useRef<HTMLInputElement>(null);

	return (
		<TextField
			label={<span style={visuallyHidden}>Search</span>}
			placeholder="Search…"
			value={query}
			type="search"
			onChange={(event) => setQuery(event.target.value)}
			inputRef={inputRef}
			slotProps={{
				input: {
					endAdornment: query.length > 0 && (
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
					),
				},
			}}
		/>
	);
};
