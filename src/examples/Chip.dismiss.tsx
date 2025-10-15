import { Chip } from "@stratakit/structures";

export default () => {
	return (
		<div className="flex">
			<Chip onDismiss={() => {}} label="sort:updated-desc" />
			<Chip onDismiss={() => {}} label="is:pr" />
			<Chip onDismiss={() => {}} label="is:open" />
		</div>
	);
};
