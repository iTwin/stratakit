/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Button, Text } from "@stratakit/bricks";
import { DropdownMenu } from "@stratakit/structures";
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
					<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
					<Dialog.Content>Content</Dialog.Content>
				</Dialog.Root>
			</>
		);
	},
	{
		visual: VisualTest,
		closeButton: CloseButtonTest,
		actions: ActionsTest,
		mountedOnHideTest: MountedOnHideTest,
		nested: NestedTest,
		nestedUnmountOnHide: NestedUnmountOnHideTest,
		nonDismissible: NonDismissibleTest,
		noBackdrop: NoBackdropTest,
		customBackdrop: CustomBackdropTest,
	},
);

function VisualTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root open={open} onClose={() => setOpen(false)}>
				<Dialog.Header>
					<Dialog.Heading>Heading</Dialog.Heading>
					<Dialog.CloseButton />
				</Dialog.Header>
				<Dialog.Content>Content</Dialog.Content>
				<Dialog.Footer>
					<Dialog.Action>Cancel</Dialog.Action>
					<Dialog.Action render={<Button tone="accent" />}>Ok</Dialog.Action>
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
				<Dialog.Header>
					<Dialog.Heading>Heading</Dialog.Heading>
					<Dialog.CloseButton />
				</Dialog.Header>
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
				<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
				<Dialog.Content>Content</Dialog.Content>
				<Dialog.Footer>
					<Dialog.Action>Cancel</Dialog.Action>
					<Dialog.Action render={<Button tone="accent" />}>Ok</Dialog.Action>
				</Dialog.Footer>
			</Dialog.Root>
		</>
	);
}

function MountedOnHideTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root
				open={open}
				onClose={() => setOpen(false)}
				unmountOnHide={false}
			>
				<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
				<Dialog.Content>Content</Dialog.Content>
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
				<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
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
						<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
						<Dialog.Content
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							Content of nested dialog
							<DropdownMenu.Provider>
								<DropdownMenu.Button>Actions</DropdownMenu.Button>

								<DropdownMenu.Content>
									<DropdownMenu.Item label="Add" />
									<DropdownMenu.Item label="Edit" />
									<DropdownMenu.Item label="Delete" />
								</DropdownMenu.Content>
							</DropdownMenu.Provider>
						</Dialog.Content>
					</Dialog.Root>
				</Dialog.Content>
			</Dialog.Root>
		</>
	);
}

function NestedUnmountOnHideTest() {
	const [open, setOpen] = React.useState(false);
	const [nestedOpen, setNestedOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root open={open} onClose={() => setOpen(false)}>
				<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
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
				<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
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
				hideOnEscape={false}
				hideOnInteractOutside={false}
			>
				<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
				<Dialog.Content>Description</Dialog.Content>
				<Dialog.Footer>
					<Dialog.Action render={<Button tone="accent" />}>Ok</Dialog.Action>
				</Dialog.Footer>
			</Dialog.Root>
		</>
	);
}

function NoBackdropTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root open={open} onClose={() => setOpen(false)} backdrop={false}>
				<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
				<Dialog.Content>Description</Dialog.Content>
			</Dialog.Root>
		</>
	);
}

function CustomBackdropTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root
				open={open}
				onClose={() => setOpen(false)}
				backdrop={<Dialog.Backdrop style={{ border: "2px solid red" }} />}
			>
				<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
				<Dialog.Content>Description</Dialog.Content>
			</Dialog.Root>
		</>
	);
}
