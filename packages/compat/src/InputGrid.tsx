/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field as SkField } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { InputGrid as IuiInputGrid } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiInputGridProps = React.ComponentProps<typeof IuiInputGrid>;

interface InputGridProps extends Pick<IuiInputGridProps, "labelPlacement"> {}

/** @see https://itwinui.bentley.com/docs/input-grid */
export const InputGrid = React.forwardRef((props, forwardedRef) => {
	const { labelPlacement, ...rest } = useCompatProps(props);
	return (
		<SkField.Root
			{...rest}
			layout={labelPlacement === "inline" ? "inline" : undefined}
			ref={forwardedRef}
		/>
	);
}) as PolymorphicForwardRefComponent<"div", InputGridProps>;
DEV: InputGrid.displayName = "InputGrid";
