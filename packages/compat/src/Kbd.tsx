/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { KbdKeys as IuiKbdKeys } from "@itwin/itwinui-react";
import { Kbd as SkKbd } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

export const Kbd = React.forwardRef((props, forwardedRef) => {
	const { children, ...rest } = useCompatProps(props);

	const mapping =
		typeof children === "string" && children in IuiKbdKeysToSkKbdSymbols
			? IuiKbdKeysToSkKbdSymbols[
					children as keyof typeof IuiKbdKeysToSkKbdSymbols
				]
			: undefined;

	return (
		<SkKbd {...rest} symbol={mapping?.symbol} ref={forwardedRef}>
			{mapping != null ? mapping.text : children}
		</SkKbd>
	);
}) as PolymorphicForwardRefComponent<"a">;
DEV: Kbd.displayName = "Kbd";

export { IuiKbdKeys as KbdKeys };

/**
 * Maps Iui's key values to SkKbd symbols (if exists) and string texts.
 */
const IuiKbdKeysToSkKbdSymbols: Record<
	(typeof IuiKbdKeys)[keyof typeof IuiKbdKeys],
	{
		symbol: React.ComponentProps<typeof SkKbd>["symbol"];
		text: string | undefined;
	}
> = {
	"\u2318 Cmd": { symbol: "Command", text: "Cmd" },
	"\u21e7 Shift": { symbol: "Shift", text: "Shift" },
	"\u232b Backspace": { symbol: "Backspace", text: "Backspace" },
	"\u21b5 Enter": { symbol: "Enter", text: "Enter" },
	"\u23cf Eject": { symbol: "Eject", text: "Eject" },
	Ctrl: { symbol: "Control", text: undefined },
	"\u229e Win": { symbol: undefined, text: "\u229e Win" },
	"\uf8ff": { symbol: undefined, text: "\uf8ff" }, // Apple
	"\u2325 Option": { symbol: "Option", text: "Option" },
	"\u2190": { symbol: "Left", text: undefined },
	"\u2191": { symbol: "Up", text: undefined },
	"\u2192": { symbol: "Right", text: undefined },
	"\u2193": { symbol: "Down", text: undefined },
};
