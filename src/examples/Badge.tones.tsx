import { Badge } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Badge tone="neutral" label="Neutral" />
			<Badge tone="info" label="Info" />
			<Badge tone="positive" label="Positive" />
			<Badge tone="attention" label="Attention" />
			<Badge tone="critical" label="Critical" />
			<Badge tone="accent" label="Accent" />
		</div>
	);
};
