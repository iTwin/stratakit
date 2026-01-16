import { Avatar } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Avatar initials="WW" alt="Willow Winters" size="small" />
			<Avatar initials="WW" alt="Willow Winters" size="medium" />
			<Avatar initials="WW" alt="Willow Winters" size="large" />
			<Avatar initials="WW" alt="Willow Winters" size="xlarge" />
		</div>
	);
};
