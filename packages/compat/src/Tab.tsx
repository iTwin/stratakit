/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useSafeContext } from "@stratakit/foundations/secret-internals";
import { Tabs as SkTabs } from "@stratakit/structures";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Tab as IuiTab } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type IuiTabLegacyProps = React.ComponentProps<typeof IuiTab>;

interface TabProps
	extends Pick<
		IuiTabLegacyProps,
		"label" | "sublabel" | "startIcon" | "disabled" | "children" | "value"
	> {
	/** NOT IMPLEMENTED. */
	sublabel?: React.ReactNode;
	/** NOT IMPLEMENTED. */
	startIcon?: React.JSX.Element;
	/** NOT IMPLEMENTED. */
	children?: React.ReactNode;
	/** NOT IMPLEMENTED. */
	value?: string;
}

/** @see https://itwinui.bentley.com/docs/tabs */
export const Tab = React.forwardRef((props, forwardedRef) => {
	const {
		label,
		sublabel, // NOT IMPLEMENTED
		startIcon, // NOT IMPLEMENTED
		disabled,
		children, // NOT IMPLEMENTED
		value, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	const { id } = useSafeContext(TabContext);
	return (
		<SkTabs.Tab {...rest} id={id} disabled={disabled} ref={forwardedRef}>
			{label}
		</SkTabs.Tab>
	);
}) as PolymorphicForwardRefComponent<"button", TabProps>;
DEV: Tab.displayName = "Tab";

// ----------------------------------------------------------------------------

const TabContext = React.createContext<
	| {
			id: string;
	  }
	| undefined
>(undefined);

type TabContextType = NonNullable<React.ContextType<typeof TabContext>>;

/**
 * @private
 */
export function TabProvider({
	children,
	id,
}: React.PropsWithChildren<TabContextType>) {
	return (
		<TabContext.Provider
			value={React.useMemo(
				() => ({
					id,
				}),
				[id],
			)}
		>
			{children}
		</TabContext.Provider>
	);
}
