import { Field, Select } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Field.Root>
				<Field.Label>Design system:</Field.Label>
				<Field.Control
					render={
						<Select.Root>
							<Select.HtmlSelect>
								<option value="stratakit">StrataKit</option>
								<option value="itwinui">iTwinUI</option>
								<option value="other">Other</option>
							</Select.HtmlSelect>
						</Select.Root>
					}
				/>
			</Field.Root>
			<Field.Root>
				<Field.Label>Design system:</Field.Label>
				<Field.Control
					render={
						<Select.Root>
							<Select.HtmlSelect variant="outline">
								<option value="stratakit">StrataKit</option>
								<option value="itwinui">iTwinUI</option>
								<option value="other">Other</option>
							</Select.HtmlSelect>
						</Select.Root>
					}
				/>
			</Field.Root>
			<Field.Root>
				<Field.Label>Design system:</Field.Label>
				<Field.Control
					render={
						<Select.Root>
							<Select.HtmlSelect variant="ghost">
								<option value="stratakit">StrataKit</option>
								<option value="itwinui">iTwinUI</option>
								<option value="other">Other</option>
							</Select.HtmlSelect>
						</Select.Root>
					}
				/>
			</Field.Root>
		</div>
	);
};
