import { Button } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Button variant="solid">Solid</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
		</div>
	);
};
