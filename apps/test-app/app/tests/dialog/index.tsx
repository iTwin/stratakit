/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Button, Text } from "@stratakit/bricks";
import * as Dialog from "@stratakit/structures/Dialog";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Dialog" };

export default definePage(
	function Page() {
		const [open, setOpen] = React.useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open</Button>
				<Dialog.Root open={open} onClose={() => setOpen(false)}>
					<Dialog.Heading>Heading</Dialog.Heading>
					<Dialog.Content>Content</Dialog.Content>
				</Dialog.Root>
			</>
		);
	},
	{
		visual: VisualTest,
		dismissButton: DismissButtonTest,
		actions: Actions,
	},
);

function VisualTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root open={open} onClose={() => setOpen(false)}>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.DismissButton />
				<Dialog.Content
					style={{ display: "flex", flexDirection: "column", gap: 16 }}
				>
					Primary content
					<Text
						variant="body-sm"
						style={{ color: "var(--stratakit-color-text-neutral-secondary)" }}
					>
						Secondary content
					</Text>
				</Dialog.Content>
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
			<Dialog.Root open={open} onClose={() => setOpen(false)}>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.DismissButton />
				<Dialog.Content>Content</Dialog.Content>
			</Dialog.Root>
		</>
	);
}

function Actions() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root open={open} onClose={() => setOpen(false)}>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Content>Content</Dialog.Content>
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
