import { Checkbox, Field } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Control render={<Checkbox />} />
			<Field.Label>Don’t show again</Field.Label>
		</Field.Root>
	);
};
