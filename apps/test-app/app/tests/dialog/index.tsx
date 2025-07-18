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
		actions: ActionsTest,
		backdrop: BackdropTest,
		nonModal: NonModalTest,
		nested: NestedTest,
		description: DescriptionTest,
	},
);

function VisualTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root open={open} onClose={() => setOpen(false)} backdrop>
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

function ActionsTest() {
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

function BackdropTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root
				open={open}
				onClose={() => setOpen(false)}
				backdrop={<Dialog.Backdrop />}
			>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Content>Content</Dialog.Content>
			</Dialog.Root>
		</>
	);
}

function NonModalTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root open={open} onClose={() => setOpen(false)} modal={false}>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Content>Content</Dialog.Content>
			</Dialog.Root>
		</>
	);
}

function NestedTest() {
	const [open, setOpen] = React.useState(false);
	const [nestedOpen, setNestedOpen] = React.useState(false);
	const [nestedModalOpen, setNestedModalOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root open={open} onClose={() => setOpen(false)}>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Content
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						gap: 16,
					}}
				>
					<span>Nest dialogs in the React element tree</span>
					<Button onClick={() => setNestedModalOpen(true)}>Open modal</Button>
					<Button onClick={() => setNestedOpen(true)}>Open non-modal</Button>
				</Dialog.Content>
				<Dialog.Root
					open={nestedModalOpen}
					onClose={() => setNestedModalOpen(false)}
				>
					<Dialog.Heading>Heading</Dialog.Heading>
					<Dialog.Content>Content of nested modal dialog</Dialog.Content>
				</Dialog.Root>
				<Dialog.Root
					open={nestedOpen}
					onClose={() => setNestedOpen(false)}
					modal={false}
				>
					<Dialog.Heading>Heading</Dialog.Heading>
					<Dialog.Content>Content of nested non-modal dialog</Dialog.Content>
				</Dialog.Root>
			</Dialog.Root>
		</>
	);
}

function DescriptionTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root open={open}>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Content render={<Dialog.Description />}>
					Description
				</Dialog.Content>
				<Dialog.Actions>
					<Button onClick={() => setOpen(false)}>Close</Button>
				</Dialog.Actions>
			</Dialog.Root>
		</>
	);
}
