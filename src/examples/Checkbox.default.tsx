import { Checkbox, Field } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Control render={<Checkbox />} />
			<Field.Label>Enable experimental feature</Field.Label>
		</Field.Root>
	);
};
