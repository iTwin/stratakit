import { Field, Switch } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Control render={<Switch />} />
			<Field.Label>Dark mode</Field.Label>
		</Field.Root>
	);
};
