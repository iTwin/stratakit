/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
	Anchor,
	Button,
	Text,
	TextBox,
	VisuallyHidden,
} from "@stratakit/bricks";
import { unstable_Popover as Popover } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

import type { VariantProps } from "~/~utils.tsx";

export const handle = { title: "Popover" };

export default definePage(
	function Page() {
		return (
			<>
				<Popover content="Popover content">
					<Button>Toggle</Button>
				</Popover>
				<VisuallyHidden tabIndex={0}>Tab stop for focus</VisuallyHidden>
			</>
		);
	},
	{
		visual: VisualTest,
		_controlled: ControlledState,
		nested: NestedTest,
		padded: PaddedTest,
	},
);

function VisualTest() {
	return (
		<Popover content="Popover content">
			<Button>Toggle</Button>
		</Popover>
	);
}

function ControlledState({ defaultOpen }: VariantProps) {
	const [open, setOpen] = React.useState(!!defaultOpen);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				gap: 32,
			}}
		>
			<Popover
				open={open}
				setOpen={(open) => {
					setOpen(open);
					console.log(`setOpen(${open})`);
				}}
				content="Content of a controlled popover"
			>
				<Button>Click me</Button>
			</Popover>

			<article style={{ padding: 16 }}>
				<Text variant="headline-sm" render={<h2 />}>
					Control popover
				</Text>

				<div style={{ display: "grid", gap: 8, marginBlockStart: 8 }}>
					<Button onClick={() => setOpen(true)}>Controlled open</Button>
					<Button onClick={() => setOpen(false)}>Controlled close</Button>
				</div>
			</article>
		</div>
	);
}

function NestedTest() {
	return (
		<Popover
			content={
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 8,
					}}
				>
					Popover content
					<Popover content="Nested popover content">
						<Button>Nested trigger</Button>
					</Popover>
				</div>
			}
		>
			<Button>Click me</Button>
		</Popover>
	);
}

function PaddedTest() {
	return (
		<Popover
			content={
				<>
					<div
						style={{
							display: "flex",
							gap: 58,
							justifyContent: "space-between",
						}}
					>
						<Text variant="body-sm">Warehouse Docks Building</Text>
						<Anchor style={{ margin: "auto" }} render={<button />}>
							Copy link
						</Anchor>
					</div>
					<div
						style={{
							display: "flex",
							gap: "var(--stratakit-space-x2)",
						}}
					>
						<TextBox.Input style={{ flex: 1 }} placeholder="Add users" />
						<Button disabled>Invite</Button>
					</div>
				</>
			}
			style={{
				padding: "var(--stratakit-space-x3)",
				display: "flex",
				flexDirection: "column",
				gap: 8,
			}}
		>
			<Button>Manage access</Button>
		</Popover>
	);
}
