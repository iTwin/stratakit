/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Field, Select } from "@stratakit/bricks";
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
								<Select.SelectedContent />
								<Select.Option value="apple" label="Apple" />
								<Select.Option value="orange" label="Orange" />
								<Select.Option value="kiwi" label="Kiwi" />
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
										<Select.SelectedContent />
										<Select.Option
											value=""
											label="Select an option"
											disabled
											selected
											hidden
										/>
										<Select.Option
											value="apple"
											label="Apple"
											icon={placeholderIconHref}
										/>
										<Select.Option
											value="orange"
											label="Orange"
											icon={placeholderIconHref}
										/>
										<Select.Option
											value="kiwi"
											label="Kiwi"
											icon={placeholderIconHref}
											disabled
										/>
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
										<Select.SelectedContent />
										<Select.Option
											value="apple"
											label="Apple"
											icon={placeholderIconHref}
										/>
										<Select.Option
											value="orange"
											label="Orange"
											icon={placeholderIconHref}
										/>
										<Select.Option
											value="kiwi"
											label="Kiwi"
											icon={placeholderIconHref}
											disabled
										/>
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
										<Select.SelectedContent />
										<Select.Option
											value="apple"
											label="Apple"
											icon={placeholderIconHref}
										/>
										<Select.Option
											value="orange"
											label="Orange"
											icon={placeholderIconHref}
										/>
										<Select.Option
											value="kiwi"
											label="Kiwi"
											icon={placeholderIconHref}
											disabled
										/>
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
