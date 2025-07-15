/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as AkDialog from "@ariakit/react/dialog";
import { IconButton, Text } from "@stratakit/bricks";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { Dismiss } from "./~utils.icons.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface DialogProps
	extends BaseProps,
		Pick<AkDialog.DialogProps, "open" | "onClose"> {
	heading: React.ReactNode;
	primaryContent: React.ReactNode;
	secondaryContent?: React.ReactNode;
	actions?: React.ReactNode;
}

const Dialog = forwardRef<"div", DialogProps>((props, forwardedRef) => {
	const {
		heading,
		actions,
		primaryContent,
		secondaryContent,
		onClose,
		...rest
	} = props;
	return (
		<AkDialog.Dialog
			{...rest}
			onClose={onClose}
			className={cx("🥝-dialog", props.className)}
			ref={forwardedRef}
		>
			<Text
				variant="body-lg"
				className="🥝-dialog-heading"
				render={<AkDialog.DialogHeading />}
			>
				{heading}
			</Text>
			{onClose && (
				<IconButton
					className="🥝-dialog-close"
					variant="ghost"
					label="Close"
					icon={<Dismiss />}
					render={<AkDialog.DialogDismiss />}
				/>
			)}
			{primaryContent && (
				<Text variant="body-sm" className="🥝-dialog-primary">
					{primaryContent}
				</Text>
			)}
			{secondaryContent && (
				<Text variant="body-sm" className="🥝-dialog-secondary">
					{secondaryContent}
				</Text>
			)}
			{actions && <div className="🥝-dialog-footer">{actions}</div>}
		</AkDialog.Dialog>
	);
});

// -------------------------------------------------------------------------

export default Dialog;
