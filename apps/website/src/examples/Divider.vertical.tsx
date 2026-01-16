import { Divider } from "@stratakit/bricks";

export default () => {
	return (
		<div style={{ blockSize: "calc(100dvh - 16px * 2)" }}>
			<Divider orientation="vertical" />
		</div>
	);
};
