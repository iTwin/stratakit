/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Tooltip, Button, VisuallyHidden } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import type { AriaStrategy } from "@itwin/kiwi-react-internal/dist/bricks/Tooltip.js";

export const handle = { title: "Tooltip" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const ariaStrategyParam = searchParams.get("ariaStrategy");

	// Validate and cast the aria strategy from query parameters
	const ariaStrategy: AriaStrategy = ["description", "label", "none"].includes(
		ariaStrategyParam as AriaStrategy,
	)
		? (ariaStrategyParam as AriaStrategy)
		: "none";

	return (
		<>
			<Tooltip content="This is the tooltip" ariaStrategy={ariaStrategy}>
				<Button>Hover/focus me</Button>
			</Tooltip>

			<VisuallyHidden tabIndex={0}>Tab stop for focus</VisuallyHidden>
		</>
	);
}
