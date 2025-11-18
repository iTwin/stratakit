/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field, Select } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import { definePage } from "~/~utils.tsx";

import placeholderIconHref from "@stratakit/icons/placeholder.svg";

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
				<div key={variant} style={{ display: "flex", gap: 4 }}>
					<Field.Root layout="inline">
						<Field.Label>Fruit</Field.Label>
						<Field.Control
							render={(controlProps) => (
								<Select.Root>
									<Select.HtmlSelect variant={variant} {...controlProps}>
										<option value="" disabled selected hidden>
											Select an option
										</option>
										<option value="apple">
											<Icon href={placeholderIconHref} />
											Apple
										</option>
										<option value="orange" disabled>
											<Icon href={placeholderIconHref} />
											Orange
										</option>
										<option value="kiwi">
											<Icon href={placeholderIconHref} />
											Kiwi
										</option>
									</Select.HtmlSelect>
								</Select.Root>
							)}
						/>
					</Field.Root>

					<Field.Root layout="inline">
						<Field.Label>Fruit</Field.Label>
						<Field.Control
							render={(controlProps) => (
								<Select.Root>
									<Select.HtmlSelect variant={variant} {...controlProps}>
										<option value="apple">
											<Icon href={placeholderIconHref} />
											Apple
										</option>
										<option value="orange" disabled>
											<Icon href={placeholderIconHref} />
											Orange
										</option>
										<option value="kiwi">
											<Icon href={placeholderIconHref} />
											Kiwi
										</option>
									</Select.HtmlSelect>
								</Select.Root>
							)}
						/>
					</Field.Root>

					<Field.Root layout="inline">
						<Field.Label>Fruit</Field.Label>
						<Field.Control
							render={(controlProps) => (
								<Select.Root>
									<Select.HtmlSelect
										variant={variant}
										disabled
										{...controlProps}
									>
										<option value="apple">
											<Icon href={placeholderIconHref} />
											Apple
										</option>
										<option value="orange" disabled>
											<Icon href={placeholderIconHref} />
											Orange
										</option>
										<option value="kiwi">
											<Icon href={placeholderIconHref} />
											Kiwi
										</option>
									</Select.HtmlSelect>
								</Select.Root>
							)}
						/>
					</Field.Root>
				</div>
			))}
		</div>
	);
}
