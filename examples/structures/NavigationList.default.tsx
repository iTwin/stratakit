/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { unstable_NavigationList as NavigationList } from "@stratakit/structures";

import svgHome from "@stratakit/icons/home.svg";
import svgSettings from "@stratakit/icons/settings.svg";
import svgUser from "@stratakit/icons/user.svg";

export default () => {
	return (
		<NavigationList.Root
			items={[
				<NavigationList.Anchor key="home" label="Home" icon={svgHome} active />,
				<NavigationList.Anchor key="profile" label="Profile" icon={svgUser} />,
				<NavigationList.Anchor
					key="settings"
					label="Settings"
					icon={svgSettings}
				/>,
			]}
		/>
	);
};
