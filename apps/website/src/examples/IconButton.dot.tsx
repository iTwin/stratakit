import { IconButton } from "@stratakit/bricks";
import notificationsIcon from "@stratakit/icons/notifications.svg";

export default () => {
	return (
		<IconButton
			label="Notifications"
			dot="You have unread notifications"
			icon={notificationsIcon}
		/>
	);
};
