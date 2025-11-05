import { Text } from "@stratakit/bricks";

export default () => {
	return (
		<div className="stack">
			<Text variant="caption-sm">Caption small</Text>
			<Text variant="caption-md">Caption medium</Text>
			<Text variant="caption-lg">Caption large</Text>
			<Text variant="mono-sm">Mono small</Text>
			<Text variant="body-sm">Body small</Text>
			<Text variant="body-md">Body medium</Text>
			<Text variant="body-lg">Body large</Text>
			<Text variant="headline-sm">Headline small</Text>
			<Text variant="headline-md">Headline medium</Text>
			<Text variant="headline-lg">Headline large</Text>
			<Text variant="display-sm">Display small</Text>
			<Text variant="display-md">Display medium</Text>
			<Text variant="display-lg">Display large</Text>
		</div>
	);
};
