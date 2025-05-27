/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { KbdKeys as IuiKbdKeys } from "@itwin/itwinui-react";
import { Kbd as SkKbd, VisuallyHidden } from "@stratakit/bricks";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

/** @see https://itwinui.bentley.com/docs/kbd */
export const Kbd = React.forwardRef((props, forwardedRef) => {
	const { children, ...rest } = useCompatProps(props);

	return (
		<SkKbd {...rest} ref={forwardedRef}>
			{children}
		</SkKbd>
	);
}) as PolymorphicForwardRefComponent<"kbd">;
DEV: Kbd.displayName = "Kbd";
// changed file test
export const KbdKeys: Record<keyof typeof IuiKbdKeys, React.ReactNode> = {
	Command: (
		<>
			<span aria-hidden="true">{"\u2318 Cmd"}</span>
			<VisuallyHidden>Command</VisuallyHidden>
		</>
	),
	Shift: (
		<>
			<span aria-hidden="true">{"\u21e7"}</span> Shift
		</>
	),
	Backspace: (
		<>
			<span aria-hidden="true">{"\u232b"}</span> Backspace
		</>
	),
	Enter: (
		<>
			<span aria-hidden="true">{"\u21b5"}</span> Enter
		</>
	),
	Eject: (
		<>
			<span aria-hidden="true">{"\u23cf"}</span> Eject
		</>
	),
	Control: (
		<>
			<span aria-hidden="true">Ctrl</span>
			<VisuallyHidden>Control</VisuallyHidden>
		</>
	),
	Windows: (
		<>
			<span aria-hidden="true">{"\u229e Win"}</span>
			<VisuallyHidden>Windows</VisuallyHidden>
		</>
	),
	Apple: (
		<>
			<span aria-hidden="true">{"\uf8ff"}</span>
			<VisuallyHidden>Apple</VisuallyHidden>
		</>
	),
	Option: (
		<>
			<span aria-hidden="true">{"\u2325"}</span> Option
		</>
	),
	Left: (
		<>
			<span aria-hidden="true">{"\u2190"}</span>
			<VisuallyHidden>Left</VisuallyHidden>
		</>
	),
	Up: (
		<>
			<span aria-hidden="true">{"\u2191"}</span>
			<VisuallyHidden>Up</VisuallyHidden>
		</>
	),
	Right: (
		<>
			<span aria-hidden="true">{"\u2192"}</span>
			<VisuallyHidden>Right</VisuallyHidden>
		</>
	),
	Down: (
		<>
			<span aria-hidden="true">{"\u2193"}</span>
			<VisuallyHidden>Down</VisuallyHidden>
		</>
	),
};
