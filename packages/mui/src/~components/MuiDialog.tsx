/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { ThemeProvider } from "@mui/material/styles";
import { RootContext } from "@stratakit/foundations/secret-internals";
import { useSafeContext } from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { PortalProvider } from "../PortalProvider.js";

import type DialogTitle from "@mui/material/DialogTitle";
import type { Theme } from "@mui/material/styles";
import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

const MuiDialogPaper = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const { rootNode } = useSafeContext(RootContext);

		const containerId = React.useId();

		const [container, setContainer] = React.useState<HTMLDivElement | null>(
			null,
		);

		const getContainer = React.useCallback(() => {
			// Lookup using element id; `getContainer` is called (from layout effect) before the ref is attached.
			const containerEl = rootNode?.getElementById(containerId);
			return containerEl ?? null;
		}, [rootNode, containerId]);

		return (
			<Role {...props} ref={forwardedRef}>
				<PortalProvider
					container={container}
					unstable_getContainer={getContainer}
				>
					{props.children}
				</PortalProvider>
				{/* Render portalled elements in a container to avoid `aria-hidden` focus warning. */}
				<div id={containerId} ref={setContainer} />
			</Role>
		);
	},
);
DEV: MuiDialogPaper.displayName = "MuiDialogPaper";

// ----------------------------------------------------------------------------

type DialogTitleProps = React.ComponentProps<typeof DialogTitle>;

interface MuiDialogTitleProps
	extends BaseProps<"h2">,
		Pick<DialogTitleProps, "actions" | "slotProps"> {}

const MuiDialogTitle = forwardRef<"h2", MuiDialogTitleProps>(
	(props, forwardedRef) => {
		const { actions, slotProps, ...rest } = props;
		const { header: headerProps } = slotProps ?? {};

		const title = <Role.h2 {...rest} ref={forwardedRef} />;
		if (actions) {
			const lastAction = actions.at(-1);
			const leadingActions = actions.slice(0, -1);
			return (
				<Role.div
					{...headerProps}
					className={cx("🥝MuiDialogTitleHeader", headerProps?.className)}
				>
					{title}
					<MuiDialogTitleActionsProvider>
						{leadingActions}
						<MuiDialogTitleLastActionProvider>
							{lastAction}
						</MuiDialogTitleLastActionProvider>
					</MuiDialogTitleActionsProvider>
				</Role.div>
			);
		}

		return title;
	},
);
DEV: MuiDialogTitle.displayName = "MuiDialogTitle";

// ----------------------------------------------------------------------------

function MuiDialogTitleActionsProvider(props: React.PropsWithChildren) {
	return (
		<ThemeProvider<Theme>
			theme={(outerTheme) => ({
				...outerTheme,
				components: {
					...outerTheme.components,
					MuiIconButton: {
						...outerTheme.components?.MuiIconButton,
						defaultProps: {
							...outerTheme.components?.MuiIconButton?.defaultProps,
							size: "small",
						},
					},
				},
			})}
		>
			{props.children}
		</ThemeProvider>
	);
}
DEV: MuiDialogTitleActionsProvider.displayName =
	"MuiDialogTitleActionsProvider";

// ----------------------------------------------------------------------------

function MuiDialogTitleLastActionProvider(props: React.PropsWithChildren) {
	return (
		<ThemeProvider<Theme>
			theme={(outerTheme) => ({
				...outerTheme,
				components: {
					...outerTheme.components,
					MuiIconButton: {
						...outerTheme.components?.MuiIconButton,
						defaultProps: {
							...outerTheme.components?.MuiIconButton?.defaultProps,
							edge: "end",
						},
					},
				},
			})}
		>
			{props.children}
		</ThemeProvider>
	);
}
DEV: MuiDialogTitleLastActionProvider.displayName =
	"MuiDialogTitleLastActionProvider";

// ----------------------------------------------------------------------------

export { MuiDialogPaper, MuiDialogTitle };
