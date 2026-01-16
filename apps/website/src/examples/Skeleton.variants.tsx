import { Skeleton, VisuallyHidden } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex" style={{ alignItems: "center" }}>
			<Skeleton variant="object" />
			<Skeleton variant="text" />
			<VisuallyHidden>Loading…</VisuallyHidden>
		</div>
	);
};
