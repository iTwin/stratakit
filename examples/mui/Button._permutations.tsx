/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Icon } from "@stratakit/mui";

import type * as React from "react";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

type ButtonProps = React.ComponentProps<typeof Button>;

const variants = [
	"contained",
	"outlined",
	"text",
] as const satisfies ButtonProps["variant"][];
const colors = [
	"primary",
	"secondary",
	"error",
] as const satisfies ButtonProps["color"][];
const icons = ["", "end"] as const;

export default () => {
	return (
		<Stack spacing={1}>
			{icons.map((icon) => {
				return (
					<Stack key={icon} spacing={1}>
						{variants.map((variant) => {
							const variantName = `${variant.charAt(0).toUpperCase()}${variant.slice(1)}`;
							return (
								<Stack key={variant} spacing={1} direction="row">
									{colors.map((color) => {
										return (
											<Button
												key={color}
												variant={variant}
												color={color}
												endIcon={
													icon === "end" ? (
														<Icon href={svgPlaceholder} />
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
			})}
		</Stack>
	);
};
