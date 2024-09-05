/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import icon2d from "@itwin/kiwi-icons/icons/2d.svg";
import arrowIcon from "@itwin/kiwi-icons/icons/arrow.svg";

export const handle = { title: "Anchor" };

export default function Page() {
	return (
		<>
			<svg width="1rem" height="1rem" fill="white">
				<title>2d icon</title>
				<use href={`${icon2d}#icon`} />
			</svg>
			<svg width="1rem" height="1rem" fill="red">
				<title>Large 2d icon</title>
				<use href={`${icon2d}#icon-large`} />
			</svg>
			<svg width="1rem" height="1rem" fill="white">
				<title>Arrow icon</title>
				<use href={`${arrowIcon}#icon`} />
			</svg>
			<svg width="1rem" height="1rem" fill="red">
				<title>Large arrow icon</title>
				<use href={`${arrowIcon}#icon-large`} />
			</svg>
		</>
	);
}
