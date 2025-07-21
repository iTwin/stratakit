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
		return (
			<Dialog.Provider>
				<Dialog.Disclosure>Open</Dialog.Disclosure>
				<Dialog.Root>
					<Dialog.Heading>Heading</Dialog.Heading>
					<Dialog.Content>Content</Dialog.Content>
				</Dialog.Root>
			</Dialog.Provider>
		);
	},
	{
		visual: VisualTest,
		controlled: ControlledTest,
		closeButton: CloseButtonTest,
		actions: ActionsTest,
		backdrop: BackdropTest,
		nonModal: NonModalTest,
		nested: NestedTest,
		unmountOnHide: UnmountOnHideTest,
		description: DescriptionTest,
	},
);

function VisualTest() {
	return (
		<Dialog.Provider>
			<Dialog.Disclosure>Open</Dialog.Disclosure>
			<Dialog.Root backdrop>
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
				<Dialog.Actions>
					<Dialog.DismissButton>Cancel</Dialog.DismissButton>
					<Dialog.DismissButton render={<Button tone="accent" />}>
						Ok
					</Dialog.DismissButton>
				</Dialog.Actions>
			</Dialog.Root>
		</Dialog.Provider>
	);
}

function ControlledTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Provider open={open} setOpen={setOpen}>
				<Dialog.Root>
					<Dialog.Heading>Controlled Dialog</Dialog.Heading>
					<Dialog.Content>Content</Dialog.Content>
				</Dialog.Root>
			</Dialog.Provider>
		</>
	);
}

function CloseButtonTest() {
	return (
		<Dialog.Provider>
			<Dialog.Disclosure>Open</Dialog.Disclosure>
			<Dialog.Root>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.CloseButton />
				<Dialog.Content>Content</Dialog.Content>
			</Dialog.Root>
		</Dialog.Provider>
	);
}

function ActionsTest() {
	return (
		<Dialog.Provider>
			<Dialog.Disclosure>Open</Dialog.Disclosure>
			<Dialog.Root>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Content>Content</Dialog.Content>
				<Dialog.Actions>
					<Dialog.DismissButton>Cancel</Dialog.DismissButton>
					<Dialog.DismissButton render={<Button tone="accent" />}>
						Ok
					</Dialog.DismissButton>
				</Dialog.Actions>
			</Dialog.Root>
		</Dialog.Provider>
	);
}

function BackdropTest() {
	return (
		<Dialog.Provider>
			<Dialog.Disclosure>Open</Dialog.Disclosure>
			<Dialog.Root backdrop={<Dialog.Backdrop />}>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Content>Content</Dialog.Content>
			</Dialog.Root>
		</Dialog.Provider>
	);
}

function NonModalTest() {
	return (
		<Dialog.Provider>
			<Dialog.Disclosure>Open</Dialog.Disclosure>
			<Dialog.Root modal={false}>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Content>Content</Dialog.Content>
			</Dialog.Root>
		</Dialog.Provider>
	);
}

function NestedTest() {
	return (
		<Dialog.Provider>
			<Dialog.Disclosure>Open</Dialog.Disclosure>
			<Dialog.Root>
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
					<Dialog.Provider>
						<Dialog.Disclosure>Open modal</Dialog.Disclosure>
						<Dialog.Root>
							<Dialog.Heading>Heading</Dialog.Heading>
							<Dialog.Content>Content of nested modal dialog</Dialog.Content>
						</Dialog.Root>
					</Dialog.Provider>
					<Dialog.Provider>
						<Dialog.Disclosure>Open non-modal</Dialog.Disclosure>
						<Dialog.Root modal={false}>
							<Dialog.Heading>Heading</Dialog.Heading>
							<Dialog.Content>
								Content of nested non-modal dialog
							</Dialog.Content>
						</Dialog.Root>
					</Dialog.Provider>
				</Dialog.Content>
			</Dialog.Root>
		</Dialog.Provider>
	);
}

function UnmountOnHideTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Dialog.Provider>
				<Dialog.Disclosure>Open</Dialog.Disclosure>
				<Dialog.Root>
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
						<Button onClick={() => setOpen(true)}>Open nested</Button>
					</Dialog.Content>
				</Dialog.Root>
			</Dialog.Provider>
			<Dialog.Provider open={open} setOpen={setOpen}>
				<Dialog.Root unmountOnHide>
					<Dialog.Heading>Heading</Dialog.Heading>
					<Dialog.Content>Content of nested dialog</Dialog.Content>
				</Dialog.Root>
			</Dialog.Provider>
		</>
	);
}

function DescriptionTest() {
	return (
		<Dialog.Provider>
			<Dialog.Disclosure>Open</Dialog.Disclosure>
			<Dialog.Root>
				<Dialog.Heading>Heading</Dialog.Heading>
				<Dialog.Content render={<Dialog.Description />}>
					Description
				</Dialog.Content>
			</Dialog.Root>
		</Dialog.Provider>
	);
}
