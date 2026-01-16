import { Avatar } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import userIcon from "@stratakit/icons/user.svg";

export default () => {
	return (
		<Avatar
			initials="WW"
			alt="Willow Winters"
			image={<Icon href={userIcon} />}
		/>
	);
};
