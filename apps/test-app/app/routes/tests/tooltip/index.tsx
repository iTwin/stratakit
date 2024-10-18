/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Tooltip, Button, VisuallyHidden } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export const handle = { title: "Tooltip" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const checked = searchParams.get("multi-line") === "true";

	const testContent = checked
		? "This is the tooltip content that is to display across multiple lines"
		: "This is the tooltip";

	return (
		<>
			<Tooltip content={testContent}>
				<Button>Hover/focus me</Button>
			</Tooltip>

			<VisuallyHidden tabIndex={0}>Tab stop for focus</VisuallyHidden>
		</>
	);
}
