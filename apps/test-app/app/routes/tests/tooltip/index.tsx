/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Tooltip, Button, VisuallyHidden } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export const handle = { title: "Tooltip" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const type =
		(searchParams.get("type") as "description" | "label" | "none" | null) ??
		undefined;

	return (
		<>
			<Tooltip content="This is the tooltip" type={type}>
				<Button>Hover/focus me</Button>
			</Tooltip>

			<VisuallyHidden tabIndex={0}>Tab stop for focus</VisuallyHidden>
		</>
	);
}
