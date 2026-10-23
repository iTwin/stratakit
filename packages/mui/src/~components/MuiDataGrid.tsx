/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
	GridFooter,
	type GridSlotProps,
	gridDimensionsSelector,
	useGridApiContext,
	useGridSelector,
} from "@mui/x-data-grid";

export const MuiDataGridFooter: React.ForwardRefExoticComponent<
	GridSlotProps["footer"] & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, GridSlotProps["footer"]>((props, ref) => {
	const apiRef = useGridApiContext();
	const { hasScrollX, hasScrollY, viewportOuterSize, minimumSize } =
		useGridSelector(apiRef, gridDimensionsSelector);
	const hasBottomGap = viewportOuterSize.height - minimumSize.height > 0;
	const shareRowFooterBorder = !hasScrollX && (hasScrollY || !hasBottomGap);

	return (
		<GridFooter
			ref={ref}
			{...props}
			data-_sk-share-row-footer-border={shareRowFooterBorder ? "" : undefined}
		/>
	);
});

DEV: MuiDataGridFooter.displayName = "MuiDataGridFooter";
