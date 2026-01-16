import { Checkbox, Field } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Control render={<Checkbox />} />
			<Field.Label>Enable experimental features</Field.Label>
		</Field.Root>
	);
};
