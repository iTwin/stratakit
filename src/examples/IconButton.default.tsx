import { IconButton } from "@stratakit/bricks";

export default () => {
	return (
		<IconButton
			label="Download"
			icon={new URL("@stratakit/icons/download.svg", import.meta.url).href}
		/>
	);
};
