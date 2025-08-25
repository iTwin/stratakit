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
				<Dialog.Root modal={true} open={open} onClose={() => setOpen(false)}>
					<Dialog.Header>
						<Dialog.Heading>Title</Dialog.Heading>
						<Dialog.CloseButton />
					</Dialog.Header>
					<Dialog.Content
						style={{ display: "flex", flexDirection: "column", gap: 16 }}
					>
						Primary text
						<Text
							variant="body-sm"
							style={{ color: "var(--stratakit-color-text-neutral-secondary)" }}
						>
							Secondary text
						</Text>
					</Dialog.Content>
					<Dialog.Footer>
						<Dialog.ActionList
							actions={[
								<Button key="cancel" onClick={() => setOpen(false)}>
									Cancel
								</Button>,
								<Button key="ok" tone="accent" onClick={() => setOpen(false)}>
									Ok
								</Button>,
							]}
						/>
					</Dialog.Footer>
				</Dialog.Root>
			</>
		);
	},
	{
		visual: VisualTest,
		closeButton: CloseButtonTest,
		actions: ActionsTest,
		_mountedOnHideTest: MountedOnHideTest,
		nested: NestedTest,
		_nestedUnmountOnHide: NestedUnmountOnHideTest,
		nonDismissible: NonDismissibleTest,
		noBackdrop: NoBackdropTest,
		_customBackdrop: CustomBackdropTest,
		_dialogElement: DialogElementTest,
	},
);

function VisualTest() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root modal={true} open={open} onClose={() => setOpen(false)}>
				<Dialog.Header>
					<Dialog.Heading>Heading</Dialog.Heading>
					<Dialog.CloseButton />
				</Dialog.Header>
				<Dialog.Content>Content</Dialog.Content>
				<Dialog.Footer>
					<Dialog.ActionList
						actions={[
							<Button key="cancel" onClick={() => setOpen(false)}>
								Cancel
							</Button>,
							<Button key="ok" tone="accent" onClick={() => setOpen(false)}>
								Ok
							</Button>,
						]}
					/>
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
			<Dialog.Root modal={true} open={open} onClose={() => setOpen(false)}>
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
			<Dialog.Root modal={true} open={open} onClose={() => setOpen(false)}>
				<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
				<Dialog.Content>Content</Dialog.Content>
				<Dialog.Footer>
					<Dialog.ActionList
						actions={[
							<Button key="cancel" onClick={() => setOpen(false)}>
								Cancel
							</Button>,
							<Button key="ok" tone="accent" onClick={() => setOpen(false)}>
								Ok
							</Button>,
						]}
					/>
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
				modal={true}
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
			<Dialog.Root modal={true} open={open} onClose={() => setOpen(false)}>
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
					<Dialog.Root
						modal={true}
						open={nestedOpen}
						onClose={() => setNestedOpen(false)}
					>
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
			<Dialog.Root modal={true} open={open} onClose={() => setOpen(false)}>
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
				modal={true}
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
				modal={true}
				open={open}
				onClose={() => setOpen(false)}
				hideOnInteractOutside={false}
			>
				<Dialog.Header render={<Dialog.Heading />}>Heading</Dialog.Header>
				<Dialog.Content>Description</Dialog.Content>
				<Dialog.Footer>
					<Dialog.ActionList
						actions={[
							<Button key="ok" tone="accent" onClick={() => setOpen(false)}>
								Ok
							</Button>,
						]}
					/>
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
			<Dialog.Root
				modal={true}
				open={open}
				onClose={() => setOpen(false)}
				backdrop={false}
			>
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
				modal={true}
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

function DialogElementTest() {
	const [open, setOpen] = React.useState(false);
	const dialogElementRef = React.useRef<HTMLDialogElement>(null);
	React.useEffect(() => {
		const dialogElement = dialogElementRef.current;
		if (!dialogElement) return;
		if (open) {
			dialogElement.showModal();
		} else {
			dialogElement.close();
		}
	}, [open]);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog.Root
				open={open}
				onClose={() => setOpen(false)}
				render={<dialog ref={dialogElementRef} />}
				onClick={(e) => {
					if (e.target === e.currentTarget) {
						setOpen(false);
					}
				}}
			>
				<Dialog.Header>
					<Dialog.Heading>Heading</Dialog.Heading>
					<Dialog.CloseButton />
				</Dialog.Header>
				<Dialog.Content>Description</Dialog.Content>
			</Dialog.Root>
		</>
	);
}
