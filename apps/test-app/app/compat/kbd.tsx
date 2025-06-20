/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Kbd, KbdKeys } from "@stratakit/react";

import { definePage } from "~/~utils.tsx";

export const handle = { title: "Kbd" };

export default definePage(function Page() {
	const iuiKbdKeys = [
		"Command",
		"Shift",
		"Backspace",
		"Enter",
		"Eject",
		"Control",
		"Windows",
		"Apple",
		"Option",
		"Left",
		"Up",
		"Right",
		"Down",
	] as const;

	return (
		<div style={{ display: "grid", gap: 4, justifyItems: "start" }}>
			<Kbd>A</Kbd>
			<Kbd>{KbdKeys.Enter}</Kbd>
			<p>
				Press <Kbd>{KbdKeys.Command}</Kbd> + <Kbd>K</Kbd> to search.
			</p>
			<div style={{ display: "inline-grid", justifyItems: "start", gap: 4 }}>
				{iuiKbdKeys.map((symbol) => (
					<Kbd key={symbol}>{KbdKeys[symbol as keyof typeof KbdKeys]}</Kbd>
				))}
			</div>
		</div>
	);
});
