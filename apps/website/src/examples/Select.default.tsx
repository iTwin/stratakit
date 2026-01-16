import { Field, Select } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Label>Choose a design system:</Field.Label>
			<Field.Control
				render={(controlProps) => (
					<Select.Root>
						<Select.HtmlSelect {...controlProps}>
							<option value="stratakit">StrataKit</option>
							<option value="itwinui">iTwinUI</option>
							<option value="other">Other</option>
						</Select.HtmlSelect>
					</Select.Root>
				)}
			/>
		</Field.Root>
	);
};
