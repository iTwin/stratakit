/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton, Icon } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;

export const handle = { title: "IconButton" };

export default function Page() {
	const [searchParams] = useSearchParams();

	const visual = searchParams.get("visual") === "true";
	const customIcon = searchParams.get("customIcon") === "true";

	if (visual) return <VisualTest />;
	if (customIcon) return <CustomIconTest />;

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

function CustomIconTest() {
	return (
		<IconButton
			label="Click me"
			icon={
				<Icon
					data-custom-icon
					render={
						// biome-ignore lint/a11y/noSvgWithoutTitle: Bad lint rule
						<svg viewBox="0 0 100 100">
							<circle cx="50" cy="50" r="50" fill="currentColor" />
						</svg>
					}
				/>
			}
		/>
	);
}
