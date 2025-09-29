import { Field, TextBox } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Label>Name</Field.Label>
			<Field.Control render={<TextBox.Input />} />
		</Field.Root>
	);
};
