import { Spinner } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Spinner size="small" />
			<Spinner size="medium" />
			<Spinner size="large" />
			<Spinner size="xlarge" />
		</div>
	);
};
