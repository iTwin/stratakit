/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Tooltip, Button, VisuallyHidden } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export const handle = { title: "Tooltip" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const typeParam = searchParams.get("type");

	// Validate and cast the type from query parameters
	const type: "description" | "label" | "none" | undefined = [
		"description",
		"label",
		"none",
	].includes(typeParam as "description" | "label" | "none")
		? (typeParam as "description" | "label" | "none")
		: undefined;

	return (
		<>
			<Tooltip content="This is the tooltip" type={type}>
				<Button>Hover/focus me</Button>
			</Tooltip>

			<VisuallyHidden tabIndex={0}>Tab stop for focus</VisuallyHidden>
		</>
	);
}
