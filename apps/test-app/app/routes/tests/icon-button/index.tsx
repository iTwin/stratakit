/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;

export const handle = { title: "IconButton" };

export default function Page() {
	const visual = useSearchParams()[0].get("visual") === "true";

	if (visual) return <VisualTest />;

	return <IconButton label="Click me" icon={placeholderIcon} />;
}

function VisualTest() {
	return (
		<div style={{ display: "flex", gap: 4 }}>
			<IconButton label="Click me" icon={placeholderIcon} />
			<IconButton variant="ghost" label="Click me" icon={placeholderIcon} />
		</div>
	);
}
