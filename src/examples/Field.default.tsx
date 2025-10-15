import { Field, TextBox } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Label>Name</Field.Label>
			<Field.Control render={<TextBox.Input />} />
			<Field.Description>Enter your full name.</Field.Description>
			<Field.ErrorMessage>Name is required.</Field.ErrorMessage>
		</Field.Root>
	);
};
