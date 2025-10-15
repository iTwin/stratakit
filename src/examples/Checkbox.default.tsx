import { Checkbox, Field } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Control render={<Checkbox />} />
			<Field.Label>Keep me signed in</Field.Label>
		</Field.Root>
	);
};
