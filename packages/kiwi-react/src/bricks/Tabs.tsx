/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import * as React from "react";

// ----------------------------------------------------------------------------

interface TabsProps
	extends Pick<
		Ariakit.TabProviderProps,
		| "defaultSelectedId"
		| "selectedId"
		| "setSelectedId"
		| "selectOnMove"
		| "children"
	> {}

function Tabs(props: TabsProps) {
	const {
		defaultSelectedId,
		selectedId,
		setSelectedId,
		selectOnMove,
		children,
	} = props;
	return (
		<Ariakit.TabProvider
			defaultSelectedId={defaultSelectedId}
			selectedId={selectedId}
			setSelectedId={setSelectedId}
			selectOnMove={selectOnMove}
		>
			{children}
		</Ariakit.TabProvider>
	);
}

// ----------------------------------------------------------------------------

interface TabListProps extends Ariakit.RoleProps<"div"> {}

const TabList = React.forwardRef<
	React.ElementRef<typeof Ariakit.TabList>,
	TabListProps
>((props, forwardedRef) => {
	return <Ariakit.TabList {...props} ref={forwardedRef} />;
});

// ----------------------------------------------------------------------------

interface TabProps
	extends Ariakit.FocusableProps<"button">,
		Pick<Ariakit.TabProps, "id"> {}

const Tab = React.forwardRef<React.ElementRef<typeof Ariakit.Tab>, TabProps>(
	(props, forwardedRef) => {
		return <Ariakit.Tab accessibleWhenDisabled {...props} ref={forwardedRef} />;
	},
);

// ----------------------------------------------------------------------------

interface TabPanelProps
	extends Ariakit.RoleProps<"div">,
		Pick<Ariakit.TabPanelProps, "tabId" | "unmountOnHide"> {}

const TabPanel = React.forwardRef<
	React.ElementRef<typeof Ariakit.TabPanel>,
	TabPanelProps
>((props, forwardedRef) => {
	return <Ariakit.TabPanel {...props} ref={forwardedRef} />;
});

// ----------------------------------------------------------------------------

export { Tabs as Root, TabList, Tab, TabPanel };
