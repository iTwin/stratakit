/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { IconButton, Icon } from "@itwin/kiwi-react/bricks";
import placeholderIcon from "@itwin/kiwi-icons/placeholder.svg";

export const handle = { title: "IconButton" };

export default definePage(
	function Page() {
		return <IconButton label="Click me" icon={placeholderIcon} />;
	},
	{
		visual: VisualTest,
		customIcon: CustomIconTest,
	},
);

function VisualTest({ tooltip: showTooltip = false }) {
	if (showTooltip) {
		return (
			<div style={{ minHeight: 50 }}>
				<IconButton label="Click me" icon={placeholderIcon} />
			</div>
		);
	}

	return (
		<div style={{ display: "flex", gap: 4 }}>
			<IconButton label="Click me" icon={placeholderIcon} />
			<IconButton variant="outline" label="Click me" icon={placeholderIcon} />
			<IconButton variant="ghost" label="Click me" icon={placeholderIcon} />
			<IconButton
				variant="ghost"
				label="Click me"
				icon={placeholderIcon}
				isActive
			/>
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
