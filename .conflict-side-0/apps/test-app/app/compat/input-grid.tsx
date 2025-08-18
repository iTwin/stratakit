/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Input, InputGrid, Label, Textarea } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "InputGrid" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			<InputGrid>
				<Label>Label (implicit default alignment)</Label>
				<Input />
			</InputGrid>
			<InputGrid labelPlacement="default">
				<Label>Label (explicit default alignment)</Label>
				<Input />
			</InputGrid>
			<InputGrid labelPlacement="inline">
				<Label htmlFor="control">
					Label (inline alignment and manual label-control association)
				</Label>
				<Input id="control" />
			</InputGrid>
			<InputGrid>
				<Label>Textarea label (default alignment)</Label>
				<Textarea />
			</InputGrid>
			<InputGrid labelPlacement="inline">
				<Label htmlFor="textarea-control">
					Textarea label (inline alignment and manual label-control association)
				</Label>
				<Textarea id="textarea-control" />
			</InputGrid>
		</div>
	);
});
