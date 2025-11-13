/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Link, useLocation } from "react-router";
import { unstable_NavigationList as NavigationList } from "@stratakit/structures";
import { definePage, type VariantProps } from "~/~utils.tsx";

import homeIcon from "@stratakit/icons/home.svg";
import placeholderIcon from "@stratakit/icons/placeholder.svg";
import settingsIcon from "@stratakit/icons/settings.svg";
import userIcon from "@stratakit/icons/user.svg";

export const handle = { title: "NavigationList" };

export default definePage(
	function Page() {
		const currentHash = useLocation().hash;

		return (
			<NavigationList.Root
				items={[
					<NavigationList.Anchor
						key="home"
						label="Home"
						icon={homeIcon}
						active={currentHash === "#home"}
						render={<Link to={{ hash: "#home" }} replace />}
					/>,
					<NavigationList.Anchor
						key="profile"
						label="Profile"
						icon={userIcon}
						active={currentHash === "#profile"}
						render={<Link to={{ hash: "#profile" }} replace />}
					/>,
					<NavigationList.Anchor
						key="settings"
						label="Settings"
						icon={settingsIcon}
						active={currentHash === "#settings"}
						render={<Link to={{ hash: "#settings" }} replace />}
					/>,
				]}
			/>
		);
	},
	{
		subgroup: SubgroupExample,
		visual: VisualTest,
	},
);

function VisualTest() {
	return (
		<>
			<NavigationList.Root
				items={[
					<NavigationList.Anchor
						key="item1"
						href="#"
						icon={placeholderIcon}
						label="Item 1"
					/>,
					<NavigationList.Anchor
						key="item2"
						href="#"
						active
						icon={placeholderIcon}
						label="Item 2"
					/>,
					<NavigationList.Anchor
						key="item3"
						href="#"
						icon={placeholderIcon}
						label="Item 3"
						disabled
					/>,
				]}
			/>

			<hr style={{ marginBlock: 8 }} />

			<NavigationList.Root
				items={[
					<NavigationList.Anchor
						key="item1"
						href="#"
						icon={placeholderIcon}
						label="Item 1"
					/>,
					<NavigationList.Anchor
						key="item2"
						href="#"
						icon={placeholderIcon}
						label="Item 2"
					/>,
					<NavigationList.Subgroup
						key="item3"
						icon={placeholderIcon}
						label="Item 3"
						defaultOpen
						items={[
							<NavigationList.Anchor
								key="item1"
								href="#"
								icon={placeholderIcon}
								label="Item 3.1"
							/>,
							<NavigationList.Anchor
								key="item2"
								href="#"
								active
								icon={placeholderIcon}
								label="Item 3.2"
							/>,
						]}
					/>,
				]}
			/>
		</>
	);
}

function SubgroupExample({ defaultOpen }: VariantProps) {
	const currentHash = useLocation().hash;

	return (
		<NavigationList.Root
			items={[
				<NavigationList.Anchor
					key="dashboard"
					href="#dashboard"
					icon={placeholderIcon}
					label="Dashboard"
					active={currentHash === "#dashboard"}
				/>,
				<NavigationList.Subgroup
					key="management"
					icon={placeholderIcon}
					label="Management"
					items={[
						<NavigationList.Anchor
							key="users"
							href="#users"
							label="Users"
							active={currentHash === "#users"}
						/>,
						<NavigationList.Anchor
							key="teams"
							href="#teams"
							label="Teams"
							active={currentHash === "#teams"}
						/>,
					]}
					defaultOpen={!!defaultOpen}
				/>,
				<NavigationList.Anchor
					key="reports"
					href="#reports"
					icon={placeholderIcon}
					label="Reports"
					active={currentHash === "#reports"}
				/>,
			]}
		/>
	);
}
