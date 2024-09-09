/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Icon } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export const handle = { title: "Icon" };

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;

export default function Page() {
	const size = useSizeParam();
	return <Icon size={size} href={placeholderIcon} />;
}

function useSizeParam() {
	const sizeParam = useSearchParams()[0].get("size");
	if (sizeParam === "regular" || sizeParam === "large") return sizeParam;
	return undefined;
}
