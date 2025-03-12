/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import { forwardRef, type BaseProps } from "./~utils.js";
import { StatusWarning } from "./Icon.js";
import { Text } from "./Text.js";

// ----------------------------------------------------------------------------

interface TreeErrorProps extends BaseProps {
	/**
	 * Label for the tree header indicating the number of errors displayed.
	 */
	label?: React.ReactNode;
}

const TreeError = forwardRef<"div", TreeErrorProps>((props, forwardedRef) => {
	const { label, ...rest } = props;
	return (
		<Role.div
			{...rest}
			className={cx("🥝-tree-error", props.className)}
			ref={forwardedRef}
		>
			<div className="🥝-tree-error-header">
				<StatusWarning />
				<Text variant="body-sm">{label}</Text>
			</div>
			<div className="🥝-tree-error-items">{props.children}</div>
		</Role.div>
	);
});
DEV: TreeError.displayName = "Tree.Error";

// ----------------------------------------------------------------------------

export { TreeError as Root };
