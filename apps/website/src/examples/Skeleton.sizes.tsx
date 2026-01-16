import { Skeleton, VisuallyHidden } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Skeleton variant="text" size="xsmall" />
			<VisuallyHidden>Loading…</VisuallyHidden>

			<Skeleton variant="text" size="small" />
			<VisuallyHidden>Loading…</VisuallyHidden>

			<Skeleton variant="text" size="medium" />
			<VisuallyHidden>Loading…</VisuallyHidden>

			<Skeleton variant="text" size="large" />
			<VisuallyHidden>Loading…</VisuallyHidden>

			<Skeleton variant="text" size="xlarge" />
			<VisuallyHidden>Loading…</VisuallyHidden>
		</div>
	);
};
