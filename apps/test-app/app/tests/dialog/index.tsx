/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Button, Text } from "@stratakit/bricks";
import * as Dialog from "@stratakit/structures/unstable_Dialog";
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
		closeButton: CloseButtonTest,
		actions: ActionsTest,
		nested: NestedTest,
		unmountOnHide: UnmountOnHideTest,
		nonDismissible: NonDismissibleTest,
	},
);

function VisualTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root open={open} onClose={() => setOpen(false)}>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.CloseButton />
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
				<Dialog.Footer>
					<Dialog.DismissButton>Cancel</Dialog.DismissButton>
					<Dialog.DismissButton render={<Button tone="accent" />}>
						Ok
					</Dialog.DismissButton>
				</Dialog.Footer>
			</Dialog.Root>
		</>
	);
}

function CloseButtonTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root open={open} onClose={() => setOpen(false)}>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.CloseButton />
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
				<Dialog.Footer>
					<Dialog.DismissButton>Cancel</Dialog.DismissButton>
					<Dialog.DismissButton render={<Button tone="accent" />}>
						Ok
					</Dialog.DismissButton>
				</Dialog.Footer>
			</Dialog.Root>
		</>
	);
}

function NestedTest() {
	const [open, setOpen] = React.useState(false);
	const [nestedOpen, setNestedOpen] = React.useState(false);
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
					<Button onClick={() => setNestedOpen(true)}>Open nested</Button>
					<Dialog.Root open={nestedOpen} onClose={() => setNestedOpen(false)}>
						<Dialog.Heading>Heading</Dialog.Heading>
						<Dialog.Content>Content of nested dialog</Dialog.Content>
					</Dialog.Root>
				</Dialog.Content>
			</Dialog.Root>
		</>
	);
}

function UnmountOnHideTest() {
	const [open, setOpen] = React.useState(false);
	const [nestedOpen, setNestedOpen] = React.useState(false);
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
					<span>Nest dialogs by using unmountOnHide</span>
					<Button onClick={() => setNestedOpen(true)}>Open nested</Button>
				</Dialog.Content>
			</Dialog.Root>
			<Dialog.Root
				unmountOnHide
				open={nestedOpen}
				onClose={() => setNestedOpen(false)}
			>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Content>Content of nested dialog</Dialog.Content>
			</Dialog.Root>
		</>
	);
}

function NonDismissibleTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root
				open={open}
				onClose={() => setOpen(false)}
				hideOnInteractOutside={false}
			>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Content>Description</Dialog.Content>
				<Dialog.Footer>
					<Dialog.DismissButton render={<Button tone="accent" />}>
						Ok
					</Dialog.DismissButton>
				</Dialog.Footer>
			</Dialog.Root>
		</>
	);
}
