/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Field, Select } from "@itwin/itwinui-react/bricks";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Select" };

export default definePage(
	function Page() {
		return (
			<Field.Root layout="inline">
				<Field.Label>Fruit</Field.Label>
				<Field.Control
					render={(controlProps) => (
						<Select.Root>
							<Select.HtmlSelect {...controlProps}>
								<option value="apple">Apple</option>
								<option value="orange">Orange</option>
								<option value="kiwi">Kiwi</option>
							</Select.HtmlSelect>
						</Select.Root>
					)}
				/>
			</Field.Root>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			{(["solid", "outline", "ghost"] as const).map((variant) => (
				<Field.Root key={variant} layout="inline">
					<Field.Label>Fruit</Field.Label>
					<Field.Control
						render={(controlProps) => (
							<Select.Root>
								<Select.HtmlSelect variant={variant} {...controlProps}>
									<option value="apple">Apple</option>
									<option value="orange">Orange</option>
									<option value="kiwi">Kiwi</option>
								</Select.HtmlSelect>
							</Select.Root>
						)}
					/>
				</Field.Root>
			))}
		</div>
	);
}
