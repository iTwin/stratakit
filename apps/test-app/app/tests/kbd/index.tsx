/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Kbd, kbdKeys } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Kbd" };

export default definePage(
	function Page() {
		return <Kbd variant={"muted"}>Ctrl</Kbd>;
	},
	{ visual: VisualTest, visualKbd: VisualKbdKeysTest, kbdkeys: KbdKeysTest },
);

function VisualTest() {
	const variants = ["solid", "muted", "ghost"] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{variants.map((variant) => (
				<div key={variant} style={{ display: "flex", gap: 4 }}>
					<Kbd variant={variant}>Ctrl</Kbd>
				</div>
			))}
		</div>
	);
}

function VisualKbdKeysTest() {
	const kbdKeysList = Object.entries(kbdKeys);

	return (
		<div style={{ display: "grid", gap: 8 }}>
			<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
				{kbdKeysList.map(([name, symbol]) => (
					<li
						key={name}
						style={{ display: "flex", alignItems: "center", gap: 8 }}
					>
						<span>{name}</span>
						<Kbd>{symbol}</Kbd>
					</li>
				))}
			</ul>
		</div>
	);
}

function KbdKeysTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Kbd variant="solid">{kbdKeys.Apple}</Kbd>
			<Kbd variant="solid">{kbdKeys.Option}</Kbd>
			<Kbd variant="solid">{kbdKeys.Windows}</Kbd>
		</div>
	);
}
