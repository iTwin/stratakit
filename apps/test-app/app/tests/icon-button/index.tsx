/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import notificationsIcon from "@itwin/itwinui-icons/notifications.svg";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import { Icon, IconButton } from "@itwin/itwinui-react/bricks";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "IconButton" };

export default definePage(
	function Page({ labelVariant = "tooltip" }) {
		return (
			<IconButton
				label="Click me"
				icon={placeholderIcon}
				labelVariant={labelVariant as "tooltip" | "visually-hidden"}
			/>
		);
	},
	{
		visual: VisualTest,
		customIcon: CustomIconTest,
		dot: DotTest,
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
			<IconButton
				variant="ghost"
				label="Notifications"
				dot="You have unread notifications"
				icon={placeholderIcon}
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
						<svg viewBox="0 0 100 100">
							<circle cx="50" cy="50" r="50" fill="currentColor" />
						</svg>
					}
				/>
			}
		/>
	);
}

function DotTest() {
	return (
		<IconButton
			variant="ghost"
			label="Notifications"
			dot="You have unread notifications"
			icon={notificationsIcon}
		/>
	);
}
