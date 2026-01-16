import { Chip } from "@stratakit/structures";

export default () => {
	return (
		<div className="flex">
			<Chip variant="solid" label="Solid" />
			<Chip variant="outline" label="Outline" />
		</div>
	);
};
