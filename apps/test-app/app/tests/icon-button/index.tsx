/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { IconButton } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { definePage } from "~/~utils.tsx";

import notificationsIcon from "@stratakit/icons/notifications.svg";
import placeholderIcon from "@stratakit/icons/placeholder.svg";

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
		_activeLink: ActiveLinkTest,
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

	const variants = ["solid", "outline", "ghost"] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{variants.map((variant) => (
				<div style={{ display: "flex", gap: 4 }}>
					<IconButton
						variant={variant}
						label="Click me"
						icon={placeholderIcon}
					/>
					<IconButton
						variant={variant}
						disabled
						label="Click me not"
						icon={placeholderIcon}
					/>
					<IconButton
						variant={variant}
						label="Click me"
						icon={placeholderIcon}
						isActive
					/>
					<IconButton
						variant={variant}
						label="Notifications"
						dot="You have unread notifications"
						icon={placeholderIcon}
					/>
				</div>
			))}
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

function ActiveLinkTest() {
	return (
		<IconButton
			icon={placeholderIcon}
			label="Click me"
			render={<a href="#" />}
			active
		/>
	);
}
