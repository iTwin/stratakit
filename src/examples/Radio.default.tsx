import { Field, Radio } from "@stratakit/bricks";

export default () => {
	return (
		<fieldset>
			<legend>Choose a design system:</legend>
			<Field.Root>
				<Field.Control
					render={<Radio name="design-system" value="StrataKit" />}
				/>
				<Field.Label>StrataKit</Field.Label>
			</Field.Root>

			<Field.Root>
				<Field.Control
					render={<Radio name="design-system" value="iTwinUI" />}
				/>
				<Field.Label>iTwinUI</Field.Label>
			</Field.Root>
		</fieldset>
	);
};
