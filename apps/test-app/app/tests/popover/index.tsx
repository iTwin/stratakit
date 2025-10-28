/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
	Anchor,
	Button,
	Divider,
	Popover,
	Text,
	TextBox,
} from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { definePage } from "~/~utils.tsx";

import type { VariantProps } from "~/~utils.tsx";

import addIconHref from "@stratakit/icons/add.svg";
import searchIconHref from "@stratakit/icons/search.svg";

export const handle = { title: "Popover" };

export default definePage(
	function Page({ defaultOpen }: VariantProps) {
		const [open, setOpen] = React.useState(!!defaultOpen);
		return (
			<Popover
				open={open}
				setOpen={setOpen}
				content={
					<>
						<TextBox.Root>
							<TextBox.Icon href={searchIconHref} />
							<TextBox.Input placeholder="Search" />
						</TextBox.Root>
						<ul
							style={{
								listStyleType: "none",
								display: "flex",
								flexDirection: "column",
								gap: 8,
							}}
						>
							<li>Scene 1</li>
							<li>Scene 2</li>
							<li>Scene 3</li>
							<li>Scene 4</li>
							<li>Scene 5</li>
						</ul>
						<Divider />
						<Button onClick={() => setOpen(false)}>
							<Icon href={addIconHref} />
							Add scene
						</Button>
					</>
				}
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 8,
				}}
			>
				<Button>Manage scenes</Button>
			</Popover>
		);
	},
	{
		_controlled: ControlledState,
		nested: NestedTest,
		padded: PaddedTest,
	},
);

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
							paddingInline: "var(--stratakit-space-x2)",
							display: "flex",
							gap: 58,
							justifyContent: "space-between",
						}}
					>
						<Text variant="body-sm">Warehouse Docks Building</Text>
						<Anchor style={{ margin: "auto" }}>Copy link</Anchor>
					</div>
					<Divider />
					<div
						style={{
							paddingInline: "var(--stratakit-space-x2)",
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
				paddingBlock: "var(--stratakit-space-x3)",
				display: "flex",
				flexDirection: "column",
				gap: 8,
			}}
		>
			<Button>Manage access</Button>
		</Popover>
	);
}
