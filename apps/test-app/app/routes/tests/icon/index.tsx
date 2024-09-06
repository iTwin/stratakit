/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Icon } from "@itwin/kiwi-react/bricks";
import icon2d from "@itwin/kiwi-icons/2d.svg";
import arrowIcon from "@itwin/kiwi-icons/arrow.svg";

export const handle = { title: "Icon" };

export default function Page() {
	return (
		<>
			<Icon id="2d" href={icon2d} style={{ fill: "white" }} />
			<Icon
				id="2d-large"
				href={icon2d}
				resolution="large"
				style={
					{
						fill: "white",
						"--_kiwi-color-icon-2d-box": "yellow",
					} as React.CSSProperties
				}
			/>
			<Icon href={arrowIcon} style={{ color: "red" }} />
			<Icon
				href={arrowIcon}
				resolution="large"
				style={
					{
						color: "red",
						"--_kiwi-color-icon": "green",
					} as React.CSSProperties
				}
			/>
		</>
	);
}
