import { Anchor } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Anchor tone="accent" href="https://www.example.com/">
				Accent
			</Anchor>
			<Anchor tone="neutral" href="https://www.example.com/">
				Neutral
			</Anchor>
		</div>
	);
};
