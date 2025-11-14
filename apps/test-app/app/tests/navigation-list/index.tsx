/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { unstable_NavigationList as NavigationList } from "@stratakit/structures";
import { definePage, type VariantProps } from "~/~utils.tsx";

import homeIcon from "@stratakit/icons/home.svg";
import placeholderIcon from "@stratakit/icons/placeholder.svg";
import settingsIcon from "@stratakit/icons/settings.svg";
import userIcon from "@stratakit/icons/user.svg";

export const handle = { title: "NavigationList" };

export default definePage(
	function Page() {
		const [currentPage, setCurrentPage] = React.useState("home");

		return (
			<NavigationList.Root
				items={[
					<NavigationList.Anchor
						key="home"
						href="#home"
						label="Home"
						icon={homeIcon}
						aria-current={currentPage === "home" ? "page" : undefined}
						onClick={(e) => {
							e.preventDefault();
							setCurrentPage("home");
						}}
					/>,
					<NavigationList.Anchor
						key="profile"
						href="#profile"
						label="Profile"
						icon={userIcon}
						aria-current={currentPage === "profile" ? "page" : undefined}
						onClick={(e) => {
							e.preventDefault();
							setCurrentPage("profile");
						}}
					/>,
					<NavigationList.Anchor
						key="settings"
						href="#settings"
						label="Settings"
						icon={settingsIcon}
						aria-current={currentPage === "settings" ? "page" : undefined}
						onClick={(e) => {
							e.preventDefault();
							setCurrentPage("settings");
						}}
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
				/>,
				<NavigationList.Anchor
					key="item4"
					href="#"
					icon={placeholderIcon}
					label="Item 4"
				/>,
			]}
		/>
	);
}

function SubgroupExample({ defaultOpen }: VariantProps) {
	const [currentPage, setCurrentPage] = React.useState("");

	return (
		<NavigationList.Root
			items={[
				<NavigationList.Anchor
					key="dashboard"
					href="#"
					icon={placeholderIcon}
					label="Dashboard"
					active={currentPage === "dashboard"}
					onClick={(e) => {
						e.preventDefault();
						setCurrentPage("dashboard");
					}}
				/>,
				<NavigationList.Subgroup
					key="management"
					icon={placeholderIcon}
					label="Management"
					items={[
						<NavigationList.Anchor
							key="users"
							href="#"
							label="Users"
							active={currentPage === "users"}
							onClick={(e) => {
								e.preventDefault();
								setCurrentPage("users");
							}}
						/>,
						<NavigationList.Anchor
							key="teams"
							href="#"
							label="Teams"
							active={currentPage === "teams"}
							onClick={(e) => {
								e.preventDefault();
								setCurrentPage("teams");
							}}
						/>,
					]}
					defaultOpen={!!defaultOpen}
				/>,
				<NavigationList.Anchor
					key="reports"
					href="#"
					icon={placeholderIcon}
					label="Reports"
					active={currentPage === "reports"}
					onClick={(e) => {
						e.preventDefault();
						setCurrentPage("reports");
					}}
				/>,
			]}
		/>
	);
}
