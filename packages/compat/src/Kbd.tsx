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

	const symbol =
		typeof children === "string"
			? IuiKbdKeysToSkKbdSymbols[
					children as keyof typeof IuiKbdKeysToSkKbdSymbols
				]
			: undefined;

	return (
		<SkKbd {...rest} symbol={symbol} ref={forwardedRef}>
			{symbol == null ? children : undefined}
		</SkKbd>
	);
}) as PolymorphicForwardRefComponent<"a">;
DEV: Kbd.displayName = "Kbd";

export { IuiKbdKeys as KbdKeys };

/**
 * Maps IuiKbdKeysValues to SkKbd symbols, if available. Else, maps to undefined.
 */
const IuiKbdKeysToSkKbdSymbols: Record<
	(typeof IuiKbdKeys)[keyof typeof IuiKbdKeys],
	React.ComponentProps<typeof SkKbd>["symbol"]
> = {
	"\u2318 Cmd": "Command",
	"\u21e7 Shift": "Shift",
	"\u232b Backspace": "Backspace",
	"\u21b5 Enter": "Enter",
	"\u23cf Eject": "Eject",
	Ctrl: "Control",
	"\u229e Win": undefined, // Windows
	"\uf8ff": undefined, // Apple
	"\u2325 Option": "Option",
	"\u2190": "Left",
	"\u2191": "Up",
	"\u2192": "Right",
	"\u2193": "Down",
};
