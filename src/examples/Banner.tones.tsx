import { unstable_Banner as Banner } from "@stratakit/structures";

export default () => {
	return (
		<div className="flex">
			<Banner
				tone="neutral"
				label="Update complete"
				message="Your settings have been saved successfully."
			/>
			<Banner
				tone="info"
				label="New feature available"
				message="You can now filter search results by project type in the dashboard."
			/>
			<Banner
				tone="positive"
				label="Changes published"
				message="Your updates are live and visible to all users."
			/>
			<Banner
				tone="attention"
				label="Action required"
				message="Some fields are missing information. Please review before continuing."
			/>
			<Banner
				tone="critical"
				label="Failed to save changes"
				message="The server couldn't process your request. Try again or contact support if the issue persists."
			/>
		</div>
	);
};
