/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button, Stack } from "@mui/material";

type ButtonProps = React.ComponentProps<typeof Button>;

const variants = ["contained", "outlined", "text"] satisfies Array<
	ButtonProps["variant"]
>;
const colors = [
	"primary",
	"secondary",
	"info",
	"success",
	"warning",
	"error",
] satisfies Array<ButtonProps["color"]>;

export default () => {
	return variants.map((variant) => {
		return (
			<Stack spacing={1} direction="row">
				{colors.map((color) => {
					const variantName = `${variant.charAt(0).toUpperCase()}${variant.slice(1)}`;
					return (
						<Button variant={variant} color={color} key={`${variant}-${color}`}>
							{`${variantName} ${color}`}
						</Button>
					);
				})}
			</Stack>
		);
	});
};
