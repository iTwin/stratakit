import { IconButton } from "@stratakit/bricks";
import placeholderIcon from "@stratakit/icons/placeholder.svg";

export default () => {
	return (
		<div className="flex">
			<IconButton tone="accent" label="accent" icon={placeholderIcon} />
			<IconButton tone="neutral" label="neutral" icon={placeholderIcon} />
		</div>
	);
};
