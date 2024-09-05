/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Icon } from "@itwin/kiwi-react/bricks";
import icon2d from "@itwin/kiwi-icons/icons/2d.svg";
import arrowIcon from "@itwin/kiwi-icons/icons/arrow.svg";

export const handle = { title: "Anchor" };

export default function Page() {
	return (
		<>
			<Icon id="2d" href={icon2d} style={{ fill: "white" }} />
			<Icon
				id="2d-large"
				href={icon2d}
				resolution="large"
				style={{ fill: "white" }}
			/>
			<Icon href={arrowIcon} style={{ color: "red" }} />
			<Icon
				href={arrowIcon}
				resolution="large"
				style={{
					color: "red",
				}}
			/>
		</>
	);
}
