/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Icon } from "@itwin/kiwi-react/bricks";
import icon2d from "@itwin/kiwi-icons/2d.svg";
import { useSearchParams } from "@remix-run/react";

export const handle = { title: "Icon" };

export default function Page() {
	const size = useSizeParam();
	return <Icon size={size} href={icon2d} style={{ fill: "white" }} />;
}

function useSizeParam() {
	const sizeParam = useSearchParams()[0].get("size");
	if (sizeParam === "regular" || sizeParam === "large") return sizeParam;
	return undefined;
}
