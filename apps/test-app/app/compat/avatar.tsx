/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { SvgUser } from "@itwin/itwinui-icons-react";
import { Avatar, getUserColor } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Avatar" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			{/* All implemented props */}
			<div style={{ display: "flex", gap: 4, placeItems: "center" }}>
				{(["small", "medium", "large", "x-large"] as const).map((size) => (
					<Avatar
						key={size}
						size={size}
						abbreviation="TR"
						title="Terry Rivers"
						image={
							<img src="https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png" />
						}
					/>
				))}
			</div>

			{/* abbreviation & image combinations */}
			<div style={{ display: "flex", gap: 4, placeItems: "center" }}>
				{/* abbreviation */}
				<Avatar abbreviation="TR" />
				{/* image */}
				<Avatar
					image={
						<img src="https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png" />
					}
				/>
				{/* abbreviation + image */}
				<Avatar
					abbreviation="TR"
					image={
						<img src="https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png" />
					}
				/>
			</div>

			{/* img or icon */}
			<div style={{ display: "flex", gap: 4, placeItems: "center" }}>
				{/* img */}
				<Avatar
					abbreviation="TR"
					image={
						<img src="https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png" />
					}
				/>
				{/* icon */}
				<Avatar image={<SvgUser />} />
			</div>

			{/* Not-implemented props */}
			<Avatar
				status="away"
				backgroundColor={getUserColor("Terry Rivers")}
				translatedStatusTitles={{
					away: "AFK",
					busy: "Do not disturb!",
					offline: "Disconnected",
					online: "Available",
				}}
			/>
		</div>
	);
});
