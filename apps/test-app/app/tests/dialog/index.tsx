/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Button } from "@stratakit/bricks";
import { Dialog } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Dialog" };

export default definePage(
	function Page() {
		return <VisualTest />;
	},
	{
		visual: VisualTest,
		close: CloseableTest,
		secondaryContent: SecondaryContent,
		actions: Actions,
	},
);

function VisualTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				heading="Heading"
				primaryContent="Primary content."
				secondaryContent="Additional information about the success message can go here."
				actions={
					<>
						<Button onClick={() => setOpen(false)}>Cancel</Button>
						<Button tone="accent" onClick={() => setOpen(false)}>
							Ok
						</Button>
					</>
				}
			/>
		</>
	);
}

function CloseableTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				heading="Heading"
				primaryContent="Primary content."
			/>
		</>
	);
}

function SecondaryContent() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				heading="Heading"
				primaryContent="Primary content."
				secondaryContent="Additional information about the success message can go here."
			/>
		</>
	);
}

function Actions() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				heading="Heading"
				primaryContent="Primary content."
				actions={
					<>
						<Button onClick={() => setOpen(false)}>Cancel</Button>
						<Button tone="accent" onClick={() => setOpen(false)}>
							Ok
						</Button>
					</>
				}
			/>
		</>
	);
}
