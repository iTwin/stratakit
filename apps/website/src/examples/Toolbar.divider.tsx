import { Divider, IconButton } from "@stratakit/bricks";
import addIcon from "@stratakit/icons/add.svg";
import deleteIcon from "@stratakit/icons/delete.svg";
import editIcon from "@stratakit/icons/edit.svg";
import saveIcon from "@stratakit/icons/save.svg";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";

export default () => {
	return (
		<Toolbar.Group variant="solid" orientation="vertical">
			<Toolbar.Item
				render={
					<IconButton
						icon={`${addIcon}#icon-large`}
						label="Add"
						variant="ghost"
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						icon={`${editIcon}#icon-large`}
						label="Edit"
						variant="ghost"
					/>
				}
			/>
			<Divider />
			<Toolbar.Item
				render={
					<IconButton
						icon={`${saveIcon}#icon-large`}
						label="Save"
						variant="ghost"
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						icon={`${deleteIcon}#icon-large`}
						label="Delete"
						variant="ghost"
					/>
				}
			/>
		</Toolbar.Group>
	);
};
