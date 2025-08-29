/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const LABELS = {
	ACCORDION: "component: AccordionItem",
	ANCHOR: "component: Anchor",
	AVATAR: "component: Avatar",
	BADGE: "component: Badge",
	BANNER: "component: Banner",
	BREADCRUMB: "component: Breadcrumb",
	BUTTON: "component: Button",
	CARD: "component: Card",
	CHECKBOX: "component: Checkbox",
	CHIP: "component: Chip",
	CODE_SNIPPET: "component: CodeSnippet",
	DESCRIPTION: "component: Description",
	DIALOG: "component: Dialog",
	DIVIDER: "component: Divider",
	DROPDOWN_MENU: "component: DropdownMenu",
	ERROR_REGION: "component: ErrorRegion",
	FIELD: "component: Field",
	ICON: "component: Icon",
	ICON_BUTTON: "component: IconButton",
	KBD: "component: Kbd",
	LABEL: "component: Label",
	LIST: "component: List",
	PAGINATION: "component: Pagination",
	PLATFORM_BAR: "component: PlatformBar",
	POPOVER: "component: Popover",
	PROGRESS_BAR: "component: ProgressBar",
	RADIO: "component: Radio",
	SELECT: "component: Select",
	SKELETON: "component: Skeleton",
	SPINNER: "component: Spinner",
	SWITCH: "component: Switch",
	TABLE: "component: Table",
	TABS: "component: Tabs",
	TEXT: "component: Text",
	TEXT_BOX: "component: TextBox",
	TOAST: "component: Toast",
	TOOLBAR: "component: Toolbar",
	TOOLTIP: "component: Tooltip",
	TREE: "component: Tree",
	API_BRIDGE: "API bridge",
	GITHUB_ACTIONS: "github_actions",
};

const LABEL_MAP = {
	[LABELS.ACCORDION]: [
		"packages/structures/src/AccordionItem",
		"packages/compat/src/ExpandableBlock.tsx",
	],
	[LABELS.ANCHOR]: [
		"packages/bricks/src/Anchor",
		"packages/compat/src/Anchor.tsx",
	],
	[LABELS.AVATAR]: [
		"packages/bricks/src/Avatar",
		"packages/compat/src/Avatar.tsx",
	],
	[LABELS.BADGE]: [
		"packages/bricks/src/Badge",
		"packages/compat/src/Badge.tsx",
	],
	[LABELS.BANNER]: [
		"packages/structures/src/Banner",
		"packages/compat/src/Alert.tsx",
	],
	[LABELS.BREADCRUMB]: [],
	[LABELS.BUTTON]: [
		"packages/bricks/src/Button",
		"packages/compat/src/Button.tsx",
	],
	[LABELS.CARD]: [],
	[LABELS.CHECKBOX]: [
		"packages/bricks/src/Checkbox",
		"packages/compat/src/Checkbox.tsx",
	],
	[LABELS.CHIP]: [
		"packages/structures/src/Chip",
		"packages/compat/src/Tag.tsx",
	],
	[LABELS.CODE_SNIPPET]: [],
	[LABELS.DESCRIPTION]: ["packages/bricks/src/Description"],
	[LABELS.DIALOG]: ["packages/structures/src/Dialog"],
	[LABELS.DIVIDER]: [
		"packages/bricks/src/Divider",
		"packages/compat/src/Divider.tsx",
	],
	[LABELS.DROPDOWN_MENU]: [
		"packages/structures/src/DropdownMenu",
		"packages/compat/src/MenuItem.tsx",
		"packages/compat/src/DropdownMenu.tsx",
	],
	[LABELS.ERROR_REGION]: ["packages/structures/src/ErrorRegion"],
	[LABELS.FIELD]: [
		"packages/bricks/src/Field",
		"packages/compat/src/InputGrid.tsx",
		"packages/compat/src/StatusMessage.tsx",
	],
	[LABELS.ICON]: [
		"packages/foundations/src/Icon",
		"packages/compat/src/Icon.tsx",
	],
	[LABELS.ICON_BUTTON]: [
		"packages/bricks/src/IconButton",
		"packages/compat/src/IconButton.tsx",
	],
	[LABELS.KBD]: ["packages/bricks/src/Kbd", "packages/compat/src/Kbd.tsx"],
	[LABELS.LABEL]: [
		"packages/bricks/src/Label",
		"packages/compat/src/Label.tsx",
	],
	[LABELS.LIST]: [],
	[LABELS.PAGINATION]: [],
	[LABELS.PLATFORM_BAR]: ["packages/structures/src/NavigationRail"],
	[LABELS.POPOVER]: [],
	[LABELS.PROGRESS_BAR]: [
		"packages/bricks/src/Progress",
		"packages/compat/src/ProgressLinear.tsx",
	],
	[LABELS.RADIO]: [
		"packages/bricks/src/Radio",
		"packages/compat/src/Radio.tsx",
	],
	[LABELS.SELECT]: [
		"packages/bricks/src/Select",
		"packages/compat/src/Select.tsx",
	],
	[LABELS.SKELETON]: ["packages/bricks/src/Skeleton"],
	[LABELS.SPINNER]: [
		"packages/bricks/src/Spinner",
		"packages/compat/src/ProgressRadial.tsx",
	],
	[LABELS.SWITCH]: [
		"packages/bricks/src/Switch",
		"packages/compat/src/ToggleSwitch.tsx",
	],
	[LABELS.TABLE]: ["packages/structures/src/Table"],
	[LABELS.TABS]: [
		"packages/structures/src/Tabs",
		"packages/compat/src/Tabs.tsx",
	],
	[LABELS.TEXT]: ["packages/bricks/src/Text.", "packages/compat/src/Text.tsx"],
	[LABELS.TEXT_BOX]: [
		"packages/bricks/src/TextBox",
		"packages/compat/src/Input.tsx",
		"packages/compat/src/LabeledInput.tsx",
		"packages/compat/src/Textarea.tsx",
		"packages/compat/src/LabeledTextarea.tsx",
	],
	[LABELS.TOAST]: [],
	[LABELS.TOOLBAR]: ["packages/structures/src/Toolbar"],
	[LABELS.TOOLTIP]: [
		"packages/bricks/src/Tooltip",
		"packages/compat/src/Tooltip.tsx",
	],
	[LABELS.TREE]: [
		"packages/structures/src/Tree",
		"packages/structures/src/TreeItem",
	],
	[LABELS.API_BRIDGE]: ["packages/compat/src"],
	[LABELS.GITHUB_ACTIONS]: [".github/workflows"],
};

/**
 * @import {Context} from "@actions/github/lib/context"
 * @import {GitHub} from "@actions/github/lib/utils"
 * @param {{ context: Context, github: InstanceType<GitHub> }} args
 */
export default async function prLabels({ context, github }) {
	const repo = context.repo.repo;
	const owner = context.repo.owner;
	const pr = context.payload.pull_request;
	const prNumber = pr.number;

	const labelsToAdd = new Set();

	try {
		// get files changed
		const files = await github.paginate(github.rest.pulls.listFiles, {
			owner: owner,
			repo: repo,
			pull_number: prNumber,
		});

		// determine labels based on files changed
		for (const file of files) {
			const fileName = file.filename;

			for (const [label, paths] of Object.entries(LABEL_MAP)) {
				// check that the current changed file is part of any accepted path for the label
				if (paths.some((path) => fileName.startsWith(path))) {
					labelsToAdd.add(label);
				}
			}
		}

		// if synchronizing, remove any outdated labels
		const currentLabels = await github.rest.issues.listLabelsOnIssue({
			owner: owner,
			repo: repo,
			issue_number: prNumber,
		});
		const currentLabelNames = new Set(
			currentLabels.data.map((label) => label.name),
		);

		const finalLabelsAdd = [...labelsToAdd].filter(
			(label) => !currentLabelNames.has(label),
		);

		// add relevant labels to the PR
		if (finalLabelsAdd.length > 0) {
			await github.rest.issues.addLabels({
				owner: owner,
				repo: repo,
				issue_number: prNumber,
				labels: finalLabelsAdd,
			});
		}
	} catch (error) {
		console.log("Failed assigning labels");
		console.error(error);
	}
}
