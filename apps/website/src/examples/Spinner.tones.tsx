import { Spinner } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Spinner tone="neutral" />
			<Spinner tone="accent" />
		</div>
	);
};
