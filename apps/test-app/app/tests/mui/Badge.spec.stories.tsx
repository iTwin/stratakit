/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Stack } from "@mui/material";
import Badge, { type BadgeProps } from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@stratakit/mui";
import { ScreenShotWrapper } from "~/ScreenShotWrapper.tsx";
import { VaryPropsStack, varyProp } from "~/VaryProps.tsx";
import ExampleColors from "../.././../../../examples/mui/Badge.colors.tsx";
import ExampleSizes from "../.././../../../examples/mui/Badge.sizes.tsx";
import ExampleTypes from "../.././../../../examples/mui/Badge.type.tsx";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

function ButtonWithBadge({
	badgeContent,
	color,
}: Pick<BadgeProps, "color" | "badgeContent">) {
	return (
		<Badge
			badgeContent={badgeContent || "none"}
			variant={!badgeContent ? "dot" : "standard"}
			color={color}
		>
			<Button>Button</Button>
		</Badge>
	);
}

function IconButtonWithBadge({
	size,
	color,
	badgeContent,
}: Pick<BadgeProps, "color" | "badgeContent"> &
	Pick<React.ComponentProps<typeof Icon>, "size">) {
	const descriptionId = React.useId();
	const href =
		size === "large" ? `${svgPlaceholder}#icon-large` : svgPlaceholder;
	return (
		<IconButton label="Notifications" aria-describedby={descriptionId}>
			<Badge
				badgeContent={badgeContent || "none"}
				color={color}
				variant={!badgeContent ? "dot" : "standard"}
			>
				<Icon href={href} size={size} />
				<span id={descriptionId} hidden>
					You have 4 unread notifications
				</span>
			</Badge>
		</IconButton>
	);
}

export function Visual() {
	const propVariants = [
		{ color: "secondary", badgeContent: 0 },
		{ color: "info", badgeContent: 9 },
		{ color: "success", badgeContent: 99 },
		{ color: "warning", badgeContent: 999 },
		{ color: "error" as const, badgeContent: <Icon href={svgPlaceholder} /> },
	] satisfies Pick<BadgeProps, "color" | "badgeContent">[];
	return (
		<ScreenShotWrapper>
			<Stack spacing={1}>
				<ExampleSizes />
				<ExampleColors />
				<ExampleTypes />
				<VaryPropsStack
					spacing={2}
					component={IconButtonWithBadge}
					variations={varyProp({
						prop: "size",
						values: ["large", "regular"] as const,
						withExisting: propVariants,
						order: "new-existing",
					})}
				/>
				<VaryPropsStack
					spacing={2}
					component={ButtonWithBadge}
					variations={propVariants}
				/>
			</Stack>
		</ScreenShotWrapper>
	);
}
