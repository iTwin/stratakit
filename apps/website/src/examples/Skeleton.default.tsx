import { Skeleton, VisuallyHidden } from "@stratakit/bricks";

export default () => {
	return (
		<>
			<Skeleton variant="text" />
			<VisuallyHidden>Loading…</VisuallyHidden>
		</>
	);
};
