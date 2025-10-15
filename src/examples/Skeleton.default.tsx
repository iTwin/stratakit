import { Skeleton, VisuallyHidden } from "@stratakit/bricks";

export default () => {
	return (
		<>
			<Skeleton />
			<VisuallyHidden>Loading…</VisuallyHidden>
		</>
	);
};
