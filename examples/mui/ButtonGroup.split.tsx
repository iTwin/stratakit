/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { svgChevronDown } from "@stratakit/icons/chevron-down";
import { Icon } from "@stratakit/mui";

export default () => {
	const primaryButtonId = React.useId();
	const [open, setOpen] = React.useState(false);
	const handleClose = () => setOpen(false);
	const [groupElement, setGroupElement] = React.useState<HTMLElement | null>(
		null,
	);

	return (
		<>
			<ButtonGroup ref={setGroupElement} aria-labelledby={primaryButtonId}>
				<Button id={primaryButtonId}>Paste</Button>
				<Button
					aria-label="Alternatives"
					aria-haspopup="true"
					aria-expanded={open ? "true" : "false"}
					onClick={() => setOpen(true)}
				>
					<Icon href={svgChevronDown} />
				</Button>
			</ButtonGroup>

			<Menu anchorEl={groupElement} open={open} onClose={handleClose}>
				<MenuItem onClick={handleClose}>Paste as plain text</MenuItem>
				<MenuItem onClick={handleClose}>Paste special</MenuItem>
			</Menu>
		</>
	);
};
