/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Button, Divider, Popover, Text, TextBox } from "@stratakit/bricks";
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
