/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Button } from "@stratakit/bricks";
import * as Dialog from "@stratakit/structures/Dialog";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Dialog" };

export default definePage(
	function Page() {
		const [open, setOpen] = React.useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open</Button>
				<Dialog.Root
					open={open}
					onClose={() => setOpen(false)}
					primaryContent="Primary content."
				>
					<Dialog.Heading>Heading</Dialog.Heading>
				</Dialog.Root>
			</>
		);
	},
	{
		visual: VisualTest,
		dismissButton: DismissButtonTest,
		secondaryContent: SecondaryContent,
		actions: Actions,
	},
);

function VisualTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root
				open={open}
				onClose={() => setOpen(false)}
				primaryContent="Primary content."
				secondaryContent="Additional information about the success message can go here."
			>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.DismissButton />
				<Dialog.Actions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button tone="accent" onClick={() => setOpen(false)}>
						Ok
					</Button>
				</Dialog.Actions>
			</Dialog.Root>
		</>
	);
}

function DismissButtonTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root
				open={open}
				onClose={() => setOpen(false)}
				primaryContent="Primary content."
			>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.DismissButton />
			</Dialog.Root>
		</>
	);
}

function SecondaryContent() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root
				open={open}
				onClose={() => setOpen(false)}
				primaryContent="Primary content."
				secondaryContent="Additional information about the success message can go here."
			>
				<Dialog.Heading>Heading</Dialog.Heading>
			</Dialog.Root>
		</>
	);
}

function Actions() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root
				open={open}
				onClose={() => setOpen(false)}
				primaryContent="Primary content."
			>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Actions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button tone="accent" onClick={() => setOpen(false)}>
						Ok
					</Button>
				</Dialog.Actions>
			</Dialog.Root>
		</>
	);
}
