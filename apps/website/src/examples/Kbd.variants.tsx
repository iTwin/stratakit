import { Kbd } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Kbd variant="solid">Solid</Kbd>
			<Kbd variant="muted">Muted</Kbd>
			<Kbd variant="ghost">Ghost</Kbd>
		</div>
	);
};
