import { Chip } from "@stratakit/structures";

export default () => {
	return (
		<div className="flex">
			<Chip label="HTML" />
			<Chip label="CSS" />
			<Chip label="JS" />
		</div>
	);
};
