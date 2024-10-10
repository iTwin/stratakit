/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { DropdownMenu } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export const handle = { title: "DropdownMenu" };

export default function Page() {
	const visual = useSearchParams()[0].get("visual") === "true";
	const disabled = useSearchParams()[0].get("disabled") === "true";
	return (
		<div style={{ minHeight: 150 }}>
			<DropdownMenu.Root open={visual ? true : undefined}>
				<DropdownMenu.Button disabled={disabled}>Actions</DropdownMenu.Button>

				<DropdownMenu.Content>
					<DropdownMenu.Item>Add</DropdownMenu.Item>
					<DropdownMenu.Item>Edit</DropdownMenu.Item>
					<DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
					<DropdownMenu.Item>Disable</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	);
}
