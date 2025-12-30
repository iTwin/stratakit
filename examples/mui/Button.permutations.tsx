/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button, Stack } from "@mui/material";
import { Icon } from "@stratakit/mui";

import type React from "react";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

type ButtonProps = React.ComponentProps<typeof Button>;

const variants = [
	"contained",
	"outlined",
	"text",
] as const satisfies ButtonProps["variant"][];
const colors = [
	"primary",
	"secondary",
	"info",
	"success",
	"warning",
	"error",
] as const satisfies ButtonProps["color"][];
const icons = ["", "end"] as const;

export default () => {
	return icons.map((icon) => {
		return (
			<Stack spacing={1}>
				{variants.map((variant) => {
					const variantName = `${variant.charAt(0).toUpperCase()}${variant.slice(1)}`;
					return (
						<Stack spacing={1} direction="row">
							{colors.map((color) => {
								return (
									<Button
										variant={variant}
										color={color}
										endIcon={
											icon === "end" ? (
												<Icon href={placeholderIcon} />
											) : undefined
										}
									>
										{variantName} {color}
									</Button>
								);
							})}
						</Stack>
					);
				})}
			</Stack>
		);
	});
};
