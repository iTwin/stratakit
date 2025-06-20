/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Kbd } from "@stratakit/bricks";

import { definePage } from "~/~utils.tsx";

export const handle = { title: "Kbd" };

export default definePage(
	function Page() {
		return <Kbd variant={"muted"}>Ctrl</Kbd>;
	},
	{
		visual: VisualTest,
		symbols: SymbolsTest,
		symbolWithChildren: SymbolWithChildrenTest,
	},
);

function VisualTest() {
	const variants = ["solid", "muted", "ghost"] as const;

	return (
		<div style={{ display: "grid", gap: 4, justifyItems: "start" }}>
			{/* symbol */}
			{variants.map((variant) => (
				<Kbd key={variant} variant={variant} symbol="Shift" />
			))}

			<br />

			{/* children */}
			{variants.map((variant) => (
				<Kbd key={variant} variant={variant}>
					A
				</Kbd>
			))}

			<br />

			{/* symbol + children */}
			{variants.map((variant) => (
				<Kbd key={variant} symbol="Shift" variant={variant}>
					Shift
				</Kbd>
			))}
		</div>
	);
}

function SymbolsTest() {
	const symbols = [
		"Backspace",
		"Command",
		"Control",
		"Down",
		"Eject",
		"Enter",
		"Escape",
		"Left",
		"Option",
		"Right",
		"Shift",
		"Space",
		"Tab",
		"Up",
	] as const;

	return (
		<div style={{ display: "inline-grid", justifyItems: "start", gap: 4 }}>
			{symbols.map((symbol) => (
				<Kbd key={symbol} symbol={symbol} variant="ghost" />
			))}
		</div>
	);
}

function SymbolWithChildrenTest() {
	return (
		<div style={{ display: "inline-grid", justifyItems: "start", gap: 4 }}>
			<Kbd symbol="Command">Command</Kbd>
			<Kbd symbol="Shift">Shift</Kbd>
			<Kbd symbol="Backspace">Backspace</Kbd>
			<Kbd symbol="Enter">Enter</Kbd>
			<Kbd symbol="Eject">Eject</Kbd>
			<Kbd symbol="Option">Option</Kbd>
		</div>
	);
}
